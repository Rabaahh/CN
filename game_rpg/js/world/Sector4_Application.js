// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// Sector4_Application.js - Sector 4: The Application Gateway World Map
// KTU Module 1: Application Layer Protocols (DNS, HTTP/1.1 & HTTP/2, SMTP/POP3/IMAP, FTP)
// ==========================================================================

class Sector4_Application {
    constructor() {
        this.sectorId = 4;
        this.name = 'The Application Gateway';
        this.moduleName = 'Module 1: Application Layer';

        // ------------------------------------------------------------------
        // Conduits Layout:
        // Zone 1: The Web Bastion (HTTP/1.1 & HTTP/2) -> X: 100 to 750
        // Zone 2: The Mail Relay Sanctum (SMTP, POP3, IMAP) -> X: 750 to 1400
        // Zone 3: The Dual-Port FTP Conduit (Port 20 & 21) -> X: 1400 to 1950
        // Zone 4: Gateway to Final Nexus (TITAN-CORE) -> X: 1950 to 2200
        // Color Theme: Royal Purple (#9900ff), Electric Violet (#c084fc), Cyan (#00ffcc)
        // ------------------------------------------------------------------
        this.conduits = [
            // 1. Web Bastion Ingress Trunk (HTTP/1.1 & HTTP/2 Highway)
            {
                id: 'c_web_bastion',
                name: 'The Web Bastion (HTTP/1.1 Pipelining & HTTP/2 Multiplexing)',
                x1: 100, y1: 360, x2: 750, y2: 360,
                color: '#9900ff',
                glowColor: 'rgba(153, 0, 255, 0.55)',
                width: 22,
                protocol: 'HTTP/1.1 & HTTP/2 (Port 80/443)'
            },
            // 2. Mail Relay Sanctum Highway (Push vs Pull Architecture)
            {
                id: 'c_mail_sanctum',
                name: 'The Mail Relay Sanctum (SMTP Push vs POP3/IMAP4 Pull)',
                x1: 750, y1: 360, x2: 1400, y2: 360,
                color: '#c084fc',
                glowColor: 'rgba(192, 132, 252, 0.5)',
                width: 20,
                protocol: 'SMTP (25), POP3 (110), IMAP4 (143)'
            },
            // 3. Dual-Port FTP Highway (Separate Control & Data Channels)
            {
                id: 'c_ftp_conduit',
                name: 'The Dual-Port FTP Conduit (Port 21 Control & Port 20 Data)',
                x1: 1400, y1: 360, x2: 1950, y2: 360,
                color: '#00ffcc',
                glowColor: 'rgba(0, 255, 204, 0.5)',
                width: 18,
                protocol: 'FTP Control (21) & Data (20)'
            },
            // 4. Final Nexus Egress Trunk
            {
                id: 'c_nexus_egress',
                name: 'Titan Core Infiltration Egress Trunk',
                x1: 1950, y1: 360, x2: 2250, y2: 360,
                color: '#ffd700',
                glowColor: 'rgba(255, 215, 0, 0.55)',
                width: 24,
                protocol: 'Master Boss Nexus AS-9000'
            }
        ];

        // ------------------------------------------------------------------
        // Interactive Nodes & Terminals
        // ------------------------------------------------------------------

        // 1. Web Infiltration Terminal (DNS Resolution + HTTP Flow) at X: 700, Y: 360
        this.webTerminalNode = {
            x: 700,
            y: 360,
            radius: 36,
            interactionRadius: 85,
            name: 'WEB INFILTRATION PIPELINE CONSOLE',
            requirement: 'DNS RESOLUTION & HTTP 200 OK (KTU Q9b - 4 MARKS)'
        };
        this.isWebTerminalCleared = false;

        // 2. Mail Relay Sanctum Stations (UA, MTA, MAA)
        this.mailStations = [
            {
                id: 'mail_ua',
                name: 'USER AGENT (UA)',
                desc: 'Client email composition & reading interface (e.g., Thunderbird/Outlook)',
                x: 880, y: 280, radius: 26, color: '#c084fc'
            },
            {
                id: 'mail_mta',
                name: 'MESSAGE TRANSFER AGENT (MTA)',
                desc: 'SMTP (TCP Port 25): Push protocol transferring mail server-to-server',
                x: 1040, y: 360, radius: 30, color: '#ff77aa'
            },
            {
                id: 'mail_maa',
                name: 'MESSAGE ACCESS AGENT (MAA)',
                desc: 'POP3 (Port 110) & IMAP4 (Port 143): Pull protocols retrieving mail to client',
                x: 1220, y: 280, radius: 28, color: '#00e5ff'
            }
        ];

        this.mailConsoleNode = {
            x: 1200,
            y: 360,
            radius: 34,
            interactionRadius: 80,
            name: 'MAIL ARCHITECTURE DATABANK',
            requirement: 'SMTP PUSH vs POP3/IMAP PULL'
        };

        // 3. Dual-Port FTP Conduit Stations (Port 21 Control vs Port 20 Data)
        this.ftpStations = [
            {
                id: 'ftp_ctrl',
                name: 'PORT 21: CONTROL CONNECTION',
                desc: 'Persistent throughout session. Out-of-band commands: USER, PASS, RETR, STOR',
                x: 1540, y: 300, radius: 26, color: '#00ffcc'
            },
            {
                id: 'ftp_data',
                name: 'PORT 20: DATA CONNECTION',
                desc: 'Ephemeral per-file transfer. Opened dynamically and closed when file ends',
                x: 1720, y: 420, radius: 26, color: '#ffd700'
            }
        ];

        this.ftpConsoleNode = {
            x: 1750,
            y: 360,
            radius: 34,
            interactionRadius: 80,
            name: 'DUAL-PORT FTP CONDUIT TERMINAL',
            requirement: 'OUT-OF-BAND PORT 21 vs EPHEMERAL PORT 20'
        };

        // 4. Central Network Management Subsystem (SNMP & ASN.1) at X: 1950, Y: 360
        this.snmpTerminalNode = {
            x: 1950,
            y: 360,
            radius: 36,
            interactionRadius: 85,
            name: 'SNMP MIB & ASN.1 COMPILER TERMINAL',
            requirement: 'MIB-2 (1.3.6.1.2.1) & ASN.1 SYNTAX (6 MARKS)'
        };
        this.isSnmpCleared = false;

        // 5. Gateway to Titan Core Master Boss (at X: 2200, Y: 360)
        this.masterGateway = {
            x: 2200,
            y: 360,
            width: 36,
            height: 140,
            isUnlocked: false,
            interactionRadius: 85,
            name: 'GATEWAY TO TITAN-CORE: OMNINET APEX NEXUS'
        };

        // Server Rack Visual Props
        this.serverRacks = [
            { x: 300, y: 220, w: 70, h: 90, label: 'WEB-SVR-01', lights: ['#00ff88', '#00ff88', '#00ff88'] },
            { x: 500, y: 430, w: 70, h: 80, label: 'PROXY-CACHE', lights: ['#00e5ff', '#00ff88', '#00e5ff'] },
            { x: 920, y: 440, w: 80, h: 90, label: 'MTA-RELAY', lights: ['#c084fc', '#ff77aa', '#c084fc'] },
            { x: 1350, y: 220, w: 75, h: 90, label: 'IMAP-STORE', lights: ['#00ffcc', '#00ffcc', '#ffd700'] },
            { x: 1650, y: 220, w: 70, h: 80, label: 'FTP-ARCHIVE', lights: ['#ffd700', '#00ffcc', '#ffd700'] }
        ];

        this.activeInfoBanner = 'SECTOR 4: APPLICATION GATEWAY // INFILTRATE WEB BASTION (X: 700) TO RESOLVE DNS & HTTP!';
        this.infoBannerTimer = 0;
        this.animTimer = 0;
    }

