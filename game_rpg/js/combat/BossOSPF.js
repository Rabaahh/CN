// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// BossOSPF.js - Sector 3 Grand Boss: ROUTING LEVIATHAN CORE-OSPF-PRIME
// Authentic Transport Layer Combat, TCP 3-Way Handshake & Sequence Number Terminal
// KTU Module 2 & Transport Layer: Model Paper Q11(a) / Sets 1-5 Q11(b) (9 Marks)
// ==========================================================================

class BossOSPF {
    constructor() {
        this.id = 'boss_core_ospf_prime';
        this.name = 'ROUTING LEVIATHAN: CORE-OSPF-PRIME';

        // Physical World Position (Guards Sector 3 Egress at X: 2050, Y: 360)
        this.x = 2050;
        this.y = 360;
        this.radius = 48;
        this.angle = Math.PI; // Faces left towards arriving player

        // Multi-Segment Dragon Body (Kinematic Follow-Chain)
        this.segments = [
            { x: 2090, y: 360, radius: 38, label: 'TCP_HDR' },
            { x: 2130, y: 360, radius: 32, label: 'SEQ_REG' },
            { x: 2170, y: 360, radius: 26, label: 'ACK_REG' },
            { x: 2210, y: 360, radius: 20, label: 'RWND_CACHE' }
        ];

        // Boss Health & Combat Attributes
        this.maxHealth = 400;
        this.health = 400;
        this.phase = 1; // 1 = Real-Time Combat Duel, 2 = Sequence/ACK Puzzle Lockdown, 3 = Defeated

        // Boss Combat AI State: 'IDLE', 'ENGAGED', 'ATTACKING', 'STAGGERED', 'PHASE2_LOCK', 'DEFEATED'
        this.state = 'IDLE';
        this.engagementRadius = 380;
        this.attackTimer = 0;
        this.attackInterval = 3.6; // Attack cadence
        this.currentAttack = null; // 'SYN_FLOOD', 'DESYNC_WAVE', 'FIN_WAIT'
        this.telegraphTimer = 0;
        this.staggerTimer = 0;

        // Projectiles fired by boss
        this.projectiles = []; // Array of { x, y, vx, vy, radius, color, type, damage, ttl }
        this.activeWaves = [];  // Array of expanding shockwave rings

        // ------------------------------------------------------------------
        // Phase 2: Sequence & Cumulative ACK Puzzle Terminal State
        // Problem (KTU Model Paper Q11a / Sets 1-5 Q11b - 9 Marks):
        // Seg 1: Seq 1000, Len 200B -> Range: 1000..1199
        // Seg 2: Seq 1200, Len 200B -> Range: 1200..1399
        // Seg 3: Seq 1400, Len 150B -> Range: 1400..1549
        // In-Order Expected ACK = 1550
        // If Seg 2 Lost, ACK for Seg 3 = 1200 (Cumulative ACK Principle!)
        // SYN consumes 1 sequence number for explicit ACK = ISN + 1
        // ------------------------------------------------------------------
        this.isTerminalOpen = false;
        this.isTerminalSolved = false;
        this.activeTab = 0;
        this.tabNames = ['[1] SEQUENCE & CUMULATIVE ACK WORKBENCH', '[2] TCP HEADER ARCHITECTURE', '[3] KTU SCHEME & MARKS (9M)'];

        // Phase 2 Interactive Sub-Challenges
        this.challenge1Solved = false; // Byte ranges computed
        this.challenge2Answer = null;  // In-order ACK (expected 1550)
        this.challenge3Answer = null;  // Lost Seg 2 ACK (expected 1200)
        this.challenge4Answer = null;  // SYN consumption explanation (Option A)

        this.statusMessage = 'CORE-OSPF-PRIME ENGAGED. PREVENT BUFFER OVERFLOW & COUNTER WITH 3-WAY HANDSHAKE!';
        this.awardedMarks = 0;

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
            // Challenge action buttons in Tab 0
            computeRangeBtn: { x: 200, y: 310, w: 320, h: 36 },
            ackChoices: [
                { val: 1200, x: 200, y: 410, w: 80, h: 32 },
                { val: 1400, x: 290, y: 410, w: 80, h: 32 },
                { val: 1549, x: 380, y: 410, w: 80, h: 32 },
                { val: 1550, x: 470, y: 410, w: 80, h: 32 }
            ],
            gapChoices: [
                { val: 1000, x: 200, y: 510, w: 80, h: 32 },
                { val: 1200, x: 290, y: 510, w: 80, h: 32 },
                { val: 1400, x: 380, y: 510, w: 80, h: 32 },
                { val: 1550, x: 470, y: 510, w: 80, h: 32 }
            ],
            synOptionA: { x: 620, y: 310, w: 460, h: 42 },
            synOptionB: { x: 620, y: 360, w: 460, h: 42 },
            autoBtn: { x: 190, y: 615, w: 160, h: 34 },
            resetBtn: { x: 360, y: 615, w: 140, h: 34 },
            defeatBtn: { x: 520, y: 615, w: 340, h: 34 }
        };

