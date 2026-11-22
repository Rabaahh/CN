// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// ExamSimulator.js - Full 60-Mark Timed KTU Mock Exam Mode (2h 30m)
// Adheres Strictly to Official KTU Blueprint (Part A: 24M + Part B: 36M)
// ==========================================================================

const KTU_EXAM_BLUEPRINT = {
    metadata: {
        courseCode: 'PCCST501',
        courseTitle: 'Computer Networks',
        scheme: '2024 Scheme (Semester 5)',
        totalMarks: 60.0,
        partATotalMarks: 24.0, // 8 x 3 Marks
        partBTotalMarks: 36.0, // 4 x 9 Marks
        durationSeconds: 9000, // 2 Hours 30 Minutes (150 minutes)
        passingMarks: 24.0     // 40% minimum passing mark
    },

    // ----------------------------------------------------------------------
    // PART A: COMPULSORY (Exactly 8 Questions x 3 Marks = 24 Marks)
    // 2 Questions from each Module (Modules 1 to 4)
    // ----------------------------------------------------------------------
    partA: [
        // MODULE 1 (Q1 & Q2)
        {
            id: 'm1_q1_layering',
            module: 1,
            qNum: 1,
            title: 'Protocol Layering & Architectural Modularity',
            marks: 3.0,
            question: 'Explain the role of protocol layering in the design of the Internet architecture. State two distinct advantages.',
            options: [
                '(Recommended) Decomposes complex communication into modular hierarchical layers with well-defined service interfaces; provides modularity and vendor interoperability.',
                'Combines all hardware and software routines into a single monolithic loop to eliminate header overhead.',
                'Forces all application packets to bypass network routing and travel along a single pre-allocated circuit path.'
            ],
            correctOptionIndex: 0,
            keywords: ['modularity', 'hierarchical', 'layers', 'interfaces', 'interoperability', 'abstraction'],
            rubric: [
                { desc: 'Explains hierarchical decomposition & service interfaces', marks: 1.5, keywords: ['modular', 'layers', 'interfaces'] },
                { desc: 'States advantages: Modularity, vendor interoperability & independent updates', marks: 1.5, keywords: ['modularity', 'interoperability'] }
            ],
            modelAnswer: 'Protocol layering decomposes the complex network task into a hierarchical stack where each layer provides specific services to the layer above and relies on services below. Two key advantages: 1) Modularity: an implementation at one layer can change without altering other layers. 2) Interoperability: heterogeneous systems from different vendors communicate via standardized protocol interfaces.'
        },
        {
            id: 'm1_q2_dns_queries',
            module: 1,
            qNum: 2,
            title: 'DNS Resolution: Iterative vs Recursive Queries',
            marks: 3.0,
            question: 'Differentiate between iterative and recursive DNS queries during domain name resolution.',
            options: [
                '(Recommended) In recursive queries, the contacted server assumes responsibility to find the final IP; in iterative queries, the server returns the referral IP of the next nameserver.',
                'Recursive queries operate over TCP port 80, whereas iterative queries operate strictly over UDP port 53.',
                'Iterative queries always query the web browser cache, while recursive queries only contact Authoritative DNS.'
            ],
            correctOptionIndex: 0,
            keywords: ['recursive', 'iterative', 'referral', 'resolver', 'next nameserver'],
            rubric: [
                { desc: 'Defines Recursive query: server takes complete responsibility to resolve target', marks: 1.5, keywords: ['recursive', 'responsibility'] },
                { desc: 'Defines Iterative query: server returns referral to next hierarchical server', marks: 1.5, keywords: ['iterative', 'referral', 'next'] }
            ],
            modelAnswer: '1) Recursive Query: The querying host puts the burden of name resolution on the contacted DNS server (e.g., Host to Local DNS Server), which recursively resolves the query and returns the final answer. 2) Iterative Query: The contacted server returns the best referral it has (the IP address of the next hierarchical nameserver down the tree: Root -> TLD -> Authoritative) without resolving the query itself.'
        },

        // MODULE 2 (Q3 & Q4)
        {
            id: 'm2_q3_tcp_vs_udp',
            module: 2,
            qNum: 3,
            title: 'Transport Layer: TCP vs UDP Comparison',
            marks: 3.0,
            question: 'Compare TCP and UDP with respect to connection establishment, reliability, and transport overhead.',
            options: [
                '(Recommended) TCP is connection-oriented, reliable (ACKs, retransmissions), 20-byte header; UDP is connectionless, unreliable (best-effort), 8-byte header.',
                'TCP is connectionless with 8-byte header; UDP is connection-oriented with 20-byte header.',
                'Both TCP and UDP guarantee zero packet loss and identical fixed transmission latency.'
            ],
            correctOptionIndex: 0,
            keywords: ['tcp', 'udp', 'connection-oriented', 'connectionless', 'reliable', '20-byte', '8-byte'],
            rubric: [
                { desc: 'Connection: TCP requires 3-way handshake; UDP is connectionless', marks: 1.0, keywords: ['connection-oriented', 'connectionless'] },
                { desc: 'Reliability: TCP guarantees delivery via sequence numbers and ACKs; UDP is best-effort', marks: 1.0, keywords: ['reliable', 'acks', 'best-effort'] },
                { desc: 'Overhead: TCP header is 20-60 bytes; UDP header is fixed at 8 bytes', marks: 1.0, keywords: ['20-byte', '8-byte'] }
            ],
            modelAnswer: '• Connection: TCP is connection-oriented (requires 3-way handshake SYN, SYN-ACK, ACK); UDP is connectionless (transmits datagrams immediately).\n• Reliability: TCP provides reliable in-order byte-stream delivery via sequence numbers, checksums, and retransmissions; UDP provides best-effort unreliable delivery.\n• Header Overhead: TCP minimum header size is 20 bytes; UDP header is lightweight at only 8 bytes.'
        },
        {
            id: 'm2_q4_cidr_subnetting',
            module: 2,
            qNum: 4,
            title: 'IPv4 CIDR Subnetting (/26 Calculation)',
            marks: 3.0,
            question: 'An organization is assigned block 192.168.10.64/26. Determine the subnet mask, total addresses, usable host range, and broadcast address.',
            options: [
                '(Recommended) Mask: 255.255.255.192, Total: 64, Usable Hosts: 192.168.10.65 to 192.168.10.126, Broadcast: 192.168.10.127.',
                'Mask: 255.255.255.128, Total: 128, Usable Hosts: 192.168.10.1 to 192.168.10.126, Broadcast: 192.168.10.128.',
                'Mask: 255.255.255.0, Total: 256, Usable Hosts: 192.168.10.64 to 192.168.10.255, Broadcast: 192.168.10.255.'
            ],
            correctOptionIndex: 0,
            keywords: ['255.255.255.192', '64', '192.168.10.65', '192.168.10.126', '192.168.10.127'],
            rubric: [
                { desc: 'Determines Subnet Mask: /26 = 255.255.255.192 and Total IPs = 2^(32-26) = 64', marks: 1.0, keywords: ['255.255.255.192', '64'] },
                { desc: 'Calculates Usable Host Range: 192.168.10.65 to 192.168.10.126 (62 hosts)', marks: 1.0, keywords: ['192.168.10.65', '192.168.10.126'] },
                { desc: 'Identifies Directed Broadcast Address: 192.168.10.127', marks: 1.0, keywords: ['192.168.10.127'] }
            ],
            modelAnswer: '• Subnet Mask: /26 has 26 ones -> 11111111.11111111.11111111.11000000 = 255.255.255.192.\n• Host Bits: 32 - 26 = 6 bits -> Total addresses = 2^6 = 64.\n• Subnet Base Address: 192.168.10.64 (Network ID).\n• Usable Host Range: 192.168.10.65 through 192.168.10.126 (2^6 - 2 = 62 usable hosts).\n• Directed Broadcast Address: 192.168.10.127.'
        },

        // MODULE 3 (Q5 & Q6)
        {
            id: 'm3_q5_bit_stuffing',
            module: 3,
            qNum: 5,
            title: 'Data Link Layer: Bit Stuffing Framing Rule',
            marks: 3.0,
            question: 'Explain the bit stuffing mechanism used to prevent frame delimiter (01111110) confusion in HDLC.',
            options: [
                '(Recommended) The transmitter inserts a 0-bit after every 5 consecutive 1-bits; receiver removes any 0-bit directly following 5 consecutive 1-bits.',
                'The transmitter converts all 1-bits into alternating 10 pairs across the entire payload.',
                'The transmitter appends a 16-bit CRC checksum after every byte to prevent framing errors.'
            ],
            correctOptionIndex: 0,
            keywords: ['01111110', 'consecutive 1s', 'stuff 0', 'unstuff', 'delimiter'],
            rubric: [
                { desc: 'Sender rule: Inserts a "0" bit immediately after detecting five consecutive "1"s', marks: 1.5, keywords: ['five consecutive 1', 'insert 0'] },
                { desc: 'Receiver rule: Destuffs (removes) the "0" bit that follows five consecutive "1"s', marks: 1.5, keywords: ['receiver', 'removes 0', 'destuff'] }
            ],
            modelAnswer: 'Bit stuffing ensures that the flag sequence 01111110 (six consecutive 1s) never appears in user data:\n• Transmitter Rule: Whenever the transmitter detects five consecutive 1s in the data stream, it automatically stuffs (inserts) a 0-bit into the outgoing bitstream.\n• Receiver Rule: When the receiver detects five consecutive 1s followed by a 0-bit, it automatically removes (unstuffs) the 0-bit to restore original data.'
        },
        {
            id: 'm3_q6_csmacd_backoff',
            module: 3,
            qNum: 6,
            title: 'CSMA/CD & Binary Exponential Backoff Algorithm',
            marks: 3.0,
            question: 'Describe the Binary Exponential Backoff algorithm used in Ethernet CSMA/CD following a collision.',
            options: [
                '(Recommended) After collision n (1 <= n <= 10), wait k * Slot_Time, where k is chosen randomly from [0 .. 2^n - 1].',
                'Each station waits a fixed constant delay of 51.2 ms before attempting to retransmit.',
                'The colliding station immediately increases transmission power by a factor of 2^n to overwrite competing signals.'
            ],
            correctOptionIndex: 0,
            keywords: ['binary exponential backoff', '2^n - 1', 'slot time', 'random', 'collision'],
            rubric: [
                { desc: 'States backoff formula: k is randomly chosen from {0, 1, ..., 2^n - 1}', marks: 1.5, keywords: ['2^n - 1', 'random'] },
                { desc: 'Defines wait duration: Backoff time = k * Slot_Time (51.2 microseconds)', marks: 1.5, keywords: ['slot time', 'k * slot_time'] }
            ],
            modelAnswer: 'Following a collision in CSMA/CD:\n1. The transmitting station sends a 32-48 bit jamming signal and aborts transmission.\n2. Binary Exponential Backoff: For collision attempt n (where n = min(attempt, 10)), the station selects a random integer k from the range [0 .. 2^n - 1].\n3. Wait Duration: The station waits for a backoff time equal to k * Slot_Time (51.2 microseconds for 10 Mbps Ethernet) before attempting to re-sense the channel and retransmit.'
        },

        // MODULE 4 (Q7 & Q8)
        {
            id: 'm4_q7_snmp_architecture',
            module: 4,
            qNum: 7,
            title: 'SNMP Architecture: Core Entities & UDP Ports',
            marks: 3.0,
            question: 'Identify the primary components of the SNMP management framework and specify the transport protocol and port numbers utilized.',
            options: [
                '(Recommended) Manager (NMS), Agent, MIB database, SMI rules; runs over UDP Port 161 (queries) and UDP Port 162 (traps).',
                'Manager and Agent run over TCP Port 80 for queries and TCP Port 443 for encrypted traps.',
                'Client, Proxy, and Domain Server operate over ICMP echo packets with no port numbers.'
            ],
            correctOptionIndex: 0,
            keywords: ['manager', 'agent', 'mib', 'smi', 'udp port 161', 'udp port 162', 'trap'],
            rubric: [
                { desc: 'Identifies entities: SNMP Manager (NMS), Managed Agent, MIB, and SMI', marks: 1.5, keywords: ['manager', 'agent', 'mib', 'smi'] },
                { desc: 'Specifies transport: UDP Port 161 for requests/responses, UDP Port 162 for Traps', marks: 1.5, keywords: ['udp port 161', 'udp port 162'] }
            ],
            modelAnswer: '• Components: 1) SNMP Manager (NMS): Central monitoring station. 2) SNMP Agent: Daemon process running on managed network devices. 3) MIB (Management Information Base): Hierarchical database of managed objects. 4) SMI: Rules specifying data types and syntax (ASN.1).\n• Transport Protocol: Operates over UDP.\n• Port Numbers: UDP Port 161 for Manager requests (Get, Set, GetNext); UDP Port 162 for asynchronous Agent Trap alerts.'
        },
        {
            id: 'm4_q8_nyquist_shannon',
            module: 4,
            qNum: 8,
            title: 'Nyquist vs Shannon Maximum Data Rate Limits',
            marks: 3.0,
            question: 'State the Nyquist and Shannon channel capacity formulas and distinguish between noiseless and noisy channel limits.',
            options: [
                '(Recommended) Nyquist (Noiseless): C = 2B log2(L) bps; Shannon (Noisy): C = B log2(1 + SNR) bps.',
                'Nyquist: C = B log2(1 + SNR); Shannon: C = 2B log2(L) with L = signal levels.',
                'Both formulas equal C = Bandwidth * Attenuation constant divided by cable distance.'
            ],
            correctOptionIndex: 0,
            keywords: ['nyquist', 'shannon', 'c = 2b log2(l)', 'c = b log2(1 + snr)', 'noiseless', 'noisy'],
            rubric: [
                { desc: 'States Nyquist Formula: C = 2 * B * log2(L) for noiseless channels', marks: 1.5, keywords: ['2b log2', 'noiseless'] },
                { desc: 'States Shannon Formula: C = B * log2(1 + SNR) for channels with thermal noise', marks: 1.5, keywords: ['b log2', 'snr', 'noisy'] }
            ],
            modelAnswer: '1) Nyquist Maximum Data Rate (Noiseless Channel):\n   C = 2 * B * log2(L) bps\n   Where B = Channel Bandwidth (Hz) and L = Number of discrete signal levels.\n2) Shannon Channel Capacity (Noisy Channel with Thermal Noise):\n   C = B * log2(1 + SNR) bps\n   Where B = Bandwidth (Hz) and SNR = Signal-to-Noise Ratio (linear power ratio).\n   Shannon defines the ultimate theoretical capacity limit in the presence of Gaussian thermal noise.'
        }
    ],

    // ----------------------------------------------------------------------
    // PART B: MODULE CHOICES (4 Questions Attempted x 9 Marks = 36 Marks)
    // 1 Question Chosen out of 2 Alternatives per Module
    // ----------------------------------------------------------------------
    partB: [
        // MODULE 1 (CHOICE: Q9 OR Q10)
        {
            module: 1,
            choiceA: {
                id: 'm1_q9_dns_tcpip',
                qNum: 9,
                title: 'DNS 5-Hop Hierarchy Trace & TCP/IP 5-Layer Stack Functions & PDUs',
                marks: 9.0,
                subdivisions: [
                    { id: 'sub_a', title: 'Part (a): Trace DNS Resolution from Browser to Authoritative Nameserver', maxMarks: 4.5, keywords: ['browser cache', 'local dns', 'root server', 'tld', 'authoritative', 'type a'] },
                    { id: 'sub_b', title: 'Part (b): TCP/IP 5-Layer Architecture: Primary Functions & PDU Data Units', maxMarks: 4.5, keywords: ['application message', 'transport segment', 'network datagram', 'data link frame', 'physical bits'] }
                ],
                examinerInsight: 'Must include exact 5-hop DNS sequence and complete 5-layer table with correct PDU names (Message, Segment, Datagram, Frame, Bits).',
                modelAnswer: `(a) DNS 5-Hop Resolution Sequence for 'www.example.corp':
1. Browser Cache Check: Browser checks OS/resolver cache. If miss, forwards query to Local DNS Server.
2. Local DNS to Root Nameserver: Local DNS sends iterative query to Root Server ('.'). Root returns referral to '.corp' TLD Server.
3. Local DNS to TLD Nameserver: Local DNS queries '.corp' TLD Server. TLD returns referral to Authoritative DNS for 'example.corp'.
4. Local DNS to Authoritative Nameserver: Local DNS queries Authoritative Server. Authoritative returns Type A resource record with IP address 10.240.0.1.
5. Local DNS returns IP to browser and caches record.

(b) TCP/IP 5-Layer Architecture Stack:
1. Application Layer: Network applications and user protocols (HTTP, DNS, SMTP, FTP). PDU: Message.
2. Transport Layer: End-to-end process-to-process delivery, flow/congestion control, reliability (TCP/UDP). PDU: Segment.
3. Network Layer: Host-to-host packet routing, logical addressing across autonomous systems (IPv4, IPv6, ICMP). PDU: Datagram / Packet.
4. Data Link Layer: Hop-to-hop frame delivery, MAC addressing, error detection (CSMA/CD, Ethernet, switches). PDU: Frame.
5. Physical Layer: Transmission of unstructured raw bit streams over physical media (voltage, optical fiber, wireless). PDU: Bits.`
            },
            choiceB: {
                id: 'm1_q10_email_p2p',
                qNum: 10,
                title: 'Electronic Mail Architecture (SMTP, POP3, IMAP) & P2P BitTorrent Algorithms',
                marks: 9.0,
                subdivisions: [
                    { id: 'sub_a', title: 'Part (a): Email Architecture: MTA Push vs MAA Pull & MIME Extensions', maxMarks: 4.5, keywords: ['smtp push', 'pop3 pull', 'imap', 'mime', 'base64', 'user agent'] },
                    { id: 'sub_b', title: 'Part (b): P2P File Distribution: Rarest-First & Tit-for-Tat Choking Algorithms', maxMarks: 4.5, keywords: ['rarest-first', 'tit-for-tat', 'optimistic unchoking', 'd_p2p', 'self-scalability'] }
                ],
                examinerInsight: 'Explicitly explain why SMTP is a push protocol while POP3/IMAP are pull protocols, and why Rarest-First prevents chunk extinction.',
                modelAnswer: `(a) Electronic Mail Architecture:
• Mail User Agent (MUA): Email client creating and reading emails.
• Mail Transfer Agent (MTA) & SMTP: SMTP is a push protocol operating on TCP port 25/587. It pushes messages from sender MUA to sender mail server, and from sender mail server to receiver mail server.
• Mail Access Agent (MAA) & POP3/IMAP: POP3 (port 110) and IMAP (port 143) are pull protocols used by receiver MUA to retrieve messages stored on receiver mail server. IMAP maintains server-side folder synchronization.
• MIME (Multipurpose Internet Mail Extensions): Encodes binary data (audio, images) into 7-bit ASCII using Base64 encoding.

(b) BitTorrent P2P Distribution Algorithms:
• Rarest-First Strategy: The client determines which chunks are least replicated across all connected peers and requests those rarest chunks first. This prevents rare chunks from disappearing and multiplies chunk seeders quickly.
• Tit-for-Tat Choking: Bandwidth reciprocity algorithm. A peer unchokes the top 4 peers that provide the highest download rates.
• Optimistically Unchoked Peer: Every 30 seconds, one additional random peer is unchoked to discover newly joined high-bandwidth seeders.`
            }
        },

        // MODULE 2 (CHOICE: Q11 OR Q12)
        {
            module: 2,
            choiceA: {
                id: 'm2_q11_tcp_handshake_seq',
                qNum: 11,
                title: 'TCP 3-Way Handshake, Sequence Numbers & Cumulative ACK Tracing',
                marks: 9.0,
                subdivisions: [
                    { id: 'sub_a', title: 'Part (a): TCP 3-Way Handshake Connection Establishment & SYN Seq Rule', maxMarks: 3.0, keywords: ['syn=1', 'syn+ack', 'ack', 'seq=x', 'ack=x+1', 'consumes 1 sequence number'] },
                    { id: 'sub_b', title: 'Part (b): Numerical Tracing of Consecutive 200B, 200B, 150B Segments', maxMarks: 3.0, keywords: ['1000..1199', '1200..1399', '1400..1549', 'seq=1000', 'seq=1200', 'seq=1400'] },
                    { id: 'sub_c', title: 'Part (c): Next Expected Cumulative ACK Tracing with & without Segment 2 Loss', maxMarks: 3.0, keywords: ['ack=1550', 'ack=1200', 'duplicate ack', 'cumulative ack'] }
                ],
                examinerInsight: 'Warning: Forgetting why SYN consumes 1 sequence number (to ensure reliable delivery of the control flag itself) loses 1 mark in KTU evaluations.',
                modelAnswer: `(a) TCP 3-Way Handshake Connection Establishment:
1. Step 1 (SYN): Client -> Server sends SYN=1, Seq=x (ISN).
2. Step 2 (SYN+ACK): Server -> Client replies SYN=1, ACK=1, Seq=y, Ack=x+1.
3. Step 3 (ACK): Client -> Server acknowledges ACK=1, Seq=x+1, Ack=y+1.
• SYN Sequence Number Consumption: The SYN flag consumes exactly 1 sequence number despite carrying 0 application payload bytes. This is mandatory so that the receiving side can reliably acknowledge the connection request.

(b) Segment Byte Range Tracing:
Host A transfers 550 bytes starting at Sequence Number 1000:
• Segment 1 (200 bytes): Sequence Number = 1000, Byte Range = 1000 .. 1199.
• Segment 2 (200 bytes): Sequence Number = 1200, Byte Range = 1200 .. 1399.
• Segment 3 (150 bytes): Sequence Number = 1400, Byte Range = 1400 .. 1549.

(c) Cumulative ACK Tracing:
• Scenario 1 (Normal in-order arrival): When Segments 1, 2, and 3 arrive successfully, Receiver B returns cumulative ACK = 1550 (next expected byte).
• Scenario 2 (Segment 2 is lost): When Segment 1 arrives, B sends ACK = 1200. When Segment 3 arrives out-of-order, B buffers Segment 3 and re-issues duplicate ACK = 1200 because Segment 2 is missing.`
            },
            choiceB: {
                id: 'm2_q12_dijkstra_fragmentation',
                qNum: 12,
                title: 'Dijkstra Link-State Least-Cost Routing & IPv4 MTU Datagram Fragmentation',
                marks: 9.0,
                subdivisions: [
                    { id: 'sub_a', title: 'Part (a): Dijkstra Shortest-Path Algorithm: Step-by-Step Table Execution', maxMarks: 5.0, keywords: ['permanent set', "n'", 'tentative cost', 'relaxation', 'least-cost path'] },
                    { id: 'sub_b', title: 'Part (b): IPv4 4000B Datagram Fragmentation across 1500B MTU Router Link', maxMarks: 4.0, keywords: ['total length', 'header 20', 'payload 1480', 'offset 0', 'offset 185', 'offset 370', 'mf flag'] }
                ],
                examinerInsight: 'Fragment offset must be measured in units of 8-byte blocks: 1480 / 8 = 185. MF flag is 1 for all fragments except the final fragment.',
                modelAnswer: `(a) Dijkstra Link-State Shortest-Path Algorithm:
• Permanent Set N' Initialization: N' = {A}, D(B)=2, D(C)=5, D(D)=inf, D(E)=inf.
• Step 1: Minimum tentative cost is B (2). Add B to N'. Update neighbors: D(C) = min(5, 2+2) = 4, D(D) = 2+1 = 3, D(E) = 2+3 = 5.
• Step 2: Minimum tentative cost is D (3). Add D to N'. Update neighbors: D(C) remains 4, D(E) = min(5, 3+1) = 4.
• Step 3: Select C or E (cost 4). Add C to N'.
• Step 4: Add E to N'. Final least-cost path from A to E is A -> B -> D -> E with total cost = 4 (or A -> B -> E = 5).

(b) IPv4 Datagram Fragmentation Calculation:
Original Datagram: Total Length = 4000 Bytes (20B Header + 3980B Data). MTU = 1500 Bytes.
Max payload per fragment must be multiple of 8: floor((1500 - 20) / 8) * 8 = 1480 Bytes.
• Fragment 1: Total Length = 1500B (20B Header + 1480B Data), Fragment Offset = 0 / 8 = 0, More Fragments (MF) = 1.
• Fragment 2: Total Length = 1500B (20B Header + 1480B Data), Fragment Offset = 1480 / 8 = 185, More Fragments (MF) = 1.
• Fragment 3: Remaining Data = 3980 - (1480 * 2) = 1020 Bytes. Total Length = 1040B (20B Header + 1020B Data), Fragment Offset = 2960 / 8 = 370, More Fragments (MF) = 0.`
            }
        },

        // MODULE 3 (CHOICE: Q13 OR Q14)
        {
            module: 3,
            choiceA: {
                id: 'm3_q13_crc_modulo2',
                qNum: 13,
                title: 'CRC Modulo-2 XOR Division & Error Verification',
                marks: 9.0,
                subdivisions: [
                    { id: 'sub_a', title: 'Part (a): Polynomial Divisor Conversion & Zero-Padding Rule', maxMarks: 2.0, keywords: ['1101', 'degree 3', 'append 3 zeros', '100100000'] },
                    { id: 'sub_b', title: 'Part (b): Modulo-2 XOR Long Division Tracing & FCS Remainder', maxMarks: 4.0, keywords: ['xor', '111101', '001', 'fcs', 'remainder'] },
                    { id: 'sub_c', title: 'Part (c): Codeword Assembly & Receiver Zero-Error Check', maxMarks: 3.0, keywords: ['100100001', 'codeword', 'remainder 000', 'no error', 'valid'] }
                ],
                examinerInsight: 'Generator degree k=3 requires appending exactly 3 zeros: 100100 -> 100100000. Remainder must be 3 bits (001).',
                modelAnswer: `(a) Polynomial Divisor & Padding:
• Data bitstring = 100100 (6 bits).
• Generator g(x) = x^3 + x^2 + 1 = 1*x^3 + 1*x^2 + 0*x^1 + 1*x^0 -> Divisor = 1101 (degree k = 3).
• Zero-Padding: Append k = 3 zeros to data: Augmented Bitstring = 100100000.

(b) Modulo-2 XOR Long Division:
100100000 divided by 1101 using XOR:
100100000 XOR 1101 = Quotient 111101, Remainder (FCS) = 001.

(c) Transmitted Codeword & Receiver Verification:
• Transmitted Codeword = Data + FCS = 100100001.
• Receiver Verification: Receiver divides received codeword 100100001 by 1101 using modulo-2 XOR division.
  Quotient = 111101, Remainder = 000.
  Since remainder = 000, the received frame is verified to be 100% error-free!`
            },
            choiceB: {
                id: 'm3_q14_csmacd_switch_learning',
                qNum: 14,
                title: 'CSMA/CD Minimum Frame Size Derivation & Ethernet Switch Transparent Learning',
                marks: 9.0,
                subdivisions: [
                    { id: 'sub_a', title: 'Part (a): Mathematical Derivation of T_fr >= 2 * T_p and 64-Byte Minimum Frame', maxMarks: 5.0, keywords: ['2 * t_p', 'round-trip', 'worst-case', 'min frame', '512 bits', '64 bytes'] },
                    { id: 'sub_b', title: 'Part (b): Transparent Switch MAC Learning Engine: Filtering, Forwarding & Flooding', maxMarks: 4.0, keywords: ['filtering', 'forwarding', 'flooding', 'source mac learning', 'aging timer'] }
                ],
                examinerInsight: 'Must prove why round-trip time 2*T_p is required so transmitting station still listens when collision returns.',
                modelAnswer: `(a) Derivation of T_fr >= 2 * T_p and 64-Byte Minimum Frame:
• Consider two stations A and B at maximum distance d with one-way propagation delay T_p.
• Station A begins transmitting frame at t = 0.
• At t = T_p - epsilon, just before signal reaches B, station B senses channel idle and transmits. Collision occurs near B at t = T_p.
• The collision signal propagates back to station A, arriving at t = 2 * T_p.
• In order for station A to still be transmitting when collision arrives (so collision can be detected), frame transmission time T_fr must satisfy:
  T_fr >= 2 * T_p
• Since T_fr = Frame_Size (L) / Bandwidth (B):
  L_min = 2 * T_p * Bandwidth
• Numerical Calculation for Standard 10 Mbps Ethernet:
  2 * T_p = 51.2 microseconds, Bandwidth = 10 Mbps.
  Min Frame = (51.2 * 10^-6 s) * (10 * 10^6 bps) = 512 bits = 64 Bytes.

(b) Transparent Switch MAC Address Learning:
• Source Address Learning: When a frame arrives on a port, the switch records the source MAC address and incoming port into its Forwarding Table with an aging timer.
• Destination Lookup & Action:
  1. Forwarding: If destination MAC is in the table on a different port, forward frame strictly to that port.
  2. Filtering: If destination MAC is in the table on the same incoming port, drop/filter the frame.
  3. Flooding: If destination MAC is unknown or broadcast (FF:FF:FF:FF:FF:FF), flood frame to all ports except incoming port.`
            }
        },

        // MODULE 4 (CHOICE: Q15 OR Q16)
        {
            module: 4,
            choiceA: {
                id: 'm4_q15_snmp_asn1',
                qNum: 15,
                title: 'SNMP Architecture, MIB OID Tree (1.3.6.1.2.1) & ASN.1 Syntax Rules',
                marks: 9.0,
                subdivisions: [
                    { id: 'sub_a', title: 'Part (a): SNMP Framework: Entities, Operations (Get/Set/Trap) & Ports 161/162', maxMarks: 3.0, keywords: ['manager', 'agent', 'mib', 'smi', 'udp port 161', 'udp port 162', 'trap'] },
                    { id: 'sub_b', title: 'Part (b): ISO/ITU-T OID Tree Hierarchy & Scalar Instance Indexing (.0)', maxMarks: 3.0, keywords: ['1.3.6.1.2.1', 'iso', 'org', 'dod', 'internet', 'mgmt', 'mib-2', '.0'] },
                    { id: 'sub_c', title: 'Part (c): ASN.1 SMI Lexical Grammar Rules & Error Corrections', maxMarks: 3.0, keywords: ['uppercase type', 'lowercase identifier', 'range', 'enumerated', 'integer (0..1000)'] }
                ],
                examinerInsight: 'Scalar MIB leaf nodes MUST have instance identifier .0 appended when addressed in Get/Set requests (e.g. sysUpTime.0).',
                modelAnswer: `(a) SNMP Framework & PDU Operations:
• Architecture: SNMP Manager (NMS) monitors Managed Devices via resident SNMP Agents querying local MIB variables structured according to SMI.
• PDU Operations: GetRequest, GetNextRequest, SetRequest (Manager to Agent on UDP Port 161); GetResponse (Agent to Manager on UDP Port 161); Trap / Inform (Agent to Manager alert on UDP Port 162).

(b) ISO/ITU-T OID Hierarchy & Scalar Indexing:
• OID Path 1.3.6.1.2.1 maps to:
  iso (1) -> identified-organization (3) -> dod (6) -> internet (1) -> mgmt (2) -> mib-2 (1).
• Scalar Instance Indexing: A scalar object has a single instance. In an SNMP PDU, the scalar object identifier must append an instance sub-identifier of '.0' (e.g., sysDescr.0 = 1.3.6.1.2.1.1.1.0).

(c) ASN.1 SMI Rules & Declaration Corrections:
1. Type names MUST start with an UPPERCASE letter (e.g., INTEGER, OCTET STRING, ENUMERATED).
2. Variable and identifier names MUST start with a lowercase letter.
3. Subrange limits use double dots (min..max).
• Corrections:
  Faulty: DayOfWeek ::= enumerated { Monday(1), Tuesday(2) }
  Correct: DayOfWeek ::= ENUMERATED { monday(1), tuesday(2) }
  Faulty: packetQueue ::= integer (0 to 1000)
  Correct: packetQueue ::= INTEGER (0..1000)`
            },
            choiceB: {
                id: 'm4_q16_modulation_media',
                qNum: 16,
                title: 'Carrier Modulation (ASK, FSK, PSK), Line Coding & Transmission Media',
                marks: 9.0,
                subdivisions: [
                    { id: 'sub_a', title: 'Part (a): Carrier Modulation: ASK, FSK, and PSK Waveform Tracing for 10110', maxMarks: 3.5, keywords: ['ask amplitude', 'fsk frequency', 'psk phase', '180 degree phase shift', '10110'] },
                    { id: 'sub_b', title: 'Part (b): Digital Line Coding: NRZ-L, NRZ-I, and Manchester Waveforms', maxMarks: 3.0, keywords: ['nrz-l', 'nrz-i', 'manchester', 'mid-bit transition', 'inversion on 1'] },
                    { id: 'sub_c', title: 'Part (c): Guided Media: Twisted Pair vs Coaxial vs Optical Fiber (TIR)', maxMarks: 2.5, keywords: ['twisted pair', 'coaxial', 'optical fiber', 'total internal reflection', 'critical angle'] }
                ],
                examinerInsight: 'Manchester encoding guarantees self-synchronization via mid-bit transition (Low-to-High for 0, High-to-Low for 1).',
                modelAnswer: `(a) Digital Carrier Modulation for Bitstream 10110:
• Amplitude Shift Keying (ASK): Bit 1 transmits carrier sine wave at amplitude A; Bit 0 transmits zero amplitude (silence).
• Frequency Shift Keying (FSK): Bit 1 transmits high frequency f1; Bit 0 transmits low frequency f2. Constant amplitude.
• Phase Shift Keying (PSK / BPSK): Bit 1 transmits sine wave at phase 0 degrees; Bit 0 transmits carrier with 180 degrees phase shift.

(b) Digital Line Coding:
• NRZ-L (Non-Return to Zero Level): Voltage level directly indicates bit (High voltage = 1, Low voltage = 0).
• NRZ-I (Non-Return to Zero Inverted): Transition at beginning of bit interval represents 1; No transition represents 0. Eliminates ambiguity from polarity inversion.
• Manchester Encoding: Every bit has a mid-bit transition for clock synchronization: Low-to-High transition represents bit 0; High-to-Low transition represents bit 1.

(c) Guided Transmission Media:
• Twisted Pair: Pairs of insulated copper wires twisted together to cancel electromagnetic interference and crosstalk.
• Coaxial Cable: Central copper core surrounded by dielectric insulator, braided wire shield, and protective jacket. Higher bandwidth and noise immunity.
• Optical Fiber: Glass or silica core transmitting light pulses based on Total Internal Reflection (TIR). Condition: Angle of incidence exceeds critical angle theta_c (sin theta_c = n2 / n1 where n1 > n2). Immune to EMI and extremely high bandwidth.`
            }
        }
    ]
};

