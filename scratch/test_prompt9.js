// Unit Test for Prompt 9: CRC Modulo-2 Polynomial Laser Trap
const assert = require('assert');

// Mock window and Audio/DOM
global.window = {
    GameState: {
        state: {
            score: {
                marksObtained: 15,
                maxMarks: 60,
                examPercentage: 25.0
            }
        },
        addMarks(amount) {
            this.state.score.marksObtained += amount;
            this.state.score.examPercentage = +((this.state.score.marksObtained / this.state.score.maxMarks) * 100).toFixed(1);
        }
    },
    CyberAudio: {
        sfxPing() {},
        sfxAccessGranted() {},
        sfxAccessDenied() {}
    }
};

const { CRCMinigame } = require('../game_rpg/js/minigames/CRCMinigame.js');
const { Sector2_DataLink } = require('../game_rpg/js/world/Sector2_DataLink.js');

console.log('--- Testing CRCMinigame & Modulo-2 Polynomial Mechanics ---');

const crc = new CRCMinigame();

// Test 1: Problem parameters
assert.strictEqual(crc.dataBits, '100100', 'Data bits must be 100100 (k=6)');
assert.strictEqual(crc.polyDegree, 3, 'Degree of g(x)=x^3+x^2+1 is r=3');
assert.strictEqual(crc.divisor, '1101', 'Binary divisor from x^3+x^2+1 is 1101');
assert.strictEqual(crc.augmentedData, '100100000', 'Augmented data has r=3 zeros appended');
assert.strictEqual(crc.expectedQuotient, '111101', 'Quotient must be 111101');
assert.strictEqual(crc.expectedRemainder, '001', 'FCS remainder must be 001');
assert.strictEqual(crc.transmittedCodeword, '100100001', 'Codeword is 100100001');

console.log('✓ Problem parameters verified against KTU Model Paper Q13a');

// Test 2: Step-by-step sender division
assert.strictEqual(crc.currentStep, 0);
for (let i = 0; i < crc.senderSteps.length; i++) {
    crc.advanceStep();
    assert.strictEqual(crc.currentStep, i + 1);
}
assert.strictEqual(crc.currentStep, 6);
assert.strictEqual(crc.awardedMarks, 4.0, 'Sender division complete awards 4 marks (1 divisor + 3 division)');
console.log('✓ Sender 6-step Modulo-2 XOR division verified: Remainder = 001');

// Test 3: Receiver verification
crc.verifyReceiver();
assert.strictEqual(crc.receiverVerified, true);
assert.strictEqual(crc.isSolved, true);
assert.strictEqual(crc.awardedMarks, 6.0, 'Full verification awards 6.0 marks');
assert.strictEqual(window.GameState.state.score.marksObtained, 21, 'Exam marks obtained is now 21 (15 + 6)');
console.log('✓ Receiver Modulo-2 verification verified: Remainder = 000, +6 Marks awarded! Total: 21/60 marks');

// Test 4: Sector 2 Laser Barrier deactivation
const sector2 = new Sector2_DataLink();
assert.strictEqual(sector2.laserTrapDeactivated, false, 'Laser trap initially active');

const player = { x: 1810, y: 360, vx: 50 };
sector2.update(0.016, player, null, null);
assert.strictEqual(player.x, 1800, 'Active laser trap blocks player at X=1800');

// Open terminal and solve via autoSolve on a new minigame instance
const crc2 = new CRCMinigame();
window.Sector2_DataLink = sector2;
crc2.open();
assert.strictEqual(crc2.isOpen, true);
crc2.autoSolve();
assert.strictEqual(crc2.isSolved, true);
assert.strictEqual(sector2.laserTrapDeactivated, true, 'Laser trap deactivated after solving CRC');

// Now player can walk through
player.x = 1850;
sector2.update(0.016, player, null, null);
assert.strictEqual(player.x, 1850, 'Player passes barrier unobstructed');
console.log('✓ Sector 2 Laser Barrier deactivation & player clearance verified');

console.log('\nALL PROMPT 9 TESTS PASSED SUCCESSFULLY! (100% OK)');
