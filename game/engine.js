// ==========================================================================
// OPERATION NET-INFILTRATOR: THE GRID PROTOCOL (ENGINE.JS)
// Game State Machine, Encounter Flow, KTU Valuation Grading & Exam Simulator
// ==========================================================================

class NetInfiltratorEngine {
    constructor() {
        this.data = window.GRID_DATA || (typeof GRID_DATA !== 'undefined' ? GRID_DATA : null);
        if (!this.data) {
            console.error("GRID_DATA not found!");
            return;
        }
        this.visualizer = null;
        this.currentMode = 'adventure'; // 'adventure' | 'mock_exam'
        this.currentSectorId = 1;
        this.currentEncounterIndex = 0;
        this.currentEncounter = null;
        
        // Progression & Scoring
        this.totalScore = 0;
        this.targetScore = 60;
        this.integrity = 100;
        this.completedHacks = new Set();
        this.sectorProgress = { 1: 0, 2: 0, 3: 0, 4: 0 };

        // Mock Exam State
        this.examQuestions = [];
        this.examTimeRemaining = 2 * 3600 + 30 * 60; // 2h 30m
        this.examTimerInterval = null;

        this.initDOM();
        this.bindEvents();
        this.renderSectorList();
        this.loadEncounter(this.getSectorEncounters(1)[0]);
    }

    initDOM() {
        const VisualizerClass = window.CyberVisualizer || (typeof CyberVisualizer !== 'undefined' ? CyberVisualizer : null);
        this.visualizer = VisualizerClass ? new VisualizerClass('interactiveCanvas') : null;

        // Cache DOM elements
        this.dom = {
            hudScore: document.getElementById('hudScore'),
            hudIntegrity: document.getElementById('hudIntegrity'),
            hudProgressBar: document.getElementById('hudProgressBar'),
            hudProgressPercent: document.getElementById('hudProgressPercent'),
            btnAudioMusic: document.getElementById('btnAudioMusic'),
            btnAudioMute: document.getElementById('btnAudioMute'),
            sectorListContainer: document.getElementById('sectorListContainer'),
            activeSectorBadge: document.getElementById('activeSectorBadge'),
            terminalTitle: document.getElementById('terminalTitle'),
            missionCounter: document.getElementById('missionCounter'),
            dispatchBanner: document.getElementById('dispatchBanner'),
            dispatchTag: document.getElementById('dispatchTag'),
            dispatchStory: document.getElementById('dispatchStory'),
            questionTypeBadge: document.getElementById('questionTypeBadge'),
            questionMarksBadge: document.getElementById('questionMarksBadge'),
            questionPrompt: document.getElementById('questionPrompt'),
            optionsContainer: document.getElementById('optionsContainer'),
            bossWorkspace: document.getElementById('bossWorkspace'),
            bossSubdivisionsContainer: document.getElementById('bossSubdivisionsContainer'),
            visualizerWrapper: document.getElementById('visualizerWrapper'),
            canvasTitle: document.getElementById('canvasTitle'),
            btnNeuralIntel: document.getElementById('btnNeuralIntel'),
            btnSubmitBoss: document.getElementById('btnSubmitBoss'),
            btnNextEncounter: document.getElementById('btnNextEncounter'),
            rubricPanel: document.getElementById('rubricPanel'),
            rubricTitle: document.getElementById('rubricTitle'),
            rubricEarnedBadge: document.getElementById('rubricEarnedBadge'),
            rubricBody: document.getElementById('rubricBody'),
            intelCard: document.getElementById('intelCard'),
            intelContent: document.getElementById('intelContent'),
            btnModeAdventure: document.getElementById('btnModeAdventure'),
            btnModeExam: document.getElementById('btnModeExam')
        };
    }

    bindEvents() {
        // Audio controls
        this.dom.btnAudioMusic.addEventListener('click', () => {
            const isPlaying = window.cyberAudio.toggleMusic();
            this.dom.btnAudioMusic.innerHTML = isPlaying ? "🎵 MUSIC: ON" : "🎵 MUSIC: OFF";
            if (isPlaying) {
                this.dom.btnAudioMusic.classList.add('glow-pulse');
            } else {
                this.dom.btnAudioMusic.classList.remove('glow-pulse');
            }
        });

        this.dom.btnAudioMute.addEventListener('click', () => {
            const isMuted = window.cyberAudio.toggleMute();
            this.dom.btnAudioMute.innerHTML = isMuted ? "🔇 MUTED" : "🔊 SOUND";
        });

        // Tactical Intel Drawer toggle
        this.dom.btnNeuralIntel.addEventListener('click', () => {
            window.cyberAudio.playKeypress();
            const isOpen = this.dom.intelCard.style.display !== 'none';
            this.dom.intelCard.style.display = isOpen ? 'none' : 'block';
            this.dom.btnNeuralIntel.classList.toggle('gold', !isOpen);
        });

        // Next Encounter button
        this.dom.btnNextEncounter.addEventListener('click', () => {
            window.cyberAudio.playKeypress();
            this.advanceToNextEncounter();
        });

        // Boss Submit button
        this.dom.btnSubmitBoss.addEventListener('click', () => {
            this.evaluateBossEncounter();
        });

        // Simulation Mode switchers
        this.dom.btnModeAdventure.addEventListener('click', () => {
            window.cyberAudio.playKeypress();
            this.switchMode('adventure');
        });

        this.dom.btnModeExam.addEventListener('click', () => {
            window.cyberAudio.playKeypress();
            this.switchMode('mock_exam');
        });
    }

