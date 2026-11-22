// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// QuestManager.js - Active Quest Log, KTU Syllabus Tracker & Consequential Journal
// Narrative Systems & RPG Quest Progression Architecture
// ==========================================================================

const QuestStatus = Object.freeze({
    UNASSIGNED: 'UNASSIGNED',
    AVAILABLE: 'AVAILABLE',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED'
});

class QuestManager {
    constructor() {
        this.isOpen = false;
        this.activeTab = 'ALL'; // 'ALL', 'MAIN', 'TECHNICAL', 'JOURNAL'
        this.selectedQuestIndex = 0;
        this.scrollOffset = 0;

        // Sound effect helper
        this.audio = typeof window !== 'undefined' && window.CyberAudio ? window.CyberAudio : null;

        // Consequential Decisions Journal
        this.decisions = [];

        // Master Quest Database
        this.quests = [
            // --------------------------------------------------------------
            // MAIN INFILTRATION CAMPAIGN (Sectors 1 - 4)
            // --------------------------------------------------------------
            {
                id: 'QUEST_SECTOR1',
                category: 'MAIN',
                title: 'Physical Substratum Penetration',
                issuer: 'CORE PROTOCOL BEACON',
                sector: 1,
                module: 'Module 4: Physical Layer & Signal Transmission',
                status: QuestStatus.COMPLETED, // Breached in Prompts 6 & 7
                description: 'Ascend through raw bit conduits, calibrate signal repeaters through attenuation fog, solve the Line Coding Oscilloscope, and calculate channel capacity at the Shannon/Nyquist Gate.',
                objectives: [
                    { desc: 'Traverse 10Base-T twisted-pair and optical conduits', done: true },
                    { desc: 'Decode NRZ-L, NRZ-I, and Manchester waveforms (+3 Marks)', done: true },
                    { desc: 'Tune carrier modulation (ASK, FSK, PSK) (+3 Marks)', done: true },
                    { desc: 'Breach the Nyquist/Shannon Capacity Gate (+3 Marks)', done: true }
                ],
                reward: '9 Marks | Sector 2 Access Token | Line Coding Analyzer',
                examTopic: 'KTU Module 4: Nyquist Capacity C = 2B log2(L), Shannon Limit C = B log2(1+SNR), Manchester transitions.'
            },
            {
                id: 'QUEST_SECTOR2',
                category: 'MAIN',
                title: 'Data Link & Collision Domain Breach',
                issuer: 'ETHERNET BRIDGE DAEMON',
                sector: 2,
                module: 'Module 3: Data Link Layer & Media Access Control',
                status: QuestStatus.COMPLETED, // Breached in Prompts 8, 9, 10
                description: 'Survive CSMA/CD collision bus storms on shared 10Base5/10Base2 coax trunks, crack the CRC Modulo-2 Polynomial Laser Trap, slip through Bit-Stuffing stealth corridors, and populate the Transparent Switch MAC forwarding table.',
                objectives: [
                    { desc: 'Execute binary exponential backoff in collision storms (+3 Marks)', done: true },
                    { desc: 'Verify 64-byte minimum Ethernet frame constraint (Tfr >= 2*Tp)', done: true },
                    { desc: 'Calculate CRC modulo-2 XOR division for g(x) = x^3 + x^2 + 1 (+6 Marks)', done: true },
                    { desc: 'Inject 0-bit after five consecutive 1s in stealth corridor', done: true },
                    { desc: 'Populate Switch MAC Forwarding Table & defeat CENTINEL-802 (+9 Marks)', done: true }
                ],
                reward: '21 Marks | Sector 3 Routing Core Access | CRC Divisor Key',
                examTopic: 'KTU Module 3: CSMA/CD Slot Time = 2*Tp, CRC Polynomial Division, Bit Stuffing, Transparent Bridge Filtering/Forwarding.'
            },
            {
                id: 'QUEST_SECTOR3',
                category: 'MAIN',
                title: 'Routing Core & OSPF Nexus',
                issuer: 'AUTONOMOUS SYSTEM AS-65001',
                sector: 3,
                module: 'Module 2: Network Layer & Routing Protocols',
                status: QuestStatus.COMPLETED, // Breached in Prompts 11, 12, 13
                description: 'Fragment 4000-byte exfiltration datagrams through a narrow 1500-byte MTU bottleneck, calculate least-cost link-state paths across the KTU exam topology via Dijkstra, and defeat the grand Leviathan CORE-OSPF-PRIME by synchronizing TCP sequence and ACK numbers.',
                objectives: [
                    { desc: 'Fragment 4000B datagram: calculate Fragment Offsets (0, 185, 370) & MF flags (+3 Marks)', done: true },
                    { desc: 'Populate Dijkstra permanent set N\' and shortest path table (+6 Marks)', done: true },
                    { desc: 'Survive sliding window flow control attacks against CORE-OSPF-PRIME', done: true },
                    { desc: 'Calculate TCP Sequence & Cumulative ACK progression (+9 Marks)', done: true }
                ],
                reward: '18 Marks | Sector 4 Application Gateway Access | Dijkstra Least-Cost Forwarder',
                examTopic: 'KTU Module 2: IPv4 Fragmentation (Offset = DataBytes/8), Dijkstra Link-State, TCP 3-Way Handshake & Cumulative ACK calculation.'
            },
            {
                id: 'QUEST_SECTOR4',
                category: 'MAIN',
                title: 'Application Gateway & The Apex Nexus',
                issuer: 'RESISTANCE COMMAND',
                sector: 4,
                module: 'Module 1: Application Layer Protocols',
                status: QuestStatus.IN_PROGRESS,
                description: 'Infiltrate the 5-hop DNS resolution hierarchy and trigger authenticated HTTP requests, coordinate rarest-first piece sharing in the BitTorrent Swarm Camp, and recompile corrupted ASN.1 definitions in the Central Network Management Subsystem.',
                objectives: [
                    { desc: 'Resolve www.titan-core.corp via Root, TLD, and Authoritative DNS (+4 Marks)', done: true },
                    { desc: 'Assemble exploit payload in BitTorrent P2P camp via Rarest-First & Tit-for-Tat (+5 Marks)', done: true },
                    { desc: 'Query ISO OID tree 1.3.6.1.2.1 and fix ASN.1 syntax bugs in SNMP MIB (+6 Marks)', done: true },
                    { desc: 'Consult NPC allies and record consequential tactical decisions', done: false },
                    { desc: 'Breach TITAN-CORE: The OmniNet Apex Master Terminal', done: false }
                ],
                reward: '15 Marks | Root Kernel Shell Access | Perfect S-Grade Certification',
                examTopic: 'KTU Module 1: DNS Iterative vs Recursive Queries, HTTP/1.1 vs HTTP/2, P2P BitTorrent, SNMPv1/v2c & ASN.1 SMI Grammar.'
            },

            // --------------------------------------------------------------
            // SECONDARY TECHNICAL ALLY QUESTS
            // --------------------------------------------------------------
            {
                id: 'QUEST_ARP_SCOUT',
                category: 'TECHNICAL',
                title: 'Agent ARP: Link-Layer Address Resolution',
                issuer: 'AGENT ARP (The Link-Layer Scout)',
                sector: 2,
                module: 'Module 3: MAC vs IP Address Mapping',
                status: QuestStatus.AVAILABLE,
                description: 'Locate Agent ARP near the 10Base-T hub in Sector 2. Learn how link-layer nodes map logical 32-bit IP addresses to physical 48-bit MAC addresses, discover ARP broadcast queries vs unicast replies, and deploy Dynamic ARP Inspection (DAI) against poisoning attacks.',
                objectives: [
                    { desc: 'Find Agent ARP in Sector 2 (X: 1100, Y: 280)', done: false },
                    { desc: 'Explain broadcast ARP request (FF:FF:FF:FF:FF:FF) vs unicast reply', done: false },
                    { desc: 'Secure ARP cache tables against Gratuitous ARP spoofing using DAI', done: false }
                ],
                reward: '+3 Exam Marks | ARP Cache Resolver Tool | Anti-Poison Firewall Filter',
                examTopic: 'KTU Module 3: ARP protocol, Broadcast Request, Unicast Reply, Cache timeout, ARP Poisoning and Dynamic ARP Inspection (DAI).'
            },
            {
                id: 'QUEST_MOBILE_IP',
                category: 'TECHNICAL',
                title: 'Wanderer IP: The Roaming Care-of Address',
                issuer: 'WANDERER IP (The Mobile Node)',
                sector: 3,
                module: 'Module 2: Mobile IP Protocol & Tunneling',
                status: QuestStatus.AVAILABLE,
                description: 'Encounter Wanderer IP roaming along the CIDR Subnet Highway in Sector 3. Learn how mobile nodes roam across foreign subnets without losing active TCP connections using Home Agents (HA), Foreign Agents (FA), Care-of Addresses (COA), and IP-in-IP encapsulation tunneling.',
                objectives: [
                    { desc: 'Locate Wanderer IP in Sector 3 (X: 850, Y: 240)', done: false },
                    { desc: 'Trace Home Agent packet interception and IP-in-IP tunneling to COA', done: false },
                    { desc: 'Resolve the Triangle Routing bottleneck via Route Optimization binding caches', done: false }
                ],
                reward: '+3 Exam Marks | Mobile IP Tunneling Module | Triangle Route Bypass Key',
                examTopic: 'KTU Module 2: Mobile IP (RFC 5944), Home Agent (HA), Foreign Agent (FA), Home Address, Care-of Address (COA), IP-in-IP Encapsulation, Triangle Routing.'
            },
            {
                id: 'QUEST_SOCKET_DAEMON',
                category: 'TECHNICAL',
                title: 'The Berkeley Socket Lifecycle & Raw Driver Dilemma',
                issuer: 'THE BERKELEY SOCKET DAEMON',
                sector: 4,
                module: 'Module 2: Network Programming & POSIX Sockets',
                status: QuestStatus.AVAILABLE,
                description: 'Commune with the ancient UNIX daemon guarding the Web Bastion in Sector 4. Master the complete server socket lifecycle, compare select() vs poll() I/O multiplexing, and make a consequential choice between legacy SOCK_PACKET and modern PF_PACKET link-layer drivers.',
                objectives: [
                    { desc: 'Commune with the Berkeley Socket Daemon in Sector 4 (X: 450, Y: 260)', done: false },
                    { desc: 'Verify server socket ritual: socket() -> bind() -> listen() -> accept() -> read/write -> close()', done: false },
                    { desc: 'Analyze I/O multiplexing: select() (FD_SETSIZE 1024, O(N)) vs poll() (pollfd array)', done: false },
                    { desc: 'Resolve Dilemma: Choose Raw Socket Interface (SOCK_PACKET vs PF_PACKET)', done: false }
                ],
                reward: '+3 Exam Marks | RAW_PACKET_SCANNER Tool | Master Socket Descriptor',
                examTopic: 'KTU Module 2: Socket API (socket, bind, listen, accept), select() vs poll() with fd_set, PF_PACKET vs SOCK_PACKET link-layer capture.'
            },
            {
                id: 'QUEST_SEEDER_PRIME',
                category: 'TECHNICAL',
                title: 'BitTorrent Resistance: Transport Protocol Dilemma',
                issuer: 'SEEDER PRIME (Swarm Resistance Leader)',
                sector: 4,
                module: 'Module 2: Transport Protocols (TCP vs UDP)',
                status: QuestStatus.AVAILABLE,
                description: 'Meet Seeder Prime at the P2P Swarm Camp in Sector 4. Make a permanent consequential choice between UDP fast burst transmission and TCP reliable byte-stream transmission to send urgent resistance telemetry across noisy channels.',
                objectives: [
                    { desc: 'Meet Seeder Prime at Sector 4 P2P Camp (X: 1380, Y: 220)', done: false },
                    { desc: 'Evaluate Transport Dilemma: UDP (Speed Burst, Lossy) vs TCP (Reliable, Hunter Alert)', done: false },
                    { desc: 'Execute transmission protocol choice and witness lasting gameplay impacts', done: false }
                ],
                reward: '+20% Speed Boost (UDP) OR Verified Telemetry Log + 3 Marks (TCP)',
                examTopic: 'KTU Module 2: TCP (Connection-oriented, Reliable, Flow/Congestion Control) vs UDP (Connectionless, Unreliable, Minimal Overhead).'
            }
        ];

        // KTU Syllabus Topics Database (For Syllabus Tab)
        this.syllabusTopics = [
            {
                module: 'Module 1',
                name: 'Application Layer & Web Protocols',
                topics: [
                    { title: 'DNS Resolution Hierarchy', detail: 'Root, TLD (.corp), Authoritative servers; iterative vs recursive queries', status: 'MASTERED' },
                    { title: 'HTTP/1.1 vs HTTP/2', detail: 'Persistent TCP connections, pipelining, binary framing & multiplexing', status: 'MASTERED' },
                    { title: 'Email Protocols (SMTP, POP3, IMAP)', detail: 'SMTP Port 25 push; POP3 Port 110 pull; IMAP Port 143 dynamic sync', status: 'MASTERED' },
                    { title: 'P2P File Distribution (BitTorrent)', detail: 'Swarm topology, torrent trackers, rarest-first piece selection, tit-for-tat', status: 'MASTERED' }
                ]
            },
            {
                module: 'Module 2',
                name: 'Transport, Network & Socket Layer',
                topics: [
                    { title: 'TCP vs UDP Comparison', detail: 'Reliability, connection state, 20-60B vs 8B header, flow & congestion control', status: 'MASTERED' },
                    { title: 'TCP 3-Way Handshake & Sequence Numbers', detail: 'SYN, SYN-ACK, ACK; sequence number increment by payload size; cumulative ACKs', status: 'MASTERED' },
                    { title: 'IPv4 Fragmentation & Reassembly', detail: 'Total Length, Identification, DF/MF flags, Fragment Offset = DataBytes / 8', status: 'MASTERED' },
                    { title: 'Dijkstra Link-State Algorithm', detail: 'Permanent set N\', tentative costs D(v), least-cost path forwarding table', status: 'MASTERED' },
                    { title: 'Berkeley Sockets & I/O Multiplexing', detail: 'socket->bind->listen->accept; select() fd_set vs poll() pollfd struct', status: 'IN_PROGRESS' },
                    { title: 'Mobile IP Architecture', detail: 'Home Agent, Foreign Agent, Home Address, Care-of Address, IP-in-IP tunnel', status: 'IN_PROGRESS' }
                ]
            },
            {
                module: 'Module 3',
                name: 'Data Link Layer & MAC Protocols',
                topics: [
                    { title: 'CRC Modulo-2 Error Detection', detail: 'Generator polynomial g(x), zero-padding (k bits), XOR division, remainder check', status: 'MASTERED' },
                    { title: 'Framing & Bit Stuffing', detail: 'Flag byte 01111110, stuffing 0 after five consecutive 1s to prevent false flags', status: 'MASTERED' },
                    { title: 'CSMA/CD & Collision Backoff', detail: 'Carrier sense, collision detection, minimum frame size Tfr >= 2*Tp, binary backoff', status: 'MASTERED' },
                    { title: 'Transparent Bridges & MAC Learning', detail: 'Source MAC learning, destination lookup, filtering, forwarding, flooding', status: 'MASTERED' },
                    { title: 'ARP (Address Resolution Protocol)', detail: 'Mapping IP to MAC, broadcast request, unicast reply, ARP poisoning defense', status: 'IN_PROGRESS' }
                ]
            },
            {
                module: 'Module 4',
                name: 'Physical Layer & Network Management',
                topics: [
                    { title: 'Bandwidth & Data Rate Limits', detail: 'Nyquist noiseless formula C = 2B log2(L); Shannon noisy limit C = B log2(1+SNR)', status: 'MASTERED' },
                    { title: 'Line Coding & Modulation', detail: 'NRZ-L, NRZ-I, Manchester transitions; Carrier modulation (ASK, FSK, PSK)', status: 'MASTERED' },
                    { title: 'Guided Transmission Media', detail: 'Twisted pair (UTP/STP), Coaxial (10Base5/10Base2), Optical Fiber total internal reflection', status: 'MASTERED' },
                    { title: 'SNMP & ASN.1 MIB Management', detail: 'SNMP Manager/Agent, OID tree 1.3.6.1.2.1, ASN.1 SMI grammar, GET/SET/TRAP', status: 'MASTERED' }
                ]
            }
        ];
    }

