// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// DialogueSystem.js - NPC Dialogue Trees, Vector Portraits & Consequential Dilemmas
// Narrative Systems & RPG Dialogue Architecture
// ==========================================================================

class DialogueSystem {
    constructor() {
        this.isOpen = false;
        this.currentNpcId = null;
        this.currentNodeId = null;

        // Typewriter Effect Variables
        this.fullText = '';
        this.displayedText = '';
        this.charIndex = 0;
        this.typewriterTimer = 0;
        this.charInterval = 0.022; // Seconds per character (~45 cps)
        this.isTyping = false;
        this.soundCounter = 0;

        // Current Interactive Choices
        this.choices = [];
        this.selectedChoiceIndex = 0;

        // Dialogue Box Animation & Visuals
        this.animTimer = 0;
        this.portraitAnim = 0;

        // Audio Reference
        this.audio = typeof window !== 'undefined' && window.CyberAudio ? window.CyberAudio : null;

        // ------------------------------------------------------------------
        // World NPCs Registry (Sectors 2, 3, 4)
        // ------------------------------------------------------------------
        this.npcs = {
            AGENT_ARP: {
                id: 'AGENT_ARP',
                name: 'AGENT ARP',
                title: 'LINK-LAYER SCOUT',
                sector: 2,
                x: 1100,
                y: 280,
                radius: 24,
                interactionRadius: 85,
                color: '#00ffcc',
                speechPitch: 720,
                startNode: 'START'
            },
            WANDERER_IP: {
                id: 'WANDERER_IP',
                name: 'WANDERER IP',
                title: 'MOBILE ROAMING NODE [RFC 5944]',
                sector: 3,
                x: 850,
                y: 240,
                radius: 24,
                interactionRadius: 85,
                color: '#ffd700',
                speechPitch: 520,
                startNode: 'START'
            },
            SOCKET_DAEMON: {
                id: 'SOCKET_DAEMON',
                name: 'THE BERKELEY SOCKET DAEMON',
                title: 'UNIX PROTOCOL NEXUS',
                sector: 4,
                x: 450,
                y: 260,
                radius: 26,
                interactionRadius: 90,
                color: '#c084fc',
                speechPitch: 380,
                startNode: 'START'
            },
            SEEDER_PRIME: {
                id: 'SEEDER_PRIME',
                name: 'SEEDER PRIME',
                title: 'SWARM RESISTANCE ARCHITECT',
                sector: 4,
                x: 1380,
                y: 220,
                radius: 24,
                interactionRadius: 85,
                color: '#00ff88',
                speechPitch: 640,
                startNode: 'START'
            }
        };

        // ------------------------------------------------------------------
        // Master Dialogue Trees
        // ------------------------------------------------------------------
        this.dialogueTrees = {
            // --------------------------------------------------------------
            // 1. AGENT ARP (Sector 2 // Data Link Layer)
            // --------------------------------------------------------------
            AGENT_ARP: {
                START: {
                    text: "HALT, Unit 0xVOID! I am Agent ARP, Link-Layer Scout. In Sector 2, packets cannot traverse physical media using 32-bit IP addresses alone. Network interfaces only comprehend 48-bit MAC addresses burned into silicon! Before you advance, you must know how we bridge layer 3 to layer 2.",
                    choices: [
                        { label: "How do you discover the destination MAC address for an IP datagram?", nextNode: 'EXPLAIN_ARP' },
                        { label: "What prevents hostile daemons from poisoning our ARP tables?", nextNode: 'EXPLAIN_POISON' }
                    ]
                },
                EXPLAIN_ARP: {
                    text: "Standard ARP ritual: When node A needs node B's MAC, it broadcasts an ARP Request frame to FF:FF:FF:FF:FF:FF. Every host on the broadcast domain inspects it. Only host B matching the target IP sends back a Unicast ARP Reply with its MAC address! Both nodes cache this mapping for 20 minutes to minimize broadcast storm traffic.",
                    choices: [
                        { label: "What happens if a malicious daemon sends forged ARP replies?", nextNode: 'EXPLAIN_POISON' },
                        { label: "Understood. The IP-to-MAC resolution ritual is clear.", nextNode: 'REWARD_ARP' }
                    ]
                },
                EXPLAIN_POISON: {
                    text: "That is ARP Cache Poisoning (Man-in-the-Middle)! An attacker floods gratuitous ARP replies claiming the gateway's IP belongs to their MAC. To neutralize this, switches deploy Dynamic ARP Inspection (DAI). DAI inspects ARP frames against trusted DHCP snooping databases, immediately dropping fraudulent packets!",
                    choices: [
                        { label: "Equip Dynamic ARP Inspection filters and calibrate cache tables.", nextNode: 'REWARD_ARP' }
                    ]
                },
                REWARD_ARP: {
                    text: "Protocol calibrated! Take this ARP Cache Resolver module and Anti-Poison inspection filter. You have mastered Link-Layer Address Resolution (+3 KTU Exam Marks awarded)!",
                    choices: [
                        { label: "Acknowledge and disconnect.", nextNode: null, action: 'completeArp' }
                    ]
                }
            },

            // --------------------------------------------------------------
            // 2. WANDERER IP (Sector 3 // Network Layer Roaming)
            // --------------------------------------------------------------
            WANDERER_IP: {
                START: {
                    text: "Greetings, packet runner. I am Wanderer IP. I roam across foreign subnets along this CIDR highway, yet my home network never loses contact with my active TCP streams. Do you know how Mobile IP (RFC 5944) achieves seamless mobility without resetting socket connections?",
                    choices: [
                        { label: "Explain the roles of Home Agent (HA) and Foreign Agent (FA).", nextNode: 'EXPLAIN_AGENTS' },
                        { label: "How does IP-in-IP encapsulation tunnel packets to roaming nodes?", nextNode: 'EXPLAIN_TUNNEL' }
                    ]
                },
                EXPLAIN_AGENTS: {
                    text: "A mobile node has a permanent Home Address on its home subnet where its Home Agent (HA) resides. When moving into a foreign network, it acquires a temporary Care-of Address (COA) from a Foreign Agent (FA). The mobile node registers its new COA back with its Home Agent.",
                    choices: [
                        { label: "How does the Home Agent route incoming traffic to my Care-of Address?", nextNode: 'EXPLAIN_TUNNEL' },
                        { label: "What is the Triangle Routing bottleneck and how is it solved?", nextNode: 'EXPLAIN_TRIANGLE' }
                    ]
                },
                EXPLAIN_TUNNEL: {
                    text: "When a correspondent sends a datagram to my Home Address, the HA intercepts it via proxy ARP. The HA encapsulates the original IP datagram inside a new outer IP datagram with destination = Care-of Address (IP-in-IP Tunneling, Protocol 4). At the foreign agent, the outer header is decapsulated and delivered to me!",
                    choices: [
                        { label: "Routing through the Home Agent creates latency. Can we bypass it?", nextNode: 'EXPLAIN_TRIANGLE' },
                        { label: "Data tunnels aligned. I am ready to synchronize.", nextNode: 'REWARD_MOBILE_IP' }
                    ]
                },
                EXPLAIN_TRIANGLE: {
                    text: "That is Triangle Routing (Correspondent -> Home Agent -> Foreign Agent -> Mobile Node)! To solve it, Mobile IP Route Optimization lets correspondent nodes cache the mobile node's Care-of Address directly, allowing them to tunnel datagrams directly without traversing the Home Agent!",
                    choices: [
                        { label: "Route optimization understood. Ready to calibrate Mobile IP.", nextNode: 'REWARD_MOBILE_IP' }
                    ]
                },
                REWARD_MOBILE_IP: {
                    text: "Tunneling vectors synchronized! Take this Mobile IP Tunneling Module. You have mastered Mobile IP roaming, Care-of Addresses, and IP-in-IP encapsulation (+3 KTU Exam Marks awarded)!",
                    choices: [
                        { label: "Acknowledge and proceed into the routing core.", nextNode: null, action: 'completeMobileIp' }
                    ]
                }
            },

            // --------------------------------------------------------------
            // 3. THE BERKELEY SOCKET DAEMON (Sector 4 // Web Bastion)
            // --------------------------------------------------------------
            SOCKET_DAEMON: {
                START: {
                    text: "Hail, mortal process. I am the Berkeley Socket Daemon, keeper of POSIX network endpoints. To penetrate the kernel drivers of TITAN-CORE, you must master the sacred server socket lifecycle, understand I/O multiplexing, and resolve a crucial link-layer driver dilemma.",
                    choices: [
                        { label: "Review the TCP server socket ritual from creation to teardown.", nextNode: 'EXPLAIN_LIFECYCLE' },
                        { label: "Compare select() vs poll() for handling multiplexed connections.", nextNode: 'EXPLAIN_MULTIPLEX' },
                        { label: "I am ready to choose the Raw Socket interface driver.", nextNode: 'DILEMMA_DRIVER' }
                    ]
                },
                EXPLAIN_LIFECYCLE: {
                    text: "The sacred server socket lifecycle: (1) socket() allocates the endpoint descriptor; (2) bind() assigns local IP and port; (3) listen() configures backlog queue size; (4) accept() blocks until the 3-way handshake completes, returning a NEW connected socket descriptor; (5) read()/write() streams bytes; (6) close() executes 4-way FIN teardown.",
                    choices: [
                        { label: "How do we handle 10,000 concurrent sockets without blocking?", nextNode: 'EXPLAIN_MULTIPLEX' },
                        { label: "Proceed to the Raw Socket Interface Dilemma.", nextNode: 'DILEMMA_DRIVER' }
                    ]
                },
                EXPLAIN_MULTIPLEX: {
                    text: "I/O Multiplexing! select() checks descriptor bitmasks via fd_set, but is strictly bounded by FD_SETSIZE (1024) and requires O(N) array scanning. poll() replaces bitmasks with dynamic arrays of struct pollfd, removing descriptor limits. In modern Linux, epoll() achieves O(1) event-driven notifications!",
                    choices: [
                        { label: "Proceed to the Raw Socket Interface Dilemma.", nextNode: 'DILEMMA_DRIVER' }
                    ]
                },
                DILEMMA_DRIVER: {
                    text: "CONSEQUENTIAL DILEMMA (KTU Set 2 Q13b / Set 4 Q14a): To capture raw Ethernet frames and bypass firewall inspection, you must choose your kernel packet socket implementation. Choose carefully, for your choice has lasting operational consequences:",
                    choices: [
                        { label: "Legacy SOCK_PACKET (BSD compatibility, string device matching)", nextNode: 'CHOICE_SOCK_PACKET' },
                        { label: "Modern PF_PACKET with sockaddr_ll (interface index binding, protocol filter)", nextNode: 'CHOICE_PF_PACKET' }
                    ]
                },
                CHOICE_SOCK_PACKET: {
                    text: "You chose legacy SOCK_PACKET. It runs on ancient BSD kernels, but binding via interface strings ('eth0') causes device ambiguity and lacks link-layer protocol filtering. You received NOISY_RAW_SNIFFER.",
                    choices: [
                        { label: "Accept legacy sniffer and conclude communion.", nextNode: null, action: 'chooseLegacySocket' }
                    ]
                },
                CHOICE_PF_PACKET: {
                    text: "EXCELLENT ARCHITECTURAL CHOICE! Modern Linux PF_PACKET with sockaddr_ll binds cleanly to interface index sll_ifindex with ETH_P_ALL filtering. Zero device ambiguity, native link-layer frame capture! Awarded RAW_PACKET_SCANNER tool and +3 KTU Exam Marks!",
                    choices: [
                        { label: "Equip modern packet scanner and conclude communion.", nextNode: null, action: 'chooseModernSocket' }
                    ]
                }
            },

            // --------------------------------------------------------------
            // 4. SEEDER PRIME (Sector 4 // P2P Swarm Camp)
            // --------------------------------------------------------------
            SEEDER_PRIME: {
                START: {
                    text: "Unit 0xVOID! The BitTorrent Swarm resistance stands ready. But our forward scout squad at the perimeter is under siege by OmniNet Hunter Daemons. They urgently need our drone reconnaissance telemetry! We must decide which transport protocol to use for transmission across this noisy sector.",
                    choices: [
                        { label: "Explain the transport protocol trade-offs (KTU Model Paper Q11b).", nextNode: 'EXPLAIN_TRADE_OFFS' },
                        { label: "Transmit over UDP (Zero handshake latency, fast delivery burst).", nextNode: 'CHOICE_UDP' },
                        { label: "Transmit over TCP (100% reliable byte stream, cumulative ACKs).", nextNode: 'CHOICE_TCP' }
                    ]
                },
                EXPLAIN_TRADE_OFFS: {
                    text: "UDP is connectionless with an 8-byte header and zero handshake latency. It transmits instantly at wire speed, but channel noise will permanently drop unacknowledged packets. TCP provides 100% reliable in-order byte streams via sequence numbers, 3-way handshake, and Go-Back-N retransmissions, but its connection delay allows Hunter Daemons to trace our signal!",
                    choices: [
                        { label: "Transmit over UDP (Maximum speed, accept loss in noise).", nextNode: 'CHOICE_UDP' },
                        { label: "Transmit over TCP (Guaranteed data delivery, accept detection risk).", nextNode: 'CHOICE_TCP' }
                    ]
                },
                CHOICE_UDP: {
                    text: "UDP TRANSMISSION LAUNCHED! The telemetry blasted across the wire with zero handshake latency! The overclocked throughput supercharges your thrusters: +20% MOVEMENT SPEED PERMANENTLY! However, channel noise corrupted 1 intel packet without retransmission.",
                    choices: [
                        { label: "Channel engine boost and prepare for the final breach.", nextNode: null, action: 'chooseUdp' }
                    ]
                },
                CHOICE_TCP: {
                    text: "TCP SESSION ESTABLISHED! 3-way handshake SYN/SYN-ACK/ACK synchronized. All packets received in order with cumulative ACK tracking. Telemetry 100% verified! Awarded VERIFIED_TELEMETRY_LOG and +3 KTU Exam Marks! However, the handshake delay alerted nearby Hunter Daemons!",
                    choices: [
                        { label: "Store verified telemetry and prepare for high-alert combat.", nextNode: null, action: 'chooseTcp' }
                    ]
                }
            }
        };
    }

