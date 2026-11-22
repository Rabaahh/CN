#!/usr/bin/env python3
# ==============================================================================
# Generator for comprehensive 28-topic KTU PCCST501 Study Guide & Sidebar Engine
# 100% Alignment with User Images (Part B 9-Mark Plans & Study First Lists)
# ==============================================================================

import json

topics = [
    # --------------------------------------------------------------------------
    # MODULE 1: APPLICATION LAYER (Topics 1 - 6)
    # --------------------------------------------------------------------------
    {
        "id": "m1_tcp_ip_stack",
        "number": 1,
        "module": 1,
        "moduleTitle": "MODULE 1: APPLICATION LAYER",
        "title": "TCP/IP 5-Layer Stack, PDUs & Message Encapsulation Journey",
        "badge": "MUST-KNOW 9M",
        "ktuRef": "Official Model Paper Q11a // 9 Marks // Protocol Layering & Encapsulation",
        "p1_sub": "Hierarchical Layering & Encapsulation Journey",
        "p1_story": "You awaken as Unit 0xVOID inside the Application Layer. Before your data payload can travel across physical wires, it must descend through the 5-layer TCP/IP protocol hierarchy, acquiring protocol headers at every hop.",
        "p1_theory": """
            <p>The modern Internet architecture is defined by the <strong>TCP/IP 5-Layer Hierarchical Model</strong> (derived from the 7-layer OSI reference model by combining Session, Presentation, and Application layers into a single Application layer):</p>
            <ul>
                <li><strong>5. Application Layer:</strong> Interfaces directly with network applications. PDU: <strong>Message</strong>. Examples: HTTP, DNS, SMTP, FTP, BitTorrent.</li>
                <li><strong>4. Transport Layer:</strong> Provides process-to-process delivery, port multiplexing, and reliability. PDU: <strong>Segment</strong> (TCP) or <strong>Datagram</strong> (UDP).</li>
                <li><strong>3. Network Layer:</strong> Provides host-to-host logical addressing and routing across heterogeneous networks. PDU: <strong>Datagram (Packet)</strong>. Examples: IPv4, IPv6, ICMP, OSPF.</li>
                <li><strong>2. Data Link Layer:</strong> Provides node-to-node framing, physical MAC addressing, and error detection. PDU: <strong>Frame</strong>. Examples: Ethernet (IEEE 802.3), Wi-Fi (802.11), PPP.</li>
                <li><strong>1. Physical Layer:</strong> Transmits raw unstructured binary bit streams across physical transmission media. PDU: <strong>Bit</strong>. Examples: 10Base-T UTP, Optical Fiber, RF signals.</li>
            </ul>
            <p><strong>The Encapsulation Journey:</strong> When sending data, each layer prepends its own header (Message -> Segment -> Packet -> Frame -> Bits). At the receiving host, the reverse process—<strong>Decapsulation</strong>—strips headers layer by layer.</p>
        """,
        "keywords": ["Application Layer", "Transport Layer", "Network Layer", "Data Link Layer", "Physical Layer", "PDU (Protocol Data Unit)", "Encapsulation / Decapsulation", "Header Overhead"],
        "p2_sub": "5-Layer Stack Architecture & Encapsulation Diagram",
        "svg": """<svg viewBox="0 0 760 220" width="100%" height="220" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="220" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
            <g transform="translate(30, 20)">
                <rect x="0" y="0" width="220" height="32" rx="4" fill="#3b82f6"/><text x="110" y="21" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#ffffff">5. Application (Message)</text>
                <rect x="0" y="36" width="220" height="32" rx="4" fill="#2563eb"/><text x="110" y="57" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#ffffff">4. Transport (Segment)</text>
                <rect x="0" y="72" width="220" height="32" rx="4" fill="#1d4ed8"/><text x="110" y="93" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#ffffff">3. Network (Datagram)</text>
                <rect x="0" y="108" width="220" height="32" rx="4" fill="#1e40af"/><text x="110" y="129" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#ffffff">2. Data Link (Frame)</text>
                <rect x="0" y="144" width="220" height="32" rx="4" fill="#1e3a8a"/><text x="110" y="165" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#ffffff">1. Physical (Bits)</text>
            </g>
            <g transform="translate(280, 20)">
                <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">Encapsulation Pipeline (Sender):</text>
                <rect x="200" y="25" width="240" height="24" rx="3" fill="#bfdbfe" stroke="#3b82f6"/><text x="320" y="41" text-anchor="middle" font-family="monospace" font-size="11" font-weight="700" fill="#1e3a8a">Application Data (Payload)</text>
                <rect x="140" y="55" width="60" height="24" rx="3" fill="#93c5fd" stroke="#2563eb"/><text x="170" y="71" text-anchor="middle" font-size="10" font-weight="700" fill="#1e3a8a">TCP Hdr</text>
                <rect x="200" y="55" width="240" height="24" rx="3" fill="#bfdbfe" stroke="#3b82f6"/><text x="320" y="71" text-anchor="middle" font-family="monospace" font-size="11" fill="#1e3a8a">Payload</text>
                <rect x="80" y="85" width="60" height="24" rx="3" fill="#60a5fa" stroke="#1d4ed8"/><text x="110" y="101" text-anchor="middle" font-size="10" font-weight="700" fill="#ffffff">IP Hdr</text>
                <rect x="140" y="85" width="60" height="24" rx="3" fill="#93c5fd"/><text x="170" y="101" text-anchor="middle" font-size="10" fill="#1e3a8a">TCP</text>
                <rect x="200" y="85" width="240" height="24" rx="3" fill="#bfdbfe"/><text x="320" y="101" text-anchor="middle" font-family="monospace" font-size="11" fill="#1e3a8a">Payload</text>
                <rect x="10" y="115" width="70" height="24" rx="3" fill="#3b82f6" stroke="#1e40af"/><text x="45" y="131" text-anchor="middle" font-size="10" font-weight="700" fill="#ffffff">Eth Hdr</text>
                <rect x="80" y="115" width="60" height="24" rx="3" fill="#60a5fa"/><text x="110" y="131" text-anchor="middle" font-size="10" fill="#ffffff">IP</text>
                <rect x="140" y="115" width="60" height="24" rx="3" fill="#93c5fd"/><text x="170" y="131" text-anchor="middle" font-size="10" fill="#1e3a8a">TCP</text>
                <rect x="200" y="115" width="200" height="24" rx="3" fill="#bfdbfe"/><text x="300" y="131" text-anchor="middle" font-family="monospace" font-size="11" fill="#1e3a8a">Payload</text>
                <rect x="400" y="115" width="45" height="24" rx="3" fill="#f87171" stroke="#dc2626"/><text x="422" y="131" text-anchor="middle" font-size="10" font-weight="700" fill="#ffffff">FCS</text>
            </g>
        </svg>""",
        "formulas": """<div class="academic-callout">
            <h4>PDU & Addressing Scheme Matrix</h4>
            <p><strong>Application:</strong> Message | Addressed via URL / Domain / Port</p>
            <p><strong>Transport:</strong> Segment (TCP: 20B min) / Datagram (UDP: 8B) | 16-bit Port Numbers</p>
            <p><strong>Network:</strong> Datagram / Packet (IPv4: 20B min, IPv6: 40B) | 32-bit / 128-bit IP Addresses</p>
            <p><strong>Data Link:</strong> Frame (Ethernet: 14B header + 4B FCS) | 48-bit MAC Address</p>
            <p><strong>Physical:</strong> Bits | Voltage Levels / Light Pulses</p>
        </div>""",
        "examTip": "In KTU exams, always draw the complete encapsulation pipeline showing the 5 layers with their exact PDU names and addressing fields.",
        "p3_sub": "Observe Encapsulated Datagram Telemetry in Game",
        "missionIntro": "Inspect your active datagram structure inside Sector 1:",
        "objectives": [
            "Observe the top status card: UNIT 0xVOID PACKET [IPv4_DATAGRAM].",
            "Notice the TTL (Time-To-Live) and Network Layer indicators.",
            "Move through the grid to observe lower-layer physical conduits carrying your packet!"
        ],
        "actionText": "🎮 Start Mission: Experience Datagram Movement [Space]"
    },

    {
        "id": "m1_dns_hierarchy",
        "number": 2,
        "module": 1,
        "moduleTitle": "MODULE 1: APPLICATION LAYER",
        "title": "DNS Resolution Hierarchy, Record Types & Recursive/Iterative Queries",
        "badge": "MUST-KNOW 9M",
        "ktuRef": "Official Model Paper Q11a / Set 2 Q11a // 9 Marks // DNS Hierarchy & Records",
        "p1_sub": "Distributed Inverted Tree & Query Resolution Flow",
        "p1_story": "Humans remember names like 'titan-core.net', but routers only understand IP addresses like '10.240.0.1'. Unit 0xVOID must query the Domain Name System (DNS) to resolve the destination IP.",
        "p1_theory": """
            <p>DNS is an application-layer service using UDP Port 53 (TCP Port 53 for zone transfers >512 bytes). Because a centralized database would be a single point of failure, DNS uses an <strong>inverted distributed hierarchical tree</strong>:</p>
            <ul>
                <li><strong>Root DNS Servers:</strong> 13 logical authorities replicated across hundreds of physical anycast locations worldwide.</li>
                <li><strong>Top-Level Domain (TLD) Servers:</strong> Responsible for generic domains (<code>.com, .org, .net</code>) and country codes (<code>.in, .uk</code>).</li>
                <li><strong>Authoritative DNS Servers:</strong> Every organization with publicly accessible hosts maintains an authoritative server mapping their own hostnames to IP addresses.</li>
            </ul>
            <p><strong>Resolution Mechanisms:</strong></p>
            <ul>
                <li><strong>Recursive Query:</strong> The querying client places the entire burden of name resolution on the Local DNS Server.</li>
                <li><strong>Iterative Query:</strong> If the server does not know the answer, it replies with a referral to the next server down the hierarchy.</li>
            </ul>
        """,
        "keywords": ["DNS Hierarchy", "Root DNS Servers", "TLD Servers", "Authoritative Server", "Recursive Query", "Iterative Query", "UDP/TCP Port 53", "DNS Records"],
        "p2_sub": "DNS Distributed Resolution Tree & Standard Record Types",
        "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
            <g transform="translate(30, 20)">
                <rect x="80" y="20" width="120" height="28" rx="4" fill="#1e293b" stroke="#0ea5e9"/><text x="140" y="38" text-anchor="middle" font-family="monospace" font-size="11" font-weight="700" fill="#38bdf8">Root '.' [13 IPs]</text>
                <line x1="140" y1="48" x2="80" y2="75" stroke="#94a3b8" stroke-width="1.5"/>
                <line x1="140" y1="48" x2="200" y2="75" stroke="#94a3b8" stroke-width="1.5"/>
                <rect x="20" y="75" width="110" height="26" rx="4" fill="#eff6ff" stroke="#2563eb"/><text x="75" y="92" text-anchor="middle" font-family="monospace" font-size="10.5" font-weight="700" fill="#1e40af">.com / .net TLD</text>
                <rect x="150" y="75" width="110" height="26" rx="4" fill="#eff6ff" stroke="#2563eb"/><text x="205" y="92" text-anchor="middle" font-family="monospace" font-size="10.5" font-weight="700" fill="#1e40af">.edu / .gov TLD</text>
                <line x1="75" y1="101" x2="75" y2="125" stroke="#94a3b8" stroke-width="1.5"/>
                <rect x="15" y="125" width="125" height="26" rx="4" fill="#f0fdf4" stroke="#16a34a"/><text x="77" y="142" text-anchor="middle" font-family="monospace" font-size="10" font-weight="700" fill="#15803d">Authoritative DNS</text>
            </g>
            <g transform="translate(340, 25)">
                <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">Resource Records (RR) Syntax: (Name, Value, Type, TTL)</text>
                <rect x="0" y="25" width="380" height="135" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
                <text x="15" y="48" font-family="monospace" font-size="11" fill="#1e40af"><strong>Type A:</strong>      Host -> IPv4 (e.g. titan.corp -> 10.240.0.1)</text>
                <text x="15" y="68" font-family="monospace" font-size="11" fill="#1e40af"><strong>Type AAAA:</strong>   Host -> IPv6 (128-bit address)</text>
                <text x="15" y="88" font-family="monospace" font-size="11" fill="#1e40af"><strong>Type CNAME:</strong>  Alias -> Canonical Name (www -> server1)</text>
                <text x="15" y="108" font-family="monospace" font-size="11" fill="#1e40af"><strong>Type MX:</strong>     Domain -> Mail Exchange Server host</text>
                <text x="15" y="128" font-family="monospace" font-size="11" fill="#1e40af"><strong>Type NS:</strong>     Domain -> Authoritative Name Server</text>
                <text x="15" y="148" font-family="monospace" font-size="11" fill="#1e40af"><strong>Type PTR:</strong>    IP -> Hostname (Reverse DNS lookup)</text>
            </g>
        </svg>""",
        "formulas": """<div class="academic-callout">
            <h4>DNS-to-HTTP Sequence in University Papers</h4>
            <ol>
                <li>Browser checks cache -> OS resolver checks hosts file.</li>
                <li>Resolver sends recursive DNS query on UDP Port 53 to Local DNS server.</li>
                <li>Local DNS queries Root -> TLD -> Authoritative server iteratively until IP is returned.</li>
                <li>Client initiates TCP 3-Way Handshake on Port 80, then sends HTTP GET request.</li>
            </ol>
        </div>""",
        "examTip": "Do not state DNS only uses UDP! State clearly: 'DNS uses UDP port 53 for standard queries, and TCP port 53 for zone transfers or responses exceeding 512 bytes.'",
        "p3_sub": "Perform Recursive DNS Lookup in Sector 4",
        "missionIntro": "Query the DNS terminal in Sector 4:",
        "objectives": [
            "Ascend to Sector 4 (The Application Nexus).",
            "Locate the DNS Resolution Terminal near the bastion gate.",
            "Execute a recursive query to pinpoint the TITAN-CORE root server!"
        ],
        "actionText": "🎮 Start Mission: Execute DNS Query [Space]"
    },

    {
        "id": "m1_web_http",
        "number": 3,
        "module": 1,
        "moduleTitle": "MODULE 1: APPLICATION LAYER",
        "title": "HTTP/1.1 vs HTTP/2: Persistent Keep-Alive, Pipelining & Binary Multiplexing",
        "badge": "MUST-KNOW 9M",
        "ktuRef": "Set 1 Q11a / Set 3 Q11a // 9 Marks // HTTP Versions & Status Codes",
        "p1_sub": "Evolution of Web Protocols from 1.0 to HTTP/2",
        "p1_story": "At the Web Bastion, Unit 0xVOID initiates web transactions. Early HTTP protocols required a separate TCP handshake for every single image and stylesheet, drowning networks in latency.",
        "p1_theory": """
            <p>HTTP is an application-level stateless protocol on TCP Port 80 (HTTPS on Port 443):</p>
            <ul>
                <li><strong>HTTP/1.0 (Non-Persistent):</strong> Opens a new TCP connection for every single referenced object, incurring a latency overhead of $2 \times RTT$ per object.</li>
                <li><strong>HTTP/1.1 (Persistent Keep-Alive):</strong> Keeps the TCP connection open across requests. Supports pipelining, but suffers from <strong>Head-of-Line (HoL) Blocking</strong> if an early response is delayed.</li>
                <li><strong>HTTP/2 (Binary Framing & Multiplexing):</strong> Interleaves independent streams across a <em>single TCP socket</em>, completely eliminating application-level HoL blocking. Supports server push and HPACK header compression.</li>
            </ul>
        """,
        "keywords": ["HTTP/1.0 Non-Persistent", "HTTP/1.1 Keep-Alive", "Pipelining", "Head-of-Line (HoL) Blocking", "HTTP/2 Binary Framing", "Multiplexing", "HPACK", "Server Push"],
        "p2_sub": "HTTP Response Time Comparison & Stream Multiplexing",
        "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
            <g transform="translate(30, 20)">
                <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">HTTP/1.1 Persistent (Sequential HoL Blocking):</text>
                <rect x="0" y="25" width="320" height="40" rx="4" fill="#fee2e2" stroke="#dc2626"/>
                <text x="160" y="48" text-anchor="middle" font-family="monospace" font-size="10.5" fill="#991b1b">[REQ 1] -> [RESP 1 (Delayed! Blocks REQ 2 & 3)]</text>
            </g>
            <g transform="translate(390, 20)">
                <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">HTTP/2 Multiplexed (Single TCP Connection):</text>
                <rect x="0" y="25" width="340" height="40" rx="4" fill="#dcfce7" stroke="#16a34a"/>
                <text x="170" y="48" text-anchor="middle" font-family="monospace" font-size="10.5" fill="#15803d">[S1: HTML] [S2: CSS] [S3: IMG] Interleaved!</text>
            </g>
            <g transform="translate(30, 95)">
                <rect x="0" y="0" width="700" height="95" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
                <text x="20" y="22" font-family="-apple-system, sans-serif" font-size="11.5" font-weight="700" fill="#0f172a">Essential KTU HTTP Status Codes to Memorize:</text>
                <text x="20" y="42" font-family="monospace" font-size="11" fill="#15803d">• 200 OK: Request succeeded, payload returned</text>
                <text x="20" y="60" font-family="monospace" font-size="11" fill="#2563eb">• 301 Moved Permanently | 304 Not Modified (cached entity valid)</text>
                <text x="20" y="78" font-family="monospace" font-size="11" fill="#dc2626">• 400 Bad Request | 403 Forbidden | 404 Not Found (Client Errors)</text>
                <text x="380" y="78" font-family="monospace" font-size="11" fill="#dc2626">• 500 Internal Server Error | 503 Unavailable (Server)</text>
            </g>
        </svg>""",
        "formulas": """<div class="academic-callout">
            <h4>Formulas for Web Object Retrieval Times</h4>
            <div class="formula-line">$$T_{\\text{non-persistent}} = 2 \\times RTT + \\text{file time} \\quad (\\text{per object})$$</div>
            <div class="formula-line">$$T_{\\text{persistent}} = 2 \\times RTT \\text{ (base)} + 1 \\times RTT \\quad (\\text{for each subsequent object})$$</div>
        </div>""",
        "examTip": "In Part B, always explain that HTTP/2 does NOT change HTTP methods (GET, POST), status codes, or header semantics; it only changes how data is framed and transported across the wire.",
        "p3_sub": "Trigger HTTP/2 Multiplexed Handshake in Bastion",
        "missionIntro": "Infiltrate the Web Bastion terminal in Sector 4:",
        "objectives": [
            "Approach the Web Infiltration Terminal at x: 700 in Sector 4.",
            "Open the console to send HTTP/2 binary multiplexed streams.",
            "Bypass Head-of-Line blocking to retrieve system exploit tokens!"
        ],
        "actionText": "🎮 Start Mission: Execute HTTP/2 Infiltration [Space]"
    },

    {
        "id": "m1_p2p_bittorrent",
        "number": 4,
        "module": 1,
        "moduleTitle": "MODULE 1: APPLICATION LAYER",
        "title": "Client-Server vs P2P Swarms: BitTorrent Rarest-First & Tit-for-Tat",
        "badge": "MUST-KNOW 9M",
        "ktuRef": "Official Model Paper Q11b / Syllabus Mod 1 // 9 Marks // P2P Swarm Algorithms",
        "p1_sub": "Self-Scaling Architectures & Game Theory Algorithms",
        "p1_story": "Unit 0xVOID enters the underground BitTorrent Swarm Resistance Camp. Unlike fragile centralized servers that buckle under load, peer-to-peer swarms grow stronger with every peer that joins.",
        "p1_theory": """
            <p>In Client-Server distribution, server upload bandwidth is a bottleneck ($D_{\\text{cs}} \\ge \\max(\\frac{NF}{u_s}, \\frac{F}{d_{\\min}})$). As $N \\to \\infty$, distribution time grows linearly.</p>
            <p>In P2P BitTorrent, peers upload to each other ($D_{\\text{P2P}} \\ge \\max(\\frac{F}{u_s}, \\frac{F}{d_{\\min}}, \\frac{NF}{u_s + \\sum u_i})$). As peers join, they add upload capacity, making the network <strong>self-scaling</strong>.</p>
            <ul>
                <li><strong>Rarest-First:</strong> Peers request the chunks possessed by the fewest neighbors first, ensuring rare chunks propagate quickly and do not vanish.</li>
                <li><strong>Tit-for-Tat (Choking):</strong> Each peer uploads to the top 4 peers that provide the highest download rates (recalculated every 10s). Freeloaders are choked.</li>
                <li><strong>Optimistic Unchoking:</strong> Every 30s, one random peer is unchoked to discover better partners.</li>
            </ul>
        """,
        "keywords": ["Client-Server Bottleneck", "P2P Swarm", "BitTorrent", "Tracker", "Torrent File", "Rarest-First Strategy", "Tit-for-Tat Algorithm", "Optimistic Unchoking"],
        "p2_sub": "Client-Server vs P2P Distribution Time & Choking State Machine",
        "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
            <g transform="translate(40, 20)">
                <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">Distribution Time vs Number of Clients (N):</text>
                <line x1="30" y1="140" x2="260" y2="140" stroke="#64748b" stroke-width="1.5"/>
                <line x1="30" y1="140" x2="30" y2="30" stroke="#64748b" stroke-width="1.5"/>
                <line x1="30" y1="120" x2="250" y2="35" stroke="#dc2626" stroke-width="2.5"/><text x="210" y="45" font-size="10.5" font-weight="700" fill="#dc2626">Client-Server (Linear)</text>
                <path d="M 30,120 Q 80,105 140,95 T 250,85" fill="none" stroke="#16a34a" stroke-width="2.5"/><text x="210" y="95" font-size="10.5" font-weight="700" fill="#16a34a">P2P (Bounded)</text>
            </g>
            <g transform="translate(340, 20)">
                <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">Tit-for-Tat Peer Coordination:</text>
                <rect x="20" y="30" width="360" height="120" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
                <text x="35" y="55" font-size="11" font-weight="700" fill="#1e40af">• Top 4 Peers: Unchoked based on upload speed (every 10s)</text>
                <text x="35" y="85" font-size="11" font-weight="700" fill="#d97706">• 1 Optimistic Peer: Randomly unchoked every 30s</text>
                <text x="35" y="115" font-size="11" font-weight="700" fill="#15803d">• Rarest-First: Requests least common chunk</text>
            </g>
        </svg>""",
        "formulas": """<div class="academic-callout">
            <h4>Mathematical Proof: P2P vs Client-Server Scalability</h4>
            <div class="formula-line">$$D_{\\text{CS}} \\ge \\max \\left( \\frac{NF}{u_s}, \\frac{F}{d_{\\min}} \\right) \\quad \\text{vs} \\quad D_{\\text{P2P}} \\ge \\max \\left( \\frac{F}{u_s}, \\frac{F}{d_{\\min}}, \\frac{NF}{u_s + \\sum u_i} \\right)$$</div>
            <p>If each peer uploads at average rate $u$, then as $N$ grows large, $\\frac{NF}{u_s + Nu} \\approx \\frac{F}{u}$, which is a constant independent of $N$!</p>
        </div>""",
        "examTip": "Always cite both Rarest-First (piece selection strategy) and Tit-for-Tat (peer selection / bandwidth management) when answering BitTorrent questions.",
        "p3_sub": "Trade File Chunks in the BitTorrent Swarm Camp",
        "missionIntro": "Coordinate with rebel peers in Sector 4:",
        "objectives": [
            "Enter the BitTorrent Resistance Camp in Sector 4.",
            "Interact with rebel peers to inspect their piece availability bitmask.",
            "Apply Rarest-First piece selection and unchoke top seeders to assemble exploit code!"
        ],
        "actionText": "🎮 Start Mission: Trade P2P Swarm Pieces [Space]"
    },

    {
        "id": "m1_email_protocols",
        "number": 5,
        "module": 1,
        "moduleTitle": "MODULE 1: APPLICATION LAYER",
        "title": "Electronic Mail Architecture: User Agent, MTA, MAA, SMTP, POP3 & IMAP",
        "badge": "MUST-KNOW 9M",
        "ktuRef": "Official Model Paper Q11b / Set 4 Q11a // 9 Marks // Email System Architecture",
        "p1_sub": "Push vs Pull Protocols in Internet Mail Architecture",
        "p1_story": "Unit 0xVOID inspects the messaging pipeline. Unlike interactive web protocols, email is a store-and-forward asynchronous system requiring distinct protocols for sending and receiving messages.",
        "p1_theory": """
            <p>The Internet email architecture has three components:</p>
            <ul>
                <li><strong>User Agent (UA):</strong> Client software to compose, view, and organize mail.</li>
                <li><strong>Mail Transfer Agent (MTA):</strong> Relays mail across servers using a <strong>Push Protocol (SMTP - TCP Port 25)</strong>.</li>
                <li><strong>Mail Access Agent (MAA):</strong> Pulls mail from mailbox servers to client UAs using a <strong>Pull Protocol (POP3 - Port 110 or IMAP - Port 143)</strong>.</li>
            </ul>
            <p><strong>POP3 vs IMAP:</strong> POP3 downloads and deletes messages from the server, operating as a single offline folder. IMAP maintains state on the server, synchronizing mail across multiple devices seamlessly.</p>
        """,
        "keywords": ["User Agent (UA)", "MTA (Mail Transfer Agent)", "MAA (Mail Access Agent)", "SMTP (Port 25)", "POP3 (Port 110)", "IMAP (Port 143)", "Push vs Pull", "MIME"],
        "p2_sub": "End-to-End Email Transmission Pipeline & SMTP Handshake",
        "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
            <g transform="translate(20, 25)">
                <rect x="0" y="30" width="90" height="40" rx="4" fill="#eff6ff" stroke="#2563eb"/><text x="45" y="54" text-anchor="middle" font-size="10.5" font-weight="700" fill="#1e40af">Sender UA</text>
                <line x1="90" y1="50" x2="160" y2="50" stroke="#2563eb" stroke-width="2"/><polygon points="155,47 162,50 155,53" fill="#2563eb"/><text x="125" y="42" text-anchor="middle" font-size="9" font-weight="700" fill="#2563eb">SMTP (Push)</text>
                <rect x="165" y="30" width="105" height="40" rx="4" fill="#1e293b" stroke="#0ea5e9"/><text x="217" y="54" text-anchor="middle" font-size="10" font-weight="700" fill="#38bdf8">Sender Server</text>
                <line x1="270" y1="50" x2="420" y2="50" stroke="#2563eb" stroke-width="2"/><polygon points="415,47 422,50 415,53" fill="#2563eb"/><text x="345" y="42" text-anchor="middle" font-size="9" font-weight="700" fill="#2563eb">SMTP / Internet</text>
                <rect x="425" y="30" width="115" height="40" rx="4" fill="#1e293b" stroke="#0ea5e9"/><text x="482" y="54" text-anchor="middle" font-size="10" font-weight="700" fill="#38bdf8">Receiver Server</text>
                <line x1="540" y1="50" x2="620" y2="50" stroke="#16a34a" stroke-width="2"/><polygon points="615,47 622,50 615,53" fill="#16a34a"/><text x="580" y="42" text-anchor="middle" font-size="9" font-weight="700" fill="#16a34a">POP/IMAP</text>
                <rect x="625" y="30" width="95" height="40" rx="4" fill="#f0fdf4" stroke="#16a34a"/><text x="672" y="54" text-anchor="middle" font-size="10.5" font-weight="700" fill="#15803d">Receiver UA</text>
            </g>
            <g transform="translate(20, 105)">
                <rect x="0" y="0" width="720" height="85" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
                <text x="20" y="22" font-family="-apple-system, sans-serif" font-size="11" font-weight="700" fill="#0f172a">Classic SMTP ASCII Handshake Dialog (Port 25):</text>
                <text x="20" y="40" font-family="monospace" font-size="10.5" fill="#2563eb">S: 220 titan.corp Service ready | C: HELO client.net | S: 250 Hello</text>
                <text x="20" y="58" font-family="monospace" font-size="10.5" fill="#2563eb">C: MAIL FROM:&lt;alice@net.org&gt; | S: 250 OK | C: RCPT TO:&lt;bob@corp.com&gt; | S: 250 OK</text>
                <text x="20" y="76" font-family="monospace" font-size="10.5" fill="#15803d">C: DATA | S: 354 Start mail | C: Subject: Exploit\r\n\r\nHello Bob\r\n.\r\n | S: 250 OK | C: QUIT</text>
            </g>
        </svg>""",
        "formulas": """<div class="academic-callout">
            <h4>POP3 vs IMAP Examination Comparison</h4>
            <p><strong>POP3 (Port 110):</strong> Simple, offline mailbox download, deleted from server, single device only.</p>
            <p><strong>IMAP (Port 143):</strong> Server-centric, allows folder creation, message flags, multi-device synchronization.</p>
        </div>""",
        "examTip": "Emphasize that SMTP cannot pull mail from a mailbox server—it is strictly a push protocol. This is why POP3 or IMAP is required for the final hop to the user agent.",
        "p3_sub": "Inspect Store-and-Forward Mail Spools in Game",
        "missionIntro": "Explore message queues inside the Application Layer:",
        "objectives": [
            "Review how store-and-forward buffers prevent packet drops during server downtime.",
            "Observe port filtering rules (Port 25 SMTP vs Port 110/143 POP/IMAP) in firewalls."
        ],
        "actionText": "🎮 Start Mission: Study Email Protocol Architecture [Space]"
    },

    {
        "id": "m1_ftp_dual_port",
        "number": 6,
        "module": 1,
        "moduleTitle": "MODULE 1: APPLICATION LAYER",
        "title": "FTP Protocol: Out-of-Band Dual-Connection (Control Port 21 vs Data Port 20)",
        "badge": "MUST-KNOW 9M",
        "ktuRef": "Official Model Paper Q11a Choice B // 9 Marks // FTP Out-of-Band Architecture",
        "p1_sub": "Out-of-Band Architecture & Active vs Passive Transmission",
        "p1_story": "Unit 0xVOID encounters the legacy File Transfer Protocol (FTP) terminal. Unlike HTTP which multiplexes commands and file data over a single connection, FTP strictly segregates control commands from binary data streams.",
        "p1_theory": """
            <p>The File Transfer Protocol (FTP) operates using <strong>two parallel TCP connections</strong> per session, known as an <strong>Out-of-Band</strong> architecture:</p>
            <ul>
                <li><strong>Control Connection (TCP Port 21):</strong> Opened first by client. Stays open for the entire session. Used strictly for sending user authentication, directory traversal commands (<code>USER, PASS, CWD, LIST, RETR</code>), and 3-digit status replies. Never carries actual file content.</li>
                <li><strong>Data Connection (TCP Port 20 / Ephemeral):</strong> Opened dynamically every time a file transfer or directory listing is requested, and closed immediately after transfer finishes ($1 \\text{ file} = 1 \\text{ data connection}$).</li>
            </ul>
            <p><strong>Active vs Passive Modes:</strong> In Active mode, the server connects back to the client's port from Port 20 (often blocked by client firewalls). In Passive mode (<code>PASV</code>), the server opens a random port $P > 1023$ and the client initiates the connection to $P$.</p>
        """,
        "keywords": ["FTP (File Transfer Protocol)", "Out-of-Band Architecture", "Control Connection (Port 21)", "Data Connection (Port 20)", "Active Mode (PORT)", "Passive Mode (PASV)", "Stateful Protocol"],
        "p2_sub": "FTP Active vs Passive Dual-Socket Architecture",
        "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
            <g transform="translate(50, 25)">
                <rect x="0" y="20" width="150" height="130" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
                <text x="75" y="45" text-anchor="middle" font-size="13" font-weight="700" fill="#1e40af">FTP CLIENT</text>
                <text x="75" y="80" text-anchor="middle" font-size="10" font-weight="600" fill="#334155">Port N (Control)</text>
                <text x="75" y="125" text-anchor="middle" font-size="10" font-weight="600" fill="#334155">Port N+1 (Data)</text>
                <g transform="translate(160, 40)">
                    <line x1="0" y1="35" x2="330" y2="35" stroke="#2563eb" stroke-width="2.5"/><polygon points="325,31 333,35 325,39" fill="#2563eb"/>
                    <text x="165" y="25" text-anchor="middle" font-size="11" font-weight="700" fill="#1e40af">1. Control Connection (TCP Port 21) - Entire Session</text>
                    <line x1="330" y1="80" x2="0" y2="80" stroke="#16a34a" stroke-width="2.5" stroke-dasharray="4"/><polygon points="5,76 -3,80 5,84" fill="#16a34a"/>
                    <text x="165" y="98" text-anchor="middle" font-size="11" font-weight="700" fill="#15803d">2. Data Connection (TCP Port 20) - Per File Only</text>
                </g>
                <rect x="500" y="20" width="150" height="130" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
                <text x="575" y="45" text-anchor="middle" font-size="13" font-weight="700" fill="#15803d">FTP SERVER</text>
                <text x="575" y="80" text-anchor="middle" font-size="10" font-weight="600" fill="#334155">Port 21 (Control)</text>
                <text x="575" y="125" text-anchor="middle" font-size="10" font-weight="600" fill="#334155">Port 20 (Data)</text>
            </g>
            <text x="380" y="195" text-anchor="middle" font-size="11.5" font-weight="700" fill="#0f172a">Out-of-Band: Control commands and user files NEVER share the same TCP socket!</text>
        </svg>""",
        "formulas": """<div class="academic-callout">
            <h4>HTTP vs FTP Architectural Comparison</h4>
            <p><strong>HTTP (In-Band):</strong> Commands and data share port 80/443. Stateless.</p>
            <p><strong>FTP (Out-of-Band):</strong> Separate control (port 21) and data (port 20). Stateful.</p>
        </div>""",
        "examTip": "A guaranteed 9-mark answer: Draw the dual-connection diagram, specify Port 20 vs 21, and explain why Passive Mode (PASV) is necessary for clients behind NAT firewalls.",
        "p3_sub": "Inspect Dual-Port Socket Handshakes in Sector 4",
        "missionIntro": "Navigate the port routing gates inside the Application Layer:",
        "objectives": [
            "Observe how out-of-band channels insulate command signaling from bulk data traffic."
        ],
        "actionText": "🎮 Start Mission: Study Dual-Port FTP Architecture [Space]"
    }
]

print(f"Loaded {len(topics)} topics successfully.")
