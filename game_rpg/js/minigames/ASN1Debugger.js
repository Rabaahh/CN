// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// ASN1Debugger.js - Sector 4: ASN.1 Syntax Debugging & Compilation IDE
// KTU Module 4: Network Management - Model Paper Q16(a) (6 Marks)
// Abstract Syntax Notation One (ASN.1) Lexical & Semantic Validation Engine
// ==========================================================================

class ASN1Debugger {
    constructor() {
        this.isOpen = false;
        this.isCompiled = false;
        this.activeTab = 0; // 0 = Faulty Declarations Debugger, 1 = Custom Enumerated Types, 2 = Compiler Reference

        // ------------------------------------------------------------------
        // Challenge 1: Faulty ASN.1 Declarations (KTU Model Paper Q16a Part 1)
        // 1. numberOfStudents ::= INTEGER (15..40) -> Type MUST be Uppercase!
        // 2. HerAge INTEGER ::= 35                -> Value MUST be Lowercase!
        // 3. classSize NumberOfStudents ::= 50    -> Value 50 violates (15..40)!
        // ------------------------------------------------------------------
        this.declarations = [
            {
                id: 'decl_1',
                lineNum: 1,
                faultyCode: 'numberOfStudents ::= INTEGER (15..40)',
                fixedCode: 'NumberOfStudents ::= INTEGER (15..40)',
                currentCode: 'numberOfStudents ::= INTEGER (15..40)',
                isFixed: false,
                errorDesc: 'ERROR: Type name must begin with an UPPERCASE letter.',
                fixExplanation: 'Change "numberOfStudents" to "NumberOfStudents" (RFC 1155 / ITU-T X.208 rule).'
            },
            {
                id: 'decl_2',
                lineNum: 2,
                faultyCode: 'HerAge INTEGER ::= 35',
                fixedCode: 'herAge INTEGER ::= 35',
                currentCode: 'HerAge INTEGER ::= 35',
                isFixed: false,
                errorDesc: 'ERROR: Value/Variable name must begin with a LOWERCASE letter.',
                fixExplanation: 'Change "HerAge" to "herAge" (identifiers for values/variables must be lowercase).'
            },
            {
                id: 'decl_3',
                lineNum: 3,
                faultyCode: 'classSize NumberOfStudents ::= 50',
                fixedCode: 'classSize NumberOfStudents ::= 30',
                currentCode: 'classSize NumberOfStudents ::= 50',
                isFixed: false,
                errorDesc: 'ERROR: Value 50 violates subtype range constraint (15..40) defined in NumberOfStudents.',
                fixExplanation: 'Change value 50 to 30 (any integer between 15 and 40 inclusive is legal).'
            }
        ];

        // ------------------------------------------------------------------
        // Challenge 2: Custom Type Definition (KTU Model Paper Q16a Part 2)
        // 1. DayOfWeek ::= ENUMERATED { sun(0), mon(1), tue(2), wed(3), thu(4), fri(5), sat(6) }
        // 2. Weekend ::= DayOfWeek (sun | sat)
        // 3. holiday Weekend ::= sun
        // ------------------------------------------------------------------
        this.customTypes = [
            {
                id: 'type_enum',
                stepNum: 1,
                label: '1. ENUMERATED BASE TYPE (DayOfWeek)',
                targetCode: 'DayOfWeek ::= ENUMERATED { sun(0), mon(1), tue(2), wed(3), thu(4), fri(5), sat(6) }',
                isDefined: false
            },
            {
                id: 'type_sub',
                stepNum: 2,
                label: '2. SUBTYPE DEFINITION (Weekend)',
                targetCode: 'Weekend ::= DayOfWeek (sun | sat)',
                isDefined: false
            },
            {
                id: 'type_val',
                stepNum: 3,
                label: '3. VARIABLE INITIALIZATION (holiday)',
                targetCode: 'holiday Weekend ::= sun',
                isDefined: false
            }
        ];

        this.compilerOutput = [];
        this.statusMessage = 'ASN.1 COMPILER READY: Detect and resolve 3 syntax errors in faulty declarations!';
        this.awardedMarks = 0;
        this.animTimer = 0;

        // UI Bounding Boxes
        this.uiBounds = {
            modalX: 160,
            modalY: 50,
            modalW: 960,
            modalH: 620,
            closeBtn: { x: 1060, y: 65, w: 40, h: 32 },
            tabBtns: [
                { x: 190, y: 130, w: 260, h: 30 },
                { x: 460, y: 130, w: 260, h: 30 },
                { x: 730, y: 130, w: 260, h: 30 }
            ],
            // Fix buttons for Challenge 1
            fixBtn1: { x: 800, y: 220, w: 120, h: 32 },
            fixBtn2: { x: 800, y: 280, w: 120, h: 32 },
            fixBtn3: { x: 800, y: 340, w: 120, h: 32 },
            // Action buttons for Challenge 2
            addEnumBtn: { x: 800, y: 220, w: 120, h: 32 },
            addSubtypeBtn: { x: 800, y: 280, w: 120, h: 32 },
            addVarBtn: { x: 800, y: 340, w: 120, h: 32 },
            // Bottom Controls
            compileBtn: { x: 190, y: 615, w: 180, h: 34 },
            autoBtn: { x: 380, y: 615, w: 140, h: 34 },
            resetBtn: { x: 530, y: 615, w: 120, h: 34 },
            finalizeBtn: { x: 660, y: 615, w: 320, h: 34 }
        };
    }