    // ----------------------------------------------------------------------
    // Dialogue Flow Management
    // ----------------------------------------------------------------------
    startDialogue(npcId) {
        const npc = this.npcs[npcId];
        if (!npc) {
            console.error(`[DialogueSystem] Unknown NPC ID: ${npcId}`);
            return false;
        }

        this.currentNpcId = npcId;
        this.isOpen = true;
        this.selectedChoiceIndex = 0;
        this.goToNode(npc.startNode || 'START');

        if (this.audio) {
            try { this.audio.sfxPing(); } catch (e) {}
        }
        return true;
    }

    goToNode(nodeId) {
        const tree = this.dialogueTrees[this.currentNpcId];
        if (!tree || !tree[nodeId]) {
            console.error(`[DialogueSystem] Node '${nodeId}' not found for NPC '${this.currentNpcId}'`);
            this.close();
            return;
        }

        this.currentNodeId = nodeId;
        const node = tree[nodeId];

        this.fullText = node.text || '';
        this.displayedText = '';
        this.charIndex = 0;
        this.typewriterTimer = 0;
        this.isTyping = true;
        this.soundCounter = 0;
        this.choices = node.choices || [];
        this.selectedChoiceIndex = 0;
    }

    close() {
        this.isOpen = false;
        this.currentNpcId = null;
        this.currentNodeId = null;
        this.isTyping = false;
    }

