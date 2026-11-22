// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// CyberAudio.js - Procedural Web Audio API Cyber Synthesizer Engine
// Zero-Dependency 80s Synthwave Sequencer & Dynamic Cyber SFX Generator
// ==========================================================================

class CyberAudioEngine {
    constructor() {
        this.ctx = null;
        this.isInitialized = false;

        // Master Gain Stages
        this.masterGain = null;
        this.musicGain = null;
        this.sfxGain = null;

        // Volume and Mute States
        this.masterVolume = 0.8;
        this.musicVolume = 0.55;
        this.sfxVolume = 0.75;
        this.musicMuted = true; // Off by default until player enables it
        this.sfxMuted = false;

        // Sequencer Timing State
        this.isPlayingMusic = false;
        this.currentTheme = 'OFF'; // 'EXPLORATION', 'COMBAT', 'BOSS', 'OFF'
        this.bpm = 120;
        this.stepTimer = null;
        this.nextNoteTime = 0;
        this.currentStep = 0; // 0..15 in a 16-step bar
        this.currentMeasure = 0;
        this.scheduleAheadTime = 0.12; // 120ms lookahead
        this.lookaheadInterval = 30; // Check every 30ms

        // Shared 1-second white noise buffer for synthetic percussion and whooshes
        this.noiseBuffer = null;

        // Standard Note Frequency Table (Equal Temperament, A4 = 440 Hz)
        this.notes = {
            'D1': 36.71, 'E1': 41.20, 'F1': 43.65, 'G1': 49.00, 'A1': 55.00, 'Bb1': 58.27, 'C2': 65.41,
            'D2': 73.42, 'E2': 82.41, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00, 'Bb2': 116.54, 'C3': 130.81,
            'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'Bb3': 233.08, 'C4': 261.63,
            'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'Bb4': 466.16, 'C5': 523.25,
            'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'Bb5': 932.33, 'C6': 1046.50
        };

        // Bind auto-initialization on browser interaction
        this.bindUserInteractionUnlock();
    }

    // ======================================================================
    // 1. AudioContext Initialization & User Interaction Unlock
    // ======================================================================
    init() {
        if (this.isInitialized) return true;
        if (typeof window === 'undefined') return false;

        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) {
            console.warn('[CyberAudio] Web Audio API is not supported in this browser.');
            return false;
        }

        try {
            this.ctx = new AudioContextClass();

            // 1. Master Output Gain
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
            this.masterGain.connect(this.ctx.destination);

            // 2. Music Submix Gain
            this.musicGain = this.ctx.createGain();
            this.musicGain.gain.setValueAtTime(this.musicMuted ? 0 : this.musicVolume, this.ctx.currentTime);
            this.musicGain.connect(this.masterGain);

            // 3. SFX Submix Gain
            this.sfxGain = this.ctx.createGain();
            this.sfxGain.gain.setValueAtTime(this.sfxMuted ? 0 : this.sfxVolume, this.ctx.currentTime);
            this.sfxGain.connect(this.masterGain);

            // Pre-bake reusable white noise buffer (1 second, 44.1kHz)
            const bufferSize = this.ctx.sampleRate;
            this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const output = this.noiseBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }

