// ==========================================================================
// Unit Test for Prompt 10: Bit Stuffing Corridor & Switch Learning Minigame
// ==========================================================================
const assert = require('assert');

// Mock window and GameState
global.window = {
    GameState: {
        state: {
            player: { currentIntegrity: 100, maxIntegrity: 100 },
            score: {
                marksObtained: 21,
                maxMarks: 60,
                examPercentage: 35.0
            },
            completedSectors: []
        },
        modifyIntegrity(delta) {
            this.state.player.currentIntegrity = Math.max(0, Math.min(100, this.state.player.currentIntegrity + delta));
        },
        addMarks(amount) {
            this.state.score.marksObtained += amount;
            this.state.score.examPercentage = +((this.state.score.marksObtained / this.state.score.maxMarks) * 100).toFixed(1);
        },
        completeSector(secId) {
            if (!this.state.completedSectors.includes(secId)) {
                this.state.completedSectors.push(secId);
            }
        }
    },
    CyberAudio: {
        sfxPing() {},
        sfxAccessGranted() {},
        sfxAccessDenied() {},
        sfxBossRoar() {}
    }
};

const { BitStuffingCorridor } = require('../game_rpg/js/world/BitStuffingCorridor.js');
const { SwitchLearningMinigame } = require('../game_rpg/js/minigames/SwitchLearningMinigame.js');
const { Sector2_DataLink } = require('../game_rpg/js/world/Sector2_DataLink.js');

console.log('--- Testing BitStuffingCorridor & Stealth Framing Mechanics ---');

const corridor = new BitStuffingCorridor();

// Test 1: Bounds check
assert.strictEqual(corridor.isInside(1950, 360), true, 'Point (1950, 360) is inside Delimiter Vault');
assert.strictEqual(corridor.isInside(1200, 360), false, 'Point (1200, 360) is outside Delimiter Vault');

// Test 2: Consecutive 1s detection and bit stuffing
corridor.consecutiveOnes = 5;
corridor.isInjectionWindow = true;
corridor.injectionTimer = 1.5;

const player = { x: 1950, y: 360, vx: 0 };
corridor.executeBitStuff(player, null);

assert.strictEqual(corridor.stuffedCount, 1, 'Stuffed count incremented to 1');
assert.strictEqual(corridor.consecutiveOnes, 0, 'Consecutive ones reset after stuffing 0');
assert.strictEqual(corridor.isInjectionWindow, false, 'Injection window closed after stuffing');
assert.strictEqual(corridor.bitHistory[corridor.bitHistory.length - 1], '(0)', 'Last bit in history is stuffed (0)');
console.log('✓ Bit Stuffing execution verified: 0-bit stuffed after five 1s (0111110)');

// Test 3: Tripwire alarm trigger on missed injection
corridor.consecutiveOnes = 5;
corridor.isInjectionWindow = true;
corridor.injectionTimer = 0;
corridor.triggerTripwireAlarm(player, null, null);

assert.strictEqual(corridor.isAlarmTriggered, true, 'Tripwire alarm triggered on 01111110 delimiter detection');
assert.strictEqual(window.GameState.state.player.currentIntegrity, 88, 'Integrity damaged by -12');
console.log('✓ Tripwire alarm verified: Unstuffed flag 01111110 triggers alarm & integrity damage');

// Test 4: Exit Gate Auto-Unstuffing
corridor.stuffedCount = 3;
corridor.clearCorridor(player, null);
assert.strictEqual(corridor.isCleared, true, 'Corridor cleared and transparent payload restored');
console.log('✓ Exit gate auto-unstuffing verified: Transparent transmission certified');

console.log('\n--- Testing SwitchLearningMinigame & MAC Forwarding Engine ---');

const sw = new SwitchLearningMinigame();
assert.strictEqual(sw.macTable.length, 0, 'Switch MAC table starts empty');

// Stage 1: Frame 1 arrives on Port 1 from Host A to Host B
sw.handleAction('LEARN_A');
assert.strictEqual(sw.macTable.length, 1, 'Switch learned Host A');
assert.strictEqual(sw.macTable[0].port, 1);
assert.strictEqual(sw.macTable[0].mac, 'AA:AA:AA:AA:AA:AA');

// Unknown destination Host B -> Flood to ports 2, 3, 4 (Port 1 filtered)
sw.handleAction('FLOOD_1');
assert.strictEqual(sw.scenarioStep, 1, 'Moved to Step 1');
assert.strictEqual(sw.portStates[1], 'FILTERED', 'Incoming Port 1 is filtered from flood loop');
assert.strictEqual(sw.portStates[2], 'FLOODING');
assert.strictEqual(sw.portStates[3], 'FLOODING');
assert.strictEqual(sw.portStates[4], 'FLOODING');
assert.strictEqual(sw.awardedMarks, 3.0, 'Awarded 3 marks for learning & flooding');
console.log('✓ Switch Step 1 verified: Source learning + unknown destination flooding (Ports 2,3,4)');

// Stage 2: Host B replies on Port 3 to Host A
sw.handleAction('LEARN_B');
assert.strictEqual(sw.macTable.length, 2, 'Switch learned Host B');
assert.strictEqual(sw.macTable[1].port, 3);
assert.strictEqual(sw.macTable[1].mac, 'BB:BB:BB:BB:BB:BB');

// Known destination Host A (Port 1) -> Selective unicast forward
sw.handleAction('FORWARD_TO_1');
assert.strictEqual(sw.scenarioStep, 2, 'Moved to Step 2');
assert.strictEqual(sw.portStates[1], 'FORWARDING', 'Forwarding selectively to Port 1');
assert.strictEqual(sw.portStates[2], 'FILTERED', 'Port 2 filtered (zero flood waste)');
assert.strictEqual(sw.portStates[4], 'FILTERED', 'Port 4 filtered (zero flood waste)');
assert.strictEqual(sw.awardedMarks, 6.0, 'Awarded 6 marks total');
console.log('✓ Switch Step 2 verified: Reply learning + selective unicast forwarding to Port 1');

// Stage 3: Host C sends to Host B
sw.handleAction('LEARN_C');
sw.handleAction('FORWARD_TO_3');
assert.strictEqual(sw.scenarioStep, 3, 'All 3 stages complete');
assert.strictEqual(sw.macTable.length, 3);
console.log('✓ Switch Step 3 verified: Full table populated with Host A, B, and C');

// Boss CENTINEL-802 Defeat & Sector 2 Completion
const sector2 = new Sector2_DataLink();
window.Sector2_DataLink = sector2;
assert.strictEqual(sector2.sector3Gateway.isUnlocked, false, 'Sector 3 gateway initially locked');

sw.completeSectorAndDefeatBoss();
assert.strictEqual(sw.isSolved, true);
assert.strictEqual(sw.awardedMarks, 9.0, 'Awarded full 9.0 marks (KTU Question 14b / Set 5 Q13b)');
assert.strictEqual(window.GameState.state.score.marksObtained, 30, 'Total exam score is now 30/60 Marks (50%!)');
assert.strictEqual(window.GameState.state.completedSectors.includes(2), true, 'Sector 2 marked complete in GameState');
assert.strictEqual(sector2.sector3Gateway.isUnlocked, true, 'Gateway to Sector 3 unlocked after boss defeat!');
console.log('✓ CENTINEL-802 Defeat & Sector 3 Conduit Unlock verified (+9 Marks, Total: 30/60)');

console.log('\nALL PROMPT 10 TESTS PASSED SUCCESSFULLY! (100% OK)');