class ExamSimulator {
    constructor(gameState = null, audio = null) {
        this.blueprint = KTU_EXAM_BLUEPRINT;
        this.gameState = gameState || (typeof window !== 'undefined' ? window.GameState : null);
        this.audio = audio || (typeof window !== 'undefined' ? window.CyberAudio : null);

        this.isOpen = false;
        this.examStatus = 'NOT_STARTED'; // 'NOT_STARTED', 'IN_PROGRESS', 'SUBMITTED'
        this.timeRemaining = this.blueprint.metadata.durationSeconds; // 9000s = 2h 30m

        // Active View State
        this.activeSection = 'PART_A'; // 'PART_A', 'PART_B', 'REPORT_CARD'
        this.selectedPartAIndex = 0;   // 0 .. 7
        this.selectedModuleIndex = 0;  // 0 .. 3 (Module 1 to 4)
        this.partBChoices = ['A', 'A', 'A', 'A']; // Choice 'A' or 'B' for each of the 4 modules

        // Player Responses
        this.partAAnswers = new Array(8).fill(-1); // Option indices chosen
        this.partATextAnswers = new Array(8).fill(''); // Optional written response
        this.partBAnswers = new Array(4).fill(''); // Text answers for each module

        // Results
        this.examResult = null;
        this.scrollOffset = 0;
        this.isTyping = false;

        this.init();
    }

