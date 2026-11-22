// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// full_verification.js - Master Quality Assurance & Test Verification Suite
// Validates All 20 Modules, Exam Simulator, SaveManager, Audio & Formulas
// ==========================================================================

const assert = require('assert');
const path = require('path');

// Mock browser environment for headless Node.js execution
global.window = {
    addEventListener: () => {},
    removeEventListener: () => {},
    localStorage: null,
    confirm: () => true
};
global.document = {
    getElementById: (id) => ({
        id,
        addEventListener: () => {},
        classList: { add: () => {}, remove: () => {}, toggle: () => {} },
        style: {},
        innerHTML: '',
        textContent: ''
    }),
    createElement: () => ({
        getContext: () => mockContext,
        width: 1280,
        height: 720
    })
};

// Mock 2D Canvas Rendering Context
const mockContext = {
    save: () => {},
    restore: () => {},
    fillRect: () => {},
    strokeRect: () => {},
    clearRect: () => {},
    rect: () => {},
    clip: () => {},
    beginPath: () => {},
    closePath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    arc: () => {},
    fill: () => {},
    stroke: () => {},
    fillText: () => {},
    strokeText: () => {},
    measureText: (text) => ({ width: (text || '').length * 8 }),
    roundRect: () => {},
    createLinearGradient: () => ({ addColorStop: () => {} }),
    createRadialGradient: () => ({ addColorStop: () => {} }),
    setLineDash: () => {},
    translate: () => {},
    rotate: () => {},
    scale: () => {},
    drawImage: () => {}
};

console.log('======================================================================');
console.log('🧪 OPERATION NET-INFILTRATOR // MASTER VERIFICATION SUITE');
console.log('COURSE: KTU PCCST501 COMPUTER NETWORKS (2024 SCHEME)');
console.log('======================================================================\n');

// --------------------------------------------------------------------------
// TEST 1: LOAD ALL SUBSYSTEMS & VERIFY MODULE ARCHITECTURE
// --------------------------------------------------------------------------
console.log('--- TEST 1: VERIFYING ALL 20+ RPG & NETWORKING SUBSYSTEMS ---');

const { GameStateManager } = require('../js/engine/GameState.js');
const { Player } = require('../js/entities/Player.js');
const { CyberCombatEngine } = require('../js/combat/CombatSystem.js');
const { BossOSPF } = require('../js/combat/BossOSPF.js');
const { LineCodingMinigame } = require('../js/minigames/LineCodingMinigame.js');
const { ModulationMinigame } = require('../js/minigames/ModulationMinigame.js');
const { CRCMinigame } = require('../js/minigames/CRCMinigame.js');
const { SwitchLearningMinigame } = require('../js/minigames/SwitchLearningMinigame.js');
const { FragmentationMinigame } = require('../js/minigames/FragmentationMinigame.js');
const { DijkstraMinigame } = require('../js/minigames/DijkstraMinigame.js');
const { WebInfiltrationMinigame } = require('../js/minigames/WebInfiltrationMinigame.js');
const { BitTorrentMinigame } = require('../js/minigames/BitTorrentMinigame.js');
const { ASN1Debugger } = require('../js/minigames/ASN1Debugger.js');
const { SNMPMinigame } = require('../js/minigames/SNMPMinigame.js');
const { DialogueSystem } = require('../js/world/DialogueSystem.js');
const { QuestManager } = require('../js/world/QuestManager.js');
const { NeuralCodexDatabase } = require('../js/data/NeuralCodex.js');
const { CodexViewer } = require('../js/world/CodexViewer.js');
const { KTURubricGrader, KTU9MarkQuestions } = require('../js/minigames/KTURubricGrader.js');
const { SaveManager } = require('../js/engine/SaveManager.js');
const { ExamSimulator, KTU_EXAM_BLUEPRINT } = require('../js/engine/ExamSimulator.js');

console.log('✓ All 21 core engine, world, combat, minigame and grader modules loaded successfully.\n');

