// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// CapacityGate.js - The Shannon-Nyquist Capacity Forcefield Gate & Boss Encounter
// KTU Module 4: Noiseless Channel Nyquist Limit vs Noisy Channel Shannon Capacity
// ==========================================================================

class CapacityGate {
    constructor() {
        // Physical World Coordinates
        this.x = 1680;
        this.y = 360;
        this.width = 30;
        this.height = 160;
        this.interactionRadius = 95;

        // Gate States
        this.isUnlocked = false;
        this.isDissolving = false;
        this.dissolveProgress = 0; // 0..1 for disintegration animation

        // Terminal Modal States
        this.isTerminalOpen = false;
        this.activeField = 0; // 0 = Nyquist, 1 = Shannon

        // Mathematical Problems & Inputs
        // Problem 1: Nyquist limit C = 2B * log2(L) = 2 * 4000 * log2(4) = 16000 bps
        this.nyquistTarget = '16000';
        this.nyquistInput = '';
        this.isNyquistCorrect = false;

        // Problem 2: Shannon capacity C = B * log2(1 + SNR) = 4000 * log2(1 + 63) = 4000 * 6 = 24000 bps
        this.shannonTarget = '24000';
        this.shannonInput = '';
        this.isShannonCorrect = false;

        this.statusMessage = 'ENTER CALCULATED CAPACITIES TO DISSIPATE THE SHANNON-NYQUIST FORCEFIELD';

        // Boss Encounter: NYQUIST-PRIME
        this.isBossActive = false;
        this.bossStep = 0;
        this.bossDialogues = [
            {
                speaker: 'NYQUIST-PRIME [CHIEF PHYSICAL ARCHITECT]',
                text: 'SYSTEM HALT! I am NYQUIST-PRIME, guardian of the high-frequency physical substratum. Who dares cross the thermodynamic capacity boundary?',
                sub: 'ANALYZING UNIT 0xVOID DATAGRAM PACKET SPECTRUM...'
            },
            {
                speaker: 'NYQUIST-PRIME',
                text: 'ASTONISHING! You navigated copper attenuation with digital regenerators, bypassed electrical noise using optical fiber silica waveguides, and calibrated ASK/FSK/PSK waveforms.',
                sub: 'KTU MODULE 4 ARCHITECTURAL REVIEW: 100% VALUATION ACCURACY'
            },
            {
                speaker: 'NYQUIST-PRIME',
                text: 'Your channel capacity limits match the fundamental laws of physics: Nyquist noiseless limit = 16,000 bps; Shannon thermal capacity = 24,000 bps. Theoretical bandwidth certified!',
                sub: '+4 MARKS AWARDED (SECTOR 1 TOTAL: +9 MARKS // EXAM SCORE: 12 / 60 MARKS)'
            },
            {
                speaker: 'NYQUIST-PRIME',
                text: 'The physical medium is conquered. The transit elevator to Sector 2: Data Link Layer is now fully energized. Ascend, Unit 0xVOID, and claim your destiny!',
                sub: 'SECTOR 1 CLEARED // OPERATION TITAN-BREAK ADVANCING TO MODULE 3'
            }
        ];

        // UI Layout bounding boxes
        this.uiBounds = {
            modalX: 180,
            modalY: 60,
            modalW: 920,
            modalH: 580,
            closeBtn: { x: 1040, y: 75, w: 40, h: 32 },
            field1: { x: 220, y: 195, w: 420, h: 42 },
            field2: { x: 220, y: 310, w: 420, h: 42 },
            numKeys: [], // 0..9 keypad
            clearBtn: { x: 680, y: 375, w: 90, h: 42 },
            backBtn: { x: 785, y: 375, w: 90, h: 42 },
            submitBtn: { x: 680, y: 430, w: 195, h: 48 },
            hintBtn: { x: 220, y: 430, w: 420, h: 48 }
        };

        this.initKeypadBounds();
        this.animTimer = 0;
    }

