// ==========================================================================
// Unit Test for Prompt 11: Sector 3 Network Layer Map & MTU Fragmentation
// ==========================================================================
const assert = require('assert');

// Mock window and GameState
global.window = {
    GameState: {
        state: {
            player: { currentIntegrity: 100, maxIntegrity: 100, currentBuffer: 100, maxBuffer: 100 },
            score: {
                marksObtained: 30,
                maxMarks: 60,
                examPercentage: 50.0
            },
            completedSectors: [1, 2]
        },
        modifyBuffer(delta) {
            this.state.player.currentBuffer = Math.max(0, Math.min(100, this.state.player.currentBuffer + delta));
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

const { Sector3_Network } = require('../game_rpg/js/world/Sector3_Network.js');
const { FragmentationMinigame } = require('../game_rpg/js/minigames/FragmentationMinigame.js');

console.log('--- Testing Sector3_Network CIDR Subnet Stepping Mechanics ---');

const sector3 = new Sector3_Network();
window.Sector3_Network = sector3;

// Test 1: Subnet Stepping Grid (/26 Block: 192.168.10.64/26)
const netTile = sector3.subnetTiles.find(t => t.ip === '192.168.10.64');
const hostTile = sector3.subnetTiles.find(t => t.ip === '192.168.10.65');
const bcastTile = sector3.subnetTiles.find(t => t.ip === '192.168.10.127');

assert.strictEqual(netTile.type, 'NETWORK_ID', '192.168.10.64 is Network ID');
assert.strictEqual(hostTile.type, 'USABLE_HOST', '192.168.10.65 is Usable Host');
assert.strictEqual(bcastTile.type, 'BROADCAST_ID', '192.168.10.127 is Broadcast ID');

// Test 2: Stepping on Usable Host Tile
const player = { x: 680, y: 360, vx: 50, vy: 0 };
sector3.update(0.016, player, null, null);
assert.strictEqual(sector3.feedbackBanner.includes('VALID USABLE HOST'), true, 'Stepping on .65 registers safe host');
console.log('✓ Valid Usable Host navigation verified (.65 - .126)');

// Test 3: Stepping on Network Address Tile (.64) -> Grounds packet
player.x = 770;
player.y = 280;
player.vx = 80;
sector3.update(0.016, player, null, null);
assert.strictEqual(player.vx, 0, 'Velocity grounded to 0 on Network Address');
assert.strictEqual(sector3.feedbackBanner.includes('GROUNDED'), true);
console.log('✓ Network Address grounding verified (192.168.10.64 cannot be assigned to hosts)');

// Test 4: Stepping on Broadcast Address Tile (.127) -> Trips alarm & buffer penalty
player.x = 960;
player.y = 440;
sector3.update(0.016, player, null, null);
assert.strictEqual(sector3.activeSubnetAlarm, true, 'Subnet alarm tripped on broadcast address');
assert.strictEqual(window.GameState.state.player.currentBuffer, 88, 'Buffer reduced by -12');
console.log('✓ Broadcast storm alarm verified (192.168.10.127 trips alarm)');

// Test 5: Aperture Constriction Gate Collision
player.x = 1435;
player.y = 360;
sector3.update(0.016, player, null, null);
assert.strictEqual(player.x, 1420, 'Unsolved 1500B aperture blocks player at X=1420');
console.log('✓ 1500-Byte MTU forcefield collision barrier verified');

console.log('\n--- Testing FragmentationMinigame Math & Splitting Engine ---');

const frag = new FragmentationMinigame();

// Check problem specifications
assert.strictEqual(frag.originalTotalLength, 4000);
assert.strictEqual(frag.headerLength, 20);
assert.strictEqual(frag.originalDataLength, 3980);
assert.strictEqual(frag.linkMTU, 1500);
assert.strictEqual(frag.maxPayloadPerFragment, 1480, '1480 is max payload divisible by 8 (185*8)');

// Ground-truth Fragment 1
const f1 = frag.expectedFragments[0];
assert.strictEqual(f1.totalLength, 1500);
assert.strictEqual(f1.dataLength, 1480);
assert.strictEqual(f1.offset, 0);
assert.strictEqual(f1.mfFlag, 1);

// Ground-truth Fragment 2
const f2 = frag.expectedFragments[1];
assert.strictEqual(f2.totalLength, 1500);
assert.strictEqual(f2.dataLength, 1480);
assert.strictEqual(f2.offset, 185); // 1480 / 8
assert.strictEqual(f2.mfFlag, 1);

// Ground-truth Fragment 3
const f3 = frag.expectedFragments[2];
assert.strictEqual(f3.totalLength, 1040); // 1020 + 20
assert.strictEqual(f3.dataLength, 1020);
assert.strictEqual(f3.offset, 370); // 2960 / 8
assert.strictEqual(f3.mfFlag, 0, 'Final fragment has MF = 0');

// Payload conservation: 1480 + 1480 + 1020 = 3980
assert.strictEqual(f1.dataLength + f2.dataLength + f3.dataLength, 3980, 'Payload completely conserved');
console.log('✓ Mathematical Fragment Breakdown verified against KTU Model Paper Q12b');

// Test Step-by-Step Execution
assert.strictEqual(frag.calculatedSteps, 0);
frag.advanceStep();
assert.strictEqual(frag.calculatedSteps, 1);
frag.advanceStep();
assert.strictEqual(frag.calculatedSteps, 2);
frag.advanceStep();
assert.strictEqual(frag.calculatedSteps, 3);

// Execute Split & Pass Aperture
frag.executeSplitAndPass();
assert.strictEqual(frag.isSolved, true);
assert.strictEqual(frag.awardedMarks, 3.0, 'Awarded 3.0 Marks');
assert.strictEqual(window.GameState.state.score.marksObtained, 33, 'Total Exam Score is now 33/60 Marks (55%)');
assert.strictEqual(sector3.isSplittingAnim, true, 'Splitting animation triggered in Sector 3');

// Complete animation
sector3.update(1.5, player, null, null);
assert.strictEqual(sector3.isApertureCleared, true, 'Aperture forcefield dissolved permanently');
assert.strictEqual(player.x, 1570, 'Player reassembled and glided past aperture to X=1570');
console.log('✓ Datagram Splitting & Reassembly transition verified (+3 Marks, Total: 33/60 Marks)');

console.log('\nALL PROMPT 11 TESTS PASSED SUCCESSFULLY! (100% OK)');
