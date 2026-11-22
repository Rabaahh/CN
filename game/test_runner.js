// ==========================================================================
// TEST RUNNER: Automated Question Bank & Valuation Scheme Validation
// ==========================================================================

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'questions_data.js');
const rawCode = fs.readFileSync(dataPath, 'utf-8');

// Load module
let GRID_DATA;
try {
    GRID_DATA = require('./questions_data.js');
} catch (e) {
    console.error("Failed to require questions_data.js:", e);
    process.exit(1);
}

console.log("=================================================");
console.log("RUNNING AUTOMATED INTEGRITY TESTS FOR GRID DATA");
console.log("=================================================");

let passed = 0;
let failed = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`  [PASS] ${message}`);
        passed++;
    } else {
        console.error(`  [FAIL] ${message}`);
        failed++;
    }
}

// 1. Verify Metadata
assert(GRID_DATA.metadata.courseCode === 'PCCST501', "Course code is PCCST501");
assert(GRID_DATA.metadata.totalMarks === 60, "Total marks is 60");
assert(GRID_DATA.metadata.partATotal === 24, "Part A total is 24");
assert(GRID_DATA.metadata.partBTotal === 36, "Part B total is 36");

// 2. Verify 4 Sectors
assert(GRID_DATA.sectors && GRID_DATA.sectors.length === 4, "Exactly 4 Sectors present");
for (let s of GRID_DATA.sectors) {
    assert(s.id >= 1 && s.id <= 4, `Sector ${s.id} ID valid`);
    assert(s.name && s.name.length > 5, `Sector ${s.id} has name: ${s.name}`);
    assert(s.bossName && s.bossName.length > 5, `Sector ${s.id} has boss: ${s.bossName}`);
}

// 3. Verify Quick-Hacks (Part A - 3 Marks)
console.log("\n--- Validating Quick-Hacks (Part A) ---");
assert(GRID_DATA.quickHacks.length >= 16, `Sufficient Quick-Hacks present (found ${GRID_DATA.quickHacks.length})`);

const moduleQHCount = {1: 0, 2: 0, 3: 0, 4: 0};
for (let qh of GRID_DATA.quickHacks) {
    moduleQHCount[qh.module]++;
    assert(qh.marks === 3, `Quick-Hack ${qh.id} carries exactly 3 marks`);
    assert(Array.isArray(qh.options) && qh.options.length >= 3, `Quick-Hack ${qh.id} has >= 3 options`);
    assert(qh.correctIndex >= 0 && qh.correctIndex < qh.options.length, `Quick-Hack ${qh.id} valid correctIndex`);
    assert(qh.tacticalIntel && qh.tacticalIntel.length > 30, `Quick-Hack ${qh.id} has rich tactical intel`);
    
    // Check rubric sum
    const rubricSum = qh.rubric.reduce((sum, r) => sum + r.marks, 0);
    assert(Math.abs(rubricSum - 3.0) < 0.01, `Quick-Hack ${qh.id} rubric sums to 3.0 (got ${rubricSum})`);
}
for (let m = 1; m <= 4; m++) {
    assert(moduleQHCount[m] >= 3, `Module ${m} has >= 3 Quick-Hacks (found ${moduleQHCount[m]})`);
}

// 4. Verify Boss Battles (Part B - 9 Marks)
console.log("\n--- Validating Boss Battles (Part B) ---");
assert(GRID_DATA.bossBattles.length >= 8, `Sufficient Boss Battles present (found ${GRID_DATA.bossBattles.length})`);

const moduleBossCount = {1: 0, 2: 0, 3: 0, 4: 0};
for (let boss of GRID_DATA.bossBattles) {
    moduleBossCount[boss.module]++;
    assert(boss.marks === 9, `Boss ${boss.id} carries exactly 9 marks`);
    assert(Array.isArray(boss.subdivisions) && boss.subdivisions.length >= 2, `Boss ${boss.id} has subdivisions`);
    
    const subdivMarks = boss.subdivisions.reduce((s, sub) => s + sub.marks, 0);
    assert(subdivMarks === 9, `Boss ${boss.id} subdivisions sum to 9 (got ${subdivMarks})`);
    
    const rubricSum = boss.rubric.reduce((s, r) => s + r.marks, 0);
    assert(Math.abs(rubricSum - 9.0) < 0.01, `Boss ${boss.id} rubric sums to 9.0 (got ${rubricSum})`);
    assert(boss.tacticalIntel && boss.tacticalIntel.length > 50, `Boss ${boss.id} has deep tactical intel`);
}
for (let m = 1; m <= 4; m++) {
    assert(moduleBossCount[m] >= 2, `Module ${m} has >= 2 Boss Battles for choice simulation (found ${moduleBossCount[m]})`);
}

console.log("\n=================================================");
console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log("=================================================");

if (failed > 0) {
    process.exit(1);
} else {
    console.log("ALL DATA ENGINE TESTS PASSED PERFECTLY!\n");
}