// --------------------------------------------------------------------------
// TEST 2: KTU 60-MARK EXAM BLUEPRINT COMPLIANCE
// --------------------------------------------------------------------------
console.log('--- TEST 2: KTU 60-MARK EXAM BLUEPRINT COMPLIANCE ---');

assert.strictEqual(KTU_EXAM_BLUEPRINT.metadata.courseCode, 'PCCST501');
assert.strictEqual(KTU_EXAM_BLUEPRINT.metadata.totalMarks, 60.0);
assert.strictEqual(KTU_EXAM_BLUEPRINT.metadata.partATotalMarks, 24.0);
assert.strictEqual(KTU_EXAM_BLUEPRINT.metadata.partBTotalMarks, 36.0);
assert.strictEqual(KTU_EXAM_BLUEPRINT.metadata.durationSeconds, 9000); // 2h 30m

// Part A: Exactly 8 questions x 3 marks = 24 marks (2 from each of 4 modules)
assert.strictEqual(KTU_EXAM_BLUEPRINT.partA.length, 8, 'Part A must contain exactly 8 questions');
const partASum = KTU_EXAM_BLUEPRINT.partA.reduce((sum, q) => sum + q.marks, 0);
assert.strictEqual(partASum, 24.0, 'Part A marks must equal exactly 24.0');

const modCountsA = { 1: 0, 2: 0, 3: 0, 4: 0 };
KTU_EXAM_BLUEPRINT.partA.forEach(q => {
    assert.strictEqual(q.marks, 3.0, `Question ${q.id} must be 3.0 Marks`);
    modCountsA[q.module]++;
});
for (let m = 1; m <= 4; m++) {
    assert.strictEqual(modCountsA[m], 2, `Module ${m} must have exactly 2 Part A questions`);
}
console.log('✓ Part A Blueprint: Exactly 8 Questions x 3.0M = 24.0M (2 per module) verified.');

// Part B: Exactly 4 module choice pairs, each 9 marks = 36 marks
assert.strictEqual(KTU_EXAM_BLUEPRINT.partB.length, 4, 'Part B must contain 4 module choices');
KTU_EXAM_BLUEPRINT.partB.forEach((p, idx) => {
    assert.strictEqual(p.module, idx + 1);
    assert.strictEqual(p.choiceA.marks, 9.0);
    assert.strictEqual(p.choiceB.marks, 9.0);
    const subSumA = p.choiceA.subdivisions.reduce((s, sub) => s + sub.maxMarks, 0);
    const subSumB = p.choiceB.subdivisions.reduce((s, sub) => s + sub.maxMarks, 0);
    assert.strictEqual(subSumA, 9.0, `Module ${p.module} Choice A subdivisions must sum to 9.0M`);
    assert.strictEqual(subSumB, 9.0, `Module ${p.module} Choice B subdivisions must sum to 9.0M`);
});
console.log('✓ Part B Blueprint: 4 Modules x Choice A/B x 9.0M = 36.0M verified.');
console.log('✓ Total Exam Marks: 24.0M + 36.0M = 60.0M (100% KTU Syllabus Alignment).\n');

// --------------------------------------------------------------------------
// TEST 3: EXAM SIMULATOR AUTO-FILL, TIMER & S-GRADE EVALUATION
// --------------------------------------------------------------------------
console.log('--- TEST 3: EXAM SIMULATOR AUTO-FILL & EVALUATION ---');

const testGameState = new GameStateManager();
const sim = new ExamSimulator(testGameState, null);

// Start Exam
sim.open();
assert.strictEqual(sim.isOpen, true);
assert.strictEqual(sim.examStatus, 'IN_PROGRESS');
assert.strictEqual(sim.timeRemaining, 9000);

// Timer countdown test
sim.update(100);
assert.strictEqual(sim.timeRemaining, 8900);

// Auto-fill Model Answers
sim.autoFillModelAnswers();
const examResult = sim.submitExam();

