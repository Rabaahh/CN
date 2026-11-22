// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// WorldInspector.js - Hover-to-Reveal System & Step-by-Step Mission Guidance
// Provides clean, clutter-free graphics with rich on-demand educational tooltips
// ==========================================================================

class WorldInspector {
    constructor() {
        this.isGuidanceVisible = true;
        this.isInspectCardVisible = true;
        this.lastCloseBtnRect = null;
        this.lastGuidanceCloseRect = null;
        this.hoveredObject = null;
        this.lastNearbyObject = null;
        this.guidanceStep = 1;

        // Sector Objects Knowledge Base for Universal Hover & Proximity Inspection
        this.sectorObjects = {
            1: [ // SECTOR 1: PHYSICAL LAYER (MODULE 4)
                {
                    id: 'repeater_alpha',
                    name: '🔬 REGENERATIVE REPEATER ALPHA',
                    category: 'PHYSICAL LAYER // SIGNAL REGENERATION',
                    x: 560, y: 360, radius: 60,
                    concept: 'Amplifies and reshapes incoming attenuated digital signals. Removes accumulated noise to prevent bit error rate (BER) spikes.',
                    action: 'Step inside to restore datagram integrity and buffer!'
                },
                {
                    id: 'repeater_beta',
                    name: '🔬 REGENERATIVE REPEATER BETA',
                    category: 'PHYSICAL LAYER // SIGNAL REGENERATION',
                    x: 1120, y: 360, radius: 60,
                    concept: 'Signal Repeater: Extends network reach beyond maximum copper attenuation distance limits.',
                    action: 'Step inside to clean your signal before testing labs.'
                },
                {
                    id: 'copper_route',
                    name: '⚡ COPPER UTP CABLE (UPPER ROUTE)',
                    category: 'GUIDED TRANSMISSION MEDIA // TWISTED PAIR',
                    x: 840, y: 180, radius: 100,
                    concept: 'Inexpensive copper wire transmitting electrical voltages. Highly susceptible to Electromagnetic Interference (EMI) and thermal noise.',
                    action: 'Warning: Active noise sparks can corrupt passing bits!'
                },
                {
                    id: 'fiber_route',
                    name: '✦ OPTICAL FIBER CONDUIT (LOWER ROUTE)',
                    category: 'GUIDED TRANSMISSION MEDIA // FIBER OPTICS',
                    x: 840, y: 530, radius: 100,
                    concept: 'Transmits light pulses using Total Internal Reflection (sin θc = n2 / n1). 100% immune to EMI noise with massive bandwidth.',
                    action: 'Safe path: Walk through here for a 100% noise-free bypass!'
                },
                {
                    id: 'attenuation_zone',
                    name: '🌫️ ATTENUATION & THERMAL NOISE FOG',
                    category: 'TRANSMISSION IMPAIRMENTS // ATTENUATION',
                    x: 300, y: 360, radius: 150,
                    concept: 'Signal power loss over distance (A = 10 log10(P1/P2) dB) caused by physical resistance of the transmission medium.',
                    action: 'Keep moving right to reach Repeater Alpha before signal fades!'
                },
                {
                    id: 'oscilloscope_terminal',
                    name: '📊 LINE CODING OSCILLOSCOPE TERMINAL',
                    category: 'DIGITAL TRANSMISSION // LINE CODING',
                    x: 1380, y: 360, radius: 75,
                    concept: 'Converts digital bitstreams into voltage waveforms: NRZ-L (level), NRZ-I (inversion on 1), and Manchester (mid-bit clock transition).',
                    action: 'Press [E] to draw Line Coding waveforms for +3 Exam Marks!'
                },
                {
                    id: 'modulation_console',
                    name: '📡 CARRIER MODULATION CONSOLE',
                    category: 'ANALOG TRANSMISSION // CARRIER MODULATION',
                    x: 1600, y: 360, radius: 75,
                    concept: 'Encodes digital bits onto analog sine carrier waves via Amplitude (ASK), Frequency (FSK), or Phase (PSK / BPSK).',
                    action: 'Press [E] to calibrate carrier signals for +5 Exam Marks!'
                },
                {
                    id: 'sector2_elevator',
                    name: '🚀 SECTOR 2 TRANSIT ELEVATOR',
                    category: 'LAYER TRANSITION // GATEWAY TO DATA LINK',
                    x: 1780, y: 360, radius: 75,
                    concept: 'Ascends from the Physical Layer (raw bitstream) to the Data Link Layer (framed packets).',
                    action: 'Press [E] to ascend to Sector 2: The Frame Matrix!'
                }
            ],
            2: [ // SECTOR 2: DATA LINK LAYER (MODULE 3)
                {
                    id: 'thicknet_bus',
                    name: '🔌 10Base5 THICKNET BUS CONDUIT',
                    category: 'STANDARD ETHERNET // 10Base5',
                    x: 400, y: 290, radius: 120,
                    concept: '10 Mbps baseband coaxial cable up to 500 meters. Connected via piercing vampire taps.',
                    action: 'Walk along the thick coaxial bus.'
                },
                {
                    id: 'thinnet_bus',
                    name: '🔌 10Base2 THINNET BUS CONDUIT',
                    category: 'STANDARD ETHERNET // 10Base2',
                    x: 1040, y: 290, radius: 120,
                    concept: '10 Mbps thinner coaxial cable up to 185 meters. Connected using BNC-T connectors.',
                    action: 'Follow the conduit to the red stealth corridor.'
                },
                {
                    id: 'bit_stuffing',
                    name: '🚨 BIT STUFFING RED CORRIDOR',
                    category: 'DATA LINK FRAMING // DELIMITER EVASION',
                    x: 750, y: 360, radius: 100,
                    concept: 'HDLC flag is 01111110. Transmitter stuffs a 0-bit after five consecutive 1s to prevent false frame delimiter triggers.',
                    action: 'Walk through and rhythmically press Space to inject zero-bits!'
                },
                {
                    id: 'switch_node',
                    name: '🔀 CENTINEL-802 TRANSPARENT SWITCH',
                    category: 'DATA LINK SWITCHING // MAC LEARNING',
                    x: 1500, y: 360, radius: 80,
                    concept: 'Transparent bridge that dynamically populates its MAC forwarding table via source address learning, filtering, and flooding.',
                    action: 'Press [E] to solve the Switch Learning Table for +9 Exam Marks!'
                },
                {
                    id: 'sector3_gateway',
                    name: '🚪 SECTOR 3 ROUTING GATEWAY',
                    category: 'LAYER TRANSITION // GATEWAY TO NETWORK LAYER',
                    x: 1850, y: 360, radius: 75,
                    concept: 'Gateway connecting Layer 2 frame switching to Layer 3 packet routing.',
                    action: 'Press [E] to enter Sector 3: The Routing Core!'
                }
            ],
            3: [ // SECTOR 3: NETWORK LAYER (MODULE 2)
                {
                    id: 'cidr_stepping_tiles',
                    name: '🌐 CIDR /26 SUBNET STEPPING TILES',
                    category: 'NETWORK LAYER // IPv4 CIDR SUBNETTING',
                    x: 450, y: 360, radius: 120,
                    concept: 'Block 192.168.10.64/26: Mask is 255.255.255.192. Usable host IP range is .65 to .126. (.64 is Network ID, .127 is Directed Broadcast).',
                    action: 'Step only on safe green host tiles (.65 to .126)!'
                },
                {
                    id: 'mtu_fragmentation',
                    name: '📦 1500B MTU FRAGMENTATION BOTTLENECK',
                    category: 'NETWORK LAYER // IPv4 FRAGMENTATION',
                    x: 950, y: 360, radius: 80,
                    concept: 'Narrow router link constraint: Splits 4000B datagram into 1500B fragments with 8-byte offsets (0, 185, 370) and MF flags.',
                    action: 'Press [E] to solve MTU Datagram Fragmentation for +3 Exam Marks!'
                },
                {
                    id: 'dijkstra_radar',
                    name: '📡 DIJKSTRA LINK-STATE TACTICAL RADAR',
                    category: 'ROUTING ALGORITHMS // SHORTEST PATH',
                    x: 1400, y: 360, radius: 80,
                    concept: 'Computes least-cost paths from source to all destinations via permanent set N\' relaxation (D(w) = min(D(w), D(u) + c(u,w))).',
                    action: 'Press [E] to plot the shortest route around patrol daemons for +6 Exam Marks!'
                },
                {
                    id: 'boss_ospf',
                    name: '🐉 ROUTING LEVIATHAN: CORE-OSPF-PRIME',
                    category: 'TRANSPORT LAYER // TCP HANDSHAKE & SEQUENCES',
                    x: 1800, y: 360, radius: 120,
                    concept: 'Guards the transport core: Tests TCP 3-way handshake, sliding window flow control, and cumulative ACK tracing (1000..1550).',
                    action: 'Fight the boss and solve the Sequence Number challenge for +9 Exam Marks!'
                }
            ],
            4: [ // SECTOR 4: APPLICATION LAYER (MODULE 1)
                {
                    id: 'dns_tower',
                    name: '🗼 DNS RESOLUTION HIERARCHY TOWER',
                    category: 'APPLICATION LAYER // DNS & HTTP PIPELINE',
                    x: 400, y: 360, radius: 85,
                    concept: 'Hierarchical name resolution: Local Resolver -> Root Server -> TLD (.corp) -> Authoritative Server -> Type A IP record.',
                    action: 'Press [E] to trace the 5-hop website lookup for +4 Exam Marks!'
                },
                {
                    id: 'p2p_camp',
                    name: '⛺ BITTORRENT P2P REBEL CAMP',
                    category: 'DISTRIBUTED SYSTEMS // PEER-TO-PEER',
                    x: 950, y: 360, radius: 110,
                    concept: 'Decentralized file distribution: Rarest-First chunk selection multiplies seeders; Tit-for-Tat algorithm rewards fast uploaders.',
                    action: 'Press [E] to exchange file pieces with Seeder Prime for +5 Exam Marks!'
                },
                {
                    id: 'snmp_console',
                    name: '💻 SNMP MIB MANAGEMENT CONSOLE & ASN.1 IDE',
                    category: 'NETWORK MANAGEMENT // SNMPv1/v2c & ASN.1',
                    x: 1500, y: 360, radius: 85,
                    concept: 'Traverses MIB-2 OID tree (1.3.6.1.2.1), scalar instance (.0) indexing, and debugs ASN.1 SMI type declarations.',
                    action: 'Press [E] to compile ASN.1 code and override Titan-Core for +6 Exam Marks!'
                }
            ]
        };
    }

