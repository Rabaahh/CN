// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// test_prompt17.js - Automated Test Suite for Prompt 17
// NPC Companions, Quest Logs & Consequential Dilemmas
// ==========================================================================

const assert = require('assert');

// Mock browser globals
global.window = global;
global.window.addEventListener = () => {};
global.window.removeEventListener = () => {};
global.document = {
    getElementById: () => null,
    addEventListener: () => {},
    removeEventListener: () => {}
};

// Mock AudioContext for CyberAudio
global.AudioContext = class MockAudioContext {
    constructor() {
        this.currentTime = 0;
        this.state = 'running';
        this.destination = {};
    }
    createOscillator() {
        return {
            type: 'sine',
            frequency: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
            connect: () => {},
            start: () => {},
            stop: () => {}
        };
    }
    createGain() {
        return {
            gain: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {}, setTargetAtTime: () => {} },
            connect: () => {}
        };
    }
    createBuffer() {
        return { getChannelData: () => new Float32Array(100) };
    }
    createBufferSource() {
        return { buffer: null, loop: false, connect: () => {}, start: () => {}, stop: () => {} };
    }
    createBiquadFilter() {
        return {
            type: 'lowpass',
            frequency: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
            Q: { setValueAtTime: () => {} },
            connect: () => {}
        };
    }
    resume() { return Promise.resolve(); }
};
global.webkitAudioContext = global.AudioContext;

// Mock 2D Canvas Context
function createMockCtx() {
    return {
        save: () => {},
        restore: () => {},
        beginPath: () => {},
        closePath: () => {},
        moveTo: () => {},
        lineTo: () => {},
        arc: () => {},
        quadraticCurveTo: () => {},
        fillRect: () => {},
        strokeRect: () => {},
        stroke: () => {},
        fill: () => {},
        fillText: () => {},
        measureText: (txt) => ({ width: (txt || '').length * 8 }),
        setLineDash: () => {},
        createLinearGradient: () => ({ addColorStop: () => {} }),
        fillStyle: '',
        strokeStyle: '',
        lineWidth: 1,
        globalAlpha: 1,
        shadowColor: '',
        shadowBlur: 0,
        font: '',
        textAlign: ''
    };
}

// Mock Input Manager
function createMockInput() {
    const pressed = new Set();
    return {
        isJustPressed: (k) => pressed.has(k.toLowerCase()),
        press: (k) => pressed.add(k.toLowerCase()),
        clear: () => pressed.clear(),
        endFrame: () => pressed.clear(),
        mouse: { x: 0, y: 0, worldX: 0, worldY: 0, leftJustPressed: false }
    };
}

console.log('--- 1. LOADING MODULES ---');
const { GameState } = require('../js/engine/GameState.js');
window.GameState = GameState;

const { CyberAudio } = require('../js/audio/CyberAudio.js');
window.CyberAudio = CyberAudio;
const audio = CyberAudio;

const { QuestManager, QuestStatus } = require('../js/world/QuestManager.js');
const questManager = new QuestManager();
window.QuestManager = questManager;

const { DialogueSystem } = require('../js/world/DialogueSystem.js');
const dialogueSystem = new DialogueSystem();
window.DialogueSystem = dialogueSystem;

console.log('✓ All modules loaded successfully.');

console.log('\n--- 2. TESTING CYBERAUDIO SPEECH BLIP SFX ---');
assert.strictEqual(typeof audio.sfxSpeechBlip, 'function', 'sfxSpeechBlip must be a function on CyberAudio');
audio.sfxSpeechBlip(600);
audio.sfxSpeechBlip(720);
console.log('✓ sfxSpeechBlip executed without error.');

console.log('\n--- 3. TESTING QUEST MANAGER ARCHITECTURE ---');
assert.ok(questManager.quests.length >= 7, 'QuestManager must contain at least 7 quests (4 Main + 3+ Technical)');
const mainQuests = questManager.quests.filter(q => q.category === 'MAIN');
const techQuests = questManager.quests.filter(q => q.category === 'TECHNICAL');
assert.strictEqual(mainQuests.length, 4, 'Must have 4 main infiltration quests for Sectors 1-4');
assert.ok(techQuests.length >= 3, 'Must have technical ally quests');

// Check quest retrieval & tab filtering
questManager.activeTab = 'MAIN';
assert.strictEqual(questManager.getFilteredQuests().length, 4);
questManager.activeTab = 'TECHNICAL';
assert.ok(questManager.getFilteredQuests().length >= 3);
questManager.activeTab = 'ALL';
assert.strictEqual(questManager.getFilteredQuests().length, questManager.quests.length);