            this.isInitialized = true;
            console.log(`[CyberAudio] Engine initialized successfully. Sample Rate: ${this.ctx.sampleRate} Hz`);
            return true;
        } catch (err) {
            console.error('[CyberAudio] Failed to initialize AudioContext:', err);
            return false;
        }
    }

    bindUserInteractionUnlock() {
        if (typeof window === 'undefined') return;

        const unlockHandler = () => {
            if (!this.isInitialized) {
                this.init();
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
            // Remove listeners once audio is actively running
            if (this.ctx && this.ctx.state === 'running') {
                ['click', 'keydown', 'touchstart'].forEach(evt => {
                    window.removeEventListener(evt, unlockHandler);
                });
            }
        };

        ['click', 'keydown', 'touchstart'].forEach(evt => {
            window.addEventListener(evt, unlockHandler, { once: false, passive: true });
        });
    }

    ensureContext() {
        if (!this.isInitialized) {
            this.init();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        return this.isInitialized && this.ctx;
    }

    // ======================================================================
    // 2. Procedural Synthwave Sequencer & Themes
    // ======================================================================
    playExplorationTheme() {
        this.setTheme('EXPLORATION', 120);
    }

    playCombatTheme() {
        this.setTheme('COMBAT', 138);
    }

    playBossTheme() {
        this.setTheme('BOSS', 144);
    }

    setTheme(themeName, bpm = 120) {
        if (!this.ensureContext()) return;
        this.currentTheme = themeName;
        this.bpm = bpm;

        if (this.musicMuted) {
            console.log(`[CyberAudio] Theme queued: ${themeName} (Music is currently muted).`);
            return;
        }

        if (!this.isPlayingMusic) {
            this.isPlayingMusic = true;
            this.nextNoteTime = this.ctx.currentTime + 0.05;
            this.currentStep = 0;
            this.currentMeasure = 0;
            if (this.stepTimer) clearInterval(this.stepTimer);
            this.stepTimer = setInterval(() => this.scheduler(), this.lookaheadInterval);
            console.log(`[CyberAudio] Synthwave soundtrack started: [${themeName}] @ ${bpm} BPM`);
        }
    }

    stopMusic() {
        this.isPlayingMusic = false;
        this.currentTheme = 'OFF';
        if (this.stepTimer) {
            clearInterval(this.stepTimer);
            this.stepTimer = null;
        }
        console.log('[CyberAudio] Soundtrack stopped.');
    }

    toggleMusic() {
        this.ensureContext();
        this.musicMuted = !this.musicMuted;

        if (this.musicGain && this.ctx) {
            const target = this.musicMuted ? 0 : this.musicVolume;
            this.musicGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
        }

        if (!this.musicMuted && !this.isPlayingMusic) {
            this.playExplorationTheme();
        }

        this.updateHUDMusicButton();
        return !this.musicMuted;
    }

    toggleSFX() {
        this.ensureContext();
        this.sfxMuted = !this.sfxMuted;

        if (this.sfxGain && this.ctx) {
            const target = this.sfxMuted ? 0 : this.sfxVolume;
            this.sfxGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.02);
        }

        this.updateHUDSfxButton();
        return !this.sfxMuted;
    }

    scheduler() {
        if (!this.isPlayingMusic || !this.ctx || this.ctx.state !== 'running') return;

        // Respect game pause state - do not queue audio steps while paused
        if (typeof window !== 'undefined' && window.GameState && window.GameState.isPaused()) {
            this.nextNoteTime = this.ctx.currentTime + 0.05;
            return;
        }

        // Resynchronize immediately if nextNoteTime has lagged behind currentTime (e.g. tab switch, lag spike, or resize)
        if (this.nextNoteTime < this.ctx.currentTime) {
            this.nextNoteTime = this.ctx.currentTime + 0.02;
        }

        // Strict iteration guard: never schedule more than 4 steps in a single scheduler tick!
        let maxSteps = 4;
        while (this.nextNoteTime < this.ctx.currentTime + this.scheduleAheadTime && maxSteps-- > 0) {
            this.scheduleStep(this.currentStep, this.nextNoteTime);
            this.advanceStep();
        }
    }

    advanceStep() {
        const secondsPerBeat = 60.0 / this.bpm;
        const secondsPer16th = secondsPerBeat / 4.0;
        this.nextNoteTime += secondsPer16th;

        this.currentStep++;
        if (this.currentStep >= 16) {
            this.currentStep = 0;
            this.currentMeasure++;
        }
    }

    scheduleStep(step, time) {
        if (this.currentTheme === 'EXPLORATION') {
            this.scheduleExplorationStep(step, time);
        } else if (this.currentTheme === 'COMBAT') {
            this.scheduleCombatStep(step, time);
        } else if (this.currentTheme === 'BOSS') {
            this.scheduleBossStep(step, time);
        }
    }

    // --- TRACK 1: Exploration Theme ("Packet Transit") ---
    // 120 BPM, Key of D Minor, Rolling 16th-note analog bassline & lush detuned pads
    scheduleExplorationStep(step, time) {
        const step16 = step % 16;
        const chordIndex = Math.floor(this.currentMeasure / 2) % 4; // 2 bars per chord
        // Chords: Dm (D-F-A), Bb (Bb-D-F), F (F-A-C), C (C-E-G)
        const roots = [this.notes.D2, this.notes.Bb1, this.notes.F1, this.notes.C2];
        const currentRoot = roots[chordIndex] || this.notes.D2;

        // 1. Rolling 16th Bassline (Analog Sawtooth + Sweeping Resonant Lowpass Filter)
        const bassNotes = [
            currentRoot, currentRoot, currentRoot * 2, currentRoot,
            currentRoot * 1.5, currentRoot, currentRoot * 2, currentRoot * 1.25,
            currentRoot, currentRoot, currentRoot * 2, currentRoot,
            currentRoot * 1.33, currentRoot, currentRoot * 1.5, currentRoot * 1.2
        ];
        const bassFreq = bassNotes[step16];
        if (bassFreq) {
            this.synthSawBass(bassFreq, time, 0.11, 850 + Math.sin(time * 0.8) * 350);
        }

        // 2. Drums: 4-on-the-Floor Kick, High-Pass Snare on 4 & 12, Ticking 16th Hats
        if (step16 === 0 || step16 === 4 || step16 === 8 || step16 === 12) {
            this.synthKick(time);
        }
        if (step16 === 4 || step16 === 12) {
            this.synthSnare(time);
        }
        // Hi-Hats on every 16th, slightly louder on upbeats (2, 6, 10, 14)
        const open = (step16 === 2 || step16 === 6 || step16 === 10 || step16 === 14);
        this.synthHiHat(time, open);

        // 3. Lush Background Pad Chords (Trigger on step 0 of each bar)
        if (step16 === 0) {
            const padChords = [
                [this.notes.D3, this.notes.F3, this.notes.A3],   // Dm
                [this.notes.Bb2, this.notes.D3, this.notes.F3],  // Bb
                [this.notes.F3, this.notes.A3, this.notes.C4],   // F
                [this.notes.C3, this.notes.E3, this.notes.G3]    // C
            ];
            const currentChord = padChords[chordIndex];
            if (currentChord) {
                this.synthPadChord(currentChord, time, 2.0);
            }
        }
    }

    // --- TRACK 2: Combat Theme ("Intrusion Alarm") ---
    // 138 BPM, Aggressive Syncopated Saw Bass & Urgent Arpeggio Lead
    scheduleCombatStep(step, time) {
        const step16 = step % 16;
        const currentRoot = (this.currentMeasure % 2 === 0) ? this.notes.D2 : this.notes.A1;

        // 1. Driving Aggressive Bassline
        const combatBass = [
            currentRoot, currentRoot, currentRoot, currentRoot * 2,
            currentRoot, currentRoot, currentRoot * 1.5, currentRoot,
            currentRoot * 1.33, currentRoot, currentRoot, currentRoot * 2,
            currentRoot * 1.5, currentRoot * 1.33, currentRoot * 1.2, currentRoot
        ];
        this.synthSawBass(combatBass[step16], time, 0.09, 1400, 6.0);

        // 2. High-Octane Drums
        if (step16 === 0 || step16 === 6 || step16 === 8 || step16 === 14) {
            this.synthKick(time, 180, 40);
        }
        if (step16 === 4 || step16 === 12) {
            this.synthSnare(time, 0.16);
        }
        this.synthHiHat(time, step16 % 2 === 1);

        // 3. Tense Lead Arpeggio (D Minor Infiltration Motif)
        const leadArp = [
            this.notes.D4, this.notes.F4, this.notes.A4, this.notes.D5,
            this.notes.C5, this.notes.A4, this.notes.G4, this.notes.F4,
            this.notes.E4, this.notes.F4, this.notes.A4, this.notes.C5,
            this.notes.D5, this.notes.F5, this.notes.E5, this.notes.C5
        ];
        if (step16 % 2 === 0) {
            this.synthLeadNote(leadArp[step16], time, 0.12);
        }
    }

    // --- TRACK 3: Boss Encounter Theme ("Titan Mainframe Override") ---
    // 144 BPM, Heavy Industrial Resonance, Dramatic Octave Leaps
    scheduleBossStep(step, time) {
        const step16 = step % 16;
        const subRoot = this.notes.D1;

        // Sub-bass heavy stabs with octave leaps
        if (step16 === 0 || step16 === 3 || step16 === 6 || step16 === 10 || step16 === 12) {
            const freq = (step16 === 6 || step16 === 12) ? subRoot * 2 : subRoot;
            this.synthSawBass(freq, time, 0.18, 2200, 8.0);
        }

        // Heavy industrial distorted kick
        if (step16 === 0 || step16 === 4 || step16 === 8 || step16 === 12) {
            this.synthKick(time, 220, 30);
        }
        // Resonant metallic snare on 4, 10, 12
        if (step16 === 4 || step16 === 10 || step16 === 12) {
            this.synthSnare(time, 0.22);
        }
        this.synthHiHat(time, step16 % 2 === 0);

        // Dramatic dissonant alarm horns on step 0 and 8
        if (step16 === 0 || step16 === 8) {
            this.synthLeadNote(this.notes.D5, time, 0.35, 'sawtooth');
            this.synthLeadNote(this.notes.Bb4, time + 0.05, 0.30, 'sawtooth');
        }
    }

    // ======================================================================
    // 3. Procedural Instrument Synthesis Routines
    // ======================================================================
    synthKick(time, startFreq = 150, endFreq = 35) {
        if (!this.ctx || this.musicMuted) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(startFreq, time);
        osc.frequency.exponentialRampToValueAtTime(endFreq, time + 0.08);

        gain.gain.setValueAtTime(0.85, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

        osc.connect(gain);
        gain.connect(this.musicGain);

        osc.start(time);
        osc.stop(time + 0.2);
        osc.onended = () => {
            try { osc.disconnect(); gain.disconnect(); } catch (e) {}
        };
    }

    synthSnare(time, duration = 0.14) {
        if (!this.ctx || !this.noiseBuffer || this.musicMuted) return;

        // High-pass filtered noise burst
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1000, time);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.45, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.musicGain);

        // Subtle low tonal punch
        const tone = this.ctx.createOscillator();
        const toneGain = this.ctx.createGain();
        tone.type = 'triangle';
        tone.frequency.setValueAtTime(180, time);
        tone.frequency.exponentialRampToValueAtTime(70, time + 0.06);

        toneGain.gain.setValueAtTime(0.35, time);
        toneGain.gain.exponentialRampToValueAtTime(0.001, time + 0.07);

        tone.connect(toneGain);
        toneGain.connect(this.musicGain);

        noise.start(time);
        noise.stop(time + duration);
        tone.start(time);
        tone.stop(time + 0.08);

        noise.onended = () => {
            try { noise.disconnect(); filter.disconnect(); gain.disconnect(); } catch (e) {}
        };
        tone.onended = () => {
            try { tone.disconnect(); toneGain.disconnect(); } catch (e) {}
        };
    }

    synthHiHat(time, open = false) {
        if (!this.ctx || !this.noiseBuffer || this.musicMuted) return;

        const noise = this.ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(7500, time);

        const gain = this.ctx.createGain();
        const duration = open ? 0.12 : 0.035;
        const volume = open ? 0.22 : 0.12;

        gain.gain.setValueAtTime(volume, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.musicGain);

        noise.start(time);
        noise.stop(time + duration);
        noise.onended = () => {
            try { noise.disconnect(); filter.disconnect(); gain.disconnect(); } catch (e) {}
        };
    }

    synthSawBass(freq, time, duration = 0.11, cutoff = 900, q = 3.5) {
        if (!this.ctx || this.musicMuted) return;

        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'lowpass';
        filter.Q.setValueAtTime(q, time);
        filter.frequency.setValueAtTime(cutoff, time);
        filter.frequency.exponentialRampToValueAtTime(280, time + duration);

        gain.gain.setValueAtTime(0.42, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.musicGain);

        osc.start(time);
        osc.stop(time + duration);
        osc.onended = () => {
            try { osc.disconnect(); filter.disconnect(); gain.disconnect(); } catch (e) {}
        };
    }

    synthPadChord(freqArray, time, duration = 2.0) {
        if (!this.ctx || this.musicMuted) return;

        freqArray.forEach((freq, idx) => {
            // Dual detuned oscillators for lush spatial chorus
            [-3, 3].forEach(detuneCents => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, time);
                osc.detune.setValueAtTime(detuneCents, time);

                // Gentle swelling attack and slow release
                gain.gain.setValueAtTime(0.001, time);
                gain.gain.linearRampToValueAtTime(0.06 / (freqArray.length * 2), time + 0.4);
                gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

                osc.connect(gain);
                gain.connect(this.musicGain);

                osc.start(time);
                osc.stop(time + duration);
                osc.onended = () => {
                    try { osc.disconnect(); gain.disconnect(); } catch (e) {}
                };
            });
        });
    }

    synthLeadNote(freq, time, duration = 0.14, oscType = 'triangle') {
        if (!this.ctx || this.musicMuted) return;

        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = oscType;
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2400, time);
        filter.Q.setValueAtTime(4.0, time);

        gain.gain.setValueAtTime(0.25, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.musicGain);

        osc.start(time);
        osc.stop(time + duration);
        osc.onended = () => {
            try { osc.disconnect(); filter.disconnect(); gain.disconnect(); } catch (e) {}
        };
    }

    // ======================================================================
    // 4. Comprehensive Procedural SFX Library
    // ======================================================================

    // sfxPing(): Crystalline sine resonance at 880 Hz with quick decay (ICMP ping)
    sfxPing() {
        if (!this.ensureContext() || this.sfxMuted) return;
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const oscHarmonic = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now); // A5

        oscHarmonic.type = 'sine';
        oscHarmonic.frequency.setValueAtTime(1760, now); // A6 overtone

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

        osc.connect(gain);
        oscHarmonic.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        oscHarmonic.start(now);
        osc.stop(now + 0.35);
        oscHarmonic.stop(now + 0.35);
    }

    // Alias for ICMP ping SFX
    sfxIcmpPing() {
        this.sfxPing();
    }

    // sfxDash(): Filtered white noise whoosh with exponential pitch drop (high-throughput burst)
    sfxDash() {
        if (!this.ensureContext() || this.sfxMuted || !this.noiseBuffer) return;
        const now = this.ctx.currentTime;

        const noise = this.ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.Q.setValueAtTime(3.0, now);
        filter.frequency.setValueAtTime(1400, now);
        filter.frequency.exponentialRampToValueAtTime(180, now + 0.3);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.45, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);

        noise.start(now);
        noise.stop(now + 0.33);
    }

    // sfxHit(): Distorted square wave crunch with frequency dive (packet corruption damage)
    sfxHit() {
        if (!this.ensureContext() || this.sfxMuted) return;
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.22);

        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.25);
    }

    // sfxLaser(): Resonant downward chirp (firewall laser barrier)
    sfxLaser() {
        if (!this.ensureContext() || this.sfxMuted) return;
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1900, now);
        osc.frequency.exponentialRampToValueAtTime(240, now + 0.18);

        filter.type = 'lowpass';
        filter.Q.setValueAtTime(8.0, now);
        filter.frequency.setValueAtTime(2800, now);
        filter.frequency.exponentialRampToValueAtTime(300, now + 0.18);

        gain.gain.setValueAtTime(0.38, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.22);
    }

    // sfxAccessGranted(): Uplifting 4-note major chord arpeggio (C5 -> E5 -> G5 -> C6) for correct technical hacks
    sfxAccessGranted() {
        if (!this.ensureContext() || this.sfxMuted) return;
        const now = this.ctx.currentTime;
        const chord = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

        chord.forEach((freq, idx) => {
            const noteTime = now + idx * 0.08;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, noteTime);

            gain.gain.setValueAtTime(0.32, noteTime);
            gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.28);

            osc.connect(gain);
            gain.connect(this.sfxGain);

            osc.start(noteTime);
            osc.stop(noteTime + 0.3);
        });
    }

    // sfxAccessDenied(): Low harsh dissonant sawtooth buzz (incorrect technical answers)
    sfxAccessDenied() {
        if (!this.ensureContext() || this.sfxMuted) return;
        const now = this.ctx.currentTime;

        // Dissonant minor second / tritone cluster
        [110.0, 116.5].forEach(freq => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0.4, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

            osc.connect(gain);
            gain.connect(this.sfxGain);

            osc.start(now);
            osc.stop(now + 0.28);
        });
    }

    // sfxBossRoar(): Low-frequency sub-bass rumbler with pitch bend
    sfxBossRoar() {
        if (!this.ensureContext() || this.sfxMuted) return;
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(55, now);
        osc.frequency.linearRampToValueAtTime(28, now + 0.7);

        gain.gain.setValueAtTime(0.55, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.8);
    }

    // sfxPacketRoute(): Subtle high-frequency blip for packet hop routing
    sfxPacketRoute() {
        if (!this.ensureContext() || this.sfxMuted) return;
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.06);
    }

    // sfxDnsChirp(): Cascading dual chirp pulse (DNS iterative/recursive resolution hop)
    sfxDnsChirp() {
        if (!this.ensureContext() || this.sfxMuted) return;
        const now = this.ctx.currentTime;
        [1100, 1650].forEach((freq, idx) => {
            const t = now + idx * 0.06;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, t);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.35, t + 0.08);
            gain.gain.setValueAtTime(0.3, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
            osc.connect(gain);
            gain.connect(this.sfxGain);
            osc.start(t);
            osc.stop(t + 0.09);
        });
    }

    // sfxHttpSuccess(): Resonant triumph chord for HTTP 200 OK
    sfxHttpSuccess() {
        this.sfxAccessGranted();
    }

    // sfxSpeechBlip(): Gentle short high-tech terminal typewriter blip for NPC dialogue
    sfxSpeechBlip(pitch = 580) {
        if (!this.ensureContext() || this.sfxMuted) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Slight randomized micro-pitch variation for natural retro terminal feel
        const jitter = (Math.random() - 0.5) * 40;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(pitch + jitter, now);
        osc.frequency.exponentialRampToValueAtTime((pitch + jitter) * 1.15, now + 0.03);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.04);
    }

    // sfxCodexOpen(): Atmospheric digital holographic boot chime for Neural Codex library
    sfxCodexOpen() {
        if (!this.ensureContext() || this.sfxMuted) return;
        const now = this.ctx.currentTime;
        // Holographic boot chime triad: E5 (659.25 Hz), G#5 (830.61 Hz), B5 (987.77 Hz), E6 (1318.51 Hz)
        const notes = [659.25, 830.61, 987.77, 1318.51];
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const t = now + idx * 0.045;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, t);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.02, t + 0.35);

            gain.gain.setValueAtTime(0.16, t);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);

            osc.connect(gain);
            gain.connect(this.sfxGain);

            osc.start(t);
            osc.stop(t + 0.45);
        });
    }

    // ======================================================================
    // 5. HUD Sync & DOM Controls
    // ======================================================================
    updateHUDMusicButton() {
        if (typeof document === 'undefined') return;
        const label = document.getElementById('music-btn-label');
        const btn = document.getElementById('btn-music');
        if (label) {
            label.innerText = this.musicMuted ? '🎵 MUSIC: OFF' : '🎵 MUSIC: ON';
        }
        if (btn) {
            btn.classList.toggle('active', !this.musicMuted);
            btn.classList.toggle('magenta', !this.musicMuted);
        }
    }

    updateHUDSfxButton() {
        if (typeof document === 'undefined') return;
        const label = document.getElementById('sfx-btn-label');
        const btn = document.getElementById('btn-sfx');
        if (label) {
            label.innerText = this.sfxMuted ? '🔇 SFX: OFF' : '🔊 SFX: ON';
        }
        if (btn) {
            btn.classList.toggle('active', !this.sfxMuted);
        }
    }
}

// Global Export Singleton
const audioInstance = new CyberAudioEngine();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.CyberAudio = audioInstance;
    window.GridEngine.CyberAudioEngine = CyberAudioEngine;
    window.CyberAudio = audioInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CyberAudioEngine, CyberAudio: audioInstance };
}
