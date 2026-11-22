# Module 3 Topics (15 - 21)
mod3_topics = [
    {
        "id": "m3_framing_stuffing",
        "number": 15,
        "module": 3,
        "moduleTitle": "MODULE 3: DATA LINK LAYER",
        "title": "Framing Methods: Character/Byte Stuffing (DLE) & HDLC Bit Stuffing",
        "badge": "CORE FORMULA",
        "ktuRef": "Syllabus Mod 3 Part A // Framing, Character Stuffing, Bit Stuffing (Part A 3M / Part B 9M)",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Delimiting Raw Bit Streams into Discrete Frames",
                "storyline": "Unit 0xVOID arrives inside Sector 2: The Frame Matrix. At Layer 2, a continuous stream of physical bits is incomprehensible. The Data Link Layer must assemble bits into discrete units called Frames, delimited by recognizable flags.",
                "theory": """
                    <p>To allow the receiver to identify where each frame begins and ends, framing protocols insert special delimiter sequences. If payload data accidentally contains these flag patterns, framing mechanisms preserve data transparency:</p>
                    <ul>
                        <li><strong>Byte/Character Stuffing:</strong> Uses a 1-byte flag (e.g., ASCII DLE STX start, DLE ETX end). If DLE appears inside the data, the sender inserts an escape DLE byte immediately before it. The receiver strips the first DLE.</li>
                        <li><strong>Bit Stuffing (HDLC):</strong> Frame delimiter is strictly <strong>01111110</strong> (six consecutive 1s). The sender scans the payload; whenever it detects <em>five consecutive 1s</em>, it automatically stuffs a <strong>0</strong> bit immediately after, regardless of what follows!</li>
                    </ul>
                    <p>At the receiver, whenever five consecutive 1s are followed by a 0, the receiver unstuffs (discards) the 0. If five 1s are followed by a 1, it inspects the next bit: a 0 indicates the end of frame flag; a 1 indicates an error.</p>
                """,
                "keywords": ["Framing", "HDLC", "Flag (01111110)", "Bit Stuffing", "Byte Stuffing (DLE)", "Character De-stuffing", "Data Transparency"]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Bit Stuffing Mechanism for Sequence: 01111110111110",
                "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
                    <text x="30" y="35" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="#0f172a">1. ORIGINAL PAYLOAD DATA:</text>
                    <g transform="translate(30, 50)" font-family="monospace" font-size="15" font-weight="700">
                        <rect x="0" y="0" width="340" height="35" fill="#f1f5f9" stroke="#94a3b8" rx="4"/>
                        <text x="15" y="24" fill="#334155">0 1 1 1 1 1 1 0 1 1 1 1 1 0</text>
                    </g>
                    <g transform="translate(190, 95)">
                        <line x1="0" y1="0" x2="0" y2="20" stroke="#0ea5e9" stroke-width="2.5"/><polygon points="-5,18 0,26 5,18" fill="#0ea5e9"/>
                        <text x="15" y="16" font-family="-apple-system, sans-serif" font-size="11" font-weight="600" fill="#0284c7">Rule: After five consecutive 1s, stuff a '0' bit!</text>
                    </g>
                    <text x="30" y="145" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="#15803d">2. TRANSMITTED FRAME (STUFFED):</text>
                    <g transform="translate(30, 158)" font-family="monospace" font-size="14" font-weight="700">
                        <rect x="0" y="0" width="110" height="35" fill="#e0e7ff" stroke="#6366f1" rx="4"/><text x="10" y="23" fill="#4338ca">01111110</text>
                        <rect x="115" y="0" width="370" height="35" fill="#ffffff" stroke="#94a3b8" rx="4"/>
                        <text x="125" y="23" fill="#0f172a">0 1 1 1 1 1 <tspan fill="#dc2626" font-weight="900">[0]</tspan> 1 0 1 1 1 1 1 <tspan fill="#dc2626" font-weight="900">[0]</tspan> 0</text>
                        <rect x="490" y="0" width="110" height="35" fill="#e0e7ff" stroke="#6366f1" rx="4"/><text x="500" y="23" fill="#4338ca">01111110</text>
                    </g>
                </svg>""",
                "formulas": """<div class="academic-callout">
                    <h4>KTU Valuation Standard: Bit Stuffing Rule</h4>
                    <ul>
                        <li><strong>Rule:</strong> The transmitter inserts a '0' bit after ANY five consecutive '1's, even if the next bit was already a '0'!</li>
                        <li><strong>De-stuffing:</strong> Receiver checks 5 ones: if 6th bit is 0, it removes it. If 6th is 1 and 7th is 0, it is the Flag. If 6th and 7th are both 1, it is an abort.</li>
                    </ul>
                </div>""",
                "examTip": "A classic KTU exam trick gives data ending in five 1s followed by a 0. Students often forget to stuff an extra 0. Always insert the stuffed 0 after five consecutive 1s!",
                "p3_sub": "Navigate the Bit Stuffing Corridor in Sector 2",
                "missionIntro": "Navigate through the Bit Stuffing obstacle corridor in Sector 2:",
                "objectives": [
                    "Enter Sector 2 (The Frame Matrix).",
                    "Traverse the Bit Stuffing Corridor where bits are checked dynamically.",
                    "Dodge corrupted delimiter flags and observe proper frame encapsulation!"
                ],
                "actionText": "🎮 Start Mission: Run the Bit Stuffing Corridor [Space]"
            }
        ]
    },

    {
        "id": "m3_crc_modulo2",
        "number": 16,
        "module": 3,
        "moduleTitle": "MODULE 3: DATA LINK LAYER",
        "title": "Error Detection: CRC Calculation & Modulo-2 Polynomial Division",
        "badge": "NUMERICAL",
        "ktuRef": "Official Model Paper Q13a // 9 Marks // CRC Modulo-2 Division & FCS",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Cyclic Redundancy Check (CRC) Polynomial Division",
                "storyline": "Transmission lines are imperfect. Noise can flip bits during propagation. Unit 0xVOID arrives at the Frame Check Sequence (FCS) terminal. Before a receiver accepts a frame, it must verify its mathematical integrity via CRC.",
                "theory": """
                    <p>Cyclic Redundancy Check (CRC) is an algebraic error-detecting code based on binary polynomial division using <strong>Modulo-2 Arithmetic</strong> (XOR operation without carry or borrow):</p>
                    <ul>
                        <li>Sender and receiver agree beforehand on a <strong>Generator Polynomial $G(X)$</strong> of degree $r$ (e.g., CRC-16, CRC-32).</li>
                        <li>The sender appends $r$ zero bits to the payload message $M(X)$.</li>
                        <li>The extended message is divided by the generator polynomial using Modulo-2 division.</li>
                        <li>The remainder of degree $r-1$, called the <strong>Frame Check Sequence (FCS)</strong>, replaces the appended zeros.</li>
                        <li>The receiver divides the received frame by $G(X)$. If remainder is all <strong>0s</strong>, the frame is error-free; otherwise, it is dropped.</li>
                    </ul>
                """,
                "keywords": ["Cyclic Redundancy Check (CRC)", "Modulo-2 Division (XOR)", "Generator Polynomial G(X)", "Frame Check Sequence (FCS)", "Burst Error Detection"]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Step-by-Step Modulo-2 Division Example",
                "svg": """<svg viewBox="0 0 760 220" width="100%" height="220" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="220" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
                    <g transform="translate(30, 20)" font-family="monospace" font-size="13">
                        <text x="0" y="20" fill="#0f172a" font-weight="700">Data = 100100, Generator G(X) = 1101 (Degree r = 3, Append 3 zeros -> 100100000)</text>
                        <text x="0" y="50" fill="#475569">         1101 ) 100100000 ( 111010  [Quotient discarded]</text>
                        <text x="0" y="70" fill="#2563eb">                1101</text>
                        <text x="0" y="90" fill="#475569">                ----</text>
                        <text x="0" y="110" fill="#0f172a">                 1000</text>
                        <text x="0" y="130" fill="#2563eb">                 1101</text>
                        <text x="0" y="150" fill="#475569">                 ----</text>
                        <text x="0" y="170" fill="#0f172a">                  1010 ...</text>
                        <text x="0" y="195" fill="#15803d" font-weight="700">Final Remainder (FCS) = 001  ==> Transmitted Frame = 100100 [001]</text>
                    </g>
                </svg>""",
                "formulas": """<div class="academic-callout">
                    <h4>Modulo-2 Rules & Properties of CRC</h4>
                    <div class="formula-line">$$0 \\oplus 0 = 0, \\quad 0 \\oplus 1 = 1, \\quad 1 \\oplus 0 = 1, \\quad 1 \\oplus 1 = 0$$</div>
                    <ul>
                        <li>If $G(X)$ has at least two terms and coefficient of $X^0$ is 1, CRC catches all single-bit errors.</li>
                        <li>Catches all double-bit errors and odd-numbered bit errors if $G(X)$ contains factor $(X + 1)$.</li>
                        <li>Catches all burst errors of length $\\le r$ bits.</li>
                    </ul>
                </div>""",
                "examTip": "A common mistake in KTU exams is performing normal binary subtraction instead of XOR. In Modulo-2 arithmetic, 1 - 1 = 0 and 0 - 1 = 1 (no borrow!).",
                "p3_sub": "Defeat the Corrupt Frame Intruder via CRC Blast",
                "missionIntro": "Use CRC calculations to neutralize corrupt frames in Sector 2:",
                "objectives": [
                    "Approach the CRC Verification Console at x: 420 in Sector 2.",
                    "Solve the Modulo-2 remainder for the incoming noisy packet.",
                    "Verify the Frame Check Sequence to purge corrupted frames!"
                ],
                "actionText": "🎮 Start Mission: Execute CRC Verification Drill [Space]"
            }
        ]
    },

    {
        "id": "m3_csma_persistence",
        "number": 17,
        "module": 3,
        "moduleTitle": "MODULE 3: DATA LINK LAYER",
        "title": "MAC Access: ALOHA & CSMA Persistence Modes (1-P, Non-P, p-P) & CSMA/CD",
        "badge": "MUST-KNOW 9M",
        "ktuRef": "Syllabus Mod 3 Part A // Random Access, CSMA Persistence, CSMA/CD 64B Frame (9 Marks)",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Coordinating Broadcast Medium Access Without Collisions",
                "storyline": "Unit 0xVOID enters the Shared Ethernet Bus. Multiple hosts share a single coaxial cable. If two stations transmit simultaneously, electrical signals collide and corrupt each other.",
                "theory": """
                    <p>Random access protocols coordinate channel sharing across broadcast media:</p>
                    <ul>
                        <li><strong>Pure ALOHA vs Slotted ALOHA:</strong> Pure ALOHA transmits whenever ready ($S = G e^{-2G}$, max $18.4\\%$ throughput). Slotted ALOHA restricts transmissions to discrete time slots ($S = G e^{-G}$, max $36.8\\%$ throughput).</li>
                        <li><strong>CSMA Persistence Strategies (Carrier Sense):</strong>
                            <ul>
                                <li><strong>1-Persistent CSMA:</strong> If channel is idle, transmit immediately (probability 1). If busy, listen continuously. High collision probability when two stations wait for a transmission to finish.</li>
                                <li><strong>Non-Persistent CSMA:</strong> If idle, transmit. If busy, wait a random amount of time before sensing again. Reduces collisions, but introduces idle channel waste.</li>
                                <li><strong>p-Persistent CSMA (Slotted):</strong> If idle, transmit with probability $p$; wait until next slot with probability $1-p$. Balances collision risk and throughput.</li>
                            </ul>
                        </li>
                        <li><strong>CSMA/CD (Collision Detection):</strong> Stations abort transmission upon detecting collision, broadcast a 32-bit jam signal, and wait $R \\times 2\\tau$ using binary exponential backoff. Enforces minimum frame size ($T_{\\text{trans}} \\ge 2 T_{\\text{prop}}$).</li>
                    </ul>
                """,
                "keywords": ["Pure ALOHA", "Slotted ALOHA", "1-Persistent CSMA", "Non-Persistent CSMA", "p-Persistent CSMA", "CSMA/CD", "Collision Window (2τ)", "64-Byte Minimum Frame"]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "CSMA Persistence Flowchart & Worst-Case Collision Window",
                "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
                    <g transform="translate(30, 25)">
                        <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">CSMA Persistence Comparison:</text>
                        <rect x="0" y="30" width="220" height="40" rx="4" fill="#fee2e2" stroke="#dc2626"/>
                        <text x="110" y="54" text-anchor="middle" font-size="11" font-weight="700" fill="#991b1b">1-Persistent: Transmit (P=1)</text>
                        <rect x="0" y="75" width="220" height="40" rx="4" fill="#fef3c7" stroke="#d97706"/>
                        <text x="110" y="99" text-anchor="middle" font-size="11" font-weight="700" fill="#92400e">Non-Persistent: Random wait</text>
                        <rect x="0" y="120" width="220" height="40" rx="4" fill="#dcfce7" stroke="#16a34a"/>
                        <text x="110" y="144" text-anchor="middle" font-size="11" font-weight="700" fill="#166534">p-Persistent: Transmit with prob p</text>
                    </g>
                    <g transform="translate(280, 25)">
                        <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">Worst-Case Collision Window = 2 · T_prop:</text>
                        <line x1="20" y1="80" x2="420" y2="80" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
                        <rect x="30" y="100" width="80" height="36" rx="4" fill="#eff6ff" stroke="#2563eb"/><text x="70" y="122" text-anchor="middle" font-size="10.5" font-weight="700" fill="#1e40af">Station A</text>
                        <rect x="330" y="100" width="80" height="36" rx="4" fill="#fef2f2" stroke="#dc2626"/><text x="370" y="122" text-anchor="middle" font-size="10.5" font-weight="700" fill="#991b1b">Station B</text>
                        <circle cx="310" cy="80" r="12" fill="#f59e0b"/><text x="310" y="84" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff">💥</text>
                        <text x="220" y="160" text-anchor="middle" font-size="11" font-weight="600" fill="#334155">Min Frame Size = 2 · T_prop · Bandwidth = 512 bits (64 Bytes)</text>
                    </g>
                </svg>""",
                "formulas": """<div class="academic-callout">
                    <h4>Throughput Equations for KTU Valuations</h4>
                    <p><strong>Pure ALOHA:</strong> $S = G e^{-2G}$ (Maximum throughput is $18.4\\%$ at $G = 0.5$).</p>
                    <p><strong>Slotted ALOHA:</strong> $S = G e^{-G}$ (Maximum throughput is $36.8\\%$ at $G = 1.0$).</p>
                    <div class="formula-line">$$T_{\\text{frame}} \\ge 2 \\times T_{\\text{prop}} \\implies \\text{Frame Size} \\ge 2 \\times \\frac{\\text{Distance}}{v} \\times \\text{Bandwidth}$$</div>
                </div>""",
                "examTip": "A guaranteed 9-mark numerical: 'Why is standard Ethernet minimum frame size 64 bytes?' Show the calculation using bus length 2500m and speed 200,000 km/s.",
                "p3_sub": "Dodge Collision Waves on the Shared Bus Hazard",
                "missionIntro": "Survive the Collision Bus Hazard in Sector 2:",
                "objectives": [
                    "Step onto the central Ethernet Bus conduit.",
                    "Watch for incoming collision wave pulses traveling down the line.",
                    "Time your movement between carrier sense idle periods to cross safely!"
                ],
                "actionText": "🎮 Start Mission: Cross the Collision Bus Hazard [Space]"
            }
        ]
    },

    {
        "id": "m3_ethernet_10base",
        "number": 18,
        "module": 3,
        "moduleTitle": "MODULE 3: DATA LINK LAYER",
        "title": "Ethernet Frames (IEEE 802.3) & 10Base Variants (10Base5, 2, T, F)",
        "badge": "MUST-KNOW 9M",
        "ktuRef": "Official Model Paper Q13a Choice B // 9 Marks // 10Base Variants Comparison",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Ethernet Frame Format & Physical Media Implementations",
                "storyline": "Unit 0xVOID inspects legacy and modern Ethernet topologies. IEEE 802.3 evolved from cumbersome coaxial thicknet cables to flexible twisted pair and gigabit fiber.",
                "theory": """
                    <p>Standard IEEE 802.3 Ethernet defines both MAC framing and physical media standards:</p>
                    <ul>
                        <li><strong>Ethernet Frame Structure:</strong>
                            <ul>
                                <li>Preamble (7 Bytes) + SFD Start Frame Delimiter (1 Byte: <code>10101011</code>)</li>
                                <li>Destination MAC Address (6 Bytes) + Source MAC Address (6 Bytes)</li>
                                <li>Type / Length (2 Bytes: length if $\\le 1500$, EtherType if $\\ge 1536$, e.g. <code>0x0800</code> for IPv4)</li>
                                <li>Payload (46 to 1500 Bytes: padded to 46 if data is smaller)</li>
                                <li>FCS Frame Check Sequence (4 Bytes CRC-32)</li>
                            </ul>
                        </li>
                        <li><strong>The 10Base Physical Variants Comparison:</strong>
                            <ul>
                                <li><strong>10Base5 (Thicknet):</strong> RG-8 thick coaxial cable, 500m maximum segment, bus topology, vampire taps with AUI transceivers, $50\\Omega$ terminators.</li>
                                <li><strong>10Base2 (Thinnet / CheaperNet):</strong> RG-58 thin coaxial cable, 185m maximum segment, bus topology, BNC T-connectors directly on NIC.</li>
                                <li><strong>10Base-T:</strong> Category 3/5 Unshielded Twisted Pair (UTP), 100m maximum segment, star topology with central Hub or Switch, RJ-45 modular connectors.</li>
                                <li><strong>10Base-F:</strong> 850nm Multimode Optical Fiber, 2000m maximum segment, point-to-point star, 100% immune to electromagnetic noise.</li>
                            </ul>
                        </li>
                    </ul>
                """,
                "keywords": ["IEEE 802.3 Ethernet", "Preamble & SFD", "48-bit MAC Address", "EtherType", "10Base5 (Thicknet)", "10Base2 (Thinnet)", "10Base-T", "10Base-F", "Vampire Tap", "BNC Connector"]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Standard Ethernet Frame Format & 10Base Comparison Table",
                "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
                    <g transform="translate(30, 20)">
                        <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">IEEE 802.3 Ethernet Frame Layout (Min 64B, Max 1518B):</text>
                        <rect x="0" y="25" width="70" height="30" rx="3" fill="#e2e8f0" stroke="#94a3b8"/><text x="35" y="44" text-anchor="middle" font-size="9.5" fill="#475569">Pre (7B)</text>
                        <rect x="70" y="25" width="40" height="30" rx="3" fill="#cbd5e1" stroke="#94a3b8"/><text x="90" y="44" text-anchor="middle" font-size="9" fill="#1e293b">SFD (1)</text>
                        <rect x="110" y="25" width="90" height="30" rx="3" fill="#dbeafe" stroke="#2563eb"/><text x="155" y="44" text-anchor="middle" font-size="10" font-weight="700" fill="#1e40af">Dest MAC (6B)</text>
                        <rect x="200" y="25" width="90" height="30" rx="3" fill="#dbeafe" stroke="#2563eb"/><text x="245" y="44" text-anchor="middle" font-size="10" font-weight="700" fill="#1e40af">Src MAC (6B)</text>
                        <rect x="290" y="25" width="60" height="30" rx="3" fill="#ede9fe" stroke="#7c3aed"/><text x="320" y="44" text-anchor="middle" font-size="9.5" fill="#5b21b6">Type (2)</text>
                        <rect x="350" y="25" width="280" height="30" rx="3" fill="#dcfce7" stroke="#16a34a"/><text x="490" y="44" text-anchor="middle" font-size="10.5" font-weight="700" fill="#15803d">Payload (Data + Padding: 46 - 1500 Bytes)</text>
                        <rect x="630" y="25" width="70" height="30" rx="3" fill="#fee2e2" stroke="#dc2626"/><text x="665" y="44" text-anchor="middle" font-size="10" font-weight="700" fill="#991b1b">FCS (4B)</text>
                    </g>
                    <g transform="translate(30, 80)">
                        <rect x="0" y="0" width="700" height="110" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
                        <text x="15" y="22" font-family="-apple-system, sans-serif" font-size="11.5" font-weight="700" fill="#0f172a">10Base Physical Standards Comparison Matrix:</text>
                        <text x="15" y="45" font-family="monospace" font-size="11" fill="#1e40af">• 10Base5: 10 Mbps | Baseband | 500m max | RG-8 Coax (Thicknet) | Vampire Tap</text>
                        <text x="15" y="65" font-family="monospace" font-size="11" fill="#1e40af">• 10Base2: 10 Mbps | Baseband | 185m max | RG-58 Coax (Thinnet)  | BNC T-Connector</text>
                        <text x="15" y="85" font-family="monospace" font-size="11" fill="#15803d">• 10Base-T: 10 Mbps | Baseband | 100m max | Cat3/5 UTP (Twisted)  | RJ-45 (Star Topology)</text>
                        <text x="15" y="102" font-family="monospace" font-size="11" fill="#0284c7">• 10Base-F: 10 Mbps | Baseband | 2000m max| Fiber Optic Pair       | ST/SC Connectors</text>
                    </g>
                </svg>""",
                "formulas": """<div class="academic-callout">
                    <h4>Nomenclature Breakdown: '10-Base-T'</h4>
                    <p><strong>10:</strong> Data rate in Megabits per second (10 Mbps).</p>
                    <p><strong>Base:</strong> Baseband digital signaling (entire bandwidth allocated to single digital signal).</p>
                    <p><strong>5 / 2 / T / F:</strong> Maximum segment length (500m, 185m $\\approx$ 200m), T = Twisted Pair, F = Fiber.</p>
                </div>""",
                "examTip": "In KTU Part B, draw the 10Base comparison table covering Cable Type, Max Segment Length, Topology, and Connector type.",
                "p3_sub": "Inspect 10Base Topologies in Sector 2",
                "missionIntro": "Experience different physical link segments in Sector 2:",
                "objectives": [
                    "Compare thick coaxial segments with star-wired twisted pair connections.",
                    "Verify minimum frame size padding on undersized frames."
                ],
                "actionText": "🎮 Start Mission: Study Ethernet 10Base Standards [Space]"
            }
        ]
    },

    {
        "id": "m3_connecting_devices",
        "number": 19,
        "module": 3,
        "moduleTitle": "MODULE 3: DATA LINK LAYER",
        "title": "Connecting Devices: Hub (L1) vs Switch/Bridge (L2 MAC Learning) vs Router (L3)",
        "badge": "MUST-KNOW 9M",
        "ktuRef": "Official Model Paper Q13a Choice B // 9 Marks // Hub vs Switch vs Router",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Collision Domains, Broadcast Domains & Device Architecture",
                "storyline": "Unit 0xVOID arrives at the interconnect switching core. Understanding how repeaters, switches, and routers segment network traffic is essential to overcoming transmission congestion.",
                "theory": """
                    <p>Network devices operate at specific OSI layers and define distinct traffic isolation boundaries:</p>
                    <ul>
                        <li><strong>Hub / Repeater (Layer 1 - Physical):</strong> Operates on electrical bits. When a frame arrives, the hub blindly retransmits it out of <em>all other ports</em>. <strong>Single Collision Domain, Single Broadcast Domain</strong>. Hosts share bandwidth ($10\\text{ Mbps} / N$). Prone to collisions.</li>
                        <li><strong>Switch / Transparent Bridge (Layer 2 - Data Link):</strong> Operates on Ethernet frames. Inspects the <em>Source MAC address</em> to build a dynamic MAC learning table: <code>[MAC -> Port, TTL]</code>. Forwards frames only to the port where the destination MAC resides (microsegmentation). Floods unknown unicast frames. <strong>Each Port is an Isolated Collision Domain; Single Shared Broadcast Domain</strong>.</li>
                        <li><strong>Router (Layer 3 - Network):</strong> Operates on IP packets. Uses a routing table and routing protocols (OSPF, BGP) to forward packets based on logical IP destination addresses. <strong>Breaks BOTH Collision Domains and Broadcast Domains</strong>.</li>
                    </ul>
                """,
                "keywords": ["Connecting Devices", "Hub (Layer 1)", "Switch / Bridge (Layer 2)", "Router (Layer 3)", "Collision Domain", "Broadcast Domain", "MAC Learning Table", "Microsegmentation"]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Domain Segmentation Across Hubs, Switches, and Routers",
                "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
                    <g transform="translate(30, 20)">
                        <rect x="0" y="25" width="210" height="150" rx="6" fill="#fee2e2" stroke="#dc2626"/>
                        <text x="105" y="48" text-anchor="middle" font-size="12" font-weight="700" fill="#991b1b">HUB (Layer 1)</text>
                        <text x="15" y="80" font-size="11" fill="#334155">• 1 Collision Domain</text>
                        <text x="15" y="105" font-size="11" fill="#334155">• 1 Broadcast Domain</text>
                        <text x="15" y="130" font-size="11" fill="#334155">• Shared Bandwidth</text>
                        <text x="15" y="155" font-size="10.5" fill="#dc2626">• Blind Flooding</text>
                    </g>
                    <g transform="translate(275, 20)">
                        <rect x="0" y="25" width="210" height="150" rx="6" fill="#dbeafe" stroke="#2563eb"/>
                        <text x="105" y="48" text-anchor="middle" font-size="12" font-weight="700" fill="#1e40af">SWITCH (Layer 2)</text>
                        <text x="15" y="80" font-size="11" font-weight="700" fill="#15803d">• N Collision Domains</text>
                        <text x="15" y="105" font-size="11" fill="#334155">• 1 Broadcast Domain</text>
                        <text x="15" y="130" font-size="11" fill="#334155">• Dedicated Bandwidth</text>
                        <text x="15" y="155" font-size="10.5" fill="#1e40af">• MAC Address Learning</text>
                    </g>
                    <g transform="translate(520, 20)">
                        <rect x="0" y="25" width="210" height="150" rx="6" fill="#dcfce7" stroke="#16a34a"/>
                        <text x="105" y="48" text-anchor="middle" font-size="12" font-weight="700" fill="#166534">ROUTER (Layer 3)</text>
                        <text x="15" y="80" font-size="11" font-weight="700" fill="#15803d">• N Collision Domains</text>
                        <text x="15" y="105" font-size="11" font-weight="700" fill="#15803d">• N Broadcast Domains!</text>
                        <text x="15" y="130" font-size="11" fill="#334155">• Subnet Isolation</text>
                        <text x="15" y="155" font-size="10.5" fill="#15803d">• IP Routing Tables</text>
                    </g>
                </svg>""",
                "formulas": """<div class="academic-callout">
                    <h4>Connecting Devices Summary Matrix</h4>
                    <p><strong>Hub (L1):</strong> Collision Domains: 1 | Broadcast Domains: 1 | Forwarding: Blind repeat</p>
                    <p><strong>Switch (L2):</strong> Collision Domains: Per Port ($N$) | Broadcast Domains: 1 | Forwarding: MAC table</p>
                    <p><strong>Router (L3):</strong> Collision Domains: Per Port ($N$) | Broadcast Domains: Per Port ($N$) | Forwarding: IP table</p>
                </div>""",
                "examTip": "Examiners award full marks when you explicitly draw separate boundary circles showing collision domains vs broadcast domains.",
                "p3_sub": "Solve Switch Learning Terminal in Sector 2",
                "missionIntro": "Calibrate the transparent switch in Sector 2:",
                "objectives": [
                    "Open the Switch Learning minigame at the exit of Sector 2.",
                    "Inspect incoming frames and map source MACs to switch ports."
                ],
                "actionText": "🎮 Start Mission: Execute Switch Learning Drill [Space]"
            }
        ]
    },

    {
        "id": "m3_mobile_ip",
        "number": 20,
        "module": 3,
        "moduleTitle": "MODULE 3: DATA LINK & NETWORK",
        "title": "Mobile IP Architecture: Home Agent, Foreign Agent, Care-of Address & Tunneling",
        "badge": "MUST-KNOW 9M",
        "ktuRef": "Official Model Paper Q13a / Syllabus Mod 2 // 9 Marks // Mobile IP Architecture",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Seamless Host Mobility Across Subnets Without Dropping Connections",
                "storyline": "Unit 0xVOID encounters an allied wanderer traversing across subnets. In standard IP routing, changing physical networks changes your IP address, dropping active TCP sockets. Mobile IP solves this.",
                "theory": """
                    <p>Mobile IP (RFC 5944) allows a device to maintain continuous connectivity while changing its point of attachment across different subnets:</p>
                    <ul>
                        <li><strong>Mobile Node (MN):</strong> The roaming host that moves between networks. Retains a permanent <strong>Home Address</strong> regardless of location.</li>
                        <li><strong>Home Agent (HA):</strong> A router on the Mobile Node's home network that maintains current location bindings for the MN.</li>
                        <li><strong>Foreign Agent (FA):</strong> A router on the visited foreign network that assists the MN in receiving forwarded packets.</li>
                        <li><strong>Care-of Address (CoA):</strong> A temporary IP address assigned to the MN on the foreign network reflecting its current physical attachment.</li>
                        <li><strong>IP-in-IP Tunneling:</strong> When a correspondent node sends a packet to the MN's Home Address, the Home Agent intercepts it (using Proxy ARP), wraps it in an outer IP datagram addressed to the CoA, and tunnels it to the Foreign Agent. The Foreign Agent strips the outer header and delivers the original packet to the MN.</li>
                        <li><strong>Triangular Routing:</strong> Inefficient route where packets to MN must travel to HA first, but packets from MN go directly to correspondent node. Solved via Route Optimization.</li>
                    </ul>
                """,
                "keywords": ["Mobile IP", "Mobile Node (MN)", "Home Agent (HA)", "Foreign Agent (FA)", "Care-of Address (CoA)", "IP-in-IP Tunneling", "Triangular Routing"]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Mobile IP Triangular Routing & Tunnel Encapsulation Flow",
                "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
                    <g transform="translate(30, 20)">
                        <rect x="20" y="20" width="130" height="50" rx="4" fill="#eff6ff" stroke="#2563eb"/><text x="85" y="45" text-anchor="middle" font-size="11" font-weight="700" fill="#1e40af">Correspondent</text>
                        <rect x="300" y="20" width="140" height="50" rx="4" fill="#1e293b" stroke="#0ea5e9"/><text x="370" y="45" text-anchor="middle" font-size="11" font-weight="700" fill="#38bdf8">Home Agent (HA)</text>
                        <rect x="560" y="20" width="140" height="50" rx="4" fill="#f0fdf4" stroke="#16a34a"/><text x="630" y="45" text-anchor="middle" font-size="11" font-weight="700" fill="#15803d">Foreign Agent (FA)</text>
                        <rect x="580" y="130" width="100" height="40" rx="4" fill="#fef3c7" stroke="#d97706"/><text x="630" y="154" text-anchor="middle" font-size="10.5" font-weight="700" fill="#92400e">Mobile Node</text>
                        <line x1="150" y1="45" x2="300" y2="45" stroke="#2563eb" stroke-width="2"/><polygon points="295,42 302,45 295,48" fill="#2563eb"/>
                        <text x="225" y="38" text-anchor="middle" font-size="9" fill="#1e40af">1. IP to Home Addr</text>
                        <line x1="440" y1="45" x2="560" y2="45" stroke="#0ea5e9" stroke-width="2.5" stroke-dasharray="4"/><polygon points="555,42 562,45 555,48" fill="#0ea5e9"/>
                        <text x="500" y="38" text-anchor="middle" font-size="9" font-weight="700" fill="#0284c7">2. IP Tunnel to CoA</text>
                        <line x1="630" y1="70" x2="630" y2="130" stroke="#16a34a" stroke-width="2"/><polygon points="627,125 630,132 633,125" fill="#16a34a"/>
                        <text x="665" y="105" font-size="9" fill="#15803d">3. Delivery</text>
                        <line x1="580" y1="150" x2="85" y2="70" stroke="#dc2626" stroke-width="2"/><polygon points="88,75 83,68 91,70" fill="#dc2626"/>
                        <text x="330" y="135" text-anchor="middle" font-size="10" font-weight="700" fill="#dc2626">Direct Reverse Path (Triangular Routing!)</text>
                    </g>
                </svg>""",
                "formulas": """<div class="academic-callout">
                    <h4>IP-in-IP Encapsulation Header Format</h4>
                    <p>Outer Header: [Src: Home Agent IP, Dest: Care-of Address (CoA), Protocol: 4 (IP-in-IP)]</p>
                    <p>Inner Header: [Src: Correspondent IP, Dest: Mobile Node Home IP, Payload: Data]</p>
                </div>""",
                "examTip": "Always sketch the triangle: Correspondent -> Home Agent -> Foreign Agent -> Mobile Node, and Mobile Node -> Correspondent directly.",
                "p3_sub": "Encounter Mobile IP Wanderer in Sector 3",
                "missionIntro": "Interact with mobile nodes in Sector 3:",
                "objectives": [
                    "Locate the Mobile IP Wanderer NPC at the Sector 3 perimeter.",
                    "Verify Care-of Address registration with Home Agent."
                ],
                "actionText": "🎮 Start Mission: Consult Mobile IP Wanderer [Space]"
            }
        ]
    },

    {
        "id": "m3_wlan_dlpi",
        "number": 21,
        "module": 3,
        "moduleTitle": "MODULE 3: DATA LINK LAYER",
        "title": "Wireless LAN (IEEE 802.11), CSMA/CA, RTS/CTS & Packet Sockets (DLPI/PF_PACKET)",
        "badge": "CORE CONCEPT",
        "ktuRef": "Syllabus Mod 3 Part B // 802.11 MAC, CSMA/CA, RTS/CTS, DLPI & PF_PACKET (9 Marks)",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Collision Avoidance in Wireless Channels & Raw Packet Sniffing",
                "storyline": "Unit 0xVOID inspects wireless access points and raw packet interfaces. Wireless nodes cannot listen while transmitting because their own signal swamps the receiver. CSMA/CD is impossible; CSMA/CA must be used.",
                "theory": """
                    <p>Wireless networks and raw socket architectures operate with unique constraints:</p>
                    <ul>
                        <li><strong>Why CSMA/CD Fails in Wireless:</strong>
                            <ol>
                                <li>Signal attenuation over air is huge ($1/d^2$ to $1/d^4$); a station's own transmission power overwhelms any incoming collision.</li>
                                <li><strong>Hidden Terminal Problem:</strong> Station A and Station C can both hear Station B, but cannot hear each other. Simultaneous transmissions collide at B!</li>
                            </ol>
                        </li>
                        <li><strong>CSMA/CA (Collision Avoidance):</strong> Uses Inter-Frame Spaces (<strong>SIFS</strong> for ACKs, <strong>DIFS</strong> for data). Stations wait DIFS + random backoff timer.</li>
                        <li><strong>RTS / CTS Handshake:</strong> Sender transmits a short <strong>Request to Send (RTS)</strong> frame specifying duration. Destination replies with <strong>Clear to Send (CTS)</strong> broadcast to all neighbors. Neighbors set their <strong>Network Allocation Vector (NAV)</strong> timer and remain silent!</li>
                        <li><strong>DLPI & PF_PACKET Raw Sockets:</strong>
                            <ul>
                                <li><strong>DLPI (Data Link Provider Interface):</strong> Standard Unix interface allowing applications to communicate directly with Layer 2 data link drivers.</li>
                                <li><strong>PF_PACKET (Linux AF_PACKET):</strong> A socket domain (<code>socket(PF_PACKET, SOCK_RAW, ...)</code>) enabling user-space programs (tcpdump, Wireshark) to bypass IP/TCP protocol stacks and read/write raw Ethernet frames directly from the NIC driver.</li>
                            </ul>
                        </li>
                    </ul>
                """,
                "keywords": ["IEEE 802.11", "CSMA/CA", "Hidden Terminal Problem", "Exposed Terminal", "RTS (Request to Send)", "CTS (Clear to Send)", "NAV (Network Allocation Vector)", "DLPI", "PF_PACKET"]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Hidden Terminal Problem & CSMA/CA RTS/CTS Timeline",
                "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
                    <g transform="translate(30, 20)">
                        <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">The Hidden Terminal Problem:</text>
                        <circle cx="60" cy="70" r="24" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="60" y="75" text-anchor="middle" font-size="11" font-weight="700" fill="#1e40af">Node A</text>
                        <circle cx="170" cy="70" r="24" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/><text x="170" y="75" text-anchor="middle" font-size="11" font-weight="700" fill="#15803d">Node B</text>
                        <circle cx="280" cy="70" r="24" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="280" y="75" text-anchor="middle" font-size="11" font-weight="700" fill="#1e40af">Node C</text>
                        <path d="M 60,95 Q 170,140 280,95" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="4"/>
                        <text x="170" y="130" text-anchor="middle" font-size="10" font-weight="700" fill="#dc2626">A and C cannot hear each other!</text>
                    </g>
                    <g transform="translate(360, 20)">
                        <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">CSMA/CA RTS/CTS Handshake Timeline:</text>
                        <rect x="0" y="30" width="370" height="120" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
                        <rect x="15" y="45" width="45" height="22" fill="#3b82f6" rx="2"/><text x="37" y="60" text-anchor="middle" font-size="9" fill="#ffffff">DIFS</text>
                        <rect x="65" y="45" width="55" height="22" fill="#2563eb" rx="2"/><text x="92" y="60" text-anchor="middle" font-size="9" font-weight="700" fill="#ffffff">RTS</text>
                        <rect x="125" y="45" width="35" height="22" fill="#10b981" rx="2"/><text x="142" y="60" text-anchor="middle" font-size="8.5" fill="#ffffff">SIFS</text>
                        <rect x="165" y="45" width="55" height="22" fill="#059669" rx="2"/><text x="192" y="60" text-anchor="middle" font-size="9" font-weight="700" fill="#ffffff">CTS</text>
                        <rect x="225" y="45" width="35" height="22" fill="#10b981" rx="2"/><text x="242" y="60" text-anchor="middle" font-size="8.5" fill="#ffffff">SIFS</text>
                        <rect x="265" y="45" width="90" height="22" fill="#f59e0b" rx="2"/><text x="310" y="60" text-anchor="middle" font-size="9" font-weight="700" fill="#ffffff">DATA FRAME</text>
                        <text x="15" y="95" font-size="10.5" fill="#dc2626">• NAV (Network Allocation Vector): Neighbors stay silent during NAV!</text>
                        <text x="15" y="125" font-family="monospace" font-size="10.5" fill="#1e40af">• PF_PACKET: socket(PF_PACKET, SOCK_RAW, htons(ETH_P_ALL))</text>
                    </g>
                </svg>""",
                "formulas": """<div class="academic-callout">
                    <h4>Inter-Frame Space (IFS) Hierarchy</h4>
                    <p><strong>SIFS (Shortest):</strong> For highest priority control frames (ACK, CTS).</p>
                    <p><strong>PIFS (Medium):</strong> For Point Coordination Function (PCF) polling.</p>
                    <p><strong>DIFS (Longest):</strong> For standard Distributed Coordination Function (DCF) data frames.</p>
                </div>""",
                "examTip": "In Part B, always explain how the RTS/CTS reservation exchange reserves the wireless medium for the duration of the NAV timer.",
                "p3_sub": "Capture Raw Frames via Packet Scanner in Sector 2",
                "missionIntro": "Inspect raw Layer 2 frame drivers in Sector 2:",
                "objectives": [
                    "Examine raw packet sniffing via PF_PACKET interfaces.",
                    "Verify CSMA/CA virtual carrier sense and NAV deferral."
                ],
                "actionText": "🎮 Start Mission: Study WLAN & PF_PACKET Architecture [Space]"
            }
        ]
    }
]