    update(dt, player, particles, combat) {
        if (!player) return;
        this.animTimer += dt;

        // Decay Info Banner Timer
        if (this.infoBannerTimer > 0) {
            this.infoBannerTimer -= dt;
            if (this.infoBannerTimer <= 0) {
                this.activeInfoBanner = 'SECTOR 4: APPLICATION GATEWAY // INFILTRATE WEB BASTION (X: 700) TO RESOLVE DNS & HTTP!';
            }
        }

        // 1. Web Bastion Forcefield Gate Collision Check
        // If the web infiltration terminal is not yet cleared, block player movement past X: 740
        if (!this.isWebTerminalCleared && player.x >= 730 && player.x <= 760) {
            player.x = 730;
            player.vx = 0;
            this.showBanner('⚠️ ACCESS RESTRICTED: CLEAR THE WEB INFILTRATION TERMINAL [E] AT X: 700 TO ADVANCE!');
        }

        // 2. Proximity checks for ambient information displays
        this.mailStations.forEach(st => {
            const dist = Math.hypot(player.x - st.x, player.y - st.y);
            if (dist <= st.radius + 20) {
                this.showBanner(`📧 ${st.name}: ${st.desc}`);
            }
        });

        this.ftpStations.forEach(st => {
            const dist = Math.hypot(player.x - st.x, player.y - st.y);
            if (dist <= st.radius + 20) {
                this.showBanner(`📂 ${st.name}: ${st.desc}`);
            }
        });
    }

