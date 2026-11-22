// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// Sector2_DataLink.js - Sector 2: The Frame Matrix World Map
// KTU Module 3: Ethernet Standards (10Base5, 10Base2, 10Base-T, 10Base-F), MAC & Framing
// ==========================================================================

class Sector2_DataLink {
    constructor() {
        this.sectorId = 2;
        this.name = 'The Frame Matrix';
        this.moduleName = 'Module 3: Data Link Layer';

        // ------------------------------------------------------------------
        // Conduits Layout: 10Base5 Thicknet -> 10Base2 Thinnet -> 10Base-T/F Star
        // KTU Model Paper Q14a Ethernet Specifications:
        // 10Base5: 500m max, Thick yellow coax, Bus topology, Vampire taps
        // 10Base2: 185m max, Thin flexible coax, Bus topology, BNC-T
        // 10Base-T: 100m max, Cat 3/5 UTP, Physical Star topology, RJ-45
        // 10Base-F: 2000m max, Optical fiber, Star topology
        // ------------------------------------------------------------------
        this.conduits = [
            // 1. 10Base5 Thicknet Bus Highway (x: 100 -> 720, y: 360)
            {
                id: 'c_10base5_bus',
                type: '10BASE5',
                name: '10Base5 Thicknet Trunk (500m Max // Thick Yellow RG-8)',
                x1: 100, y1: 360, x2: 720, y2: 360,
                color: '#ffd700',
                glowColor: 'rgba(255, 215, 0, 0.45)',
                width: 22,
                maxLength: '500 m',
                topology: 'Bus (Vampire Taps & AUI)'
            },
            // 2. Transceiver Drop Conduit (Connector: 720 -> 820)
            {
                id: 'c_repeater_link',
                type: 'TRANSCEIVER_LINK',
                name: 'Ethernet Multiport Repeater Bridge',
                x1: 720, y1: 360, x2: 820, y2: 360,
                color: '#00ff88',
                glowColor: 'rgba(0, 255, 136, 0.4)',
                width: 14
            },
            // 3. 10Base2 Thinnet Corridor (x: 820 -> 1340, y: 360)
            {
                id: 'c_10base2_bus',
                type: '10BASE2',
                name: '10Base2 Thinnet Conduit (185m Max // RG-58 Coax // BNC-T)',
                x1: 820, y1: 360, x2: 1340, y2: 360,
                color: '#88aacc',
                glowColor: 'rgba(136, 170, 204, 0.4)',
                width: 12,
                maxLength: '185 m',
                topology: 'Bus (BNC-T & 50Ω Terminators)'
            },
            // 4. Collision Chasm Bridge to Minimum Frame Terminal (x: 1340 -> 1600, y: 360)
            {
                id: 'c_frame_bridge',
                type: 'FRAME_BRIDGE',
                name: '64-Byte Minimum Frame Alignment Bridge',
                x1: 1340, y1: 360, x2: 1600, y2: 360,
                color: '#00ff88',
                glowColor: 'rgba(0, 255, 136, 0.5)',
                width: 16
            },
            // 5. 10Base-T Physical Star Hub Core (x: 1600 -> 1900, y: 360)
            {
                id: 'c_10baseT_hub',
                type: '10BASE_T',
                name: '10Base-T Multiport Switch Hub (100m Max // UTP Star)',
                x1: 1600, y1: 360, x2: 1900, y2: 360,
                color: '#00ff88',
                glowColor: 'rgba(0, 255, 136, 0.55)',
                width: 16,
                maxLength: '100 m',
                topology: 'Star (Central Switch / RJ-45)'
            },
            // Star Topology Radial Branches (10Base-T UTP Spoke Cables)
            {
                id: 'c_star_spoke_1',
                type: '10BASE_T',
                name: 'UTP Spoke Alpha (Port 1)',
                x1: 1900, y1: 360, x2: 2020, y2: 240,
                color: '#00ff88',
                glowColor: 'rgba(0, 255, 136, 0.35)',
                width: 12
            },
            {
                id: 'c_star_spoke_2',
                type: '10BASE_T',
                name: 'UTP Spoke Beta (Port 2)',
                x1: 1900, y1: 360, x2: 2020, y2: 480,
                color: '#00ff88',
                glowColor: 'rgba(0, 255, 136, 0.35)',
                width: 12
            },
            // 6. 10Base-F High-Speed Fiber Backbone (x: 1900 -> 2200, y: 360)
            {
                id: 'c_10baseF_trunk',
                type: '10BASE_F',
                name: '10Base-F Fiber Optic Trunk (2000m Max // 2 km Fiber Star)',
                x1: 1900, y1: 360, x2: 2200, y2: 360,
                color: '#ff007f',
                glowColor: 'rgba(255, 0, 127, 0.65)',
                width: 16,
                maxLength: '2000 m (2 km)',
                topology: 'Fiber Star (Dual Fiber ST/SC)'
            }
        ];

        // ------------------------------------------------------------------
        // Hardware Junction Elements (Vampire Taps & BNC-T Connectors)
        // ------------------------------------------------------------------
        this.vampireTaps = [
            { x: 260, y: 360, label: 'VAMPIRE TAP #1' },
            { x: 440, y: 360, label: 'VAMPIRE TAP #2' },
            { x: 620, y: 360, label: 'VAMPIRE TAP #3' }
        ];

        this.bncTConnectors = [
            { x: 920, y: 360, label: 'BNC-T #1' },
            { x: 1080, y: 360, label: 'BNC-T #2' },
            { x: 1240, y: 360, label: 'BNC-T #3 (50Ω TERM)' }
        ];

        // 64-Byte Minimum Frame Alignment Terminal Console (at X: 1470, Y: 360)
        this.frameTerminalNode = {
            x: 1470,
            y: 360,
            radius: 34,
            interactionRadius: 85,
            name: '64-BYTE FRAME SIZE SYNTHESIZER',
            requirement: 'SATISFY T_fr >= 2 * T_p'
        };

        // CRC Polynomial Laser Trap (at X: 1820, Y: 360)
        this.crcTerminalNode = {
            x: 1820,
            y: 360,
            radius: 34,
            interactionRadius: 85,
            name: 'CRC POLYNOMIAL LASER TRAP',
            requirement: 'DIVISOR 1101 // ZERO REMAINDER'
        };
        this.laserTrapDeactivated = false;

        // CENTINEL-802: Ethernet Switch Fabric Console (at X: 2120, Y: 360)
        this.switchTerminalNode = {
            x: 2120,
            y: 360,
            radius: 34,
            interactionRadius: 85,
            name: 'CENTINEL-802: SWITCH FABRIC CONSOLE',
            requirement: 'MAC LEARNING // FLOODING // FORWARDING'
        };

        // Gateway to Sector 3 (at X: 2200, Y: 360)
        this.sector3Gateway = {
            x: 2200,
            y: 360,
            width: 36,
            height: 140,
            isUnlocked: false,
            interactionRadius: 85,
            name: 'GATEWAY TO SECTOR 3: ROUTING CORE'
        };

        this.animTimer = 0;
    }

