// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// CRCMinigame.js - Interactive Modulo-2 Polynomial XOR Division & Codeword Verifier
// KTU Exam Module 3 Question 13(a): Data = 100100, Generator g(x) = x^3 + x^2 + 1
// ==========================================================================

class CRCMinigame {
    constructor() {
        this.isOpen = false;
        this.isSolved = false;

        // KTU Problem Parameters (Model Question 13a)
        this.dataBits = '100100'; // k = 6 bits
        this.polyExpr = 'x^3 + x^2 + 1';
        this.polyDegree = 3; // r = 3 (highest power of x)
        this.divisor = '1101'; // 1*x^3 + 1*x^2 + 0*x^1 + 1*x^0
        this.augmentedData = '100100000'; // Data + r zeros (length 9)

        // Pre-computed Sender Modulo-2 Division Steps (6 stages for 6 quotient bits)
        // Division: 100100000 / 1101
        this.senderSteps = [
            {
                stepIndex: 1,
                currBits: '1001',
                qBit: '1',
                xorWith: '1101',
                xorResult: '0100',
                droppedBit: '0',
                nextBits: '1000'
            },
            {
                stepIndex: 2,
                currBits: '1000',
                qBit: '1',
                xorWith: '1101',
                xorResult: '0101',
                droppedBit: '0',
                nextBits: '1010'
            },
            {
                stepIndex: 3,
                currBits: '1010',
                qBit: '1',
                xorWith: '1101',
                xorResult: '0111',
                droppedBit: '0',
                nextBits: '1110'
            },
            {
                stepIndex: 4,
                currBits: '1110',
                qBit: '1',
                xorWith: '1101',
                xorResult: '0011',
                droppedBit: '0',
                nextBits: '0110'
            },
            {
                stepIndex: 5,
                currBits: '0110',
                qBit: '0',
                xorWith: '0000',
                xorResult: '0110',
                droppedBit: '0',
                nextBits: '1100'
            },
            {
                stepIndex: 6,
                currBits: '1100',
                qBit: '1',
                xorWith: '1101',
                xorResult: '0001',
                droppedBit: '',
                nextBits: '001' // Final Remainder (CRC / FCS)
            }
        ];

        this.expectedQuotient = '111101';
        this.expectedRemainder = '001';
        this.transmittedCodeword = '100100001'; // Data (100100) + Remainder (001)

        // Current Interactive Progression (0 to 6 steps completed)
        this.currentStep = 0;

        // Current Active Tab: 0 = Sender Division, 1 = Receiver Verification, 2 = KTU Scheme Info
        this.activeTab = 0;
        this.tabNames = ['[1] SENDER CRC DIVISION', '[2] RECEIVER ERROR CHECK', '[3] KTU SCHEME & THEORY'];

        // Receiver Verification State
        this.receiverVerified = false;

        // Feedback / Status
        this.statusMessage = 'CLICK [NEXT XOR STEP] OR PRESS [SPACE] TO EXECUTE MODULO-2 DIVISION';
        this.awardedMarks = 0; // Total: 6.0 Marks (+1.0 divisor, +3.0 remainder, +2.0 verification)

        // UI bounding boxes
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
            stepBtn: { x: 200, y: 520, w: 200, h: 38 },
            autoBtn: { x: 415, y: 520, w: 180, h: 38 },
            verifyBtn: { x: 610, y: 520, w: 220, h: 38 },
            resetBtn: { x: 845, y: 520, w: 140, h: 38 }
        };