    showBanner(msg, duration = 2.5) {
        this.activeInfoBanner = msg;
        this.infoBannerTimer = duration;
    }

    // Interaction checks
    isNearWebTerminal(px, py) {
        return Math.hypot(this.webTerminalNode.x - px, this.webTerminalNode.y - py) <= this.webTerminalNode.interactionRadius;
    }

    isNearMailTerminal(px, py) {
        return Math.hypot(this.mailConsoleNode.x - px, this.mailConsoleNode.y - py) <= this.mailConsoleNode.interactionRadius;
    }

    isNearFTPTerminal(px, py) {
        return Math.hypot(this.ftpConsoleNode.x - px, this.ftpConsoleNode.y - py) <= this.ftpConsoleNode.interactionRadius;
    }

    isNearSNMPTerminal(px, py) {
        return Math.hypot(this.snmpTerminalNode.x - px, this.snmpTerminalNode.y - py) <= this.snmpTerminalNode.interactionRadius;
    }

    isNearMasterGate(px, py) {
        return Math.hypot(this.masterGateway.x - px, this.masterGateway.y - py) <= this.masterGateway.interactionRadius;
    }

    // ======================================================================
    // Render World Space (Cloud Server Racks, Glowing Conduits, Protocol Stations)
    // ======================================================================
    render(ctx) {
        ctx.save();

        // 1. Render Server Racks (Background architectural detail)
        this.renderServerRacks(ctx);

        // 2. Render Main Application Conduits
        this.conduits.forEach(c => {
            ctx.save();
            ctx.strokeStyle = c.color;
            ctx.lineWidth = c.width;
            ctx.shadowColor = c.glowColor;
            ctx.shadowBlur = 14;

            ctx.beginPath();
            ctx.moveTo(c.x1, c.y1);
            ctx.lineTo(c.x2, c.y2);
            ctx.stroke();

            // Inner high-throughput data core line
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;
            ctx.shadowBlur = 4;
            ctx.beginPath();
            ctx.moveTo(c.x1, c.y1);
            ctx.lineTo(c.x2, c.y2);
            ctx.stroke();

            // Animated packet pulses flowing east along application conduits
            const pulseOffset = (this.animTimer * 160) % (c.x2 - c.x1);
            ctx.fillStyle = '#00ffcc';
            ctx.beginPath();
            ctx.arc(c.x1 + pulseOffset, c.y1, 5, 0, Math.PI * 2);
            ctx.fill();

            // Label conduit protocol
            ctx.fillStyle = c.color;
            ctx.font = 'bold 9px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.shadowBlur = 2;
            ctx.fillText(c.protocol, (c.x1 + c.x2) / 2, c.y1 - c.width / 2 - 8);
            ctx.restore();
        });

        // 3. Render Web Bastion Forcefield Barrier (Active until minigame solved)
        if (!this.isWebTerminalCleared) {
            ctx.save();
            const gateX = 745;
            const gateY1 = 260;
            const gateY2 = 460;
            const pulse = (Math.sin(this.animTimer * 6) + 1) * 0.5;

            ctx.strokeStyle = `rgba(153, 0, 255, ${0.5 + pulse * 0.5})`;
            ctx.lineWidth = 8;
            ctx.shadowColor = '#9900ff';
            ctx.shadowBlur = 18;

            ctx.beginPath();
            ctx.moveTo(gateX, gateY1);
            ctx.lineTo(gateX, gateY2);
            ctx.stroke();

            // Diagonal laser warning stripes
            ctx.strokeStyle = 'rgba(255, 0, 85, 0.7)';
            ctx.lineWidth = 2;
            for (let y = gateY1; y <= gateY2; y += 18) {
                ctx.beginPath();
                ctx.moveTo(gateX - 10, y - 6);
                ctx.lineTo(gateX + 10, y + 6);
                ctx.stroke();
            }

            ctx.fillStyle = '#ff77aa';
            ctx.font = 'bold 9px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText('HTTP/DNS BARRIER [SOLVE CONSOLE]', gateX, gateY1 - 12);
            ctx.restore();
        }

        // 4. Render Web Infiltration Console Node (at X: 700, Y: 360)
        this.renderWebTerminalNode(ctx);

        // 5. Render Mail Relay Stations (UA, MTA, MAA)
        this.renderMailSanctum(ctx);

        // 6. Render Dual-Port FTP Conduit Stations (Port 21 vs 20)
        this.renderFTPConduit(ctx);

        // 6.5 Render Central SNMP & ASN.1 Compiler Console Node (at X: 1950, Y: 360)
        this.renderSNMPTerminalNode(ctx);

        // 7. Render Gateway to Titan Core Master Boss (at X: 2200, Y: 360)
        this.renderMasterGateway(ctx);

        ctx.restore();
    }

