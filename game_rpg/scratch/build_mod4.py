# Module 4 Topics (22 - 28)
# Physical Layer Fundamentals, Transmission Media, Line Coding, Modulation, Spread Spectrum, SNMP & ASN.1

mod4_topics = [
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
                "theory": """
                    <p>The <strong>Physical Layer</strong> is responsible for moving individual bits across a physical transmission medium. Signals undergo three fundamental types of transmission impairment:</p>
                    <ul>
                        <li><strong>1. Attenuation (Loss of Energy):</strong> As a signal propagates through any medium, electrical resistance or optical absorption dissipates its energy as heat. Measured in <strong>Decibels (dB)</strong>:
                            <br><code>dB = 10 * log10(P2 / P1)</code> (power) or <code>dB = 20 * log10(V2 / V1)</code> (voltage).
                            <br>Loss is negative dB, gain (amplification) is positive dB. Digital signals use <strong>Regenerative Repeaters</strong> (which decode, reconstruct, and retransmit clean bit pulses), whereas analog signals use <strong>Amplifiers</strong> (which unfortunately amplify accumulated noise alongside the signal).</li>
                        <li><strong>2. Distortion (Shape Alteration):</strong> Composite signals consist of multiple frequency components. In dispersive media, different frequencies travel at different phase velocities, arriving at slightly different times. This causes <strong>phase/delay distortion</strong>, warping waveform geometry.</li>
                        <li><strong>3. Noise (External Energy Ingress):</strong>
                            <ul>
                                <li><strong>Thermal Noise (Johnson Noise):</strong> Random motion of free electrons in conductors; proportional to absolute temperature (<code>N = k * T * B</code>). Unavoidable.</li>
                                <li><strong>Induced Noise:</strong> Electromagnetic interference (EMI) from motors, transformers, and fluorescent lighting acting as antennas.</li>
                                <li><strong>Crosstalk:</strong> Inductive/capacitive coupling between adjacent twisted pairs (hearing another conversation on phone lines).</li>
                                <li><strong>Impulse Noise:</strong> High-energy short-duration voltage spikes from power surges, lightning, or switching relays; the primary cause of burst errors in digital communications.</li>
                            </ul>
                        </li>
                    </ul>
                    <p><strong>Signal-to-Noise Ratio (SNR):</strong> Quantifies transmission quality. <code>SNR = Signal Power / Noise Power</code>, expressed in dB as <code>SNR_dB = 10 * log10(SNR)</code>.</p>
                """,
                "keywords": ["Analog vs Digital", "Attenuation (dB)", "Decibel Formula", "Regenerative Repeater", "Delay Distortion", "Thermal Noise", "Crosstalk", "Impulse Noise", "SNR (Signal-to-Noise Ratio)"]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Decibel Derivations & Regenerative Repeater Diagram",
                "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
                    <g transform="translate(40, 25)">
                        <text x="0" y="20" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">Digital Pulse Propagation with Regenerative Repeater:</text>
                        <!-- Transmitted Clean Pulse -->
                        <rect x="0" y="45" width="40" height="30" fill="#3b82f6" rx="2"/>
                        <rect x="40" y="75" width="40" height="30" fill="#94a3b8" rx="2"/>
                        <text x="40" y="120" text-anchor="middle" font-size="11" font-weight="700" fill="#1e40af">Transmitted Signal</text>

                        <!-- Attenuated & Noisy Waveform -->
                        <path d="M 120 75 Q 140 50, 160 65 T 200 90 T 240 75" fill="none" stroke="#ef4444" stroke-width="3"/>
                        <text x="180" y="120" text-anchor="middle" font-size="11" font-weight="700" fill="#dc2626">Attenuated + Noise (-12 dB)</text>

                        <!-- Repeater Block -->
                        <rect x="290" y="35" width="140" height="70" rx="6" fill="#10b981" stroke="#059669" stroke-width="2"/>
                        <text x="360" y="65" text-anchor="middle" font-size="12" font-weight="700" fill="#ffffff">REGENERATIVE</text>
                        <text x="360" y="85" text-anchor="middle" font-size="12" font-weight="700" fill="#ffffff">REPEATER</text>

                        <!-- Regenerated Clean Pulse -->
                        <rect x="480" y="45" width="40" height="30" fill="#3b82f6" rx="2"/>
                        <rect x="520" y="75" width="40" height="30" fill="#94a3b8" rx="2"/>
                        <text x="520" y="120" text-anchor="middle" font-size="11" font-weight="700" fill="#1e40af">Reconstructed Signal</text>
                        <text x="520" y="135" text-anchor="middle" font-size="9" fill="#64748b">(Zero Noise Propagation!)</text>
                    </g>
                    <text x="380" y="190" text-anchor="middle" font-size="11.5" font-weight="700" fill="#0f172a">Amplifiers amplify noise; Repeaters sample, decide (0 or 1), and regenerate 100% clean bits!</text>
                </svg>""",
                "formulas": """<div class="academic-callout">
                    <h4>Decibel & Attenuation Formulas</h4>
                    <p><strong>Power Attenuation:</strong> <code>dB = 10 * log10(P2 / P1)</code> (e.g., if P2 = 0.5 * P1, loss is 10 * log10(0.5) = -3 dB).</p>
                    <p><strong>Voltage Attenuation:</strong> <code>dB = 20 * log10(V2 / V1)</code>.</p>
                    <p><strong>Total Cascaded Link Loss:</strong> <code>dB_total = dB_1 + dB_2 + dB_3 + ...</code> (Decibels add algebraically!).</p>
                    <p><strong>Signal-to-Noise Ratio:</strong> <code>SNR_dB = 10 * log10(Signal_Power / Noise_Power)</code>.</p>
                </div>""",
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
                "actionText": "🎮 Start Mission: Test Signal Attenuation & Repeaters [Space]"
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
                "theory": """
                    <p>Transmission media reside beneath the Physical Layer, classified into <strong>Guided (Bounded/Conducted)</strong> and <strong>Unguided (Wireless/Free Space)</strong>:</p>
                    <h4>1. Guided Transmission Media</h4>
                    <ul>
                        <li><strong>Twisted Pair Cable (UTP / STP):</strong> Two insulated copper conductors twisted in a helical pattern. Twisting ensures both wires receive equal external EMI; differential signaling at the receiver cancels the induced common-mode noise. Classified into Cat 5e (100 MHz, 1 Gbps), Cat 6 (250 MHz, 10 Gbps up to 55m). Connectors: RJ-45.</li>
                        <li><strong>Coaxial Cable:</strong> Solid central copper core, surrounded by dielectric insulation, woven metallic braid shield, and outer protective jacket. Higher bandwidth and superior EMI shielding compared to UTP. Used in cable TV, broadband Internet (DOCSIS), and legacy Thicknet (10Base5) / Thinnet (10Base2).</li>
                        <li><strong>Optical Fiber:</strong> Transmits data as light pulses through ultra-pure silica glass (<code>SiO2</code>). Composed of <strong>Core</strong> (refractive index <code>n1</code>) and <strong>Cladding</strong> (refractive index <code>n2</code>), where <code>n1 > n2</code>. Operates on <strong>Total Internal Reflection (TIR)</strong>: light rays striking the core-cladding boundary at an angle greater than critical angle <code>theta_c = arcsin(n2 / n1)</code> are reflected entirely within the core.
                            <br><strong>Advantages:</strong> Enormous bandwidth (terabits/sec), extremely low attenuation (~0.2 dB/km at 1550 nm), complete immunity to Electromagnetic Interference (EMI), lightweight, highly secure against wiretapping.
                            <br><strong>Modes:</strong> Single-Mode Fiber (SMF, narrow ~9 um core, laser source, zero modal dispersion, long haul >50 km) vs Multi-Mode Fiber (MMF, wider 50/62.5 um core, LED source, modal dispersion limits range to <2 km).</li>
                    </ul>
                    <h4>2. Unguided Transmission Media (Wireless)</h4>
                    <ul>
                        <li><strong>Radio Waves (3 kHz to 1 GHz):</strong> Omnidirectional; waves travel in all directions from antenna. Penetrate walls easily; subject to interference and multipath fading. Used in AM/FM radio, cordless phones.</li>
                        <li><strong>Microwaves (1 GHz to 300 GHz):</strong> Unidirectional (highly focused line-of-sight beams using parabolic dish or horn antennas). Cannot penetrate walls effectively; absorbed by rainfall/atmospheric moisture at high frequencies. Used in cellular backhaul, satellite links, Wi-Fi.</li>
                        <li><strong>Infrared (300 GHz to 400 THz):</strong> High-frequency line-of-sight communication. Cannot penetrate solid walls, making it secure against eavesdropping and preventing adjacent-room interference. Used in TV remotes, IrDA transceivers.</li>
                    </ul>
                """,
                "keywords": ["Guided Media", "Unguided Media", "Twisted Pair (UTP/STP)", "Coaxial Cable", "Optical Fiber (SiO2)", "Total Internal Reflection (TIR)", "Core vs Cladding (n1 > n2)", "Single-Mode vs Multi-Mode", "Radio Waves", "Microwaves", "Infrared"]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Optical Fiber Total Internal Reflection & Media Comparison Table",
                "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
                    <g transform="translate(30, 25)">
                        <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">Optical Fiber Total Internal Reflection (TIR) Principle:</text>
                        <!-- Cladding Top -->
                        <rect x="0" y="30" width="460" height="30" fill="#e2e8f0" stroke="#94a3b8"/>
                        <text x="230" y="50" text-anchor="middle" font-size="11" font-weight="700" fill="#475569">Cladding (Refractive Index n2 = 1.46)</text>
                        <!-- Core -->
                        <rect x="0" y="60" width="460" height="50" fill="#cffafe" stroke="#06b6d4" stroke-width="1.5"/>
                        <text x="60" y="90" font-size="12" font-weight="700" fill="#0891b2">Core (n1 = 1.48)</text>
                        <text x="230" y="90" font-size="10" font-weight="600" fill="#0e7490">n1 &gt; n2 (Denser core!)</text>
                        <!-- Light Ray Path -->
                        <path d="M 0 85 L 80 60 L 180 110 L 280 60 L 380 110 L 460 60" fill="none" stroke="#0284c7" stroke-width="3" stroke-dasharray="2,2"/>
                        <!-- Cladding Bottom -->
                        <rect x="0" y="110" width="460" height="30" fill="#e2e8f0" stroke="#94a3b8"/>
                        <text x="230" y="130" text-anchor="middle" font-size="11" font-weight="700" fill="#475569">Cladding (Refractive Index n2 = 1.46)</text>
                    </g>
                    <g transform="translate(510, 35)">
                        <rect x="0" y="0" width="220" height="135" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
                        <text x="110" y="25" text-anchor="middle" font-size="12" font-weight="700" fill="#15803d">Media Comparison</text>
                        <text x="15" y="50" font-size="10.5" font-weight="600" fill="#334155">UTP: Cheap, ~100m, high EMI</text>
                        <text x="15" y="75" font-size="10.5" font-weight="600" fill="#334155">Coax: Mod cost, ~500m, mod EMI</text>
                        <text x="15" y="100" font-size="10.5" font-weight="700" fill="#0369a1">Fiber: High BW, &gt;50km, 0 EMI!</text>
                        <text x="15" y="122" font-size="10" font-weight="600" fill="#15803d">Radio/Micro: Wireless mobility</text>
                    </g>
                    <text x="380" y="190" text-anchor="middle" font-size="11.5" font-weight="700" fill="#0f172a">TIR occurs when Angle of Incidence &gt; Critical Angle theta_c = arcsin(n2 / n1)</text>
                </svg>""",
                "formulas": """<div class="academic-callout">
                    <h4>Optical Fiber Critical Angle & Numerical Aperture</h4>
                    <p><strong>Critical Angle:</strong> <code>theta_c = arcsin(n2 / n1)</code> (Requires n1 &gt; n2).</p>
                    <p><strong>Numerical Aperture (Light-Gathering Ability):</strong> <code>NA = sqrt(n1^2 - n2^2) = sin(theta_a)</code>, where theta_a is the acceptance angle.</p>
                    <p><strong>Worked Example:</strong> If core n1 = 1.50 and cladding n2 = 1.45:
                    <br><code>theta_c = arcsin(1.45 / 1.50) = arcsin(0.9667) = 75.16 degrees</code>.
                    <br><code>NA = sqrt(1.50^2 - 1.45^2) = sqrt(2.25 - 2.1025) = sqrt(0.1475) = 0.384</code>.</p>
                </div>""",
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
                "actionText": "🎮 Start Mission: Traverse Optical Fiber Bypass [Space]"
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
                "theory": """
                    <p><strong>Line Coding</strong> is the process of converting digital binary data into digital voltage waveforms for baseband transmission. Desirable characteristics include: <strong>Self-Synchronization</strong> (receiver clock recovery), <strong>DC Component Elimination</strong> (allowing transformer coupling), and <strong>Error Detection</strong>.</p>
                    <p>Four primary line coding schemes tested in KTU examinations:</p>
                    <ul>
                        <li><strong>1. NRZ-L (Non-Return-to-Zero Level):</strong>
                            <br>Signal level depends directly on the bit state. Typically: <strong>Bit 0 = Positive voltage (+V)</strong>, <strong>Bit 1 = Negative voltage (-V)</strong>.
                            <br><em>Problem:</em> A long sequence of 0s or 1s produces a flat constant voltage line, causing the receiver clock to drift (loss of synchronization) and creating a heavy DC component.</li>
                        <li><strong>2. NRZ-I (Non-Return-to-Zero Invert on 1):</strong>
                            <br>Signal level inverts (transitions) at the beginning of the bit interval if the bit is <strong>1</strong>; no inversion if the bit is <strong>0</strong>.
                            <br><em>Advantage:</em> Solves clock drift for consecutive 1s, but consecutive 0s still produce no transitions.</li>
                        <li><strong>3. Manchester (Biphase / Split-Phase / IEEE 802.3 Ethernet):</strong>
                            <br>Every bit interval contains a guaranteed voltage transition exactly at its midpoint:
                            <br>&bull; <strong>Bit 0: High-to-Low transition (&darr;)</strong> at center.
                            <br>&bull; <strong>Bit 1: Low-to-High transition (&uarr;)</strong> at center.
                            <br><em>Key Advantage:</em> Mid-bit transition provides continuous, guaranteed clock synchronization and zero DC component!
                            <br><em>Disadvantage:</em> Requires twice the bandwidth (Baud rate = 2 * Bit rate). Used in 10Base-T Ethernet.</li>
                        <li><strong>4. Differential Manchester (Token Ring / IEEE 802.5):</strong>
                            <br>Always has a mid-bit transition for clocking. The bit value is determined by whether a transition occurs at the <strong>beginning</strong> of the bit interval:
                            <br>&bull; <strong>Bit 0: Transition at the start</strong> of the interval.
                            <br>&bull; <strong>Bit 1: NO transition at the start</strong> of the interval.
                            <br><em>Advantage:</em> Highly noise-immune and insensitive to cable polarity inversion (reversing wire pair does not invert bits).</li>
                    </ul>
                """,
                "keywords": ["Line Coding", "Self-Synchronization", "DC Component", "NRZ-L", "NRZ-I", "Manchester Encoding (IEEE 802.3)", "Differential Manchester (IEEE 802.5)", "Baud Rate vs Bit Rate"]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Waveform Comparison for Bit Stream: 0 1 0 0 1 1 0",
                "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
                    <g transform="translate(140, 20)">
                        <!-- Bit Header -->
                        <text x="35" y="15" text-anchor="middle" font-size="14" font-weight="700" fill="#0f172a">0</text>
                        <text x="105" y="15" text-anchor="middle" font-size="14" font-weight="700" fill="#0f172a">1</text>
                        <text x="175" y="15" text-anchor="middle" font-size="14" font-weight="700" fill="#0f172a">0</text>
                        <text x="245" y="15" text-anchor="middle" font-size="14" font-weight="700" fill="#0f172a">0</text>
                        <text x="315" y="15" text-anchor="middle" font-size="14" font-weight="700" fill="#0f172a">1</text>
                        <text x="385" y="15" text-anchor="middle" font-size="14" font-weight="700" fill="#0f172a">1</text>
                        <text x="455" y="15" text-anchor="middle" font-size="14" font-weight="700" fill="#0f172a">0</text>
                        <!-- Grid lines -->
                        <path d="M 0 20 L 0 165 M 70 20 L 70 165 M 140 20 L 140 165 M 210 20 L 210 165 M 280 20 L 280 165 M 350 20 L 350 165 M 420 20 L 420 165 M 490 20 L 490 165" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="3,3"/>
                    </g>
                    <!-- Row Labels -->
                    <text x="120" y="55" text-anchor="end" font-size="11" font-weight="700" fill="#1e40af">NRZ-L</text>
                    <text x="120" y="90" text-anchor="end" font-size="11" font-weight="700" fill="#0891b2">NRZ-I</text>
                    <text x="120" y="125" text-anchor="end" font-size="11" font-weight="700" fill="#16a34a">Manchester</text>
                    <text x="120" y="160" text-anchor="end" font-size="11" font-weight="700" fill="#d97706">Diff Manch</text>

                    <!-- Waveform Paths -->
                    <g transform="translate(140, 0)">
                        <!-- NRZ-L (0=+V, 1=-V): 0(+), 1(-), 0(+), 0(+), 1(-), 1(-), 0(+) -->
                        <path d="M 0 45 H 70 V 60 H 140 V 45 H 280 V 60 H 420 V 45 H 490" fill="none" stroke="#2563eb" stroke-width="2.5"/>
                        <!-- NRZ-I (assume start low, invert on 1) -->
                        <path d="M 0 95 H 70 V 80 H 140 H 280 V 95 H 350 V 80 H 420 H 490" fill="none" stroke="#06b6d4" stroke-width="2.5"/>
                        <!-- Manchester: 0(H->L), 1(L->H), 0(H->L), 0(H->L), 1(L->H), 1(L->H), 0(H->L) -->
                        <path d="M 0 115 H 35 V 130 H 70 V 130 H 105 V 115 H 140 V 115 H 175 V 130 H 210 V 115 H 245 V 130 H 280 V 130 H 315 V 115 H 350 V 130 H 385 V 115 H 420 V 115 H 455 V 130 H 490" fill="none" stroke="#16a34a" stroke-width="2.5"/>
                        <!-- Diff Manchester: always mid transition, start transition on 0 -->
                        <path d="M 0 150 H 35 V 165 H 70 H 105 V 150 H 140 V 165 H 175 V 150 H 210 V 165 H 245 V 150 H 280 H 315 V 165 H 350 H 385 V 150 H 420 V 165 H 455 V 150 H 490" fill="none" stroke="#d97706" stroke-width="2.5"/>
                    </g>
                    <text x="380" y="195" text-anchor="middle" font-size="11" font-weight="700" fill="#0f172a">Manchester: Bit 0 = High-to-Low (&darr;) | Bit 1 = Low-to-High (&uarr;) at center of bit period</text>
                </svg>""",
                "formulas": """<div class="academic-callout">
                    <h4>Baud Rate (Modulation Rate) vs Bit Rate</h4>
                    <p><strong>Baud Rate (S):</strong> Number of signal state changes (symbols) per second. <code>S = N / r</code>, where N is data rate (bps) and r is number of data bits per signal element.</p>
                    <p><strong>NRZ Schemes:</strong> 1 bit per signal element (r = 1) &rArr; Average Baud rate <code>S = N / 2</code> bauds.</p>
                    <p><strong>Manchester Schemes:</strong> 2 signal elements per bit (r = 1/2) &rArr; Baud rate <code>S = 2 * N</code> bauds (Double bandwidth required!).</p>
                </div>""",
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
                "actionText": "🎮 Start Mission: Open Oscilloscope Console [Space]"
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
                "theory": """
                    <p><strong>Digital-to-Analog Modulation</strong> converts digital binary data into bandpass analog waveforms by modifying one or more characteristics of a sinusoidal carrier wave <code>s(t) = A * cos(2 * pi * fc * t + phi)</code>:</p>
                    <ul>
                        <li><strong>1. Amplitude Shift Keying (ASK):</strong> Carrier amplitude varies to represent binary states; frequency and phase remain constant. In <strong>OOK (On-Off Keying)</strong>, bit 1 is presence of carrier, bit 0 is zero amplitude. Highly susceptible to noise and atmospheric attenuation.</li>
                        <li><strong>2. Frequency Shift Keying (FSK / BFSK):</strong> Modulates carrier frequency between two distinct values: <code>f1</code> for bit 1, <code>f2</code> for bit 0. Constant amplitude makes it noise-immune, but requires wider bandwidth.</li>
                        <li><strong>3. Phase Shift Keying (PSK / BPSK / QPSK):</strong> Carrier phase shifts to represent bits. In <strong>BPSK</strong>, bit 1 = 0 degrees, bit 0 = 180 degrees (pi radians). In <strong>QPSK</strong>, 2 bits per symbol are encoded into four 90-degree phase offsets (45, 135, 225, 315 degrees).</li>
                        <li><strong>4. Quadrature Amplitude Modulation (QAM):</strong> Combines ASK and PSK. For example, <strong>16-QAM</strong> uses 16 distinct constellation points (combinations of amplitude and phase) to transmit <code>log2(16) = 4 bits per symbol</code>.</li>
                    </ul>
                    <h4>Channel Capacity: Nyquist vs Shannon</h4>
                    <p><strong>Nyquist Bit Rate (Noiseless Theoretical Limit):</strong> Defines maximum data rate over an ideal, noise-free channel of bandwidth B (Hz) with L signal levels:
                    <br><code>C_Nyquist = 2 * B * log2(L)  (bps)</code>.</p>
                    <p><strong>Shannon Capacity (Physical Upper Bound for Noisy Channels):</strong> Defines the absolute theoretical limit of error-free data transmission in the presence of Gaussian thermal noise:
                    <br><code>C_Shannon = B * log2(1 + SNR)  (bps)</code>, where <code>SNR = P_signal / P_noise</code>.</p>
                """,
                "keywords": ["Carrier Modulation", "ASK (Amplitude Shift Keying)", "FSK (Frequency Shift Keying)", "PSK / BPSK / QPSK", "QAM (Quadrature Amplitude Modulation)", "Nyquist Bit Rate", "Shannon Capacity", "SNR (Signal-to-Noise Ratio)", "Constellation Diagram"]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Modulation Waveforms & Nyquist/Shannon Worked Numerical",
                "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
                    <g transform="translate(100, 20)">
                        <text x="50" y="15" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">Bit 1</text>
                        <text x="170" y="15" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">Bit 0</text>
                        <text x="290" y="15" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">Bit 1</text>
                        <path d="M 0 20 L 0 160 M 110 20 L 110 160 M 230 20 L 230 160 M 350 20 L 350 160" stroke="#cbd5e1" stroke-dasharray="2,2"/>
                        <!-- ASK -->
                        <text x="-20" y="50" text-anchor="end" font-size="11" font-weight="700" fill="#2563eb">ASK</text>
                        <path d="M 0 45 Q 27.5 25, 55 45 T 110 45 L 230 45 Q 257.5 25, 285 45 T 350 45" fill="none" stroke="#2563eb" stroke-width="2.5"/>
                        <!-- FSK -->
                        <text x="-20" y="95" text-anchor="end" font-size="11" font-weight="700" fill="#0891b2">FSK</text>
                        <path d="M 0 90 Q 13.75 75, 27.5 90 T 55 90 T 82.5 90 T 110 90 Q 30 75, 60 90 T 230 90 Q 243.75 75, 257.5 90 T 285 90 T 312.5 90 T 350 90" fill="none" stroke="#0891b2" stroke-width="2.5"/>
                        <!-- BPSK -->
                        <text x="-20" y="140" text-anchor="end" font-size="11" font-weight="700" fill="#16a34a">BPSK</text>
                        <path d="M 0 135 Q 27.5 115, 55 135 T 110 135 Q 137.5 155, 165 135 T 230 135 Q 257.5 115, 285 135 T 350 135" fill="none" stroke="#16a34a" stroke-width="2.5"/>
                    </g>
                    <!-- Constellation Box -->
                    <g transform="translate(500, 30)">
                        <rect x="0" y="0" width="220" height="130" rx="6" fill="#f1f5f9" stroke="#94a3b8"/>
                        <text x="110" y="20" text-anchor="middle" font-size="11.5" font-weight="700" fill="#1e293b">QPSK Constellation (2 bits/sym)</text>
                        <line x1="30" y1="75" x2="190" y2="75" stroke="#94a3b8" stroke-width="1.5"/>
                        <line x1="110" y1="25" x2="110" y2="125" stroke="#94a3b8" stroke-width="1.5"/>
                        <circle cx="70" cy="45" r="5" fill="#ef4444"/><text x="55" y="45" font-size="9" font-weight="700" fill="#b91c1c">01</text>
                        <circle cx="150" cy="45" r="5" fill="#ef4444"/><text x="160" y="45" font-size="9" font-weight="700" fill="#b91c1c">11</text>
                        <circle cx="70" cy="105" r="5" fill="#ef4444"/><text x="55" y="110" font-size="9" font-weight="700" fill="#b91c1c">00</text>
                        <circle cx="150" cy="105" r="5" fill="#ef4444"/><text x="160" y="110" font-size="9" font-weight="700" fill="#b91c1c">10</text>
                    </g>
                    <text x="380" y="195" text-anchor="middle" font-size="11" font-weight="700" fill="#0f172a">BPSK inverts phase by 180 degrees at bit boundaries; QPSK encodes 2 bits per phase angle!</text>
                </svg>""",
                "formulas": """<div class="academic-callout">
                    <h4>KTU Examination Numerical: Channel Capacity Calculation</h4>
                    <p><strong>Problem:</strong> A telephone channel has bandwidth B = 4 kHz and SNR_dB = 30 dB. Calculate the maximum theoretical channel capacity.</p>
                    <p><strong>Step 1: Convert SNR_dB to linear ratio:</strong>
                    <br><code>SNR_dB = 10 * log10(SNR) = 30 &rArr; log10(SNR) = 3 &rArr; SNR = 10^3 = 1000</code>.</p>
                    <p><strong>Step 2: Apply Shannon's Formula:</strong>
                    <br><code>C = B * log2(1 + SNR) = 4000 * log2(1 + 1000) = 4000 * log2(1001)</code>.
                    <br>Since <code>2^10 = 1024 &approx; 1000 &rArr; log2(1001) &approx; 9.967</code>.
                    <br><code>C &approx; 4000 * 9.967 = 39,869 bps &approx; 39.87 kbps</code>.</p>
                    <p><strong>Step 3: Signal Levels (L) for Noiseless Nyquist:</strong>
                    <br><code>C = 2 * B * log2(L) &rArr; 39869 = 2 * 4000 * log2(L) &rArr; log2(L) &approx; 4.98 &rArr; L = 32 levels</code>.</p>
                </div>""",
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
                "actionText": "🎮 Start Mission: Launch Modulation Console [Space]"
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
                "theory": """
                    <p><strong>Spread Spectrum</strong> expands the transmitted bandwidth of a signal far beyond the minimum bandwidth required by the data stream (<code>B_ss >> B_data</code>). Principles: signal power is spread across a broad frequency band, appearing below the thermal noise floor to eavesdroppers, while providing high resistance to intentional narrowband jamming.</p>
                    <h4>1. Frequency Hopping Spread Spectrum (FHSS)</h4>
                    <ul>
                        <li>Signal frequency rapidly shifts (hops) among <code>M</code> discrete carrier channels across a wide band.</li>
                        <li>Hopping pattern is determined by a synchronized <strong>Pseudorandom Noise (PN) code generator</strong> shared by transmitter and receiver.</li>
                        <li><strong>Slow FHSS:</strong> One or more data bits are transmitted per frequency hop (<code>Hop Rate <= Bit Rate</code>).</li>
                        <li><strong>Fast FHSS:</strong> Carrier frequency hops multiple times during a single bit period (<code>Hop Rate > Bit Rate</code>). Highly immune to narrowband jamming because only a fraction of a bit is corrupted if a single frequency is jammed.</li>
                        <li><strong>Application:</strong> Bluetooth operates in the 2.4 GHz ISM band with 79 channels, hopping 1600 times per second!</li>
                    </ul>
                    <h4>2. Direct Sequence Spread Spectrum (DSSS)</h4>
                    <ul>
                        <li>Each original data bit is multiplied (XORed) with a high-rate pseudorandom binary sequence called a <strong>Chipping Code</strong> (e.g., 11-bit Barker code).</li>
                        <li>Each chip has duration <code>Tc << Tb</code> (bit duration). The resulting modulated signal has bandwidth <code>B_ss = 1 / Tc</code>, which is <code>N</code> times wider than original data bandwidth (<code>N = Tb / Tc</code>).</li>
                        <li><strong>At the Receiver (Despreading):</strong> The received signal is multiplied by the identical synchronized chipping code. Since <code>Code XOR Code = 0</code>, the original data is completely reconstructed! Meanwhile, any narrow-band interference/jammer signal is spread out over <code>B_ss</code>, reducing its power density to harmless background noise.</li>
                        <li><strong>Application:</strong> IEEE 802.11b Wi-Fi (11-chip Barker code), GPS, and 3G CDMA cellular networks.</li>
                    </ul>
                """,
                "keywords": ["Spread Spectrum", "Bandwidth Expansion", "FHSS (Frequency Hopping)", "DSSS (Direct Sequence)", "Pseudorandom Noise (PN) Code", "Chipping Code / Barker Code", "Processing Gain", "Narrowband Jamming Resistance", "CDMA"]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "FHSS Frequency-Time Matrix & DSSS Chipping Sequence XOR",
                "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
                    <g transform="translate(40, 20)">
                        <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">FHSS Frequency-Time Hopping Matrix:</text>
                        <!-- Grid Axis -->
                        <line x1="30" y1="130" x2="320" y2="130" stroke="#475569" stroke-width="1.5"/>
                        <line x1="30" y1="30" x2="30" y2="130" stroke="#475569" stroke-width="1.5"/>
                        <text x="175" y="148" text-anchor="middle" font-size="11" font-weight="600" fill="#475569">Time &rarr;</text>
                        <text x="15" y="40" text-anchor="end" font-size="10" font-weight="600" fill="#475569">Freq f4</text>
                        <text x="15" y="70" text-anchor="end" font-size="10" font-weight="600" fill="#475569">Freq f3</text>
                        <text x="15" y="95" text-anchor="end" font-size="10" font-weight="600" fill="#475569">Freq f2</text>
                        <text x="15" y="120" text-anchor="end" font-size="10" font-weight="600" fill="#475569">Freq f1</text>
                        <!-- Hops -->
                        <rect x="40" y="110" width="45" height="18" fill="#3b82f6" rx="3"/><text x="62" y="123" text-anchor="middle" font-size="10" fill="#fff">Hop 1</text>
                        <rect x="95" y="60" width="45" height="18" fill="#3b82f6" rx="3"/><text x="117" y="73" text-anchor="middle" font-size="10" fill="#fff">Hop 2</text>
                        <rect x="150" y="30" width="45" height="18" fill="#3b82f6" rx="3"/><text x="172" y="43" text-anchor="middle" font-size="10" fill="#fff">Hop 3</text>
                        <rect x="205" y="85" width="45" height="18" fill="#3b82f6" rx="3"/><text x="227" y="98" text-anchor="middle" font-size="10" fill="#fff">Hop 4</text>
                        <rect x="260" y="110" width="45" height="18" fill="#3b82f6" rx="3"/><text x="282" y="123" text-anchor="middle" font-size="10" fill="#fff">Hop 5</text>
                    </g>
                    <!-- DSSS Diagram -->
                    <g transform="translate(420, 20)">
                        <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">DSSS Spreading & Despreading:</text>
                        <rect x="0" y="35" width="80" height="25" fill="#e0e7ff" stroke="#4338ca" rx="3"/><text x="40" y="52" text-anchor="middle" font-size="10" font-weight="700" fill="#3730a3">Data Bit: 1</text>
                        <text x="95" y="52" font-size="14" font-weight="700" fill="#475569">&oplus;</text>
                        <rect x="115" y="35" width="170" height="25" fill="#fef3c7" stroke="#d97706" rx="3"/><text x="200" y="52" text-anchor="middle" font-size="9" font-weight="700" fill="#92400e">Barker: 10110111000</text>
                        <line x1="150" y1="65" x2="150" y2="85" stroke="#475569" stroke-width="1.5"/><polygon points="146,85 150,91 154,85" fill="#475569"/>
                        <rect x="40" y="95" width="220" height="25" fill="#fee2e2" stroke="#dc2626" rx="3"/><text x="150" y="112" text-anchor="middle" font-size="9.5" font-weight="700" fill="#b91c1c">Transmitted Chips (Wide Band)</text>
                        <text x="150" y="140" text-anchor="middle" font-size="9.5" font-weight="600" fill="#15803d">Receiver: XOR with Barker &rArr; Reconstructs 1!</text>
                    </g>
                    <text x="380" y="195" text-anchor="middle" font-size="11" font-weight="700" fill="#0f172a">Processing Gain Gp = 10 * log10(B_ss / B_data); despreading crushes jammers into noise!</text>
                </svg>""",
                "formulas": """<div class="academic-callout">
                    <h4>Processing Gain & Jamming Margin</h4>
                    <p><strong>Processing Gain (Gp):</strong> Measure of jamming improvement achieved by spreading:
                    <br><code>Gp = B_ss / B_data = Tb / Tc = N (Linear Ratio)</code>, or in decibels:
                    <br><code>Gp_dB = 10 * log10(B_ss / B_data) = 10 * log10(N)</code>.</p>
                    <p><strong>Worked Example:</strong> If data rate = 10 kbps and spread bandwidth = 1 MHz:
                    <br><code>Gp = 1,000,000 / 10,000 = 100 &rArr; Gp_dB = 10 * log10(100) = 20 dB</code>.
                    <br>The receiver can successfully recover data even if the jammer is 20 dB stronger than the signal!</p>
                </div>""",
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
                "actionText": "🎮 Start Mission: Test Spread Spectrum Shield [Space]"
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
                "theory": """
                    <p>The standard Internet Network Management Framework consists of three distinct, cooperative specifications:</p>
                    <ul>
                        <li><strong>1. SNMP (Simple Network Management Protocol):</strong> Defines the format of messages exchanged between management stations and managed agents:
                            <ul>
                                <li><strong>Manager (NOC Station):</strong> Polls agents, sends configuration updates, and listens for alarms.</li>
                                <li><strong>Agent (Managed Device):</strong> Software daemon residing on routers, switches, or hosts that monitors local state and hardware counters.</li>
                                <li><strong>UDP Ports:</strong> Port <strong>161</strong> (Agent listens for Manager requests), Port <strong>162</strong> (Manager listens for unsolicited Agent Traps).</li>
                                <li><strong>7 Core PDUs:</strong> <code>GetRequest</code> (read variable), <code>GetNextRequest</code> (walk MIB tree), <code>GetBulkRequest</code> (efficient table retrieval), <code>SetRequest</code> (modify parameter), <code>Response</code> (agent reply), <code>Trap</code> (unsolicited alarm sent by agent on interface failure/reboot), <code>InformRequest</code> (acknowledged manager-to-manager alert).</li>
                            </ul>
                        </li>
                        <li><strong>2. SMI (Structure of Management Information):</strong> Defines the fundamental rules for naming managed objects, specifying their data types (using ASN.1), and representing valid value ranges.</li>
                        <li><strong>3. MIB (Management Information Base):</strong> A virtual, tree-structured database stored on each device containing all accessible management objects.</li>
                    </ul>
                    <h4>The MIB-II Object Identifier (OID) Tree (RFC 1213)</h4>
                    <p>Every managed object has a unique dot-delimited hierarchical address starting from the ISO root:
                    <br><code>iso(1) &rarr; org(3) &rarr; dod(6) &rarr; internet(1) &rarr; mgmt(2) &rarr; mib-2(1)</code> &rArr; Prefix: <strong>1.3.6.1.2.1</strong>.</p>
                    <p>Key MIB-II Groups under <code>1.3.6.1.2.1</code>:
                    <br>&bull; <code>system(1)</code>: Device description, uptime (<code>sysUpTime</code>), contact.
                    <br>&bull; <code>interfaces(2)</code>: Network interface count, MTU, packet traffic counters (<code>ifInOctets</code>, <code>ifOutOctets</code>).
                    <br>&bull; <code>ip(4)</code>: IP routing tables, forwarding parameters, packet drop statistics.
                    <br>&bull; <code>tcp(6)</code>: Active/passive TCP connection counts, current open sockets, retransmissions.
                    <br>&bull; <code>udp(7)</code>: Datagram delivery statistics and error counts.</p>
                """,
                "keywords": ["SNMP (Simple Network Management Protocol)", "Manager vs Agent", "UDP Port 161 & 162", "SNMP PDUs (Get, Set, Trap)", "SMI (Structure of Management Info)", "MIB-II Hierarchical Tree", "OID (Object Identifier: 1.3.6.1.2.1)", "MIB Groups (system, interfaces, ip, tcp)"]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "Hierarchical MIB-II Tree Structure & Manager-Agent Message Flow",
                "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
                    <g transform="translate(30, 20)">
                        <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">MIB-II Hierarchical Object Identifier (OID) Tree:</text>
                        <!-- Tree nodes -->
                        <rect x="140" y="30" width="80" height="22" rx="4" fill="#3b82f6"/><text x="180" y="45" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">iso(1)</text>
                        <line x1="180" y1="52" x2="180" y2="65" stroke="#64748b" stroke-width="1.5"/>
                        <rect x="140" y="65" width="80" height="22" rx="4" fill="#2563eb"/><text x="180" y="80" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">org(3)</text>
                        <line x1="180" y1="87" x2="180" y2="100" stroke="#64748b" stroke-width="1.5"/>
                        <rect x="140" y="100" width="80" height="22" rx="4" fill="#1d4ed8"/><text x="180" y="115" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">dod(6)</text>
                        <line x1="180" y1="122" x2="180" y2="135" stroke="#64748b" stroke-width="1.5"/>
                        <rect x="140" y="135" width="80" height="22" rx="4" fill="#1e40af"/><text x="180" y="150" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">internet(1)</text>
                        <!-- Branch to mgmt -->
                        <line x1="220" y1="146" x2="260" y2="146" stroke="#64748b" stroke-width="1.5"/>
                        <rect x="260" y="135" width="80" height="22" rx="4" fill="#059669"/><text x="300" y="150" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">mgmt(2)</text>
                        <!-- Branch to mib-2 -->
                        <line x1="340" y1="146" x2="380" y2="146" stroke="#64748b" stroke-width="1.5"/>
                        <rect x="380" y="135" width="80" height="22" rx="4" fill="#10b981"/><text x="420" y="150" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">mib-2(1)</text>
                    </g>
                    <!-- MIB-2 Groups Box -->
                    <g transform="translate(480, 30)">
                        <rect x="0" y="0" width="250" height="135" rx="6" fill="#f0fdf4" stroke="#10b981" stroke-width="1.5"/>
                        <text x="125" y="20" text-anchor="middle" font-size="11" font-weight="700" fill="#065f46">Core MIB-II Groups (1.3.6.1.2.1.*)</text>
                        <text x="15" y="42" font-size="10" font-weight="600" fill="#1e293b">.1 system (sysUpTime, sysDescr)</text>
                        <text x="15" y="62" font-size="10" font-weight="600" fill="#1e293b">.2 interfaces (ifInOctets, ifSpeed)</text>
                        <text x="15" y="82" font-size="10" font-weight="600" fill="#1e293b">.4 ip (ipRoutingTable, ipForwarding)</text>
                        <text x="15" y="102" font-size="10" font-weight="600" fill="#1e293b">.6 tcp (tcpCurrEstab, tcpRetrans)</text>
                        <text x="15" y="122" font-size="10" font-weight="600" fill="#1e293b">.7 udp (udpInDatagrams, udpNoPorts)</text>
                    </g>
                    <text x="380" y="190" text-anchor="middle" font-size="11.5" font-weight="700" fill="#0f172a">SNMP Manager queries Agent via UDP 161 (Get/Set); Agent pushes critical Traps via UDP 162</text>
                </svg>""",
                "formulas": """<div class="academic-callout">
                    <h4>Tripartite Network Management Relationship</h4>
                    <p><strong>SNMP:</strong> The communication protocol (PDUs: Get, GetNext, Set, Trap) carrying data over UDP 161/162.</p>
                    <p><strong>SMI:</strong> The syntax and grammar rules defining allowed data types and naming conventions.</p>
                    <p><strong>MIB-II:</strong> The database dictionary specifying what variables exist and their numeric OIDs (1.3.6.1.2.1.x).</p>
                </div>""",
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
                "actionText": "🎮 Start Mission: Open SNMP Operations Console [Space]"
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
                "theory": """
                    <p><strong>ASN.1 (Abstract Syntax Notation One - ITU-T X.208 / X.680)</strong> is a formal language for defining data structures regardless of computer architecture, operating system, or byte endianness. It is used extensively in SNMP, cryptographic certificates (X.509), and cellular signaling (LTE/5G RRC).</p>
                    <h4>1. Primitive (Simple) Data Types</h4>
                    <ul>
                        <li><code>INTEGER</code>: Arbitrary integer or bounded range (e.g., <code>INTEGER (0..65535)</code>).</li>
                        <li><code>OCTET STRING</code>: Arbitrary sequence of zero or more 8-bit bytes (used for binary hashes, payloads, MAC addresses).</li>
                        <li><code>BOOLEAN</code>: <code>TRUE</code> or <code>FALSE</code>.</li>
                        <li><code>BIT STRING</code>: Sequence of named bits/flags (e.g., <code>syn(0), ack(1), fin(2)</code>).</li>
                        <li><code>OBJECT IDENTIFIER</code>: Hierarchical node path in an OID tree.</li>
                        <li><code>NULL</code>: Value indicator representing an empty placeholder.</li>
                    </ul>
                    <h4>2. Constructed (Structured) Data Types</h4>
                    <ul>
                        <li><code>SEQUENCE</code>: Ordered collection of one or more fields of differing types (identical to a C <code>struct</code>):
                            <br><code>Employee ::= SEQUENCE { id INTEGER, name OCTET STRING, active BOOLEAN }</code>.</li>
                        <li><code>SEQUENCE OF</code>: Ordered list of zero or more items of the <em>same</em> type (identical to an array <code>Type[]</code>):
                            <br><code>RouteTable ::= SEQUENCE OF RouteEntry</code>.</li>
                        <li><code>CHOICE</code>: Union of distinct alternative types where exactly one type is selected at runtime (identical to a C <code>union</code>):
                            <br><code>Address ::= CHOICE { ipv4 [0] OCTET STRING (SIZE(4)), ipv6 [1] OCTET STRING (SIZE(16)) }</code>.</li>
                        <li><code>ENUMERATED</code>: Defined list of distinct named integer values:
                            <br><code>LinkStatus ::= ENUMERATED { up(1), down(2), testing(3) }</code>.</li>
                    </ul>
                    <h4>3. BER (Basic Encoding Rules) TLV Format</h4>
                    <p>ASN.1 defines abstract structure; <strong>BER</strong> defines how values are converted into binary on the wire using <strong>TLV (Tag-Length-Value)</strong> triplets:
                    <br>&bull; <strong>Tag (T):</strong> 1 byte identifying the data type (e.g., INTEGER = <code>0x02</code>, OCTET STRING = <code>0x04</code>, SEQUENCE = <code>0x30</code>).
                    <br>&bull; <strong>Length (L):</strong> 1 or more bytes indicating the length of the Value field.
                    <br>&bull; <strong>Value (V):</strong> The actual data payload in network byte order.</p>
                """,
                "keywords": ["ASN.1 (Abstract Syntax Notation One)", "Primitive Types (INTEGER, OCTET STRING)", "Constructed Types", "SEQUENCE (struct)", "SEQUENCE OF (array)", "CHOICE (union)", "ENUMERATED", "BER (Basic Encoding Rules)", "TLV (Tag-Length-Value)"]
            },
            {
                "tab": "Diagrams & Math",
                "subtitle": "ASN.1 Type Definition Schema & BER TLV Byte Layout",
                "svg": """<svg viewBox="0 0 760 210" width="100%" height="210" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
                    <g transform="translate(30, 20)">
                        <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">ASN.1 Structure vs BER TLV Binary Stream:</text>
                        <!-- ASN.1 Code Block -->
                        <rect x="0" y="30" width="320" height="110" rx="6" fill="#1e293b"/>
                        <text x="15" y="55" font-family="monospace" font-size="11" fill="#38bdf8">PacketHeader ::= SEQUENCE {</text>
                        <text x="35" y="75" font-family="monospace" font-size="11" fill="#facc15">  version   INTEGER (0..15),</text>
                        <text x="35" y="95" font-family="monospace" font-size="11" fill="#4ade80">  payload   OCTET STRING,</text>
                        <text x="35" y="115" font-family="monospace" font-size="11" fill="#f43f5e">  urgent    BOOLEAN</text>
                        <text x="15" y="132" font-family="monospace" font-size="11" fill="#38bdf8">}</text>
                    </g>
                    <!-- BER TLV Box -->
                    <g transform="translate(380, 20)">
                        <text x="0" y="15" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#0f172a">BER TLV Binary Encoding Structure:</text>
                        <!-- Outer SEQUENCE TLV -->
                        <rect x="0" y="30" width="340" height="110" rx="6" fill="#f8fafc" stroke="#64748b" stroke-width="1.5"/>
                        <rect x="10" y="45" width="60" height="25" fill="#3b82f6" rx="3"/><text x="40" y="62" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Tag: 0x30</text>
                        <rect x="75" y="45" width="60" height="25" fill="#6366f1" rx="3"/><text x="105" y="62" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Len: 0x0A</text>
                        <rect x="140" y="45" width="190" height="85" fill="#e0e7ff" rx="3"/>
                        <text x="235" y="62" text-anchor="middle" font-size="10" font-weight="700" fill="#3730a3">Value: Encapsulated TLVs</text>
                        <!-- Inner TLV for INTEGER -->
                        <g transform="translate(150, 75)">
                            <rect x="0" y="0" width="40" height="20" fill="#22c55e" rx="2"/><text x="20" y="14" text-anchor="middle" font-size="8" font-weight="700" fill="#fff">T:0x02</text>
                            <rect x="45" y="0" width="40" height="20" fill="#16a34a" rx="2"/><text x="65" y="14" text-anchor="middle" font-size="8" font-weight="700" fill="#fff">L:0x01</text>
                            <rect x="90" y="0" width="70" height="20" fill="#15803d" rx="2"/><text x="125" y="14" text-anchor="middle" font-size="8" font-weight="700" fill="#fff">V:0x04</text>
                            <text x="85" y="38" text-anchor="middle" font-size="9" font-weight="600" fill="#1e293b">version = 4 (INTEGER)</text>
                        </g>
                    </g>
                    <text x="380" y="190" text-anchor="middle" font-size="11.5" font-weight="700" fill="#0f172a">Every transmitted entity in BER is wrapped in [Tag (Type)] + [Length (Bytes)] + [Value (Raw Data)]</text>
                </svg>""",
                "formulas": """<div class="academic-callout">
                    <h4>ASN.1 Constructed Types Examination Cheat-Sheet</h4>
                    <p><strong>SEQUENCE:</strong> C struct equivalent (ordered heterogeneous elements).</p>
                    <p><strong>SEQUENCE OF:</strong> Array equivalent (ordered homogeneous elements).</p>
                    <p><strong>CHOICE:</strong> C union equivalent (one alternative selected at runtime).</p>
                    <p><strong>ENUMERATED:</strong> Named discrete values with explicit integer mappings.</p>
                </div>""",
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
                "actionText": "🎮 Start Mission: Test ASN.1 Syntax Terminal [Space]"
            }
        ]
    }
]
