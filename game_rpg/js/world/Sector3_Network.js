// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// Sector3_Network.js - Sector 3: The Routing Core World Map
// KTU Module 2: Network Layer, IPv4 Addressing, CIDR Subnetting & MTU Constraints
// ==========================================================================

class Sector3_Network {
    constructor() {
        this.sectorId = 3;
        this.name = 'The Routing Core';
        this.moduleName = 'Module 2: Network Layer';

        // ------------------------------------------------------------------
        // Conduits Layout: Ingress Router -> CIDR Grid -> MTU Chokepoint -> Core
        // Color Theme: Electric Cobalt (#0066ff) & Subnet Gold (#ffd700)
        // ------------------------------------------------------------------
        this.conduits = [
            // 1. Ingress Router Trunk (x: 100 -> 620, y: 360)
            {
                id: 'c_router_ingress',
                name: 'Core Router Ingress Trunk (Autonomous System AS-65001)',
                x1: 100, y1: 360, x2: 620, y2: 360,
                color: '#0066ff',
                glowColor: 'rgba(0, 102, 255, 0.5)',
                width: 22,
                bandwidth: '10 Gbps IP Backbone'
            },
            // 2. CIDR Subnet Stepping Highway (x: 620 -> 1220, y: 360)
            {
                id: 'c_cidr_highway',
                name: 'CIDR Subnet Grid Highway (192.168.10.64/26 Subnet)',
                x1: 620, y1: 360, x2: 1220, y2: 360,
                color: '#ffd700',
                glowColor: 'rgba(255, 215, 0, 0.45)',
                width: 18,
                bandwidth: 'Subnet Matrix (/26 Prefix)'
            },
            // 3. MTU Bottleneck Approach (x: 1220 -> 1450, y: 360)
            {
                id: 'c_mtu_approach',
                name: 'MTU Constriction Channel (1500-Byte Laser Bottleneck)',
                x1: 1220, y1: 360, x2: 1450, y2: 360,
                color: '#00e5ff',
                glowColor: 'rgba(0, 229, 255, 0.45)',
                width: 14,
                bandwidth: 'Constrained Link (MTU = 1500B)'
            },
            // 4. Post-Reassembly High-Speed Egress Trunk (x: 1450 -> 2200, y: 360)
            {
                id: 'c_router_egress',
                name: 'Central Routing Nexus & Dijkstra Forwarding Backbone',
                x1: 1450, y1: 360, x2: 2200, y2: 360,
                color: '#0066ff',
                glowColor: 'rgba(0, 102, 255, 0.55)',
                width: 20,
                bandwidth: 'Core Routing Fabric'
            }
        ];

        // ------------------------------------------------------------------
        // Environmental Hazard: CIDR Subnet Stepping Tiles (192.168.10.64/26)
        // Subnet Mask: 255.255.255.192 (/26 -> 64 total addresses)
        // Network ID: 192.168.10.64 (Cannot be assigned to hosts -> Grounds packet)
        // Usable Hosts: 192.168.10.65 to 192.168.10.126 (62 usable host addresses)
        // Broadcast ID: 192.168.10.127 (Direct broadcast -> Trips daemon alarm!)
        // ------------------------------------------------------------------
        this.subnetTiles = [
            {
                id: 'tile_65',
                x: 680, y: 360, radius: 26,
                ip: '192.168.10.65',
                type: 'USABLE_HOST',
                label: 'HOST .65 (1ST USABLE)',
                desc: 'Valid Host Address'
            },
            {
                id: 'tile_64',
                x: 770, y: 280, radius: 28,
                ip: '192.168.10.64',
                type: 'NETWORK_ID',
                label: 'NET .64 (GROUNDED)',
                desc: 'Network ID - Not assignable to hosts!'
            },
            {
                id: 'tile_75',
                x: 800, y: 360, radius: 26,
                ip: '192.168.10.75',
                type: 'USABLE_HOST',
                label: 'HOST .75 (USABLE)',
                desc: 'Valid Host in /26 block'
            },
            {
                id: 'tile_96',
                x: 920, y: 360, radius: 26,
                ip: '192.168.10.96',
                type: 'USABLE_HOST',
                label: 'HOST .96 (USABLE)',
                desc: 'Valid Host in /26 block'
            },
            {
                id: 'tile_127',
                x: 960, y: 440, radius: 28,
                ip: '192.168.10.127',
                type: 'BROADCAST_ID',
                label: 'BCAST .127 (ALARM!)',
                desc: 'Directed Subnet Broadcast - Trips Daemon Alarm!'
            },
            {
                id: 'tile_110',
                x: 1040, y: 360, radius: 26,
                ip: '192.168.10.110',
                type: 'USABLE_HOST',
                label: 'HOST .110 (USABLE)',
                desc: 'Valid Host in /26 block'
            },
            {
                id: 'tile_126',
                x: 1140, y: 360, radius: 26,
                ip: '192.168.10.126',
                type: 'USABLE_HOST',
                label: 'HOST .126 (LAST USABLE)',
                desc: 'Final Valid Usable Host Address'
            }
        ];

        // Active Hazard Feedback State
        this.activeSubnetAlarm = false;
        this.alarmFlashTimer = 0;
        this.lastTriggeredTile = null;
        this.feedbackBanner = 'NAVIGATE /26 SUBNET (USABLE HOSTS .65 - .126) // AVOID NET (.64) & BCAST (.127)';

        // ------------------------------------------------------------------
        // Chokepoint: 1500-Byte MTU Laser Aperture (at X: 1450, Y: 360)
        // ------------------------------------------------------------------
        this.apertureNode = {
            x: 1450,
            y: 360,
            radius: 36,
            interactionRadius: 85,
            name: '1500-BYTE MTU LASER APERTURE',
            requirement: 'FRAGMENT 4000B DATAGRAM'
        };
        this.isApertureCleared = false;

        // Splitting Animation State (Unit 0xVOID divides into 3 mini fragments)
        this.isSplittingAnim = false;
        this.splitAnimProgress = 0; // 0..1

        // ------------------------------------------------------------------
        // Dijkstra Tactical Pathfinder Terminal (at X: 1800, Y: 360)
        // ------------------------------------------------------------------
        this.dijkstraTerminalNode = {
            x: 1800,
            y: 360,
            radius: 36,
            interactionRadius: 85,
            name: 'DIJKSTRA LINK-STATE PATHFINDER',
            requirement: 'SHORTEST PATH TREE (A->B->C->D->E)'
        };
        this.isDijkstraSolved = false;

        // ------------------------------------------------------------------
        // Gateway to Sector 4: Application Gateway (at X: 2200, Y: 360)
        // ------------------------------------------------------------------
        this.sector4Gateway = {
            x: 2200,
            y: 360,
            width: 36,
            height: 140,
            isUnlocked: false,
            interactionRadius: 85,
            name: 'GATEWAY TO SECTOR 4: APPLICATION GATEWAY'
        };

        this.animTimer = 0;
    }