    open() {
        this.isOpen = true;
        this.runCompilerDiagnostic();
        if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxPing === 'function') {
            window.CyberAudio.sfxPing();
        }
    }

    close() {
        this.isOpen = false;
    }

    handleInput(input) {
        if (!this.isOpen || !input) return;

        // Close on Esc / E
        if (input.isJustPressed('escape') || input.isJustPressed('e')) {
            this.close();
            return;
        }

        // Cycle tabs on Tab / Q
        if (input.isJustPressed('tab') || input.isJustPressed('q')) {
            this.activeTab = (this.activeTab + 1) % 3;
            this.playClickSfx();
        }

        // Quick actions
        if (input.isJustPressed('a')) {
            this.autoSolve();
        }
        if (input.isJustPressed('r')) {
            this.reset();
        }
        if (input.isJustPressed('c')) {
            this.runCompilerDiagnostic();
        }
        if (input.isJustPressed(' ') && this.isAllValid()) {
            this.finalizeCompilation();
        }

        // Mouse click handler
        if (input.mouse && input.mouse.leftJustPressed) {
            const mx = input.mouse.screenX;
            const my = input.mouse.screenY;
            this.handleClick(mx, my);
        }
    }

    handleClick(mx, my) {
        const b = this.uiBounds;

        // Close
        if (mx >= b.closeBtn.x && mx <= b.closeBtn.x + b.closeBtn.w && my >= b.closeBtn.y && my <= b.closeBtn.y + b.closeBtn.h) {
            this.close();
            return;
        }

        // Tab selection
        b.tabBtns.forEach((tab, idx) => {
            if (mx >= tab.x && mx <= tab.x + tab.w && my >= tab.y && my <= tab.y + tab.h) {
                this.activeTab = idx;
                this.playClickSfx();
            }
        });

        // Bottom Controls
        if (mx >= b.compileBtn.x && mx <= b.compileBtn.x + b.compileBtn.w && my >= b.compileBtn.y && my <= b.compileBtn.y + b.compileBtn.h) {
            this.runCompilerDiagnostic();
            return;
        }
        if (mx >= b.autoBtn.x && mx <= b.autoBtn.x + b.autoBtn.w && my >= b.autoBtn.y && my <= b.autoBtn.y + b.autoBtn.h) {
            this.autoSolve();
            return;
        }
        if (mx >= b.resetBtn.x && mx <= b.resetBtn.x + b.resetBtn.w && my >= b.resetBtn.y && my <= b.resetBtn.y + b.resetBtn.h) {
            this.reset();
            return;
        }
        if (mx >= b.finalizeBtn.x && mx <= b.finalizeBtn.x + b.finalizeBtn.w && my >= b.finalizeBtn.y && my <= b.finalizeBtn.y + b.finalizeBtn.h) {
            if (this.isAllValid()) {
                this.finalizeCompilation();
            } else {
                this.statusMessage = 'RECOMPILE CODE WITHOUT ERRORS TO FINALIZE & CLAIM +6 MARKS!';
                this.playDeniedSfx();
            }
            return;
        }

        // Tab 0: Fix buttons for Challenge 1
        if (this.activeTab === 0) {
            if (mx >= b.fixBtn1.x && mx <= b.fixBtn1.x + b.fixBtn1.w && my >= b.fixBtn1.y && my <= b.fixBtn1.y + b.fixBtn1.h) {
                this.fixDeclaration(0);
                return;
            }
            if (mx >= b.fixBtn2.x && mx <= b.fixBtn2.x + b.fixBtn2.w && my >= b.fixBtn2.y && my <= b.fixBtn2.y + b.fixBtn2.h) {
                this.fixDeclaration(1);
                return;
            }
            if (mx >= b.fixBtn3.x && mx <= b.fixBtn3.x + b.fixBtn3.w && my >= b.fixBtn3.y && my <= b.fixBtn3.y + b.fixBtn3.h) {
                this.fixDeclaration(2);
                return;
            }
        }

        // Tab 1: Custom Type buttons for Challenge 2
        if (this.activeTab === 1) {
            if (mx >= b.addEnumBtn.x && mx <= b.addEnumBtn.x + b.addEnumBtn.w && my >= b.addEnumBtn.y && my <= b.addEnumBtn.y + b.addEnumBtn.h) {
                this.customTypes[0].isDefined = true;
                this.playClickSfx();
                this.runCompilerDiagnostic();
                return;
            }
            if (mx >= b.addSubtypeBtn.x && mx <= b.addSubtypeBtn.x + b.addSubtypeBtn.w && my >= b.addSubtypeBtn.y && my <= b.addSubtypeBtn.y + b.addSubtypeBtn.h) {
                this.customTypes[1].isDefined = true;
                this.playClickSfx();
                this.runCompilerDiagnostic();
                return;
            }
            if (mx >= b.addVarBtn.x && mx <= b.addVarBtn.x + b.addVarBtn.w && my >= b.addVarBtn.y && my <= b.addVarBtn.y + b.addVarBtn.h) {
                this.customTypes[2].isDefined = true;
                this.playClickSfx();
                this.runCompilerDiagnostic();
                return;
            }
        }
    }

    fixDeclaration(idx) {
        const d = this.declarations[idx];
        d.currentCode = d.fixedCode;
        d.isFixed = true;
        this.statusMessage = `✓ Line ${d.lineNum} corrected: ${d.fixExplanation}`;
        this.playClickSfx();
        this.runCompilerDiagnostic();
    }

    runCompilerDiagnostic() {
        this.compilerOutput = [];
        let errors = 0;

        // Validate Challenge 1
        this.declarations.forEach(d => {
            if (!d.isFixed) {
                errors++;
                this.compilerOutput.push({
                    type: 'ERROR',
                    line: d.lineNum,
                    text: `Line ${d.lineNum}: ${d.errorDesc}`
                });
            } else {
                this.compilerOutput.push({
                    type: 'SUCCESS',
                    line: d.lineNum,
                    text: `Line ${d.lineNum}: PASSED [${d.currentCode}]`
                });
            }
        });

        // Validate Challenge 2
        this.customTypes.forEach(t => {
            if (!t.isDefined) {
                errors++;
                this.compilerOutput.push({
                    type: 'WARNING',
                    line: t.stepNum + 3,
                    text: `Missing: ${t.label} not yet compiled into schema.`
                });
            } else {
                this.compilerOutput.push({
                    type: 'SUCCESS',
                    line: t.stepNum + 3,
                    text: `Compiled: ${t.targetCode}`
                });
            }
        });

        if (errors === 0) {
            this.isCompiled = true;
            this.statusMessage = '✓ ASN.1 SCHEMA COMPILED WITH 0 ERRORS! Click [FINALIZE COMPILATION] to claim +6 Marks.';
            this.playSuccessSfx();
        } else {
            this.isCompiled = false;
            this.statusMessage = `COMPILATION FAILED: ${errors} error(s)/warning(s) detected. Resolve all issues to proceed!`;
        }
    }

    isAllValid() {
        return this.declarations.every(d => d.isFixed) && this.customTypes.every(t => t.isDefined);
    }

    autoSolve() {
        this.declarations.forEach(d => {
            d.currentCode = d.fixedCode;
            d.isFixed = true;
        });
        this.customTypes.forEach(t => {
            t.isDefined = true;
        });
        this.runCompilerDiagnostic();
        this.statusMessage = 'AUTO-COMPILE COMPLETE: All syntax errors resolved and types defined (+6 Marks ready).';
        this.playSuccessSfx();
    }

    reset() {
        this.declarations.forEach(d => {
            d.currentCode = d.faultyCode;
            d.isFixed = false;
        });
        this.customTypes.forEach(t => {
            t.isDefined = false;
        });
        this.isCompiled = false;
        this.runCompilerDiagnostic();
        this.statusMessage = 'RESET COMPILER: Faulty code restored. Identify and correct syntax errors.';
        this.playClickSfx();
    }

    finalizeCompilation() {
        this.isCompiled = true;
        this.isOpen = false;
        this.awardedMarks = 6.0;

        // 1. Award +6 Marks in GameState
        if (typeof window !== 'undefined' && window.GameState) {
            if (typeof window.GameState.addMarks === 'function') {
                window.GameState.addMarks(6.0);
            }
            if (typeof window.GameState.addItem === 'function') {
                window.GameState.addItem({
                    id: 'ASN1_COMPILED_SCHEMA',
                    name: 'COMPILED ASN.1 MIB SCHEMA (TITAN-OVERRIDE)',
                    type: 'SCHEMA'
                });
            }
        }

        // 2. Audio Triumph Chord
        if (typeof window !== 'undefined' && window.CyberAudio) {
            if (typeof window.CyberAudio.sfxHttpSuccess === 'function') {
                window.CyberAudio.sfxHttpSuccess();
            } else if (typeof window.CyberAudio.sfxAccessGranted === 'function') {
                window.CyberAudio.sfxAccessGranted();
            }
        }

        console.log('[ASN1Debugger] COMPILATION SUCCESSFUL! +6.0 Marks awarded (Total: 60/60 Marks - 100% S Grade Mastery!). Titan Core Override Schema Active.');
    }

    playClickSfx() {
        if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxPing === 'function') {
            window.CyberAudio.sfxPing();
        }
    }

    playSuccessSfx() {
        if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxAccessGranted === 'function') {
            window.CyberAudio.sfxAccessGranted();
        }
    }

    playDeniedSfx() {
        if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxAccessDenied === 'function') {
            window.CyberAudio.sfxAccessDenied();
        }
    }

    // ======================================================================
    // Render Modal Screen
    // ======================================================================
    render(ctx) {
        if (!this.isOpen) return;
        this.animTimer += 0.016;
        const b = this.uiBounds;

        ctx.save();

        // 1. Semi-transparent backdrop
        ctx.fillStyle = 'rgba(4, 6, 16, 0.9)';
        ctx.fillRect(0, 0, 1280, 720);

        // 2. Modal Frame
        ctx.fillStyle = 'rgba(8, 14, 30, 0.98)';
        ctx.fillRect(b.modalX, b.modalY, b.modalW, b.modalH);

        ctx.strokeStyle = '#00ffcc';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#00ffcc';
        ctx.shadowBlur = 16;
        ctx.strokeRect(b.modalX, b.modalY, b.modalW, b.modalH);

        // Top Header
        ctx.fillStyle = 'rgba(0, 255, 204, 0.15)';
        ctx.fillRect(b.modalX, b.modalY, b.modalW, 55);

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 16px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('ASN.1 SYNTAX DEBUGGER & DIAGNOSTIC COMPILER // RFC 1155 / ITU-T X.208', b.modalX + 24, b.modalY + 34);

        // Close Button [ESC]
        ctx.fillStyle = 'rgba(255, 0, 85, 0.2)';
        ctx.fillRect(b.closeBtn.x, b.closeBtn.y, b.closeBtn.w, b.closeBtn.h);
        ctx.strokeStyle = '#ff0055';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.closeBtn.x, b.closeBtn.y, b.closeBtn.w, b.closeBtn.h);
        ctx.fillStyle = '#ff0055';
        ctx.font = 'bold 13px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('ESC', b.closeBtn.x + b.closeBtn.w / 2, b.closeBtn.y + 21);

        // Subheader
        ctx.fillStyle = '#c084fc';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('MODULE 4: KTU MODEL PAPER Q16(a) (6.0 MARKS) — ASN.1 LEXICAL RULES & CUSTOM SUBTYPING', b.modalX + 24, b.modalY + 80);

        // Navigation Tabs
        b.tabBtns.forEach((tab, idx) => {
            const isActive = this.activeTab === idx;
            ctx.fillStyle = isActive ? 'rgba(0, 255, 204, 0.35)' : 'rgba(16, 28, 48, 0.5)';
            ctx.fillRect(tab.x, tab.y, tab.w, tab.h);

            ctx.strokeStyle = isActive ? '#00ffcc' : 'rgba(0, 255, 204, 0.4)';
            ctx.lineWidth = isActive ? 2 : 1;
            ctx.strokeRect(tab.x, tab.y, tab.w, tab.h);

            ctx.fillStyle = isActive ? '#00ffcc' : '#a0b0d0';
            ctx.font = 'bold 10px "Fira Code", monospace';
            ctx.textAlign = 'center';
            const titles = ['[1] DEBUG FAULTY DECLARATIONS (3M)', '[2] CUSTOM ENUMERATED TYPES (3M)', '[3] KTU SCHEME & RULES (6M)'];
            ctx.fillText(titles[idx], tab.x + tab.w / 2, tab.y + 19);
        });

        // 3. Render Active Tab Content
        if (this.activeTab === 0) {
            this.renderTab0_FaultyDecls(ctx);
        } else if (this.activeTab === 1) {
            this.renderTab1_CustomTypes(ctx);
        } else if (this.activeTab === 2) {
            this.renderTab2_RulesIntel(ctx);
        }

        // 4. Status Bar
        ctx.fillStyle = 'rgba(4, 10, 20, 0.95)';
        ctx.fillRect(b.modalX + 10, b.modalY + b.modalH - 85, b.modalW - 20, 28);
        ctx.strokeStyle = 'rgba(0, 255, 204, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.modalX + 10, b.modalY + b.modalH - 85, b.modalW - 20, 28);

        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(this.statusMessage, b.modalX + b.modalW / 2, b.modalY + b.modalH - 67);

        // 5. Bottom Action Buttons
        // Compile
        ctx.fillStyle = 'rgba(0, 229, 255, 0.2)';
        ctx.fillRect(b.compileBtn.x, b.compileBtn.y, b.compileBtn.w, b.compileBtn.h);
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.compileBtn.x, b.compileBtn.y, b.compileBtn.w, b.compileBtn.h);
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('COMPILE CODE [C]', b.compileBtn.x + b.compileBtn.w / 2, b.compileBtn.y + 21);

        // Auto Solve
        ctx.fillStyle = 'rgba(0, 255, 136, 0.15)';
        ctx.fillRect(b.autoBtn.x, b.autoBtn.y, b.autoBtn.w, b.autoBtn.h);
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.autoBtn.x, b.autoBtn.y, b.autoBtn.w, b.autoBtn.h);
        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('AUTO-FIX [A]', b.autoBtn.x + b.autoBtn.w / 2, b.autoBtn.y + 21);

        // Reset
        ctx.fillStyle = 'rgba(255, 170, 0, 0.15)';
        ctx.fillRect(b.resetBtn.x, b.resetBtn.y, b.resetBtn.w, b.resetBtn.h);
        ctx.strokeStyle = '#ffaa00';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.resetBtn.x, b.resetBtn.y, b.resetBtn.w, b.resetBtn.h);
        ctx.fillStyle = '#ffaa00';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('RESET [R]', b.resetBtn.x + b.resetBtn.w / 2, b.resetBtn.y + 21);

        // Finalize
        const canFinalize = this.isAllValid();
        ctx.fillStyle = canFinalize ? 'rgba(0, 255, 136, 0.25)' : 'rgba(30, 40, 60, 0.4)';
        ctx.fillRect(b.finalizeBtn.x, b.finalizeBtn.y, b.finalizeBtn.w, b.finalizeBtn.h);
        ctx.strokeStyle = canFinalize ? '#00ff88' : '#556677';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.finalizeBtn.x, b.finalizeBtn.y, b.finalizeBtn.w, b.finalizeBtn.h);

        ctx.fillStyle = canFinalize ? '#00ff88' : '#556677';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        const label = this.isCompiled ? '✓ ASN.1 SCHEMA COMPILED (+6.0 MARKS)' : 'FINALIZE & INJECT OVERRIDE SCHEMA [SPACE]';
        ctx.fillText(label, b.finalizeBtn.x + b.finalizeBtn.w / 2, b.finalizeBtn.y + 21);

        ctx.restore();
    }

    // ======================================================================
    // Tab 0: Faulty Declarations Debugger Pane
    // ======================================================================
    renderTab0_FaultyDecls(ctx) {
        ctx.save();
        const b = this.uiBounds;

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('CODE EDITOR // DIAGNOSE & CORRECT ASN.1 FAULTY DECLARATIONS (3.0 MARKS):', 200, 190);

        this.declarations.forEach((d, idx) => {
            const yPos = 220 + idx * 60;

            // Code Line Container
            ctx.fillStyle = d.isFixed ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255, 0, 85, 0.18)';
            ctx.fillRect(200, yPos, 580, 50);

            ctx.strokeStyle = d.isFixed ? '#00ff88' : '#ff0055';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(200, yPos, 580, 50);

            // Line Number & Code Text
            ctx.fillStyle = '#88aacc';
            ctx.font = 'bold 10px "Fira Code", monospace';
            ctx.fillText(`L${d.lineNum}:`, 212, yPos + 22);

            ctx.fillStyle = d.isFixed ? '#00ff88' : '#ff77aa';
            ctx.font = 'bold 11px "Fira Code", monospace';
            ctx.fillText(d.currentCode, 245, yPos + 22);

            // Error / Fix status description
            ctx.fillStyle = d.isFixed ? '#00e5ff' : '#ffaa00';
            ctx.font = '8px "Fira Code", monospace';
            const statusTxt = d.isFixed ? `✓ FIXED: ${d.fixExplanation}` : `✗ ${d.errorDesc}`;
            ctx.fillText(statusTxt, 245, yPos + 40);

            // Fix Button
            const fixBtn = idx === 0 ? b.fixBtn1 : (idx === 1 ? b.fixBtn2 : b.fixBtn3);
            ctx.fillStyle = d.isFixed ? 'rgba(0, 255, 136, 0.3)' : 'rgba(255, 170, 0, 0.25)';
            ctx.fillRect(fixBtn.x, yPos + 9, fixBtn.w, fixBtn.h);
            ctx.strokeStyle = d.isFixed ? '#00ff88' : '#ffaa00';
            ctx.lineWidth = 1.2;
            ctx.strokeRect(fixBtn.x, yPos + 9, fixBtn.w, fixBtn.h);

            ctx.fillStyle = d.isFixed ? '#00ff88' : '#ffaa00';
            ctx.font = 'bold 9px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(d.isFixed ? '✓ PASSED' : '[APPLY FIX]', fixBtn.x + fixBtn.w / 2, yPos + 29);
            ctx.textAlign = 'left';
        });

        // Diagnostic Console Output
        this.renderCompilerConsoleBox(ctx, 410);

        ctx.restore();
    }

    // ======================================================================
    // Tab 1: Custom Type Definitions Pane (ENUMERATED & Subtypes)
    // ======================================================================
    renderTab1_CustomTypes(ctx) {
        ctx.save();
        const b = this.uiBounds;

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('CUSTOM TYPE DEFINITIONS // ENUMERATED, SUBTYPES & VARIABLES (3.0 MARKS):', 200, 190);

        this.customTypes.forEach((t, idx) => {
            const yPos = 220 + idx * 60;

            ctx.fillStyle = t.isDefined ? 'rgba(0, 255, 136, 0.15)' : 'rgba(20, 32, 54, 0.9)';
            ctx.fillRect(200, yPos, 580, 50);

            ctx.strokeStyle = t.isDefined ? '#00ff88' : 'rgba(0, 255, 204, 0.4)';
            ctx.lineWidth = t.isDefined ? 1.5 : 1;
            ctx.strokeRect(200, yPos, 580, 50);

            ctx.fillStyle = '#ffd700';
            ctx.font = 'bold 9px "Fira Code", monospace';
            ctx.fillText(t.label, 215, yPos + 18);

            ctx.fillStyle = t.isDefined ? '#00ff88' : '#88aacc';
            ctx.font = '9px "Fira Code", monospace';
            const codeDisplay = t.isDefined ? t.targetCode : `// Awaiting declaration: ${t.targetCode}`;
            ctx.fillText(codeDisplay, 215, yPos + 36);

            // Inject Button
            const btn = idx === 0 ? b.addEnumBtn : (idx === 1 ? b.addSubtypeBtn : b.addVarBtn);
            ctx.fillStyle = t.isDefined ? 'rgba(0, 255, 136, 0.3)' : 'rgba(0, 229, 255, 0.2)';
            ctx.fillRect(btn.x, yPos + 9, btn.w, btn.h);
            ctx.strokeStyle = t.isDefined ? '#00ff88' : '#00e5ff';
            ctx.lineWidth = 1.2;
            ctx.strokeRect(btn.x, yPos + 9, btn.w, btn.h);

            ctx.fillStyle = t.isDefined ? '#00ff88' : '#00e5ff';
            ctx.font = 'bold 9px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(t.isDefined ? '✓ COMPILED' : '[INJECT CODE]', btn.x + btn.w / 2, yPos + 29);
            ctx.textAlign = 'left';
        });

        // Diagnostic Console Output
        this.renderCompilerConsoleBox(ctx, 410);

        ctx.restore();
    }

    renderCompilerConsoleBox(ctx, y) {
        ctx.fillStyle = 'rgba(6, 12, 24, 0.96)';
        ctx.fillRect(200, y, 720, 105);
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 1;
        ctx.strokeRect(200, y, 720, 105);

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.fillText('DIAGNOSTIC COMPILER CONSOLE OUTPUT:', 215, y + 18);

        this.compilerOutput.slice(0, 4).forEach((item, idx) => {
            ctx.fillStyle = item.type === 'ERROR' ? '#ff0055' : (item.type === 'SUCCESS' ? '#00ff88' : '#ffaa00');
            ctx.font = '8px "Fira Code", monospace';
            ctx.fillText(`${item.type === 'SUCCESS' ? '✓' : '✗'} ${item.text}`, 215, y + 36 + idx * 16);
        });
    }

    // ======================================================================
    // Tab 2: KTU Scheme & Rules Reference
    // ======================================================================
    renderTab2_RulesIntel(ctx) {
        ctx.save();

        ctx.fillStyle = 'rgba(8, 14, 34, 0.9)';
        ctx.fillRect(190, 180, 750, 310);
        ctx.strokeStyle = '#00ffcc';
        ctx.lineWidth = 1;
        ctx.strokeRect(190, 180, 750, 310);

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('KTU PCCST501 MODULE 4: ASN.1 GRAMMAR & NETWORK MANAGEMENT (6.0 MARKS)', 205, 205);

        ctx.font = '9px "Fira Code", monospace';
        ctx.fillStyle = '#ffd700';
        ctx.fillText('1. ASN.1 LEXICAL CONVENTIONS (RFC 1155 / ITU-T X.208):', 205, 230);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('• RULE 1: Type definitions MUST begin with an UPPERCASE letter (e.g., NumberOfStudents ::= ...).', 215, 246);
        ctx.fillText('• RULE 2: Variable/Value assignments MUST begin with a LOWERCASE letter (e.g., herAge INTEGER ::= 35).', 215, 260);
        ctx.fillText('• RULE 3: Assigned values MUST strictly satisfy range constraints (e.g., 50 violates (15..40)).', 215, 274);

        ctx.fillStyle = '#ffd700';
        ctx.fillText('2. CUSTOM ENUMERATED TYPES & SUBTYPES (KTU Model Paper Q16a):', 205, 302);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('• Enumerated Type: DayOfWeek ::= ENUMERATED { sun(0), mon(1), tue(2), wed(3), thu(4), fri(5), sat(6) }', 215, 318);
        ctx.fillText('• Subtype Constraint: Weekend ::= DayOfWeek (sun | sat)', 215, 332);
        ctx.fillText('• Variable Declaration: holiday Weekend ::= sun', 215, 346);

        ctx.fillStyle = '#ffd700';
        ctx.fillText('3. THE NETWORK MANAGEMENT TRIUMVIRATE:', 205, 374);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('• SMI (Structure of Management Info): Defines ASN.1 naming rules, data types, and OID tree hierarchy.', 215, 390);
        ctx.fillText('• MIB (Management Information Base): Virtual database of managed objects (e.g., MIB-2 1.3.6.1.2.1).', 215, 404);
        ctx.fillText('• SNMP (Simple Network Mgmt Protocol): Transport protocol defining PDUs (Get, Set on 161; Trap on 162).', 215, 418);

        ctx.restore();
    }
}

// Global Export
const asn1DebuggerInstance = new ASN1Debugger();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.ASN1Debugger = asn1DebuggerInstance;
    window.ASN1Debugger = asn1DebuggerInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ASN1Debugger, asn1Debugger: asn1DebuggerInstance };
}
