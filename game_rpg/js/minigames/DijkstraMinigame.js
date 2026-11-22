// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// DijkstraMinigame.js - Interactive Link-State Least-Cost Path Finder & Radar
// KTU Module 2 Exam Question: Model Paper Q12(a) / Set 1 Q12(b) (6 Marks)
// Nodes: A(Src), B, C, D, E | Topology & Step-by-Step Permanent Set N' Expansion
// ==========================================================================

class DijkstraMinigame {
    constructor() {
        this.isOpen = false;
        this.isSolved = false;

        // Graph Topology Definition (KTU Model Paper Q12a)
        // Nodes: A (Source), B, C, D, E
        this.nodes = {
            'A': { id: 'A', name: 'Router A (Src)', x: 270, y: 340, isSource: true },
            'B': { id: 'B', name: 'Router B', x: 420, y: 220, isSource: false },
            'C': { id: 'C', name: 'Router C', x: 420, y: 460, isSource: false },
            'D': { id: 'D', name: 'Router D', x: 600, y: 260, isSource: false },
            'E': { id: 'E', name: 'Router E (Dest)', x: 670, y: 430, isSource: false }
        };

        // Graph Edges & Costs
        this.edges = [
            { u: 'A', v: 'B', cost: 2 },
            { u: 'A', v: 'C', cost: 5 },
            { u: 'B', v: 'C', cost: 1 },
            { u: 'B', v: 'D', cost: 4 },
            { u: 'C', v: 'D', cost: 1 },
            { u: 'C', v: 'E', cost: 3 },
            { u: 'D', v: 'E', cost: 1 }
        ];

        // Shortest Path Tree Edges (A-B, B-C, C-D, D-E)
        this.sptEdges = [
            { u: 'A', v: 'B' },
            { u: 'B', v: 'C' },
            { u: 'C', v: 'D' },
            { u: 'D', v: 'E' }
        ];

        // Final Ground-Truth Forwarding Table of Router A
        this.finalRoutingTable = [
            { dest: 'B', cost: 2, path: 'A -> B', nextHop: 'B' },
            { dest: 'C', cost: 3, path: 'A -> B -> C', nextHop: 'B' },
            { dest: 'D', cost: 4, path: 'A -> B -> C -> D', nextHop: 'B' },
            { dest: 'E', cost: 5, path: 'A -> B -> C -> D -> E', nextHop: 'B' }
        ];

        // Ground-Truth Step-by-Step Dijkstra Trace (KTU 6-Mark Rubric)
        this.traceSteps = [
            {
                stepIndex: 0,
                permanentSet: ['A'],
                selectedNode: 'A',
                costs: { 'B': { d: 2, p: 'A' }, 'C': { d: 5, p: 'A' }, 'D': { d: '∞', p: '-' }, 'E': { d: '∞', p: '-' } },
                nextMinNode: 'B',
                minCost: 2,
                explanation: 'Start at Source A: D(B)=2(A), D(C)=5(A), D(D)=∞, D(E)=∞. Minimum non-permanent is B (cost 2).'
            },
            {
                stepIndex: 1,
                permanentSet: ['A', 'B'],
                selectedNode: 'B',
                costs: { 'B': { d: 2, p: 'A' }, 'C': { d: 3, p: 'B' }, 'D': { d: 6, p: 'B' }, 'E': { d: '∞', p: '-' } },
                nextMinNode: 'C',
                minCost: 3,
                explanation: 'Add B: Update C via B: min(5, 2+1) = 3(B). Update D via B: 2+4 = 6(B). Minimum non-permanent is C (cost 3).'
            },
            {
                stepIndex: 2,
                permanentSet: ['A', 'B', 'C'],
                selectedNode: 'C',
                costs: { 'B': { d: 2, p: 'A' }, 'C': { d: 3, p: 'B' }, 'D': { d: 4, p: 'C' }, 'E': { d: 6, p: 'C' } },
                nextMinNode: 'D',
                minCost: 4,
                explanation: 'Add C: Update D via C: min(6, 3+1) = 4(C). Update E via C: 3+3 = 6(C). Minimum non-permanent is D (cost 4).'
            },
            {
                stepIndex: 3,
                permanentSet: ['A', 'B', 'C', 'D'],
                selectedNode: 'D',
                costs: { 'B': { d: 2, p: 'A' }, 'C': { d: 3, p: 'B' }, 'D': { d: 4, p: 'C' }, 'E': { d: 5, p: 'D' } },
                nextMinNode: 'E',
                minCost: 5,
                explanation: 'Add D: Update E via D: min(6, 4+1) = 5(D). Minimum non-permanent is E (cost 5).'
            },
            {
                stepIndex: 4,
                permanentSet: ['A', 'B', 'C', 'D', 'E'],
                selectedNode: 'E',
                costs: { 'B': { d: 2, p: 'A' }, 'C': { d: 3, p: 'B' }, 'D': { d: 4, p: 'C' }, 'E': { d: 5, p: 'D' } },
                nextMinNode: null,
                minCost: 5,
                explanation: 'Add E: All nodes added to permanent set N\'! Shortest Path Tree fully converged. Next-hop to all destinations is B!'
            }
        ];

        // Current Step State (0 to 4)
        this.currentStep = 0;

        // Active Tab: 0 = Radar Canvas & Simulation, 1 = Step-by-Step Table, 2 = Theory & Rubric
        this.activeTab = 0;
        this.tabNames = ['[1] TACTICAL DIJKSTRA RADAR', '[2] COMPLETE STEP-BY-STEP TABLE', '[3] LINK-STATE THEORY & MARKS'];

        // Status & Feedback
        this.statusMessage = 'START AT ROUTER A: D(B)=2(A), D(C)=5(A). SELECT MINIMUM COST NODE [B] TO EXPAND N\'!';
        this.awardedMarks = 0; // Total: 6.0 Marks

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
            stepBtn: { x: 780, y: 470, w: 310, h: 38 },
            lockBtn: { x: 780, y: 520, w: 310, h: 42 },
            autoBtn: { x: 190, y: 615, w: 160, h: 34 },
            resetBtn: { x: 360, y: 615, w: 140, h: 34 },
            deployBottomBtn: { x: 520, y: 615, w: 340, h: 34 }
        };

