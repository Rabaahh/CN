// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// ModulationMinigame.js - Interactive Digital-to-Analog Carrier Modulation Console
// KTU Module 4 Question 15(a): ASK, FSK & PSK Waveform Synthesis & Bandwidth Laws
// ==========================================================================

class ModulationMinigame {
    constructor() {
        this.isOpen = false;
        this.isSolved = false;

        // Input Bitstream from KTU Model Paper Q15a
        this.bits = ['1', '0', '1', '1', '0'];

        // Active Selected Modulation Mode: 0 = ASK, 1 = FSK, 2 = PSK
        this.activeMode = 0;
        this.modeNames = [
            'MODE 1: ASK (Amplitude Shift Keying)',
            'MODE 2: FSK (Frequency Shift Keying)',
            'MODE 3: PSK (Phase Shift Keying)'
        ];

        // ------------------------------------------------------------------
        // Mode 1: ASK Player Tuning Parameters
        // Rule: Peak amplitude varies with bit value; frequency and phase constant.
        // Bit 1 -> High Amplitude (Target: 1.0)
        // Bit 0 -> Low / Zero Amplitude (Target: 0.0, On-Off Keying OOK)
        // ------------------------------------------------------------------
        this.askAmp1 = 0.5; // Options: [0.3, 0.5, 0.8, 1.0] (Target: 1.0)
        this.askAmp0 = 0.4; // Options: [0.0, 0.2, 0.4, 0.6] (Target: 0.0)
        this.targetAsk = { amp1: 1.0, amp0: 0.0 };

        // ------------------------------------------------------------------
        // Mode 2: FSK Player Tuning Parameters
        // Rule: Carrier frequency switches between two values; amplitude and phase constant.
        // Bit 1 -> High Frequency (Target: 2 cycles/bit)
        // Bit 0 -> Low Frequency (Target: 1 cycle/bit)
        // ------------------------------------------------------------------
        this.fskFreq1 = 1; // Options: [1, 2, 3, 4] cycles/bit (Target: 2)
        this.fskFreq0 = 2; // Options: [1, 2, 3, 4] cycles/bit (Target: 1)
        this.targetFsk = { freq1: 2, freq0: 1 };

        // ------------------------------------------------------------------
        // Mode 3: PSK Player Tuning Parameters (BPSK)
        // Rule: Phase reverses by 180° at bit transitions / on bit 0; amplitude & freq constant.
        // Bit 1 -> Phase 0°
        // Bit 0 -> Phase 180° (π radians)
        // ------------------------------------------------------------------
        this.pskPhaseShift = 0; // Options: [0, 90, 180, 270] degrees (Target: 180)
        this.targetPsk = { phaseShift: 180 };

        // Status & Evaluation Feedback
        this.evaluationMessage = 'CALIBRATE CARRIER MODULATION (ASK, FSK, PSK) FOR BITSTREAM 1 0 1 1 0';
        this.awardedMarks = 0; // Out of 5.0 (+3 for waveforms, +2 for bandwidth laws)
        this.isModeCalibrated = [false, false, false];

        // Cheatsheet Intel Panel
        this.showIntel = false;

        // UI Layout bounding boxes for mouse interaction
        this.uiBounds = {
            modalX: 160,
            modalY: 50,
            modalW: 960,
            modalH: 620,
            closeBtn: { x: 1060, y: 65, w: 40, h: 32 },
            tabBtns: [
                { x: 190, y: 135, w: 230, h: 32 },
                { x: 435, y: 135, w: 230, h: 32 },
                { x: 680, y: 135, w: 230, h: 32 }
            ],
            askControls: {
                amp1Btn: { x: 200, y: 475, w: 180, h: 30 },
                amp0Btn: { x: 395, y: 475, w: 180, h: 30 }
            },
            fskControls: {
                freq1Btn: { x: 200, y: 475, w: 180, h: 30 },
                freq0Btn: { x: 395, y: 475, w: 180, h: 30 }
            },
            pskControls: {
                phaseBtn: { x: 200, y: 475, w: 220, h: 30 }
            },
            autoBtn: { x: 590, y: 475, w: 150, h: 30 },
            submitBtn: { x: 755, y: 475, w: 170, h: 30 },
            intelBtn: { x: 940, y: 475, w: 140, h: 30 }
        };

        this.animTimer = 0;
    }