    // ----------------------------------------------------------------------
    // Update Loop (Typewriter Animation & Input)
    // ----------------------------------------------------------------------
    update(dt) {
        if (!this.isOpen) return;

        this.animTimer += dt;
        this.portraitAnim += dt * 2.5;

        // Typewriter text tick
        if (this.isTyping) {
            this.typewriterTimer += dt;
            while (this.typewriterTimer >= this.charInterval && this.charIndex < this.fullText.length) {
                this.typewriterTimer -= this.charInterval;
                this.charIndex++;
                this.displayedText = this.fullText.substring(0, this.charIndex);

                // Sound effect every 2 chars
                this.soundCounter++;
                if (this.soundCounter % 2 === 0 && this.audio && typeof this.audio.sfxSpeechBlip === 'function') {
                    const npc = this.npcs[this.currentNpcId];
                    const pitch = npc ? npc.speechPitch : 600;
                    this.audio.sfxSpeechBlip(pitch);
                }
            }

            if (this.charIndex >= this.fullText.length) {
                this.isTyping = false;
            }
        }
    }

    handleInput(input) {
        if (!this.isOpen) return false;

        // Close on Esc
        if (input.isJustPressed('escape')) {
            this.close();
            return true;
        }

        // Fast-forward / Skip typewriter text
        if (this.isTyping) {
            if (input.isJustPressed('space') || input.isJustPressed('enter') || input.isJustPressed('e') ||
                (input.mouse && input.mouse.leftJustPressed)) {
                this.displayedText = this.fullText;
                this.charIndex = this.fullText.length;
                this.isTyping = false;
                return true;
            }
            return true;
        }

        // Selection via Number Keys (1, 2, 3)
        if (this.choices.length > 0) {
            if (input.isJustPressed('1') && this.choices.length >= 1) {
                this.selectChoice(0);
                return true;
            }
            if (input.isJustPressed('2') && this.choices.length >= 2) {
                this.selectChoice(1);
                return true;
            }
            if (input.isJustPressed('3') && this.choices.length >= 3) {
                this.selectChoice(2);
                return true;
            }

            // Arrow key navigation
            if (input.isJustPressed('arrowdown') || input.isJustPressed('s')) {
                this.selectedChoiceIndex = (this.selectedChoiceIndex + 1) % this.choices.length;
                if (this.audio) this.audio.sfxPing();
                return true;
            }
            if (input.isJustPressed('arrowup') || input.isJustPressed('w')) {
                this.selectedChoiceIndex = (this.selectedChoiceIndex - 1 + this.choices.length) % this.choices.length;
                if (this.audio) this.audio.sfxPing();
                return true;
            }

            // Enter / Space / E to confirm selected choice
            if (input.isJustPressed('enter') || input.isJustPressed('space') || input.isJustPressed('e')) {
                this.selectChoice(this.selectedChoiceIndex);
                return true;
            }

            // Mouse Click on Choices
            if (input.mouse && input.mouse.leftJustPressed) {
                const mx = input.mouse.x;
                const my = input.mouse.y;
                const dw = 1040;
                const dh = 260;
                const dx = (1280 - dw) / 2;
                const dy = 720 - dh - 20;
                const portSize = dh - 36;
                const contentX = dx + 18 + portSize + 24;
                const contentW = dw - portSize - 60;
                const choiceStartY = dy + dh - (this.choices.length * 36 + 14);

                for (let i = 0; i < this.choices.length; i++) {
                    const cy = choiceStartY + i * 36;
                    if (mx >= contentX && mx <= contentX + contentW && my >= cy && my <= cy + 32) {
                        this.selectChoice(i);
                        return true;
                    }
                }
            }
        } else {
            // No choices (concluding node): press any advance key to close
            if (input.isJustPressed('space') || input.isJustPressed('enter') || input.isJustPressed('e') ||
                (input.mouse && input.mouse.leftJustPressed)) {
                this.close();
                return true;
            }
        }

        return true;
    }

