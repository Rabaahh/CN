// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// Verification Test Suite for Prompt 13: CORE-OSPF-PRIME Boss & TCP Terminal
// ==========================================================================

const assert = require('assert');

// Mock browser environment
global.window = global;
global.performance = { now: () => Date.now() };

// Mock GameState
const { GameStateManager } = require('../js/engine/GameState.js');
const gsInstance = new GameStateManager();
global.GameState = gsInstance;
window.GameState = gsInstance;

// Set initial marks from Prompt 12 (39 Marks)
gsInstance.state.examProgress.marksEarned = 39;
gsInstance.state.examProgress.totalMarks = 60;
gsInstance.state.currentSector.id = 3;
gsInstance.state.completedSectors = [1, 2];

// Mock CyberAudio
global.CyberAudio = {
    playBossTheme: () => {},
    sfxBossRoar: () => {},
    sfxHit: () => {},
    sfxPing: () => {},
    sfxAccessGranted: () => {},
    sfxAccessDenied: () => {},
    playExplorationTheme: () => {}
};
window.CyberAudio = global.CyberAudio;

// Load Sector 3 World Map
const { Sector3_Network } = require('../js/world/Sector3_Network.js');
const sector3 = new Sector3_Network();
global.Sector3_Network = sector3;
window.Sector3_Network = sector3;

// Load BossOSPF
const { BossOSPF } = require('../js/combat/BossOSPF.js');
const boss = new BossOSPF();

console.log('--- TEST 1: Boss Attributes & Kinematic Serpent Setup ---');
assert.strictEqual(boss.name, 'ROUTING LEVIATHAN: CORE-OSPF-PRIME');
assert.strictEqual(boss.maxHealth, 400);
assert.strictEqual(boss.health, 400);
assert.strictEqual(boss.phase, 1);
assert.strictEqual(boss.state, 'IDLE');
assert.strictEqual(boss.segments.length, 4);
assert.strictEqual(boss.segments[0].label, 'TCP_HDR');
assert.strictEqual(boss.segments[1].label, 'SEQ_REG');
assert.strictEqual(boss.segments[2].label, 'ACK_REG');
assert.strictEqual(boss.segments[3].label, 'RWND_CACHE');
console.log('✓ Boss attributes and 4-node TCP register dragon segments verified.');

console.log('--- TEST 2: Combat Engagement & Attacks ---');
// Mock player approaching boss
const player = { x: 1900, y: 360, vx: 0, vy: 0, isShielding: false };
const renderer = { shake: (mag, dur) => {} };
const particles = { emitPacketDischarge: () => {}, emitBufferOverflowSparks: () => {} };
const combat = { playerProjectiles: [] };

boss.update(0.016, player, null, particles, renderer, combat);
assert.strictEqual(boss.state, 'ENGAGED', 'Boss should engage when player is within 380 units');
console.log('✓ Proximity engagement triggered successfully.');

// Test Boss taking damage from player projectiles
combat.playerProjectiles.push({ x: boss.x, y: boss.y, damage: 150 });
boss.update(0.016, player, null, particles, renderer, combat);
assert.strictEqual(boss.health, 250);
assert.strictEqual(combat.playerProjectiles.length, 0, 'Projectile absorbed');
console.log('✓ Combat hit registration and health reduction verified.');

// Damage boss below 80 HP to trigger Phase 2 Transition
combat.playerProjectiles.push({ x: boss.x, y: boss.y, damage: 180 });
boss.update(0.016, player, null, particles, renderer, combat);
assert.strictEqual(boss.health, 70);
assert.strictEqual(boss.phase, 2, 'Boss should enter Phase 2');
assert.strictEqual(boss.state, 'PHASE2_LOCK', 'Boss state should be PHASE2_LOCK');
assert.strictEqual(boss.isTerminalOpen, true, 'Phase 2 terminal should automatically open');
console.log('✓ Phase 2 Sequence & Cumulative ACK Terminal Transition verified.');

console.log('--- TEST 3: KTU 9-Mark Sequence & Cumulative ACK Puzzle (Model Paper Q11a / Sets 1-5 Q11b) ---');
// Verify initial challenge state
assert.strictEqual(boss.challenge1Solved, false);
assert.strictEqual(boss.challenge2Answer, null);
assert.strictEqual(boss.challenge3Answer, null);
assert.strictEqual(boss.challenge4Answer, null);
assert.strictEqual(boss.isAllChallengesComplete(), false);

