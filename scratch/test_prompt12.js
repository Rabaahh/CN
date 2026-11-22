// ==========================================================================
// Unit Test for Prompt 12: Dijkstra Link-State Tactical Pathfinder
// ==========================================================================
const assert = require('assert');

// Mock window and GameState
global.window = {
    GameState: {
        state: {
            player: { currentIntegrity: 100, maxIntegrity: 100 },
            score: {
                marksObtained: 33,
                maxMarks: 60,
                examPercentage: 55.0
            },
            completedSectors: [1, 2]
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

const { DijkstraMinigame } = require('../game_rpg/js/minigames/DijkstraMinigame.js');
const { Sector3_Network } = require('../game_rpg/js/world/Sector3_Network.js');

console.log('--- Testing DijkstraMinigame Graph Topology & Trace ---');

const dijk = new DijkstraMinigame();

// Test 1: Problem Graph Topology Check
assert.strictEqual(Object.keys(dijk.nodes).length, 5, 'Graph contains 5 nodes (A, B, C, D, E)');
assert.strictEqual(dijk.edges.length, 7, 'Graph contains 7 edges');

const ab = dijk.edges.find(e => (e.u === 'A' && e.v === 'B') || (e.u === 'B' && e.v === 'A'));
const ac = dijk.edges.find(e => (e.u === 'A' && e.v === 'C') || (e.u === 'C' && e.v === 'A'));
const bc = dijk.edges.find(e => (e.u === 'B' && e.v === 'C') || (e.u === 'C' && e.v === 'B'));
const de = dijk.edges.find(e => (e.u === 'D' && e.v === 'E') || (e.u === 'E' && e.v === 'D'));

assert.strictEqual(ab.cost, 2);
assert.strictEqual(ac.cost, 5);
assert.strictEqual(bc.cost, 1);
assert.strictEqual(de.cost, 1);
console.log('✓ KTU Model Paper Q12a Graph Topology verified (Nodes: A-E, 7 weighted links)');

// Test 2: Error Feedback on Incorrect Node Selection
dijk.selectNode('C'); // B has cost 2, C has cost 5 -> selecting C should fail
assert.strictEqual(dijk.currentStep, 0, 'Step should not advance on wrong choice');
assert.strictEqual(dijk.statusMessage.includes('ERROR'), true, 'Status message shows error feedback');
console.log('✓ Sub-optimal candidate rejection verified with immediate feedback');

// Test 3: Step-by-Step Ground-Truth Trace
// Step 0 -> select B
dijk.selectNode('B');
assert.strictEqual(dijk.currentStep, 1);
assert.deepStrictEqual(dijk.traceSteps[1].permanentSet, ['A', 'B']);
assert.strictEqual(dijk.traceSteps[1].costs['C'].d, 3); // min(5, 2+1) = 3
assert.strictEqual(dijk.traceSteps[1].costs['D'].d, 6); // 2+4 = 6
console.log('✓ Step 1 verified: N\'={A,B}, D(C)=3(B), D(D)=6(B), Next Min is C');

// Step 1 -> select C
dijk.selectNode('C');
assert.strictEqual(dijk.currentStep, 2);
assert.deepStrictEqual(dijk.traceSteps[2].permanentSet, ['A', 'B', 'C']);
assert.strictEqual(dijk.traceSteps[2].costs['D'].d, 4); // min(6, 3+1) = 4
assert.strictEqual(dijk.traceSteps[2].costs['E'].d, 6); // 3+3 = 6
console.log('✓ Step 2 verified: N\'={A,B,C}, D(D)=4(C), D(E)=6(C), Next Min is D');

// Step 2 -> select D
dijk.selectNode('D');
assert.strictEqual(dijk.currentStep, 3);
assert.deepStrictEqual(dijk.traceSteps[3].permanentSet, ['A', 'B', 'C', 'D']);
assert.strictEqual(dijk.traceSteps[3].costs['E'].d, 5); // min(6, 4+1) = 5
console.log('✓ Step 3 verified: N\'={A,B,C,D}, D(E)=5(D), Next Min is E');

// Step 3 -> select E
dijk.selectNode('E');
assert.strictEqual(dijk.currentStep, 4);
assert.deepStrictEqual(dijk.traceSteps[4].permanentSet, ['A', 'B', 'C', 'D', 'E']);
console.log('✓ Step 4 verified: N\'={A,B,C,D,E} - All nodes permanently resolved');

// Test 4: Final Routing Table Verification
const expectedTable = [
    { dest: 'B', cost: 2, nextHop: 'B' },
    { dest: 'C', cost: 3, nextHop: 'B' },
    { dest: 'D', cost: 4, nextHop: 'B' },
    { dest: 'E', cost: 5, nextHop: 'B' }
];

expectedTable.forEach(exp => {
    const entry = dijk.finalRoutingTable.find(r => r.dest === exp.dest);
    assert.strictEqual(entry.cost, exp.cost, `Dest ${exp.dest} must have least cost ${exp.cost}`);
    assert.strictEqual(entry.nextHop, exp.nextHop, `Dest ${exp.dest} must have next hop ${exp.nextHop}`);
});
console.log('✓ Router A Forwarding Table verified (All destinations have Next-Hop B)');

// Test 5: Deployment & Exam Marks Award
const sector3 = new Sector3_Network();
window.Sector3_Network = sector3;
assert.strictEqual(sector3.isDijkstraSolved, false);

dijk.deployRoutingTable();
assert.strictEqual(dijk.isSolved, true);
assert.strictEqual(dijk.awardedMarks, 6.0, 'Full 6.0 marks awarded for Dijkstra question');
assert.strictEqual(window.GameState.state.score.marksObtained, 39, 'Total Exam score is now 39/60 Marks (65% Distinction!)');
assert.strictEqual(sector3.isDijkstraSolved, true, 'Sector 3 marked Dijkstra solved');

// Re-render world updates Gateway to Sector 4
sector3.render({
    save() {}, restore() {}, translate() {}, fillRect() {}, strokeRect() {},
    beginPath() {}, moveTo() {}, lineTo() {}, stroke() {}, fill() {}, arc() {},
    fillText() {}
});
assert.strictEqual(sector3.sector4Gateway.isUnlocked, true, 'Gateway to Sector 4 unlocked after Dijkstra solution');
console.log('✓ Sector 3 Stealth Path deployed & Sector 4 Gateway unlocked (+6 Marks, Total: 39/60)');

console.log('\nALL PROMPT 12 TESTS PASSED SUCCESSFULLY! (100% OK)');