    selectChoice(choiceIdx) {
        const choice = this.choices[choiceIdx];
        if (!choice) return;

        // Execute consequential action if attached
        if (choice.action) {
            this.executeAction(choice.action);
        }

        // Navigate or close
        if (choice.nextNode) {
            this.goToNode(choice.nextNode);
        } else {
            this.close();
        }

        if (this.audio) {
            try { this.audio.sfxPing(); } catch (e) {}
        }
    }

    // ----------------------------------------------------------------------
    // Consequential Actions & Gameplay Impacts
    // ----------------------------------------------------------------------
    executeAction(actionName) {
        const gs = typeof window !== 'undefined' ? window.GameState : null;
        const qm = typeof window !== 'undefined' ? window.QuestManager : null;

        console.log(`[DialogueSystem] Executing Action: ${actionName}`);

        switch (actionName) {
            case 'completeArp':
                if (gs) {
                    gs.awardExamMarks(3, 'Q13b_ARP', false);
                    gs.addItem({ id: 'ARP_CACHE_RESOLVER', name: 'ARP Cache Resolver', type: 'TOOL' });
                    gs.addItem({ id: 'ARP_SPOOF_FILTER', name: 'Anti-Poison DAI Filter', type: 'DEFENSE' });
                }
                if (qm) {
                    qm.setQuestStatus('QUEST_ARP_SCOUT', 'COMPLETED');
                    qm.setTopicStatus('ARP (Address Resolution Protocol)', 'MASTERED');
                }
                if (this.audio) this.audio.sfxAccessGranted();
                break;

            case 'completeMobileIp':
                if (gs) {
                    gs.awardExamMarks(3, 'Q12b_MOBILE_IP', false);
                    gs.addItem({ id: 'MOBILE_IP_TUNNELER', name: 'Mobile IP Tunneling Module', type: 'NETWORK' });
                }
                if (qm) {
                    qm.setQuestStatus('QUEST_MOBILE_IP', 'COMPLETED');
                    qm.setTopicStatus('Mobile IP Architecture', 'MASTERED');
                }
                if (this.audio) this.audio.sfxAccessGranted();
                break;

            case 'chooseLegacySocket':
                if (gs) {
                    gs.addItem({ id: 'NOISY_RAW_SNIFFER', name: 'Legacy SOCK_PACKET Sniffer', type: 'DRIVER' });
                }
                if (qm) {
                    qm.recordDecision(
                        'DILEMMA_RAW_SOCKET',
                        'Legacy SOCK_PACKET',
                        'Selected legacy BSD socket interface with string naming. Inefficient filtering across large frames.',
                        'Acquired NOISY_RAW_SNIFFER (BSD String Interface)'
                    );
                    qm.setQuestStatus('QUEST_SOCKET_DAEMON', 'COMPLETED');
                    qm.setTopicStatus('Berkeley Sockets & I/O Multiplexing', 'MASTERED');
                }
                if (this.audio) this.audio.sfxAccessGranted();
                break;

            case 'chooseModernSocket':
                if (gs) {
                    gs.awardExamMarks(3, 'Q13b_SOCKET', false);
                    gs.addItem({ id: 'RAW_PACKET_SCANNER', name: 'Modern PF_PACKET Scanner (sockaddr_ll)', type: 'DRIVER' });
                }
                if (qm) {
                    qm.recordDecision(
                        'DILEMMA_RAW_SOCKET',
                        'Modern PF_PACKET (sockaddr_ll)',
                        'Selected modern Linux link-layer packet socket with interface index binding (sll_ifindex) and ETH_P_ALL filtering.',
                        'Acquired RAW_PACKET_SCANNER tool + 3 Exam Marks'
                    );
                    qm.setQuestStatus('QUEST_SOCKET_DAEMON', 'COMPLETED');
                    qm.setTopicStatus('Berkeley Sockets & I/O Multiplexing', 'MASTERED');
                }
                if (this.audio) this.audio.sfxAccessGranted();
                break;

            case 'chooseUdp':
                if (gs) {
                    // Permanently boost player movement speed by 20%
                    if (gs.state && gs.state.player) {
                        const oldSpeed = gs.state.player.speed || 220;
                        gs.state.player.speed = Math.round(oldSpeed * 1.20);
                        console.log(`[DialogueSystem] Player speed overclocked: ${oldSpeed} -> ${gs.state.player.speed}`);
                    }
                    gs.addItem({ id: 'SCOUT_BURST_ENGINE', name: 'Overclocked UDP Burst Engine (+20% Speed)', type: 'AUGMENT' });
                    gs.addItem({ id: 'CORRUPTED_INTEL_FRAGMENT', name: 'Corrupted Telemetry Fragment (Channel Noise)', type: 'DATA' });
                }
                if (qm) {
                    qm.recordDecision(
                        'DILEMMA_TRANSPORT',
                        'UDP Fast Datagram Stream',
                        'Transmitted telemetry over UDP with zero 3-way handshake delay. Channel noise dropped 1 unacknowledged packet.',
                        'Permanently increased Player Movement Speed by +20% (SCOUT_BURST_ENGINE)'
                    );
                    qm.setQuestStatus('QUEST_SEEDER_PRIME', 'COMPLETED');
                }
                if (this.audio) {
                    this.audio.sfxDash();
                    setTimeout(() => { if (this.audio) this.audio.sfxAccessGranted(); }, 200);
                }
                break;

            case 'chooseTcp':
                if (gs) {
                    gs.awardExamMarks(3, 'Q11b_TCP_UDP', false);
                    gs.addItem({ id: 'VERIFIED_TELEMETRY_LOG', name: '100% Verified Telemetry Log (Cumulative ACK)', type: 'DATA' });
                }
                if (qm) {
                    qm.recordDecision(
                        'DILEMMA_TRANSPORT',
                        'TCP Reliable Byte Stream',
                        'Established TCP 3-way handshake with cumulative ACKs and Go-Back-N. 100% data integrity verified. Connection setup delay elevated sector alert level.',
                        'Acquired VERIFIED_TELEMETRY_LOG + 3 Exam Marks (High Security Alert)'
                    );
                    qm.setQuestStatus('QUEST_SEEDER_PRIME', 'COMPLETED');
                }
                if (this.audio) this.audio.sfxAccessGranted();
                break;
        }
    }