// Toggle Quest Log
assert.strictEqual(questManager.isOpen, false);
questManager.toggle();
assert.strictEqual(questManager.isOpen, true);
questManager.toggle();
assert.strictEqual(questManager.isOpen, false);

// Test Decision Journal
questManager.recordDecision(
    'DILEMMA_TRANSPORT',
    'UDP Fast Datagram Stream',
    'Zero latency burst across noisy channel.',
    '+20% Player Speed (SCOUT_BURST_ENGINE)'
);
assert.strictEqual(questManager.hasDecision('DILEMMA_TRANSPORT'), true);
assert.strictEqual(questManager.decisions.length, 1);
assert.strictEqual(questManager.decisions[0].dilemmaId, 'DILEMMA_TRANSPORT');

// Mock Render of Quests & Decisions Tab
const mockCtx = createMockCtx();
questManager.open();
questManager.activeTab = 'ALL';
questManager.render(mockCtx);
questManager.activeTab = 'JOURNAL';
questManager.render(mockCtx);
questManager.close();
console.log('✓ QuestManager state transitions, filtering, and rendering verified.');

console.log('\n--- 4. TESTING DIALOGUE SYSTEM & ALLIED NPCS ---');
// Verify NPC definitions
const npcs = dialogueSystem.npcs;
assert.ok(npcs.AGENT_ARP, 'AGENT_ARP must exist');
assert.ok(npcs.WANDERER_IP, 'WANDERER_IP must exist');
assert.ok(npcs.SOCKET_DAEMON, 'SOCKET_DAEMON must exist');
assert.ok(npcs.SEEDER_PRIME, 'SEEDER_PRIME must exist');

assert.strictEqual(npcs.AGENT_ARP.sector, 2, 'Agent ARP must be located in Sector 2');
assert.strictEqual(npcs.WANDERER_IP.sector, 3, 'Wanderer IP must be located in Sector 3');
assert.strictEqual(npcs.SOCKET_DAEMON.sector, 4, 'Socket Daemon must be located in Sector 4');
assert.strictEqual(npcs.SEEDER_PRIME.sector, 4, 'Seeder Prime must be located in Sector 4');

// Test Agent ARP Dialogue Tree & Resolution Reward
console.log('Testing Agent ARP dialogue tree...');
dialogueSystem.startDialogue('AGENT_ARP');
assert.strictEqual(dialogueSystem.isOpen, true);
assert.strictEqual(dialogueSystem.currentNpcId, 'AGENT_ARP');

// Fast forward typewriter
const input = createMockInput();
input.press('space');
dialogueSystem.handleInput(input);
assert.strictEqual(dialogueSystem.isTyping, false);
assert.ok(dialogueSystem.choices.length > 0);

// Select choice 1: Explain ARP
input.clear();
input.press('1');
dialogueSystem.handleInput(input);
assert.strictEqual(dialogueSystem.currentNodeId, 'EXPLAIN_ARP');

// Fast forward and choose understood -> REWARD_ARP
dialogueSystem.isTyping = false;
input.clear();
input.press('2');
dialogueSystem.handleInput(input);
assert.strictEqual(dialogueSystem.currentNodeId, 'REWARD_ARP');

// Conclude communion and execute 'completeArp' action
const initialMarks = GameState.state.examProgress.marksEarned;
dialogueSystem.isTyping = false;
input.clear();
input.press('1');
dialogueSystem.handleInput(input);
assert.strictEqual(dialogueSystem.isOpen, false);

assert.strictEqual(GameState.state.examProgress.marksEarned, initialMarks + 3, 'Agent ARP must award +3 Marks');
assert.ok(GameState.hasItem('ARP_CACHE_RESOLVER'), 'Must acquire ARP_CACHE_RESOLVER');
assert.ok(GameState.hasItem('ARP_SPOOF_FILTER'), 'Must acquire ARP_SPOOF_FILTER');

// Test Wanderer IP Dialogue Tree & Roaming Reward
console.log('Testing Wanderer IP dialogue tree...');
dialogueSystem.startDialogue('WANDERER_IP');
assert.strictEqual(dialogueSystem.isOpen, true);
dialogueSystem.goToNode('REWARD_MOBILE_IP');
dialogueSystem.isTyping = false;
input.clear();
input.press('1');
dialogueSystem.handleInput(input);
assert.strictEqual(dialogueSystem.isOpen, false);

