// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// FragmentationMinigame.js - Interactive 1500-Byte MTU Datagram Fragmentation
// KTU Module 2 Exam Question: Model Paper Q12(b) (3 Marks)
// Datagram Length = 4000B (20B Header + 3980B Data), Link MTU = 1500B, 8-Byte Rule
// ==========================================================================

class FragmentationMinigame {
    constructor() {
        this.isOpen = false;
        this.isSolved = false;

        // KTU Problem Parameters
        this.originalTotalLength = 4000;
        this.headerLength = 20;
        this.originalDataLength = 3980; // 4000 - 20
        this.linkMTU = 1500;
        this.maxPayloadPerFragment = 1480; // (1500 - 20) must be divisible by 8 -> 1480 / 8 = 185

        // Expected Ground-Truth Fragments (KTU Valuation Scheme)
        this.expectedFragments = [
            {
                id: 1,
                totalLength: 1500,
                headerLength: 20,
                dataLength: 1480,
                byteRange: '0 .. 1479',
                offset: 0, // 0 / 8
                mfFlag: 1,
                calcNote: 'Data: 1480B (185 * 8). Offset: 0/8 = 0. MF: 1'
            },
            {
                id: 2,
                totalLength: 1500,
                headerLength: 20,
                dataLength: 1480,
                byteRange: '1480 .. 2959',
                offset: 185, // 1480 / 8
                mfFlag: 1,
                calcNote: 'Data: 1480B (185 * 8). Offset: 1480/8 = 185. MF: 1'
            },
            {
                id: 3,
                totalLength: 1040,
                headerLength: 20,
                dataLength: 1020, // 3980 - 2960
                byteRange: '2960 .. 3979',
                offset: 370, // 2960 / 8
                mfFlag: 0,
                calcNote: 'Remaining Data: 1020B. Offset: 2960/8 = 370. MF: 0 (Final)'
            }
        ];

        // Player's Calculated State (0 = None, 1 = Frag 1, 2 = Frag 2, 3 = All 3 Frag)
        this.calculatedSteps = 0;

        // Current Active Tab: 0 = Interactive Workbench, 1 = 8-Byte Rule Theory, 2 = KTU Scheme & Rubric
        this.activeTab = 0;
        this.tabNames = ['[1] MTU FRAGMENTATION WORKBENCH', '[2] 8-BYTE OFFSET RULE & THEORY', '[3] KTU SCHEME & MARKS'];

        // Status & Feedback Message
        this.statusMessage = '4000-BYTE DATAGRAM BLOCKED BY 1500-BYTE MTU. CLICK [CALCULATE FRAGMENT 1] TO SPLIT!';
        this.awardedMarks = 0;

        // UI Bounding Boxes
        this.uiBounds = {
            modalX: 160,
            modalY: 50,
            modalW: 960,
            modalH: 620,
            closeBtn: { x: 1060, y: 65, w: 40, h: 32 },
            tabBtns: [
                { x: 190, y: 130, w: 260, h: 30 },
                { x: 460, y: 130, w: 260, h: 30 },
                { x: 730, y: 130, w: 260, h: 30 }
            ],
            stepBtn1: { x: 780, y: 470, w: 310, h: 38 },
            executeBtn: { x: 780, y: 520, w: 310, h: 42 },
            autoBtn: { x: 190, y: 615, w: 160, h: 34 },
            resetBtn: { x: 360, y: 615, w: 140, h: 34 },
            executeBottomBtn: { x: 520, y: 615, w: 340, h: 34 }
        };

        this.animTimer = 0;
    }

    open() {
        this.isOpen = true;
        console.log('[FragmentationMinigame] Console opened.');
    }

    close() {
        this.isOpen = false;
        console.log('[FragmentationMinigame] Console closed.');
    }