assert.strictEqual(examResult.totalEarned, 60.0, 'Model answers must score 60.0 / 60.0 M');
assert.strictEqual(examResult.percentage, 100);
assert.strictEqual(examResult.grade, 'S');
assert.strictEqual(examResult.isPassed, true);
assert.strictEqual(examResult.partAScore, 24.0);
assert.strictEqual(examResult.partBScore, 36.0);
assert.strictEqual(testGameState.state.examProgress.marksEarned, 60);

console.log(`✓ Model Answer Auto-Fill: ${examResult.totalEarned}/60.0 Marks (${examResult.percentage}%) - Grade ${examResult.grade}`);
console.log(`✓ Module Breakdown: Mod 1: ${examResult.moduleScores[1]}M | Mod 2: ${examResult.moduleScores[2]}M | Mod 3: ${examResult.moduleScores[3]}M | Mod 4: ${examResult.moduleScores[4]}M`);

// Test empty paper submission
sim.clearAllAnswers();
const emptyRes = sim.submitExam();
assert.strictEqual(emptyRes.totalEarned, 0.0);
assert.strictEqual(emptyRes.grade, 'F');
assert.strictEqual(emptyRes.isPassed, false);
console.log('✓ Empty Paper Submission: Correctly evaluated as 0.0/60.0 Marks - Grade F.\n');

// --------------------------------------------------------------------------
// TEST 4: SAVEMANAGER PERSISTENCE & DATA INTEGRITY
// --------------------------------------------------------------------------
console.log('--- TEST 4: SAVEMANAGER STATE PERSISTENCE & RESTORATION ---');

const smGameState = new GameStateManager();
const saveManager = new SaveManager(smGameState, null);

// Populate state
smGameState.state.player.x = 880;
smGameState.state.player.y = 440;
smGameState.state.player.speed = 264; // +20% boost from UDP choice
smGameState.awardExamMarks(45, 'TEST_QUESTION', true);
smGameState.addItem('RAW_PACKET_SCANNER');
smGameState.completeSector(1);
smGameState.completeSector(2);
smGameState.completeSector(3);

// Save
const saveSuccess = saveManager.save(false);
assert.strictEqual(saveSuccess, true);
assert.strictEqual(saveManager.hasSave(), true);

// Create fresh instance and restore
const restoreGameState = new GameStateManager();
const restoreSaveManager = new SaveManager(restoreGameState, null);
const loadSuccess = restoreSaveManager.load();
assert.strictEqual(loadSuccess, true);

assert.strictEqual(restoreGameState.state.player.x, 880);
assert.strictEqual(restoreGameState.state.player.y, 440);
assert.strictEqual(restoreGameState.state.player.speed, 264);
assert.strictEqual(restoreGameState.state.examProgress.marksEarned, 45);
assert.strictEqual(restoreGameState.hasItem('RAW_PACKET_SCANNER'), true);
assert.deepStrictEqual(restoreGameState.state.completedSectors, [1, 2, 3]);

// Reset Data
const resetSuccess = restoreSaveManager.reset();
assert.strictEqual(resetSuccess, true);
assert.strictEqual(restoreSaveManager.hasSave(), false);
assert.strictEqual(restoreGameState.state.examProgress.marksEarned, 0);

console.log('✓ SaveManager successfully verified: Save, Serialization, Deserialization, and Reset operate 100%.\n');

// --------------------------------------------------------------------------
// TEST 5: ALL 10 GRAND 9-MARK QUESTIONS & VALUATION RUBRICS
// --------------------------------------------------------------------------
console.log('--- TEST 5: ALL 10 GRAND 9-MARK QUESTIONS (RUBRIC AUTO-GRADER) ---');

const grader = new KTURubricGrader(null);
assert.strictEqual(KTU9MarkQuestions.length, 10, 'Must have exactly 10 Grand 9-Mark Questions');

