// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// Verification Test Suite for Prompt 16: SNMP MIB-2 & ASN.1 Syntax Debugger
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

// Set initial marks from Prompt 15 (57 Marks)
gsInstance.state.examProgress.marksEarned = 57;
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

// Load ASN1Debugger
const { ASN1Debugger } = require('../js/minigames/ASN1Debugger.js');
const asn1Debugger = new ASN1Debugger();
global.ASN1Debugger = asn1Debugger;
window.ASN1Debugger = asn1Debugger;

// Load SNMPMinigame
const { SNMPMinigame } = require('../js/minigames/SNMPMinigame.js');
const snmpMinigame = new SNMPMinigame();
global.SNMPMinigame = snmpMinigame;
window.SNMPMinigame = snmpMinigame;

console.log('--- TEST 1: MIB-2 OID Hierarchy & SNMP PDU Operations ---');
snmpMinigame.open();
assert.strictEqual(snmpMinigame.isOpen, true);
assert.strictEqual(snmpMinigame.selectedOid, '1.3.6.1.2.1');
assert.strictEqual(snmpMinigame.treeNodes.length >= 10, true);

// Check OID path to mib-2: 1.3.6.1.2.1
const mib2Node = snmpMinigame.treeNodes.find(n => n.id === 'mib2');
assert.strictEqual(mib2Node.oid, '1.3.6.1.2.1');

// Execute PDU 1: GetRequest sysUpTime (UDP 161)
snmpMinigame.handleClick(snmpMinigame.uiBounds.pduBtn1.x + 5, snmpMinigame.uiBounds.pduBtn1.y + 5);
assert.strictEqual(snmpMinigame.pduOperations[0].executed, true);
assert.strictEqual(snmpMinigame.selectedOid, '1.3.6.1.2.1.1.3.0');

// Execute PDU 2: SetRequest ifAdminStatus.1 = 1 (UDP 161)
snmpMinigame.handleClick(snmpMinigame.uiBounds.pduBtn2.x + 5, snmpMinigame.uiBounds.pduBtn2.y + 5);
assert.strictEqual(snmpMinigame.pduOperations[1].executed, true);
const ifNode = snmpMinigame.treeNodes.find(n => n.id === 'ifAdminStatus');
assert.strictEqual(ifNode.val, '1 (up)');

// Execute PDU 3: Trap Event Alert (UDP 162)
snmpMinigame.handleClick(snmpMinigame.uiBounds.pduBtn3.x + 5, snmpMinigame.uiBounds.pduBtn3.y + 5);
assert.strictEqual(snmpMinigame.pduOperations[2].executed, true);
assert.strictEqual(snmpMinigame.isSnmpComplete(), true);
console.log('✓ MIB-2 tree hierarchy (1.3.6.1.2.1) and SNMP operations (Get/Set on 161, Trap on 162) verified.');

console.log('--- TEST 2: ASN.1 Syntax Debugger - Faulty Declarations (3.0M) ---');
asn1Debugger.open();
assert.strictEqual(asn1Debugger.isOpen, true);
assert.strictEqual(asn1Debugger.declarations.length, 3);
assert.strictEqual(asn1Debugger.isCompiled, false);

// Line 1: Type name must be uppercase
assert.strictEqual(asn1Debugger.declarations[0].isFixed, false);
asn1Debugger.fixDeclaration(0);
assert.strictEqual(asn1Debugger.declarations[0].isFixed, true);
assert.strictEqual(asn1Debugger.declarations[0].currentCode, 'NumberOfStudents ::= INTEGER (15..40)');

// Line 2: Value name must be lowercase
assert.strictEqual(asn1Debugger.declarations[1].isFixed, false);
asn1Debugger.fixDeclaration(1);
assert.strictEqual(asn1Debugger.declarations[1].isFixed, true);
assert.strictEqual(asn1Debugger.declarations[1].currentCode, 'herAge INTEGER ::= 35');

// Line 3: Value must satisfy range constraint (15..40)
assert.strictEqual(asn1Debugger.declarations[2].isFixed, false);
asn1Debugger.fixDeclaration(2);
assert.strictEqual(asn1Debugger.declarations[2].isFixed, true);
assert.strictEqual(asn1Debugger.declarations[2].currentCode, 'classSize NumberOfStudents ::= 30');
console.log('✓ All 3 ASN.1 faulty declarations diagnosed and fixed according to RFC 1155 rules (+3.0M).');

console.log('--- TEST 3: ASN.1 Custom Types - ENUMERATED, Subtypes & Variables (3.0M) ---');
asn1Debugger.activeTab = 1;

// Define Enumerated Base Type: DayOfWeek
asn1Debugger.handleClick(asn1Debugger.uiBounds.addEnumBtn.x + 5, asn1Debugger.uiBounds.addEnumBtn.y + 5);
assert.strictEqual(asn1Debugger.customTypes[0].isDefined, true);

// Define Subtype: Weekend ::= DayOfWeek (sun | sat)
asn1Debugger.handleClick(asn1Debugger.uiBounds.addSubtypeBtn.x + 5, asn1Debugger.uiBounds.addSubtypeBtn.y + 5);
assert.strictEqual(asn1Debugger.customTypes[1].isDefined, true);

// Declare Variable: holiday Weekend ::= sun
asn1Debugger.handleClick(asn1Debugger.uiBounds.addVarBtn.x + 5, asn1Debugger.uiBounds.addVarBtn.y + 5);
assert.strictEqual(asn1Debugger.customTypes[2].isDefined, true);

// Verify Compilation with 0 errors
asn1Debugger.runCompilerDiagnostic();
assert.strictEqual(asn1Debugger.isAllValid(), true);
assert.strictEqual(asn1Debugger.isCompiled, true);
console.log('✓ Custom ASN.1 ENUMERATED, Subtype, and Variable compiled with 0 errors (+3.0M).');

console.log('--- TEST 4: Finalize Management Override & Score Maxout ---');
snmpMinigame.finalizeManagementHack();
assert.strictEqual(snmpMinigame.isSolved, true);
assert.strictEqual(snmpMinigame.isOpen, false);
assert.strictEqual(snmpMinigame.awardedMarks, 6.0);

// Verify GameState update (57 + 6 capped at 60 max marks)
assert.strictEqual(gsInstance.state.examProgress.marksEarned, 60);
const percentage = (gsInstance.state.examProgress.marksEarned / gsInstance.state.examProgress.totalMarks) * 100;
assert.strictEqual(percentage, 100.0);

// Verify items acquired
assert.strictEqual(gsInstance.hasItem('SNMP_ADMIN_TOKEN'), true);
console.log(`✓ Management Override Active! Total Exam Score: ${gsInstance.state.examProgress.marksEarned}/60 (${percentage.toFixed(1)}% - 100% MAXIMUM SCORE!).`);

console.log('--- TEST 5: Auto-Solve and Reset Functional Proofs ---');
asn1Debugger.reset();
assert.strictEqual(asn1Debugger.isAllValid(), false);
assert.strictEqual(asn1Debugger.isCompiled, false);

asn1Debugger.autoSolve();
assert.strictEqual(asn1Debugger.isAllValid(), true);
assert.strictEqual(asn1Debugger.isCompiled, true);
console.log('✓ Auto-solve and reset verified.');

console.log('\n======================================================');
console.log('ALL PROMPT 16 VERIFICATION TESTS PASSED SUCCESSFULLY!');
console.log('======================================================\n');
