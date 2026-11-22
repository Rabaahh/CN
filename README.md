# THE GRID: PACKET RUNNER (KTU PCCST501 EDITION)

> **An Interactive Cyberpunk Gamified Learning System for APJ Abdul Kalam Technological University (KTU) Computer Networks (Course Code: PCCST501 - 2024 Scheme)**

---

## 🎮 Live Game & Quick Start

Play directly in your browser with **zero dependencies, no Node/npm builds, and no external CDNs**:

1. **Option A (GitHub Pages)**:
   - Go to your repository settings -> **Pages** -> choose `main` branch and `/ (root)` folder -> click **Save**.
   - Your game is immediately live at: `https://<your-username>.github.io/<repo-name>/`
2. **Option B (Run Locally)**:
   - Clone this repository.
   - Double-click [`index.html`](index.html) or [`game_rpg/index.html`](game_rpg/index.html) in any modern browser (Chrome, Safari, Edge, Firefox).
   - *Optional local server*: Run `python3 -m http.server 8080` and visit `http://localhost:8080`.

---

## 🛰️ Storyline & Mission

You are **Unit 0xVOID**, an autonomous IPv4 Datagram awakened within the digital expanse of **The Grid**. To preserve data integrity and prevent system-wide network failure, you must traverse all **4 Defensive Sectors** corresponding to the TCP/IP network protocol stack:

- **Sector 1: Physical Substratum (Module 4)**: Navigate line attenuation, noise arcs, guided media conduits (Copper UTP vs Optical Fiber), line coding waveforms (NRZ, Manchester), and carrier modulation consoles.
- **Sector 2: Data Link Grid (Module 3)**: Breach MAC address firewalls, master character and bit stuffing, compute CRC Modulo-2 polynomials, observe CSMA/CD collision windows, and configure L2 switch learning tables.
- **Sector 3: Network Core (Module 2)**: Execute Dijkstra's Link-State Shortest Path First algorithm, calculate MTU fragment offsets (DF/MF flags), and defend against routing blackholes.
- **Sector 4: Application Stratum (Module 1)**: Infiltrate DNS hierarchical zones, establish HTTP/1.1 and HTTP/2 multiplexed streams, negotiate P2P BitTorrent swarms, and configure out-of-band FTP connections.

---

## 📚 Features & Academic Architecture

### 1. 28-Topic Comprehensive Syllabus Guide & Live Search Sidebar
- **Full KTU PCCST501 Coverage**: 100% of syllabus topics across Modules 1 to 4.
- **Live Search**: Instant keyword filtering for protocols, algorithms, RFCs, and formulas (e.g. `Dijkstra`, `BitTorrent`, `select`, `CRC`, `SNMP`, `Mobile IP`).
- **Module Filter Tabs**: Quick filtering across `All (28)`, `Mod 1`, `Mod 2`, `Mod 3`, and `Mod 4`.
- **3-Page Academic Study Cards**:
  - **Page 1: Core Theory & Examiner Keywords**: Storyline context, bulleted textbook theory, and must-know keywords.
  - **Page 2: Vector SVG Diagrams & Derivations**: Clean vector protocol diagrams, mathematical formulas, and KTU examiner tips.
  - **Page 3: In-Game Interactive Mission**: Step-by-step game objectives to experience each concept hands-on.

### 2. Full 60-Mark Timed KTU Mock Exam Simulator
- Strictly follows the official KTU examination blueprint:
  - **Part A (Compulsory)**: 8 Questions × 3 Marks = 24 Marks (2 per Module).
  - **Part B (Module Choice)**: 4 Questions × 9 Marks = 36 Marks (Choice A/B per Module).
  - **Total Marks**: 60 Marks | **Duration**: 2 Hours 30 Minutes live countdown.
- Automated evaluation rubric grading responses from **Grade S (>= 90%)** to **Grade F (< 40%)**.

### 3. KTU 9-Mark Master Valuation Rubric Auto-Grader
- Real-time semantic analysis evaluating written student answers against official university marking schemes:
  - Concept keyword trees (e.g., BitTorrent: *tracker, swarm, rarest-first, tit-for-tat, unchoking*).
  - Protocol state transitions (e.g., TCP Handshake: `SYN=1`, `ACK=1`, ISN increment).
  - Derivations & numerical steps (e.g., Dijkstra step-by-step cost table; MTU fragment 8-byte offsets).

