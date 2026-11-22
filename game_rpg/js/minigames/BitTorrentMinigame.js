// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// BitTorrentMinigame.js - Sector 4: P2P BitTorrent Swarm File Assembly
// KTU Module 1: Application Layer - Model Paper Q10(a) / Sets 1-5 Q10(a) (5 Marks)
// Rarest-First Strategy, Tit-for-Tat Choking, Optimistic Unchoking & Client-Server vs P2P
// ==========================================================================

class BitTorrentMinigame {
    constructor() {
        this.isOpen = false;
        this.isSolved = false;
        this.activeTab = 0;
        this.tabNames = ['[1] RAREST-FIRST SWARM WORKBENCH (2.5M)', '[2] TIT-FOR-TAT & OPTIMISTIC UNCHOKING (2.5M)', '[3] KTU SCHEME: CLIENT-SERVER vs P2P (5.0M)'];

        // ------------------------------------------------------------------
        // Challenge 1: Rarest-First Piece Selection State (2.5 Marks)
        // File: TITAN_FIN_RST_PAYLOAD (2 MB = 8 chunks of 256 KB)
        // ------------------------------------------------------------------
        this.pieces = [
            { id: 0, copies: 4, label: 'Piece 0 (Common)', size: '256 KB', downloaded: false },
            { id: 1, copies: 4, label: 'Piece 1 (Common)', size: '256 KB', downloaded: false },
            { id: 2, copies: 3, label: 'Piece 2 (Common)', size: '256 KB', downloaded: false },
            { id: 3, copies: 1, label: 'Piece 3 (RAREST!)', size: '256 KB', downloaded: false, isRarest: true },
            { id: 4, copies: 4, label: 'Piece 4 (Common)', size: '256 KB', downloaded: false },
            { id: 5, copies: 3, label: 'Piece 5 (Common)', size: '256 KB', downloaded: false },
            { id: 6, copies: 4, label: 'Piece 6 (Common)', size: '256 KB', downloaded: false },
            { id: 7, copies: 3, label: 'Piece 7 (Common)', size: '256 KB', downloaded: false }
        ];

        this.selectedFirstPiece = null;
        this.challenge1Solved = false;

        // ------------------------------------------------------------------
        // Challenge 2: Tit-for-Tat & Optimistic Unchoking State (2.5 Marks)
        // ------------------------------------------------------------------
        this.peers = [
            { id: 'epsilon', name: 'Peer Epsilon', rate: 710, rank: 1, unchoked: false, isTop4: true },
            { id: 'beta', name: 'Peer Beta', rate: 620, rank: 2, unchoked: false, isTop4: true },
            { id: 'delta', name: 'Peer Delta', rate: 580, rank: 3, unchoked: false, isTop4: true },
            { id: 'alpha', name: 'Peer Alpha', rate: 450, rank: 4, unchoked: false, isTop4: true },
            { id: 'gamma', name: 'Peer Gamma', rate: 120, rank: 5, unchoked: false, isTop4: false },
            { id: 'zeta', name: 'Peer Zeta', rate: 90, rank: 6, unchoked: false, isTop4: false, holdsRare: true }
        ];

        this.optimisticPeer = null; // 5th unchoked peer
        this.challenge2Solved = false;
        this.payloadAssembled = false;

        this.statusMessage = 'SWARM CONNECTED: Select the RAREST piece to request first!';
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
            // Piece Grid in Tab 0 (8 chunks, 4 columns x 2 rows)
            pieceCards: [
                { id: 0, x: 200, y: 220, w: 160, h: 65 },
                { id: 1, x: 380, y: 220, w: 160, h: 65 },
                { id: 2, x: 560, y: 220, w: 160, h: 65 },
                { id: 3, x: 740, y: 220, w: 160, h: 65 },
                { id: 4, x: 200, y: 300, w: 160, h: 65 },
                { id: 5, x: 380, y: 300, w: 160, h: 65 },
                { id: 6, x: 560, y: 300, w: 160, h: 65 },
                { id: 7, x: 740, y: 300, w: 160, h: 65 }
            ],
            // Peer rows in Tab 1
            peerRows: [
                { id: 'epsilon', x: 200, y: 230, w: 340, h: 36 },
                { id: 'beta', x: 200, y: 275, w: 340, h: 36 },
                { id: 'delta', x: 200, y: 320, w: 340, h: 36 },
                { id: 'alpha', x: 200, y: 365, w: 340, h: 36 },
                { id: 'gamma', x: 200, y: 410, w: 340, h: 36 },
                { id: 'zeta', x: 200, y: 455, w: 340, h: 36 }
            ],
            optimisticBtn: { x: 570, y: 300, w: 350, h: 38 },
            assembleBtn: { x: 570, y: 420, w: 350, h: 42 },
            // Bottom Action buttons
            autoBtn: { x: 190, y: 615, w: 160, h: 34 },
            resetBtn: { x: 360, y: 615, w: 140, h: 34 },
            finalizeBtn: { x: 520, y: 615, w: 340, h: 34 }
        };
    }

    open() {
        this.isOpen = true;
        this.statusMessage = 'BITTORRENT SWARM ACTIVE: Analyze swarm bitfields and select the RAREST piece first!';
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
        if (input.isJustPressed(' ') && this.isAllComplete()) {
            this.finalizeSwarmExchange();
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
                this.finalizeSwarmExchange();
            } else {
                this.statusMessage = 'COMPLETE BOTH RAREST-FIRST SELECTION AND TIT-FOR-TAT UNCHOKING TO ASSEMBLE!';
                this.playDeniedSfx();
            }
            return;
        }

        // Tab 0: Rarest-First Piece Selection
        if (this.activeTab === 0) {
            b.pieceCards.forEach(card => {
                if (mx >= card.x && mx <= card.x + card.w && my >= card.y && my <= card.y + card.h) {
                    this.handlePieceClick(card.id);
                }
            });
        }

        // Tab 1: Tit-for-Tat & Optimistic Unchoking
        if (this.activeTab === 1) {
            // Toggle peer unchoking
            b.peerRows.forEach(row => {
                if (mx >= row.x && mx <= row.x + row.w && my >= row.y && my <= row.y + row.h) {
                    this.togglePeerUnchoke(row.id);
                }
            });

            // Optimistic Unchoking button
            if (mx >= b.optimisticBtn.x && mx <= b.optimisticBtn.x + b.optimisticBtn.w && my >= b.optimisticBtn.y && my <= b.optimisticBtn.y + b.optimisticBtn.h) {
                this.triggerOptimisticUnchoke();
                return;
            }

            // Assemble Payload button
            if (mx >= b.assembleBtn.x && mx <= b.assembleBtn.x + b.assembleBtn.w && my >= b.assembleBtn.y && my <= b.assembleBtn.y + b.assembleBtn.h) {
                this.assemblePayload();
                return;
            }
        }
    }

    handlePieceClick(pieceId) {
        this.selectedFirstPiece = pieceId;

        if (pieceId === 3) {
            // Piece 3 is held by only 1 peer (Peer Zeta) -> Rarest-First!
            this.challenge1Solved = true;
            this.pieces[3].downloaded = true;
            this.statusMessage = '✓ CORRECT! Piece 3 is the RAREST (held by only 1 peer). Requesting it first prevents data loss and multiplies seeders!';
            this.playSuccessSfx();
        } else {
            const copies = this.pieces[pieceId].copies;
            this.statusMessage = `SUB-OPTIMAL: Piece ${pieceId} has ${copies} copies in swarm. Piece 3 has only 1 copy! If Peer Zeta leaves, file is lost!`;
            this.playDeniedSfx();
        }
    }

    togglePeerUnchoke(peerId) {
        const peer = this.peers.find(p => p.id === peerId);
        if (!peer) return;

        const currentUnchokedCount = this.peers.filter(p => p.unchoked).length;

        if (!peer.unchoked) {
            if (currentUnchokedCount >= 4) {
                this.statusMessage = 'MAX 4 REGULAR UNCHOKE SLOTS! You must choke a slower peer before unchoking another.';
                this.playDeniedSfx();
                return;
            }
            peer.unchoked = true;
            this.playClickSfx();
        } else {
            peer.unchoked = false;
            this.playClickSfx();
        }

        // Check if top 4 peers (Epsilon, Beta, Delta, Alpha) are unchoked
        const top4Unchoked = this.peers.filter(p => p.isTop4 && p.unchoked).length === 4;
        const nonTopUnchoked = this.peers.filter(p => !p.isTop4 && p.unchoked).length === 0;

        if (top4Unchoked && nonTopUnchoked) {
            this.statusMessage = '✓ TIT-FOR-TAT SATISFIED: Top 4 peers (710, 620, 580, 450 KB/s) unchoked! Now trigger Optimistic Unchoking.';
        }
    }

    triggerOptimisticUnchoke() {
        const top4Unchoked = this.peers.filter(p => p.isTop4 && p.unchoked).length === 4;
        if (!top4Unchoked) {
            this.statusMessage = 'FIRST UNCHOKE THE TOP 4 PEERS (Tit-for-Tat) BEFORE RUNNING OPTIMISTIC UNCHOKING!';
            this.playDeniedSfx();
            return;
        }

        // Pick 5th peer (Peer Zeta) optimistically
        const zeta = this.peers.find(p => p.id === 'zeta');
        if (zeta) {
            this.optimisticPeer = 'Peer Zeta (Rare Seeder)';
            this.challenge2Solved = true;
            this.statusMessage = '✓ OPTIMISTIC UNCHOKING ACTIVE: Peer Zeta unchoked as 5th peer! Discovers new bandwidth and bootstraps new peers.';
            this.playSuccessSfx();
        }
    }

    assemblePayload() {
        if (!this.challenge1Solved) {
            this.statusMessage = 'SOLVE CHALLENGE 1 (RAREST-FIRST PIECE SELECTION) FIRST IN TAB [1]!';
            this.playDeniedSfx();
            return;
        }
        if (!this.challenge2Solved) {
            this.statusMessage = 'UNCHOKE TOP 4 PEERS AND TRIGGER OPTIMISTIC UNCHOKING BEFORE ASSEMBLING!';
            this.playDeniedSfx();
            return;
        }

        // Download all pieces
        this.pieces.forEach(p => p.downloaded = true);
        this.payloadAssembled = true;
        this.statusMessage = '✓ ALL 8 PIECES DOWNLOADED & SHA-1 VERIFIED! TITAN_FIN_RST_PAYLOAD ASSEMBLED. Click [FINALIZE SWARM EXCHANGE]!';
        this.playSuccessSfx();
    }

    isAllComplete() {
        return this.challenge1Solved && this.challenge2Solved && this.payloadAssembled;
    }

    autoSolve() {
        this.selectedFirstPiece = 3;
        this.challenge1Solved = true;
        this.peers.forEach(p => p.unchoked = p.isTop4);
        this.optimisticPeer = 'Peer Zeta (Rare Seeder)';
        this.challenge2Solved = true;
        this.pieces.forEach(p => p.downloaded = true);
        this.payloadAssembled = true;
        this.statusMessage = 'AUTO-SWARM EXCHANGE COMPLETE: Rarest-First & Tit-for-Tat verified! Click [FINALIZE SWARM EXCHANGE] to claim +5 Marks.';
        this.playSuccessSfx();
    }

    reset() {
        this.selectedFirstPiece = null;
        this.challenge1Solved = false;
        this.peers.forEach(p => p.unchoked = false);
        this.optimisticPeer = null;
        this.challenge2Solved = false;
        this.pieces.forEach(p => p.downloaded = false);
        this.payloadAssembled = false;
        this.statusMessage = 'RESET COMPLETED: Select rarest piece and unchoke top peers under Tit-for-Tat.';
        this.playClickSfx();
    }

    finalizeSwarmExchange() {
        this.isSolved = true;
        this.isOpen = false;
        this.awardedMarks = 5.0;

        // 1. Award +5 Marks in GameState
        if (typeof window !== 'undefined' && window.GameState) {
            if (typeof window.GameState.addMarks === 'function') {
                window.GameState.addMarks(5.0);
            }
            if (typeof window.GameState.addItem === 'function') {
                window.GameState.addItem({
                    id: 'TITAN_FIN_RST_PAYLOAD',
                    name: 'TITAN_FIN_RST_PAYLOAD (2MB P2P Swarm Exploit)',
                    type: 'EXPLOIT'
                });
            }
        }

        // 2. Add to Player Inventory
        if (typeof window !== 'undefined' && window.GridEngine && window.GridEngine.gameLoop && window.GridEngine.gameLoop.player) {
            const player = window.GridEngine.gameLoop.player;
            if (!player.inventory) player.inventory = [];
            if (!player.inventory.includes('TITAN_FIN_RST_PAYLOAD')) {
                player.inventory.push('TITAN_FIN_RST_PAYLOAD');
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

        console.log('[BitTorrentMinigame] SWARM ASSEMBLY COMPLETE! +5.0 Marks awarded (Total: 57/60 Marks - 95% S Grade). Master Exploit acquired!');
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
        const b = this.uiBounds;

        ctx.save();

        // 1. Semi-transparent backdrop
        ctx.fillStyle = 'rgba(4, 8, 16, 0.9)';
        ctx.fillRect(0, 0, 1280, 720);

        // 2. Modal Frame
        ctx.fillStyle = 'rgba(6, 18, 30, 0.98)';
        ctx.fillRect(b.modalX, b.modalY, b.modalW, b.modalH);

        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 16;
        ctx.strokeRect(b.modalX, b.modalY, b.modalW, b.modalH);

        // Top Header
        ctx.fillStyle = 'rgba(0, 255, 136, 0.15)';
        ctx.fillRect(b.modalX, b.modalY, b.modalW, 55);

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 16px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('BITTORRENT P2P SWARM ASSEMBLY // TITAN_FIN_RST_PAYLOAD (2 MB)', b.modalX + 24, b.modalY + 34);

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
        ctx.fillText('MODULE 1: KTU MODEL PAPER Q10(a) / SETS 1-5 Q10(a) (5.0 MARKS) — RAREST-FIRST & TIT-FOR-TAT', b.modalX + 24, b.modalY + 80);

        // Navigation Tabs
        b.tabBtns.forEach((tab, idx) => {
            const isActive = this.activeTab === idx;
            ctx.fillStyle = isActive ? 'rgba(0, 255, 136, 0.35)' : 'rgba(16, 28, 48, 0.5)';
            ctx.fillRect(tab.x, tab.y, tab.w, tab.h);

            ctx.strokeStyle = isActive ? '#00ffcc' : 'rgba(0, 255, 136, 0.4)';
            ctx.lineWidth = isActive ? 2 : 1;
            ctx.strokeRect(tab.x, tab.y, tab.w, tab.h);

            ctx.fillStyle = isActive ? '#00ffcc' : '#a0b0d0';
            ctx.font = 'bold 10px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.tabNames[idx], tab.x + tab.w / 2, tab.y + 19);
        });

        // 3. Render Active Tab Content
        if (this.activeTab === 0) {
            this.renderTab0_RarestFirst(ctx);
        } else if (this.activeTab === 1) {
            this.renderTab1_TitForTat(ctx);
        } else if (this.activeTab === 2) {
            this.renderTab2_Intel(ctx);
        }

        // 4. Status Bar
        ctx.fillStyle = 'rgba(4, 12, 24, 0.95)';
        ctx.fillRect(b.modalX + 10, b.modalY + b.modalH - 85, b.modalW - 20, 28);
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
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
        ctx.fillText('AUTO-SWARM [A]', b.autoBtn.x + b.autoBtn.w / 2, b.autoBtn.y + 21);

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
        const label = this.isSolved ? '✓ EXPLOIT ASSEMBLED (+5.0 MARKS)' : 'FINALIZE SWARM EXCHANGE (+5 MARKS) [SPACE]';
        ctx.fillText(label, b.finalizeBtn.x + b.finalizeBtn.w / 2, b.finalizeBtn.y + 21);

        ctx.restore();
    }

    // ======================================================================
    // Tab 0: Rarest-First Piece Selection Grid
    // ======================================================================
    renderTab0_RarestFirst(ctx) {
        ctx.save();
        const b = this.uiBounds;

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('TARGET FILE: TITAN_FIN_RST_PAYLOAD.torrent (2048 KB = 8 PIECES x 256 KB)', 200, 190);

        ctx.fillStyle = '#ffd700';
        ctx.font = '9px "Fira Code", monospace';
        ctx.fillText('RULE: Select the RAREST piece across the swarm to request first! (Prevents piece extinction & multiplies seeders)', 200, 206);

        // Render 8 Piece Cards
        b.pieceCards.forEach((card, idx) => {
            const p = this.pieces[idx];
            const isSelected = this.selectedFirstPiece === idx;
            const isCorrectRarest = p.isRarest;

            ctx.save();
            // Background
            ctx.fillStyle = p.downloaded ? 'rgba(0, 255, 136, 0.22)' : (isSelected && !isCorrectRarest ? 'rgba(255, 0, 85, 0.25)' : 'rgba(10, 22, 40, 0.9)');
            ctx.fillRect(card.x, card.y, card.w, card.h);

            // Border
            ctx.strokeStyle = p.downloaded ? '#00ff88' : (p.isRarest ? '#ffd700' : 'rgba(0, 255, 204, 0.4)');
            ctx.lineWidth = p.isRarest ? 2 : 1;
            ctx.shadowColor = p.isRarest ? '#ffd700' : 'transparent';
            ctx.shadowBlur = p.isRarest ? 8 : 0;
            ctx.strokeRect(card.x, card.y, card.w, card.h);

            // Text
            ctx.fillStyle = p.isRarest ? '#ffd700' : '#ffffff';
            ctx.font = 'bold 10px "Fira Code", monospace';
            ctx.textAlign = 'left';
            ctx.fillText(`PIECE ${p.id} [${p.size}]`, card.x + 10, card.y + 20);

            ctx.fillStyle = p.isRarest ? '#ff77aa' : '#88aacc';
            ctx.font = '8px "Fira Code", monospace';
            ctx.fillText(`SWARM COPIES: ${p.copies} ${p.isRarest ? '⚠️ (ONLY 1!)' : 'peers'}`, card.x + 10, card.y + 36);

            ctx.fillStyle = p.downloaded ? '#00ff88' : (isSelected && !isCorrectRarest ? '#ff0055' : '#00e5ff');
            ctx.font = 'bold 8px "Fira Code", monospace';
            const statusTxt = p.downloaded ? '✓ DOWNLOADED' : (isSelected && !isCorrectRarest ? '✗ SUB-OPTIMAL' : '[CLICK TO REQUEST]');
            ctx.fillText(statusTxt, card.x + 10, card.y + 52);

            ctx.restore();
        });

        // Explanatory Intel Box
        ctx.fillStyle = 'rgba(8, 16, 32, 0.95)';
        ctx.fillRect(200, 385, 700, 100);
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 1;
        ctx.strokeRect(200, 385, 700, 100);

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('KTU EXAM INTEL: WHY RAREST-FIRST PIECE SELECTION IS CRUCIAL:', 215, 405);

        ctx.fillStyle = '#ffffff';
        ctx.font = '8px "Fira Code", monospace';
        ctx.fillText('1. PREVENT EXTINCTION: If the only peer holding Piece 3 (Peer Zeta) disconnects, the file is uncompletable!', 215, 422);
        ctx.fillText('2. MULTIPLY SEEDERS: Downloading Piece 3 makes you an immediate second source, doubling swarm capacity for it.', 215, 436);
        ctx.fillText('3. EXCEPTION: BitTorrent uses "Random First Piece" on brand-new peers to get ANY chunk quickly to start uploading.', 215, 450);

        ctx.fillStyle = this.challenge1Solved ? '#00ff88' : '#ffd700';
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.fillText(this.challenge1Solved ? '✓ CHALLENGE 1 SOLVED: RAREST PIECE 3 VERIFIED (+2.5M). Proceed to Tab [2] Tit-for-Tat!' : '► Click on PIECE 3 above to verify Rarest-First selection.', 215, 472);

        ctx.restore();
    }

    // ======================================================================
    // Tab 1: Tit-for-Tat & Optimistic Unchoking
    // ======================================================================
    renderTab1_TitForTat(ctx) {
        ctx.save();
        const b = this.uiBounds;

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('SWARM BANDWIDTH RECIPROCITY // TIT-FOR-TAT (UNCHOKE TOP 4 PEERS)', 200, 190);

        ctx.fillStyle = '#ffd700';
        ctx.font = '9px "Fira Code", monospace';
        ctx.fillText('Select the 4 peers sending you data at the highest rate (Tit-for-Tat). Then trigger Optimistic Unchoking.', 200, 206);

        // Render Peer Rows
        b.peerRows.forEach((row, idx) => {
            const peer = this.peers[idx];

            ctx.save();
            ctx.fillStyle = peer.unchoked ? 'rgba(0, 255, 136, 0.22)' : 'rgba(10, 22, 40, 0.9)';
            ctx.fillRect(row.x, row.y, row.w, row.h);

            ctx.strokeStyle = peer.unchoked ? '#00ff88' : (peer.isTop4 ? '#00e5ff' : 'rgba(80, 100, 120, 0.4)');
            ctx.lineWidth = peer.unchoked ? 1.5 : 1;
            ctx.strokeRect(row.x, row.y, row.w, row.h);

            ctx.fillStyle = peer.unchoked ? '#00ff88' : '#ffffff';
            ctx.font = 'bold 9px "Fira Code", monospace';
            ctx.textAlign = 'left';
            ctx.fillText(`${peer.name} [Rank ${peer.rank}]`, row.x + 12, row.y + 16);

            ctx.fillStyle = '#ffd700';
            ctx.font = '8px "Fira Code", monospace';
            ctx.fillText(`Upload Rate: ${peer.rate} KB/s ${peer.isTop4 ? '★ TOP 4' : ''}`, row.x + 12, row.y + 28);

            ctx.fillStyle = peer.unchoked ? '#00ff88' : '#88aacc';
            ctx.font = 'bold 8px "Fira Code", monospace';
            ctx.textAlign = 'right';
            ctx.fillText(peer.unchoked ? '[UNCHOKED ✓]' : '[CHOKED]', row.x + row.w - 12, row.y + 22);
            ctx.restore();
        });

        // Right side controls: Optimistic Unchoking & Assembly
        // 1. Optimistic Unchoke Box
        ctx.fillStyle = 'rgba(8, 18, 36, 0.94)';
        ctx.fillRect(b.optimisticBtn.x, 230, b.optimisticBtn.w, 160);
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.optimisticBtn.x, 230, b.optimisticBtn.w, 160);

        ctx.fillStyle = '#c084fc';
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('OPTIMISTIC UNCHOKING (30-SECOND ROTATION):', b.optimisticBtn.x + 14, 250);

        ctx.fillStyle = '#ffffff';
        ctx.font = '8px "Fira Code", monospace';
        ctx.fillText('• Randomly unchokes a 5th peer regardless of upload rate.', b.optimisticBtn.x + 14, 268);
        ctx.fillText('• Allows new peers to bootstrap pieces.', b.optimisticBtn.x + 14, 282);

        // Optimistic Button
        const canOpt = this.peers.filter(p => p.isTop4 && p.unchoked).length === 4;
        ctx.fillStyle = canOpt ? (this.optimisticPeer ? 'rgba(0, 255, 136, 0.25)' : 'rgba(153, 0, 255, 0.3)') : 'rgba(30, 40, 60, 0.3)';
        ctx.fillRect(b.optimisticBtn.x + 14, 300, b.optimisticBtn.w - 28, 36);
        ctx.strokeStyle = canOpt ? '#00ff88' : '#556677';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.optimisticBtn.x + 14, 300, b.optimisticBtn.w - 28, 36);

        ctx.fillStyle = canOpt ? '#00ff88' : '#556677';
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.textAlign = 'center';
        const optTxt = this.optimisticPeer ? `✓ OPTIMISTIC: ${this.optimisticPeer.toUpperCase()}` : '[TRIGGER OPTIMISTIC UNCHOKE (30s)]';
        ctx.fillText(optTxt, b.optimisticBtn.x + b.optimisticBtn.w / 2, 323);

        ctx.fillStyle = '#ffd700';
        ctx.font = '8px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(this.optimisticPeer ? 'Status: 5th slot allocated to Peer Zeta!' : 'Status: Awaiting top 4 unchoke.', b.optimisticBtn.x + 14, 355);

        // 2. Assemble Payload Button
        const canAssemble = this.challenge1Solved && this.challenge2Solved;
        ctx.fillStyle = canAssemble ? (this.payloadAssembled ? 'rgba(0, 255, 136, 0.3)' : 'rgba(0, 229, 255, 0.25)') : 'rgba(30, 40, 60, 0.3)';
        ctx.fillRect(b.assembleBtn.x, b.assembleBtn.y, b.assembleBtn.w, b.assembleBtn.h);
        ctx.strokeStyle = canAssemble ? '#00ff88' : '#556677';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.assembleBtn.x, b.assembleBtn.y, b.assembleBtn.w, b.assembleBtn.h);

        ctx.fillStyle = canAssemble ? '#00ff88' : '#556677';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        const assemTxt = this.payloadAssembled ? '✓ TITAN_FIN_RST_PAYLOAD ASSEMBLED (2 MB)' : 'ASSEMBLE EXPLOIT PAYLOAD (DOWNLOAD 8 CHUNKS)';
        ctx.fillText(assemTxt, b.assembleBtn.x + b.assembleBtn.w / 2, b.assembleBtn.y + 26);

        ctx.restore();
    }

    // ======================================================================
    // Tab 2: KTU Scheme & Intel Reference
    // ======================================================================
    renderTab2_Intel(ctx) {
        ctx.save();

        ctx.fillStyle = 'rgba(8, 14, 34, 0.9)';
        ctx.fillRect(190, 180, 750, 310);
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 1;
        ctx.strokeRect(190, 180, 750, 310);

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('KTU PCCST501 MODULE 1: CLIENT-SERVER vs P2P ARCHITECTURE (5.0 MARKS)', 205, 205);

        ctx.font = '9px "Fira Code", monospace';
        ctx.fillStyle = '#ffd700';
        ctx.fillText('1. CLIENT-SERVER FILE DISTRIBUTION TIME (KTU Model Paper Q10a):', 205, 230);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('• Server must upload N copies: Time = N * F / u_s.', 215, 246);
        ctx.fillText('• Client with min download rate d_min takes F / d_min.', 215, 260);
        ctx.fillText('• Distribution Time: D_cs >= max(N*F / u_s, F / d_min). Increases LINEARLY with N clients!', 215, 274);

        ctx.fillStyle = '#ffd700';
        ctx.fillText('2. P2P FILE DISTRIBUTION TIME & SELF-SCALABILITY:', 205, 300);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('• Server must upload at least 1 copy: F / u_s.', 215, 316);
        ctx.fillText('• Total upload capacity of entire system = u_s + sum(u_i). Total bits = N * F.', 215, 330);
        ctx.fillText('• Distribution Time: D_p2p >= max(F / u_s, F / d_min, N*F / (u_s + sum(u_i))).', 215, 344);
        ctx.fillText('• SELF-SCALABILITY: As peers join, they bring both demand AND upload capacity! Curve stays flat!', 215, 358);

        ctx.fillStyle = '#ffd700';
        ctx.fillText('3. BITTORRENT PROTOCOL MECHANICS:', 205, 384);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('• Chunks: Files divided into 256 KB pieces. Bitfield: Bitmask of owned pieces.', 215, 400);
        ctx.fillText('• Rarest-First: Request chunk held by fewest peers (prevents piece extinction).', 215, 414);
        ctx.fillText('• Tit-for-Tat: Unchoke top 4 peers with highest rate (every 10s). Optimistic Unchoke: 5th peer (every 30s).', 215, 428);

        ctx.restore();
    }
}

// Global Export
const bitTorrentInstance = new BitTorrentMinigame();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.BitTorrentMinigame = bitTorrentInstance;
    window.BitTorrentMinigame = bitTorrentInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BitTorrentMinigame, bitTorrent: bitTorrentInstance };
}
