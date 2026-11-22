// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// WebInfiltrationMinigame.js - Sector 4: DNS Resolution & HTTP Request Pipeline
// KTU Module 1: Application Layer - Model Paper Q9(b) / Sets 1-5 Q9(b) (4 Marks)
// DNS Hierarchy: Root -> TLD -> Authoritative + TCP Socket & HTTP 200 OK
// ==========================================================================

class WebInfiltrationMinigame {
    constructor() {
        this.isOpen = false;
        this.isSolved = false;
        this.activeTab = 0;
        this.tabNames = ['[1] DNS RESOLUTION HIERARCHY (2.5M)', '[2] HTTP TRANSACTION PIPELINE (1.5M)', '[3] KTU SCHEME & LECTURE INTEL (4.0M)'];

        // ------------------------------------------------------------------
        // Stage 1: DNS Resolution State (2.5 Marks)
        // ------------------------------------------------------------------
        this.dnsQueryMode = 'ITERATIVE'; // 'ITERATIVE' or 'RECURSIVE'
        this.dnsStep = 0; // 0..5 (0 = Initial query, 5 = Resolved)
        this.dnsNodes = [
            { id: 'client', name: 'Browser / Resolver', ip: '10.0.0.42', x: 230, y: 220, type: 'STUB' },
            { id: 'local', name: 'Local DNS Server', ip: '192.168.1.1', x: 410, y: 220, type: 'RESOLVER' },
            { id: 'root', name: 'Root DNS Server (.)', ip: '198.41.0.4', x: 610, y: 160, type: 'ROOT' },
            { id: 'tld', name: 'TLD Server (.corp)', ip: '156.154.100.3', x: 790, y: 160, type: 'TLD' },
            { id: 'auth', name: 'Authoritative DNS', ip: '10.240.0.2', x: 970, y: 220, type: 'AUTH' },
            { id: 'web', name: 'Web Server (Target)', ip: '10.240.0.1', x: 970, y: 360, type: 'WEB' }
        ];

        this.dnsSteps = [
            {
                from: 'client', to: 'local',
                label: '1. QUERY: Type A for www.titan-core.corp',
                desc: 'Browser checks local cache (Cache Miss). Dispatches query to Local DNS (192.168.1.1).'
            },
            {
                from: 'local', to: 'root',
                label: '2. QUERY: Root Server (.) for www.titan-core.corp',
                desc: 'Local DNS queries Root Name Server. Root returns referral to .corp TLD Nameserver.'
            },
            {
                from: 'local', to: 'tld',
                label: '3. QUERY: TLD Server (.corp) for www.titan-core.corp',
                desc: 'Local DNS queries .corp TLD Server. TLD returns referral to ns1.titan-core.corp.'
            },
            {
                from: 'local', to: 'auth',
                label: '4. QUERY: Authoritative Server for www.titan-core.corp',
                desc: 'Local DNS queries Authoritative Server. Returns Type A Record: 10.240.0.1 (TTL=3600).'
            },
            {
                from: 'local', to: 'client',
                label: '5. RESPONSE: Type A 10.240.0.1 returned to Client',
                desc: 'Local DNS caches IP and returns 10.240.0.1 to browser. Hostname resolved in 5 hops!'
            }
        ];

        this.stage1Complete = false;

        // Animated packet on DNS map
        this.dnsPacket = {
            active: false,
            fromX: 0, fromY: 0,
            toX: 0, toY: 0,
            x: 0, y: 0,
            progress: 0,
            speed: 2.2
        };

        // ------------------------------------------------------------------
        // Stage 2: HTTP Transaction Flow State (1.5 Marks)
        // ------------------------------------------------------------------
        this.httpStep = 0; // 0..3
        // 0 = Initial, 1 = TCP 3-Way Handshake Established, 2 = HTTP GET Sent, 3 = HTTP 200 OK Received
        this.stage2Complete = false;

        this.statusMessage = 'TARGET: www.titan-core.corp // ADVANCE DNS HIERARCHY TO RESOLVE IP ADDRESS!';
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
            // Stage 1 action buttons
            dnsAdvanceBtn: { x: 190, y: 470, w: 280, h: 36 },
            dnsModeBtn: { x: 490, y: 470, w: 240, h: 36 },
            // Stage 2 action buttons
            tcpHandshakeBtn: { x: 190, y: 300, w: 260, h: 34 },
            httpGetBtn: { x: 190, y: 350, w: 260, h: 34 },
            http200Btn: { x: 190, y: 400, w: 260, h: 34 },
            // Bottom Action buttons
            autoBtn: { x: 190, y: 615, w: 160, h: 34 },
            resetBtn: { x: 360, y: 615, w: 140, h: 34 },
            finalizeBtn: { x: 520, y: 615, w: 340, h: 34 }
        };
    }

    open() {
        this.isOpen = true;
        this.statusMessage = 'INFILTRATION CONSOLE READY: Resolve DNS hierarchy to locate 10.240.0.1!';
        if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxPing === 'function') {
            window.CyberAudio.sfxPing();
        }
    }

    close() {
        this.isOpen = false;
    }

    handleInput(input) {
        if (!this.isOpen || !input) return;

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

        // Advance DNS Step on Space or S (if on Tab 0)
        if ((input.isJustPressed(' ') || input.isJustPressed('s')) && this.activeTab === 0) {
            if (!this.stage1Complete) {
                this.advanceDnsStep();
            } else if (this.isAllComplete()) {
                this.finalizeInfiltration();
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
                this.finalizeInfiltration();
            } else {
                this.statusMessage = 'COMPLETE BOTH DNS RESOLUTION (2.5M) AND HTTP FLOW (1.5M) TO PROCEED!';
                this.playDeniedSfx();
            }
            return;
        }

        // Tab 0 Controls (DNS Resolution)
        if (this.activeTab === 0) {
            if (mx >= b.dnsAdvanceBtn.x && mx <= b.dnsAdvanceBtn.x + b.dnsAdvanceBtn.w && my >= b.dnsAdvanceBtn.y && my <= b.dnsAdvanceBtn.y + b.dnsAdvanceBtn.h) {
                this.advanceDnsStep();
                return;
            }
            if (mx >= b.dnsModeBtn.x && mx <= b.dnsModeBtn.x + b.dnsModeBtn.w && my >= b.dnsModeBtn.y && my <= b.dnsModeBtn.y + b.dnsModeBtn.h) {
                this.dnsQueryMode = this.dnsQueryMode === 'ITERATIVE' ? 'RECURSIVE' : 'ITERATIVE';
                this.statusMessage = `DNS QUERY MODE TOGGLED TO ${this.dnsQueryMode}.`;
                this.playClickSfx();
                return;
            }
        }

        // Tab 1 Controls (HTTP Transaction Pipeline)
        if (this.activeTab === 1) {
            // Step 1: TCP Handshake
            if (mx >= b.tcpHandshakeBtn.x && mx <= b.tcpHandshakeBtn.x + b.tcpHandshakeBtn.w && my >= b.tcpHandshakeBtn.y && my <= b.tcpHandshakeBtn.y + b.tcpHandshakeBtn.h) {
                if (this.httpStep === 0) {
                    this.httpStep = 1;
                    this.statusMessage = '✓ TCP 3-WAY HANDSHAKE ESTABLISHED (SYN -> SYN/ACK -> ACK) with 10.240.0.1:80!';
                    this.playClickSfx();
                }
                return;
            }
            // Step 2: HTTP GET
            if (mx >= b.httpGetBtn.x && mx <= b.httpGetBtn.x + b.httpGetBtn.w && my >= b.httpGetBtn.y && my <= b.httpGetBtn.y + b.httpGetBtn.h) {
                if (this.httpStep === 1) {
                    this.httpStep = 2;
                    this.statusMessage = '✓ HTTP GET /index.html HTTP/1.1 DISPATCHED (Host: www.titan-core.corp)!';
                    this.playClickSfx();
                } else if (this.httpStep === 0) {
                    this.statusMessage = 'ESTABLISH TCP SOCKET FIRST BEFORE ISSUING HTTP GET!';
                    this.playDeniedSfx();
                }
                return;
            }
            // Step 3: HTTP 200 OK
            if (mx >= b.http200Btn.x && mx <= b.http200Btn.x + b.http200Btn.w && my >= b.http200Btn.y && my <= b.http200Btn.y + b.http200Btn.h) {
                if (this.httpStep === 2) {
                    this.httpStep = 3;
                    this.stage2Complete = true;
                    this.statusMessage = '✓ HTTP 200 OK RECEIVED! 1024-Byte payload exfiltrated. Stage 2 complete (+1.5M)!';
                    this.playSuccessSfx();
                } else {
                    this.statusMessage = 'SEND HTTP GET REQUEST FIRST BEFORE EXPECTING HTTP 200 OK!';
                    this.playDeniedSfx();
                }
                return;
            }
        }
    }

    advanceDnsStep() {
        if (this.dnsStep < 5) {
            this.dnsStep++;
            const stepInfo = this.dnsSteps[this.dnsStep - 1];
            this.statusMessage = `[STEP ${this.dnsStep}/5] ${stepInfo.desc}`;

            // Trigger packet animation between nodes
            const fromNode = this.dnsNodes.find(n => n.id === stepInfo.from);
            const toNode = this.dnsNodes.find(n => n.id === stepInfo.to);
            if (fromNode && toNode) {
                this.dnsPacket.active = true;
                this.dnsPacket.fromX = fromNode.x;
                this.dnsPacket.fromY = fromNode.y;
                this.dnsPacket.toX = toNode.x;
                this.dnsPacket.toY = toNode.y;
                this.dnsPacket.x = fromNode.x;
                this.dnsPacket.y = fromNode.y;
                this.dnsPacket.progress = 0;
            }

            // Audio chirp
            if (typeof window !== 'undefined' && window.CyberAudio) {
                if (typeof window.CyberAudio.sfxDnsChirp === 'function') {
                    window.CyberAudio.sfxDnsChirp();
                } else if (typeof window.CyberAudio.sfxPing === 'function') {
                    window.CyberAudio.sfxPing();
                }
            }

            if (this.dnsStep === 5) {
                this.stage1Complete = true;
                this.statusMessage = '✓ DNS RESOLUTION HIERARCHY COMPLETE! IP 10.240.0.1 resolved. Proceed to Tab [2] HTTP!';
                this.playSuccessSfx();
            }
        }
    }

    isAllComplete() {
        return this.stage1Complete && this.stage2Complete;
    }

    autoSolve() {
        this.dnsStep = 5;
        this.stage1Complete = true;
        this.httpStep = 3;
        this.stage2Complete = true;
        this.statusMessage = 'AUTO-INFILTRATION COMPLETE: DNS & HTTP Pipeline verified! Click [FINALIZE INFILTRATION] to claim +4 Marks.';
        this.playSuccessSfx();
    }

    reset() {
        this.dnsStep = 0;
        this.stage1Complete = false;
        this.httpStep = 0;
        this.stage2Complete = false;
        this.dnsPacket.active = false;
        this.statusMessage = 'RESET COMPLETED: Advance DNS hops and execute HTTP transaction cycle.';
        this.playClickSfx();
    }

    finalizeInfiltration() {
        this.isSolved = true;
        this.isOpen = false;
        this.awardedMarks = 4.0;

        // 1. Award +4 Marks in GameState
        if (typeof window !== 'undefined' && window.GameState) {
            if (typeof window.GameState.addMarks === 'function') {
                window.GameState.addMarks(4.0);
            }
        }

        // 2. Unlock Web Bastion Barrier & Master Boss Gateway in Sector 4
        if (typeof window !== 'undefined') {
            if (window.Sector4_Application) {
                window.Sector4_Application.isWebTerminalCleared = true;
                if (window.Sector4_Application.masterGateway) {
                    window.Sector4_Application.masterGateway.isUnlocked = true;
                }
            }
            if (window.GridEngine && window.GridEngine.gameLoop && window.GridEngine.gameLoop.sector4) {
                window.GridEngine.gameLoop.sector4.isWebTerminalCleared = true;
                if (window.GridEngine.gameLoop.sector4.masterGateway) {
                    window.GridEngine.gameLoop.sector4.masterGateway.isUnlocked = true;
                }
            }
        }

        // 3. Audio Triumph Chord
        if (typeof window !== 'undefined' && window.CyberAudio) {
            if (typeof window.CyberAudio.sfxHttpSuccess === 'function') {
                window.CyberAudio.sfxHttpSuccess();
            } else if (typeof window.CyberAudio.sfxAccessGranted === 'function') {
                window.CyberAudio.sfxAccessGranted();
            }
        }

        console.log('[WebInfiltrationMinigame] INFILTRATION SUCCESSFUL! +4.0 Marks awarded (Total: 52/60 Marks). Sector 4 Web Bastion cleared!');
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

        // Update animated packet if active
        if (this.dnsPacket.active) {
            this.dnsPacket.progress += 0.016 * this.dnsPacket.speed;
            this.dnsPacket.x = this.dnsPacket.fromX + (this.dnsPacket.toX - this.dnsPacket.fromX) * this.dnsPacket.progress;
            this.dnsPacket.y = this.dnsPacket.fromY + (this.dnsPacket.toY - this.dnsPacket.fromY) * this.dnsPacket.progress;
            if (this.dnsPacket.progress >= 1.0) {
                this.dnsPacket.active = false;
            }
        }

        const b = this.uiBounds;

        ctx.save();

        // 1. Semi-transparent backdrop
        ctx.fillStyle = 'rgba(4, 6, 18, 0.88)';
        ctx.fillRect(0, 0, 1280, 720);

        // 2. Modal Frame
        ctx.fillStyle = 'rgba(8, 14, 38, 0.98)';
        ctx.fillRect(b.modalX, b.modalY, b.modalW, b.modalH);

        ctx.strokeStyle = '#9900ff';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#9900ff';
        ctx.shadowBlur = 16;
        ctx.strokeRect(b.modalX, b.modalY, b.modalW, b.modalH);

        // Top Header
        ctx.fillStyle = 'rgba(153, 0, 255, 0.15)';
        ctx.fillRect(b.modalX, b.modalY, b.modalW, 55);

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 16px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('SECTOR 4: APPLICATION LAYER // WEB INFILTRATION PIPELINE CONSOLE', b.modalX + 24, b.modalY + 34);

        // Close Button [X]
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
        ctx.fillText('MODULE 1: KTU MODEL PAPER Q9(b) / SETS 1-5 Q9(b) (4.0 MARKS) — DNS RESOLUTION & HTTP FLOW', b.modalX + 24, b.modalY + 80);

        // Navigation Tabs
        b.tabBtns.forEach((tab, idx) => {
            const isActive = this.activeTab === idx;
            ctx.fillStyle = isActive ? 'rgba(153, 0, 255, 0.35)' : 'rgba(20, 30, 60, 0.5)';
            ctx.fillRect(tab.x, tab.y, tab.w, tab.h);

            ctx.strokeStyle = isActive ? '#00ffcc' : 'rgba(153, 0, 255, 0.4)';
            ctx.lineWidth = isActive ? 2 : 1;
            ctx.strokeRect(tab.x, tab.y, tab.w, tab.h);

            ctx.fillStyle = isActive ? '#00ffcc' : '#a0b0d0';
            ctx.font = 'bold 10px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.tabNames[idx], tab.x + tab.w / 2, tab.y + 19);
        });

        // 3. Render Active Tab Content
        if (this.activeTab === 0) {
            this.renderTab0_DNS(ctx);
        } else if (this.activeTab === 1) {
            this.renderTab1_HTTP(ctx);
        } else if (this.activeTab === 2) {
            this.renderTab2_Intel(ctx);
        }

        // 4. Status Bar
        ctx.fillStyle = 'rgba(6, 12, 28, 0.95)';
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
        const label = this.isSolved ? '✓ INFILTRATION COMPLETE (+4.0 MARKS)' : 'FINALIZE INFILTRATION & CLAIM 4 MARKS [SPACE]';
        ctx.fillText(label, b.finalizeBtn.x + b.finalizeBtn.w / 2, b.finalizeBtn.y + 21);

        ctx.restore();
    }

    // ======================================================================
    // Tab 0: DNS Resolution Hierarchy Diagram
    // ======================================================================
    renderTab0_DNS(ctx) {
        ctx.save();

        // 1. Render Diagram Connector Lines
        ctx.strokeStyle = 'rgba(153, 0, 255, 0.35)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);

        // Lines: client <-> local, local <-> root, local <-> tld, local <-> auth
        const nodes = this.dnsNodes;
        const local = nodes[1];

        // Draw connections from Local DNS to Root, TLD, Auth
        [nodes[0], nodes[2], nodes[3], nodes[4]].forEach(target => {
            ctx.beginPath();
            ctx.moveTo(local.x, local.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
        });

        // Connection from Auth to Web Server
        ctx.beginPath();
        ctx.moveTo(nodes[4].x, nodes[4].y);
        ctx.lineTo(nodes[5].x, nodes[5].y);
        ctx.stroke();

        ctx.setLineDash([]);

        // 2. Render Animated Packet
        if (this.dnsPacket.active) {
            ctx.save();
            ctx.fillStyle = '#00ffcc';
            ctx.shadowColor = '#00ffcc';
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.arc(this.dnsPacket.x, this.dnsPacket.y, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // 3. Render DNS Nodes
        nodes.forEach((node, idx) => {
            const isTarget = idx === 5;
            const isResolved = this.dnsStep >= 5;
            const isCurrentHop = (this.dnsStep > 0 && this.dnsSteps[this.dnsStep - 1]?.to === node.id);

            ctx.save();
            ctx.fillStyle = 'rgba(10, 18, 44, 0.94)';
            ctx.beginPath();
            ctx.arc(node.x, node.y, 30, 0, Math.PI * 2);
            ctx.fill();

            const strokeCol = isCurrentHop ? '#00ffcc' : (isTarget && isResolved ? '#00ff88' : '#9900ff');
            ctx.strokeStyle = strokeCol;
            ctx.lineWidth = isCurrentHop ? 3 : 1.5;
            ctx.shadowColor = strokeCol;
            ctx.shadowBlur = isCurrentHop ? 14 : 4;
            ctx.stroke();

            // Label
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 8px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(node.name.split(' ')[0], node.x, node.y - 4);
            ctx.fillText(node.name.split(' ')[1] || '', node.x, node.y + 6);

            ctx.fillStyle = '#00e5ff';
            ctx.font = '7px "Fira Code", monospace';
            ctx.fillText(node.ip, node.x, node.y + 18);
            ctx.restore();
        });

        // 4. Trace Log Box
        ctx.fillStyle = 'rgba(10, 16, 36, 0.9)';
        ctx.fillRect(190, 290, 750, 160);
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 1;
        ctx.strokeRect(190, 290, 750, 160);

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`DNS RESOLUTION LOG // TARGET: www.titan-core.corp // MODE: ${this.dnsQueryMode} QUERYING`, 205, 310);

        this.dnsSteps.forEach((s, idx) => {
            const isExecuted = this.dnsStep > idx;
            const isCurrent = this.dnsStep === idx + 1;

            ctx.fillStyle = isCurrent ? '#ffd700' : (isExecuted ? '#00ff88' : '#556677');
            ctx.font = `${isCurrent ? 'bold' : 'normal'} 9px "Fira Code", monospace`;
            ctx.fillText(`${isExecuted ? '✓' : (isCurrent ? '►' : '○')} ${s.label}`, 205, 332 + idx * 22);
        });

        // 5. Action Buttons (Advance Hop & Toggle Mode)
        const b = this.uiBounds;
        const canAdvance = this.dnsStep < 5;

        ctx.fillStyle = canAdvance ? 'rgba(153, 0, 255, 0.3)' : 'rgba(30, 40, 60, 0.4)';
        ctx.fillRect(b.dnsAdvanceBtn.x, b.dnsAdvanceBtn.y, b.dnsAdvanceBtn.w, b.dnsAdvanceBtn.h);
        ctx.strokeStyle = canAdvance ? '#c084fc' : '#556677';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.dnsAdvanceBtn.x, b.dnsAdvanceBtn.y, b.dnsAdvanceBtn.w, b.dnsAdvanceBtn.h);
        ctx.fillStyle = canAdvance ? '#00ffcc' : '#556677';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        const advLabel = canAdvance ? `[ADVANCE DNS HOP (${this.dnsStep}/5) [SPACE]]` : '✓ ALL 5 DNS HOPS RESOLVED (2.5M)';
        ctx.fillText(advLabel, b.dnsAdvanceBtn.x + b.dnsAdvanceBtn.w / 2, b.dnsAdvanceBtn.y + 22);

        // Toggle Mode
        ctx.fillStyle = 'rgba(0, 255, 204, 0.15)';
        ctx.fillRect(b.dnsModeBtn.x, b.dnsModeBtn.y, b.dnsModeBtn.w, b.dnsModeBtn.h);
        ctx.strokeStyle = '#00ffcc';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.dnsModeBtn.x, b.dnsModeBtn.y, b.dnsModeBtn.w, b.dnsModeBtn.h);
        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`MODE: ${this.dnsQueryMode} [CLICK TO TOGGLE]`, b.dnsModeBtn.x + b.dnsModeBtn.w / 2, b.dnsModeBtn.y + 22);

        ctx.restore();
    }

    // ======================================================================
    // Tab 1: HTTP Transaction Pipeline
    // ======================================================================
    renderTab1_HTTP(ctx) {
        ctx.save();
        const b = this.uiBounds;

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('TARGET SERVER: 10.240.0.1:80 (www.titan-core.corp) // HTTP/1.1 PERSISTENT SOCKET', 190, 190);

        // Step 1: TCP Handshake Button
        const s1Active = this.httpStep >= 1;
        ctx.fillStyle = s1Active ? 'rgba(0, 255, 136, 0.2)' : 'rgba(153, 0, 255, 0.25)';
        ctx.fillRect(b.tcpHandshakeBtn.x, b.tcpHandshakeBtn.y, b.tcpHandshakeBtn.w, b.tcpHandshakeBtn.h);
        ctx.strokeStyle = s1Active ? '#00ff88' : '#9900ff';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.tcpHandshakeBtn.x, b.tcpHandshakeBtn.y, b.tcpHandshakeBtn.w, b.tcpHandshakeBtn.h);
        ctx.fillStyle = s1Active ? '#00ff88' : '#ffffff';
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(s1Active ? '✓ 1. TCP 3-WAY HANDSHAKE (ESTABLISHED)' : '1. INITIATE TCP 3-WAY HANDSHAKE', b.tcpHandshakeBtn.x + b.tcpHandshakeBtn.w / 2, b.tcpHandshakeBtn.y + 21);

        // Step 2: HTTP GET Button
        const s2Active = this.httpStep >= 2;
        ctx.fillStyle = s2Active ? 'rgba(0, 255, 136, 0.2)' : (s1Active ? 'rgba(153, 0, 255, 0.25)' : 'rgba(30, 40, 60, 0.3)');
        ctx.fillRect(b.httpGetBtn.x, b.httpGetBtn.y, b.httpGetBtn.w, b.httpGetBtn.h);
        ctx.strokeStyle = s2Active ? '#00ff88' : (s1Active ? '#9900ff' : '#556677');
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.httpGetBtn.x, b.httpGetBtn.y, b.httpGetBtn.w, b.httpGetBtn.h);
        ctx.fillStyle = s2Active ? '#00ff88' : (s1Active ? '#ffffff' : '#556677');
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(s2Active ? '✓ 2. HTTP GET /index.html DISPATCHED' : '2. SEND HTTP GET REQUEST', b.httpGetBtn.x + b.httpGetBtn.w / 2, b.httpGetBtn.y + 21);

        // Step 3: HTTP 200 OK Button
        const s3Active = this.httpStep >= 3;
        ctx.fillStyle = s3Active ? 'rgba(0, 255, 136, 0.2)' : (s2Active ? 'rgba(153, 0, 255, 0.25)' : 'rgba(30, 40, 60, 0.3)');
        ctx.fillRect(b.http200Btn.x, b.http200Btn.y, b.http200Btn.w, b.http200Btn.h);
        ctx.strokeStyle = s3Active ? '#00ff88' : (s2Active ? '#9900ff' : '#556677');
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.http200Btn.x, b.http200Btn.y, b.http200Btn.w, b.http200Btn.h);
        ctx.fillStyle = s3Active ? '#00ff88' : (s2Active ? '#ffffff' : '#556677');
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(s3Active ? '✓ 3. HTTP 200 OK PAYLOAD RECEIVED' : '3. AWAIT HTTP 200 OK RESPONSE', b.http200Btn.x + b.http200Btn.w / 2, b.http200Btn.y + 21);

        // Header / Payload Inspect Box (Right side)
        ctx.fillStyle = 'rgba(6, 12, 30, 0.95)';
        ctx.fillRect(480, 220, 460, 260);
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 1;
        ctx.strokeRect(480, 220, 460, 260);

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('HTTP RAW WIRE TRANSACTION DUMP:', 495, 240);

        ctx.fillStyle = '#ffd700';
        ctx.font = '8px "Fira Code", monospace';

        if (this.httpStep === 0) {
            ctx.fillStyle = '#8899aa';
            ctx.fillText('Socket closed. Click [1. INITIATE TCP 3-WAY HANDSHAKE] to connect.', 495, 270);
        } else if (this.httpStep === 1) {
            ctx.fillText('--> [TCP SYN] Seq=5000, Win=65535, MSS=1460', 495, 265);
            ctx.fillText('<-- [TCP SYN+ACK] Seq=8000, Ack=5001, Win=65535', 495, 285);
            ctx.fillText('--> [TCP ACK] Seq=5001, Ack=8001', 495, 305);
            ctx.fillStyle = '#00ff88';
            ctx.fillText('SOCKET ESTABLISHED to 10.240.0.1:80. Ready for HTTP request.', 495, 335);
        } else if (this.httpStep === 2) {
            ctx.fillText('GET /index.html HTTP/1.1', 495, 265);
            ctx.fillText('Host: www.titan-core.corp', 495, 280);
            ctx.fillText('User-Agent: Unit0xVOID/1.0 (Cyber-Infiltrator)', 495, 295);
            ctx.fillText('Accept: text/html,application/xhtml+xml', 495, 310);
            ctx.fillText('Connection: keep-alive', 495, 325);
            ctx.fillStyle = '#00ff88';
            ctx.fillText('Request dispatched. Awaiting server 200 OK...', 495, 355);
        } else if (this.httpStep >= 3) {
            ctx.fillText('HTTP/1.1 200 OK', 495, 260);
            ctx.fillText('Date: Sun, 22 Nov 2026 12:00:00 GMT', 495, 275);
            ctx.fillText('Server: Titan-Web/2.4 (Apex-Core)', 495, 290);
            ctx.fillText('Content-Type: text/html; charset=UTF-8', 495, 305);
            ctx.fillText('Content-Length: 1024', 495, 320);
            ctx.fillText('Connection: keep-alive', 495, 335);
            ctx.fillStyle = '#00ff88';
            ctx.fillText('<!DOCTYPE html><html><title>TITAN VAULT</title>', 495, 365);
            ctx.fillText('<body><h1>ACCESS GRANTED: SECTOR 4 UNLOCKED</h1></body>', 495, 380);
        }

        ctx.restore();
    }

    // ======================================================================
    // Tab 2: KTU Scheme & Intel Reference
    // ======================================================================
    renderTab2_Intel(ctx) {
        ctx.save();

        ctx.fillStyle = 'rgba(8, 14, 34, 0.9)';
        ctx.fillRect(190, 180, 750, 310);
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 1;
        ctx.strokeRect(190, 180, 750, 310);

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('KTU PCCST501 MODULE 1: APPLICATION LAYER HIGH-YIELD INTEL (4.0 MARKS)', 205, 205);

        ctx.font = '9px "Fira Code", monospace';
        ctx.fillStyle = '#ffd700';
        ctx.fillText('1. DNS HIERARCHY & RECORD TYPES (KTU Model Paper Q9b):', 205, 230);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('• Root Server (.) -> TLD (.corp/.com) -> Authoritative Server (titan-core.corp).', 215, 246);
        ctx.fillText('• Type A: Hostname to IPv4 (32-bit) | Type AAAA: Hostname to IPv6 (128-bit).', 215, 260);
        ctx.fillText('• CNAME: Canonical alias | MX: Mail Exchange server with priority integer | NS: Zone Nameserver.', 215, 274);
        ctx.fillText('• Iterative: Local DNS queries servers sequentially | Recursive: Server queries on client behalf.', 215, 288);

        ctx.fillStyle = '#ffd700';
        ctx.fillText('2. HTTP/1.1 vs HTTP/2 (KTU Set 1 Q9b):', 205, 314);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('• Non-Persistent: 1 TCP connection per object (2xRTT penalty per file).', 215, 330);
        ctx.fillText('• Persistent: Keeps TCP socket open across multiple requests (saves 1 RTT per object).', 215, 344);
        ctx.fillText('• HTTP/2: Binary framing, stream multiplexing over 1 TCP connection (kills Head-of-Line blocking).', 215, 358);

        ctx.fillStyle = '#ffd700';
        ctx.fillText('3. EMAIL (SMTP/POP3/IMAP) & FTP ARCHITECTURES (KTU Sets 2-5 Q9b):', 205, 384);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('• SMTP (Port 25): PUSH protocol (client -> server -> server). 7-bit ASCII limitation (MIME).', 215, 400);
        ctx.fillText('• POP3 (Port 110): Simple PULL (download & delete) | IMAP4 (Port 143): Advanced PULL (server folders).', 215, 414);
        ctx.fillText('• FTP: Port 21 Control (out-of-band, persistent) vs Port 20 Data (ephemeral per file transfer).', 215, 428);

        ctx.restore();
    }
}

// Global Export
const webInfiltrationInstance = new WebInfiltrationMinigame();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.WebInfiltrationMinigame = webInfiltrationInstance;
    window.WebInfiltrationMinigame = webInfiltrationInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WebInfiltrationMinigame, webInfiltration: webInfiltrationInstance };
}
