// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// Verification Test Suite for Prompt 15: BitTorrent P2P Swarm & Rarest-First Minigame
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

// Set initial marks from Prompt 14 (52 Marks)
gsInstance.state.examProgress.marksEarned = 52;
gsInstance.state.examProgress.totalMarks = 60;
gsInstance.state.currentSector.id = 4;
gsInstance.state.completedSectors = [1, 2, 3];

// Mock CyberAudio
global.CyberAudio = {
    sfxPing: () => {},
    sfxDnsChirp: () => {},
    sfxHttpSuccess: () => {},
    sfxAccessGranted: () => {},
    sfxAccessDenied: () => {}
};
window.CyberAudio = global.CyberAudio;

// Load P2PSwarmCamp
const { P2PSwarmCamp } = require('../js/world/P2PSwarmCamp.js');
const camp = new P2PSwarmCamp();
global.P2PSwarmCamp = camp;
window.P2PSwarmCamp = camp;

// Load BitTorrentMinigame
const { BitTorrentMinigame } = require('../js/minigames/BitTorrentMinigame.js');
const minigame = new BitTorrentMinigame();

// Mock Player in GridEngine
global.GridEngine = {
    gameLoop: {
        player: { inventory: [] }
    }
};

console.log('--- TEST 1: P2P Swarm Camp & Seeder Prime Setup ---');
assert.strictEqual(camp.seederPrime.name, 'SEEDER PRIME');
assert.strictEqual(camp.rebelPeers.length, 6);
assert.strictEqual(camp.meshLinks.length, 8);
assert.strictEqual(camp.isNearSeederPrime(1380, 220), true);
assert.strictEqual(camp.isNearSeederPrime(500, 220), false);
assert.strictEqual(camp.isNearComparisonTerminal(1260, 220), true);
console.log('✓ P2P Swarm Camp, Seeder Prime, 6 rebel peers, and P2P mesh links verified.');

console.log('--- TEST 2: Challenge 1 - Rarest-First Piece Selection (2.5M) ---');
minigame.open();
assert.strictEqual(minigame.isOpen, true);
assert.strictEqual(minigame.challenge1Solved, false);

// Test clicking common pieces (Piece 0, 1, 2)
minigame.handlePieceClick(0);
assert.strictEqual(minigame.challenge1Solved, false, 'Piece 0 is common; must not be accepted as rarest');
minigame.handlePieceClick(2);
assert.strictEqual(minigame.challenge1Solved, false, 'Piece 2 is common; must not be accepted as rarest');

// Test clicking Piece 3 (held by only 1 peer: Peer Zeta!)
minigame.handlePieceClick(3);
assert.strictEqual(minigame.challenge1Solved, true, 'Piece 3 must be accepted as Rarest-First');
assert.strictEqual(minigame.pieces[3].downloaded, true);
console.log('✓ Challenge 1: Rarest-First Piece 3 selection verified (+2.5M).');

console.log('--- TEST 3: Challenge 2 - Tit-for-Tat & Optimistic Unchoking (2.5M) ---');
minigame.activeTab = 1; // Switch to Tit-for-Tat tab
assert.strictEqual(minigame.challenge2Solved, false);

// Unchoke 4 peers (must pick top 4: Epsilon 710, Beta 620, Delta 580, Alpha 450)
minigame.togglePeerUnchoke('epsilon');
minigame.togglePeerUnchoke('beta');
minigame.togglePeerUnchoke('delta');
minigame.togglePeerUnchoke('alpha');

const unchokedPeers = minigame.peers.filter(p => p.unchoked);
assert.strictEqual(unchokedPeers.length, 4, 'Exactly 4 peers unchoked');

// Attempting to unchoke a 5th regular peer without optimistic unchoking must be rejected
minigame.togglePeerUnchoke('gamma');
const still4 = minigame.peers.filter(p => p.unchoked).length;
assert.strictEqual(still4, 4, 'Cannot unchoke > 4 peers under regular Tit-for-Tat');

// Trigger Optimistic Unchoking
minigame.triggerOptimisticUnchoke();
assert.strictEqual(minigame.challenge2Solved, true, 'Challenge 2 solved via Optimistic Unchoking');
assert.strictEqual(minigame.optimisticPeer, 'Peer Zeta (Rare Seeder)');
console.log('✓ Challenge 2: Tit-for-Tat top 4 reciprocity & Optimistic Unchoking verified (+2.5M).');

console.log('--- TEST 4: Exploit Payload Assembly & Integrity Check ---');
minigame.assemblePayload();
assert.strictEqual(minigame.payloadAssembled, true);
assert.strictEqual(minigame.pieces.every(p => p.downloaded), true, 'All 8 pieces downloaded');
assert.strictEqual(minigame.isAllComplete(), true);
console.log('✓ All 8 chunks (2048 KB) downloaded and verified across swarm.');

console.log('--- TEST 5: Finalize Swarm Exchange & Marks Progression ---');
minigame.finalizeSwarmExchange();
assert.strictEqual(minigame.isSolved, true);
assert.strictEqual(minigame.isOpen, false);
assert.strictEqual(minigame.awardedMarks, 5.0);

// Verify GameState update
assert.strictEqual(gsInstance.state.examProgress.marksEarned, 57, 'Total marks should increase from 52 to 57');
const percentage = (gsInstance.state.examProgress.marksEarned / gsInstance.state.examProgress.totalMarks) * 100;
assert.strictEqual(percentage, 95.0, 'Total percentage should be 95.0% (S Grade Distinction)');

// Verify item added to inventory
assert.strictEqual(gsInstance.hasItem('TITAN_FIN_RST_PAYLOAD'), true, 'Master exploit item in GameState inventory');
assert.strictEqual(global.GridEngine.gameLoop.player.inventory.includes('TITAN_FIN_RST_PAYLOAD'), true, 'Master exploit item in Player inventory');
console.log(`✓ Master Exploit Acquired: TITAN_FIN_RST_PAYLOAD. Total Exam Score: ${gsInstance.state.examProgress.marksEarned}/60 (${percentage.toFixed(1)}% - Outstanding S Grade Distinction!).`);

console.log('--- TEST 6: Auto-Solve and Reset Functional Proofs ---');
minigame.reset();
assert.strictEqual(minigame.challenge1Solved, false);
assert.strictEqual(minigame.challenge2Solved, false);
assert.strictEqual(minigame.payloadAssembled, false);

minigame.autoSolve();
assert.strictEqual(minigame.challenge1Solved, true);
assert.strictEqual(minigame.challenge2Solved, true);
assert.strictEqual(minigame.payloadAssembled, true);
assert.strictEqual(minigame.isAllComplete(), true);
console.log('✓ Auto-solve and reset verified.');

console.log('\n======================================================');
console.log('ALL PROMPT 15 VERIFICATION TESTS PASSED SUCCESSFULLY!');
console.log('======================================================\n');
