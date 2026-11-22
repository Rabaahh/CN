// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// LineCodingMinigame.js - Interactive Oscilloscope Calibration Terminal
// KTU Exam Module 4 Question 7: NRZ-L, NRZ-I & Manchester Signal Generators
// ==========================================================================

class LineCodingMinigame {
    constructor() {
        this.isOpen = false;
        this.isSolved = false;

        // Bit stream from KTU Exam Question 7
        this.bits = ['0', '1', '0', '0', '1', '1'];

        // Channels Current Player Settings (+1 = High / +V, -1 = Low / -V)
        this.nrzL = [1, 1, 1, 1, 1, 1]; // Player can toggle each bit
        this.nrzI = [1, 1, 1, 1, 1, 1]; // Player toggles inverted levels
        this.manchester = [1, 1, 1, 1, 1, 1]; // 1: High-to-Low (0), -1: Low-to-High (1)

        // Target Canonical Waveform Patterns (KTU Scheme of Valuation)
        // NRZ-L: 0 -> +1, 1 -> -1
        this.targetNrzL = [1, -1, 1, 1, -1, -1];

        // NRZ-I: Inversion at start on '1', no change on '0' (Assume initial level = +1)
        // Bit 0 ('0'): +1
        // Bit 1 ('1'): -1
        // Bit 2 ('0'): -1
        // Bit 3 ('0'): -1
        // Bit 4 ('1'): +1
        // Bit 5 ('1'): -1
        this.targetNrzI = [1, -1, -1, -1, 1, -1];

        // Manchester: 0 -> High-to-Low (+1), 1 -> Low-to-High (-1)
        this.targetManchester = [1, -1, 1, 1, -1, -1];

        // Active Selected Channel: 0 = NRZ-L, 1 = NRZ-I, 2 = Manchester
        this.activeChannel = 0;
        this.channelNames = ['CH1: NRZ-L (Level)', 'CH2: NRZ-I (Invert on 1)', 'CH3: Manchester (Clock Sync)'];

        // Status & Evaluation Feedback
        this.evaluationMessage = 'CALIBRATE ALL 3 CHANNELS TO MATCH KTU SIGNAL SPECIFICATIONS';
        this.awardedMarks = 0; // Out of 3.0
        this.isPartiallyCorrect = [false, false, false];

        // Show Tactical Intel Cheat-Sheet Modal inside minigame
        this.showIntel = false;

        // UI Layout bounding boxes for mouse click detection
        this.uiBounds = {
            modalX: 180,
            modalY: 60,
            modalW: 920,
            modalH: 600,
            closeBtn: { x: 1040, y: 75, w: 40, h: 32 },
            tabBtns: [
                { x: 210, y: 155, w: 220, h: 32 },
                { x: 440, y: 155, w: 220, h: 32 },
                { x: 670, y: 155, w: 230, h: 32 }
            ],
            bitSlots: [], // Populated dynamically based on wave rendering
            submitBtn: { x: 740, y: 595, w: 200, h: 38 },
            intelBtn: { x: 210, y: 595, w: 200, h: 38 },
            hintBtn: { x: 430, y: 595, w: 220, h: 38 }
        };

        this.animTimer = 0;
    }

    open() {
        this.isOpen = true;
        this.evaluationMessage = 'CALIBRATE ALL 3 CHANNELS TO MATCH KTU SIGNAL SPECIFICATIONS';
        this.validateCurrentSettings(false);
        console.log('[LineCodingMinigame] Terminal opened.');
    }

    close() {
        this.isOpen = false;
        console.log('[LineCodingMinigame] Terminal closed.');
    }

    toggleBit(channelIndex, bitIndex) {
        if (channelIndex === 0) {
            this.nrzL[bitIndex] = -this.nrzL[bitIndex];
        } else if (channelIndex === 1) {
            this.nrzI[bitIndex] = -this.nrzI[bitIndex];
        } else if (channelIndex === 2) {
            this.manchester[bitIndex] = -this.manchester[bitIndex];
        }

        if (typeof window !== 'undefined' && window.CyberAudio) {
            window.CyberAudio.sfxPing();
        }

        this.validateCurrentSettings(false);
    }