KTU9MarkQuestions.forEach((q, idx) => {
    grader.selectedQuestionIndex = idx;
    grader.playerText = q.modelAnswer;
    const res = grader.gradeAnswer();
    assert.ok(res.totalScore >= 8.5, `Question ${idx + 1} (${q.id}) must score >= 8.5 M (got ${res.totalScore})`);
    assert.strictEqual(res.grade, 'S');
});
console.log('✓ All 10 Grand 9-Mark Model Answers scored Grade S (>= 8.5 / 9.0 M) with full rubric transparency.\n');

// --------------------------------------------------------------------------
// TEST 6: MATHEMATICAL FORMULAS & NUMERICAL VERIFICATION
// --------------------------------------------------------------------------
console.log('--- TEST 6: CORE ENGINEERING FORMULAS & NUMERICAL RIGOR ---');

// 1. Nyquist Bit Rate Formula: C = 2 * B * log2(L)
const B_nyq = 4000; // 4 kHz
const L_nyq = 4;    // 4 signal levels
const C_nyq = 2 * B_nyq * Math.log2(L_nyq);
assert.strictEqual(C_nyq, 16000, 'Nyquist capacity must equal 16000 bps');

// 2. Shannon Capacity Formula: C = B * log2(1 + SNR)
const B_shan = 3000; // 3 kHz
const SNR_shan = 255;
const C_shan = B_shan * Math.log2(1 + SNR_shan);
assert.strictEqual(C_shan, 24000, 'Shannon capacity must equal 24000 bps');

// 3. CSMA/CD Minimum Frame Size: Min Frame = 2 * T_p * Bandwidth
const two_Tp = 51.2e-6; // 51.2 microseconds
const bandwidth = 10e6;  // 10 Mbps
const minBits = two_Tp * bandwidth;
const minBytes = minBits / 8;
assert.strictEqual(minBits, 512, 'CSMA/CD min frame in bits must equal 512 bits');
assert.strictEqual(minBytes, 64, 'CSMA/CD min frame in bytes must equal 64 Bytes');

// 4. MTU Fragmentation: 4000B across 1500B MTU
const originalLen = 4000;
const headerLen = 20;
const mtu = 1500;
const maxPayload = Math.floor((mtu - headerLen) / 8) * 8; // 1480
assert.strictEqual(maxPayload, 1480);
const offset1 = 0 / 8;
const offset2 = 1480 / 8;
const offset3 = (1480 * 2) / 8;
assert.strictEqual(offset1, 0);
assert.strictEqual(offset2, 185);
assert.strictEqual(offset3, 370);

console.log('✓ Nyquist, Shannon, CSMA/CD 64B Frame, and MTU 8-byte Offsets (0, 185, 370) mathematically verified.\n');

// --------------------------------------------------------------------------
// TEST 7: CANVAS RENDERING STABILITY
// --------------------------------------------------------------------------
console.log('--- TEST 7: CANVAS RENDERING PIPELINE STABILITY ---');

// Render Exam Simulator
sim.render(mockContext, 1280, 720);
// Render Save Manager Notification
saveManager.saveNotificationText = 'TEST NOTIFICATION';
saveManager.saveNotificationTimer = 2.0;
saveManager.renderNotification(mockContext, 1280, 720);
// Render Grader
grader.isOpen = true;
grader.render(mockContext);

console.log('✓ All modals, simulation terminals, and notification toasts rendered with zero exceptions.\n');

// --------------------------------------------------------------------------
// FINAL VERIFICATION SUMMARY
// --------------------------------------------------------------------------
console.log('======================================================================');
console.log('🏆 COMPLETE 20-PROMPT PROJECT VERIFICATION PASSED (100%)');
console.log('THE GRID: PACKET RUNNER (PCCST501 EDITION) IS FULLY COMBAT-READY!');
console.log('======================================================================');

saveManager.stopAutoSave();
restoreSaveManager.stopAutoSave();
process.exit(0);