        this.animTimer = 0;
    }

    open() {
        this.isOpen = true;
        console.log('[CRCMinigame] Terminal opened.');
    }

    close() {
        this.isOpen = false;
        console.log('[CRCMinigame] Terminal closed.');
    }

    advanceStep() {
        if (this.currentStep < this.senderSteps.length) {
            this.currentStep++;
            this.playClickSfx();

            if (this.currentStep === this.senderSteps.length) {
                this.statusMessage = `DIVISION COMPLETE! CRC REMAINDER = ${this.expectedRemainder} // CODEWORD = ${this.transmittedCodeword}`;
                this.awardedMarks = 4.0; // 1.0 (divisor) + 3.0 (division)
            } else {
                const s = this.senderSteps[this.currentStep - 1];
                this.statusMessage = `STEP ${s.stepIndex}: ${s.currBits} XOR ${s.xorWith} = ${s.xorResult} -> DROPPED '${s.droppedBit}'`;
            }
        }
    }

    autoSolve() {
        this.currentStep = this.senderSteps.length;
        this.receiverVerified = true;
        this.playClickSfx();
        this.validateAndCertify();
    }

    verifyReceiver() {
        if (this.currentStep < this.senderSteps.length) {
            this.statusMessage = 'COMPLETE SENDER DIVISION BEFORE RUNNING RECEIVER VERIFICATION!';
            this.playDeniedSfx();
            return;
        }

        this.receiverVerified = true;
        this.playClickSfx();
        this.validateAndCertify();
    }

    validateAndCertify() {
        if (this.currentStep === this.senderSteps.length && this.receiverVerified && !this.isSolved) {
            this.isSolved = true;
            this.awardedMarks = 6.0;
            this.statusMessage = 'RECEIVER REMAINDER = 000! FRAME VALIDATED WITHOUT ERROR (+6 MARKS)! LASER GRID DEACTIVATED.';

            // Award 6 Marks in Global GameState
            if (typeof window !== 'undefined' && window.GameState && typeof window.GameState.addMarks === 'function') {
                window.GameState.addMarks(6);
            }

            if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxAccessGranted === 'function') {
                window.CyberAudio.sfxAccessGranted();
            }

            // Deactivate Laser Trap in Sector 2 World
            if (typeof window !== 'undefined') {
                if (window.Sector2_DataLink) {
                    window.Sector2_DataLink.laserTrapDeactivated = true;
                }
                if (window.GridEngine && window.GridEngine.gameLoop && window.GridEngine.gameLoop.sector2) {
                    window.GridEngine.gameLoop.sector2.laserTrapDeactivated = true;
                }
            }
        }
    }

    reset() {
        this.currentStep = 0;
        this.receiverVerified = false;
        this.isSolved = false;
        this.awardedMarks = 0;
        this.statusMessage = 'RESET COMPLETED. PRESS [NEXT XOR STEP] TO BEGIN.';
        this.playClickSfx();
    }

    playClickSfx() {
        if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxPing === 'function') {
            window.CyberAudio.sfxPing();
        }
    }

    playDeniedSfx() {
        if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxAccessDenied === 'function') {
            window.CyberAudio.sfxAccessDenied();
        }
    }

    handleInput(input) {
        if (!this.isOpen || !input) return;

        // Escape or E to close
        if (input.isJustPressed('escape') || input.isJustPressed('e')) {
            this.close();
            return;
        }

        // Tab or Q to switch tabs
        if (input.isJustPressed('tab') || input.isJustPressed('q')) {
            this.activeTab = (this.activeTab + 1) % 3;
            this.playClickSfx();
        }

        // Space or ArrowDown to advance step
        if (input.isJustPressed(' ') || input.isJustPressed('arrowdown') || input.isJustPressed('arrowright')) {
            this.advanceStep();
        }

        // A key for auto-solve
        if (input.isJustPressed('a')) {
            this.autoSolve();
        }

        // V key to verify receiver
        if (input.isJustPressed('v')) {
            this.verifyReceiver();
        }

        // R key to reset
        if (input.isJustPressed('r')) {
            this.reset();
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

        // Close
        if (mx >= b.closeBtn.x && mx <= b.closeBtn.x + b.closeBtn.w && my >= b.closeBtn.y && my <= b.closeBtn.y + b.closeBtn.h) {
            this.close();
            return;
        }

        // Tab selection
        b.tabBtns.forEach((tab, idx) => {
            if (mx >= tab.x && mx <= tab.x + tab.w && my >= tab.y && my <= tab.y + tab.h) {
                this.activeTab = idx;
                this.playClickSfx();
            }
        });

        // Step Button
        if (mx >= b.stepBtn.x && mx <= b.stepBtn.x + b.stepBtn.w && my >= b.stepBtn.y && my <= b.stepBtn.y + b.stepBtn.h) {
            this.advanceStep();
            return;
        }

        // Auto Button
        if (mx >= b.autoBtn.x && mx <= b.autoBtn.x + b.autoBtn.w && my >= b.autoBtn.y && my <= b.autoBtn.y + b.autoBtn.h) {
            this.autoSolve();
            return;
        }

        // Verify Button
        if (mx >= b.verifyBtn.x && mx <= b.verifyBtn.x + b.verifyBtn.w && my >= b.verifyBtn.y && my <= b.verifyBtn.y + b.verifyBtn.h) {
            this.verifyReceiver();
            return;
        }

        // Reset Button
        if (mx >= b.resetBtn.x && mx <= b.resetBtn.x + b.resetBtn.w && my >= b.resetBtn.y && my <= b.resetBtn.y + b.resetBtn.h) {
            this.reset();
            return;
        }
    }

    // ======================================================================
    // Render Modal Screen
    // ======================================================================
    render(ctx) {
        if (!this.isOpen) return;
        this.animTimer += 0.016;

        const b = this.uiBounds;
        ctx.save();

        // 1. Fullscreen Dimmer
        ctx.fillStyle = 'rgba(2, 6, 16, 0.88)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // 2. Chassis Box
        ctx.fillStyle = 'rgba(4, 12, 28, 0.98)';
        ctx.fillRect(b.modalX, b.modalY, b.modalW, b.modalH);

        // Neon Border
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 18;
        ctx.strokeRect(b.modalX, b.modalY, b.modalW, b.modalH);
        ctx.shadowBlur = 0;

        // Title
        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 15px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('⚡ CRC POLYNOMIAL XOR DIVISION CONSOLE // KTU Q13(a)', b.modalX + 25, b.modalY + 38);

        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.fillText('DATA: [ 100100 ] | POLYNOMIAL: g(x) = x³ + x² + 1 -> [ 1101 ] | VALUATION: +6 MARKS', b.modalX + 25, b.modalY + 58);

        // Close Button [X]
        const cb = b.closeBtn;
        ctx.fillStyle = 'rgba(255, 34, 85, 0.2)';
        ctx.fillRect(cb.x, cb.y, cb.w, cb.h);
        ctx.strokeStyle = '#ff2255';
        ctx.strokeRect(cb.x, cb.y, cb.w, cb.h);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('✕ [ESC]', cb.x + cb.w / 2, cb.y + 21);

        // 3. Tab Buttons
        b.tabBtns.forEach((tab, idx) => {
            const isSelected = (this.activeTab === idx);
            ctx.fillStyle = isSelected ? 'rgba(0, 255, 136, 0.25)' : 'rgba(8, 18, 36, 0.8)';
            ctx.fillRect(tab.x, tab.y, tab.w, tab.h);
            ctx.strokeStyle = isSelected ? '#00ff88' : 'rgba(0, 255, 136, 0.35)';
            ctx.strokeRect(tab.x, tab.y, tab.w, tab.h);

            ctx.fillStyle = isSelected ? '#ffffff' : '#88aacc';
            ctx.font = 'bold 11px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.tabNames[idx], tab.x + tab.w / 2, tab.y + 20);
        });

        // 4. Tab Content Area
        if (this.activeTab === 0) {
            this.renderSenderTab(ctx, b);
        } else if (this.activeTab === 1) {
            this.renderReceiverTab(ctx, b);
        } else if (this.activeTab === 2) {
            this.renderTheoryTab(ctx, b);
        }

        // 5. Action Buttons (Step, Auto, Verify, Reset)
        const sb = b.stepBtn;
        const canStep = (this.currentStep < this.senderSteps.length);
        ctx.fillStyle = canStep ? 'rgba(0, 255, 136, 0.25)' : 'rgba(80, 80, 80, 0.2)';
        ctx.fillRect(sb.x, sb.y, sb.w, sb.h);
        ctx.strokeStyle = canStep ? '#00ff88' : '#555555';
        ctx.strokeRect(sb.x, sb.y, sb.w, sb.h);
        ctx.fillStyle = canStep ? '#00ff88' : '#777777';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('⚡ NEXT XOR STEP [SPACE]', sb.x + sb.w / 2, sb.y + 24);

        const ab = b.autoBtn;
        ctx.fillStyle = 'rgba(0, 119, 255, 0.25)';
        ctx.fillRect(ab.x, ab.y, ab.w, ab.h);
        ctx.strokeStyle = '#0077ff';
        ctx.strokeRect(ab.x, ab.y, ab.w, ab.h);
        ctx.fillStyle = '#00e5ff';
        ctx.fillText('⚡ AUTO-SOLVE [A]', ab.x + ab.w / 2, ab.y + 24);

        const vb = b.verifyBtn;
        const canVerify = (this.currentStep === this.senderSteps.length);
        ctx.fillStyle = canVerify ? 'rgba(255, 215, 0, 0.25)' : 'rgba(80, 80, 80, 0.2)';
        ctx.fillRect(vb.x, vb.y, vb.w, vb.h);
        ctx.strokeStyle = canVerify ? '#ffd700' : '#555555';
        ctx.strokeRect(vb.x, vb.y, vb.w, vb.h);
        ctx.fillStyle = canVerify ? '#ffd700' : '#777777';
        ctx.fillText('✓ VERIFY RECEIVER [V]', vb.x + vb.w / 2, vb.y + 24);

        const rb = b.resetBtn;
        ctx.fillStyle = 'rgba(255, 34, 85, 0.2)';
        ctx.fillRect(rb.x, rb.y, rb.w, rb.h);
        ctx.strokeStyle = '#ff2255';
        ctx.strokeRect(rb.x, rb.y, rb.w, rb.h);
        ctx.fillStyle = '#ff5577';
        ctx.fillText('RESET [R]', rb.x + rb.w / 2, rb.y + 24);

        // 6. Status Message Bar
        const barY = b.modalY + 568;
        ctx.fillStyle = 'rgba(4, 10, 24, 0.95)';
        ctx.fillRect(b.modalX + 25, barY, b.modalW - 50, 32);
        ctx.strokeStyle = this.isSolved ? '#00ff88' : '#ffd700';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.modalX + 25, barY, b.modalW - 50, 32);

        ctx.fillStyle = this.isSolved ? '#00ff88' : '#ffffff';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(this.statusMessage, b.modalX + b.modalW / 2, barY + 20);

        ctx.restore();
    }

    // Tab 1: Interactive Sender Modulo-2 Division
    renderSenderTab(ctx, b) {
        const startX = b.modalX + 35;
        const startY = b.modalY + 185;

        ctx.save();

        // Mathematical Breakdown Header
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 12px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('STEP 1: APPEND r=3 ZEROS TO DATA [100100] -> AUGMENTED DIVIDEND: 100100000', startX, startY);

        ctx.fillStyle = '#ffd700';
        ctx.font = '11px "Fira Code", monospace';
        ctx.fillText('DIVISOR: 1101 (from g(x) = x³ + x² + 1) | MODULO-2 XOR DIVISION (NO CARRIES / BORROWS):', startX, startY + 22);

        // Division Visual Container
        const divBoxY = startY + 36;
        const divBoxW = b.modalW - 70;
        const divBoxH = 280;

        ctx.fillStyle = '#020712';
        ctx.fillRect(startX, divBoxY, divBoxW, divBoxH);
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
        ctx.strokeRect(startX, divBoxY, divBoxW, divBoxH);

        // Render Step-by-Step XOR Rows
        const fontHeight = 18;
        let rowY = divBoxY + 25;

        // Top Row: Dividend & Divisor
        ctx.font = 'bold 13px "Fira Code", monospace';
        ctx.fillStyle = '#88aacc';
        ctx.fillText('DIVISOR: 1101 )', startX + 20, rowY);

        ctx.fillStyle = '#00ff88';
        ctx.fillText('1 0 0 1 0 0 0 0 0', startX + 170, rowY);

        // Quotient progression
        let quotientStr = '';
        for (let i = 0; i < this.currentStep; i++) {
            quotientStr += this.senderSteps[i].qBit + ' ';
        }
        ctx.fillStyle = '#ffd700';
        ctx.fillText(`( QUOTIENT: ${quotientStr}`, startX + 380, rowY);

        rowY += fontHeight + 8;

        // Draw horizontal divider line
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.4)';
        ctx.beginPath();
        ctx.moveTo(startX + 160, rowY - 10);
        ctx.lineTo(startX + 360, rowY - 10);
        ctx.stroke();

        // Render Active Steps
        for (let i = 0; i < this.currentStep; i++) {
            const s = this.senderSteps[i];
            const indent = startX + 170 + i * 22;

            // XOR Divisor row
            ctx.fillStyle = '#ffaa00';
            ctx.fillText(`^ ${s.xorWith}`, indent, rowY);
            rowY += fontHeight;

            // Line
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.beginPath();
            ctx.moveTo(indent, rowY - 6);
            ctx.lineTo(indent + 70, rowY - 6);
            ctx.stroke();

            // Result row with dropped bit
            ctx.fillStyle = '#00ff88';
            if (i < this.senderSteps.length - 1) {
                ctx.fillText(`= ${s.nextBits}`, indent + 15, rowY);
            } else {
                // Final Remainder
                ctx.fillStyle = '#ff007f';
                ctx.font = 'bold 14px "Fira Code", monospace';
                ctx.fillText(`= REMAINDER: ${s.nextBits} (CRC FCS BITS)`, indent + 15, rowY);
            }
            rowY += fontHeight;
        }

        // Transmitted Codeword Preview Box
        if (this.currentStep === this.senderSteps.length) {
            const cwBoxY = divBoxY + divBoxH - 50;
            ctx.fillStyle = 'rgba(0, 255, 136, 0.15)';
            ctx.fillRect(startX + 10, cwBoxY, divBoxW - 20, 38);
            ctx.strokeStyle = '#00ff88';
            ctx.strokeRect(startX + 10, cwBoxY, divBoxW - 20, 38);

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 12px "Fira Code", monospace';
            ctx.textAlign = 'left';
            ctx.fillText('TRANSMITTED CODEWORD = DATA + CRC: [ ', startX + 25, cwBoxY + 24);

            ctx.fillStyle = '#00ff88';
            ctx.fillText('100100', startX + 310, cwBoxY + 24);

            ctx.fillStyle = '#ff007f';
            ctx.fillText('001', startX + 365, cwBoxY + 24);

            ctx.fillStyle = '#ffffff';
            ctx.fillText(' ] (9 BITS) // PRESS [VERIFY RECEIVER] TO CERTIFY', startX + 395, cwBoxY + 24);
        }

        ctx.restore();
    }

    // Tab 2: Receiver Error Detection Verification
    renderReceiverTab(ctx, b) {
        const startX = b.modalX + 35;
        const startY = b.modalY + 185;

        ctx.save();
        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 12px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('STEP 4: RECEIVER VERIFICATION (DIVIDE RECEIVED CODEWORD BY GENERATOR)', startX, startY);

        ctx.fillStyle = '#d0e0f0';
        ctx.font = '11px "Fira Code", monospace';
        ctx.fillText('Received Codeword: 100100001 | Divisor: 1101 | Expected Remainder: 000 (No Error)', startX, startY + 22);

        const boxY = startY + 36;
        const boxW = b.modalW - 70;
        const boxH = 280;

        ctx.fillStyle = '#020712';
        ctx.fillRect(startX, boxY, boxW, boxH);
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
        ctx.strokeRect(startX, boxY, boxW, boxH);

        if (!this.receiverVerified) {
            ctx.fillStyle = '#ffaa00';
            ctx.font = 'bold 12px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText('CLICK [VERIFY RECEIVER] OR PRESS [V] TO EXECUTE RECEIVER CHECK', startX + boxW / 2, boxY + boxH / 2);
        } else {
            // Receiver step breakdown
            ctx.fillStyle = '#88aacc';
            ctx.font = 'bold 12px "Fira Code", monospace';
            ctx.textAlign = 'left';
            ctx.fillText('1101 ) 1 0 0 1 0 0 0 0 1 ( QUOTIENT: 1 1 1 1 0 1', startX + 25, boxY + 35);

            ctx.fillStyle = '#d0e0f0';
            ctx.font = '11px "Fira Code", monospace';
            const lines = [
                'Stage 1: 1001 XOR 1101 = 0100 -> drop 0 -> 1000',
                'Stage 2: 1000 XOR 1101 = 0101 -> drop 0 -> 1010',
                'Stage 3: 1010 XOR 1101 = 0111 -> drop 0 -> 1110',
                'Stage 4: 1110 XOR 1101 = 0011 -> drop 0 -> 0110',
                'Stage 5: 0110 XOR 0000 = 0110 -> drop 1 -> 1101',
                'Stage 6: 1101 XOR 1101 = 0000 -> FINAL REMAINDER = 000'
            ];

            let ly = boxY + 65;
            lines.forEach((l, idx) => {
                ctx.fillStyle = (idx === 5) ? '#00ff88' : '#d0e0f0';
                if (idx === 5) ctx.font = 'bold 12px "Fira Code", monospace';
                ctx.fillText(l, startX + 25, ly);
                ly += 22;
            });

            // Proof Badge
            ctx.fillStyle = 'rgba(0, 255, 136, 0.2)';
            ctx.fillRect(startX + 25, boxY + boxH - 55, boxW - 50, 36);
            ctx.strokeStyle = '#00ff88';
            ctx.strokeRect(startX + 25, boxY + boxH - 55, boxW - 50, 36);

            ctx.fillStyle = '#00ff88';
            ctx.font = 'bold 11px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText('REMAINDER IS ZERO (000) => PROOF: NO TRANSMISSION BIT ERRORS DETECTED! FRAME ACCEPTED.', startX + boxW / 2, boxY + boxH - 32);
        }

        ctx.restore();
    }

    // Tab 3: Theory & KTU Valuation Rubric
    renderTheoryTab(ctx, b) {
        const startX = b.modalX + 35;
        const startY = b.modalY + 185;

        ctx.save();
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 13px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('📖 KTU SCHEME OF VALUATION // QUESTION 13(a) (6 MARKS)', startX, startY);

        ctx.fillStyle = '#ffffff';
        ctx.font = '11px "Fira Code", monospace';

        const lines = [
            '1. POLYNOMIAL REPRESENTATION (+1.0 MARK):',
            '   - Generator g(x) = x³ + x² + 1 has degree r = 3.',
            '   - Binary divisor = coefficients of [x³, x², x¹, x⁰] = [1, 1, 0, 1].',
            '   - Number of zeros appended to data = degree r = 3 zeros.',
            '',
            '2. MODULO-2 DIVISION & REMAINDER (+3.0 MARKS):',
            '   - Binary Modulo-2 arithmetic uses bitwise XOR (exclusive OR) with NO carries or borrows.',
            '   - 0 ⊕ 0 = 0 | 1 ⊕ 1 = 0 | 1 ⊕ 0 = 1 | 0 ⊕ 1 = 1.',
            '   - Remainder generated: 001 (FCS / CRC bits).',
            '   - Transmitted Codeword: 100100001.',
            '',
            '3. RECEIVER VERIFICATION (+2.0 MARKS):',
            '   - Receiver divides 100100001 by 1101.',
            '   - Remainder = 000 proves zero corrupted bits in transit.',
            '   - If remainder != 000, receiver rejects frame and requests retransmission (ARQ).'
        ];

        let ly = startY + 28;
        lines.forEach(l => {
            if (l.startsWith('1.') || l.startsWith('2.') || l.startsWith('3.')) {
                ctx.fillStyle = '#00e5ff';
                ctx.font = 'bold 11px "Fira Code", monospace';
            } else {
                ctx.fillStyle = '#d0e0f0';
                ctx.font = '11px "Fira Code", monospace';
            }
            ctx.fillText(l, startX, ly);
            ly += 20;
        });

        ctx.restore();
    }
}

// Global Export
const crcMinigameInstance = new CRCMinigame();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.CRCMinigame = crcMinigameInstance;
    window.CRCMinigame = crcMinigameInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CRCMinigame, crcMinigame: crcMinigameInstance };
}