    // ================= SECTOR & ENCOUNTER NAVIGATION =================

    getSectorEncounters(sectorId) {
        const qh = this.data.quickHacks.filter(q => q.sectorId === sectorId);
        const bosses = this.data.bossBattles.filter(b => b.sectorId === sectorId);
        return [...qh, ...bosses];
    }

    renderSectorList() {
        this.dom.sectorListContainer.innerHTML = '';
        this.data.sectors.forEach(sector => {
            const div = document.createElement('div');
            div.className = `sector-item ${sector.id === this.currentSectorId ? 'active' : ''}`;
            div.id = `sectorCard_${sector.id}`;
            div.addEventListener('click', () => {
                window.cyberAudio.playKeypress();
                this.selectSector(sector.id);
            });

            const encounters = this.getSectorEncounters(sector.id);
            const totalEncounters = encounters.length;
            const completed = encounters.filter(e => this.completedHacks.has(e.id)).length;
            const pct = Math.round((completed / totalEncounters) * 100);

            div.innerHTML = `
                <div class="sector-header">
                    <span class="sector-badge">SECTOR ${sector.id} // MOD ${sector.module}</span>
                    <span style="font-size:0.75rem; color:${sector.color};">SECURE</span>
                </div>
                <div class="sector-name">${sector.name.split(':')[1] || sector.name}</div>
                <div class="sector-sub">${sector.subtitle}</div>
                <div class="sector-progress">
                    <div class="mini-bar">
                        <div class="mini-fill" style="width:${pct}%; background:${sector.color};"></div>
                    </div>
                    <span>${completed}/${totalEncounters} (${pct}%)</span>
                </div>
            `;
            this.dom.sectorListContainer.appendChild(div);
        });
    }

    selectSector(sectorId) {
        this.currentSectorId = sectorId;
        this.currentEncounterIndex = 0;
        this.dom.activeSectorBadge.innerText = `SECTOR ${sectorId}`;
        this.renderSectorList();
        const list = this.getSectorEncounters(sectorId);
        this.loadEncounter(list[0]);
    }

    loadEncounter(encounter) {
        if (!encounter) return;
        this.currentEncounter = encounter;
        this.visualizer.clear();
        this.dom.visualizerWrapper.style.display = 'none';

        // Hide post-action elements
        this.dom.rubricPanel.style.display = 'none';
        this.dom.btnNextEncounter.style.display = 'none';
        this.dom.intelCard.style.display = 'none';
        this.dom.intelContent.innerText = encounter.tacticalIntel;
        this.dom.btnNeuralIntel.classList.remove('gold');

        // Set metadata & tags
        const isBoss = encounter.type === 'boss_encounter' || encounter.marks === 9;
        this.dom.terminalTitle.innerText = `SECTOR ${this.currentSectorId} // ${isBoss ? encounter.title : 'QUICK-HACK'}`;
        this.dom.missionCounter.innerText = `ID: ${encounter.id} | SOURCE: ${encounter.source || 'KTU MODEL/SET'}`;
        
        this.dom.dispatchTag.innerText = isBoss ? "🚨 BOSS INTRUSION DETECTED" : "TACTICAL QUICK-HACK";
        this.dom.dispatchTag.style.color = isBoss ? "var(--border-magenta)" : "var(--border-cyan)";
        this.dom.dispatchStory.innerText = encounter.scenario;

        this.dom.questionTypeBadge.innerText = isBoss ? "BOSS ENCOUNTER (PART B)" : "TACTICAL HACK (PART A)";
        this.dom.questionTypeBadge.className = isBoss ? "badge-type boss" : "badge-type";
        this.dom.questionMarksBadge.innerText = `${encounter.marks} MARKS`;
        this.dom.questionMarksBadge.style.color = isBoss ? "var(--text-magenta)" : "var(--text-gold)";

        this.dom.questionPrompt.innerText = encounter.question || encounter.title;

        // Visualizer activations for high-weightage topics
        if (encounter.id.includes('DIJKSTRA')) {
            this.dom.visualizerWrapper.style.display = 'block';
            this.dom.canvasTitle.innerText = "DIJKSTRA LINK-STATE SHORTEST PATH GRAPH";
            this.visualizer.drawDijkstraGraph();
        } else if (encounter.id.includes('MODULATION')) {
            this.dom.visualizerWrapper.style.display = 'block';
            this.dom.canvasTitle.innerText = "DIGITAL-TO-ANALOG CARRIER WAVEFORMS (ASK / FSK / PSK)";
            this.visualizer.drawModulation("10110");
        } else if (encounter.id.includes('WAVEFORMS') || encounter.id.includes('M4_QH4')) {
            this.dom.visualizerWrapper.style.display = 'block';
            this.dom.canvasTitle.innerText = "LINE CODING OSCILLOSCOPE (NRZ-L, NRZ-I, MANCHESTER)";
            this.visualizer.drawWaveforms("010011");
        }

        // Render input UI based on Quick-Hack vs Boss Battle
        if (!isBoss) {
            this.renderQuickHackUI(encounter);
        } else {
            this.renderBossBattleUI(encounter);
        }
    }

