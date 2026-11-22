// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// P2PSwarmCamp.js - Sector 4: BitTorrent P2P Swarm Resistance Encampment
// KTU Module 1: Peer-to-Peer Architectures, Swarm Coordination, Client-Server vs P2P
// Model Paper Q10(a) / Sets 1-5 Q10(a) (5 Marks)
// ==========================================================================

class P2PSwarmCamp {
    constructor() {
        this.campX = 1380;
        this.campY = 220;
        this.radius = 160;

        // NPC Leader: Seeder Prime
        this.seederPrime = {
            x: 1380,
            y: 220,
            radius: 22,
            interactionRadius: 85,
            name: 'SEEDER PRIME',
            title: 'REBEL SWARM ARCHITECT',
            color: '#00ff88',
            pulse: 0
        };

        // Comparison Terminal (Client-Server vs P2P)
        this.comparisonTerminal = {
            x: 1260,
            y: 220,
            radius: 20,
            interactionRadius: 75,
            name: 'P2P vs CLIENT-SERVER TERMINAL',
            isOpen: false
        };

        // Ambient Rebel Peers in the Swarm Mesh
        this.rebelPeers = [
            { id: 'p_alpha', name: 'PEER ALPHA', x: 1330, y: 170, baseRate: '450 KB/s', role: 'Leecher (75%)', color: '#00e5ff' },
            { id: 'p_beta', name: 'PEER BETA', x: 1430, y: 170, baseRate: '620 KB/s', role: 'Seeder (100%)', color: '#00ff88' },
            { id: 'p_gamma', name: 'PEER GAMMA', x: 1310, y: 260, baseRate: '120 KB/s', role: 'Leecher (38%)', color: '#c084fc' },
            { id: 'p_delta', name: 'PEER DELTA', x: 1450, y: 260, baseRate: '580 KB/s', role: 'Leecher (88%)', color: '#00e5ff' },
            { id: 'p_epsilon', name: 'PEER EPSILON', x: 1380, y: 140, baseRate: '710 KB/s', role: 'Seeder (100%)', color: '#00ff88' },
            { id: 'p_zeta', name: 'PEER ZETA', x: 1380, y: 290, baseRate: '90 KB/s', role: 'Rare Piece Seeder', color: '#ffd700' }
        ];

        // Mesh connections between peers (Ad-hoc P2P overlay graph)
        this.meshLinks = [
            [0, 1], [1, 4], [4, 0], [0, 2], [2, 5], [5, 3], [3, 1], [4, 5]
        ];

        // Dialogue popup state
        this.isNearLeader = false;
        this.dialogueTimer = 0;
        this.animTimer = 0;
    }

    update(dt, player, particles) {
        this.animTimer += dt;
        if (!player) return;

        // Check proximity to Seeder Prime
        const distToLeader = Math.hypot(player.x - this.seederPrime.x, player.y - this.seederPrime.y);
        this.isNearLeader = (distToLeader <= this.seederPrime.interactionRadius);

        // Wander kinematics for rebel peers (gentle breathing motion)
        this.rebelPeers.forEach((p, idx) => {
            p.currentX = p.x + Math.sin(this.animTimer * 1.8 + idx) * 6;
            p.currentY = p.y + Math.cos(this.animTimer * 1.8 + idx) * 6;
        });

        // Ambient particles around camp hub
        if (particles && Math.random() < 0.12) {
            particles.emitPacketDischarge(this.campX + (Math.random() - 0.5) * 120, this.campY + (Math.random() - 0.5) * 80, '#00ff88', 3);
        }
    }

    isNearSeederPrime(px, py) {
        return Math.hypot(this.seederPrime.x - px, this.seederPrime.y - py) <= this.seederPrime.interactionRadius;
    }

    isNearComparisonTerminal(px, py) {
        return Math.hypot(this.comparisonTerminal.x - px, this.comparisonTerminal.y - py) <= this.comparisonTerminal.interactionRadius;
    }