    // ----------------------------------------------------------------------
    // World Proximity & Interaction Check
    // ----------------------------------------------------------------------
    checkInteractions(activeSectorId, player, input) {
        if (this.isOpen || !player) return false;

        for (const key in this.npcs) {
            const npc = this.npcs[key];
            if (npc.sector !== activeSectorId) continue;

            const dx = player.x - npc.x;
            const dy = player.y - npc.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist <= npc.interactionRadius) {
                if (input && (input.isJustPressed('e') ||
                    (input.mouse && input.mouse.leftJustPressed && Math.abs(input.mouse.worldX - npc.x) < 40 && Math.abs(input.mouse.worldY - npc.y) < 40))) {
                    this.startDialogue(npc.id);
                    if (input.endFrame) input.endFrame();
                    return true;
                }
            }
        }
        return false;
    }

    // ----------------------------------------------------------------------
    // World Map NPC Rendering (In Camera Space)
    // ----------------------------------------------------------------------
    renderWorldNPCs(ctx, activeSectorId, player) {
        for (const key in this.npcs) {
            const npc = this.npcs[key];
            if (npc.sector !== activeSectorId) continue;

            ctx.save();

            // 1. Pulsing Ambient Beacon Rings
            const pulse = (Math.sin(this.animTimer * 3 + npc.x) + 1) * 0.5;
            ctx.strokeStyle = npc.color;
            ctx.lineWidth = 1.2;
            ctx.globalAlpha = 0.3 + pulse * 0.3;
            ctx.beginPath();
            ctx.arc(npc.x, npc.y, npc.radius + 8 + pulse * 8, 0, Math.PI * 2);
            ctx.stroke();

            // 2. Base Character Node Body
            ctx.globalAlpha = 0.95;
            ctx.fillStyle = 'rgba(6, 16, 32, 0.96)';
            ctx.beginPath();
            ctx.arc(npc.x, npc.y, npc.radius, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = npc.color;
            ctx.lineWidth = 2.5;
            ctx.shadowColor = npc.color;
            ctx.shadowBlur = 12;
            ctx.stroke();
            ctx.shadowBlur = 0;

            // 3. Mini Avatar Glyph in World
            this.renderWorldGlyph(ctx, npc.id, npc.x, npc.y, npc.radius, npc.color);

            // 4. Floating Header Badge (Clean modern typography)
            const FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.font = `bold 11px ${FONT_SANS}`;
            ctx.textAlign = 'center';
            ctx.fillText(npc.name, npc.x, npc.y - npc.radius - 18);

            ctx.fillStyle = npc.color;
            ctx.font = `600 10px ${FONT_SANS}`;
            ctx.fillText(npc.title, npc.x, npc.y - npc.radius - 6);

            // 5. Proximity Interaction Prompt [E] TALK
            if (player) {
                const dx = player.x - npc.x;
                const dy = player.y - npc.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist <= npc.interactionRadius) {
                    ctx.fillStyle = '#fbbf24';
                    ctx.font = `bold 12px ${FONT_SANS}`;
                    ctx.shadowColor = 'rgba(251, 191, 36, 0.5)';
                    ctx.shadowBlur = 8;
                    ctx.fillText('[E] TALK // DISCUSS PROTOCOL', npc.x, npc.y + npc.radius + 20);
                    ctx.shadowBlur = 0;
                }
            }

            ctx.restore();
        }
    }

    renderWorldGlyph(ctx, npcId, x, y, r, color) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 1.8;

        if (npcId === 'AGENT_ARP') {
            // Hexagon Eye Scanner
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI) / 3;
                const gx = x + (r * 0.55) * Math.cos(angle);
                const gy = y + (r * 0.55) * Math.sin(angle);
                if (i === 0) ctx.moveTo(gx, gy);
                else ctx.lineTo(gx, gy);
            }
            ctx.closePath();
            ctx.stroke();

            // Pupil dot
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        } else if (npcId === 'WANDERER_IP') {
            // Radio Antenna Tower & Waves
            ctx.beginPath();
            ctx.moveTo(x, y + 8);
            ctx.lineTo(x, y - 6);
            ctx.stroke();

            // Top beacon dot
            ctx.beginPath();
            ctx.arc(x, y - 6, 2.5, 0, Math.PI * 2);
            ctx.fill();

            // Radiating arcs
            ctx.beginPath();
            ctx.arc(x, y - 6, 7, -Math.PI * 0.6, Math.PI * 0.6);
            ctx.stroke();
        } else if (npcId === 'SOCKET_DAEMON') {
            // UNIX Daemon Horns / Trident Fork
            ctx.beginPath();
            ctx.moveTo(x - 7, y + 6);
            ctx.lineTo(x - 7, y - 4);
            ctx.lineTo(x - 10, y - 9);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x + 7, y + 6);
            ctx.lineTo(x + 7, y - 4);
            ctx.lineTo(x + 10, y - 9);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x, y + 8);
            ctx.lineTo(x, y - 8);
            ctx.stroke();
        } else if (npcId === 'SEEDER_PRIME') {
            // Mesh Peer Triangle
            ctx.beginPath();
            ctx.arc(x, y - 7, 2.5, 0, Math.PI * 2);
            ctx.arc(x - 7, y + 5, 2.5, 0, Math.PI * 2);
            ctx.arc(x + 7, y + 5, 2.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(x, y - 7);
            ctx.lineTo(x - 7, y + 5);
            ctx.lineTo(x + 7, y + 5);
            ctx.closePath();
            ctx.stroke();
        }
        ctx.restore();
    }

    // ----------------------------------------------------------------------
    // Modal Overlay Dialogue Box Rendering (In Screen Space)
    // ----------------------------------------------------------------------
    render(ctx) {
        if (!this.isOpen) return;

        const npc = this.npcs[this.currentNpcId];
        if (!npc) return;

        const sw = 1280;
        const sh = 720;

        ctx.save();

        const FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

        // 1. Subtle Background Scrim
        ctx.fillStyle = 'rgba(4, 8, 16, 0.75)';
        ctx.fillRect(0, 0, sw, sh);

        // 2. Main Dialogue Box Dimensions (Expanded for comfortable reading)
        const dw = 1040;
        const dh = 260;
        const dx = (sw - dw) / 2;
        const dy = sh - dh - 20;

        // Dialogue Box Container (Clean, Modern Slate-Navy with Rounded Corners)
        ctx.fillStyle = 'rgba(11, 20, 38, 0.98)';
        ctx.strokeStyle = npc.color || '#38bdf8';
        ctx.lineWidth = 2;
        ctx.shadowColor = npc.color || '#38bdf8';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(dx, dy, dw, dh, 10);
        } else {
            ctx.rect(dx, dy, dw, dh);
        }
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Corner Tech Reticles (Clean Accents)
        const cLen = 14;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        // Top Left
        ctx.beginPath(); ctx.moveTo(dx, dy + cLen); ctx.lineTo(dx, dy); ctx.lineTo(dx + cLen, dy); ctx.stroke();
        // Top Right
        ctx.beginPath(); ctx.moveTo(dx + dw - cLen, dy); ctx.lineTo(dx + dw, dy); ctx.lineTo(dx + dw, dy + cLen); ctx.stroke();
        // Bottom Left
        ctx.beginPath(); ctx.moveTo(dx, dy + dh - cLen); ctx.lineTo(dx, dy + dh); ctx.lineTo(dx + cLen, dy + dh); ctx.stroke();
        // Bottom Right
        ctx.beginPath(); ctx.moveTo(dx + dw - cLen, dy + dh); ctx.lineTo(dx + dw, dy + dh); ctx.lineTo(dx + dw, dy + dh - cLen); ctx.stroke();

        // 3. Left Column: Animated Character Portrait Avatar Box
        const portX = dx + 20;
        const portY = dy + 20;
        const portSize = dh - 40; // 220

        ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(portX, portY, portSize, portSize, 8);
        } else {
            ctx.rect(portX, portY, portSize, portSize);
        }
        ctx.fill();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Render Animated Vector Portrait
        this.renderAnimatedPortrait(ctx, npc.id, portX + portSize / 2, portY + portSize / 2, portSize * 0.45, npc.color);

        // 4. Character Header (Clean, Sharp Sans-Serif)
        const contentX = portX + portSize + 24;
        const contentW = dw - portSize - 60;

        ctx.fillStyle = npc.color;
        ctx.font = `bold 18px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.fillText(`⚡ ${npc.name}`, contentX, dy + 32);

        ctx.fillStyle = '#94a3b8';
        ctx.font = `600 12px ${FONT_SANS}`;
        ctx.fillText(`ROLE: ${npc.title} | SECTOR ${npc.sector}`, contentX, dy + 50);

        // Divider Line
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.beginPath();
        ctx.moveTo(contentX, dy + 58);
        ctx.lineTo(dx + dw - 24, dy + 58);
        ctx.stroke();

        // 5. Typewriter Message Body (15px Modern Font, 22px Line Spacing)
        ctx.fillStyle = '#f8fafc';
        ctx.font = `15px ${FONT_SANS}`;
        this.renderWrappedText(ctx, this.displayedText, contentX, dy + 80, contentW, 22);

        // 6. Interactive Choice Buttons
        if (!this.isTyping) {
            if (this.choices.length > 0) {
                const choiceStartY = dy + dh - (this.choices.length * 36 + 14);
                this.choices.forEach((choice, idx) => {
                    const isSelected = idx === this.selectedChoiceIndex;
                    const choiceY = choiceStartY + idx * 36;
                    const choiceH = 32;

                    if (isSelected) {
                        ctx.fillStyle = 'rgba(56, 189, 248, 0.22)';
                        ctx.strokeStyle = '#38bdf8';
                        ctx.lineWidth = 1.6;
                    } else {
                        ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
                        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
                        ctx.lineWidth = 1;
                    }

                    ctx.beginPath();
                    if (ctx.roundRect) {
                        ctx.roundRect(contentX, choiceY, contentW, choiceH, 6);
                    } else {
                        ctx.rect(contentX, choiceY, contentW, choiceH);
                    }
                    ctx.fill();
                    ctx.stroke();

                    // Key badge [1], [2], [3]
                    ctx.fillStyle = '#fbbf24';
                    ctx.font = `bold 13px ${FONT_SANS}`;
                    ctx.fillText(`[${idx + 1}]`, contentX + 12, choiceY + 21);

                    // Choice text
                    ctx.fillStyle = isSelected ? '#ffffff' : '#cbd5e1';
                    ctx.font = `600 13px ${FONT_SANS}`;
                    ctx.fillText(choice.label, contentX + 44, choiceY + 21);
                });
            } else {
                // Concluding node prompt
                ctx.fillStyle = '#fbbf24';
                ctx.font = `bold 13px ${FONT_SANS}`;
                ctx.fillText('[SPACE / E / CLICK] Acknowledge & Close Transmission', contentX, dy + dh - 18);
            }
        } else {
            // Typing prompt hint
            ctx.fillStyle = '#94a3b8';
            ctx.font = `12px ${FONT_SANS}`;
            ctx.fillText('▶ Transmitting... Press [SPACE] or [E] to reveal full text.', contentX, dy + dh - 14);
        }

        ctx.restore();
    }

    renderAnimatedPortrait(ctx, npcId, cx, cy, r, color) {
        ctx.save();

        if (npcId === 'AGENT_ARP') {
            // 1. AGENT ARP PORTRAIT: Holographic Spy Visor with scanning radar line & MAC hex streams
            const scanAngle = this.portraitAnim * 1.5;

            // Outer Octagon Ring
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let i = 0; i < 8; i++) {
                const a = (i * Math.PI) / 4;
                const px = cx + r * Math.cos(a);
                const py = cy + r * Math.sin(a);
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.stroke();

            // Concentric Radar Rings
            ctx.strokeStyle = 'rgba(0, 255, 204, 0.3)';
            ctx.beginPath(); ctx.arc(cx, cy, r * 0.65, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.arc(cx, cy, r * 0.35, 0, Math.PI * 2); ctx.stroke();

            // Sweeping Radar Line
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + r * Math.cos(scanAngle), cy + r * Math.sin(scanAngle));
            ctx.stroke();

            // Target Eyeball
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(cx, cy, 6, 0, Math.PI * 2);
            ctx.fill();

            // Streaming MAC Address Snippets
            ctx.fillStyle = 'rgba(0, 255, 204, 0.7)';
            ctx.font = 'bold 9px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('FF:FF:FF:FF:FF:FF', cx, cy - r - 6);
            ctx.fillText('IP -> MAC RESOLVE', cx, cy + r + 14);

        } else if (npcId === 'WANDERER_IP') {
            // 2. WANDERER IP PORTRAIT: Mobile Node with concentric wireless propagation arcs
            const wave1 = (this.portraitAnim * 0.8) % 1.0;
            const wave2 = (this.portraitAnim * 0.8 + 0.5) % 1.0;

            // Central Node Chassis
            ctx.fillStyle = 'rgba(255, 215, 0, 0.2)';
            ctx.beginPath();
            ctx.arc(cx, cy, r * 0.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // Roaming Satellite Dot
            const satAngle = this.portraitAnim * 2;
            const satDist = r * 0.75;
            const sx = cx + satDist * Math.cos(satAngle);
            const sy = cy + satDist * Math.sin(satAngle);
            ctx.fillStyle = '#00ffff';
            ctx.beginPath();
            ctx.arc(sx, sy, 5, 0, Math.PI * 2);
            ctx.fill();

            // Concentric Propagation Arcs
            [wave1, wave2].forEach(prog => {
                ctx.strokeStyle = color;
                ctx.globalAlpha = 1.0 - prog;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(cx, cy, r * 0.4 + prog * r * 0.6, 0, Math.PI * 2);
                ctx.stroke();
            });
            ctx.globalAlpha = 1.0;

            // Antenna Spike
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx, cy - r * 0.8);
            ctx.stroke();

            ctx.fillStyle = color;
            ctx.font = 'bold 9px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('HA -> FA TUNNEL', cx, cy + r + 14);

        } else if (npcId === 'SOCKET_DAEMON') {
            // 3. SOCKET DAEMON PORTRAIT: Mystical UNIX Daemon Horns & POSIX trident socket pins
            const bob = Math.sin(this.portraitAnim * 2) * 4;

            // Silhouette Head
            ctx.fillStyle = 'rgba(192, 132, 252, 0.25)';
            ctx.beginPath();
            ctx.arc(cx, cy + bob, r * 0.55, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // Glowing Daemon Horns
            ctx.strokeStyle = '#ff00aa';
            ctx.lineWidth = 3;
            // Left Horn
            ctx.beginPath();
            ctx.moveTo(cx - r * 0.3, cy - r * 0.3 + bob);
            ctx.quadraticCurveTo(cx - r * 0.7, cy - r * 0.8 + bob, cx - r * 0.4, cy - r * 1.1 + bob);
            ctx.stroke();
            // Right Horn
            ctx.beginPath();
            ctx.moveTo(cx + r * 0.3, cy - r * 0.3 + bob);
            ctx.quadraticCurveTo(cx + r * 0.7, cy - r * 0.8 + bob, cx + r * 0.4, cy - r * 1.1 + bob);
            ctx.stroke();

            // Eyes
            ctx.fillStyle = '#ff00aa';
            ctx.beginPath();
            ctx.arc(cx - 10, cy - 2 + bob, 3, 0, Math.PI * 2);
            ctx.arc(cx + 10, cy - 2 + bob, 3, 0, Math.PI * 2);
            ctx.fill();

            // Socket descriptors labels
            ctx.fillStyle = color;
            ctx.font = 'bold 9px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('socket() -> accept()', cx, cy + r + 14);

        } else if (npcId === 'SEEDER_PRIME') {
            // 4. SEEDER PRIME PORTRAIT: P2P BitTorrent Swarm Constellation
            const rot = this.portraitAnim * 0.8;

            // Center Peer
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(cx, cy, 9, 0, Math.PI * 2);
            ctx.fill();

            // Orbiting Swarm Peers
            const peerCount = 5;
            for (let i = 0; i < peerCount; i++) {
                const a = rot + (i * Math.PI * 2) / peerCount;
                const px = cx + r * 0.7 * Math.cos(a);
                const py = cy + r * 0.7 * Math.sin(a);

                // Connector line
                ctx.strokeStyle = 'rgba(0, 255, 136, 0.4)';
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.lineTo(px, py);
                ctx.stroke();

                // Orbiting node
                ctx.fillStyle = i % 2 === 0 ? '#00ff88' : '#00e5ff';
                ctx.beginPath();
                ctx.arc(px, py, 4, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.fillStyle = color;
            ctx.font = 'bold 9px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('RAREST-FIRST // TIT-FOR-TAT', cx, cy + r + 14);
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
const dialogueSystemInstance = new DialogueSystem();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.DialogueSystem = dialogueSystemInstance;
    window.DialogueSystem = dialogueSystemInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DialogueSystem, dialogueSystemInstance };
}