assert.strictEqual(GameState.state.examProgress.marksEarned, initialMarks + 6, 'Wanderer IP must award +3 Marks');
assert.ok(GameState.hasItem('MOBILE_IP_TUNNELER'), 'Must acquire MOBILE_IP_TUNNELER');

console.log('\n--- 5. TESTING CONSEQUENTIAL TECHNICAL DILEMMAS ---');
// Dilemma 1: Transport Protocol Selection (UDP vs TCP)
console.log('Testing Transport Protocol Dilemma (UDP speed burst vs TCP reliability)...');
const startSpeed = GameState.state.player.speed;
dialogueSystem.startDialogue('SEEDER_PRIME');
dialogueSystem.goToNode('CHOICE_UDP');
dialogueSystem.isTyping = false;
input.clear();
input.press('1');
dialogueSystem.handleInput(input);

assert.strictEqual(GameState.state.player.speed, Math.round(startSpeed * 1.2), 'UDP choice must grant +20% player speed boost');
assert.ok(GameState.hasItem('SCOUT_BURST_ENGINE'), 'Must acquire SCOUT_BURST_ENGINE');
assert.ok(GameState.hasItem('CORRUPTED_INTEL_FRAGMENT'), 'Must log CORRUPTED_INTEL_FRAGMENT');
assert.ok(questManager.hasDecision('DILEMMA_TRANSPORT'), 'Dilemma must be recorded in QuestManager Journal');

// Dilemma 2: Raw Socket Interface (SOCK_PACKET vs PF_PACKET)
console.log('Testing Raw Socket Dilemma (Modern PF_PACKET with sockaddr_ll)...');
const marksBeforeSocket = GameState.state.examProgress.marksEarned;
dialogueSystem.startDialogue('SOCKET_DAEMON');
dialogueSystem.goToNode('CHOICE_PF_PACKET');
dialogueSystem.isTyping = false;
input.clear();
input.press('1');
dialogueSystem.handleInput(input);

assert.strictEqual(GameState.state.examProgress.marksEarned, marksBeforeSocket + 3, 'Modern PF_PACKET must award +3 Marks');
assert.ok(GameState.hasItem('RAW_PACKET_SCANNER'), 'Must acquire RAW_PACKET_SCANNER tool');
assert.ok(questManager.hasDecision('DILEMMA_RAW_SOCKET'), 'Raw socket dilemma must be recorded in QuestManager');

// Test Proximity Interaction Checking
console.log('\n--- 6. TESTING WORLD PROXIMITY INTERACTIONS ---');
const playerNearArp = { x: 1105, y: 280 };
const playerFarAway = { x: 200, y: 200 };

// Player near Agent ARP in Sector 2 presses E -> should trigger dialogue
input.clear();
input.press('e');
const didInteract = dialogueSystem.checkInteractions(2, playerNearArp, input);
assert.strictEqual(didInteract, true, 'Proximity check must trigger dialogue when near NPC and E is pressed');
assert.strictEqual(dialogueSystem.isOpen, true);
assert.strictEqual(dialogueSystem.currentNpcId, 'AGENT_ARP');
dialogueSystem.close();

// Player far away in Sector 2 presses E -> should NOT trigger
input.clear();
input.press('e');
const didInteractFar = dialogueSystem.checkInteractions(2, playerFarAway, input);
assert.strictEqual(didInteractFar, false, 'Proximity check must NOT trigger when player is far away');
assert.strictEqual(dialogueSystem.isOpen, false);

// Test Mock World & Overlay Rendering
console.log('\n--- 7. TESTING VECTOR PORTRAITS & WORLD RENDERING ---');
dialogueSystem.renderWorldNPCs(mockCtx, 2, playerNearArp);
dialogueSystem.renderWorldNPCs(mockCtx, 3, playerNearArp);
dialogueSystem.renderWorldNPCs(mockCtx, 4, playerNearArp);

// Render portraits for all 4 NPCs
['AGENT_ARP', 'WANDERER_IP', 'SOCKET_DAEMON', 'SEEDER_PRIME'].forEach(id => {
    dialogueSystem.renderAnimatedPortrait(mockCtx, id, 100, 100, 40, '#00ffcc');
});

// Render open dialogue box
dialogueSystem.startDialogue('AGENT_ARP');
dialogueSystem.render(mockCtx);
dialogueSystem.close();

console.log('✓ Vector portraits and dialogue overlays rendered without exceptions.');

console.log('\n======================================================');
console.log('🏆 ALL PROMPT 17 TESTS PASSED SUCCESSFULLY! (100%)');
console.log('======================================================');
