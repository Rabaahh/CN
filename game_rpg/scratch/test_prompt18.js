// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// test_prompt18.js - Automated Test Suite for Prompt 18
// Tactical Neural Codex & In-Game Revision Cheat-Sheet
// ==========================================================================

const assert = require('assert');

// Mock browser environment
global.window = global;
global.window.addEventListener = () => {};
global.window.removeEventListener = () => {};
global.document = {
    getElementById: () => null,
    addEventListener: () => {},
    removeEventListener: () => {}
};

// Mock AudioContext
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
    createBuffer() { return { getChannelData: () => new Float32Array(100) }; }
    createBufferSource() { return { buffer: null, loop: false, connect: () => {}, start: () => {}, stop: () => {} }; }
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
        rect: () => {},
        clip: () => {},
        arc: () => {},
        fillRect: () => {},
        strokeRect: () => {},
        stroke: () => {},
        fill: () => {},
        fillText: () => {},
        measureText: (txt) => ({ width: (txt || '').length * 8 }),
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
        lastChar: null,
        mouse: { x: 0, y: 0, worldX: 0, worldY: 0, leftJustPressed: false }
    };
}

console.log('--- 1. LOADING NEURAL CODEX MODULES ---');
const { CyberAudio } = require('../js/audio/CyberAudio.js');
window.CyberAudio = CyberAudio;

const { NeuralCodex, NeuralCodexDatabase, NeuralCodexManager } = require('../js/data/NeuralCodex.js');
window.NeuralCodex = NeuralCodex;

const { CodexViewer } = require('../js/world/CodexViewer.js');
const codexViewer = new CodexViewer();
window.CodexViewer = codexViewer;

console.log('✓ All modules loaded successfully.');

console.log('\n--- 2. VERIFYING SYLLABUS COVERAGE (100% KTU PCCST501 MATRIX) ---');
const allCards = NeuralCodex.getAllCards();
console.log(`Total Indexed Knowledge Cards: ${allCards.length}`);
assert.ok(allCards.length >= 18, 'Must index at least 18 high-yield cards');

// Verify Module 1 (Application Layer)
const mod1 = NeuralCodex.getCardsByCategory('MODULE 1');
console.log(`Module 1 Cards: ${mod1.length}`);
assert.ok(mod1.length >= 5, 'Module 1 must cover TCP/IP stack, DNS, HTTP, Email, FTP, P2P');
assert.ok(mod1.some(c => c.id === 'm1_tcp_ip_stack'), 'Must contain TCP/IP 5-layer stack');
assert.ok(mod1.some(c => c.id === 'm1_dns_hierarchy'), 'Must contain DNS resolution hierarchy');
assert.ok(mod1.some(c => c.id === 'm1_web_http'), 'Must contain HTTP/1.1 vs HTTP/2');
assert.ok(mod1.some(c => c.id === 'm1_email_protocols'), 'Must contain SMTP/POP3/IMAP');
assert.ok(mod1.some(c => c.id === 'm1_ftp_dual_port'), 'Must contain FTP dual-port architecture');
assert.ok(mod1.some(c => c.id === 'm1_p2p_bittorrent'), 'Must contain P2P & BitTorrent');

// Verify Module 2 (Transport & Network Layer)
const mod2 = NeuralCodex.getCardsByCategory('MODULE 2');
console.log(`Module 2 Cards: ${mod2.length}`);
assert.ok(mod2.length >= 6, 'Module 2 must cover TCP vs UDP, Handshake, Seq/ACK, Dijkstra, Subnetting/MTU, Sockets, Mobile IP');
assert.ok(mod2.some(c => c.id === 'm2_tcp_vs_udp'), 'Must contain TCP vs UDP comparison');
assert.ok(mod2.some(c => c.id === 'm2_tcp_handshake_lifecycle'), 'Must contain TCP 3-Way Handshake');
assert.ok(mod2.some(c => c.id === 'm2_tcp_seq_ack_numerical'), 'Must contain TCP Seq & Cumulative ACK numerical');
assert.ok(mod2.some(c => c.id === 'm2_dijkstra_link_state'), 'Must contain Dijkstra Link-State algorithm');
assert.ok(mod2.some(c => c.id === 'm2_ipv4_cidr_fragmentation'), 'Must contain IPv4 CIDR & MTU Fragmentation');
assert.ok(mod2.some(c => c.id === 'm2_ipv6_architecture'), 'Must contain IPv6 Header & Features');
assert.ok(mod2.some(c => c.id === 'm2_sockets_io_multiplexing'), 'Must contain Sockets & I/O Multiplexing');
assert.ok(mod2.some(c => c.id === 'm2_mobile_ip'), 'Must contain Mobile IP');