    update(dt, player, particles, collisionHazard) {
        if (!player) return;
        this.animTimer += dt;

        // Bridge collision check: If 64-byte terminal is unsolved, prevent passing bridge
        if (collisionHazard && !collisionHazard.isTerminalSolved && player.x >= 1520 && player.x <= 1560) {
            player.x = 1520;
            player.vx = 0;
        }

        // CRC Laser Barrier collision check: If laser trap is active, prevent passing X: 1820
        if (!this.laserTrapDeactivated && player.x >= 1800 && player.x <= 1840) {
            player.x = 1800;
            player.vx = 0;
        }

        // Sector 3 Gateway Barrier: If not unlocked, prevent passing X: 2180
        if (!this.sector3Gateway.isUnlocked && player.x >= 2180) {
            player.x = 2180;
            player.vx = 0;
        }
    }

    isNearFrameTerminal(px, py) {
        return Math.hypot(px - this.frameTerminalNode.x, py - this.frameTerminalNode.y) <= this.frameTerminalNode.interactionRadius;
    }

    isNearCRCTerminal(px, py) {
        return Math.hypot(px - this.crcTerminalNode.x, py - this.crcTerminalNode.y) <= this.crcTerminalNode.interactionRadius;
    }

    isNearSwitchTerminal(px, py) {
        return Math.hypot(px - this.switchTerminalNode.x, py - this.switchTerminalNode.y) <= this.switchTerminalNode.interactionRadius;
    }

