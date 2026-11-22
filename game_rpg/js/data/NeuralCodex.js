// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// NeuralCodex.js - Structured Knowledge Database & KTU PCCST501 Syllabus Matrix
// Information Architecture & Educational Content Engine
// ==========================================================================

const NeuralCodexDatabase = [
    // ======================================================================
    // MODULE 1: APPLICATION LAYER & WEB PROTOCOLS
    // ======================================================================
    {
        id: 'm1_tcp_ip_stack',
        module: 1,
        category: 'MODULE 1',
        title: 'TCP/IP 5-Layer Stack Architecture',
        examWeight: '3 Marks (Part A Standard Question)',
        ktuMapping: 'Model Paper Q1a, Set 1 Q1a, Set 3 Q1a',
        keywords: ['Application', 'Transport', 'Network', 'Data Link', 'Physical', 'PDU', 'Encapsulation'],
        summary: 'The Internet protocol suite uses a 5-layer hierarchical model. Each layer provides specific communication services to upper layers through well-defined Protocol Data Units (PDUs) and protocol interfaces.',
        diagram: 
`+------------------+-----------------------+-------------------+----------------------------+
| Layer Name       | Primary Function      | PDU Name          | Core Protocols             |
+------------------+-----------------------+-------------------+----------------------------+
| 5. Application   | Network user services | Message           | HTTP, DNS, SMTP, FTP, P2P  |
| 4. Transport     | Process-to-process    | Segment (TCP) /   | TCP (reliable), UDP (fast) |
|                  | delivery & ordering   | Datagram (UDP)    |                            |
| 3. Network       | Host-to-host routing  | Datagram (Packet) | IPv4, IPv6, ICMP, OSPF, RIP|
| 2. Data Link     | Hop-to-hop node frames| Frame             | Ethernet (802.3), ARP, MAC |
| 1. Physical      | Raw bit transmission  | Bit               | 10Base-T, Fiber, Coax, RF  |
+------------------+-----------------------+-------------------+----------------------------+`,
        formulas: [
            'Encapsulation: Message -> [TCP Header + Data] -> [IP Header + Segment] -> [Ethernet Header + Datagram + FCS] -> Bits'
        ],
        commonMistakes: 'Confusing PDU names: calling an IP datagram a "packet segment" or calling an Ethernet frame a "packet".'
    },
    {
        id: 'm1_dns_hierarchy',
        module: 1,
        category: 'MODULE 1',
        title: 'DNS Resolution Hierarchy & Query Types',
        examWeight: '9 Marks (Part B Analytical Problem)',
        ktuMapping: 'Model Paper Q11a, Set 2 Q11a, Set 4 Q11b',
        keywords: ['Root Server', 'TLD Server', 'Authoritative Server', 'Iterative Query', 'Recursive Query', 'DNS Records'],
        summary: 'DNS maps human-readable domain names to 32-bit/128-bit IP addresses using an inverted distributed hierarchical tree. Queries operate via UDP Port 53 (TCP Port 53 for zone transfers >512 bytes).',
        diagram:
`                         [ Root DNS Servers "." ]
                               /         \\
                  [ .com / .corp TLD ]    [ .edu / .gov TLD ]
                            /                     \\
        [ Authoritative Server ]             [ Local DNS Resolver (ISP/Router) ]
                    |                                     ^
         [ IP: 10.240.0.1 ] <-------------------+---------+
                                                |
                                        [ Client Host ]

• Iterative Query: Resolver asks server -> Server replies with Referral address to next tier.
• Recursive Query: Server takes full burden of resolving and returns final IP to client.`,
        formulas: [
            'Record Types:',
            '  • A: Name -> IPv4 Address (e.g., www.titan.corp -> 10.240.0.1)',
            '  • AAAA: Name -> IPv6 Address (128-bit)',
            '  • CNAME: Alias -> Canonical Real Hostname',
            '  • MX: Domain -> Mail Exchange Server host',
            '  • NS: Domain -> Authoritative Name Server',
            '  • PTR: IP -> Domain (Reverse DNS lookup)'
        ],
        commonMistakes: 'Stating DNS only uses UDP. Remember: DNS uses TCP Port 53 for responses exceeding 512 bytes and zone transfers!'
    },
    {
        id: 'm1_web_http',
        module: 1,
        category: 'MODULE 1',
        title: 'HTTP/1.1 vs HTTP/2 & Status Codes',
        examWeight: '3 - 9 Marks (Part A or Part B)',
        ktuMapping: 'Set 1 Q11a, Set 3 Q11a, Set 5 Q11a',
        keywords: ['Persistent Connection', 'Pipelining', 'Binary Framing', 'Multiplexing', 'HPACK', 'Head-of-Line Blocking'],
        summary: 'HTTP (Hypertext Transfer Protocol) is an application-level stateless protocol on TCP Port 80 (HTTPS on Port 443). HTTP/1.1 introduced persistent keep-alive connections and pipelining. HTTP/2 introduced binary framing, full multiplexing over a single TCP stream, and header compression.',
        diagram:
`HTTP/1.1 (Persistent):
Client ===== TCP Handshake =====> Server
Client ===== GET /index.html ===> Server
Client <==== 200 OK (HTML) ====== Server
Client ===== GET /style.css ====> Server  (Reuses same TCP connection!)

HTTP/2 (Binary Framing & Multiplexing):
[Single TCP Socket] === [Stream 1: CSS] [Stream 2: Image] [Stream 3: JS] ===> (No Head-of-Line Blocking!)`,
        formulas: [
            'Non-Persistent HTTP Response Time = 2 * RTT + File_Transmission_Time (per object)',
            'Persistent HTTP Response Time = 2 * RTT (base) + 1 * RTT (for each subsequent object)',
            'Status Codes: 200 (OK), 301 (Moved Permanently), 304 (Not Modified), 400 (Bad Request), 403 (Forbidden), 404 (Not Found), 500 (Internal Error), 503 (Unavailable)'
        ],
        commonMistakes: 'Confusing 301 (Permanent Redirect) with 302 (Found/Temporary) or thinking HTTP/1.0 supported pipelining.'
    },
    {
        id: 'm1_email_protocols',
        module: 1,
        category: 'MODULE 1',
        title: 'Electronic Mail Architecture (SMTP, POP3, IMAP)',
        examWeight: '9 Marks (Part B Comprehensive)',
        ktuMapping: 'Model Paper Q11b, Set 2 Q11b, Set 4 Q11a',
        keywords: ['SMTP', 'POP3', 'IMAP', 'Push vs Pull', 'MTA', 'MAA', 'MIME', 'Port 25', 'Port 110', 'Port 143'],
        summary: 'Email architecture separates message submission/relay from message retrieval. SMTP is a push protocol using 7-bit ASCII on Port 25. POP3 and IMAP are pull protocols for retrieving stored mail onto user agents.',
        diagram:
` [ Alice (UA) ]  --- SMTP (Push:25) ---> [ Alice Mail Server (MTA) ]
                                                   |
                                            SMTP (Push:25)
                                                   v
 [ Bob (UA) ]   <--- POP3 (Pull:110) --- [ Bob Mail Server (Mailbox) ]
                     IMAP (Pull:143)

• SMTP: Push protocol (client pushes to server, server pushes to server).
• POP3: Stateless download-and-delete (or keep); changes do not sync back to server.
• IMAP: Stateful synchronization; folders and flags sync across multiple client devices.
• MIME: Wraps non-ASCII binaries (images, audio) into 7-bit ASCII base64 streams.`,
        formulas: [
            'SMTP = Port 25 (Standard Relay) / Port 587 (Submission)',
            'POP3 = Port 110 (Insecure) / Port 995 (POP3S)',
            'IMAP = Port 143 (Standard) / Port 993 (IMAPS)'
        ],
        commonMistakes: 'Claiming Bob uses SMTP to fetch his emails. SMTP can NEVER be used to pull messages from a mailbox!'
    },
    {
        id: 'm1_ftp_dual_port',
        module: 1,
        category: 'MODULE 1',
        title: 'FTP Dual-Channel Architecture (Port 20 & 21)',
        examWeight: '3 Marks (Part A Standard)',
        ktuMapping: 'Set 2 Q1a, Set 3 Q11b, Set 5 Q1b',
        keywords: ['Port 21', 'Port 20', 'Control Connection', 'Data Connection', 'Out-of-band', 'Active Mode', 'Passive Mode'],
        summary: 'FTP (File Transfer Protocol) uses two separate parallel TCP connections. Control commands travel out-of-band on Port 21, while actual file payloads travel over ephemeral data connections on Port 20.',
        diagram:
` [ FTP Client ] ====== Port 21 (Control: Commands / Responses) ======> [ FTP Server ]
   (User/Pass)         [Stays open throughout the entire session]
 
 [ FTP Client ] <===== Port 20 (Data: Actual File Stream) <========== [ FTP Server ]
                       [Opens per transfer, closes on EOF]

• Active Mode: Client sends PORT cmd; Server connects from Port 20 to Client (blocked by client NAT/firewalls).
• Passive Mode: Client sends PASV; Server replies with random high port; Client initiates data connection.`,
        formulas: [
            'Control Channel: TCP Port 21 (Commands: USER, PASS, RETR, STOR, QUIT)',
            'Data Channel: TCP Port 20 (Active Mode Default) or Ephemeral > 1024 (Passive Mode)'
        ],
        commonMistakes: 'Forgetting that Port 21 remains open during the whole session while Port 20 opens and closes for each file transfer.'
    },
    {
        id: 'm1_p2p_bittorrent',
        module: 1,
        category: 'MODULE 1',
        title: 'P2P File Distribution & BitTorrent Algorithms',
        examWeight: '5 - 9 Marks (Part B Problem / Calculation)',
        ktuMapping: 'Model Paper Q10a, Set 1 Q10a, Set 3 Q10a, Set 5 Q10a',
        keywords: ['P2P Swarm', 'Tracker', 'Torrent File', 'Rarest-First', 'Tit-for-Tat', 'Optimistic Unchoking', 'Self-Scalability'],
        summary: 'In Peer-to-Peer file sharing, client nodes act as both downloaders (leechers) and uploaders (seeders). Files are split into 256 KB pieces. P2P scales because aggregate upload bandwidth increases with each joining peer.',
        diagram:
`Client-Server Distribution:            P2P Decentralized Distribution:
       [ Server ]                                [ Seed ]
        /   |   \\                                 /    \\
     Peer1 Peer2 Peer3                       Peer1 <--> Peer2
(Bottleneck = Server Upload Us)                   \\    /
                                                  Peer3  (Peers assist each other!)`,
        formulas: [
            'Client-Server Minimum Distribution Time: D_cs >= max( N*F / u_s, F / d_min )',
            'P2P Minimum Distribution Time: D_p2p >= max( F / u_s, F / d_min, N*F / (u_s + sum(u_i)) )',
            'Where: N = number of peers, F = file size in bits, u_s = server upload rate, d_min = min peer download rate',
            'Rarest-First: Request the pieces that have the lowest replication count across the swarm first.',
            'Tit-for-Tat: Unchoke top 4 peers that provide the highest data rate to you (evaluated every 10 seconds).',
            'Optimistic Unchoking: Randomly unchoke 1 additional peer every 30 seconds to find better upload partners.'
        ],
        commonMistakes: 'Forgetting the N*F / (u_s + sum(u_i)) term in the P2P distribution time formula.'
    },

    // ======================================================================
    // MODULE 2: TRANSPORT & NETWORK LAYER
    // ======================================================================
    {
        id: 'm2_tcp_vs_udp',
        module: 2,
        category: 'MODULE 2',
        title: 'TCP vs UDP Comprehensive Comparison Matrix',
        examWeight: '3 - 9 Marks (Core Syllabus Pillar)',
        ktuMapping: 'Model Paper Q11b, Set 1 Q2a, Set 4 Q2a',
        keywords: ['TCP', 'UDP', 'Connection-Oriented', 'Connectionless', 'Reliable', 'Checksum', 'Flow Control', 'Congestion Control'],
        summary: 'Transport layer protocols provide logical process-to-process communication. TCP provides a guaranteed, in-order, stream-oriented byte pipeline. UDP provides low-overhead, best-effort datagram delivery.',
        diagram:
`+---------------------+-----------------------------------+-----------------------------------+
| Parameter           | TCP (Transmission Control Protocol)| UDP (User Datagram Protocol)      |
+---------------------+-----------------------------------+-----------------------------------+
| Connection Type     | Connection-oriented (Handshake)   | Connectionless (No handshake)     |
| Reliability         | 100% Reliable (ACK + Retransmit)  | Unreliable Best-Effort (Lossy)    |
| Byte Ordering       | Guaranteed in-order byte stream   | No order guarantees (Datagrams)   |
| Header Size         | 20 to 60 Bytes (Options allowed)  | Fixed 8 Bytes                     |
| Flow Control        | Sliding Window (rwnd field)       | None                              |
| Congestion Control  | Slow Start, AIMD, Fast Recovery   | None (Blasts at wire rate)        |
| Speed / Latency     | Higher latency due to ACK / RTT   | Ultra-low latency, zero setup delay|
| Use Cases           | HTTP, HTTPS, SMTP, FTP, SSH       | DNS, VoIP, Video Streaming, SNMP  |
+---------------------+-----------------------------------+-----------------------------------+`,
        formulas: [
            'UDP Header Fields (8 Bytes Total): Source Port (2B), Dest Port (2B), Length (2B), Checksum (2B)',
            'TCP Header Fields (20B min): Ports (4B), Seq No (4B), Ack No (4B), HLen+Flags (2B), Window (2B), Checksum (2B), Urgent (2B)'
        ],
        commonMistakes: 'Claiming UDP has no checksum. UDP includes an optional (IPv4) or mandatory (IPv6) 16-bit checksum!'
    },
    {
        id: 'm2_tcp_handshake_lifecycle',
        module: 2,
        category: 'MODULE 2',
        title: 'TCP 3-Way Handshake & Connection Teardown',
        examWeight: '9 Marks (Exam Classic)',
        ktuMapping: 'Model Paper Q11a, Set 1 Q11b, Set 2 Q11b, Set 5 Q11b',
        keywords: ['SYN', 'ACK', 'FIN', '3-Way Handshake', 'TIME_WAIT', '2MSL', 'ISN', 'Sequence Consumption'],
        summary: 'TCP establishes reliable bi-directional sessions through synchronizing sequence numbers (ISN). The 3-way handshake prevents old duplicate connection requests from causing false half-open connections.',
        diagram:
`TCP 3-Way Connection Setup:
   Client (Active Open)                                 Server (Passive Listen)
      |                                                            |
      | -------- 1. SYN: Seq = x (Flags: SYN=1) -----------------> |  (SYN received)
      |                                                            |
      | <------- 2. SYN+ACK: Seq = y, Ack = x + 1 (SYN=1,ACK=1) -- |  (SYN sent)
      |                                                            |
      | -------- 3. ACK: Seq = x + 1, Ack = y + 1 (ACK=1) -------> |  (ESTABLISHED)
      v                                                            v

TCP 4-Way Connection Teardown:
   Client (Active Close)                                Server
      | -------- 1. FIN: Seq = u --------------------------------> |  (Close Wait)
      | <------- 2. ACK: Ack = u + 1 ----------------------------- |
      | <------- 3. FIN: Seq = v --------------------------------- |  (Last ACK)
      | -------- 4. ACK: Ack = v + 1 ----------------------------> |  (CLOSED)
   [TIME_WAIT: 2 * MSL] -> CLOSED`,
        formulas: [
            'Why SYN consumes 1 Sequence Number: Even though SYN carries 0 payload bytes, it consumes 1 sequence number so that the receiver can explicitly acknowledge receipt with ACK = x + 1.',
            'TIME_WAIT Duration: 2 * MSL (Maximum Segment Lifetime, typically 60 - 120 seconds) to guarantee the final ACK reached the server and flush lingering duplicates from the network.'
        ],
        commonMistakes: 'Forgetting to increment the ACK number by 1 during handshake steps when payload length is 0.'
    },
    {
        id: 'm2_tcp_seq_ack_numerical',
        module: 2,
        category: 'MODULE 2',
        title: 'TCP Sequence & Cumulative ACK Numerical Tracing',
        examWeight: '9 Marks (Guaranteed Numerical Problem)',
        ktuMapping: 'Model Paper Q11a, Set 1 Q11b, Set 3 Q11b, Set 4 Q11b',
        keywords: ['Sequence Number', 'Payload Length', 'Byte Offset', 'Cumulative ACK', 'Out-of-Order', 'Retransmission'],
        summary: 'TCP tracks stream bytes, NOT packet indices. Sequence number represents the first data byte in the segment. Cumulative ACK announces the next contiguous byte the receiver expects to receive.',
        diagram:
`Example Numerical Problem (From KTU Model Paper & Set 1):
Segment 1: Start Byte = 1000, Length = 200 Bytes  --> Byte Range: [1000 .. 1199]
Segment 2: Start Byte = 1200, Length = 200 Bytes  --> Byte Range: [1200 .. 1399]
Segment 3: Start Byte = 1400, Length = 150 Bytes  --> Byte Range: [1400 .. 1549]

Normal Case: All 3 Segments Arrive In-Order:
• Seg 1 Arrives -> Next Expected Byte = 1200
• Seg 2 Arrives -> Next Expected Byte = 1400
• Seg 3 Arrives -> Final Cumulative ACK = 1550 (All bytes up to 1549 received!)

Fault Case: Segment 2 is LOST in Transit:
• Seg 1 Arrives -> ACK = 1200 sent.
• Seg 2 is LOST.
• Seg 3 Arrives Out-of-Order -> Receiver buffers 1400..1549, BUT MUST SEND ACK = 1200!
  (Cumulative ACK CANNOT advance past missing byte 1200!)`,
        formulas: [
            'End Byte Formula: End_Byte = Start_Byte + Length - 1',
            'Next Expected ACK Formula: Next_ACK = End_Byte + 1 = Start_Byte + Length',
            'Cumulative ACK Principle: ACK = k affirms that all bytes from 0 through k - 1 have been successfully received without gaps.'
        ],
        commonMistakes: 'Writing End Byte = Start Byte + Length. (If 1000 has length 200, the bytes are 1000 to 1199, NOT 1200!).'
    },
    {
        id: 'm2_dijkstra_link_state',
        module: 2,
        category: 'MODULE 2',
        title: 'Dijkstra Link-State Least-Cost Routing Algorithm',
        examWeight: '6 - 9 Marks (Algorithm Tracing Table)',
        ktuMapping: 'Model Paper Q12a, Set 1 Q12b, Set 2 Q12a, Set 4 Q12b',
        keywords: ['Link-State', 'OSPF', 'Dijkstra', 'Permanent Set N\'', 'Tentative Cost D(v)', 'Forwarding Table'],
        summary: 'Dijkstra\'s algorithm calculates the shortest path from a source router to all destination nodes using global link-state advertisements (LSAs). Iteratively expands the permanent set N\' by picking the node with the minimum tentative cost.',
        diagram:
`5-Node Topology (KTU Model Paper Q12a):
     (A) ---- 2 ---- (B) ---- 3 ---- (C)
      |                \\              |
      5                 1             2
      |                  \\            |
     (D) -------------- 1 ---------- (E)

Execution Steps for Source Router A:
Step | N'        | D(B),p(B) | D(C),p(C) | D(D),p(D) | D(E),p(E)
-----+-----------+-----------+-----------+-----------+----------
0    | {A}       | 2, A      | Infinity  | 5, A      | Infinity
1    | {A, B}    | 2, A      | 5, B      | 5, A      | 3, B     <-- Pick E (cost 3)
2    | {A, B, E} | 2, A      | 5, B      | 4, E      | 3, B     <-- Pick D (cost 4 via E)
3    | {A, B, E, D}| 2, A    | 5, B      | 4, E      | 3, B     <-- Pick C (cost 5)
4    | All Nodes | Complete! Forwarding Table for A: (B->B), (C->B), (D->B), (E->B)`,
        formulas: [
            'Cost Relaxation Equation: D(v) = min( D(v), D(w) + c(w, v) )',
            'Where w is the newly added node to N\', and c(w, v) is the direct link cost.'
        ],
        commonMistakes: 'Forgetting to update the predecessor p(v) when a cheaper path is discovered during relaxation.'
    },
    {
        id: 'm2_ipv4_cidr_fragmentation',
        module: 2,
        category: 'MODULE 2',
        title: 'IPv4 CIDR Subnetting & MTU Fragmentation',
        examWeight: '9 Marks (Numerical Calculation)',
        ktuMapping: 'Model Paper Q12b, Set 1 Q12a, Set 3 Q12a, Set 5 Q12b',
        keywords: ['CIDR /n', 'Subnet Mask', 'Broadcast Address', 'MTU', 'Fragment Offset', 'MF Flag', 'DF Flag'],
        summary: 'CIDR replaces classful addressing with prefix notation `/n`. When a datagram exceeds a router interface\'s Maximum Transmission Unit (MTU), it must split into fragments aligned to 8-byte boundaries.',
        diagram:
`MTU Fragmentation Example: 4000-Byte Datagram into MTU = 1500 Link:
Original: Total Length = 4000B (20B IP Header + 3980B Payload). MTU = 1500B (20B Header + 1480B Data max).
Note: 1480 is divisible by 8 (1480 / 8 = 185).

Fragment 1:
• Header = 20B, Data = 1480B (Bytes 0 .. 1479) -> Total Length = 1500B
• More Fragments (MF) = 1, Fragment Offset = 0 / 8 = 0

Fragment 2:
• Header = 20B, Data = 1480B (Bytes 1480 .. 2959) -> Total Length = 1500B
• More Fragments (MF) = 1, Fragment Offset = 1480 / 8 = 185

Fragment 3:
• Header = 20B, Data = 1020B (Bytes 2960 .. 3979) -> Total Length = 1040B
• More Fragments (MF) = 0, Fragment Offset = 2960 / 8 = 370`,
        formulas: [
            'Usable Host Count Formula: Hosts = 2^(32 - n) - 2',
            'Fragment Offset Formula: Offset = (Starting Data Byte Offset in original datagram) / 8',
            'Max Data Payload per Fragment: MaxData = floor((MTU - 20) / 8) * 8'
        ],
        commonMistakes: 'Dividing Total Length by 8 instead of data payload, or forgetting that the fragment offset must be a whole multiple of 8.'
    },
    {
        id: 'm2_ipv6_architecture',
        module: 2,
        category: 'MODULE 2',
        title: 'IPv6 Header Format & Enhancements',
        examWeight: '3 - 5 Marks (Part A / B Theory)',
        ktuMapping: 'Set 2 Q2b, Set 3 Q2a, Set 5 Q2b',
        keywords: ['128-bit', 'Fixed 40-Byte Header', 'Next Header', 'Hop Limit', 'Flow Label', 'No Broadcast', 'IPsec'],
        summary: 'IPv6 expands address space from 32 bits ($4.3 \\times 10^9$) to 128 bits ($3.4 \\times 10^{38}$). It streamlines routing with a fixed 40-byte base header and moves optional fields into daisy-chained extension headers.',
        diagram:
`IPv6 40-Byte Fixed Base Header:
+---------------+---------------+-------------------------------+
| Version (4b)  | Traffic Class | Flow Label (20 bits)          |
+---------------+---------------+---------------+---------------+
| Payload Length (16 bits)      | Next Header   | Hop Limit(8b) |
+-------------------------------+---------------+---------------+
| Source IP Address (128 bits / 16 Bytes)                       |
+---------------------------------------------------------------+
| Destination IP Address (128 bits / 16 Bytes)                  |
+---------------------------------------------------------------+

Key Enhancements over IPv4:
1. Massive Address Space: Eliminates the need for NAT.
2. Simplified Header: Fixed 40 bytes; checksum removed to accelerate router forwarding.
3. No Router Fragmentation: Path MTU Discovery enforced; only endpoints fragment.
4. Broadcast Eliminated: Replaced by efficient Multicast and Anycast.`,
        formulas: [
            'Address Representation: 8 groups of 4 hexadecimal digits, e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334',
            'Zero Compression: Consecutive blocks of zeros compressed with "::" once per address: 2001:db8:85a3::8a2e:370:7334'
        ],
        commonMistakes: 'Using "::" twice in a single IPv6 address (it causes ambiguity in zero reconstruction and is illegal).'
    },
    {
        id: 'm2_sockets_io_multiplexing',
        module: 2,
        category: 'MODULE 2',
        title: 'Berkeley Sockets & I/O Multiplexing (select vs poll)',
        examWeight: '9 Marks (Part B Programming Concept)',
        ktuMapping: 'Set 2 Q13b, Set 4 Q14a, Set 5 Q14b',
        keywords: ['socket()', 'bind()', 'listen()', 'accept()', 'select()', 'poll()', 'fd_set', 'FD_SETSIZE', 'PF_PACKET'],
        summary: 'The POSIX Berkeley Socket API is the universal abstraction for network programming. I/O multiplexing allows a single thread to monitor multiple file descriptors without blocking.',
        diagram:
`TCP Server Socket Lifecycle:
[ socket() ]  --> Creates socket endpoint descriptor
     |
[ bind() ]    --> Binds socket to local IP address & Port
     |
[ listen() ]  --> Sets socket to passive mode with backlog queue
     |
[ accept() ]  --> Blocks until 3-way handshake completes; returns NEW connected client fd!
     |
[ read/write ]--> Full duplex byte stream communication
     |
[ close() ]   --> Sends FIN to terminate TCP connection

I/O Multiplexing Comparison:
• select(): Uses fd_set bitmask. Hard limit of FD_SETSIZE (1024). Requires O(N) scan.
• poll(): Uses dynamic array of struct pollfd. No descriptor limit. Still O(N) scan.
• epoll(): Linux event-driven O(1) notification. Ideal for high-concurrency servers.`,
        formulas: [
            'select() prototype: int select(int nfds, fd_set *readfds, fd_set *writefds, fd_set *exceptfds, struct timeval *timeout);',
            'Modern Packet Socket: socket(PF_PACKET, SOCK_RAW, htons(ETH_P_ALL)) binds to link-layer interface using sockaddr_ll.'
        ],
        commonMistakes: 'Thinking accept() uses the listening socket for data transfer. It returns a brand new descriptor dedicated to that client!'
    },
    {
        id: 'm2_mobile_ip',
        module: 2,
        category: 'MODULE 2',
        title: 'Mobile IP Architecture & Encapsulation',
        examWeight: '3 - 5 Marks (Part A / B Theory)',
        ktuMapping: 'Set 1 Q2b, Set 3 Q2b, Set 4 Q12a',
        keywords: ['Home Agent (HA)', 'Foreign Agent (FA)', 'Home Address', 'Care-of Address (COA)', 'Tunneling', 'Triangle Routing'],
        summary: 'Mobile IP (RFC 5944) enables a mobile node to retain its permanent Home Address while roaming across different network subnets by tunneling packets through temporary Care-of Addresses.',
        diagram:
` [ Correspondent Node ] ---------------> [ Home Agent (HA) ]  (Home Subnet)
           ^                                     |
           |                                     | IP-in-IP Tunnel
           |                                     v
   Direct Return Link                   [ Foreign Agent (FA) ] (Foreign Subnet)
   (or Triangle Route)                           |
           |                                     v
           +----------------------------- [ Mobile Node (MN) ]

1. Registration: MN gets COA from FA, registers COA back with Home Agent (HA).
2. Interception: HA uses Proxy ARP to intercept packets sent to MN's Home Address.
3. Tunneling: HA encapsulates original datagram into outer IP datagram (Dest = COA).
4. Decapsulation: FA strips outer header and delivers original datagram to MN.`,
        formulas: [
            'Triangle Routing: Correspondent -> Home Agent -> Foreign Agent -> Mobile Node -> Correspondent',
            'Route Optimization Solution: Correspondent caches MN\'s COA and tunnels directly, bypassing HA.'
        ],
        commonMistakes: 'Assuming the mobile node changes its Home Address when moving. The Home Address is ALWAYS permanent!'
    },

    // ======================================================================
    // MODULE 3: DATA LINK LAYER & MAC PROTOCOLS
    // ======================================================================
    {
        id: 'm3_framing_stuffing',
        module: 3,
        category: 'MODULE 3',
        title: 'Framing: Character/Byte Stuffing vs Bit Stuffing',
        examWeight: '3 - 9 Marks (Part A / B Practical)',
        ktuMapping: 'Model Paper Q3a, Set 1 Q3a, Set 3 Q13b, Set 4 Q3a',
        keywords: ['Framing', 'Flag Byte', 'Byte Stuffing', 'ESC', 'Bit Stuffing', '01111110', 'Five Consecutive 1s'],
        summary: 'Framing delimits bitstreams into identifiable frames. To ensure data patterns identical to delimiter flags do not prematurely terminate frames, the sender injects escape characters or stuffed zero-bits.',
        diagram:
`Bit Stuffing Rule (Delimiter Flag = 01111110):
Sender Rule: Whenever five consecutive '1's appear in data, insert a '0' immediately after!
Receiver Rule: Whenever five consecutive '1's are followed by '0', strip the '0'!

Example (KTU Exam Standard):
Original Data:      0 1 1 1 1 1 1 0 1 1 1 1 1 0
Sender Stuffs:      0 1 1 1 1 1 [0] 1 0 1 1 1 1 1 [0] 0
Transmitted:        01111110 [Stuffed Data] 01111110

Byte Stuffing (Character-Oriented):
FLAG byte = 0x7E, ESC byte = 0x7D.
If data contains FLAG or ESC, prefix it with ESC:  "DATA FLAG" -> "DATA ESC FLAG"`,
        formulas: [
            'Sender Bit Stuffing: 11111 -> 111110 (always insert 0 after five 1s)',
            'Receiver Delimiter Recognition: 01111110 = Frame Flag; 01111111 = Abort Signal'
        ],
        commonMistakes: 'Inserting a 0 after six 1s instead of five 1s. Six 1s IS the flag delimiter (01111110)!'
    },
    {
        id: 'm3_crc_modulo2',
        module: 3,
        category: 'MODULE 3',
        title: 'CRC (Cyclic Redundancy Check) Modulo-2 Division',
        examWeight: '6 - 9 Marks (Guaranteed Exam Problem)',
        ktuMapping: 'Model Paper Q13a, Set 1 Q13a, Set 2 Q13a, Set 5 Q13a',
        keywords: ['CRC', 'Modulo-2 Arithmetic', 'XOR Division', 'Generator Polynomial g(x)', 'FCS Remainder', 'Codeword'],
        summary: 'CRC is a polynomial division error detection technique. Modulo-2 arithmetic uses XOR operations without carries or borrows. Appending k zeros to n-bit data and dividing by a (k+1)-bit generator yields a k-bit Frame Check Sequence (FCS).',
        diagram:
`KTU Model Paper Q13a Solved Step-by-Step:
Data: 100100 (6 bits, n=6)
Generator: g(x) = x^3 + x^2 + 1  --> Divisor = 1101 (Degree k=3)
Step 1: Append k=3 zeros to data: 100100 000

        1 1 1 1 0 1  (Quotient)
1101 ) 1 0 0 1 0 0 0 0 0
       1 1 0 1
       -------
       0 1 0 0 0
         1 1 0 1
         -------
         0 1 0 1 0
           1 1 0 1
           -------
           0 1 1 1 0
             1 1 0 1
             -------
             0 0 1 1 0
                 0 0 0 0
                 -------
                 0 1 1 0 0
                   1 1 0 1
                   -------
                   0 0 0 1  --> Remainder (FCS) = 001

Transmitted Codeword = Data + Remainder = 100100001
Receiver Verification: Divide 100100001 by 1101 -> Remainder is 000 (No error!)`,
        formulas: [
            'Divisor Bit Pattern: g(x) = x^3 + x^2 + 1 -> 1*x^3 + 1*x^2 + 0*x^1 + 1*x^0 = 1101',
            'Transmitted Codeword Length = Data_Length (n) + Generator_Degree (k)',
            'XOR Rules: 0 XOR 0 = 0, 1 XOR 1 = 0, 0 XOR 1 = 1, 1 XOR 0 = 1'
        ],
        commonMistakes: 'Appending k+1 zeros instead of k zeros. Degree is the highest power (x^3 means append 3 zeros, NOT 4).'
    },
    {
        id: 'm3_aloha_csma_cd',
        module: 3,
        category: 'MODULE 3',
        title: 'Random Access: ALOHA & CSMA/CD Minimum Frame Size',
        examWeight: '6 - 9 Marks (Formulas & Numerical)',
        ktuMapping: 'Model Paper Q13b, Set 1 Q13b, Set 3 Q13a, Set 4 Q13b',
        keywords: ['Pure ALOHA', 'Slotted ALOHA', 'CSMA/CD', 'Collision Detection', 'Vulnerable Time', 'Min Frame Size', '64 Bytes'],
        summary: 'Media Access Control (MAC) manages access to shared broadcast channels. CSMA/CD listens before transmitting, detects collisions during transmission, and aborts with exponential backoff.',
        diagram:
`ALOHA vs CSMA/CD Vulnerable Windows:
• Pure ALOHA: Vulnerable Time = 2 * T_fr  --> Max Throughput S = 1 / (2e) = 18.4% at G = 0.5
• Slotted ALOHA: Vulnerable Time = T_fr   --> Max Throughput S = 1 / e   = 36.8% at G = 1.0

CSMA/CD Collision Detection Constraint:
A transmitting station MUST continue transmitting until the signal propagates to the far end
and any collision propagates back!
Hence: Frame Transmission Time (T_fr) >= 2 * Propagation Delay (T_p)

       +---------------------------------------------+
       |   T_fr >= 2 * T_p   =>   Min Frame = 2 * T_p * Bandwidth |
       +---------------------------------------------+

For Standard 10 Mbps Ethernet (Max Distance 2500m with repeaters, 2*T_p = 51.2 microseconds):
Min Frame = 51.2 us * 10 Mbps = 512 bits = 64 Bytes!`,
        formulas: [
            'Pure ALOHA Throughput: S = G * e^(-2G)',
            'Slotted ALOHA Throughput: S = G * e^(-G)',
            'Propagation Delay: T_p = Distance / Propagation_Velocity',
            'Minimum Frame Size: L_min = 2 * (Distance / v) * Bandwidth',
            'Binary Exponential Backoff: Wait time = k * Slot_Time, where k in [0 .. 2^n - 1]'
        ],
        commonMistakes: 'Forgetting the factor of 2 in T_fr >= 2 * T_p. (Collision must travel both ways: forward and back!).'
    },
    {
        id: 'm3_ethernet_switch_learning',
        module: 3,
        category: 'MODULE 3',
        title: 'Standard Ethernet Frame & Transparent Switch Learning',
        examWeight: '9 Marks (Part B Comprehensive)',
        ktuMapping: 'Model Paper Q13a, Set 2 Q13b, Set 4 Q13a, Set 5 Q13b',
        keywords: ['10Base5', '10Base2', '10Base-T', '10Base-F', 'MAC Learning', 'Filtering', 'Forwarding', 'Flooding', 'Hub vs Switch'],
        summary: 'Transparent bridges/switches dynamically populate their forwarding tables by inspecting source MAC addresses of incoming frames, eliminating manual configuration.',
        diagram:
`Standard IEEE 802.3 Ethernet Frame (Total Min 64B, Max 1518B):
+-----------+-----+-------------+-------------+-----------+----------------+---------+
| Preamble  | SFD | Dest MAC    | Source MAC  | Type/Len  | Data & Pad     | FCS/CRC |
| 7 Bytes   | 1 B | 6 Bytes     | 6 Bytes     | 2 Bytes   | 46 - 1500 B    | 4 Bytes |
+-----------+-----+-------------+-------------+-----------+----------------+---------+

Switch Transparent Learning Rules:
1. Learning: Add entry [Source MAC -> Ingress Port] to table with aging timer.
2. Filtering: If Dest MAC is known and on the SAME port as ingress, DROP frame.
3. Forwarding: If Dest MAC is known on a DIFFERENT port, send ONLY to that port.
4. Flooding: If Dest MAC is unknown or broadcast (FF:FF:FF:FF:FF:FF), flood to ALL other ports.

Network Devices Matrix:
• Hub (Layer 1): 1 Collision Domain, 1 Broadcast Domain (Electrical repeater).
• Switch (Layer 2): N Collision Domains (1 per port), 1 Broadcast Domain (MAC learning).
• Router (Layer 3): N Collision Domains, N Broadcast Domains (IP routing).`,
        formulas: [
            '10Base5: 10 Mbps, Baseband, 500m max, Thick Coaxial, Vampire Taps, 50-ohm terminators',
            '10Base2: 10 Mbps, Baseband, 185m max, Thin Coaxial, BNC-T connectors',
            '10Base-T: 10 Mbps, Baseband, 100m max, Twisted Pair (UTP Cat 3/5), RJ-45 Star',
            '10Base-F: 10 Mbps, Baseband, 2000m max, Dual Fiber Optic Cable'
        ],
        commonMistakes: 'Confusing collision domains with broadcast domains. Switches break collision domains, but share a single broadcast domain.'
    },
    {
        id: 'm3_arp_resolution',
        module: 3,
        category: 'MODULE 3',
        title: 'Address Resolution Protocol (ARP) & Cache Poisoning',
        examWeight: '3 - 5 Marks (Part A / B Theory)',
        ktuMapping: 'Model Paper Q3b, Set 2 Q3a, Set 4 Q3b',
        keywords: ['ARP', 'Broadcast Request', 'Unicast Reply', 'ARP Cache', 'Gratuitous ARP', 'Poisoning', 'DAI'],
        summary: 'ARP bridges the gap between Layer 3 logical IP addresses and Layer 2 physical 48-bit MAC addresses within a broadcast domain.',
        diagram:
`ARP Infiltration & Resolution Journey:
Host A (192.168.1.10) wants to send a packet to Host B (192.168.1.20):

1. ARP Request (Broadcast):
   Host A ---- "Who has 192.168.1.20? Tell 192.168.1.10" ----> All Hosts (FF:FF:FF:FF:FF:FF)
   (Every host processes frame; non-matching hosts drop it silently).

2. ARP Reply (Unicast):
   Host B <--- Match! ---> Host B replies: "192.168.1.20 is at 00:1A:2B:3C:4D:5E" ---> Host A

3. Cache: Both nodes record mapping in their ARP cache table (20-minute default TTL).

• ARP Cache Poisoning (Spoofing): Attacker sends fake gratuitous ARP replies to poison gateway MAC.
• Defense: Dynamic ARP Inspection (DAI) on switches validates ARP against DHCP snooping database.`,
        formulas: [
            'Broadcast MAC Address: FF:FF:FF:FF:FF:FF',
            'ARP Packet Format: Hardware Type (2B), Protocol Type (2B), HW Size (1B), Proto Size (1B), Opcode (2B: 1=Req, 2=Reply), Sender HW Addr (6B), Sender IP (4B), Target HW Addr (6B), Target IP (4B)'
        ],
        commonMistakes: 'Thinking ARP requests are routed across routers. ARP is strictly a local data-link broadcast protocol!'
    },

    // ======================================================================
    // MODULE 4: SNMP & PHYSICAL LAYER
    // ======================================================================
    {
        id: 'm4_snmp_architecture',
        module: 4,
        category: 'MODULE 4',
        title: 'SNMP Architecture, MIB OID Tree & PDUs',
        examWeight: '9 Marks (Guaranteed Part B Question)',
        ktuMapping: 'Model Paper Q14a, Set 1 Q14a, Set 2 Q14a, Set 5 Q14a',
        keywords: ['SNMP Manager', 'SNMP Agent', 'MIB-2', 'SMI', 'OID 1.3.6.1.2.1', 'Port 161', 'Port 162', 'GetRequest', 'SetRequest', 'Trap'],
        summary: 'Simple Network Management Protocol provides a framework for managing devices over IP networks using a manager-agent architecture, standardized OID trees, and UDP transport.',
        diagram:
` [ SNMP Manager / NMS ]  ========= UDP Port 161 (Request / Response) ========> [ SNMP Agent ]
         ^               <========= GetRequest, GetNextRequest, SetRequest =====    (Router/Switch)
         |                                                                               |
         +----------------- UDP Port 162 (Unsolicited Alerts: Trap) <--------------------+

ISO / ITU-T OID Tree Hierarchy (KTU Exam Standard):
              iso (1)
               |
             org (3)
               |
             dod (6)
               |
           internet (1)   --> Prefix: 1.3.6.1
           /    |    \\
     mgmt(2)  private(4)
        |
     mib-2 (1)            --> Full Prefix: 1.3.6.1.2.1
     /   |   \\   \\
 system if   ip  tcp ...
  (1)   (2)  (4)  (6)
  • sysDescr.0: 1.3.6.1.2.1.1.1.0  (Scalar object requires instance index ".0")
  • sysUpTime.0: 1.3.6.1.2.1.1.3.0`,
        formulas: [
            'Manager to Agent: UDP Port 161 (GetRequest, GetNextRequest, GetBulkRequest, SetRequest)',
            'Agent to Manager: UDP Port 162 (Trap, InformRequest)',
            'Scalar vs Tabular: Scalar leaf nodes append .0 for instance identifier!'
        ],
        commonMistakes: 'Forgetting the trailing .0 on scalar MIB variables (e.g. sysUpTime must be sysUpTime.0 in SNMP requests!).'
    },
    {
        id: 'm4_asn1_syntax_rules',
        module: 4,
        category: 'MODULE 4',
        title: 'ASN.1 SMI Grammar & Syntax Debugging Rules',
        examWeight: '6 - 9 Marks (Syntax Correction Problem)',
        ktuMapping: 'Model Paper Q14b, Set 1 Q14b, Set 3 Q14a, Set 4 Q14b',
        keywords: ['ASN.1', 'SMI', 'Syntax Rules', 'Capitalization', 'INTEGER', 'OCTET STRING', 'ENUMERATED', 'SEQUENCE', 'Subtyping'],
        summary: 'Abstract Syntax Notation One (ASN.1) is the formal definition language used by SNMP SMI to define managed objects. It enforces strict lexical and semantic capitalization and subtyping rules.',
        diagram:
`KTU ASN.1 Debugging Rules Checklist:
1. Type Names MUST start with UPPERCASE:
   CORRECT: INTEGER, OCTET STRING, OBJECT IDENTIFIER, Counter32, Gauge32, TimeTicks, SEQUENCE
   INCORRECT: integer, octet string, object identifier

2. Variable & Identifier Names MUST start with lowercase:
   CORRECT: sysDescr, sysUpTime, ifNumber, packetLossRate
   INCORRECT: SysDescr, SysUpTime, IfNumber

3. Subtype Ranges use double dots "(min..max)" without spaces:
   CORRECT: INTEGER (0..255), INTEGER (15..40), OCTET STRING (SIZE (0..64))
   INCORRECT: INTEGER (0 to 255), INTEGER (15-40), INTEGER (0 ... 255)

4. ENUMERATED Lists have named values starting with lowercase and integer values:
   CORRECT: DayOfWeek ::= ENUMERATED { monday(1), tuesday(2), sunday(7) }
   INCORRECT: DayOfWeek ::= enumerated { Monday(1), Tuesday(2) }`,
        formulas: [
            'Example Valid Object Declaration:',
            'ifIndex OBJECT-TYPE',
            '    SYNTAX      INTEGER (1..2147483647)',
            '    MAX-ACCESS  read-only',
            '    STATUS      current',
            '    DESCRIPTION "Unique interface index."',
            '::= { ifEntry 1 }'
        ],
        commonMistakes: 'Capitalizing ENUMERATED item names (e.g., writing Monday(1) instead of monday(1)).'
    },
    {
        id: 'm4_nyquist_shannon_limits',
        module: 4,
        category: 'MODULE 4',
        title: 'Data Rate Limits: Nyquist Formula vs Shannon Capacity',
        examWeight: '6 - 9 Marks (Guaranteed Numerical Calculation)',
        ktuMapping: 'Model Paper Q14a, Set 2 Q14b, Set 3 Q14b, Set 5 Q14b',
        keywords: ['Bandwidth B', 'Nyquist Bit Rate', 'Signal Levels L', 'Shannon Capacity', 'SNR', 'SNR_dB', 'Noiseless vs Noisy'],
        summary: 'Nyquist defines the theoretical maximum bit rate for noiseless channels based on signal levels. Shannon defines the absolute theoretical upper capacity bound for noisy channels regardless of modulation scheme.',
        diagram:
`Comparison of Channel Capacity Limit Theorems:

+----------------------------+-----------------------------------+-----------------------------------+
| Feature                    | Nyquist Theorem (Noiseless)       | Shannon Theorem (Noisy Channel)   |
+----------------------------+-----------------------------------+-----------------------------------+
| Channel Condition          | Ideal noiseless channel           | Thermal Gaussian noise present    |
| Formula                    | C = 2 * B * log2(L)               | C = B * log2( 1 + SNR )           |
| Variables                  | B = Bandwidth (Hz), L = Levels    | B = Bandwidth (Hz), SNR = S / N   |
| Practical Goal             | Increasing levels L boosts speed  | Hard physical limit of channel    |
+----------------------------+-----------------------------------+-----------------------------------+

Step-by-Step SNR Conversion:
Given SNR in decibels (dB):
SNR_dB = 10 * log10( SNR_linear )
SNR_linear = 10^( SNR_dB / 10 )

Example (KTU Exam Problem):
Bandwidth B = 4000 Hz (4 kHz), SNR_dB = 30 dB:
1. SNR_linear = 10^(30 / 10) = 10^3 = 1000
2. Shannon Capacity C = 4000 * log2( 1 + 1000 ) = 4000 * log2(1001)
3. Since 2^10 = 1024, log2(1001) ~ 9.967
4. C = 4000 * 9.967 ~ 39,867 bps (~39.87 kbps)`,
        formulas: [
            'Nyquist Bit Rate: C_Nyq = 2 * B * log2(L) bits/sec',
            'Shannon Channel Capacity: C_Shan = B * log2(1 + SNR) bits/sec',
            'Decibel to Linear SNR: SNR = 10^(SNR_dB / 10)'
        ],
        commonMistakes: 'Using SNR in decibels directly inside Shannon\'s log2 formula. You MUST convert dB to linear ratio first!'
    },
    {
        id: 'm4_line_coding_waveforms',
        module: 4,
        category: 'MODULE 4',
        title: 'Line Coding Waveforms (NRZ-L, NRZ-I, Manchester)',
        examWeight: '6 - 9 Marks (Waveform Drawing Question)',
        ktuMapping: 'Model Paper Q14b, Set 1 Q14a, Set 3 Q14a, Set 4 Q14a',
        keywords: ['Line Coding', 'NRZ-L', 'NRZ-I', 'Manchester', 'Differential Manchester', 'Clock Synchronization', 'DC Component'],
        summary: 'Line coding converts binary bit sequences into digital voltage waveforms. Manchester line coding provides self-synchronizing transitions at the middle of every bit interval.',
        diagram:
`Waveform Drawing Guide for Bit Pattern: 1  0  1  1  0  0  1

Bit:            |   1   |   0   |   1   |   1   |   0   |   0   |   1   |
----------------+-------+-------+-------+-------+-------+-------+-------+
NRZ-L:          | ----- |       | ----- | ----- |       |       | ----- | (+V = 1)
(Level = Bit)   |       | ----- |       |       | ----- | ----- |       | (-V = 0)
----------------+-------+-------+-------+-------+-------+-------+-------+
NRZ-I:          |       |       |       |       |       |       |       | (Transition at
(Invert on '1') | ----- | ----- | _____ | ----- | ----- | ----- | _____ |  start on '1')
----------------+-------+-------+-------+-------+-------+-------+-------+
Manchester:     | --\\__ | __/-- | --\\__ | --\\__ | __/-- | __/-- | --\\__ | (1: High-to-Low)
(Middle Trans)  |       |       |       |       |       |       |       | (0: Low-to-High)
----------------+-------+-------+-------+-------+-------+-------+-------+

Manchester Advantages:
1. Self-Clocking: Transition in middle of every bit interval provides receiver clock sync.
2. Zero DC Component: Equal positive and negative voltage areas eliminate baseline wander.`,
        formulas: [
            'Manchester Rules: Bit 0 = Low-to-High (+V/2 after -V/2); Bit 1 = High-to-Low (-V/2 after +V/2)',
            'Differential Manchester: Transition in middle ALWAYS. Bit 0 = transition at start; Bit 1 = NO transition at start.'
        ],
        commonMistakes: 'Drawing Manchester transitions at the start instead of the middle of the bit interval.'
    },
    {
        id: 'm4_carrier_modulation',
        module: 4,
        category: 'MODULE 4',
        title: 'Carrier Modulation (ASK, FSK, PSK) & Constellations',
        examWeight: '3 - 6 Marks (Waveform / Spectrum Analysis)',
        ktuMapping: 'Set 2 Q14a, Set 3 Q14b, Set 5 Q14a',
        keywords: ['ASK', 'FSK', 'PSK', 'BPSK', 'QPSK', 'Carrier Frequency', 'Constellation', 'Baud Rate'],
        summary: 'Digital-to-analog modulation modulates a high-frequency analog carrier wave (amplitude, frequency, or phase) according to digital binary bit patterns.',
        diagram:
`Modulation Waveform Comparison for Bit Stream: 1  0  1

1. Amplitude Shift Keying (ASK):
   Bit 1: High amplitude carrier sine wave: A1 * sin(2*pi*f*t)
   Bit 0: Low / Zero amplitude:             A2 * sin(2*pi*f*t)  (Noise sensitive!)

2. Frequency Shift Keying (FSK):
   Bit 1: High frequency wave f1:           A * sin(2*pi*f1*t)
   Bit 0: Low frequency wave f2:            A * sin(2*pi*f2*t)

3. Phase Shift Keying (PSK):
   Bit 1: Phase = 0 degrees                 A * sin(2*pi*f*t)
   Bit 0: Phase = 180 degrees (Inverted!)   A * sin(2*pi*f*t + pi)

• BPSK (Binary PSK): 1 bit per symbol (2 phases: 0, 180).
• QPSK (Quadrature PSK): 2 bits per symbol (4 phases: 45, 135, 225, 315). Double the data rate!`,
        formulas: [
            'Baud Rate (S) vs Bit Rate (R): R = S * log2(L) = S * r',
            'Where r = bits per signal symbol (e.g., r = 2 for QPSK, r = 3 for 8-PSK).'
        ],
        commonMistakes: 'Confusing Bit Rate (bps) with Baud Rate (symbols/sec). Bit rate >= Baud rate.'
    },
    {
        id: 'm4_transmission_media',
        module: 4,
        category: 'MODULE 4',
        title: 'Transmission Media: Guided vs Unguided',
        examWeight: '3 - 5 Marks (Part A / B Theory)',
        ktuMapping: 'Model Paper Q4a, Set 1 Q4a, Set 2 Q4a, Set 4 Q4a',
        keywords: ['Guided Media', 'Twisted Pair', 'Coaxial', 'Optical Fiber', 'Total Internal Reflection', 'Critical Angle', 'Unguided Media'],
        summary: 'Transmission media provide the physical conduit across which electromagnetic bit energy propagates. Guided media bound signals inside physical wires; unguided media broadcast wireless waves through space.',
        diagram:
`Guided Media Comparison:
+-------------------+-----------------------------------+-----------------------------------+
| Media Type        | Construction / Principle          | Advantages / Constraints          |
+-------------------+-----------------------------------+-----------------------------------+
| Twisted Pair      | Twisting cancels crosstalk noise  | Low cost; UTP Cat 6 handles 1Gbps |
| (UTP / STP)       | (RJ-45, 100m max distance)        | Attenuation over long distances   |
| Coaxial Cable     | Center core + insulating sheath   | Higher bandwidth than twisted pair|
| (50 / 75 ohm)     | + braided mesh shield (BNC / tap) | Bulkier; used in cable TV & coax  |
| Optical Fiber     | Core (n1) + Cladding (n2)         | Immune to EMI / RFI interference; |
| (Single / Multi)  | Total Internal Reflection (n1>n2) | Ultra-high speeds (100+ Gbps); 2km|
+-------------------+-----------------------------------+-----------------------------------+

Total Internal Reflection in Optical Fiber:
Core refractive index n1 MUST be greater than Cladding refractive index n2 (n1 > n2).
Angle of incidence theta_i MUST exceed the Critical Angle theta_c:
              theta_c = arcsin( n2 / n1 )`,
        formulas: [
            'Snell\'s Law: n1 * sin(theta_1) = n2 * sin(theta_2)',
            'Critical Angle Formula: theta_c = arcsin( n2 / n1 )  (Valid only when n1 > n2)'
        ],
        commonMistakes: 'Claiming cladding has a higher refractive index than core. Core MUST have higher refractive index (n1 > n2) for total internal reflection!'
    },

    // ======================================================================
    // DEDICATED FORMULA CHEAT-SHEET CARDS
    // ======================================================================
    {
        id: 'formula_master_sheet',
        module: 'FORMULA',
        category: 'FORMULA CHEAT-SHEET',
        title: '⚡ MASTER EXAM FORMULA CHEAT-SHEET',
        examWeight: 'Essential 25+ Marks Numerical Arsenal',
        ktuMapping: 'All 6 Question Papers & KTU Syllabus',
        keywords: ['Formulas', 'Nyquist', 'Shannon', 'CSMA/CD', 'ALOHA', 'Subnetting', 'TCP Seq', 'P2P Time'],
        summary: 'High-density quick-reference card containing all mathematical formulas tested in KTU PCCST501 examinations. Memorize these formulas to secure guaranteed numerical marks!',
        diagram:
`====================================================================================
                        KTU PCCST501 NUMERICAL FORMULA MATRIX
====================================================================================
1. NYQUIST NOISELESS BIT RATE:
   C_Nyq = 2 * B * log2(L)  [bps]
   (B = Bandwidth in Hz, L = Signal Voltage Levels)

2. SHANNON NOISY CAPACITY LIMIT:
   C_Shan = B * log2( 1 + SNR )  [bps]
   SNR_linear = 10^( SNR_dB / 10 )

3. CSMA/CD MINIMUM FRAME SIZE CONSTRAINT:
   T_fr >= 2 * T_p  =>  Min_Frame_Size = 2 * T_p * Bandwidth = 2 * (Distance / v) * Bandwidth
   (Standard 10 Mbps Ethernet: 51.2 us * 10 Mbps = 512 bits = 64 Bytes)

4. ALOHA MAXIMUM THROUGHPUT:
   • Pure ALOHA:   S = G * e^(-2G)  --> Max S = 1 / (2e) = 18.4% at G = 0.5
   • Slotted ALOHA:S = G * e^(-G)   --> Max S = 1 / e   = 36.8% at G = 1.0

5. IPv4 CIDR SUBNETTING:
   • Usable Host Count = 2^(32 - n) - 2  (Subtract 2 for Network and Broadcast)
   • Subnet Mask has 'n' leading binary 1s.

6. IPv4 FRAGMENTATION:
   • Fragment Offset = (Data Byte Starting Index in original payload) / 8
   • More Fragments (MF) = 1 (if not last fragment); MF = 0 (if last fragment)

7. TCP SEQUENCE & ACK NUMBERS:
   • End Byte = Start Byte + Payload Length - 1
   • Next Expected ACK = End Byte + 1 = Start Byte + Payload Length
   • Cumulative ACK rule: ACK always specifies next expected in-order contiguous byte.

8. P2P vs CLIENT-SERVER DISTRIBUTION TIME:
   • D_cs >= max( N*F / u_s, F / d_min )
   • D_p2p >= max( F / u_s, F / d_min, N*F / (u_s + sum(u_i)) )

9. OPTICAL FIBER CRITICAL ANGLE:
   • theta_c = arcsin( n2 / n1 )  [Where n1 = Core Index, n2 = Cladding Index, n1 > n2]
====================================================================================`,
        formulas: [
            'All formulas verified against official KTU Schemes of Valuation for Model Paper and Sets 1-5.'
        ],
        commonMistakes: 'Always remember unit conversions: kHz -> Hz (* 10^3), Mbps -> bps (* 10^6), microseconds -> seconds (* 10^-6), Bytes -> bits (* 8).'
    }
];

