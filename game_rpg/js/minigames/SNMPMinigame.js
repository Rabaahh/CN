// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// SNMPMinigame.js - Sector 4: SNMP MIB-2 Management & OID Tree Infiltration
// KTU Module 4: Network Management - Model Paper Q8 & Q16(b) (6 Marks)
// Hierarchical OID Tree (1.3.6.1.2.1), SNMP PDUs (Get, Set on 161; Trap on 162)
// ==========================================================================

class SNMPMinigame {
    constructor() {
        this.isOpen = false;
        this.isSolved = false;
        this.activeTab = 0;
        this.tabNames = ['[1] MIB-2 OID HIERARCHY & PDUs (3.0M)', '[2] ASN.1 SYNTAX COMPILER (3.0M)', '[3] KTU SCHEME: SMI/MIB/SNMP (6.0M)'];

        // ------------------------------------------------------------------
        // MIB-2 Hierarchical OID Tree Structure (1.3.6.1.2.1)
        // ------------------------------------------------------------------
        this.treeNodes = [
            { id: 'iso', name: 'iso', num: 1, oid: '1', level: 0, expanded: true },
            { id: 'org', name: 'org', num: 3, oid: '1.3', level: 1, expanded: true },
            { id: 'dod', name: 'dod', num: 6, oid: '1.3.6', level: 2, expanded: true },
            { id: 'internet', name: 'internet', num: 1, oid: '1.3.6.1', level: 3, expanded: true },
            { id: 'mgmt', name: 'mgmt', num: 2, oid: '1.3.6.1.2', level: 4, expanded: true },
            { id: 'mib2', name: 'mib-2', num: 1, oid: '1.3.6.1.2.1', level: 5, expanded: true },
            // MIB-2 Object Groups
            { id: 'system', name: 'system(1)', num: 1, oid: '1.3.6.1.2.1.1', level: 6, expanded: false },
            { id: 'sysUpTime', name: 'sysUpTime.0', num: 3, oid: '1.3.6.1.2.1.1.3.0', level: 7, type: 'TimeTicks', val: '42891230 (49d 15h)' },
            { id: 'interfaces', name: 'interfaces(2)', num: 2, oid: '1.3.6.1.2.1.2', level: 6, expanded: false },
            { id: 'ifAdminStatus', name: 'ifAdminStatus.1', num: 7, oid: '1.3.6.1.2.1.2.2.1.7.1', level: 7, type: 'INTEGER', val: '2 (down)' },
            { id: 'ip', name: 'ip(4)', num: 4, oid: '1.3.6.1.2.1.4', level: 6, expanded: false },
            { id: 'tcp', name: 'tcp(6)', num: 6, oid: '1.3.6.1.2.1.6', level: 6, expanded: false },
            { id: 'udp', name: 'udp(7)', num: 7, oid: '1.3.6.1.2.1.7', level: 6, expanded: false }
        ];

        this.selectedOid = '1.3.6.1.2.1';
        this.selectedNode = 'mib-2';

        // ------------------------------------------------------------------
        // SNMP Protocol Operations & PDU Challenges
        // ------------------------------------------------------------------
        this.pduOperations = [
            {
                id: 'get_uptime',
                name: 'GetRequest (sysUpTime.0)',
                port: 'UDP 161',
                desc: 'Manager reads sysUpTime.0 (1.3.6.1.2.1.1.3.0). Agent returns 42891230 TimeTicks.',
                executed: false
            },
            {
                id: 'set_admin',
                name: 'SetRequest (ifAdminStatus.1 = 1)',
                port: 'UDP 161',
                desc: 'Manager overwrites ifAdminStatus.1 to 1 (up). Overrides Titan Core blast doors!',
                executed: false
            },
            {
                id: 'trap_link',
                name: 'Trap (LinkUp Alert)',
                port: 'UDP 162',
                desc: 'Agent sends unsolicited asynchronous event notification on port 162 to Manager.',
                executed: false
            }
        ];

        // Reference to ASN.1 Debugger component
        this.asn1Debugger = null;

        this.statusMessage = 'SNMP MIB CONSOLE ACTIVE: Navigate OID tree (1.3.6.1.2.1) and execute SNMP operations!';
        this.awardedMarks = 0;
        this.animTimer = 0;

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
            // PDU action buttons in Tab 0
            pduBtn1: { x: 580, y: 310, w: 340, h: 36 },
            pduBtn2: { x: 580, y: 360, w: 340, h: 36 },
            pduBtn3: { x: 580, y: 410, w: 340, h: 36 },
            // Bottom Action buttons
            autoBtn: { x: 190, y: 615, w: 160, h: 34 },
            resetBtn: { x: 360, y: 615, w: 140, h: 34 },
            finalizeBtn: { x: 520, y: 615, w: 340, h: 34 }
        };
    }

    init() {
        if (typeof window !== 'undefined' && window.ASN1Debugger) {
            this.asn1Debugger = window.ASN1Debugger;
        } else if (typeof ASN1Debugger !== 'undefined') {
            this.asn1Debugger = new ASN1Debugger();
        }
    }

    open() {
        this.isOpen = true;
        this.init();
        if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxPing === 'function') {
            window.CyberAudio.sfxPing();
        }
    }

    close() {
        this.isOpen = false;
    }

    handleInput(input) {
        if (!this.isOpen || !input) return;

        // Delegate to ASN.1 Debugger if on Tab 1
        if (this.activeTab === 1 && this.asn1Debugger) {
            // Check if Esc or Tab pressed to handle modal-level navigation
            if (input.isJustPressed('escape') || input.isJustPressed('e')) {
                this.close();
                return;
            }
            if (input.isJustPressed('tab') || input.isJustPressed('q')) {
                this.activeTab = (this.activeTab + 1) % 3;
                this.playClickSfx();
                return;
            }

            this.asn1Debugger.handleInput(input);
            return;
        }

        // Close on Esc / E
        if (input.isJustPressed('escape') || input.isJustPressed('e')) {
            this.close();
            return;
        }

        // Cycle tabs on Tab / Q
        if (input.isJustPressed('tab') || input.isJustPressed('q')) {
            this.activeTab = (this.activeTab + 1) % 3;
            this.playClickSfx();
        }

        // Quick actions
        if (input.isJustPressed('a')) {
            this.autoSolve();
        }
        if (input.isJustPressed('r')) {
            this.reset();
        }
        if (input.isJustPressed(' ') && this.isAllComplete()) {
            this.finalizeManagementHack();
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

        // Delegate click to ASN.1 Debugger if on Tab 1
        if (this.activeTab === 1 && this.asn1Debugger) {
            this.asn1Debugger.handleClick(mx, my);
            return;
        }

        // Bottom Controls
        if (mx >= b.autoBtn.x && mx <= b.autoBtn.x + b.autoBtn.w && my >= b.autoBtn.y && my <= b.autoBtn.y + b.autoBtn.h) {
            this.autoSolve();
            return;
        }
        if (mx >= b.resetBtn.x && mx <= b.resetBtn.x + b.resetBtn.w && my >= b.resetBtn.y && my <= b.resetBtn.y + b.resetBtn.h) {
            this.reset();
            return;
        }
        if (mx >= b.finalizeBtn.x && mx <= b.finalizeBtn.x + b.finalizeBtn.w && my >= b.finalizeBtn.y && my <= b.finalizeBtn.y + b.finalizeBtn.h) {
            if (this.isAllComplete()) {
                this.finalizeManagementHack();
            } else {
                this.statusMessage = 'EXECUTE ALL 3 SNMP PDUs AND COMPILE ASN.1 CODE TO FINALIZE (+6 MARKS)!';
                this.playDeniedSfx();
            }
            return;
        }

        // Tab 0 Controls (SNMP PDU Operations)
        if (this.activeTab === 0) {
            // PDU 1: GetRequest sysUpTime
            if (mx >= b.pduBtn1.x && mx <= b.pduBtn1.x + b.pduBtn1.w && my >= b.pduBtn1.y && my <= b.pduBtn1.y + b.pduBtn1.h) {
                this.pduOperations[0].executed = true;
                this.selectedOid = '1.3.6.1.2.1.1.3.0';
                this.selectedNode = 'sysUpTime.0';
                this.statusMessage = '✓ GetRequest (UDP 161): sysUpTime.0 = 42891230 TimeTicks (49d 15h). Uptime verified!';
                this.playClickSfx();
                return;
            }
            // PDU 2: SetRequest ifAdminStatus
            if (mx >= b.pduBtn2.x && mx <= b.pduBtn2.x + b.pduBtn2.w && my >= b.pduBtn2.y && my <= b.pduBtn2.y + b.pduBtn2.h) {
                this.pduOperations[1].executed = true;
                this.selectedOid = '1.3.6.1.2.1.2.2.1.7.1';
                this.selectedNode = 'ifAdminStatus.1';
                this.treeNodes.find(n => n.id === 'ifAdminStatus').val = '1 (up)';
                this.statusMessage = '✓ SetRequest (UDP 161): ifAdminStatus.1 OVERWRITTEN to 1 (up)! Blast doors unlocked.';
                this.playClickSfx();
                return;
            }
            // PDU 3: Trap LinkUp Alert
            if (mx >= b.pduBtn3.x && mx <= b.pduBtn3.x + b.pduBtn3.w && my >= b.pduBtn3.y && my <= b.pduBtn3.y + b.pduBtn3.h) {
                this.pduOperations[2].executed = true;
                this.statusMessage = '✓ Trap Event (UDP 162): Agent dispatched unsolicited LinkUp alert to Manager port 162!';
                this.playSuccessSfx();
                return;
            }

            // OID Tree row clicking
            this.treeNodes.forEach((node, idx) => {
                const rowY = 200 + idx * 24;
                if (mx >= 200 && mx <= 540 && my >= rowY && my <= rowY + 22) {
                    this.selectedOid = node.oid;
                    this.selectedNode = node.name;
                    this.statusMessage = `OID SELECTED: ${node.oid} (${node.name})`;
                    this.playClickSfx();
                }
            });
        }
    }

    isSnmpComplete() {
        return this.pduOperations.every(op => op.executed);
    }

    isAllComplete() {
        const asn1Valid = this.asn1Debugger ? this.asn1Debugger.isAllValid() : true;
        return this.isSnmpComplete() && asn1Valid;
    }

    autoSolve() {
        this.pduOperations.forEach(op => op.executed = true);
        const ifNode = this.treeNodes.find(n => n.id === 'ifAdminStatus');
        if (ifNode) ifNode.val = '1 (up)';

        if (!this.asn1Debugger) this.init();
        if (this.asn1Debugger) {
            this.asn1Debugger.autoSolve();
        }

        this.statusMessage = 'AUTO-MANAGEMENT INFILTRATION COMPLETE: SNMP PDUs & ASN.1 verified! Click [FINALIZE & CLAIM +6 MARKS].';
        this.playSuccessSfx();
    }

    reset() {
        this.pduOperations.forEach(op => op.executed = false);
        const ifNode = this.treeNodes.find(n => n.id === 'ifAdminStatus');
        if (ifNode) ifNode.val = '2 (down)';

        if (this.asn1Debugger) {
            this.asn1Debugger.reset();
        }

        this.statusMessage = 'RESET COMPLETED: Navigate MIB-2 tree and execute Get/Set/Trap operations.';
        this.playClickSfx();
    }

    finalizeManagementHack() {
        this.isSolved = true;
        this.isOpen = false;
        this.awardedMarks = 6.0;

        // 1. Award +6 Marks in GameState
        if (typeof window !== 'undefined' && window.GameState) {
            if (typeof window.GameState.addMarks === 'function') {
                window.GameState.addMarks(6.0);
            }
            if (typeof window.GameState.addItem === 'function') {
                window.GameState.addItem({
                    id: 'SNMP_ADMIN_TOKEN',
                    name: 'SNMP_ADMIN_TOKEN (UDP 161/162 Root Key)',
                    type: 'SECURITY'
                });
            }
        }

        // 2. Audio Triumph
        if (typeof window !== 'undefined' && window.CyberAudio) {
            if (typeof window.CyberAudio.sfxHttpSuccess === 'function') {
                window.CyberAudio.sfxHttpSuccess();
            } else if (typeof window.CyberAudio.sfxAccessGranted === 'function') {
                window.CyberAudio.sfxAccessGranted();
            }
        }

        console.log('[SNMPMinigame] SNMP INFILTRATION COMPLETE! +6.0 Marks awarded (Total: 60/60 Marks - 100% S Grade Mastery!). Titan Core Override active.');
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
    // Render Modal Screen
    // ======================================================================
    render(ctx) {
        if (!this.isOpen) return;
        this.animTimer += 0.016;

        // If on Tab 1, delegate render to ASN1Debugger
        if (this.activeTab === 1 && this.asn1Debugger) {
            this.asn1Debugger.render(ctx);
            return;
        }

        const b = this.uiBounds;

        ctx.save();

        // 1. Semi-transparent backdrop
        ctx.fillStyle = 'rgba(4, 6, 16, 0.9)';
        ctx.fillRect(0, 0, 1280, 720);

        // 2. Modal Frame
        ctx.fillStyle = 'rgba(6, 14, 28, 0.98)';
        ctx.fillRect(b.modalX, b.modalY, b.modalW, b.modalH);

        ctx.strokeStyle = '#00ffcc';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#00ffcc';
        ctx.shadowBlur = 16;
        ctx.strokeRect(b.modalX, b.modalY, b.modalW, b.modalH);

        // Top Header
        ctx.fillStyle = 'rgba(0, 255, 204, 0.15)';
        ctx.fillRect(b.modalX, b.modalY, b.modalW, 55);

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 16px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('SNMP NETWORK MANAGEMENT CONSOLE // MIB-2 OID TREE & ASN.1 IDE', b.modalX + 24, b.modalY + 34);

        // Close Button [ESC]
        ctx.fillStyle = 'rgba(255, 0, 85, 0.2)';
        ctx.fillRect(b.closeBtn.x, b.closeBtn.y, b.closeBtn.w, b.closeBtn.h);
        ctx.strokeStyle = '#ff0055';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.closeBtn.x, b.closeBtn.y, b.closeBtn.w, b.closeBtn.h);
        ctx.fillStyle = '#ff0055';
        ctx.font = 'bold 13px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('ESC', b.closeBtn.x + b.closeBtn.w / 2, b.closeBtn.y + 21);

        // Subheader
        ctx.fillStyle = '#c084fc';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('MODULE 4: KTU MODEL PAPER Q8 & Q16(b) (6.0 MARKS) — MIB-2 (1.3.6.1.2.1) & SNMP PDUs', b.modalX + 24, b.modalY + 80);

        // Navigation Tabs
        b.tabBtns.forEach((tab, idx) => {
            const isActive = this.activeTab === idx;
            ctx.fillStyle = isActive ? 'rgba(0, 255, 204, 0.35)' : 'rgba(16, 28, 48, 0.5)';
            ctx.fillRect(tab.x, tab.y, tab.w, tab.h);

            ctx.strokeStyle = isActive ? '#00ffcc' : 'rgba(0, 255, 204, 0.4)';
            ctx.lineWidth = isActive ? 2 : 1;
            ctx.strokeRect(tab.x, tab.y, tab.w, tab.h);

            ctx.fillStyle = isActive ? '#00ffcc' : '#a0b0d0';
            ctx.font = 'bold 10px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.tabNames[idx], tab.x + tab.w / 2, tab.y + 19);
        });

        // 3. Render Active Tab Content
        if (this.activeTab === 0) {
            this.renderTab0_MibTree(ctx);
        } else if (this.activeTab === 2) {
            this.renderTab2_KtuIntel(ctx);
        }

        // 4. Status Bar
        ctx.fillStyle = 'rgba(4, 10, 20, 0.95)';
        ctx.fillRect(b.modalX + 10, b.modalY + b.modalH - 85, b.modalW - 20, 28);
        ctx.strokeStyle = 'rgba(0, 255, 204, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.modalX + 10, b.modalY + b.modalH - 85, b.modalW - 20, 28);

        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(this.statusMessage, b.modalX + b.modalW / 2, b.modalY + b.modalH - 67);

        // 5. Bottom Action Buttons
        // Auto Solve
        ctx.fillStyle = 'rgba(0, 229, 255, 0.15)';
        ctx.fillRect(b.autoBtn.x, b.autoBtn.y, b.autoBtn.w, b.autoBtn.h);
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.autoBtn.x, b.autoBtn.y, b.autoBtn.w, b.autoBtn.h);
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('AUTO-INFILTRATE [A]', b.autoBtn.x + b.autoBtn.w / 2, b.autoBtn.y + 21);

        // Reset
        ctx.fillStyle = 'rgba(255, 170, 0, 0.15)';
        ctx.fillRect(b.resetBtn.x, b.resetBtn.y, b.resetBtn.w, b.resetBtn.h);
        ctx.strokeStyle = '#ffaa00';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.resetBtn.x, b.resetBtn.y, b.resetBtn.w, b.resetBtn.h);
        ctx.fillStyle = '#ffaa00';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('RESET [R]', b.resetBtn.x + b.resetBtn.w / 2, b.resetBtn.y + 21);

        // Finalize
        const canFinalize = this.isAllComplete();
        ctx.fillStyle = canFinalize ? 'rgba(0, 255, 136, 0.25)' : 'rgba(30, 40, 60, 0.4)';
        ctx.fillRect(b.finalizeBtn.x, b.finalizeBtn.y, b.finalizeBtn.w, b.finalizeBtn.h);
        ctx.strokeStyle = canFinalize ? '#00ff88' : '#556677';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.finalizeBtn.x, b.finalizeBtn.y, b.finalizeBtn.w, b.finalizeBtn.h);

        ctx.fillStyle = canFinalize ? '#00ff88' : '#556677';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        const label = this.isSolved ? '✓ SNMP MANAGEMENT OVERRIDE ACTIVE (+6.0 MARKS)' : 'FINALIZE MANAGEMENT OVERRIDE (+6 MARKS) [SPACE]';
        ctx.fillText(label, b.finalizeBtn.x + b.finalizeBtn.w / 2, b.finalizeBtn.y + 21);

        ctx.restore();
    }

    // ======================================================================
    // Tab 0: MIB-2 Tree Explorer & PDU Execution
    // ======================================================================
    renderTab0_MibTree(ctx) {
        ctx.save();
        const b = this.uiBounds;

        // Left Pane: MIB-2 OID Tree
        ctx.fillStyle = 'rgba(8, 16, 32, 0.94)';
        ctx.fillRect(200, 180, 360, 330);
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 1;
        ctx.strokeRect(200, 180, 360, 330);

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('MIB-2 OBJECT IDENTIFIER (OID) TREE:', 215, 200);

        this.treeNodes.forEach((node, idx) => {
            const rowY = 215 + idx * 22;
            const isSelected = this.selectedOid === node.oid;

            if (isSelected) {
                ctx.fillStyle = 'rgba(0, 255, 204, 0.2)';
                ctx.fillRect(205, rowY - 14, 350, 20);
            }

            // Indentation
            const indent = 215 + node.level * 14;

            ctx.fillStyle = isSelected ? '#00ffcc' : (node.level >= 5 ? '#ffd700' : '#88aacc');
            ctx.font = `${isSelected ? 'bold' : 'normal'} 9px "Fira Code", monospace`;
            const prefix = node.level === 0 ? '' : '└── ';
            const valSuffix = node.val ? ` = ${node.val}` : '';
            ctx.fillText(`${prefix}${node.name}${valSuffix}`, indent, rowY);
        });

        // Right Pane: SNMP PDU Operations
        ctx.fillStyle = 'rgba(8, 16, 32, 0.94)';
        ctx.fillRect(570, 180, 360, 330);
        ctx.strokeStyle = '#00ffcc';
        ctx.lineWidth = 1;
        ctx.strokeRect(570, 180, 360, 330);

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('SNMP PROTOCOL OPERATIONS & PDUs:', 585, 200);

        ctx.fillStyle = '#ffd700';
        ctx.font = '8px "Fira Code", monospace';
        ctx.fillText('Execute Get, Set, and Trap operations to seize admin control:', 585, 218);

        // Currently selected OID display
        ctx.fillStyle = 'rgba(10, 24, 48, 0.9)';
        ctx.fillRect(585, 230, 330, 50);
        ctx.strokeStyle = 'rgba(0, 255, 204, 0.4)';
        ctx.lineWidth = 1;
        ctx.strokeRect(585, 230, 330, 50);

        ctx.fillStyle = '#88aacc';
        ctx.font = '8px "Fira Code", monospace';
        ctx.fillText('SELECTED OBJECT IDENTIFIER:', 595, 246);
        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.fillText(`${this.selectedOid} (${this.selectedNode})`, 595, 264);

        // PDU Buttons
        const pdu1 = this.pduOperations[0];
        ctx.fillStyle = pdu1.executed ? 'rgba(0, 255, 136, 0.25)' : 'rgba(0, 229, 255, 0.2)';
        ctx.fillRect(b.pduBtn1.x, b.pduBtn1.y, b.pduBtn1.w, b.pduBtn1.h);
        ctx.strokeStyle = pdu1.executed ? '#00ff88' : '#00e5ff';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.pduBtn1.x, b.pduBtn1.y, b.pduBtn1.w, b.pduBtn1.h);
        ctx.fillStyle = pdu1.executed ? '#00ff88' : '#ffffff';
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(pdu1.executed ? `✓ ${pdu1.name} [COMPLETED]` : `[SEND] ${pdu1.name} (PORT 161)`, b.pduBtn1.x + b.pduBtn1.w / 2, b.pduBtn1.y + 22);

        const pdu2 = this.pduOperations[1];
        ctx.fillStyle = pdu2.executed ? 'rgba(0, 255, 136, 0.25)' : 'rgba(255, 170, 0, 0.2)';
        ctx.fillRect(b.pduBtn2.x, b.pduBtn2.y, b.pduBtn2.w, b.pduBtn2.h);
        ctx.strokeStyle = pdu2.executed ? '#00ff88' : '#ffaa00';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.pduBtn2.x, b.pduBtn2.y, b.pduBtn2.w, b.pduBtn2.h);
        ctx.fillStyle = pdu2.executed ? '#00ff88' : '#ffffff';
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(pdu2.executed ? `✓ ${pdu2.name} [ADMIN OVERRIDE]` : `[SEND] ${pdu2.name} (PORT 161)`, b.pduBtn2.x + b.pduBtn2.w / 2, b.pduBtn2.y + 22);

        const pdu3 = this.pduOperations[2];
        ctx.fillStyle = pdu3.executed ? 'rgba(0, 255, 136, 0.25)' : 'rgba(192, 132, 252, 0.2)';
        ctx.fillRect(b.pduBtn3.x, b.pduBtn3.y, b.pduBtn3.w, b.pduBtn3.h);
        ctx.strokeStyle = pdu3.executed ? '#00ff88' : '#c084fc';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.pduBtn3.x, b.pduBtn3.y, b.pduBtn3.w, b.pduBtn3.h);
        ctx.fillStyle = pdu3.executed ? '#00ff88' : '#ffffff';
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(pdu3.executed ? `✓ ${pdu3.name} [DISPATCHED]` : `[DISPATCH] ${pdu3.name} (PORT 162)`, b.pduBtn3.x + b.pduBtn3.w / 2, b.pduBtn3.y + 22);

        // Hint for Tab 1
        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('► Proceed to Tab [2] to debug faulty ASN.1 declarations & compile schema!', 750, 485);

        ctx.restore();
    }

    // ======================================================================
    // Tab 2: KTU Intel & Scheme Reference
    // ======================================================================
    renderTab2_KtuIntel(ctx) {
        ctx.save();

        ctx.fillStyle = 'rgba(8, 14, 34, 0.9)';
        ctx.fillRect(190, 180, 750, 310);
        ctx.strokeStyle = '#00ffcc';
        ctx.lineWidth = 1;
        ctx.strokeRect(190, 180, 750, 310);

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('KTU PCCST501 MODULE 4: NETWORK MANAGEMENT & SNMP ARCHITECTURE (6.0 MARKS)', 205, 205);

        ctx.font = '9px "Fira Code", monospace';
        ctx.fillStyle = '#ffd700';
        ctx.fillText('1. THE NETWORK MANAGEMENT TRIUMVIRATE (KTU Model Paper Q8):', 205, 230);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('• SMI (Structure of Management Information): Defines ASN.1 naming rules, object syntax, and OID tree.', 215, 246);
        ctx.fillText('• MIB (Management Information Base): Virtual database storing managed objects (MIB-2: 1.3.6.1.2.1).', 215, 260);
        ctx.fillText('• SNMP (Simple Network Management Protocol): Defines PDU message formats exchanged between Manager & Agent.', 215, 274);

        ctx.fillStyle = '#ffd700';
        ctx.fillText('2. SNMP PORTS & PDU OPERATIONS (KTU Model Paper Q16b):', 205, 302);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('• UDP PORT 161: Used by Manager to send GetRequest, GetNextRequest, GetBulkRequest, SetRequest.', 215, 318);
        ctx.fillText('• UDP PORT 162: Used exclusively by Agent to send TRAPS (unsolicited asynchronous alerts) to Manager.', 215, 332);
        ctx.fillText('• Trap types: coldStart, warmStart, linkDown, linkUp, authenticationFailure, egpNeighborLoss.', 215, 346);

        ctx.fillStyle = '#ffd700';
        ctx.fillText('3. MIB-2 GROUPS (1.3.6.1.2.1):', 205, 374);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('• system (1), interfaces (2), at (3), ip (4), icmp (5), tcp (6), udp (7), egp (8), snmp (11).', 215, 390);
        ctx.fillText('• Scalar vs Tabular: Scalar ends with .0 (e.g., sysUpTime.0). Tabular indexed by row (ifAdminStatus.1).', 215, 404);

        ctx.restore();
    }
}

// Global Export
const snmpMinigameInstance = new SNMPMinigame();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.SNMPMinigame = snmpMinigameInstance;
    window.SNMPMinigame = snmpMinigameInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SNMPMinigame, snmpMinigame: snmpMinigameInstance };
}