    renderSNMPTerminalNode(ctx) {
        const node = this.snmpTerminalNode;
        ctx.save();
        const pulse = (Math.sin(this.animTimer * 4.5) + 1) * 0.5;
        const col = this.isSnmpCleared ? '#00ff88' : '#00ffcc';

        ctx.fillStyle = 'rgba(6, 16, 36, 0.96)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = col;
        ctx.lineWidth = 2.5 + pulse * 1.5;
        ctx.shadowColor = col;
        ctx.shadowBlur = 14;
        ctx.stroke();

        ctx.fillStyle = col;
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('SNMP/ASN.1', node.x, node.y - 4);
        ctx.font = 'bold 8px "Fira Code", monospace';
        ctx.fillText(this.isSnmpCleared ? 'OVERRIDE ON' : '[E] MIB-2/IDE', node.x, node.y + 9);

        ctx.restore();
    }

    renderServerRacks(ctx) {
        this.serverRacks.forEach((rack, idx) => {
            ctx.save();
            // Server rack enclosure
            ctx.fillStyle = 'rgba(10, 16, 36, 0.88)';
            ctx.fillRect(rack.x, rack.y, rack.w, rack.h);
            ctx.strokeStyle = '#9900ff';
            ctx.lineWidth = 1.5;
            ctx.shadowColor = 'rgba(153, 0, 255, 0.4)';
            ctx.shadowBlur = 8;
            ctx.strokeRect(rack.x, rack.y, rack.w, rack.h);

            // Server rack horizontal unit slots
            ctx.strokeStyle = 'rgba(192, 132, 252, 0.25)';
            ctx.lineWidth = 1;
            for (let y = rack.y + 16; y < rack.y + rack.h - 10; y += 14) {
                ctx.beginPath();
                ctx.moveTo(rack.x + 4, y);
                ctx.lineTo(rack.x + rack.w - 4, y);
                ctx.stroke();
            }

            // Blinking status LEDs
            rack.lights.forEach((col, lIdx) => {
                const blink = Math.sin(this.animTimer * 4 + idx + lIdx) > 0;
                ctx.fillStyle = blink ? col : 'rgba(40, 50, 70, 0.6)';
                ctx.beginPath();
                ctx.arc(rack.x + 12 + lIdx * 14, rack.y + rack.h - 8, 3, 0, Math.PI * 2);
                ctx.fill();
            });

            // Rack Label
            ctx.fillStyle = '#c084fc';
            ctx.font = 'bold 8px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.shadowBlur = 0;
            ctx.fillText(rack.label, rack.x + rack.w / 2, rack.y + 11);
            ctx.restore();
        });
    }