    advanceStep() {
        if (this.calculatedSteps < 3) {
            this.calculatedSteps++;
            this.playClickSfx();

            if (this.calculatedSteps === 1) {
                this.statusMessage = 'FRAGMENT 1 GENERATED: Len 1500B (1480B data), Offset 0, MF = 1. Click [CALCULATE FRAGMENT 2]!';
            } else if (this.calculatedSteps === 2) {
                this.statusMessage = 'FRAGMENT 2 GENERATED: Len 1500B (1480B data), Offset 185 (1480/8), MF = 1. Click [CALCULATE FRAGMENT 3]!';
            } else if (this.calculatedSteps === 3) {
                this.statusMessage = 'FRAGMENT 3 GENERATED: Len 1040B (1020B data), Offset 370 (2960/8), MF = 0! PRESS [EXECUTE SPLIT]!';
            }
        }
    }

    autoSolve() {
        this.calculatedSteps = 3;
        this.statusMessage = 'AUTO-CALCULATED: 3 fragments verified with exact 8-byte offsets. Click [EXECUTE SPLIT] to pass aperture!';
        this.playSuccessSfx();
    }

    executeSplitAndPass() {
        if (this.calculatedSteps < 3) {
            this.statusMessage = 'CALCULATE ALL 3 FRAGMENTS BEFORE PASSING THE 1500-BYTE APERTURE!';
            this.playDeniedSfx();
            return;
        }

        if (!this.isSolved) {
            this.isSolved = true;
            this.awardedMarks = 3.0;

            // Award 3.0 Marks in Global GameState
            if (typeof window !== 'undefined' && window.GameState && typeof window.GameState.addMarks === 'function') {
                window.GameState.addMarks(3);
            }

            // Trigger World Splitting Animation in Sector 3
            if (typeof window !== 'undefined') {
                if (window.Sector3_Network && typeof window.Sector3_Network.startSplittingSequence === 'function') {
                    window.Sector3_Network.startSplittingSequence();
                }
                if (window.GridEngine && window.GridEngine.gameLoop && window.GridEngine.gameLoop.sector3) {
                    window.GridEngine.gameLoop.sector3.startSplittingSequence();
                }
            }

            this.playSuccessSfx();
        }

        // Close console so player witnesses the 3 mini-packets pass through the aperture
        this.close();
    }

    reset() {
        this.calculatedSteps = 0;
        this.isSolved = false;
        this.awardedMarks = 0;
        this.statusMessage = 'RESET COMPLETED: Datagram consolidated back to 4000B. Click [CALCULATE FRAGMENT 1] to begin.';
        this.playClickSfx();
    }