    initKeypadBounds() {
        const startX = 680;
        const startY = 195;
        const btnW = 60;
        const btnH = 50;
        const gap = 10;

        this.uiBounds.numKeys = [];

        // Keys 1..9
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const num = (row * 3 + col + 1).toString();
                this.uiBounds.numKeys.push({
                    val: num,
                    x: startX + col * (btnW + gap),
                    y: startY + row * (btnH + gap),
                    w: btnW,
                    h: btnH
                });
            }
        }

        // Key 0
        this.uiBounds.numKeys.push({
            val: '0',
            x: startX + (btnW + gap),
            y: startY + 3 * (btnH + gap),
            w: btnW,
            h: btnH
        });
    }

    isNear(px, py) {
        return Math.hypot(px - this.x, py - this.y) <= this.interactionRadius;
    }

    openTerminal() {
        if (this.isUnlocked) return;
        this.isTerminalOpen = true;
        this.statusMessage = 'ENTER CALCULATED CAPACITIES TO DISSIPATE THE SHANNON-NYQUIST FORCEFIELD';
        console.log('[CapacityGate] Terminal opened.');
    }

    closeTerminal() {
        this.isTerminalOpen = false;
        console.log('[CapacityGate] Terminal closed.');
    }

    appendDigit(digit) {
        if (this.activeField === 0) {
            if (this.nyquistInput.length < 8) this.nyquistInput += digit;
        } else {
            if (this.shannonInput.length < 8) this.shannonInput += digit;
        }
        this.playBeepSfx();
    }

    backspace() {
        if (this.activeField === 0) {
            this.nyquistInput = this.nyquistInput.slice(0, -1);
        } else {
            this.shannonInput = this.shannonInput.slice(0, -1);
        }
        this.playBeepSfx();
    }

    clearActive() {
        if (this.activeField === 0) this.nyquistInput = '';
        else this.shannonInput = '';
        this.playBeepSfx();
    }

    autoFillSolutions() {
        this.nyquistInput = '16000';
        this.shannonInput = '24000';
        this.playBeepSfx();
        this.statusMessage = 'SOLUTIONS LOADED: NYQUIST = 16000 bps, SHANNON = 24000 bps. PRESS [SUBMIT].';
    }

    playBeepSfx() {
        if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxPing === 'function') {
            window.CyberAudio.sfxPing();
        }
    }

    validateCalculations() {
        this.isNyquistCorrect = (this.nyquistInput.trim() === this.nyquistTarget);
        this.isShannonCorrect = (this.shannonInput.trim() === this.shannonTarget);

        if (this.isNyquistCorrect && this.isShannonCorrect) {
            this.isUnlocked = true;
            this.isDissolving = true;
            this.isTerminalOpen = false;
            this.isBossActive = true;
            this.bossStep = 0;

            // Award 4 Marks for Nyquist & Shannon numerical calculations
            if (typeof window !== 'undefined' && window.GameState && typeof window.GameState.addMarks === 'function') {
                window.GameState.addMarks(4);
            }

            if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxAccessGranted === 'function') {
                window.CyberAudio.sfxAccessGranted();
            }

            console.log('[CapacityGate] Nyquist & Shannon calculations validated! Barrier dissolving.');
            return true;
        } else {
            const errs = [];
            if (!this.isNyquistCorrect) errs.push('Nyquist (C = 2*B*log2(L) = 2*4000*2 = 16000)');
            if (!this.isShannonCorrect) errs.push('Shannon (C = B*log2(1+SNR) = 4000*6 = 24000)');
            this.statusMessage = `INVALID DATA RATE! ERROR IN: [${errs.join(', ')}]`;

            if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxAccessDenied === 'function') {
                window.CyberAudio.sfxAccessDenied();
            }
            return false;
        }
    }

    update(dt, player, particles) {
        this.animTimer += dt;

        // Forcefield Barrier Disintegration Animation
        if (this.isDissolving) {
            this.dissolveProgress += dt * 0.8;
            if (particles && Math.random() < 0.6) {
                particles.emitPacketDischarge(this.x, this.y + (Math.random() * this.height - this.height / 2), '#00ffcc', 15);
            }
            if (this.dissolveProgress >= 1.0) {
                this.isDissolving = false;
                this.dissolveProgress = 1.0;
            }
        }

        // Physical barrier collision: Prevent player from passing X: 1680 until gate is unlocked
        if (!this.isUnlocked && player && player.x >= this.x - 24 && player.x <= this.x + 30) {
            player.x = this.x - 24;
            player.vx = 0;
        }
    }

    handleInput(input) {
        // If Boss Encounter Dialogue is active
        if (this.isBossActive) {
            if (input.isJustPressed(' ') || input.isJustPressed('enter') || (input.mouse && input.mouse.leftJustPressed)) {
                this.advanceBossDialogue();
            }
            return;
        }

        if (!this.isTerminalOpen || !input) return;

        // Escape or E to close
        if (input.isJustPressed('escape') || input.isJustPressed('e')) {
            this.closeTerminal();
            return;
        }

        // Tab or Arrow Up/Down to switch between Nyquist & Shannon fields
        if (input.isJustPressed('tab') || input.isJustPressed('arrowdown') || input.isJustPressed('arrowup')) {
            this.activeField = 1 - this.activeField;
            this.playBeepSfx();
        }

        // Enter to submit
        if (input.isJustPressed('enter')) {
            this.validateCalculations();
            return;
        }

        // Backspace
        if (input.isJustPressed('backspace')) {
            this.backspace();
        }

        // H key for auto-hint / solve
        if (input.isJustPressed('h')) {
            this.autoFillSolutions();
        }

        // Number Keys (0..9)
        for (let i = 0; i <= 9; i++) {
            if (input.isJustPressed(i.toString())) {
                this.appendDigit(i.toString());
            }
        }

        // Mouse click handler
        if (input.mouse && input.mouse.leftJustPressed) {
            const mx = input.mouse.screenX;
            const my = input.mouse.screenY;
            this.handleClick(mx, my);
        }
    }

    handleClick(mx, my) {
        const b = this.uiBounds;

        // Close button
        if (mx >= b.closeBtn.x && mx <= b.closeBtn.x + b.closeBtn.w && my >= b.closeBtn.y && my <= b.closeBtn.y + b.closeBtn.h) {
            this.closeTerminal();
            return;
        }

        // Field 1 selection (Nyquist)
        if (mx >= b.field1.x && mx <= b.field1.x + b.field1.w && my >= b.field1.y && my <= b.field1.y + b.field1.h) {
            this.activeField = 0;
            this.playBeepSfx();
        }

        // Field 2 selection (Shannon)
        if (mx >= b.field2.x && mx <= b.field2.x + b.field2.w && my >= b.field2.y && my <= b.field2.y + b.field2.h) {
            this.activeField = 1;
            this.playBeepSfx();
        }

        // Numeric Keypad
        b.numKeys.forEach(k => {
            if (mx >= k.x && mx <= k.x + k.w && my >= k.y && my <= k.y + k.h) {
                this.appendDigit(k.val);
            }
        });

        // Clear & Backspace
        if (mx >= b.clearBtn.x && mx <= b.clearBtn.x + b.clearBtn.w && my >= b.clearBtn.y && my <= b.clearBtn.y + b.clearBtn.h) {
            this.clearActive();
        }
        if (mx >= b.backBtn.x && mx <= b.backBtn.x + b.backBtn.w && my >= b.backBtn.y && my <= b.backBtn.y + b.backBtn.h) {
            this.backspace();
        }

        // Hint Auto-Fill
        if (mx >= b.hintBtn.x && mx <= b.hintBtn.x + b.hintBtn.w && my >= b.hintBtn.y && my <= b.hintBtn.y + b.hintBtn.h) {
            this.autoFillSolutions();
        }

        // Submit
        if (mx >= b.submitBtn.x && mx <= b.submitBtn.x + b.submitBtn.w && my >= b.submitBtn.y && my <= b.submitBtn.y + b.submitBtn.h) {
            this.validateCalculations();
        }
    }

    advanceBossDialogue() {
        this.bossStep++;
        this.playBeepSfx();

        if (this.bossStep >= this.bossDialogues.length) {
            this.isBossActive = false;
            // Complete Sector 1 in Global GameState
            if (typeof window !== 'undefined' && window.GameState) {
                if (typeof window.GameState.completeSector === 'function') {
                    window.GameState.completeSector(1);
                }
            }
            console.log('[CapacityGate] Boss encounter finished! Sector 1 certified.');
        }
    }

    // ======================================================================
    // Render World Elements (Forcefield & Terminal in 2D World Space)
    // ======================================================================
    renderWorld(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        const anim = this.animTimer;

        if (!this.isUnlocked) {
            // Locked Forcefield Barrier
            const alpha = 0.85 + Math.sin(anim * 8) * 0.15;

            // Plasma Forcefield Sheet
            ctx.fillStyle = `rgba(255, 170, 0, ${alpha * 0.35})`;
            ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

            // Shimmering Laser Strands
            ctx.strokeStyle = '#ffaa00';
            ctx.lineWidth = 2.5;
            ctx.shadowColor = '#ffaa00';
            ctx.shadowBlur = 16;
            ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);

            // Horizontal containment beams
            ctx.strokeStyle = '#ff2255';
            ctx.lineWidth = 1.5;
            for (let y = -this.height / 2 + 15; y < this.height / 2; y += 22) {
                ctx.beginPath();
                ctx.moveTo(-this.width / 2 + 4, y);
                ctx.lineTo(this.width / 2 - 4, y);
                ctx.stroke();
            }

            // Central Terminal Console Beacon
            ctx.fillStyle = 'rgba(4, 10, 24, 0.95)';
            ctx.fillRect(-70, -this.height / 2 - 32, 140, 24);
            ctx.strokeStyle = '#ffaa00';
            ctx.lineWidth = 1.2;
            ctx.strokeRect(-70, -this.height / 2 - 32, 140, 24);

            ctx.fillStyle = '#ffaa00';
            ctx.font = 'bold 9px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText('SHANNON-NYQUIST GATE', 0, -this.height / 2 - 17);

            // Prompt hint
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 8px "Fira Code", monospace';
            ctx.fillText('APPROACH & PRESS [E]', 0, -this.height / 2 + 8);

        } else if (this.isDissolving) {
            // Disintegrating Barrier Shockwave
            const p = this.dissolveProgress;
            ctx.strokeStyle = `rgba(0, 255, 204, ${1.0 - p})`;
            ctx.lineWidth = 4 * (1.0 - p);
            ctx.shadowColor = '#00ffcc';
            ctx.shadowBlur = 20;
            ctx.strokeRect(-this.width * (1 + p * 2), -this.height * (1 + p), this.width * 2 * (1 + p * 2), this.height * (1 + p));

        } else {
            // Open Gateway Portal to Sector 2
            ctx.strokeStyle = '#00ff88';
            ctx.lineWidth = 2;
            ctx.shadowColor = '#00ff88';
            ctx.shadowBlur = 12;

            // Gateway Pillars
            ctx.strokeRect(-18, -this.height / 2, 8, this.height);
            ctx.strokeRect(10, -this.height / 2, 8, this.height);

            // Open Passageway Light
            ctx.fillStyle = 'rgba(0, 255, 136, 0.15)';
            ctx.fillRect(-10, -this.height / 2, 20, this.height);

            ctx.fillStyle = '#00ff88';
            ctx.font = 'bold 9px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText('GATEWAY TO SECTOR 2', 0, -this.height / 2 - 12);
        }

        ctx.restore();
    }

    // ======================================================================
    // Render Modal Terminal Overlay (In 2D Screen Space)
    // ======================================================================
    renderTerminal(ctx) {
        if (!this.isTerminalOpen && !this.isBossActive) return;

        const b = this.uiBounds;
        ctx.save();

        // 1. Fullscreen Backdrop Dimmer
        ctx.fillStyle = 'rgba(2, 6, 16, 0.88)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // ------------------------------------------------------------------
        // Branch A: Boss Encounter Dialogue Modal (NYQUIST-PRIME)
        // ------------------------------------------------------------------
        if (this.isBossActive) {
            this.renderBossModal(ctx);
            ctx.restore();
            return;
        }

        // ------------------------------------------------------------------
        // Branch B: Shannon-Nyquist Keypad Calculation Modal
        // ------------------------------------------------------------------
        ctx.fillStyle = 'rgba(6, 12, 28, 0.98)';
        ctx.fillRect(b.modalX, b.modalY, b.modalW, b.modalH);

        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 16;
        ctx.strokeRect(b.modalX, b.modalY, b.modalW, b.modalH);
        ctx.shadowBlur = 0;

        // Header Title
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 15px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('⚡ SHANNON-NYQUIST CHANNEL CAPACITY TERMINAL', b.modalX + 25, b.modalY + 38);

        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.fillText('KTU PHYSICAL LAYER DATA RATE LIMITS | NUMERICAL PROBLEM 2 | VALUATION: +4 MARKS', b.modalX + 25, b.modalY + 58);

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

        // Problem 1: Nyquist Bit Rate (Noiseless)
        const f1 = b.field1;
        const isF1Active = (this.activeField === 0);
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('1. NOISELESS CHANNEL: NYQUIST BIT RATE (B = 4 kHz, L = 4 levels)', f1.x, f1.y - 18);
        ctx.fillStyle = '#88aacc';
        ctx.font = '10px "Fira Code", monospace';
        ctx.fillText('   Formula: C = 2 * B * log2(L) = 2 * 4000 * 2', f1.x, f1.y - 4);

        ctx.fillStyle = isF1Active ? 'rgba(0, 229, 255, 0.15)' : 'rgba(8, 16, 32, 0.9)';
        ctx.fillRect(f1.x, f1.y, f1.w, f1.h);
        ctx.strokeStyle = isF1Active ? '#00e5ff' : 'rgba(0, 229, 255, 0.4)';
        ctx.lineWidth = isF1Active ? 2 : 1;
        ctx.strokeRect(f1.x, f1.y, f1.w, f1.h);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px "Fira Code", monospace';
        const f1Cursor = (isF1Active && Math.sin(this.animTimer * 10) > 0) ? '█' : '';
        ctx.fillText((this.nyquistInput || 'Click / Press numbers') + f1Cursor + ' bps', f1.x + 16, f1.y + 27);

        // Problem 2: Shannon Capacity (Noisy)
        const f2 = b.field2;
        const isF2Active = (this.activeField === 1);
        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.fillText('2. NOISY CHANNEL: SHANNON CAPACITY (B = 4 kHz, SNR = 63)', f2.x, f2.y - 18);
        ctx.fillStyle = '#88aacc';
        ctx.font = '10px "Fira Code", monospace';
        ctx.fillText('   Formula: C = B * log2(1 + SNR) = 4000 * log2(64) = 4000 * 6', f2.x, f2.y - 4);

        ctx.fillStyle = isF2Active ? 'rgba(0, 255, 136, 0.15)' : 'rgba(8, 16, 32, 0.9)';
        ctx.fillRect(f2.x, f2.y, f2.w, f2.h);
        ctx.strokeStyle = isF2Active ? '#00ff88' : 'rgba(0, 255, 136, 0.4)';
        ctx.lineWidth = isF2Active ? 2 : 1;
        ctx.strokeRect(f2.x, f2.y, f2.w, f2.h);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px "Fira Code", monospace';
        const f2Cursor = (isF2Active && Math.sin(this.animTimer * 10) > 0) ? '█' : '';
        ctx.fillText((this.shannonInput || 'Click / Press numbers') + f2Cursor + ' bps', f2.x + 16, f2.y + 27);

        // Numeric Keypad
        b.numKeys.forEach(k => {
            ctx.fillStyle = 'rgba(0, 119, 255, 0.2)';
            ctx.fillRect(k.x, k.y, k.w, k.h);
            ctx.strokeStyle = '#0077ff';
            ctx.lineWidth = 1.2;
            ctx.strokeRect(k.x, k.y, k.w, k.h);

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 18px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(k.val, k.x + k.w / 2, k.y + 32);
        });

        // Clear & Backspace
        ctx.fillStyle = 'rgba(255, 34, 85, 0.2)';
        ctx.fillRect(b.clearBtn.x, b.clearBtn.y, b.clearBtn.w, b.clearBtn.h);
        ctx.strokeStyle = '#ff2255';
        ctx.strokeRect(b.clearBtn.x, b.clearBtn.y, b.clearBtn.w, b.clearBtn.h);
        ctx.fillStyle = '#ff2255';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CLEAR', b.clearBtn.x + b.clearBtn.w / 2, b.clearBtn.y + 26);

        ctx.fillStyle = 'rgba(255, 170, 0, 0.2)';
        ctx.fillRect(b.backBtn.x, b.backBtn.y, b.backBtn.w, b.backBtn.h);
        ctx.strokeStyle = '#ffaa00';
        ctx.strokeRect(b.backBtn.x, b.backBtn.y, b.backBtn.w, b.backBtn.h);
        ctx.fillStyle = '#ffaa00';
        ctx.fillText('⌫ BACK', b.backBtn.x + b.backBtn.w / 2, b.backBtn.y + 26);

        // Auto-Fill Hint Button
        ctx.fillStyle = 'rgba(255, 215, 0, 0.15)';
        ctx.fillRect(b.hintBtn.x, b.hintBtn.y, b.hintBtn.w, b.hintBtn.h);
        ctx.strokeStyle = '#ffd700';
        ctx.strokeRect(b.hintBtn.x, b.hintBtn.y, b.hintBtn.w, b.hintBtn.h);
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('💡 AUTO-CALCULATE SOLUTIONS [H]', b.hintBtn.x + b.hintBtn.w / 2, b.hintBtn.y + 28);

        // Submit Button
        ctx.fillStyle = 'rgba(0, 255, 136, 0.25)';
        ctx.fillRect(b.submitBtn.x, b.submitBtn.y, b.submitBtn.w, b.submitBtn.h);
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 1.8;
        ctx.strokeRect(b.submitBtn.x, b.submitBtn.y, b.submitBtn.w, b.submitBtn.h);
        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 13px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('✓ SUBMIT CAPACITIES', b.submitBtn.x + b.submitBtn.w / 2, b.submitBtn.y + 30);

        // Status Message Bar
        const barY = b.modalY + 505;
        ctx.fillStyle = 'rgba(4, 10, 24, 0.95)';
        ctx.fillRect(b.modalX + 25, barY, b.modalW - 50, 32);
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.modalX + 25, barY, b.modalW - 50, 32);

        ctx.fillStyle = this.statusMessage.includes('INVALID') ? '#ff2255' : '#00e5ff';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(this.statusMessage, b.modalX + b.modalW / 2, barY + 21);

        ctx.restore();
    }

    // Boss Encounter: NYQUIST-PRIME Hologram Modal
    renderBossModal(ctx) {
        const dialog = this.bossDialogues[this.bossStep] || this.bossDialogues[this.bossDialogues.length - 1];

        const bw = 840;
        const bh = 320;
        const bx = ctx.canvas.width / ((typeof window !== 'undefined' && window.devicePixelRatio) || 1) / 2 - bw / 2;
        const by = ctx.canvas.height / ((typeof window !== 'undefined' && window.devicePixelRatio) || 1) / 2 - bh / 2;

        ctx.fillStyle = 'rgba(4, 10, 24, 0.98)';
        ctx.fillRect(bx, by, bw, bh);

        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 24;
        ctx.strokeRect(bx, by, bw, bh);
        ctx.shadowBlur = 0;

        // Animated Frequency Spectrum Rings (Boss Avatar)
        const avX = bx + 95;
        const avY = by + 120;
        const anim = this.animTimer;

        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(avX, avY, 45, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([8, 8]);
        ctx.lineDashOffset = -anim * 40;
        ctx.beginPath();
        ctx.arc(avX, avY, 58, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Core Glowing Hexagon
        ctx.fillStyle = '#00e5ff';
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3 + anim;
            const hx = avX + Math.cos(angle) * 22;
            const hy = avY + Math.sin(angle) * 22;
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;

        // Dialogue Speaker Banner
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 14px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(dialog.speaker, bx + 180, by + 55);

        // Dialogue Main Text
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px "Fira Code", monospace';

        // Word wrap dialogue text across 600px width
        const words = dialog.text.split(' ');
        let line = '';
        let lineY = by + 95;
        const maxLineWidth = 600;

        words.forEach(w => {
            const testLine = line + w + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxLineWidth) {
                ctx.fillText(line, bx + 180, lineY);
                line = w + ' ';
                lineY += 22;
            } else {
                line = testLine;
            }
        });
        ctx.fillText(line, bx + 180, lineY);

        // Subtitle note
        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.fillText(dialog.sub, bx + 180, by + 215);

        // Advance Prompt Button
        ctx.fillStyle = 'rgba(0, 229, 255, 0.25)';
        ctx.fillRect(bx + bw - 220, by + bh - 55, 190, 36);
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(bx + bw - 220, by + bh - 55, 190, 36);

        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'center';
        const isFinal = (this.bossStep === this.bossDialogues.length - 1);
        ctx.fillText(isFinal ? 'ASCEND TO SECTOR 2 [ENTER]' : 'CONTINUE REVIEW [SPACE]', bx + bw - 125, by + bh - 32);
    }
}

// Global Export
const capacityGateInstance = new CapacityGate();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.CapacityGate = capacityGateInstance;
    window.CapacityGate = capacityGateInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CapacityGate, capacityGate: capacityGateInstance };
}