// Search & Query Engine
class NeuralCodexManager {
    constructor() {
        this.database = NeuralCodexDatabase;
    }

    getAllCards() {
        return this.database;
    }

    getCardsByCategory(category) {
        if (!category || category === 'ALL') {
            return this.database;
        }
        return this.database.filter(card => card.category === category);
    }

    getCardById(id) {
        return this.database.find(card => card.id === id);
    }

    search(query, category = 'ALL') {
        let baseList = this.getCardsByCategory(category);
        if (!query || query.trim() === '') {
            return baseList;
        }

        const q = query.trim().toLowerCase();
        return baseList.filter(card => {
            // Fuzzy search across title, keywords, summary, formulas, and ktuMapping
            if (card.title.toLowerCase().includes(q)) return true;
            if (card.ktuMapping.toLowerCase().includes(q)) return true;
            if (card.summary.toLowerCase().includes(q)) return true;
            if (card.keywords.some(kw => kw.toLowerCase().includes(q))) return true;
            if (card.formulas.some(f => f.toLowerCase().includes(q))) return true;
            return false;
        });
    }
}

// Singleton Export
const neuralCodexInstance = new NeuralCodexManager();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.NeuralCodex = neuralCodexInstance;
    window.GridEngine.NeuralCodexDatabase = NeuralCodexDatabase;
    window.NeuralCodex = neuralCodexInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NeuralCodexDatabase, NeuralCodexManager, NeuralCodex: neuralCodexInstance };
}