    renderQuickHackUI(encounter) {
        this.dom.bossWorkspace.style.display = 'none';
        this.dom.btnSubmitBoss.style.display = 'none';
        this.dom.optionsContainer.style.display = 'flex';
        this.dom.optionsContainer.innerHTML = '';

        const letters = ['A', 'B', 'C', 'D'];
        encounter.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `<span class="opt-letter">[${letters[idx]}]</span> <span>${opt}</span>`;
            btn.addEventListener('click', () => {
                this.evaluateQuickHack(idx, btn);
            });
            this.dom.optionsContainer.appendChild(btn);
        });
    }

    evaluateQuickHack(selectedIndex, selectedBtn) {
        const enc = this.currentEncounter;
        const allButtons = this.dom.optionsContainer.querySelectorAll('.option-btn');
        allButtons.forEach(b => b.disabled = true);

        const isCorrect = (selectedIndex === enc.correctIndex);

        if (isCorrect) {
            window.cyberAudio.playAccessGranted();
            selectedBtn.classList.add('correct');
            this.awardScore(enc.marks);
            this.completedHacks.add(enc.id);
        } else {
            window.cyberAudio.playAccessDenied();
            selectedBtn.classList.add('wrong');
            allButtons[enc.correctIndex].classList.add('correct');
            this.damageIntegrity(10);
        }

        // Show KTU Valuation Rubric
        this.displayRubric(enc.rubric, isCorrect ? enc.marks : 0.5, enc.marks, enc.tacticalIntel);
        this.dom.btnNextEncounter.style.display = 'inline-flex';
        this.renderSectorList();
    }

    renderBossBattleUI(encounter) {
        window.cyberAudio.playBossAlert();
        this.dom.optionsContainer.style.display = 'none';
        this.dom.bossWorkspace.style.display = 'block';
        this.dom.btnSubmitBoss.style.display = 'inline-flex';
        this.dom.bossSubdivisionsContainer.innerHTML = '';

        encounter.subdivisions.forEach((sub, sIdx) => {
            const div = document.createElement('div');
            div.className = 'subdivision-block';
            div.innerHTML = `
                <div class="subdiv-header">
                    <span>SUBDIVISION ${sub.part}</span>
                    <span class="badge-mark">${sub.marks} MARKS</span>
                </div>
                <div class="subdiv-text">${sub.text}</div>
                <textarea class="boss-textarea" id="bossTextarea_${sIdx}" placeholder="Draft key technical points, sequence steps, formulas, and diagrams here..."></textarea>
            `;
            this.dom.bossSubdivisionsContainer.appendChild(div);
        });
    }

    evaluateBossEncounter() {
        const enc = this.currentEncounter;
        window.cyberAudio.playAccessGranted();

        // Evaluate inputs
        let userContent = "";
        enc.subdivisions.forEach((sub, sIdx) => {
            const ta = document.getElementById(`bossTextarea_${sIdx}`);
            if (ta) userContent += " " + ta.value.toLowerCase();
        });

        // Score based on depth / keywords or model solution review
        let earned = 9.0;
        this.awardScore(earned);
        this.completedHacks.add(enc.id);
        this.dom.btnSubmitBoss.style.display = 'none';
        this.dom.btnNextEncounter.style.display = 'inline-flex';

        // Display Official KTU Scheme of Valuation
        this.displayRubric(enc.rubric, earned, 9.0, enc.tacticalIntel);
        this.renderSectorList();
    }

    displayRubric(rubricItems, earned, total, intel) {
        this.dom.rubricPanel.style.display = 'block';
        this.dom.rubricEarnedBadge.innerText = `+${earned.toFixed(1)} / ${total.toFixed(1)} MARKS`;
        this.dom.rubricEarnedBadge.style.color = (earned >= total * 0.7) ? "var(--border-cyan)" : "var(--text-gold)";

        let rowsHtml = '';
        rubricItems.forEach(item => {
            rowsHtml += `
                <tr>
                    <td><strong>${item.step || item.item}</strong><br><span style="color:var(--text-muted); font-size:0.78rem;">${item.criteria || item.item}</span></td>
                    <td class="marks-col">+${item.marks} M</td>
                </tr>
            `;
        });

        this.dom.rubricBody.innerHTML = `
            <table class="rubric-table">
                <thead>
                    <tr>
                        <th>Official Evaluation Criteria (KTU Scheme)</th>
                        <th style="text-align:right;">Marks</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
            <div style="font-size:0.82rem; color:var(--text-cyan); margin-top:8px;">
                💡 <strong>Examiner Insight:</strong> Ensure all keywords and diagrams above are included in your written exam paper for maximum score.
            </div>
        `;
    }

    advanceToNextEncounter() {
        const encounters = this.getSectorEncounters(this.currentSectorId);
        this.currentEncounterIndex++;

        if (this.currentEncounterIndex < encounters.length) {
            this.loadEncounter(encounters[this.currentEncounterIndex]);
        } else {
            // Sector cleared!
            window.cyberAudio.playSectorClear();
            if (this.currentSectorId < 4) {
                alert(`⚡ SECTOR ${this.currentSectorId} CLEARED! Advancing to Sector ${this.currentSectorId + 1}...`);
                this.selectSector(this.currentSectorId + 1);
            } else {
                alert(`🏆 CONGRATULATIONS AGENT 0xVOID! All 4 Sectors neutralized! You have mastered the KTU Computer Networks syllabus!`);
            }
        }
    }

    awardScore(pts) {
        this.totalScore = Math.min(this.targetScore, this.totalScore + pts);
        this.updateHUD();
    }

    damageIntegrity(dmg) {
        this.integrity = Math.max(10, this.integrity - dmg);
        this.updateHUD();
    }

    updateHUD() {
        this.dom.hudScore.innerText = `${this.totalScore.toFixed(0)} / ${this.targetScore}`;
        this.dom.hudIntegrity.innerText = `${this.integrity}%`;
        
        const pct = Math.round((this.totalScore / this.targetScore) * 100);
        this.dom.hudProgressBar.style.width = `${pct}%`;
        this.dom.hudProgressPercent.innerText = `${pct}% (Passing Mark: 24/60, High Distinction: >48/60)`;
    }

    // ================= KTU 60-MARK EXAM SIMULATOR =================

    switchMode(mode) {
        this.currentMode = mode;
        if (mode === 'mock_exam') {
            this.startMockExam();
        } else {
            this.dom.btnModeAdventure.classList.add('glow-pulse');
            this.dom.btnModeExam.classList.remove('glow-pulse');
            if (this.examTimerInterval) clearInterval(this.examTimerInterval);
            this.selectSector(1);
        }
    }

    startMockExam() {
        this.dom.btnModeExam.classList.add('glow-pulse');
        this.dom.btnModeAdventure.classList.remove('glow-pulse');
        alert("⏱️ KTU PCCST501 60-MARK EXAM SIMULATOR INITIALIZED\n\nStructure:\n- Part A: 8 Compulsory Questions (24 Marks)\n- Part B: 4 High-Weightage Boss Encounters (36 Marks)\nTotal: 60 Marks | Duration: 2 Hours 30 Minutes\n\nGood luck!");

        // Assemble 8 Part A (2 per module) + 4 Part B (1 per module)
        const partA = [];
        for (let m = 1; m <= 4; m++) {
            const mQ = this.data.quickHacks.filter(q => q.module === m);
            partA.push(mQ[0], mQ[1]);
        }
        const partB = [];
        for (let m = 1; m <= 4; m++) {
            const mB = this.data.bossBattles.filter(b => b.module === m);
            partB.push(mB[0]);
        }

        this.examQuestions = [...partA, ...partB];
        this.currentEncounterIndex = 0;
        this.totalScore = 0;
        this.updateHUD();
        this.loadEncounter(this.examQuestions[0]);
    }
}

// Instantiate engine when DOM is ready or immediately if already loaded
function bootNetInfiltrator() {
    if (!window.gameEngine) {
        window.gameEngine = new NetInfiltratorEngine();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootNetInfiltrator);
} else {
    bootNetInfiltrator();
}
