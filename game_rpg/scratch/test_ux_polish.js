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

// 3. Verify Bottom-Right Dialogue Box Hide & Toggle Features
assert.strictEqual(inspector.isInspectCardVisible, true, 'Inspect card should be visible by default');
assert.ok(inspector.lastCloseBtnRect, 'Close button rectangle should be recorded after rendering');

// Test click on close button
const r = inspector.lastCloseBtnRect;
const clicked = inspector.checkCloseClick(r.x + 10, r.y + 5);
assert.strictEqual(clicked, true, 'Clicking close button rect must return true');
assert.strictEqual(inspector.isInspectCardVisible, false, 'Card must be hidden after clicking close button');

// Render when hidden
inspector.render(mockCtx, 1280, 720, 560, 360, 150, 360, 1, null);
assert.strictEqual(inspector.lastCloseBtnRect, null, 'Close rect should be null when hidden');

// Toggle back on with toggleInspectCard
inspector.toggleInspectCard(true);
assert.strictEqual(inspector.isInspectCardVisible, true, 'toggleInspectCard(true) must restore visibility');

console.log('✓ Bottom-right dialogue card hide, toggle, and click detection verified (100%).');

// 4. Verify Top Guidance Box Hide & Toggle Features
inspector.render(mockCtx, 1280, 720, 560, 360, 150, 360, 1, null);
assert.strictEqual(inspector.isGuidanceVisible, true, 'Top guidance should be visible by default');
assert.ok(inspector.lastGuidanceCloseRect, 'Guidance close button rectangle should be recorded after rendering');

// Test click on guidance close button
const gr = inspector.lastGuidanceCloseRect;
const gClicked = inspector.checkGuidanceCloseClick(gr.x + 10, gr.y + 5);
assert.strictEqual(gClicked, true, 'Clicking guidance close button rect must return true');
assert.strictEqual(inspector.isGuidanceVisible, false, 'Guidance must be hidden after clicking close button');

// Render when hidden
inspector.render(mockCtx, 1280, 720, 560, 360, 150, 360, 1, null);
assert.strictEqual(inspector.lastGuidanceCloseRect, null, 'Guidance close rect should be null when hidden');

// Toggle back on with toggleGuidance
inspector.toggleGuidance(true);
assert.strictEqual(inspector.isGuidanceVisible, true, 'toggleGuidance(true) must restore visibility');
console.log('✓ Top guidance steps bar hide, toggle, and click detection verified (100%).');

// 5. Verify removal of TRON RENDERER and PRESS [T] debug watermark
const fs = require('fs');
const path = require('path');
const gameLoopCode = fs.readFileSync(path.resolve('game_rpg/js/engine/GameLoop.js'), 'utf-8');
assert.ok(!gameLoopCode.includes('TRON RENDERER: 60 FPS'), 'GameLoop must not contain TRON RENDERER text');
assert.ok(!gameLoopCode.includes('PRESS [T] TEST PARTICLE BURST'), 'GameLoop must not contain PRESS [T] debug text');
console.log('✓ Debug watermark and particle test strings successfully purged from canvas HUD.');

console.log('\n🏆 ALL UX POLISH TESTS PASSED 100%!');