    playClickSfx() {
        if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxPing === 'function') {
            window.CyberAudio.sfxPing();
        }
    }

    playSuccessSfx() {
        if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxAccessGranted === 'function') {
            window.CyberAudio.sfxAccessGranted();
        }
    }

    playDeniedSfx() {
        if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxAccessDenied === 'function') {
            window.CyberAudio.sfxAccessDenied();
        }
    }

    // ======================================================================
    // Input Handling
    // ======================================================================
    handleInput(input) {
        if (!this.isOpen || !input) return;

        // Escape or E to close
        if (input.isJustPressed('escape') || input.isJustPressed('e')) {
            this.close();
            return;
        }

        // Tab or Q to cycle tabs
        if (input.isJustPressed('tab') || input.isJustPressed('q')) {
            this.activeTab = (this.activeTab + 1) % 3;
            this.playClickSfx();
        }

        // Key shortcuts
        if (input.isJustPressed('a')) {
            this.autoSolve();
        }
        if (input.isJustPressed('r')) {
            this.reset();
        }
        if (input.isJustPressed(' ')) {
            if (this.calculatedSteps < 3) {
                this.advanceStep();
            } else {
                this.executeSplitAndPass();
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

        // Bottom Controls
        if (mx >= b.autoBtn.x && mx <= b.autoBtn.x + b.autoBtn.w && my >= b.autoBtn.y && my <= b.autoBtn.y + b.autoBtn.h) {
            this.autoSolve();
            return;
        }
        if (mx >= b.resetBtn.x && mx <= b.resetBtn.x + b.resetBtn.w && my >= b.resetBtn.y && my <= b.resetBtn.y + b.resetBtn.h) {
            this.reset();
            return;
        }
        if (mx >= b.executeBottomBtn.x && mx <= b.executeBottomBtn.x + b.executeBottomBtn.w && my >= b.executeBottomBtn.y && my <= b.executeBottomBtn.y + b.executeBottomBtn.h) {
            if (this.calculatedSteps < 3) {
                this.advanceStep();
            } else {
                this.executeSplitAndPass();
            }
            return;
        }

        // Action Buttons in Workbench Tab
        if (this.activeTab === 0) {
            if (mx >= b.stepBtn1.x && mx <= b.stepBtn1.x + b.stepBtn1.w && my >= b.stepBtn1.y && my <= b.stepBtn1.y + b.stepBtn1.h) {
                this.advanceStep();
                return;
            }
            if (mx >= b.executeBtn.x && mx <= b.executeBtn.x + b.executeBtn.w && my >= b.executeBtn.y && my <= b.executeBtn.y + b.executeBtn.h) {
                this.executeSplitAndPass();
                return;
            }
        }
    }

    // ======================================================================
    // Render Modal Screen
    // ======================================================================
    render(ctx) {
        if (!this.isOpen) return;
        this.animTimer += 0.016;

        ctx.save();
        const b = this.uiBounds;

        // 1. Modal Dimming Backdrop
        ctx.fillStyle = 'rgba(2, 6, 16, 0.88)';
        ctx.fillRect(0, 0, 1280, 720);

        // 2. Modal Chassis
        ctx.fillStyle = '#050c20';
        ctx.fillRect(b.modalX, b.modalY, b.modalW, b.modalH);
        ctx.strokeStyle = this.isSolved ? '#00ff88' : '#0066ff';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 14;
        ctx.strokeRect(b.modalX, b.modalY, b.modalW, b.modalH);
        ctx.shadowBlur = 0;

        // 3. Header Bar
        ctx.fillStyle = '#081432';
        ctx.fillRect(b.modalX + 2, b.modalY + 2, b.modalW - 4, 58);
        ctx.strokeStyle = 'rgba(0, 102, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.modalX + 2, b.modalY + 2, b.modalW - 4, 58);

        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 15px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('IPv4 DATAGRAM FRAGMENTATION ENGINE // 1500-BYTE MTU CHOKEPOINT', b.modalX + 20, b.modalY + 28);

        ctx.fillStyle = '#88aacc';
        ctx.font = '11px "Fira Code", monospace';
        ctx.fillText('KTU Model Question Paper Q12(b) (3 Marks) | 4000B Datagram, 1500B Link MTU & 8-Byte Rule', b.modalX + 20, b.modalY + 48);

        // Close Button (✕)
        ctx.fillStyle = 'rgba(255, 0, 127, 0.3)';
        ctx.fillRect(b.closeBtn.x, b.closeBtn.y, b.closeBtn.w, b.closeBtn.h);
        ctx.strokeStyle = '#ff007f';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.closeBtn.x, b.closeBtn.y, b.closeBtn.w, b.closeBtn.h);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('✕', b.closeBtn.x + b.closeBtn.w / 2, b.closeBtn.y + 21);

        // 4. Navigation Tabs
        b.tabBtns.forEach((tab, idx) => {
            const isSel = (this.activeTab === idx);
            ctx.fillStyle = isSel ? 'rgba(0, 102, 255, 0.28)' : 'rgba(8, 20, 48, 0.6)';
            ctx.fillRect(tab.x, tab.y, tab.w, tab.h);
            ctx.strokeStyle = isSel ? '#00e5ff' : 'rgba(0, 102, 255, 0.35)';
            ctx.lineWidth = isSel ? 1.8 : 1;
            ctx.strokeRect(tab.x, tab.y, tab.w, tab.h);

            ctx.fillStyle = isSel ? '#00e5ff' : '#88aacc';
            ctx.font = isSel ? 'bold 10px "Fira Code", monospace' : '10px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.tabNames[idx], tab.x + tab.w / 2, tab.y + 19);
        });

        // 5. Render Selected Tab View
        if (this.activeTab === 0) {
            this.renderWorkbenchTab(ctx);
        } else if (this.activeTab === 1) {
            this.renderTheoryTab(ctx);
        } else {
            this.renderSchemeTab(ctx);
        }

        // 6. Bottom Controls Bar
        this.renderBottomControls(ctx);

        ctx.restore();
    }

    // ======================================================================
    // Tab 0: Fragmentation Workbench
    // ======================================================================
    renderWorkbenchTab(ctx) {
        const b = this.uiBounds;
        const sx = b.modalX + 25;
        const sy = 175;

        ctx.save();

        // 1. Original Datagram Breakdown Card (Top Strip)
        ctx.fillStyle = 'rgba(8, 18, 42, 0.9)';
        ctx.fillRect(sx, sy, 540, 95);
        ctx.strokeStyle = '#0066ff';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(sx, sy, 540, 95);

        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('ORIGINAL IPv4 DATAGRAM SPECIFICATIONS:', sx + 14, sy + 22);

        // Header block + Data block graphic
        ctx.fillStyle = '#ff77aa';
        ctx.fillRect(sx + 14, sy + 34, 75, 26);
        ctx.strokeStyle = '#ffffff';
        ctx.strokeRect(sx + 14, sy + 34, 75, 26);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('20B HEADER', sx + 14 + 37, sy + 51);

        ctx.fillStyle = '#0066ff';
        ctx.fillRect(sx + 92, sy + 34, 432, 26);
        ctx.strokeStyle = '#ffffff';
        ctx.strokeRect(sx + 92, sy + 34, 432, 26);
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.fillText('PAYLOAD DATA = 3980 BYTES (Total Length = 4000 Bytes)', sx + 92 + 216, sy + 51);

        ctx.fillStyle = '#88aacc';
        ctx.font = '9px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('Link MTU: 1500B -> Max Data/Fragment = 1500 - 20 = 1480B (185 * 8 bytes)', sx + 14, sy + 82);

        // 2. Fragment Generation Table (Left side, Y: 285 -> 560)
        this.renderFragmentRows(ctx, sx, sy + 110);

        // 3. Right Side: Datagram Splitting Preview & Actions
        this.renderRightWorkbench(ctx);

        ctx.restore();
    }

    renderFragmentRows(ctx, sx, sy) {
        ctx.save();
        const rw = 540;
        const rh = 175;

        ctx.fillStyle = 'rgba(6, 16, 38, 0.9)';
        ctx.fillRect(sx, sy, rw, rh);
        ctx.strokeStyle = 'rgba(0, 102, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.strokeRect(sx, sy, rw, rh);

        // Headers
        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('GENERATED FRAGMENTS TABLE:', sx + 12, sy + 22);

        ctx.fillStyle = '#88aacc';
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.fillText('FRAG', sx + 14, sy + 44);
        ctx.fillText('TOTAL LEN', sx + 62, sy + 44);
        ctx.fillText('DATA BYTES', sx + 145, sy + 44);
        ctx.fillText('BYTE RANGE', sx + 235, sy + 44);
        ctx.fillText('OFFSET', sx + 345, sy + 44);
        ctx.fillText('MF', sx + 420, sy + 44);
        ctx.fillText('STATUS', sx + 465, sy + 44);

        ctx.strokeStyle = 'rgba(0, 102, 255, 0.25)';
        ctx.beginPath();
        ctx.moveTo(sx + 10, sy + 52);
        ctx.lineTo(sx + rw - 10, sy + 52);
        ctx.stroke();

        this.expectedFragments.forEach((f, idx) => {
            const isCalc = (this.calculatedSteps > idx);
            const rowY = sy + 74 + idx * 34;

            ctx.fillStyle = isCalc ? '#ffffff' : '#445566';
            ctx.font = 'bold 9px "Fira Code", monospace';
            ctx.fillText(`Frag ${f.id}`, sx + 14, rowY);

            ctx.fillStyle = isCalc ? '#00e5ff' : '#334455';
            ctx.fillText(isCalc ? `${f.totalLength}B` : '---', sx + 62, rowY);

            ctx.fillStyle = isCalc ? '#ffd700' : '#334455';
            ctx.fillText(isCalc ? `${f.dataLength}B` : '---', sx + 145, rowY);

            ctx.fillStyle = isCalc ? '#a0c0e0' : '#334455';
            ctx.fillText(isCalc ? f.byteRange : '---', sx + 235, rowY);

            ctx.fillStyle = isCalc ? '#00ff88' : '#334455';
            ctx.fillText(isCalc ? `${f.offset}` : '---', sx + 345, rowY);

            ctx.fillStyle = isCalc ? (f.mfFlag === 1 ? '#ffaa00' : '#00ff88') : '#334455';
            ctx.fillText(isCalc ? `${f.mfFlag}` : '---', sx + 420, rowY);

            ctx.fillStyle = isCalc ? '#00ff88' : '#ff77aa';
            ctx.fillText(isCalc ? '✓ READY' : 'PENDING', sx + 465, rowY);
        });

        ctx.restore();
    }

    renderRightWorkbench(ctx) {
        const b = this.uiBounds;
        const rx = 760;
        const ry = 175;
        const rw = 330;
        const rh = 280;

        ctx.save();
        ctx.fillStyle = 'rgba(6, 16, 38, 0.9)';
        ctx.fillRect(rx, ry, rw, rh);
        ctx.strokeStyle = '#0066ff';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(rx, ry, rw, rh);

        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('DATAGRAM SPLIT VISUALIZER:', rx + 14, ry + 24);

        // Graphic of the 3 fragments stacked
        const fragColors = ['#00e5ff', '#00ff88', '#ffd700'];
        for (let i = 0; i < 3; i++) {
            const isCalc = (this.calculatedSteps > i);
            const fy = ry + 44 + i * 50;

            ctx.fillStyle = isCalc ? 'rgba(0, 102, 255, 0.2)' : 'rgba(20, 30, 50, 0.3)';
            ctx.fillRect(rx + 14, fy, rw - 28, 40);
            ctx.strokeStyle = isCalc ? fragColors[i] : '#334455';
            ctx.lineWidth = 1.2;
            ctx.strokeRect(rx + 14, fy, rw - 28, 40);

            if (isCalc) {
                const f = this.expectedFragments[i];
                ctx.fillStyle = fragColors[i];
                ctx.font = 'bold 10px "Fira Code", monospace';
                ctx.fillText(`FRAGMENT ${f.id}: TOTAL ${f.totalLength} BYTES`, rx + 24, fy + 17);

                ctx.fillStyle = '#c0d4ec';
                ctx.font = '9px "Fira Code", monospace';
                ctx.fillText(`Offset = ${f.offset} (${f.byteRange.split(' ')[0]}/8) | MF = ${f.mfFlag}`, rx + 24, fy + 32);
            } else {
                ctx.fillStyle = '#556677';
                ctx.font = 'italic 9px "Fira Code", monospace';
                ctx.fillText(`[FRAGMENT ${i + 1} AWAITING CALCULATION]`, rx + 24, fy + 24);
            }
        }

        // Action Buttons on Right
        let btn1Text = '';
        if (this.calculatedSteps === 0) btn1Text = '[1] CALCULATE FRAGMENT 1';
        else if (this.calculatedSteps === 1) btn1Text = '[2] CALCULATE FRAGMENT 2';
        else if (this.calculatedSteps === 2) btn1Text = '[3] CALCULATE FRAGMENT 3';
        else btn1Text = '✓ ALL 3 FRAGMENTS READY';

        ctx.fillStyle = 'rgba(0, 102, 255, 0.25)';
        ctx.fillRect(b.stepBtn1.x, b.stepBtn1.y, b.stepBtn1.w, b.stepBtn1.h);
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.stepBtn1.x, b.stepBtn1.y, b.stepBtn1.w, b.stepBtn1.h);
        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(btn1Text, b.stepBtn1.x + b.stepBtn1.w / 2, b.stepBtn1.y + 23);

        // Execute Split Button
        const canExecute = (this.calculatedSteps === 3);
        ctx.fillStyle = canExecute ? 'rgba(0, 255, 136, 0.25)' : 'rgba(30, 40, 60, 0.4)';
        ctx.fillRect(b.executeBtn.x, b.executeBtn.y, b.executeBtn.w, b.executeBtn.h);
        ctx.strokeStyle = canExecute ? '#00ff88' : '#556677';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.executeBtn.x, b.executeBtn.y, b.executeBtn.w, b.executeBtn.h);
        ctx.fillStyle = canExecute ? '#00ff88' : '#556677';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.fillText('EXECUTE SPLIT & PASS APERTURE [SPACE]', b.executeBtn.x + b.executeBtn.w / 2, b.executeBtn.y + 25);

        ctx.restore();
    }

    // ======================================================================
    // Tab 1: 8-Byte Offset Rule Theory
    // ======================================================================
    renderTheoryTab(ctx) {
        const b = this.uiBounds;
        const sx = b.modalX + 30;
        const sy = 180;

        ctx.save();
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 13px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('IPv4 FRAGMENTATION MATHEMATICS & THE 8-BYTE ALIGNMENT RULE', sx, sy);

        const notes = [
            '1. Why Must Fragment Payloads Be Multiples of 8 Bytes?',
            '   - The "Fragment Offset" field in the IPv4 header is exactly 13 bits wide.',
            '   - But the Maximum IP Datagram length is 65,535 bytes (requires 16 bits to address).',
            '   - Therefore, the offset is scaled by a factor of 8 (2^3 = 8):',
            '     * Offset Value = (Byte Number of First Data Byte) / 8',
            '   - Hence, every intermediate fragment MUST carry data in multiples of 8 bytes!',
            '',
            '2. The 1500-Byte MTU Calculation Walkthrough:',
            '   - Outgoing Link MTU = 1500 Bytes.',
            '   - Header = 20 Bytes -> Max room for data = 1500 - 20 = 1480 Bytes.',
            '   - Check 8-byte rule: 1480 / 8 = 185 (Exact integer, perfectly valid!).',
            '',
            '3. Fragment Offset Progression:',
            '   - Fragment 1: First data byte is 0    -> Offset = 0 / 8 = 0.',
            '   - Fragment 2: First data byte is 1480 -> Offset = 1480 / 8 = 185.',
            '   - Fragment 3: First data byte is 2960 -> Offset = 2960 / 8 = 370.',
            '',
            '4. More Fragments (MF) Flag:',
            '   - MF = 1 means this is not the last fragment (more fragments follow).',
            '   - MF = 0 signifies the final fragment (receiver triggers reassembly buffer!).'
        ];

        let ly = sy + 26;
        notes.forEach(l => {
            if (l.startsWith('1.') || l.startsWith('2.') || l.startsWith('3.') || l.startsWith('4.')) {
                ctx.fillStyle = '#ffd700';
                ctx.font = 'bold 11px "Fira Code", monospace';
            } else {
                ctx.fillStyle = '#c0d4ec';
                ctx.font = '10px "Fira Code", monospace';
            }
            ctx.fillText(l, sx, ly);
            ly += 18;
        });

        ctx.restore();
    }

    // ======================================================================
    // Tab 2: KTU Scheme & Rubric
    // ======================================================================
    renderSchemeTab(ctx) {
        const b = this.uiBounds;
        const sx = b.modalX + 30;
        const sy = 180;

        ctx.save();
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 13px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('KTU SCHEME OF VALUATION (MODEL QUESTION PAPER Q12b - 3 MARKS)', sx, sy);

        const lines = [
            '1. Identification of Fragment 1 (+1.0 Mark):',
            '   - Total Length: 1500 Bytes (Header 20B, Data 1480B).',
            '   - Fragment Offset: 0.',
            '   - MF Flag: 1.',
            '',
            '2. Identification of Fragment 2 (+1.0 Mark):',
            '   - Total Length: 1500 Bytes (Header 20B, Data 1480B).',
            '   - Fragment Offset: 1480 / 8 = 185.',
            '   - MF Flag: 1.',
            '',
            '3. Identification of Final Fragment 3 (+1.0 Mark):',
            '   - Remaining Data: 3980 - 2960 = 1020 Bytes.',
            '   - Total Length: 1020 + 20 = 1040 Bytes.',
            '   - Fragment Offset: 2960 / 8 = 370.',
            '   - MF Flag: 0 (Final Fragment).'
        ];

        let ly = sy + 28;
        lines.forEach(l => {
            if (l.startsWith('1.') || l.startsWith('2.') || l.startsWith('3.')) {
                ctx.fillStyle = '#00ff88';
                ctx.font = 'bold 11px "Fira Code", monospace';
            } else {
                ctx.fillStyle = '#d0e4fc';
                ctx.font = '10px "Fira Code", monospace';
            }
            ctx.fillText(l, sx, ly);
            ly += 22;
        });

        ctx.restore();
    }

    // ======================================================================
    // Bottom Controls & Feedback Bar
    // ======================================================================
    renderBottomControls(ctx) {
        const b = this.uiBounds;

        ctx.save();
        // Feedback Bar
        const barY = 575;
        ctx.fillStyle = 'rgba(6, 16, 38, 0.95)';
        ctx.fillRect(b.modalX + 10, barY, b.modalW - 20, 32);
        ctx.strokeStyle = this.isSolved ? '#00ff88' : '#0066ff';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.modalX + 10, barY, b.modalW - 20, 32);

        ctx.fillStyle = this.isSolved ? '#00ff88' : '#00e5ff';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`STATUS: ${this.statusMessage}`, b.modalX + 20, barY + 20);

        // Auto Button
        ctx.fillStyle = 'rgba(0, 102, 255, 0.2)';
        ctx.fillRect(b.autoBtn.x, b.autoBtn.y, b.autoBtn.w, b.autoBtn.h);
        ctx.strokeStyle = '#0066ff';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.autoBtn.x, b.autoBtn.y, b.autoBtn.w, b.autoBtn.h);
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('AUTO-SOLVE [A]', b.autoBtn.x + b.autoBtn.w / 2, b.autoBtn.y + 21);

        // Reset Button
        ctx.fillStyle = 'rgba(255, 170, 0, 0.15)';
        ctx.fillRect(b.resetBtn.x, b.resetBtn.y, b.resetBtn.w, b.resetBtn.h);
        ctx.strokeStyle = '#ffaa00';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.resetBtn.x, b.resetBtn.y, b.resetBtn.w, b.resetBtn.h);
        ctx.fillStyle = '#ffaa00';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('RESET [R]', b.resetBtn.x + b.resetBtn.w / 2, b.resetBtn.y + 21);

        // Execute Split Bottom Button
        const canExecute = (this.calculatedSteps === 3);
        ctx.fillStyle = canExecute ? 'rgba(0, 255, 136, 0.25)' : 'rgba(30, 40, 60, 0.4)';
        ctx.fillRect(b.executeBottomBtn.x, b.executeBottomBtn.y, b.executeBottomBtn.w, b.executeBottomBtn.h);
        ctx.strokeStyle = canExecute ? '#00ff88' : '#556677';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.executeBottomBtn.x, b.executeBottomBtn.y, b.executeBottomBtn.w, b.executeBottomBtn.h);

        ctx.fillStyle = canExecute ? '#00ff88' : '#556677';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        const execLabel = this.isSolved ? '✓ 1500B MTU FRAGMENTATION COMPLETE (+3 MARKS)' : 'EXECUTE SPLIT & PASS APERTURE [SPACE]';
        ctx.fillText(execLabel, b.executeBottomBtn.x + b.executeBottomBtn.w / 2, b.executeBottomBtn.y + 21);

        ctx.restore();
    }
}

// Global Export
const fragmentationInstance = new FragmentationMinigame();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.FragmentationMinigame = fragmentationInstance;
    window.FragmentationMinigame = fragmentationInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FragmentationMinigame, fragmentationMinigame: fragmentationInstance };
}
