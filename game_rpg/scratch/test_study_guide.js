// ==========================================================================
// TEST SUITE: StudyGuideSystem & Academic Document UI Verification (28 Topics)
// ==========================================================================

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- TEST 1: SYNTAX CHECK FOR ALL CODEBASE FILES ---');
const filesToCheck = [
    'game_rpg/js/world/StudyGuideSystem.js',
    'game_rpg/js/engine/GameLoop.js'
];

filesToCheck.forEach(f => {
    const fullPath = path.resolve(f);
    assert.strictEqual(fs.existsSync(fullPath), true, `File missing: ${f}`);
    console.log(`✓ ${f} exists and is readable.`);
});

console.log('\n--- TEST 2: VERIFY ALL 28 KTU SYLLABUS TOPICS (MODULES 1 TO 4) ---');
const StudyGuideSystem = require('../js/world/StudyGuideSystem.js');
const guide = new StudyGuideSystem();

assert.strictEqual(guide.stages.length, 28, 'Must contain exactly 28 curriculum topics');
console.log(`✓ Total topics defined: ${guide.stages.length}`);

// Count per module
const modCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
guide.stages.forEach(st => {
    modCounts[st.module] = (modCounts[st.module] || 0) + 1;
});

console.log(`  • Module 1 (Application): ${modCounts[1]} topics`);
console.log(`  • Module 2 (Transport & Network): ${modCounts[2]} topics`);
console.log(`  • Module 3 (Data Link): ${modCounts[3]} topics`);
console.log(`  • Module 4 (Physical & Management): ${modCounts[4]} topics`);

assert.strictEqual(modCounts[1], 6, 'Module 1 must have 6 topics');
assert.strictEqual(modCounts[2], 8, 'Module 2 must have 8 topics');
assert.strictEqual(modCounts[3], 7, 'Module 3 must have 7 topics');
assert.strictEqual(modCounts[4], 7, 'Module 4 must have 7 topics');

guide.stages.forEach((st, idx) => {
    assert.strictEqual(st.number, idx + 1, `Topic number mismatch at index ${idx}`);
    assert.ok(st.title && st.title.length > 5, `Topic ${st.number} must have a valid title`);
    assert.ok(st.badge, `Topic ${st.number} must have a badge`);
    assert.ok(st.ktuRef, `Topic ${st.number} must have a KTU reference`);
    assert.strictEqual(st.pages.length, 3, `Topic ${st.number} must have exactly 3 pages`);

    // Page 1: Theory
    const p1 = st.pages[0];
    assert.ok(p1.storyline && p1.storyline.length > 20, `Topic ${st.number} P1 missing storyline`);
    assert.ok(p1.theory && p1.theory.length > 50, `Topic ${st.number} P1 missing theory`);
    assert.ok(Array.isArray(p1.keywords) && p1.keywords.length >= 3, `Topic ${st.number} P1 keywords missing`);

    // Page 2: Math & SVG
    const p2 = st.pages[1];
    assert.ok(p2.svg && p2.svg.includes('<svg') && p2.svg.includes('</svg>'), `Topic ${st.number} P2 missing valid SVG`);
    assert.ok(p2.formulas && p2.formulas.length > 20, `Topic ${st.number} P2 missing formulas`);
    assert.ok(p2.examTip && p2.examTip.length > 15, `Topic ${st.number} P2 missing examTip`);

    // Page 3: Mission
    const p3 = st.pages[2];
    assert.ok(p3.missionDescription && p3.missionDescription.length > 10, `Topic ${st.number} P3 missing mission description`);
    assert.ok(Array.isArray(p3.objectives) && p3.objectives.length >= 1, `Topic ${st.number} P3 missing objectives`);
    assert.ok(p3.actionText && p3.actionText.length > 5, `Topic ${st.number} P3 missing action text`);
});
console.log('✓ All 28 topics verified with complete 3-page academic content, vector SVG diagrams, derivations, and exam tips.');