    isNearSector3Gate(px, py) {
        return Math.hypot(px - this.sector3Gateway.x, py - this.sector3Gateway.y) <= this.sector3Gateway.interactionRadius;
    }

    // ======================================================================
    // Render World Map
    // ======================================================================
    render(ctx) {
        const anim = this.animTimer;

        // 1. Render Transmission Conduits
        this.conduits.forEach(c => {
            ctx.save();

            // Outer Shield Glow
            ctx.beginPath();
            ctx.moveTo(c.x1, c.y1);
            ctx.lineTo(c.x2, c.y2);
            ctx.strokeStyle = c.glowColor;
            ctx.lineWidth = c.width + 12;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Core Cable Line
            ctx.beginPath();
            ctx.moveTo(c.x1, c.y1);
            ctx.lineTo(c.x2, c.y2);
            ctx.strokeStyle = c.color;
            ctx.lineWidth = c.width;
            ctx.shadowColor = c.color;
            ctx.shadowBlur = (c.type === '10BASE_F') ? 18 : 8;
            ctx.stroke();

            // High-Tech Cable Textures
            if (c.type === '10BASE5') {
                // Thick Yellow Coaxial Band Striping
                ctx.setLineDash([8, 16]);
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(c.x1, c.y1);
                ctx.lineTo(c.x2, c.y2);
                ctx.stroke();
            } else if (c.type === '10BASE_F') {
                // High-Speed Fiber Optical Pulses
                ctx.setLineDash([16, 24]);
                ctx.lineDashOffset = -anim * 120;
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(c.x1, c.y1);
                ctx.lineTo(c.x2, c.y2);
                ctx.stroke();
            }

            ctx.restore();
        });

        // 2. Render 10Base5 Vampire Taps
        this.vampireTaps.forEach(tap => {
            ctx.save();
            ctx.translate(tap.x, tap.y);

            // Piercing Tap Clamp (Clamped directly onto the thick coax)
            ctx.fillStyle = '#222222';
            ctx.fillRect(-12, -20, 24, 40);
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(-12, -20, 24, 40);

            // Transceiver Drop Stems (AUI Drop Cable)
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(0, -20);
            ctx.lineTo(0, -42);
            ctx.stroke();

            // Transceiver Node
            ctx.fillStyle = '#ffd700';
            ctx.beginPath();
            ctx.arc(0, -46, 6, 0, Math.PI * 2);
            ctx.fill();

            // Tap Badge
            ctx.fillStyle = '#ffd700';
            ctx.font = 'bold 8px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(tap.label, 0, 32);

            ctx.restore();
        });

        // 3. Render 10Base2 BNC-T Connectors & 50Ω Terminators
        this.bncTConnectors.forEach(bnc => {
            ctx.save();
            ctx.translate(bnc.x, bnc.y);

            // T-junction Barrel
            ctx.fillStyle = '#111a28';
            ctx.fillRect(-8, -14, 16, 28);
            ctx.strokeStyle = '#88aacc';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(-8, -14, 16, 28);

            // BNC Stem
            ctx.strokeStyle = '#88aacc';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(0, 14);
            ctx.lineTo(0, 32);
            ctx.stroke();

            ctx.fillStyle = '#88aacc';
            ctx.font = 'bold 8px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(bnc.label, 0, -20);

            ctx.restore();
        });

        // 4. Render Highway Standard Comparison Badges (KTU Model Paper Q14a)
        ctx.save();
        // 10Base5 Badge
        ctx.fillStyle = 'rgba(4, 10, 24, 0.92)';
        ctx.fillRect(200, 275, 400, 24);
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 1;
        ctx.strokeRect(200, 275, 400, 24);
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('10Base5 THICKNET // MAX 500m // BUS TOPOLOGY // VAMPIRE TAPS', 400, 291);

        // 10Base2 Badge
        ctx.fillStyle = 'rgba(4, 10, 24, 0.92)';
        ctx.fillRect(840, 275, 400, 24);
        ctx.strokeStyle = '#88aacc';
        ctx.lineWidth = 1;
        ctx.strokeRect(840, 275, 400, 24);
        ctx.fillStyle = '#88aacc';
        ctx.fillText('10Base2 THINNET // MAX 185m // BUS TOPOLOGY // BNC-T CONNECTORS', 1040, 291);

        // 10Base-T & 10Base-F Hub Badge
        ctx.fillStyle = 'rgba(4, 10, 24, 0.92)';
        ctx.fillRect(1700, 275, 420, 24);
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 1;
        ctx.strokeRect(1700, 275, 420, 24);
        ctx.fillStyle = '#00ff88';
        ctx.fillText('10Base-T (100m UTP STAR) & 10Base-F (2000m FIBER STAR)', 1910, 291);
        ctx.restore();

        // 5. Render 64-Byte Minimum Frame Alignment Terminal (at X: 1470, Y: 360)
        ctx.save();
        ctx.translate(this.frameTerminalNode.x, this.frameTerminalNode.y);

        const modP = 1.0 + Math.sin(anim * 4) * 0.08;
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 16;

        // Rotating Hexagon Housing
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3 + anim * 0.5;
            const hx = Math.cos(angle) * this.frameTerminalNode.radius * modP;
            const hy = Math.sin(angle) * this.frameTerminalNode.radius * modP;
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.stroke();

        // Inner 64-Byte Frame Icon
        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('64B', 0, 4);

        // Terminal Badge
        const termBadgeW = 280;
        const termBadgeH = 22;
        ctx.fillStyle = 'rgba(4, 10, 24, 0.94)';
        ctx.fillRect(-termBadgeW / 2, this.frameTerminalNode.radius + 12, termBadgeW, termBadgeH);
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 1;
        ctx.strokeRect(-termBadgeW / 2, this.frameTerminalNode.radius + 12, termBadgeW, termBadgeH);

        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.fillText('64-BYTE MIN FRAME SYNTHESIZER [E]', 0, this.frameTerminalNode.radius + 26);
        ctx.restore();

        // 5.5 Render CRC Polynomial Laser Trap (at X: 1820, Y: 360)
        ctx.save();
        ctx.translate(this.crcTerminalNode.x, this.crcTerminalNode.y);

        const trapColor = this.laserTrapDeactivated ? '#00e5ff' : '#ff0055';
        const trapLabel = this.laserTrapDeactivated ? 'CRC LASER TRAP: DEACTIVATED [000 REMAINDER]' : 'CRC POLYNOMIAL LASER TRAP: ACTIVE [E]';

        // Barrier Frame
        ctx.fillStyle = 'rgba(4, 10, 24, 0.9)';
        ctx.fillRect(-16, -70, 32, 140);
        ctx.strokeStyle = trapColor;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = trapColor;
        ctx.shadowBlur = 16;
        ctx.strokeRect(-16, -70, 32, 140);

        // Laser Beams
        if (!this.laserTrapDeactivated) {
            ctx.strokeStyle = '#ff0055';
            ctx.lineWidth = 2;
            for (let y = -55; y <= 55; y += 22) {
                const beamAlpha = 0.7 + Math.sin(anim * 12 + y) * 0.3;
                ctx.strokeStyle = `rgba(255, 0, 85, ${beamAlpha})`;
                ctx.beginPath();
                ctx.moveTo(-14, y);
                ctx.lineTo(14, y);
                ctx.stroke();
            }
        } else {
            // Power-down cyan beams
            ctx.strokeStyle = 'rgba(0, 229, 255, 0.25)';
            ctx.lineWidth = 1;
            for (let y = -55; y <= 55; y += 22) {
                ctx.beginPath();
                ctx.moveTo(-14, y);
                ctx.lineTo(14, y);
                ctx.stroke();
            }
        }

        // Terminal Prompt Badge
        const crcBadgeW = 320;
        const crcBadgeH = 22;
        ctx.fillStyle = 'rgba(4, 10, 24, 0.94)';
        ctx.fillRect(-crcBadgeW / 2, -95, crcBadgeW, crcBadgeH);
        ctx.strokeStyle = trapColor;
        ctx.lineWidth = 1.2;
        ctx.strokeRect(-crcBadgeW / 2, -95, crcBadgeW, crcBadgeH);

        ctx.fillStyle = trapColor;
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(trapLabel, 0, -80);
        ctx.restore();

        // 6. Render CENTINEL-802: Ethernet Switch Fabric Console (at X: 2120, Y: 360)
        ctx.save();
        ctx.translate(this.switchTerminalNode.x, this.switchTerminalNode.y);

        ctx.fillStyle = 'rgba(6, 18, 42, 0.95)';
        ctx.beginPath();
        ctx.arc(0, 0, this.switchTerminalNode.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = this.sector3Gateway.isUnlocked ? '#00ff88' : '#00e5ff';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Central Switch Icon / LED
        ctx.fillStyle = this.sector3Gateway.isUnlocked ? '#00ff88' : '#00e5ff';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('L2', 0, 4);

        // Terminal Prompt Badge
        const swBadgeW = 280;
        const swBadgeH = 22;
        ctx.fillStyle = 'rgba(4, 10, 24, 0.94)';
        ctx.fillRect(-swBadgeW / 2, -65, swBadgeW, swBadgeH);
        ctx.strokeStyle = this.sector3Gateway.isUnlocked ? '#00ff88' : '#00e5ff';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(-swBadgeW / 2, -65, swBadgeW, swBadgeH);

        ctx.fillStyle = this.sector3Gateway.isUnlocked ? '#00ff88' : '#00e5ff';
        ctx.font = 'bold 9px "Fira Code", monospace';
        const swLabel = this.sector3Gateway.isUnlocked ? '✓ CENTINEL-802 CALIBRATED' : '[E] CENTINEL-802 SWITCH CONSOLE';
        ctx.fillText(swLabel, 0, -50);
        ctx.restore();

        // 7. Render Gateway to Sector 3 (at X: 2200, Y: 360)
        ctx.save();
        ctx.translate(this.sector3Gateway.x, this.sector3Gateway.y);

        const isGateOpen = this.sector3Gateway.isUnlocked;
        const gateColor = isGateOpen ? '#00ff88' : 'rgba(255, 0, 80, 0.85)';

        ctx.fillStyle = 'rgba(4, 10, 24, 0.92)';
        ctx.fillRect(-18, -this.sector3Gateway.height / 2, this.sector3Gateway.width, this.sector3Gateway.height);
        ctx.strokeStyle = gateColor;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = gateColor;
        ctx.shadowBlur = 14;
        ctx.strokeRect(-18, -this.sector3Gateway.height / 2, this.sector3Gateway.width, this.sector3Gateway.height);

        // Security Beams or Ascending Light
        if (isGateOpen) {
            ctx.strokeStyle = 'rgba(0, 255, 136, 0.4)';
            ctx.lineWidth = 2;
            for (let y = -this.sector3Gateway.height / 2 + 15; y < this.sector3Gateway.height / 2; y += 16) {
                const wave = Math.sin(anim * 4 + y * 0.1) * 8;
                ctx.beginPath();
                ctx.moveTo(-12 + wave, y);
                ctx.lineTo(12 + wave, y);
                ctx.stroke();
            }
        } else {
            ctx.strokeStyle = 'rgba(255, 0, 80, 0.7)';
            ctx.lineWidth = 1.5;
            for (let y = -this.sector3Gateway.height / 2 + 15; y < this.sector3Gateway.height / 2; y += 22) {
                ctx.beginPath();
                ctx.moveTo(-16, y);
                ctx.lineTo(16, y);
                ctx.stroke();
            }
        }

        ctx.fillStyle = gateColor;
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        const gateText = isGateOpen ? '✓ SECTOR 3 CONDUIT OPEN [STEP TO ASCEND]' : 'GATEWAY TO SECTOR 3: ROUTING CORE (LOCKED)';
        ctx.fillText(gateText, 0, -this.sector3Gateway.height / 2 - 16);
        ctx.restore();
    }
}

// Global Export
const sector2Instance = new Sector2_DataLink();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.Sector2_DataLink = sector2Instance;
    window.Sector2_DataLink = sector2Instance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Sector2_DataLink, sector2: sector2Instance };
}