    open() {
        this.isOpen = true;
        this.evaluationMessage = 'CALIBRATE ALL 3 CARRIER MODULATION SCHEMES FOR BITSTREAM 1 0 1 1 0';
        this.validateCurrentSettings(false);
        console.log('[ModulationMinigame] Terminal opened.');
    }

    close() {
        this.isOpen = false;
        console.log('[ModulationMinigame] Terminal closed.');
    }

    // Toggle options cyclically
    cycleAskAmp1() {
        const opts = [0.3, 0.5, 0.8, 1.0];
        const idx = opts.indexOf(this.askAmp1);
        this.askAmp1 = opts[(idx + 1) % opts.length];
        this.playClickSfx();
        this.validateCurrentSettings(false);
    }

    cycleAskAmp0() {
        const opts = [0.0, 0.2, 0.4, 0.6];
        const idx = opts.indexOf(this.askAmp0);
        this.askAmp0 = opts[(idx + 1) % opts.length];
        this.playClickSfx();
        this.validateCurrentSettings(false);
    }

    cycleFskFreq1() {
        const opts = [1, 2, 3, 4];
        const idx = opts.indexOf(this.fskFreq1);
        this.fskFreq1 = opts[(idx + 1) % opts.length];
        this.playClickSfx();
        this.validateCurrentSettings(false);
    }

    cycleFskFreq0() {
        const opts = [1, 2, 3, 4];
        const idx = opts.indexOf(this.fskFreq0);
        this.fskFreq0 = opts[(idx + 1) % opts.length];
        this.playClickSfx();
        this.validateCurrentSettings(false);
    }

    cyclePskPhase() {
        const opts = [0, 90, 180, 270];
        const idx = opts.indexOf(this.pskPhaseShift);
        this.pskPhaseShift = opts[(idx + 1) % opts.length];
        this.playClickSfx();
        this.validateCurrentSettings(false);
    }