### 4. 12 Interactive Engineering Minigames
1. **Signal Attenuation & Regenerative Repeaters**: Experience decibel signal loss and digital pulse reconstruction.
2. **Line Coding Oscilloscope**: Switch between NRZ-L, NRZ-I, and Manchester waveforms.
3. **Carrier Modulation Console**: Tune ASK, FSK, and BPSK sinusoidal carriers.
4. **CRC Modulo-2 Polynomial Calculator**: Divide bitstreams by generator polynomial $G(X)$ and append FCS.
5. **Switch Self-Learning Bridge**: Forward frames based on source MAC address learning.
6. **CSMA/CD Collision Simulator**: Resolve channel contention over propagation delay $2\tau$.
7. **IPv4 Subnetting & CIDR Calculator**: Subnet IP blocks with $2^h - 2$ usable host formulas.
8. **MTU Packet Fragmentation Lab**: Split oversized datagrams into 8-byte aligned offsets with DF/MF flags.
9. **Dijkstra Link-State SPF Terminal**: Compute least-cost routing tables from source nodes.
10. **TCP 3-Way Handshake & ARQ**: Exchange SYN, SYN-ACK, ACK packets and recover dropped segments.
11. **BitTorrent P2P Swarm Resistance Camp**: Trade rarest-first chunks and optimistic unchoking.
12. **SNMP & ASN.1 Debugger**: Walk MIB-II OID trees (`1.3.6.1.2.1`) and compile BER TLV syntax.

### 5. Procedural Cyber Audio Synthesizer
- Built using pure **HTML5 Web Audio API** (zero MP3/WAV assets).
- Cyberpunk arpeggiator, basslines, and SFX (packet laser, parity shield, ping sonar, level complete chime).

---

## 🗂️ Repository Structure

```
Computer Networks/
├── index.html                      # Root launcher (redirects to game_rpg/)
├── .gitignore                      # Git ignore rules
├── README.md                       # Comprehensive project documentation
├── game_rpg/                       # Complete RPG Production Build
│   ├── index.html                  # Main game viewport & HUD dock
│   ├── css/
│   │   └── cyber_grid.css          # Responsive Tron HUD, sidebar & modal styles
│   ├── js/
│   │   ├── engine/                 # GameLoop, InputManager, Renderer, GameState, SaveManager, ExamSimulator
│   │   ├── world/                  # Sector1-4, StudyGuideSystem, QuestManager, DialogueSystem, CodexViewer
│   │   ├── minigames/              # CRC, Dijkstra, Fragmentation, LineCoding, Modulation, SNMP, ASN1, etc.
│   │   ├── combat/                 # CombatSystem, BossOSPF, CollisionBusHazard
│   │   ├── entities/               # Player, EnemyDaemon
│   │   ├── audio/                  # CyberAudio Web Audio API synthesizer
│   │   └── data/                   # NeuralCodex knowledge database
│   └── test/
│       └── full_verification.js    # Automated 20-subsystem test runner
├── Module 1 Notes/                 # Reference KTU Module 1 Lecture Notes (PDF)
├── Module 2 Notes/                 # Reference KTU Module 2 Lecture Notes (PDF)
├── Module 3 Notes/                 # Reference KTU Module 3 Lecture Notes (PDF)
├── Module 4 Notes/                 # Reference KTU Module 4 Lecture Notes (PDF)
├── Questions/                      # KTU PCCST501 Question Banks & Model Papers (PDF)
└── Syllabus/                       # Official KTU PCCST501 Curriculum Syllabus (PDF)
```

---

## ⌨️ Game Controls

| Key | Action |
|:---|:---|
| <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> / <kbd>↑</kbd> <kbd>←</kbd> <kbd>↓</kbd> <kbd>→</kbd> | Move Unit 0xVOID |
| <kbd>B</kbd> | Toggle Syllabus Study Guide & 28-Topic Sidebar |
| <kbd>X</kbd> | Launch 60-Mark Timed KTU Mock Exam Simulator |
| <kbd>G</kbd> | Open KTU 9-Mark Rubric Auto-Grader Drill |
| <kbd>C</kbd> | Open Neural Codex Encyclopedia |
| <kbd>Tab</kbd> | View Quest Log & Allied NPC Objectives |
| <kbd>Space</kbd> | Fire ICMP Echo Ping / Advance Study Guide Page |
| <kbd>Shift</kbd> | Bandwidth Burst (Dash) |
| <kbd>Esc</kbd> | Pause Game / Close Active Modal |

---

## 🧪 Automated Test Verification

To run the complete automated test suite (verifying all 20 RPG subsystems, exam simulators, save managers, and rubric graders):

```bash
node game_rpg/test/full_verification.js
node game_rpg/scratch/test_study_guide.js
```

Both test suites run headless with **100% pass rates**.

---

## 📜 License

Created for educational use for students preparing for the **APJ Abdul Kalam Technological University (KTU)** Bachelor of Technology in Computer Science & Engineering examinations.
