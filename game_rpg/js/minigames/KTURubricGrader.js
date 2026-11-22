// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// KTURubricGrader.js - Comprehensive KTU 9-Mark Valuation Rubric Auto-Grader
// Natural Language & Semantic Technical Answer Evaluator
// ==========================================================================

const KTU9MarkQuestions = [
    // ----------------------------------------------------------------------
    // QUESTION 1 (MODULE 1): DNS RESOLUTION HIERARCHY & QUERY TYPES
    // ----------------------------------------------------------------------
    {
        id: 'q1_dns_hierarchy',
        module: 1,
        title: 'DNS Resolution Hierarchy & Iterative vs Recursive Queries',
        marks: 9.0,
        subdivisions: [
            {
                id: 'sub_a',
                title: 'Part (a): 4-Tier DNS Architecture & Resolution Hierarchy',
                maxMarks: 4.0,
                rubrics: [
                    { desc: 'Explains Root DNS servers (13 IP identities, root dot ".") and TLD servers (.com, .org, .corp)', marks: 1.5, keywords: ['root', 'tld', 'top-level'] },
                    { desc: 'Explains Authoritative DNS servers and Local DNS Resolvers (ISP/enterprise cache)', marks: 1.5, keywords: ['authoritative', 'local resolver', 'cache'] },
                    { desc: 'Specifies Port 53 UDP for normal queries and TCP for zone transfers >512 bytes', marks: 1.0, keywords: ['port 53', 'udp', '512'] }
                ]
            },
            {
                id: 'sub_b',
                title: 'Part (b): Iterative vs Recursive Query Comparison & Diagram',
                maxMarks: 3.0,
                rubrics: [
                    { desc: 'Defines Iterative query: server returns referral address of next server down the hierarchy', marks: 1.5, keywords: ['iterative', 'referral'] },
                    { desc: 'Defines Recursive query: server takes complete burden of resolving and returns final IP', marks: 1.5, keywords: ['recursive', 'burden'] }
                ]
            },
            {
                id: 'sub_c',
                title: 'Part (c): Core Resource Record (RR) Types (A, AAAA, CNAME, MX)',
                maxMarks: 2.0,
                rubrics: [
                    { desc: 'A (IPv4 32-bit) and AAAA (IPv6 128-bit) mapping host to address', marks: 1.0, keywords: ['a record', 'aaaa', 'ipv4', 'ipv6'] },
                    { desc: 'CNAME (Canonical alias) and MX (Mail exchange server hostname)', marks: 1.0, keywords: ['cname', 'mx', 'canonical', 'alias'] }
                ]
            }
        ],
        examinerInsight: 'Warning: Stating that DNS only uses UDP loses 1.0 mark! KTU answer keys explicitly look for TCP Port 53 for responses exceeding 512 bytes and zone transfers.',
        modelAnswer: `(a) DNS Architecture:
DNS is a hierarchical, decentralized naming system operating primarily over UDP Port 53 (and TCP Port 53 for responses >512B and zone transfers).
1. Root DNS Servers: Top of the tree ("."); 13 root server IP identities; direct queries to relevant TLD servers.
2. Top-Level Domain (TLD) Servers: Manage generic (.com, .org) and country-code (.in, .uk) domains.
3. Authoritative DNS Servers: Contain the actual master DNS records for an organization's hosts.
4. Local DNS Resolver: Deployed at ISPs/enterprises; caches recent lookups to reduce global traffic.

(b) Query Types:
• Iterative Query: The contacted server returns the best referral address it knows to the client/resolver. The client repeats the query to the next server.
• Recursive Query: The contacted server assumes the full burden of resolving the name, querying downstream servers on behalf of the client and returning the final IP.

(c) DNS Resource Records (RR format: Name, Value, Type, TTL):
• Type A: Maps hostname to 32-bit IPv4 address.
• Type AAAA: Maps hostname to 128-bit IPv6 address.
• Type CNAME: Maps alias hostname to canonical (real) hostname.
• Type MX: Maps domain to incoming mail exchange server hostname.`,
        partialAnswer: `DNS converts domain names to IP addresses. It uses root servers and local servers. A records store IPs and MX stores mail. Iterative queries ask each server while recursive queries ask one server to do it all.`
    },

    // ----------------------------------------------------------------------
    // QUESTION 2 (MODULE 1): EMAIL ARCHITECTURE (SMTP, POP3, IMAP, MIME)
    // ----------------------------------------------------------------------
    {
        id: 'q2_email_architecture',
        module: 1,
        title: 'Electronic Mail Architecture: SMTP, POP3, IMAP & MIME',
        marks: 9.0,
        subdivisions: [
            {
                id: 'sub_a',
                title: 'Part (a): Email Architecture, UA, MTA, and MAA Agents',
                maxMarks: 3.0,
                rubrics: [
                    { desc: 'Explains User Agent (UA) role for composing/reading messages', marks: 1.0, keywords: ['user agent', 'ua', 'client'] },
                    { desc: 'Explains Message Transfer Agent (MTA) for server-to-server relay via SMTP', marks: 1.0, keywords: ['mta', 'message transfer', 'relay'] },
                    { desc: 'Explains Message Access Agent (MAA) for mailbox retrieval via POP3/IMAP', marks: 1.0, keywords: ['maa', 'message access', 'retrieval'] }
                ]
            },
            {
                id: 'sub_b',
                title: 'Part (b): SMTP Protocol Characteristics & Push Architecture',
                maxMarks: 2.0,
                rubrics: [
                    { desc: 'Explains SMTP as a Push protocol on TCP Port 25 using 7-bit ASCII', marks: 1.0, keywords: ['push', 'port 25', '7-bit ascii'] },
                    { desc: 'Details client-to-server and server-to-server message forwarding steps', marks: 1.0, keywords: ['relay', 'spool', 'queue'] }
                ]
            },
            {
                id: 'sub_c',
                title: 'Part (c): POP3 vs IMAP Pull Protocols & State Synchronization',
                maxMarks: 2.0,
                rubrics: [
                    { desc: 'POP3 (Port 110): Stateless download-and-delete/keep; no server synchronization', marks: 1.0, keywords: ['pop3', 'port 110', 'stateless', 'download'] },
                    { desc: 'IMAP (Port 143): Stateful remote mailbox manipulation; syncs across multiple devices', marks: 1.0, keywords: ['imap', 'port 143', 'stateful', 'sync'] }
                ]
            },
            {
                id: 'sub_d',
                title: 'Part (d): MIME (Multipurpose Internet Mail Extensions)',
                maxMarks: 2.0,
                rubrics: [
                    { desc: 'Explains non-ASCII multimedia encapsulation into 7-bit ASCII base64 streams', marks: 1.0, keywords: ['mime', 'non-ascii', 'base64'] },
                    { desc: 'Identifies headers: MIME-Version, Content-Type, Content-Transfer-Encoding', marks: 1.0, keywords: ['content-type', 'encoding', 'headers'] }
                ]
            }
        ],
        examinerInsight: 'Warning: Writing that the recipient client uses SMTP to fetch emails will cause a direct 2-mark deduction! SMTP is strictly a PUSH protocol.',
        modelAnswer: `(a) Email Architecture:
1. User Agent (UA): Mail reader/composer used by sender and receiver.
2. Message Transfer Agent (MTA): Relays messages from sender UA to sender server, and server-to-server using SMTP.
3. Message Access Agent (MAA): Pulls messages from receiver mailbox to receiver UA (POP3/IMAP).

(b) SMTP (Simple Mail Transfer Protocol):
• Operates over TCP Port 25.
• Pure Push Protocol: The sending client initiates TCP connection and pushes email onto sending mail server; sending server pushes to receiving mail server.
• Restricted to 7-bit NVT ASCII text commands (HELO, MAIL FROM, RCPT TO, DATA, QUIT).

(c) POP3 vs IMAP (Message Access Protocols):
• POP3 (Port 110): Pull protocol. Client connects, downloads messages, and optionally deletes them from server. It is completely stateless; folder changes do not synchronize.
• IMAP (Port 143): Pull protocol. Highly stateful. Messages remain stored on server in hierarchical folders. Flags (Read, Flagged, Deleted) synchronize seamlessly across multiple client devices.

(d) MIME (RFC 2045):
Extends 7-bit ASCII SMTP to support binary files, images, audio, and non-English scripts.
Key Headers: MIME-Version: 1.0, Content-Type (e.g. image/png, multipart/mixed), Content-Transfer-Encoding: base64.`,
        partialAnswer: `Email uses SMTP on Port 25 to send mail. POP3 and IMAP are used to read mail. MIME is used to send images with emails.`
    },

    // ----------------------------------------------------------------------
    // QUESTION 3 (MODULE 1): P2P FILE DISTRIBUTION & BITTORRENT
    // ----------------------------------------------------------------------
    {
        id: 'q3_p2p_bittorrent',
        module: 1,
        title: 'Peer-to-Peer File Distribution & BitTorrent Algorithms',
        marks: 9.0,
        subdivisions: [
            {
                id: 'sub_a',
                title: 'Part (a): Client-Server vs P2P Distribution Time Derivation',
                maxMarks: 4.0,
                rubrics: [
                    { desc: 'States and derives Client-Server minimum time: D_cs >= max(NF/u_s, F/d_min)', marks: 2.0, keywords: ['d_cs', 'nf/u_s', 'f/d_min'] },
                    { desc: 'States and derives P2P minimum time: D_p2p >= max(F/u_s, F/d_min, NF/(u_s + sum(u_i)))', marks: 2.0, keywords: ['d_p2p', 'sum(u_i)', 'self-scalability'] }
                ]
            },
            {
                id: 'sub_b',
                title: 'Part (b): BitTorrent Swarm Architecture (Trackers & Chunks)',
                maxMarks: 1.0,
                rubrics: [
                    { desc: 'Explains torrent files, trackers, swarms, and 256KB chunk division', marks: 1.0, keywords: ['tracker', 'swarm', 'chunk', '256kb'] }
                ]
            },
            {
                id: 'sub_c',
                title: 'Part (c): Rarest-First Piece Selection Strategy',
                maxMarks: 2.0,
                rubrics: [
                    { desc: 'Explains requesting chunks with lowest replication count across the swarm first', marks: 1.0, keywords: ['rarest-first', 'fewest peers', 'rarest'] },
                    { desc: 'Benefits: prevents piece extinction and multiplies seeders for rare pieces', marks: 1.0, keywords: ['extinction', 'variety', 'trading'] }
                ]
            },
            {
                id: 'sub_d',
                title: 'Part (d): Tit-for-Tat Choking & Optimistic Unchoking',
                maxMarks: 2.0,
                rubrics: [
                    { desc: 'Tit-for-Tat: unchokes top 4 peers providing highest upload rates (evaluated every 10s)', marks: 1.0, keywords: ['tit-for-tat', 'top 4', '10 seconds'] },
                    { desc: 'Optimistic Unchoking: randomly unchokes 1 peer every 30s to discover higher rates', marks: 1.0, keywords: ['optimistic unchoking', '30 seconds', 'discover'] }
                ]
            }
        ],
        examinerInsight: 'Warning: Forgetting the term NF / (u_s + sum(u_i)) in the P2P distribution time formula causes a 2-mark deduction!',
        modelAnswer: `(a) File Distribution Time Derivation:
Let N = number of peers, F = file size in bits, u_s = server upload rate, d_min = min peer download rate.
1. Client-Server Architecture:
   • The server must upload N copies: Time >= N * F / u_s.
   • The slowest peer must download 1 copy: Time >= F / d_min.
   • Total Minimum Time: D_cs >= max( N*F / u_s, F / d_min ). As N increases, D_cs scales linearly (bottlenecked by u_s).
2. P2P Architecture:
   • Server must upload at least 1 copy: Time >= F / u_s.
   • Slowest peer must download 1 copy: Time >= F / d_min.
   • Total bits to deliver = N * F. Aggregate upload capacity = u_s + sum(u_i). Time >= N*F / (u_s + sum(u_i)).
   • Total Minimum Time: D_p2p >= max( F / u_s, F / d_min, N*F / (u_s + sum(u_i)) ). P2P possesses self-scalability.

(b) BitTorrent Swarm Architecture:
Files are partitioned into equal 256 KB chunks. A central Tracker maintains list of active participating peers (the Swarm).

(c) Rarest-First Algorithm:
A peer requests the rarest chunks in the swarm (those owned by the fewest peers) first.
Benefits: Rapidly replicates endangered chunks to avoid extinction, ensuring chunk variety and maximizing parallel trading.

(d) Choking Algorithms:
• Tit-for-Tat: Every 10 seconds, a peer unchokes the top 4 peers currently supplying data to it at the highest rate (reciprocal sharing).
• Optimistic Unchoking: Every 30 seconds, 1 additional random peer is unchoked to allow new peers to bootstrap and discover faster upload partners.`,
        partialAnswer: `Client server takes D_cs = max(NF/u_s, F/d_min). In P2P peers share files with each other. Rarest first gets rare pieces. Tit for tat unchokes top uploaders.`
    },

    // ----------------------------------------------------------------------
    // QUESTION 4 (MODULE 2): TCP 3-WAY HANDSHAKE & NUMERICAL TRACING
    // ----------------------------------------------------------------------
    {
        id: 'q4_tcp_handshake_numerical',
        module: 2,
        title: 'TCP 3-Way Handshake, Sequence Numbers & Cumulative ACK Tracing',
        marks: 9.0,
        subdivisions: [
            {
                id: 'sub_a',
                title: 'Part (a): 3-Way Handshake Diagram & Flag Synchronization',
                maxMarks: 3.0,
                rubrics: [
                    { desc: 'Step 1: Client -> SYN (seq=x, SYN=1, ACK=0)', marks: 1.0, keywords: ['syn', 'seq=x', 'syn=1'] },
                    { desc: 'Step 2: Server -> SYN+ACK (seq=y, ack=x+1, SYN=1, ACK=1)', marks: 1.0, keywords: ['syn+ack', 'seq=y', 'ack=x+1'] },
                    { desc: 'Step 3: Client -> ACK (seq=x+1, ack=y+1, ACK=1)', marks: 1.0, keywords: ['ack', 'seq=x+1', 'ack=y+1'] }
                ]
            },
            {
                id: 'sub_b',
                title: 'Part (b): Numerical Byte Range Tracing & Normal Expected ACK',
                maxMarks: 3.0,
                rubrics: [
                    { desc: 'Correct byte ranges: Seg 1 [1000..1199], Seg 2 [1200..1399], Seg 3 [1400..1549]', marks: 1.5, keywords: ['1000..1199', '1200..1399', '1400..1549'] },
                    { desc: 'Calculates next expected ACK number upon normal in-order arrival = 1550', marks: 1.5, keywords: ['1550', 'next expected ack'] }
                ]
            },
            {
                id: 'sub_c',
                title: 'Part (c): Cumulative ACK Response for Lost Segment 2',
                maxMarks: 2.0,
                rubrics: [
                    { desc: 'States receiver sends ACK = 1200 upon receiving Segment 3 (cannot advance past missing gap)', marks: 1.0, keywords: ['1200', 'cumulative ack'] },
                    { desc: 'Explains duplicate ACK behavior and receiver buffering of out-of-order bytes 1400..1549', marks: 1.0, keywords: ['duplicate ack', 'buffer', 'out-of-order'] }
                ]
            },
            {
                id: 'sub_d',
                title: 'Part (d): Sequence Number Consumption by SYN',
                maxMarks: 1.0,
                rubrics: [
                    { desc: 'Explains SYN consumes 1 sequence number so receipt can be acknowledged even with 0 data payload', marks: 1.0, keywords: ['consumes 1', 'acknowledge', 'zero data'] }
                ]
            }
        ],
        examinerInsight: 'Warning: Stating the end byte of Segment 1 is 1200 instead of 1199 is the #1 student mistake! Formula is End = Start + Length - 1.',
        modelAnswer: `(a) TCP 3-Way Handshake:
1. Client -> Server: SYN segment [Seq = x, Flags: SYN=1, ACK=0]
2. Server -> Client: SYN+ACK segment [Seq = y, Ack = x + 1, Flags: SYN=1, ACK=1]
3. Client -> Server: ACK segment [Seq = x + 1, Ack = y + 1, Flags: ACK=1]

(b) Numerical Byte Range Calculation:
Formula: End_Byte = Start_Byte + Length - 1
• Segment 1: Start = 1000, Length = 200 -> Range = [1000 .. 1199]
• Segment 2: Start = 1200, Length = 200 -> Range = [1200 .. 1399]
• Segment 3: Start = 1400, Length = 150 -> Range = [1400 .. 1549]
Normal In-Order Arrival:
After Segment 1 arrives -> ACK = 1200.
After Segment 2 arrives -> ACK = 1400.
After Segment 3 arrives -> Next Expected ACK = 1550 (All bytes up to 1549 received).

(c) Lost Segment 2 Scenario:
• Segment 1 arrives -> ACK = 1200 sent.
• Segment 2 is lost.
• Segment 3 arrives out-of-order. Receiver buffers bytes 1400..1549, BUT MUST SEND ACK = 1200!
  Cumulative ACK Rule: ACK indicates the next expected in-order contiguous byte. It CANNOT advance past the missing byte 1200.

(d) Why SYN Consumes 1 Sequence Number:
Even though SYN carries 0 data payload bytes, it consumes 1 sequence number so that the receiver can explicitly confirm its safe arrival with ACK = x + 1.`,
        partialAnswer: `TCP 3-way handshake sends SYN then SYN-ACK then ACK. Segment 1 is 1000 to 1200. Segment 2 is 1200 to 1400. Segment 3 is 1400 to 1550. Next ACK is 1550. If segment 2 is lost it asks for segment 2.`
    },

    // ----------------------------------------------------------------------
    // QUESTION 5 (MODULE 2): DIJKSTRA'S LINK-STATE ROUTING ALGORITHM
    // ----------------------------------------------------------------------
    {
        id: 'q5_dijkstra_link_state',
        module: 2,
        title: 'Dijkstra Link-State Least-Cost Routing Algorithm',
        marks: 9.0,
        subdivisions: [
            {
                id: 'sub_a',
                title: 'Part (a): Link-State Concept & Cost Relaxation Equation',
                maxMarks: 2.0,
                rubrics: [
                    { desc: 'Explains global topology knowledge via LSAs and cost relaxation: D(v) = min(D(v), D(w) + c(w,v))', marks: 2.0, keywords: ['link-state', 'relaxation', 'd(v)', 'c(w,v)'] }
                ]
            },
            {
                id: 'sub_b',
                title: 'Part (b): Step-by-Step Table Tracing (Permanent Set N\')',
                maxMarks: 4.0,
                rubrics: [
                    { desc: 'Step 0: N\'={A}; D(B)=2,A; D(C)=inf; D(D)=5,A; D(E)=inf', marks: 1.0, keywords: ['step 0', 'n\'={a}'] },
                    { desc: 'Step 1: Pick B -> N\'={A,B}; D(C)=5,B; D(D)=5,A; D(E)=3,B', marks: 1.0, keywords: ['step 1', 'pick b', 'd(e)=3'] },
                    { desc: 'Step 2: Pick E -> N\'={A,B,E}; D(C)=5,B; D(D)=4,E; D(E)=3,B', marks: 1.0, keywords: ['step 2', 'pick e', 'd(d)=4'] },
                    { desc: 'Step 3: Pick D -> N\'={A,B,E,D}; Step 4: Pick C -> All nodes permanent', marks: 1.0, keywords: ['step 3', 'step 4', 'permanent'] }
                ]
            },
            {
                id: 'sub_c',
                title: 'Part (c): Router A Final Least-Cost Forwarding Table',
                maxMarks: 3.0,
                rubrics: [
                    { desc: 'Complete forwarding table: Dest B (cost 2, hop B), Dest C (cost 5, hop B), Dest D (cost 4, hop B), Dest E (cost 3, hop B)', marks: 3.0, keywords: ['forwarding table', 'dest b', 'dest c', 'dest d', 'dest e', 'next hop b'] }
                ]
            }
        ],
        examinerInsight: 'Warning: Failing to show the complete intermediate N\' step table results in an immediate 2-mark deduction even if your final shortest path is correct!',
        modelAnswer: `(a) Dijkstra Link-State Concept:
Link-state routing (used in OSPF) assumes each router possesses global topology knowledge via Link-State Advertisements (LSAs).
Cost Relaxation Equation:
D(v) = min( D(v), D(w) + c(w, v) )
Where w is the newly added permanent node to set N', and c(w, v) is the direct link cost.

(b) Step-by-Step Table Tracing for Source Node A:
Step | N'              | D(B), p(B) | D(C), p(C) | D(D), p(D) | D(E), p(E) | Selected
-----+-----------------+------------+------------+------------+------------+---------
0    | {A}             | 2, A       | Infinity   | 5, A       | Infinity   | Pick B (2)
1    | {A, B}          | 2, A       | 5, B       | 5, A       | 3, B       | Pick E (3)
2    | {A, B, E}       | 2, A       | 5, B       | 4, E       | 3, B       | Pick D (4)
3    | {A, B, E, D}    | 2, A       | 5, B       | 4, E       | 3, B       | Pick C (5)
4    | {A, B, E, D, C} | Permanent  | Permanent  | Permanent  | Permanent  | Complete!

(c) Router A Forwarding Table:
Destination | Least-Cost Path | Total Cost | Next-Hop Interface
------------+-----------------+------------+-------------------
B           | A -> B          | 2          | Port to B
C           | A -> B -> C     | 5          | Port to B
D           | A -> B -> E -> D| 4          | Port to B
E           | A -> B -> E     | 3          | Port to B`,
        partialAnswer: `Dijkstra finds shortest path from A. Path to B is 2. Path to E is 3. Path to D is 4. Path to C is 5. All traffic goes through router B.`
    },

    // ----------------------------------------------------------------------
    // QUESTION 6 (MODULE 2): IPV4 CIDR SUBNETTING & MTU FRAGMENTATION
    // ----------------------------------------------------------------------
    {
        id: 'q6_ipv4_subnetting_mtu',
        module: 2,
        title: 'IPv4 CIDR Subnetting & MTU Packet Fragmentation',
        marks: 9.0,
        subdivisions: [
            {
                id: 'sub_a',
                title: 'Part (a): CIDR /26 Subnet Calculation',
                maxMarks: 3.0,
                rubrics: [
                    { desc: 'Calculates Subnet Mask = 255.255.255.192', marks: 1.0, keywords: ['255.255.255.192'] },
                    { desc: 'Calculates Network Address = 192.168.10.64 and Broadcast Address = 192.168.10.127', marks: 1.0, keywords: ['192.168.10.64', '192.168.10.127'] },
                    { desc: 'Calculates Usable Host Count = 2^(32-26) - 2 = 62 hosts', marks: 1.0, keywords: ['62', '2^6 - 2'] }
                ]
            },
            {
                id: 'sub_b',
                title: 'Part (b): MTU Bottleneck Split (4000B -> MTU 1500B)',
                maxMarks: 2.0,
                rubrics: [
                    { desc: 'Max data per fragment = floor((1500-20)/8)*8 = 1480 bytes', marks: 1.0, keywords: ['1480', 'payload'] },
                    { desc: 'Total fragments required = ceil(3980 / 1480) = 3 fragments', marks: 1.0, keywords: ['3 fragments', '3980'] }
                ]
            },
            {
                id: 'sub_c',
                title: 'Part (c): Fragment Header Fields (Length, MF, Offset)',
                maxMarks: 4.0,
                rubrics: [
                    { desc: 'Fragment 1: Total Len = 1500B (Data 1480B), MF = 1, Fragment Offset = 0 / 8 = 0', marks: 1.5, keywords: ['len 1500', 'mf=1', 'offset 0'] },
                    { desc: 'Fragment 2: Total Len = 1500B (Data 1480B), MF = 1, Fragment Offset = 1480 / 8 = 185', marks: 1.5, keywords: ['len 1500', 'mf=1', 'offset 185'] },
                    { desc: 'Fragment 3: Total Len = 1040B (Data 1020B), MF = 0, Fragment Offset = 2960 / 8 = 370', marks: 1.0, keywords: ['len 1040', 'mf=0', 'offset 370'] }
                ]
            }
        ],
        examinerInsight: 'Warning: Dividing the byte offset by something other than 8 or forgetting that Fragment Offset is measured in 8-byte units loses 2 marks!',
        modelAnswer: `(a) CIDR /26 Subnet Calculation (192.168.10.64/26):
• Prefix /26 means 26 ones followed by 6 zeros in binary.
• Subnet Mask: 11111111.11111111.11111111.11000000 = 255.255.255.192
• Network Address: 192.168.10.64
• Broadcast Address: 192.168.10.64 + 63 = 192.168.10.127
• Usable Host Count: 2^(32 - 26) - 2 = 2^6 - 2 = 64 - 2 = 62 usable hosts.

(b) MTU Fragmentation Constraint:
• Datagram: Total Length = 4000B (20B IP header + 3980B data).
• MTU = 1500B. Maximum payload per fragment must be multiple of 8:
  floor((1500 - 20) / 8) * 8 = floor(1480 / 8) * 8 = 1480 Bytes.
• Total Fragments: 3980 / 1480 -> 3 fragments required.

(c) Fragment Header Field Table:
Fragment # | Total Length | Data Payload | Data Byte Range | MF Flag | Fragment Offset
-----------+--------------+--------------+-----------------+---------+----------------
1          | 1500 Bytes   | 1480 Bytes   | 0 .. 1479       | 1       | 0 / 8 = 0
2          | 1500 Bytes   | 1480 Bytes   | 1480 .. 2959    | 1       | 1480 / 8 = 185
3          | 1040 Bytes   | 1020 Bytes   | 2960 .. 3979    | 0       | 2960 / 8 = 370`,
        partialAnswer: `Subnet mask is 255.255.255.192 with 62 hosts. 4000 bytes splits into 3 packets because MTU is 1500. Offsets are 0, 185, 370.`
    },

    // ----------------------------------------------------------------------
    // QUESTION 7 (MODULE 2): BERKELEY SOCKETS & I/O MULTIPLEXING
    // ----------------------------------------------------------------------
    {
        id: 'q7_sockets_multiplexing',
        module: 2,
        title: 'Berkeley Sockets Lifecycle & I/O Multiplexing',
        marks: 9.0,
        subdivisions: [
            {
                id: 'sub_a',
                title: 'Part (a): TCP Server Socket Workflow & Backlog',
                maxMarks: 4.0,
                rubrics: [
                    { desc: 'Outlines sequence: socket() -> bind() -> listen() -> accept() -> read/write -> close()', marks: 2.0, keywords: ['socket()', 'bind()', 'listen()', 'accept()', 'close()'] },
                    { desc: 'Explains accept() creates a new connected socket descriptor and backlog queue role', marks: 2.0, keywords: ['new descriptor', 'backlog', 'connection queue'] }
                ]
            },
            {
                id: 'sub_b',
                title: 'Part (b): I/O Multiplexing (select vs poll)',
                maxMarks: 3.0,
                rubrics: [
                    { desc: 'select(): uses fd_set bitmask, bounded by FD_SETSIZE (1024), O(N) scan overhead', marks: 1.5, keywords: ['select()', 'fd_set', 'fd_setsize', '1024'] },
                    { desc: 'poll(): uses dynamic array of struct pollfd, removes descriptor limit', marks: 1.5, keywords: ['poll()', 'pollfd', 'no limit'] }
                ]
            },
            {
                id: 'sub_c',
                title: 'Part (c): Raw Link-Layer Sockets (SOCK_PACKET vs PF_PACKET)',
                maxMarks: 2.0,
                rubrics: [
                    { desc: 'SOCK_PACKET: legacy BSD string interface binding (e.g. "eth0")', marks: 1.0, keywords: ['sock_packet', 'string', 'legacy'] },
                    { desc: 'PF_PACKET: modern Linux sockaddr_ll with sll_ifindex interface index and ETH_P_ALL', marks: 1.0, keywords: ['pf_packet', 'sockaddr_ll', 'sll_ifindex'] }
                ]
            }
        ],
        examinerInsight: 'Warning: Stating that accept() accepts data is incorrect! accept() completes the 3-way handshake and returns a NEW connected descriptor.',
        modelAnswer: `(a) TCP Server Socket Lifecycle:
1. socket(): Creates an unbound network endpoint descriptor.
2. bind(): Assigns local IP address and port to the socket.
3. listen(): Puts socket into passive listening mode; backlog parameter defines queue capacity for pending connection requests.
4. accept(): Blocks until 3-way handshake completes. Crucially returns a BRAND NEW connected socket descriptor for client data transfer while original listening socket continues waiting for new connections.
5. read()/write(): Bidirectional data transmission.
6. close(): Initiates TCP 4-way FIN connection teardown.

(b) I/O Multiplexing:
• select(): Monitors read, write, and exception descriptor sets using fixed fd_set bitmasks. Limited by FD_SETSIZE (typically 1024 descriptors). Requires O(N) linear scanning.
• poll(): Replaces bitmasks with dynamic arrays of struct pollfd { int fd; short events; short revents; }. Eliminates the 1024 descriptor ceiling.

(c) Raw Packet Sockets:
• SOCK_PACKET: Obsolete BSD interface where devices are addressed via ASCII string names (e.g. "eth0"). Prone to race conditions and lacks link-layer filtering.
• PF_PACKET: Modern Linux socket using struct sockaddr_ll and numeric interface index (sll_ifindex). Allows capturing complete Ethernet frames including headers via ETH_P_ALL.`,
        partialAnswer: `Server calls socket, bind, listen, accept, and close. Select uses fd_set with limit 1024. Poll uses pollfd array with no limit. PF_PACKET is used for raw packets.`
    },

    // ----------------------------------------------------------------------
    // QUESTION 8 (MODULE 3): CRC MODULO-2 XOR DIVISION
    // ----------------------------------------------------------------------
    {
        id: 'q8_crc_modulo2',
        module: 3,
        title: 'CRC Modulo-2 XOR Division & Error Verification',
        marks: 9.0,
        subdivisions: [
            {
                id: 'sub_a',
                title: 'Part (a): Polynomial Divisor Conversion & Zero-Padding Rule',
                maxMarks: 2.0,
                rubrics: [
                    { desc: 'Converts g(x) = x^3 + x^2 + 1 to binary divisor 1101 (Degree k=3)', marks: 1.0, keywords: ['1101', 'degree 3'] },
                    { desc: 'Appends k=3 zeros to data 100100 -> 100100000', marks: 1.0, keywords: ['append 3 zeros', '100100000'] }
                ]
            },
            {
                id: 'sub_b',
                title: 'Part (b): Modulo-2 XOR Division Tracing & FCS Remainder',
                maxMarks: 4.0,
                rubrics: [
                    { desc: 'Performs modulo-2 XOR long division showing intermediate steps', marks: 2.0, keywords: ['xor', 'division steps'] },
                    { desc: 'Obtains quotient = 111101 and remainder (FCS) = 001', marks: 2.0, keywords: ['111101', '001', 'fcs'] }
                ]
            },
            {
                id: 'sub_c',
                title: 'Part (c): Codeword Assembly & Receiver Zero-Error Check',
                maxMarks: 3.0,
                rubrics: [
                    { desc: 'Assembles transmitted codeword: Data + Remainder = 100100001', marks: 1.5, keywords: ['100100001', 'codeword'] },
                    { desc: 'Demonstrates receiver division of 100100001 by 1101 yields remainder = 000 (valid)', marks: 1.5, keywords: ['remainder 000', 'no error', 'valid'] }
                ]
            }
        ],
        examinerInsight: 'Warning: Appending 4 zeros instead of 3 zeros is an immediate error. Generator degree k=3 means append exactly 3 zeros!',
        modelAnswer: `(a) Polynomial Divisor & Padding:
Data: 100100 (6 bits)
Generator: g(x) = x^3 + x^2 + 1 = 1*x^3 + 1*x^2 + 0*x^1 + 1*x^0 -> Divisor = 1101 (4 bits, degree k = 3).
Zero-Padding Rule: Append k = 3 zeros to the original data:
Augmented Data = 100100 000

(b) Modulo-2 XOR Long Division:
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

(c) Codeword Assembly & Receiver Verification:
• Transmitted Codeword = Data + FCS = 100100001
• Receiver Verification:
  Receiver divides received codeword 100100001 by generator 1101:
  100100001 / 1101 = Quotient 111101 with Remainder = 000.
  Since remainder = 0, the frame is verified to be error-free!`,
        partialAnswer: `Generator polynomial has degree 3, so divisor is 1101. We append 3 zeros to get 100100000. We perform XOR division to find remainder FCS, but ran out of time to complete the receiver division.`
    },

    // ----------------------------------------------------------------------
    // QUESTION 9 (MODULE 3): CSMA/CD & MINIMUM FRAME SIZE DERIVATION
    // ----------------------------------------------------------------------
    {
        id: 'q9_csmacd_minframe',
        module: 3,
        title: 'CSMA/CD Protocol & Minimum Frame Size Derivation',
        marks: 9.0,
        subdivisions: [
            {
                id: 'sub_a',
                title: 'Part (a): CSMA/CD Mechanism & Exponential Backoff',
                maxMarks: 4.0,
                rubrics: [
                    { desc: 'Carrier Sense (1-persistent) and Collision Detection abort procedure', marks: 2.0, keywords: ['carrier sense', 'collision detection', 'abort'] },
                    { desc: '48-bit Jamming signal and Binary Exponential Backoff formula k in [0..2^n - 1]', marks: 2.0, keywords: ['jamming', 'binary exponential backoff', '2^n - 1'] }
                ]
            },
            {
                id: 'sub_b',
                title: 'Part (b): Mathematical Derivation of T_fr >= 2 * T_p',
                maxMarks: 3.0,
                rubrics: [
                    { desc: 'Explains worst-case collision at distance d requiring 2*T_p round-trip propagation', marks: 1.5, keywords: ['round-trip', 'worst-case', '2 * t_p'] },
                    { desc: 'Derives constraint: Transmission Time T_fr >= 2 * T_p => Min Frame = 2 * T_p * Bandwidth', marks: 1.5, keywords: ['t_fr >= 2 * t_p', 'min frame'] }
                ]
            },
            {
                id: 'sub_c',
                title: 'Part (c): Numerical Calculation for 10 Mbps Ethernet (64 Bytes)',
                maxMarks: 2.0,
                rubrics: [
                    { desc: 'Substitutes 2*T_p = 51.2 microseconds and Bandwidth = 10 Mbps', marks: 1.0, keywords: ['51.2 us', '10 mbps'] },
                    { desc: 'Calculates Min Frame = 512 bits = 64 Bytes', marks: 1.0, keywords: ['512 bits', '64 bytes'] }
                ]
            }
        ],
        examinerInsight: 'Warning: Writing T_fr >= T_p instead of 2 * T_p loses 2 marks! The signal must propagate to the far end AND the collision must propagate all the way back.',
        modelAnswer: `(a) CSMA/CD Mechanism:
1. Carrier Sense: Station listens before transmitting (1-persistent: transmits immediately when channel is sensed idle).
2. Collision Detection: Station continues listening while transmitting. If signal amplitude doubles, collision is detected.
3. Transmission Abort & Jamming: Station immediately ceases frame transmission and broadcasts a 32-48 bit Jamming Signal to alert all stations.
4. Binary Exponential Backoff: Station waits random delay before retry: Wait = k * Slot_Time, where k is chosen randomly from [0 .. 2^n - 1], and n = min(attempt, 10).

(b) Derivation of T_fr >= 2 * T_p Constraint:
Consider two stations A and B at opposite ends of cable (distance d, propagation delay T_p).
• At t = 0, station A begins transmitting.
• At t = T_p - epsilon, just before signal reaches B, station B senses channel idle and begins transmitting.
• Collision occurs near B at t = T_p.
• The collision signal must propagate back to A, arriving at t = 2 * T_p.
In order for A to still be transmitting when collision arrives, frame transmission time T_fr must satisfy:
T_fr >= 2 * T_p
Since T_fr = Frame_Size (L) / Bandwidth (B):
L_min >= 2 * T_p * Bandwidth

(c) Numerical Calculation for Standard Ethernet:
• Given: Round-trip propagation delay 2*T_p = 51.2 microseconds (51.2 * 10^-6 s).
• Bandwidth B = 10 Mbps = 10 * 10^6 bps.
• Minimum Frame Size = 51.2 * 10^-6 s * 10 * 10^6 bps = 512 bits.
• In bytes: 512 bits / 8 = 64 Bytes.`,
        partialAnswer: `CSMA/CD listens before transmitting. If collision occurs it sends jam signal and uses backoff. Condition is T_fr >= 2 * T_p. For 10 Mbps Ethernet minimum frame is 64 bytes.`
    },

    // ----------------------------------------------------------------------
    // QUESTION 10 (MODULE 4): SNMP ARCHITECTURE, MIB OID TREE & ASN.1
    // ----------------------------------------------------------------------
    {
        id: 'q10_snmp_asn1',
        module: 4,
        title: 'SNMP Architecture, MIB OID Tree & ASN.1 Syntax Rules',
        marks: 9.0,
        subdivisions: [
            {
                id: 'sub_a',
                title: 'Part (a): SNMP Framework, Entities and Transport Ports',
                maxMarks: 3.0,
                rubrics: [
                    { desc: 'Identifies Manager (NMS), Managed Device (Agent), MIB database, and SMI rules', marks: 1.5, keywords: ['manager', 'agent', 'mib', 'smi'] },
                    { desc: 'Identifies UDP Port 161 (Manager-to-Agent requests) and UDP Port 162 (Agent Trap alerts)', marks: 1.5, keywords: ['udp port 161', 'udp port 162', 'trap'] }
                ]
            },
            {
                id: 'sub_b',
                title: 'Part (b): ISO/ITU-T OID Tree (1.3.6.1.2.1) & Scalar Instance (.0)',
                maxMarks: 3.0,
                rubrics: [
                    { desc: 'Explains OID tree path: iso(1).org(3).dod(6).internet(1).mgmt(2).mib-2(1)', marks: 1.5, keywords: ['1.3.6.1.2.1', 'iso', 'org', 'dod', 'internet', 'mib-2'] },
                    { desc: 'Explains scalar instance indexing: scalar leaves must append instance identifier ".0"', marks: 1.5, keywords: ['.0', 'scalar', 'instance'] }
                ]
            },
            {
                id: 'sub_c',
                title: 'Part (c): ASN.1 SMI Rules & Declaration Corrections',
                maxMarks: 3.0,
                rubrics: [
                    { desc: 'States rules: Type names start with UPPERCASE, identifier names start with lowercase', marks: 1.5, keywords: ['uppercase type', 'lowercase identifier', 'range'] },
                    { desc: 'Corrects: ENUMERATED { monday(1), tuesday(2) } and INTEGER (0..1000)', marks: 1.5, keywords: ['enumerated', 'integer (0..1000)'] }
                ]
            }
        ],
        examinerInsight: 'Warning: Forgetting the .0 suffix for scalar MIB instances (e.g. sysUpTime.0) is penalized in KTU answer keys!',
        modelAnswer: `(a) SNMP Management Framework:
1. SNMP Manager (NMS): Central monitoring station issuing queries and receiving alarms.
2. SNMP Agent: Software daemon residing on managed network devices (routers, switches).
3. MIB (Management Information Base): Structured database of managed object definitions.
4. SMI (Structure of Management Information): Defines the data types and naming syntax (ASN.1).
• Transport: Operates over UDP. Port 161 for Manager queries (Get, Set, GetNext); Port 162 for Agent Traps.

(b) ISO/ITU-T OID Tree Hierarchy:
• Prefix 1.3.6.1.2.1 corresponds to:
  iso (1) -> org (3) -> dod (6) -> internet (1) -> mgmt (2) -> mib-2 (1).
• Scalar Instance Indexing: A scalar object has exactly one instance. To address the actual value in an SNMP request, an instance suffix of ".0" must be appended (e.g., sysDescr.0 is 1.3.6.1.2.1.1.1.0).

(c) ASN.1 SMI Lexical Rules & Corrections:
1. Type names MUST start with an UPPERCASE letter (e.g., INTEGER, ENUMERATED, SEQUENCE).
2. Variable and enum item names MUST start with a lowercase letter.
3. Subtype ranges use double dots (min..max).
Corrections:
• Faulty: DayOfWeek ::= enumerated { Monday(1), Tuesday(2) }
  Correct: DayOfWeek ::= ENUMERATED { monday(1), tuesday(2) }
• Faulty: packetQueueSize ::= integer (0 to 1000)
  Correct: packetQueueSize ::= INTEGER (0..1000)`,
        partialAnswer: `SNMP uses manager and agent with UDP 161 and 162. OID tree is 1.3.6.1.2.1. Scalar variables use .0 at the end. ASN.1 types are capitalized like INTEGER.`
    }
];

