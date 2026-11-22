// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// test_prompt19.js - Automated Test Suite for Prompt 19
// Comprehensive KTU 9-Mark Valuation Rubric Auto-Grader
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

console.log('--- 1. LOADING MODULES ---');
const { CyberAudio } = require('../js/audio/CyberAudio.js');
window.CyberAudio = CyberAudio;

const { KTU9MarkQuestions, KTURubricGrader } = require('../js/minigames/KTURubricGrader.js');
const grader = new KTURubricGrader();
window.KTURubricGrader = grader;

console.log('✓ All modules loaded successfully.');

console.log('\n--- 2. VERIFYING 10 GRAND 9-MARK QUESTIONS & SUBDIVISIONS ---');
assert.strictEqual(KTU9MarkQuestions.length, 10, 'Must contain exactly 10 Grand 9-Mark Topics');

KTU9MarkQuestions.forEach((q, idx) => {
    assert.strictEqual(q.marks, 9.0, `Question ${idx + 1} (${q.id}) total marks must be 9.0`);
    assert.ok(q.subdivisions && q.subdivisions.length >= 2, `Question ${idx + 1} must have multiple subdivisions`);
    
    // Check subdivision sum
    const subSum = q.subdivisions.reduce((sum, s) => sum + s.maxMarks, 0);
    assert.strictEqual(subSum, 9.0, `Subdivisions of Question ${idx + 1} (${q.id}) must sum exactly to 9.0 marks`);

    // Check presence of Examiner Insight and Model Answers
    assert.ok(q.examinerInsight && q.examinerInsight.length > 20, `Question ${idx + 1} must include detailed Examiner Insight`);
    assert.ok(q.modelAnswer && q.modelAnswer.length > 100, `Question ${idx + 1} must include full Model Answer`);
    assert.ok(q.partialAnswer && q.partialAnswer.length > 20, `Question ${idx + 1} must include realistic Partial Answer`);

    console.log(`  ✓ Q${idx + 1} [Mod ${q.module}]: ${q.title} -> Sum: ${subSum.toFixed(1)}/9.0 M`);
});

console.log('\n--- 3. TESTING NATURAL LANGUAGE & KEYWORD AUTO-EVALUATOR ---');
// Test 3.1: Model Answer Evaluation across all 10 questions
console.log('Evaluating Model Answers (Target: 8.5 - 9.0 Marks, S Grade)...');
KTU9MarkQuestions.forEach((q, idx) => {
    grader.selectedQuestionIndex = idx;
    grader.playerText = q.modelAnswer;
    const res = grader.gradeAnswer();

    assert.ok(res.totalScore >= 8.5, `Model answer for Q${idx + 1} (${q.id}) must score >= 8.5 M (got ${res.totalScore})`);
    assert.strictEqual(res.grade, 'S', `Model answer for Q${idx + 1} must receive S Grade`);
    console.log(`  ✓ Q${idx + 1} Model Answer: ${res.totalScore.toFixed(1)} / 9.0 M (${res.percentage}%) - Grade ${res.grade}`);
});

// Test 3.2: Partial Answer Evaluation & Missing Keyword Detection
console.log('\nEvaluating Partial Answers (Target: 4.0 - 6.5 Marks, detecting gaps)...');
KTU9MarkQuestions.forEach((q, idx) => {
    grader.selectedQuestionIndex = idx;
    grader.playerText = q.partialAnswer;
    const res = grader.gradeAnswer();

    assert.ok(res.totalScore <= 6.5, `Partial answer for Q${idx + 1} must reflect omissions (got ${res.totalScore})`);
    assert.ok(res.missingKeywords.length > 0, `Partial answer for Q${idx + 1} must detect missing keywords`);
    console.log(`  ✓ Q${idx + 1} Partial Answer: ${res.totalScore.toFixed(1)} / 9.0 M -> ${res.missingKeywords.length} Missing Keywords Flagged: [${res.missingKeywords.slice(0, 3).join(', ')}...]`);
});

// Test 3.3: Empty Answer
grader.selectedQuestionIndex = 0;
grader.playerText = '';
const emptyRes = grader.gradeAnswer();
assert.strictEqual(emptyRes.totalScore, 0.0, 'Empty response must score 0.0 M');

console.log('\n--- 4. TESTING UI STATE & INTERACTIVE CONTROLS ---');
// Toggle
assert.strictEqual(grader.isOpen, false);
grader.toggle();
assert.strictEqual(grader.isOpen, true);

// Pre-fill buttons
grader.selectQuestion(3); // Q4 (TCP Handshake)
assert.strictEqual(grader.selectedQuestionIndex, 3);

grader.loadModelAnswer();
assert.ok(grader.valuationResult.totalScore >= 8.5);

grader.loadPartialAnswer();
assert.ok(grader.valuationResult.totalScore <= 6.5);

grader.clearAnswer();
assert.strictEqual(grader.playerText, '');
assert.strictEqual(grader.valuationResult.totalScore, 0.0);

// Tab switching
const input = createMockInput();
input.press('2');
grader.handleInput(input);
assert.strictEqual(grader.activeTab, 'MODEL_ANSWER');

input.clear();
input.press('3');
grader.handleInput(input);
assert.strictEqual(grader.activeTab, 'RUBRIC_DETAILS');

input.clear();
input.press('1');
grader.handleInput(input);
assert.strictEqual(grader.activeTab, 'EVALUATION');

// Question cycling with [ and ]
input.clear();
input.press(']');
grader.handleInput(input);
assert.strictEqual(grader.selectedQuestionIndex, 4);

input.clear();
input.press('[');
grader.handleInput(input);
assert.strictEqual(grader.selectedQuestionIndex, 3);

// Submit for evaluation
grader.loadModelAnswer();
grader.submitForEvaluation();
assert.ok(grader.valuationResult.totalScore >= 8.5);

grader.close();
assert.strictEqual(grader.isOpen, false);

console.log('\n--- 5. TESTING CANVAS RENDERING OF RUBRIC GRADER ---');
const mockCtx = createMockCtx();
grader.open(3); // Q4
grader.activeTab = 'EVALUATION';
grader.render(mockCtx);

grader.activeTab = 'MODEL_ANSWER';
grader.render(mockCtx);

grader.activeTab = 'RUBRIC_DETAILS';
grader.render(mockCtx);

grader.close();
console.log('✓ KTURubricGrader canvas rendering executed cleanly across all views.');

console.log('\n======================================================');
console.log('🏆 ALL PROMPT 19 TESTS PASSED SUCCESSFULLY! (100%)');
console.log('======================================================');