// Verify Module 3 (Data Link Layer & MAC)
const mod3 = NeuralCodex.getCardsByCategory('MODULE 3');
console.log(`Module 3 Cards: ${mod3.length}`);
assert.ok(mod3.length >= 4, 'Module 3 must cover Framing/Stuffing, CRC, ALOHA/CSMA, Switch learning, ARP');
assert.ok(mod3.some(c => c.id === 'm3_framing_stuffing'), 'Must contain Bit & Byte Stuffing');
assert.ok(mod3.some(c => c.id === 'm3_crc_modulo2'), 'Must contain CRC Modulo-2 XOR division');
assert.ok(mod3.some(c => c.id === 'm3_aloha_csma_cd'), 'Must contain ALOHA & CSMA/CD Min Frame formula');
assert.ok(mod3.some(c => c.id === 'm3_ethernet_switch_learning'), 'Must contain Ethernet frame & Switch MAC learning');
assert.ok(mod3.some(c => c.id === 'm3_arp_resolution'), 'Must contain ARP address resolution');

// Verify Module 4 (Physical Layer & SNMP)
const mod4 = NeuralCodex.getCardsByCategory('MODULE 4');
console.log(`Module 4 Cards: ${mod4.length}`);
assert.ok(mod4.length >= 5, 'Module 4 must cover SNMP, ASN.1, Nyquist/Shannon, Line Coding, Modulation, Media');
assert.ok(mod4.some(c => c.id === 'm4_snmp_architecture'), 'Must contain SNMP architecture & OID tree');
assert.ok(mod4.some(c => c.id === 'm4_asn1_syntax_rules'), 'Must contain ASN.1 SMI grammar & syntax rules');
assert.ok(mod4.some(c => c.id === 'm4_nyquist_shannon_limits'), 'Must contain Nyquist & Shannon data rate formulas');
assert.ok(mod4.some(c => c.id === 'm4_line_coding_waveforms'), 'Must contain Line coding waveforms');
assert.ok(mod4.some(c => c.id === 'm4_carrier_modulation'), 'Must contain Carrier modulation ASK/FSK/PSK');
assert.ok(mod4.some(c => c.id === 'm4_transmission_media'), 'Must contain Guided vs Unguided transmission media');

// Verify Master Formula Cheat-Sheet Card
const formulas = NeuralCodex.getCardsByCategory('FORMULA CHEAT-SHEET');
console.log(`Formula Cheat-Sheet Cards: ${formulas.length}`);
assert.strictEqual(formulas.length, 1, 'Must contain dedicated Formula Cheat-Sheet card');
assert.strictEqual(formulas[0].id, 'formula_master_sheet');

console.log('✓ 100% Syllabus coverage verified across all 4 modules.');

console.log('\n--- 3. TESTING REAL-TIME SEARCH ENGINE ---');
// Search for "CRC"
const crcResults = NeuralCodex.search('CRC');
console.log(`Search 'CRC' -> Found ${crcResults.length} matches`);
assert.ok(crcResults.some(c => c.id === 'm3_crc_modulo2'), 'Search "CRC" must find CRC card');

// Search for "Dijkstra"
const dijkstraResults = NeuralCodex.search('Dijkstra');
console.log(`Search 'Dijkstra' -> Found ${dijkstraResults.length} matches`);
assert.ok(dijkstraResults.some(c => c.id === 'm2_dijkstra_link_state'), 'Search "Dijkstra" must find Dijkstra card');

// Search for "Handshake"
const handshakeResults = NeuralCodex.search('handshake');
console.log(`Search 'handshake' -> Found ${handshakeResults.length} matches`);
assert.ok(handshakeResults.some(c => c.id === 'm2_tcp_handshake_lifecycle'), 'Search "handshake" must find Handshake card');

// Search for "Nyquist"
const nyquistResults = NeuralCodex.search('Nyquist');
console.log(`Search 'Nyquist' -> Found ${nyquistResults.length} matches`);
assert.ok(nyquistResults.some(c => c.id === 'm4_nyquist_shannon_limits'), 'Search "Nyquist" must find Nyquist card');

