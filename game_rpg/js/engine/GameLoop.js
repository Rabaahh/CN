// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// GameLoop.js - High-Performance 60 FPS Animation Loop & Canvas Orchestrator
// ==========================================================================

class GameLoopEngine {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.isRunning = false;
        this.lastTime = 0;
        this.accumulatedTime = 0;
        this.fps = 60;
        this.frameCount = 0;
        this.fpsTimer = 0;
        
        // Logical Resolution (16:9 standard)
        this.logicalWidth = 1280;
        this.logicalHeight = 720;
        this.scale = 1.0;

        // Visual Pipeline & Particle System
        this.renderer = null;
        this.particles = null;
        this.input = null;
        this.player = null;
        this.combat = null;
        this.sector1 = null;
        this.sector2 = null;
        this.minigame = null;
        this.modulationMinigame = null;
        this.capacityGate = null;
        this.collisionHazard = null;
        this.crcMinigame = null;
        this.fragMinigame = null;
        this.dijkstraMinigame = null;
        this.bossOSPF = null;
        this.sector4 = null;
        this.webInfiltration = null;
        this.p2pCamp = null;
        this.torrentMinigame = null;
        this.snmpMinigame = null;
        this.asn1Debugger = null;
        this.questManager = null;
        this.dialogueSystem = null;
        this.codexViewer = null;
        this.rubricGrader = null;
        this.saveManager = null;
        this.examSimulator = null;
        this.worldInspector = null;
        this.studyGuide = null;
        this.activeSectorId = 1;
        this.mouseWorldX = 640;
        this.mouseWorldY = 360;
        this.streamTimer = 0;

        // Background animated vector grid parameters
        this.gridOffset = { x: 0, y: 0 };
        this.pulseTime = 0;

