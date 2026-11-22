// ==========================================================================
// CYBER GRID AUDIO SYNTHESIZER (Web Audio API)
// 100% Procedural 80s Synthwave Music & Cyberpunk SFX (Zero External Files)
// ==========================================================================

class CyberAudioEngine {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.musicPlaying = false;
        this.masterGain = null;
        this.musicGain = null;
        this.sfxGain = null;
        this.timerId = null;
        this.step = 0;
        this.tempo = 124; // 124 BPM Synthwave
        this.bassNotes = [
            146.83, 146.83, 146.83, 146.83, // D3
            116.54, 116.54, 116.54, 116.54, // Bb2
            130.81, 130.81, 130.81, 130.81, // C3
            98.00,  98.00,  110.00, 130.81  // G2 -> A2 -> C3
        ];
        this.leadNotes = [
            293.66, 349.23, 440.00, 523.25, 440.00, 349.23, 293.66, 329.63,
            233.08, 293.66, 349.23, 440.00, 349.23, 293.66, 233.08, 261.63,
            261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 261.63, 293.66,
            196.00, 246.94, 293.66, 392.00, 440.00, 392.00, 293.66, 261.63
        ];
    }

    init() {
        if (this.ctx) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        this.musicGain.connect(this.masterGain);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
        this.sfxGain.connect(this.masterGain);
    }

    ensureContext() {
        if (!this.ctx) this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.ensureContext();
        this.isMuted = !this.isMuted;
        if (this.masterGain) {
            this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime);
        }
        return this.isMuted;
    }

    toggleMusic() {
        this.ensureContext();
        if (this.musicPlaying) {
            this.stopMusic();
        } else {
            this.startMusic();
        }
        return this.musicPlaying;
    }

    startMusic() {
        this.ensureContext();
        if (this.musicPlaying) return;
        this.musicPlaying = true;
        this.step = 0;
        const stepTime = (60 / this.tempo) / 4; // 16th notes
        this.timerId = setInterval(() => {
            this.playSequenceStep();
        }, stepTime * 1000);
    }

    stopMusic() {
        this.musicPlaying = false;
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    playSequenceStep() {
        if (!this.ctx || this.isMuted || !this.musicPlaying) return;
        const t = this.ctx.currentTime;
        const s = this.step;

        // 1. Synth Kick on beats 0, 4, 8, 12
        if (s % 4 === 0) {
            this.synthesizeKick(t);
        }

        // 2. Snare / Noise Clap on beats 4, 12
        if (s % 8 === 4) {
            this.synthesizeSnare(t);
        }

        // 3. Hi-Hat on every 2nd 16th note
        if (s % 2 === 1) {
            this.synthesizeHiHat(t);
        }

        // 4. Bassline arpeggio (sawtooth bass with low-pass envelope)
        const bassNoteIndex = Math.floor(s / 4) % this.bassNotes.length;
        const baseFreq = this.bassNotes[bassNoteIndex];
        // 16th octave hop for classic rolling synthwave bass
        const octaveMult = (s % 2 === 0) ? 0.5 : 1.0;
        this.synthesizeBass(t, baseFreq * octaveMult);

        // 5. Lead Synth Melody
        if (s % 2 === 0) {
            const leadIndex = (Math.floor(s / 2)) % this.leadNotes.length;
            const leadFreq = this.leadNotes[leadIndex];
            this.synthesizeLead(t, leadFreq);
        }

        this.step = (this.step + 1) % 64;
    }

    synthesizeKick(t) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, t);
        osc.frequency.exponentialRampToValueAtTime(38, t + 0.12);
        gain.gain.setValueAtTime(0.7, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        osc.connect(gain);
        gain.connect(this.musicGain);
        osc.start(t);
        osc.stop(t + 0.15);
    }

    synthesizeSnare(t) {
        // Noise buffer
        const bufferSize = this.ctx.sampleRate * 0.1;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1000, t);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.musicGain);

        noise.start(t);
        noise.stop(t + 0.12);
    }

    synthesizeHiHat(t) {
        const bufferSize = this.ctx.sampleRate * 0.04;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(7000, t);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.musicGain);

        noise.start(t);
        noise.stop(t + 0.04);
    }

    synthesizeBass(t, freq) {
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, t);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, t);
        filter.frequency.exponentialRampToValueAtTime(180, t + 0.15);

        gain.gain.setValueAtTime(0.4, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.musicGain);

        osc.start(t);
        osc.stop(t + 0.2);
    }

    synthesizeLead(t, freq) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

        osc.connect(gain);
        gain.connect(this.musicGain);

        osc.start(t);
        osc.stop(t + 0.25);
    }

    // ================= SFX ENGINE =================

    playKeypress() {
        this.ensureContext();
        if (this.isMuted) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200 + Math.random() * 400, t);
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.03);
    }

    playAccessGranted() {
        this.ensureContext();
        if (this.isMuted) return;
        const t = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, t + idx * 0.07);
            gain.gain.setValueAtTime(0.25, t + idx * 0.07);
            gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.07 + 0.25);
            osc.connect(gain);
            gain.connect(this.sfxGain);
            osc.start(t + idx * 0.07);
            osc.stop(t + idx * 0.07 + 0.28);
        });
    }

    playAccessDenied() {
        this.ensureContext();
        if (this.isMuted) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, t);
        osc.frequency.linearRampToValueAtTime(90, t + 0.25);
        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.26);
    }

    playBossAlert() {
        this.ensureContext();
        if (this.isMuted) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, t);
        osc.frequency.linearRampToValueAtTime(800, t + 0.2);
        osc.frequency.linearRampToValueAtTime(300, t + 0.4);
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.5);
    }

    playSectorClear() {
        this.ensureContext();
        if (this.isMuted) return;
        const t = this.ctx.currentTime;
        const chords = [
            [293.66, 369.99, 440.00], // D Maj
            [329.63, 415.30, 493.88], // E Maj
            [440.00, 554.37, 659.25]  // A Maj
        ];
        chords.forEach((chord, cIdx) => {
            chord.forEach(freq => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                const startTime = t + cIdx * 0.22;
                osc.frequency.setValueAtTime(freq, startTime);
                gain.gain.setValueAtTime(0.2, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
                osc.connect(gain);
                gain.connect(this.sfxGain);
                osc.start(startTime);
                osc.stop(startTime + 0.45);
            });
        });
    }
}

// Global audio singleton
window.cyberAudio = new CyberAudioEngine();
