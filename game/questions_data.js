// ==========================================================================
// OPERATION NET-INFILTRATOR: THE GRID PROTOCOL - QUESTION BANK & VALUATION
// PCCST501 COMPUTER NETWORKS (KTU 2024 SCHEME)
// ==========================================================================

var GRID_DATA = {
  "metadata": {
    "courseCode": "PCCST501",
    "courseName": "Computer Networks",
    "scheme": "KTU 2024 Scheme (Semester 5)",
    "totalMarks": 60,
    "partATotal": 24,
    "partBTotal": 36,
    "duration": "2 hours 30 minutes"
  },
  "sectors": [
    {
      "id": 1,
      "name": "Sector 1: The Gateway Bastion",
      "module": 1,
      "subtitle": "Internet Architecture & Application Layer",
      "description": "Breach the outer perimeter of OmniNet Systems. Decrypt protocol stacks, trace DNS queries, intercept HTTP transactions, and penetrate BitTorrent swarms.",
      "bossName": "GUARDIAN DAEMON: PROTOCOL GATEWAY-9",
      "color": "#00ffcc"
    },
    {
      "id": 2,
      "name": "Sector 2: The Routing Core",
      "module": 2,
      "subtitle": "Transport & Network Layer",
      "description": "Enter the high-speed transit conduit. Hijack TCP 3-way handshakes, compute Dijkstra shortest paths through the router grid, track segment sequences, and calculate subnet boundaries.",
      "bossName": "ROUTER OVERLORD: CORE-OSPF-PRIME",
      "color": "#00aaff"
    },
    {
      "id": 3,
      "name": "Sector 3: The Frame Matrix",
      "module": 3,
      "subtitle": "Data Link Layer & Wireless Networks",
      "description": "Traverse the shared physical link-layer fabric. Defeat CRC polynomial error traps, outmaneuver CSMA collision algorithms, map Ethernet switch MAC tables, and track roaming Mobile IP nodes.",
      "bossName": "SWITCH MATRIX: CENTINEL-802",
      "color": "#ff00ff"
    },
    {
      "id": 4,
      "name": "Sector 4: The Physical Substratum",
      "module": 4,
      "subtitle": "SNMP & Physical Layer",
      "description": "Descend into the raw hardware core. Overload SNMP MIB monitors, recompile corrupted ASN.1 protocols, calibrate Manchester/FSK carrier signals, and breach the Nyquist-Shannon limit.",
      "bossName": "CENTRAL MAINFRAME: OMNINET APEX",
      "color": "#ffaa00"
    }
  ],
  "quickHacks": [
    {
      "id": "M1_QH1",
      "module": 1,
      "sectorId": 1,
      "title": "Protocol Layering Concept",
      "type": "quick_hack",
      "marks": 3,
      "source": "Set 1 Q1 / Set 5 Q1",
      "scenario": "A security gateway demands confirmation of the design philosophy that enables diverse network components to communicate without monolithic coupling.",
      "question": "Explain the role of protocol layering in the design of the Internet.",
      "options": [
        "(Recommended) Decomposes complex network communication into modular, hierarchical layers where each layer provides specific services to the layer above and relies on services below, enabling independent implementation and interoperability.",
        "Combines all hardware and software routines into a single monolithic execution loop to minimize latency between sender and receiver.",
        "Eliminates the need for transport and network headers by allowing application data to directly control physical transmission media.",
        "Guarantees that every packet travels along the exact same physical path through all intermediate routers."
      ],
      "correctIndex": 0,
      "keywords": [
        "modularity",
        "abstraction",
        "services to layer above",
        "interoperability",
        "independent implementation"
      ],
      "rubric": [
        {
          "item": "Layering divides communication functions into modular layers",
          "marks": 1.0
        },
        {
          "item": "Each layer offers services to the layer above and uses services from below",
          "marks": 1.0
        },
        {
          "item": "Enables interoperability, modular updates, and independent implementation",
          "marks": 1.0
        }
      ],
      "tacticalIntel": "Protocol layering decomposes network tasks into hierarchical modules. Key advantages: 1) Modularity: modifying one layer does not affect others. 2) Interoperability: different vendors can build equipment that communicates seamlessly. 3) Simplicity: complex communication is divided into manageable sub-tasks. The 5 layers in the Internet model are Application, Transport, Network, Data Link, and Physical."
    },
    {
      "id": "M1_QH2",
      "module": 1,
      "sectorId": 1,
      "title": "Client-Server vs P2P Paradigm",
      "type": "quick_hack",
      "marks": 3,
      "source": "Model Paper Q2 / Set 1 Q2",
      "scenario": "OmniNet has deployed a distributed surveillance mesh. You must distinguish its architecture from conventional centralized web servers.",
      "question": "Differentiate between the client-server paradigm and the peer-to-peer (P2P) paradigm. Give one example of each.",
      "options": [
        "(Recommended) Client-Server uses a dedicated, always-on server to provide services to intermittently connected clients (e.g., HTTP/Web, FTP); P2P has equal, decentralized peers that act as both clients and servers to share resources directly (e.g., BitTorrent).",
        "Client-Server connects peers directly without servers (e.g., BitTorrent); P2P requires a centralized mainframe server to route every message (e.g., Web).",
        "Client-Server only operates over optical fiber; P2P operates strictly over wireless networks.",
        "In Client-Server both parties have symmetric compute capabilities; in P2P one central node handles 100% of the storage."
      ],
      "correctIndex": 0,
      "keywords": [
        "centralized server",
        "always-on",
        "intermittent clients",
        "decentralized peers",
        "both client and server",
        "BitTorrent",
        "HTTP"
      ],
      "rubric": [
        {
          "item": "Client-Server definition & characterization (dedicated server, client requests)",
          "marks": 1.0
        },
        {
          "item": "P2P definition & characterization (peers act as both client and server, self-scaling)",
          "marks": 1.0
        },
        {
          "item": "Valid examples for both (e.g., HTTP/FTP for client-server, BitTorrent for P2P)",
          "marks": 1.0
        }
      ],
      "tacticalIntel": "Client-Server: Centralized service provider (always-on host with fixed IP/domain) responds to requests from clients. Bottleneck / single point of failure at server. Example: Web (HTTP), Email (SMTP/IMAP), FTP.\n\nP2P: Arbitrary end hosts (peers) communicate directly. Peers request service from others and supply service in return (self-scalability). No always-on centralized server required. Example: BitTorrent, Gnutella."
    },
    {
      "id": "M1_QH3",
      "module": 1,
      "sectorId": 1,
      "title": "FTP Dual-Connection Architecture",
      "type": "quick_hack",
      "marks": 3,
      "source": "Model Paper Q10b / Set 3 Q9a",
      "scenario": "To exfiltrate classified blueprints, you must exploit FTP's dual-connection mechanism across ports 20 and 21.",
      "question": "Describe the roles of the control connection and the data connection in FTP file transfer.",
      "options": [
        "(Recommended) Control connection (Port 21) transmits commands and replies and remains open for the entire session; Data connection (Port 20) is created dynamically on-demand to transfer file data and closes once transfer completes.",
        "Control connection transfers actual file contents; Data connection only handles DNS lookups.",
        "Both connections use UDP port 21 simultaneously to double transmission throughput.",
        "Data connection remains permanently open while control connection closes after each byte."
      ],
      "correctIndex": 0,
      "keywords": [
        "control connection port 21",
        "data connection port 20",
        "commands and responses",
        "out-of-band",
        "closed after each file transfer"
      ],
      "rubric": [
        {
          "item": "Control connection role: port 21, sends commands and responses, persists during session",
          "marks": 1.5
        },
        {
          "item": "Data connection role: port 20, transfers file data, created and closed per transfer",
          "marks": 1.5
        }
      ],
      "tacticalIntel": "FTP uses two separate parallel TCP connections:\n1. Control Connection (Port 21): Used for sending user credentials, commands (USER, PASS, RETR, STOR) and status codes (220, 331, 226). Uses NVT ASCII. Remains open throughout the session ('out-of-band' control).\n2. Data Connection (Port 20 in active mode): Opened only when a file or directory listing is transferred. Closed immediately when transfer ends. A new data connection is opened for each file."
    },
    {
      "id": "M1_QH4",
      "module": 1,
      "sectorId": 1,
      "title": "DNS Role & Name Resolution",
      "type": "quick_hack",
      "marks": 3,
      "source": "Set 3 Q1 / Set 4 Q1",
      "scenario": "The target mainframe hides behind human-readable domain names. You need to verify DNS translation before launching your payload.",
      "question": "Explain the role of DNS in translating a host name into information needed for Internet communication.",
      "options": [
        "(Recommended) DNS is a distributed hierarchical database that translates human-friendly host names (e.g. www.target.corp) into machine-routable IP addresses (e.g. 192.168.1.1) and provides mail server routing via MX records.",
        "DNS converts IP addresses into MAC addresses at the data link layer.",
        "DNS encrypts HTTP payloads using AES-256 before transmitting over Ethernet.",
        "DNS assigns port numbers to application processes running on a host."
      ],
      "correctIndex": 0,
      "keywords": [
        "host name to IP address",
        "hierarchical distributed database",
        "name resolution",
        "resource records"
      ],
      "rubric": [
        {
          "item": "Translates human-readable domain names to 32-bit/128-bit IP addresses",
          "marks": 1.5
        },
        {
          "item": "Distributed hierarchical database architecture (Root, TLD, Authoritative, Local)",
          "marks": 1.5
        }
      ],
      "tacticalIntel": "DNS (Domain Name System) operates at the application layer (UDP/TCP port 53). Roles: 1) Hostname to IP address translation. 2) Host aliasing (CNAME). 3) Mail server aliasing (MX records). 4) Load distribution among replicated servers. Resolves queries recursively (local server queries on client behalf) or iteratively (client repeatedly queries returned server referrals)."
    },
    {
      "id": "M1_QH5",
      "module": 1,
      "sectorId": 1,
      "title": "Encapsulation & Decapsulation Journey",
      "type": "quick_hack",
      "marks": 3,
      "source": "Model Paper Q1 / Set 2 Q1",
      "scenario": "Calculate overhead efficiency: an application generates 1460 bytes. UDP adds 8B header, IPv4 adds 20B header, Ethernet adds 18B header/trailer.",
      "question": "What is the total transmitted frame size, and what is the overhead efficiency (data percentage)?",
      "options": [
        "(Recommended) Total frame size = 1506 bytes; Overhead efficiency = (1460 / 1506) * 100 \u2248 96.95%",
        "Total frame size = 1460 bytes; Overhead efficiency = 100%",
        "Total frame size = 1600 bytes; Overhead efficiency = 80.0%",
        "Total frame size = 1488 bytes; Overhead efficiency = 92.5%"
      ],
      "correctIndex": 0,
      "keywords": [
        "1506 bytes",
        "96.95%",
        "1460",
        "UDP 8",
        "IP 20",
        "Ethernet 18"
      ],
      "rubric": [
        {
          "item": "Summing headers: 1460 + 8 (UDP) + 20 (IP) + 18 (Ethernet) = 1506 bytes",
          "marks": 1.5
        },
        {
          "item": "Calculating data percentage: (1460 / 1506) * 100 = 96.945% (\u2248 96.95%)",
          "marks": 1.5
        }
      ],
      "tacticalIntel": "Encapsulation adds headers as data moves down the stack:\n- Application Data: 1460 bytes\n- Transport (UDP): 1460 + 8 = 1468 bytes\n- Network (IP): 1468 + 20 = 1488 bytes\n- Data Link (Ethernet): 1488 + 14 (header) + 4 (trailer/FCS) = 1506 bytes\nOverhead efficiency = Data / Total = 1460 / 1506 = 0.96945 = 96.95%."
    },
    {
      "id": "M2_QH1",
      "module": 2,
      "sectorId": 2,
      "title": "TCP vs UDP Core Attributes",
      "type": "quick_hack",
      "marks": 3,
      "source": "Set 1 Q3 / Model Paper Q11b",
      "scenario": "OmniNet security systems run three distinct streams: financial ledger sync, real-time video feed, and DNS lookup. Select the proper transport protocol.",
      "question": "Compare TCP and UDP in terms of connection establishment, reliability, and suitable application scenarios.",
      "options": [
        "(Recommended) TCP is connection-oriented (3-way handshake), reliable (ACKs, retransmissions, ordered), high overhead (20-60B header), ideal for fund-transfers/web; UDP is connectionless, unreliable, low overhead (8B header), ideal for real-time video and DNS.",
        "TCP is connectionless and sends unconfirmed datagrams; UDP requires a 4-way handshake and retransmits all dropped packets.",
        "Both TCP and UDP provide identical reliability guarantees, differing only in port numbers.",
        "TCP operates at the network layer while UDP operates at the data link layer."
      ],
      "correctIndex": 0,
      "keywords": [
        "connection-oriented",
        "connectionless",
        "reliable",
        "unreliable",
        "3-way handshake",
        "header overhead 20 vs 8"
      ],
      "rubric": [
        {
          "item": "Connection establishment comparison (TCP 3-way handshake vs UDP none)",
          "marks": 1.0
        },
        {
          "item": "Reliability & ordering comparison (TCP ACK/retransmit vs UDP best-effort)",
          "marks": 1.0
        },
        {
          "item": "Header overhead and application examples",
          "marks": 1.0
        }
      ],
      "tacticalIntel": "TCP vs UDP:\n- TCP: Connection-oriented (SYN, SYN+ACK, ACK), reliable (sequence numbers, ACKs, timeout retransmission), ordered byte-stream, flow control (sliding window), congestion control. Header: 20-60 bytes. Used by HTTP, FTP, SMTP, fund-transfers.\n- UDP: Connectionless, unreliable (best effort), unordered datagrams, no flow/congestion control, minimal delay. Header: 8 bytes. Used by DNS, VoIP, live streaming, gaming."
    },
    {
      "id": "M2_QH2",
      "module": 2,
      "sectorId": 2,
      "title": "Stop-and-Wait Error Handling",
      "type": "quick_hack",
      "marks": 3,
      "source": "Model Paper Q3",
      "scenario": "A noisy link drops data frames. You must explain how Stop-and-Wait prevents infinite stall and duplicate deliveries.",
      "question": "In Stop-and-Wait protocol, how does the sender handle (a) a lost data packet, and (b) a lost acknowledgement (ACK)?",
      "options": [
        "(Recommended) (a) Lost packet: sender's retransmission timer expires, triggering retransmission. (b) Lost ACK: timer expires, sender retransmits duplicate packet; receiver detects duplicate using sequence numbers, discards it, and resends ACK.",
        "Sender immediately terminates connection when a packet is dropped.",
        "Receiver floods the entire network with NACK packets on all ports.",
        "Lost ACKs are ignored because sequence numbers are not tracked in Stop-and-Wait."
      ],
      "correctIndex": 0,
      "keywords": [
        "timer expires",
        "timeout",
        "retransmission",
        "duplicate detection",
        "sequence numbers (0 and 1)",
        "resend ACK"
      ],
      "rubric": [
        {
          "item": "Lost packet handling: retransmission timer expires and sender retransmits",
          "marks": 1.5
        },
        {
          "item": "Lost ACK handling: timer expires, duplicate sent, receiver detects via 1-bit seq no, discards duplicate and resends ACK",
          "marks": 1.5
        }
      ],
      "tacticalIntel": "Stop-and-Wait uses a 1-bit alternating sequence number (0 or 1):\n1. Lost Packet: Sender starts timer upon transmission. If no ACK arrives before timer expiration, sender retransmits the same frame.\n2. Lost ACK: Sender timer expires and resends frame. Receiver already received this frame; it checks the sequence number, recognizes it as a duplicate, discards the payload, and retransmits the ACK so the sender can advance."
    },
    {
      "id": "M2_QH3",
      "module": 2,
      "sectorId": 2,
      "title": "IPv4 CIDR Subnetting Calculations",
      "type": "quick_hack",
      "marks": 3,
      "source": "Model Paper Q4",
      "scenario": "A terminal displays host address 192.168.10.75/26. Compute subnet mask, network address, broadcast address, and usable host count.",
      "question": "For 192.168.10.75/26, what are (a) Subnet Mask, (b) Network & Broadcast addresses, (c) Usable host range & count?",
      "options": [
        "(Recommended) Mask: 255.255.255.192; Network: 192.168.10.64; Broadcast: 192.168.10.127; Usable Range: 192.168.10.65 to 192.168.10.126 (62 usable hosts).",
        "Mask: 255.255.255.128; Network: 192.168.10.0; Broadcast: 192.168.10.255; Usable: 254 hosts.",
        "Mask: 255.255.255.224; Network: 192.168.10.64; Broadcast: 192.168.10.95; Usable: 30 hosts.",
        "Mask: 255.255.255.0; Network: 192.168.10.75; Broadcast: 192.168.10.255; Usable: 255 hosts."
      ],
      "correctIndex": 0,
      "keywords": [
        "255.255.255.192",
        "192.168.10.64",
        "192.168.10.127",
        "62 usable hosts",
        "192.168.10.65 to 192.168.10.126"
      ],
      "rubric": [
        {
          "item": "Subnet mask = /26 = 26 ones + 6 zeros = 255.255.255.192",
          "marks": 1.0
        },
        {
          "item": "Network address: 75 in binary is 01001011; bitwise AND with 11000000 gives 01000000 (64) -> 192.168.10.64. Broadcast: 192.168.10.127",
          "marks": 1.0
        },
        {
          "item": "Usable host range: .65 to .126; count: 2^(32-26) - 2 = 64 - 2 = 62 hosts",
          "marks": 1.0
        }
      ],
      "tacticalIntel": "Subnetting Steps for /26:\n- Total host bits = 32 - 26 = 6 bits.\n- Block size = 2^6 = 64.\n- Subnet Mask = 11111111.11111111.11111111.11000000 = 255.255.255.192.\n- Subnet boundaries for 4th octet: 0, 64, 128, 192.\n- Host .75 falls in the 64..127 range:\n  * Network Address = 192.168.10.64\n  * Broadcast Address = 192.168.10.127\n  * Usable Hosts = 192.168.10.65 to 192.168.10.126\n  * Total Usable Hosts = 2^6 - 2 = 62."
    },
    {
      "id": "M2_QH4",
      "module": 2,
      "sectorId": 2,
      "title": "Socket Programming API Functions",
      "type": "quick_hack",
      "marks": 3,
      "source": "Set 3 Q4 / Set 5 Q4",
      "scenario": "You are writing a reverse-shell exploit in C on Linux. Specify the exact sequence of socket API calls required on a TCP server.",
      "question": "Describe the specific purposes of bind(), listen(), and accept() in a TCP server program.",
      "options": [
        "(Recommended) bind() assigns an IP address and port number to a socket descriptor; listen() puts the socket into a passive state to queue incoming connection requests; accept() dequeues the first pending request and creates a brand-new connected socket descriptor for client communication.",
        "bind() connects to a remote server; listen() reads incoming bytes; accept() terminates the process.",
        "bind() encrypts traffic; listen() routes IP packets; accept() verifies DNS certificates.",
        "All three functions are optional and can be replaced with a single connect() call on the server."
      ],
      "correctIndex": 0,
      "keywords": [
        "bind associates address/port",
        "listen passive state backlog queue",
        "accept extracts pending connection",
        "new connected socket descriptor"
      ],
      "rubric": [
        {
          "item": "bind() binds socket descriptor to local IP address & port (sockaddr_in)",
          "marks": 1.0
        },
        {
          "item": "listen() transitions socket to passive listening mode with backlog queue size",
          "marks": 1.0
        },
        {
          "item": "accept() extracts next connection request from queue, returns new connected descriptor",
          "marks": 1.0
        }
      ],
      "tacticalIntel": "TCP Server Workflow:\n1. socket(): Creates endpoint descriptor.\n2. bind(): Associates descriptor with local IP and port.\n3. listen(): Transitions socket from active to passive; defines queue length (backlog).\n4. accept(): Blocks until client connects (3-way handshake completes); returns a NEW socket descriptor specifically for that client while listening socket continues listening.\n5. read()/write(): Transmit data.\n6. close(): Terminate session."
    },
    {
      "id": "M2_QH5",
      "module": 2,
      "sectorId": 2,
      "title": "I/O Multiplexing: select() vs poll()",
      "type": "quick_hack",
      "marks": 3,
      "source": "Set 1 Q4 / Set 2 Q4 / Set 4 Q4",
      "scenario": "A single surveillance process must monitor 100 simultaneous network connections without spawning threads or blocking indefinitely.",
      "question": "Explain the purpose of I/O multiplexing and distinguish between select() and poll().",
      "options": [
        "(Recommended) I/O multiplexing allows a single process to monitor multiple file descriptors to see if any are ready for I/O without blocking; select() uses fixed-size bitmasks (fd_set with FD_SETSIZE limit) while poll() uses an array of pollfd structures with no hard-coded descriptor limit.",
        "I/O multiplexing combines multiple physical Ethernet cables into one logical cable.",
        "select() is used exclusively for UDP while poll() is used exclusively for TCP.",
        "select() spawns a separate kernel thread for each socket descriptor automatically."
      ],
      "correctIndex": 0,
      "keywords": [
        "monitor multiple descriptors",
        "non-blocking / ready for I/O",
        "select uses fd_set bitmask",
        "poll uses pollfd array",
        "FD_SETSIZE"
      ],
      "rubric": [
        {
          "item": "Purpose: single thread/process monitors multiple descriptors for read/write readiness without blocking",
          "marks": 1.5
        },
        {
          "item": "Distinction: select uses fixed bitmasks (fd_set, FD_SETSIZE limit ~1024), poll uses dynamically sized array of struct pollfd",
          "marks": 1.5
        }
      ],
      "tacticalIntel": "I/O Multiplexing: Enables an application to wait simultaneously for events on multiple I/O channels.\n- select(): Monitors 3 descriptor sets: readfds, writefds, exceptfds. Uses fd_set bitmasks. Limited by FD_SETSIZE (usually 1024). Modifies descriptor sets in-place (must reinitialize before each call).\n- poll(): Uses an array of struct pollfd { int fd; short events; short revents; }. No FD_SETSIZE limit. Does not overwrite requested events (revents returned separately)."
    },
    {
      "id": "M3_QH1",
      "module": 3,
      "sectorId": 3,
      "title": "Framing: Bit Stuffing vs Byte Stuffing",
      "type": "quick_hack",
      "marks": 3,
      "source": "Model Paper Q5",
      "scenario": "The transmitter must send raw binary data where payload patterns resemble the frame boundary delimiter `01111110`.",
      "question": "Define framing. Explain the use of byte stuffing and bit stuffing in making frame boundaries clear.",
      "options": [
        "(Recommended) Framing divides the physical bit stream into manageable frames; Byte stuffing inserts an Escape byte (ESC) before any data byte matching FLAG or ESC; Bit stuffing inserts a '0' bit automatically after five consecutive '1' bits to prevent accidental delimiter generation.",
        "Framing encrypts frames using RSA keys; Bit stuffing appends 100 random bits to every frame.",
        "Byte stuffing compresses text files; Bit stuffing converts digital bits into analog audio tones.",
        "Framing is only required on wireless satellite links, not on wired networks."
      ],
      "correctIndex": 0,
      "keywords": [
        "framing definition",
        "byte stuffing ESC flag",
        "bit stuffing 0 after five consecutive 1s",
        "flag 01111110"
      ],
      "rubric": [
        {
          "item": "Framing definition: delineating packet boundaries at the data link layer",
          "marks": 1.0
        },
        {
          "item": "Byte stuffing: inserting escape character (ESC) before payload bytes that match FLAG or ESC",
          "marks": 1.0
        },
        {
          "item": "Bit stuffing: inserting a 0 after every five consecutive 1s so payload cannot duplicate flag 01111110",
          "marks": 1.0
        }
      ],
      "tacticalIntel": "Framing: Packaging network-layer packets into data-link frames with identifiable start/end markers.\n- Byte (Character) Stuffing: Frame delimited by FLAG bytes. If FLAG appears in payload, transmitter prepends an Escape byte (ESC). If ESC appears in payload, it prepends another ESC.\n- Bit Stuffing: Frame delimited by flag 01111110 (six 1s). Whenever the transmitter observes five consecutive 1s in the data stream, it automatically stuffs a '0' bit. The receiver strips the '0' that follows five 1s."
    },
    {
      "id": "M3_QH2",
      "module": 3,
      "sectorId": 3,
      "title": "CSMA Persistence Comparison",
      "type": "quick_hack",
      "marks": 3,
      "source": "Model Paper Q6",
      "scenario": "OmniNet's multi-access sensor bus experiences intense channel contention. Evaluate CSMA persistence strategies.",
      "question": "Rank 1-persistent, non-persistent, and p-persistent CSMA in terms of (a) collision probability and (b) channel idle time.",
      "options": [
        "(Recommended) Collision Probability: 1-persistent > p-persistent > non-persistent; Channel Idle Time: non-persistent > p-persistent > 1-persistent.",
        "Collision Probability: non-persistent > 1-persistent > p-persistent; Channel Idle Time: 1-persistent > non-persistent > p-persistent.",
        "All three variants produce identical collision probabilities and zero idle time.",
        "Collision Probability: p-persistent > 1-persistent > non-persistent; Idle time is always zero."
      ],
      "correctIndex": 0,
      "keywords": [
        "collision probability 1-persistent highest",
        "channel idle time non-persistent highest",
        "p-persistent trade-off"
      ],
      "rubric": [
        {
          "item": "Collision ranking: 1-persistent (highest) > p-persistent > non-persistent (lowest) with justification",
          "marks": 1.5
        },
        {
          "item": "Idle time ranking: non-persistent (highest) > p-persistent > 1-persistent (lowest) with justification",
          "marks": 1.5
        }
      ],
      "tacticalIntel": "CSMA Persistence Strategies:\n- 1-Persistent: Senses channel. If idle, transmits immediately (p=1). If busy, listens continuously and transmits immediately when free. Highest collision chance (if two nodes wait for busy line, both transmit instantly upon idle), Lowest idle time.\n- Non-Persistent: Senses channel. If busy, waits a random backoff time before sensing again. Lowest collision chance, Highest idle time (channel may sit idle while nodes are backing off).\n- p-Persistent (Slotted channels): If idle, transmits with probability p; with probability (1-p), waits one slot. Balanced trade-off."
    },
    {
      "id": "M3_QH3",
      "module": 3,
      "sectorId": 3,
      "title": "Switch vs Router vs Hub",
      "type": "quick_hack",
      "marks": 3,
      "source": "Model Paper Q14b / Set 1 Q13b",
      "scenario": "Identify the proper interconnect device at each boundary of OmniNet's physical topology.",
      "question": "Differentiate between a hub, a switch, and a router with respect to their layer of operation and forwarding mechanism.",
      "options": [
        "(Recommended) Hub operates at Layer 1 (Physical) and blindly broadcasts electrical signals on all ports; Switch operates at Layer 2 (Data Link) and filters/forwards frames using learned MAC address tables; Router operates at Layer 3 (Network) and forwards packets across subnets using IP routing tables.",
        "Hub operates at Layer 3; Switch operates at Layer 1; Router operates at Layer 7.",
        "Switch and Hub are identical; Router only converts digital signals to analog.",
        "Router only operates inside a single LAN; Switch connects different worldwide autonomous systems."
      ],
      "correctIndex": 0,
      "keywords": [
        "hub layer 1 physical blind broadcast",
        "switch layer 2 data link MAC address table",
        "router layer 3 network IP routing forwarding"
      ],
      "rubric": [
        {
          "item": "Hub: Layer 1 (Physical), electrical repeater, single collision and broadcast domain",
          "marks": 1.0
        },
        {
          "item": "Switch: Layer 2 (Data Link), forwards frames by MAC address, separate collision domains",
          "marks": 1.0
        },
        {
          "item": "Router: Layer 3 (Network), forwards packets by IP address, separates broadcast domains",
          "marks": 1.0
        }
      ],
      "tacticalIntel": "Connecting Devices Summary:\n- Hub (Layer 1): Multiport repeater. Does not inspect addresses. Replicates incoming electrical bits to all other ports. High collisions.\n- Switch (Layer 2): Bridges segments. Inspects MAC header. Maintains a MAC Address Table (learned dynamically via source MAC of incoming frames). Forwards unicast frames only to designated port; floods unknown unicast/broadcast. Eliminates collisions on dedicated ports.\n- Router (Layer 3): Interconnects distinct subnets. Inspects IP header. Uses routing table (e.g. OSPF, BGP) to route packets across network boundaries. Breaks broadcast domains."
    },
    {
      "id": "M3_QH4",
      "module": 3,
      "sectorId": 3,
      "title": "Raw Packet Interfaces: DLPI vs SOCK_PACKET vs PF_PACKET",
      "type": "quick_hack",
      "marks": 3,
      "source": "Set 2 Q13 / Set 4 Q14 / Set 5 Q14b",
      "scenario": "To inject custom raw Ethernet frames into the kernel, you need the appropriate socket interface.",
      "question": "Distinguish between the Data-Link Provider Interface (DLPI) and packet sockets (SOCK_PACKET / PF_PACKET).",
      "options": [
        "(Recommended) DLPI is a UNIX System V STREAMS-based interface for accessing data-link services; SOCK_PACKET is an obsolete Linux socket interface returning link-layer frames; PF_PACKET is the modern Linux standard providing raw packet socket access (via AF_PACKET) with sockaddr_ll for clean protocol and interface binding.",
        "DLPI is an application protocol for email; PF_PACKET is used only for FTP.",
        "SOCK_PACKET is a hardware transceiver chip; DLPI is a router operating system.",
        "PF_PACKET operates exclusively over satellite microwave links."
      ],
      "correctIndex": 0,
      "keywords": [
        "DLPI STREAMS UNIX",
        "SOCK_PACKET obsolete Linux",
        "PF_PACKET modern Linux raw socket",
        "sockaddr_ll",
        "link-layer access"
      ],
      "rubric": [
        {
          "item": "DLPI: STREAMS-based kernel interface (UNIX System V) to communicate with data-link drivers",
          "marks": 1.5
        },
        {
          "item": "SOCK_PACKET vs PF_PACKET: SOCK_PACKET was early Linux mechanism with limitations; PF_PACKET (AF_PACKET) is standard modern packet socket using sockaddr_ll",
          "marks": 1.5
        }
      ],
      "tacticalIntel": "Link-layer socket access:\n- DLPI (Data-Link Provider Interface): AT&T UNIX System V specification. Uses STREAMS mechanism to allow user-space applications to bind directly to network drivers.\n- SOCK_PACKET: Early Linux hack using socket(AF_INET, SOCK_PACKET, ...). Clunky because device was specified via device name string in sockaddr.\n- PF_PACKET / AF_PACKET: Modern Linux socket mechanism (man 7 packet). Allows user to send/receive raw L2 Ethernet frames (including headers). Uses struct sockaddr_ll which specifies interface index (ifindex) cleanly. Used by Wireshark and tcpdump."
    },
    {
      "id": "M4_QH1",
      "module": 4,
      "sectorId": 4,
      "title": "SNMP, SMI and MIB Roles",
      "type": "quick_hack",
      "marks": 3,
      "source": "Model Paper Q8 / Set 1 Q8",
      "scenario": "You need to understand the network management triumvirate before spoofing management commands to OmniNet routers.",
      "question": "Explain the respective roles of SNMP, SMI, and MIB in network management.",
      "options": [
        "(Recommended) SMI defines the rules for naming and structuring managed objects; MIB is the virtual database defining the collection of managed objects; SNMP is the application-layer protocol that exchanges management messages and operations between managers and agents.",
        "SNMP defines the physical copper cables; SMI is the routing protocol; MIB is the operating system.",
        "MIB sends email notifications; SMI routes TCP segments; SNMP converts analog signals.",
        "All three terms are synonyms for the Linux ifconfig command."
      ],
      "correctIndex": 0,
      "keywords": [
        "SMI defines syntax and naming rules",
        "MIB virtual database of objects",
        "SNMP protocol exchanging messages",
        "manager agent",
        "UDP 161 162"
      ],
      "rubric": [
        {
          "item": "SMI (Structure of Management Information): rules for naming and describing managed objects",
          "marks": 1.0
        },
        {
          "item": "MIB (Management Information Base): virtual database of managed objects maintained on device",
          "marks": 1.0
        },
        {
          "item": "SNMP (Simple Network Management Protocol): protocol defining packet formats and operations (GET, SET, TRAP)",
          "marks": 1.0
        }
      ],
      "tacticalIntel": "Network Management Framework:\n1. SMI: Rules defining how MIB objects are named (using ASN.1 OID tree) and data types allowed (INTEGER, OCTET STRING, Counter, etc.).\n2. MIB: Collection of named managed objects (variables) representing device state (e.g., ifInOctets, sysUpTime).\n3. SNMP: Protocol that performs management tasks using PDU operations: GetRequest, GetNextRequest, GetBulkRequest, SetRequest, Response, Trap (port 162), InformRequest. Uses UDP port 161."
    },
    {
      "id": "M4_QH2",
      "module": 4,
      "sectorId": 4,
      "title": "Data Rate & Frequency Unit Conversions",
      "type": "quick_hack",
      "marks": 3,
      "source": "Set 1 Q15b / Set 4 Q16b / Set 5 Q16b",
      "scenario": "A digital link transmits 2400 bits in 0.8 seconds, and its carrier frequency is 2.5 kHz. Compute data rate and express frequency in Hz.",
      "question": "What is the data rate in bits/s, and what is 2.5 kHz expressed in Hertz?",
      "options": [
        "(Recommended) Data rate = 2400 / 0.8 = 3000 bps (3 kbps); 2.5 kHz = 2500 Hz (cycles per second).",
        "Data rate = 1920 bps; 2.5 kHz = 250 Hz.",
        "Data rate = 3000 bps; 2.5 kHz = 25,000 Hz.",
        "Data rate = 1200 bps; 2.5 kHz = 2.5 Hz."
      ],
      "correctIndex": 0,
      "keywords": [
        "3000 bps",
        "2500 Hz",
        "Rate = Bits / Time",
        "frequency measures cycles per second"
      ],
      "rubric": [
        {
          "item": "Data rate calculation: Rate = Bits / Time = 2400 / 0.8 = 3000 bps",
          "marks": 1.5
        },
        {
          "item": "Frequency conversion: 2.5 kHz * 1000 = 2500 Hz (measures cycles per second)",
          "marks": 1.5
        }
      ],
      "tacticalIntel": "Physical Layer Formulas:\n- Bit Rate (Data Rate) = Total Bits / Total Time (seconds). 2400 bits / 0.8 s = 3000 bps.\n- Frequency = Number of cycles completed in 1 second, measured in Hertz (Hz). 1 kHz = 1000 Hz; 1 MHz = 1,000,000 Hz. Thus 2.5 kHz = 2500 Hz."
    },
    {
      "id": "M4_QH3",
      "module": 4,
      "sectorId": 4,
      "title": "Digital vs Analog Transmission Comparison",
      "type": "quick_hack",
      "marks": 3,
      "source": "Set 1 Q8 / Set 2 Q16a / Set 5 Q15a",
      "scenario": "Compare the resilience of analog and digital transmission when passing through noisy industrial factory environments.",
      "question": "Compare digital and analog transmission in terms of signal representation and susceptibility to noise.",
      "options": [
        "(Recommended) Analog uses continuously variable signals, is highly susceptible to noise accumulation, and amplification amplifies noise; Digital uses discrete levels/pulses, has high noise immunity because regenerative repeaters reconstruct clean pulses without amplifying accumulated noise.",
        "Analog is completely immune to noise; Digital degrades exponentially over any copper wire.",
        "Both analog and digital signals use discrete square waves.",
        "Analog transmission does not require transmission media."
      ],
      "correctIndex": 0,
      "keywords": [
        "continuous vs discrete",
        "noise immunity",
        "regenerative repeaters vs amplifiers",
        "signal restoration"
      ],
      "rubric": [
        {
          "item": "Signal representation: analog is continuously varying; digital uses discrete signal levels (binary pulses)",
          "marks": 1.5
        },
        {
          "item": "Noise susceptibility: analog amplifies noise with signal; digital repeaters regenerate original pulses, offering high noise immunity",
          "marks": 1.5
        }
      ],
      "tacticalIntel": "Digital vs Analog Transmission:\n- Analog: Continuous waveform over time. As signal travels, attenuation occurs; amplifiers boost both signal AND accumulated noise, causing irreversible distortion.\n- Digital: Discrete pulses (e.g., +V and -V). High noise immunity. At intermediate distances, regenerative repeaters detect whether pulse is 1 or 0 and output a pristine, noise-free pulse, eliminating noise accumulation. Supports compression and encryption."
    },
    {
      "id": "M4_QH4",
      "module": 4,
      "sectorId": 4,
      "title": "Line Coding Waveforms (NRZ-L, NRZ-I, Manchester)",
      "type": "quick_hack",
      "marks": 3,
      "source": "Model Paper Q7",
      "scenario": "Identify the signal voltage level transitions for the bit sequence 0 1 0 0 1 1 under Manchester and NRZ schemes.",
      "question": "For bit sequence '0 1 0 0 1 1', what are the transition rules for NRZ-L, NRZ-I, and Manchester?",
      "options": [
        "(Recommended) NRZ-L: Level determines bit (e.g. 0=High, 1=Low); NRZ-I: Inversion at beginning of bit indicates 1 (no change for 0); Manchester: Inversion at middle of every bit interval (High-to-Low for 0, Low-to-High for 1).",
        "Manchester only transitions when a bit is 0, staying completely flat for 1.",
        "NRZ-L requires two transitions per bit while NRZ-I requires four transitions per bit.",
        "All three line codes use 3 distinct voltage levels (+5V, 0V, -5V)."
      ],
      "correctIndex": 0,
      "keywords": [
        "NRZ-L level determines bit",
        "NRZ-I transition on 1 no transition on 0",
        "Manchester mid-bit transition",
        "clock synchronization"
      ],
      "rubric": [
        {
          "item": "NRZ-L: Signal level depends on bit value (0=positive/high, 1=negative/low or vice versa)",
          "marks": 1.0
        },
        {
          "item": "NRZ-I: Inversion at beginning of interval represents 1; no transition represents 0",
          "marks": 1.0
        },
        {
          "item": "Manchester: Mid-bit transition in every interval (synchronization); e.g. High-to-Low = 0, Low-to-High = 1",
          "marks": 1.0
        }
      ],
      "tacticalIntel": "Line Coding Rules:\n- NRZ-L (Non-Return-to-Zero Level): Level of voltage determines bit value. Typically High = 0, Low = 1.\n- NRZ-I (NRZ Invert): A transition at the start of bit interval signifies '1'; NO transition signifies '0'. Eliminates DC bias if 1s are frequent.\n- Manchester: Transition at middle of bit interval. Serves as clock and data: High-to-Low = '0', Low-to-High = '1' (or vice versa according to convention). Self-synchronizing, no DC component, but requires 2x bandwidth."
    }
  ],
  "bossBattles": [
    {
      "id": "M1_BOSS_HTTP_DNS",
      "module": 1,
      "sectorId": 1,
      "title": "BOSS ENCOUNTER: The DNS-HTTP Transaction Sentinel",
      "marks": 9,
      "subdivisions": [
        {
          "part": "(a)",
          "marks": 4,
          "text": "A user types 'www.example.test' in a browser. Trace the complete sequence of DNS resolution and HTTP communication involved in retrieving the web page."
        },
        {
          "part": "(b)",
          "marks": 5,
          "text": "Explain the layered architecture of the TCP/IP protocol suite. State the primary function and the Protocol Data Unit (PDU) handled at each of the 5 layers."
        }
      ],
      "scenario": "You stand before the OmniNet Web Gateway. To bypass the perimeter firewall, you must demonstrate mastery over the end-to-end DNS lookup and HTTP request pipeline, followed by layer-by-layer encapsulation.",
      "rubric": [
        {
          "step": "Part (a) - DNS Resolution Sequence",
          "marks": 2.5,
          "criteria": "Browser checks local cache -> queries Local DNS Server -> iterative/recursive lookup (Root DNS -> TLD DNS (.test) -> Authoritative DNS) -> returns A record with IP address."
        },
        {
          "step": "Part (a) - HTTP Fetch Sequence",
          "marks": 1.5,
          "criteria": "TCP 3-way handshake on port 80/443 -> Browser sends HTTP GET request -> Server replies HTTP 200 OK with HTML payload -> Connection termination/keep-alive."
        },
        {
          "step": "Part (b) - 5 Layers & Functions",
          "marks": 3.0,
          "criteria": "Application (services to user/processes), Transport (end-to-end process-to-process delivery, reliability, flow control), Network (host-to-host routing, logical addressing), Data Link (hop-to-hop frame delivery, MAC addressing, error detection), Physical (bit transmission over physical medium)."
        },
        {
          "step": "Part (b) - PDU Names",
          "marks": 2.0,
          "criteria": "Application: Message/Data; Transport: Segment (TCP) / Datagram (UDP); Network: Datagram/Packet; Data Link: Frame; Physical: Bits."
        }
      ],
      "solverGuide": {
        "keyStages": [
          "Stage 1 (DNS): User types URL -> Local DNS cache check -> Local DNS server queries Root DNS -> Root returns TLD referral -> TLD returns Authoritative DNS referral -> Authoritative returns IP address (A record) -> IP returned to browser.",
          "Stage 2 (HTTP): Browser opens TCP socket to server IP on port 80/443 -> 3-way handshake (SYN, SYN-ACK, ACK) -> HTTP GET / HTTP/1.1 -> HTTP 200 OK with body -> Browser renders DOM.",
          "Stage 3 (Layers): Application (Message) -> Transport (Segment) -> Network (Datagram/Packet) -> Data Link (Frame) -> Physical (Bits)."
        ]
      },
      "tacticalIntel": "EXAM 9-MARK MASTER STRATEGY:\n1. Always draw a neat sequence diagram for (a) showing Host -> Local DNS -> Root -> TLD -> Auth, then Host <-> Web Server (TCP Handshake -> HTTP GET -> HTTP 200 OK).\n2. For (b), draw the 5-layer stack table with columns: Layer Name | Primary Function | PDU Name handled.\n3. Keywords examiners search for: 'Iterative vs Recursive', 'Authoritative Server', 'A record', '3-Way Handshake', 'HTTP GET', 'Encapsulation', 'Hop-to-Hop vs End-to-End'."
    },
    {
      "id": "M1_BOSS_P2P_BITTORRENT",
      "module": 1,
      "sectorId": 1,
      "title": "BOSS ENCOUNTER: The BitTorrent Swarm Core",
      "marks": 9,
      "subdivisions": [
        {
          "part": "(a)",
          "marks": 4,
          "text": "Compare the client-server and peer-to-peer (P2P) paradigms with respect to resource distribution, scalability, and vulnerability/single point of failure."
        },
        {
          "part": "(b)",
          "marks": 5,
          "text": "Explain the architecture and working of BitTorrent as a peer-to-peer file-sharing system. Describe the roles of torrent files, trackers, pieces, rarest-first selection, and the tit-for-tat incentive mechanism."
        }
      ],
      "scenario": "OmniNet uses a rogue BitTorrent swarm to distribute encrypted surveillance malware across thousands of botnet nodes. Infiltrate the swarm protocol.",
      "rubric": [
        {
          "step": "Part (a) - Comparison Matrix",
          "marks": 4.0,
          "criteria": "Resource distribution (centralized server vs shared peer storage/bandwidth); Scalability (server bandwidth becomes bottleneck in C-S vs self-scaling capacity in P2P); Single point of failure (server failure halts C-S vs robust fault-tolerance in P2P)."
        },
        {
          "step": "Part (b) - BitTorrent Components",
          "marks": 2.5,
          "criteria": "File divided into equal pieces (typically 256KB); .torrent file contains tracker URL and piece SHA-1 hashes; Tracker coordinates active peers in a 'swarm' (does not store file)."
        },
        {
          "step": "Part (b) - Algorithms & Tit-for-Tat",
          "marks": 2.5,
          "criteria": "Rarest-First: peers request rarest pieces in swarm first to prevent extinction; Tit-for-Tat: peers provide upload bandwidth to top 4 fastest uploaders ('unchoked'), with optimistic unchoking of 1 random peer every 30s to discover better paths."
        }
      ],
      "solverGuide": {
        "keyStages": [
          "Part (a): Draw comparison table covering Resource Distribution, Scalability, Maintenance Cost, Bottlenecks.",
          "Part (b): 1. File split into 256KB pieces. 2. .torrent file parsed. 3. Tracker contacted, returns list of IP:ports in swarm. 4. Peer exchanges bitfields. 5. Rarest-first piece download strategy. 6. Choking/Unchoking & Tit-for-Tat algorithm."
        ]
      },
      "tacticalIntel": "BitTorrent Key Concepts:\n- Swarm: Group of all peers downloading/uploading the same torrent.\n- Seeder: Peer having 100% complete file.\n- Leecher: Peer currently downloading pieces.\n- Tracker: Central coordinator maintaining swarm IP lists (does NOT hold file contents).\n- Rarest-First: Peers request pieces that are least copied among neighbors first. Ensures rarest pieces replicate quickly so they don't disappear if a seeder departs.\n- Tit-for-Tat (Choking): Prevents freeloading. Peer continuously evaluates upload rates from neighbors and unchokes the top 4 highest-rate providers. Optimistic unchoking chooses a 5th random peer to explore new bandwidth opportunities."
    },
    {
      "id": "M2_BOSS_DIJKSTRA",
      "module": 2,
      "sectorId": 2,
      "title": "BOSS ENCOUNTER: The Dijkstra Shortest Path Router",
      "marks": 9,
      "subdivisions": [
        {
          "part": "(a)",
          "marks": 5,
          "text": "Apply Dijkstra's algorithm to compute the shortest path and routing table from Source Router A to all other nodes in the network graph: Links & Costs: A-B=2, A-C=5, B-C=1, B-D=4, C-D=1, C-E=3, D-E=1."
        },
        {
          "part": "(b)",
          "marks": 4,
          "text": "Distinguish between Distance Vector Routing and Link State Routing. Explain why Link State avoids the count-to-infinity problem."
        }
      ],
      "scenario": "The core routing table of OmniNet has been poisoned. You must compute the true least-cost routing tree from node A to all destinations and expose the difference between Link State and Distance Vector algorithms.",
      "rubric": [
        {
          "step": "Part (a) - Dijkstra Step-by-Step Table",
          "marks": 3.0,
          "criteria": "Step 0: Visited={A}, D(B)=2(A), D(C)=5(A), others=inf. Select B. Step 1: Visited={A,B}, D(C)=min(5, 2+1)=3(B), D(D)=2+4=6(B). Select C. Step 2: Visited={A,B,C}, D(D)=min(6, 3+1)=4(C), D(E)=3+3=6(C). Select D. Step 3: Visited={A,B,C,D}, D(E)=min(6, 4+1)=5(D). Select E."
        },
        {
          "step": "Part (a) - Final Routing Table of Node A",
          "marks": 2.0,
          "criteria": "Destination B: Cost=2, Next Hop=B; Destination C: Cost=3, Next Hop=B; Destination D: Cost=4, Next Hop=B; Destination E: Cost=5, Next Hop=B."
        },
        {
          "step": "Part (b) - DVR vs LSR Comparison",
          "marks": 3.0,
          "criteria": "DVR: nodes share full table only with neighbors, Bellman-Ford, slow convergence; LSR: nodes flood link states to entire network, Dijkstra, global topological database."
        },
        {
          "step": "Part (b) - Count-to-Infinity Explanation",
          "marks": 1.0,
          "criteria": "DVR suffers from count-to-infinity because routers route on rumor without global topology; LSR maintains full network topology map at every node, preventing routing loops."
        }
      ],
      "solverGuide": {
        "keyStages": [
          "Step 0: Permanent {A}. Tentative: B:2(A), C:5(A), D:inf, E:inf. Pick min B (cost 2).",
          "Step 1: Permanent {A,B}. Tentative: C:min(5, 2+1)=3(B), D:2+4=6(B), E:inf. Pick min C (cost 3).",
          "Step 2: Permanent {A,B,C}. Tentative: D:min(6, 3+1)=4(C), E:3+3=6(C). Pick min D (cost 4).",
          "Step 3: Permanent {A,B,C,D}. Tentative: E:min(6, 4+1)=5(D). Pick min E (cost 5).",
          "Step 4: Permanent {A,B,C,D,E}. All nodes resolved!",
          "Final Routing Table of A: B(cost 2, via B), C(cost 3, via B), D(cost 4, via B), E(cost 5, via B)."
        ]
      },
      "tacticalIntel": "Dijkstra Exam Rule:\n1. You MUST draw the step-by-step table with columns: `Step | Permanent Set N' | D(B),p(B) | D(C),p(C) | D(D),p(D) | D(E),p(E)`. Marks are deducted if you only provide the final answer.\n2. Final routing table format must list: Destination | Least Cost | Next-Hop Router.\n3. Count-to-infinity in DVR happens when a link breaks, and two adjacent routers endlessly increment distance based on outdated neighbor routing tables (mitigated by split horizon and poison reverse)."
    },
    {
      "id": "M2_BOSS_TCP_TRACE",
      "module": 2,
      "sectorId": 2,
      "title": "BOSS ENCOUNTER: The TCP Sequence & Flow Control Engine",
      "marks": 9,
      "subdivisions": [
        {
          "part": "(a)",
          "marks": 5,
          "text": "Explain the establishment of a TCP connection using the three-way handshake. State the flag settings, sequence numbers exchanged, and justify why a SYN segment consumes one sequence number even though it carries no application data."
        },
        {
          "part": "(b)",
          "marks": 4,
          "text": "A TCP sender transmits 3 consecutive segments with sequence numbers 1000, 1200, and 1400. Segment 1 carries 200 bytes, Segment 2 carries 200 bytes, and Segment 3 carries 150 bytes. Determine: (i) The byte range of each segment, (ii) The next expected acknowledgement number after all 3 segments are received in order, and (iii) What ACK is sent if Segment 2 is lost and only Segments 1 and 3 arrive."
        }
      ],
      "scenario": "OmniNet's mainframe synchronizes via TCP byte streams. Solve the sequence number puzzle to avoid sequence desynchronization defenses.",
      "rubric": [
        {
          "step": "Part (a) - 3-Way Handshake Diagram & Flags",
          "marks": 3.0,
          "criteria": "Step 1: Client sends SYN=1, ACK=0, Seq=ISN_c. Step 2: Server sends SYN=1, ACK=1, Seq=ISN_s, Ack=ISN_c + 1. Step 3: Client sends SYN=0, ACK=1, Seq=ISN_c + 1, Ack=ISN_s + 1."
        },
        {
          "step": "Part (a) - SYN 1 Seq No Justification",
          "marks": 2.0,
          "criteria": "SYN consumes 1 sequence number so that its arrival can be explicitly acknowledged by the peer (Ack = ISN + 1). Without consuming a sequence number, the receiver could not distinguish acknowledgement of SYN from duplicate packets."
        },
        {
          "step": "Part (b) - Byte Ranges & In-Order ACK",
          "marks": 2.5,
          "criteria": "Segment 1: bytes 1000 to 1199 (200 bytes). Segment 2: bytes 1200 to 1399 (200 bytes). Segment 3: bytes 1400 to 1549 (150 bytes). In-order ACK after all 3 = 1550 (next expected byte)."
        },
        {
          "step": "Part (b) - Missing Segment 2 ACK",
          "marks": 1.5,
          "criteria": "If Segment 2 is lost, TCP uses cumulative ACKs; receiver receives bytes 1400-1549 out of order, buffers it, but sends ACK = 1200 (still waiting for byte 1200)."
        }
      ],
      "solverGuide": {
        "keyStages": [
          "Part (a): Draw handshake timeline with Client and Server arrows labeled with SYN/ACK flags and Sequence/Ack numbers.",
          "Part (b) (i): Byte range = [Seq, Seq + Length - 1]. Seg 1: 1000..1199; Seg 2: 1200..1399; Seg 3: 1400..1549.",
          "Part (b) (ii): All in order -> next expected byte = 1549 + 1 = 1550.",
          "Part (b) (iii): Cumulative ACK rule: ACK indicates the next missing in-order byte. Since bytes 1200-1399 never arrived, ACK is 1200."
        ]
      },
      "tacticalIntel": "TCP Sequence & ACK Formula:\n- End Byte = Start Byte + Payload Length - 1.\n- Next Expected ACK = Highest in-order byte received + 1.\n- Cumulative ACK property: TCP never acknowledges bytes beyond a missing gap. It continually acknowledges the start of the missing gap (duplicate ACKs), which eventually triggers Fast Retransmit (after 3 duplicate ACKs)!"
    },
    {
      "id": "M2_BOSS_FRAGMENTATION",
      "module": 2,
      "sectorId": 2,
      "title": "BOSS ENCOUNTER: The IPv4 MTU Fragmentation Siphon",
      "marks": 9,
      "subdivisions": [
        {
          "part": "(a)",
          "marks": 5,
          "text": "An IP datagram of total length 4000 bytes (including a 20-byte IP header) must pass through a link with an MTU of 1500 bytes. Calculate: (i) Number of fragments, (ii) For each fragment, specify Total Length, Header Length, Data Length, Fragment Offset, and More Fragments (MF) flag."
        },
        {
          "part": "(b)",
          "marks": 4,
          "text": "Explain the features of IPv6 and compare its 40-byte fixed base header with the IPv4 header. State three major advantages of IPv6 over IPv4."
        }
      ],
      "scenario": "A massive 4000-byte encrypted exfiltration packet must traverse a narrow 1500-byte MTU router bottleneck. Compute the fragmentation fields accurately.",
      "rubric": [
        {
          "step": "Part (a) - Fragmentation Derivation",
          "marks": 5.0,
          "criteria": "Total data = 4000 - 20 = 3980B. Max data per fragment = 1500 - 20 = 1480B (multiple of 8: 1480 / 8 = 185). Frag 1: Total=1500, Data=1480, Offset=0, MF=1. Frag 2: Total=1500, Data=1480, Offset=185 (1480/8), MF=1. Frag 3: Remaining data = 3980 - 2960 = 1020B. Total=1040, Data=1020, Offset=370 (2960/8), MF=0."
        },
        {
          "step": "Part (b) - IPv6 Fixed Header & Features",
          "marks": 2.5,
          "criteria": "Fixed 40-byte header format: Version, Traffic Class, Flow Label, Payload Length, Next Header, Hop Limit, Source & Dest IP (128-bit each). Simplifies router processing."
        },
        {
          "step": "Part (b) - Advantages over IPv4",
          "marks": 1.5,
          "criteria": "1) Vast 128-bit address space (no NAT required). 2) Simplified header format speeds up routing. 3) Better security with mandatory IPSec support and elimination of router fragmentation."
        }
      ],
      "solverGuide": {
        "keyStages": [
          "Data size = 4000 - 20 = 3980 bytes.",
          "Max data per fragment = 1500 - 20 = 1480 bytes. Check multiple of 8: 1480 / 8 = 185 (valid!).",
          "Fragment 1: Data 0..1479 (1480B). Total Length=1500, Offset=0, MF=1.",
          "Fragment 2: Data 1480..2959 (1480B). Total Length=1500, Offset=1480/8 = 185, MF=1.",
          "Fragment 3: Data 2960..3979 (1020B). Total Length=1040, Offset=2960/8 = 370, MF=0."
        ]
      },
      "tacticalIntel": "MTU Fragmentation Rules:\n- Fragment Offset is ALWAYS measured in 8-byte units! Offset = Data_Start_Byte / 8.\n- Data payload in each fragment (except the last) MUST be a multiple of 8.\n- MF (More Fragments) flag: MF=1 for all fragments except the final fragment where MF=0.\n- Total Length in header = Header (20B) + Fragment Data Length."
    },
    {
      "id": "M3_BOSS_CRC",
      "module": 3,
      "sectorId": 3,
      "title": "BOSS ENCOUNTER: The CRC Polynomial Sentinel",
      "marks": 9,
      "subdivisions": [
        {
          "part": "(a)",
          "marks": 6,
          "text": "A data unit '100100' is to be transmitted using CRC with generator polynomial g(x) = x\u00b3 + x\u00b2 + 1. (i) Find the CRC bits (FCS) and the transmitted codeword. (ii) Show the receiver verification check when the codeword is received without errors."
        },
        {
          "part": "(b)",
          "marks": 3,
          "text": "Explain the architecture of Mobile IP. Describe the roles of Home Agent (HA), Foreign Agent (FA), Home Address, and Care-of Address (COA)."
        }
      ],
      "scenario": "OmniNet's frame integrity firewall enforces strict polynomial error-checking. Perform modulo-2 division to generate the valid codeword.",
      "rubric": [
        {
          "step": "Part (a) - Polynomial to Divisor",
          "marks": 1.0,
          "criteria": "Generator g(x) = x^3 + x^2 + 0x + 1 -> divisor binary: '1101'. Degree of polynomial = 3."
        },
        {
          "step": "Part (a) - Sender Modulo-2 Division",
          "marks": 3.0,
          "criteria": "Append 3 zeros to data 100100 -> 100100000. Divide by 1101 using XOR subtraction. Step-by-step remainder obtained is '001'. Transmitted codeword = '100100001'."
        },
        {
          "step": "Part (a) - Receiver Error Verification",
          "marks": 2.0,
          "criteria": "Receiver divides received codeword 100100001 by generator 1101. Remainder obtained is 000 (all zeros), confirming frame is error-free."
        },
        {
          "step": "Part (b) - Mobile IP Roles",
          "marks": 3.0,
          "criteria": "Home Agent: router on home network tunneling packets to MN; Foreign Agent: router on visited network forwarding to MN; Home Address: permanent IP; Care-of Address: temporary IP on foreign network."
        }
      ],
      "solverGuide": {
        "keyStages": [
          "Generator: x^3 + x^2 + 1 -> 1101 (4 bits). Append degree(g)=3 zeros to 100100 -> 100100000.",
          "Division: 100100000 / 1101 using XOR:",
          "  100100000",
          "^ 1101",
          "--------",
          "   1000",
          " ^ 1101",
          " ------",
          "    1010",
          "  ^ 1101",
          "  ------",
          "     1110",
          "   ^ 1101",
          "   ------",
          "      0110",
          "    ^ 0000",
          "    ------",
          "       1100",
          "     ^ 1101",
          "     ------",
          "        001 -> CRC bits = 001.",
          "Codeword = Data + CRC = 100100 001 = 100100001.",
          "Receiver check: 100100001 / 1101 leaves remainder 000 -> Accepted!"
        ]
      },
      "tacticalIntel": "CRC Step-by-Step Rules:\n1. If generator is degree $n$, append exactly $n$ zeros to data.\n2. In Modulo-2 division, subtraction is bitwise XOR: $0 \\oplus 0 = 0$, $1 \\oplus 1 = 0$, $0 \\oplus 1 = 1$, $1 \\oplus 0 = 1$ (no borrows!).\n3. Whenever the leading bit of the current dividend is 1, divide by divisor. If leading bit is 0, divide by 0000.\n4. Transmitted Codeword = Data appended with Remainder (same number of bits as $n$)."
    },
    {
      "id": "M3_BOSS_ETHERNET_CSMA",
      "module": 3,
      "sectorId": 3,
      "title": "BOSS ENCOUNTER: The Standard Ethernet & CSMA/CD Matrix",
      "marks": 9,
      "subdivisions": [
        {
          "part": "(a)",
          "marks": 5,
          "text": "Explain the operation of CSMA/CD. Why does Standard Ethernet enforce a minimum frame length of 64 bytes? State the formula relating minimum frame size, round-trip propagation delay (2*Tp), and bandwidth."
        },
        {
          "part": "(b)",
          "marks": 4,
          "text": "Compare the four implementations of Standard Ethernet: 10Base5, 10Base2, 10Base-T, and 10Base-F in terms of transmission medium, physical topology, and maximum segment length."
        }
      ],
      "scenario": "Bypass OmniNet's collision domain detection and configure legacy bus adapters to match the 802.3 Ethernet standard.",
      "rubric": [
        {
          "step": "Part (a) - CSMA/CD Collision Detection Mechanism",
          "marks": 2.5,
          "criteria": "Carrier sense before sending; Transmit while sensing; If signal amplitude spikes above collision threshold, abort transmission, transmit jam signal (32/48 bits), and invoke binary exponential backoff."
        },
        {
          "step": "Part (a) - 64-Byte Min Frame Size Formula",
          "marks": 2.5,
          "criteria": "Formula: Transmission Time (T_fr) >= 2 * Propagation Time (T_p). Minimum Frame Size = 2 * T_p * Bandwidth. For 10 Mbps and 2500m segment (2 * T_p = 51.2 us), 51.2 us * 10 Mbps = 512 bits = 64 bytes. Ensures sender is still transmitting when collision signal returns."
        },
        {
          "step": "Part (b) - Standard Ethernet Comparison Table",
          "marks": 4.0,
          "criteria": "10Base5: Thick Coax, Bus, 500m; 10Base2: Thin Coax, Bus, 185m (~200m); 10Base-T: Unshielded Twisted Pair (Cat 3/5), Star, 100m; 10Base-F: Optical Fiber, Star, 2000m (2 km)."
        }
      ],
      "solverGuide": {
        "keyStages": [
          "Part (a): CSMA/CD flowchart: Sense carrier -> if free transmit -> listen for collision -> if collision: send jam signal, increment attempts k, wait random backoff time r * 51.2 us where r in [0..2^k - 1].",
          "Part (a) Min Frame: If frame ends before collision arrives, sender thinks transmission succeeded. Thus T_fr >= 2 * T_p. Min frame = 64 bytes.",
          "Part (b) Table: Columns: Name | Cable Medium | Topology | Max Segment Length | Connector."
        ]
      },
      "tacticalIntel": "Ethernet Implementation Quick Memory Table:\n- 10Base5: 'Thicknet', Thick Coaxial (RG-8), Bus topology, 500 meters, Vampire tap / AUI.\n- 10Base2: 'Thinnet' / 'Cheapernet', Thin Coaxial (RG-58), Bus topology, 185 meters, BNC-T.\n- 10Base-T: Twisted Pair (UTP Cat 3/5), Physical Star / Logical Bus, 100 meters, RJ-45 connector.\n- 10Base-F: Fiber Optic cable (850nm), Star topology, 2000 meters (2 km), ST/SC connector."
    },
    {
      "id": "M4_BOSS_SNMP_OPERATIONS",
      "module": 4,
      "sectorId": 4,
      "title": "BOSS ENCOUNTER: The SNMP Network Management Overlord",
      "marks": 9,
      "subdivisions": [
        {
          "part": "(a)",
          "marks": 6,
          "text": "Describe the architecture and components of SNMP (Manager, Agent, MIB, SMI). Explain the operations and PDU message types: GetRequest, GetNextRequest, GetBulkRequest, SetRequest, Response, and Trap. Specify the transport protocol and port numbers used."
        },
        {
          "part": "(b)",
          "marks": 3,
          "text": "Explain the concept of Object Identifiers (OID) in the SMI tree. Given the tree path iso(1).org(3).dod(6).internet(1).mgmt(2).mib-2(1), write the numeric OID and explain its purpose."
        }
      ],
      "scenario": "You have breached the Central AI room. To issue the master shutdown command, you must construct an authenticated SNMP SetRequest and decode MIB-2 tree objects.",
      "rubric": [
        {
          "step": "Part (a) - Architecture & Components",
          "marks": 2.5,
          "criteria": "Manager (NMS station querying devices), Agent (daemon on managed device maintaining local MIB), MIB (database of objects), SMI (structure defining data types and naming)."
        },
        {
          "step": "Part (a) - Operations & PDUs",
          "marks": 2.5,
          "criteria": "GetRequest (retrieve value), GetNextRequest (table traversal), GetBulkRequest (large data chunk), SetRequest (modify variable value), Response (agent reply), Trap (unsolicited alarm sent by agent)."
        },
        {
          "step": "Part (a) - Transport & Ports",
          "marks": 1.0,
          "criteria": "Uses UDP; Port 161 for Manager-to-Agent requests and replies; Port 162 for Agent-to-Manager Traps."
        },
        {
          "step": "Part (b) - OID Structure & Numeric Value",
          "marks": 3.0,
          "criteria": "Hierarchical tree structure assigned by ISO/ITU-T. Path 1.3.6.1.2.1 uniquely identifies the standard mib-2 sub-tree containing system, interfaces, ip, tcp, and udp management groups."
        }
      ],
      "solverGuide": {
        "keyStages": [
          "Part (a): Draw diagram of Manager <-> Agent with UDP 161 (Get/Set/Response) and UDP 162 (Trap).",
          "Part (a): Detail each PDU type clearly.",
          "Part (b): Tree traversal: iso(1) -> org(3) -> dod(6) -> internet(1) -> mgmt(2) -> mib-2(1) = 1.3.6.1.2.1."
        ]
      },
      "tacticalIntel": "SNMP Trap vs Other PDUs:\n- Trap is the ONLY unsolicited message in SNMPv1/v2! The agent detects an abnormal event (link down, cold restart, authentication failure) and pushes an alert to the Manager without being queried.\n- Port distinction: Normal queries/responses use UDP port 161 on the agent. Traps are sent to UDP port 162 on the manager station."
    },
    {
      "id": "M4_BOSS_ASN1_DEBUGGER",
      "module": 4,
      "sectorId": 4,
      "title": "BOSS ENCOUNTER: The ASN.1 Grammar & Syntax Compiler",
      "marks": 9,
      "subdivisions": [
        {
          "part": "(a)",
          "marks": 5,
          "text": "The following ASN.1 declarations contain syntax errors. Identify each error, provide the corrected declaration, and explain the rule violated:\n1. numberOfStudents ::= INTEGER (15..40)\n2. HerAge INTEGER ::= 35\n3. classSize NumberOfStudents ::= 50\n(Assume corrected declaration 1 defines the type used in 3)."
        },
        {
          "part": "(b)",
          "marks": 4,
          "text": "Write valid ASN.1 definitions for: (i) An enumerated type 'DayOfWeek' containing values sun to sat, (ii) A subtype 'Weekend' that allows only sun or sat, and (iii) A variable 'holiday' of type Weekend initialized to sun."
        }
      ],
      "scenario": "OmniNet's central compiler rejects your firmware payload due to ASN.1 type violations. Debug the abstract syntax declarations and define the required enumeration types.",
      "rubric": [
        {
          "step": "Part (a) - Error 1 Correction",
          "marks": 1.5,
          "criteria": "Type names in ASN.1 MUST start with an UPPERCASE letter. 'numberOfStudents' is lowercase. Correct: 'NumberOfStudents ::= INTEGER (15..40)'."
        },
        {
          "step": "Part (a) - Error 2 Correction",
          "marks": 1.5,
          "criteria": "Variable names MUST start with a LOWERCASE letter. 'HerAge' is capitalized. Correct: 'herAge INTEGER ::= 35'."
        },
        {
          "step": "Part (a) - Error 3 Correction",
          "marks": 2.0,
          "criteria": "The assigned value 50 violates the range constraint (15..40) defined in NumberOfStudents. Correct: choose a value within 15..40, e.g., 'classSize NumberOfStudents ::= 30'."
        },
        {
          "step": "Part (b) - ASN.1 Type Definitions",
          "marks": 4.0,
          "criteria": "(i) DayOfWeek ::= ENUMERATED { sun(0), mon(1), tue(2), wed(3), thu(4), fri(5), sat(6) }. (ii) Weekend ::= DayOfWeek (sun | sat). (iii) holiday Weekend ::= sun."
        }
      ],
      "solverGuide": {
        "keyStages": [
          "Rule 1: Type definitions start with Capital letter (e.g. NumberOfStudents).",
          "Rule 2: Variable/Value instances start with lowercase letter (e.g. herAge).",
          "Rule 3: Value assigned must satisfy subrange constraint (50 is out of bounds [15..40]).",
          "Part (b): Use ENUMERATED { ... } and parentheses for subtype selection (sun | sat)."
        ]
      },
      "tacticalIntel": "ASN.1 Lexical Rules (Guaranteed Marks):\n- Type Names: ALWAYS begin with an UPPERCASE letter (e.g., Integer, StudentRecord, DayOfWeek).\n- Value / Variable Names: ALWAYS begin with a LOWERCASE letter (e.g., studentCount, herAge, holiday).\n- Assignment operator: `::=` (Colon-Colon-Equal).\n- Range constraint: `INTEGER (min..max)`.\n- Enumerated type: `DayOfWeek ::= ENUMERATED { mon(1), tue(2), ... }`."
    },
    {
      "id": "M4_BOSS_MODULATION_MEDIA",
      "module": 4,
      "sectorId": 4,
      "title": "BOSS ENCOUNTER: The Carrier Modulation & Nyquist Mainframe",
      "marks": 9,
      "subdivisions": [
        {
          "part": "(a)",
          "marks": 5,
          "text": "A digital bit stream '1 0 1 1 0' is transmitted over a bandpass channel using digital-to-analog conversion. (i) Describe the carrier parameter that changes in ASK, FSK, and PSK. (ii) State the bandwidth formula for each technique."
        },
        {
          "part": "(b)",
          "marks": 4,
          "text": "Explain the difference between Nyquist bit rate and Shannon capacity. A noiseless channel has a bandwidth of 4 kHz and carries a signal with 4 signal levels. A noisy channel has 4 kHz bandwidth with SNR = 63. Calculate the maximum data rate for both."
        }
      ],
      "scenario": "Align carrier modulation waveforms and compute physical capacity limits to initiate the ultimate mainframe override.",
      "rubric": [
        {
          "step": "Part (a) - Modulation Parameters & Waveforms",
          "marks": 3.0,
          "criteria": "ASK (Amplitude Shift Keying): peak amplitude changes, frequency/phase constant. FSK (Frequency Shift Keying): frequency changes, amplitude/phase constant. PSK (Phase Shift Keying): phase changes (e.g. 180 deg shift), amplitude/frequency constant."
        },
        {
          "step": "Part (a) - Bandwidth Formulas",
          "marks": 2.0,
          "criteria": "B_ASK = (1 + d) * S; B_FSK = 2*delta_f + (1 + d) * S; B_PSK = (1 + d) * S (where S is signal rate/baud rate, d is modulation factor between 0 and 1)."
        },
        {
          "step": "Part (b) - Nyquist Calculation",
          "marks": 2.0,
          "criteria": "Formula: C = 2 * B * log2(L). For B = 4 kHz (4000 Hz) and L = 4: C = 2 * 4000 * log2(4) = 2 * 4000 * 2 = 16,000 bps (16 kbps)."
        },
        {
          "step": "Part (b) - Shannon Calculation",
          "marks": 2.0,
          "criteria": "Formula: C = B * log2(1 + SNR). For B = 4000 Hz and SNR = 63: C = 4000 * log2(1 + 63) = 4000 * log2(64) = 4000 * 6 = 24,000 bps (24 kbps)."
        }
      ],
      "solverGuide": {
        "keyStages": [
          "Part (a): Modulated parameter: ASK -> Amplitude (high vs zero/low); FSK -> Frequency (dense cycles for 1, sparse for 0); PSK -> Phase (phase reversal at bit transitions).",
          "Part (b) Nyquist: C = 2 * B * log2(L) = 2 * 4000 * 2 = 16,000 bps.",
          "Part (b) Shannon: C = B * log2(1 + SNR) = 4000 * log2(64) = 4000 * 6 = 24,000 bps."
        ]
      },
      "tacticalIntel": "Data Rate Limits:\n- Nyquist Bit Rate (Noiseless Channel): Defines theoretical maximum bit rate when no noise exists. Formula: $C = 2 \times B \times \\log_2(L)$ bps, where $B$ = bandwidth in Hz, $L$ = number of signal levels.\n- Shannon Channel Capacity (Noisy Channel): Defines absolute physical upper limit in the presence of thermal noise. Formula: $C = B \times \\log_2(1 + SNR)$ bps.\n- Note: If $SNR_{dB}$ is given in decibels: $SNR_{dB} = 10 \\log_{10}(SNR) \\implies SNR = 10^{(SNR_{dB}/10)}$."
    }
  ]
};

if (typeof window !== 'undefined') {
    window.GRID_DATA = GRID_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GRID_DATA;
}
