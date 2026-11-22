// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// SwitchLearningMinigame.js - Interactive 4-Port Ethernet Switch Console & CENTINEL-802 Boss
// KTU Module 3 Exam Question: Set 5 Q13(b) / Model Paper Q14(b) (9 Marks)
// Learning, Flooding, Forwarding, Filtering & Hub vs Switch vs Router Matrix
// ==========================================================================

class SwitchLearningMinigame {
    constructor() {
        this.isOpen = false;
        this.isSolved = false;

        // Current Progression Scenario Step (0 to 3)
        // 0 = Initial (Empty Table)
        // 1 = Frame 1 (Host A -> Host B, Learn A, Flood to 2,3,4)
        // 2 = Frame 2 (Host B -> Host A, Learn B, Unicast to 1)
        // 3 = Frame 3 (Host C -> Host B, Learn C, Unicast to 3)
        // 4 = All Scenarios Complete / Verified
        this.scenarioStep = 0;
        this.scenarioSubPhase = 'AWAITING_LEARN'; // 'AWAITING_LEARN', 'AWAITING_DECISION', 'ANIMATING_FRAME', 'PHASE_DONE'

        // Dynamic MAC Address Table: Array of { port, mac, host, timer, status }
        this.macTable = [];

        // Connected Hosts on the 4-Port Switch
        this.hosts = {
            1: { port: 1, name: 'Host A', mac: 'AA:AA:AA:AA:AA:AA', ip: '192.168.1.10', x: 260, y: 340, side: 'LEFT' },
            2: { port: 2, name: 'Host C', mac: 'CC:CC:CC:CC:CC:CC', ip: '192.168.1.30', x: 480, y: 190, side: 'TOP' },
            3: { port: 3, name: 'Host B', mac: 'BB:BB:BB:BB:BB:BB', ip: '192.168.1.20', x: 700, y: 340, side: 'RIGHT' },
            4: { port: 4, name: 'Host D', mac: 'DD:DD:DD:DD:DD:DD', ip: '192.168.1.40', x: 480, y: 490, side: 'BOTTOM' }
        };

        // Switch Center Coordinates
        this.switchCenter = { x: 480, y: 340, w: 140, h: 100 };

        // Active Port LED States ('IDLE', 'RECEIVING', 'FORWARDING', 'FLOODING', 'FILTERED')
        this.portStates = { 1: 'IDLE', 2: 'IDLE', 3: 'IDLE', 4: 'IDLE' };

        // Animation State for Floating Packet Dots
        this.activePackets = []; // Array of { startX, startY, targetX, targetY, progress, color, label }
        this.animTimer = 0;

        // Active Tab: 0 = Switch Learning Simulator, 1 = Hub vs Switch vs Router, 2 = KTU Scheme & Boss Intel
        this.activeTab = 0;
        this.tabNames = ['[1] 4-PORT SWITCH LEARNING SIMULATOR', '[2] HUB vs SWITCH vs ROUTER MATRIX', '[3] KTU SCHEME & BOSS INTEL'];

        // Status & Feedback
        this.statusMessage = 'FRAME 1 ARRIVES AT PORT 1: [Src: AA:AA:AA:AA:AA:AA -> Dst: BB:BB:BB:BB:BB:BB]. CLICK [LEARN SOURCE MAC]!';
        this.awardedMarks = 0; // Total 9.0 Marks

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
            // Action Buttons in Simulator Tab
            actionBtn1: { x: 780, y: 480, w: 310, h: 38 },
            actionBtn2: { x: 780, y: 525, w: 310, h: 38 },
            actionBtn3: { x: 780, y: 570, w: 310, h: 38 },
            autoBtn: { x: 190, y: 615, w: 160, h: 34 },
            resetBtn: { x: 360, y: 615, w: 140, h: 34 },
            bossDefeatBtn: { x: 520, y: 615, w: 340, h: 34 }
        };
    }

    open() {
        this.isOpen = true;
        this.resetPortStates();
        console.log('[SwitchLearningMinigame] Console opened.');
    }

    close() {
        this.isOpen = false;
        console.log('[SwitchLearningMinigame] Console closed.');
    }

    resetPortStates() {
        this.portStates = { 1: 'IDLE', 2: 'IDLE', 3: 'IDLE', 4: 'IDLE' };
        this.activePackets = [];
    }

    // ======================================================================
    // Step Progression Logic
    // ======================================================================
    handleAction(actionId) {
        if (this.isSolved && actionId !== 'RESET') return;

        if (this.scenarioStep === 0) {
            // Scenario 1: Frame 1 from Host A (Port 1) to Host B (Dst: BB:... unknown)
            if (actionId === 'LEARN_A') {
                this.macTable.push({
                    port: 1,
                    mac: 'AA:AA:AA:AA:AA:AA',
                    host: 'Host A',
                    timer: 300,
                    status: 'LEARNED (DYNAMIC)'
                });
                this.portStates[1] = 'RECEIVING';
                this.scenarioSubPhase = 'AWAITING_DECISION';
                this.statusMessage = 'SOURCE LEARNED: Port 1 -> AA:AA:AA:AA:AA:AA! Dst BB:BB:BB:BB:BB:BB is NOT in table. CHOOSE SWITCH ACTION:';
                this.playClickSfx();
            } else if (actionId === 'FLOOD_1') {
                // Correct: Flood to all ports EXCEPT incoming Port 1
                this.portStates[1] = 'FILTERED'; // Port 1 is not sent back (prevents loop)
                this.portStates[2] = 'FLOODING';
                this.portStates[3] = 'FLOODING';
                this.portStates[4] = 'FLOODING';
                this.spawnPacketsFromSwitch([2, 3, 4], '#ffaa00', 'FLOOD FRAME');
                this.scenarioStep = 1;
                this.scenarioSubPhase = 'AWAITING_LEARN';
                this.awardedMarks = Math.max(this.awardedMarks, 3.0);
                this.statusMessage = 'CORRECT! Switch FLOODS to Ports 2, 3, 4 (incoming Port 1 filtered). Host B accepts; others drop (+3 Marks).';
                this.playSuccessSfx();
            } else if (actionId === 'ERR_UNICAST' || actionId === 'ERR_DROP') {
                this.statusMessage = 'ERROR! Destination BB:BB:BB:BB:BB:BB is unknown in table. Switch MUST FLOOD to all ports except incoming port!';
                this.playDeniedSfx();
            }
        } else if (this.scenarioStep === 1) {
            // Scenario 2: Frame 2 from Host B (Port 3) replying to Host A (Dst: AA:... in table on Port 1)
            if (actionId === 'LEARN_B') {
                this.macTable.push({
                    port: 3,
                    mac: 'BB:BB:BB:BB:BB:BB',
                    host: 'Host B',
                    timer: 300,
                    status: 'LEARNED (DYNAMIC)'
                });
                this.portStates[3] = 'RECEIVING';
                this.scenarioSubPhase = 'AWAITING_DECISION';
                this.statusMessage = 'SOURCE LEARNED: Port 3 -> BB:BB:BB:BB:BB:BB! Dst AA:AA:AA:AA:AA:AA IS found on Port 1. CHOOSE ACTION:';
                this.playClickSfx();
            } else if (actionId === 'FORWARD_TO_1') {
                // Correct: Forward ONLY to Port 1 (Selective Unicast)
                this.portStates[1] = 'FORWARDING';
                this.portStates[2] = 'FILTERED';
                this.portStates[3] = 'RECEIVING';
                this.portStates[4] = 'FILTERED';
                this.spawnPacketsFromSwitch([1], '#00ff88', 'UNICAST FRAME');
                this.scenarioStep = 2;
                this.scenarioSubPhase = 'AWAITING_LEARN';
                this.awardedMarks = Math.max(this.awardedMarks, 6.0);
                this.statusMessage = 'CORRECT! Switch SELECTIVELY FORWARDS to Port 1. Ports 2 and 4 are filtered (no collision / zero flood waste) (+3 Marks).';
                this.playSuccessSfx();
            } else if (actionId === 'ERR_FLOOD_2') {
                this.statusMessage = 'ERROR! Dst AA:... is ALREADY in the MAC table (Port 1). Flooding would waste bandwidth and cause collisions!';
                this.playDeniedSfx();
            }
        } else if (this.scenarioStep === 2) {
            // Scenario 3: Frame 3 from Host C (Port 2) to Host B (Dst: BB:... in table on Port 3)
            if (actionId === 'LEARN_C') {
                this.macTable.push({
                    port: 2,
                    mac: 'CC:CC:CC:CC:CC:CC',
                    host: 'Host C',
                    timer: 300,
                    status: 'LEARNED (DYNAMIC)'
                });
                this.portStates[2] = 'RECEIVING';
                this.scenarioSubPhase = 'AWAITING_DECISION';
                this.statusMessage = 'SOURCE LEARNED: Port 2 -> CC:CC:CC:CC:CC:CC! Dst BB:BB:BB:BB:BB:BB is on Port 3. CHOOSE ACTION:';
                this.playClickSfx();
            } else if (actionId === 'FORWARD_TO_3') {
                // Correct: Forward to Port 3
                this.portStates[1] = 'FILTERED';
                this.portStates[2] = 'RECEIVING';
                this.portStates[3] = 'FORWARDING';
                this.portStates[4] = 'FILTERED';
                this.spawnPacketsFromSwitch([3], '#00ff88', 'UNICAST FRAME');
                this.scenarioStep = 3;
                this.scenarioSubPhase = 'PHASE_DONE';
                this.statusMessage = 'ALL 3 STAGES COMPLETE! MAC Address Table is fully calibrated. Review Hub/Switch/Router matrix to defeat Boss!';
                this.playSuccessSfx();
            }
        }
    }

    spawnPacketsFromSwitch(targetPorts, color, label) {
        const sw = this.switchCenter;
        targetPorts.forEach(p => {
            const h = this.hosts[p];
            this.activePackets.push({
                startX: sw.x,
                startY: sw.y,
                targetX: h.x,
                targetY: h.y,
                progress: 0,
                color: color,
                label: label
            });
        });
    }

    autoSolve() {
        this.macTable = [
            { port: 1, mac: 'AA:AA:AA:AA:AA:AA', host: 'Host A', timer: 300, status: 'LEARNED (DYNAMIC)' },
            { port: 3, mac: 'BB:BB:BB:BB:BB:BB', host: 'Host B', timer: 300, status: 'LEARNED (DYNAMIC)' },
            { port: 2, mac: 'CC:CC:CC:CC:CC:CC', host: 'Host C', timer: 300, status: 'LEARNED (DYNAMIC)' }
        ];
        this.scenarioStep = 3;
        this.scenarioSubPhase = 'PHASE_DONE';
        this.awardedMarks = 6.0;
        this.statusMessage = 'AUTO-CALIBRATION COMPLETE: MAC Table fully populated. Click [DEFEAT CENTINEL-802] to complete Sector 2!';
        this.playSuccessSfx();
    }

    completeSectorAndDefeatBoss() {
        if (this.isSolved) return;
        this.isSolved = true;
        this.awardedMarks = 9.0;
        this.statusMessage = 'CENTINEL-802 DEFEATED! +9 MARKS AWARDED (EXAM TOTAL: 30/60 MARKS = 50%). GATEWAY TO SECTOR 3 UNLOCKED!';

        // Award 9 Marks in Global GameState
        if (typeof window !== 'undefined' && window.GameState && typeof window.GameState.addMarks === 'function') {
            window.GameState.addMarks(9);
        }

        // Complete Sector 2
        if (typeof window !== 'undefined' && window.GameState && typeof window.GameState.completeSector === 'function') {
            window.GameState.completeSector(2);
        }

        // Unlock Gateway to Sector 3 in Sector2_DataLink
        if (typeof window !== 'undefined') {
            if (window.Sector2_DataLink && window.Sector2_DataLink.sector3Gateway) {
                window.Sector2_DataLink.sector3Gateway.isUnlocked = true;
            }
            if (window.GridEngine && window.GridEngine.gameLoop && window.GridEngine.gameLoop.sector2 && window.GridEngine.gameLoop.sector2.sector3Gateway) {
                window.GridEngine.gameLoop.sector2.sector3Gateway.isUnlocked = true;
            }
        }

        // Audio Fanfare
        if (typeof window !== 'undefined' && window.CyberAudio) {
            if (typeof window.CyberAudio.sfxAccessGranted === 'function') window.CyberAudio.sfxAccessGranted();
            if (typeof window.CyberAudio.sfxBossRoar === 'function') window.CyberAudio.sfxBossRoar();
        }
    }

    reset() {
        this.macTable = [];
        this.scenarioStep = 0;
        this.scenarioSubPhase = 'AWAITING_LEARN';
        this.resetPortStates();
        this.isSolved = false;
        this.awardedMarks = 0;
        this.statusMessage = 'RESET COMPLETE: Switch MAC Address Table cleared. Click [LEARN SOURCE MAC (PORT 1)] to begin.';
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
        if (input.isJustPressed(' ') && this.scenarioStep === 3) {
            this.completeSectorAndDefeatBoss();
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
        if (mx >= b.bossDefeatBtn.x && mx <= b.bossDefeatBtn.x + b.bossDefeatBtn.w && my >= b.bossDefeatBtn.y && my <= b.bossDefeatBtn.y + b.bossDefeatBtn.h) {
            this.completeSectorAndDefeatBoss();
            return;
        }

        // Context Action Buttons (in Tab 0)
        if (this.activeTab === 0) {
            if (mx >= b.actionBtn1.x && mx <= b.actionBtn1.x + b.actionBtn1.w && my >= b.actionBtn1.y && my <= b.actionBtn1.y + b.actionBtn1.h) {
                this.onActionBtnClicked(1);
                return;
            }
            if (mx >= b.actionBtn2.x && mx <= b.actionBtn2.x + b.actionBtn2.w && my >= b.actionBtn2.y && my <= b.actionBtn2.y + b.actionBtn2.h) {
                this.onActionBtnClicked(2);
                return;
            }
            if (mx >= b.actionBtn3.x && mx <= b.actionBtn3.x + b.actionBtn3.w && my >= b.actionBtn3.y && my <= b.actionBtn3.y + b.actionBtn3.h) {
                this.onActionBtnClicked(3);
                return;
            }
        }
    }

    onActionBtnClicked(btnNum) {
        if (this.scenarioStep === 0) {
            if (this.scenarioSubPhase === 'AWAITING_LEARN' && btnNum === 1) {
                this.handleAction('LEARN_A');
            } else if (this.scenarioSubPhase === 'AWAITING_DECISION') {
                if (btnNum === 1) this.handleAction('FLOOD_1');
                else if (btnNum === 2) this.handleAction('ERR_UNICAST');
                else if (btnNum === 3) this.handleAction('ERR_DROP');
            }
        } else if (this.scenarioStep === 1) {
            if (this.scenarioSubPhase === 'AWAITING_LEARN' && btnNum === 1) {
                this.handleAction('LEARN_B');
            } else if (this.scenarioSubPhase === 'AWAITING_DECISION') {
                if (btnNum === 1) this.handleAction('FORWARD_TO_1');
                else if (btnNum === 2) this.handleAction('ERR_FLOOD_2');
                else if (btnNum === 3) this.handleAction('ERR_DROP');
            }
        } else if (this.scenarioStep === 2) {
            if (this.scenarioSubPhase === 'AWAITING_LEARN' && btnNum === 1) {
                this.handleAction('LEARN_C');
            } else if (this.scenarioSubPhase === 'AWAITING_DECISION') {
                if (btnNum === 1) this.handleAction('FORWARD_TO_3');
                else if (btnNum === 2) this.handleAction('ERR_FLOOD_2');
            }
        }
    }

    // ======================================================================
    // Render Modal Screen
    // ======================================================================
    render(ctx) {
        if (!this.isOpen) return;
        this.animTimer += 0.016;

        // Animate floating packet dots
        for (let i = this.activePackets.length - 1; i >= 0; i--) {
            const p = this.activePackets[i];
            p.progress += 0.035;
            if (p.progress >= 1.0) {
                this.activePackets.splice(i, 1);
            }
        }

        ctx.save();
        const b = this.uiBounds;

        // 1. Modal Dimming Backdrop
        ctx.fillStyle = 'rgba(2, 6, 16, 0.88)';
        ctx.fillRect(0, 0, 1280, 720);

        // 2. Modal Window Chassis
        ctx.fillStyle = '#060d1f';
        ctx.fillRect(b.modalX, b.modalY, b.modalW, b.modalH);
        ctx.strokeStyle = this.isSolved ? '#00ff88' : '#00e5ff';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 14;
        ctx.strokeRect(b.modalX, b.modalY, b.modalW, b.modalH);
        ctx.shadowBlur = 0;

        // 3. Header Bar
        ctx.fillStyle = '#0b162e';
        ctx.fillRect(b.modalX + 2, b.modalY + 2, b.modalW - 4, 58);
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.35)';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.modalX + 2, b.modalY + 2, b.modalW - 4, 58);

        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 15px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('CENTINEL-802: TRANSPARENT ETHERNET SWITCH FABRIC // KTU MODULE 3', b.modalX + 20, b.modalY + 28);

        ctx.fillStyle = '#88aacc';
        ctx.font = '11px "Fira Code", monospace';
        ctx.fillText('KTU Model Paper Q14b / Set 5 Q13b (9 Marks) | Self-Learning, Filtering, Flooding & Comparison', b.modalX + 20, b.modalY + 48);

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
            ctx.fillStyle = isSel ? 'rgba(0, 229, 255, 0.22)' : 'rgba(10, 24, 48, 0.6)';
            ctx.fillRect(tab.x, tab.y, tab.w, tab.h);
            ctx.strokeStyle = isSel ? '#00e5ff' : 'rgba(0, 229, 255, 0.3)';
            ctx.lineWidth = isSel ? 1.8 : 1;
            ctx.strokeRect(tab.x, tab.y, tab.w, tab.h);

            ctx.fillStyle = isSel ? '#00e5ff' : '#88aacc';
            ctx.font = isSel ? 'bold 10px "Fira Code", monospace' : '10px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.tabNames[idx], tab.x + tab.w / 2, tab.y + 19);
        });

        // 5. Render Selected Tab View
        if (this.activeTab === 0) {
            this.renderSimulatorTab(ctx);
        } else if (this.activeTab === 1) {
            this.renderComparisonMatrixTab(ctx);
        } else {
            this.renderSchemeAndIntelTab(ctx);
        }

        // 6. Bottom Status & Controls Bar
        this.renderBottomControls(ctx);

        ctx.restore();
    }

    // ======================================================================
    // Tab 0: Switch Learning Simulator
    // ======================================================================
    renderSimulatorTab(ctx) {
        const b = this.uiBounds;

        // Left Half: Interactive 4-Port Switch Visualizer (X: 190 -> 760, Y: 175 -> 580)
        this.renderSwitchTopology(ctx);

        // Right Half: Dynamic MAC Address Table & Action Buttons (X: 770 -> 1100)
        this.renderMacAddressTable(ctx);
        this.renderActionButtons(ctx);
    }

    renderSwitchTopology(ctx) {
        const sw = this.switchCenter;

        // 1. Draw Links from Switch to Connected Hosts
        Object.values(this.hosts).forEach(h => {
            const pState = this.portStates[h.port];
            let linkColor = 'rgba(0, 229, 255, 0.35)';
            if (pState === 'FORWARDING') linkColor = '#00ff88';
            else if (pState === 'FLOODING') linkColor = '#ffaa00';
            else if (pState === 'FILTERED') linkColor = 'rgba(255, 0, 80, 0.4)';

            ctx.save();
            ctx.strokeStyle = linkColor;
            ctx.lineWidth = (pState === 'FORWARDING' || pState === 'FLOODING') ? 3 : 1.5;
            if (pState === 'FILTERED') ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(sw.x, sw.y);
            ctx.lineTo(h.x, h.y);
            ctx.stroke();
            ctx.restore();

            // Host Node Box
            ctx.save();
            ctx.fillStyle = 'rgba(10, 26, 56, 0.9)';
            ctx.fillRect(h.x - 48, h.y - 24, 96, 48);
            ctx.strokeStyle = '#00e5ff';
            ctx.lineWidth = 1.2;
            ctx.strokeRect(h.x - 48, h.y - 24, 96, 48);

            // Host Label & MAC
            ctx.fillStyle = '#00ff88';
            ctx.font = 'bold 10px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(h.name, h.x, h.y - 6);

            ctx.fillStyle = '#ffd700';
            ctx.font = '8px "Fira Code", monospace';
            ctx.fillText(h.mac.substring(0, 11) + '...', h.x, h.y + 7);

            ctx.fillStyle = '#88aacc';
            ctx.font = '7px "Fira Code", monospace';
            ctx.fillText(`[PORT ${h.port}] ${h.ip}`, h.x, h.y + 17);
            ctx.restore();
        });

        // 2. Center Switch Chassis
        ctx.save();
        ctx.fillStyle = 'rgba(8, 20, 44, 0.96)';
        ctx.fillRect(sw.x - sw.w / 2, sw.y - sw.h / 2, sw.w, sw.h);
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 10;
        ctx.strokeRect(sw.x - sw.w / 2, sw.y - sw.h / 2, sw.w, sw.h);
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CENTINEL-802', sw.x, sw.y - 20);

        ctx.fillStyle = '#88aacc';
        ctx.font = '9px "Fira Code", monospace';
        ctx.fillText('4-PORT L2 SWITCH', sw.x, sw.y - 6);

        // 4 Port Indicator LEDs
        const portCoords = [
            { p: 1, x: sw.x - sw.w / 2 + 15, y: sw.y, label: 'P1' },
            { p: 2, x: sw.x, y: sw.y - sw.h / 2 + 15, label: 'P2' },
            { p: 3, x: sw.x + sw.w / 2 - 15, y: sw.y, label: 'P3' },
            { p: 4, x: sw.x, y: sw.y + sw.h / 2 - 15, label: 'P4' }
        ];

        portCoords.forEach(pc => {
            const st = this.portStates[pc.p];
            let ledColor = '#00e5ff';
            if (st === 'FORWARDING') ledColor = '#00ff88';
            else if (st === 'FLOODING') ledColor = '#ffaa00';
            else if (st === 'FILTERED') ledColor = '#ff0033';

            ctx.fillStyle = ledColor;
            ctx.beginPath();
            ctx.arc(pc.x, pc.y, 5, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.font = '7px "Fira Code", monospace';
            ctx.fillText(pc.label, pc.x, pc.y + (pc.label === 'P2' ? -8 : 12));
        });

        // 3. Render In-Flight Packets
        this.activePackets.forEach(pkt => {
            const curX = pkt.startX + (pkt.targetX - pkt.startX) * pkt.progress;
            const curY = pkt.startY + (pkt.targetY - pkt.startY) * pkt.progress;

            ctx.fillStyle = pkt.color;
            ctx.shadowColor = pkt.color;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(curX, curY, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        ctx.restore();
    }

    renderMacAddressTable(ctx) {
        const tx = 770;
        const ty = 175;
        const tw = 330;
        const th = 280;

        ctx.save();
        ctx.fillStyle = 'rgba(8, 18, 38, 0.9)';
        ctx.fillRect(tx, ty, tw, th);
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(tx, ty, tw, th);

        // Header
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('DYNAMIC MAC ADDRESS FORWARDING TABLE:', tx + 12, ty + 22);

        // Table Column Headers
        ctx.fillStyle = '#88aacc';
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.fillText('PORT', tx + 14, ty + 46);
        ctx.fillText('MAC ADDRESS', tx + 62, ty + 46);
        ctx.fillText('HOST', tx + 195, ty + 46);
        ctx.fillText('TTL', tx + 265, ty + 46);

        ctx.strokeStyle = 'rgba(0, 229, 255, 0.2)';
        ctx.beginPath();
        ctx.moveTo(tx + 10, ty + 54);
        ctx.lineTo(tx + tw - 10, ty + 54);
        ctx.stroke();

        if (this.macTable.length === 0) {
            ctx.fillStyle = '#ff77aa';
            ctx.font = 'italic 10px "Fira Code", monospace';
            ctx.fillText('[TABLE EMPTY: NO ADDRESSES LEARNED YET]', tx + 24, ty + 85);
            ctx.fillStyle = '#6688aa';
            ctx.font = '9px "Fira Code", monospace';
            ctx.fillText('Switch operates transparently: table builds', tx + 24, ty + 108);
            ctx.fillText('dynamically by snooping Source MAC headers.', tx + 24, ty + 124);
        } else {
            let rowY = ty + 72;
            this.macTable.forEach(entry => {
                ctx.fillStyle = '#00ff88';
                ctx.font = 'bold 10px "Fira Code", monospace';
                ctx.fillText(`Port ${entry.port}`, tx + 14, rowY);

                ctx.fillStyle = '#ffd700';
                ctx.font = '9px "Fira Code", monospace';
                ctx.fillText(entry.mac, tx + 62, rowY);

                ctx.fillStyle = '#ffffff';
                ctx.font = '9px "Fira Code", monospace';
                ctx.fillText(entry.host, tx + 195, rowY);

                ctx.fillStyle = '#00e5ff';
                ctx.font = '9px "Fira Code", monospace';
                ctx.fillText(`${entry.timer}s`, tx + 265, rowY);

                rowY += 24;
            });
        }

        // Educational hint box below table
        ctx.fillStyle = 'rgba(0, 229, 255, 0.08)';
        ctx.fillRect(tx + 10, ty + th - 80, tw - 20, 70);
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.25)';
        ctx.strokeRect(tx + 10, ty + th - 80, tw - 20, 70);

        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.fillText('TRANSPARENT BRIDGE RULE:', tx + 16, ty + th - 64);
        ctx.fillStyle = '#c0d4ec';
        ctx.font = '8px "Fira Code", monospace';
        ctx.fillText('1. Learning: ALWAYS record Source MAC + Port.', tx + 16, ty + th - 48);
        ctx.fillText('2. Flooding: If Dst unknown -> flood all ports except in.', tx + 16, ty + th - 34);
        ctx.fillText('3. Filtering: If Dst on same segment -> drop/filter.', tx + 16, ty + th - 20);

        ctx.restore();
    }

    renderActionButtons(ctx) {
        const b = this.uiBounds;

        ctx.save();
        let btn1Text = '';
        let btn2Text = '';
        let btn3Text = '';

        if (this.scenarioStep === 0) {
            if (this.scenarioSubPhase === 'AWAITING_LEARN') {
                btn1Text = '[1] LEARN SOURCE MAC (PORT 1 -> HOST A)';
            } else {
                btn1Text = '[1] FLOOD TO ALL PORTS EXCEPT PORT 1';
                btn2Text = '[2] FORWARD ONLY TO PORT 2';
                btn3Text = '[3] FILTER (DROP FRAME)';
            }
        } else if (this.scenarioStep === 1) {
            if (this.scenarioSubPhase === 'AWAITING_LEARN') {
                btn1Text = '[1] LEARN SOURCE MAC (PORT 3 -> HOST B)';
            } else {
                btn1Text = '[1] SELECTIVE FORWARD ONLY TO PORT 1';
                btn2Text = '[2] FLOOD TO PORTS 1, 2, 4';
                btn3Text = '[3] FILTER (DROP FRAME)';
            }
        } else if (this.scenarioStep === 2) {
            if (this.scenarioSubPhase === 'AWAITING_LEARN') {
                btn1Text = '[1] LEARN SOURCE MAC (PORT 2 -> HOST C)';
            } else {
                btn1Text = '[1] FORWARD SELECTIVELY TO PORT 3';
                btn2Text = '[2] FLOOD TO PORTS 1, 3, 4';
            }
        } else {
            btn1Text = '✓ ALL 3 STAGES CERTIFIED';
        }

        // Draw Action 1
        if (btn1Text) {
            ctx.fillStyle = 'rgba(0, 229, 255, 0.2)';
            ctx.fillRect(b.actionBtn1.x, b.actionBtn1.y, b.actionBtn1.w, b.actionBtn1.h);
            ctx.strokeStyle = '#00e5ff';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(b.actionBtn1.x, b.actionBtn1.y, b.actionBtn1.w, b.actionBtn1.h);

            ctx.fillStyle = '#00ff88';
            ctx.font = 'bold 10px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(btn1Text, b.actionBtn1.x + b.actionBtn1.w / 2, b.actionBtn1.y + 23);
        }

        // Draw Action 2
        if (btn2Text) {
            ctx.fillStyle = 'rgba(255, 170, 0, 0.15)';
            ctx.fillRect(b.actionBtn2.x, b.actionBtn2.y, b.actionBtn2.w, b.actionBtn2.h);
            ctx.strokeStyle = '#ffaa00';
            ctx.lineWidth = 1;
            ctx.strokeRect(b.actionBtn2.x, b.actionBtn2.y, b.actionBtn2.w, b.actionBtn2.h);

            ctx.fillStyle = '#ffd700';
            ctx.font = 'bold 9px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(btn2Text, b.actionBtn2.x + b.actionBtn2.w / 2, b.actionBtn2.y + 23);
        }

        // Draw Action 3
        if (btn3Text) {
            ctx.fillStyle = 'rgba(255, 0, 80, 0.15)';
            ctx.fillRect(b.actionBtn3.x, b.actionBtn3.y, b.actionBtn3.w, b.actionBtn3.h);
            ctx.strokeStyle = '#ff0050';
            ctx.lineWidth = 1;
            ctx.strokeRect(b.actionBtn3.x, b.actionBtn3.y, b.actionBtn3.w, b.actionBtn3.h);

            ctx.fillStyle = '#ff77aa';
            ctx.font = 'bold 9px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(btn3Text, b.actionBtn3.x + b.actionBtn3.w / 2, b.actionBtn3.y + 23);
        }

        ctx.restore();
    }

    // ======================================================================
    // Tab 1: Hub vs Switch vs Router Matrix (KTU Syllabus Essential)
    // ======================================================================
    renderComparisonMatrixTab(ctx) {
        const b = this.uiBounds;
        const sx = b.modalX + 30;
        const sy = 180;
        const sw = b.modalW - 60;

        ctx.save();
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 13px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('KTU EXAM COMPARISON MATRIX: HUB vs SWITCH vs ROUTER (QUESTION 14b / SET 5)', sx, sy);

        // Comparison Table
        const headers = ['FEATURE', 'HUB', 'SWITCH (BRIDGE)', 'ROUTER'];
        const colX = [sx, sx + 180, sx + 400, sx + 660];

        // Table Header
        ctx.fillStyle = '#0b1b36';
        ctx.fillRect(sx, sy + 15, sw, 28);
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 1;
        ctx.strokeRect(sx, sy + 15, sw, 28);

        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 10px "Fira Code", monospace';
        headers.forEach((h, idx) => {
            ctx.fillText(h, colX[idx] + 8, sy + 33);
        });

        // Rows Data
        const rows = [
            ['OSI Layer', 'Layer 1 (Physical Layer)', 'Layer 2 (Data Link Layer)', 'Layer 3 (Network Layer)'],
            ['Operating Unit', 'Raw Bits / Electrical Pulses', 'Frames (Ethernet 802.3)', 'Packets / IP Datagrams'],
            ['Addressing Used', 'None (Blind Repeating)', '48-bit MAC Addresses', '32-bit (IPv4) / 128-bit (IPv6)'],
            ['Forwarding Logic', 'Always Floods to All Ports', 'Forwards via Learned MAC Table', 'Routes via IP Routing Table (Dijkstra)'],
            ['Collision Domain', 'Single Collision Domain (All share)', 'Separate Domain Per Port (Micro-segment)', 'Separate Domain Per Interface'],
            ['Broadcast Domain', 'Single Broadcast Domain', 'Single Broadcast Domain (unless VLAN)', 'SEPARATES Broadcast Domains (No flood)']
        ];

        let ry = sy + 43;
        rows.forEach((r, rIdx) => {
            ctx.fillStyle = (rIdx % 2 === 0) ? 'rgba(8, 20, 44, 0.7)' : 'rgba(12, 28, 58, 0.7)';
            ctx.fillRect(sx, ry, sw, 32);
            ctx.strokeStyle = 'rgba(0, 229, 255, 0.2)';
            ctx.strokeRect(sx, ry, sw, 32);

            ctx.fillStyle = '#ffd700';
            ctx.font = 'bold 9px "Fira Code", monospace';
            ctx.fillText(r[0], colX[0] + 8, ry + 20);

            ctx.fillStyle = '#ff77aa';
            ctx.font = '9px "Fira Code", monospace';
            ctx.fillText(r[1], colX[1] + 8, ry + 20);

            ctx.fillStyle = '#00e5ff';
            ctx.font = 'bold 9px "Fira Code", monospace';
            ctx.fillText(r[2], colX[2] + 8, ry + 20);

            ctx.fillStyle = '#00ff88';
            ctx.font = 'bold 9px "Fira Code", monospace';
            ctx.fillText(r[3], colX[3] + 8, ry + 20);

            ry += 32;
        });

        // Key Exam Takeaway Banner
        ctx.fillStyle = 'rgba(0, 255, 136, 0.1)';
        ctx.fillRect(sx, ry + 15, sw, 65);
        ctx.strokeStyle = '#00ff88';
        ctx.strokeRect(sx, ry + 15, sw, 65);

        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.fillText('CRITICAL EXAM TAKEAWAY (SCHEME OF VALUATION):', sx + 14, ry + 35);

        ctx.fillStyle = '#d0e4fc';
        ctx.font = '9px "Fira Code", monospace';
        ctx.fillText('• A Hub extends a collision domain. A Switch BREAKS collision domains into individual ports.', sx + 14, ry + 52);
        ctx.fillText('• A Router BREAKS broadcast domains, confining broadcast storms within local subnets.', sx + 14, ry + 68);

        ctx.restore();
    }

    // ======================================================================
    // Tab 2: KTU Valuation & Boss Intel
    // ======================================================================
    renderSchemeAndIntelTab(ctx) {
        const b = this.uiBounds;
        const sx = b.modalX + 30;
        const sy = 180;

        ctx.save();
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 13px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('KTU SCHEME OF VALUATION (QUESTION 13b / 14b - 9.0 MARKS)', sx, sy);

        const lines = [
            '1. Dynamic Address Learning (+3.0 Marks):',
            '   - Switch inspects Source MAC of every incoming frame.',
            '   - Records [Source MAC <-> Incoming Port] mapping in forwarding table with aging timer.',
            '   - Prevents stale routes if a mobile device changes physical switch ports.',
            '',
            '2. Forwarding and Flooding Execution (+3.0 Marks):',
            '   - If Destination MAC is unknown: FLOOD frame out of all ports EXCEPT incoming port.',
            '   - If Destination MAC is known: UNICAST frame selectively to that port only.',
            '   - If Destination MAC is on same port: FILTER (drop) frame to avoid unnecessary transmission.',
            '',
            '3. Hub vs Switch vs Router Architecture Matrix (+3.0 Marks):',
            '   - Complete differentiation across Layers 1, 2, and 3.',
            '   - Collision domain micro-segmentation and broadcast domain isolation.'
        ];

        let ly = sy + 28;
        lines.forEach(l => {
            if (l.startsWith('1.') || l.startsWith('2.') || l.startsWith('3.')) {
                ctx.fillStyle = '#ffd700';
                ctx.font = 'bold 11px "Fira Code", monospace';
            } else {
                ctx.fillStyle = '#c0d4ec';
                ctx.font = '10px "Fira Code", monospace';
            }
            ctx.fillText(l, sx, ly);
            ly += 20;
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
        ctx.fillStyle = 'rgba(8, 20, 44, 0.95)';
        ctx.fillRect(b.modalX + 10, barY, b.modalW - 20, 32);
        ctx.strokeStyle = this.isSolved ? '#00ff88' : 'rgba(0, 229, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.modalX + 10, barY, b.modalW - 20, 32);

        ctx.fillStyle = this.isSolved ? '#00ff88' : '#00e5ff';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`STATUS: ${this.statusMessage}`, b.modalX + 20, barY + 20);

        // Auto Button
        ctx.fillStyle = 'rgba(0, 229, 255, 0.15)';
        ctx.fillRect(b.autoBtn.x, b.autoBtn.y, b.autoBtn.w, b.autoBtn.h);
        ctx.strokeStyle = '#00e5ff';
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

        // Boss Defeat / Complete Sector 2 Button
        const bossColor = this.scenarioStep >= 3 ? (this.isSolved ? '#00ff88' : '#ff007f') : '#556677';
        ctx.fillStyle = this.scenarioStep >= 3 ? (this.isSolved ? 'rgba(0, 255, 136, 0.25)' : 'rgba(255, 0, 127, 0.25)') : 'rgba(30, 40, 60, 0.4)';
        ctx.fillRect(b.bossDefeatBtn.x, b.bossDefeatBtn.y, b.bossDefeatBtn.w, b.bossDefeatBtn.h);
        ctx.strokeStyle = bossColor;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.bossDefeatBtn.x, b.bossDefeatBtn.y, b.bossDefeatBtn.w, b.bossDefeatBtn.h);

        ctx.fillStyle = bossColor;
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        const bossLabel = this.isSolved ? '✓ CENTINEL-802 DEFEATED (+9 MARKS)' : 'DEFEAT CENTINEL-802 & OPEN SECTOR 3 [SPACE]';
        ctx.fillText(bossLabel, b.bossDefeatBtn.x + b.bossDefeatBtn.w / 2, b.bossDefeatBtn.y + 21);

        ctx.restore();
    }
}

// Global Export
const switchLearningInstance = new SwitchLearningMinigame();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.SwitchLearningMinigame = switchLearningInstance;
    window.SwitchLearningMinigame = switchLearningInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SwitchLearningMinigame, switchMinigame: switchLearningInstance };
}
