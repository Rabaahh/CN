// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// Verification Test Suite for Prompt 14: Sector 4 & Web Infiltration Pipeline
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

// Set initial marks from Prompt 13 (48 Marks)
gsInstance.state.examProgress.marksEarned = 48;
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

// Load Sector 4 Application World Map
const { Sector4_Application } = require('../js/world/Sector4_Application.js');
const sector4 = new Sector4_Application();
global.Sector4_Application = sector4;
window.Sector4_Application = sector4;

// Load WebInfiltrationMinigame
const { WebInfiltrationMinigame } = require('../js/minigames/WebInfiltrationMinigame.js');
const minigame = new WebInfiltrationMinigame();

console.log('--- TEST 1: Sector 4 Protocol Zones & Conduits ---');
assert.strictEqual(sector4.sectorId, 4);
assert.strictEqual(sector4.name, 'The Application Gateway');
assert.strictEqual(sector4.conduits.length, 4);
assert.strictEqual(sector4.mailStations.length, 3);
assert.strictEqual(sector4.ftpStations.length, 2);
assert.strictEqual(sector4.isWebTerminalCleared, false);
assert.strictEqual(sector4.masterGateway.isUnlocked, false);
console.log('✓ Sector 4 world conduits, mail relay stations, and dual-port FTP conduits verified.');

console.log('--- TEST 2: Sector 4 Forcefield Barrier & Proximity Sensors ---');
const player = { x: 740, y: 360, vx: 50, vy: 0 };
sector4.update(0.016, player, null, null);
assert.strictEqual(player.x, 730, 'Player clamped by Web Bastion forcefield before clearing console');
assert.strictEqual(player.vx, 0, 'Momentum halted by forcefield');

// Test interaction proximity
assert.strictEqual(sector4.isNearWebTerminal(700, 360), true);
assert.strictEqual(sector4.isNearWebTerminal(200, 360), false);
assert.strictEqual(sector4.isNearMailTerminal(1200, 360), true);
assert.strictEqual(sector4.isNearFTPTerminal(1750, 360), true);
assert.strictEqual(sector4.isNearMasterGate(2200, 360), true);
console.log('✓ Forcefield collision barrier and proximity triggers verified.');

console.log('--- TEST 3: Web Infiltration - Stage 1 DNS Resolution Hierarchy (2.5M) ---');
minigame.open();
assert.strictEqual(minigame.isOpen, true);
assert.strictEqual(minigame.dnsStep, 0);
assert.strictEqual(minigame.stage1Complete, false);

// Hop 1: Browser -> Local DNS
minigame.advanceDnsStep();
assert.strictEqual(minigame.dnsStep, 1);
assert.strictEqual(minigame.dnsSteps[0].to, 'local');

// Hop 2: Local DNS -> Root DNS (.)
minigame.advanceDnsStep();
assert.strictEqual(minigame.dnsStep, 2);
assert.strictEqual(minigame.dnsSteps[1].to, 'root');

// Hop 3: Local DNS -> TLD DNS (.corp)
minigame.advanceDnsStep();
assert.strictEqual(minigame.dnsStep, 3);
assert.strictEqual(minigame.dnsSteps[2].to, 'tld');

// Hop 4: Local DNS -> Authoritative DNS (ns1.titan-core.corp)
minigame.advanceDnsStep();
assert.strictEqual(minigame.dnsStep, 4);
assert.strictEqual(minigame.dnsSteps[3].to, 'auth');

// Hop 5: Local DNS -> Browser (Returns Type A: 10.240.0.1)
minigame.advanceDnsStep();
assert.strictEqual(minigame.dnsStep, 5);
assert.strictEqual(minigame.stage1Complete, true, 'Stage 1 DNS resolution hierarchy complete');
console.log('✓ Stage 1: 5-hop DNS resolution hierarchy (Browser -> Local -> Root -> TLD -> Authoritative -> Browser) verified (+2.5M).');

console.log('--- TEST 4: Web Infiltration - Stage 2 HTTP Transaction Flow (1.5M) ---');
minigame.activeTab = 1; // Switch to HTTP tab
assert.strictEqual(minigame.httpStep, 0);
assert.strictEqual(minigame.stage2Complete, false);

// Must establish TCP handshake before HTTP GET
minigame.handleClick(minigame.uiBounds.httpGetBtn.x + 5, minigame.uiBounds.httpGetBtn.y + 5);
assert.strictEqual(minigame.httpStep, 0, 'Cannot send HTTP GET before TCP handshake');

// Step 1: TCP Handshake
minigame.handleClick(minigame.uiBounds.tcpHandshakeBtn.x + 5, minigame.uiBounds.tcpHandshakeBtn.y + 5);
assert.strictEqual(minigame.httpStep, 1, 'TCP 3-Way Handshake established');

// Step 2: HTTP GET /index.html
minigame.handleClick(minigame.uiBounds.httpGetBtn.x + 5, minigame.uiBounds.httpGetBtn.y + 5);
assert.strictEqual(minigame.httpStep, 2, 'HTTP GET dispatched');

// Step 3: HTTP 200 OK Response
minigame.handleClick(minigame.uiBounds.http200Btn.x + 5, minigame.uiBounds.http200Btn.y + 5);
assert.strictEqual(minigame.httpStep, 3);
assert.strictEqual(minigame.stage2Complete, true, 'Stage 2 HTTP flow complete');
assert.strictEqual(minigame.isAllComplete(), true, 'Both Stage 1 and Stage 2 complete');
console.log('✓ Stage 2: HTTP transaction flow (TCP Socket -> HTTP GET -> HTTP 200 OK) verified (+1.5M).');

console.log('--- TEST 5: Finalize Infiltration & Award 4 Marks ---');
minigame.finalizeInfiltration();
assert.strictEqual(minigame.isSolved, true);
assert.strictEqual(minigame.isOpen, false);
assert.strictEqual(minigame.awardedMarks, 4.0);

// Verify GameState update
assert.strictEqual(gsInstance.state.examProgress.marksEarned, 52, 'Marks should increase from 48 to 52');
const percentage = (gsInstance.state.examProgress.marksEarned / gsInstance.state.examProgress.totalMarks) * 100;
assert.strictEqual(percentage, 86.66666666666667);
console.log(`✓ Marks Awarded: +4.0 Marks. Total Exam Score: ${gsInstance.state.examProgress.marksEarned}/60 (${percentage.toFixed(1)}% - S Grade Distinction).`);

// Verify Sector 4 unlocks
assert.strictEqual(sector4.isWebTerminalCleared, true, 'Web terminal marked cleared in world');
assert.strictEqual(sector4.masterGateway.isUnlocked, true, 'Master boss gateway unlocked in world');
console.log('✓ Sector 4 Web Bastion cleared and Master Gateway unlocked.');

console.log('--- TEST 6: Auto-Solve and Reset Functional Proofs ---');
minigame.reset();
assert.strictEqual(minigame.dnsStep, 0);
assert.strictEqual(minigame.stage1Complete, false);
assert.strictEqual(minigame.httpStep, 0);
assert.strictEqual(minigame.stage2Complete, false);

minigame.autoSolve();
assert.strictEqual(minigame.dnsStep, 5);
assert.strictEqual(minigame.stage1Complete, true);
assert.strictEqual(minigame.httpStep, 3);
assert.strictEqual(minigame.stage2Complete, true);
assert.strictEqual(minigame.isAllComplete(), true);
console.log('✓ Auto-solve and reset verified.');

console.log('\n======================================================');
console.log('ALL PROMPT 14 VERIFICATION TESTS PASSED SUCCESSFULLY!');
console.log('======================================================\n');
