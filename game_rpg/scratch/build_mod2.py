# Module 2 Topics (7 - 14)
mod2_topics = [
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
                "theory": """
                    <p>The Transport Layer delivers messages between application processes using 16-bit Port numbers:</p>
                    <ul>
                        <li><strong>UDP (User Datagram Protocol - RFC 768):</strong> Connectionless, unreliable, best-effort. 8-byte fixed header (Source Port, Dest Port, Length, Checksum). No handshakes, no flow control, no congestion control. Ideal for real-time video, VoIP, and DNS queries where low latency beats retransmissions.</li>
                        <li><strong>TCP (Transmission Control Protocol - RFC 793):</strong> Connection-oriented, fully reliable byte-stream. 20-byte minimum header. Manages sequence numbers, cumulative acknowledgments, flow control, and congestion control.</li>
                        <li><strong>Sequence Numbers:</strong> TCP numbers each <em>byte</em> in the stream, not segments! The sequence number in the header is the byte stream offset of the first data byte in that segment.</li>
                        <li><strong>Cumulative ACKs:</strong> An ACK with number $N$ signifies that the receiver has received all contiguous bytes up to $N-1$, and expects byte $N$ next.</li>
                    </ul>
                """,
                "keywords": ["TCP vs UDP", "UDP 8-Byte Header", "TCP 20-Byte Header", "Byte Stream Numbering", "Cumulative ACKs", "Connection-Oriented vs Connectionless", "Transport Layer (Layer 4)"]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "TCP 20-Byte vs UDP 8-Byte Header Layout & ACK Numbering",
                "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
                    <g transform="translate(30, 20)">
                        <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">UDP 8-Byte Header:</text>
                        <rect x="0" y="25" width="320" height="30" rx="3" fill="#dbeafe" stroke="#2563eb"/>
                        <text x="80" y="44" text-anchor="middle" font-size="10" font-weight="700" fill="#1e40af">Src Port (16b)</text>
                        <text x="240" y="44" text-anchor="middle" font-size="10" font-weight="700" fill="#1e40af">Dest Port (16b)</text>
                        <rect x="0" y="58" width="320" height="30" rx="3" fill="#dbeafe" stroke="#2563eb"/>
                        <text x="80" y="77" text-anchor="middle" font-size="10" font-weight="700" fill="#1e40af">Length (16b)</text>
                        <text x="240" y="77" text-anchor="middle" font-size="10" font-weight="700" fill="#1e40af">Checksum (16b)</text>
                    </g>
                    <g transform="translate(380, 20)">
                        <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">Cumulative ACK Tracing Example:</text>
                        <rect x="0" y="25" width="350" height="150" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
                        <text x="15" y="48" font-family="monospace" font-size="11" fill="#1e40af">Sender sends: [Seq = 1000, 500 Bytes data]</text>
                        <text x="15" y="70" font-family="monospace" font-size="11" fill="#15803d">Receiver replies: [ACK = 1500] (Bytes 1000-1499 OK)</text>
                        <text x="15" y="92" font-family="monospace" font-size="11" fill="#1e40af">Sender sends: [Seq = 1500, 300 Bytes data]</text>
                        <text x="15" y="114" font-family="monospace" font-size="11" fill="#dc2626">Packet LOST in transit!</text>
                        <text x="15" y="136" font-family="monospace" font-size="11" fill="#1e40af">Sender sends: [Seq = 1800, 200 Bytes data]</text>
                        <text x="15" y="158" font-family="monospace" font-size="11" fill="#d97706">Receiver replies: [ACK = 1500] (Duplicate ACK!)</text>
                    </g>
                </svg>""",
                "formulas": """<div class="academic-callout">
                    <h4>TCP vs UDP Comparison Scheme</h4>
                    <p><strong>Reliability:</strong> TCP guarantees delivery via ACKs & retransmission. UDP offers zero guarantees.</p>
                    <p><strong>Ordering:</strong> TCP reconstructs byte stream in-order. UDP delivers packets in whatever order they arrive.</p>
                    <p><strong>Overhead:</strong> UDP header is 8 bytes (60% less overhead). TCP header is minimum 20 bytes up to 60 bytes with options.</p>
                </div>""",
                "examTip": "In KTU numericals, if a sender transmits 1000 bytes starting at sequence number 5001, the receiver's acknowledgment number will be 6001 (5001 + 1000).",
                "p3_sub": "Test UDP Speed vs TCP Reliability in Combat",
                "missionIntro": "Fire tactical transport layer packets in Sector 4:",
                "objectives": [
                    "Compare UDP raw datagram bursts with full TCP handshake streams.",
                    "Verify cumulative ACK counter tracking."
                ],
                "actionText": "🎮 Start Mission: Execute Transport Layer Drill [Space]"
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
                "theory": """
                    <p>TCP manages reliable virtual circuits using a 3-phase lifecycle:</p>
                    <ul>
                        <li><strong>1. Connection Establishment (3-Way Handshake):</strong>
                            <ol>
                                <li>Client sends <code>SYN (seq = x, ACK flag = 0)</code>.</li>
                                <li>Server allocates buffers and replies <code>SYN-ACK (seq = y, ack = x + 1, SYN=1, ACK=1)</code>.</li>
                                <li>Client completes connection: <code>ACK (seq = x + 1, ack = y + 1, SYN=0, ACK=1)</code>. Data may be piggybacked in this third packet.</li>
                            </ol>
                        </li>
                        <li><strong>2. Connection Teardown (4-Step Termination):</strong>
                            <ol>
                                <li>Host A sends <code>FIN (seq = u)</code> and enters FIN_WAIT_1.</li>
                                <li>Host B responds <code>ACK (ack = u + 1)</code> and enters CLOSE_WAIT. Host A enters FIN_WAIT_2.</li>
                                <li>Host B finishes sending remaining data, then sends <code>FIN (seq = v)</code> and enters LAST_ACK.</li>
                                <li>Host A replies <code>ACK (ack = v + 1)</code> and enters <strong>TIME_WAIT (2 * MSL)</strong> to ensure final ACK was received.</li>
                            </ol>
                        </li>
                        <li><strong>Stop-and-Wait ARQ:</strong> The simplest flow control scheme: sender transmits 1 frame, starts a timer, and waits for the ACK before transmitting the next. If the timer expires, the frame is retransmitted.</li>
                    </ul>
                """,
                "keywords": ["TCP 3-Way Handshake", "SYN", "SYN-ACK", "ACK", "Connection Teardown (FIN)", "TIME_WAIT (2 MSL)", "Stop-and-Wait ARQ", "ISN (Initial Sequence Number)"]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "TCP 3-Way Handshake & 4-Way Teardown Ladder Diagram",
                "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
                    <g transform="translate(40, 20)">
                        <text x="120" y="15" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a">Connection Setup (3-Way):</text>
                        <line x1="40" y1="30" x2="40" y2="160" stroke="#475569" stroke-width="2"/>
                        <line x1="200" y1="30" x2="200" y2="160" stroke="#475569" stroke-width="2"/>
                        <text x="40" y="25" text-anchor="middle" font-size="11" font-weight="700" fill="#2563eb">Client</text>
                        <text x="200" y="25" text-anchor="middle" font-size="11" font-weight="700" fill="#16a34a">Server</text>
                        <!-- SYN -->
                        <line x1="40" y1="50" x2="200" y2="80" stroke="#2563eb" stroke-width="1.8"/><polygon points="195,76 202,80 195,84" fill="#2563eb"/>
                        <text x="120" y="60" text-anchor="middle" font-family="monospace" font-size="9.5" fill="#1e40af">1. SYN (seq=x)</text>
                        <!-- SYN-ACK -->
                        <line x1="200" y1="90" x2="40" y2="120" stroke="#16a34a" stroke-width="1.8"/><polygon points="45,116 38,120 45,124" fill="#16a34a"/>
                        <text x="120" y="100" text-anchor="middle" font-family="monospace" font-size="9.5" fill="#15803d">2. SYN-ACK (seq=y, ack=x+1)</text>
                        <!-- ACK -->
                        <line x1="40" y1="130" x2="200" y2="155" stroke="#2563eb" stroke-width="1.8"/><polygon points="195,151 202,155 195,159" fill="#2563eb"/>
                        <text x="120" y="138" text-anchor="middle" font-family="monospace" font-size="9.5" fill="#1e40af">3. ACK (ack=y+1)</text>
                    </g>
                    <g transform="translate(420, 20)">
                        <text x="140" y="15" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a">Stop-and-Wait ARQ Efficiency Formula:</text>
                        <rect x="0" y="30" width="280" height="130" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
                        <text x="15" y="55" font-family="monospace" font-size="11" fill="#1e40af">η = T_trans / (T_trans + 2 · T_prop)</text>
                        <text x="15" y="80" font-size="11" fill="#334155">• If propagation delay is high (satellite), efficiency η drops close to 0%!</text>
                        <text x="15" y="115" font-size="11" fill="#334155">• Solution: Sliding Window protocols (Go-Back-N, Selective Repeat) with window W ≥ 2a + 1.</text>
                    </g>
                </svg>""",
                "formulas": """<div class="academic-callout">
                    <h4>Stop-and-Wait Efficiency Formula</h4>
                    <div class="formula-line">$$\\eta = \\frac{1}{1 + 2a} \\quad \\text{where } a = \\frac{T_{\\text{prop}}}{T_{\\text{trans}}} = \\frac{\\text{Distance} / v}{\\text{Frame Size} / B}$$</div>
                    <p><strong>TIME_WAIT Duration:</strong> $2 \\times \\text{MSL}$ (Maximum Segment Lifetime, typically 60 to 120 seconds) to ensure delayed duplicate segments expire in the network.</p>
                </div>""",
                "examTip": "Always state that SYN packets consume 1 sequence number even though they carry 0 bytes of payload data!",
                "p3_sub": "Fire 3-Way Handshake Beam in Sector 4",
                "missionIntro": "Engage defensive guardians in Sector 4:",
                "objectives": [
                    "Press [Left-Click / J] to fire a calibrated 3-Way Handshake beam.",
                    "Neutralize SYN-flood adversary daemons guarding the core."
                ],
                "actionText": "🎮 Start Mission: Execute 3-Way Handshake Attack [Space]"
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
                "theory": """
                    <p>TCP enforces two distinct rate-limiting mechanisms:</p>
                    <ul>
                        <li><strong>Flow Control (End-to-End):</strong> Prevents the sender from overflowing the <em>receiver host's buffer</em>. The receiver advertises its available buffer space in every ACK packet via the <strong>rwnd (Receive Window)</strong> header field. The sender guarantees: $\\text{Bytes in flight} \\le rwnd$.</li>
                        <li><strong>Congestion Control (Network-Wide):</strong> Prevents the sender from overwhelming <em>intermediate network switches and routers</em>. The sender dynamically computes a <strong>cwnd (Congestion Window)</strong> based on perceived packet loss.</li>
                        <li><strong>Effective Window:</strong> $\\mathbf{W_{\\text{effective}} = \\min(rwnd, cwnd)}$.</li>
                        <li><strong>AIMD Algorithm (Additive Increase, Multiplicative Decrease):</strong>
                            <ul>
                                <li><strong>Slow Start:</strong> Starts at $cwnd = 1 \\text{ MSS}$. Doubles every RTT ($1 \\to 2 \\to 4 \\to 8$) until reaching slow start threshold $ssthresh$.</li>
                                <li><strong>Congestion Avoidance:</strong> Increases linearly by $+1 \\text{ MSS}$ per RTT.</li>
                                <li><strong>Loss Event (Triple Duplicate ACK):</strong> Multiplicative decrease: $ssthresh = cwnd / 2$, fast retransmit missing packet, fast recovery sets $cwnd = ssthresh + 3 \\text{ MSS}$.</li>
                            </ul>
                        </li>
                    </ul>
                """,
                "keywords": ["Flow Control (rwnd)", "Congestion Control (cwnd)", "AIMD Algorithm", "Slow Start", "Congestion Avoidance", "Fast Retransmit", "Fast Recovery", "ssthresh"]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Receiver Sliding Window Buffer & AIMD Sawtooth Curve",
                "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
                    <g transform="translate(30, 20)">
                        <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">Receiver Buffer & rwnd (Flow Control):</text>
                        <rect x="0" y="30" width="320" height="40" rx="4" fill="#f1f5f9" stroke="#94a3b8"/>
                        <rect x="0" y="30" width="140" height="40" fill="#fca5a5"/><text x="70" y="55" text-anchor="middle" font-size="10" font-weight="700" fill="#991b1b">Buffered (Unread)</text>
                        <rect x="140" y="30" width="180" height="40" fill="#86efac"/><text x="230" y="55" text-anchor="middle" font-size="10" font-weight="700" fill="#166534">Free Space (rwnd = 180B)</text>
                        <text x="160" y="90" text-anchor="middle" font-size="10.5" font-weight="600" fill="#1e40af">Sender cannot send more than rwnd bytes!</text>
                    </g>
                    <g transform="translate(390, 20)">
                        <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">AIMD cwnd Evolution (Sawtooth Curve):</text>
                        <line x1="30" y1="130" x2="330" y2="130" stroke="#64748b" stroke-width="1.5"/>
                        <line x1="30" y1="130" x2="30" y2="30" stroke="#64748b" stroke-width="1.5"/>
                        <path d="M 30,130 Q 60,125 80,90 L 130,50 L 130,90 L 190,50 L 190,90 L 250,50 L 250,90 L 310,50" fill="none" stroke="#dc2626" stroke-width="2.5"/>
                        <text x="60" y="115" font-size="9" fill="#64748b">Slow Start</text>
                        <text x="140" y="42" font-size="9" font-weight="600" fill="#dc2626">Drop: cwnd/2</text>
                    </g>
                </svg>""",
                "formulas": """<div class="academic-callout">
                    <h4>Flow Control vs Congestion Control Distinction</h4>
                    <p><strong>Flow Control:</strong> Protects the receiver host from buffer exhaustion ($rwnd$).</p>
                    <p><strong>Congestion Control:</strong> Protects intermediate network routers from packet drop collapse ($cwnd$).</p>
                    <div class="formula-line">$$W_{\\text{effective}} = \\min(rwnd, cwnd)$$</div>
                </div>""",
                "examTip": "In Part B descriptive questions, always contrast flow control (end-to-end between 2 hosts) with congestion control (network-wide across shared routers).",
                "p3_sub": "Deploy rwnd Shield to Deflect Buffer Overflow",
                "missionIntro": "Face buffer hitmen in Sector 4:",
                "objectives": [
                    "Press [Right-Click / K] to deploy the rwnd Sliding Window shield.",
                    "Deflect incoming packet floods and absorb buffer shockwaves!"
                ],
                "actionText": "🎮 Start Mission: Test rwnd Shield Defense [Space]"
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
                "theory": """
                    <p>The standard Berkeley Socket programming API coordinates network communication between client and server processes:</p>
                    <ul>
                        <li><strong>TCP Server Function Sequence:</strong>
                            <ol>
                                <li><code>socket()</code>: Creates an endpoint for communication, returning a file descriptor.</li>
                                <li><code>bind()</code>: Binds the socket to a local IP address and port number (<code>struct sockaddr_in</code>).</li>
                                <li><code>listen()</code>: Places socket in passive listening state, specifying connection backlog queue size.</li>
                                <li><code>accept()</code>: Blocks until an incoming connection arrives, then returns a <em>new socket file descriptor</em> dedicated to that client!</li>
                                <li><code>read() / write()</code> (or <code>recv() / send()</code>): Exchanges data over the established stream.</li>
                                <li><code>close()</code>: Tears down the socket connection.</li>
                            </ol>
                        </li>
                        <li><strong>TCP Client Sequence:</strong> <code>socket() -> connect() -> write() -> read() -> close()</code>.</li>
                        <li><strong>I/O Multiplexing (select vs poll):</strong>
                            <ul>
                                <li><strong>select():</strong> Uses fixed-size bitmasks (<code>fd_set</code>) to monitor multiple descriptors for read/write readiness. Limited to <code>FD_SETSIZE</code> (typically 1024). Requires re-initializing the mask before every call because kernel modifies it in-place.</li>
                                <li><strong>poll():</strong> Replaces bitmasks with an array of <code>struct pollfd { int fd; short events; short revents; }</code>. Has <strong>no 1024 descriptor limit</strong> and separates input events from output revents, eliminating the need to re-initialize before each call!</li>
                            </ul>
                        </li>
                    </ul>
                """,
                "keywords": ["socket()", "bind()", "listen()", "accept()", "connect()", "I/O Multiplexing", "select()", "poll()", "FD_SET", "struct pollfd"]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "TCP Socket Call Sequence & select() vs poll() Architecture",
                "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
                    <g transform="translate(30, 20)">
                        <text x="140" y="15" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a">Server-Client Socket Handshake Flow:</text>
                        <!-- Server Column -->
                        <rect x="0" y="30" width="120" height="24" rx="3" fill="#1e293b"/><text x="60" y="46" text-anchor="middle" font-family="monospace" font-size="10" fill="#38bdf8">1. socket()</text>
                        <rect x="0" y="58" width="120" height="24" rx="3" fill="#1e293b"/><text x="60" y="74" text-anchor="middle" font-family="monospace" font-size="10" fill="#38bdf8">2. bind()</text>
                        <rect x="0" y="86" width="120" height="24" rx="3" fill="#1e293b"/><text x="60" y="102" text-anchor="middle" font-family="monospace" font-size="10" fill="#38bdf8">3. listen()</text>
                        <rect x="0" y="114" width="120" height="24" rx="3" fill="#1e40af"/><text x="60" y="130" text-anchor="middle" font-family="monospace" font-size="10" fill="#ffffff">4. accept() [blocks]</text>
                        <!-- Client Column -->
                        <rect x="180" y="30" width="120" height="24" rx="3" fill="#047857"/><text x="240" y="46" text-anchor="middle" font-family="monospace" font-size="10" fill="#ffffff">socket()</text>
                        <rect x="180" y="86" width="120" height="24" rx="3" fill="#047857"/><text x="240" y="102" text-anchor="middle" font-family="monospace" font-size="10" fill="#ffffff">connect()</text>
                        <line x1="180" y1="98" x2="120" y2="126" stroke="#2563eb" stroke-width="2"/><polygon points="124,122 118,126 124,130" fill="#2563eb"/>
                        <text x="150" y="110" font-size="9" fill="#2563eb">SYN</text>
                    </g>
                    <g transform="translate(360, 20)">
                        <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">select() vs poll() Comparison Matrix:</text>
                        <rect x="0" y="30" width="360" height="135" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
                        <text x="15" y="55" font-size="11" font-weight="700" fill="#1e40af">• select():</text>
                        <text x="80" y="55" font-size="10.5" fill="#334155">Fixed FD_SETSIZE limit (1024). O(N) linear scan.</text>
                        <text x="15" y="75" font-size="10.5" fill="#334155">Kernel modifies fd_set; must re-initialize mask every loop.</text>
                        <text x="15" y="105" font-size="11" font-weight="700" fill="#15803d">• poll():</text>
                        <text x="70" y="105" font-size="10.5" fill="#334155">Array of pollfd structs. No 1024 limit!</text>
                        <text x="15" y="125" font-size="10.5" fill="#334155">Separates events (input) and revents (output).</text>
                        <text x="15" y="145" font-size="10.5" fill="#15803d">Does not require re-initialization before each call.</text>
                    </g>
                </svg>""",
                "formulas": """<div class="academic-callout">
                    <h4>pollfd Structure Syntax for KTU Examinations</h4>
                    <pre style="background:#f1f5f9; padding:6px; border-radius:4px; font-size:11px;">
struct pollfd {
    int   fd;       /* file descriptor to monitor */
    short events;   /* requested events (POLLIN, POLLOUT) */
    short revents;  /* returned events from kernel */
};
int poll(struct pollfd *fds, nfds_t nfds, int timeout);</pre>
                </div>""",
                "examTip": "Remember: accept() creates a NEW connected socket descriptor for client communication. The listening socket remains open to accept additional incoming client connections.",
                "p3_sub": "Speak with the Socket Daemon in Sector 4",
                "missionIntro": "Consult the socket daemon NPC in Sector 4:",
                "objectives": [
                    "Locate The Socket Daemon near the core server gateway.",
                    "Review socket file descriptor multiplexing via select() and poll()."
                ],
                "actionText": "🎮 Start Mission: Consult Socket Daemon [Space]"
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
                "theory": """
                    <p>An IPv4 address consists of 32 binary bits divided into four 8-bit octets (e.g., <code>192.168.1.1</code>). Modern networks universally deploy <strong>CIDR (Classless Inter-Domain Routing)</strong> using slash notation (e.g., <code>/24</code>):</p>
                    <ul>
                        <li>The prefix length <code>/n</code> indicates that the first $n$ bits identify the <strong>Network ID</strong>, leaving $32 - n$ bits for <strong>Host IDs</strong>.</li>
                        <li><strong>Network Address:</strong> All host bits set to 0. Identifies the subnet itself.</li>
                        <li><strong>Broadcast Address:</strong> All host bits set to 1. Used to send to every host on that subnet.</li>
                        <li><strong>Usable Hosts Formula:</strong> In a subnet with $h = 32 - n$ host bits, the number of usable assignable IP addresses is strictly <strong>$2^h - 2$</strong> (subtracting Network and Broadcast addresses).</li>
                    </ul>
                """,
                "keywords": ["IPv4 Address (32-bit)", "CIDR Notation (/n)", "Subnet Mask", "Network ID", "Broadcast Address", "Usable Hosts (2^h - 2)"]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Subnetting Calculation Example for 192.168.10.0/26",
                "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
                    <g transform="translate(40, 30)">
                        <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="#0f172a">IPv4 32-Bit Address Division for /26 Subnet Mask:</text>
                        <rect x="0" y="30" width="480" height="40" fill="#dbeafe" stroke="#2563eb" rx="4"/>
                        <text x="240" y="55" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="#1e40af">26 Network Bits (Prefix)</text>
                        <rect x="485" y="30" width="195" height="40" fill="#fef3c7" stroke="#d97706" rx="4"/>
                        <text x="582" y="55" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="#b45309">6 Host Bits</text>
                    </g>
                    <g transform="translate(40, 115)" font-family="-apple-system, sans-serif" font-size="12">
                        <text x="0" y="15" fill="#0f172a" font-weight="600">• Subnet Mask: 255.255.255.192 (11111111.11111111.11111111.11000000)</text>
                        <text x="0" y="35" fill="#0f172a" font-weight="600">• Total Addresses per Subnet: 2⁶ = 64 addresses</text>
                        <text x="0" y="55" fill="#15803d" font-weight="700">• Usable Hosts per Subnet: 2⁶ - 2 = 62 usable host addresses (192.168.10.1 to 192.168.10.62)</text>
                        <text x="0" y="75" fill="#b91c1c" font-weight="600">• Broadcast Address: 192.168.10.63</text>
                    </g>
                </svg>""",
                "formulas": """<div class="academic-callout">
                    <h4>KTU University Exam Derivation</h4>
                    <div class="formula-line">$$\\text{Network ID} = \\text{IP Address} \\text{ AND } \\text{Subnet Mask}$$</div>
                    <p><strong>Example:</strong> Given IP <code>172.16.45.10/20</code>. 20 mask bits $= 255.255.240.0$. Bitwise AND on 3rd octet ($45 \\text{ AND } 240 = 32$) yields Network ID <strong>172.16.32.0</strong>.</p>
                </div>""",
                "examTip": "Never forget to subtract 2 for usable hosts! Writing 2^h instead of 2^h - 2 will cost you 2 marks on KTU Part B papers.",
                "p3_sub": "Verify Subnet Masks to Bypass Security Firewalls",
                "missionIntro": "Navigate the CIDR Subnetting checkpoints in Sector 3:",
                "objectives": [
                    "Approach the Network Layer Firewall in Sector 3.",
                    "Verify the CIDR prefix matching your datagram destination IP.",
                    "Pass through the authenticated subnet gateway to proceed deeper!"
                ],
                "actionText": "🎮 Start Mission: Solve CIDR Subnet Challenge [Space]"
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
                "theory": """
                    <p>Every data link technology imposes a <strong>Maximum Transmission Unit (MTU)</strong> (e.g., standard Ethernet MTU is 1500 bytes). If an IPv4 datagram exceeds the outgoing link MTU, the router splits the payload across multiple fragments:</p>
                    <ul>
                        <li><strong>Identification (16 bits):</strong> Unique sequence number copied into all fragments so the destination knows they belong together.</li>
                        <li><strong>Flags (3 bits):</strong>
                            <ul>
                                <li><code>DF (Don't Fragment)</code>: If set to 1 and packet exceeds MTU, router drops it and sends back an ICMP Destination Unreachable message.</li>
                                <li><code>MF (More Fragments)</code>: Set to 1 for all fragments except the final fragment (which has MF = 0).</li>
                            </ul>
                        </li>
                        <li><strong>Fragment Offset (13 bits):</strong> Measures position of the fragment data relative to original unfragmented datagram. <em>Expressed strictly in units of 8-byte blocks (64 bits)</em>! Therefore, all fragment payload sizes (except the last) MUST be exact multiples of 8!</li>
                    </ul>
                """,
                "keywords": ["MTU (Maximum Transmission Unit)", "IPv4 Fragmentation", "Identification Field", "DF Flag", "MF Flag", "Fragment Offset (8-byte units)"]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "4000-Byte Datagram Fragmented for MTU = 1500 Bytes",
                "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
                    <g transform="translate(30, 20)">
                        <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">Original Datagram: Total = 4000 Bytes (20B IP Header + 3980B Payload)</text>
                        <rect x="0" y="25" width="700" height="28" fill="#e0f2fe" stroke="#0284c7" rx="3"/>
                        <text x="350" y="44" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="11" font-weight="700" fill="#0369a1">Length = 4000, ID = 999, DF = 0, MF = 0, Offset = 0</text>
                    </g>
                    <text x="380" y="80" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="11" font-weight="700" fill="#dc2626">MTU = 1500 (Max Data Payload = 1500 - 20 = 1480 Bytes, Divisible by 8: 1480 / 8 = 185)</text>
                    <g transform="translate(30, 95)" font-family="-apple-system, sans-serif" font-size="11">
                        <rect x="0" y="0" width="220" height="90" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
                        <text x="10" y="22" font-weight="700" fill="#1e40af">FRAGMENT 1</text>
                        <text x="10" y="40" fill="#334155">• Total Length: 1500 (20+1480)</text>
                        <text x="10" y="58" fill="#334155">• MF = 1</text>
                        <text x="10" y="76" font-weight="700" fill="#15803d">• Offset = 0 (0 / 8)</text>
                        <rect x="240" y="0" width="220" height="90" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
                        <text x="250" y="22" font-weight="700" fill="#1e40af">FRAGMENT 2</text>
                        <text x="250" y="40" fill="#334155">• Total Length: 1500 (20+1480)</text>
                        <text x="250" y="58" fill="#334155">• MF = 1</text>
                        <text x="250" y="76" font-weight="700" fill="#15803d">• Offset = 185 (1480 / 8)</text>
                        <rect x="480" y="0" width="220" height="90" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
                        <text x="490" y="22" font-weight="700" fill="#1e40af">FRAGMENT 3 (LAST)</text>
                        <text x="490" y="40" fill="#334155">• Total Length: 1040 (20+1020)</text>
                        <text x="490" y="58" fill="#b91c1c">• MF = 0 (Last!)</text>
                        <text x="490" y="76" font-weight="700" fill="#15803d">• Offset = 370 (2960 / 8)</text>
                    </g>
                </svg>""",
                "formulas": """<div class="academic-callout">
                    <h4>Fragment Offset Derivation Formula</h4>
                    <div class="formula-line">$$\\text{Offset}_k = \\frac{\\sum_{i=1}^{k-1} \\text{Data Length}_i}{8}$$</div>
                    <p>Reassembly occurs ONLY at the final destination host, NOT at intermediate routers!</p>
                </div>""",
                "examTip": "The #1 error on KTU exams is forgetting to divide the byte count by 8 when writing the Fragment Offset field.",
                "p3_sub": "Solve the MTU Fragmentation Minigame in Sector 3",
                "missionIntro": "Fragment an oversized payload at the MTU gateway:",
                "objectives": [
                    "Approach the MTU Gateway Console at x: 480 in Sector 3.",
                    "Press [E] to engage the IPv4 Fragmentation Diagnostic terminal.",
                    "Compute correct Total Length, MF flags, and 8-byte offsets to send the fragments!"
                ],
                "actionText": "🎮 Start Mission: Execute Fragmentation Terminal [Space]"
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
                "theory": """
                    <p>Routing protocols determine the optimal path for packets across complex topologies. They fall into two primary classes:</p>
                    <ul>
                        <li><strong>Link-State (OSPF, IS-IS):</strong> Every router floods Link-State Advertisements (LSAs) so all nodes possess an identical global topology map. Each router independently executes <strong>Dijkstra's Shortest Path First (SPF)</strong> algorithm to find least-cost paths to all destinations. Fast convergence, zero count-to-infinity loops.</li>
                        <li><strong>Distance Vector (RIP):</strong> Routers only share their current distance vector table with direct neighbors (Bellman-Ford equation: $D_x(y) = \\min_v \\{ c(x,v) + D_v(y) \\}$). Prone to slow convergence and the <em>Count-to-Infinity Problem</em> (mitigated via Split Horizon and Poison Reverse).</li>
                    </ul>
                """,
                "keywords": ["Dijkstra's SPF Algorithm", "Link-State Routing", "Distance Vector (Bellman-Ford)", "OSPF", "Count-to-Infinity", "Split Horizon"]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Graph Topology & Dijkstra Shortest Path Tree from Node A",
                "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
                    <g font-family="-apple-system, sans-serif" font-size="13" font-weight="700">
                        <circle cx="80" cy="105" r="22" fill="#2563eb" stroke="#1d4ed8" stroke-width="2"/><text x="80" y="110" text-anchor="middle" fill="#ffffff">A</text>
                        <circle cx="260" cy="45" r="22" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="260" y="50" text-anchor="middle" fill="#1e40af">B</text>
                        <circle cx="260" cy="165" r="22" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="260" y="170" text-anchor="middle" fill="#1e40af">C</text>
                        <circle cx="480" cy="45" r="22" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="480" y="50" text-anchor="middle" fill="#1e40af">D</text>
                        <circle cx="480" cy="165" r="22" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="480" y="170" text-anchor="middle" fill="#1e40af">E</text>
                        <circle cx="660" cy="105" r="22" fill="#16a34a" stroke="#15803d" stroke-width="2"/><text x="660" y="110" text-anchor="middle" fill="#ffffff">Z</text>
                    </g>
                    <line x1="102" y1="95" x2="238" y2="55" stroke="#16a34a" stroke-width="3.5"/><text x="160" y="65" font-weight="700" fill="#16a34a">2</text>
                    <line x1="102" y1="115" x2="238" y2="155" stroke="#94a3b8" stroke-width="1.5"/><text x="160" y="150" font-weight="600" fill="#64748b">5</text>
                    <line x1="282" y1="45" x2="458" y2="45" stroke="#16a34a" stroke-width="3.5"/><text x="370" y="38" font-weight="700" fill="#16a34a">1</text>
                    <line x1="260" y1="67" x2="260" y2="143" stroke="#94a3b8" stroke-width="1.5"/><text x="270" y="110" font-weight="600" fill="#64748b">3</text>
                    <line x1="502" y1="55" x2="638" y2="95" stroke="#16a34a" stroke-width="3.5"/><text x="580" y="65" font-weight="700" fill="#16a34a">2</text>
                    <line x1="502" y1="155" x2="638" y2="115" stroke="#94a3b8" stroke-width="1.5"/><text x="580" y="150" font-weight="600" fill="#64748b">4</text>
                    <text x="380" y="195" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">Optimal Least-Cost Path: A -> B -> D -> Z (Total Cost = 2 + 1 + 2 = 5)</text>
                </svg>""",
                "formulas": """<div class="academic-callout">
                    <h4>Dijkstra Step-by-Step State Table</h4>
                    <p>At each step, add the minimum tentative node $w$ into permanent set $N'$ and relax edges: $D(v) = \\min(D(v), D(w) + c(w,v))$.</p>
                </div>""",
                "examTip": "In KTU exams, always construct the formal step-by-step table showing the permanent set N' growing at each iteration.",
                "p3_sub": "Defeat Boss OSPF Using Dijkstra Shortest Path Rays",
                "missionIntro": "Challenge the central routing guardian of Sector 3:",
                "objectives": [
                    "Approach Boss OSPF at the core junction of Sector 3.",
                    "Open the Dijkstra Routing minigame to calculate the least-cost graph tree.",
                    "Fire Dijkstra Shortest Path rays to unlock Sector 4!"
                ],
                "actionText": "🎮 Start Mission: Execute Dijkstra SPF Calculation [Space]"
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
                "theory": """
                    <p>IPv6 was designed to overcome the structural limits of IPv4:</p>
                    <ul>
                        <li><strong>128-Bit Address Space:</strong> $2^{128} \approx 3.4 \times 10^{38}$ addresses. Written in 8 groups of 4 hexadecimal digits separated by colons (e.g., <code>2001:0db8:85a3::8a2e:0370:7334</code>). Double colon (<code>::</code>) compresses consecutive zeros once.</li>
                        <li><strong>Fixed 40-Byte Base Header:</strong> Eliminates variable-length header processing at routers. Fields: Version (4b), Traffic Class (8b - DiffServ), Flow Label (20b), Payload Length (16b), Next Header (8b), Hop Limit (8b - replaces TTL), Source Address (128b), Destination Address (128b).</li>
                        <li><strong>Flow Label & QoS:</strong> The 20-bit Flow Label field identifies packets belonging to a specific non-default real-time flow (VoIP, video streaming), allowing routers to bypass routing table lookups and provide Quality of Service (QoS).</li>
                        <li><strong>No Router Fragmentation:</strong> Intermediate routers NEVER fragment packets! Source hosts perform Path MTU Discovery (PMTUD).</li>
                    </ul>
                """,
                "keywords": ["IPv6 (128-bit)", "Fixed 40-Byte Header", "Flow Label", "Traffic Class (QoS)", "Next Header (Chaining)", "Hop Limit", "Path MTU Discovery (PMTUD)"]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "IPv6 40-Byte Base Header Structure vs IPv4 Header",
                "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
                    <g transform="translate(30, 20)">
                        <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">IPv6 40-Byte Base Header (Fixed Length):</text>
                        <rect x="0" y="25" width="700" height="28" rx="3" fill="#dbeafe" stroke="#2563eb"/>
                        <text x="50" y="44" text-anchor="middle" font-size="11" font-weight="700" fill="#1e40af">Ver (4b)</text>
                        <text x="140" y="44" text-anchor="middle" font-size="11" font-weight="700" fill="#1e40af">Traffic Class (8b)</text>
                        <text x="400" y="44" text-anchor="middle" font-size="11" font-weight="700" fill="#15803d">Flow Label (20b - Real-Time QoS!)</text>
                        <rect x="0" y="58" width="700" height="28" rx="3" fill="#dbeafe" stroke="#2563eb"/>
                        <text x="150" y="77" text-anchor="middle" font-size="11" font-weight="700" fill="#1e40af">Payload Length (16b)</text>
                        <text x="400" y="77" text-anchor="middle" font-size="11" font-weight="700" fill="#1e40af">Next Header (8b)</text>
                        <text x="600" y="77" text-anchor="middle" font-size="11" font-weight="700" fill="#1e40af">Hop Limit (8b)</text>
                        <rect x="0" y="91" width="700" height="28" rx="3" fill="#e0f2fe" stroke="#0284c7"/>
                        <text x="350" y="110" text-anchor="middle" font-size="11" font-weight="700" fill="#0369a1">Source IPv6 Address (128 Bits / 16 Bytes)</text>
                        <rect x="0" y="124" width="700" height="28" rx="3" fill="#e0f2fe" stroke="#0284c7"/>
                        <text x="350" y="143" text-anchor="middle" font-size="11" font-weight="700" fill="#0369a1">Destination IPv6 Address (128 Bits / 16 Bytes)</text>
                    </g>
                    <text x="380" y="195" text-anchor="middle" font-size="11" font-weight="600" fill="#475569">Key Optimization: No Checksum, No Header Length field, No router fragmentation!</text>
                </svg>""",
                "formulas": """<div class="academic-callout">
                    <h4>IPv4 vs IPv6 Architectural Comparison</h4>
                    <p><strong>Address Length:</strong> 32 bits (4.3B) vs 128 bits ($3.4 \times 10^{38}$).</p>
                    <p><strong>Header:</strong> Variable (20-60B) vs Fixed 40 Bytes.</p>
                    <p><strong>Checksum:</strong> Present in IPv4 (recalculated at every router) -> Completely removed in IPv6 to boost forwarding throughput.</p>
                </div>""",
                "examTip": "In KTU Part B, explain the Next Header field: it points to either a transport layer protocol (TCP=6, UDP=17) OR an extension header (Hop-by-Hop, Routing, Fragment).",
                "p3_sub": "Inspect IPv6 Header Flags in Sector 3",
                "missionIntro": "Explore next-generation packet fields:",
                "objectives": [
                    "Compare IPv4 20-byte headers with IPv6 40-byte fixed structures.",
                    "Verify how Flow Labels enable QoS streaming across backbones."
                ],
                "actionText": "🎮 Start Mission: Study IPv6 Architecture [Space]"
            }
        ]
    }
]