    // ----------------------------------------------------------------------
    // Universal Object Detection (Hover or Proximity)
    // ----------------------------------------------------------------------
    inspectAt(sectorId, mouseWorldX, mouseWorldY, playerX, playerY) {
        const objects = this.sectorObjects[sectorId] || [];

        // 1. Check mouse hover first (precise cursor inspection)
        for (const obj of objects) {
            const dx = mouseWorldX - obj.x;
            const dy = mouseWorldY - obj.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist <= obj.radius) {
                this.hoveredObject = obj;
                return obj;
            }
        }

        // 2. Fallback to player proximity (standing near object)
        for (const obj of objects) {
            const dx = playerX - obj.x;
            const dy = playerY - obj.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist <= obj.radius + 30) {
                this.hoveredObject = obj;
                return obj;
            }
        }

        this.hoveredObject = null;
        return null;
    }

    // ----------------------------------------------------------------------
    // Step-by-Step Guidance Generator (Plain English for Exam Success)
    // ----------------------------------------------------------------------
    getStepGuidance(sectorId, playerX, playerY, worldRef) {
        if (sectorId === 1) { // Sector 1: Physical Layer
            if (playerX < 450) {
                return {
                    step: 'STEP 1 OF 6: WALK RIGHT // ATTENUATION',
                    text: 'Use [WASD] or [Arrow Keys] to move right. Notice your signal strength (Integrity) fading as you travel along the physical wire.',
                    hint: 'Physical Layer: Resistance causes signal attenuation over distance.'
                };
            } else if (playerX >= 450 && playerX < 640) {
                return {
                    step: 'STEP 2 OF 6: REGENERATE SIGNAL',
                    text: 'Step onto REPEATER ALPHA (the glowing cyan hex node). It will clean up and amplify your signal back to 100%!',
                    hint: 'Repeaters decode noisy signals and retransmit clean square pulses.'
                };
            } else if (playerX >= 640 && playerX < 1050) {
                return {
                    step: 'STEP 3 OF 6: CHOOSE YOUR PATH',
                    text: 'Go UP through Copper UTP wire (dodge electrical sparks) OR go DOWN through Optical Fiber (100% immune to noise)!',
                    hint: 'Copper conducts electricity (EMI hazard). Fiber transmits light via TIR (noise immune).'
                };
            } else if (playerX >= 1050 && playerX < 1250) {
                return {
                    step: 'STEP 4 OF 6: REPEATER BETA',
                    text: 'Step onto REPEATER BETA to clean your signal before entering the testing labs.',
                    hint: 'Repeaters extend network reach across physical layer distances.'
                };
            } else if (playerX >= 1250 && playerX < 1480) {
                const isCleared = worldRef && worldRef.isOscilloscopeCleared;
                return {
                    step: 'STEP 5 OF 6: OSCILLOSCOPE TERMINAL',
                    text: isCleared ? '✓ Oscilloscope Cleared (+3 Marks)! Walk right to the Carrier Modulation Console.' : 'Walk up to the OSCILLOSCOPE (green terminal) and press [E] to draw Line Coding waveforms for +3 Exam Marks!',
                    hint: 'Master NRZ-L, NRZ-I, and Manchester waveforms.'
                };
            } else if (playerX >= 1480 && playerX < 1700) {
                const isCleared = worldRef && worldRef.isModulationCleared;
                return {
                    step: 'STEP 6 OF 6: MODULATION CONSOLE',
                    text: isCleared ? '✓ Modulation Cleared (+5 Marks)! Walk right into the Elevator.' : 'Walk up to the MODULATION CONSOLE (purple diamond) and press [E] to solve Carrier Modulation for +5 Exam Marks!',
                    hint: 'Amplitude (ASK), Frequency (FSK), and Phase (PSK).'
                };
            } else {
                return {
                    step: 'SECTOR 1 COMPLETE: ASCEND TO SECTOR 2',
                    text: 'Step into the TRANSIT ELEVATOR on the far right and press [E] to ascend to Sector 2: The Data Link Layer!',
                    hint: 'Ascending from Layer 1 (bits) to Layer 2 (frames).'
                };
            }
        } else if (sectorId === 2) { // Sector 2: Data Link Layer
            if (playerX < 600) {
                return {
                    step: 'STEP 1 OF 4: STANDARD ETHERNET CONDUITS',
                    text: 'Follow the 10Base5 Thicknet and 10Base2 Thinnet coaxial conduits to the right.',
                    hint: 'Thicknet uses vampire taps (500m). Thinnet uses BNC-T (185m).'
                };
            } else if (playerX >= 600 && playerX < 1100) {
                return {
                    step: 'STEP 2 OF 4: BIT STUFFING RED CORRIDOR',
                    text: 'Walk through the RED CORRIDOR. Inject a 0-bit after five consecutive 1s to evade frame delimiter alarms!',
                    hint: 'Flag 01111110 delimiter evasion.'
                };
            } else if (playerX >= 1100 && playerX < 1650) {
                return {
                    step: 'STEP 3 OF 4: ETHERNET SWITCH LEARNING',
                    text: 'Approach CENTINEL-802 and press [E] to configure the Ethernet Switch MAC address table (+9 Marks)!',
                    hint: 'Source MAC learning, filtering, and flooding.'
                };
            } else {
                return {
                    step: 'SECTOR 2 COMPLETE: ROUTING GATEWAY',
                    text: 'Walk into the SECTOR 3 GATEWAY and press [E] to enter the Routing Core!',
                    hint: 'Ascending to Layer 3 (Network Layer).'
                };
            }
        } else if (sectorId === 3) { // Sector 3: Network Layer
            if (playerX < 700) {
                return {
                    step: 'STEP 1 OF 4: CIDR /26 SUBNET TILES',
                    text: 'Step only on safe green host tiles (.65 to .126). Avoid .64 (Network ID) and .127 (Broadcast)!',
                    hint: 'Subnet mask 255.255.255.192 gives 62 usable host addresses.'
                };
            } else if (playerX >= 700 && playerX < 1150) {
                return {
                    step: 'STEP 2 OF 4: MTU FRAGMENTATION',
                    text: 'Approach the MTU BOTTLENECK and press [E] to split the 4000B packet into 1500B pieces (+3 Marks)!',
                    hint: '8-byte fragment offsets (0, 185, 370) and MF flags.'
                };
            } else if (playerX >= 1150 && playerX < 1600) {
                return {
                    step: 'STEP 3 OF 4: DIJKSTRA SHORTEST PATH',
                    text: 'Approach the DIJKSTRA RADAR and press [E] to calculate the least-cost path across routers (+6 Marks)!',
                    hint: 'Link-state algorithm populating permanent set N\'.'
                };
            } else {
                return {
                    step: 'STEP 4 OF 4: ROUTING LEVIATHAN BOSS',
                    text: 'Confront CORE-OSPF-PRIME! Defeat its shields and solve the TCP Sequence Number challenge (+9 Marks)!',
                    hint: 'Byte ranges (1000..1550) and cumulative ACKs.'
                };
            }
        } else if (sectorId === 4) { // Sector 4: Application Layer
            if (playerX < 650) {
                return {
                    step: 'STEP 1 OF 3: DNS 5-HOP RESOLUTION',
                    text: 'Approach the DNS TOWER and press [E] to trace the 5-hop website lookup pipeline (+4 Marks)!',
                    hint: 'Browser -> Local DNS -> Root -> TLD -> Authoritative.'
                };
            } else if (playerX >= 650 && playerX < 1250) {
                return {
                    step: 'STEP 2 OF 3: BITTORRENT REBEL CAMP',
                    text: 'Enter the P2P SWARM CAMP and press [E] to solve the Rarest-First piece exchange (+5 Marks)!',
                    hint: 'Rarest-first piece selection and tit-for-tat unchoking.'
                };
            } else {
                return {
                    step: 'STEP 3 OF 3: SNMP & ASN.1 COMPILER',
                    text: 'Approach the SNMP CONSOLE and press [E] to debug ASN.1 syntax and override Titan-Core (+6 Marks)!',
                    hint: 'MIB-2 tree (1.3.6.1.2.1), .0 scalar suffix, and uppercase types.'
                };
            }
        }

        return {
            step: 'MISSION IN PROGRESS',
            text: 'Explore the sector, interact with terminals using [E], and collect all 60 exam marks!',
            hint: 'Press [C] for the Codex or [X] for the 60M Mock Exam.'
        };
    }

    toggleInspectCard(force) {
        this.isInspectCardVisible = (force !== undefined) ? force : !this.isInspectCardVisible;
        if (!this.isInspectCardVisible) {
            this.lastCloseBtnRect = null;
        }
        return this.isInspectCardVisible;
    }

    checkCloseClick(screenX, screenY) {
        if (!this.isInspectCardVisible || !this.lastCloseBtnRect) return false;
        const r = this.lastCloseBtnRect;
        if (screenX >= r.x && screenX <= r.x + r.w && screenY >= r.y && screenY <= r.y + r.h) {
            this.isInspectCardVisible = false;
            this.lastCloseBtnRect = null;
            return true;
        }
        return false;
    }

    toggleGuidance(force) {
        this.isGuidanceVisible = (force !== undefined) ? force : !this.isGuidanceVisible;
        if (!this.isGuidanceVisible) {
            this.lastGuidanceCloseRect = null;
        }
        return this.isGuidanceVisible;
    }

    checkGuidanceCloseClick(screenX, screenY) {
        if (!this.isGuidanceVisible || !this.lastGuidanceCloseRect) return false;
        const r = this.lastGuidanceCloseRect;
        if (screenX >= r.x && screenX <= r.x + r.w && screenY >= r.y && screenY <= r.y + r.h) {
            this.isGuidanceVisible = false;
            this.lastGuidanceCloseRect = null;
            return true;
        }
        return false;
    }

    // ----------------------------------------------------------------------
    // Main HUD Render Pipeline
    // ----------------------------------------------------------------------
    render(ctx, screenWidth, screenHeight, mouseWorldX, mouseWorldY, playerX, playerY, sectorId, worldRef) {
        // 1. Render Top Step-by-Step Guidance Box
        if (this.isGuidanceVisible) {
            const guide = this.getStepGuidance(sectorId, playerX, playerY, worldRef);
            this.renderGuidanceBox(ctx, screenWidth, guide);
        } else {
            this.lastGuidanceCloseRect = null;
        }

        // 2. Render Holographic Inspect Card on Hover or Proximity
        if (this.isInspectCardVisible) {
            const inspected = this.inspectAt(sectorId, mouseWorldX, mouseWorldY, playerX, playerY);
            if (inspected) {
                this.renderInspectCard(ctx, screenWidth, screenHeight, inspected);
            } else {
                this.lastCloseBtnRect = null;
            }
        } else {
            this.lastCloseBtnRect = null;
        }
    }

    // ----------------------------------------------------------------------
    // Render Step-by-Step Guidance Box (Top Center)
    // Clean, modern, highly legible educational instruction bar
    // ----------------------------------------------------------------------
    renderGuidanceBox(ctx, screenWidth, guide) {
        ctx.save();

        const boxW = Math.min(920, screenWidth - 40);
        const boxH = 58;
        const boxX = (screenWidth - boxW) / 2;
        const boxY = 10;
        const FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

        // Clean Modern Dark Glass Panel
        ctx.fillStyle = 'rgba(11, 18, 34, 0.96)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.6;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.35)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(boxX, boxY, boxW, boxH, 8);
        } else {
            ctx.rect(boxX, boxY, boxW, boxH);
        }
        ctx.fill();
        ctx.stroke();

        ctx.shadowBlur = 0;

        // Step Header Badge (Amber / Gold, Bold Clean Sans-serif)
        ctx.fillStyle = '#fbbf24';
        ctx.font = `bold 13px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(`📍 ${guide.step}`, boxX + 16, boxY + 10);

        // Interactive Close / Hide Button for Top Guidance Box [✕ HIDE (U)]
        const closeGuidanceW = 86;
        const closeGuidanceH = 22;
        const closeGuidanceX = boxX + boxW - closeGuidanceW - 12;
        const closeGuidanceY = boxY + 8;
        this.lastGuidanceCloseRect = { x: closeGuidanceX, y: closeGuidanceY, w: closeGuidanceW, h: closeGuidanceH };

        ctx.fillStyle = 'rgba(239, 68, 68, 0.18)';
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(closeGuidanceX, closeGuidanceY, closeGuidanceW, closeGuidanceH, 4);
        } else {
            ctx.rect(closeGuidanceX, closeGuidanceY, closeGuidanceW, closeGuidanceH);
        }
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#fca5a5';
        ctx.font = `bold 11px ${FONT_SANS}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('✕ HIDE [U]', closeGuidanceX + closeGuidanceW / 2, closeGuidanceY + closeGuidanceH / 2);

        // Academic Concept Tag (Positioned to the left of Close Button)
        if (guide.hint) {
            ctx.font = `600 12px ${FONT_SANS}`;
            const hintText = `💡 ${guide.hint}`;
            const textW = ctx.measureText ? ctx.measureText(hintText).width : hintText.length * 7;
            const pillW = textW + 16;
            const pillH = 22;
            const pillX = closeGuidanceX - pillW - 10;
            const pillY = boxY + 8;

            ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(pillX, pillY, pillW, pillH, 4);
            } else {
                ctx.rect(pillX, pillY, pillW, pillH);
            }
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#38bdf8';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(hintText, pillX + pillW / 2, pillY + pillH / 2);
        }

        // Main Plain-English Action Instruction (Clean Crisp White, Larger Size)
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold 14px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(guide.text, boxX + 16, boxY + 33);

        ctx.restore();
    }

    // ----------------------------------------------------------------------
    // Render Proximity & Hover Inspect Card (Bottom Right)
    // Clean, large, comfortable reading card for surrounding network objects
    // ----------------------------------------------------------------------
    renderInspectCard(ctx, screenWidth, screenHeight, obj) {
        ctx.save();

        const cardW = 460;
        const cardH = 132;
        const cardX = screenWidth - cardW - 20;
        const cardY = screenHeight - cardH - 22;
        const FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

        // Sleek Modern Card Frame (Slate-Navy Glass with Soft Glow)
        ctx.fillStyle = 'rgba(11, 20, 38, 0.97)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.6;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.35)';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(cardX, cardY, cardW, cardH, 8);
        } else {
            ctx.rect(cardX, cardY, cardW, cardH);
        }
        ctx.fill();
        ctx.stroke();

        ctx.shadowBlur = 0;

        // Object Name / Title (Clean, Sharp, Cyan-Sky)
        ctx.fillStyle = '#38bdf8';
        ctx.font = `bold 15px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(obj.name, cardX + 16, cardY + 12);

        // Interactive Hide Button in Top Right of Card [✕ HIDE (H)]
        const closeBtnW = 86;
        const closeBtnH = 22;
        const closeBtnX = cardX + cardW - closeBtnW - 14;
        const closeBtnY = cardY + 10;
        this.lastCloseBtnRect = { x: closeBtnX, y: closeBtnY, w: closeBtnW, h: closeBtnH };

        ctx.fillStyle = 'rgba(239, 68, 68, 0.18)';
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(closeBtnX, closeBtnY, closeBtnW, closeBtnH, 4);
        } else {
            ctx.rect(closeBtnX, closeBtnY, closeBtnW, closeBtnH);
        }
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#fca5a5';
        ctx.font = `bold 11px ${FONT_SANS}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('✕ HIDE [H]', closeBtnX + closeBtnW / 2, closeBtnY + closeBtnH / 2);

        // Reset text alignment for subsequent elements
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        // Category Tag Badge
        ctx.font = `bold 11px ${FONT_SANS}`;
        const catW = ctx.measureText ? ctx.measureText(obj.category).width : obj.category.length * 7;
        const catBadgeW = catW + 12;
        const catBadgeH = 18;
        const catBadgeX = cardX + 16;
        const catBadgeY = cardY + 34;

        ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(catBadgeX, catBadgeY, catBadgeW, catBadgeH, 3);
        } else {
            ctx.rect(catBadgeX, catBadgeY, catBadgeW, catBadgeH);
        }
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#fbbf24';
        ctx.fillText(obj.category, catBadgeX + 6, catBadgeY + 3);

        // Academic Concept Description (Word-wrapped cleanly with proper measurement)
        ctx.fillStyle = '#e2e8f0';
        ctx.font = `13px ${FONT_SANS}`;
        const maxWidth = cardW - 32;
        const words = obj.concept.split(' ');
        let curLine = '';
        let lineY = cardY + 58;
        const lineHeight = 18;
        let lineCount = 0;

        for (let i = 0; i < words.length; i++) {
            const testLine = curLine ? (curLine + ' ' + words[i]) : words[i];
            const testWidth = ctx.measureText ? ctx.measureText(testLine).width : testLine.length * 7;
            if (testWidth > maxWidth && curLine) {
                ctx.fillText(curLine, cardX + 16, lineY);
                curLine = words[i];
                lineY += lineHeight;
                lineCount++;
                if (lineCount >= 2) break; // Keep to 2 lines max to leave room for action
            } else {
                curLine = testLine;
            }
        }
        if (curLine && lineCount < 2) {
            ctx.fillText(curLine, cardX + 16, lineY);
        }

        // Action Prompt (Clean Emerald Green Highlight with prominent icon)
        ctx.fillStyle = '#4ade80';
        ctx.font = `bold 13px ${FONT_SANS}`;
        ctx.fillText(`▶ ${obj.action}`, cardX + 16, cardY + 104);

        ctx.restore();
    }
}

// Module export
if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.WorldInspector = WorldInspector;
    window.WorldInspector = WorldInspector;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WorldInspector };
}