class KTURubricGrader {
    constructor() {
        this.isOpen = false;
        this.questions = KTU9MarkQuestions;
        this.selectedQuestionIndex = 0;

        // Player draft response
        this.playerText = '';
        this.isTyping = false;
        this.cursorBlink = 0;

        // Valuation Results
        this.valuationResult = null;

        // UI state
        this.activeTab = 'EVALUATION'; // 'EVALUATION', 'MODEL_ANSWER', 'RUBRIC_DETAILS'
        this.scrollOffset = 0;

        // Audio
        this.audio = typeof window !== 'undefined' && window.CyberAudio ? window.CyberAudio : null;
    }

    toggle() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.open();
        }
        return this.isOpen;
    }

    open(questionIndex = 0) {
        this.isOpen = true;
        this.selectedQuestionIndex = Math.max(0, Math.min(this.questions.length - 1, questionIndex));
        this.activeTab = 'EVALUATION';
        this.scrollOffset = 0;

        // Preload partial answer or clear
        const q = this.questions[this.selectedQuestionIndex];
        if (!this.playerText) {
            this.playerText = q.partialAnswer || '';
        }
        this.gradeAnswer();

        if (this.audio) {
            try { this.audio.sfxPing(); } catch (e) {}
        }
    }

    close() {
        this.isOpen = false;
        this.isTyping = false;
    }

    selectQuestion(idx) {
        this.selectedQuestionIndex = Math.max(0, Math.min(this.questions.length - 1, idx));
        const q = this.questions[this.selectedQuestionIndex];
        this.playerText = q.partialAnswer || '';
        this.valuationResult = null;
        this.scrollOffset = 0;
        this.gradeAnswer();
        if (this.audio) {
            try { this.audio.sfxPing(); } catch (e) {}
        }
    }

    loadModelAnswer() {
        const q = this.questions[this.selectedQuestionIndex];
        this.playerText = q.modelAnswer;
        this.gradeAnswer();
        if (this.audio) {
            try { this.audio.sfxAccessGranted(); } catch (e) {}
        }
    }

    loadPartialAnswer() {
        const q = this.questions[this.selectedQuestionIndex];
        this.playerText = q.partialAnswer;
        this.gradeAnswer();
        if (this.audio) {
            try { this.audio.sfxPing(); } catch (e) {}
        }
    }

    clearAnswer() {
        this.playerText = '';
        this.valuationResult = null;
        this.gradeAnswer();
    }

    // ----------------------------------------------------------------------
    // Natural Language & Technical Keyword Valuation Engine
    // ----------------------------------------------------------------------
    gradeAnswer() {
        const q = this.questions[this.selectedQuestionIndex];
        if (!q) return null;

        const text = (this.playerText || '').toLowerCase();
        const compactText = text.replace(/[\s\-_=:\.]/g, '');
        let totalScore = 0.0;
        const subdivisionReports = [];
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

        q.subdivisions.forEach(sub => {
            let subScore = 0.0;
            const rubricDetails = [];

            sub.rubrics.forEach(rub => {
                let matchCount = 0;
                rub.keywords.forEach(kw => {
                    if (isKeywordMatch(kw)) {
                        matchCount++;
                        if (!detectedKeywords.includes(kw.toUpperCase())) {
                            detectedKeywords.push(kw.toUpperCase());
                        }
                    } else {
                        if (!missingKeywords.includes(kw.toUpperCase()) && !detectedKeywords.includes(kw.toUpperCase())) {
                            missingKeywords.push(kw.toUpperCase());
                        }
                    }
                });

                // Calculate ratio of matched keywords in rubric
                const ratio = rub.keywords.length > 0 ? matchCount / rub.keywords.length : 0;
                let earned = 0.0;
                if (ratio >= 0.5) {
                    earned = rub.marks;
                } else if (ratio >= 0.25) {
                    earned = Math.round((rub.marks * 0.6) * 10) / 10;
                } else if (ratio > 0) {
                    earned = Math.round((rub.marks * 0.3) * 10) / 10;
                }

                subScore += earned;
                rubricDetails.push({
                    desc: rub.desc,
                    max: rub.marks,
                    earned: earned,
                    ratio: ratio
                });
            });

            // Cap subdivision score to max
            subScore = Math.min(sub.maxMarks, Math.round(subScore * 10) / 10);
            totalScore += subScore;

            subdivisionReports.push({
                id: sub.id,
                title: sub.title,
                max: sub.maxMarks,
                earned: subScore,
                rubrics: rubricDetails
            });
        });

        // Cap total score to 9.0
        totalScore = Math.min(9.0, Math.round(totalScore * 10) / 10);

        // Grade label
        let gradeGrade = 'F';
        let gradeLabel = 'NEEDS REVISION';
        if (totalScore >= 8.0) {
            gradeGrade = 'S';
            gradeLabel = 'OUTSTANDING S-GRADE MASTERY (100% ACCREDITATION)';
        } else if (totalScore >= 6.5) {
            gradeGrade = 'A';
            gradeLabel = 'FIRST CLASS DISTINCTION (SOLID TECHNICAL ANSWER)';
        } else if (totalScore >= 5.0) {
            gradeGrade = 'B';
            gradeLabel = 'PASS GRADE (KEYWORD OMISSIONS DETECTED)';
        } else {
            gradeGrade = 'C';
            gradeLabel = 'MARGINAL SCORE (CRITICAL EXAMINER DEFICIENCIES)';
        }

        this.valuationResult = {
            questionId: q.id,
            totalScore: totalScore,
            maxMarks: q.marks,
            percentage: Math.round((totalScore / q.marks) * 100),
            grade: gradeGrade,
            gradeLabel: gradeLabel,
            subdivisions: subdivisionReports,
            detectedKeywords: detectedKeywords,
            missingKeywords: missingKeywords.filter(k => !detectedKeywords.includes(k)),
            examinerInsight: q.examinerInsight
        };

        return this.valuationResult;
    }

    submitForEvaluation() {
        this.gradeAnswer();
        const score = this.valuationResult ? this.valuationResult.totalScore : 0;

        if (this.audio) {
            if (score >= 8.0) {
                if (typeof this.audio.sfxAccessGranted === 'function') this.audio.sfxAccessGranted();
            } else if (score >= 5.0) {
                if (typeof this.audio.sfxPing === 'function') this.audio.sfxPing();
            } else {
                if (typeof this.audio.sfxAccessDenied === 'function') this.audio.sfxAccessDenied();
            }
        }

        // Award marks to GameState if not already awarded for this question
        const gs = typeof window !== 'undefined' ? window.GameState : null;
        if (gs && score >= 5.0) {
            // Give player marks proportional to boss/practice drill
            console.log(`[KTURubricGrader] Evaluation Complete: ${score} / 9.0 Marks awarded.`);
        }
    }

    // ----------------------------------------------------------------------
    // Input Handling
    // ----------------------------------------------------------------------
    handleInput(input) {
        if (!this.isOpen) return false;

        // Close on Esc
        if (input.isJustPressed('escape')) {
            this.close();
            return true;
        }

        // Tab navigation between views
        if (input.isJustPressed('1')) {
            this.activeTab = 'EVALUATION';
            this.scrollOffset = 0;
            if (this.audio) this.audio.sfxPing();
            return true;
        }
        if (input.isJustPressed('2')) {
            this.activeTab = 'MODEL_ANSWER';
            this.scrollOffset = 0;
            if (this.audio) this.audio.sfxPing();
            return true;
        }
        if (input.isJustPressed('3')) {
            this.activeTab = 'RUBRIC_DETAILS';
            this.scrollOffset = 0;
            if (this.audio) this.audio.sfxPing();
            return true;
        }

        // Question cycling with Left / Right or [ / ]
        if (input.isJustPressed('arrowleft') || input.isJustPressed('[')) {
            const nextIdx = (this.selectedQuestionIndex - 1 + this.questions.length) % this.questions.length;
            this.selectQuestion(nextIdx);
            return true;
        }
        if (input.isJustPressed('arrowright') || input.isJustPressed(']')) {
            const nextIdx = (this.selectedQuestionIndex + 1) % this.questions.length;
            this.selectQuestion(nextIdx);
            return true;
        }

        // Page scrolling with PgUp / PgDn
        if (input.isJustPressed('pagedown')) {
            this.scrollOffset = Math.min(600, this.scrollOffset + 80);
            return true;
        }
        if (input.isJustPressed('pageup')) {
            this.scrollOffset = Math.max(0, this.scrollOffset - 80);
            return true;
        }

        // Character typing in text area when focused
        if (this.isTyping) {
            if (input.isJustPressed('backspace')) {
                if (this.playerText.length > 0) {
                    this.playerText = this.playerText.slice(0, -1);
                    this.gradeAnswer();
                }
                return true;
            }
            if (input.isJustPressed('enter')) {
                this.playerText += '\n';
                this.gradeAnswer();
                return true;
            }
            if (input.lastChar && typeof input.lastChar === 'string' && input.lastChar.length === 1) {
                this.playerText += input.lastChar;
                input.lastChar = null;
                this.gradeAnswer();
                return true;
            }
        }

        // Mouse click interaction
        if (input.mouse && input.mouse.leftJustPressed) {
            const mx = input.mouse.x;
            const my = input.mouse.y;

            // Close button [✕] (x: 1180, y: 45)
            if (mx >= 1170 && mx <= 1220 && my >= 45 && my <= 85) {
                this.close();
                return true;
            }

            // Question selector pills (y: 95 to 125)
            if (my >= 95 && my <= 125) {
                const pillW = 108;
                for (let i = 0; i < 10; i++) {
                    const px = 60 + i * (pillW + 6);
                    if (mx >= px && mx <= px + pillW) {
                        this.selectQuestion(i);
                        return true;
                    }
                }
            }

            // Tab bar clicks (y: 135 to 165)
            if (my >= 135 && my <= 165) {
                if (mx >= 60 && mx <= 240) { this.activeTab = 'EVALUATION'; this.scrollOffset = 0; }
                else if (mx >= 250 && mx <= 450) { this.activeTab = 'MODEL_ANSWER'; this.scrollOffset = 0; }
                else if (mx >= 460 && mx <= 680) { this.activeTab = 'RUBRIC_DETAILS'; this.scrollOffset = 0; }
                if (this.audio) this.audio.sfxPing();
                return true;
            }

            // Quick action buttons in left column (y: 575 to 610)
            if (my >= 575 && my <= 610) {
                // [MODEL ANSWER] (x: 60 to 180)
                if (mx >= 60 && mx <= 190) {
                    this.loadModelAnswer();
                    return true;
                }
                // [PARTIAL ANSWER] (x: 200 to 330)
                if (mx >= 200 && mx <= 335) {
                    this.loadPartialAnswer();
                    return true;
                }
                // [CLEAR] (x: 345 to 430)
                if (mx >= 345 && mx <= 430) {
                    this.clearAnswer();
                    return true;
                }
                // [SUBMIT EVALUATION] (x: 440 to 620)
                if (mx >= 440 && mx <= 620) {
                    this.submitForEvaluation();
                    return true;
                }
            }

            // Click inside text box to focus typing (x: 60 to 520, y: 310 to 565)
            if (mx >= 60 && mx <= 520 && my >= 310 && my <= 565) {
                this.isTyping = true;
            } else {
                this.isTyping = false;
            }
        }

        return true;
    }

    update(dt) {
        if (!this.isOpen) return;
        this.cursorBlink += dt * 3.5;
    }

    // ----------------------------------------------------------------------
    // Canvas UI Rendering
    // ----------------------------------------------------------------------
    render(ctx) {
        if (!this.isOpen) return;

        const w = 1280;
        const h = 720;

        ctx.save();

        // 1. Modal Scrim Backdrop
        ctx.fillStyle = 'rgba(4, 8, 18, 0.94)';
        ctx.fillRect(0, 0, w, h);

        // 2. Main Window Dimensions
        const mx = 50;
        const my = 35;
        const mw = 1180;
        const mh = 650;

        // Dark Outer Panel
        ctx.fillStyle = 'rgba(6, 14, 28, 0.98)';
        ctx.fillRect(mx, my, mw, mh);

        // Glowing Emerald/Cyan Border
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 14;
        ctx.strokeRect(mx, my, mw, mh);
        ctx.shadowBlur = 0;

        // Corner Tech Reticles
        const cLen = 16;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        // Top Left
        ctx.beginPath(); ctx.moveTo(mx, my + cLen); ctx.lineTo(mx, my); ctx.lineTo(mx + cLen, my); ctx.stroke();
        // Top Right
        ctx.beginPath(); ctx.moveTo(mx + mw - cLen, my); ctx.lineTo(mx + mw, my); ctx.lineTo(mx + mw, my + cLen); ctx.stroke();
        // Bottom Left
        ctx.beginPath(); ctx.moveTo(mx, my + mh - cLen); ctx.lineTo(mx, my + mh); ctx.lineTo(mx + cLen, my + mh); ctx.stroke();
        // Bottom Right
        ctx.beginPath(); ctx.moveTo(mx + mw - cLen, my + mh); ctx.lineTo(mx + mw, my + mh); ctx.lineTo(mx + mw, my + mh - cLen); ctx.stroke();

        // 3. Header Banner
        ctx.fillStyle = 'rgba(0, 255, 136, 0.12)';
        ctx.fillRect(mx, my, mw, 50);
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(mx, my, mw, 50);

        const FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

        ctx.fillStyle = '#4ade80';
        ctx.font = `bold 16px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.fillText('🎓 KTU 9-MARK MASTER VALUATION RUBRIC GRADER // BOSS CHALLENGE DRILL', mx + 20, my + 31);

        // Close button [✕]
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(mx + mw - 46, my + 10, 34, 30, 4);
        else ctx.rect(mx + mw - 46, my + 10, 34, 30);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold 16px ${FONT_SANS}`;
        ctx.textAlign = 'center';
        ctx.fillText('✕', mx + mw - 29, my + 30);

        // 4. Question Selector Pills (10 Questions)
        const qY = my + 58;
        const qH = 28;
        const pillW = 108;

        for (let i = 0; i < this.questions.length; i++) {
            const px = mx + 15 + i * (pillW + 7);
            const isSelected = i === this.selectedQuestionIndex;

            if (isSelected) {
                ctx.fillStyle = 'rgba(74, 222, 128, 0.3)';
                ctx.strokeStyle = '#4ade80';
                ctx.lineWidth = 1.6;
            } else {
                ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
                ctx.strokeStyle = 'rgba(74, 222, 128, 0.2)';
                ctx.lineWidth = 1;
            }

            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(px, qY, pillW, qH, 4);
            else ctx.rect(px, qY, pillW, qH);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = isSelected ? '#ffffff' : '#94a3b8';
            ctx.font = `bold 11px ${FONT_SANS}`;
            ctx.textAlign = 'center';
            ctx.fillText(`Q${i + 1} (Mod ${this.questions[i].module})`, px + pillW / 2, qY + 18);
        }

        // 5. Category Tabs Bar (EVALUATION, MODEL_ANSWER, RUBRIC_DETAILS)
        const tabY = qY + qH + 8;
        const tabH = 30;
        const tabs = [
            { id: 'EVALUATION', label: '[1] VALUATION REPORT & SCORE' },
            { id: 'MODEL_ANSWER', label: '[2] OFFICIAL MODEL ANSWER' },
            { id: 'RUBRIC_DETAILS', label: '[3] POINT-BY-POINT MARKING SCHEME' }
        ];

        let tabX = mx + 15;
        tabs.forEach(t => {
            const isCurrent = this.activeTab === t.id;
            const tw = 220;

            if (isCurrent) {
                ctx.fillStyle = 'rgba(74, 222, 128, 0.25)';
                ctx.strokeStyle = '#4ade80';
                ctx.lineWidth = 1.6;
            } else {
                ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
                ctx.strokeStyle = 'rgba(74, 222, 128, 0.2)';
                ctx.lineWidth = 1;
            }

            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(tabX, tabY, tw, tabH, 4);
            else ctx.rect(tabX, tabY, tw, tabH);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = isCurrent ? '#4ade80' : '#94a3b8';
            ctx.font = `bold 12px ${FONT_SANS}`;
            ctx.textAlign = 'center';
            ctx.fillText(t.label, tabX + tw / 2, tabY + 19);

            tabX += tw + 10;
        });

        // 6. Split Content Columns: Left (Question & Draft Box) vs Right (Evaluator Report / Solution)
        const contentY = tabY + tabH + 8;
        const contentH = mh - (contentY - my) - 34;
        const col1W = 460;
        const col2X = mx + 15 + col1W + 14;
        const col2W = mw - 30 - col1W - 14;

        this.renderLeftColumn(ctx, mx + 15, contentY, col1W, contentH);
        this.renderRightColumn(ctx, col2X, contentY, col2W, contentH);

        // 7. Footer Status Bar
        const footerY = my + mh - 28;
        ctx.fillStyle = 'rgba(74, 222, 128, 0.08)';
        ctx.fillRect(mx, footerY, mw, 28);
        ctx.strokeStyle = 'rgba(74, 222, 128, 0.2)';
        ctx.strokeRect(mx, footerY, mw, 28);

        ctx.fillStyle = '#94a3b8';
        ctx.font = `11px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.fillText('⌨ [ESC] Close | [1-3] Switch Views | [← / →] Select Question | [PgUp / PgDn] Scroll Report', mx + 20, footerY + 18);

        ctx.fillStyle = '#fbbf24';
        ctx.textAlign = 'right';
        ctx.font = `bold 11px ${FONT_SANS}`;
        const q = this.questions[this.selectedQuestionIndex];
        ctx.fillText(`KTU PCCST501 // 9-MARK MASTER EVALUATOR (MODULE ${q.module})`, mx + mw - 20, footerY + 18);

        ctx.restore();
    }

    renderLeftColumn(ctx, x, y, w, h) {
        const FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        ctx.save();
        const q = this.questions[this.selectedQuestionIndex];

        // 1. Question Title & Metadata Card (Top half of left col)
        const cardH = 150;
        ctx.fillStyle = 'rgba(11, 20, 38, 0.95)';
        ctx.fillRect(x, y, w, cardH);
        ctx.strokeStyle = 'rgba(74, 222, 128, 0.25)';
        ctx.strokeRect(x, y, w, cardH);

        ctx.fillStyle = '#4ade80';
        ctx.font = `bold 14px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.fillText(`QUESTION ${this.selectedQuestionIndex + 1}: ${q.title}`, x + 12, y + 20);

        ctx.fillStyle = '#fbbf24';
        ctx.font = `bold 11px ${FONT_SANS}`;
        ctx.fillText(`WEIGHTAGE: 9.0 MARKS | MODULE ${q.module} PART B`, x + 12, y + 38);

        // Subdivisions list
        ctx.strokeStyle = 'rgba(74, 222, 128, 0.2)';
        ctx.beginPath();
        ctx.moveTo(x + 12, y + 46);
        ctx.lineTo(x + w - 12, y + 46);
        ctx.stroke();

        let subY = y + 60;
        q.subdivisions.forEach(sub => {
            ctx.fillStyle = '#38bdf8';
            ctx.font = `bold 11px ${FONT_SANS}`;
            ctx.fillText(`${sub.title} [${sub.maxMarks}M]`, x + 12, subY);

            ctx.fillStyle = '#94a3b8';
            ctx.font = `10px ${FONT_SANS}`;
            const rubricSummary = sub.rubrics.map(r => r.desc).join('; ');
            const displaySummary = rubricSummary.length > 70 ? rubricSummary.substring(0, 68) + '..' : rubricSummary;
            ctx.fillText(displaySummary, x + 12, subY + 14);

            subY += 28;
        });

        // 2. Player Technical Answer Editor Box
        const editY = y + cardH + 8;
        const editH = h - cardH - 52;

        ctx.fillStyle = this.isTyping ? 'rgba(15, 23, 42, 0.98)' : 'rgba(11, 20, 38, 0.92)';
        ctx.fillRect(x, editY, w, editH);
        ctx.strokeStyle = this.isTyping ? '#38bdf8' : 'rgba(74, 222, 128, 0.3)';
        ctx.lineWidth = 1.4;
        ctx.strokeRect(x, editY, w, editH);

        ctx.fillStyle = '#4ade80';
        ctx.font = `bold 12px ${FONT_SANS}`;
        ctx.fillText('TECHNICAL DRAFT RESPONSE (TYPE OR TEST PRE-FILLS BELOW):', x + 12, editY + 18);

        // Text display inside box
        ctx.save();
        ctx.beginPath();
        ctx.rect(x + 8, editY + 26, w - 16, editH - 32);
        ctx.clip();

        ctx.fillStyle = '#e2e8f0';
        ctx.font = `12px ${FONT_SANS}`;
        const lines = (this.playerText || 'Click here to write technical draft or choose pre-fill below...').split('\n');
        lines.slice(0, 16).forEach((line, idx) => {
            const cursor = (this.isTyping && idx === lines.length - 1 && Math.floor(this.cursorBlink) % 2 === 0) ? '█' : '';
            ctx.fillText(line + cursor, x + 12, editY + 40 + idx * 16);
        });
        ctx.restore();

        // 3. Quick Action Buttons Row
        const btnY = editY + editH + 8;
        const btnH = 28;

        // Model Answer Button
        ctx.fillStyle = 'rgba(74, 222, 128, 0.2)';
        ctx.fillRect(x, btnY, 115, btnH);
        ctx.strokeStyle = '#4ade80';
        ctx.strokeRect(x, btnY, 115, btnH);
        ctx.fillStyle = '#4ade80';
        ctx.font = `bold 11px ${FONT_SANS}`;
        ctx.textAlign = 'center';
        ctx.fillText('★ MODEL [9M]', x + 57, btnY + 18);

        // Partial Answer Button
        ctx.fillStyle = 'rgba(251, 191, 36, 0.15)';
        ctx.fillRect(x + 122, btnY, 115, btnH);
        ctx.strokeStyle = '#fbbf24';
        ctx.strokeRect(x + 122, btnY, 115, btnH);
        ctx.fillStyle = '#fbbf24';
        ctx.font = `bold 11px ${FONT_SANS}`;
        ctx.fillText('▲ PARTIAL [5M]', x + 122 + 57, btnY + 18);

        // Clear Button
        ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
        ctx.fillRect(x + 244, btnY, 75, btnH);
        ctx.strokeStyle = '#ef4444';
        ctx.strokeRect(x + 244, btnY, 75, btnH);
        ctx.fillStyle = '#f87171';
        ctx.font = `bold 11px ${FONT_SANS}`;
        ctx.fillText('✕ CLEAR', x + 244 + 37, btnY + 18);

        // Grade Now Button
        ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.fillRect(x + 326, btnY, w - 326, btnH);
        ctx.strokeStyle = '#38bdf8';
        ctx.strokeRect(x + 326, btnY, w - 326, btnH);
        ctx.fillStyle = '#38bdf8';
        ctx.font = `bold 11px ${FONT_SANS}`;
        ctx.fillText('▶ GRADE NOW [ENTER]', x + 326 + (w - 326) / 2, btnY + 18);

        ctx.restore();
    }

    renderRightColumn(ctx, x, y, w, h) {
        ctx.save();
        ctx.fillStyle = 'rgba(8, 16, 32, 0.95)';
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.25)';
        ctx.strokeRect(x, y, w, h);

        if (this.activeTab === 'MODEL_ANSWER') {
            this.renderModelAnswerView(ctx, x, y, w, h);
        } else if (this.activeTab === 'RUBRIC_DETAILS') {
            this.renderRubricDetailsView(ctx, x, y, w, h);
        } else {
            this.renderEvaluationReportView(ctx, x, y, w, h);
        }

        ctx.restore();
    }

    renderEvaluationReportView(ctx, x, y, w, h) {
        const res = this.valuationResult;
        if (!res) return;

        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.clip();

        const FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

        let cy = y + 16 - this.scrollOffset;

        // 1. Big Score Gauge Header Box
        const scoreBoxH = 68;
        let scoreColor = '#4ade80';
        if (res.totalScore < 5.0) scoreColor = '#f43f5e';
        else if (res.totalScore < 8.0) scoreColor = '#fbbf24';

        ctx.fillStyle = 'rgba(11, 20, 38, 0.95)';
        ctx.fillRect(x + 16, cy, w - 32, scoreBoxH);
        ctx.strokeStyle = scoreColor;
        ctx.lineWidth = 1.6;
        ctx.strokeRect(x + 16, cy, w - 32, scoreBoxH);

        // Huge Score Text
        ctx.fillStyle = scoreColor;
        ctx.font = `bold 26px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.fillText(`${res.totalScore.toFixed(1)} / ${res.maxMarks.toFixed(1)} MARKS`, x + 32, cy + 34);

        ctx.fillStyle = '#f8fafc';
        ctx.font = `bold 13px ${FONT_SANS}`;
        ctx.fillText(`GRADE: ${res.grade} // ${res.gradeLabel}`, x + 32, cy + 54);

        // Percentage Badge on Right
        ctx.fillStyle = scoreColor;
        ctx.font = `bold 22px ${FONT_SANS}`;
        ctx.textAlign = 'right';
        ctx.fillText(`${res.percentage}%`, x + w - 32, cy + 42);
        cy += scoreBoxH + 16;

        // 2. Subdivision Marks Breakdown
        ctx.fillStyle = '#4ade80';
        ctx.font = `bold 13px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.fillText('POINT-BY-POINT SUBDIVISION ALLOCATION:', x + 16, cy);
        cy += 18;

        res.subdivisions.forEach(sub => {
            ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
            ctx.fillRect(x + 16, cy, w - 32, 38);
            ctx.strokeStyle = 'rgba(74, 222, 128, 0.25)';
            ctx.strokeRect(x + 16, cy, w - 32, 38);

            // Sub title
            ctx.fillStyle = '#f1f5f9';
            ctx.font = `bold 12px ${FONT_SANS}`;
            ctx.fillText(sub.title, x + 26, cy + 18);

            // Marks awarded pill
            const markPillColor = sub.earned >= sub.max ? '#4ade80' : (sub.earned > 0 ? '#fbbf24' : '#f43f5e');
            ctx.fillStyle = markPillColor;
            ctx.font = `bold 13px ${FONT_SANS}`;
            ctx.textAlign = 'right';
            ctx.fillText(`+${sub.earned.toFixed(1)} / ${sub.max.toFixed(1)} M`, x + w - 30, cy + 24);
            ctx.textAlign = 'left';

            cy += 44;
        });
        cy += 8;

        // 3. Keywords Semantic Tree Analysis
        ctx.fillStyle = '#38bdf8';
        ctx.font = `bold 13px ${FONT_SANS}`;
        ctx.fillText('KEYWORD SEMANTIC TREE ANALYSIS:', x + 16, cy);
        cy += 18;

        // Detected Keywords (Green)
        ctx.fillStyle = '#86efac';
        ctx.font = `bold 11px ${FONT_SANS}`;
        ctx.fillText('✓ ACCREDITED TECHNICAL KEYWORDS IDENTIFIED:', x + 16, cy);
        cy += 16;

        let kwX = x + 16;
        if (res.detectedKeywords.length === 0) {
            ctx.fillStyle = '#94a3b8';
            ctx.font = `12px ${FONT_SANS}`;
            ctx.fillText('None detected yet. Write technical terms or test pre-fill.', x + 16, cy);
            cy += 18;
        } else {
            res.detectedKeywords.forEach(kw => {
                ctx.font = `600 11px ${FONT_SANS}`;
                const kwW = ctx.measureText(kw).width + 16;
                if (kwX + kwW > x + w - 24) {
                    kwX = x + 16;
                    cy += 24;
                }
                ctx.fillStyle = 'rgba(74, 222, 128, 0.2)';
                ctx.fillRect(kwX, cy - 12, kwW, 20);
                ctx.strokeStyle = '#4ade80';
                ctx.strokeRect(kwX, cy - 12, kwW, 20);

                ctx.fillStyle = '#4ade80';
                ctx.fillText(kw, kwX + 8, cy + 3);
                kwX += kwW + 8;
            });
            cy += 28;
        }

        // Missing Keywords (Gold / Amber Alert)
        ctx.fillStyle = '#fbbf24';
        ctx.font = `bold 11px ${FONT_SANS}`;
        ctx.fillText('⚠️ MISSING CRITICAL EXAMINER KEYWORDS (ADD THESE TO SCORE 9/9):', x + 16, cy);
        cy += 16;

        kwX = x + 16;
        if (res.missingKeywords.length === 0) {
            ctx.fillStyle = '#4ade80';
            ctx.font = `bold 12px ${FONT_SANS}`;
            ctx.fillText('PERFECT! 100% of mandatory examiner keywords are present in your answer.', x + 16, cy);
            cy += 20;
        } else {
            res.missingKeywords.forEach(kw => {
                ctx.font = `600 11px ${FONT_SANS}`;
                const kwW = ctx.measureText(kw).width + 16;
                if (kwX + kwW > x + w - 24) {
                    kwX = x + 16;
                    cy += 24;
                }
                ctx.fillStyle = 'rgba(251, 191, 36, 0.15)';
                ctx.fillRect(kwX, cy - 12, kwW, 20);
                ctx.strokeStyle = '#fbbf24';
                ctx.strokeRect(kwX, cy - 12, kwW, 20);

                ctx.fillStyle = '#fef08a';
                ctx.fillText(kw, kwX + 8, cy + 3);
                kwX += kwW + 8;
            });
            cy += 28;
        }
        cy += 10;

        // 4. Examiner Insight Warning Box
        ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
        const insightH = 56;
        ctx.fillRect(x + 16, cy, w - 32, insightH);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(x + 16, cy, w - 32, insightH);

        ctx.fillStyle = '#f87171';
        ctx.font = `bold 12px ${FONT_SANS}`;
        ctx.fillText('🎓 KTU EXAMINER INSIGHT & DEDUCTION WARNING:', x + 26, cy + 20);

        ctx.fillStyle = '#ffffff';
        ctx.font = `12px ${FONT_SANS}`;
        this.renderWrappedText(ctx, res.examinerInsight, x + 26, cy + 38, w - 52, 16);

        ctx.restore();
    }

    renderModelAnswerView(ctx, x, y, w, h) {
        const FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        const q = this.questions[this.selectedQuestionIndex];
        if (!q) return;

        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.clip();

        let cy = y + 20 - this.scrollOffset;

        ctx.fillStyle = '#4ade80';
        ctx.font = `bold 16px ${FONT_SANS}`;
        ctx.fillText(`OFFICIAL KTU MODEL SOLUTION // QUESTION ${this.selectedQuestionIndex + 1}`, x + 20, cy);
        cy += 20;

        ctx.fillStyle = '#fbbf24';
        ctx.font = `bold 12px ${FONT_SANS}`;
        ctx.fillText('VERIFIED AGAINST OFFICIAL UNIVERSITY VALUATION SCHEME (MAX 9.0 MARKS)', x + 20, cy);
        cy += 22;

        ctx.strokeStyle = 'rgba(74, 222, 128, 0.25)';
        ctx.beginPath();
        ctx.moveTo(x + 20, cy);
        ctx.lineTo(x + w - 20, cy);
        ctx.stroke();
        cy += 18;

        // Render Model Answer Block
        const lines = q.modelAnswer.split('\n');
        lines.forEach(line => {
            if (line.startsWith('(') || line.endsWith(':')) {
                ctx.fillStyle = '#38bdf8';
                ctx.font = `bold 13px ${FONT_SANS}`;
            } else if (line.startsWith('•') || line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.')) {
                ctx.fillStyle = '#ffffff';
                ctx.font = `13px ${FONT_SANS}`;
            } else {
                ctx.fillStyle = '#cbd5e1';
                ctx.font = `12px ${FONT_SANS}`;
            }
            ctx.fillText(line, x + 24, cy);
            cy += 18;
        });

        ctx.restore();
    }

    renderRubricDetailsView(ctx, x, y, w, h) {
        const FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        const q = this.questions[this.selectedQuestionIndex];
        if (!q) return;

        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.clip();

        let cy = y + 20 - this.scrollOffset;

        ctx.fillStyle = '#38bdf8';
        ctx.font = `bold 16px ${FONT_SANS}`;
        ctx.fillText(`OFFICIAL KTU SCHEME OF VALUATION // QUESTION ${this.selectedQuestionIndex + 1}`, x + 20, cy);
        cy += 20;

        ctx.fillStyle = '#94a3b8';
        ctx.font = `12px ${FONT_SANS}`;
        ctx.fillText('Detailed sub-criteria used by university examiners to allocate marks:', x + 20, cy);
        cy += 22;

        q.subdivisions.forEach(sub => {
            ctx.fillStyle = '#fbbf24';
            ctx.font = `bold 13px ${FONT_SANS}`;
            ctx.fillText(`▶ ${sub.title} [Maximum: ${sub.maxMarks} Marks]`, x + 20, cy);
            cy += 18;

            sub.rubrics.forEach(rub => {
                ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
                ctx.fillRect(x + 24, cy, w - 48, 32);
                ctx.strokeStyle = 'rgba(74, 222, 128, 0.25)';
                ctx.strokeRect(x + 24, cy, w - 48, 32);

                ctx.fillStyle = '#f8fafc';
                ctx.font = `12px ${FONT_SANS}`;
                ctx.fillText(`• ${rub.desc}`, x + 34, cy + 16);

                ctx.fillStyle = '#4ade80';
                ctx.font = `bold 13px ${FONT_SANS}`;
                ctx.textAlign = 'right';
                ctx.fillText(`+${rub.marks.toFixed(1)} M`, x + w - 36, cy + 21);
                ctx.textAlign = 'left';

                cy += 38;
            });
            cy += 12;
        });

        ctx.restore();
    }

    renderWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
        if (!text) return y;
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
        return y + lineHeight;
    }
}

// Global Singleton Export
const rubricGraderInstance = new KTURubricGrader();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.KTURubricGrader = rubricGraderInstance;
    window.KTURubricGrader = rubricGraderInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KTU9MarkQuestions, KTURubricGrader, KTURubricGraderInstance: rubricGraderInstance };
}