        // Cache DOM elements for HUD synchronization
        this.dom = {};
    }

    init() {
        this.canvas = document.getElementById('gameCanvas');
        if (!this.canvas) {
            console.error('[GameLoop] Canvas element #gameCanvas not found!');
            return false;
        }

        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.logicalWidth;
        this.canvas.height = this.logicalHeight;

        // Initialize Renderer, Particle Engine, Input Manager, and Player Entity
        const RendererClass = window.CyberRenderer || (typeof CyberRenderer !== 'undefined' ? CyberRenderer : null);
        const ParticleClass = window.CyberParticleEngine || (typeof CyberParticleEngine !== 'undefined' ? CyberParticleEngine : null);
        const InputClass = window.CyberInputManager || (typeof CyberInputManager !== 'undefined' ? CyberInputManager : null);
        const PlayerClass = window.Unit0xVOID || (typeof Unit0xVOID !== 'undefined' ? Unit0xVOID : null);

        this.renderer = window.Renderer || (RendererClass ? new RendererClass(this.logicalWidth, this.logicalHeight) : null);
        this.particles = window.ParticleSystem || (ParticleClass ? new ParticleClass(600) : null);
        this.input = window.InputManager || (InputClass ? new InputClass() : null);
        this.player = window.Player || (PlayerClass ? new PlayerClass(150, 360) : null);

        if (this.player && !window.Player) window.Player = this.player;
        if (this.input && !window.InputManager) window.InputManager = this.input;

        // Initialize Tactical Network Combat System
        const CombatClass = window.CyberCombatEngine || (typeof CyberCombatEngine !== 'undefined' ? CyberCombatEngine : null);
        this.combat = window.CombatSystem || (CombatClass ? new CombatClass() : null);
        if (this.combat && typeof this.combat.init === 'function') {
            this.combat.init();
        }
        if (this.combat && !window.CombatSystem) window.CombatSystem = this.combat;

        // Initialize Sector 1: Physical Layer World Map & Oscilloscope Minigame
        const Sector1Class = window.Sector1_Physical || (typeof Sector1_Physical !== 'undefined' ? Sector1_Physical : null);
        const Sector2Class = window.Sector2_DataLink || (typeof Sector2_DataLink !== 'undefined' ? Sector2_DataLink : null);
        const MinigameClass = window.LineCodingMinigame || (typeof LineCodingMinigame !== 'undefined' ? LineCodingMinigame : null);
        const ModulationClass = window.ModulationMinigame || (typeof ModulationMinigame !== 'undefined' ? ModulationMinigame : null);
        const CapacityClass = window.CapacityGate || (typeof CapacityGate !== 'undefined' ? CapacityGate : null);
        const HazardClass = window.CollisionBusHazard || (typeof CollisionBusHazard !== 'undefined' ? CollisionBusHazard : null);
        const CRCClass = window.CRCMinigame || (typeof CRCMinigame !== 'undefined' ? CRCMinigame : null);
        const BitStuffingClass = window.BitStuffingCorridor || (typeof BitStuffingCorridor !== 'undefined' ? BitStuffingCorridor : null);
        const SwitchClass = window.SwitchLearningMinigame || (typeof SwitchLearningMinigame !== 'undefined' ? SwitchLearningMinigame : null);
        const Sector3Class = window.Sector3_Network || (typeof Sector3_Network !== 'undefined' ? Sector3_Network : null);
        const FragClass = window.FragmentationMinigame || (typeof FragmentationMinigame !== 'undefined' ? FragmentationMinigame : null);
        const DijkstraClass = window.DijkstraMinigame || (typeof DijkstraMinigame !== 'undefined' ? DijkstraMinigame : null);
        const BossOSPFClass = window.BossOSPF || (typeof BossOSPF !== 'undefined' ? BossOSPF : null);
        const Sector4Class = window.Sector4_Application || (typeof Sector4_Application !== 'undefined' ? Sector4_Application : null);
        const WebInfiltrationClass = window.WebInfiltrationMinigame || (typeof WebInfiltrationMinigame !== 'undefined' ? WebInfiltrationMinigame : null);
        const P2PCampClass = window.P2PSwarmCamp || (typeof P2PSwarmCamp !== 'undefined' ? P2PSwarmCamp : null);
        const TorrentClass = window.BitTorrentMinigame || (typeof BitTorrentMinigame !== 'undefined' ? BitTorrentMinigame : null);
        const SNMPClass = window.SNMPMinigame || (typeof SNMPMinigame !== 'undefined' ? SNMPMinigame : null);
        const ASN1Class = window.ASN1Debugger || (typeof ASN1Debugger !== 'undefined' ? ASN1Debugger : null);
        const QuestManagerClass = window.QuestManager || (typeof QuestManager !== 'undefined' ? QuestManager : null);
        const DialogueClass = window.DialogueSystem || (typeof DialogueSystem !== 'undefined' ? DialogueSystem : null);
        const CodexClass = window.CodexViewer || (typeof CodexViewer !== 'undefined' ? CodexViewer : null);
        const GraderClass = window.KTURubricGrader || (typeof KTURubricGrader !== 'undefined' ? KTURubricGrader : null);
        const SaveClass = window.SaveManager || (typeof SaveManager !== 'undefined' ? SaveManager : null);
        const ExamClass = window.ExamSimulator || (typeof ExamSimulator !== 'undefined' ? ExamSimulator : null);

        this.sector1 = typeof Sector1Class === 'function' ? new Sector1Class() : Sector1Class;
        this.sector2 = typeof Sector2Class === 'function' ? new Sector2Class() : Sector2Class;
        this.sector3 = typeof Sector3Class === 'function' ? new Sector3Class() : Sector3Class;
        this.sector4 = typeof Sector4Class === 'function' ? new Sector4Class() : Sector4Class;
        this.p2pCamp = typeof P2PCampClass === 'function' ? new P2PCampClass() : P2PCampClass;
        this.minigame = typeof MinigameClass === 'function' ? new MinigameClass() : MinigameClass;
        this.modulationMinigame = typeof ModulationClass === 'function' ? new ModulationClass() : ModulationClass;
        this.capacityGate = typeof CapacityClass === 'function' ? new CapacityClass() : CapacityClass;
        this.collisionHazard = typeof HazardClass === 'function' ? new HazardClass() : HazardClass;
        this.crcMinigame = typeof CRCClass === 'function' ? new CRCClass() : CRCClass;
        this.bitStuffing = typeof BitStuffingClass === 'function' ? new BitStuffingClass() : BitStuffingClass;
        this.switchMinigame = typeof SwitchClass === 'function' ? new SwitchClass() : SwitchClass;
        this.fragMinigame = typeof FragClass === 'function' ? new FragClass() : FragClass;
        this.dijkstraMinigame = typeof DijkstraClass === 'function' ? new DijkstraClass() : DijkstraClass;
        this.bossOSPF = typeof BossOSPFClass === 'function' ? new BossOSPFClass() : BossOSPFClass;
        this.webInfiltration = typeof WebInfiltrationClass === 'function' ? new WebInfiltrationClass() : WebInfiltrationClass;
        this.torrentMinigame = typeof TorrentClass === 'function' ? new TorrentClass() : TorrentClass;
        this.snmpMinigame = typeof SNMPClass === 'function' ? new SNMPClass() : SNMPClass;
        this.asn1Debugger = typeof ASN1Class === 'function' ? new ASN1Class() : ASN1Class;
        this.questManager = typeof QuestManagerClass === 'function' ? new QuestManagerClass() : QuestManagerClass;
        this.dialogueSystem = typeof DialogueClass === 'function' ? new DialogueClass() : DialogueClass;
        this.codexViewer = typeof CodexClass === 'function' ? new CodexClass() : CodexClass;
        this.rubricGrader = typeof GraderClass === 'function' ? new GraderClass() : GraderClass;
        this.saveManager = typeof SaveClass === 'function' ? new SaveClass(window.GameState, window.CyberAudio) : SaveClass;
        this.examSimulator = typeof ExamClass === 'function' ? new ExamClass(window.GameState, window.CyberAudio) : ExamClass;
        const InspectorClass = window.WorldInspector || (typeof WorldInspector !== 'undefined' ? WorldInspector : null);
        this.worldInspector = typeof InspectorClass === 'function' ? new InspectorClass() : InspectorClass;
        const StudyClass = window.StudyGuideSystem || (typeof StudyGuideSystem !== 'undefined' ? StudyGuideSystem : null);
        this.studyGuide = window.studyGuideInstance || (typeof StudyClass === 'function' ? new StudyClass() : null);
        if (this.studyGuide && !window.studyGuideInstance) window.studyGuideInstance = this.studyGuide;

        // Auto-open initial curriculum study note when game loads
        setTimeout(() => {
            if (this.studyGuide && !this.studyGuide.isOpen && this.activeSectorId === 1 && !this.studyGuide.completedStages.has(1)) {
                this.studyGuide.openStage(0, 0);
            }
        }, 400);

        // Auto-load saved state if present
        if (this.saveManager && typeof this.saveManager.hasSave === 'function' && this.saveManager.hasSave()) {
            this.saveManager.load();
            if (this.player && window.GameState && window.GameState.state && window.GameState.state.player) {
                this.player.x = window.GameState.state.player.x;
                this.player.y = window.GameState.state.player.y;
            }
        }

        this.cacheDOM();
        this.bindEvents();
        this.handleResize();

        // Listen for window resize with rAF debouncing to prevent frame buffer thrashing
        if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
            let resizeRaf = null;
            window.addEventListener('resize', () => {
                if (resizeRaf) cancelAnimationFrame(resizeRaf);
                resizeRaf = requestAnimationFrame(() => this.handleResize());
            });
        }

        // Connect GameState listeners to HUD updates
        const gs = window.GameState;
        if (gs) {
            gs.on('playerUpdate', () => this.syncHUD());
            gs.on('scoreUpdate', () => this.syncHUD());
            gs.on('stateChange', ({ to }) => {
                const overlay = this.dom.pauseOverlay;
                if (overlay) {
                    overlay.classList.toggle('hidden', to !== 'PAUSED');
                }
            });
        }

        this.syncHUD();
        this.updateInfoButton();
        this.updateStepsButton();
        this.start();
        console.log('[GameLoop] Initialized successfully with CyberRenderer and ParticleSystem.');
        return true;
    }

    transitionToSector(sectorId) {
        this.activeSectorId = sectorId;
        const gs = window.GameState;

        if (sectorId === 2) {
            if (gs) {
                gs.state.currentSector.id = 2;
                gs.state.currentSector.name = 'Sector 2: The Frame Matrix';
                gs.state.currentSector.moduleNumber = 3;
                gs.state.player.currentLayer = 3;
                gs.state.player.layerName = 'Data Link Layer (Module 3)';
                gs.emit('sectorChange', { sectorId: 2 });
            }

            if (this.renderer) {
                this.renderer.currentSectorId = 2;
                this.renderer.shake(18, 0.4);
            }

            if (this.player) {
                this.player.x = 150;
                this.player.y = 360;
                this.player.vx = 0;
                this.player.vy = 0;
            }

            if (this.particles) {
                this.particles.emitPacketDischarge(150, 360, '#00ff88', 50);
            }

            if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxAccessGranted === 'function') {
                window.CyberAudio.sfxAccessGranted();
            }

            this.syncHUD();
            console.log('[GameLoop] Ascended to Sector 2: The Frame Matrix (Module 3: Data Link Layer)');
        } else if (sectorId === 3) {
            if (gs) {
                gs.state.currentSector.id = 3;
                gs.state.currentSector.name = 'Sector 3: The Routing Core';
                gs.state.currentSector.moduleNumber = 2;
                gs.state.player.currentLayer = 3;
                gs.state.player.layerName = 'Network Layer (Module 2)';
                gs.emit('sectorChange', { sectorId: 3 });
            }

            if (this.renderer) {
                this.renderer.currentSectorId = 3;
                this.renderer.shake(20, 0.45);
            }

            if (this.player) {
                this.player.x = 150;
                this.player.y = 360;
                this.player.vx = 0;
                this.player.vy = 0;
            }

            if (this.particles) {
                this.particles.emitPacketDischarge(150, 360, '#00e5ff', 60);
            }

            if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxAccessGranted === 'function') {
                window.CyberAudio.sfxAccessGranted();
            }

            this.syncHUD();
            console.log('[GameLoop] Ascended to Sector 3: The Routing Core (Module 2: Network Layer)');
        } else if (sectorId === 4) {
            if (gs) {
                gs.state.currentSector.id = 4;
                gs.state.currentSector.name = 'Sector 4: The Application Nexus';
                gs.state.currentSector.moduleNumber = 1;
                gs.state.player.currentLayer = 5;
                gs.state.player.layerName = 'Application Layer (Module 1)';
                gs.emit('sectorChange', { sectorId: 4 });
            }

            if (this.renderer) {
                this.renderer.currentSectorId = 4;
                this.renderer.shake(22, 0.5);
            }

            if (this.player) {
                this.player.x = 150;
                this.player.y = 360;
                this.player.vx = 0;
                this.player.vy = 0;
            }

            if (this.particles) {
                this.particles.emitPacketDischarge(150, 360, '#c084fc', 70);
            }

            if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxAccessGranted === 'function') {
                window.CyberAudio.sfxAccessGranted();
            }

            this.syncHUD();
            console.log('[GameLoop] Ascended to Sector 4: The Application Nexus (Module 1: Application Layer)');
        }
    }

    cacheDOM() {
        this.dom = {
            viewportContainer: document.getElementById('viewport-container'),
            pauseOverlay: document.getElementById('pause-overlay'),
            btnResume: document.getElementById('btn-resume'),
            btnPause: document.getElementById('btn-pause'),
            btnMusic: document.getElementById('btn-music'),
            btnSfx: document.getElementById('btn-sfx'),
            btnQuests: document.getElementById('btn-quests'),
            btnToggleSteps: document.getElementById('btn-toggle-steps'),
            btnToggleInfo: document.getElementById('btn-toggle-info'),
            btnStudy: document.getElementById('btn-study'),
            btnCodex: document.getElementById('btn-codex'),
            btnGrader: document.getElementById('btn-grader'),
            btnExam: document.getElementById('btn-exam'),
            btnSave: document.getElementById('btn-save'),
            btnReset: document.getElementById('btn-reset'),
            valHp: document.getElementById('val-hp'),
            fillHp: document.getElementById('fill-hp'),
            valBuffer: document.getElementById('val-buffer'),
            fillBuffer: document.getElementById('fill-buffer'),
            valTtl: document.getElementById('val-ttl'),
            fillTtl: document.getElementById('fill-ttl'),
            valScore: document.getElementById('val-score'),
            valLayer: document.getElementById('val-layer'),
            valRate: document.getElementById('val-rate'),
            valUtil: document.getElementById('val-util')
        };
    }

    bindEvents() {
        // Keyboard controls
        if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
            window.addEventListener('keydown', (e) => {
                // Pause toggle (P or Escape)
                if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
                    const gs = window.GameState;
                    if (gs) {
                        gs.togglePause();
                    }
                }

                // Music Toggle (M key)
                if (e.key === 'm' || e.key === 'M') {
                    if (window.CyberAudio) {
                        window.CyberAudio.toggleMusic();
                    }
                }

                // Tactical Quest Log Toggle (Tab key)
                if (e.key === 'Tab') {
                    e.preventDefault();
                    if (this.questManager) {
                        this.questManager.toggle();
                    }
                }

                // Neural Codex Toggle (C key)
                if (e.key === 'c' || e.key === 'C') {
                    if (!this.codexViewer || !this.codexViewer.isSearchFocused) {
                        if (this.codexViewer) {
                            this.codexViewer.toggle();
                        }
                    }
                }

                // KTU 9-Mark Rubric Grader Toggle (G key)
                if (e.key === 'g' || e.key === 'G') {
                    if (!this.rubricGrader || !this.rubricGrader.isTyping) {
                        if (this.rubricGrader) {
                            this.rubricGrader.toggle();
                        }
                    }
                }

                // KTU 60-Mark Exam Simulator Toggle (X key)
                if (e.key === 'x' || e.key === 'X') {
                    if (!this.rubricGrader?.isTyping && !this.codexViewer?.isSearchFocused) {
                        if (this.examSimulator) {
                            this.examSimulator.toggle();
                        }
                    }
                }

                // Quick Save (F5 key)
                if (e.key === 'F5') {
                    e.preventDefault();
                    if (this.saveManager) {
                        this.saveManager.save(false);
                    }
                }

                // Toggle Object Inspector Card (H key)
                if (e.key === 'h' || e.key === 'H') {
                    if (this.worldInspector) {
                        this.worldInspector.isInspectCardVisible = !this.worldInspector.isInspectCardVisible;
                        this.updateInfoButton();
                        const status = this.worldInspector.isInspectCardVisible ? 'SHOWN' : 'HIDDEN (Press [H] to restore)';
                        if (this.hud && typeof this.hud.showNotification === 'function') {
                            this.hud.showNotification(`👁️ Object Info Box: ${status}`, 2000);
                        }
                    }
                }

                // Toggle Top Mission Guidance Steps Bar (U key)
                if (e.key === 'u' || e.key === 'U') {
                    if (this.worldInspector) {
                        this.worldInspector.isGuidanceVisible = !this.worldInspector.isGuidanceVisible;
                        this.updateStepsButton();
                        const status = this.worldInspector.isGuidanceVisible ? 'SHOWN' : 'HIDDEN (Press [U] to restore)';
                        if (this.hud && typeof this.hud.showNotification === 'function') {
                            this.hud.showNotification(`📍 Top Mission Steps: ${status}`, 2000);
                        }
                    }
                }

                // Sector Warps (1-4 keys when not in any modal)
                if (['1', '2', '3', '4'].includes(e.key)) {
                    const isAnyModalOpen = (this.rubricGrader && this.rubricGrader.isOpen) ||
                                           (this.codexViewer && this.codexViewer.isOpen) ||
                                           (this.examSimulator && this.examSimulator.isOpen) ||
                                           (this.questManager && this.questManager.isOpen) ||
                                           (this.dialogueSystem && this.dialogueSystem.isOpen);
                    if (!isAnyModalOpen) {
                        const targetSector = parseInt(e.key, 10);
                        if (targetSector !== this.activeSectorId) {
                            this.activeSectorId = targetSector;
                            if (window.GameState && window.GameState.state && window.GameState.state.currentSector) {
                                window.GameState.state.currentSector.id = targetSector;
                            }
                            if (this.player) {
                                this.player.x = 200;
                                this.player.y = 360;
                            }
                            if (this.saveManager) this.saveManager.save(true);
                            if (window.CyberAudio && typeof window.CyberAudio.sfxAccessGranted === 'function') {
                                window.CyberAudio.sfxAccessGranted();
                            }
                            console.log(`[GameLoop] Warp to Sector ${targetSector} executed.`);
                        }
                    }
                }

                // Forward character input to Codex Search when focused
                if (this.codexViewer && this.codexViewer.isOpen && this.codexViewer.isSearchFocused) {
                    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                        if (this.input) this.input.lastChar = e.key;
                    }
                }

                // Forward character input to Rubric Grader when typing
                if (this.rubricGrader && this.rubricGrader.isOpen && this.rubricGrader.isTyping) {
                    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                        if (this.input) this.input.lastChar = e.key;
                    }
                }

                // Test VFX Trigger (T key) -> Screen Shake & Particle Burst
                if (e.key === 't' || e.key === 'T') {
                    if (this.renderer) {
                        this.renderer.shake(14, 0.35);
                    }
                    if (this.particles) {
                        this.particles.emitPacketDischarge(this.mouseWorldX, this.mouseWorldY, '#00ffcc', 45);
                        this.particles.emitBufferOverflowSparks(this.mouseWorldX, this.mouseWorldY, 18);
                    }
                }
            });
        }

        // Track mouse position over canvas
        if (this.canvas) {
            this.canvas.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                const screenX = (e.clientX - rect.left) / (rect.width / this.logicalWidth);
                const screenY = (e.clientY - rect.top) / (rect.height / this.logicalHeight);
                if (this.renderer) {
                    const world = this.renderer.screenToWorld(screenX, screenY);
                    this.mouseWorldX = world.x;
                    this.mouseWorldY = world.y;
                } else {
                    this.mouseWorldX = screenX;
                    this.mouseWorldY = screenY;
                }

                if (this.input && this.input.mouse) {
                    this.input.mouse.screenX = screenX;
                    this.input.mouse.screenY = screenY;
                    this.input.mouse.worldX = this.mouseWorldX;
                    this.input.mouse.worldY = this.mouseWorldY;
                }
            });

            // Clicking canvas also triggers a burst at click position
            this.canvas.addEventListener('mousedown', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                const screenX = (e.clientX - rect.left) / (rect.width / this.logicalWidth);
                const screenY = (e.clientY - rect.top) / (rect.height / this.logicalHeight);

                // Forward click to Top Guidance box close button
                if (this.worldInspector && this.worldInspector.isGuidanceVisible) {
                    if (this.worldInspector.checkGuidanceCloseClick(screenX, screenY)) {
                        this.updateStepsButton();
                        if (this.hud && typeof this.hud.showNotification === 'function') {
                            this.hud.showNotification('📍 Top Mission Steps: HIDDEN (Press [U] to restore)', 2500);
                        }
                        return;
                    }
                }

                // Forward click to Object Inspector card close button
                if (this.worldInspector && this.worldInspector.isInspectCardVisible) {
                    if (this.worldInspector.checkCloseClick(screenX, screenY)) {
                        this.updateInfoButton();
                        if (this.hud && typeof this.hud.showNotification === 'function') {
                            this.hud.showNotification('👁️ Object Info Box: HIDDEN (Press [H] to restore)', 2500);
                        }
                        return;
                    }
                }

                // Forward click to Exam Simulator if open
                if (this.examSimulator && this.examSimulator.isOpen) {
                    if (typeof this.examSimulator.handleClick === 'function') {
                        this.examSimulator.handleClick(screenX, screenY);
                    }
                    return;
                }

                if (this.particles) {
                    this.particles.emitPacketDischarge(this.mouseWorldX, this.mouseWorldY, '#ff007f', 30);
                }
            });
        }

        if (this.dom.btnResume) {
            this.dom.btnResume.addEventListener('click', () => {
                const gs = window.GameState;
                if (gs && gs.isPaused()) {
                    gs.togglePause();
                }
            });
        }

        if (this.dom.btnPause) {
            this.dom.btnPause.addEventListener('click', () => {
                const gs = window.GameState;
                if (gs) {
                    gs.togglePause();
                }
            });
        }

        if (this.dom.btnMusic) {
            this.dom.btnMusic.addEventListener('click', () => {
                if (window.CyberAudio) {
                    window.CyberAudio.toggleMusic();
                }
            });
        }

        if (this.dom.btnSfx) {
            this.dom.btnSfx.addEventListener('click', () => {
                if (window.CyberAudio) {
                    window.CyberAudio.toggleSFX();
                }
            });
        }

        if (this.dom.btnQuests) {
            this.dom.btnQuests.addEventListener('click', () => {
                if (this.questManager) {
                    this.questManager.toggle();
                }
            });
        }

        if (this.dom.btnStudy) {
            this.dom.btnStudy.addEventListener('click', () => {
                if (this.studyGuide) {
                    this.studyGuide.openStage(this.studyGuide.currentStageIndex, 0);
                }
            });
        }

        if (this.dom.btnCodex) {
            this.dom.btnCodex.addEventListener('click', () => {
                if (this.codexViewer) {
                    this.codexViewer.toggle();
                }
            });
        }

        if (this.dom.btnGrader) {
            this.dom.btnGrader.addEventListener('click', () => {
                if (this.rubricGrader) {
                    this.rubricGrader.toggle();
                }
            });
        }

        if (this.dom.btnExam) {
            this.dom.btnExam.addEventListener('click', () => {
                if (this.examSimulator) {
                    this.examSimulator.toggle();
                }
            });
        }

        if (this.dom.btnToggleInfo) {
            this.dom.btnToggleInfo.addEventListener('click', () => {
                if (this.worldInspector) {
                    this.worldInspector.isInspectCardVisible = !this.worldInspector.isInspectCardVisible;
                    this.updateInfoButton();
                    const status = this.worldInspector.isInspectCardVisible ? 'SHOWN' : 'HIDDEN';
                    if (this.hud && typeof this.hud.showNotification === 'function') {
                        this.hud.showNotification(`👁️ Object Info Box: ${status} [H]`, 2000);
                    }
                }
            });
        }

        if (this.dom.btnToggleSteps) {
            this.dom.btnToggleSteps.addEventListener('click', () => {
                if (this.worldInspector) {
                    this.worldInspector.isGuidanceVisible = !this.worldInspector.isGuidanceVisible;
                    this.updateStepsButton();
                    const status = this.worldInspector.isGuidanceVisible ? 'SHOWN' : 'HIDDEN';
                    if (this.hud && typeof this.hud.showNotification === 'function') {
                        this.hud.showNotification(`📍 Top Mission Steps: ${status} [U]`, 2000);
                    }
                }
            });
        }

        if (this.dom.btnSave) {
            this.dom.btnSave.addEventListener('click', () => {
                if (this.saveManager) {
                    this.saveManager.save(false);
                }
            });
        }

        if (this.dom.btnReset) {
            this.dom.btnReset.addEventListener('click', () => {
                const conf = (typeof window !== 'undefined' && window.confirm) ? window.confirm('PURGE STORAGE: Are you sure you want to reboot Sector 1 and reset all progress?') : true;
                if (conf && this.saveManager) {
                    this.saveManager.reset();
                    this.activeSectorId = 1;
                    if (this.player) {
                        this.player.x = 150;
                        this.player.y = 360;
                    }
                    this.syncHUD();
                }
            });
        }
    }

    updateInfoButton() {
        const btn = this.dom ? this.dom.btnToggleInfo : (typeof document !== 'undefined' ? document.getElementById('btn-toggle-info') : null);
        const lbl = typeof document !== 'undefined' ? document.getElementById('info-btn-label') : null;
        if (!btn || !this.worldInspector) return;
        const isVis = this.worldInspector.isInspectCardVisible;
        if (lbl) {
            lbl.textContent = isVis ? '👁️ INFO: ON [H]' : '👁️ INFO: OFF [H]';
        }
        if (isVis) {
            btn.classList.add('cyan-glow');
            btn.classList.remove('muted');
        } else {
            btn.classList.remove('cyan-glow');
            btn.classList.add('muted');
        }
    }

    updateStepsButton() {
        const btn = this.dom ? this.dom.btnToggleSteps : (typeof document !== 'undefined' ? document.getElementById('btn-toggle-steps') : null);
        const lbl = typeof document !== 'undefined' ? document.getElementById('steps-btn-label') : null;
        if (!btn || !this.worldInspector) return;
        const isVis = this.worldInspector.isGuidanceVisible;
        if (lbl) {
            lbl.textContent = isVis ? '📍 STEPS: ON [U]' : '📍 STEPS: OFF [U]';
        }
        if (isVis) {
            btn.classList.add('cyan-glow');
            btn.classList.remove('muted');
        } else {
            btn.classList.remove('cyan-glow');
            btn.classList.add('muted');
        }
    }

    handleResize() {
        if (!this.canvas || !this.dom.viewportContainer) return;

        const container = this.dom.viewportContainer;
        const availWidth = container.clientWidth - 20;
        const availHeight = container.clientHeight - 20;

        const targetAspect = this.logicalWidth / this.logicalHeight;
        const windowAspect = availWidth / availHeight;

        let displayWidth, displayHeight;
        if (windowAspect > targetAspect) {
            displayHeight = availHeight;
            displayWidth = displayHeight * targetAspect;
        } else {
            displayWidth = availWidth;
            displayHeight = displayWidth / targetAspect;
        }

        const dpr = (typeof window !== 'undefined' && window.devicePixelRatio) ? window.devicePixelRatio : 1;
        this.canvas.style.width = `${Math.floor(displayWidth)}px`;
        this.canvas.style.height = `${Math.floor(displayHeight)}px`;

        // Physical pixel buffer size matching retina / 4K screen!
        this.canvas.width = Math.floor(this.logicalWidth * dpr);
        this.canvas.height = Math.floor(this.logicalHeight * dpr);

        if (this.ctx) {
            this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            this.ctx.imageSmoothingEnabled = true;
            this.ctx.imageSmoothingQuality = 'high';
        }

        this.scale = displayWidth / this.logicalWidth;
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.lastTime = performance.now();
        requestAnimationFrame((time) => this.tick(time));
    }

    stop() {
        this.isRunning = false;
    }

    tick(currentTime) {
        if (!this.isRunning) return;

        // Strict Delta Time calculation in seconds
        let dt = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        // Cap dt to prevent physics explosion / tunneling after lag spike
        if (dt > 0.1) dt = 0.1;

        // FPS calculation
        this.frameCount++;
        this.fpsTimer += dt;
        if (this.fpsTimer >= 1.0) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.fpsTimer -= 1.0;
        }

        const gs = window.GameState;
        const isPaused = gs ? gs.isPaused() : false;

        try {
            if (!isPaused) {
                this.update(dt);
            }
            this.render();
        } catch (err) {
            console.error('[GameLoop] Recovered from frame error:', err);
        }

        requestAnimationFrame((time) => this.tick(time));
    }

    update(dt) {
        // Modal input handlers (freeze world physics when modal is open)
        if (this.minigame && this.minigame.isOpen) {
            this.minigame.handleInput(this.input);
            if (this.input) this.input.endFrame();
            return;
        }

        if (this.modulationMinigame && this.modulationMinigame.isOpen) {
            this.modulationMinigame.handleInput(this.input);
            if (this.input) this.input.endFrame();
            return;
        }

        if (this.capacityGate && (this.capacityGate.isTerminalOpen || this.capacityGate.isBossActive)) {
            this.capacityGate.handleInput(this.input);
            if (this.input) this.input.endFrame();
            return;
        }

        if (this.collisionHazard && this.collisionHazard.isTerminalOpen) {
            this.collisionHazard.handleInput(this.input);
            if (this.input) this.input.endFrame();
            return;
        }

        if (this.crcMinigame && this.crcMinigame.isOpen) {
            this.crcMinigame.handleInput(this.input);
            if (this.input) this.input.endFrame();
            return;
        }

        if (this.switchMinigame && this.switchMinigame.isOpen) {
            this.switchMinigame.handleInput(this.input);
            if (this.input) this.input.endFrame();
            return;
        }

        if (this.fragMinigame && this.fragMinigame.isOpen) {
            this.fragMinigame.handleInput(this.input);
            if (this.input) this.input.endFrame();
            return;
        }

        if (this.dijkstraMinigame && this.dijkstraMinigame.isOpen) {
            this.dijkstraMinigame.handleInput(this.input);
            if (this.input) this.input.endFrame();
            return;
        }

        if (this.bossOSPF && this.bossOSPF.isTerminalOpen) {
            this.bossOSPF.handleTerminalInput(this.input);
            if (this.input) this.input.endFrame();
            return;
        }

        if (this.webInfiltration && this.webInfiltration.isOpen) {
            this.webInfiltration.handleInput(this.input);
            if (this.input) this.input.endFrame();
            return;
        }

        if (this.torrentMinigame && this.torrentMinigame.isOpen) {
            this.torrentMinigame.handleInput(this.input);
            if (this.input) this.input.endFrame();
            return;
        }

        if (this.snmpMinigame && this.snmpMinigame.isOpen) {
            this.snmpMinigame.handleInput(this.input);
            if (this.input) this.input.endFrame();
            return;
        }

        if (this.asn1Debugger && this.asn1Debugger.isOpen) {
            this.asn1Debugger.handleInput(this.input);
            if (this.input) this.input.endFrame();
            return;
        }

        // Quest Manager Modal (TAB)
        if (this.questManager && this.questManager.isOpen) {
            this.questManager.handleInput(this.input);
            if (this.input) this.input.endFrame();
            return;
        }

        // Dialogue System Modal
        if (this.dialogueSystem && this.dialogueSystem.isOpen) {
            this.dialogueSystem.update(dt);
            this.dialogueSystem.handleInput(this.input);
            if (this.input) this.input.endFrame();
            return;
        }

        // Neural Codex Library Modal (C)
        if (this.codexViewer && this.codexViewer.isOpen) {
            this.codexViewer.update(dt);
            this.codexViewer.handleInput(this.input);
            if (this.input) this.input.endFrame();
            return;
        }

        // KTU 9-Mark Master Rubric Grader Modal (G)
        if (this.rubricGrader && this.rubricGrader.isOpen) {
            this.rubricGrader.update(dt);
            this.rubricGrader.handleInput(this.input);
            if (this.input) this.input.endFrame();
            return;
        }

        // Save Manager notification updates
        if (this.saveManager) {
            this.saveManager.update(dt);
        }

        // KTU 60-Mark Full Exam Simulator Modal (X)
        if (this.examSimulator && this.examSimulator.isOpen) {
            this.examSimulator.update(dt);
            this.examSimulator.handleInput(this.input);
            if (this.input) this.input.endFrame();
            return;
        }

        // Academic Study Guide Modal (B)
        if (this.studyGuide && this.studyGuide.isOpen) {
            if (this.input) this.input.endFrame();
            return;
        }

        this.pulseTime += dt;

        // Auto-track sequential learning milestones across all 4 modules
        if (this.studyGuide && this.player) {
            if (this.activeSectorId === 1) {
                if (this.player.x >= 540) this.studyGuide.markStageCompleted(1);
                if (this.player.isInFiber) this.studyGuide.markStageCompleted(2);
                if (this.player.x >= 1200) this.studyGuide.markStageCompleted(3);
                if (this.player.x >= 1700) this.studyGuide.markStageCompleted(4);
            } else if (this.activeSectorId === 2) {
                this.studyGuide.markStageCompleted(4);
                if (this.player.x >= 450) this.studyGuide.markStageCompleted(5);
                if (this.player.x >= 800) this.studyGuide.markStageCompleted(6);
                if (this.player.x >= 1200) this.studyGuide.markStageCompleted(7);
                if (this.player.x >= 1600) this.studyGuide.markStageCompleted(8);
            } else if (this.activeSectorId === 3) {
                this.studyGuide.markStageCompleted(8);
                if (this.player.x >= 350) this.studyGuide.markStageCompleted(9);
                if (this.player.x >= 650) this.studyGuide.markStageCompleted(10);
                if (this.player.x >= 950) this.studyGuide.markStageCompleted(11);
                if (this.player.x >= 1500) this.studyGuide.markStageCompleted(12);
            } else if (this.activeSectorId === 4) {
                this.studyGuide.markStageCompleted(12);
                if (this.player.x >= 350) this.studyGuide.markStageCompleted(13);
                if (this.player.x >= 750) this.studyGuide.markStageCompleted(14);
                if (this.player.x >= 1200) this.studyGuide.markStageCompleted(15);
            }
        }

        // Proximity Interaction with Allied NPCs (Agent ARP, Wanderer IP, Socket Daemon, Seeder Prime)
        if (this.dialogueSystem && this.player) {
            if (this.dialogueSystem.checkInteractions(this.activeSectorId, this.player, this.input)) {
                return;
            }
        }

        // --- Sector 1 Interactive Nodes ---
        if (this.activeSectorId === 1) {
            // Check interaction with Sector 1 Transmission Bulkhead Gate
            if (this.sector1 && this.player && this.sector1.isNearBulkhead(this.player.x, this.player.y)) {
                if (this.input && (this.input.isJustPressed('e') || (this.input.mouse && this.input.mouse.leftJustPressed && Math.abs(this.mouseWorldX - 1320) < 60))) {
                    if (this.minigame) {
                        this.minigame.open();
                        if (this.input) this.input.endFrame();
                        return;
                    }
                }
            }

            // Check interaction with Carrier Modulation Console (at X: 1450)
            if (this.sector1 && this.player && typeof this.sector1.isNearModulationConsole === 'function' && this.sector1.isNearModulationConsole(this.player.x, this.player.y)) {
                if (this.input && (this.input.isJustPressed('e') || (this.input.mouse && this.input.mouse.leftJustPressed && Math.abs(this.mouseWorldX - 1450) < 60))) {
                    if (this.modulationMinigame) {
                        this.modulationMinigame.open();
                        if (this.input) this.input.endFrame();
                        return;
                    }
                }
            }

            // Check interaction with Shannon-Nyquist Capacity Gate (at X: 1680)
            if (this.capacityGate && this.player && this.capacityGate.isNear(this.player.x, this.player.y)) {
                if (this.input && (this.input.isJustPressed('e') || (this.input.mouse && this.input.mouse.leftJustPressed && Math.abs(this.mouseWorldX - 1680) < 60))) {
                    this.capacityGate.openTerminal();
                    if (this.input) this.input.endFrame();
                    return;
                }
            }

            // Check interaction with Sector 2 Transit Elevator (at X: 1840)
            if (this.sector1 && this.player && typeof this.sector1.isNearElevator === 'function' && this.sector1.isNearElevator(this.player.x, this.player.y)) {
                if (this.input && (this.input.isJustPressed('e') || (this.input.mouse && this.input.mouse.leftJustPressed && Math.abs(this.mouseWorldX - 1840) < 60))) {
                    this.transitionToSector(2);
                    if (this.input) this.input.endFrame();
                    return;
                }
            }

            // Update Sector 1 Physical Layer Dynamics (Repeaters, Attenuation Fog, EMI Traps)
            if (this.sector1) {
                this.sector1.update(dt, this.player, this.particles, this.combat);
            }
            if (this.capacityGate) {
                this.capacityGate.update(dt, this.player, this.particles);
            }
        } else if (this.activeSectorId === 2) {
            // --- Sector 2 Interactive Nodes ---
            // Check interaction with 64-Byte Minimum Frame Terminal (at X: 1470)
            if (this.sector2 && this.player && typeof this.sector2.isNearFrameTerminal === 'function' && this.sector2.isNearFrameTerminal(this.player.x, this.player.y)) {
                if (this.input && (this.input.isJustPressed('e') || (this.input.mouse && this.input.mouse.leftJustPressed && Math.abs(this.mouseWorldX - 1470) < 60))) {
                    if (this.collisionHazard) {
                        this.collisionHazard.openTerminal();
                        if (this.input) this.input.endFrame();
                        return;
                    }
                }
            }

            // Check interaction with CRC Polynomial Laser Trap Terminal (at X: 1820)
            if (this.sector2 && this.player && typeof this.sector2.isNearCRCTerminal === 'function' && this.sector2.isNearCRCTerminal(this.player.x, this.player.y)) {
                if (this.input && (this.input.isJustPressed('e') || (this.input.mouse && this.input.mouse.leftJustPressed && Math.abs(this.mouseWorldX - 1820) < 60))) {
                    if (this.crcMinigame) {
                        this.crcMinigame.open();
                        if (this.input) this.input.endFrame();
                        return;
                    }
                }
            }

            // Check interaction with CENTINEL-802: Ethernet Switch Fabric Console (at X: 2120)
            if (this.sector2 && this.player && typeof this.sector2.isNearSwitchTerminal === 'function' && this.sector2.isNearSwitchTerminal(this.player.x, this.player.y)) {
                if (this.input && (this.input.isJustPressed('e') || (this.input.mouse && this.input.mouse.leftJustPressed && Math.abs(this.mouseWorldX - 2120) < 60))) {
                    if (this.switchMinigame) {
                        this.switchMinigame.open();
                        if (this.input) this.input.endFrame();
                        return;
                    }
                }
            }

            // Check interaction with Gateway to Sector 3 (at X: 2200)
            if (this.sector2 && this.player && typeof this.sector2.isNearSector3Gate === 'function' && this.sector2.isNearSector3Gate(this.player.x, this.player.y)) {
                if (this.sector2.sector3Gateway && this.sector2.sector3Gateway.isUnlocked) {
                    if (this.input && (this.input.isJustPressed('e') || this.player.x >= 2190 || (this.input.mouse && this.input.mouse.leftJustPressed && Math.abs(this.mouseWorldX - 2200) < 60))) {
                        this.transitionToSector(3);
                        if (this.input) this.input.endFrame();
                        return;
                    }
                }
            }

            // Update Sector 2 Data Link Layer Dynamics, Collision Storms & Bit Stuffing
            if (this.sector2) {
                this.sector2.update(dt, this.player, this.particles, this.collisionHazard);
            }
            if (this.collisionHazard) {
                this.collisionHazard.update(dt, this.player, this.particles);
            }
            if (this.bitStuffing) {
                this.bitStuffing.update(dt, this.player, this.input, this.particles, this.renderer);
            }
        } else if (this.activeSectorId === 3) {
            // --- Sector 3 Interactive Nodes ---
            // Check interaction with 1500-Byte MTU Laser Aperture (at X: 1450)
            if (this.sector3 && this.player && typeof this.sector3.isNearApertureTerminal === 'function' && this.sector3.isNearApertureTerminal(this.player.x, this.player.y)) {
                if (this.input && (this.input.isJustPressed('e') || (this.input.mouse && this.input.mouse.leftJustPressed && Math.abs(this.mouseWorldX - 1450) < 60))) {
                    if (this.fragMinigame) {
                        this.fragMinigame.open();
                        if (this.input) this.input.endFrame();
                        return;
                    }
                }
            }

            // Check interaction with Dijkstra Link-State Pathfinder Terminal (at X: 1800)
            if (this.sector3 && this.player && typeof this.sector3.isNearDijkstraTerminal === 'function' && this.sector3.isNearDijkstraTerminal(this.player.x, this.player.y)) {
                if (this.input && (this.input.isJustPressed('e') || (this.input.mouse && this.input.mouse.leftJustPressed && Math.abs(this.mouseWorldX - 1800) < 60))) {
                    if (this.dijkstraMinigame) {
                        this.dijkstraMinigame.open();
                        if (this.input) this.input.endFrame();
                        return;
                    }
                }
            }

            // Check interaction with Gateway to Sector 4 (at X: 2200)
            if (this.sector3 && this.player && typeof this.sector3.isNearSector4Gate === 'function' && this.sector3.isNearSector4Gate(this.player.x, this.player.y)) {
                if (this.sector3.sector4Gateway && this.sector3.sector4Gateway.isUnlocked) {
                    if (this.input && (this.input.isJustPressed('e') || this.player.x >= 2190 || (this.input.mouse && this.input.mouse.leftJustPressed && Math.abs(this.mouseWorldX - 2200) < 60))) {
                        this.transitionToSector(4);
                        if (this.input) this.input.endFrame();
                        return;
                    }
                }
            }

            // Check interaction with Boss CORE-OSPF-PRIME (Re-open Phase 2 terminal if closed)
            if (this.bossOSPF && this.bossOSPF.phase === 2 && !this.bossOSPF.isTerminalSolved && this.player && typeof this.bossOSPF.isNear === 'function' && this.bossOSPF.isNear(this.player.x, this.player.y)) {
                if (this.input && (this.input.isJustPressed('e') || (this.input.mouse && this.input.mouse.leftJustPressed && Math.abs(this.mouseWorldX - this.bossOSPF.x) < 60))) {
                    this.bossOSPF.openTerminal();
                    if (this.input) this.input.endFrame();
                    return;
                }
            }

            // Update Sector 3 Network Layer Dynamics & CIDR Subnet Stepping Grid
            if (this.sector3) {
                this.sector3.update(dt, this.player, this.particles, this.combat);
            }
            if (this.bossOSPF) {
                this.bossOSPF.update(dt, this.player, this.input, this.particles, this.renderer, this.combat);
            }
        } else if (this.activeSectorId === 4) {
            // Check interaction with Web Infiltration Terminal (at X: 700)
            if (this.sector4 && this.player && typeof this.sector4.isNearWebTerminal === 'function' && this.sector4.isNearWebTerminal(this.player.x, this.player.y)) {
                if (this.input && (this.input.isJustPressed('e') || (this.input.mouse && this.input.mouse.leftJustPressed && Math.abs(this.mouseWorldX - 700) < 60))) {
                    if (this.webInfiltration) {
                        this.webInfiltration.open();
                        if (this.input) this.input.endFrame();
                        return;
                    }
                }
            }

            // Check interaction with Seeder Prime / BitTorrent Swarm Camp (at X: 1380, Y: 220)
            if (this.p2pCamp && this.player && typeof this.p2pCamp.isNearSeederPrime === 'function' && this.p2pCamp.isNearSeederPrime(this.player.x, this.player.y)) {
                if (this.input && (this.input.isJustPressed('e') || (this.input.mouse && this.input.mouse.leftJustPressed && Math.abs(this.mouseWorldX - this.p2pCamp.seederPrime.x) < 60))) {
                    if (this.torrentMinigame) {
                        this.torrentMinigame.open();
                        if (this.input) this.input.endFrame();
                        return;
                    }
                }
            }

            // Check interaction with Central SNMP & ASN.1 Compiler Console (at X: 1950, Y: 360)
            if (this.sector4 && this.player && typeof this.sector4.isNearSNMPTerminal === 'function' && this.sector4.isNearSNMPTerminal(this.player.x, this.player.y)) {
                if (this.input && (this.input.isJustPressed('e') || (this.input.mouse && this.input.mouse.leftJustPressed && Math.abs(this.mouseWorldX - 1950) < 60))) {
                    if (this.snmpMinigame) {
                        this.snmpMinigame.open();
                        if (this.input) this.input.endFrame();
                        return;
                    }
                }
            }

            // Update Sector 4 Application Dynamics & Swarm Camp
            if (this.sector4) {
                this.sector4.update(dt, this.player, this.particles, this.combat);
            }
            if (this.p2pCamp) {
                this.p2pCamp.update(dt, this.player, this.particles);
            }
        }

        // 1. Update Player Entity & Physics Controller
        if (this.player) {
            this.player.update(dt, this.input, null, this.particles, this.renderer);
            if (this.renderer) {
                this.renderer.setTarget(this.player.x, this.player.y);
            }
        }

        // 1.5 Update Tactical Network Combat System (Enemies, Projectiles, Shields)
        if (this.combat) {
            this.combat.update(dt, this.player, this.input, this.particles, this.renderer);
        }

        // 2. Update Renderer (Camera tracking & Screen Shake decay)
        if (this.renderer) {
            this.renderer.update(dt);
        }

        // 3. Update Particle Engine (All 600 pooled particles)
        if (this.particles) {
            this.particles.update(dt);

            // Continuously stream binary data pulses ('0' and '1') along network conduits!
            this.streamTimer += dt;
            if (this.streamTimer >= 0.16) {
                this.streamTimer = 0;
                const busY = this.logicalHeight * 0.5;
                // Emit pulses along physical and data-link conduits
                this.particles.emitDataStream(200, busY - 140, 200, busY, '#00e5ff', 160);
                this.particles.emitDataStream(200, busY, 420, busY, '#00ffcc', 200);
                this.particles.emitDataStream(420, busY, 420, busY + 140, '#00ff88', 160);
                this.particles.emitDataStream(420, busY, 860, busY, '#0077ff', 220);
                this.particles.emitDataStream(860, busY, 860, busY - 140, '#ffd700', 160);
                this.particles.emitDataStream(860, busY, 1080, busY, '#ff007f', 200);
                this.particles.emitDataStream(1080, busY, 1080, busY + 140, '#c084fc', 160);
            }

            // Emit subtle motion waveform trail behind Unit 0xVOID
            if (this.player && this.input && !this.input.isMoving() && !this.player.isDashing) {
                this.particles.emitWaveformTrail(
                    this.player.x + Math.cos(this.pulseTime * 2.5) * 6,
                    this.player.y + Math.sin(this.pulseTime * 2.5) * 6,
                    '#ff007f'
                );
            }
        }

        // 4. End frame for input manager (clear single-frame triggers)
        if (this.input) {
            this.input.endFrame();
        }

        // Simulated telemetry fluctuations for realistic network ambiance
        const gs = window.GameState;
        if (gs && Math.random() < 0.05) {
            gs.state.telemetry.linkUtilization = +(35 + Math.sin(this.pulseTime) * 12 + Math.random() * 4).toFixed(1);
            this.syncHUD();
        }
    }

    render() {
        const ctx = this.ctx;
        if (!ctx) return;

        const w = this.logicalWidth;
        const h = this.logicalHeight;

        // 1. Clear Framebuffer
        ctx.fillStyle = '#03060f';
        ctx.fillRect(0, 0, w, h);

        // 2. Apply Camera Transform with Screen Shake
        if (this.renderer) {
            this.renderer.begin(ctx);
            // Render layer-themed infinite vector grid
            this.renderer.renderWorldGrid(ctx);
        } else {
            this.renderVectorGrid(ctx, w, h);
        }

        // 3. Render Active Sector World Map
        if (this.activeSectorId === 1) {
            if (this.sector1) {
                this.sector1.render(ctx);
            } else {
                this.renderTopologyConduits(ctx, w, h);
            }
            if (this.capacityGate) {
                this.capacityGate.renderWorld(ctx);
            }
        } else if (this.activeSectorId === 2) {
            if (this.sector2) {
                this.sector2.render(ctx);
            }
            if (this.collisionHazard) {
                this.collisionHazard.renderWorld(ctx);
            }
            if (this.bitStuffing) {
                this.bitStuffing.renderWorld(ctx);
            }
        } else if (this.activeSectorId === 3) {
            if (this.sector3) {
                this.sector3.render(ctx);
            }
            if (this.bossOSPF) {
                this.bossOSPF.renderWorld(ctx);
            }
        } else if (this.activeSectorId === 4) {
            if (this.sector4) {
                this.sector4.render(ctx);
            }
            if (this.p2pCamp) {
                this.p2pCamp.renderWorld(ctx);
            }
        } else {
            this.renderTopologyConduits(ctx, w, h);
        }

        // 3.5 Render Active Combat Layer (Enemies, Projectiles, Shields, Floating Text)
        if (this.combat) {
            this.combat.render(ctx);
        }

        // 4. Render Active Particle Streams, Sparks & Bursts
        if (this.particles) {
            this.particles.render(ctx);
        }

        // 5. Render Unit 0xVOID (Protagonist Packet Core)
        if (this.player) {
            this.player.render(ctx);
        } else {
            this.renderUnit0xVOID(ctx, w / 2, h / 2);
        }

        // 5.5 Render Allied NPCs in World (Agent ARP, Wanderer IP, Socket Daemon, Seeder Prime)
        if (this.dialogueSystem) {
            this.dialogueSystem.renderWorldNPCs(ctx, this.activeSectorId, this.player);
        }

        // 6. Restore Camera Viewport
        if (this.renderer) {
            this.renderer.end(ctx);
        }

        // 7.5 Render Sector 2 CSMA/CD HUD Telemetry & Bit Stuffing HUD
        if (this.activeSectorId === 2 && this.collisionHazard) {
            this.collisionHazard.renderHUD(ctx);
        }
        if (this.activeSectorId === 2 && this.bitStuffing) {
            this.bitStuffing.renderHUD(ctx, this.player);
        }

        // 7.6 Render Sector 3 Subnet Telemetry HUD & Boss OSPF Telemetry HUD
        if (this.activeSectorId === 3) {
            if (this.sector3) this.sector3.renderHUD(ctx);
            if (this.bossOSPF) this.bossOSPF.renderHUD(ctx);
        }

        // 7.7 Render Sector 4 Application Telemetry HUD
        if (this.activeSectorId === 4 && this.sector4) {
            this.sector4.renderHUD(ctx);
        }

        // 8. Render Modal Overlays (In 2D Screen Space)
        if (this.minigame && this.minigame.isOpen) {
            this.minigame.render(ctx);
        }
        if (this.modulationMinigame && this.modulationMinigame.isOpen) {
            this.modulationMinigame.render(ctx);
        }
        if (this.capacityGate && (this.capacityGate.isTerminalOpen || this.capacityGate.isBossActive)) {
            this.capacityGate.renderTerminal(ctx);
        }
        if (this.collisionHazard && this.collisionHazard.isTerminalOpen) {
            this.collisionHazard.renderTerminal(ctx);
        }
        if (this.crcMinigame && this.crcMinigame.isOpen) {
            this.crcMinigame.render(ctx);
        }
        if (this.switchMinigame && this.switchMinigame.isOpen) {
            this.switchMinigame.render(ctx);
        }
        if (this.fragMinigame && this.fragMinigame.isOpen) {
            this.fragMinigame.render(ctx);
        }
        if (this.dijkstraMinigame && this.dijkstraMinigame.isOpen) {
            this.dijkstraMinigame.render(ctx);
        }
        if (this.bossOSPF && this.bossOSPF.isTerminalOpen) {
            this.bossOSPF.renderTerminal(ctx);
        }
        if (this.webInfiltration && this.webInfiltration.isOpen) {
            this.webInfiltration.render(ctx);
        }
        if (this.torrentMinigame && this.torrentMinigame.isOpen) {
            this.torrentMinigame.render(ctx);
        }
        if (this.snmpMinigame && this.snmpMinigame.isOpen) {
            this.snmpMinigame.render(ctx);
        }
        if (this.asn1Debugger && this.asn1Debugger.isOpen) {
            this.asn1Debugger.render(ctx);
        }
        if (this.questManager && this.questManager.isOpen) {
            this.questManager.render(ctx);
        }
        // Render Step-by-Step Guidance Box & Holographic Inspect Cards (Hover & Proximity)
        const isModalOpen = (this.examSimulator && this.examSimulator.isOpen) ||
                            (this.rubricGrader && this.rubricGrader.isOpen) ||
                            (this.codexViewer && this.codexViewer.isOpen);
        if (this.worldInspector && !isModalOpen) {
            const activeWorld = this.activeSectorId === 1 ? this.sector1 : (this.activeSectorId === 2 ? this.sector2 : (this.activeSectorId === 3 ? this.sector3 : this.sector4));
            this.worldInspector.render(
                ctx,
                this.logicalWidth,
                this.logicalHeight,
                this.mouseWorldX,
                this.mouseWorldY,
                this.player ? this.player.x : 0,
                this.player ? this.player.y : 0,
                this.activeSectorId,
                activeWorld
            );
        }

        if (this.dialogueSystem && this.dialogueSystem.isOpen) {
            this.dialogueSystem.render(ctx);
        }
        if (this.codexViewer && this.codexViewer.isOpen) {
            this.codexViewer.render(ctx);
        }
        if (this.rubricGrader && this.rubricGrader.isOpen) {
            this.rubricGrader.render(ctx);
        }
        if (this.examSimulator && this.examSimulator.isOpen) {
            this.examSimulator.render(ctx, this.logicalWidth, this.logicalHeight);
        }
        if (this.saveManager) {
            this.saveManager.renderNotification(ctx, this.logicalWidth, this.logicalHeight);
        }
    }

    renderVectorGrid(ctx, w, h) {
        const gridSize = 60;
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 255, 204, 0.08)';
        ctx.lineWidth = 1;

        // Vertical lines
        for (let x = -gridSize + (this.gridOffset.x % gridSize); x <= w + gridSize; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = -gridSize + (this.gridOffset.y % gridSize); y <= h + gridSize; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }

        ctx.restore();
    }

    renderTopologyConduits(ctx, w, h) {
        ctx.save();

        // Copper & Fiber bus lines
        const busY = h * 0.5;
        ctx.strokeStyle = '#0077ff';
        ctx.lineWidth = 3.5;
        ctx.shadowColor = '#0077ff';
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.moveTo(80, busY);
        ctx.lineTo(w - 80, busY);
        ctx.stroke();

        // Branching conduits to network routers
        ctx.strokeStyle = '#00ffcc';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#00ffcc';
        ctx.shadowBlur = 8;

        const nodes = [
            { x: 200, y: busY - 140, label: 'L4_PHY_CONDUIT' },
            { x: 420, y: busY + 140, label: 'L3_FRAME_MATRIX' },
            { x: 860, y: busY - 140, label: 'L2_ROUTING_CORE' },
            { x: 1080, y: busY + 140, label: 'L1_APP_GATEWAY' }
        ];

        nodes.forEach(node => {
            // Draw branch
            ctx.beginPath();
            ctx.moveTo(node.x, busY);
            ctx.lineTo(node.x, node.y);
            ctx.stroke();

            // Draw node circle
            ctx.beginPath();
            ctx.arc(node.x, node.y, 16, 0, Math.PI * 2);
            ctx.fillStyle = '#061022';
            ctx.fill();
            ctx.stroke();

            // High-contrast badge container for node label
            const textY = node.y > busY ? node.y + 36 : node.y - 24;
            const badgeW = 150;
            const badgeH = 24;
            ctx.fillStyle = 'rgba(4, 10, 22, 0.95)';
            ctx.fillRect(node.x - badgeW / 2, textY - badgeH / 2, badgeW, badgeH);
            ctx.strokeStyle = 'rgba(0, 255, 204, 0.6)';
            ctx.lineWidth = 1.2;
            ctx.strokeRect(node.x - badgeW / 2, textY - badgeH / 2, badgeW, badgeH);

            // Node label text (Crisp, bold white)
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 12px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(node.label, node.x, textY + 4);
        });

        ctx.restore();
    }

    renderUnit0xVOID(ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);

        const pulse = 1.0 + Math.sin(this.pulseTime * 4) * 0.12;

        // Outer rotating header shield
        ctx.rotate(this.pulseTime * 0.8);
        ctx.strokeStyle = '#ff007f';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#ff007f';
        ctx.shadowBlur = 15;
        ctx.strokeRect(-22 * pulse, -22 * pulse, 44 * pulse, 44 * pulse);

        // Counter-rotating inner payload diamond
        ctx.rotate(-this.pulseTime * 1.6);
        ctx.strokeStyle = '#00ffcc';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#00ffcc';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(0, -18 * pulse);
        ctx.lineTo(18 * pulse, 0);
        ctx.lineTo(0, 18 * pulse);
        ctx.lineTo(-18 * pulse, 0);
        ctx.closePath();
        ctx.stroke();

        // Glowing Core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // High-contrast label above entity
        ctx.save();
        const badgeW = 210;
        const badgeH = 26;
        ctx.fillStyle = 'rgba(4, 10, 22, 0.92)';
        ctx.fillRect(x - badgeW / 2, y - 48 - badgeH / 2, badgeW, badgeH);
        ctx.strokeStyle = '#00ffcc';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x - badgeW / 2, y - 48 - badgeH / 2, badgeW, badgeH);

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 13px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#00ffcc';
        ctx.shadowBlur = 6;
        ctx.fillText('UNIT 0xVOID [CORE ONLINE]', x, y - 43);
        ctx.restore();
    }

    syncHUD() {
        const gs = window.GameState;
        if (!gs) return;

        const p = gs.state.player;
        const ep = gs.state.examProgress;
        const tel = gs.state.telemetry;

        if (this.dom.valHp) this.dom.valHp.innerText = `${p.currentIntegrity}/${p.maxIntegrity}`;
        if (this.dom.fillHp) this.dom.fillHp.style.width = `${(p.currentIntegrity / p.maxIntegrity) * 100}%`;

        if (this.dom.valBuffer) this.dom.valBuffer.innerText = `${p.currentBuffer}/${p.maxBuffer}`;
        if (this.dom.fillBuffer) this.dom.fillBuffer.style.width = `${(p.currentBuffer / p.maxBuffer) * 100}%`;

        if (this.dom.valTtl) this.dom.valTtl.innerText = `${p.ttl} HOPS`;
        if (this.dom.fillTtl) this.dom.fillTtl.style.width = `${(p.ttl / 64) * 100}%`;

        if (this.dom.valScore) this.dom.valScore.innerText = `${ep.marksEarned} / ${ep.totalMarks}`;
        const layerTag = (p.currentLayer === 3) ? 'MOD 3: DATA LINK' : (p.currentLayer === 2 ? 'MOD 2: NETWORK' : (p.currentLayer === 1 ? 'MOD 1: APP' : 'MOD 4: PHY'));
        if (this.dom.valLayer) this.dom.valLayer.innerText = layerTag;
        if (this.dom.valRate) this.dom.valRate.innerText = `${(tel.dataRateBps / 1000000).toFixed(0)} Mbps`;
        if (this.dom.valUtil) this.dom.valUtil.innerText = `${tel.linkUtilization}%`;
    }
}

// Global Singleton Instance
const gameLoopInstance = new GameLoopEngine();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.GameLoop = gameLoopInstance;
    window.GameLoop = gameLoopInstance; // Convenience alias
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GameLoopEngine, GameLoop: gameLoopInstance };
}