    playClickSfx() {
        if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxPing === 'function') {
            window.CyberAudio.sfxPing();
        }
    }

    autoCalibrate() {
        this.askAmp1 = 1.0;
        this.askAmp0 = 0.0;
        this.fskFreq1 = 2;
        this.fskFreq0 = 1;
        this.pskPhaseShift = 180;
        this.playClickSfx();
        this.validateCurrentSettings(false);
        this.evaluationMessage = 'AUTO-CALIBRATION LOADED // PRESS [SUBMIT CALIBRATION] TO CERTIFY';
    }

    validateCurrentSettings(isSubmit = false) {
        const askOk = (this.askAmp1 === this.targetAsk.amp1 && this.askAmp0 === this.targetAsk.amp0);
        const fskOk = (this.fskFreq1 === this.targetFsk.freq1 && this.fskFreq0 === this.targetFsk.freq0);
        const pskOk = (this.pskPhaseShift === this.targetPsk.phaseShift);

        this.isModeCalibrated = [askOk, fskOk, pskOk];

        let marks = 0;
        if (askOk) marks += 1.6;
        if (fskOk) marks += 1.7;
        if (pskOk) marks += 1.7;
        this.awardedMarks = Math.min(5, Math.round(marks));

        if (askOk && fskOk && pskOk) {
            this.evaluationMessage = 'PERFECT CARRIER MODULATION! ALL 3 MODES MATCH KTU VALUATION SCHEME (+5 MARKS)!';
            if (isSubmit && !this.isSolved) {
                this.isSolved = true;
                if (typeof window !== 'undefined' && window.GameState && typeof window.GameState.addMarks === 'function') {
                    window.GameState.addMarks(5);
                }
                if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxAccessGranted === 'function') {
                    window.CyberAudio.sfxAccessGranted();
                }
            }
            return true;
        } else {
            if (isSubmit) {
                const missing = [];
                if (!askOk) missing.push('ASK (1.0 vs 0.0 Amp)');
                if (!fskOk) missing.push('FSK (2 vs 1 Cycles)');
                if (!pskOk) missing.push('PSK (180° Phase Reversal)');
                this.evaluationMessage = `CALIBRATION INCOMPLETE! MISMATCH: [${missing.join(', ')}]. VALUATION: +${this.awardedMarks}/5 MARKS.`;
                if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxAccessDenied === 'function') {
                    window.CyberAudio.sfxAccessDenied();
                }
            }
            return false;
        }
    }

    handleInput(input) {
        if (!this.isOpen || !input) return;

        // Escape or E key to close
        if (input.isJustPressed('escape') || input.isJustPressed('e')) {
            this.close();
            return;
        }

        // 1, 2, 3 or Tab to switch mode
        if (input.isJustPressed('1')) this.activeMode = 0;
        if (input.isJustPressed('2')) this.activeMode = 1;
        if (input.isJustPressed('3')) this.activeMode = 2;
        if (input.isJustPressed('tab') || input.isJustPressed('q')) {
            this.activeMode = (this.activeMode + 1) % 3;
            this.playClickSfx();
        }

        // Enter to submit
        if (input.isJustPressed('enter')) {
            this.validateCurrentSettings(true);
        }

        // I key for intel cheatsheet
        if (input.isJustPressed('i')) {
            this.showIntel = !this.showIntel;
            this.playClickSfx();
        }

        // A key for auto-calibrate
        if (input.isJustPressed('a')) {
            this.autoCalibrate();
        }

        // Mouse click handler
        if (input.mouse && input.mouse.leftJustPressed) {
            const mx = input.mouse.screenX;
            const my = input.mouse.screenY;
            this.handleClick(mx, my);
        }
    }

    handleClick(mx, my) {
        // 1. Close button
        const cb = this.uiBounds.closeBtn;
        if (mx >= cb.x && mx <= cb.x + cb.w && my >= cb.y && my <= cb.y + cb.h) {
            this.close();
            return;
        }

        // 2. Mode Tab Buttons
        this.uiBounds.tabBtns.forEach((tab, idx) => {
            if (mx >= tab.x && mx <= tab.x + tab.w && my >= tab.y && my <= tab.y + tab.h) {
                this.activeMode = idx;
                this.playClickSfx();
            }
        });

        // 3. Mode Specific Parameter Buttons
        if (this.activeMode === 0) {
            const a1 = this.uiBounds.askControls.amp1Btn;
            const a0 = this.uiBounds.askControls.amp0Btn;
            if (mx >= a1.x && mx <= a1.x + a1.w && my >= a1.y && my <= a1.y + a1.h) {
                this.cycleAskAmp1();
            } else if (mx >= a0.x && mx <= a0.x + a0.w && my >= a0.y && my <= a0.y + a0.h) {
                this.cycleAskAmp0();
            }
        } else if (this.activeMode === 1) {
            const f1 = this.uiBounds.fskControls.freq1Btn;
            const f0 = this.uiBounds.fskControls.freq0Btn;
            if (mx >= f1.x && mx <= f1.x + f1.w && my >= f1.y && my <= f1.y + f1.h) {
                this.cycleFskFreq1();
            } else if (mx >= f0.x && mx <= f0.x + f0.w && my >= f0.y && my <= f0.y + f0.h) {
                this.cycleFskFreq0();
            }
        } else if (this.activeMode === 2) {
            const p = this.uiBounds.pskControls.phaseBtn;
            if (mx >= p.x && mx <= p.x + p.w && my >= p.y && my <= p.y + p.h) {
                this.cyclePskPhase();
            }
        }

        // 4. Auto-Calibrate Button
        const ab = this.uiBounds.autoBtn;
        if (mx >= ab.x && mx <= ab.x + ab.w && my >= ab.y && my <= ab.y + ab.h) {
            this.autoCalibrate();
            return;
        }

        // 5. Submit Button
        const sb = this.uiBounds.submitBtn;
        if (mx >= sb.x && mx <= sb.x + sb.w && my >= sb.y && my <= sb.y + sb.h) {
            this.validateCurrentSettings(true);
            return;
        }

        // 6. Intel Button
        const ib = this.uiBounds.intelBtn;
        if (mx >= ib.x && mx <= ib.x + ib.w && my >= ib.y && my <= ib.y + ib.h) {
            this.showIntel = !this.showIntel;
            this.playClickSfx();
            return;
        }
    }

    // ======================================================================
    // Render Oscilloscope Console Modal
    // ======================================================================
    render(ctx) {
        if (!this.isOpen) return;
        this.animTimer += 0.016;

        const b = this.uiBounds;

        ctx.save();

        // 1. Fullscreen Backdrop Dimmer
        ctx.fillStyle = 'rgba(2, 6, 16, 0.88)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // 2. Oscilloscope Chassis Outer Box
        ctx.fillStyle = 'rgba(6, 12, 28, 0.98)';
        ctx.fillRect(b.modalX, b.modalY, b.modalW, b.modalH);

        // Outer Neon Glow Border
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 18;
        ctx.strokeRect(b.modalX, b.modalY, b.modalW, b.modalH);
        ctx.shadowBlur = 0;

        // Inner Bezel Line
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.modalX + 6, b.modalY + 6, b.modalW - 12, b.modalH - 12);

        // Header Title Banner
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 15px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('⚡ CARRIER MODULATION CONSOLE // KTU MODEL PAPER Q15(a)', b.modalX + 22, b.modalY + 36);

        ctx.fillStyle = '#ffaa00';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.fillText('DIGITAL-TO-ANALOG CONVERSION | BITSTREAM: [ 1  0  1  1  0 ] | VALUATION: +5 MARKS', b.modalX + 22, b.modalY + 56);

        // Close Button [X]
        const cb = b.closeBtn;
        ctx.fillStyle = 'rgba(255, 34, 85, 0.2)';
        ctx.fillRect(cb.x, cb.y, cb.w, cb.h);
        ctx.strokeStyle = '#ff2255';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(cb.x, cb.y, cb.w, cb.h);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('✕ [ESC]', cb.x + cb.w / 2, cb.y + 21);

        // 3. Mode Selection Tabs
        b.tabBtns.forEach((tab, idx) => {
            const isSelected = (this.activeMode === idx);
            const isCalibrated = this.isModeCalibrated[idx];

            ctx.fillStyle = isSelected ? 'rgba(0, 229, 255, 0.25)' : 'rgba(10, 20, 40, 0.8)';
            ctx.fillRect(tab.x, tab.y, tab.w, tab.h);

            ctx.strokeStyle = isSelected ? '#00e5ff' : (isCalibrated ? '#00ff88' : 'rgba(0, 229, 255, 0.4)');
            ctx.lineWidth = isSelected ? 2 : 1;
            ctx.strokeRect(tab.x, tab.y, tab.w, tab.h);

            ctx.fillStyle = isSelected ? '#ffffff' : (isCalibrated ? '#00ff88' : '#88aacc');
            ctx.font = 'bold 11px "Fira Code", monospace';
            ctx.textAlign = 'center';
            const check = isCalibrated ? ' ✓' : '';
            ctx.fillText(this.modeNames[idx] + check, tab.x + tab.w / 2, tab.y + 20);
        });

        // 4. Oscilloscope Screen Box (Vector CRT Display)
        const scopeX = b.modalX + 30;
        const scopeY = b.modalY + 130;
        const scopeW = b.modalW - 60;
        const scopeH = 280;

        ctx.fillStyle = '#020712';
        ctx.fillRect(scopeX, scopeY, scopeW, scopeH);

        // CRT Green Grid
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.12)';
        ctx.lineWidth = 1;

        // Horizontal Grid lines
        for (let gy = scopeY; gy <= scopeY + scopeH; gy += 35) {
            ctx.beginPath();
            ctx.moveTo(scopeX, gy);
            ctx.lineTo(scopeX + scopeW, gy);
            ctx.stroke();
        }

        // Vertical Bit Delimiter Lines (5 Bits)
        const bitW = scopeW / this.bits.length;
        for (let i = 0; i <= this.bits.length; i++) {
            const gx = scopeX + i * bitW;
            ctx.strokeStyle = 'rgba(0, 229, 255, 0.28)';
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(gx, scopeY);
            ctx.lineTo(gx, scopeY + scopeH);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Bit Value Headers across top of scope
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 12px "Fira Code", monospace';
        ctx.textAlign = 'center';
        for (let i = 0; i < this.bits.length; i++) {
            const bx = scopeX + (i + 0.5) * bitW;
            ctx.fillText(`BIT ${i + 1}: [ ${this.bits[i]} ]`, bx, scopeY + 18);
        }

        // Channel Waveform Displays:
        // Ch 1 (Y: scopeY + 45): Digital Baseband Pulse
        this.renderDigitalBitstream(ctx, scopeX, scopeY + 52, bitW);

        // Ch 2 (Y: scopeY + 115): Unmodulated Reference Carrier
        this.renderReferenceCarrier(ctx, scopeX, scopeY + 120, scopeW);

        // Ch 3 (Y: scopeY + 205): Modulated Carrier Output Waveform
        this.renderModulatedWaveform(ctx, scopeX, scopeY + 210, bitW);

        // Real-time Oscilloscope Sweep Line
        const sweepX = scopeX + ((this.animTimer * 160) % scopeW);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(sweepX, scopeY);
        ctx.lineTo(sweepX, scopeY + scopeH);
        ctx.stroke();

        // 5. Parameter Adjustment Controls Area
        this.renderParameterControls(ctx, b);

        // 6. Formula & Evaluation Feedback Bar
        const barY = b.modalY + 525;
        const barW = b.modalW - 60;
        const barH = 34;

        ctx.fillStyle = 'rgba(4, 10, 24, 0.95)';
        ctx.fillRect(scopeX, barY, barW, barH);
        ctx.strokeStyle = (this.isSolved || (this.isModeCalibrated[0] && this.isModeCalibrated[1] && this.isModeCalibrated[2])) ? '#00ff88' : '#ffaa00';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(scopeX, barY, barW, barH);

        ctx.fillStyle = (this.isSolved || (this.isModeCalibrated[0] && this.isModeCalibrated[1] && this.isModeCalibrated[2])) ? '#00ff88' : '#ffffff';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(this.evaluationMessage, scopeX + barW / 2, barY + 22);

        // 7. Footer Status Bar
        ctx.fillStyle = '#88aacc';
        ctx.font = '10px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('CONTROLS: [1/2/3/TAB] SELECT MODE | [CLICK BUTTONS] TUNE | [A] AUTO-CALIBRATE | [ENTER] SUBMIT', b.modalX + 30, b.modalY + 590);

        ctx.textAlign = 'right';
        ctx.fillStyle = '#ffaa00';
        ctx.fillText(`KTU EXAM VALUATION: +${this.awardedMarks}/5.0 MARKS`, b.modalX + b.modalW - 30, b.modalY + 590);

        // 8. Cheatsheet Intel Modal Overlay (if toggled)
        if (this.showIntel) {
            this.renderIntelModal(ctx, b);
        }

        ctx.restore();
    }

    // Channel 1: Digital Baseband Waveform (Square Wave)
    renderDigitalBitstream(ctx, startX, centerY, bitW) {
        ctx.save();
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('CH1: DIGITAL BASEBAND (BITS)', startX + 10, centerY - 14);

        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let i = 0; i < this.bits.length; i++) {
            const b = this.bits[i];
            const x1 = startX + i * bitW;
            const x2 = x1 + bitW;
            const yLevel = (b === '1') ? centerY - 12 : centerY + 12;

            if (i === 0) {
                ctx.moveTo(x1, yLevel);
            } else {
                ctx.lineTo(x1, yLevel);
            }
            ctx.lineTo(x2, yLevel);
        }
        ctx.stroke();
        ctx.restore();
    }

    // Channel 2: Reference Carrier Sine Wave
    renderReferenceCarrier(ctx, startX, centerY, totalW) {
        ctx.save();
        ctx.fillStyle = 'rgba(0, 229, 255, 0.7)';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('CH2: ANALOG CARRIER c(t) = Ac*sin(2π*fc*t)', startX + 10, centerY - 14);

        ctx.strokeStyle = 'rgba(0, 229, 255, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();

        const cycles = 10;
        for (let px = 0; px <= totalW; px += 2) {
            const angle = (px / totalW) * (Math.PI * 2 * cycles);
            const y = centerY - Math.sin(angle) * 14;
            if (px === 0) ctx.moveTo(startX + px, y);
            else ctx.lineTo(startX + px, y);
        }
        ctx.stroke();
        ctx.restore();
    }

    // Channel 3: Modulated Output Waveform (ASK, FSK, or PSK)
    renderModulatedWaveform(ctx, startX, centerY, bitW) {
        ctx.save();

        let label = '';
        let strokeColor = '#00ff88';

        if (this.activeMode === 0) {
            label = `CH3 OUTPUT: ASK s(t) [Amp 1: ${this.askAmp1} | Amp 0: ${this.askAmp0}]`;
            strokeColor = '#ffaa00';
        } else if (this.activeMode === 1) {
            label = `CH3 OUTPUT: FSK s(t) [Freq 1: ${this.fskFreq1} cycles | Freq 0: ${this.fskFreq0} cycles]`;
            strokeColor = '#00e5ff';
        } else if (this.activeMode === 2) {
            label = `CH3 OUTPUT: PSK s(t) [Phase Shift: ${this.pskPhaseShift}° on bit '0']`;
            strokeColor = '#ff007f';
        }

        ctx.fillStyle = strokeColor;
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(label, startX + 10, centerY - 20);

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = strokeColor;
        ctx.shadowBlur = 8;
        ctx.beginPath();

        let firstPoint = true;

        for (let i = 0; i < this.bits.length; i++) {
            const b = this.bits[i];
            const xStart = startX + i * bitW;
            const xEnd = xStart + bitW;

            for (let px = xStart; px <= xEnd; px += 2) {
                const fractionInBit = (px - xStart) / bitW;
                let yVal = 0;

                if (this.activeMode === 0) {
                    // ASK: Amplitude varies
                    const amp = (b === '1') ? this.askAmp1 : this.askAmp0;
                    const angle = fractionInBit * (Math.PI * 2 * 2); // 2 carrier cycles per bit
                    yVal = amp * Math.sin(angle) * 22;
                } else if (this.activeMode === 1) {
                    // FSK: Frequency varies
                    const cycles = (b === '1') ? this.fskFreq1 : this.fskFreq0;
                    const angle = fractionInBit * (Math.PI * 2 * cycles);
                    yVal = Math.sin(angle) * 22;
                } else if (this.activeMode === 2) {
                    // PSK: Phase reversal on bit 0
                    const phaseRad = (b === '0') ? (this.pskPhaseShift * Math.PI / 180) : 0;
                    const angle = fractionInBit * (Math.PI * 2 * 2) + phaseRad;
                    yVal = Math.sin(angle) * 22;
                }

                const y = centerY - yVal;
                if (firstPoint) {
                    ctx.moveTo(px, y);
                    firstPoint = false;
                } else {
                    ctx.lineTo(px, y);
                }
            }
        }

        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.restore();
    }

    // Parameter Adjustment Controls & Action Buttons
    renderParameterControls(ctx, b) {
        ctx.save();

        if (this.activeMode === 0) {
            // ASK Controls
            const a1 = b.askControls.amp1Btn;
            ctx.fillStyle = (this.askAmp1 === this.targetAsk.amp1) ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 170, 0, 0.2)';
            ctx.fillRect(a1.x, a1.y, a1.w, a1.h);
            ctx.strokeStyle = (this.askAmp1 === this.targetAsk.amp1) ? '#00ff88' : '#ffaa00';
            ctx.strokeRect(a1.x, a1.y, a1.w, a1.h);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 10px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`AMP 1: [ ${this.askAmp1.toFixed(1)} ] (CLICK)`, a1.x + a1.w / 2, a1.y + 19);

            const a0 = b.askControls.amp0Btn;
            ctx.fillStyle = (this.askAmp0 === this.targetAsk.amp0) ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 170, 0, 0.2)';
            ctx.fillRect(a0.x, a0.y, a0.w, a0.h);
            ctx.strokeStyle = (this.askAmp0 === this.targetAsk.amp0) ? '#00ff88' : '#ffaa00';
            ctx.strokeRect(a0.x, a0.y, a0.w, a0.h);
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`AMP 0: [ ${this.askAmp0.toFixed(1)} ] (CLICK)`, a0.x + a0.w / 2, a0.y + 19);

        } else if (this.activeMode === 1) {
            // FSK Controls
            const f1 = b.fskControls.freq1Btn;
            ctx.fillStyle = (this.fskFreq1 === this.targetFsk.freq1) ? 'rgba(0, 255, 136, 0.2)' : 'rgba(0, 229, 255, 0.2)';
            ctx.fillRect(f1.x, f1.y, f1.w, f1.h);
            ctx.strokeStyle = (this.fskFreq1 === this.targetFsk.freq1) ? '#00ff88' : '#00e5ff';
            ctx.strokeRect(f1.x, f1.y, f1.w, f1.h);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 10px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`FREQ 1: [ ${this.fskFreq1}x CYCLES ]`, f1.x + f1.w / 2, f1.y + 19);

            const f0 = b.fskControls.freq0Btn;
            ctx.fillStyle = (this.fskFreq0 === this.targetFsk.freq0) ? 'rgba(0, 255, 136, 0.2)' : 'rgba(0, 229, 255, 0.2)';
            ctx.fillRect(f0.x, f0.y, f0.w, f0.h);
            ctx.strokeStyle = (this.fskFreq0 === this.targetFsk.freq0) ? '#00ff88' : '#00e5ff';
            ctx.strokeRect(f0.x, f0.y, f0.w, f0.h);
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`FREQ 0: [ ${this.fskFreq0}x CYCLES ]`, f0.x + f0.w / 2, f0.y + 19);

        } else if (this.activeMode === 2) {
            // PSK Controls
            const p = b.pskControls.phaseBtn;
            ctx.fillStyle = (this.pskPhaseShift === this.targetPsk.phaseShift) ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 0, 127, 0.2)';
            ctx.fillRect(p.x, p.y, p.w, p.h);
            ctx.strokeStyle = (this.pskPhaseShift === this.targetPsk.phaseShift) ? '#00ff88' : '#ff007f';
            ctx.strokeRect(p.x, p.y, p.w, p.h);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 10px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`PHASE SHIFT: [ ${this.pskPhaseShift}° ] (CLICK)`, p.x + p.w / 2, p.y + 19);
        }

        // Action Buttons: Auto-Calibrate, Submit, Intel
        const ab = b.autoBtn;
        ctx.fillStyle = 'rgba(0, 119, 255, 0.25)';
        ctx.fillRect(ab.x, ab.y, ab.w, ab.h);
        ctx.strokeStyle = '#0077ff';
        ctx.strokeRect(ab.x, ab.y, ab.w, ab.h);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('⚡ AUTO-TUNE [A]', ab.x + ab.w / 2, ab.y + 19);

        const sb = b.submitBtn;
        ctx.fillStyle = 'rgba(0, 255, 136, 0.25)';
        ctx.fillRect(sb.x, sb.y, sb.w, sb.h);
        ctx.strokeStyle = '#00ff88';
        ctx.strokeRect(sb.x, sb.y, sb.w, sb.h);
        ctx.fillStyle = '#00ff88';
        ctx.fillText('✓ SUBMIT [ENTER]', sb.x + sb.w / 2, sb.y + 19);

        const ib = b.intelBtn;
        ctx.fillStyle = 'rgba(255, 215, 0, 0.2)';
        ctx.fillRect(ib.x, ib.y, ib.w, ib.h);
        ctx.strokeStyle = '#ffd700';
        ctx.strokeRect(ib.x, ib.y, ib.w, ib.h);
        ctx.fillStyle = '#ffd700';
        ctx.fillText('📖 KTU INTEL [I]', ib.x + ib.w / 2, ib.y + 19);

        ctx.restore();
    }

    // KTU Scheme of Valuation & Theory Cheatsheet
    renderIntelModal(ctx, b) {
        ctx.save();
        const ix = b.modalX + 60;
        const iy = b.modalY + 60;
        const iw = b.modalW - 120;
        const ih = b.modalH - 120;

        ctx.fillStyle = 'rgba(4, 10, 24, 0.98)';
        ctx.fillRect(ix, iy, iw, ih);
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 12;
        ctx.strokeRect(ix, iy, iw, ih);
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 13px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('📖 KTU MODEL QUESTION 15(a): DIGITAL-TO-ANALOG CARRIER MODULATION', ix + 20, iy + 30);

        ctx.fillStyle = '#ffffff';
        ctx.font = '11px "Fira Code", monospace';

        const lines = [
            '1. AMPLITUDE SHIFT KEYING (ASK):',
            '   - Carrier amplitude varies with bit value; frequency and phase remain constant.',
            '   - Binary ASK (OOK): Bit 1 -> Peak amplitude A1; Bit 0 -> Amplitude A0 = 0.',
            '   - Bandwidth: B = (1 + d) * S, where S is signal rate and 0 <= d <= 1.',
            '',
            '2. FREQUENCY SHIFT KEYING (FSK):',
            '   - Carrier frequency switches between two values (f1 for 1, f0 for 0).',
            '   - Amplitude and phase remain continuous and constant.',
            '   - Bandwidth: B = 2*Δf + (1 + d) * S, where 2*Δf = |f1 - f0|.',
            '',
            '3. PHASE SHIFT KEYING (PSK / BPSK):',
            '   - Carrier phase shifts by 180° (π radians) when bit value is 0 vs 1.',
            '   - Amplitude and frequency remain constant; much less susceptible to noise than ASK.',
            '   - Bandwidth: B = (1 + d) * S (same as ASK, but superior noise immunity).',
            '',
            '[ PRESS "I" OR CLICK "KTU INTEL" TO CLOSE THIS CHEATSHEET ]'
        ];

        let lineY = iy + 65;
        lines.forEach(l => {
            if (l.startsWith('1.') || l.startsWith('2.') || l.startsWith('3.')) {
                ctx.fillStyle = '#00e5ff';
                ctx.font = 'bold 11px "Fira Code", monospace';
            } else if (l.startsWith('[ PRESS')) {
                ctx.fillStyle = '#ffaa00';
                ctx.font = 'bold 11px "Fira Code", monospace';
            } else {
                ctx.fillStyle = '#d0e0f0';
                ctx.font = '11px "Fira Code", monospace';
            }
            ctx.fillText(l, ix + 20, lineY);
            lineY += 21;
        });

        ctx.restore();
    }
}

// Global Export
const modulationMinigameInstance = new ModulationMinigame();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.ModulationMinigame = modulationMinigameInstance;
    window.ModulationMinigame = modulationMinigameInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ModulationMinigame, modulationMinigame: modulationMinigameInstance };
}