    autoCalibrateChannel(channelIndex) {
        if (channelIndex === 0) {
            this.nrzL = [...this.targetNrzL];
        } else if (channelIndex === 1) {
            this.nrzI = [...this.targetNrzI];
        } else if (channelIndex === 2) {
            this.manchester = [...this.targetManchester];
        }

        if (typeof window !== 'undefined' && window.CyberAudio) {
            window.CyberAudio.sfxLaser();
        }

        this.validateCurrentSettings(false);
    }

    validateCurrentSettings(isSubmit = false) {
        let nrzLCorrect = true;
        let nrzICorrect = true;
        let manchesterCorrect = true;

        for (let i = 0; i < this.bits.length; i++) {
            if (this.nrzL[i] !== this.targetNrzL[i]) nrzLCorrect = false;
            if (this.nrzI[i] !== this.targetNrzI[i]) nrzICorrect = false;
            if (this.manchester[i] !== this.targetManchester[i]) manchesterCorrect = false;
        }

        this.isPartiallyCorrect = [nrzLCorrect, nrzICorrect, manchesterCorrect];

        let marks = 0;
        if (nrzLCorrect) marks += 1.0;
        if (nrzICorrect) marks += 1.0;
        if (manchesterCorrect) marks += 1.0;
        this.awardedMarks = marks;

        if (nrzLCorrect && nrzICorrect && manchesterCorrect) {
            this.evaluationMessage = 'PERFECT CALIBRATION! ALL 3 CHANNELS MATCH KTU VALUATION SCHEME (+3 MARKS)!';
            if (isSubmit && !this.isSolved) {
                this.isSolved = true;
                if (typeof window !== 'undefined' && window.GameState) {
                    window.GameState.addMarks(3);
                }
                if (typeof window !== 'undefined' && window.Sector1_Physical) {
                    window.Sector1_Physical.unlockBulkhead();
                }
                if (typeof window !== 'undefined' && window.CyberAudio) {
                    window.CyberAudio.sfxAccessGranted();
                }
            }
            return true;
        } else {
            if (isSubmit) {
                const missing = [];
                if (!nrzLCorrect) missing.push('NRZ-L');
                if (!nrzICorrect) missing.push('NRZ-I');
                if (!manchesterCorrect) missing.push('Manchester');
                this.evaluationMessage = `CALIBRATION INCOMPLETE! MISMATCH IN: [${missing.join(', ')}]. VALUATION: +${marks.toFixed(1)}/3.0 MARKS.`;
                if (typeof window !== 'undefined' && window.CyberAudio) {
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

        // Tab or Q to cycle channel
        if (input.isJustPressed('tab') || input.isJustPressed('q')) {
            this.activeChannel = (this.activeChannel + 1) % 3;
        }

        // 1..6 keys to toggle bit slots in active channel
        for (let i = 0; i < 6; i++) {
            if (input.isJustPressed((i + 1).toString())) {
                this.toggleBit(this.activeChannel, i);
            }
        }

        // Space or Enter to submit
        if (input.isJustPressed('enter')) {
            this.validateCurrentSettings(true);
        }

        // I key to toggle cheat-sheet intel
        if (input.isJustPressed('i')) {
            this.showIntel = !this.showIntel;
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

        // 2. Channel Tab Buttons
        this.uiBounds.tabBtns.forEach((tab, idx) => {
            if (mx >= tab.x && mx <= tab.x + tab.w && my >= tab.y && my <= tab.y + tab.h) {
                this.activeChannel = idx;
                if (typeof window !== 'undefined' && window.CyberAudio) {
                    window.CyberAudio.sfxPing();
                }
            }
        });

        // 3. Bit Slot Toggles for active channel
        this.uiBounds.bitSlots.forEach(slot => {
            if (mx >= slot.x && mx <= slot.x + slot.w && my >= slot.y && my <= slot.y + slot.h) {
                this.toggleBit(this.activeChannel, slot.bitIndex);
            }
        });

        // 4. Submit Button
        const sb = this.uiBounds.submitBtn;
        if (mx >= sb.x && mx <= sb.x + sb.w && my >= sb.y && my <= sb.y + sb.h) {
            this.validateCurrentSettings(true);
            return;
        }

        // 5. Hint / Auto-Calibrate active channel
        const hb = this.uiBounds.hintBtn;
        if (mx >= hb.x && mx <= hb.x + hb.w && my >= hb.y && my <= hb.y + hb.h) {
            this.autoCalibrateChannel(this.activeChannel);
            return;
        }

        // 6. Tactical Intel Codex toggle button
        const ib = this.uiBounds.intelBtn;
        if (mx >= ib.x && mx <= ib.x + ib.w && my >= ib.y && my <= ib.y + ib.h) {
            this.showIntel = !this.showIntel;
        }
    }

    // ======================================================================
    // Render Oscilloscope Vector UI
    // ======================================================================
    render(ctx) {
        if (!this.isOpen) return;

        this.animTimer += 0.016;

        ctx.save();

        // 1. Full Screen Dark Cyber Dimmer Overlay
        ctx.fillStyle = 'rgba(2, 4, 10, 0.88)';
        ctx.fillRect(0, 0, 1280, 720);

        const b = this.uiBounds;

        // 2. Main Terminal Window Frame
        ctx.fillStyle = '#050a16';
        ctx.fillRect(b.modalX, b.modalY, b.modalW, b.modalH);
        ctx.strokeStyle = '#00ffcc';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00ffcc';
        ctx.shadowBlur = 16;
        ctx.strokeRect(b.modalX, b.modalY, b.modalW, b.modalH);
        ctx.shadowBlur = 0;

        // 3. Terminal Header Bar
        ctx.fillStyle = '#0a162e';
        ctx.fillRect(b.modalX, b.modalY, b.modalW, 46);
        ctx.strokeStyle = 'rgba(0, 255, 204, 0.4)';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.modalX, b.modalY, b.modalW, 46);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('⚡ LINE CODING OSCILLOSCOPE // KTU PCCST501 MODULE 4 TERMINAL', b.modalX + 20, b.modalY + 28);

        // Close Button [X]
        ctx.fillStyle = '#ff2255';
        ctx.fillRect(b.closeBtn.x, b.closeBtn.y, b.closeBtn.w, b.closeBtn.h);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('✕', b.closeBtn.x + b.closeBtn.w / 2, b.closeBtn.y + 21);

        // 4. Bit Sequence Display Banner
        const bannerY = b.modalY + 58;
        ctx.fillStyle = '#061022';
        ctx.fillRect(b.modalX + 20, bannerY, b.modalW - 40, 42);
        ctx.strokeStyle = 'rgba(0, 255, 204, 0.3)';
        ctx.strokeRect(b.modalX + 20, bannerY, b.modalW - 40, 42);

        ctx.fillStyle = '#ffaa00';
        ctx.font = 'bold 12px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('TARGET BIT STREAM (KTU Q7):', b.modalX + 35, bannerY + 26);

        // Render each bit badge
        this.bits.forEach((bit, idx) => {
            const bx = b.modalX + 320 + idx * 65;
            const by = bannerY + 8;
            ctx.fillStyle = 'rgba(0, 255, 204, 0.15)';
            ctx.fillRect(bx, by, 50, 26);
            ctx.strokeStyle = '#00ffcc';
            ctx.strokeRect(bx, by, 50, 26);

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 14px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(bit, bx + 25, by + 18);
        });

        // 5. Channel Selector Tabs
        b.tabBtns.forEach((tab, idx) => {
            const isActive = (this.activeChannel === idx);
            const isCorrect = this.isPartiallyCorrect[idx];

            ctx.fillStyle = isActive ? 'rgba(0, 255, 204, 0.22)' : 'rgba(5, 15, 35, 0.8)';
            ctx.fillRect(tab.x, tab.y, tab.w, tab.h);

            ctx.strokeStyle = isActive ? '#00ffcc' : 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = isActive ? 2 : 1;
            ctx.strokeRect(tab.x, tab.y, tab.w, tab.h);

            // Channel label text
            ctx.fillStyle = isActive ? '#00ffcc' : '#a0b8d8';
            ctx.font = 'bold 11px "Fira Code", monospace';
            ctx.textAlign = 'center';
            const statusTag = isCorrect ? '✓ (+1.0M)' : '✗';
            ctx.fillText(`${this.channelNames[idx]} ${statusTag}`, tab.x + tab.w / 2, tab.y + 20);
        });

        // 6. Oscilloscope CRT Screen
        const oscX = b.modalX + 20;
        const oscY = b.modalY + 145;
        const oscW = b.modalW - 40;
        const oscH = 315;

        // Oscilloscope Screen Mesh Background
        ctx.fillStyle = '#02090f';
        ctx.fillRect(oscX, oscY, oscW, oscH);
        ctx.strokeStyle = '#00ffcc';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(oscX, oscY, oscW, oscH);

        // Vector CRT Grid Lines
        ctx.strokeStyle = 'rgba(0, 255, 204, 0.08)';
        ctx.lineWidth = 1;
        for (let gx = oscX; gx <= oscX + oscW; gx += 40) {
            ctx.beginPath();
            ctx.moveTo(gx, oscY);
            ctx.lineTo(gx, oscY + oscH);
            ctx.stroke();
        }
        for (let gy = oscY; gy <= oscY + oscH; gy += 35) {
            ctx.beginPath();
            ctx.moveTo(oscX, gy);
            ctx.lineTo(oscX + oscW, gy);
            ctx.stroke();
        }

        // Center Zero-Volt Ground Axis
        const zeroY = oscY + oscH / 2;
        ctx.strokeStyle = 'rgba(0, 255, 204, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(oscX, zeroY);
        ctx.lineTo(oscX + oscW, zeroY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Voltage labels
        ctx.fillStyle = 'rgba(0, 255, 204, 0.6)';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('+V (HIGH)', oscX + 12, zeroY - 70);
        ctx.fillText(' 0V (GND)', oscX + 12, zeroY + 4);
        ctx.fillText('-V (LOW)', oscX + 12, zeroY + 76);

        // 7. Render Active Waveform Signal & Clickable Slots
        this.renderWaveformChannels(ctx, oscX, oscY, oscW, oscH, zeroY);

        // 8. Bottom Status Feedback Banner
        const evalY = b.modalY + 475;
        const isAllCorrect = this.isPartiallyCorrect[0] && this.isPartiallyCorrect[1] && this.isPartiallyCorrect[2];
        ctx.fillStyle = isAllCorrect ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255, 170, 0, 0.12)';
        ctx.fillRect(b.modalX + 20, evalY, b.modalW - 40, 48);
        ctx.strokeStyle = isAllCorrect ? '#00ff88' : '#ffaa00';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(b.modalX + 20, evalY, b.modalW - 40, 48);

        ctx.fillStyle = isAllCorrect ? '#00ff88' : '#ffffff';
        ctx.font = 'bold 12px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(this.evaluationMessage, b.modalX + b.modalW / 2, evalY + 28);

        // 9. Interactive Action Buttons
        // Button A: Tactical Intel Cheat-Sheet [I]
        const ib = b.intelBtn;
        ctx.fillStyle = 'rgba(0, 229, 255, 0.15)';
        ctx.fillRect(ib.x, ib.y, ib.w, ib.h);
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(ib.x, ib.y, ib.w, ib.h);
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('📖 CODEX RULES [I]', ib.x + ib.w / 2, ib.y + 23);

        // Button B: Auto-Calibrate Hint
        const hb = b.hintBtn;
        ctx.fillStyle = 'rgba(255, 170, 0, 0.15)';
        ctx.fillRect(hb.x, hb.y, hb.w, hb.h);
        ctx.strokeStyle = '#ffaa00';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(hb.x, hb.y, hb.w, hb.h);
        ctx.fillStyle = '#ffaa00';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('⚡ AUTO-CALIBRATE CH', hb.x + hb.w / 2, hb.y + 23);

        // Button C: Submit & Transmit
        const sb = b.submitBtn;
        ctx.fillStyle = isAllCorrect ? 'rgba(0, 255, 136, 0.25)' : 'rgba(0, 255, 204, 0.15)';
        ctx.fillRect(sb.x, sb.y, sb.w, sb.h);
        ctx.strokeStyle = isAllCorrect ? '#00ff88' : '#00ffcc';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(sb.x, sb.y, sb.w, sb.h);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px "Fira Code", monospace';
        ctx.textAlign = 'center';
        const submitLabel = isAllCorrect ? '✓ UNLOCK GATE [ENTER]' : 'TRANSMIT SIGNAL [ENTER]';
        ctx.fillText(submitLabel, sb.x + sb.w / 2, sb.y + 24);

        // 10. Tactical Intel Modal Overlay (When toggled on)
        if (this.showIntel) {
            this.renderIntelCodex(ctx, b.modalX + 60, b.modalY + 110, b.modalW - 120, b.modalH - 180);
        }

        ctx.restore();
    }

    renderWaveformChannels(ctx, oscX, oscY, oscW, oscH, zeroY) {
        const startX = oscX + 110;
        const totalWaveW = oscW - 140;
        const slotW = totalWaveW / this.bits.length;
        const vHigh = zeroY - 70;
        const vLow = zeroY + 70;

        this.uiBounds.bitSlots = [];

        // Vertical Bit Interval Clock Boundary Lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        for (let i = 0; i <= this.bits.length; i++) {
            const bx = startX + i * slotW;
            ctx.beginPath();
            ctx.moveTo(bx, oscY + 10);
            ctx.lineTo(bx, oscY + oscH - 10);
            ctx.stroke();

            // Header bit tag
            if (i < this.bits.length) {
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 13px "Fira Code", monospace';
                ctx.textAlign = 'center';
                ctx.fillText(`Bit: ${this.bits[i]}`, bx + slotW / 2, oscY + 28);

                // Register clickable slot bounding box
                this.uiBounds.bitSlots.push({
                    bitIndex: i,
                    x: bx,
                    y: oscY + 35,
                    w: slotW,
                    h: oscH - 45
                });
            }
        }
        ctx.setLineDash([]);

        // Determine active wave levels to render
        let waveLevels = [];
        let waveColor = '#00ffcc';
        let isManchester = false;

        if (this.activeChannel === 0) {
            // NRZ-L
            waveLevels = this.nrzL;
            waveColor = '#00ffcc';
        } else if (this.activeChannel === 1) {
            // NRZ-I
            waveLevels = this.nrzI;
            waveColor = '#00e5ff';
        } else {
            // Manchester (each bit has 2 half-bit intervals!)
            isManchester = true;
            waveColor = '#ff007f';
        }

        // Draw Phosphor Vector Square Wave
        ctx.save();
        ctx.strokeStyle = waveColor;
        ctx.lineWidth = 3.5;
        ctx.shadowColor = waveColor;
        ctx.shadowBlur = 12;
        ctx.beginPath();

        let prevY = null;

        if (!isManchester) {
            for (let i = 0; i < this.bits.length; i++) {
                const x1 = startX + i * slotW;
                const x2 = x1 + slotW;
                const yLevel = (waveLevels[i] === 1) ? vHigh : vLow;

                if (i === 0) {
                    ctx.moveTo(x1, yLevel);
                } else if (prevY !== null && prevY !== yLevel) {
                    // Vertical transition line
                    ctx.lineTo(x1, yLevel);
                }

                ctx.lineTo(x2, yLevel);
                prevY = yLevel;
            }
        } else {
            // Manchester Mid-Bit Transitions
            for (let i = 0; i < this.bits.length; i++) {
                const x1 = startX + i * slotW;
                const xMid = x1 + slotW / 2;
                const x2 = x1 + slotW;

                // this.manchester[i] === 1 -> High-to-Low (0), -1 -> Low-to-High (1)
                const firstHalfY = (this.manchester[i] === 1) ? vHigh : vLow;
                const secondHalfY = (this.manchester[i] === 1) ? vLow : vHigh;

                if (i === 0) {
                    ctx.moveTo(x1, firstHalfY);
                } else if (prevY !== null && prevY !== firstHalfY) {
                    ctx.lineTo(x1, firstHalfY);
                }

                // First half interval
                ctx.lineTo(xMid, firstHalfY);
                // Mid-bit clock transition
                ctx.lineTo(xMid, secondHalfY);
                // Second half interval
                ctx.lineTo(x2, secondHalfY);
                prevY = secondHalfY;
            }
        }
        ctx.stroke();

        // Clickable interactive nodes at each bit center
        for (let i = 0; i < this.bits.length; i++) {
            const bx = startX + i * slotW + slotW / 2;
            const by = isManchester ? (oscY + oscH - 35) : ((waveLevels[i] === 1) ? vHigh : vLow);

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(bx, by, 5, 0, Math.PI * 2);
            ctx.fill();

            // Toggle Prompt under each column
            ctx.fillStyle = 'rgba(0, 255, 204, 0.7)';
            ctx.font = 'bold 10px "Fira Code", monospace';
            ctx.textAlign = 'center';
            const toggleDesc = isManchester ? (this.manchester[i] === 1 ? 'HIGH->LOW' : 'LOW->HIGH') : (waveLevels[i] === 1 ? '+V [HIGH]' : '-V [LOW]');
            ctx.fillText(toggleDesc, bx, oscY + oscH - 18);
        }

        ctx.restore();
    }

    renderIntelCodex(ctx, x, y, w, h) {
        ctx.save();
        ctx.fillStyle = '#030814';
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, w, h);

        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 13px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('📖 KTU VALUATION SCHEME: LINE CODING RULES (3 MARKS)', x + 20, y + 30);

        ctx.fillStyle = '#ffffff';
        ctx.font = '11px "Fira Code", monospace';

        const lines = [
            '1. NRZ-L (Non-Return-to-Zero Level):',
            '   - Level of signal directly reflects bit value.',
            '   - Standard KTU rule: Bit 0 = Positive (+V), Bit 1 = Negative (-V).',
            '   - For sequence "0 1 0 0 1 1": [+V, -V, +V, +V, -V, -V].',
            '',
            '2. NRZ-I (NRZ Invert):',
            '   - Inversion at the BEGINNING of interval signifies bit "1".',
            '   - NO transition signifies bit "0".',
            '   - Eliminates DC baseline wander if ones are frequent.',
            '',
            '3. Manchester (Self-Synchronizing Clock):',
            '   - Transition occurs at the EXACT MIDDLE of every bit interval.',
            '   - Bit 0: High-to-Low transition (+V to -V).',
            '   - Bit 1: Low-to-High transition (-V to +V).',
            '   - Guarantees continuous clock recovery, but requires 2x Nyquist bandwidth.',
            '',
            'CLICK ANYWHERE ON A BIT COLUMN OR PRESS [1-6] TO TOGGLE VOLTAGE LEVELS!'
        ];

        lines.forEach((l, idx) => {
            ctx.fillText(l, x + 20, y + 60 + idx * 19);
        });

        // Close Codex hint
        ctx.fillStyle = '#ffaa00';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.fillText('PRESS [I] TO CLOSE THIS CODEX', x + w / 2 - 90, y + h - 18);
        ctx.restore();
    }
}

// Global Export
const lineCodingInstance = new LineCodingMinigame();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.LineCodingMinigame = lineCodingInstance;
    window.LineCodingMinigame = lineCodingInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LineCodingMinigame, lineCoding: lineCodingInstance };
}
