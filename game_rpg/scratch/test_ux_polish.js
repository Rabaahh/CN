// Test UX Polish & De-cluttering
const assert = require('assert');
const { WorldInspector } = require('../js/world/WorldInspector.js');
const { CyberCombatEngine } = require('../js/combat/CombatSystem.js');

console.log('--- TEST: UX POLISH & DE-CLUTTERING ---');

// 1. Verify No Roaming Enemies
const combat = new CyberCombatEngine();
combat.init();
assert.strictEqual(combat.enemies.length, 0, 'Must have zero aggressive roaming enemy hitmen');
console.log('✓ Zero aggressive roaming enemy mobs verified (Peaceful exploration).');

// 2. Verify World Inspector
const inspector = new WorldInspector();

// Sector 1 repeater alpha inspection
const alpha = inspector.inspectAt(1, 560, 360, 0, 0);
assert.ok(alpha, 'Repeater Alpha must be detected under mouse');
assert.strictEqual(alpha.id, 'repeater_alpha');
console.log('✓ Hover inspection at Repeater Alpha verified:', alpha.name);

// Sector 1 guidance steps
const step1 = inspector.getStepGuidance(1, 150, 360, null);
assert.ok(step1.step.includes('STEP 1'), 'Step 1 must be active at start of Sector 1');
console.log('✓ Step 1 Guidance verified:', step1.text);

const step3 = inspector.getStepGuidance(1, 750, 360, null);
assert.ok(step3.step.includes('STEP 3'), 'Step 3 must be active at route fork');
console.log('✓ Step 3 Guidance verified:', step3.text);

// Sector 2, 3, 4 guidance
const s2Guide = inspector.getStepGuidance(2, 200, 360, null);
assert.ok(s2Guide.step.includes('STEP 1'), 'Sector 2 Step 1 guidance active');

const s3Guide = inspector.getStepGuidance(3, 300, 360, null);
assert.ok(s3Guide.step.includes('STEP 1'), 'Sector 3 Step 1 guidance active');

const s4Guide = inspector.getStepGuidance(4, 300, 360, null);
assert.ok(s4Guide.step.includes('STEP 1'), 'Sector 4 Step 1 guidance active');

console.log('✓ Guidance steps across all 4 sectors verified.');

// Mock render
const mockCtx = {
    save: () => {},
    restore: () => {},
    fillRect: () => {},
    strokeRect: () => {},
    beginPath: () => {},
    roundRect: () => {},
    fill: () => {},
    stroke: () => {},
    fillText: () => {},
    measureText: (t) => ({ width: (t || '').length * 8 })
};
inspector.render(mockCtx, 1280, 720, 560, 360, 150, 360, 1, null);
console.log('✓ WorldInspector canvas render executed cleanly with zero errors.');

console.log('\n🏆 ALL UX POLISH TESTS PASSED 100%!');