    // Toggle Modal Open/Close
    toggle() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.syncWithGameState();
            if (this.audio) {
                try { this.audio.sfxPing(); } catch (e) {}
            }
        }
        return this.isOpen;
    }

    open() {
        this.isOpen = true;
        this.syncWithGameState();
        if (this.audio) {
            try { this.audio.sfxPing(); } catch (e) {}
        }
    }

    close() {
        this.isOpen = false;
    }

    // Synchronize quest status and topics with global GameState
    syncWithGameState() {
        const gs = typeof window !== 'undefined' ? window.GameState : null;
        if (!gs || !gs.state) return;

        // Auto-check completed sectors
        if (gs.state.completedSectors && Array.isArray(gs.state.completedSectors)) {
            if (gs.state.completedSectors.includes(1)) this.setQuestStatus('QUEST_SECTOR1', QuestStatus.COMPLETED);
            if (gs.state.completedSectors.includes(2)) this.setQuestStatus('QUEST_SECTOR2', QuestStatus.COMPLETED);
            if (gs.state.completedSectors.includes(3)) this.setQuestStatus('QUEST_SECTOR3', QuestStatus.COMPLETED);
            if (gs.state.completedSectors.includes(4)) this.setQuestStatus('QUEST_SECTOR4', QuestStatus.COMPLETED);
        }

        // Check inventory for quest markers
        if (gs.hasItem('ARP_CACHE_RESOLVER')) {
            this.setQuestStatus('QUEST_ARP_SCOUT', QuestStatus.COMPLETED);
            this.setTopicStatus('ARP (Address Resolution Protocol)', 'MASTERED');
        }
        if (gs.hasItem('MOBILE_IP_TUNNELER')) {
            this.setQuestStatus('QUEST_MOBILE_IP', QuestStatus.COMPLETED);
            this.setTopicStatus('Mobile IP Architecture', 'MASTERED');
        }
        if (gs.hasItem('RAW_PACKET_SCANNER') || gs.hasItem('NOISY_RAW_SNIFFER')) {
            this.setQuestStatus('QUEST_SOCKET_DAEMON', QuestStatus.COMPLETED);
            this.setTopicStatus('Berkeley Sockets & I/O Multiplexing', 'MASTERED');
        }
        if (gs.hasItem('SCOUT_BURST_ENGINE') || gs.hasItem('VERIFIED_TELEMETRY_LOG')) {
            this.setQuestStatus('QUEST_SEEDER_PRIME', QuestStatus.COMPLETED);
        }
    }

    setQuestStatus(questId, status) {
        const q = this.quests.find(item => item.id === questId);
        if (q) {
            q.status = status;
            if (status === QuestStatus.COMPLETED && q.objectives) {
                q.objectives.forEach(obj => { obj.done = true; });
            }
        }
    }

    setTopicStatus(topicTitle, status) {
        for (const mod of this.syllabusTopics) {
            for (const top of mod.topics) {
                if (top.title === topicTitle) {
                    top.status = status;
                    return;
                }
            }
        }
    }

    // Record a player's consequential dilemma choice
    recordDecision(dilemmaId, choiceTitle, consequenceSummary, mechanicalImpact) {
        const existingIdx = this.decisions.findIndex(d => d.dilemmaId === dilemmaId);
        const entry = {
            dilemmaId,
            choiceTitle,
            consequenceSummary,
            mechanicalImpact,
            timestamp: new Date().toLocaleTimeString(),
            sectorId: window.GameState && window.GameState.state ? window.GameState.state.currentSector.id : 4
        };

        if (existingIdx >= 0) {
            this.decisions[existingIdx] = entry;
        } else {
            this.decisions.push(entry);
        }

        console.log(`[QuestManager] Decision recorded: ${dilemmaId} -> ${choiceTitle}`);
    }

    hasDecision(dilemmaId) {
        return this.decisions.some(d => d.dilemmaId === dilemmaId);
    }

    getFilteredQuests() {
        if (this.activeTab === 'MAIN') {
            return this.quests.filter(q => q.category === 'MAIN');
        } else if (this.activeTab === 'TECHNICAL') {
            return this.quests.filter(q => q.category === 'TECHNICAL');
        }
        return this.quests; // 'ALL'
    }

    handleInput(input) {
        if (!this.isOpen) return false;

        // Close on Tab, Esc, or Q
        if (input.isJustPressed('tab') || input.isJustPressed('escape') || input.isJustPressed('q')) {
            this.close();
            return true;
        }

        // Tab Switching via 1, 2, 3, 4
        if (input.isJustPressed('1')) {
            this.activeTab = 'ALL';
            this.selectedQuestIndex = 0;
            if (this.audio) this.audio.sfxPing();
            return true;
        }
        if (input.isJustPressed('2')) {
            this.activeTab = 'MAIN';
            this.selectedQuestIndex = 0;
            if (this.audio) this.audio.sfxPing();
            return true;
        }
        if (input.isJustPressed('3')) {
            this.activeTab = 'TECHNICAL';
            this.selectedQuestIndex = 0;
            if (this.audio) this.audio.sfxPing();
            return true;
        }
        if (input.isJustPressed('4')) {
            this.activeTab = 'JOURNAL';
            this.selectedQuestIndex = 0;
            if (this.audio) this.audio.sfxPing();
            return true;
        }

        // Quest list navigation via Up / Down / W / S
        const list = this.getFilteredQuests();
        if (input.isJustPressed('arrowdown') || input.isJustPressed('s')) {
            if (this.activeTab !== 'JOURNAL') {
                this.selectedQuestIndex = Math.min(list.length - 1, this.selectedQuestIndex + 1);
                if (this.audio) this.audio.sfxPing();
            } else {
                this.scrollOffset = Math.min(Math.max(0, this.decisions.length - 3), this.scrollOffset + 1);
            }
            return true;
        }
        if (input.isJustPressed('arrowup') || input.isJustPressed('w')) {
            if (this.activeTab !== 'JOURNAL') {
                this.selectedQuestIndex = Math.max(0, this.selectedQuestIndex - 1);
                if (this.audio) this.audio.sfxPing();
            } else {
                this.scrollOffset = Math.max(0, this.scrollOffset - 1);
            }
            return true;
        }

        // Handle Mouse Clicks on Tabs or Close Button
        if (input.mouse && input.mouse.leftJustPressed) {
            const mx = input.mouse.x;
            const my = input.mouse.y;

            // Close button (x: 1140, y: 75, w: 40, h: 30)
            if (mx >= 1130 && mx <= 1180 && my >= 65 && my <= 105) {
                this.close();
                return true;
            }

            // Tab bar clicks (around Y: 110 - 145)
            if (my >= 110 && my <= 145) {
                if (mx >= 130 && mx <= 260) { this.activeTab = 'ALL'; this.selectedQuestIndex = 0; }
                else if (mx >= 270 && mx <= 430) { this.activeTab = 'MAIN'; this.selectedQuestIndex = 0; }
                else if (mx >= 440 && mx <= 630) { this.activeTab = 'TECHNICAL'; this.selectedQuestIndex = 0; }
                else if (mx >= 640 && mx <= 830) { this.activeTab = 'JOURNAL'; this.selectedQuestIndex = 0; }
                if (this.audio) this.audio.sfxPing();
                return true;
            }

            // Quest Item Clicks in Left Column (X: 130 to 470)
            if (this.activeTab !== 'JOURNAL' && mx >= 130 && mx <= 470 && my >= 165 && my <= 620) {
                const itemIdx = Math.floor((my - 165) / 58);
                if (itemIdx >= 0 && itemIdx < list.length) {
                    this.selectedQuestIndex = itemIdx;
                    if (this.audio) this.audio.sfxPing();
                    return true;
                }
            }
        }

        return true;
    }

    render(ctx) {
        if (!this.isOpen) return;

        const w = 1280;
        const h = 720;

        ctx.save();

        // 1. Modal Backdrop Scrim
        ctx.fillStyle = 'rgba(4, 8, 18, 0.88)';
        ctx.fillRect(0, 0, w, h);

        // 2. Main Window Dimensions
        const mx = 110;
        const my = 55;
        const mw = 1060;
        const mh = 610;

        // Outer Cyber Panel
        ctx.fillStyle = 'rgba(8, 16, 32, 0.96)';
        ctx.fillRect(mx, my, mw, mh);

        // Glowing Border
        ctx.strokeStyle = '#00ffcc';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00ffcc';
        ctx.shadowBlur = 14;
        ctx.strokeRect(mx, my, mw, mh);
        ctx.shadowBlur = 0;

        // Corner Reticles
        const cornerSize = 16;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        // Top Left
        ctx.beginPath(); ctx.moveTo(mx, my + cornerSize); ctx.lineTo(mx, my); ctx.lineTo(mx + cornerSize, my); ctx.stroke();
        // Top Right
        ctx.beginPath(); ctx.moveTo(mx + mw - cornerSize, my); ctx.lineTo(mx + mw, my); ctx.lineTo(mx + mw, my + cornerSize); ctx.stroke();
        // Bottom Left
        ctx.beginPath(); ctx.moveTo(mx, my + mh - cornerSize); ctx.lineTo(mx, my + mh); ctx.lineTo(mx + cornerSize, my + mh); ctx.stroke();
        // Bottom Right
        ctx.beginPath(); ctx.moveTo(mx + mw - cornerSize, my + mh); ctx.lineTo(mx + mw, my + mh); ctx.lineTo(mx + mw, my + mh - cornerSize); ctx.stroke();

        // 3. Header Banner
        ctx.fillStyle = 'rgba(0, 255, 204, 0.12)';
        ctx.fillRect(mx, my, mw, 48);
        ctx.strokeStyle = 'rgba(0, 255, 204, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(mx, my, mw, 48);

        const FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

        ctx.fillStyle = '#38bdf8';
        ctx.font = `bold 17px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.fillText('⚡ OMNINET // RESISTANCE TACTICAL QUEST LOG & SYLLABUS TRACKER', mx + 20, my + 31);

        // Close button [X]
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(mx + mw - 46, my + 10, 32, 28, 4);
        else ctx.rect(mx + mw - 46, my + 10, 32, 28);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold 15px ${FONT_SANS}`;
        ctx.textAlign = 'center';
        ctx.fillText('✕', mx + mw - 30, my + 29);

        // 4. Tab Bar (ALL, MAIN, TECHNICAL, JOURNAL)
        const tabs = [
            { id: 'ALL', label: '[1] ALL QUESTS' },
            { id: 'MAIN', label: '[2] MAIN INFILTRATION' },
            { id: 'TECHNICAL', label: '[3] TECHNICAL ALLIES' },
            { id: 'JOURNAL', label: '[4] DECISION JOURNAL' }
        ];

        let tabX = mx + 20;
        const tabY = my + 60;
        const tabH = 32;

        tabs.forEach(t => {
            const isCurrent = this.activeTab === t.id;
            const tabW = t.id === 'JOURNAL' ? 190 : 160;

            if (isCurrent) {
                ctx.fillStyle = 'rgba(56, 189, 248, 0.28)';
                ctx.strokeStyle = '#38bdf8';
                ctx.lineWidth = 1.8;
            } else {
                ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
                ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
                ctx.lineWidth = 1;
            }

            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(tabX, tabY, tabW, tabH, 4);
            else ctx.rect(tabX, tabY, tabW, tabH);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = isCurrent ? '#38bdf8' : '#94a3b8';
            ctx.font = `bold 12px ${FONT_SANS}`;
            ctx.textAlign = 'center';
            ctx.fillText(t.label, tabX + tabW / 2, tabY + 21);

            tabX += tabW + 12;
        });

        // 5. Main Content Area Rendering
        if (this.activeTab === 'JOURNAL') {
            this.renderJournalTab(ctx, mx + 20, my + 105, mw - 40, mh - 120);
        } else {
            this.renderQuestsTab(ctx, mx + 20, my + 105, mw - 40, mh - 120);
        }

        // 6. Footer Navigation Bar
        const footerY = my + mh - 30;
        ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
        ctx.fillRect(mx, footerY, mw, 30);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.strokeRect(mx, footerY, mw, 30);

        ctx.fillStyle = '#94a3b8';
        ctx.font = `11px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.fillText('⌨ [TAB] or [ESC] Close | [1-4] Switch Tabs | [↑ / ↓] Select Quest | [E] Commune With NPCs in World', mx + 20, footerY + 19);

        // Telemetry Marks Indicator in Footer
        const gs = typeof window !== 'undefined' ? window.GameState : null;
        const marks = gs && gs.state && gs.state.examProgress ? gs.state.examProgress.marksEarned : 60;
        ctx.fillStyle = '#fbbf24';
        ctx.textAlign = 'right';
        ctx.font = `bold 12px ${FONT_SANS}`;
        ctx.fillText(`KTU EXAM MARKS: ${marks.toFixed(1)} / 60.0 (S GRADE: 100%)`, mx + mw - 20, footerY + 19);

        ctx.restore();
    }

    renderQuestsTab(ctx, x, y, w, h) {
        const FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        const list = this.getFilteredQuests();
        const col1W = 380;
        const col2X = x + col1W + 18;
        const col2W = w - col1W - 18;

        // ------------------------------------------------------------------
        // Left Column: Quests List
        // ------------------------------------------------------------------
        ctx.save();
        ctx.fillStyle = 'rgba(11, 20, 38, 0.9)';
        ctx.fillRect(x, y, col1W, h - 35);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.strokeRect(x, y, col1W, h - 35);

        ctx.fillStyle = '#38bdf8';
        ctx.font = `bold 12px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.fillText('ACTIVE MISSION OBJECTIVES', x + 12, y + 22);

        let itemY = y + 36;
        const itemH = 56;

        list.forEach((quest, idx) => {
            const isSelected = idx === this.selectedQuestIndex;

            if (isSelected) {
                ctx.fillStyle = 'rgba(56, 189, 248, 0.22)';
                ctx.strokeStyle = '#38bdf8';
                ctx.lineWidth = 1.6;
            } else {
                ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
                ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
                ctx.lineWidth = 1;
            }

            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(x + 8, itemY, col1W - 16, itemH, 4);
            else ctx.rect(x + 8, itemY, col1W - 16, itemH);
            ctx.fill();
            ctx.stroke();

            // Status Badge
            let statusColor = '#fbbf24';
            let statusText = 'IN PROGRESS';
            if (quest.status === QuestStatus.COMPLETED) {
                statusColor = '#4ade80';
                statusText = '✓ COMPLETED';
            } else if (quest.status === QuestStatus.AVAILABLE) {
                statusColor = '#38bdf8';
                statusText = '● READY';
            }

            ctx.fillStyle = statusColor;
            ctx.font = `bold 10px ${FONT_SANS}`;
            ctx.textAlign = 'left';
            ctx.fillText(statusText, x + 16, itemY + 16);

            // Quest Title
            ctx.fillStyle = isSelected ? '#ffffff' : '#e2e8f0';
            ctx.font = `bold 13px ${FONT_SANS}`;
            const displayTitle = quest.title.length > 36 ? quest.title.substring(0, 34) + '..' : quest.title;
            ctx.fillText(displayTitle, x + 16, itemY + 34);

            // Sector / Module Tag
            ctx.fillStyle = '#94a3b8';
            ctx.font = `11px ${FONT_SANS}`;
            ctx.fillText(`Sector ${quest.sector} // ${quest.category}`, x + 16, itemY + 49);

            itemY += itemH + 6;
        });
        ctx.restore();

        // ------------------------------------------------------------------
        // Right Column: Quest Details & Objectives
        // ------------------------------------------------------------------
        const selectedQuest = list[this.selectedQuestIndex] || list[0];
        if (!selectedQuest) return;

        ctx.save();
        ctx.fillStyle = 'rgba(11, 20, 38, 0.95)';
        ctx.fillRect(col2X, y, col2W, h - 35);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.strokeRect(col2X, y, col2W, h - 35);

        // Header
        ctx.fillStyle = '#38bdf8';
        ctx.font = `bold 16px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.fillText(selectedQuest.title, col2X + 20, y + 28);

        ctx.fillStyle = '#94a3b8';
        ctx.font = `600 12px ${FONT_SANS}`;
        ctx.fillText(`ISSUED BY: ${selectedQuest.issuer} | SECTOR ${selectedQuest.sector}`, col2X + 20, y + 48);
        ctx.fillText(`ACADEMIC SCOPE: ${selectedQuest.module}`, col2X + 20, y + 66);

        // Divider
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.beginPath();
        ctx.moveTo(col2X + 20, y + 78);
        ctx.lineTo(col2X + col2W - 20, y + 78);
        ctx.stroke();

        // Narrative Description
        ctx.fillStyle = '#e2e8f0';
        ctx.font = `14px ${FONT_SANS}`;
        this.renderWrappedText(ctx, selectedQuest.description, col2X + 20, y + 100, col2W - 40, 20);

        // Objectives List
        const objStartY = y + 165;
        ctx.fillStyle = '#fbbf24';
        ctx.font = `bold 13px ${FONT_SANS}`;
        ctx.fillText('MISSION PROTOCOL OBJECTIVES:', col2X + 20, objStartY);

        let currObjY = objStartY + 24;
        selectedQuest.objectives.forEach(obj => {
            const checkIcon = obj.done ? '☑' : '☐';
            const checkColor = obj.done ? '#4ade80' : '#94a3b8';

            ctx.fillStyle = checkColor;
            ctx.font = `bold 14px ${FONT_SANS}`;
            ctx.fillText(checkIcon, col2X + 24, currObjY);

            ctx.fillStyle = obj.done ? '#86efac' : '#ffffff';
            ctx.font = `13px ${FONT_SANS}`;
            ctx.fillText(obj.desc, col2X + 46, currObjY);

            currObjY += 24;
        });

        // Exam Topic Box
        const examBoxY = y + h - 130;
        ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.fillRect(col2X + 20, examBoxY, col2W - 40, 52);
        ctx.strokeStyle = '#38bdf8';
        ctx.strokeRect(col2X + 20, examBoxY, col2W - 40, 52);

        ctx.fillStyle = '#38bdf8';
        ctx.font = `bold 12px ${FONT_SANS}`;
        ctx.fillText('🎓 KTU EXAM KEYWORDS & SYLLABUS ALIGNMENT:', col2X + 30, examBoxY + 18);

        ctx.fillStyle = '#f8fafc';
        ctx.font = `12px ${FONT_SANS}`;
        this.renderWrappedText(ctx, selectedQuest.examTopic, col2X + 30, examBoxY + 36, col2W - 60, 16);

        // Rewards Box
        const rewBoxY = y + h - 68;
        ctx.fillStyle = 'rgba(251, 191, 36, 0.12)';
        ctx.fillRect(col2X + 20, rewBoxY, col2W - 40, 28);
        ctx.strokeStyle = '#fbbf24';
        ctx.strokeRect(col2X + 20, rewBoxY, col2W - 40, 28);

        ctx.fillStyle = '#fbbf24';
        ctx.font = `bold 12px ${FONT_SANS}`;
        ctx.fillText(`🏆 REWARDS: ${selectedQuest.reward}`, col2X + 30, rewBoxY + 18);

        ctx.restore();
    }

    renderJournalTab(ctx, x, y, w, h) {
        const FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        ctx.save();
        ctx.fillStyle = 'rgba(11, 20, 38, 0.95)';
        ctx.fillRect(x, y, w, h - 35);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.strokeRect(x, y, w, h - 35);

        ctx.fillStyle = '#38bdf8';
        ctx.font = `bold 16px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.fillText('📖 CONSEQUENTIAL DECISIONS JOURNAL // LASTING GAMEPLAY IMPACTS', x + 20, y + 26);

        ctx.fillStyle = '#94a3b8';
        ctx.font = `12px ${FONT_SANS}`;
        ctx.fillText('Every engineering choice shapes Unit 0xVOID\'s capabilities, telemetry logs, and the hostility of OmniNet.', x + 20, y + 46);

        // Divider
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.beginPath();
        ctx.moveTo(x + 20, y + 56);
        ctx.lineTo(x + w - 20, y + 56);
        ctx.stroke();

        let entryY = y + 72;
        const entryH = 96;

        if (this.decisions.length === 0) {
            // Placeholder hints if no dilemmas decided yet
            ctx.fillStyle = '#fbbf24';
            ctx.font = `bold 14px ${FONT_SANS}`;
            ctx.fillText('NO TECHNICAL DILEMMAS RECORDED YET.', x + 30, entryY + 30);

            ctx.fillStyle = '#cbd5e1';
            ctx.font = `13px ${FONT_SANS}`;
            ctx.fillText('1. Meet Seeder Prime at Sector 4 P2P Camp to choose Transport Protocol (UDP vs TCP).', x + 30, entryY + 56);
            ctx.fillText('2. Meet Berkeley Socket Daemon at Sector 4 Web Bastion to choose Raw Socket Interface (SOCK_PACKET vs PF_PACKET).', x + 30, entryY + 78);
            ctx.fillText('3. Meet Agent ARP in Sector 2 to master IP-to-MAC resolution and Anti-Poison DAI defenses.', x + 30, entryY + 100);
        } else {
            this.decisions.forEach((dec, idx) => {
                ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
                ctx.fillRect(x + 20, entryY, w - 40, entryH);
                ctx.strokeStyle = '#38bdf8';
                ctx.lineWidth = 1;
                ctx.strokeRect(x + 20, entryY, w - 40, entryH);

                // Badge
                ctx.fillStyle = '#fbbf24';
                ctx.font = `bold 11px ${FONT_SANS}`;
                ctx.fillText(`DECISION #${idx + 1}: ${dec.dilemmaId} [SECTOR ${dec.sectorId}]`, x + 35, entryY + 20);

                // Choice Title
                ctx.fillStyle = '#4ade80';
                ctx.font = `bold 14px ${FONT_SANS}`;
                ctx.fillText(`CHOSEN PATH: ${dec.choiceTitle}`, x + 35, entryY + 38);

                // Consequence Summary
                ctx.fillStyle = '#f8fafc';
                ctx.font = `12px ${FONT_SANS}`;
                ctx.fillText(`NARRATIVE IMPACT: ${dec.consequenceSummary}`, x + 35, entryY + 58);

                // Mechanical Impact
                ctx.fillStyle = '#38bdf8';
                ctx.font = `bold 12px ${FONT_SANS}`;
                ctx.fillText(`PERSISTENT REWARD / EFFECT: ${dec.mechanicalImpact}`, x + 35, entryY + 78);

                entryY += entryH + 12;
            });
        }

        ctx.restore();
    }

    renderWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
        if (!text) return;
        const words = text.split(' ');
        let line = '';

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && n > 0) {
                ctx.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, y);
    }
}

// Global Singleton Export
const questManagerInstance = new QuestManager();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.QuestManager = questManagerInstance;
    window.QuestManager = questManagerInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QuestManager, questManagerInstance, QuestStatus };
}