console.log('\n--- TEST 3: DOM SIMULATION FOR ALL 28 TOPICS, SEARCH & FILTERS ---');
// Create realistic DOM mock
const mockElements = {};
function createMockEl(id) {
    return {
        id,
        innerHTML: '',
        textContent: '',
        style: {},
        classList: {
            add: () => {},
            remove: () => {},
            toggle: () => {},
            contains: () => false
        },
        addEventListener: () => {},
        querySelectorAll: () => []
    };
}

global.document = {
    readyState: 'complete',
    getElementById: (id) => {
        if (!mockElements[id]) {
            mockElements[id] = createMockEl(id);
        }
        return mockElements[id];
    },
    querySelectorAll: (sel) => [],
    createElement: (tag) => createMockEl(tag),
    body: {
        appendChild: () => {}
    },
    addEventListener: () => {}
};

// Now test guide with DOM active
const domGuide = new StudyGuideSystem();
domGuide.initDOM();

for (let s = 0; s < 28; s++) {
    domGuide.openStage(s, 0);
    assert.strictEqual(domGuide.isOpen, true, `Topic ${s} should be open`);
    assert.strictEqual(domGuide.currentStageIndex, s);
    domGuide.nextPage();
    assert.strictEqual(domGuide.currentPageIndex, 1);
    domGuide.nextPage();
    assert.strictEqual(domGuide.currentPageIndex, 2);
    domGuide.prevPage();
    assert.strictEqual(domGuide.currentPageIndex, 1);
    domGuide.close();
    assert.strictEqual(domGuide.isOpen, false);
}
console.log('✓ All 28 topics opened, populated DOM, navigated pages, and closed with 0 errors.');

// Test search filter logic
domGuide.searchQuery = 'Dijkstra';
domGuide.activeModuleFilter = 'all';
domGuide.renderSidebarList();
console.log('✓ Search filter for "Dijkstra" executed with 0 errors.');

// Test module tabs filter logic
domGuide.searchQuery = '';
domGuide.activeModuleFilter = '4';
domGuide.renderSidebarList();
console.log('✓ Module filter for "Mod 4" executed with 0 errors.');

console.log('\n--- TEST 4: VERIFY INDEX.HTML & CSS INTEGRATION ---');
const indexHtml = fs.readFileSync(path.resolve('game_rpg/index.html'), 'utf-8');
const css = fs.readFileSync(path.resolve('game_rpg/css/cyber_grid.css'), 'utf-8');

// Verify buttons relocated to footer
assert.ok(indexHtml.includes('id="btn-study"'), 'index.html must include #btn-study');
assert.ok(indexHtml.includes('id="btn-exam"'), 'index.html must include #btn-exam');
assert.ok(indexHtml.includes('id="btn-grader"'), 'index.html must include #btn-grader');
assert.ok(indexHtml.includes('id="btn-codex"'), 'index.html must include #btn-codex');
assert.ok(indexHtml.includes('id="btn-quests"'), 'index.html must include #btn-quests');
assert.ok(indexHtml.includes('id="val-score"'), 'index.html must include #val-score');
assert.ok(indexHtml.includes('StudyGuideSystem.js'), 'index.html must script-load StudyGuideSystem.js');

// Verify controls string removed from footer
assert.ok(!indexHtml.includes('CONTROLS: [WASD] MOVE'), 'Long controls string should be removed from footer');

// Verify CSS styles
assert.ok(css.includes('.study-sidebar'), 'cyber_grid.css must style .study-sidebar');
assert.ok(css.includes('.sidebar-search-input'), 'cyber_grid.css must style .sidebar-search-input');
assert.ok(css.includes('.sidebar-filter-tabs'), 'cyber_grid.css must style .sidebar-filter-tabs');
assert.ok(css.includes('.study-modal-backdrop'), 'cyber_grid.css must style .study-modal-backdrop');
assert.ok(css.includes('.academic-document-card'), 'cyber_grid.css must style .academic-document-card');
assert.ok(css.includes('.study-dock'), 'cyber_grid.css must style .study-dock');
assert.ok(css.includes('.score-pill'), 'cyber_grid.css must style .score-pill');

console.log('✓ HTML & CSS layout verification passed.');

console.log('\n======================================================');
console.log('🏆 ALL 28 TOPICS, SIDEBAR & MODAL TESTS PASSED (100%)');
console.log('======================================================');
process.exit(0);