    // ======================================================================
    // Render World Space (Camp Perimeter, Mesh Graph, Rebel Peers, Seeder Prime)
    // ======================================================================
    renderWorld(ctx) {
        ctx.save();

        // 1. Camp Perimeter Glow Field
        const pulse = (Math.sin(this.animTimer * 3) + 1) * 0.5;
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.arc(this.campX, this.campY, this.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(0, 255, 136, 0.03)';
        ctx.fill();
        ctx.restore();

        // 2. Swarm P2P Overlay Mesh Links (Dynamic data transfers between peers)
        ctx.save();
        this.meshLinks.forEach(([i1, i2]) => {
            const p1 = this.rebelPeers[i1];
            const p2 = this.rebelPeers[i2];
            const x1 = p1.currentX || p1.x;
            const y1 = p1.currentY || p1.y;
            const x2 = p2.currentX || p2.x;
            const y2 = p2.currentY || p2.y;

            ctx.strokeStyle = 'rgba(0, 255, 204, 0.25)';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            // Traveling chunk particle along mesh link
            const prog = (this.animTimer * 1.5 + (i1 + i2) * 0.2) % 1.0;
            const px = x1 + (x2 - x1) * prog;
            const py = y1 + (y2 - y1) * prog;
            ctx.fillStyle = '#00ff88';
            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.restore();

        // 3. Render Rebel Peers
        this.rebelPeers.forEach(p => {
            const x = p.currentX || p.x;
            const y = p.currentY || p.y;

            ctx.save();
            ctx.fillStyle = 'rgba(10, 24, 38, 0.9)';
            ctx.beginPath();
            ctx.arc(x, y, 14, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = p.color;
            ctx.lineWidth = 1.5;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 6;
            ctx.stroke();

            ctx.fillStyle = p.color;
            ctx.font = 'bold 7px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(p.name.split(' ')[1], x, y + 2);
            ctx.fillText(p.baseRate, x, y + 15);
            ctx.restore();
        });

        // 4. Render Seeder Prime (NPC Leader)
        const sp = this.seederPrime;
        ctx.save();
        ctx.fillStyle = 'rgba(6, 32, 24, 0.96)';
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2.5 + pulse * 1.5;
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 14;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 8px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('SEEDER', sp.x, sp.y - 3);
        ctx.fillText('PRIME', sp.x, sp.y + 7);

        // Interaction Prompt when player is close
        if (this.isNearLeader) {
            ctx.fillStyle = '#ffd700';
            ctx.font = 'bold 9px "Fira Code", monospace';
            ctx.fillText('[E] TALK / TRADE PIECES', sp.x, sp.y - sp.radius - 10);

            // Dialogue Box
            ctx.fillStyle = 'rgba(6, 18, 30, 0.94)';
            ctx.fillRect(sp.x - 170, sp.y + sp.radius + 10, 340, 52);
            ctx.strokeStyle = '#00ff88';
            ctx.lineWidth = 1;
            ctx.strokeRect(sp.x - 170, sp.y + sp.radius + 10, 340, 52);

            ctx.fillStyle = '#00ff88';
            ctx.font = 'bold 8px "Fira Code", monospace';
            ctx.textAlign = 'left';
            ctx.fillText('SEEDER PRIME: "Welcome to the Swarm, Unit 0xVOID!"', sp.x - 160, sp.y + sp.radius + 24);
            ctx.fillStyle = '#ffffff';
            ctx.fillText('"Use Rarest-First & Tit-for-Tat to assemble the exploit code!"', sp.x - 160, sp.y + sp.radius + 37);
            ctx.fillStyle = '#ffd700';
            ctx.fillText('Press [E] to open the BitTorrent Swarm Console (+5 Marks).', sp.x - 160, sp.y + sp.radius + 50);
        }
        ctx.restore();

        // 5. Render Comparison Terminal Node
        const ct = this.comparisonTerminal;
        ctx.save();
        ctx.fillStyle = 'rgba(8, 20, 42, 0.9)';
        ctx.beginPath();
        ctx.arc(ct.x, ct.y, ct.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 8;
        ctx.stroke();

        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 7px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('P2P vs CS', ct.x, ct.y - 2);
        ctx.fillText('INTEL', ct.x, ct.y + 8);
        ctx.restore();

        ctx.restore();
    }
}

// Global Export
const p2pCampInstance = new P2PSwarmCamp();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.P2PSwarmCamp = p2pCampInstance;
    window.P2PSwarmCamp = p2pCampInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { P2PSwarmCamp, p2pCamp: p2pCampInstance };
}