        this.animTimer = 0;
    }

    // ======================================================================
    // 1. Live-Action Combat Update (Phase 1)
    // ======================================================================
    update(dt, player, input, particles, renderer, combat) {
        if (!player) return;
        this.animTimer += dt;

        // If defeated, idle quietly with dissipated glow
        if (this.state === 'DEFEATED') return;

        // Undulate Dragon Segments
        this.updateSegments(dt);

        // Update In-Flight Boss Projectiles & Waves
        this.updateProjectiles(dt, player, particles, renderer);

        // Check Player Proximity & Engagement
        const distToPlayer = Math.hypot(player.x - this.x, player.y - this.y);

        if (this.state === 'IDLE' && distToPlayer <= this.engagementRadius) {
            this.engage(renderer);
        }

        if (this.state === 'ENGAGED' || this.state === 'ATTACKING' || this.state === 'STAGGERED') {
            // Track boss angle facing player
            this.angle = Math.atan2(player.y - this.y, player.x - this.x);

            // Stagger Decay
            if (this.staggerTimer > 0) {
                this.staggerTimer -= dt;
                if (this.staggerTimer <= 0) {
                    this.state = 'ENGAGED';
                }
            } else {
                // Attack Cadence
                this.attackTimer += dt;
                if (this.attackTimer >= this.attackInterval) {
                    this.attackTimer = 0;
                    this.launchRandomAttack(player, renderer);
                }
            }

            // Check if player's handshake / attacks hit boss
            this.checkPlayerAttacks(player, combat, particles);

            // Phase 1 -> Phase 2 Transition Check
            if (this.health <= 80 && this.phase === 1) {
                this.triggerPhase2Transition(renderer, particles);
            }
        }
    }

    engage(renderer) {
        this.state = 'ENGAGED';
        console.log('[BossOSPF] CORE-OSPF-PRIME Engaged! Boss music activated.');

        // Play Dramatic Boss Music & Roar
        if (typeof window !== 'undefined' && window.CyberAudio) {
            if (typeof window.CyberAudio.playBossTheme === 'function') window.CyberAudio.playBossTheme();
            if (typeof window.CyberAudio.sfxBossRoar === 'function') window.CyberAudio.sfxBossRoar();
        }

        if (renderer) {
            renderer.shake(16, 0.45);
        }
    }

    launchRandomAttack(player, renderer) {
        const attackTypes = ['SYN_FLOOD', 'DESYNC_WAVE', 'FIN_WAIT'];
        const chosen = attackTypes[Math.floor(Math.random() * attackTypes.length)];
        this.currentAttack = chosen;
        this.state = 'ATTACKING';

        if (chosen === 'SYN_FLOOD') {
            // Fire 5 rapid SYN packets towards player
            this.statusMessage = '⚠️ SYN-FLOOD BARRAGE INCOMING! DEPLOY rwnd SHIELD [R-CLICK / K]!';
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    if (this.state === 'DEFEATED') return;
                    const angleSpread = (i - 2) * 0.14;
                    const aimAngle = this.angle + angleSpread;
                    this.projectiles.push({
                        x: this.x,
                        y: this.y,
                        vx: Math.cos(aimAngle) * 220,
                        vy: Math.sin(aimAngle) * 220,
                        radius: 8,
                        color: '#ff0055',
                        type: 'SYN_PACKET',
                        damage: 10,
                        ttl: 4.0
                    });
                }, i * 160);
            }
        } else if (chosen === 'DESYNC_WAVE') {
            // Expanding ring wave scrambling sequence numbers
            this.statusMessage = '⚠️ SEQUENCE DESYNC WAVE! FIRE ACK BEAM [L-CLICK / J] TO COUNTER!';
            this.activeWaves.push({
                x: this.x,
                y: this.y,
                radius: 10,
                maxRadius: 280,
                speed: 160,
                color: '#ffd700',
                damage: 12
            });
            if (renderer) renderer.shake(12, 0.3);
        } else if (chosen === 'FIN_WAIT') {
            // FIN connection termination attempt
            this.statusMessage = '⚠️ FIN-WAIT STRIKE! FIRE TCP RST INTERRUPT [Q] TO ABORT TERMINATION!';
            this.projectiles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(this.angle) * 300,
                vy: Math.sin(this.angle) * 300,
                radius: 14,
                color: '#c084fc',
                type: 'FIN_BEAM',
                damage: 15,
                ttl: 3.5
            });
        }
    }

    updateSegments(dt) {
        // Segments follow head in smooth serpent kinematics
        let prevX = this.x;
        let prevY = this.y;

        this.segments.forEach((seg, idx) => {
            const targetX = prevX + Math.cos(this.angle + Math.PI + Math.sin(this.animTimer * 2.5 + idx) * 0.4) * 36;
            const targetY = prevY + Math.sin(this.angle + Math.PI + Math.sin(this.animTimer * 2.5 + idx) * 0.4) * 36;

            seg.x += (targetX - seg.x) * 0.15;
            seg.y += (targetY - seg.y) * 0.15;

            prevX = seg.x;
            prevY = seg.y;
        });
    }

    updateProjectiles(dt, player, particles, renderer) {
        // Update linear projectiles
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const p = this.projectiles[i];
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.ttl -= dt;

            // Check hit with player
            const dist = Math.hypot(p.x - player.x, p.y - player.y);
            if (dist <= p.radius + 18) {
                // Player hit!
                if (player.isShielding && p.type === 'SYN_FLOOD') {
                    // Absorbed by rwnd Sliding Window Shield!
                    if (particles) particles.emitPacketDischarge(p.x, p.y, '#00ff88', 20);
                } else {
                    if (typeof window !== 'undefined' && window.GameState && typeof window.GameState.modifyBuffer === 'function') {
                        window.GameState.modifyBuffer(-p.damage);
                    }
                    if (particles) particles.emitBufferOverflowSparks(p.x, p.y, 16);
                    if (renderer) renderer.shake(8, 0.2);
                }
                this.projectiles.splice(i, 1);
                continue;
            }

            if (p.ttl <= 0) {
                this.projectiles.splice(i, 1);
            }
        }

        // Update expanding wave rings
        for (let j = this.activeWaves.length - 1; j >= 0; j--) {
            const w = this.activeWaves[j];
            w.radius += w.speed * dt;

            const dist = Math.hypot(w.x - player.x, w.y - player.y);
            if (Math.abs(dist - w.radius) < 14) {
                if (typeof window !== 'undefined' && window.GameState && typeof window.GameState.modifyIntegrity === 'function') {
                    window.GameState.modifyIntegrity(-6);
                }
            }

            if (w.radius >= w.maxRadius) {
                this.activeWaves.splice(j, 1);
            }
        }
    }

    checkPlayerAttacks(player, combat, particles) {
        if (!combat) return;

        // Check if player's projectiles or handshake hit boss
        if (combat.playerProjectiles) {
            for (let i = combat.playerProjectiles.length - 1; i >= 0; i--) {
                const proj = combat.playerProjectiles[i];
                const dist = Math.hypot(proj.x - this.x, proj.y - this.y);

                if (dist <= this.radius + 15) {
                    // Deal damage to boss
                    const dmg = proj.damage || 25;
                    this.takeDamage(dmg, particles);
                    combat.playerProjectiles.splice(i, 1);
                }
            }
        }
    }

    takeDamage(amount, particles) {
        this.health = Math.max(0, this.health - amount);
        this.staggerTimer = 0.6;
        this.state = 'STAGGERED';

        if (particles) {
            particles.emitBufferOverflowSparks(this.x, this.y, 20);
        }

        if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxHit === 'function') {
            window.CyberAudio.sfxHit();
        }
    }

    triggerPhase2Transition(renderer, particles) {
        this.phase = 2;
        this.state = 'PHASE2_LOCK';
        this.isTerminalOpen = true;

        if (renderer) renderer.shake(20, 0.5);
        if (particles) particles.emitPacketDischarge(this.x, this.y, '#ffd700', 60);

        if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxBossRoar === 'function') {
            window.CyberAudio.sfxBossRoar();
        }

        this.statusMessage = 'BOSS CRYPTOGRAPHIC SHIELD ACTIVATED! SOLVE THE TCP SEQUENCE & CUMULATIVE ACK PUZZLE!';
        console.log('[BossOSPF] Phase 2 Activated: Sequence Number & Cumulative ACK Terminal opened.');
    }

    isNear(px, py) {
        return Math.hypot(this.x - px, this.y - py) < 110;
    }

    openTerminal() {
        this.isTerminalOpen = true;
    }

    // ======================================================================
    // 2. Phase 2 Puzzle Terminal Logic & Inputs
    // ======================================================================
    handleTerminalInput(input) {
        if (!this.isTerminalOpen || !input) return;

        // Close on Esc / E
        if (input.isJustPressed('escape') || input.isJustPressed('e')) {
            this.isTerminalOpen = false;
            return;
        }

        // Cycle tabs on Tab / Q
        if (input.isJustPressed('tab') || input.isJustPressed('q')) {
            this.activeTab = (this.activeTab + 1) % 3;
            this.playClickSfx();
        }

        if (input.isJustPressed('a')) {
            this.autoSolvePhase2();
        }
        if (input.isJustPressed('r')) {
            this.resetPhase2();
        }
        if (input.isJustPressed(' ') && this.isAllChallengesComplete()) {
            this.finalizeBossDefeat();
        }

        // Mouse click handler
        if (input.mouse && input.mouse.leftJustPressed) {
            const mx = input.mouse.screenX;
            const my = input.mouse.screenY;
            this.handleTerminalClick(mx, my);
        }
    }

    handleTerminalClick(mx, my) {
        const b = this.uiBounds;

        // Close
        if (mx >= b.closeBtn.x && mx <= b.closeBtn.x + b.closeBtn.w && my >= b.closeBtn.y && my <= b.closeBtn.y + b.closeBtn.h) {
            this.isTerminalOpen = false;
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
        if (mx >= b.autoBtn.x && mx <= b.autoBtn.x + b.autoBtn.w && my >= b.autoBtn.y && my <= b.autoBtn.y + b.autoBtn.h) {
            this.autoSolvePhase2();
            return;
        }
        if (mx >= b.resetBtn.x && mx <= b.resetBtn.x + b.resetBtn.w && my >= b.resetBtn.y && my <= b.resetBtn.y + b.resetBtn.h) {
            this.resetPhase2();
            return;
        }
        if (mx >= b.defeatBtn.x && mx <= b.defeatBtn.x + b.defeatBtn.w && my >= b.defeatBtn.y && my <= b.defeatBtn.y + b.defeatBtn.h) {
            if (this.isAllChallengesComplete()) {
                this.finalizeBossDefeat();
            } else {
                this.statusMessage = 'RESOLVE ALL 4 CHALLENGES TO SHUT DOWN THE LEVIATHAN\'S SHIELD!';
                this.playDeniedSfx();
            }
            return;
        }

        // Tab 0 Interactive Choices
        if (this.activeTab === 0) {
            // Challenge 1: Compute Byte Ranges
            if (mx >= b.computeRangeBtn.x && mx <= b.computeRangeBtn.x + b.computeRangeBtn.w && my >= b.computeRangeBtn.y && my <= b.computeRangeBtn.y + b.computeRangeBtn.h) {
                this.challenge1Solved = true;
                this.statusMessage = 'BYTE RANGES VERIFIED: Seg 1 (1000..1199), Seg 2 (1200..1399), Seg 3 (1400..1549). Select In-Order ACK!';
                this.playClickSfx();
                return;
            }

            // Challenge 2: In-Order ACK Choice
            b.ackChoices.forEach(choice => {
                if (mx >= choice.x && mx <= choice.x + choice.w && my >= choice.y && my <= choice.y + choice.h) {
                    if (choice.val === 1550) {
                        this.challenge2Answer = 1550;
                        this.statusMessage = 'CORRECT! In-order ACK = 1550 (Next expected byte). Now select ACK if Segment 2 is LOST!';
                        this.playClickSfx();
                    } else {
                        this.statusMessage = `INCORRECT: ${choice.val} is wrong. Last byte received was 1549, so next expected is 1549 + 1 = 1550!`;
                        this.playDeniedSfx();
                    }
                }
            });

            // Challenge 3: Lost Segment 2 ACK Choice (Cumulative ACK)
            b.gapChoices.forEach(choice => {
                if (mx >= choice.x && mx <= choice.x + choice.w && my >= choice.y && my <= choice.y + choice.h) {
                    if (choice.val === 1200) {
                        this.challenge3Answer = 1200;
                        this.statusMessage = 'CORRECT! ACK = 1200! TCP ACKs are CUMULATIVE: never ACK past a gap. Answer SYN question on right!';
                        this.playClickSfx();
                    } else {
                        this.statusMessage = `INCORRECT: ${choice.val} is wrong. TCP never acknowledges past a hole. It must request byte 1200!`;
                        this.playDeniedSfx();
                    }
                }
            });

            // Challenge 4: SYN sequence number explanation
            if (mx >= b.synOptionA.x && mx <= b.synOptionA.x + b.synOptionA.w && my >= b.synOptionA.y && my <= b.synOptionA.y + b.synOptionA.h) {
                this.challenge4Answer = 'A';
                this.statusMessage = 'CORRECT! SYN consumes 1 sequence number so the peer can explicitly acknowledge it with Ack = ISN + 1!';
                this.playClickSfx();
                return;
            }
            if (mx >= b.synOptionB.x && mx <= b.synOptionB.x + b.synOptionB.w && my >= b.synOptionB.y && my <= b.synOptionB.y + b.synOptionB.h) {
                this.statusMessage = 'INCORRECT: TCP headers are NOT counted as payload data. Option A is the authentic RFC 793 reason!';
                this.playDeniedSfx();
                return;
            }
        }
    }

    isAllChallengesComplete() {
        return this.challenge1Solved && (this.challenge2Answer === 1550) && (this.challenge3Answer === 1200) && (this.challenge4Answer === 'A');
    }

    autoSolvePhase2() {
        this.challenge1Solved = true;
        this.challenge2Answer = 1550;
        this.challenge3Answer = 1200;
        this.challenge4Answer = 'A';
        this.statusMessage = 'ALL 4 CHALLENGES RESOLVED! Click [DEFEAT CORE-OSPF-PRIME] to unlock Sector 4!';
        this.playSuccessSfx();
    }

    resetPhase2() {
        this.challenge1Solved = false;
        this.challenge2Answer = null;
        this.challenge3Answer = null;
        this.challenge4Answer = null;
        this.statusMessage = 'RESET COMPLETED: Recompute byte ranges and cumulative ACKs to proceed.';
        this.playClickSfx();
    }

    finalizeBossDefeat() {
        this.phase = 3;
        this.state = 'DEFEATED';
        this.health = 0;
        this.isTerminalOpen = false;
        this.isTerminalSolved = true;
        this.awardedMarks = 9.0;

        // 1. Award +9 Marks in Global GameState
        if (typeof window !== 'undefined' && window.GameState) {
            if (typeof window.GameState.addMarks === 'function') {
                window.GameState.addMarks(9);
            }
            if (typeof window.GameState.completeSector === 'function') {
                window.GameState.completeSector(3);
            }
        }

        // 2. Unlock Gateway to Sector 4 in Sector3_Network
        if (typeof window !== 'undefined') {
            if (window.Sector3_Network && window.Sector3_Network.sector4Gateway) {
                window.Sector3_Network.sector4Gateway.isUnlocked = true;
            }
            if (window.GridEngine && window.GridEngine.gameLoop && window.GridEngine.gameLoop.sector3 && window.GridEngine.gameLoop.sector3.sector4Gateway) {
                window.GridEngine.gameLoop.sector3.sector4Gateway.isUnlocked = true;
            }
        }

        // 3. Audio Fanfare & Roar
        if (typeof window !== 'undefined' && window.CyberAudio) {
            if (typeof window.CyberAudio.sfxBossRoar === 'function') window.CyberAudio.sfxBossRoar();
            if (typeof window.CyberAudio.sfxAccessGranted === 'function') window.CyberAudio.sfxAccessGranted();
            if (typeof window.CyberAudio.playExplorationTheme === 'function') window.CyberAudio.playExplorationTheme();
        }

        console.log('[BossOSPF] CORE-OSPF-PRIME DEFEATED! +9 Marks awarded. Sector 3 completed. Sector 4 Gateway UNLOCKED!');
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
    // 3. Render World Space (Head, Serpent Segments, Waves, Projectiles)
    // ======================================================================
    renderWorld(ctx) {
        if (this.state === 'DEFEATED') {
            // Dissipated defeated core
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, this.radius * 0.7, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = '#00ff88';
            ctx.font = 'bold 9px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText('CORE DEFEATED', 0, 4);
            ctx.restore();
            return;
        }

        ctx.save();

        // 1. Render Trailing Dragon Segments
        for (let i = this.segments.length - 1; i >= 0; i--) {
            const seg = this.segments[i];
            ctx.save();
            ctx.fillStyle = 'rgba(8, 20, 50, 0.95)';
            ctx.beginPath();
            ctx.arc(seg.x, seg.y, seg.radius, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = this.phase === 2 ? '#ffd700' : '#0066ff';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillStyle = this.phase === 2 ? '#ffd700' : '#00e5ff';
            ctx.font = 'bold 7px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(seg.label, seg.x, seg.y + 3);
            ctx.restore();
        }

        // 2. Render Dragon Head
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Core Head Chassis
        ctx.fillStyle = 'rgba(6, 16, 42, 0.96)';
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();

        const headColor = (this.state === 'STAGGERED') ? '#ffffff' : (this.phase === 2 ? '#ffd700' : '#ff0055');
        ctx.strokeStyle = headColor;
        ctx.lineWidth = 3;
        ctx.shadowColor = headColor;
        ctx.shadowBlur = 14;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Mandibles / Horns
        ctx.strokeStyle = headColor;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(15, -20); ctx.lineTo(35, -35);
        ctx.moveTo(15, 20); ctx.lineTo(35, 35);
        ctx.stroke();

        // Glowing TCP Center Crest
        ctx.fillStyle = headColor;
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('OSPF', 0, 4);

        ctx.restore();

        // 3. Render In-Flight Boss Projectiles
        this.projectiles.forEach(p => {
            ctx.save();
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.restore();
        });

        // 4. Render Expanding Wave Rings
        this.activeWaves.forEach(w => {
            ctx.save();
            ctx.strokeStyle = w.color;
            ctx.lineWidth = 2.5;
            ctx.shadowColor = w.color;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(w.x, w.y, w.radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.shadowBlur = 0;
            ctx.restore();
        });

        ctx.restore();
    }

    // ======================================================================
    // 4. Render Screen Space HUD & Health Bar
    // ======================================================================
    renderHUD(ctx) {
        if (this.state === 'IDLE' || this.state === 'DEFEATED') return;

        ctx.save();
        const screenW = 1280;

        // Top Boss Health Bar
        const barW = 540;
        const barH = 16;
        const barX = (screenW - barW) / 2;
        const barY = 32;

        // Frame
        ctx.fillStyle = 'rgba(6, 14, 34, 0.95)';
        ctx.fillRect(barX, barY, barW, barH);
        ctx.strokeStyle = this.phase === 2 ? '#ffd700' : '#ff0055';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(barX, barY, barW, barH);

        // Fill
        const hpPct = Math.max(0, this.health / this.maxHealth);
        ctx.fillStyle = this.phase === 2 ? '#ffd700' : '#ff0055';
        ctx.fillRect(barX, barY, barW * hpPct, barH);

        // Boss Title & Subtitle
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`CORE-OSPF-PRIME // HP: ${this.health}/${this.maxHealth}`, screenW / 2, barY + 12);

        ctx.restore();
    }

    // ======================================================================
    // 5. Render Phase 2 Sequence Number & Cumulative ACK Terminal
    // ======================================================================
    renderTerminal(ctx) {
        if (!this.isTerminalOpen) return;

        ctx.save();
        const b = this.uiBounds;

        // Modal Dimming
        ctx.fillStyle = 'rgba(2, 6, 16, 0.9)';
        ctx.fillRect(0, 0, 1280, 720);

        // Modal Chassis
        ctx.fillStyle = '#050c20';
        ctx.fillRect(b.modalX, b.modalY, b.modalW, b.modalH);
        ctx.strokeStyle = this.isTerminalSolved ? '#00ff88' : '#ffd700';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 14;
        ctx.strokeRect(b.modalX, b.modalY, b.modalW, b.modalH);
        ctx.shadowBlur = 0;

        // Header Bar
        ctx.fillStyle = '#081432';
        ctx.fillRect(b.modalX + 2, b.modalY + 2, b.modalW - 4, 58);
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.modalX + 2, b.modalY + 2, b.modalW - 4, 58);

        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 14px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('ROUTER ENCRYPTION LOCK: TCP SEQUENCE & CUMULATIVE ACK VERIFIER', b.modalX + 20, b.modalY + 28);

        ctx.fillStyle = '#88aacc';
        ctx.font = '10px "Fira Code", monospace';
        ctx.fillText('KTU Model Paper Q11a / Sets 1-5 Q11b (9 Marks) | Sequence Byte Ranges, Cumulative ACKs & SYN Rules', b.modalX + 20, b.modalY + 48);

        // Close Button (✕)
        ctx.fillStyle = 'rgba(255, 0, 127, 0.3)';
        ctx.fillRect(b.closeBtn.x, b.closeBtn.y, b.closeBtn.w, b.closeBtn.h);
        ctx.strokeStyle = '#ff007f';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.closeBtn.x, b.closeBtn.y, b.closeBtn.w, b.closeBtn.h);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('✕', b.closeBtn.x + b.closeBtn.w / 2, b.closeBtn.y + 21);

        // Tabs
        b.tabBtns.forEach((tab, idx) => {
            const isSel = (this.activeTab === idx);
            ctx.fillStyle = isSel ? 'rgba(255, 215, 0, 0.25)' : 'rgba(8, 20, 48, 0.6)';
            ctx.fillRect(tab.x, tab.y, tab.w, tab.h);
            ctx.strokeStyle = isSel ? '#ffd700' : 'rgba(255, 215, 0, 0.3)';
            ctx.lineWidth = isSel ? 1.8 : 1;
            ctx.strokeRect(tab.x, tab.y, tab.w, tab.h);

            ctx.fillStyle = isSel ? '#ffd700' : '#88aacc';
            ctx.font = isSel ? 'bold 10px "Fira Code", monospace' : '10px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.tabNames[idx], tab.x + tab.w / 2, tab.y + 19);
        });

        // Tab Views
        if (this.activeTab === 0) {
            this.renderTab0Workbench(ctx);
        } else if (this.activeTab === 1) {
            this.renderTab1Headers(ctx);
        } else {
            this.renderTab2Scheme(ctx);
        }

        // Bottom Controls
        this.renderTerminalBottomControls(ctx);

        ctx.restore();
    }

    renderTab0Workbench(ctx) {
        const b = this.uiBounds;
        const sx = b.modalX + 25;
        const sy = 175;

        ctx.save();

        // 1. Scenario Problem Statement Card (Top)
        ctx.fillStyle = 'rgba(8, 18, 42, 0.9)';
        ctx.fillRect(sx, sy, b.modalW - 50, 75);
        ctx.strokeStyle = '#0066ff';
        ctx.lineWidth = 1;
        ctx.strokeRect(sx, sy, b.modalW - 50, 75);

        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('SCENARIO: SENDER TRANSMITS 3 CONSECUTIVE SEGMENTS', sx + 14, sy + 22);

        ctx.fillStyle = '#ffffff';
        ctx.font = '10px "Fira Code", monospace';
        ctx.fillText('• Segment 1: Seq = 1000, Length = 200 Bytes', sx + 20, sy + 44);
        ctx.fillText('• Segment 2: Seq = 1200, Length = 200 Bytes', sx + 320, sy + 44);
        ctx.fillText('• Segment 3: Seq = 1400, Length = 150 Bytes', sx + 620, sy + 44);

        // 2. Challenge 1: Compute Byte Ranges
        const c1Y = sy + 90;
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.fillText('1. COMPUTE BYTE RANGES OF ALL 3 SEGMENTS:', sx, c1Y + 15);

        if (this.challenge1Solved) {
            ctx.fillStyle = '#00ff88';
            ctx.font = 'bold 10px "Fira Code", monospace';
            ctx.fillText('✓ Seg 1: 1000..1199 (200B) | Seg 2: 1200..1399 (200B) | Seg 3: 1400..1549 (150B)', sx + 14, c1Y + 40);
        } else {
            ctx.fillStyle = 'rgba(0, 102, 255, 0.25)';
            ctx.fillRect(b.computeRangeBtn.x, b.computeRangeBtn.y, b.computeRangeBtn.w, b.computeRangeBtn.h);
            ctx.strokeStyle = '#00e5ff';
            ctx.strokeRect(b.computeRangeBtn.x, b.computeRangeBtn.y, b.computeRangeBtn.w, b.computeRangeBtn.h);
            ctx.fillStyle = '#00e5ff';
            ctx.font = 'bold 10px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText('[CALCULATE BYTE RANGES: SEQ + LEN - 1]', b.computeRangeBtn.x + b.computeRangeBtn.w / 2, b.computeRangeBtn.y + 22);
            ctx.textAlign = 'left';
        }

        // 3. Challenge 2: In-Order Expected ACK
        const c2Y = c1Y + 75;
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.fillText('2. IF ALL 3 ARRIVE IN ORDER, WHAT ACK IS SENT?', sx, c2Y + 15);

        b.ackChoices.forEach(c => {
            const isSel = (this.challenge2Answer === c.val);
            ctx.fillStyle = isSel ? 'rgba(0, 255, 136, 0.3)' : 'rgba(10, 24, 48, 0.6)';
            ctx.fillRect(c.x, c.y, c.w, c.h);
            ctx.strokeStyle = isSel ? '#00ff88' : 'rgba(0, 229, 255, 0.4)';
            ctx.strokeRect(c.x, c.y, c.w, c.h);
            ctx.fillStyle = isSel ? '#00ff88' : '#ffffff';
            ctx.font = 'bold 10px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`${c.val}`, c.x + c.w / 2, c.y + 20);
        });

        // 4. Challenge 3: Segment 2 Lost (Cumulative ACK)
        const c3Y = c2Y + 75;
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('3. IF SEGMENT 2 IS LOST IN TRANSIT, WHAT ACK IS SENT FOR SEGMENT 3?', sx, c3Y + 15);

        b.gapChoices.forEach(c => {
            const isSel = (this.challenge3Answer === c.val);
            ctx.fillStyle = isSel ? 'rgba(0, 255, 136, 0.3)' : 'rgba(10, 24, 48, 0.6)';
            ctx.fillRect(c.x, c.y, c.w, c.h);
            ctx.strokeStyle = isSel ? '#00ff88' : 'rgba(0, 229, 255, 0.4)';
            ctx.strokeRect(c.x, c.y, c.w, c.h);
            ctx.fillStyle = isSel ? '#00ff88' : '#ffffff';
            ctx.font = 'bold 10px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`${c.val}`, c.x + c.w / 2, c.y + 20);
        });

        // 5. Challenge 4: Right Side - SYN Sequence Number Rule
        const c4X = 620;
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('4. WHY DOES A SYN CONSUME 1 SEQUENCE NUMBER (0B DATA)?', c4X, c1Y + 15);

        // Option A
        const isOptA = (this.challenge4Answer === 'A');
        ctx.fillStyle = isOptA ? 'rgba(0, 255, 136, 0.25)' : 'rgba(10, 24, 48, 0.6)';
        ctx.fillRect(b.synOptionA.x, b.synOptionA.y, b.synOptionA.w, b.synOptionA.h);
        ctx.strokeStyle = isOptA ? '#00ff88' : 'rgba(0, 229, 255, 0.4)';
        ctx.strokeRect(b.synOptionA.x, b.synOptionA.y, b.synOptionA.w, b.synOptionA.h);
        ctx.fillStyle = isOptA ? '#00ff88' : '#ffffff';
        ctx.font = '9px "Fira Code", monospace';
        ctx.fillText('[A] So peer can explicitly acknowledge it (Ack = ISN + 1)', b.synOptionA.x + 10, b.synOptionA.y + 18);
        ctx.fillText('    preventing duplicate connection confusion.', b.synOptionA.x + 10, b.synOptionA.y + 32);

        // Option B
        ctx.fillStyle = 'rgba(10, 24, 48, 0.6)';
        ctx.fillRect(b.synOptionB.x, b.synOptionB.y, b.synOptionB.w, b.synOptionB.h);
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
        ctx.strokeRect(b.synOptionB.x, b.synOptionB.y, b.synOptionB.w, b.synOptionB.h);
        ctx.fillStyle = '#88aacc';
        ctx.fillText('[B] Because TCP header bytes count as payload data.', b.synOptionB.x + 10, b.synOptionB.y + 24);

        ctx.restore();
    }

    renderTab1Headers(ctx) {
        const b = this.uiBounds;
        const sx = b.modalX + 30;
        const sy = 180;

        ctx.save();
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 13px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('TCP SEGMENT HEADER ARCHITECTURE & CONTROL FLAGS', sx, sy);

        const rows = [
            '1. Sequence Number (32 bits):',
            '   - Measures the byte number of the FIRST byte of payload data in this segment.',
            '   - Initial Sequence Number (ISN) is randomized during connection establishment to prevent attacks.',
            '',
            '2. Acknowledgment Number (32 bits):',
            '   - Measures the NEXT byte number the receiver expects to receive.',
            '   - Cumulative Acknowledgment: An ACK of N proves all bytes up to N - 1 have been received.',
            '',
            '3. Control Flags (6 bits: URG, ACK, PSH, RST, SYN, FIN):',
            '   - SYN: Synchronizes sequence numbers to initiate 3-way connection establishment.',
            '   - ACK: Indicates the Acknowledgment field is valid (present in almost all TCP packets).',
            '   - RST: Resets/aborts an invalid or broken connection immediately.',
            '   - FIN: Initiates graceful 4-way connection termination.'
        ];

        let ly = sy + 28;
        rows.forEach(r => {
            if (r.startsWith('1.') || r.startsWith('2.') || r.startsWith('3.')) {
                ctx.fillStyle = '#ffd700';
                ctx.font = 'bold 11px "Fira Code", monospace';
            } else {
                ctx.fillStyle = '#c0d4ec';
                ctx.font = '10px "Fira Code", monospace';
            }
            ctx.fillText(r, sx, ly);
            ly += 20;
        });

        ctx.restore();
    }

    renderTab2Scheme(ctx) {
        const b = this.uiBounds;
        const sx = b.modalX + 30;
        const sy = 180;

        ctx.save();
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 13px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('KTU SCHEME OF VALUATION (QUESTION 11a / SETS 1-5 Q11b - 9 MARKS)', sx, sy);

        const lines = [
            '1. Byte Range Derivations (+3.0 Marks):',
            '   - Segment 1: 1000 to 1199 (Length 200).',
            '   - Segment 2: 1200 to 1399 (Length 200).',
            '   - Segment 3: 1400 to 1549 (Length 150).',
            '',
            '2. In-Order Expected Acknowledgment Number (+2.0 Marks):',
            '   - All 3 received -> Last byte is 1549 -> Next expected ACK = 1550.',
            '',
            '3. Lost Segment Cumulative ACK Principle (+2.0 Marks):',
            '   - Segment 2 lost -> Receiver cannot ACK past hole -> ACK sent for Segment 3 = 1200.',
            '',
            '4. SYN Sequence Number Consumption Justification (+2.0 Marks):',
            '   - SYN flag occupies 1 sequence number so that the receiver can explicitly acknowledge it',
            '     with Ack = ISN + 1, resolving connection handshake ambiguity.'
        ];

        let ly = sy + 28;
        lines.forEach(l => {
            if (l.startsWith('1.') || l.startsWith('2.') || l.startsWith('3.') || l.startsWith('4.')) {
                ctx.fillStyle = '#00ff88';
                ctx.font = 'bold 11px "Fira Code", monospace';
            } else {
                ctx.fillStyle = '#d0e4fc';
                ctx.font = '10px "Fira Code", monospace';
            }
            ctx.fillText(l, sx, ly);
            ly += 20;
        });

        ctx.restore();
    }

    renderTerminalBottomControls(ctx) {
        const b = this.uiBounds;

        ctx.save();
        const barY = 575;
        ctx.fillStyle = 'rgba(6, 16, 38, 0.95)';
        ctx.fillRect(b.modalX + 10, barY, b.modalW - 20, 32);
        ctx.strokeStyle = this.isAllChallengesComplete() ? '#00ff88' : '#ffd700';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.modalX + 10, barY, b.modalW - 20, 32);

        ctx.fillStyle = this.isAllChallengesComplete() ? '#00ff88' : '#ffd700';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`STATUS: ${this.statusMessage}`, b.modalX + 20, barY + 20);

        // Auto Button
        ctx.fillStyle = 'rgba(255, 215, 0, 0.2)';
        ctx.fillRect(b.autoBtn.x, b.autoBtn.y, b.autoBtn.w, b.autoBtn.h);
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.autoBtn.x, b.autoBtn.y, b.autoBtn.w, b.autoBtn.h);
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('AUTO-SOLVE [A]', b.autoBtn.x + b.autoBtn.w / 2, b.autoBtn.y + 21);

        // Reset Button
        ctx.fillStyle = 'rgba(255, 170, 0, 0.15)';
        ctx.fillRect(b.resetBtn.x, b.resetBtn.y, b.resetBtn.w, b.resetBtn.h);
        ctx.strokeStyle = '#ffaa00';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.resetBtn.x, b.resetBtn.y, b.resetBtn.w, b.resetBtn.h);
        ctx.fillStyle = '#ffaa00';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('RESET [R]', b.resetBtn.x + b.resetBtn.w / 2, b.resetBtn.y + 21);

        // Defeat Boss Button
        const canDefeat = this.isAllChallengesComplete();
        ctx.fillStyle = canDefeat ? 'rgba(0, 255, 136, 0.25)' : 'rgba(30, 40, 60, 0.4)';
        ctx.fillRect(b.defeatBtn.x, b.defeatBtn.y, b.defeatBtn.w, b.defeatBtn.h);
        ctx.strokeStyle = canDefeat ? '#00ff88' : '#556677';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.defeatBtn.x, b.defeatBtn.y, b.defeatBtn.w, b.defeatBtn.h);

        ctx.fillStyle = canDefeat ? '#00ff88' : '#556677';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        const label = this.isTerminalSolved ? '✓ CORE-OSPF-PRIME DEFEATED (+9 MARKS)' : 'DEFEAT CORE-OSPF-PRIME & UNLOCK SECTOR 4 [SPACE]';
        ctx.fillText(label, b.defeatBtn.x + b.defeatBtn.w / 2, b.defeatBtn.y + 21);

        ctx.restore();
    }
}

// Global Export
const bossOSPFInstance = new BossOSPF();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.BossOSPF = bossOSPFInstance;
    window.BossOSPF = bossOSPFInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BossOSPF, bossOSPF: bossOSPFInstance };
}
