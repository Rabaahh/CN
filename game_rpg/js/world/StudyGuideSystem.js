// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// StudyGuideSystem.js - Comprehensive 28-Topic KTU Syllabus & Interactive Guide
// 100% Curriculum Coverage for Modules 1, 2, 3 & 4 (2024 Scheme PCCST501)
// ==========================================================================

class StudyGuideSystem {
    constructor() {
        this.stages = [
    {
        "id": "m1_tcp_ip_stack",
        "number": 1,
        "module": 1,
        "moduleTitle": "MODULE 1: APPLICATION LAYER",
        "title": "TCP/IP 5-Layer Stack, PDUs & Message Encapsulation Journey",
        "badge": "MUST-KNOW 9M",
        "ktuRef": "Official Model Paper Q11a // 9 Marks // Protocol Layering & Encapsulation",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Hierarchical Layering & Encapsulation Journey",
                "storyline": "You awaken as Unit 0xVOID inside the Application Layer. Before your payload data can travel across physical wires, it must descend through the 5-layer TCP/IP protocol hierarchy, acquiring headers at every hop.",
                "theory": "\n                    <p>The modern Internet architecture is defined by the <strong>TCP/IP 5-Layer Hierarchical Model</strong> (derived from the 7-layer OSI reference model by combining Session, Presentation, and Application layers into a single Application layer):</p>\n                    <ul>\n                        <li><strong>5. Application Layer:</strong> Interfaces directly with network applications. PDU: <strong>Message</strong>. Examples: HTTP, DNS, SMTP, FTP, BitTorrent.</li>\n                        <li><strong>4. Transport Layer:</strong> Provides process-to-process delivery, port multiplexing, and reliability. PDU: <strong>Segment</strong> (TCP) or <strong>Datagram</strong> (UDP).</li>\n                        <li><strong>3. Network Layer:</strong> Provides host-to-host logical addressing and routing across heterogeneous networks. PDU: <strong>Datagram (Packet)</strong>. Examples: IPv4, IPv6, ICMP, OSPF.</li>\n                        <li><strong>2. Data Link Layer:</strong> Provides node-to-node framing, physical MAC addressing, and error detection. PDU: <strong>Frame</strong>. Examples: Ethernet (IEEE 802.3), Wi-Fi (802.11), PPP.</li>\n                        <li><strong>1. Physical Layer:</strong> Transmits raw unstructured binary bit streams across physical transmission media. PDU: <strong>Bit</strong>. Examples: 10Base-T UTP, Optical Fiber, RF signals.</li>\n                    </ul>\n                    <p><strong>The Encapsulation Journey:</strong> When sending data, each layer prepends its own header (Message -> Segment -> Packet -> Frame -> Bits). At the receiving host, the reverse process\u2014<strong>Decapsulation</strong>\u2014strips headers layer by layer.</p>\n                ",
                "keywords": [
                    "Application Layer",
                    "Transport Layer",
                    "Network Layer",
                    "Data Link Layer",
                    "Physical Layer",
                    "PDU (Protocol Data Unit)",
                    "Encapsulation / Decapsulation",
                    "Header Overhead"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "5-Layer Stack Architecture & Encapsulation Diagram",
                "svg": "<svg viewBox=\"0 0 760 220\" width=\"100%\" height=\"220\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"220\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(30, 20)\">\n                        <rect x=\"0\" y=\"0\" width=\"220\" height=\"32\" rx=\"4\" fill=\"#3b82f6\"/><text x=\"110\" y=\"21\" text-anchor=\"middle\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#ffffff\">5. Application (Message)</text>\n                        <rect x=\"0\" y=\"36\" width=\"220\" height=\"32\" rx=\"4\" fill=\"#2563eb\"/><text x=\"110\" y=\"57\" text-anchor=\"middle\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#ffffff\">4. Transport (Segment)</text>\n                        <rect x=\"0\" y=\"72\" width=\"220\" height=\"32\" rx=\"4\" fill=\"#1d4ed8\"/><text x=\"110\" y=\"93\" text-anchor=\"middle\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#ffffff\">3. Network (Datagram)</text>\n                        <rect x=\"0\" y=\"108\" width=\"220\" height=\"32\" rx=\"4\" fill=\"#1e40af\"/><text x=\"110\" y=\"129\" text-anchor=\"middle\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#ffffff\">2. Data Link (Frame)</text>\n                        <rect x=\"0\" y=\"144\" width=\"220\" height=\"32\" rx=\"4\" fill=\"#1e3a8a\"/><text x=\"110\" y=\"165\" text-anchor=\"middle\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#ffffff\">1. Physical (Bits)</text>\n                    </g>\n                    <g transform=\"translate(280, 20)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">Encapsulation Pipeline (Sender):</text>\n                        <rect x=\"200\" y=\"25\" width=\"240\" height=\"24\" rx=\"3\" fill=\"#bfdbfe\" stroke=\"#3b82f6\"/><text x=\"320\" y=\"41\" text-anchor=\"middle\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\" fill=\"#1e3a8a\">Application Data (Payload)</text>\n                        <rect x=\"140\" y=\"55\" width=\"60\" height=\"24\" rx=\"3\" fill=\"#93c5fd\" stroke=\"#2563eb\"/><text x=\"170\" y=\"71\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#1e3a8a\">TCP Hdr</text>\n                        <rect x=\"200\" y=\"55\" width=\"240\" height=\"24\" rx=\"3\" fill=\"#bfdbfe\" stroke=\"#3b82f6\"/><text x=\"320\" y=\"71\" text-anchor=\"middle\" font-family=\"monospace\" font-size=\"11\" fill=\"#1e3a8a\">Payload</text>\n                        <rect x=\"80\" y=\"85\" width=\"60\" height=\"24\" rx=\"3\" fill=\"#60a5fa\" stroke=\"#1d4ed8\"/><text x=\"110\" y=\"101\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#ffffff\">IP Hdr</text>\n                        <rect x=\"140\" y=\"85\" width=\"60\" height=\"24\" rx=\"3\" fill=\"#93c5fd\"/><text x=\"170\" y=\"101\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e3a8a\">TCP</text>\n                        <rect x=\"200\" y=\"85\" width=\"240\" height=\"24\" rx=\"3\" fill=\"#bfdbfe\"/><text x=\"320\" y=\"101\" text-anchor=\"middle\" font-family=\"monospace\" font-size=\"11\" fill=\"#1e3a8a\">Payload</text>\n                        <rect x=\"10\" y=\"115\" width=\"70\" height=\"24\" rx=\"3\" fill=\"#3b82f6\" stroke=\"#1e40af\"/><text x=\"45\" y=\"131\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#ffffff\">Eth Hdr</text>\n                        <rect x=\"80\" y=\"115\" width=\"60\" height=\"24\" rx=\"3\" fill=\"#60a5fa\"/><text x=\"110\" y=\"131\" text-anchor=\"middle\" font-size=\"10\" fill=\"#ffffff\">IP</text>\n                        <rect x=\"140\" y=\"115\" width=\"60\" height=\"24\" rx=\"3\" fill=\"#93c5fd\"/><text x=\"170\" y=\"131\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e3a8a\">TCP</text>\n                        <rect x=\"200\" y=\"115\" width=\"200\" height=\"24\" rx=\"3\" fill=\"#bfdbfe\"/><text x=\"300\" y=\"131\" text-anchor=\"middle\" font-family=\"monospace\" font-size=\"11\" fill=\"#1e3a8a\">Payload</text>\n                        <rect x=\"400\" y=\"115\" width=\"45\" height=\"24\" rx=\"3\" fill=\"#f87171\" stroke=\"#dc2626\"/><text x=\"422\" y=\"131\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#ffffff\">FCS</text>\n                    </g>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>PDU & Addressing Scheme Matrix</h4>\n                    <p><strong>Application:</strong> Message | Addressed via URL / Domain / Port</p>\n                    <p><strong>Transport:</strong> Segment (TCP: 20B min) / Datagram (UDP: 8B) | 16-bit Port Numbers</p>\n                    <p><strong>Network:</strong> Datagram / Packet (IPv4: 20B min, IPv6: 40B) | 32-bit / 128-bit IP Addresses</p>\n                    <p><strong>Data Link:</strong> Frame (Ethernet: 14B header + 4B FCS) | 48-bit MAC Address</p>\n                    <p><strong>Physical:</strong> Bits | Voltage Levels / Light Pulses</p>\n                </div>",
                "examTip": "In KTU exams, always draw the complete encapsulation pipeline showing the 5 layers with their exact PDU names and addressing fields."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Observe Encapsulated Datagram Telemetry in Game",
                "missionDescription": "Inspect your active datagram structure inside Sector 1:",
                "objectives": [
                    "Observe the top status card: UNIT 0xVOID PACKET [IPv4_DATAGRAM].",
                    "Notice the TTL (Time-To-Live) and Network Layer indicators.",
                    "Move through the grid to observe lower-layer physical conduits carrying your packet!"
                ],
                "actionText": "\ud83c\udfae Start Mission: Experience Datagram Movement [Space]"
            }
        ]
    },
    {
        "id": "m1_dns_hierarchy",
        "number": 2,
        "module": 1,
        "moduleTitle": "MODULE 1: APPLICATION LAYER",
        "title": "DNS Resolution Hierarchy, Record Types & Recursive/Iterative Queries",
        "badge": "MUST-KNOW 9M",
        "ktuRef": "Official Model Paper Q11a / Set 2 Q11a // 9 Marks // DNS Hierarchy & Records",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Distributed Inverted Tree & Query Resolution Flow",
                "storyline": "Humans remember names like 'titan-core.net', but routers only understand IP addresses like '10.240.0.1'. Unit 0xVOID must query the Domain Name System (DNS) to resolve the destination IP.",
                "theory": "\n                    <p>DNS is an application-layer service using UDP Port 53 (TCP Port 53 for zone transfers >512 bytes). Because a centralized database would be a single point of failure, DNS uses an <strong>inverted distributed hierarchical tree</strong>:</p>\n                    <ul>\n                        <li><strong>Root DNS Servers:</strong> 13 logical authorities replicated across hundreds of physical anycast locations worldwide.</li>\n                        <li><strong>Top-Level Domain (TLD) Servers:</strong> Responsible for generic domains (<code>.com, .org, .net</code>) and country codes (<code>.in, .uk</code>).</li>\n                        <li><strong>Authoritative DNS Servers:</strong> Every organization with publicly accessible hosts maintains an authoritative server mapping their own hostnames to IP addresses.</li>\n                    </ul>\n                    <p><strong>Resolution Mechanisms:</strong></p>\n                    <ul>\n                        <li><strong>Recursive Query:</strong> The querying client places the entire burden of name resolution on the Local DNS Server.</li>\n                        <li><strong>Iterative Query:</strong> If the server does not know the answer, it replies with a referral to the next server down the hierarchy.</li>\n                    </ul>\n                ",
                "keywords": [
                    "DNS Hierarchy",
                    "Root DNS Servers",
                    "TLD Servers",
                    "Authoritative Server",
                    "Recursive Query",
                    "Iterative Query",
                    "UDP/TCP Port 53",
                    "DNS Records"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "DNS Distributed Resolution Tree & Standard Record Types",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(30, 20)\">\n                        <rect x=\"80\" y=\"20\" width=\"120\" height=\"28\" rx=\"4\" fill=\"#1e293b\" stroke=\"#0ea5e9\"/><text x=\"140\" y=\"38\" text-anchor=\"middle\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\" fill=\"#38bdf8\">Root '.' [13 IPs]</text>\n                        <line x1=\"140\" y1=\"48\" x2=\"80\" y2=\"75\" stroke=\"#94a3b8\" stroke-width=\"1.5\"/>\n                        <line x1=\"140\" y1=\"48\" x2=\"200\" y2=\"75\" stroke=\"#94a3b8\" stroke-width=\"1.5\"/>\n                        <rect x=\"20\" y=\"75\" width=\"110\" height=\"26\" rx=\"4\" fill=\"#eff6ff\" stroke=\"#2563eb\"/><text x=\"75\" y=\"92\" text-anchor=\"middle\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\" fill=\"#1e40af\">.com / .net TLD</text>\n                        <rect x=\"150\" y=\"75\" width=\"110\" height=\"26\" rx=\"4\" fill=\"#eff6ff\" stroke=\"#2563eb\"/><text x=\"205\" y=\"92\" text-anchor=\"middle\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\" fill=\"#1e40af\">.edu / .gov TLD</text>\n                        <line x1=\"75\" y1=\"101\" x2=\"75\" y2=\"125\" stroke=\"#94a3b8\" stroke-width=\"1.5\"/>\n                        <rect x=\"15\" y=\"125\" width=\"125\" height=\"26\" rx=\"4\" fill=\"#f0fdf4\" stroke=\"#16a34a\"/><text x=\"77\" y=\"142\" text-anchor=\"middle\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15803d\">Authoritative DNS</text>\n                    </g>\n                    <g transform=\"translate(340, 25)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">Resource Records (RR) Syntax: (Name, Value, Type, TTL)</text>\n                        <rect x=\"0\" y=\"25\" width=\"380\" height=\"135\" rx=\"6\" fill=\"#ffffff\" stroke=\"#cbd5e1\"/>\n                        <text x=\"15\" y=\"48\" font-family=\"monospace\" font-size=\"11\" fill=\"#1e40af\"><strong>Type A:</strong>      Host -> IPv4 (e.g. titan.corp -> 10.240.0.1)</text>\n                        <text x=\"15\" y=\"68\" font-family=\"monospace\" font-size=\"11\" fill=\"#1e40af\"><strong>Type AAAA:</strong>   Host -> IPv6 (128-bit address)</text>\n                        <text x=\"15\" y=\"88\" font-family=\"monospace\" font-size=\"11\" fill=\"#1e40af\"><strong>Type CNAME:</strong>  Alias -> Canonical Name (www -> server1)</text>\n                        <text x=\"15\" y=\"108\" font-family=\"monospace\" font-size=\"11\" fill=\"#1e40af\"><strong>Type MX:</strong>     Domain -> Mail Exchange Server host</text>\n                        <text x=\"15\" y=\"128\" font-family=\"monospace\" font-size=\"11\" fill=\"#1e40af\"><strong>Type NS:</strong>     Domain -> Authoritative Name Server</text>\n                        <text x=\"15\" y=\"148\" font-family=\"monospace\" font-size=\"11\" fill=\"#1e40af\"><strong>Type PTR:</strong>    IP -> Hostname (Reverse DNS lookup)</text>\n                    </g>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>DNS-to-HTTP Sequence in University Papers</h4>\n                    <ol>\n                        <li>Browser checks cache -> OS resolver checks hosts file.</li>\n                        <li>Resolver sends recursive DNS query on UDP Port 53 to Local DNS server.</li>\n                        <li>Local DNS queries Root -> TLD -> Authoritative server iteratively until IP is returned.</li>\n                        <li>Client initiates TCP 3-Way Handshake on Port 80, then sends HTTP GET request.</li>\n                    </ol>\n                </div>",
                "examTip": "Do not state DNS only uses UDP! State clearly: 'DNS uses UDP port 53 for standard queries, and TCP port 53 for zone transfers or responses exceeding 512 bytes.'"
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Perform Recursive DNS Lookup in Sector 4",
                "missionDescription": "Query the DNS terminal in Sector 4:",
                "objectives": [
                    "Ascend to Sector 4 (The Application Nexus).",
                    "Locate the DNS Resolution Terminal near the bastion gate.",
                    "Execute a recursive query to pinpoint the TITAN-CORE root server!"
                ],
                "actionText": "\ud83c\udfae Start Mission: Execute DNS Query [Space]"
            }
        ]
    },
    {
        "id": "m1_web_http",
        "number": 3,
        "module": 1,
        "moduleTitle": "MODULE 1: APPLICATION LAYER",
        "title": "HTTP/1.1 vs HTTP/2: Persistent Keep-Alive, Pipelining & Binary Multiplexing",
        "badge": "MUST-KNOW 9M",
        "ktuRef": "Set 1 Q11a / Set 3 Q11a // 9 Marks // HTTP Versions & Status Codes",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Evolution of Web Protocols from 1.0 to HTTP/2",
                "storyline": "At the Web Bastion, Unit 0xVOID initiates web transactions. Early HTTP protocols required a separate TCP handshake for every single image and stylesheet, drowning networks in latency.",
                "theory": "\n                    <p>HTTP is an application-level stateless protocol on TCP Port 80 (HTTPS on Port 443):</p>\n                    <ul>\n                        <li><strong>HTTP/1.0 (Non-Persistent):</strong> Opens a new TCP connection for every single referenced object, incurring a latency overhead of $2 \\times RTT$ per object.</li>\n                        <li><strong>HTTP/1.1 (Persistent Keep-Alive):</strong> Keeps the TCP connection open across requests. Supports pipelining, but suffers from <strong>Head-of-Line (HoL) Blocking</strong> if an early response is delayed.</li>\n                        <li><strong>HTTP/2 (Binary Framing & Multiplexing):</strong> Interleaves independent streams across a <em>single TCP socket</em>, completely eliminating application-level HoL blocking. Supports server push and HPACK header compression.</li>\n                    </ul>\n                ",
                "keywords": [
                    "HTTP/1.0 Non-Persistent",
                    "HTTP/1.1 Keep-Alive",
                    "Pipelining",
                    "Head-of-Line (HoL) Blocking",
                    "HTTP/2 Binary Framing",
                    "Multiplexing",
                    "HPACK",
                    "Server Push"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "HTTP Response Time Comparison & Stream Multiplexing",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(30, 20)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">HTTP/1.1 Persistent (Sequential HoL Blocking):</text>\n                        <rect x=\"0\" y=\"25\" width=\"320\" height=\"40\" rx=\"4\" fill=\"#fee2e2\" stroke=\"#dc2626\"/>\n                        <text x=\"160\" y=\"48\" text-anchor=\"middle\" font-family=\"monospace\" font-size=\"10.5\" fill=\"#991b1b\">[REQ 1] -> [RESP 1 (Delayed! Blocks REQ 2 & 3)]</text>\n                    </g>\n                    <g transform=\"translate(390, 20)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">HTTP/2 Multiplexed (Single TCP Connection):</text>\n                        <rect x=\"0\" y=\"25\" width=\"340\" height=\"40\" rx=\"4\" fill=\"#dcfce7\" stroke=\"#16a34a\"/>\n                        <text x=\"170\" y=\"48\" text-anchor=\"middle\" font-family=\"monospace\" font-size=\"10.5\" fill=\"#15803d\">[S1: HTML] [S2: CSS] [S3: IMG] Interleaved!</text>\n                    </g>\n                    <g transform=\"translate(30, 95)\">\n                        <rect x=\"0\" y=\"0\" width=\"700\" height=\"95\" rx=\"6\" fill=\"#f1f5f9\" stroke=\"#cbd5e1\"/>\n                        <text x=\"20\" y=\"22\" font-family=\"-apple-system, sans-serif\" font-size=\"11.5\" font-weight=\"700\" fill=\"#0f172a\">Essential KTU HTTP Status Codes to Memorize:</text>\n                        <text x=\"20\" y=\"42\" font-family=\"monospace\" font-size=\"11\" fill=\"#15803d\">\u2022 200 OK: Request succeeded, payload returned</text>\n                        <text x=\"20\" y=\"60\" font-family=\"monospace\" font-size=\"11\" fill=\"#2563eb\">\u2022 301 Moved Permanently | 304 Not Modified (cached entity valid)</text>\n                        <text x=\"20\" y=\"78\" font-family=\"monospace\" font-size=\"11\" fill=\"#dc2626\">\u2022 400 Bad Request | 403 Forbidden | 404 Not Found (Client Errors)</text>\n                        <text x=\"380\" y=\"78\" font-family=\"monospace\" font-size=\"11\" fill=\"#dc2626\">\u2022 500 Internal Server Error | 503 Unavailable (Server)</text>\n                    </g>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>Formulas for Web Object Retrieval Times</h4>\n                    <div class=\"formula-line\">$$T_{\\text{non-persistent}} = 2 \\times RTT + \\text{file time} \\quad (\\text{per object})$$</div>\n                    <div class=\"formula-line\">$$T_{\\text{persistent}} = 2 \\times RTT \\text{ (base)} + 1 \\times RTT \\quad (\\text{for each subsequent object})$$</div>\n                </div>",
                "examTip": "In Part B, always explain that HTTP/2 does NOT change HTTP methods (GET, POST), status codes, or header semantics; it only changes how data is framed and transported across the wire."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Trigger HTTP/2 Multiplexed Handshake in Bastion",
                "missionDescription": "Infiltrate the Web Bastion terminal in Sector 4:",
                "objectives": [
                    "Approach the Web Infiltration Terminal at x: 700 in Sector 4.",
                    "Open the console to send HTTP/2 binary multiplexed streams.",
                    "Bypass Head-of-Line blocking to retrieve system exploit tokens!"
                ],
                "actionText": "\ud83c\udfae Start Mission: Execute HTTP/2 Infiltration [Space]"
            }
        ]
    },
    {
        "id": "m1_p2p_bittorrent",
        "number": 4,
        "module": 1,
        "moduleTitle": "MODULE 1: APPLICATION LAYER",
        "title": "Client-Server vs P2P Swarms: BitTorrent Rarest-First & Tit-for-Tat",
        "badge": "MUST-KNOW 9M",
        "ktuRef": "Official Model Paper Q11b / Syllabus Mod 1 // 9 Marks // P2P Swarm Algorithms",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Self-Scaling Architectures & Game Theory Algorithms",
                "storyline": "Unit 0xVOID enters the underground BitTorrent Swarm Resistance Camp. Unlike fragile centralized servers that buckle under load, peer-to-peer swarms grow stronger with every peer that joins.",
                "theory": "\n                    <p>In Client-Server distribution, server upload bandwidth is a bottleneck ($D_{\\text{cs}} \\ge \\max(\\frac{NF}{u_s}, \\frac{F}{d_{\\min}})$). As $N \\to \\infty$, distribution time grows linearly.</p>\n                    <p>In P2P BitTorrent, peers upload to each other ($D_{\\text{P2P}} \\ge \\max(\\frac{F}{u_s}, \\frac{F}{d_{\\min}}, \\frac{NF}{u_s + \\sum u_i})$). As peers join, they add upload capacity, making the network <strong>self-scaling</strong>.</p>\n                    <ul>\n                        <li><strong>Rarest-First:</strong> Peers request the chunks possessed by the fewest neighbors first, ensuring rare chunks propagate quickly and do not vanish.</li>\n                        <li><strong>Tit-for-Tat (Choking):</strong> Each peer uploads to the top 4 peers that provide the highest download rates (recalculated every 10s). Freeloaders are choked.</li>\n                        <li><strong>Optimistic Unchoking:</strong> Every 30s, one random peer is unchoked to discover better partners.</li>\n                    </ul>\n                ",
                "keywords": [
                    "Client-Server Bottleneck",
                    "P2P Swarm",
                    "BitTorrent",
                    "Tracker",
                    "Torrent File",
                    "Rarest-First Strategy",
                    "Tit-for-Tat Algorithm",
                    "Optimistic Unchoking"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Client-Server vs P2P Distribution Time & Choking State Machine",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(40, 20)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">Distribution Time vs Number of Clients (N):</text>\n                        <line x1=\"30\" y1=\"140\" x2=\"260\" y2=\"140\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n                        <line x1=\"30\" y1=\"140\" x2=\"30\" y2=\"30\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n                        <line x1=\"30\" y1=\"120\" x2=\"250\" y2=\"35\" stroke=\"#dc2626\" stroke-width=\"2.5\"/><text x=\"210\" y=\"45\" font-size=\"10.5\" font-weight=\"700\" fill=\"#dc2626\">Client-Server (Linear)</text>\n                        <path d=\"M 30,120 Q 80,105 140,95 T 250,85\" fill=\"none\" stroke=\"#16a34a\" stroke-width=\"2.5\"/><text x=\"210\" y=\"95\" font-size=\"10.5\" font-weight=\"700\" fill=\"#16a34a\">P2P (Bounded)</text>\n                    </g>\n                    <g transform=\"translate(340, 20)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">Tit-for-Tat Peer Coordination:</text>\n                        <rect x=\"20\" y=\"30\" width=\"360\" height=\"120\" rx=\"6\" fill=\"#ffffff\" stroke=\"#cbd5e1\"/>\n                        <text x=\"35\" y=\"55\" font-size=\"11\" font-weight=\"700\" fill=\"#1e40af\">\u2022 Top 4 Peers: Unchoked based on upload speed (every 10s)</text>\n                        <text x=\"35\" y=\"85\" font-size=\"11\" font-weight=\"700\" fill=\"#d97706\">\u2022 1 Optimistic Peer: Randomly unchoked every 30s</text>\n                        <text x=\"35\" y=\"115\" font-size=\"11\" font-weight=\"700\" fill=\"#15803d\">\u2022 Rarest-First: Requests least common chunk</text>\n                    </g>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>Mathematical Proof: P2P vs Client-Server Scalability</h4>\n                    <div class=\"formula-line\">$$D_{\\text{CS}} \\ge \\max \\left( \\frac{NF}{u_s}, \\frac{F}{d_{\\min}} \\right) \\quad \\text{vs} \\quad D_{\\text{P2P}} \\ge \\max \\left( \\frac{F}{u_s}, \\frac{F}{d_{\\min}}, \\frac{NF}{u_s + \\sum u_i} \\right)$$</div>\n                    <p>If each peer uploads at average rate $u$, then as $N$ grows large, $\\frac{NF}{u_s + Nu} \\approx \\frac{F}{u}$, which is a constant independent of $N$!</p>\n                </div>",
                "examTip": "Always cite both Rarest-First (piece selection strategy) and Tit-for-Tat (peer selection / bandwidth management) when answering BitTorrent questions."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Trade File Chunks in the BitTorrent Swarm Camp",
                "missionDescription": "Coordinate with rebel peers in Sector 4:",
                "objectives": [
                    "Enter the BitTorrent Resistance Camp in Sector 4.",
                    "Interact with rebel peers to inspect their piece availability bitmask.",
                    "Apply Rarest-First piece selection and unchoke top seeders to assemble exploit code!"
                ],
                "actionText": "\ud83c\udfae Start Mission: Trade P2P Swarm Pieces [Space]"
            }
        ]
    },
    {
        "id": "m1_email_protocols",
        "number": 5,
        "module": 1,
        "moduleTitle": "MODULE 1: APPLICATION LAYER",
        "title": "Electronic Mail Architecture: User Agent, MTA, MAA, SMTP, POP3 & IMAP",
        "badge": "MUST-KNOW 9M",
        "ktuRef": "Official Model Paper Q11b / Set 4 Q11a // 9 Marks // Email System Architecture",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Push vs Pull Protocols in Internet Mail Architecture",
                "storyline": "Unit 0xVOID inspects the messaging pipeline. Unlike interactive web protocols, email is a store-and-forward asynchronous system requiring distinct protocols for sending and receiving messages.",
                "theory": "\n                    <p>The Internet email architecture has three components:</p>\n                    <ul>\n                        <li><strong>User Agent (UA):</strong> Client software to compose, view, and organize mail.</li>\n                        <li><strong>Mail Transfer Agent (MTA):</strong> Relays mail across servers using a <strong>Push Protocol (SMTP - TCP Port 25)</strong>.</li>\n                        <li><strong>Mail Access Agent (MAA):</strong> Pulls mail from mailbox servers to client UAs using a <strong>Pull Protocol (POP3 - Port 110 or IMAP - Port 143)</strong>.</li>\n                    </ul>\n                    <p><strong>POP3 vs IMAP:</strong> POP3 downloads and deletes messages from the server, operating as a single offline folder. IMAP maintains state on the server, synchronizing mail across multiple devices seamlessly.</p>\n                ",
                "keywords": [
                    "User Agent (UA)",
                    "MTA (Mail Transfer Agent)",
                    "MAA (Mail Access Agent)",
                    "SMTP (Port 25)",
                    "POP3 (Port 110)",
                    "IMAP (Port 143)",
                    "Push vs Pull",
                    "MIME"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "End-to-End Email Transmission Pipeline & SMTP Handshake",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(20, 25)\">\n                        <rect x=\"0\" y=\"30\" width=\"90\" height=\"40\" rx=\"4\" fill=\"#eff6ff\" stroke=\"#2563eb\"/><text x=\"45\" y=\"54\" text-anchor=\"middle\" font-size=\"10.5\" font-weight=\"700\" fill=\"#1e40af\">Sender UA</text>\n                        <line x1=\"90\" y1=\"50\" x2=\"160\" y2=\"50\" stroke=\"#2563eb\" stroke-width=\"2\"/><polygon points=\"155,47 162,50 155,53\" fill=\"#2563eb\"/><text x=\"125\" y=\"42\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"700\" fill=\"#2563eb\">SMTP (Push)</text>\n                        <rect x=\"165\" y=\"30\" width=\"105\" height=\"40\" rx=\"4\" fill=\"#1e293b\" stroke=\"#0ea5e9\"/><text x=\"217\" y=\"54\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#38bdf8\">Sender Server</text>\n                        <line x1=\"270\" y1=\"50\" x2=\"420\" y2=\"50\" stroke=\"#2563eb\" stroke-width=\"2\"/><polygon points=\"415,47 422,50 415,53\" fill=\"#2563eb\"/><text x=\"345\" y=\"42\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"700\" fill=\"#2563eb\">SMTP / Internet</text>\n                        <rect x=\"425\" y=\"30\" width=\"115\" height=\"40\" rx=\"4\" fill=\"#1e293b\" stroke=\"#0ea5e9\"/><text x=\"482\" y=\"54\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#38bdf8\">Receiver Server</text>\n                        <line x1=\"540\" y1=\"50\" x2=\"620\" y2=\"50\" stroke=\"#16a34a\" stroke-width=\"2\"/><polygon points=\"615,47 622,50 615,53\" fill=\"#16a34a\"/><text x=\"580\" y=\"42\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"700\" fill=\"#16a34a\">POP/IMAP</text>\n                        <rect x=\"625\" y=\"30\" width=\"95\" height=\"40\" rx=\"4\" fill=\"#f0fdf4\" stroke=\"#16a34a\"/><text x=\"672\" y=\"54\" text-anchor=\"middle\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15803d\">Receiver UA</text>\n                    </g>\n                    <g transform=\"translate(20, 105)\">\n                        <rect x=\"0\" y=\"0\" width=\"720\" height=\"85\" rx=\"6\" fill=\"#f1f5f9\" stroke=\"#cbd5e1\"/>\n                        <text x=\"20\" y=\"22\" font-family=\"-apple-system, sans-serif\" font-size=\"11\" font-weight=\"700\" fill=\"#0f172a\">Classic SMTP ASCII Handshake Dialog (Port 25):</text>\n                        <text x=\"20\" y=\"40\" font-family=\"monospace\" font-size=\"10.5\" fill=\"#2563eb\">S: 220 titan.corp Service ready | C: HELO client.net | S: 250 Hello</text>\n                        <text x=\"20\" y=\"58\" font-family=\"monospace\" font-size=\"10.5\" fill=\"#2563eb\">C: MAIL FROM:&lt;alice@net.org&gt; | S: 250 OK | C: RCPT TO:&lt;bob@corp.com&gt; | S: 250 OK</text>\n                        <text x=\"20\" y=\"76\" font-family=\"monospace\" font-size=\"10.5\" fill=\"#15803d\">C: DATA | S: 354 Start mail | C: Subject: Exploit\r\n\r\nHello Bob\r\n.\r\n | S: 250 OK | C: QUIT</text>\n                    </g>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>POP3 vs IMAP Examination Comparison</h4>\n                    <p><strong>POP3 (Port 110):</strong> Simple, offline mailbox download, deleted from server, single device only.</p>\n                    <p><strong>IMAP (Port 143):</strong> Server-centric, allows folder creation, message flags, multi-device synchronization.</p>\n                </div>",
                "examTip": "Emphasize that SMTP cannot pull mail from a mailbox server\u2014it is strictly a push protocol. This is why POP3 or IMAP is required for the final hop to the user agent."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Inspect Store-and-Forward Mail Spools in Game",
                "missionDescription": "Explore message queues inside the Application Layer:",
                "objectives": [
                    "Review how store-and-forward buffers prevent packet drops during server downtime.",
                    "Observe port filtering rules (Port 25 SMTP vs Port 110/143 POP/IMAP) in firewalls."
                ],
                "actionText": "\ud83c\udfae Start Mission: Study Email Protocol Architecture [Space]"
            }
        ]
    },
    {
        "id": "m1_ftp_dual_port",
        "number": 6,
        "module": 1,
        "moduleTitle": "MODULE 1: APPLICATION LAYER",
        "title": "FTP Protocol: Out-of-Band Dual-Connection (Control Port 21 vs Data Port 20)",
        "badge": "MUST-KNOW 9M",
        "ktuRef": "Official Model Paper Q11a Choice B // 9 Marks // FTP Out-of-Band Architecture",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Out-of-Band Architecture & Active vs Passive Transmission",
                "storyline": "Unit 0xVOID encounters the legacy File Transfer Protocol (FTP) terminal. Unlike HTTP which multiplexes commands and file data over a single connection, FTP strictly segregates control commands from binary data streams.",
                "theory": "\n                    <p>The File Transfer Protocol (FTP) operates using <strong>two parallel TCP connections</strong> per session, known as an <strong>Out-of-Band</strong> architecture:</p>\n                    <ul>\n                        <li><strong>Control Connection (TCP Port 21):</strong> Opened first by client. Stays open for the entire session. Used strictly for sending user authentication, directory traversal commands (<code>USER, PASS, CWD, LIST, RETR</code>), and 3-digit status replies. Never carries actual file content.</li>\n                        <li><strong>Data Connection (TCP Port 20 / Ephemeral):</strong> Opened dynamically every time a file transfer or directory listing is requested, and closed immediately after transfer finishes ($1 \\text{ file} = 1 \\text{ data connection}$).</li>\n                    </ul>\n                    <p><strong>Active vs Passive Modes:</strong> In Active mode, the server connects back to the client's port from Port 20 (often blocked by client firewalls). In Passive mode (<code>PASV</code>), the server opens a random port $P > 1023$ and the client initiates the connection to $P$.</p>\n                ",
                "keywords": [
                    "FTP (File Transfer Protocol)",
                    "Out-of-Band Architecture",
                    "Control Connection (Port 21)",
                    "Data Connection (Port 20)",
                    "Active Mode (PORT)",
                    "Passive Mode (PASV)",
                    "Stateful Protocol"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "FTP Active vs Passive Dual-Socket Architecture",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(50, 25)\">\n                        <rect x=\"0\" y=\"20\" width=\"150\" height=\"130\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#2563eb\" stroke-width=\"2\"/>\n                        <text x=\"75\" y=\"45\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#1e40af\">FTP CLIENT</text>\n                        <text x=\"75\" y=\"80\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"600\" fill=\"#334155\">Port N (Control)</text>\n                        <text x=\"75\" y=\"125\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"600\" fill=\"#334155\">Port N+1 (Data)</text>\n                        <g transform=\"translate(160, 40)\">\n                            <line x1=\"0\" y1=\"35\" x2=\"330\" y2=\"35\" stroke=\"#2563eb\" stroke-width=\"2.5\"/><polygon points=\"325,31 333,35 325,39\" fill=\"#2563eb\"/>\n                            <text x=\"165\" y=\"25\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#1e40af\">1. Control Connection (TCP Port 21) - Entire Session</text>\n                            <line x1=\"330\" y1=\"80\" x2=\"0\" y2=\"80\" stroke=\"#16a34a\" stroke-width=\"2.5\" stroke-dasharray=\"4\"/><polygon points=\"5,76 -3,80 5,84\" fill=\"#16a34a\"/>\n                            <text x=\"165\" y=\"98\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#15803d\">2. Data Connection (TCP Port 20) - Per File Only</text>\n                        </g>\n                        <rect x=\"500\" y=\"20\" width=\"150\" height=\"130\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#16a34a\" stroke-width=\"2\"/>\n                        <text x=\"575\" y=\"45\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#15803d\">FTP SERVER</text>\n                        <text x=\"575\" y=\"80\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"600\" fill=\"#334155\">Port 21 (Control)</text>\n                        <text x=\"575\" y=\"125\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"600\" fill=\"#334155\">Port 20 (Data)</text>\n                    </g>\n                    <text x=\"380\" y=\"195\" text-anchor=\"middle\" font-size=\"11.5\" font-weight=\"700\" fill=\"#0f172a\">Out-of-Band: Control commands and user files NEVER share the same TCP socket!</text>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>HTTP vs FTP Architectural Comparison</h4>\n                    <p><strong>HTTP (In-Band):</strong> Commands and data share port 80/443. Stateless.</p>\n                    <p><strong>FTP (Out-of-Band):</strong> Separate control (port 21) and data (port 20). Stateful.</p>\n                </div>",
                "examTip": "A guaranteed 9-mark answer: Draw the dual-connection diagram, specify Port 20 vs 21, and explain why Passive Mode (PASV) is necessary for clients behind NAT firewalls."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Inspect Dual-Port Socket Handshakes in Sector 4",
                "missionDescription": "Navigate the port routing gates inside the Application Layer:",
                "objectives": [
                    "Observe how out-of-band channels insulate command signaling from bulk data traffic."
                ],
                "actionText": "\ud83c\udfae Start Mission: Study Dual-Port FTP Architecture [Space]"
            }
        ]
    },
    {
        "id": "m2_tcp_vs_udp",
        "number": 7,
        "module": 2,
        "moduleTitle": "MODULE 2: TRANSPORT & NETWORK LAYERS",
        "title": "TCP vs UDP Comparison, Sequence Numbers & Cumulative ACKs",
        "badge": "MUST-KNOW 9M",
        "ktuRef": "Official Model Paper Q12a / Set 1 Q12a // 9 Marks // TCP vs UDP & Cumulative ACKs",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Reliable Byte-Stream (TCP) vs Lightweight Datagram (UDP)",
                "storyline": "Unit 0xVOID arrives at the Transport Layer junction. Two distinct transport protocols exist: heavy armored TCP with guaranteed delivery, and blazing-fast connectionless UDP.",
                "theory": "\n                    <p>The Transport Layer delivers messages between application processes using 16-bit Port numbers:</p>\n                    <ul>\n                        <li><strong>UDP (User Datagram Protocol - RFC 768):</strong> Connectionless, unreliable, best-effort. 8-byte fixed header (Source Port, Dest Port, Length, Checksum). No handshakes, no flow control, no congestion control. Ideal for real-time video, VoIP, and DNS queries where low latency beats retransmissions.</li>\n                        <li><strong>TCP (Transmission Control Protocol - RFC 793):</strong> Connection-oriented, fully reliable byte-stream. 20-byte minimum header. Manages sequence numbers, cumulative acknowledgments, flow control, and congestion control.</li>\n                        <li><strong>Sequence Numbers:</strong> TCP numbers each <em>byte</em> in the stream, not segments! The sequence number in the header is the byte stream offset of the first data byte in that segment.</li>\n                        <li><strong>Cumulative ACKs:</strong> An ACK with number $N$ signifies that the receiver has received all contiguous bytes up to $N-1$, and expects byte $N$ next.</li>\n                    </ul>\n                ",
                "keywords": [
                    "TCP vs UDP",
                    "UDP 8-Byte Header",
                    "TCP 20-Byte Header",
                    "Byte Stream Numbering",
                    "Cumulative ACKs",
                    "Connection-Oriented vs Connectionless",
                    "Transport Layer (Layer 4)"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "TCP 20-Byte vs UDP 8-Byte Header Layout & ACK Numbering",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(30, 20)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">UDP 8-Byte Header:</text>\n                        <rect x=\"0\" y=\"25\" width=\"320\" height=\"30\" rx=\"3\" fill=\"#dbeafe\" stroke=\"#2563eb\"/>\n                        <text x=\"80\" y=\"44\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#1e40af\">Src Port (16b)</text>\n                        <text x=\"240\" y=\"44\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#1e40af\">Dest Port (16b)</text>\n                        <rect x=\"0\" y=\"58\" width=\"320\" height=\"30\" rx=\"3\" fill=\"#dbeafe\" stroke=\"#2563eb\"/>\n                        <text x=\"80\" y=\"77\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#1e40af\">Length (16b)</text>\n                        <text x=\"240\" y=\"77\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#1e40af\">Checksum (16b)</text>\n                    </g>\n                    <g transform=\"translate(380, 20)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">Cumulative ACK Tracing Example:</text>\n                        <rect x=\"0\" y=\"25\" width=\"350\" height=\"150\" rx=\"4\" fill=\"#ffffff\" stroke=\"#cbd5e1\"/>\n                        <text x=\"15\" y=\"48\" font-family=\"monospace\" font-size=\"11\" fill=\"#1e40af\">Sender sends: [Seq = 1000, 500 Bytes data]</text>\n                        <text x=\"15\" y=\"70\" font-family=\"monospace\" font-size=\"11\" fill=\"#15803d\">Receiver replies: [ACK = 1500] (Bytes 1000-1499 OK)</text>\n                        <text x=\"15\" y=\"92\" font-family=\"monospace\" font-size=\"11\" fill=\"#1e40af\">Sender sends: [Seq = 1500, 300 Bytes data]</text>\n                        <text x=\"15\" y=\"114\" font-family=\"monospace\" font-size=\"11\" fill=\"#dc2626\">Packet LOST in transit!</text>\n                        <text x=\"15\" y=\"136\" font-family=\"monospace\" font-size=\"11\" fill=\"#1e40af\">Sender sends: [Seq = 1800, 200 Bytes data]</text>\n                        <text x=\"15\" y=\"158\" font-family=\"monospace\" font-size=\"11\" fill=\"#d97706\">Receiver replies: [ACK = 1500] (Duplicate ACK!)</text>\n                    </g>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>TCP vs UDP Comparison Scheme</h4>\n                    <p><strong>Reliability:</strong> TCP guarantees delivery via ACKs & retransmission. UDP offers zero guarantees.</p>\n                    <p><strong>Ordering:</strong> TCP reconstructs byte stream in-order. UDP delivers packets in whatever order they arrive.</p>\n                    <p><strong>Overhead:</strong> UDP header is 8 bytes (60% less overhead). TCP header is minimum 20 bytes up to 60 bytes with options.</p>\n                </div>",
                "examTip": "In KTU numericals, if a sender transmits 1000 bytes starting at sequence number 5001, the receiver's acknowledgment number will be 6001 (5001 + 1000)."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Test UDP Speed vs TCP Reliability in Combat",
                "missionDescription": "Fire tactical transport layer packets in Sector 4:",
                "objectives": [
                    "Compare UDP raw datagram bursts with full TCP handshake streams.",
                    "Verify cumulative ACK counter tracking."
                ],
                "actionText": "\ud83c\udfae Start Mission: Execute Transport Layer Drill [Space]"
            }
        ]
    },
    {
        "id": "m2_tcp_handshake_lifecycle",
        "number": 8,
        "module": 2,
        "moduleTitle": "MODULE 2: TRANSPORT & NETWORK LAYERS",
        "title": "TCP 3-Way Handshake, Connection Teardown & Stop-and-Wait ARQ",
        "badge": "MUST-KNOW 9M",
        "ktuRef": "Official Model Paper Q12a // 9 Marks // TCP Connection Lifecycle & Stop-and-Wait",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "State Transitions: Connection Establishment, Data & Teardown",
                "storyline": "Unit 0xVOID prepares to establish a reliable socket stream. Before any data can be transferred, both endpoints must synchronize sequence numbers and allocate transmission buffers.",
                "theory": "\n                    <p>TCP manages reliable virtual circuits using a 3-phase lifecycle:</p>\n                    <ul>\n                        <li><strong>1. Connection Establishment (3-Way Handshake):</strong>\n                            <ol>\n                                <li>Client sends <code>SYN (seq = x, ACK flag = 0)</code>.</li>\n                                <li>Server allocates buffers and replies <code>SYN-ACK (seq = y, ack = x + 1, SYN=1, ACK=1)</code>.</li>\n                                <li>Client completes connection: <code>ACK (seq = x + 1, ack = y + 1, SYN=0, ACK=1)</code>. Data may be piggybacked in this third packet.</li>\n                            </ol>\n                        </li>\n                        <li><strong>2. Connection Teardown (4-Step Termination):</strong>\n                            <ol>\n                                <li>Host A sends <code>FIN (seq = u)</code> and enters FIN_WAIT_1.</li>\n                                <li>Host B responds <code>ACK (ack = u + 1)</code> and enters CLOSE_WAIT. Host A enters FIN_WAIT_2.</li>\n                                <li>Host B finishes sending remaining data, then sends <code>FIN (seq = v)</code> and enters LAST_ACK.</li>\n                                <li>Host A replies <code>ACK (ack = v + 1)</code> and enters <strong>TIME_WAIT (2 * MSL)</strong> to ensure final ACK was received.</li>\n                            </ol>\n                        </li>\n                        <li><strong>Stop-and-Wait ARQ:</strong> The simplest flow control scheme: sender transmits 1 frame, starts a timer, and waits for the ACK before transmitting the next. If the timer expires, the frame is retransmitted.</li>\n                    </ul>\n                ",
                "keywords": [
                    "TCP 3-Way Handshake",
                    "SYN",
                    "SYN-ACK",
                    "ACK",
                    "Connection Teardown (FIN)",
                    "TIME_WAIT (2 MSL)",
                    "Stop-and-Wait ARQ",
                    "ISN (Initial Sequence Number)"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "TCP 3-Way Handshake & 4-Way Teardown Ladder Diagram",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(40, 20)\">\n                        <text x=\"120\" y=\"15\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">Connection Setup (3-Way):</text>\n                        <line x1=\"40\" y1=\"30\" x2=\"40\" y2=\"160\" stroke=\"#475569\" stroke-width=\"2\"/>\n                        <line x1=\"200\" y1=\"30\" x2=\"200\" y2=\"160\" stroke=\"#475569\" stroke-width=\"2\"/>\n                        <text x=\"40\" y=\"25\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#2563eb\">Client</text>\n                        <text x=\"200\" y=\"25\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#16a34a\">Server</text>\n                        <!-- SYN -->\n                        <line x1=\"40\" y1=\"50\" x2=\"200\" y2=\"80\" stroke=\"#2563eb\" stroke-width=\"1.8\"/><polygon points=\"195,76 202,80 195,84\" fill=\"#2563eb\"/>\n                        <text x=\"120\" y=\"60\" text-anchor=\"middle\" font-family=\"monospace\" font-size=\"9.5\" fill=\"#1e40af\">1. SYN (seq=x)</text>\n                        <!-- SYN-ACK -->\n                        <line x1=\"200\" y1=\"90\" x2=\"40\" y2=\"120\" stroke=\"#16a34a\" stroke-width=\"1.8\"/><polygon points=\"45,116 38,120 45,124\" fill=\"#16a34a\"/>\n                        <text x=\"120\" y=\"100\" text-anchor=\"middle\" font-family=\"monospace\" font-size=\"9.5\" fill=\"#15803d\">2. SYN-ACK (seq=y, ack=x+1)</text>\n                        <!-- ACK -->\n                        <line x1=\"40\" y1=\"130\" x2=\"200\" y2=\"155\" stroke=\"#2563eb\" stroke-width=\"1.8\"/><polygon points=\"195,151 202,155 195,159\" fill=\"#2563eb\"/>\n                        <text x=\"120\" y=\"138\" text-anchor=\"middle\" font-family=\"monospace\" font-size=\"9.5\" fill=\"#1e40af\">3. ACK (ack=y+1)</text>\n                    </g>\n                    <g transform=\"translate(420, 20)\">\n                        <text x=\"140\" y=\"15\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">Stop-and-Wait ARQ Efficiency Formula:</text>\n                        <rect x=\"0\" y=\"30\" width=\"280\" height=\"130\" rx=\"4\" fill=\"#ffffff\" stroke=\"#cbd5e1\"/>\n                        <text x=\"15\" y=\"55\" font-family=\"monospace\" font-size=\"11\" fill=\"#1e40af\">\u03b7 = T_trans / (T_trans + 2 \u00b7 T_prop)</text>\n                        <text x=\"15\" y=\"80\" font-size=\"11\" fill=\"#334155\">\u2022 If propagation delay is high (satellite), efficiency \u03b7 drops close to 0%!</text>\n                        <text x=\"15\" y=\"115\" font-size=\"11\" fill=\"#334155\">\u2022 Solution: Sliding Window protocols (Go-Back-N, Selective Repeat) with window W \u2265 2a + 1.</text>\n                    </g>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>Stop-and-Wait Efficiency Formula</h4>\n                    <div class=\"formula-line\">$$\\eta = \\frac{1}{1 + 2a} \\quad \\text{where } a = \\frac{T_{\\text{prop}}}{T_{\\text{trans}}} = \\frac{\\text{Distance} / v}{\\text{Frame Size} / B}$$</div>\n                    <p><strong>TIME_WAIT Duration:</strong> $2 \\times \\text{MSL}$ (Maximum Segment Lifetime, typically 60 to 120 seconds) to ensure delayed duplicate segments expire in the network.</p>\n                </div>",
                "examTip": "Always state that SYN packets consume 1 sequence number even though they carry 0 bytes of payload data!"
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Fire 3-Way Handshake Beam in Sector 4",
                "missionDescription": "Engage defensive guardians in Sector 4:",
                "objectives": [
                    "Press [Left-Click / J] to fire a calibrated 3-Way Handshake beam.",
                    "Neutralize SYN-flood adversary daemons guarding the core."
                ],
                "actionText": "\ud83c\udfae Start Mission: Execute 3-Way Handshake Attack [Space]"
            }
        ]
    },
    {
        "id": "m2_flow_congestion",
        "number": 9,
        "module": 2,
        "moduleTitle": "MODULE 2: TRANSPORT & NETWORK LAYERS",
        "title": "TCP Flow Control (Sliding Window rwnd) & Congestion Control (AIMD cwnd)",
        "badge": "CORE FORMULA",
        "ktuRef": "Syllabus Mod 2 Part A // Flow vs Congestion Control, AIMD, Slow Start, cwnd & rwnd",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Protecting the Receiver Host (rwnd) vs Intermediate Routers (cwnd)",
                "storyline": "Unit 0xVOID enters high-traffic routing corridors. If packets are sent too fast for the receiver, buffers overflow. If sent too fast for intermediate switches, network congestion collapse occurs.",
                "theory": "\n                    <p>TCP enforces two distinct rate-limiting mechanisms:</p>\n                    <ul>\n                        <li><strong>Flow Control (End-to-End):</strong> Prevents the sender from overflowing the <em>receiver host's buffer</em>. The receiver advertises its available buffer space in every ACK packet via the <strong>rwnd (Receive Window)</strong> header field. The sender guarantees: $\\text{Bytes in flight} \\le rwnd$.</li>\n                        <li><strong>Congestion Control (Network-Wide):</strong> Prevents the sender from overwhelming <em>intermediate network switches and routers</em>. The sender dynamically computes a <strong>cwnd (Congestion Window)</strong> based on perceived packet loss.</li>\n                        <li><strong>Effective Window:</strong> $\\mathbf{W_{\\text{effective}} = \\min(rwnd, cwnd)}$.</li>\n                        <li><strong>AIMD Algorithm (Additive Increase, Multiplicative Decrease):</strong>\n                            <ul>\n                                <li><strong>Slow Start:</strong> Starts at $cwnd = 1 \\text{ MSS}$. Doubles every RTT ($1 \\to 2 \\to 4 \\to 8$) until reaching slow start threshold $ssthresh$.</li>\n                                <li><strong>Congestion Avoidance:</strong> Increases linearly by $+1 \\text{ MSS}$ per RTT.</li>\n                                <li><strong>Loss Event (Triple Duplicate ACK):</strong> Multiplicative decrease: $ssthresh = cwnd / 2$, fast retransmit missing packet, fast recovery sets $cwnd = ssthresh + 3 \\text{ MSS}$.</li>\n                            </ul>\n                        </li>\n                    </ul>\n                ",
                "keywords": [
                    "Flow Control (rwnd)",
                    "Congestion Control (cwnd)",
                    "AIMD Algorithm",
                    "Slow Start",
                    "Congestion Avoidance",
                    "Fast Retransmit",
                    "Fast Recovery",
                    "ssthresh"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Receiver Sliding Window Buffer & AIMD Sawtooth Curve",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(30, 20)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">Receiver Buffer & rwnd (Flow Control):</text>\n                        <rect x=\"0\" y=\"30\" width=\"320\" height=\"40\" rx=\"4\" fill=\"#f1f5f9\" stroke=\"#94a3b8\"/>\n                        <rect x=\"0\" y=\"30\" width=\"140\" height=\"40\" fill=\"#fca5a5\"/><text x=\"70\" y=\"55\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#991b1b\">Buffered (Unread)</text>\n                        <rect x=\"140\" y=\"30\" width=\"180\" height=\"40\" fill=\"#86efac\"/><text x=\"230\" y=\"55\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#166534\">Free Space (rwnd = 180B)</text>\n                        <text x=\"160\" y=\"90\" text-anchor=\"middle\" font-size=\"10.5\" font-weight=\"600\" fill=\"#1e40af\">Sender cannot send more than rwnd bytes!</text>\n                    </g>\n                    <g transform=\"translate(390, 20)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">AIMD cwnd Evolution (Sawtooth Curve):</text>\n                        <line x1=\"30\" y1=\"130\" x2=\"330\" y2=\"130\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n                        <line x1=\"30\" y1=\"130\" x2=\"30\" y2=\"30\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n                        <path d=\"M 30,130 Q 60,125 80,90 L 130,50 L 130,90 L 190,50 L 190,90 L 250,50 L 250,90 L 310,50\" fill=\"none\" stroke=\"#dc2626\" stroke-width=\"2.5\"/>\n                        <text x=\"60\" y=\"115\" font-size=\"9\" fill=\"#64748b\">Slow Start</text>\n                        <text x=\"140\" y=\"42\" font-size=\"9\" font-weight=\"600\" fill=\"#dc2626\">Drop: cwnd/2</text>\n                    </g>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>Flow Control vs Congestion Control Distinction</h4>\n                    <p><strong>Flow Control:</strong> Protects the receiver host from buffer exhaustion ($rwnd$).</p>\n                    <p><strong>Congestion Control:</strong> Protects intermediate network routers from packet drop collapse ($cwnd$).</p>\n                    <div class=\"formula-line\">$$W_{\\text{effective}} = \\min(rwnd, cwnd)$$</div>\n                </div>",
                "examTip": "In Part B descriptive questions, always contrast flow control (end-to-end between 2 hosts) with congestion control (network-wide across shared routers)."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Deploy rwnd Shield to Deflect Buffer Overflow",
                "missionDescription": "Face buffer hitmen in Sector 4:",
                "objectives": [
                    "Press [Right-Click / K] to deploy the rwnd Sliding Window shield.",
                    "Deflect incoming packet floods and absorb buffer shockwaves!"
                ],
                "actionText": "\ud83c\udfae Start Mission: Test rwnd Shield Defense [Space]"
            }
        ]
    },
    {
        "id": "m2_sockets_io_multiplexing",
        "number": 10,
        "module": 2,
        "moduleTitle": "MODULE 2: TRANSPORT & NETWORK LAYERS",
        "title": "Berkeley Socket API: Server Sequence & I/O Multiplexing (select vs poll)",
        "badge": "SOCKET API",
        "ktuRef": "Syllabus Mod 2 Part A // Socket System Calls & I/O Multiplexing (select, poll) (Part A 3M / Part B 9M)",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Network Programming System Calls & Concurrency Models",
                "storyline": "Unit 0xVOID arrives at the socket daemon terminal. In Unix systems, network endpoints are treated as file descriptors accessed through the Berkeley Sockets API.",
                "theory": "\n                    <p>The standard Berkeley Socket programming API coordinates network communication between client and server processes:</p>\n                    <ul>\n                        <li><strong>TCP Server Function Sequence:</strong>\n                            <ol>\n                                <li><code>socket()</code>: Creates an endpoint for communication, returning a file descriptor.</li>\n                                <li><code>bind()</code>: Binds the socket to a local IP address and port number (<code>struct sockaddr_in</code>).</li>\n                                <li><code>listen()</code>: Places socket in passive listening state, specifying connection backlog queue size.</li>\n                                <li><code>accept()</code>: Blocks until an incoming connection arrives, then returns a <em>new socket file descriptor</em> dedicated to that client!</li>\n                                <li><code>read() / write()</code> (or <code>recv() / send()</code>): Exchanges data over the established stream.</li>\n                                <li><code>close()</code>: Tears down the socket connection.</li>\n                            </ol>\n                        </li>\n                        <li><strong>TCP Client Sequence:</strong> <code>socket() -> connect() -> write() -> read() -> close()</code>.</li>\n                        <li><strong>I/O Multiplexing (select vs poll):</strong>\n                            <ul>\n                                <li><strong>select():</strong> Uses fixed-size bitmasks (<code>fd_set</code>) to monitor multiple descriptors for read/write readiness. Limited to <code>FD_SETSIZE</code> (typically 1024). Requires re-initializing the mask before every call because kernel modifies it in-place.</li>\n                                <li><strong>poll():</strong> Replaces bitmasks with an array of <code>struct pollfd { int fd; short events; short revents; }</code>. Has <strong>no 1024 descriptor limit</strong> and separates input events from output revents, eliminating the need to re-initialize before each call!</li>\n                            </ul>\n                        </li>\n                    </ul>\n                ",
                "keywords": [
                    "socket()",
                    "bind()",
                    "listen()",
                    "accept()",
                    "connect()",
                    "I/O Multiplexing",
                    "select()",
                    "poll()",
                    "FD_SET",
                    "struct pollfd"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "TCP Socket Call Sequence & select() vs poll() Architecture",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(30, 20)\">\n                        <text x=\"140\" y=\"15\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">Server-Client Socket Handshake Flow:</text>\n                        <!-- Server Column -->\n                        <rect x=\"0\" y=\"30\" width=\"120\" height=\"24\" rx=\"3\" fill=\"#1e293b\"/><text x=\"60\" y=\"46\" text-anchor=\"middle\" font-family=\"monospace\" font-size=\"10\" fill=\"#38bdf8\">1. socket()</text>\n                        <rect x=\"0\" y=\"58\" width=\"120\" height=\"24\" rx=\"3\" fill=\"#1e293b\"/><text x=\"60\" y=\"74\" text-anchor=\"middle\" font-family=\"monospace\" font-size=\"10\" fill=\"#38bdf8\">2. bind()</text>\n                        <rect x=\"0\" y=\"86\" width=\"120\" height=\"24\" rx=\"3\" fill=\"#1e293b\"/><text x=\"60\" y=\"102\" text-anchor=\"middle\" font-family=\"monospace\" font-size=\"10\" fill=\"#38bdf8\">3. listen()</text>\n                        <rect x=\"0\" y=\"114\" width=\"120\" height=\"24\" rx=\"3\" fill=\"#1e40af\"/><text x=\"60\" y=\"130\" text-anchor=\"middle\" font-family=\"monospace\" font-size=\"10\" fill=\"#ffffff\">4. accept() [blocks]</text>\n                        <!-- Client Column -->\n                        <rect x=\"180\" y=\"30\" width=\"120\" height=\"24\" rx=\"3\" fill=\"#047857\"/><text x=\"240\" y=\"46\" text-anchor=\"middle\" font-family=\"monospace\" font-size=\"10\" fill=\"#ffffff\">socket()</text>\n                        <rect x=\"180\" y=\"86\" width=\"120\" height=\"24\" rx=\"3\" fill=\"#047857\"/><text x=\"240\" y=\"102\" text-anchor=\"middle\" font-family=\"monospace\" font-size=\"10\" fill=\"#ffffff\">connect()</text>\n                        <line x1=\"180\" y1=\"98\" x2=\"120\" y2=\"126\" stroke=\"#2563eb\" stroke-width=\"2\"/><polygon points=\"124,122 118,126 124,130\" fill=\"#2563eb\"/>\n                        <text x=\"150\" y=\"110\" font-size=\"9\" fill=\"#2563eb\">SYN</text>\n                    </g>\n                    <g transform=\"translate(360, 20)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">select() vs poll() Comparison Matrix:</text>\n                        <rect x=\"0\" y=\"30\" width=\"360\" height=\"135\" rx=\"4\" fill=\"#ffffff\" stroke=\"#cbd5e1\"/>\n                        <text x=\"15\" y=\"55\" font-size=\"11\" font-weight=\"700\" fill=\"#1e40af\">\u2022 select():</text>\n                        <text x=\"80\" y=\"55\" font-size=\"10.5\" fill=\"#334155\">Fixed FD_SETSIZE limit (1024). O(N) linear scan.</text>\n                        <text x=\"15\" y=\"75\" font-size=\"10.5\" fill=\"#334155\">Kernel modifies fd_set; must re-initialize mask every loop.</text>\n                        <text x=\"15\" y=\"105\" font-size=\"11\" font-weight=\"700\" fill=\"#15803d\">\u2022 poll():</text>\n                        <text x=\"70\" y=\"105\" font-size=\"10.5\" fill=\"#334155\">Array of pollfd structs. No 1024 limit!</text>\n                        <text x=\"15\" y=\"125\" font-size=\"10.5\" fill=\"#334155\">Separates events (input) and revents (output).</text>\n                        <text x=\"15\" y=\"145\" font-size=\"10.5\" fill=\"#15803d\">Does not require re-initialization before each call.</text>\n                    </g>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>pollfd Structure Syntax for KTU Examinations</h4>\n                    <pre style=\"background:#f1f5f9; padding:6px; border-radius:4px; font-size:11px;\">\nstruct pollfd {\n    int   fd;       /* file descriptor to monitor */\n    short events;   /* requested events (POLLIN, POLLOUT) */\n    short revents;  /* returned events from kernel */\n};\nint poll(struct pollfd *fds, nfds_t nfds, int timeout);</pre>\n                </div>",
                "examTip": "Remember: accept() creates a NEW connected socket descriptor for client communication. The listening socket remains open to accept additional incoming client connections."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Speak with the Socket Daemon in Sector 4",
                "missionDescription": "Consult the socket daemon NPC in Sector 4:",
                "objectives": [
                    "Locate The Socket Daemon near the core server gateway.",
                    "Review socket file descriptor multiplexing via select() and poll()."
                ],
                "actionText": "\ud83c\udfae Start Mission: Consult Socket Daemon [Space]"
            }
        ]
    },
    {
        "id": "m2_ipv4_cidr",
        "number": 11,
        "module": 2,
        "moduleTitle": "MODULE 2: TRANSPORT & NETWORK LAYERS",
        "title": "IPv4 Addressing, Subnet Masks & CIDR Subnetting Calculations",
        "badge": "NUMERICAL",
        "ktuRef": "Official Model Paper Q12b // 9 Marks // CIDR Subnetting & Usable Hosts",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Logical Host Identification & Subnet Partitioning",
                "storyline": "Unit 0xVOID ascends to Sector 3. At Layer 3, physical MAC addresses are not routable across global hops. The Network Layer assigns logical 32-bit IPv4 addresses partitioned into Network ID and Host ID.",
                "theory": "\n                    <p>An IPv4 address consists of 32 binary bits divided into four 8-bit octets (e.g., <code>192.168.1.1</code>). Modern networks universally deploy <strong>CIDR (Classless Inter-Domain Routing)</strong> using slash notation (e.g., <code>/24</code>):</p>\n                    <ul>\n                        <li>The prefix length <code>/n</code> indicates that the first $n$ bits identify the <strong>Network ID</strong>, leaving $32 - n$ bits for <strong>Host IDs</strong>.</li>\n                        <li><strong>Network Address:</strong> All host bits set to 0. Identifies the subnet itself.</li>\n                        <li><strong>Broadcast Address:</strong> All host bits set to 1. Used to send to every host on that subnet.</li>\n                        <li><strong>Usable Hosts Formula:</strong> In a subnet with $h = 32 - n$ host bits, the number of usable assignable IP addresses is strictly <strong>$2^h - 2$</strong> (subtracting Network and Broadcast addresses).</li>\n                    </ul>\n                ",
                "keywords": [
                    "IPv4 Address (32-bit)",
                    "CIDR Notation (/n)",
                    "Subnet Mask",
                    "Network ID",
                    "Broadcast Address",
                    "Usable Hosts (2^h - 2)"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Subnetting Calculation Example for 192.168.10.0/26",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(40, 30)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"13\" font-weight=\"700\" fill=\"#0f172a\">IPv4 32-Bit Address Division for /26 Subnet Mask:</text>\n                        <rect x=\"0\" y=\"30\" width=\"480\" height=\"40\" fill=\"#dbeafe\" stroke=\"#2563eb\" rx=\"4\"/>\n                        <text x=\"240\" y=\"55\" text-anchor=\"middle\" font-family=\"-apple-system, sans-serif\" font-size=\"13\" font-weight=\"700\" fill=\"#1e40af\">26 Network Bits (Prefix)</text>\n                        <rect x=\"485\" y=\"30\" width=\"195\" height=\"40\" fill=\"#fef3c7\" stroke=\"#d97706\" rx=\"4\"/>\n                        <text x=\"582\" y=\"55\" text-anchor=\"middle\" font-family=\"-apple-system, sans-serif\" font-size=\"13\" font-weight=\"700\" fill=\"#b45309\">6 Host Bits</text>\n                    </g>\n                    <g transform=\"translate(40, 115)\" font-family=\"-apple-system, sans-serif\" font-size=\"12\">\n                        <text x=\"0\" y=\"15\" fill=\"#0f172a\" font-weight=\"600\">\u2022 Subnet Mask: 255.255.255.192 (11111111.11111111.11111111.11000000)</text>\n                        <text x=\"0\" y=\"35\" fill=\"#0f172a\" font-weight=\"600\">\u2022 Total Addresses per Subnet: 2\u2076 = 64 addresses</text>\n                        <text x=\"0\" y=\"55\" fill=\"#15803d\" font-weight=\"700\">\u2022 Usable Hosts per Subnet: 2\u2076 - 2 = 62 usable host addresses (192.168.10.1 to 192.168.10.62)</text>\n                        <text x=\"0\" y=\"75\" fill=\"#b91c1c\" font-weight=\"600\">\u2022 Broadcast Address: 192.168.10.63</text>\n                    </g>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>KTU University Exam Derivation</h4>\n                    <div class=\"formula-line\">$$\\text{Network ID} = \\text{IP Address} \\text{ AND } \\text{Subnet Mask}$$</div>\n                    <p><strong>Example:</strong> Given IP <code>172.16.45.10/20</code>. 20 mask bits $= 255.255.240.0$. Bitwise AND on 3rd octet ($45 \\text{ AND } 240 = 32$) yields Network ID <strong>172.16.32.0</strong>.</p>\n                </div>",
                "examTip": "Never forget to subtract 2 for usable hosts! Writing 2^h instead of 2^h - 2 will cost you 2 marks on KTU Part B papers."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Verify Subnet Masks to Bypass Security Firewalls",
                "missionDescription": "Navigate the CIDR Subnetting checkpoints in Sector 3:",
                "objectives": [
                    "Approach the Network Layer Firewall in Sector 3.",
                    "Verify the CIDR prefix matching your datagram destination IP.",
                    "Pass through the authenticated subnet gateway to proceed deeper!"
                ],
                "actionText": "\ud83c\udfae Start Mission: Solve CIDR Subnet Challenge [Space]"
            }
        ]
    },
    {
        "id": "m2_ipv4_fragmentation",
        "number": 12,
        "module": 2,
        "moduleTitle": "MODULE 2: TRANSPORT & NETWORK LAYERS",
        "title": "IPv4 Header, MTU Limits & Packet Fragmentation (8-Byte Offset Math)",
        "badge": "NUMERICAL",
        "ktuRef": "Official Model Paper Q12b Choice B // 9 Marks // IPv4 Header & Fragmentation Offsets",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Splitting Large Datagrams Across Constrained Links",
                "storyline": "Unit 0xVOID carries 4000 bytes of diagnostic data toward the core router. Suddenly, the outgoing link narrows: its Maximum Transmission Unit (MTU) is only 1500 bytes. The packet cannot pass intact. The router must fragment it.",
                "theory": "\n                    <p>Every data link technology imposes a <strong>Maximum Transmission Unit (MTU)</strong> (e.g., standard Ethernet MTU is 1500 bytes). If an IPv4 datagram exceeds the outgoing link MTU, the router splits the payload across multiple fragments:</p>\n                    <ul>\n                        <li><strong>Identification (16 bits):</strong> Unique sequence number copied into all fragments so the destination knows they belong together.</li>\n                        <li><strong>Flags (3 bits):</strong>\n                            <ul>\n                                <li><code>DF (Don't Fragment)</code>: If set to 1 and packet exceeds MTU, router drops it and sends back an ICMP Destination Unreachable message.</li>\n                                <li><code>MF (More Fragments)</code>: Set to 1 for all fragments except the final fragment (which has MF = 0).</li>\n                            </ul>\n                        </li>\n                        <li><strong>Fragment Offset (13 bits):</strong> Measures position of the fragment data relative to original unfragmented datagram. <em>Expressed strictly in units of 8-byte blocks (64 bits)</em>! Therefore, all fragment payload sizes (except the last) MUST be exact multiples of 8!</li>\n                    </ul>\n                ",
                "keywords": [
                    "MTU (Maximum Transmission Unit)",
                    "IPv4 Fragmentation",
                    "Identification Field",
                    "DF Flag",
                    "MF Flag",
                    "Fragment Offset (8-byte units)"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "4000-Byte Datagram Fragmented for MTU = 1500 Bytes",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(30, 20)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">Original Datagram: Total = 4000 Bytes (20B IP Header + 3980B Payload)</text>\n                        <rect x=\"0\" y=\"25\" width=\"700\" height=\"28\" fill=\"#e0f2fe\" stroke=\"#0284c7\" rx=\"3\"/>\n                        <text x=\"350\" y=\"44\" text-anchor=\"middle\" font-family=\"-apple-system, sans-serif\" font-size=\"11\" font-weight=\"700\" fill=\"#0369a1\">Length = 4000, ID = 999, DF = 0, MF = 0, Offset = 0</text>\n                    </g>\n                    <text x=\"380\" y=\"80\" text-anchor=\"middle\" font-family=\"-apple-system, sans-serif\" font-size=\"11\" font-weight=\"700\" fill=\"#dc2626\">MTU = 1500 (Max Data Payload = 1500 - 20 = 1480 Bytes, Divisible by 8: 1480 / 8 = 185)</text>\n                    <g transform=\"translate(30, 95)\" font-family=\"-apple-system, sans-serif\" font-size=\"11\">\n                        <rect x=\"0\" y=\"0\" width=\"220\" height=\"90\" rx=\"4\" fill=\"#ffffff\" stroke=\"#cbd5e1\"/>\n                        <text x=\"10\" y=\"22\" font-weight=\"700\" fill=\"#1e40af\">FRAGMENT 1</text>\n                        <text x=\"10\" y=\"40\" fill=\"#334155\">\u2022 Total Length: 1500 (20+1480)</text>\n                        <text x=\"10\" y=\"58\" fill=\"#334155\">\u2022 MF = 1</text>\n                        <text x=\"10\" y=\"76\" font-weight=\"700\" fill=\"#15803d\">\u2022 Offset = 0 (0 / 8)</text>\n                        <rect x=\"240\" y=\"0\" width=\"220\" height=\"90\" rx=\"4\" fill=\"#ffffff\" stroke=\"#cbd5e1\"/>\n                        <text x=\"250\" y=\"22\" font-weight=\"700\" fill=\"#1e40af\">FRAGMENT 2</text>\n                        <text x=\"250\" y=\"40\" fill=\"#334155\">\u2022 Total Length: 1500 (20+1480)</text>\n                        <text x=\"250\" y=\"58\" fill=\"#334155\">\u2022 MF = 1</text>\n                        <text x=\"250\" y=\"76\" font-weight=\"700\" fill=\"#15803d\">\u2022 Offset = 185 (1480 / 8)</text>\n                        <rect x=\"480\" y=\"0\" width=\"220\" height=\"90\" rx=\"4\" fill=\"#ffffff\" stroke=\"#cbd5e1\"/>\n                        <text x=\"490\" y=\"22\" font-weight=\"700\" fill=\"#1e40af\">FRAGMENT 3 (LAST)</text>\n                        <text x=\"490\" y=\"40\" fill=\"#334155\">\u2022 Total Length: 1040 (20+1020)</text>\n                        <text x=\"490\" y=\"58\" fill=\"#b91c1c\">\u2022 MF = 0 (Last!)</text>\n                        <text x=\"490\" y=\"76\" font-weight=\"700\" fill=\"#15803d\">\u2022 Offset = 370 (2960 / 8)</text>\n                    </g>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>Fragment Offset Derivation Formula</h4>\n                    <div class=\"formula-line\">$$\\text{Offset}_k = \\frac{\\sum_{i=1}^{k-1} \\text{Data Length}_i}{8}$$</div>\n                    <p>Reassembly occurs ONLY at the final destination host, NOT at intermediate routers!</p>\n                </div>",
                "examTip": "The #1 error on KTU exams is forgetting to divide the byte count by 8 when writing the Fragment Offset field."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Solve the MTU Fragmentation Minigame in Sector 3",
                "missionDescription": "Fragment an oversized payload at the MTU gateway:",
                "objectives": [
                    "Approach the MTU Gateway Console at x: 480 in Sector 3.",
                    "Press [E] to engage the IPv4 Fragmentation Diagnostic terminal.",
                    "Compute correct Total Length, MF flags, and 8-byte offsets to send the fragments!"
                ],
                "actionText": "\ud83c\udfae Start Mission: Execute Fragmentation Terminal [Space]"
            }
        ]
    },
    {
        "id": "m2_dijkstra_link_state",
        "number": 13,
        "module": 2,
        "moduleTitle": "MODULE 2: TRANSPORT & NETWORK LAYERS",
        "title": "Routing Algorithms: Dijkstra's Link-State SPF vs Distance-Vector Bellman-Ford",
        "badge": "NUMERICAL",
        "ktuRef": "Official Model Paper Q12b // 9 Marks // Dijkstra Routing Table Calculation",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Finding Least-Cost Paths in Link-State Protocols (OSPF)",
                "storyline": "At the heart of Sector 3 looms Boss OSPF (Open Shortest Path First). To navigate through the autonomous system without packet looping, Unit 0xVOID must compute the Shortest Path Tree using Dijkstra's algorithm.",
                "theory": "\n                    <p>Routing protocols determine the optimal path for packets across complex topologies. They fall into two primary classes:</p>\n                    <ul>\n                        <li><strong>Link-State (OSPF, IS-IS):</strong> Every router floods Link-State Advertisements (LSAs) so all nodes possess an identical global topology map. Each router independently executes <strong>Dijkstra's Shortest Path First (SPF)</strong> algorithm to find least-cost paths to all destinations. Fast convergence, zero count-to-infinity loops.</li>\n                        <li><strong>Distance Vector (RIP):</strong> Routers only share their current distance vector table with direct neighbors (Bellman-Ford equation: $D_x(y) = \\min_v \\{ c(x,v) + D_v(y) \\}$). Prone to slow convergence and the <em>Count-to-Infinity Problem</em> (mitigated via Split Horizon and Poison Reverse).</li>\n                    </ul>\n                ",
                "keywords": [
                    "Dijkstra's SPF Algorithm",
                    "Link-State Routing",
                    "Distance Vector (Bellman-Ford)",
                    "OSPF",
                    "Count-to-Infinity",
                    "Split Horizon"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Graph Topology & Dijkstra Shortest Path Tree from Node A",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g font-family=\"-apple-system, sans-serif\" font-size=\"13\" font-weight=\"700\">\n                        <circle cx=\"80\" cy=\"105\" r=\"22\" fill=\"#2563eb\" stroke=\"#1d4ed8\" stroke-width=\"2\"/><text x=\"80\" y=\"110\" text-anchor=\"middle\" fill=\"#ffffff\">A</text>\n                        <circle cx=\"260\" cy=\"45\" r=\"22\" fill=\"#eff6ff\" stroke=\"#2563eb\" stroke-width=\"2\"/><text x=\"260\" y=\"50\" text-anchor=\"middle\" fill=\"#1e40af\">B</text>\n                        <circle cx=\"260\" cy=\"165\" r=\"22\" fill=\"#eff6ff\" stroke=\"#2563eb\" stroke-width=\"2\"/><text x=\"260\" y=\"170\" text-anchor=\"middle\" fill=\"#1e40af\">C</text>\n                        <circle cx=\"480\" cy=\"45\" r=\"22\" fill=\"#eff6ff\" stroke=\"#2563eb\" stroke-width=\"2\"/><text x=\"480\" y=\"50\" text-anchor=\"middle\" fill=\"#1e40af\">D</text>\n                        <circle cx=\"480\" cy=\"165\" r=\"22\" fill=\"#eff6ff\" stroke=\"#2563eb\" stroke-width=\"2\"/><text x=\"480\" y=\"170\" text-anchor=\"middle\" fill=\"#1e40af\">E</text>\n                        <circle cx=\"660\" cy=\"105\" r=\"22\" fill=\"#16a34a\" stroke=\"#15803d\" stroke-width=\"2\"/><text x=\"660\" y=\"110\" text-anchor=\"middle\" fill=\"#ffffff\">Z</text>\n                    </g>\n                    <line x1=\"102\" y1=\"95\" x2=\"238\" y2=\"55\" stroke=\"#16a34a\" stroke-width=\"3.5\"/><text x=\"160\" y=\"65\" font-weight=\"700\" fill=\"#16a34a\">2</text>\n                    <line x1=\"102\" y1=\"115\" x2=\"238\" y2=\"155\" stroke=\"#94a3b8\" stroke-width=\"1.5\"/><text x=\"160\" y=\"150\" font-weight=\"600\" fill=\"#64748b\">5</text>\n                    <line x1=\"282\" y1=\"45\" x2=\"458\" y2=\"45\" stroke=\"#16a34a\" stroke-width=\"3.5\"/><text x=\"370\" y=\"38\" font-weight=\"700\" fill=\"#16a34a\">1</text>\n                    <line x1=\"260\" y1=\"67\" x2=\"260\" y2=\"143\" stroke=\"#94a3b8\" stroke-width=\"1.5\"/><text x=\"270\" y=\"110\" font-weight=\"600\" fill=\"#64748b\">3</text>\n                    <line x1=\"502\" y1=\"55\" x2=\"638\" y2=\"95\" stroke=\"#16a34a\" stroke-width=\"3.5\"/><text x=\"580\" y=\"65\" font-weight=\"700\" fill=\"#16a34a\">2</text>\n                    <line x1=\"502\" y1=\"155\" x2=\"638\" y2=\"115\" stroke=\"#94a3b8\" stroke-width=\"1.5\"/><text x=\"580\" y=\"150\" font-weight=\"600\" fill=\"#64748b\">4</text>\n                    <text x=\"380\" y=\"195\" text-anchor=\"middle\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">Optimal Least-Cost Path: A -> B -> D -> Z (Total Cost = 2 + 1 + 2 = 5)</text>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>Dijkstra Step-by-Step State Table</h4>\n                    <p>At each step, add the minimum tentative node $w$ into permanent set $N'$ and relax edges: $D(v) = \\min(D(v), D(w) + c(w,v))$.</p>\n                </div>",
                "examTip": "In KTU exams, always construct the formal step-by-step table showing the permanent set N' growing at each iteration."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Defeat Boss OSPF Using Dijkstra Shortest Path Rays",
                "missionDescription": "Challenge the central routing guardian of Sector 3:",
                "objectives": [
                    "Approach Boss OSPF at the core junction of Sector 3.",
                    "Open the Dijkstra Routing minigame to calculate the least-cost graph tree.",
                    "Fire Dijkstra Shortest Path rays to unlock Sector 4!"
                ],
                "actionText": "\ud83c\udfae Start Mission: Execute Dijkstra SPF Calculation [Space]"
            }
        ]
    },
    {
        "id": "m2_ipv6_qos",
        "number": 14,
        "module": 2,
        "moduleTitle": "MODULE 2: TRANSPORT & NETWORK LAYERS",
        "title": "IPv6 Architecture: 128-Bit Addressing, Simplified 40-Byte Header & QoS",
        "badge": "CORE CONCEPT",
        "ktuRef": "Syllabus Mod 2 Part B // IPv6 Header Format, Flow Label & QoS (Part A 3M / Part B 9M)",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Address Depletion Resolution & High-Speed Routing Enhancements",
                "storyline": "Unit 0xVOID examines the next-generation protocol core. IPv4's 32-bit address pool (4.3 billion addresses) is exhausted. IPv6 provides an enormous 128-bit address space and streamlines router processing.",
                "theory": "\n                    <p>IPv6 was designed to overcome the structural limits of IPv4:</p>\n                    <ul>\n                        <li><strong>128-Bit Address Space:</strong> $2^{128} \u0007pprox 3.4 \times 10^{38}$ addresses. Written in 8 groups of 4 hexadecimal digits separated by colons (e.g., <code>2001:0db8:85a3::8a2e:0370:7334</code>). Double colon (<code>::</code>) compresses consecutive zeros once.</li>\n                        <li><strong>Fixed 40-Byte Base Header:</strong> Eliminates variable-length header processing at routers. Fields: Version (4b), Traffic Class (8b - DiffServ), Flow Label (20b), Payload Length (16b), Next Header (8b), Hop Limit (8b - replaces TTL), Source Address (128b), Destination Address (128b).</li>\n                        <li><strong>Flow Label & QoS:</strong> The 20-bit Flow Label field identifies packets belonging to a specific non-default real-time flow (VoIP, video streaming), allowing routers to bypass routing table lookups and provide Quality of Service (QoS).</li>\n                        <li><strong>No Router Fragmentation:</strong> Intermediate routers NEVER fragment packets! Source hosts perform Path MTU Discovery (PMTUD).</li>\n                    </ul>\n                ",
                "keywords": [
                    "IPv6 (128-bit)",
                    "Fixed 40-Byte Header",
                    "Flow Label",
                    "Traffic Class (QoS)",
                    "Next Header (Chaining)",
                    "Hop Limit",
                    "Path MTU Discovery (PMTUD)"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "IPv6 40-Byte Base Header Structure vs IPv4 Header",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(30, 20)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">IPv6 40-Byte Base Header (Fixed Length):</text>\n                        <rect x=\"0\" y=\"25\" width=\"700\" height=\"28\" rx=\"3\" fill=\"#dbeafe\" stroke=\"#2563eb\"/>\n                        <text x=\"50\" y=\"44\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#1e40af\">Ver (4b)</text>\n                        <text x=\"140\" y=\"44\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#1e40af\">Traffic Class (8b)</text>\n                        <text x=\"400\" y=\"44\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#15803d\">Flow Label (20b - Real-Time QoS!)</text>\n                        <rect x=\"0\" y=\"58\" width=\"700\" height=\"28\" rx=\"3\" fill=\"#dbeafe\" stroke=\"#2563eb\"/>\n                        <text x=\"150\" y=\"77\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#1e40af\">Payload Length (16b)</text>\n                        <text x=\"400\" y=\"77\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#1e40af\">Next Header (8b)</text>\n                        <text x=\"600\" y=\"77\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#1e40af\">Hop Limit (8b)</text>\n                        <rect x=\"0\" y=\"91\" width=\"700\" height=\"28\" rx=\"3\" fill=\"#e0f2fe\" stroke=\"#0284c7\"/>\n                        <text x=\"350\" y=\"110\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#0369a1\">Source IPv6 Address (128 Bits / 16 Bytes)</text>\n                        <rect x=\"0\" y=\"124\" width=\"700\" height=\"28\" rx=\"3\" fill=\"#e0f2fe\" stroke=\"#0284c7\"/>\n                        <text x=\"350\" y=\"143\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#0369a1\">Destination IPv6 Address (128 Bits / 16 Bytes)</text>\n                    </g>\n                    <text x=\"380\" y=\"195\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"600\" fill=\"#475569\">Key Optimization: No Checksum, No Header Length field, No router fragmentation!</text>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>IPv4 vs IPv6 Architectural Comparison</h4>\n                    <p><strong>Address Length:</strong> 32 bits (4.3B) vs 128 bits ($3.4 \times 10^{38}$).</p>\n                    <p><strong>Header:</strong> Variable (20-60B) vs Fixed 40 Bytes.</p>\n                    <p><strong>Checksum:</strong> Present in IPv4 (recalculated at every router) -> Completely removed in IPv6 to boost forwarding throughput.</p>\n                </div>",
                "examTip": "In KTU Part B, explain the Next Header field: it points to either a transport layer protocol (TCP=6, UDP=17) OR an extension header (Hop-by-Hop, Routing, Fragment)."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Inspect IPv6 Header Flags in Sector 3",
                "missionDescription": "Explore next-generation packet fields:",
                "objectives": [
                    "Compare IPv4 20-byte headers with IPv6 40-byte fixed structures.",
                    "Verify how Flow Labels enable QoS streaming across backbones."
                ],
                "actionText": "\ud83c\udfae Start Mission: Study IPv6 Architecture [Space]"
            }
        ]
    },
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
                "theory": "\n                    <p>To allow the receiver to identify where each frame begins and ends, framing protocols insert special delimiter sequences. If payload data accidentally contains these flag patterns, framing mechanisms preserve data transparency:</p>\n                    <ul>\n                        <li><strong>Byte/Character Stuffing:</strong> Uses a 1-byte flag (e.g., ASCII DLE STX start, DLE ETX end). If DLE appears inside the data, the sender inserts an escape DLE byte immediately before it. The receiver strips the first DLE.</li>\n                        <li><strong>Bit Stuffing (HDLC):</strong> Frame delimiter is strictly <strong>01111110</strong> (six consecutive 1s). The sender scans the payload; whenever it detects <em>five consecutive 1s</em>, it automatically stuffs a <strong>0</strong> bit immediately after, regardless of what follows!</li>\n                    </ul>\n                    <p>At the receiver, whenever five consecutive 1s are followed by a 0, the receiver unstuffs (discards) the 0. If five 1s are followed by a 1, it inspects the next bit: a 0 indicates the end of frame flag; a 1 indicates an error.</p>\n                ",
                "keywords": [
                    "Framing",
                    "HDLC",
                    "Flag (01111110)",
                    "Bit Stuffing",
                    "Byte Stuffing (DLE)",
                    "Character De-stuffing",
                    "Data Transparency"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Bit Stuffing Mechanism for Sequence: 01111110111110",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <text x=\"30\" y=\"35\" font-family=\"-apple-system, sans-serif\" font-size=\"13\" font-weight=\"700\" fill=\"#0f172a\">1. ORIGINAL PAYLOAD DATA:</text>\n                    <g transform=\"translate(30, 50)\" font-family=\"monospace\" font-size=\"15\" font-weight=\"700\">\n                        <rect x=\"0\" y=\"0\" width=\"340\" height=\"35\" fill=\"#f1f5f9\" stroke=\"#94a3b8\" rx=\"4\"/>\n                        <text x=\"15\" y=\"24\" fill=\"#334155\">0 1 1 1 1 1 1 0 1 1 1 1 1 0</text>\n                    </g>\n                    <g transform=\"translate(190, 95)\">\n                        <line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"20\" stroke=\"#0ea5e9\" stroke-width=\"2.5\"/><polygon points=\"-5,18 0,26 5,18\" fill=\"#0ea5e9\"/>\n                        <text x=\"15\" y=\"16\" font-family=\"-apple-system, sans-serif\" font-size=\"11\" font-weight=\"600\" fill=\"#0284c7\">Rule: After five consecutive 1s, stuff a '0' bit!</text>\n                    </g>\n                    <text x=\"30\" y=\"145\" font-family=\"-apple-system, sans-serif\" font-size=\"13\" font-weight=\"700\" fill=\"#15803d\">2. TRANSMITTED FRAME (STUFFED):</text>\n                    <g transform=\"translate(30, 158)\" font-family=\"monospace\" font-size=\"14\" font-weight=\"700\">\n                        <rect x=\"0\" y=\"0\" width=\"110\" height=\"35\" fill=\"#e0e7ff\" stroke=\"#6366f1\" rx=\"4\"/><text x=\"10\" y=\"23\" fill=\"#4338ca\">01111110</text>\n                        <rect x=\"115\" y=\"0\" width=\"370\" height=\"35\" fill=\"#ffffff\" stroke=\"#94a3b8\" rx=\"4\"/>\n                        <text x=\"125\" y=\"23\" fill=\"#0f172a\">0 1 1 1 1 1 <tspan fill=\"#dc2626\" font-weight=\"900\">[0]</tspan> 1 0 1 1 1 1 1 <tspan fill=\"#dc2626\" font-weight=\"900\">[0]</tspan> 0</text>\n                        <rect x=\"490\" y=\"0\" width=\"110\" height=\"35\" fill=\"#e0e7ff\" stroke=\"#6366f1\" rx=\"4\"/><text x=\"500\" y=\"23\" fill=\"#4338ca\">01111110</text>\n                    </g>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>KTU Valuation Standard: Bit Stuffing Rule</h4>\n                    <ul>\n                        <li><strong>Rule:</strong> The transmitter inserts a '0' bit after ANY five consecutive '1's, even if the next bit was already a '0'!</li>\n                        <li><strong>De-stuffing:</strong> Receiver checks 5 ones: if 6th bit is 0, it removes it. If 6th is 1 and 7th is 0, it is the Flag. If 6th and 7th are both 1, it is an abort.</li>\n                    </ul>\n                </div>",
                "examTip": "A classic KTU exam trick gives data ending in five 1s followed by a 0. Students often forget to stuff an extra 0. Always insert the stuffed 0 after five consecutive 1s!"
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Navigate the Bit Stuffing Corridor in Sector 2",
                "missionDescription": "Navigate through the Bit Stuffing obstacle corridor in Sector 2:",
                "objectives": [
                    "Enter Sector 2 (The Frame Matrix).",
                    "Traverse the Bit Stuffing Corridor where bits are checked dynamically.",
                    "Dodge corrupted delimiter flags and observe proper frame encapsulation!"
                ],
                "actionText": "\ud83c\udfae Start Mission: Run the Bit Stuffing Corridor [Space]"
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
                "theory": "\n                    <p>Cyclic Redundancy Check (CRC) is an algebraic error-detecting code based on binary polynomial division using <strong>Modulo-2 Arithmetic</strong> (XOR operation without carry or borrow):</p>\n                    <ul>\n                        <li>Sender and receiver agree beforehand on a <strong>Generator Polynomial $G(X)$</strong> of degree $r$ (e.g., CRC-16, CRC-32).</li>\n                        <li>The sender appends $r$ zero bits to the payload message $M(X)$.</li>\n                        <li>The extended message is divided by the generator polynomial using Modulo-2 division.</li>\n                        <li>The remainder of degree $r-1$, called the <strong>Frame Check Sequence (FCS)</strong>, replaces the appended zeros.</li>\n                        <li>The receiver divides the received frame by $G(X)$. If remainder is all <strong>0s</strong>, the frame is error-free; otherwise, it is dropped.</li>\n                    </ul>\n                ",
                "keywords": [
                    "Cyclic Redundancy Check (CRC)",
                    "Modulo-2 Division (XOR)",
                    "Generator Polynomial G(X)",
                    "Frame Check Sequence (FCS)",
                    "Burst Error Detection"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Step-by-Step Modulo-2 Division Example",
                "svg": "<svg viewBox=\"0 0 760 220\" width=\"100%\" height=\"220\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"220\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(30, 20)\" font-family=\"monospace\" font-size=\"13\">\n                        <text x=\"0\" y=\"20\" fill=\"#0f172a\" font-weight=\"700\">Data = 100100, Generator G(X) = 1101 (Degree r = 3, Append 3 zeros -> 100100000)</text>\n                        <text x=\"0\" y=\"50\" fill=\"#475569\">         1101 ) 100100000 ( 111010  [Quotient discarded]</text>\n                        <text x=\"0\" y=\"70\" fill=\"#2563eb\">                1101</text>\n                        <text x=\"0\" y=\"90\" fill=\"#475569\">                ----</text>\n                        <text x=\"0\" y=\"110\" fill=\"#0f172a\">                 1000</text>\n                        <text x=\"0\" y=\"130\" fill=\"#2563eb\">                 1101</text>\n                        <text x=\"0\" y=\"150\" fill=\"#475569\">                 ----</text>\n                        <text x=\"0\" y=\"170\" fill=\"#0f172a\">                  1010 ...</text>\n                        <text x=\"0\" y=\"195\" fill=\"#15803d\" font-weight=\"700\">Final Remainder (FCS) = 001  ==> Transmitted Frame = 100100 [001]</text>\n                    </g>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>Modulo-2 Rules & Properties of CRC</h4>\n                    <div class=\"formula-line\">$$0 \\oplus 0 = 0, \\quad 0 \\oplus 1 = 1, \\quad 1 \\oplus 0 = 1, \\quad 1 \\oplus 1 = 0$$</div>\n                    <ul>\n                        <li>If $G(X)$ has at least two terms and coefficient of $X^0$ is 1, CRC catches all single-bit errors.</li>\n                        <li>Catches all double-bit errors and odd-numbered bit errors if $G(X)$ contains factor $(X + 1)$.</li>\n                        <li>Catches all burst errors of length $\\le r$ bits.</li>\n                    </ul>\n                </div>",
                "examTip": "A common mistake in KTU exams is performing normal binary subtraction instead of XOR. In Modulo-2 arithmetic, 1 - 1 = 0 and 0 - 1 = 1 (no borrow!)."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Defeat the Corrupt Frame Intruder via CRC Blast",
                "missionDescription": "Use CRC calculations to neutralize corrupt frames in Sector 2:",
                "objectives": [
                    "Approach the CRC Verification Console at x: 420 in Sector 2.",
                    "Solve the Modulo-2 remainder for the incoming noisy packet.",
                    "Verify the Frame Check Sequence to purge corrupted frames!"
                ],
                "actionText": "\ud83c\udfae Start Mission: Execute CRC Verification Drill [Space]"
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
                "theory": "\n                    <p>Random access protocols coordinate channel sharing across broadcast media:</p>\n                    <ul>\n                        <li><strong>Pure ALOHA vs Slotted ALOHA:</strong> Pure ALOHA transmits whenever ready ($S = G e^{-2G}$, max $18.4\\%$ throughput). Slotted ALOHA restricts transmissions to discrete time slots ($S = G e^{-G}$, max $36.8\\%$ throughput).</li>\n                        <li><strong>CSMA Persistence Strategies (Carrier Sense):</strong>\n                            <ul>\n                                <li><strong>1-Persistent CSMA:</strong> If channel is idle, transmit immediately (probability 1). If busy, listen continuously. High collision probability when two stations wait for a transmission to finish.</li>\n                                <li><strong>Non-Persistent CSMA:</strong> If idle, transmit. If busy, wait a random amount of time before sensing again. Reduces collisions, but introduces idle channel waste.</li>\n                                <li><strong>p-Persistent CSMA (Slotted):</strong> If idle, transmit with probability $p$; wait until next slot with probability $1-p$. Balances collision risk and throughput.</li>\n                            </ul>\n                        </li>\n                        <li><strong>CSMA/CD (Collision Detection):</strong> Stations abort transmission upon detecting collision, broadcast a 32-bit jam signal, and wait $R \\times 2\\tau$ using binary exponential backoff. Enforces minimum frame size ($T_{\\text{trans}} \\ge 2 T_{\\text{prop}}$).</li>\n                    </ul>\n                ",
                "keywords": [
                    "Pure ALOHA",
                    "Slotted ALOHA",
                    "1-Persistent CSMA",
                    "Non-Persistent CSMA",
                    "p-Persistent CSMA",
                    "CSMA/CD",
                    "Collision Window (2\u03c4)",
                    "64-Byte Minimum Frame"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "CSMA Persistence Flowchart & Worst-Case Collision Window",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(30, 25)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">CSMA Persistence Comparison:</text>\n                        <rect x=\"0\" y=\"30\" width=\"220\" height=\"40\" rx=\"4\" fill=\"#fee2e2\" stroke=\"#dc2626\"/>\n                        <text x=\"110\" y=\"54\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#991b1b\">1-Persistent: Transmit (P=1)</text>\n                        <rect x=\"0\" y=\"75\" width=\"220\" height=\"40\" rx=\"4\" fill=\"#fef3c7\" stroke=\"#d97706\"/>\n                        <text x=\"110\" y=\"99\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#92400e\">Non-Persistent: Random wait</text>\n                        <rect x=\"0\" y=\"120\" width=\"220\" height=\"40\" rx=\"4\" fill=\"#dcfce7\" stroke=\"#16a34a\"/>\n                        <text x=\"110\" y=\"144\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#166534\">p-Persistent: Transmit with prob p</text>\n                    </g>\n                    <g transform=\"translate(280, 25)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">Worst-Case Collision Window = 2 \u00b7 T_prop:</text>\n                        <line x1=\"20\" y1=\"80\" x2=\"420\" y2=\"80\" stroke=\"#475569\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n                        <rect x=\"30\" y=\"100\" width=\"80\" height=\"36\" rx=\"4\" fill=\"#eff6ff\" stroke=\"#2563eb\"/><text x=\"70\" y=\"122\" text-anchor=\"middle\" font-size=\"10.5\" font-weight=\"700\" fill=\"#1e40af\">Station A</text>\n                        <rect x=\"330\" y=\"100\" width=\"80\" height=\"36\" rx=\"4\" fill=\"#fef2f2\" stroke=\"#dc2626\"/><text x=\"370\" y=\"122\" text-anchor=\"middle\" font-size=\"10.5\" font-weight=\"700\" fill=\"#991b1b\">Station B</text>\n                        <circle cx=\"310\" cy=\"80\" r=\"12\" fill=\"#f59e0b\"/><text x=\"310\" y=\"84\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"900\" fill=\"#ffffff\">\ud83d\udca5</text>\n                        <text x=\"220\" y=\"160\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"600\" fill=\"#334155\">Min Frame Size = 2 \u00b7 T_prop \u00b7 Bandwidth = 512 bits (64 Bytes)</text>\n                    </g>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>Throughput Equations for KTU Valuations</h4>\n                    <p><strong>Pure ALOHA:</strong> $S = G e^{-2G}$ (Maximum throughput is $18.4\\%$ at $G = 0.5$).</p>\n                    <p><strong>Slotted ALOHA:</strong> $S = G e^{-G}$ (Maximum throughput is $36.8\\%$ at $G = 1.0$).</p>\n                    <div class=\"formula-line\">$$T_{\\text{frame}} \\ge 2 \\times T_{\\text{prop}} \\implies \\text{Frame Size} \\ge 2 \\times \\frac{\\text{Distance}}{v} \\times \\text{Bandwidth}$$</div>\n                </div>",
                "examTip": "A guaranteed 9-mark numerical: 'Why is standard Ethernet minimum frame size 64 bytes?' Show the calculation using bus length 2500m and speed 200,000 km/s."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Dodge Collision Waves on the Shared Bus Hazard",
                "missionDescription": "Survive the Collision Bus Hazard in Sector 2:",
                "objectives": [
                    "Step onto the central Ethernet Bus conduit.",
                    "Watch for incoming collision wave pulses traveling down the line.",
                    "Time your movement between carrier sense idle periods to cross safely!"
                ],
                "actionText": "\ud83c\udfae Start Mission: Cross the Collision Bus Hazard [Space]"
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
                "theory": "\n                    <p>Standard IEEE 802.3 Ethernet defines both MAC framing and physical media standards:</p>\n                    <ul>\n                        <li><strong>Ethernet Frame Structure:</strong>\n                            <ul>\n                                <li>Preamble (7 Bytes) + SFD Start Frame Delimiter (1 Byte: <code>10101011</code>)</li>\n                                <li>Destination MAC Address (6 Bytes) + Source MAC Address (6 Bytes)</li>\n                                <li>Type / Length (2 Bytes: length if $\\le 1500$, EtherType if $\\ge 1536$, e.g. <code>0x0800</code> for IPv4)</li>\n                                <li>Payload (46 to 1500 Bytes: padded to 46 if data is smaller)</li>\n                                <li>FCS Frame Check Sequence (4 Bytes CRC-32)</li>\n                            </ul>\n                        </li>\n                        <li><strong>The 10Base Physical Variants Comparison:</strong>\n                            <ul>\n                                <li><strong>10Base5 (Thicknet):</strong> RG-8 thick coaxial cable, 500m maximum segment, bus topology, vampire taps with AUI transceivers, $50\\Omega$ terminators.</li>\n                                <li><strong>10Base2 (Thinnet / CheaperNet):</strong> RG-58 thin coaxial cable, 185m maximum segment, bus topology, BNC T-connectors directly on NIC.</li>\n                                <li><strong>10Base-T:</strong> Category 3/5 Unshielded Twisted Pair (UTP), 100m maximum segment, star topology with central Hub or Switch, RJ-45 modular connectors.</li>\n                                <li><strong>10Base-F:</strong> 850nm Multimode Optical Fiber, 2000m maximum segment, point-to-point star, 100% immune to electromagnetic noise.</li>\n                            </ul>\n                        </li>\n                    </ul>\n                ",
                "keywords": [
                    "IEEE 802.3 Ethernet",
                    "Preamble & SFD",
                    "48-bit MAC Address",
                    "EtherType",
                    "10Base5 (Thicknet)",
                    "10Base2 (Thinnet)",
                    "10Base-T",
                    "10Base-F",
                    "Vampire Tap",
                    "BNC Connector"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Standard Ethernet Frame Format & 10Base Comparison Table",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(30, 20)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">IEEE 802.3 Ethernet Frame Layout (Min 64B, Max 1518B):</text>\n                        <rect x=\"0\" y=\"25\" width=\"70\" height=\"30\" rx=\"3\" fill=\"#e2e8f0\" stroke=\"#94a3b8\"/><text x=\"35\" y=\"44\" text-anchor=\"middle\" font-size=\"9.5\" fill=\"#475569\">Pre (7B)</text>\n                        <rect x=\"70\" y=\"25\" width=\"40\" height=\"30\" rx=\"3\" fill=\"#cbd5e1\" stroke=\"#94a3b8\"/><text x=\"90\" y=\"44\" text-anchor=\"middle\" font-size=\"9\" fill=\"#1e293b\">SFD (1)</text>\n                        <rect x=\"110\" y=\"25\" width=\"90\" height=\"30\" rx=\"3\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"155\" y=\"44\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#1e40af\">Dest MAC (6B)</text>\n                        <rect x=\"200\" y=\"25\" width=\"90\" height=\"30\" rx=\"3\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"245\" y=\"44\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#1e40af\">Src MAC (6B)</text>\n                        <rect x=\"290\" y=\"25\" width=\"60\" height=\"30\" rx=\"3\" fill=\"#ede9fe\" stroke=\"#7c3aed\"/><text x=\"320\" y=\"44\" text-anchor=\"middle\" font-size=\"9.5\" fill=\"#5b21b6\">Type (2)</text>\n                        <rect x=\"350\" y=\"25\" width=\"280\" height=\"30\" rx=\"3\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><text x=\"490\" y=\"44\" text-anchor=\"middle\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15803d\">Payload (Data + Padding: 46 - 1500 Bytes)</text>\n                        <rect x=\"630\" y=\"25\" width=\"70\" height=\"30\" rx=\"3\" fill=\"#fee2e2\" stroke=\"#dc2626\"/><text x=\"665\" y=\"44\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#991b1b\">FCS (4B)</text>\n                    </g>\n                    <g transform=\"translate(30, 80)\">\n                        <rect x=\"0\" y=\"0\" width=\"700\" height=\"110\" rx=\"6\" fill=\"#ffffff\" stroke=\"#cbd5e1\"/>\n                        <text x=\"15\" y=\"22\" font-family=\"-apple-system, sans-serif\" font-size=\"11.5\" font-weight=\"700\" fill=\"#0f172a\">10Base Physical Standards Comparison Matrix:</text>\n                        <text x=\"15\" y=\"45\" font-family=\"monospace\" font-size=\"11\" fill=\"#1e40af\">\u2022 10Base5: 10 Mbps | Baseband | 500m max | RG-8 Coax (Thicknet) | Vampire Tap</text>\n                        <text x=\"15\" y=\"65\" font-family=\"monospace\" font-size=\"11\" fill=\"#1e40af\">\u2022 10Base2: 10 Mbps | Baseband | 185m max | RG-58 Coax (Thinnet)  | BNC T-Connector</text>\n                        <text x=\"15\" y=\"85\" font-family=\"monospace\" font-size=\"11\" fill=\"#15803d\">\u2022 10Base-T: 10 Mbps | Baseband | 100m max | Cat3/5 UTP (Twisted)  | RJ-45 (Star Topology)</text>\n                        <text x=\"15\" y=\"102\" font-family=\"monospace\" font-size=\"11\" fill=\"#0284c7\">\u2022 10Base-F: 10 Mbps | Baseband | 2000m max| Fiber Optic Pair       | ST/SC Connectors</text>\n                    </g>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>Nomenclature Breakdown: '10-Base-T'</h4>\n                    <p><strong>10:</strong> Data rate in Megabits per second (10 Mbps).</p>\n                    <p><strong>Base:</strong> Baseband digital signaling (entire bandwidth allocated to single digital signal).</p>\n                    <p><strong>5 / 2 / T / F:</strong> Maximum segment length (500m, 185m $\\approx$ 200m), T = Twisted Pair, F = Fiber.</p>\n                </div>",
                "examTip": "In KTU Part B, draw the 10Base comparison table covering Cable Type, Max Segment Length, Topology, and Connector type."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Inspect 10Base Topologies in Sector 2",
                "missionDescription": "Experience different physical link segments in Sector 2:",
                "objectives": [
                    "Compare thick coaxial segments with star-wired twisted pair connections.",
                    "Verify minimum frame size padding on undersized frames."
                ],
                "actionText": "\ud83c\udfae Start Mission: Study Ethernet 10Base Standards [Space]"
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
                "theory": "\n                    <p>Network devices operate at specific OSI layers and define distinct traffic isolation boundaries:</p>\n                    <ul>\n                        <li><strong>Hub / Repeater (Layer 1 - Physical):</strong> Operates on electrical bits. When a frame arrives, the hub blindly retransmits it out of <em>all other ports</em>. <strong>Single Collision Domain, Single Broadcast Domain</strong>. Hosts share bandwidth ($10\\text{ Mbps} / N$). Prone to collisions.</li>\n                        <li><strong>Switch / Transparent Bridge (Layer 2 - Data Link):</strong> Operates on Ethernet frames. Inspects the <em>Source MAC address</em> to build a dynamic MAC learning table: <code>[MAC -> Port, TTL]</code>. Forwards frames only to the port where the destination MAC resides (microsegmentation). Floods unknown unicast frames. <strong>Each Port is an Isolated Collision Domain; Single Shared Broadcast Domain</strong>.</li>\n                        <li><strong>Router (Layer 3 - Network):</strong> Operates on IP packets. Uses a routing table and routing protocols (OSPF, BGP) to forward packets based on logical IP destination addresses. <strong>Breaks BOTH Collision Domains and Broadcast Domains</strong>.</li>\n                    </ul>\n                ",
                "keywords": [
                    "Connecting Devices",
                    "Hub (Layer 1)",
                    "Switch / Bridge (Layer 2)",
                    "Router (Layer 3)",
                    "Collision Domain",
                    "Broadcast Domain",
                    "MAC Learning Table",
                    "Microsegmentation"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Domain Segmentation Across Hubs, Switches, and Routers",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(30, 20)\">\n                        <rect x=\"0\" y=\"25\" width=\"210\" height=\"150\" rx=\"6\" fill=\"#fee2e2\" stroke=\"#dc2626\"/>\n                        <text x=\"105\" y=\"48\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"700\" fill=\"#991b1b\">HUB (Layer 1)</text>\n                        <text x=\"15\" y=\"80\" font-size=\"11\" fill=\"#334155\">\u2022 1 Collision Domain</text>\n                        <text x=\"15\" y=\"105\" font-size=\"11\" fill=\"#334155\">\u2022 1 Broadcast Domain</text>\n                        <text x=\"15\" y=\"130\" font-size=\"11\" fill=\"#334155\">\u2022 Shared Bandwidth</text>\n                        <text x=\"15\" y=\"155\" font-size=\"10.5\" fill=\"#dc2626\">\u2022 Blind Flooding</text>\n                    </g>\n                    <g transform=\"translate(275, 20)\">\n                        <rect x=\"0\" y=\"25\" width=\"210\" height=\"150\" rx=\"6\" fill=\"#dbeafe\" stroke=\"#2563eb\"/>\n                        <text x=\"105\" y=\"48\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"700\" fill=\"#1e40af\">SWITCH (Layer 2)</text>\n                        <text x=\"15\" y=\"80\" font-size=\"11\" font-weight=\"700\" fill=\"#15803d\">\u2022 N Collision Domains</text>\n                        <text x=\"15\" y=\"105\" font-size=\"11\" fill=\"#334155\">\u2022 1 Broadcast Domain</text>\n                        <text x=\"15\" y=\"130\" font-size=\"11\" fill=\"#334155\">\u2022 Dedicated Bandwidth</text>\n                        <text x=\"15\" y=\"155\" font-size=\"10.5\" fill=\"#1e40af\">\u2022 MAC Address Learning</text>\n                    </g>\n                    <g transform=\"translate(520, 20)\">\n                        <rect x=\"0\" y=\"25\" width=\"210\" height=\"150\" rx=\"6\" fill=\"#dcfce7\" stroke=\"#16a34a\"/>\n                        <text x=\"105\" y=\"48\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"700\" fill=\"#166534\">ROUTER (Layer 3)</text>\n                        <text x=\"15\" y=\"80\" font-size=\"11\" font-weight=\"700\" fill=\"#15803d\">\u2022 N Collision Domains</text>\n                        <text x=\"15\" y=\"105\" font-size=\"11\" font-weight=\"700\" fill=\"#15803d\">\u2022 N Broadcast Domains!</text>\n                        <text x=\"15\" y=\"130\" font-size=\"11\" fill=\"#334155\">\u2022 Subnet Isolation</text>\n                        <text x=\"15\" y=\"155\" font-size=\"10.5\" fill=\"#15803d\">\u2022 IP Routing Tables</text>\n                    </g>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>Connecting Devices Summary Matrix</h4>\n                    <p><strong>Hub (L1):</strong> Collision Domains: 1 | Broadcast Domains: 1 | Forwarding: Blind repeat</p>\n                    <p><strong>Switch (L2):</strong> Collision Domains: Per Port ($N$) | Broadcast Domains: 1 | Forwarding: MAC table</p>\n                    <p><strong>Router (L3):</strong> Collision Domains: Per Port ($N$) | Broadcast Domains: Per Port ($N$) | Forwarding: IP table</p>\n                </div>",
                "examTip": "Examiners award full marks when you explicitly draw separate boundary circles showing collision domains vs broadcast domains."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Solve Switch Learning Terminal in Sector 2",
                "missionDescription": "Calibrate the transparent switch in Sector 2:",
                "objectives": [
                    "Open the Switch Learning minigame at the exit of Sector 2.",
                    "Inspect incoming frames and map source MACs to switch ports."
                ],
                "actionText": "\ud83c\udfae Start Mission: Execute Switch Learning Drill [Space]"
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
                "theory": "\n                    <p>Mobile IP (RFC 5944) allows a device to maintain continuous connectivity while changing its point of attachment across different subnets:</p>\n                    <ul>\n                        <li><strong>Mobile Node (MN):</strong> The roaming host that moves between networks. Retains a permanent <strong>Home Address</strong> regardless of location.</li>\n                        <li><strong>Home Agent (HA):</strong> A router on the Mobile Node's home network that maintains current location bindings for the MN.</li>\n                        <li><strong>Foreign Agent (FA):</strong> A router on the visited foreign network that assists the MN in receiving forwarded packets.</li>\n                        <li><strong>Care-of Address (CoA):</strong> A temporary IP address assigned to the MN on the foreign network reflecting its current physical attachment.</li>\n                        <li><strong>IP-in-IP Tunneling:</strong> When a correspondent node sends a packet to the MN's Home Address, the Home Agent intercepts it (using Proxy ARP), wraps it in an outer IP datagram addressed to the CoA, and tunnels it to the Foreign Agent. The Foreign Agent strips the outer header and delivers the original packet to the MN.</li>\n                        <li><strong>Triangular Routing:</strong> Inefficient route where packets to MN must travel to HA first, but packets from MN go directly to correspondent node. Solved via Route Optimization.</li>\n                    </ul>\n                ",
                "keywords": [
                    "Mobile IP",
                    "Mobile Node (MN)",
                    "Home Agent (HA)",
                    "Foreign Agent (FA)",
                    "Care-of Address (CoA)",
                    "IP-in-IP Tunneling",
                    "Triangular Routing"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Mobile IP Triangular Routing & Tunnel Encapsulation Flow",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(30, 20)\">\n                        <rect x=\"20\" y=\"20\" width=\"130\" height=\"50\" rx=\"4\" fill=\"#eff6ff\" stroke=\"#2563eb\"/><text x=\"85\" y=\"45\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#1e40af\">Correspondent</text>\n                        <rect x=\"300\" y=\"20\" width=\"140\" height=\"50\" rx=\"4\" fill=\"#1e293b\" stroke=\"#0ea5e9\"/><text x=\"370\" y=\"45\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#38bdf8\">Home Agent (HA)</text>\n                        <rect x=\"560\" y=\"20\" width=\"140\" height=\"50\" rx=\"4\" fill=\"#f0fdf4\" stroke=\"#16a34a\"/><text x=\"630\" y=\"45\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#15803d\">Foreign Agent (FA)</text>\n                        <rect x=\"580\" y=\"130\" width=\"100\" height=\"40\" rx=\"4\" fill=\"#fef3c7\" stroke=\"#d97706\"/><text x=\"630\" y=\"154\" text-anchor=\"middle\" font-size=\"10.5\" font-weight=\"700\" fill=\"#92400e\">Mobile Node</text>\n                        <line x1=\"150\" y1=\"45\" x2=\"300\" y2=\"45\" stroke=\"#2563eb\" stroke-width=\"2\"/><polygon points=\"295,42 302,45 295,48\" fill=\"#2563eb\"/>\n                        <text x=\"225\" y=\"38\" text-anchor=\"middle\" font-size=\"9\" fill=\"#1e40af\">1. IP to Home Addr</text>\n                        <line x1=\"440\" y1=\"45\" x2=\"560\" y2=\"45\" stroke=\"#0ea5e9\" stroke-width=\"2.5\" stroke-dasharray=\"4\"/><polygon points=\"555,42 562,45 555,48\" fill=\"#0ea5e9\"/>\n                        <text x=\"500\" y=\"38\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"700\" fill=\"#0284c7\">2. IP Tunnel to CoA</text>\n                        <line x1=\"630\" y1=\"70\" x2=\"630\" y2=\"130\" stroke=\"#16a34a\" stroke-width=\"2\"/><polygon points=\"627,125 630,132 633,125\" fill=\"#16a34a\"/>\n                        <text x=\"665\" y=\"105\" font-size=\"9\" fill=\"#15803d\">3. Delivery</text>\n                        <line x1=\"580\" y1=\"150\" x2=\"85\" y2=\"70\" stroke=\"#dc2626\" stroke-width=\"2\"/><polygon points=\"88,75 83,68 91,70\" fill=\"#dc2626\"/>\n                        <text x=\"330\" y=\"135\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#dc2626\">Direct Reverse Path (Triangular Routing!)</text>\n                    </g>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>IP-in-IP Encapsulation Header Format</h4>\n                    <p>Outer Header: [Src: Home Agent IP, Dest: Care-of Address (CoA), Protocol: 4 (IP-in-IP)]</p>\n                    <p>Inner Header: [Src: Correspondent IP, Dest: Mobile Node Home IP, Payload: Data]</p>\n                </div>",
                "examTip": "Always sketch the triangle: Correspondent -> Home Agent -> Foreign Agent -> Mobile Node, and Mobile Node -> Correspondent directly."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Encounter Mobile IP Wanderer in Sector 3",
                "missionDescription": "Interact with mobile nodes in Sector 3:",
                "objectives": [
                    "Locate the Mobile IP Wanderer NPC at the Sector 3 perimeter.",
                    "Verify Care-of Address registration with Home Agent."
                ],
                "actionText": "\ud83c\udfae Start Mission: Consult Mobile IP Wanderer [Space]"
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
                "theory": "\n                    <p>Wireless networks and raw socket architectures operate with unique constraints:</p>\n                    <ul>\n                        <li><strong>Why CSMA/CD Fails in Wireless:</strong>\n                            <ol>\n                                <li>Signal attenuation over air is huge ($1/d^2$ to $1/d^4$); a station's own transmission power overwhelms any incoming collision.</li>\n                                <li><strong>Hidden Terminal Problem:</strong> Station A and Station C can both hear Station B, but cannot hear each other. Simultaneous transmissions collide at B!</li>\n                            </ol>\n                        </li>\n                        <li><strong>CSMA/CA (Collision Avoidance):</strong> Uses Inter-Frame Spaces (<strong>SIFS</strong> for ACKs, <strong>DIFS</strong> for data). Stations wait DIFS + random backoff timer.</li>\n                        <li><strong>RTS / CTS Handshake:</strong> Sender transmits a short <strong>Request to Send (RTS)</strong> frame specifying duration. Destination replies with <strong>Clear to Send (CTS)</strong> broadcast to all neighbors. Neighbors set their <strong>Network Allocation Vector (NAV)</strong> timer and remain silent!</li>\n                        <li><strong>DLPI & PF_PACKET Raw Sockets:</strong>\n                            <ul>\n                                <li><strong>DLPI (Data Link Provider Interface):</strong> Standard Unix interface allowing applications to communicate directly with Layer 2 data link drivers.</li>\n                                <li><strong>PF_PACKET (Linux AF_PACKET):</strong> A socket domain (<code>socket(PF_PACKET, SOCK_RAW, ...)</code>) enabling user-space programs (tcpdump, Wireshark) to bypass IP/TCP protocol stacks and read/write raw Ethernet frames directly from the NIC driver.</li>\n                            </ul>\n                        </li>\n                    </ul>\n                ",
                "keywords": [
                    "IEEE 802.11",
                    "CSMA/CA",
                    "Hidden Terminal Problem",
                    "Exposed Terminal",
                    "RTS (Request to Send)",
                    "CTS (Clear to Send)",
                    "NAV (Network Allocation Vector)",
                    "DLPI",
                    "PF_PACKET"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Hidden Terminal Problem & CSMA/CA RTS/CTS Timeline",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(30, 20)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">The Hidden Terminal Problem:</text>\n                        <circle cx=\"60\" cy=\"70\" r=\"24\" fill=\"#eff6ff\" stroke=\"#2563eb\" stroke-width=\"2\"/><text x=\"60\" y=\"75\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#1e40af\">Node A</text>\n                        <circle cx=\"170\" cy=\"70\" r=\"24\" fill=\"#f0fdf4\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"170\" y=\"75\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#15803d\">Node B</text>\n                        <circle cx=\"280\" cy=\"70\" r=\"24\" fill=\"#eff6ff\" stroke=\"#2563eb\" stroke-width=\"2\"/><text x=\"280\" y=\"75\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#1e40af\">Node C</text>\n                        <path d=\"M 60,95 Q 170,140 280,95\" fill=\"none\" stroke=\"#dc2626\" stroke-width=\"1.8\" stroke-dasharray=\"4\"/>\n                        <text x=\"170\" y=\"130\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#dc2626\">A and C cannot hear each other!</text>\n                    </g>\n                    <g transform=\"translate(360, 20)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">CSMA/CA RTS/CTS Handshake Timeline:</text>\n                        <rect x=\"0\" y=\"30\" width=\"370\" height=\"120\" rx=\"4\" fill=\"#ffffff\" stroke=\"#cbd5e1\"/>\n                        <rect x=\"15\" y=\"45\" width=\"45\" height=\"22\" fill=\"#3b82f6\" rx=\"2\"/><text x=\"37\" y=\"60\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ffffff\">DIFS</text>\n                        <rect x=\"65\" y=\"45\" width=\"55\" height=\"22\" fill=\"#2563eb\" rx=\"2\"/><text x=\"92\" y=\"60\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"700\" fill=\"#ffffff\">RTS</text>\n                        <rect x=\"125\" y=\"45\" width=\"35\" height=\"22\" fill=\"#10b981\" rx=\"2\"/><text x=\"142\" y=\"60\" text-anchor=\"middle\" font-size=\"8.5\" fill=\"#ffffff\">SIFS</text>\n                        <rect x=\"165\" y=\"45\" width=\"55\" height=\"22\" fill=\"#059669\" rx=\"2\"/><text x=\"192\" y=\"60\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"700\" fill=\"#ffffff\">CTS</text>\n                        <rect x=\"225\" y=\"45\" width=\"35\" height=\"22\" fill=\"#10b981\" rx=\"2\"/><text x=\"242\" y=\"60\" text-anchor=\"middle\" font-size=\"8.5\" fill=\"#ffffff\">SIFS</text>\n                        <rect x=\"265\" y=\"45\" width=\"90\" height=\"22\" fill=\"#f59e0b\" rx=\"2\"/><text x=\"310\" y=\"60\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"700\" fill=\"#ffffff\">DATA FRAME</text>\n                        <text x=\"15\" y=\"95\" font-size=\"10.5\" fill=\"#dc2626\">\u2022 NAV (Network Allocation Vector): Neighbors stay silent during NAV!</text>\n                        <text x=\"15\" y=\"125\" font-family=\"monospace\" font-size=\"10.5\" fill=\"#1e40af\">\u2022 PF_PACKET: socket(PF_PACKET, SOCK_RAW, htons(ETH_P_ALL))</text>\n                    </g>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>Inter-Frame Space (IFS) Hierarchy</h4>\n                    <p><strong>SIFS (Shortest):</strong> For highest priority control frames (ACK, CTS).</p>\n                    <p><strong>PIFS (Medium):</strong> For Point Coordination Function (PCF) polling.</p>\n                    <p><strong>DIFS (Longest):</strong> For standard Distributed Coordination Function (DCF) data frames.</p>\n                </div>",
                "examTip": "In Part B, always explain how the RTS/CTS reservation exchange reserves the wireless medium for the duration of the NAV timer."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Capture Raw Frames via Packet Scanner in Sector 2",
                "missionDescription": "Inspect raw Layer 2 frame drivers in Sector 2:",
                "objectives": [
                    "Examine raw packet sniffing via PF_PACKET interfaces.",
                    "Verify CSMA/CA virtual carrier sense and NAV deferral."
                ],
                "actionText": "\ud83c\udfae Start Mission: Study WLAN & PF_PACKET Architecture [Space]"
            }
        ]
    },
    {
        "id": "m4_signals_attenuation",
        "number": 22,
        "module": 4,
        "moduleTitle": "MODULE 4: PHYSICAL LAYER & NETWORK MANAGEMENT",
        "title": "Analog vs Digital Signals, Attenuation (dB), Distortion & Noise",
        "badge": "CORE FORMULA",
        "ktuRef": "KTU PCCST501 Syllabus Mod 4 // Decibel Attenuation Formula & Transmission Impairments",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Signal Properties, Attenuation (dB), Distortion & Noise Types",
                "storyline": "You materialize inside the Physical Substratum of Sector 4. Here, datagrams and frames are stripped away, leaving only raw electromagnetic waves and voltage pulses battling physical channel resistance, thermal noise, and signal attenuation.",
                "theory": "\n                    <p>The <strong>Physical Layer</strong> is responsible for moving individual bits across a physical transmission medium. Signals undergo three fundamental types of transmission impairment:</p>\n                    <ul>\n                        <li><strong>1. Attenuation (Loss of Energy):</strong> As a signal propagates through any medium, electrical resistance or optical absorption dissipates its energy as heat. Measured in <strong>Decibels (dB)</strong>:\n                            <br><code>dB = 10 * log10(P2 / P1)</code> (power) or <code>dB = 20 * log10(V2 / V1)</code> (voltage).\n                            <br>Loss is negative dB, gain (amplification) is positive dB. Digital signals use <strong>Regenerative Repeaters</strong> (which decode, reconstruct, and retransmit clean bit pulses), whereas analog signals use <strong>Amplifiers</strong> (which unfortunately amplify accumulated noise alongside the signal).</li>\n                        <li><strong>2. Distortion (Shape Alteration):</strong> Composite signals consist of multiple frequency components. In dispersive media, different frequencies travel at different phase velocities, arriving at slightly different times. This causes <strong>phase/delay distortion</strong>, warping waveform geometry.</li>\n                        <li><strong>3. Noise (External Energy Ingress):</strong>\n                            <ul>\n                                <li><strong>Thermal Noise (Johnson Noise):</strong> Random motion of free electrons in conductors; proportional to absolute temperature (<code>N = k * T * B</code>). Unavoidable.</li>\n                                <li><strong>Induced Noise:</strong> Electromagnetic interference (EMI) from motors, transformers, and fluorescent lighting acting as antennas.</li>\n                                <li><strong>Crosstalk:</strong> Inductive/capacitive coupling between adjacent twisted pairs (hearing another conversation on phone lines).</li>\n                                <li><strong>Impulse Noise:</strong> High-energy short-duration voltage spikes from power surges, lightning, or switching relays; the primary cause of burst errors in digital communications.</li>\n                            </ul>\n                        </li>\n                    </ul>\n                    <p><strong>Signal-to-Noise Ratio (SNR):</strong> Quantifies transmission quality. <code>SNR = Signal Power / Noise Power</code>, expressed in dB as <code>SNR_dB = 10 * log10(SNR)</code>.</p>\n                ",
                "keywords": [
                    "Analog vs Digital",
                    "Attenuation (dB)",
                    "Decibel Formula",
                    "Regenerative Repeater",
                    "Delay Distortion",
                    "Thermal Noise",
                    "Crosstalk",
                    "Impulse Noise",
                    "SNR (Signal-to-Noise Ratio)"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Decibel Derivations & Regenerative Repeater Diagram",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(40, 25)\">\n                        <text x=\"0\" y=\"20\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">Digital Pulse Propagation with Regenerative Repeater:</text>\n                        <!-- Transmitted Clean Pulse -->\n                        <rect x=\"0\" y=\"45\" width=\"40\" height=\"30\" fill=\"#3b82f6\" rx=\"2\"/>\n                        <rect x=\"40\" y=\"75\" width=\"40\" height=\"30\" fill=\"#94a3b8\" rx=\"2\"/>\n                        <text x=\"40\" y=\"120\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#1e40af\">Transmitted Signal</text>\n\n                        <!-- Attenuated & Noisy Waveform -->\n                        <path d=\"M 120 75 Q 140 50, 160 65 T 200 90 T 240 75\" fill=\"none\" stroke=\"#ef4444\" stroke-width=\"3\"/>\n                        <text x=\"180\" y=\"120\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#dc2626\">Attenuated + Noise (-12 dB)</text>\n\n                        <!-- Repeater Block -->\n                        <rect x=\"290\" y=\"35\" width=\"140\" height=\"70\" rx=\"6\" fill=\"#10b981\" stroke=\"#059669\" stroke-width=\"2\"/>\n                        <text x=\"360\" y=\"65\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"700\" fill=\"#ffffff\">REGENERATIVE</text>\n                        <text x=\"360\" y=\"85\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"700\" fill=\"#ffffff\">REPEATER</text>\n\n                        <!-- Regenerated Clean Pulse -->\n                        <rect x=\"480\" y=\"45\" width=\"40\" height=\"30\" fill=\"#3b82f6\" rx=\"2\"/>\n                        <rect x=\"520\" y=\"75\" width=\"40\" height=\"30\" fill=\"#94a3b8\" rx=\"2\"/>\n                        <text x=\"520\" y=\"120\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#1e40af\">Reconstructed Signal</text>\n                        <text x=\"520\" y=\"135\" text-anchor=\"middle\" font-size=\"9\" fill=\"#64748b\">(Zero Noise Propagation!)</text>\n                    </g>\n                    <text x=\"380\" y=\"190\" text-anchor=\"middle\" font-size=\"11.5\" font-weight=\"700\" fill=\"#0f172a\">Amplifiers amplify noise; Repeaters sample, decide (0 or 1), and regenerate 100% clean bits!</text>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>Decibel & Attenuation Formulas</h4>\n                    <p><strong>Power Attenuation:</strong> <code>dB = 10 * log10(P2 / P1)</code> (e.g., if P2 = 0.5 * P1, loss is 10 * log10(0.5) = -3 dB).</p>\n                    <p><strong>Voltage Attenuation:</strong> <code>dB = 20 * log10(V2 / V1)</code>.</p>\n                    <p><strong>Total Cascaded Link Loss:</strong> <code>dB_total = dB_1 + dB_2 + dB_3 + ...</code> (Decibels add algebraically!).</p>\n                    <p><strong>Signal-to-Noise Ratio:</strong> <code>SNR_dB = 10 * log10(Signal_Power / Noise_Power)</code>.</p>\n                </div>",
                "examTip": "Examiners often ask: 'Why are repeaters preferred over amplifiers in digital links?' Model answer: Amplifiers amplify both signal and noise linearly; repeaters treat bits digitally, reconstructing identical new square pulses without accumulating noise."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Observe Attenuation & Regenerate Waveform in Sector 4",
                "missionDescription": "Inspect transmission line degradation and trigger the regenerative repeater:",
                "objectives": [
                    "Navigate through the high-attenuation wire zone in Sector 4.",
                    "Notice your packet integrity buffer decay as attenuation accumulates.",
                    "Step onto the Regenerative Repeater node to clean the noise and restore full signal integrity!"
                ],
                "actionText": "\ud83c\udfae Start Mission: Test Signal Attenuation & Repeaters [Space]"
            }
        ]
    },
    {
        "id": "m4_transmission_media",
        "number": 23,
        "module": 4,
        "moduleTitle": "MODULE 4: PHYSICAL LAYER & NETWORK MANAGEMENT",
        "title": "Transmission Media: Guided (UTP, Coaxial, Fiber SiO2) vs Unguided (Radio, Microwave, IR)",
        "badge": "MUST-KNOW 9M",
        "ktuRef": "Official Model Paper Q14a // 9 Marks // Guided vs Unguided Media & Optical Fiber",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Guided Media (UTP, Coax, Fiber TIR) vs Unguided Free-Space Propagation",
                "storyline": "Unit 0xVOID navigates physical transmission channels. Above lies a high-loss Copper UTP cable sparking with electromagnetic noise arcs; below runs an Optical Fiber conduit carrying photon bursts immune to electronic interference.",
                "theory": "\n                    <p>Transmission media reside beneath the Physical Layer, classified into <strong>Guided (Bounded/Conducted)</strong> and <strong>Unguided (Wireless/Free Space)</strong>:</p>\n                    <h4>1. Guided Transmission Media</h4>\n                    <ul>\n                        <li><strong>Twisted Pair Cable (UTP / STP):</strong> Two insulated copper conductors twisted in a helical pattern. Twisting ensures both wires receive equal external EMI; differential signaling at the receiver cancels the induced common-mode noise. Classified into Cat 5e (100 MHz, 1 Gbps), Cat 6 (250 MHz, 10 Gbps up to 55m). Connectors: RJ-45.</li>\n                        <li><strong>Coaxial Cable:</strong> Solid central copper core, surrounded by dielectric insulation, woven metallic braid shield, and outer protective jacket. Higher bandwidth and superior EMI shielding compared to UTP. Used in cable TV, broadband Internet (DOCSIS), and legacy Thicknet (10Base5) / Thinnet (10Base2).</li>\n                        <li><strong>Optical Fiber:</strong> Transmits data as light pulses through ultra-pure silica glass (<code>SiO2</code>). Composed of <strong>Core</strong> (refractive index <code>n1</code>) and <strong>Cladding</strong> (refractive index <code>n2</code>), where <code>n1 > n2</code>. Operates on <strong>Total Internal Reflection (TIR)</strong>: light rays striking the core-cladding boundary at an angle greater than critical angle <code>theta_c = arcsin(n2 / n1)</code> are reflected entirely within the core.\n                            <br><strong>Advantages:</strong> Enormous bandwidth (terabits/sec), extremely low attenuation (~0.2 dB/km at 1550 nm), complete immunity to Electromagnetic Interference (EMI), lightweight, highly secure against wiretapping.\n                            <br><strong>Modes:</strong> Single-Mode Fiber (SMF, narrow ~9 um core, laser source, zero modal dispersion, long haul >50 km) vs Multi-Mode Fiber (MMF, wider 50/62.5 um core, LED source, modal dispersion limits range to <2 km).</li>\n                    </ul>\n                    <h4>2. Unguided Transmission Media (Wireless)</h4>\n                    <ul>\n                        <li><strong>Radio Waves (3 kHz to 1 GHz):</strong> Omnidirectional; waves travel in all directions from antenna. Penetrate walls easily; subject to interference and multipath fading. Used in AM/FM radio, cordless phones.</li>\n                        <li><strong>Microwaves (1 GHz to 300 GHz):</strong> Unidirectional (highly focused line-of-sight beams using parabolic dish or horn antennas). Cannot penetrate walls effectively; absorbed by rainfall/atmospheric moisture at high frequencies. Used in cellular backhaul, satellite links, Wi-Fi.</li>\n                        <li><strong>Infrared (300 GHz to 400 THz):</strong> High-frequency line-of-sight communication. Cannot penetrate solid walls, making it secure against eavesdropping and preventing adjacent-room interference. Used in TV remotes, IrDA transceivers.</li>\n                    </ul>\n                ",
                "keywords": [
                    "Guided Media",
                    "Unguided Media",
                    "Twisted Pair (UTP/STP)",
                    "Coaxial Cable",
                    "Optical Fiber (SiO2)",
                    "Total Internal Reflection (TIR)",
                    "Core vs Cladding (n1 > n2)",
                    "Single-Mode vs Multi-Mode",
                    "Radio Waves",
                    "Microwaves",
                    "Infrared"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Optical Fiber Total Internal Reflection & Media Comparison Table",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(30, 25)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">Optical Fiber Total Internal Reflection (TIR) Principle:</text>\n                        <!-- Cladding Top -->\n                        <rect x=\"0\" y=\"30\" width=\"460\" height=\"30\" fill=\"#e2e8f0\" stroke=\"#94a3b8\"/>\n                        <text x=\"230\" y=\"50\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#475569\">Cladding (Refractive Index n2 = 1.46)</text>\n                        <!-- Core -->\n                        <rect x=\"0\" y=\"60\" width=\"460\" height=\"50\" fill=\"#cffafe\" stroke=\"#06b6d4\" stroke-width=\"1.5\"/>\n                        <text x=\"60\" y=\"90\" font-size=\"12\" font-weight=\"700\" fill=\"#0891b2\">Core (n1 = 1.48)</text>\n                        <text x=\"230\" y=\"90\" font-size=\"10\" font-weight=\"600\" fill=\"#0e7490\">n1 &gt; n2 (Denser core!)</text>\n                        <!-- Light Ray Path -->\n                        <path d=\"M 0 85 L 80 60 L 180 110 L 280 60 L 380 110 L 460 60\" fill=\"none\" stroke=\"#0284c7\" stroke-width=\"3\" stroke-dasharray=\"2,2\"/>\n                        <!-- Cladding Bottom -->\n                        <rect x=\"0\" y=\"110\" width=\"460\" height=\"30\" fill=\"#e2e8f0\" stroke=\"#94a3b8\"/>\n                        <text x=\"230\" y=\"130\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#475569\">Cladding (Refractive Index n2 = 1.46)</text>\n                    </g>\n                    <g transform=\"translate(510, 35)\">\n                        <rect x=\"0\" y=\"0\" width=\"220\" height=\"135\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#16a34a\" stroke-width=\"1.5\"/>\n                        <text x=\"110\" y=\"25\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"700\" fill=\"#15803d\">Media Comparison</text>\n                        <text x=\"15\" y=\"50\" font-size=\"10.5\" font-weight=\"600\" fill=\"#334155\">UTP: Cheap, ~100m, high EMI</text>\n                        <text x=\"15\" y=\"75\" font-size=\"10.5\" font-weight=\"600\" fill=\"#334155\">Coax: Mod cost, ~500m, mod EMI</text>\n                        <text x=\"15\" y=\"100\" font-size=\"10.5\" font-weight=\"700\" fill=\"#0369a1\">Fiber: High BW, &gt;50km, 0 EMI!</text>\n                        <text x=\"15\" y=\"122\" font-size=\"10\" font-weight=\"600\" fill=\"#15803d\">Radio/Micro: Wireless mobility</text>\n                    </g>\n                    <text x=\"380\" y=\"190\" text-anchor=\"middle\" font-size=\"11.5\" font-weight=\"700\" fill=\"#0f172a\">TIR occurs when Angle of Incidence &gt; Critical Angle theta_c = arcsin(n2 / n1)</text>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>Optical Fiber Critical Angle & Numerical Aperture</h4>\n                    <p><strong>Critical Angle:</strong> <code>theta_c = arcsin(n2 / n1)</code> (Requires n1 &gt; n2).</p>\n                    <p><strong>Numerical Aperture (Light-Gathering Ability):</strong> <code>NA = sqrt(n1^2 - n2^2) = sin(theta_a)</code>, where theta_a is the acceptance angle.</p>\n                    <p><strong>Worked Example:</strong> If core n1 = 1.50 and cladding n2 = 1.45:\n                    <br><code>theta_c = arcsin(1.45 / 1.50) = arcsin(0.9667) = 75.16 degrees</code>.\n                    <br><code>NA = sqrt(1.50^2 - 1.45^2) = sqrt(2.25 - 2.1025) = sqrt(0.1475) = 0.384</code>.</p>\n                </div>",
                "examTip": "A full 9-mark answer on Optical Fiber must: 1. State the principle of Total Internal Reflection; 2. State the two conditions (n1 > n2 and angle of incidence > critical angle); 3. Draw the ray reflection diagram; 4. Derive Numerical Aperture NA."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Navigate Copper vs Optical Fiber Conduits in Sector 4",
                "missionDescription": "Choose between the noisy copper path and the high-speed optical bypass:",
                "objectives": [
                    "Inspect the upper Copper UTP conduit with active electromagnetic noise sparks.",
                    "Take the lower Cyan Optical Fiber bypass conduit.",
                    "Verify that the optical fiber conduit provides 100% noise immunity and zero packet degradation!"
                ],
                "actionText": "\ud83c\udfae Start Mission: Traverse Optical Fiber Bypass [Space]"
            }
        ]
    },
    {
        "id": "m4_line_coding",
        "number": 24,
        "module": 4,
        "moduleTitle": "MODULE 4: PHYSICAL LAYER & NETWORK MANAGEMENT",
        "title": "Digital Transmission & Line Coding Waveforms (NRZ-L, NRZ-I, Manchester, Differential Manchester)",
        "badge": "NUMERICAL",
        "ktuRef": "Official Model Paper Q7 / Q14a // 9 Marks // Line Coding Waveform Derivation",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Converting Bits to Signals: NRZ-L, NRZ-I, Manchester & Differential Manchester",
                "storyline": "Inside the transmission line encoder of Sector 4, raw bit patterns must be shaped into physical voltage waveforms without losing clock synchronization or introducing dangerous direct current (DC) offsets.",
                "theory": "\n                    <p><strong>Line Coding</strong> is the process of converting digital binary data into digital voltage waveforms for baseband transmission. Desirable characteristics include: <strong>Self-Synchronization</strong> (receiver clock recovery), <strong>DC Component Elimination</strong> (allowing transformer coupling), and <strong>Error Detection</strong>.</p>\n                    <p>Four primary line coding schemes tested in KTU examinations:</p>\n                    <ul>\n                        <li><strong>1. NRZ-L (Non-Return-to-Zero Level):</strong>\n                            <br>Signal level depends directly on the bit state. Typically: <strong>Bit 0 = Positive voltage (+V)</strong>, <strong>Bit 1 = Negative voltage (-V)</strong>.\n                            <br><em>Problem:</em> A long sequence of 0s or 1s produces a flat constant voltage line, causing the receiver clock to drift (loss of synchronization) and creating a heavy DC component.</li>\n                        <li><strong>2. NRZ-I (Non-Return-to-Zero Invert on 1):</strong>\n                            <br>Signal level inverts (transitions) at the beginning of the bit interval if the bit is <strong>1</strong>; no inversion if the bit is <strong>0</strong>.\n                            <br><em>Advantage:</em> Solves clock drift for consecutive 1s, but consecutive 0s still produce no transitions.</li>\n                        <li><strong>3. Manchester (Biphase / Split-Phase / IEEE 802.3 Ethernet):</strong>\n                            <br>Every bit interval contains a guaranteed voltage transition exactly at its midpoint:\n                            <br>&bull; <strong>Bit 0: High-to-Low transition (&darr;)</strong> at center.\n                            <br>&bull; <strong>Bit 1: Low-to-High transition (&uarr;)</strong> at center.\n                            <br><em>Key Advantage:</em> Mid-bit transition provides continuous, guaranteed clock synchronization and zero DC component!\n                            <br><em>Disadvantage:</em> Requires twice the bandwidth (Baud rate = 2 * Bit rate). Used in 10Base-T Ethernet.</li>\n                        <li><strong>4. Differential Manchester (Token Ring / IEEE 802.5):</strong>\n                            <br>Always has a mid-bit transition for clocking. The bit value is determined by whether a transition occurs at the <strong>beginning</strong> of the bit interval:\n                            <br>&bull; <strong>Bit 0: Transition at the start</strong> of the interval.\n                            <br>&bull; <strong>Bit 1: NO transition at the start</strong> of the interval.\n                            <br><em>Advantage:</em> Highly noise-immune and insensitive to cable polarity inversion (reversing wire pair does not invert bits).</li>\n                    </ul>\n                ",
                "keywords": [
                    "Line Coding",
                    "Self-Synchronization",
                    "DC Component",
                    "NRZ-L",
                    "NRZ-I",
                    "Manchester Encoding (IEEE 802.3)",
                    "Differential Manchester (IEEE 802.5)",
                    "Baud Rate vs Bit Rate"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Waveform Comparison for Bit Stream: 0 1 0 0 1 1 0",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(140, 20)\">\n                        <!-- Bit Header -->\n                        <text x=\"35\" y=\"15\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#0f172a\">0</text>\n                        <text x=\"105\" y=\"15\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#0f172a\">1</text>\n                        <text x=\"175\" y=\"15\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#0f172a\">0</text>\n                        <text x=\"245\" y=\"15\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#0f172a\">0</text>\n                        <text x=\"315\" y=\"15\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#0f172a\">1</text>\n                        <text x=\"385\" y=\"15\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#0f172a\">1</text>\n                        <text x=\"455\" y=\"15\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#0f172a\">0</text>\n                        <!-- Grid lines -->\n                        <path d=\"M 0 20 L 0 165 M 70 20 L 70 165 M 140 20 L 140 165 M 210 20 L 210 165 M 280 20 L 280 165 M 350 20 L 350 165 M 420 20 L 420 165 M 490 20 L 490 165\" stroke=\"#e2e8f0\" stroke-width=\"1.5\" stroke-dasharray=\"3,3\"/>\n                    </g>\n                    <!-- Row Labels -->\n                    <text x=\"120\" y=\"55\" text-anchor=\"end\" font-size=\"11\" font-weight=\"700\" fill=\"#1e40af\">NRZ-L</text>\n                    <text x=\"120\" y=\"90\" text-anchor=\"end\" font-size=\"11\" font-weight=\"700\" fill=\"#0891b2\">NRZ-I</text>\n                    <text x=\"120\" y=\"125\" text-anchor=\"end\" font-size=\"11\" font-weight=\"700\" fill=\"#16a34a\">Manchester</text>\n                    <text x=\"120\" y=\"160\" text-anchor=\"end\" font-size=\"11\" font-weight=\"700\" fill=\"#d97706\">Diff Manch</text>\n\n                    <!-- Waveform Paths -->\n                    <g transform=\"translate(140, 0)\">\n                        <!-- NRZ-L (0=+V, 1=-V): 0(+), 1(-), 0(+), 0(+), 1(-), 1(-), 0(+) -->\n                        <path d=\"M 0 45 H 70 V 60 H 140 V 45 H 280 V 60 H 420 V 45 H 490\" fill=\"none\" stroke=\"#2563eb\" stroke-width=\"2.5\"/>\n                        <!-- NRZ-I (assume start low, invert on 1) -->\n                        <path d=\"M 0 95 H 70 V 80 H 140 H 280 V 95 H 350 V 80 H 420 H 490\" fill=\"none\" stroke=\"#06b6d4\" stroke-width=\"2.5\"/>\n                        <!-- Manchester: 0(H->L), 1(L->H), 0(H->L), 0(H->L), 1(L->H), 1(L->H), 0(H->L) -->\n                        <path d=\"M 0 115 H 35 V 130 H 70 V 130 H 105 V 115 H 140 V 115 H 175 V 130 H 210 V 115 H 245 V 130 H 280 V 130 H 315 V 115 H 350 V 130 H 385 V 115 H 420 V 115 H 455 V 130 H 490\" fill=\"none\" stroke=\"#16a34a\" stroke-width=\"2.5\"/>\n                        <!-- Diff Manchester: always mid transition, start transition on 0 -->\n                        <path d=\"M 0 150 H 35 V 165 H 70 H 105 V 150 H 140 V 165 H 175 V 150 H 210 V 165 H 245 V 150 H 280 H 315 V 165 H 350 H 385 V 150 H 420 V 165 H 455 V 150 H 490\" fill=\"none\" stroke=\"#d97706\" stroke-width=\"2.5\"/>\n                    </g>\n                    <text x=\"380\" y=\"195\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#0f172a\">Manchester: Bit 0 = High-to-Low (&darr;) | Bit 1 = Low-to-High (&uarr;) at center of bit period</text>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>Baud Rate (Modulation Rate) vs Bit Rate</h4>\n                    <p><strong>Baud Rate (S):</strong> Number of signal state changes (symbols) per second. <code>S = N / r</code>, where N is data rate (bps) and r is number of data bits per signal element.</p>\n                    <p><strong>NRZ Schemes:</strong> 1 bit per signal element (r = 1) &rArr; Average Baud rate <code>S = N / 2</code> bauds.</p>\n                    <p><strong>Manchester Schemes:</strong> 2 signal elements per bit (r = 1/2) &rArr; Baud rate <code>S = 2 * N</code> bauds (Double bandwidth required!).</p>\n                </div>",
                "examTip": "When KTU asks you to draw waveforms for a bit pattern: 1. Write the bit sequence clearly across the top with dashed vertical boundary lines; 2. Always draw Manchester using High-to-Low for 0 and Low-to-High for 1; 3. Explicitly state whether your Differential Manchester starts with High or Low."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Test Line Coding Waveforms in the Oscilloscope Minigame",
                "missionDescription": "Interact with the line coding console to verify clock synchronization:",
                "objectives": [
                    "Open the Oscilloscope Terminal in Sector 4.",
                    "Toggle between NRZ-L, NRZ-I, and Manchester encoding modes.",
                    "Observe the mid-bit transitions in Manchester mode providing stable clock recovery!"
                ],
                "actionText": "\ud83c\udfae Start Mission: Open Oscilloscope Console [Space]"
            }
        ]
    },
    {
        "id": "m4_modulation_capacity",
        "number": 25,
        "module": 4,
        "moduleTitle": "MODULE 4: PHYSICAL LAYER & NETWORK MANAGEMENT",
        "title": "Carrier Modulation (ASK, FSK, PSK, QAM) & Channel Capacity Limits (Nyquist & Shannon)",
        "badge": "NUMERICAL",
        "ktuRef": "Official Model Paper Q14b Choice B // 9 Marks // Digital Modulation & Shannon Capacity",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Bandpass Carrier Modulation & Fundamental Theoretical Capacity Limits",
                "storyline": "Unit 0xVOID enters the high-frequency radio transmitter chamber. Here, digital baseband bits are modulated onto high-frequency analog sinusoidal carrier waves to traverse bandpass channels bounded by Nyquist and Shannon limits.",
                "theory": "\n                    <p><strong>Digital-to-Analog Modulation</strong> converts digital binary data into bandpass analog waveforms by modifying one or more characteristics of a sinusoidal carrier wave <code>s(t) = A * cos(2 * pi * fc * t + phi)</code>:</p>\n                    <ul>\n                        <li><strong>1. Amplitude Shift Keying (ASK):</strong> Carrier amplitude varies to represent binary states; frequency and phase remain constant. In <strong>OOK (On-Off Keying)</strong>, bit 1 is presence of carrier, bit 0 is zero amplitude. Highly susceptible to noise and atmospheric attenuation.</li>\n                        <li><strong>2. Frequency Shift Keying (FSK / BFSK):</strong> Modulates carrier frequency between two distinct values: <code>f1</code> for bit 1, <code>f2</code> for bit 0. Constant amplitude makes it noise-immune, but requires wider bandwidth.</li>\n                        <li><strong>3. Phase Shift Keying (PSK / BPSK / QPSK):</strong> Carrier phase shifts to represent bits. In <strong>BPSK</strong>, bit 1 = 0 degrees, bit 0 = 180 degrees (pi radians). In <strong>QPSK</strong>, 2 bits per symbol are encoded into four 90-degree phase offsets (45, 135, 225, 315 degrees).</li>\n                        <li><strong>4. Quadrature Amplitude Modulation (QAM):</strong> Combines ASK and PSK. For example, <strong>16-QAM</strong> uses 16 distinct constellation points (combinations of amplitude and phase) to transmit <code>log2(16) = 4 bits per symbol</code>.</li>\n                    </ul>\n                    <h4>Channel Capacity: Nyquist vs Shannon</h4>\n                    <p><strong>Nyquist Bit Rate (Noiseless Theoretical Limit):</strong> Defines maximum data rate over an ideal, noise-free channel of bandwidth B (Hz) with L signal levels:\n                    <br><code>C_Nyquist = 2 * B * log2(L)  (bps)</code>.</p>\n                    <p><strong>Shannon Capacity (Physical Upper Bound for Noisy Channels):</strong> Defines the absolute theoretical limit of error-free data transmission in the presence of Gaussian thermal noise:\n                    <br><code>C_Shannon = B * log2(1 + SNR)  (bps)</code>, where <code>SNR = P_signal / P_noise</code>.</p>\n                ",
                "keywords": [
                    "Carrier Modulation",
                    "ASK (Amplitude Shift Keying)",
                    "FSK (Frequency Shift Keying)",
                    "PSK / BPSK / QPSK",
                    "QAM (Quadrature Amplitude Modulation)",
                    "Nyquist Bit Rate",
                    "Shannon Capacity",
                    "SNR (Signal-to-Noise Ratio)",
                    "Constellation Diagram"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Modulation Waveforms & Nyquist/Shannon Worked Numerical",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(100, 20)\">\n                        <text x=\"50\" y=\"15\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#0f172a\">Bit 1</text>\n                        <text x=\"170\" y=\"15\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#0f172a\">Bit 0</text>\n                        <text x=\"290\" y=\"15\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#0f172a\">Bit 1</text>\n                        <path d=\"M 0 20 L 0 160 M 110 20 L 110 160 M 230 20 L 230 160 M 350 20 L 350 160\" stroke=\"#cbd5e1\" stroke-dasharray=\"2,2\"/>\n                        <!-- ASK -->\n                        <text x=\"-20\" y=\"50\" text-anchor=\"end\" font-size=\"11\" font-weight=\"700\" fill=\"#2563eb\">ASK</text>\n                        <path d=\"M 0 45 Q 27.5 25, 55 45 T 110 45 L 230 45 Q 257.5 25, 285 45 T 350 45\" fill=\"none\" stroke=\"#2563eb\" stroke-width=\"2.5\"/>\n                        <!-- FSK -->\n                        <text x=\"-20\" y=\"95\" text-anchor=\"end\" font-size=\"11\" font-weight=\"700\" fill=\"#0891b2\">FSK</text>\n                        <path d=\"M 0 90 Q 13.75 75, 27.5 90 T 55 90 T 82.5 90 T 110 90 Q 30 75, 60 90 T 230 90 Q 243.75 75, 257.5 90 T 285 90 T 312.5 90 T 350 90\" fill=\"none\" stroke=\"#0891b2\" stroke-width=\"2.5\"/>\n                        <!-- BPSK -->\n                        <text x=\"-20\" y=\"140\" text-anchor=\"end\" font-size=\"11\" font-weight=\"700\" fill=\"#16a34a\">BPSK</text>\n                        <path d=\"M 0 135 Q 27.5 115, 55 135 T 110 135 Q 137.5 155, 165 135 T 230 135 Q 257.5 115, 285 135 T 350 135\" fill=\"none\" stroke=\"#16a34a\" stroke-width=\"2.5\"/>\n                    </g>\n                    <!-- Constellation Box -->\n                    <g transform=\"translate(500, 30)\">\n                        <rect x=\"0\" y=\"0\" width=\"220\" height=\"130\" rx=\"6\" fill=\"#f1f5f9\" stroke=\"#94a3b8\"/>\n                        <text x=\"110\" y=\"20\" text-anchor=\"middle\" font-size=\"11.5\" font-weight=\"700\" fill=\"#1e293b\">QPSK Constellation (2 bits/sym)</text>\n                        <line x1=\"30\" y1=\"75\" x2=\"190\" y2=\"75\" stroke=\"#94a3b8\" stroke-width=\"1.5\"/>\n                        <line x1=\"110\" y1=\"25\" x2=\"110\" y2=\"125\" stroke=\"#94a3b8\" stroke-width=\"1.5\"/>\n                        <circle cx=\"70\" cy=\"45\" r=\"5\" fill=\"#ef4444\"/><text x=\"55\" y=\"45\" font-size=\"9\" font-weight=\"700\" fill=\"#b91c1c\">01</text>\n                        <circle cx=\"150\" cy=\"45\" r=\"5\" fill=\"#ef4444\"/><text x=\"160\" y=\"45\" font-size=\"9\" font-weight=\"700\" fill=\"#b91c1c\">11</text>\n                        <circle cx=\"70\" cy=\"105\" r=\"5\" fill=\"#ef4444\"/><text x=\"55\" y=\"110\" font-size=\"9\" font-weight=\"700\" fill=\"#b91c1c\">00</text>\n                        <circle cx=\"150\" cy=\"105\" r=\"5\" fill=\"#ef4444\"/><text x=\"160\" y=\"110\" font-size=\"9\" font-weight=\"700\" fill=\"#b91c1c\">10</text>\n                    </g>\n                    <text x=\"380\" y=\"195\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#0f172a\">BPSK inverts phase by 180 degrees at bit boundaries; QPSK encodes 2 bits per phase angle!</text>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>KTU Examination Numerical: Channel Capacity Calculation</h4>\n                    <p><strong>Problem:</strong> A telephone channel has bandwidth B = 4 kHz and SNR_dB = 30 dB. Calculate the maximum theoretical channel capacity.</p>\n                    <p><strong>Step 1: Convert SNR_dB to linear ratio:</strong>\n                    <br><code>SNR_dB = 10 * log10(SNR) = 30 &rArr; log10(SNR) = 3 &rArr; SNR = 10^3 = 1000</code>.</p>\n                    <p><strong>Step 2: Apply Shannon's Formula:</strong>\n                    <br><code>C = B * log2(1 + SNR) = 4000 * log2(1 + 1000) = 4000 * log2(1001)</code>.\n                    <br>Since <code>2^10 = 1024 &approx; 1000 &rArr; log2(1001) &approx; 9.967</code>.\n                    <br><code>C &approx; 4000 * 9.967 = 39,869 bps &approx; 39.87 kbps</code>.</p>\n                    <p><strong>Step 3: Signal Levels (L) for Noiseless Nyquist:</strong>\n                    <br><code>C = 2 * B * log2(L) &rArr; 39869 = 2 * 4000 * log2(L) &rArr; log2(L) &approx; 4.98 &rArr; L = 32 levels</code>.</p>\n                </div>",
                "examTip": "In KTU Part B numericals, always convert SNR_dB to linear SNR before substituting into Shannon's formula! Never plug decibels directly into log2(1 + SNR)."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Operate the Carrier Modulation Console in Sector 4",
                "missionDescription": "Tune carrier frequencies and modulation modes to transmit high-throughput data:",
                "objectives": [
                    "Locate the Carrier Modulation Terminal [E] in Sector 4.",
                    "Switch between ASK, FSK, and PSK carrier modes.",
                    "Maximize channel capacity while keeping noise interference below threshold limits!"
                ],
                "actionText": "\ud83c\udfae Start Mission: Launch Modulation Console [Space]"
            }
        ]
    },
    {
        "id": "m4_spread_spectrum",
        "number": 26,
        "module": 4,
        "moduleTitle": "MODULE 4: PHYSICAL LAYER & NETWORK MANAGEMENT",
        "title": "Spread Spectrum Techniques: Frequency Hopping (FHSS) vs Direct Sequence (DSSS)",
        "badge": "CORE FORMULA",
        "ktuRef": "Official Model Paper Q14b // 9 Marks // Spread Spectrum Principles & Jamming Immunity",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Expanding Bandwidth for Military Jamming Resistance & Multi-User Access",
                "storyline": "Enemy malicious jammers have saturated the central frequency bands of Sector 4. To push your packet payload through hostile electronic warfare, Unit 0xVOID deploys Spread Spectrum modulation, dispersing signal energy across a wide radio spectrum.",
                "theory": "\n                    <p><strong>Spread Spectrum</strong> expands the transmitted bandwidth of a signal far beyond the minimum bandwidth required by the data stream (<code>B_ss >> B_data</code>). Principles: signal power is spread across a broad frequency band, appearing below the thermal noise floor to eavesdroppers, while providing high resistance to intentional narrowband jamming.</p>\n                    <h4>1. Frequency Hopping Spread Spectrum (FHSS)</h4>\n                    <ul>\n                        <li>Signal frequency rapidly shifts (hops) among <code>M</code> discrete carrier channels across a wide band.</li>\n                        <li>Hopping pattern is determined by a synchronized <strong>Pseudorandom Noise (PN) code generator</strong> shared by transmitter and receiver.</li>\n                        <li><strong>Slow FHSS:</strong> One or more data bits are transmitted per frequency hop (<code>Hop Rate <= Bit Rate</code>).</li>\n                        <li><strong>Fast FHSS:</strong> Carrier frequency hops multiple times during a single bit period (<code>Hop Rate > Bit Rate</code>). Highly immune to narrowband jamming because only a fraction of a bit is corrupted if a single frequency is jammed.</li>\n                        <li><strong>Application:</strong> Bluetooth operates in the 2.4 GHz ISM band with 79 channels, hopping 1600 times per second!</li>\n                    </ul>\n                    <h4>2. Direct Sequence Spread Spectrum (DSSS)</h4>\n                    <ul>\n                        <li>Each original data bit is multiplied (XORed) with a high-rate pseudorandom binary sequence called a <strong>Chipping Code</strong> (e.g., 11-bit Barker code).</li>\n                        <li>Each chip has duration <code>Tc << Tb</code> (bit duration). The resulting modulated signal has bandwidth <code>B_ss = 1 / Tc</code>, which is <code>N</code> times wider than original data bandwidth (<code>N = Tb / Tc</code>).</li>\n                        <li><strong>At the Receiver (Despreading):</strong> The received signal is multiplied by the identical synchronized chipping code. Since <code>Code XOR Code = 0</code>, the original data is completely reconstructed! Meanwhile, any narrow-band interference/jammer signal is spread out over <code>B_ss</code>, reducing its power density to harmless background noise.</li>\n                        <li><strong>Application:</strong> IEEE 802.11b Wi-Fi (11-chip Barker code), GPS, and 3G CDMA cellular networks.</li>\n                    </ul>\n                ",
                "keywords": [
                    "Spread Spectrum",
                    "Bandwidth Expansion",
                    "FHSS (Frequency Hopping)",
                    "DSSS (Direct Sequence)",
                    "Pseudorandom Noise (PN) Code",
                    "Chipping Code / Barker Code",
                    "Processing Gain",
                    "Narrowband Jamming Resistance",
                    "CDMA"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "FHSS Frequency-Time Matrix & DSSS Chipping Sequence XOR",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(40, 20)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">FHSS Frequency-Time Hopping Matrix:</text>\n                        <!-- Grid Axis -->\n                        <line x1=\"30\" y1=\"130\" x2=\"320\" y2=\"130\" stroke=\"#475569\" stroke-width=\"1.5\"/>\n                        <line x1=\"30\" y1=\"30\" x2=\"30\" y2=\"130\" stroke=\"#475569\" stroke-width=\"1.5\"/>\n                        <text x=\"175\" y=\"148\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"600\" fill=\"#475569\">Time &rarr;</text>\n                        <text x=\"15\" y=\"40\" text-anchor=\"end\" font-size=\"10\" font-weight=\"600\" fill=\"#475569\">Freq f4</text>\n                        <text x=\"15\" y=\"70\" text-anchor=\"end\" font-size=\"10\" font-weight=\"600\" fill=\"#475569\">Freq f3</text>\n                        <text x=\"15\" y=\"95\" text-anchor=\"end\" font-size=\"10\" font-weight=\"600\" fill=\"#475569\">Freq f2</text>\n                        <text x=\"15\" y=\"120\" text-anchor=\"end\" font-size=\"10\" font-weight=\"600\" fill=\"#475569\">Freq f1</text>\n                        <!-- Hops -->\n                        <rect x=\"40\" y=\"110\" width=\"45\" height=\"18\" fill=\"#3b82f6\" rx=\"3\"/><text x=\"62\" y=\"123\" text-anchor=\"middle\" font-size=\"10\" fill=\"#fff\">Hop 1</text>\n                        <rect x=\"95\" y=\"60\" width=\"45\" height=\"18\" fill=\"#3b82f6\" rx=\"3\"/><text x=\"117\" y=\"73\" text-anchor=\"middle\" font-size=\"10\" fill=\"#fff\">Hop 2</text>\n                        <rect x=\"150\" y=\"30\" width=\"45\" height=\"18\" fill=\"#3b82f6\" rx=\"3\"/><text x=\"172\" y=\"43\" text-anchor=\"middle\" font-size=\"10\" fill=\"#fff\">Hop 3</text>\n                        <rect x=\"205\" y=\"85\" width=\"45\" height=\"18\" fill=\"#3b82f6\" rx=\"3\"/><text x=\"227\" y=\"98\" text-anchor=\"middle\" font-size=\"10\" fill=\"#fff\">Hop 4</text>\n                        <rect x=\"260\" y=\"110\" width=\"45\" height=\"18\" fill=\"#3b82f6\" rx=\"3\"/><text x=\"282\" y=\"123\" text-anchor=\"middle\" font-size=\"10\" fill=\"#fff\">Hop 5</text>\n                    </g>\n                    <!-- DSSS Diagram -->\n                    <g transform=\"translate(420, 20)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">DSSS Spreading & Despreading:</text>\n                        <rect x=\"0\" y=\"35\" width=\"80\" height=\"25\" fill=\"#e0e7ff\" stroke=\"#4338ca\" rx=\"3\"/><text x=\"40\" y=\"52\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#3730a3\">Data Bit: 1</text>\n                        <text x=\"95\" y=\"52\" font-size=\"14\" font-weight=\"700\" fill=\"#475569\">&oplus;</text>\n                        <rect x=\"115\" y=\"35\" width=\"170\" height=\"25\" fill=\"#fef3c7\" stroke=\"#d97706\" rx=\"3\"/><text x=\"200\" y=\"52\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"700\" fill=\"#92400e\">Barker: 10110111000</text>\n                        <line x1=\"150\" y1=\"65\" x2=\"150\" y2=\"85\" stroke=\"#475569\" stroke-width=\"1.5\"/><polygon points=\"146,85 150,91 154,85\" fill=\"#475569\"/>\n                        <rect x=\"40\" y=\"95\" width=\"220\" height=\"25\" fill=\"#fee2e2\" stroke=\"#dc2626\" rx=\"3\"/><text x=\"150\" y=\"112\" text-anchor=\"middle\" font-size=\"9.5\" font-weight=\"700\" fill=\"#b91c1c\">Transmitted Chips (Wide Band)</text>\n                        <text x=\"150\" y=\"140\" text-anchor=\"middle\" font-size=\"9.5\" font-weight=\"600\" fill=\"#15803d\">Receiver: XOR with Barker &rArr; Reconstructs 1!</text>\n                    </g>\n                    <text x=\"380\" y=\"195\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#0f172a\">Processing Gain Gp = 10 * log10(B_ss / B_data); despreading crushes jammers into noise!</text>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>Processing Gain & Jamming Margin</h4>\n                    <p><strong>Processing Gain (Gp):</strong> Measure of jamming improvement achieved by spreading:\n                    <br><code>Gp = B_ss / B_data = Tb / Tc = N (Linear Ratio)</code>, or in decibels:\n                    <br><code>Gp_dB = 10 * log10(B_ss / B_data) = 10 * log10(N)</code>.</p>\n                    <p><strong>Worked Example:</strong> If data rate = 10 kbps and spread bandwidth = 1 MHz:\n                    <br><code>Gp = 1,000,000 / 10,000 = 100 &rArr; Gp_dB = 10 * log10(100) = 20 dB</code>.\n                    <br>The receiver can successfully recover data even if the jammer is 20 dB stronger than the signal!</p>\n                </div>",
                "examTip": "In KTU exams, contrast FHSS vs DSSS across: 1. Bandwidth technique (hopping frequency vs XOR chipping code); 2. Modulation rate (hops/sec vs chips/sec); 3. Standard implementations (Bluetooth for FHSS, Wi-Fi 802.11b for DSSS)."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Deploy Frequency Hopping Shield to Deflect Hostile Jamming",
                "missionDescription": "Activate the spread spectrum shield to pass through intense electronic warfare zones:",
                "objectives": [
                    "Locate the high-intensity Jamming Field in Sector 4.",
                    "Toggle the Frequency Hopping Shield [Shift] to spread transmission power across multiple channels.",
                    "Safely breach the electromagnetic perimeter without packet loss!"
                ],
                "actionText": "\ud83c\udfae Start Mission: Test Spread Spectrum Shield [Space]"
            }
        ]
    },
    {
        "id": "m4_snmp_framework",
        "number": 27,
        "module": 4,
        "moduleTitle": "MODULE 4: PHYSICAL LAYER & NETWORK MANAGEMENT",
        "title": "Network Management Framework: SNMP Architecture, SMI & MIB-II OID Tree (1.3.6.1.2.1)",
        "badge": "MUST-KNOW 9M",
        "ktuRef": "Official Model Paper Q8 / Q14b Choice B // 9 Marks // SNMP Architecture & MIB Tree",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Manager-Agent Architecture, SMI Rules & Hierarchical MIB-II Tree",
                "storyline": "You reach the Central Network Operations Center (NOC) of Sector 4. To monitor thousands of routers, switches, and servers across the Internet, network engineers rely on the tripartite SNMP framework.",
                "theory": "\n                    <p>The standard Internet Network Management Framework consists of three distinct, cooperative specifications:</p>\n                    <ul>\n                        <li><strong>1. SNMP (Simple Network Management Protocol):</strong> Defines the format of messages exchanged between management stations and managed agents:\n                            <ul>\n                                <li><strong>Manager (NOC Station):</strong> Polls agents, sends configuration updates, and listens for alarms.</li>\n                                <li><strong>Agent (Managed Device):</strong> Software daemon residing on routers, switches, or hosts that monitors local state and hardware counters.</li>\n                                <li><strong>UDP Ports:</strong> Port <strong>161</strong> (Agent listens for Manager requests), Port <strong>162</strong> (Manager listens for unsolicited Agent Traps).</li>\n                                <li><strong>7 Core PDUs:</strong> <code>GetRequest</code> (read variable), <code>GetNextRequest</code> (walk MIB tree), <code>GetBulkRequest</code> (efficient table retrieval), <code>SetRequest</code> (modify parameter), <code>Response</code> (agent reply), <code>Trap</code> (unsolicited alarm sent by agent on interface failure/reboot), <code>InformRequest</code> (acknowledged manager-to-manager alert).</li>\n                            </ul>\n                        </li>\n                        <li><strong>2. SMI (Structure of Management Information):</strong> Defines the fundamental rules for naming managed objects, specifying their data types (using ASN.1), and representing valid value ranges.</li>\n                        <li><strong>3. MIB (Management Information Base):</strong> A virtual, tree-structured database stored on each device containing all accessible management objects.</li>\n                    </ul>\n                    <h4>The MIB-II Object Identifier (OID) Tree (RFC 1213)</h4>\n                    <p>Every managed object has a unique dot-delimited hierarchical address starting from the ISO root:\n                    <br><code>iso(1) &rarr; org(3) &rarr; dod(6) &rarr; internet(1) &rarr; mgmt(2) &rarr; mib-2(1)</code> &rArr; Prefix: <strong>1.3.6.1.2.1</strong>.</p>\n                    <p>Key MIB-II Groups under <code>1.3.6.1.2.1</code>:\n                    <br>&bull; <code>system(1)</code>: Device description, uptime (<code>sysUpTime</code>), contact.\n                    <br>&bull; <code>interfaces(2)</code>: Network interface count, MTU, packet traffic counters (<code>ifInOctets</code>, <code>ifOutOctets</code>).\n                    <br>&bull; <code>ip(4)</code>: IP routing tables, forwarding parameters, packet drop statistics.\n                    <br>&bull; <code>tcp(6)</code>: Active/passive TCP connection counts, current open sockets, retransmissions.\n                    <br>&bull; <code>udp(7)</code>: Datagram delivery statistics and error counts.</p>\n                ",
                "keywords": [
                    "SNMP (Simple Network Management Protocol)",
                    "Manager vs Agent",
                    "UDP Port 161 & 162",
                    "SNMP PDUs (Get, Set, Trap)",
                    "SMI (Structure of Management Info)",
                    "MIB-II Hierarchical Tree",
                    "OID (Object Identifier: 1.3.6.1.2.1)",
                    "MIB Groups (system, interfaces, ip, tcp)"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Hierarchical MIB-II Tree Structure & Manager-Agent Message Flow",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(30, 20)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">MIB-II Hierarchical Object Identifier (OID) Tree:</text>\n                        <!-- Tree nodes -->\n                        <rect x=\"140\" y=\"30\" width=\"80\" height=\"22\" rx=\"4\" fill=\"#3b82f6\"/><text x=\"180\" y=\"45\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#fff\">iso(1)</text>\n                        <line x1=\"180\" y1=\"52\" x2=\"180\" y2=\"65\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n                        <rect x=\"140\" y=\"65\" width=\"80\" height=\"22\" rx=\"4\" fill=\"#2563eb\"/><text x=\"180\" y=\"80\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#fff\">org(3)</text>\n                        <line x1=\"180\" y1=\"87\" x2=\"180\" y2=\"100\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n                        <rect x=\"140\" y=\"100\" width=\"80\" height=\"22\" rx=\"4\" fill=\"#1d4ed8\"/><text x=\"180\" y=\"115\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#fff\">dod(6)</text>\n                        <line x1=\"180\" y1=\"122\" x2=\"180\" y2=\"135\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n                        <rect x=\"140\" y=\"135\" width=\"80\" height=\"22\" rx=\"4\" fill=\"#1e40af\"/><text x=\"180\" y=\"150\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#fff\">internet(1)</text>\n                        <!-- Branch to mgmt -->\n                        <line x1=\"220\" y1=\"146\" x2=\"260\" y2=\"146\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n                        <rect x=\"260\" y=\"135\" width=\"80\" height=\"22\" rx=\"4\" fill=\"#059669\"/><text x=\"300\" y=\"150\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#fff\">mgmt(2)</text>\n                        <!-- Branch to mib-2 -->\n                        <line x1=\"340\" y1=\"146\" x2=\"380\" y2=\"146\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n                        <rect x=\"380\" y=\"135\" width=\"80\" height=\"22\" rx=\"4\" fill=\"#10b981\"/><text x=\"420\" y=\"150\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#fff\">mib-2(1)</text>\n                    </g>\n                    <!-- MIB-2 Groups Box -->\n                    <g transform=\"translate(480, 30)\">\n                        <rect x=\"0\" y=\"0\" width=\"250\" height=\"135\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#10b981\" stroke-width=\"1.5\"/>\n                        <text x=\"125\" y=\"20\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#065f46\">Core MIB-II Groups (1.3.6.1.2.1.*)</text>\n                        <text x=\"15\" y=\"42\" font-size=\"10\" font-weight=\"600\" fill=\"#1e293b\">.1 system (sysUpTime, sysDescr)</text>\n                        <text x=\"15\" y=\"62\" font-size=\"10\" font-weight=\"600\" fill=\"#1e293b\">.2 interfaces (ifInOctets, ifSpeed)</text>\n                        <text x=\"15\" y=\"82\" font-size=\"10\" font-weight=\"600\" fill=\"#1e293b\">.4 ip (ipRoutingTable, ipForwarding)</text>\n                        <text x=\"15\" y=\"102\" font-size=\"10\" font-weight=\"600\" fill=\"#1e293b\">.6 tcp (tcpCurrEstab, tcpRetrans)</text>\n                        <text x=\"15\" y=\"122\" font-size=\"10\" font-weight=\"600\" fill=\"#1e293b\">.7 udp (udpInDatagrams, udpNoPorts)</text>\n                    </g>\n                    <text x=\"380\" y=\"190\" text-anchor=\"middle\" font-size=\"11.5\" font-weight=\"700\" fill=\"#0f172a\">SNMP Manager queries Agent via UDP 161 (Get/Set); Agent pushes critical Traps via UDP 162</text>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>Tripartite Network Management Relationship</h4>\n                    <p><strong>SNMP:</strong> The communication protocol (PDUs: Get, GetNext, Set, Trap) carrying data over UDP 161/162.</p>\n                    <p><strong>SMI:</strong> The syntax and grammar rules defining allowed data types and naming conventions.</p>\n                    <p><strong>MIB-II:</strong> The database dictionary specifying what variables exist and their numeric OIDs (1.3.6.1.2.1.x).</p>\n                </div>",
                "examTip": "A guaranteed 9-mark answer must: 1. Explain the roles of Manager, Agent, SMI, and MIB; 2. State UDP ports 161 and 162; 3. Draw the OID hierarchy down to 1.3.6.1.2.1; 4. List at least 4 MIB-II groups (system, interfaces, ip, tcp)."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Inspect SNMP MIB-II OIDs in the NOC Console",
                "missionDescription": "Connect to the network management station in Sector 4:",
                "objectives": [
                    "Open the SNMP NOC Console in Sector 4.",
                    "Execute a GetRequest query to OID 1.3.6.1.2.1.1.3 (sysUpTime).",
                    "Simulate an interface link failure and verify that an asynchronous SNMP Trap is fired to Port 162!"
                ],
                "actionText": "\ud83c\udfae Start Mission: Open SNMP Operations Console [Space]"
            }
        ]
    },
    {
        "id": "m4_asn1_syntax",
        "number": 28,
        "module": 4,
        "moduleTitle": "MODULE 4: PHYSICAL LAYER & NETWORK MANAGEMENT",
        "title": "ASN.1 Syntax & Type Definitions: Basic Types, SEQUENCE, CHOICE, ENUMERATED & Debugging",
        "badge": "MUST-KNOW 9M",
        "ktuRef": "Official Model Paper Q14b // 9 Marks // Abstract Syntax Notation One (ASN.1) Definitions",
        "pages": [
            {
                "tab": "Core Theory",
                "subtitle": "Formal Abstract Syntax, Primitive Types, Constructed Types & BER TLV Encoding",
                "storyline": "At the highest architectural summit of Sector 4 lies the ASN.1 Schema Core. Here, all network data structures are formally defined in human-readable, architecture-neutral mathematical notation before being encoded into binary bytes.",
                "theory": "\n                    <p><strong>ASN.1 (Abstract Syntax Notation One - ITU-T X.208 / X.680)</strong> is a formal language for defining data structures regardless of computer architecture, operating system, or byte endianness. It is used extensively in SNMP, cryptographic certificates (X.509), and cellular signaling (LTE/5G RRC).</p>\n                    <h4>1. Primitive (Simple) Data Types</h4>\n                    <ul>\n                        <li><code>INTEGER</code>: Arbitrary integer or bounded range (e.g., <code>INTEGER (0..65535)</code>).</li>\n                        <li><code>OCTET STRING</code>: Arbitrary sequence of zero or more 8-bit bytes (used for binary hashes, payloads, MAC addresses).</li>\n                        <li><code>BOOLEAN</code>: <code>TRUE</code> or <code>FALSE</code>.</li>\n                        <li><code>BIT STRING</code>: Sequence of named bits/flags (e.g., <code>syn(0), ack(1), fin(2)</code>).</li>\n                        <li><code>OBJECT IDENTIFIER</code>: Hierarchical node path in an OID tree.</li>\n                        <li><code>NULL</code>: Value indicator representing an empty placeholder.</li>\n                    </ul>\n                    <h4>2. Constructed (Structured) Data Types</h4>\n                    <ul>\n                        <li><code>SEQUENCE</code>: Ordered collection of one or more fields of differing types (identical to a C <code>struct</code>):\n                            <br><code>Employee ::= SEQUENCE { id INTEGER, name OCTET STRING, active BOOLEAN }</code>.</li>\n                        <li><code>SEQUENCE OF</code>: Ordered list of zero or more items of the <em>same</em> type (identical to an array <code>Type[]</code>):\n                            <br><code>RouteTable ::= SEQUENCE OF RouteEntry</code>.</li>\n                        <li><code>CHOICE</code>: Union of distinct alternative types where exactly one type is selected at runtime (identical to a C <code>union</code>):\n                            <br><code>Address ::= CHOICE { ipv4 [0] OCTET STRING (SIZE(4)), ipv6 [1] OCTET STRING (SIZE(16)) }</code>.</li>\n                        <li><code>ENUMERATED</code>: Defined list of distinct named integer values:\n                            <br><code>LinkStatus ::= ENUMERATED { up(1), down(2), testing(3) }</code>.</li>\n                    </ul>\n                    <h4>3. BER (Basic Encoding Rules) TLV Format</h4>\n                    <p>ASN.1 defines abstract structure; <strong>BER</strong> defines how values are converted into binary on the wire using <strong>TLV (Tag-Length-Value)</strong> triplets:\n                    <br>&bull; <strong>Tag (T):</strong> 1 byte identifying the data type (e.g., INTEGER = <code>0x02</code>, OCTET STRING = <code>0x04</code>, SEQUENCE = <code>0x30</code>).\n                    <br>&bull; <strong>Length (L):</strong> 1 or more bytes indicating the length of the Value field.\n                    <br>&bull; <strong>Value (V):</strong> The actual data payload in network byte order.</p>\n                ",
                "keywords": [
                    "ASN.1 (Abstract Syntax Notation One)",
                    "Primitive Types (INTEGER, OCTET STRING)",
                    "Constructed Types",
                    "SEQUENCE (struct)",
                    "SEQUENCE OF (array)",
                    "CHOICE (union)",
                    "ENUMERATED",
                    "BER (Basic Encoding Rules)",
                    "TLV (Tag-Length-Value)"
                ]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "ASN.1 Type Definition Schema & BER TLV Byte Layout",
                "svg": "<svg viewBox=\"0 0 760 210\" width=\"100%\" height=\"210\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"760\" height=\"210\" fill=\"#f8fafc\" rx=\"8\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n                    <g transform=\"translate(30, 20)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">ASN.1 Structure vs BER TLV Binary Stream:</text>\n                        <!-- ASN.1 Code Block -->\n                        <rect x=\"0\" y=\"30\" width=\"320\" height=\"110\" rx=\"6\" fill=\"#1e293b\"/>\n                        <text x=\"15\" y=\"55\" font-family=\"monospace\" font-size=\"11\" fill=\"#38bdf8\">PacketHeader ::= SEQUENCE {</text>\n                        <text x=\"35\" y=\"75\" font-family=\"monospace\" font-size=\"11\" fill=\"#facc15\">  version   INTEGER (0..15),</text>\n                        <text x=\"35\" y=\"95\" font-family=\"monospace\" font-size=\"11\" fill=\"#4ade80\">  payload   OCTET STRING,</text>\n                        <text x=\"35\" y=\"115\" font-family=\"monospace\" font-size=\"11\" fill=\"#f43f5e\">  urgent    BOOLEAN</text>\n                        <text x=\"15\" y=\"132\" font-family=\"monospace\" font-size=\"11\" fill=\"#38bdf8\">}</text>\n                    </g>\n                    <!-- BER TLV Box -->\n                    <g transform=\"translate(380, 20)\">\n                        <text x=\"0\" y=\"15\" font-family=\"-apple-system, sans-serif\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">BER TLV Binary Encoding Structure:</text>\n                        <!-- Outer SEQUENCE TLV -->\n                        <rect x=\"0\" y=\"30\" width=\"340\" height=\"110\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n                        <rect x=\"10\" y=\"45\" width=\"60\" height=\"25\" fill=\"#3b82f6\" rx=\"3\"/><text x=\"40\" y=\"62\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#fff\">Tag: 0x30</text>\n                        <rect x=\"75\" y=\"45\" width=\"60\" height=\"25\" fill=\"#6366f1\" rx=\"3\"/><text x=\"105\" y=\"62\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#fff\">Len: 0x0A</text>\n                        <rect x=\"140\" y=\"45\" width=\"190\" height=\"85\" fill=\"#e0e7ff\" rx=\"3\"/>\n                        <text x=\"235\" y=\"62\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"700\" fill=\"#3730a3\">Value: Encapsulated TLVs</text>\n                        <!-- Inner TLV for INTEGER -->\n                        <g transform=\"translate(150, 75)\">\n                            <rect x=\"0\" y=\"0\" width=\"40\" height=\"20\" fill=\"#22c55e\" rx=\"2\"/><text x=\"20\" y=\"14\" text-anchor=\"middle\" font-size=\"8\" font-weight=\"700\" fill=\"#fff\">T:0x02</text>\n                            <rect x=\"45\" y=\"0\" width=\"40\" height=\"20\" fill=\"#16a34a\" rx=\"2\"/><text x=\"65\" y=\"14\" text-anchor=\"middle\" font-size=\"8\" font-weight=\"700\" fill=\"#fff\">L:0x01</text>\n                            <rect x=\"90\" y=\"0\" width=\"70\" height=\"20\" fill=\"#15803d\" rx=\"2\"/><text x=\"125\" y=\"14\" text-anchor=\"middle\" font-size=\"8\" font-weight=\"700\" fill=\"#fff\">V:0x04</text>\n                            <text x=\"85\" y=\"38\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"600\" fill=\"#1e293b\">version = 4 (INTEGER)</text>\n                        </g>\n                    </g>\n                    <text x=\"380\" y=\"190\" text-anchor=\"middle\" font-size=\"11.5\" font-weight=\"700\" fill=\"#0f172a\">Every transmitted entity in BER is wrapped in [Tag (Type)] + [Length (Bytes)] + [Value (Raw Data)]</text>\n                </svg>",
                "formulas": "<div class=\"academic-callout\">\n                    <h4>ASN.1 Constructed Types Examination Cheat-Sheet</h4>\n                    <p><strong>SEQUENCE:</strong> C struct equivalent (ordered heterogeneous elements).</p>\n                    <p><strong>SEQUENCE OF:</strong> Array equivalent (ordered homogeneous elements).</p>\n                    <p><strong>CHOICE:</strong> C union equivalent (one alternative selected at runtime).</p>\n                    <p><strong>ENUMERATED:</strong> Named discrete values with explicit integer mappings.</p>\n                </div>",
                "examTip": "Examiners frequently provide an English specification and ask you to write the ASN.1 definition. Remember: Type names must start with an Uppercase letter (e.g., DeviceRecord); identifier field names must start with a lowercase letter (e.g., deviceId)."
            },
            {
                "tab": "In-Game Lab",
                "subtitle": "Debug ASN.1 Schemas in the Syntax Terminal",
                "missionDescription": "Inspect and compile ASN.1 type definitions in Sector 4:",
                "objectives": [
                    "Access the ASN.1 Syntax Terminal in Sector 4.",
                    "Verify the difference between SEQUENCE (struct) and CHOICE (union).",
                    "Compile and validate an error-free ASN.1 packet definition to earn maximum exam points!"
                ],
                "actionText": "\ud83c\udfae Start Mission: Test ASN.1 Syntax Terminal [Space]"
            }
        ]
    }
];

        this.currentStageIndex = 0;
        this.currentPageIndex = 0; // 0: Theory, 1: Math/Diagrams, 2: In-Game Lab
        this.isOpen = false;
        this.isSidebarOpen = true;
        this.completedStages = new Set();
        this.searchQuery = '';
        this.activeModuleFilter = 'all';

        if (typeof document !== 'undefined') {
            this.initDOM();
            this.bindGlobalKeyboard();
        }
    }

    initDOM() {
        this.createSidebarDOM();
        this.createModalDOM();
    }

    createSidebarDOM() {
        if (document.getElementById('study-sidebar')) return;

        const sidebar = document.createElement('div');
        sidebar.id = 'study-sidebar';
        sidebar.className = 'study-sidebar open';
        sidebar.innerHTML = `
            <div class="sidebar-header">
                <div class="sidebar-title-row">
                    <div class="sidebar-title-group">
                        <span class="sidebar-icon">📚</span>
                        <div>
                            <h3 class="sidebar-title">KTU PCCST501</h3>
                            <span class="sidebar-subtitle">28-TOPIC EXAM CURRICULUM</span>
                        </div>
                    </div>
                    <button id="btn-close-sidebar" class="sidebar-close-btn" title="Collapse Sidebar [B]">✕</button>
                </div>

                <!-- Live Search Filter -->
                <div class="sidebar-search-row">
                    <input type="text" id="sidebar-search-input" class="sidebar-search-input" placeholder="🔍 Search 28 topics, RFCs, formulas..." autocomplete="off" spellcheck="false" />
                </div>

                <!-- Module Filter Tabs -->
                <div class="sidebar-filter-tabs" id="sidebar-filter-tabs">
                    <button class="filter-tab active" data-filter="all">All (28)</button>
                    <button class="filter-tab" data-filter="1">Mod 1</button>
                    <button class="filter-tab" data-filter="2">Mod 2</button>
                    <button class="filter-tab" data-filter="3">Mod 3</button>
                    <button class="filter-tab" data-filter="4">Mod 4</button>
                </div>

                <!-- Progress Bar -->
                <div class="sidebar-progress-bar">
                    <div class="sidebar-progress-fill" id="sidebar-progress-fill" style="width: 4%;"></div>
                </div>
                <div class="sidebar-progress-label">
                    <span id="sidebar-progress-text">Stage 1 of 28 Active</span>
                    <span class="progress-pct" id="sidebar-progress-pct">0%</span>
                </div>
            </div>
            <div class="study-sidebar-topics" id="study-sidebar-topics">
                <!-- Dynamically populated module topics -->
            </div>
        `;

        document.body.appendChild(sidebar);

        // Sidebar toggle button on edge
        const tabBtn = document.createElement('button');
        tabBtn.id = 'study-sidebar-tab';
        tabBtn.className = 'study-sidebar-tab';
        tabBtn.innerHTML = `<span>📖 SYLLABUS NOTES [B]</span>`;
        tabBtn.title = 'Open KTU Course Syllabus Notes Sidebar [B]';
        tabBtn.addEventListener('click', () => this.toggleSidebar());
        document.body.appendChild(tabBtn);

        document.getElementById('btn-close-sidebar').addEventListener('click', () => {
            this.setSidebarOpen(false);
        });

        // Search input event
        const searchInput = document.getElementById('sidebar-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.renderSidebarList();
            });
        }

        // Filter tabs event
        const filterTabs = document.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.activeModuleFilter = tab.getAttribute('data-filter');
                this.renderSidebarList();
            });
        });

        this.renderSidebarList();
    }

    createModalDOM() {
        if (document.getElementById('study-modal-backdrop')) return;

        const backdrop = document.createElement('div');
        backdrop.id = 'study-modal-backdrop';
        backdrop.className = 'study-modal-backdrop hidden';
        backdrop.innerHTML = `
            <div class="academic-document-card" id="academic-doc-card">
                <!-- Document Header -->
                <div class="doc-header">
                    <div class="doc-meta-top">
                        <span class="doc-course-badge">APJ ABDUL KALAM TECHNOLOGICAL UNIVERSITY // PCCST501</span>
                        <span class="doc-module-badge" id="modal-module-badge">MODULE 1 • APPLICATION LAYER</span>
                    </div>
                    <div class="doc-title-row">
                        <h2 class="doc-stage-title" id="modal-stage-title">1. TCP/IP 5-Layer Stack</h2>
                        <button class="doc-close-btn" id="btn-close-study-modal" title="Close Guide & Return to Game [Esc]">✕</button>
                    </div>
                    <div class="doc-syllabus-ref" id="modal-syllabus-ref">KTU Syllabus: Module 1 // Protocol Layering & Encapsulation</div>

                    <!-- Page Navigation Tabs -->
                    <div class="doc-nav-tabs">
                        <button class="doc-tab-btn active" data-page="0" id="tab-btn-0">
                            <span class="tab-num">1</span>
                            <span class="tab-txt">Core Theory</span>
                        </button>
                        <button class="doc-tab-btn" data-page="1" id="tab-btn-1">
                            <span class="tab-num">2</span>
                            <span class="tab-txt">Diagrams & Math</span>
                        </button>
                        <button class="doc-tab-btn" data-page="2" id="tab-btn-2">
                            <span class="tab-num">3</span>
                            <span class="tab-txt">Interactive Mission</span>
                        </button>
                    </div>
                </div>

                <!-- Document Body (Smooth Scrolling Content) -->
                <div class="doc-body" id="doc-scroll-body">
                    <!-- Page 1: Core Theory Content -->
                    <div class="doc-page" id="doc-page-0">
                        <div class="doc-section-header">
                            <h3 id="p1-subtitle">Core Theory Subtitle</h3>
                            <span class="doc-pill-tag">Exam Theory</span>
                        </div>
                        <div class="doc-storyline-callout" id="p1-storyline"></div>
                        <div class="doc-prose" id="p1-theory"></div>
                        <div class="doc-keywords-section">
                            <h4>Examiner Keywords to Memorize:</h4>
                            <div class="keywords-wrap" id="p1-keywords"></div>
                        </div>
                    </div>

                    <!-- Page 2: Diagrams & Formulas -->
                    <div class="doc-page hidden" id="doc-page-1">
                        <div class="doc-section-header">
                            <h3 id="p2-subtitle">Diagrams & Math Subtitle</h3>
                            <span class="doc-pill-tag amber">KTU Derivation & Diagram</span>
                        </div>
                        <div class="doc-svg-container" id="p2-svg"></div>
                        <div class="doc-formulas-wrap" id="p2-formulas"></div>
                        <div class="doc-exam-tip" id="p2-exam-tip"></div>
                    </div>

                    <!-- Page 3: Interactive Mission in Game -->
                    <div class="doc-page hidden" id="doc-page-2">
                        <div class="doc-section-header">
                            <h3 id="p3-subtitle">Step-by-Step Experience in the Game World</h3>
                            <span class="doc-pill-tag green">Interactive Objective</span>
                        </div>
                        <p class="doc-mission-intro" id="p3-intro"></p>
                        <div class="doc-objectives-card">
                            <h4>📋 Active Mission Objectives:</h4>
                            <ol class="objectives-list" id="p3-objectives"></ol>
                        </div>
                        <div class="doc-action-cta">
                            <button class="doc-play-btn" id="btn-modal-play">
                                <span class="play-icon">🎮</span>
                                <span id="btn-modal-play-txt">Start Mission: Experience Protocol in Game [Space]</span>
                            </button>
                            <span class="doc-play-subtext">Press <kbd>Space</kbd> or click to resume interactive simulation</span>
                        </div>
                    </div>
                </div>

                <!-- Document Footer (Controls) -->
                <div class="doc-footer">
                    <button class="doc-ctrl-btn" id="btn-doc-prev" title="Previous Page [←]">
                        <span>← Previous Page</span>
                    </button>
                    <div class="doc-page-dots" id="doc-page-dots">
                        <span class="page-dot active" data-page="0"></span>
                        <span class="page-dot" data-page="1"></span>
                        <span class="page-dot" data-page="2"></span>
                    </div>
                    <button class="doc-ctrl-btn primary" id="btn-doc-next" title="Next Page [Space / →]">
                        <span id="btn-doc-next-txt">Next: Diagrams & Math →</span>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(backdrop);

        // Bind clicks inside modal
        document.getElementById('btn-close-study-modal').addEventListener('click', () => this.close());

        // Tab buttons
        [0, 1, 2].forEach(pg => {
            const btn = document.getElementById(`tab-btn-${pg}`);
            if (btn) btn.addEventListener('click', () => this.setPage(pg));
        });

        // Prev / Next buttons
        document.getElementById('btn-doc-prev').addEventListener('click', () => this.prevPage());
        document.getElementById('btn-doc-next').addEventListener('click', () => this.nextPage());
        document.getElementById('btn-modal-play').addEventListener('click', () => this.playCurrentStage());

        // Backdrop click to close when clicking outside card
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) this.close();
        });
    }

    renderSidebarList() {
        if (typeof document === 'undefined') return;
        const container = document.getElementById('study-sidebar-topics');
        if (!container) return;

        const q = (this.searchQuery || '').toLowerCase().trim();
        const modFilter = this.activeModuleFilter;

        // Filter stages
        const filteredStages = this.stages.filter(st => {
            if (modFilter !== 'all' && st.module !== parseInt(modFilter, 10)) {
                return false;
            }
            if (q) {
                const matchesTitle = st.title.toLowerCase().includes(q);
                const matchesRef = (st.ktuRef || '').toLowerCase().includes(q);
                const matchesBadge = (st.badge || '').toLowerCase().includes(q);
                const matchesKeywords = st.pages[0]?.keywords?.some(k => k.toLowerCase().includes(q));
                if (!matchesTitle && !matchesRef && !matchesBadge && !matchesKeywords) {
                    return false;
                }
            }
            return true;
        });

        if (filteredStages.length === 0) {
            container.innerHTML = `
                <div class="sidebar-empty-state">
                    <p>No topics matching "<strong>${q}</strong>"</p>
                    <button class="sidebar-reset-search-btn" id="btn-reset-search">Clear Filter</button>
                </div>
            `;
            const resetBtn = document.getElementById('btn-reset-search');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    this.searchQuery = '';
                    const searchInput = document.getElementById('sidebar-search-input');
                    if (searchInput) searchInput.value = '';
                    this.renderSidebarList();
                });
            }
            return;
        }

        let html = '';
        let currentMod = null;

        filteredStages.forEach((st) => {
            const realIdx = this.stages.indexOf(st);
            if (st.module !== currentMod) {
                currentMod = st.module;
                html += `<div class="sidebar-module-divider">${st.moduleTitle}</div>`;
            }

            const isDone = this.completedStages.has(st.number);
            const isActive = realIdx === this.currentStageIndex;

            let statusBadge = '<span class="stage-tag upcoming">Topic</span>';
            if (isDone) {
                statusBadge = '<span class="stage-tag done">✓ Completed</span>';
            } else if (isActive) {
                statusBadge = '<span class="stage-tag active">🎯 Active in Game</span>';
            }

            html += `
                <div class="sidebar-stage-item ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}" data-stage="${realIdx}">
                    <div class="stage-item-top">
                        <span class="stage-num">STAGE ${st.number}</span>
                        ${statusBadge}
                    </div>
                    <div class="stage-item-title">${st.title}</div>
                    <div class="stage-item-meta">
                        <span class="badge-pill">${st.badge}</span>
                        <span class="item-ref">KTU Mod ${st.module}</span>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;

        // Bind clicks to open specific stage
        const items = container.querySelectorAll('.sidebar-stage-item');
        items.forEach(item => {
            item.addEventListener('click', () => {
                const stageIdx = parseInt(item.getAttribute('data-stage'), 10);
                this.openStage(stageIdx, 0);
            });
        });

        // Update progress bar
        const total = this.stages.length;
        const doneCount = this.completedStages.size;
        const pct = Math.round((doneCount / total) * 100);
        const fill = document.getElementById('sidebar-progress-fill');
        const text = document.getElementById('sidebar-progress-text');
        const pctEl = document.getElementById('sidebar-progress-pct');
        if (fill) fill.style.width = `${Math.max(4, pct)}%`;
        if (text) text.textContent = `Stage ${this.currentStageIndex + 1} of ${total} Active`;
        if (pctEl) pctEl.textContent = `${pct}%`;
    }

    openStage(stageIndex, pageIndex = 0) {
        if (stageIndex < 0 || stageIndex >= this.stages.length) return;
        this.currentStageIndex = stageIndex;
        this.currentPageIndex = pageIndex;

        if (typeof document === 'undefined') {
            this.isOpen = true;
            return;
        }

        try {
            if (!document.getElementById('study-modal-backdrop')) {
                this.initDOM();
            }

            const stage = this.stages[stageIndex];
            const setHtml = (id, html) => {
                const el = document.getElementById(id);
                if (el) el.innerHTML = html;
            };
            const setText = (id, text) => {
                const el = document.getElementById(id);
                if (el) el.textContent = text;
            };

            // Header fields
            setText('modal-module-badge', stage.moduleTitle);
            setText('modal-stage-title', `${stage.number}. ${stage.title}`);
            setText('modal-syllabus-ref', stage.ktuRef);

            // Page 1: Core Theory
            const p1 = stage.pages[0];
            setText('p1-subtitle', p1.subtitle || '');
            setHtml('p1-storyline', `
                <div class="story-icon">🛰️</div>
                <div class="story-text"><strong>Mission Storyline:</strong> ${p1.storyline || ''}</div>
            `);
            setHtml('p1-theory', p1.theory || '');
            const kws = (p1.keywords || []).map(kw => `<span class="keyword-chip">${kw}</span>`).join('');
            setHtml('p1-keywords', kws);

            // Page 2: Diagrams & Math
            const p2 = stage.pages[1] || {};
            setText('p2-subtitle', p2.subtitle || 'Diagrams & Math Derivations');
            setHtml('p2-svg', p2.svg || '');
            setHtml('p2-formulas', p2.formulas || '');
            setHtml('p2-exam-tip', `
                <div class="exam-tip-box">
                    <span class="tip-badge">EXAMINER TIP</span>
                    <p>${p2.examTip || 'Focus on protocol headers, derivations, and exact terminology.'}</p>
                </div>
            `);

            // Page 3: In-Game Interactive Experience
            const p3 = stage.pages[2] || {};
            setText('p3-subtitle', p3.subtitle || 'In-Game Interactive Mission');
            setText('p3-intro', p3.missionDescription || 'Experience this concept directly inside the game world:');
            const objs = (p3.objectives || ['Observe protocol behavior in real-time.']).map(obj => `<li>${obj}</li>`).join('');
            setHtml('p3-objectives', objs);
            setText('btn-modal-play-txt', p3.actionText || '🎮 Start Mission: Experience in Game [Space]');

            this.setPage(pageIndex);

            const backdrop = document.getElementById('study-modal-backdrop');
            if (backdrop) {
                backdrop.classList.remove('hidden');
            }
            this.isOpen = true;

            this.renderSidebarList();
        } catch (err) {
            console.error('[StudyGuideSystem] Error opening stage:', err);
        }
    }

    setPage(pageIndex) {
        if (pageIndex < 0 || pageIndex > 2) return;
        this.currentPageIndex = pageIndex;

        if (typeof document === 'undefined') return;

        // Toggle pages visibility
        [0, 1, 2].forEach(idx => {
            const pageEl = document.getElementById(`doc-page-${idx}`);
            const tabBtn = document.getElementById(`tab-btn-${idx}`);
            if (pageEl) {
                if (idx === pageIndex) {
                    pageEl.classList.remove('hidden');
                } else {
                    pageEl.classList.add('hidden');
                }
            }
            if (tabBtn) {
                if (idx === pageIndex) {
                    tabBtn.classList.add('active');
                } else {
                    tabBtn.classList.remove('active');
                }
            }
        });

        // Update Dots
        const dots = document.querySelectorAll('.page-dot');
        dots.forEach(dot => {
            const p = parseInt(dot.getAttribute('data-page'), 10);
            if (p === pageIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update Prev / Next button states & labels
        const prevBtn = document.getElementById('btn-doc-prev');
        const nextBtnTxt = document.getElementById('btn-doc-next-txt');
        if (prevBtn) {
            prevBtn.style.visibility = (pageIndex === 0) ? 'hidden' : 'visible';
        }
        if (nextBtnTxt) {
            if (pageIndex === 0) {
                nextBtnTxt.textContent = 'Next: Diagrams & Math →';
            } else if (pageIndex === 1) {
                nextBtnTxt.textContent = 'Next: In-Game Mission →';
            } else {
                nextBtnTxt.textContent = 'Close & Play Mission 🎮';
            }
        }

        // Scroll to top of doc body
        const scrollBody = document.getElementById('doc-scroll-body');
        if (scrollBody) scrollBody.scrollTop = 0;
    }

    nextPage() {
        if (this.currentPageIndex < 2) {
            this.setPage(this.currentPageIndex + 1);
        } else {
            this.playCurrentStage();
        }
    }

    prevPage() {
        if (this.currentPageIndex > 0) {
            this.setPage(this.currentPageIndex - 1);
        }
    }

    playCurrentStage() {
        this.completedStages.add(this.stages[this.currentStageIndex].number);
        this.close();

        // Optional hook: advance sector or notify HUD
        if (window.GameLoop && window.GameLoop.hud) {
            window.GameLoop.hud.showNotification?.(
                `🚀 Mission Activated: Stage ${this.stages[this.currentStageIndex].number} - ${this.stages[this.currentStageIndex].title}`,
                4000
            );
        }
    }

    close() {
        const backdrop = document.getElementById('study-modal-backdrop');
        if (backdrop) {
            backdrop.classList.add('hidden');
        }
        this.isOpen = false;
        this.renderSidebarList();
    }

    toggleSidebar() {
        this.setSidebarOpen(!this.isSidebarOpen);
    }

    setSidebarOpen(open) {
        this.isSidebarOpen = open;
        const sidebar = document.getElementById('study-sidebar');
        if (sidebar) {
            if (open) {
                sidebar.classList.add('open');
            } else {
                sidebar.classList.remove('open');
            }
        }
    }

    markStageCompleted(stageNumber) {
        this.completedStages.add(stageNumber);
        this.renderSidebarList();
    }

    bindGlobalKeyboard() {
        if (typeof window === 'undefined') return;

        window.addEventListener('keydown', (e) => {
            // Ignore keystrokes when typing inside text inputs or textareas
            const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
            if (tag === 'input' || tag === 'textarea') return;

            // If user is typing in rubric grader or codex search, don't intercept
            const isTyping = (window.GameLoop && window.GameLoop.rubricGrader && window.GameLoop.rubricGrader.isTyping) ||
                             (window.GameLoop && window.GameLoop.codexViewer && window.GameLoop.codexViewer.isSearchFocused);
            if (isTyping) return;

            // B key toggles study modal or sidebar
            if (e.key === 'b' || e.key === 'B') {
                e.preventDefault();
                if (this.isOpen) {
                    this.close();
                } else {
                    this.openStage(this.currentStageIndex, 0);
                }
                return;
            }

            // When study modal is open:
            if (this.isOpen) {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    this.close();
                } else if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'Enter') {
                    e.preventDefault();
                    this.nextPage();
                } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.prevPage();
                } else if (e.key === '1') {
                    this.setPage(0);
                } else if (e.key === '2') {
                    this.setPage(1);
                } else if (e.key === '3') {
                    this.setPage(2);
                }
            }
        });
    }
}

// Export to window
if (typeof window !== 'undefined') {
    window.StudyGuideSystem = StudyGuideSystem;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StudyGuideSystem;
}