    update(dt, player, particles, combat) {
        if (!player) return;
        this.animTimer += dt;

        // Decay Alarm Flash
        if (this.activeSubnetAlarm) {
            this.alarmFlashTimer -= dt;
            if (this.alarmFlashTimer <= 0) {
                this.activeSubnetAlarm = false;
            }
        }

        // 1. Check Subnet Tile Stepping Hazards
        this.subnetTiles.forEach(tile => {
            const dist = Math.hypot(player.x - tile.x, player.y - tile.y);
            if (dist <= tile.radius + 12) {
                if (this.lastTriggeredTile !== tile.id) {
                    this.lastTriggeredTile = tile.id;
                    this.handleTileStep(tile, player, particles, combat);
                }
            }
        });

        // 2. Chokepoint Forcefield Collision Check
        // If the 1500B MTU aperture is not yet cleared, block player movement past X: 1440
        if (!this.isApertureCleared && player.x >= 1420 && player.x <= 1460) {
            player.x = 1420;
            player.vx = 0;
        }

        // 3. Update Packet Splitting Animation (Transition through aperture)
        if (this.isSplittingAnim) {
            this.splitAnimProgress += dt * 0.75;
            player.x = 1420 + this.splitAnimProgress * 150; // Glide from 1420 to 1570

            if (particles) {
                particles.emitPacketDischarge(player.x, player.y, '#00e5ff', 8);
            }

            if (this.splitAnimProgress >= 1.0) {
                this.isSplittingAnim = false;
                this.isApertureCleared = true;
                player.x = 1570;

                // Snap sound / Access granted on reassembly
                if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxAccessGranted === 'function') {
                    window.CyberAudio.sfxAccessGranted();
                }

                if (particles) {
                    particles.emitPacketDischarge(player.x, player.y, '#ffd700', 45);
                }
                console.log('[Sector3_Network] Datagram Fragments Reassembled! Transmitted across 1500B MTU constriction.');
            }
        }
    }

    handleTileStep(tile, player, particles, combat) {
        if (tile.type === 'NETWORK_ID') {
            // Network Address (192.168.10.64): Grounds packet, kills momentum
            player.vx = 0;
            player.vy = 0;
            this.feedbackBanner = `⚠️ GROUNDED: ${tile.ip} is NETWORK ID! Cannot be assigned to hosts.`;

            if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxPing === 'function') {
                window.CyberAudio.sfxPing();
            }
            if (particles) {
                particles.emitBufferOverflowSparks(tile.x, tile.y, 18);
            }
        } else if (tile.type === 'BROADCAST_ID') {
            // Directed Broadcast Address (192.168.10.127): Trips alarm and broadcast storm
            this.activeSubnetAlarm = true;
            this.alarmFlashTimer = 1.6;
            this.feedbackBanner = `🚨 ALARM TRIPPED! ${tile.ip} is DIRECTED BROADCAST (Floods all hosts)!`;

            if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxAccessDenied === 'function') {
                window.CyberAudio.sfxAccessDenied();
            }

            if (typeof window !== 'undefined' && window.GameState && typeof window.GameState.modifyBuffer === 'function') {
                window.GameState.modifyBuffer(-12);
            }

            if (particles) {
                particles.emitBufferOverflowSparks(player.x, player.y, 35);
            }

            // Alert patrol daemons in Sector 3 if combat engine is active
            if (combat && combat.enemies) {
                combat.enemies.forEach(e => {
                    if (e.state === 'PATROL') {
                        e.state = 'CHASE';
                        e.target = player;
                    }
                });
            }
        } else if (tile.type === 'USABLE_HOST') {
            // Valid Usable Host Address (.65 through .126): Safe and validated!
            this.feedbackBanner = `✓ VALID USABLE HOST: ${tile.ip} (Within 62-host /26 subnet block)`;

            if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxPing === 'function') {
                window.CyberAudio.sfxPing();
            }
            if (particles) {
                particles.emitPacketDischarge(tile.x, tile.y, '#ffd700', 15);
            }
        }
    }

    startSplittingSequence() {
        this.isSplittingAnim = true;
        this.splitAnimProgress = 0;
    }

    isNearApertureTerminal(px, py) {
        return Math.hypot(px - this.apertureNode.x, py - this.apertureNode.y) <= this.apertureNode.interactionRadius;
    }

    isNearDijkstraTerminal(px, py) {
        return Math.hypot(px - this.dijkstraTerminalNode.x, py - this.dijkstraTerminalNode.y) <= this.dijkstraTerminalNode.interactionRadius;
    }

    isNearSector4Gate(px, py) {
        return Math.hypot(px - this.sector4Gateway.x, py - this.sector4Gateway.y) <= this.sector4Gateway.interactionRadius;
    }

    // ======================================================================
    // Render World Map
    // ======================================================================
    render(ctx) {
        const anim = this.animTimer;

        // 1. Render IP Routing Conduits
        this.conduits.forEach(c => {
            ctx.save();
            ctx.strokeStyle = c.glowColor;
            ctx.lineWidth = c.width + 12;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(c.x1, c.y1);
            ctx.lineTo(c.x2, c.y2);
            ctx.stroke();

            ctx.strokeStyle = c.color;
            ctx.lineWidth = c.width;
            ctx.stroke();

            // Inner Core Beam
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.restore();
        });

        // 2. Render CIDR Subnet Stepping Tiles (192.168.10.64/26)
        this.subnetTiles.forEach(tile => {
            ctx.save();
            let tileColor = '#ffd700'; // Gold for valid usable hosts
            if (tile.type === 'NETWORK_ID') tileColor = '#ffaa00'; // Amber for network
            if (tile.type === 'BROADCAST_ID') tileColor = '#ff0055'; // Red for broadcast

            // Glow Ring
            ctx.strokeStyle = tileColor;
            ctx.lineWidth = 2;
            ctx.shadowColor = tileColor;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(tile.x, tile.y, tile.radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Fill
            ctx.fillStyle = 'rgba(6, 14, 32, 0.9)';
            ctx.fill();

            // Tile Label & IP Address
            ctx.fillStyle = tileColor;
            ctx.font = 'bold 9px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(tile.ip, tile.x, tile.y + 3);

            ctx.fillStyle = '#88aacc';
            ctx.font = '7px "Fira Code", monospace';
            ctx.fillText(tile.label.split(' ')[0], tile.x, tile.y + 14);

            ctx.restore();
        });

        // 3. Render 1500-Byte MTU Laser Aperture Chokepoint (at X: 1450, Y: 360)
        ctx.save();
        ctx.translate(this.apertureNode.x, this.apertureNode.y);

        // Terminal Stand
        ctx.fillStyle = 'rgba(6, 16, 40, 0.95)';
        ctx.beginPath();
        ctx.arc(0, 0, this.apertureNode.radius, 0, Math.PI * 2);
        ctx.fill();

        const apColor = this.isApertureCleared ? '#00ff88' : '#00e5ff';
        ctx.strokeStyle = apColor;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = apColor;
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = apColor;
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('1500B MTU', 0, 4);

        // Aperture Barrier Laser Beams (Constriction Gate)
        if (!this.isApertureCleared) {
            ctx.strokeStyle = 'rgba(0, 229, 255, 0.85)';
            ctx.lineWidth = 3;
            ctx.shadowColor = '#00e5ff';
            ctx.shadowBlur = 14;
            ctx.beginPath();
            ctx.moveTo(0, -75);
            ctx.lineTo(0, 75);
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Cross laser teeth
            for (let y = -65; y <= 65; y += 20) {
                const tooth = Math.sin(anim * 6 + y) * 10;
                ctx.beginPath();
                ctx.moveTo(-8 + tooth, y);
                ctx.lineTo(8 + tooth, y);
                ctx.stroke();
            }
        } else {
            // Cleared Portal Glow
            ctx.strokeStyle = 'rgba(0, 255, 136, 0.35)';
            ctx.lineWidth = 1.5;
            for (let y = -65; y <= 65; y += 20) {
                ctx.beginPath();
                ctx.moveTo(-10, y);
                ctx.lineTo(10, y);
                ctx.stroke();
            }
        }

        // Terminal Prompt Badge
        const badgeW = 320;
        const badgeH = 22;
        ctx.fillStyle = 'rgba(4, 10, 24, 0.94)';
        ctx.fillRect(-badgeW / 2, -100, badgeW, badgeH);
        ctx.strokeStyle = apColor;
        ctx.lineWidth = 1.2;
        ctx.strokeRect(-badgeW / 2, -100, badgeW, badgeH);

        ctx.fillStyle = apColor;
        ctx.font = 'bold 9px "Fira Code", monospace';
        const apLabel = this.isApertureCleared ? '✓ 1500-BYTE MTU PASS COMPLETED' : '[E] MTU FRAGMENTATION APERTURE';
        ctx.fillText(apLabel, 0, -85);

        ctx.restore();

        // 4. Render Splitting Animation in World Space (If Active)
        if (this.isSplittingAnim) {
            this.renderSplittingMiniPackets(ctx);
        }

        // 4.5 Render Dijkstra Pathfinder Terminal Node (at X: 1800, Y: 360)
        ctx.save();
        ctx.translate(this.dijkstraTerminalNode.x, this.dijkstraTerminalNode.y);

        ctx.fillStyle = 'rgba(6, 16, 40, 0.95)';
        ctx.beginPath();
        ctx.arc(0, 0, this.dijkstraTerminalNode.radius, 0, Math.PI * 2);
        ctx.fill();

        const dijkColor = this.isDijkstraSolved ? '#00ff88' : '#0066ff';
        ctx.strokeStyle = dijkColor;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = dijkColor;
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = dijkColor;
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('DIJKSTRA', 0, 4);

        // Terminal Prompt Badge
        const djBadgeW = 300;
        const djBadgeH = 22;
        ctx.fillStyle = 'rgba(4, 10, 24, 0.94)';
        ctx.fillRect(-djBadgeW / 2, -65, djBadgeW, djBadgeH);
        ctx.strokeStyle = dijkColor;
        ctx.lineWidth = 1.2;
        ctx.strokeRect(-djBadgeW / 2, -65, djBadgeW, djBadgeH);

        ctx.fillStyle = dijkColor;
        ctx.font = 'bold 9px "Fira Code", monospace';
        const djText = this.isDijkstraSolved ? '✓ SHORTEST PATH CONVERGED (A->B->C->D->E)' : '[E] DIJKSTRA TACTICAL RADAR';
        ctx.fillText(djText, 0, -50);
        ctx.restore();

        // 4.6 Render Shortest Path Stealth Trajectory (When Dijkstra is solved)
        if (this.isDijkstraSolved) {
            this.sector4Gateway.isUnlocked = true;
            this.renderStealthTrajectory(ctx, anim);
        }

        // 5. Render Gateway to Sector 4 (at X: 2200, Y: 360)
        ctx.save();
        ctx.translate(this.sector4Gateway.x, this.sector4Gateway.y);

        const isGateOpen = this.sector4Gateway.isUnlocked;
        const gateColor = isGateOpen ? '#c084fc' : '#556677';

        ctx.fillStyle = 'rgba(6, 12, 28, 0.92)';
        ctx.fillRect(-18, -this.sector4Gateway.height / 2, this.sector4Gateway.width, this.sector4Gateway.height);
        ctx.strokeStyle = gateColor;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = gateColor;
        ctx.shadowBlur = 14;
        ctx.strokeRect(-18, -this.sector4Gateway.height / 2, this.sector4Gateway.width, this.sector4Gateway.height);

        ctx.fillStyle = gateColor;
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        const gateText = isGateOpen ? '✓ SECTOR 4 GATEWAY (APP LAYER)' : 'GATEWAY TO SECTOR 4: APPLICATION GATEWAY (LOCKED)';
        ctx.fillText(gateText, 0, -this.sector4Gateway.height / 2 - 16);
        ctx.restore();
    }

    renderSplittingMiniPackets(ctx) {
        const prog = this.splitAnimProgress;
        const midX = 1420 + prog * 150;
        const baseY = 360;

        // 3 fragments with vertical offsets
        const frags = [
            { id: 1, yOffset: -28, label: 'Frag 1: Off 0, MF 1 (1500B)', color: '#00e5ff' },
            { id: 2, yOffset: 0, label: 'Frag 2: Off 185, MF 1 (1500B)', color: '#00ff88' },
            { id: 3, yOffset: 28, label: 'Frag 3: Off 370, MF 0 (1040B)', color: '#ffd700' }
        ];

        frags.forEach(f => {
            ctx.save();
            ctx.fillStyle = f.color;
            ctx.shadowColor = f.color;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(midX, baseY + f.yOffset, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 8px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(f.label, midX, baseY + f.yOffset - 12);
            ctx.restore();
        });
    }

    renderStealthTrajectory(ctx, anim) {
        ctx.save();
        // Path Waypoints from Terminal (1800) to Sector 4 Gateway (2200)
        const waypoints = [
            { x: 1800, y: 360, name: 'A' },
            { x: 1900, y: 320, name: 'B' },
            { x: 2000, y: 400, name: 'C' },
            { x: 2100, y: 330, name: 'D' },
            { x: 2200, y: 360, name: 'E' }
        ];

        // Draw Glowing Golden/Cyan Stealth Way
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        waypoints.forEach((pt, idx) => {
            if (idx === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();

        // Pulsing Light Particles along the Path
        const pulse = (anim * 180) % 400;
        const curPulseX = 1800 + pulse;
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(curPulseX, 360 + Math.sin(anim * 4) * 15, 6, 0, Math.PI * 2);
        ctx.fill();

        // Waypoint Markers
        waypoints.forEach(pt => {
            ctx.fillStyle = '#ffd700';
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 8, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 9px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(pt.name, pt.x, pt.y - 12);
        });

        ctx.restore();
    }

    // ======================================================================
    // Render HUD Banner for Subnet & MTU Status (Screen Space)
    // ======================================================================
    renderHUD(ctx) {
        ctx.save();
        const screenW = 1280;

        // Subnet Navigation HUD Banner
        const hudW = 680;
        const hudH = 34;
        const hudX = (screenW - hudW) / 2;
        const hudY = 70;

        ctx.fillStyle = this.activeSubnetAlarm ? 'rgba(50, 4, 16, 0.95)' : 'rgba(4, 12, 30, 0.92)';
        ctx.fillRect(hudX, hudY, hudW, hudH);
        ctx.strokeStyle = this.activeSubnetAlarm ? '#ff0055' : '#ffd700';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(hudX, hudY, hudW, hudH);

        ctx.fillStyle = this.activeSubnetAlarm ? '#ff77aa' : '#ffd700';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(this.feedbackBanner, screenW / 2, hudY + 21);

        ctx.restore();
    }
}

// Global Export
const sector3Instance = new Sector3_Network();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.Sector3_Network = sector3Instance;
    window.Sector3_Network = sector3Instance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Sector3_Network, sector3: sector3Instance };
}