    renderWebTerminalNode(ctx) {
        const node = this.webTerminalNode;
        ctx.save();

        const pulse = (Math.sin(this.animTimer * 4) + 1) * 0.5;
        const col = this.isWebTerminalCleared ? '#00ff88' : '#9900ff';

        ctx.fillStyle = 'rgba(8, 16, 42, 0.95)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = col;
        ctx.lineWidth = 2.5 + pulse * 1.5;
        ctx.shadowColor = col;
        ctx.shadowBlur = 14;
        ctx.stroke();

        // Terminal icon
        ctx.fillStyle = col;
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('DNS/HTTP', node.x, node.y - 4);
        ctx.font = 'bold 8px "Fira Code", monospace';
        ctx.fillText(this.isWebTerminalCleared ? 'CLEARED' : '[E] CONSOLE', node.x, node.y + 9);

        // Halo
        ctx.strokeStyle = `rgba(153, 0, 255, ${0.2 + pulse * 0.3})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 12 + pulse * 6, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
    }

    renderMailSanctum(ctx) {
        // Mail Stations
        this.mailStations.forEach(st => {
            ctx.save();
            ctx.fillStyle = 'rgba(12, 18, 44, 0.9)';
            ctx.beginPath();
            ctx.arc(st.x, st.y, st.radius, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = st.color;
            ctx.lineWidth = 2;
            ctx.shadowColor = st.color;
            ctx.shadowBlur = 8;
            ctx.stroke();

            ctx.fillStyle = st.color;
            ctx.font = 'bold 8px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(st.name.split(' ')[0], st.x, st.y - 3);
            ctx.fillText(st.name.split(' ')[1] || '', st.x, st.y + 8);
            ctx.restore();
        });

        // Connector lines between UA -> MTA -> MAA
        ctx.save();
        ctx.strokeStyle = 'rgba(192, 132, 252, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);

        ctx.beginPath();
        ctx.moveTo(this.mailStations[0].x, this.mailStations[0].y);
        ctx.lineTo(this.mailStations[1].x, this.mailStations[1].y);
        ctx.lineTo(this.mailStations[2].x, this.mailStations[2].y);
        ctx.stroke();
        ctx.restore();
    }

    renderFTPConduit(ctx) {
        this.ftpStations.forEach(st => {
            ctx.save();
            ctx.fillStyle = 'rgba(8, 20, 36, 0.92)';
            ctx.beginPath();
            ctx.arc(st.x, st.y, st.radius, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = st.color;
            ctx.lineWidth = 2;
            ctx.shadowColor = st.color;
            ctx.shadowBlur = 8;
            ctx.stroke();

            ctx.fillStyle = st.color;
            ctx.font = 'bold 8px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(st.name.split(':')[0], st.x, st.y - 2);
            ctx.fillText(st.name.split(':')[1] ? st.name.split(':')[1].trim() : '', st.x, st.y + 9);
            ctx.restore();
        });

        // Dual lines connecting Port 21 Control and Port 20 Data
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 255, 204, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(this.ftpStations[0].x, this.ftpStations[0].y);
        ctx.lineTo(this.ftpStations[1].x, this.ftpStations[1].y);
        ctx.stroke();
        ctx.restore();
    }

    renderMasterGateway(ctx) {
        const gw = this.masterGateway;
        ctx.save();

        const pulse = (Math.sin(this.animTimer * 5) + 1) * 0.5;
        const isUnlocked = gw.isUnlocked || this.isWebTerminalCleared;
        const col = isUnlocked ? '#00ff88' : '#ff0055';

        // Gateway pillars
        ctx.fillStyle = 'rgba(10, 16, 40, 0.96)';
        ctx.fillRect(gw.x - gw.width / 2, gw.y - gw.height / 2, gw.width, gw.height);

        ctx.strokeStyle = col;
        ctx.lineWidth = 2.5 + pulse * 1.5;
        ctx.shadowColor = col;
        ctx.shadowBlur = 16;
        ctx.strokeRect(gw.x - gw.width / 2, gw.y - gw.height / 2, gw.width, gw.height);

        // Portal laser field
        ctx.fillStyle = isUnlocked ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 0, 85, 0.18)';
        ctx.fillRect(gw.x - gw.width / 2 + 4, gw.y - gw.height / 2 + 4, gw.width - 8, gw.height - 8);

        ctx.fillStyle = col;
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 3;
        ctx.fillText(isUnlocked ? 'GATEWAY UNLOCKED' : 'TITAN-CORE LOCKED', gw.x, gw.y - gw.height / 2 - 12);
        ctx.font = 'bold 8px "Fira Code", monospace';
        ctx.fillText(isUnlocked ? 'ASCEND TO APEX [E]' : 'CLEAR SECTOR 4 TASKS', gw.x, gw.y + gw.height / 2 + 16);

        ctx.restore();
    }

    // ======================================================================
    // Render Application Layer HUD Telemetry
    // ======================================================================
    renderHUD(ctx) {
        ctx.save();
        const screenW = 1280;
        const hudX = 140;
        const hudY = 72;
        const hudW = screenW - 280;
        const hudH = 34;

        ctx.fillStyle = 'rgba(14, 6, 32, 0.92)';
        ctx.fillRect(hudX, hudY, hudW, hudH);
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = 'rgba(192, 132, 252, 0.4)';
        ctx.shadowBlur = 6;
        ctx.strokeRect(hudX, hudY, hudW, hudH);

        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(this.activeInfoBanner, screenW / 2, hudY + 21);

        ctx.restore();
    }
}

// Global Export
const sector4Instance = new Sector4_Application();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.Sector4_Application = sector4Instance;
    window.Sector4_Application = sector4Instance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Sector4_Application, sector4: sector4Instance };
}