    init() {
        console.log('[ExamSimulator] KTU PCCST501 60-Mark Exam Simulator Engine loaded.');
    }

    open() {
        this.isOpen = true;
        if (this.examStatus === 'NOT_STARTED') {
            this.startExam();
        }
        if (this.audio && typeof this.audio.sfxCodexOpen === 'function') {
            this.audio.sfxCodexOpen();
        }
    }

    close() {
        this.isOpen = false;
        this.isTyping = false;
        if (this.audio && typeof this.audio.playTone === 'function') {
            this.audio.playTone(330, 'sine', 0.1, 0.1);
        }
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    startExam() {
        this.examStatus = 'IN_PROGRESS';
        this.timeRemaining = this.blueprint.metadata.durationSeconds;
        this.examResult = null;
        console.log('[ExamSimulator] KTU 60-Mark Examination Commenced. Duration: 2h 30m (9000s).');
        if (this.audio && typeof this.audio.sfxPing === 'function') {
            this.audio.sfxPing();
        }
    }

    update(dt) {
        if (!this.isOpen && this.examStatus !== 'IN_PROGRESS') return;

        if (this.examStatus === 'IN_PROGRESS') {
            this.timeRemaining = Math.max(0, this.timeRemaining - dt);
            if (this.timeRemaining <= 0) {
                console.warn('[ExamSimulator] TIME EXPIRED! Auto-submitting exam paper.');
                this.submitExam();
            }
        }
    }

    // ----------------------------------------------------------------------
    // Auto-Fill Model Answers (For testing, studying, and verification)
    // ----------------------------------------------------------------------
    autoFillModelAnswers() {
        // Part A: Select recommended option and populate model text
        this.blueprint.partA.forEach((q, idx) => {
            this.partAAnswers[idx] = q.correctOptionIndex;
            this.partATextAnswers[idx] = q.modelAnswer;
        });

        // Part B: Populate model answer for the chosen alternative
        for (let modIdx = 0; modIdx < 4; modIdx++) {
            const pair = this.blueprint.partB[modIdx];
            const choice = this.partBChoices[modIdx] === 'B' ? pair.choiceB : pair.choiceA;
            this.partBAnswers[modIdx] = choice.modelAnswer;
        }

        if (this.audio && typeof this.audio.sfxAccessGranted === 'function') {
            this.audio.sfxAccessGranted();
        }
        console.log('[ExamSimulator] University Model Answers auto-filled across all 60 marks.');
    }

    clearAllAnswers() {
        this.partAAnswers = new Array(8).fill(-1);
        this.partATextAnswers = new Array(8).fill('');
        this.partBAnswers = new Array(4).fill('');
        this.examResult = null;
        if (this.audio && typeof this.audio.playTone === 'function') {
            this.audio.playTone(220, 'sawtooth', 0.15, 0.15);
        }
        console.log('[ExamSimulator] All candidate answers cleared.');
    }

    // ----------------------------------------------------------------------
    // Natural Language Keyword Semantic Evaluator for Part B
    // ----------------------------------------------------------------------
    evaluatePartBAnswer(answerText, questionObj) {
        const text = (answerText || '').toLowerCase();
        const compactText = text.replace(/[\s\-_=:\.]/g, '');
        let totalEarned = 0.0;
        const subReports = [];
        const detectedKeywords = [];
        const missingKeywords = [];

        function matchPart(part) {
            if (/^\d+$/.test(part)) {
                const re = new RegExp('(\\b|\\D)' + part + '(\\b|\\D)');
                return re.test(text);
            }
            return text.includes(part);
        }

        function isKeywordMatch(kw) {
            const clean = kw.toLowerCase().trim();
            if (text.includes(clean)) return true;
            const compactKw = clean.replace(/[\s\-_=:\.]/g, '');
            if (compactKw.length >= 3 && compactText.includes(compactKw)) return true;
            if (clean.includes(' ')) {
                const parts = clean.split(' ').filter(p => p.length > 2);
                if (parts.length > 0 && parts.every(p => matchPart(p))) return true;
            }
            return false;
        }

        questionObj.subdivisions.forEach(sub => {
            let matched = 0;
            sub.keywords.forEach(kw => {
                if (isKeywordMatch(kw)) {
                    matched++;
                    if (!detectedKeywords.includes(kw.toUpperCase())) detectedKeywords.push(kw.toUpperCase());
                } else {
                    if (!missingKeywords.includes(kw.toUpperCase())) missingKeywords.push(kw.toUpperCase());
                }
            });

            const ratio = sub.keywords.length > 0 ? matched / sub.keywords.length : 0;
            let earned = 0.0;
            if (ratio >= 0.5) {
                earned = sub.maxMarks;
            } else if (ratio >= 0.25) {
                earned = Math.round((sub.maxMarks * 0.6) * 10) / 10;
            } else if (ratio > 0) {
                earned = Math.round((sub.maxMarks * 0.3) * 10) / 10;
            }

            subReports.push({
                title: sub.title,
                maxMarks: sub.maxMarks,
                earned: earned,
                ratio: ratio
            });
            totalEarned += earned;
        });

        totalEarned = Math.min(questionObj.marks, Math.round(totalEarned * 10) / 10);

        return {
            marksEarned: totalEarned,
            maxMarks: questionObj.marks,
            subdivisions: subReports,
            detectedKeywords: detectedKeywords,
            missingKeywords: missingKeywords.filter(k => !detectedKeywords.includes(k)),
            examinerInsight: questionObj.examinerInsight
        };
    }

    // ----------------------------------------------------------------------
    // Examination Submission & Grading Pipeline
    // ----------------------------------------------------------------------
    submitExam() {
        this.examStatus = 'SUBMITTED';

        let partAScore = 0.0;
        const partAReports = [];

        // Grade Part A (8 questions x 3 Marks = 24 Marks)
        this.blueprint.partA.forEach((q, idx) => {
            const chosen = this.partAAnswers[idx];
            const written = this.partATextAnswers[idx] || '';
            let earned = 0.0;

            if (chosen === q.correctOptionIndex) {
                earned = 3.0;
            } else if (written.length > 20) {
                // If student typed a written answer, evaluate keywords
                const text = written.toLowerCase();
                let kwMatches = 0;
                q.keywords.forEach(kw => {
                    if (text.includes(kw.toLowerCase())) kwMatches++;
                });
                const ratio = q.keywords.length > 0 ? kwMatches / q.keywords.length : 0;
                earned = ratio >= 0.5 ? 3.0 : (ratio >= 0.25 ? 1.8 : (ratio > 0 ? 0.9 : 0.0));
            }

            partAScore += earned;
            partAReports.push({
                qNum: q.qNum,
                module: q.module,
                title: q.title,
                maxMarks: 3.0,
                earned: earned,
                isCorrect: earned >= 2.5
            });
        });

        // Grade Part B (4 questions x 9 Marks = 36 Marks)
        let partBScore = 0.0;
        const partBReports = [];
        const moduleScores = { 1: 0.0, 2: 0.0, 3: 0.0, 4: 0.0 };

        // Accumulate Part A by module
        partAReports.forEach(r => {
            moduleScores[r.module] = (moduleScores[r.module] || 0) + r.earned;
        });

        for (let modIdx = 0; modIdx < 4; modIdx++) {
            const pair = this.blueprint.partB[modIdx];
            const choiceLetter = this.partBChoices[modIdx];
            const chosenQ = choiceLetter === 'B' ? pair.choiceB : pair.choiceA;
            const studentText = this.partBAnswers[modIdx] || '';

            const evalRes = this.evaluatePartBAnswer(studentText, chosenQ);
            partBScore += evalRes.marksEarned;
            moduleScores[modIdx + 1] = (moduleScores[modIdx + 1] || 0) + evalRes.marksEarned;

            partBReports.push({
                module: modIdx + 1,
                choiceLetter: choiceLetter,
                qNum: chosenQ.qNum,
                title: chosenQ.title,
                maxMarks: 9.0,
                earned: evalRes.marksEarned,
                details: evalRes
            });
        }

        const totalEarned = Math.min(60.0, Math.round((partAScore + partBScore) * 10) / 10);
        const percentage = Math.round((totalEarned / 60.0) * 100);

        // KTU Letter Grade Scale
        let grade = 'F';
        let gradeLabel = 'FAIL (BELOW 40% PASSING CRITERIA)';
        if (percentage >= 90) {
            grade = 'S';
            gradeLabel = 'OUTSTANDING S-GRADE MASTERY (100% ACCREDITATION)';
        } else if (percentage >= 85) {
            grade = 'A+';
            gradeLabel = 'EXCELLENT A+ DISTINCTION';
        } else if (percentage >= 80) {
            grade = 'A';
            gradeLabel = 'FIRST CLASS DISTINCTION';
        } else if (percentage >= 70) {
            grade = 'B+';
            gradeLabel = 'VERY GOOD B+ GRADE';
        } else if (percentage >= 60) {
            grade = 'B';
            gradeLabel = 'GOOD B GRADE';
        } else if (percentage >= 50) {
            grade = 'C';
            gradeLabel = 'AVERAGE C GRADE';
        } else if (percentage >= 40) {
            grade = 'P';
            gradeLabel = 'PASS P GRADE (MINIMUM CLEARANCE)';
        }

        // Recommendations based on weaknesses
        const recommendations = [];
        if (moduleScores[1] < 10) recommendations.push('Revise Module 1: DNS 5-Hop Hierarchy & P2P BitTorrent Rarest-First Strategy.');
        if (moduleScores[2] < 10) recommendations.push('Revise Module 2: TCP Handshake Sequence Tracing ($1000..1550) & Dijkstra Least-Cost.');
        if (moduleScores[3] < 10) recommendations.push('Revise Module 3: CRC Modulo-2 Division (Divisor 1101, FCS 001) & CSMA/CD 64B Frame.');
        if (moduleScores[4] < 10) recommendations.push('Revise Module 4: SNMP OID Tree (.0 Scalar Suffix) & ASN.1 SMI Grammar Rules.');
        if (recommendations.length === 0) {
            recommendations.push('Supreme Performance! All 4 syllabus modules demonstrate flawless engineering proficiency.');
        }

        this.examResult = {
            timestamp: new Date().toISOString(),
            candidate: 'UNIT 0xVOID',
            totalEarned: totalEarned,
            maxMarks: 60.0,
            percentage: percentage,
            grade: grade,
            gradeLabel: gradeLabel,
            isPassed: totalEarned >= this.blueprint.metadata.passingMarks,
            partAScore: Math.round(partAScore * 10) / 10,
            partBScore: Math.round(partBScore * 10) / 10,
            moduleScores: moduleScores,
            partAReports: partAReports,
            partBReports: partBReports,
            recommendations: recommendations
        };

        // Award total exam marks to GameState
        if (this.gameState) {
            this.gameState.state.examProgress.marksEarned = Math.max(
                this.gameState.state.examProgress.marksEarned,
                Math.round(totalEarned)
            );
            this.gameState.emit('scoreUpdate', this.gameState.state.examProgress);
        }

        // Audio feedback
        if (this.audio) {
            if (this.examResult.isPassed) {
                if (typeof this.audio.sfxAccessGranted === 'function') this.audio.sfxAccessGranted();
            } else {
                if (typeof this.audio.sfxAccessDenied === 'function') this.audio.sfxAccessDenied();
            }
        }

        this.activeSection = 'REPORT_CARD';
        console.log(`[ExamSimulator] Exam Graded. Total: ${totalEarned} / 60.0 Marks (${percentage}%) - Grade: ${grade}`);
        return this.examResult;
    }

    // ----------------------------------------------------------------------
    // Input Handling
    // ----------------------------------------------------------------------
    handleInput(input) {
        if (!this.isOpen) return false;

        // Esc or X toggles / closes
        if (input.isJustPressed('escape')) {
            this.close();
            return true;
        }

        // Section Switching (1: Part A, 2: Part B, 3: Report Card)
        if (input.isJustPressed('1')) {
            this.activeSection = 'PART_A';
            this.scrollOffset = 0;
            if (this.audio) this.audio.sfxPing();
            return true;
        }
        if (input.isJustPressed('2')) {
            this.activeSection = 'PART_B';
            this.scrollOffset = 0;
            if (this.audio) this.audio.sfxPing();
            return true;
        }
        if (input.isJustPressed('3')) {
            if (this.examResult) {
                this.activeSection = 'REPORT_CARD';
                this.scrollOffset = 0;
                if (this.audio) this.audio.sfxPing();
                return true;
            }
        }

        // Part A Question Navigation
        if (this.activeSection === 'PART_A') {
            if (input.isJustPressed('arrowleft') || input.isJustPressed('[')) {
                this.selectedPartAIndex = (this.selectedPartAIndex - 1 + 8) % 8;
                return true;
            }
            if (input.isJustPressed('arrowright') || input.isJustPressed(']')) {
                this.selectedPartAIndex = (this.selectedPartAIndex + 1) % 8;
                return true;
            }
            // Selecting option via digits 1, 2, 3 if not switching section
            if (input.isJustPressed('a')) { this.partAAnswers[this.selectedPartAIndex] = 0; return true; }
            if (input.isJustPressed('b')) { this.partAAnswers[this.selectedPartAIndex] = 1; return true; }
            if (input.isJustPressed('c')) { this.partAAnswers[this.selectedPartAIndex] = 2; return true; }
        }

        // Part B Navigation
        if (this.activeSection === 'PART_B') {
            if (input.isJustPressed('arrowleft') || input.isJustPressed('[')) {
                this.selectedModuleIndex = (this.selectedModuleIndex - 1 + 4) % 4;
                return true;
            }
            if (input.isJustPressed('arrowright') || input.isJustPressed(']')) {
                this.selectedModuleIndex = (this.selectedModuleIndex + 1) % 4;
                return true;
            }
            // Toggle Alternative Choice between A and B
            if (input.isJustPressed('q')) {
                const current = this.partBChoices[this.selectedModuleIndex];
                this.partBChoices[this.selectedModuleIndex] = current === 'A' ? 'B' : 'A';
                return true;
            }
        }

        return false;
    }

    // ----------------------------------------------------------------------
    // Mouse Click Handling
    // ----------------------------------------------------------------------
    handleClick(screenX, screenY) {
        if (!this.isOpen) return false;

        const modalX = 60;
        const modalY = 40;
        const modalW = 1160;
        const modalH = 640;

        // Close button [X]
        if (screenX >= modalX + modalW - 40 && screenX <= modalX + modalW - 10 &&
            screenY >= modalY + 10 && screenY <= modalY + 36) {
            this.close();
            return true;
        }

        // Top Navigation Tabs
        const tabY = modalY + 54;
        const tabH = 32;

        // [1] PART A TAB (24M)
        if (screenX >= modalX + 20 && screenX <= modalX + 220 && screenY >= tabY && screenY <= tabY + tabH) {
            this.activeSection = 'PART_A';
            this.scrollOffset = 0;
            if (this.audio) this.audio.sfxPing();
            return true;
        }

        // [2] PART B TAB (36M)
        if (screenX >= modalX + 230 && screenX <= modalX + 430 && screenY >= tabY && screenY <= tabY + tabH) {
            this.activeSection = 'PART_B';
            this.scrollOffset = 0;
            if (this.audio) this.audio.sfxPing();
            return true;
        }

        // [3] REPORT CARD TAB
        if (screenX >= modalX + 440 && screenX <= modalX + 640 && screenY >= tabY && screenY <= tabY + tabH) {
            if (this.examResult) {
                this.activeSection = 'REPORT_CARD';
                this.scrollOffset = 0;
                if (this.audio) this.audio.sfxPing();
                return true;
            }
        }

        // Top Action Buttons
        // [AUTO-FILL MODEL ANSWERS]
        if (screenX >= modalX + modalW - 390 && screenX <= modalX + modalW - 200 && screenY >= tabY && screenY <= tabY + tabH) {
            this.autoFillModelAnswers();
            return true;
        }

        // [SUBMIT EXAM]
        if (screenX >= modalX + modalW - 190 && screenX <= modalX + modalW - 20 && screenY >= tabY && screenY <= tabY + tabH) {
            this.submitExam();
            return true;
        }

        // Section Specific Clicks
        if (this.activeSection === 'PART_A') {
            // Part A Question Buttons (Q1 - Q8)
            const palY = tabY + 44;
            const btnW = 130;
            const btnH = 34;
            for (let i = 0; i < 8; i++) {
                const bx = modalX + 20 + i * (btnW + 10);
                if (screenX >= bx && screenX <= bx + btnW && screenY >= palY && screenY <= palY + btnH) {
                    this.selectedPartAIndex = i;
                    if (this.audio) this.audio.sfxPing();
                    return true;
                }
            }

            // Options (A, B, C)
            const curQ = this.blueprint.partA[this.selectedPartAIndex];
            const optStartY = palY + 140;
            const optH = 50;
            for (let optIdx = 0; optIdx < curQ.options.length; optIdx++) {
                const oy = optStartY + optIdx * (optH + 12);
                if (screenX >= modalX + 40 && screenX <= modalX + modalW - 40 && screenY >= oy && screenY <= oy + optH) {
                    this.partAAnswers[this.selectedPartAIndex] = optIdx;
                    if (this.audio) this.audio.playTone(440 + optIdx * 110, 'sine', 0.08, 0.15);
                    return true;
                }
            }
        } else if (this.activeSection === 'PART_B') {
            // Module Selector Tabs (Mod 1 - Mod 4)
            const palY = tabY + 44;
            const btnW = 160;
            const btnH = 34;
            for (let m = 0; m < 4; m++) {
                const bx = modalX + 20 + m * (btnW + 12);
                if (screenX >= bx && screenX <= bx + btnW && screenY >= palY && screenY <= palY + btnH) {
                    this.selectedModuleIndex = m;
                    if (this.audio) this.audio.sfxPing();
                    return true;
                }
            }

            // Choice A vs Choice B toggle buttons
            const choiceBtnY = palY + 48;
            // Choice A Button
            if (screenX >= modalX + 20 && screenX <= modalX + 260 && screenY >= choiceBtnY && screenY <= choiceBtnY + 36) {
                this.partBChoices[this.selectedModuleIndex] = 'A';
                if (this.audio) this.audio.sfxPing();
                return true;
            }
            // Choice B Button
            if (screenX >= modalX + 270 && screenX <= modalX + 510 && screenY >= choiceBtnY && screenY <= choiceBtnY + 36) {
                this.partBChoices[this.selectedModuleIndex] = 'B';
                if (this.audio) this.audio.sfxPing();
                return true;
            }

            // Text Area Focus
            const textY = choiceBtnY + 160;
            const textH = 260;
            if (screenX >= modalX + 20 && screenX <= modalX + modalW - 40 && screenY >= textY && screenY <= textY + textH) {
                this.isTyping = true;
                return true;
            }
        }

        return false;
    }

    // ----------------------------------------------------------------------
    // Canvas Renderer
    // ----------------------------------------------------------------------
    render(ctx, screenWidth = 1280, screenHeight = 720) {
        if (!this.isOpen) return;

        ctx.save();

        // Dark Backdrop
        ctx.fillStyle = 'rgba(2, 6, 12, 0.94)';
        ctx.fillRect(0, 0, screenWidth, screenHeight);

        const modalX = 60;
        const modalY = 40;
        const modalW = 1160;
        const modalH = 640;

        // Modal Frame & Outer Glow
        ctx.fillStyle = 'rgba(5, 15, 25, 0.98)';
        ctx.strokeStyle = '#00ffcc';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00ffcc';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(modalX, modalY, modalW, modalH, 6) : ctx.rect(modalX, modalY, modalW, modalH);
        ctx.fill();
        ctx.stroke();

        // ------------------------------------------------------------------
        // Header & Countdown Timer (Clean Modern Typography)
        // ------------------------------------------------------------------
        const FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#38bdf8';
        ctx.font = `bold 17px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText('🎓 KTU PCCST501 (2024 SCHEME) // FULL 60-MARK SIMULATED EXAM', modalX + 20, modalY + 26);

        // Timer Box
        const mins = Math.floor(this.timeRemaining / 60);
        const secs = Math.floor(this.timeRemaining % 60);
        const hrs = Math.floor(mins / 60);
        const remMins = mins % 60;
        const timeStr = `${hrs}:${remMins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

        let timerColor = '#38bdf8';
        if (this.timeRemaining <= 300) {
            timerColor = '#ef4444'; // < 5m critical
        } else if (this.timeRemaining <= 1800) {
            timerColor = '#f59e0b'; // < 30m warning
        }

        ctx.fillStyle = timerColor;
        ctx.font = `bold 15px ${FONT_SANS}`;
        ctx.textAlign = 'right';
        ctx.fillText(`⏱️ TIME REMAINING: ${timeStr} | TOTAL: 60 MARKS`, modalX + modalW - 60, modalY + 26);

        // Close [X] Button
        ctx.fillStyle = '#f43f5e';
        ctx.font = `bold 18px ${FONT_SANS}`;
        ctx.textAlign = 'center';
        ctx.fillText('✕', modalX + modalW - 24, modalY + 26);

        // ------------------------------------------------------------------
        // Navigation Tabs & Action Buttons
        // ------------------------------------------------------------------
        const tabY = modalY + 54;
        const tabH = 32;

        const drawTab = (title, active, x, w, color = '#38bdf8') => {
            ctx.fillStyle = active ? color : 'rgba(15, 23, 42, 0.85)';
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect ? ctx.roundRect(x, tabY, w, tabH, 4) : ctx.rect(x, tabY, w, tabH);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = active ? '#000000' : color;
            ctx.font = `bold 13px ${FONT_SANS}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(title, x + w / 2, tabY + tabH / 2);
        };

        // Tab 1: Part A (24M)
        drawTab('[1] PART A (24 MARKS)', this.activeSection === 'PART_A', modalX + 20, 200, '#38bdf8');

        // Tab 2: Part B (36M)
        drawTab('[2] PART B (36 MARKS)', this.activeSection === 'PART_B', modalX + 230, 200, '#60a5fa');

        // Tab 3: Report Card
        if (this.examResult) {
            drawTab('[3] REPORT CARD', this.activeSection === 'REPORT_CARD', modalX + 440, 190, '#c084fc');
        }

        // Action Buttons: Auto-Fill & Submit
        drawTab('⚡ AUTO-FILL MODEL ANSWERS', false, modalX + modalW - 390, 185, '#fbbf24');
        drawTab('🏁 SUBMIT EXAM', false, modalX + modalW - 190, 170, '#4ade80');

        // Divider
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(modalX + 20, tabY + tabH + 8);
        ctx.lineTo(modalX + modalW - 20, tabY + tabH + 8);
        ctx.stroke();

        // ------------------------------------------------------------------
        // Section Rendering
        // ------------------------------------------------------------------
        if (this.activeSection === 'PART_A') {
            this.renderPartA(ctx, modalX, modalY, modalW, modalH, tabY + tabH + 16);
        } else if (this.activeSection === 'PART_B') {
            this.renderPartB(ctx, modalX, modalY, modalW, modalH, tabY + tabH + 16);
        } else if (this.activeSection === 'REPORT_CARD') {
            this.renderReportCard(ctx, modalX, modalY, modalW, modalH, tabY + tabH + 16);
        }

        ctx.restore();
    }

    // ----------------------------------------------------------------------
    // Render Part A View
    // ----------------------------------------------------------------------
    renderPartA(ctx, modalX, modalY, modalW, modalH, startY) {
        const FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

        // Question Selection Strip (Q1 - Q8)
        const btnW = 130;
        const btnH = 32;
        for (let i = 0; i < 8; i++) {
            const bx = modalX + 20 + i * (btnW + 10);
            const isSelected = this.selectedPartAIndex === i;
            const hasAnswer = this.partAAnswers[i] !== -1;

            ctx.fillStyle = isSelected ? '#38bdf8' : (hasAnswer ? 'rgba(56, 189, 248, 0.25)' : 'rgba(15, 23, 42, 0.8)');
            ctx.strokeStyle = isSelected ? '#38bdf8' : 'rgba(56, 189, 248, 0.35)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect ? ctx.roundRect(bx, startY, btnW, btnH, 4) : ctx.rect(bx, startY, btnW, btnH);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = isSelected ? '#000000' : '#38bdf8';
            ctx.font = `bold 12px ${FONT_SANS}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const modNum = Math.floor(i / 2) + 1;
            ctx.fillText(`Q${i + 1} (M${modNum}) [3M]`, bx + btnW / 2, startY + btnH / 2);
        }

        // Active Question Card
        const curQ = this.blueprint.partA[this.selectedPartAIndex];
        const cardY = startY + btnH + 14;
        const cardW = modalW - 40;
        const cardH = modalH - (cardY - modalY) - 20;

        ctx.fillStyle = 'rgba(11, 20, 38, 0.95)';
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(modalX + 20, cardY, cardW, cardH, 6) : ctx.rect(modalX + 20, cardY, cardW, cardH);
        ctx.fill();
        ctx.stroke();

        // Question Title & Question Prompt
        ctx.fillStyle = '#fbbf24';
        ctx.font = `bold 16px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(`QUESTION ${curQ.qNum} [MODULE ${curQ.module} COMPULSORY // 3.0 MARKS]: ${curQ.title}`, modalX + 40, cardY + 20);

        ctx.fillStyle = '#f8fafc';
        ctx.font = `15px ${FONT_SANS}`;
        ctx.fillText(curQ.question, modalX + 40, cardY + 48);

        // Render Options (A, B, C)
        const optStartY = cardY + 85;
        const optH = 54;
        const letters = ['(A)', '(B)', '(C)'];

        curQ.options.forEach((optText, optIdx) => {
            const oy = optStartY + optIdx * (optH + 14);
            const isChosen = this.partAAnswers[this.selectedPartAIndex] === optIdx;

            ctx.fillStyle = isChosen ? 'rgba(56, 189, 248, 0.22)' : 'rgba(15, 23, 42, 0.65)';
            ctx.strokeStyle = isChosen ? '#38bdf8' : 'rgba(56, 189, 248, 0.3)';
            ctx.lineWidth = isChosen ? 2 : 1;
            ctx.beginPath();
            ctx.roundRect ? ctx.roundRect(modalX + 40, oy, cardW - 40, optH, 4) : ctx.rect(modalX + 40, oy, cardW - 40, optH);
            ctx.fill();
            ctx.stroke();

            // Option Letter Radio
            ctx.fillStyle = isChosen ? '#38bdf8' : 'rgba(56, 189, 248, 0.6)';
            ctx.font = `bold 14px ${FONT_SANS}`;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${letters[optIdx]} ${isChosen ? '●' : '○'}`, modalX + 54, oy + optH / 2);

            // Option Text
            ctx.fillStyle = isChosen ? '#ffffff' : '#e2e8f0';
            ctx.font = `14px ${FONT_SANS}`;
            // Wrap text if needed
            ctx.fillText(optText.substring(0, 110), modalX + 110, oy + optH / 2 - 8);
            if (optText.length > 110) {
                ctx.fillText(optText.substring(110), modalX + 110, oy + optH / 2 + 10);
            }
        });

        // Instructions Footer
        ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.font = `italic 12px ${FONT_SANS}`;
        ctx.fillText('💡 Click an option or press [A], [B], [C] to select. Use [← / →] to navigate questions.', modalX + 40, cardY + cardH - 24);
    }

    // ----------------------------------------------------------------------
    // Render Part B View
    // ----------------------------------------------------------------------
    renderPartB(ctx, modalX, modalY, modalW, modalH, startY) {
        const FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

        // Module Selectors (Mod 1 - Mod 4)
        const btnW = 160;
        const btnH = 32;
        for (let m = 0; m < 4; m++) {
            const bx = modalX + 20 + m * (btnW + 12);
            const isSelected = this.selectedModuleIndex === m;

            ctx.fillStyle = isSelected ? '#60a5fa' : 'rgba(15, 23, 42, 0.8)';
            ctx.strokeStyle = isSelected ? '#60a5fa' : 'rgba(96, 165, 250, 0.35)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect ? ctx.roundRect(bx, startY, btnW, btnH, 4) : ctx.rect(bx, startY, btnW, btnH);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = isSelected ? '#000000' : '#60a5fa';
            ctx.font = `bold 12px ${FONT_SANS}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`MODULE ${m + 1} CHOICE [9M]`, bx + btnW / 2, startY + btnH / 2);
        }

        // Alternative Toggle: Choice A vs Choice B
        const pair = this.blueprint.partB[this.selectedModuleIndex];
        const activeChoice = this.partBChoices[this.selectedModuleIndex];
        const currentQ = activeChoice === 'B' ? pair.choiceB : pair.choiceA;

        const choiceY = startY + btnH + 12;
        const choiceBtnW = 250;
        const choiceBtnH = 34;

        // Button A
        const isChoiceA = activeChoice === 'A';
        ctx.fillStyle = isChoiceA ? '#38bdf8' : 'rgba(15, 23, 42, 0.8)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(modalX + 20, choiceY, choiceBtnW, choiceBtnH, 4) : ctx.rect(modalX + 20, choiceY, choiceBtnW, choiceBtnH);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isChoiceA ? '#000000' : '#38bdf8';
        ctx.font = `bold 13px ${FONT_SANS}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`OPTION 1: Q${pair.choiceA.qNum} (Choice A)`, modalX + 20 + choiceBtnW / 2, choiceY + choiceBtnH / 2);

        // Button B
        const isChoiceB = activeChoice === 'B';
        ctx.fillStyle = isChoiceB ? '#38bdf8' : 'rgba(15, 23, 42, 0.8)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(modalX + 280, choiceY, choiceBtnW, choiceBtnH, 4) : ctx.rect(modalX + 280, choiceY, choiceBtnW, choiceBtnH);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isChoiceB ? '#000000' : '#38bdf8';
        ctx.font = `bold 13px ${FONT_SANS}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`OPTION 2: Q${pair.choiceB.qNum} (Choice B)`, modalX + 280 + choiceBtnW / 2, choiceY + choiceBtnH / 2);

        // Question Details Panel
        const panelY = choiceY + choiceBtnH + 12;
        const panelW = modalW - 40;
        const panelH = modalH - (panelY - modalY) - 20;

        ctx.fillStyle = 'rgba(11, 20, 38, 0.95)';
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(modalX + 20, panelY, panelW, panelH, 6) : ctx.rect(modalX + 20, panelY, panelW, panelH);
        ctx.fill();
        ctx.stroke();

        // Question Header
        ctx.fillStyle = '#38bdf8';
        ctx.font = `bold 15px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(`QUESTION ${currentQ.qNum} [MODULE ${pair.module} // CHOICE ${activeChoice} // 9.0 MARKS]: ${currentQ.title}`, modalX + 36, panelY + 16);

        // Subdivisions list
        let subY = panelY + 40;
        currentQ.subdivisions.forEach(s => {
            ctx.fillStyle = '#fbbf24';
            ctx.font = `bold 12px ${FONT_SANS}`;
            ctx.fillText(`• ${s.title} (${s.maxMarks.toFixed(1)} Marks)`, modalX + 36, subY);
            subY += 20;
        });

        // Answer preview / input text area box
        const textY = subY + 6;
        const textH = panelH - (textY - panelY) - 34;
        ctx.fillStyle = 'rgba(2, 6, 14, 0.85)';
        ctx.strokeStyle = this.isTyping ? '#38bdf8' : 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(modalX + 36, textY, panelW - 32, textH, 4) : ctx.rect(modalX + 36, textY, panelW - 32, textH);
        ctx.fill();
        ctx.stroke();

        // Render current student text (wrapped)
        const studentText = this.partBAnswers[this.selectedModuleIndex] || '';
        ctx.fillStyle = studentText ? '#ffffff' : 'rgba(148, 163, 184, 0.6)';
        ctx.font = `13px ${FONT_SANS}`;
        const displayLines = studentText ? studentText.split('\n') : ['[Answer empty. Click "AUTO-FILL MODEL ANSWERS" or paste solution to evaluate against official KTU valuation rubric]'];

        let lineY = textY + 12;
        for (let i = 0; i < Math.min(12, displayLines.length); i++) {
            ctx.fillText(displayLines[i].substring(0, 120), modalX + 46, lineY);
            lineY += 18;
        }

        // Word count & Examiner Insight
        ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.font = `italic 12px ${FONT_SANS}`;
        ctx.fillText(`Word Count: ${studentText ? studentText.split(/\s+/).length : 0} | Press [Q] to switch between Choice A and Choice B`, modalX + 36, panelY + panelH - 18);
    }

    // ----------------------------------------------------------------------
    // Render Final Exam Report Card View
    // ----------------------------------------------------------------------
    renderReportCard(ctx, modalX, modalY, modalW, modalH, startY) {
        const FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        const res = this.examResult;
        if (!res) return;

        const cardW = modalW - 40;
        const cardH = modalH - (startY - modalY) - 20;

        ctx.fillStyle = 'rgba(11, 20, 38, 0.95)';
        ctx.strokeStyle = res.isPassed ? '#4ade80' : '#f43f5e';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(modalX + 20, startY, cardW, cardH, 6) : ctx.rect(modalX + 20, startY, cardW, cardH);
        ctx.fill();
        ctx.stroke();

        // Banner Header
        ctx.fillStyle = res.isPassed ? '#4ade80' : '#f43f5e';
        ctx.font = `bold 18px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(`🏆 OFFICIAL KTU PERFORMANCE TRANSCRIPT: ${res.gradeLabel}`, modalX + 40, startY + 20);

        // Grade Badge (Right aligned)
        const badgeX = modalX + cardW - 140;
        const badgeY = startY + 16;
        ctx.fillStyle = res.isPassed ? '#22c55e' : '#f43f5e';
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(badgeX, badgeY, 120, 50, 6) : ctx.rect(badgeX, badgeY, 120, 50);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = `bold 22px ${FONT_SANS}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`GRADE ${res.grade}`, badgeX + 60, badgeY + 25);

        // Candidate & Exam Info
        ctx.fillStyle = '#cbd5e1';
        ctx.font = `13px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.fillText(`Candidate: ${res.candidate} | Course: PCCST501 Computer Networks | Timestamp: ${res.timestamp.substring(0, 19).replace('T', ' ')}`, modalX + 40, startY + 48);

        // Overall Score Highlight
        ctx.fillStyle = '#fbbf24';
        ctx.font = `bold 16px ${FONT_SANS}`;
        ctx.fillText(`FINAL EXAM SCORE: ${res.totalEarned.toFixed(1)} / 60.0 MARKS (${res.percentage}%) | STATUS: ${res.isPassed ? 'PASSED (QUALIFIED FOR S-GRADE DEGREE)' : 'FAILED'}`, modalX + 40, startY + 76);

        // Module Breakdown Grid
        const gridY = startY + 105;
        const colW = (cardW - 40) / 4;
        for (let m = 1; m <= 4; m++) {
            const gx = modalX + 40 + (m - 1) * colW;
            ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect ? ctx.roundRect(gx, gridY, colW - 12, 60, 4) : ctx.rect(gx, gridY, colW - 12, 60);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#38bdf8';
            ctx.font = `bold 12px ${FONT_SANS}`;
            ctx.fillText(`MODULE ${m}`, gx + 12, gridY + 16);

            const mScore = res.moduleScores[m] || 0.0;
            ctx.fillStyle = mScore >= 12.0 ? '#4ade80' : (mScore >= 7.0 ? '#fbbf24' : '#f43f5e');
            ctx.font = `bold 17px ${FONT_SANS}`;
            ctx.fillText(`${mScore.toFixed(1)} / 15.0 M`, gx + 12, gridY + 40);
        }

        // Section Breakdown: Part A & Part B
        const secY = gridY + 74;
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold 14px ${FONT_SANS}`;
        ctx.fillText(`• PART A COMPULSORY: ${res.partAScore.toFixed(1)} / 24.0 Marks (8 Questions Attempted)`, modalX + 40, secY);
        ctx.fillText(`• PART B MODULE CHOICES: ${res.partBScore.toFixed(1)} / 36.0 Marks (4 Choices Evaluated via Semantic Rubric)`, modalX + 40, secY + 22);

        // Priority Recommendations & Examiner Insights
        const recY = secY + 54;
        ctx.fillStyle = '#fbbf24';
        ctx.font = `bold 14px ${FONT_SANS}`;
        ctx.fillText('📋 EXAMINER PRIORITY REVISION RECOMMENDATIONS:', modalX + 40, recY);

        let itemY = recY + 24;
        res.recommendations.forEach(rec => {
            ctx.fillStyle = '#e2e8f0';
            ctx.font = `13px ${FONT_SANS}`;
            ctx.fillText(`  ➜ ${rec}`, modalX + 40, itemY);
            itemY += 22;
        });

        // Footer Instructions
        ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.font = `italic 12px ${FONT_SANS}`;
        ctx.fillText('💡 Score has been updated in GameState. Press [P] or [Esc] to exit simulator and resume exploration.', modalX + 40, startY + cardH - 14);
    }
}

// Module export
if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.ExamSimulator = ExamSimulator;
    window.GridEngine.KTU_EXAM_BLUEPRINT = KTU_EXAM_BLUEPRINT;
    window.ExamSimulator = ExamSimulator;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ExamSimulator, KTU_EXAM_BLUEPRINT };
}