        this.animTimer = 0;
    }

    open() {
        this.isOpen = true;
        console.log('[DijkstraMinigame] Holographic radar console opened.');
    }

    close() {
        this.isOpen = false;
        console.log('[DijkstraMinigame] Holographic radar console closed.');
    }

    // Advance to next step by selecting target node
    selectNode(nodeKey) {
        if (this.currentStep >= 4) return;

        const currentInfo = this.traceSteps[this.currentStep];
        if (nodeKey === currentInfo.nextMinNode) {
            // Correct minimum-cost node selected!
            this.currentStep++;
            this.playClickSfx();

            if (this.currentStep === 4) {
                this.statusMessage = 'ALL NODES RESOLVED IN N\'! Final Shortest Path Tree locked. Press [DEPLOY STEALTH PATH]!';
            } else {
                const nextInfo = this.traceSteps[this.currentStep];
                this.statusMessage = `STEP ${this.currentStep}: ${nextInfo.explanation}`;
            }
        } else {
            // Incorrect node selection
            this.statusMessage = `ERROR: Node ${nodeKey} is NOT the minimum cost candidate! Expected minimum: ${currentInfo.nextMinNode} (Cost: ${currentInfo.minCost}).`;
            this.playDeniedSfx();
        }
    }

    advanceStep() {
        if (this.currentStep < 4) {
            const nextNode = this.traceSteps[this.currentStep].nextMinNode;
            this.selectNode(nextNode);
        }
    }

    autoSolve() {
        this.currentStep = 4;
        this.statusMessage = 'AUTO-SOLVED: Complete Dijkstra table computed. Click [DEPLOY STEALTH PATH] to lock routing!';
        this.playSuccessSfx();
    }

    deployRoutingTable() {
        if (this.currentStep < 4) {
            this.statusMessage = 'COMPLETE ALL 4 STEPS BEFORE DEPLOYING THE ROUTING TABLE!';
            this.playDeniedSfx();
            return;
        }

        if (!this.isSolved) {
            this.isSolved = true;
            this.awardedMarks = 6.0;

            // Award 6.0 Marks in Global GameState (Question 12a Full Valuation)
            if (typeof window !== 'undefined' && window.GameState && typeof window.GameState.addMarks === 'function') {
                window.GameState.addMarks(6);
            }

            // Activate Shortest-Path Stealth Trajectory in Sector 3 World
            if (typeof window !== 'undefined') {
                if (window.Sector3_Network) {
                    window.Sector3_Network.isDijkstraSolved = true;
                }
                if (window.GridEngine && window.GridEngine.gameLoop && window.GridEngine.gameLoop.sector3) {
                    window.GridEngine.gameLoop.sector3.isDijkstraSolved = true;
                }
            }

            this.playSuccessSfx();
        }

        this.close();
    }

    reset() {
        this.currentStep = 0;
        this.isSolved = false;
        this.awardedMarks = 0;
        this.statusMessage = 'RESET COMPLETED: Graph returned to initial state. Select Node B to begin.';
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
        if (input.isJustPressed('b')) {
            this.selectNode('B');
        }
        if (input.isJustPressed('c')) {
            this.selectNode('C');
        }
        if (input.isJustPressed('d')) {
            this.selectNode('D');
        }
        if (input.isJustPressed(' ') || input.isJustPressed('enter')) {
            if (this.currentStep < 4) {
                this.advanceStep();
            } else {
                this.deployRoutingTable();
            }
        }

        // Mouse click handling
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
        if (mx >= b.deployBottomBtn.x && mx <= b.deployBottomBtn.x + b.deployBottomBtn.w && my >= b.deployBottomBtn.y && my <= b.deployBottomBtn.y + b.deployBottomBtn.h) {
            if (this.currentStep < 4) {
                this.advanceStep();
            } else {
                this.deployRoutingTable();
            }
            return;
        }

        // Action Buttons in Tab 0
        if (this.activeTab === 0) {
            if (mx >= b.stepBtn.x && mx <= b.stepBtn.x + b.stepBtn.w && my >= b.stepBtn.y && my <= b.stepBtn.y + b.stepBtn.h) {
                this.advanceStep();
                return;
            }
            if (mx >= b.lockBtn.x && mx <= b.lockBtn.x + b.lockBtn.w && my >= b.lockBtn.y && my <= b.lockBtn.y + b.lockBtn.h) {
                this.deployRoutingTable();
                return;
            }

            // Click directly on Radar Graph Nodes
            Object.values(this.nodes).forEach(n => {
                const dist = Math.hypot(mx - n.x, my - n.y);
                if (dist <= 26) {
                    this.selectNode(n.id);
                }
            });
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
        ctx.fillText('DIJKSTRA LINK-STATE TACTICAL PATHFINDER // ROUTER A NEXUS', b.modalX + 20, b.modalY + 28);

        ctx.fillStyle = '#88aacc';
        ctx.font = '11px "Fira Code", monospace';
        ctx.fillText('KTU Model Paper Q12(a) / Set 1 Q12(b) (6 Marks) | Shortest Path Tree & Routing Table of Router A', b.modalX + 20, b.modalY + 48);

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

        // 5. Render Tab Content
        if (this.activeTab === 0) {
            this.renderRadarTab(ctx);
        } else if (this.activeTab === 1) {
            this.renderTableTab(ctx);
        } else {
            this.renderTheoryTab(ctx);
        }

        // 6. Bottom Status & Controls Bar
        this.renderBottomControls(ctx);

        ctx.restore();
    }

    // ======================================================================
    // Tab 0: Holographic Radar Canvas & Simulation
    // ======================================================================
    renderRadarTab(ctx) {
        const b = this.uiBounds;

        // Left: Graph Radar Visualization (X: 190 -> 760, Y: 175 -> 560)
        this.renderGraphCanvas(ctx);

        // Right: Current Step Card & Forwarding Table
        this.renderRightPanel(ctx);
    }

    renderGraphCanvas(ctx) {
        ctx.save();
        const rx = 190;
        const ry = 175;
        const rw = 560;
        const rh = 385;

        // Radar Background Grid
        ctx.fillStyle = 'rgba(4, 12, 32, 0.9)';
        ctx.fillRect(rx, ry, rw, rh);
        ctx.strokeStyle = '#0066ff';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(rx, ry, rw, rh);

        // Concentric Radar Rings
        ctx.strokeStyle = 'rgba(0, 102, 255, 0.15)';
        ctx.lineWidth = 1;
        [60, 120, 180, 240].forEach(rad => {
            ctx.beginPath();
            ctx.arc(rx + rw / 2, ry + rh / 2, rad, 0, Math.PI * 2);
            ctx.stroke();
        });

        // Current Permanent Set N'
        const currentPerm = this.traceSteps[this.currentStep].permanentSet;

        // 1. Draw All Edges
        this.edges.forEach(e => {
            const uNode = this.nodes[e.u];
            const vNode = this.nodes[e.v];

            // Check if this edge is part of the Shortest Path Tree
            const isSptEdge = this.isEdgeInSPT(e.u, e.v) && (currentPerm.includes(e.u) && currentPerm.includes(e.v));

            ctx.save();
            if (isSptEdge) {
                // Shortest Path Tree Edge (Glowing Cyan)
                ctx.strokeStyle = '#00ff88';
                ctx.lineWidth = 3.5;
                ctx.shadowColor = '#00ff88';
                ctx.shadowBlur = 10;
            } else {
                // Regular Graph Edge
                ctx.strokeStyle = 'rgba(0, 102, 255, 0.4)';
                ctx.lineWidth = 1.5;
            }

            ctx.beginPath();
            ctx.moveTo(uNode.x, uNode.y);
            ctx.lineTo(vNode.x, vNode.y);
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Draw Edge Cost Badge along midpoint
            const midX = (uNode.x + vNode.x) / 2;
            const midY = (uNode.y + vNode.y) / 2;

            ctx.fillStyle = 'rgba(6, 16, 38, 0.95)';
            ctx.fillRect(midX - 10, midY - 9, 20, 18);
            ctx.strokeStyle = isSptEdge ? '#00ff88' : 'rgba(0, 102, 255, 0.6)';
            ctx.lineWidth = 1;
            ctx.strokeRect(midX - 10, midY - 9, 20, 18);

            ctx.fillStyle = isSptEdge ? '#00ff88' : '#ffd700';
            ctx.font = 'bold 9px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(e.cost, midX, midY + 4);

            ctx.restore();
        });

        // 2. Draw Nodes (A, B, C, D, E)
        Object.values(this.nodes).forEach(n => {
            const isPerm = currentPerm.includes(n.id);
            const isSource = n.isSource;

            let nodeColor = '#0066ff';
            if (isSource) nodeColor = '#00e5ff';
            else if (isPerm) nodeColor = '#00ff88';
            else if (this.traceSteps[this.currentStep].nextMinNode === n.id) nodeColor = '#ffd700';

            ctx.save();
            ctx.fillStyle = 'rgba(8, 20, 48, 0.95)';
            ctx.beginPath();
            ctx.arc(n.x, n.y, 22, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = nodeColor;
            ctx.lineWidth = isPerm ? 2.5 : 1.5;
            ctx.shadowColor = nodeColor;
            ctx.shadowBlur = isPerm ? 12 : 6;
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Node Name / Letter
            ctx.fillStyle = nodeColor;
            ctx.font = 'bold 12px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(n.id, n.x, n.y + 4);

            // Sub-label (Permanent vs Candidate)
            ctx.fillStyle = isPerm ? '#00ff88' : '#88aacc';
            ctx.font = '7px "Fira Code", monospace';
            const statusLabel = isPerm ? 'N\' PERM' : (n.id === this.traceSteps[this.currentStep].nextMinNode ? 'NEXT MIN' : 'TENTATIVE');
            ctx.fillText(statusLabel, n.x, n.y + 16);

            ctx.restore();
        });

        // Radar Overlay Title
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`PERMANENT SET N' = { ${currentPerm.join(', ')} } (STEP ${this.currentStep}/4)`, rx + 14, ry + 22);

        ctx.restore();
    }

    isEdgeInSPT(u, v) {
        return this.sptEdges.some(e => (e.u === u && e.v === v) || (e.u === v && e.v === u));
    }

    renderRightPanel(ctx) {
        const b = this.uiBounds;
        const rx = 765;
        const ry = 175;
        const rw = 325;
        const rh = 280;

        ctx.save();

        // 1. Current Step Telemetry Card
        ctx.fillStyle = 'rgba(6, 16, 38, 0.9)';
        ctx.fillRect(rx, ry, rw, rh);
        ctx.strokeStyle = '#0066ff';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(rx, ry, rw, rh);

        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`STEP ${this.currentStep}: CANDIDATE COSTS D(v)`, rx + 12, ry + 22);

        // Display D(v) for non-permanent nodes
        const costs = this.traceSteps[this.currentStep].costs;
        let cy = ry + 46;
        ['B', 'C', 'D', 'E'].forEach(nodeKey => {
            const entry = costs[nodeKey];
            const isMin = (this.traceSteps[this.currentStep].nextMinNode === nodeKey);

            ctx.fillStyle = isMin ? 'rgba(255, 215, 0, 0.2)' : 'rgba(8, 22, 50, 0.5)';
            ctx.fillRect(rx + 12, cy - 14, rw - 24, 24);
            ctx.strokeStyle = isMin ? '#ffd700' : 'rgba(0, 102, 255, 0.25)';
            ctx.strokeRect(rx + 12, cy - 14, rw - 24, 24);

            ctx.fillStyle = isMin ? '#ffd700' : '#ffffff';
            ctx.font = 'bold 10px "Fira Code", monospace';
            ctx.fillText(`D(${nodeKey}) = ${entry.d} (${entry.p})`, rx + 20, cy + 3);

            ctx.fillStyle = isMin ? '#00ff88' : '#88aacc';
            ctx.font = '8px "Fira Code", monospace';
            ctx.textAlign = 'right';
            ctx.fillText(isMin ? '★ MINIMUM' : '', rx + rw - 20, cy + 3);
            ctx.textAlign = 'left';

            cy += 28;
        });

        // 2. Routing Table Mini-Preview
        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.fillText('ROUTER A FORWARDING TABLE:', rx + 12, ry + 180);

        ctx.fillStyle = '#88aacc';
        ctx.font = '8px "Fira Code", monospace';
        ctx.fillText('DEST', rx + 14, ry + 198);
        ctx.fillText('COST', rx + 65, ry + 198);
        ctx.fillText('NEXT-HOP', rx + 130, ry + 198);
        ctx.fillText('STATUS', rx + 220, ry + 198);

        this.finalRoutingTable.forEach((r, idx) => {
            const isResolved = (this.currentStep >= idx + 1);
            const rowY = ry + 216 + idx * 18;

            ctx.fillStyle = isResolved ? '#ffffff' : '#445566';
            ctx.font = '9px "Fira Code", monospace';
            ctx.fillText(`Router ${r.dest}`, rx + 14, rowY);

            ctx.fillStyle = isResolved ? '#ffd700' : '#334455';
            ctx.fillText(isResolved ? `${r.cost}` : '---', rx + 65, rowY);

            ctx.fillStyle = isResolved ? '#00ff88' : '#334455';
            ctx.fillText(isResolved ? `${r.nextHop}` : '---', rx + 130, rowY);

            ctx.fillStyle = isResolved ? '#00ff88' : '#ff77aa';
            ctx.fillText(isResolved ? '✓ LOCKED' : 'PENDING', rx + 220, rowY);
        });

        // Action Buttons on Right
        let stepBtnLabel = '';
        if (this.currentStep < 4) {
            const nextNode = this.traceSteps[this.currentStep].nextMinNode;
            stepBtnLabel = `[CONFIRM MINIMUM NODE ${nextNode} (COST ${this.traceSteps[this.currentStep].minCost})]`;
        } else {
            stepBtnLabel = '✓ ALL STEPS CONVERGED (100%)';
        }

        ctx.fillStyle = 'rgba(0, 102, 255, 0.25)';
        ctx.fillRect(b.stepBtn.x, b.stepBtn.y, b.stepBtn.w, b.stepBtn.h);
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.stepBtn.x, b.stepBtn.y, b.stepBtn.w, b.stepBtn.h);
        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(stepBtnLabel, b.stepBtn.x + b.stepBtn.w / 2, b.stepBtn.y + 23);

        // Lock / Deploy Button
        const canDeploy = (this.currentStep === 4);
        ctx.fillStyle = canDeploy ? 'rgba(0, 255, 136, 0.25)' : 'rgba(30, 40, 60, 0.4)';
        ctx.fillRect(b.lockBtn.x, b.lockBtn.y, b.lockBtn.w, b.lockBtn.h);
        ctx.strokeStyle = canDeploy ? '#00ff88' : '#556677';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.lockBtn.x, b.lockBtn.y, b.lockBtn.w, b.lockBtn.h);
        ctx.fillStyle = canDeploy ? '#00ff88' : '#556677';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.fillText('DEPLOY STEALTH PATH (A->B->C->D->E) [SPACE]', b.lockBtn.x + b.lockBtn.w / 2, b.lockBtn.y + 25);

        ctx.restore();
    }

    // ======================================================================
    // Tab 1: Complete Step-by-Step Table (KTU Exam Format)
    // ======================================================================
    renderTableTab(ctx) {
        const b = this.uiBounds;
        const sx = b.modalX + 25;
        const sy = 180;
        const sw = b.modalW - 50;

        ctx.save();
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 12px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('OFFICIAL KTU STEP-BY-STEP DIJKSTRA TRACE TABLE (QUESTION 12a / SET 1)', sx, sy);

        // Table Header
        const cols = ['STEP', 'N\' (PERMANENT)', 'D(B), p(B)', 'D(C), p(C)', 'D(D), p(D)', 'D(E), p(E)', 'MIN NODE CHOSEN'];
        const colWidths = [60, 200, 110, 110, 110, 110, 140];

        let colX = sx;
        ctx.fillStyle = '#0b1b36';
        ctx.fillRect(sx, sy + 15, sw, 28);
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 1;
        ctx.strokeRect(sx, sy + 15, sw, 28);

        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 9px "Fira Code", monospace';
        cols.forEach((c, idx) => {
            ctx.fillText(c, colX + 8, sy + 33);
            colX += colWidths[idx];
        });

        // 5 Rows (Step 0 to Step 4)
        const rowData = [
            ['Step 0', '{ A }', '2, A', '5, A', '∞', '∞', 'B (Cost 2)'],
            ['Step 1', '{ A, B }', '2, A', '3, B', '6, B', '∞', 'C (Cost 3)'],
            ['Step 2', '{ A, B, C }', '2, A', '3, B', '4, C', '6, C', 'D (Cost 4)'],
            ['Step 3', '{ A, B, C, D }', '2, A', '3, B', '4, C', '5, D', 'E (Cost 5)'],
            ['Step 4', '{ A, B, C, D, E }', '2, A', '3, B', '4, C', '5, D', 'CONVERGED']
        ];

        let ry = sy + 43;
        rowData.forEach((row, rIdx) => {
            const isResolved = (this.currentStep >= rIdx);
            ctx.fillStyle = (rIdx % 2 === 0) ? 'rgba(8, 20, 44, 0.7)' : 'rgba(12, 28, 58, 0.7)';
            ctx.fillRect(sx, ry, sw, 32);
            ctx.strokeStyle = 'rgba(0, 102, 255, 0.25)';
            ctx.strokeRect(sx, ry, sw, 32);

            let cx = sx;
            row.forEach((cell, cIdx) => {
                if (cIdx === 0) ctx.fillStyle = isResolved ? '#ffd700' : '#445566';
                else if (cIdx === 1) ctx.fillStyle = isResolved ? '#00e5ff' : '#445566';
                else if (cIdx === 6) ctx.fillStyle = isResolved ? '#00ff88' : '#445566';
                else ctx.fillStyle = isResolved ? '#ffffff' : '#334455';

                ctx.font = (cIdx === 0 || cIdx === 6) ? 'bold 9px "Fira Code", monospace' : '9px "Fira Code", monospace';
                ctx.fillText(isResolved ? cell : '---', cx + 8, ry + 20);
                cx += colWidths[cIdx];
            });

            ry += 32;
        });

        // Routing Table Below
        ctx.fillStyle = 'rgba(0, 255, 136, 0.1)';
        ctx.fillRect(sx, ry + 15, sw, 90);
        ctx.strokeStyle = '#00ff88';
        ctx.strokeRect(sx, ry + 15, sw, 90);

        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.fillText('FINAL ROUTING TABLE OF ROUTER A (KTU SCHEME +2.0 MARKS):', sx + 14, ry + 35);

        ctx.fillStyle = '#ffffff';
        ctx.font = '9px "Fira Code", monospace';
        ctx.fillText('• Dest B: Cost = 2, Path = A-B, Next-Hop = B', sx + 20, ry + 55);
        ctx.fillText('• Dest C: Cost = 3, Path = A-B-C, Next-Hop = B', sx + 20, ry + 72);
        ctx.fillText('• Dest D: Cost = 4, Path = A-B-C-D, Next-Hop = B', sx + 340, ry + 55);
        ctx.fillText('• Dest E: Cost = 5, Path = A-B-C-D-E, Next-Hop = B', sx + 340, ry + 72);

        ctx.restore();
    }

    // ======================================================================
    // Tab 2: Theory & Link-State vs Distance Vector
    // ======================================================================
    renderTheoryTab(ctx) {
        const b = this.uiBounds;
        const sx = b.modalX + 30;
        const sy = 180;

        ctx.save();
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 13px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('LINK-STATE (OSPF) VS DISTANCE-VECTOR (RIP) // KTU QUESTION 12a', sx, sy);

        const theoryLines = [
            '1. Why Does Link-State (Dijkstra) Avoid "Count-to-Infinity"?',
            '   - In Distance Vector (Bellman-Ford / RIP), routers only exchange cost vectors with direct neighbors',
            '     without knowing the global network topology (routing by rumor), causing slow convergence and loops.',
            '   - In Link-State (Dijkstra / OSPF), each router floods Link State Advertisements (LSAs) so that EVERY',
            '     router builds an identical global topology database, independently running Dijkstra to generate',
            '     strictly loop-free shortest path trees!',
            '',
            '2. Algorithm Complexity:',
            '   - Time Complexity: O(n^2) with simple array lookup, or O(E + V log V) using a min-heap priority queue.',
            '   - Message Complexity: O(n * E) for reliable flooding of LSAs across all links.',
            '',
            '3. KTU Scheme of Valuation (+6.0 Marks Breakdown):',
            '   - Step 0 & 1 Identification (B selected, cost 2; C updated to 3): +2.0 Marks.',
            '   - Step 2 & 3 Expansion (D selected, cost 4; E updated to 5): +2.0 Marks.',
            '   - Output Routing Table of Router A (Destinations, Costs, Next-Hops): +2.0 Marks.'
        ];

        let ly = sy + 28;
        theoryLines.forEach(l => {
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

        // Deploy Bottom Button
        const canDeploy = (this.currentStep === 4);
        ctx.fillStyle = canDeploy ? 'rgba(0, 255, 136, 0.25)' : 'rgba(30, 40, 60, 0.4)';
        ctx.fillRect(b.deployBottomBtn.x, b.deployBottomBtn.y, b.deployBottomBtn.w, b.deployBottomBtn.h);
        ctx.strokeStyle = canDeploy ? '#00ff88' : '#556677';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.deployBottomBtn.x, b.deployBottomBtn.y, b.deployBottomBtn.w, b.deployBottomBtn.h);

        ctx.fillStyle = canDeploy ? '#00ff88' : '#556677';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        const deployText = this.isSolved ? '✓ DIJKSTRA ROUTING TABLE DEPLOYED (+6 MARKS)' : 'DEPLOY STEALTH ROUTE [SPACE]';
        ctx.fillText(deployText, b.deployBottomBtn.x + b.deployBottomBtn.w / 2, b.deployBottomBtn.y + 21);

        ctx.restore();
    }
}

// Global Export
const dijkstraInstance = new DijkstraMinigame();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.DijkstraMinigame = dijkstraInstance;
    window.DijkstraMinigame = dijkstraInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DijkstraMinigame, dijkstraMinigame: dijkstraInstance };
}