// Challenge 1: Solve byte ranges
// Seg 1 (1000..1199), Seg 2 (1200..1399), Seg 3 (1400..1549)
boss.handleTerminalClick(boss.uiBounds.computeRangeBtn.x + 5, boss.uiBounds.computeRangeBtn.y + 5);
assert.strictEqual(boss.challenge1Solved, true, 'Challenge 1 byte ranges solved');
console.log('✓ Challenge 1: Byte ranges (1000..1199, 1200..1399, 1400..1549) verified.');

// Challenge 2: Test wrong and right in-order ACK (1550)
// Test wrong answer 1400
boss.handleTerminalClick(boss.uiBounds.ackChoices[1].x + 5, boss.uiBounds.ackChoices[1].y + 5);
assert.strictEqual(boss.challenge2Answer, null, 'Incorrect ACK should not be accepted');
// Test correct answer 1550
boss.handleTerminalClick(boss.uiBounds.ackChoices[3].x + 5, boss.uiBounds.ackChoices[3].y + 5);
assert.strictEqual(boss.challenge2Answer, 1550, 'Correct in-order ACK = 1550 accepted');
console.log('✓ Challenge 2: In-order next expected ACK = 1550 verified.');

// Challenge 3: Test lost Segment 2 ACK (Cumulative ACK Principle)
// Test wrong answer 1400
boss.handleTerminalClick(boss.uiBounds.gapChoices[2].x + 5, boss.uiBounds.gapChoices[2].y + 5);
assert.strictEqual(boss.challenge3Answer, null, 'Cannot ACK past a gap!');
// Test correct answer 1200
boss.handleTerminalClick(boss.uiBounds.gapChoices[1].x + 5, boss.uiBounds.gapChoices[1].y + 5);
assert.strictEqual(boss.challenge3Answer, 1200, 'Cumulative ACK = 1200 accepted');
console.log('✓ Challenge 3: Lost Segment 2 cumulative ACK = 1200 verified.');

// Challenge 4: SYN sequence number explanation (Option A)
// Test wrong option B
boss.handleTerminalClick(boss.uiBounds.synOptionB.x + 5, boss.uiBounds.synOptionB.y + 5);
assert.strictEqual(boss.challenge4Answer, null, 'Option B should be rejected');
// Test correct option A
boss.handleTerminalClick(boss.uiBounds.synOptionA.x + 5, boss.uiBounds.synOptionA.y + 5);
assert.strictEqual(boss.challenge4Answer, 'A', 'Option A accepted');
console.log('✓ Challenge 4: SYN sequence number consumption explanation (Option A) verified.');

assert.strictEqual(boss.isAllChallengesComplete(), true, 'All 4 challenges complete');

console.log('--- TEST 4: Boss Defeat, Exam Marks Award & Sector 4 Unlock ---');
boss.finalizeBossDefeat();
assert.strictEqual(boss.phase, 3, 'Boss Phase should be 3 (Defeated)');
assert.strictEqual(boss.state, 'DEFEATED');
assert.strictEqual(boss.health, 0);
assert.strictEqual(boss.isTerminalOpen, false);
assert.strictEqual(boss.isTerminalSolved, true);
assert.strictEqual(boss.awardedMarks, 9.0);

// Verify GameState updates
assert.strictEqual(gsInstance.state.examProgress.marksEarned, 48, 'Player should have 48 Marks (39 + 9)');
const percentage = (gsInstance.state.examProgress.marksEarned / gsInstance.state.examProgress.totalMarks) * 100;
assert.strictEqual(percentage, 80.0, 'Player should achieve 80.0% (S Grade Distinction)');
assert.strictEqual(gsInstance.state.completedSectors.includes(3), true, 'Sector 3 marked completed');

// Verify Sector 4 Gateway unlock
assert.strictEqual(sector3.sector4Gateway.isUnlocked, true, 'Sector 4 Gateway unlocked');
console.log(`✓ Boss Defeated! Awarded +9 Marks. Total Exam Score: ${gsInstance.state.examProgress.marksEarned}/60 (${percentage.toFixed(1)}% - S Grade). Sector 4 Gateway Unlocked!`);

console.log('\n======================================================');
console.log('ALL PROMPT 13 VERIFICATION TESTS PASSED SUCCESSFULLY!');
console.log('======================================================\n');