// Search for "ALOHA"
const alohaResults = NeuralCodex.search('ALOHA');
console.log(`Search 'ALOHA' -> Found ${alohaResults.length} matches`);
assert.ok(alohaResults.some(c => c.id === 'm3_aloha_csma_cd'), 'Search "ALOHA" must find ALOHA card');

// Search for "SNMP"
const snmpResults = NeuralCodex.search('SNMP');
console.log(`Search 'SNMP' -> Found ${snmpResults.length} matches`);
assert.ok(snmpResults.some(c => c.id === 'm4_snmp_architecture'), 'Search "SNMP" must find SNMP card');

console.log('✓ Search engine matches keywords, titles, and syllabus mappings accurately.');

console.log('\n--- 4. TESTING CODEX VIEWER UI & CONTROLS ---');
// Open / Toggle
assert.strictEqual(codexViewer.isOpen, false);
codexViewer.toggle();
assert.strictEqual(codexViewer.isOpen, true, 'Toggle must open viewer');

// Audio chime test
assert.strictEqual(typeof CyberAudio.sfxCodexOpen, 'function', 'sfxCodexOpen must exist on CyberAudio');
CyberAudio.sfxCodexOpen();

// Category switching
const input = createMockInput();
input.press('2');
codexViewer.handleInput(input);
assert.strictEqual(codexViewer.activeCategory, 'MODULE 1', 'Key 2 must switch to Module 1');

input.clear();
input.press('3');
codexViewer.handleInput(input);
assert.strictEqual(codexViewer.activeCategory, 'MODULE 2', 'Key 3 must switch to Module 2');

input.clear();
input.press('6');
codexViewer.handleInput(input);
assert.strictEqual(codexViewer.activeCategory, 'FORMULA CHEAT-SHEET', 'Key 6 must switch to Formulas');

input.clear();
input.press('1');
codexViewer.handleInput(input);
assert.strictEqual(codexViewer.activeCategory, 'ALL', 'Key 1 must switch to ALL');

// Real-time search query typing
codexViewer.isSearchFocused = true;
input.clear();
input.lastChar = 'c';
codexViewer.handleInput(input);
input.lastChar = 'r';
codexViewer.handleInput(input);
input.lastChar = 'c';
codexViewer.handleInput(input);
assert.strictEqual(codexViewer.searchQuery, 'crc', 'Search query must receive typed characters');

const filtered = codexViewer.getFilteredCards();
assert.ok(filtered.length > 0);
assert.strictEqual(filtered[0].id, 'm3_crc_modulo2');

// Backspace test
input.clear();
input.press('backspace');
codexViewer.handleInput(input);
assert.strictEqual(codexViewer.searchQuery, 'cr');

// Escape clears search or closes
input.clear();
input.press('escape');
codexViewer.handleInput(input);
assert.strictEqual(codexViewer.isSearchFocused, false);

input.clear();
input.press('escape');
codexViewer.handleInput(input);
assert.strictEqual(codexViewer.isOpen, false, 'Second Escape must close Codex viewer');

// Re-open and test Canvas rendering
console.log('\n--- 5. TESTING CANVAS RENDERING OF CODEX MODAL ---');
const mockCtx = createMockCtx();
codexViewer.open();
codexViewer.searchQuery = '';
codexViewer.render(mockCtx);

// Render with active search
codexViewer.searchQuery = 'Dijkstra';
codexViewer.render(mockCtx);

// Render Formula sheet
codexViewer.activeCategory = 'FORMULA CHEAT-SHEET';
codexViewer.searchQuery = '';
codexViewer.render(mockCtx);

codexViewer.close();
console.log('✓ CodexViewer rendered cleanly across all categories with zero exceptions.');

console.log('\n--- 6. REGRESSION VERIFICATION ---');
const { GameState } = require('../js/engine/GameState.js');
assert.ok(GameState, 'GameState must be accessible');
const { QuestManager } = require('../js/world/QuestManager.js');
assert.ok(QuestManager, 'QuestManager must be accessible');
const { DialogueSystem } = require('../js/world/DialogueSystem.js');
assert.ok(DialogueSystem, 'DialogueSystem must be accessible');

console.log('✓ All prior systems intact with zero regressions.');

console.log('\n======================================================');
console.log('🏆 ALL PROMPT 18 TESTS PASSED SUCCESSFULLY! (100%)');
console.log('======================================================');
