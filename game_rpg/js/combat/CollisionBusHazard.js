// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// CollisionBusHazard.js - CSMA/CD Shared Bus Collision Storms & 64-Byte Frame Terminal
// KTU Module 3: CSMA/CD, Persistence Methods, Jamming Signal, Exponential Backoff & Min Frame Size
// ==========================================================================

class CollisionBusHazard {
    constructor() {
        // Shared Collision Bus Zone 1: 10Base5 1-Persistent Highway (x: 280 to 720, y: 320 to 400)
        this.zone1 = {
            id: 'zone_1_persistent',
            name: '10Base5 1-Persistent Contention Highway',
            x: 280,
            y: 300,
            width: 440,
            height: 120,
            persistence: '1-PERSISTENT',
            collisionProbability: 0.82, // High collision probability!
            idleTimePercent: 12.5       // Very low idle time!
        };

        // Shared Collision Bus Zone 2: 10Base2 Non-Persistent Corridor (x: 820 to 1260, y: 320 to 400)
        this.zone2 = {
            id: 'zone_non_persistent',
            name: '10Base2 Non-Persistent Backoff Conduit',
            x: 820,
            y: 300,
            width: 440,
            height: 120,
            persistence: 'NON-PERSISTENT',
            collisionProbability: 0.22, // Low collision probability!
            idleTimePercent: 44.0       // Higher idle time due to random backoff!
        };

        // Channel Physical State: 'IDLE', 'TRANSMITTING', 'COLLISION', 'JAMMING'
        this.channelState = 'IDLE';
        this.stateTimer = 0;
        this.stateDuration = 2.0;

        // Jamming Signal Blast Wave (32-48 bits of high-energy collision noise)
        this.jamWave = {
            active: false,
            x: 0,
            y: 360,
            radius: 0,
            maxRadius: 160,
            speed: 420
        };

        // Binary Exponential Backoff Simulation State
        this.playerInBackoff = false;
        this.backoffTimer = 0;
        this.backoffSlots = 0; // k slots of 51.2 μs
        this.collisionAttempt = 0; // n (1..10)

        // ------------------------------------------------------------------
        // 64-Byte Minimum Frame Size Terminal Modal State
        // KTU Condition: Transmission Time T_fr >= 2 * T_p (Round Trip Time)
        // Min Frame = 2 * T_p * Bandwidth = 51.2 μs * 10 Mbps = 512 bits = 64 Bytes
        // ------------------------------------------------------------------
        this.isTerminalOpen = false;
        this.isTerminalSolved = false;
        this.payloadSize = 18; // Bytes (Default unpadded payload -> 18 + 18 = 36B < 64B: FAILS!)
        this.headerCrcSize = 18; // 14B Ethernet Header + 4B CRC FCS = 18 Bytes
        this.targetMinFrame = 64; // 64 Bytes (Min payload = 46 Bytes)
        this.terminalMessage = 'CALIBRATE PAYLOAD PADDING TO SATISFY T_fr >= 2 * T_p (64-BYTE MINIMUM)';

        this.uiBounds = {
            modalX: 180,
            modalY: 70,
            modalW: 920,
            modalH: 560,
            closeBtn: { x: 1040, y: 85, w: 40, h: 32 },
            minusBtn: { x: 380, y: 390, w: 60, h: 36 },
            plusBtn: { x: 620, y: 390, w: 60, h: 36 },
            pad46Btn: { x: 710, y: 390, w: 180, h: 36 },
            submitBtn: { x: 440, y: 460, w: 240, h: 42 }
        };

        this.animTimer = 0;
        this.telemetryWarning = '';
        this.telemetryWarningTimer = 0;
    }

    update(dt, player, particles) {
        this.animTimer += dt;
        if (this.telemetryWarningTimer > 0) this.telemetryWarningTimer -= dt;

        // 1. Channel State Machine Progression
        this.stateTimer += dt;
        if (this.stateTimer >= this.stateDuration) {
            this.stateTimer = 0;
            this.cycleChannelState();
        }

        // 2. Update Jamming Signal Blast Wave
        if (this.jamWave.active) {
            this.jamWave.radius += this.jamWave.speed * dt;
            if (this.jamWave.radius >= this.jamWave.maxRadius) {
                this.jamWave.active = false;
                this.jamWave.radius = 0;
            }
        }

        // 3. Update Player Backoff Timer
        if (this.playerInBackoff) {
            this.backoffTimer -= dt;
            if (this.backoffTimer <= 0) {
                this.playerInBackoff = false;
                this.backoffTimer = 0;
                this.telemetryWarning = '✓ BACKOFF EXPIRED // LINE IDLE // RESUME TRANSMISSION';
                this.telemetryWarningTimer = 1.5;
            }
        }

        if (!player) return;

        // 4. Check if Player is inside Shared Bus Contention Corridors
        const inZone1 = this.isPlayerInZone(player, this.zone1);
        const inZone2 = this.isPlayerInZone(player, this.zone2);

        if (inZone1 || inZone2) {
            const activeZone = inZone1 ? this.zone1 : this.zone2;
            const playerMoving = Math.hypot(player.vx, player.vy) > 20;

            // Collision Condition: Moving during active transmission or collision state on shared bus
            if ((this.channelState === 'COLLISION' || this.channelState === 'JAMMING' || (this.channelState === 'TRANSMITTING' && playerMoving && Math.random() < activeZone.collisionProbability * dt * 3))) {
                this.triggerBusCollision(player, activeZone, particles);
            }
        }
    }

    isPlayerInZone(player, zone) {
        return (
            player.x >= zone.x &&
            player.x <= zone.x + zone.width &&
            player.y >= zone.y &&
            player.y <= zone.y + zone.height
        );
    }

    cycleChannelState() {
        // Cycle between IDLE, TRANSMITTING, and COLLISION
        const rand = Math.random();
        if (this.channelState === 'IDLE') {
            this.channelState = 'TRANSMITTING';
            this.stateDuration = 1.6 + Math.random() * 1.2;
        } else if (this.channelState === 'TRANSMITTING') {
            // High collision probability on 1-persistent contention bus
            if (rand < 0.65) {
                this.channelState = 'COLLISION';
                this.stateDuration = 0.8;
                this.triggerJammingSignal(this.zone1.x + this.zone1.width * 0.5, 360);
            } else {
                this.channelState = 'IDLE';
                this.stateDuration = 1.2 + Math.random() * 0.8;
            }
        } else if (this.channelState === 'COLLISION') {
            this.channelState = 'JAMMING';
            this.stateDuration = 0.6;
        } else {
            this.channelState = 'IDLE';
            this.stateDuration = 1.5;
        }
    }

    triggerJammingSignal(x, y) {
        this.jamWave.active = true;
        this.jamWave.x = x;
        this.jamWave.y = y;
        this.jamWave.radius = 10;

        if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxHit === 'function') {
            window.CyberAudio.sfxHit();
        }
    }

    triggerBusCollision(player, zone, particles) {
        if (this.playerInBackoff) return; // Already in backoff penalty

        this.collisionAttempt = Math.min(10, this.collisionAttempt + 1);

        // Binary Exponential Backoff formula: k in [0, 2^n - 1]
        const maxSlots = Math.pow(2, this.collisionAttempt) - 1;
        this.backoffSlots = Math.floor(Math.random() * (maxSlots + 1));
        // Slot time = 51.2 μs (simulated as 0.25s per slot in game time)
        this.backoffTimer = 0.4 + this.backoffSlots * 0.15;
        this.playerInBackoff = true;

        // Damage & Knockback
        player.takeDamage(8, 'CSMA/CD Signal Superposition Collision');
        player.currentBuffer = Math.max(0, player.currentBuffer - 15);
        player.x -= 55; // Knock back along bus highway
        player.vx = -120;

        if (particles) {
            particles.emitBufferOverflowSparks(player.x, player.y, 22);
            particles.emitPacketDischarge(player.x, player.y, '#ff0055', 30);
        }

        this.triggerJammingSignal(player.x, player.y);

        this.telemetryWarning = `⚡ CSMA/CD COLLISION! JAMMING SIGNAL DETECTED // BACKOFF: k=${this.backoffSlots} SLOTS (${this.backoffTimer.toFixed(1)}s)`;
        this.telemetryWarningTimer = 2.0;

        if (typeof window !== 'undefined' && window.CombatSystem && typeof window.CombatSystem.spawnFloatingText === 'function') {
            window.CombatSystem.spawnFloatingText(player.x, player.y - 40, `COLLISION! BACKOFF: ${this.backoffSlots} SLOTS`, '#ff0055');
        }
    }

    // ----------------------------------------------------------------------
    // 64-Byte Minimum Frame Size Terminal Logic
    // ----------------------------------------------------------------------
    openTerminal() {
        this.isTerminalOpen = true;
        this.validateFrameSize(false);
        console.log('[CollisionBusHazard] 64-Byte Frame Terminal opened.');
    }

    closeTerminal() {
        this.isTerminalOpen = false;
        console.log('[CollisionBusHazard] 64-Byte Frame Terminal closed.');
    }

    adjustPayload(delta) {
        this.payloadSize = Math.max(10, Math.min(1500, this.payloadSize + delta));
        this.playBeepSfx();
        this.validateFrameSize(false);
    }

    setPayload(val) {
        this.payloadSize = val;
        this.playBeepSfx();
        this.validateFrameSize(false);
    }

    playBeepSfx() {
        if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxPing === 'function') {
            window.CyberAudio.sfxPing();
        }
    }

    validateFrameSize(isSubmit = false) {
        const totalFrameSize = this.headerCrcSize + this.payloadSize; // 18B + Payload
        const isCompliant = (totalFrameSize >= this.targetMinFrame);

        if (isCompliant) {
            this.terminalMessage = `VALID FRAME SIZE: ${totalFrameSize} BYTES >= 64 BYTES (T_fr = ${(totalFrameSize * 8 / 10).toFixed(1)} μs >= 2*Tp = 51.2 μs)!`;
            if (isSubmit && !this.isTerminalSolved) {
                this.isTerminalSolved = true;
                if (typeof window !== 'undefined' && window.GameState && typeof window.GameState.addMarks === 'function') {
                    window.GameState.addMarks(3);
                }
                if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxAccessGranted === 'function') {
                    window.CyberAudio.sfxAccessGranted();
                }
            }
            return true;
        } else {
            const missing = this.targetMinFrame - totalFrameSize;
            this.terminalMessage = `FRAME SIZE TOO SMALL (${totalFrameSize}B < 64B)! TRANSMITTER FINISHES BEFORE 2*Tp // ADD ${missing}B PADDING!`;
            if (isSubmit) {
                if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxAccessDenied === 'function') {
                    window.CyberAudio.sfxAccessDenied();
                }
            }
            return false;
        }
    }

    handleInput(input) {
        if (!this.isTerminalOpen || !input) return;

        // Escape or E to close
        if (input.isJustPressed('escape') || input.isJustPressed('e')) {
            this.closeTerminal();
            return;
        }

        // Left/Right or Minus/Plus to adjust payload
        if (input.isJustPressed('arrowleft') || input.isJustPressed('-')) {
            this.adjustPayload(-4);
        }
        if (input.isJustPressed('arrowright') || input.isJustPressed('+') || input.isJustPressed('=')) {
            this.adjustPayload(4);
        }

        // Space or P to auto-pad to 46 bytes
        if (input.isJustPressed('p') || input.isJustPressed(' ')) {
            this.setPayload(46);
        }

        // Enter to submit
        if (input.isJustPressed('enter')) {
            this.validateFrameSize(true);
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
            this.closeTerminal();
            return;
        }

        // Minus / Plus
        if (mx >= b.minusBtn.x && mx <= b.minusBtn.x + b.minusBtn.w && my >= b.minusBtn.y && my <= b.minusBtn.y + b.minusBtn.h) {
            this.adjustPayload(-4);
            return;
        }
        if (mx >= b.plusBtn.x && mx <= b.plusBtn.x + b.plusBtn.w && my >= b.plusBtn.y && my <= b.plusBtn.y + b.plusBtn.h) {
            this.adjustPayload(4);
            return;
        }

        // Auto-Pad to 46 Bytes button
        if (mx >= b.pad46Btn.x && mx <= b.pad46Btn.x + b.pad46Btn.w && my >= b.pad46Btn.y && my <= b.pad46Btn.y + b.pad46Btn.h) {
            this.setPayload(46);
            return;
        }

        // Submit
        if (mx >= b.submitBtn.x && mx <= b.submitBtn.x + b.submitBtn.w && my >= b.submitBtn.y && my <= b.submitBtn.y + b.submitBtn.h) {
            this.validateFrameSize(true);
            return;
        }
    }

    // ======================================================================
    // Render World Elements (Collision Waveforms & Jamming Signal Blast)
    // ======================================================================
    renderWorld(ctx) {
        const anim = this.animTimer;

        // 1. Render Collision Jamming Signal Shockwave
        if (this.jamWave.active) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.jamWave.x, this.jamWave.y, this.jamWave.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 0, 85, ${1.0 - this.jamWave.radius / this.jamWave.maxRadius})`;
            ctx.lineWidth = 4;
            ctx.shadowColor = '#ff0055';
            ctx.shadowBlur = 18;
            ctx.stroke();

            // Inner harmonic crackle
            ctx.beginPath();
            ctx.arc(this.jamWave.x, this.jamWave.y, this.jamWave.radius * 0.6, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 170, 0, 0.7)';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
        }

        // 2. Render Shared Bus Traffic Pulses (10Base5 & 10Base2 Active Signals)
        [this.zone1, this.zone2].forEach(zone => {
            ctx.save();
            const isColliding = (this.channelState === 'COLLISION' || this.channelState === 'JAMMING');
            const waveColor = isColliding ? '#ff0055' : (this.channelState === 'TRANSMITTING' ? '#ffd700' : 'rgba(0, 255, 136, 0.4)');

            ctx.strokeStyle = waveColor;
            ctx.lineWidth = 2;
            ctx.setLineDash([12, 16]);
            ctx.lineDashOffset = -anim * (isColliding ? 240 : 120);

            ctx.beginPath();
            ctx.moveTo(zone.x, 360);
            ctx.lineTo(zone.x + zone.width, 360);
            ctx.stroke();
            ctx.restore();
        });
    }

    // ======================================================================
    // Render HUD Telemetry (Collision Probability & Channel Idle Meters)
    // ======================================================================
    renderHUD(ctx) {
        ctx.save();

        const hx = 24;
        const hy = 80;
        const hw = 300;
        const hh = 62;

        ctx.fillStyle = 'rgba(4, 10, 24, 0.92)';
        ctx.fillRect(hx, hy, hw, hh);
        ctx.strokeStyle = (this.channelState === 'COLLISION' || this.channelState === 'JAMMING') ? '#ff0055' : '#00ff88';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(hx, hy, hw, hh);

        // Header Title
        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.fillText('CSMA/CD BUS TELEMETRY (KTU Q6 / Q14a)', hx + 12, hy + 16);

        // Channel Status Tag
        let statusColor = '#00ff88';
        let statusText = 'CHANNEL IDLE [CARRIER CLEAR]';
        if (this.channelState === 'TRANSMITTING') {
            statusColor = '#ffd700';
            statusText = 'CARRIER BUSY [TRANSMITTING]';
        } else if (this.channelState === 'COLLISION' || this.channelState === 'JAMMING') {
            statusColor = '#ff0055';
            statusText = '⚡ COLLISION DETECTED [JAMMING 48b]';
        }

        ctx.fillStyle = statusColor;
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.fillText(statusText, hx + 12, hy + 33);

        // Sub-gauges: 1-Persistent Collision Prob vs Non-Persistent Idle
        ctx.fillStyle = '#88aacc';
        ctx.font = '9px "Fira Code", monospace';
        ctx.fillText('1-PERSIST COLLISION: 82% | NON-PERSIST IDLE: 44%', hx + 12, hy + 50);

        // On-screen warning banner (collision alerts / backoff)
        if (this.telemetryWarningTimer > 0) {
            const bw = 540;
            const bh = 28;
            const bx = ctx.canvas.width / ((typeof window !== 'undefined' && window.devicePixelRatio) || 1) / 2 - bw / 2;
            const by = 80;

            ctx.fillStyle = 'rgba(255, 0, 85, 0.94)';
            ctx.fillRect(bx, by, bw, bh);
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(bx, by, bw, bh);

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 10px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.telemetryWarning, bx + bw / 2, by + 18);
        }

        ctx.restore();
    }

    // ======================================================================
    // Render 64-Byte Minimum Frame Size Terminal Modal
    // ======================================================================
    renderTerminal(ctx) {
        if (!this.isTerminalOpen) return;

        const b = this.uiBounds;
        const totalFrame = this.headerCrcSize + this.payloadSize;
        const isCompliant = (totalFrame >= this.targetMinFrame);

        ctx.save();

        // 1. Fullscreen Dimmer
        ctx.fillStyle = 'rgba(2, 6, 16, 0.88)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // 2. Chassis Box
        ctx.fillStyle = 'rgba(4, 12, 26, 0.98)';
        ctx.fillRect(b.modalX, b.modalY, b.modalW, b.modalH);

        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 18;
        ctx.strokeRect(b.modalX, b.modalY, b.modalW, b.modalH);
        ctx.shadowBlur = 0;

        // Title
        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 15px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('⚡ ETHERNET 64-BYTE MINIMUM FRAME SIZE SYNTHESIZER', b.modalX + 25, b.modalY + 38);

        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.fillText('KTU MODULE 3 QUESTION 6 & 14(a) | CSMA/CD COLLISION DETECTION TIMING | VALUATION: +3 MARKS', b.modalX + 25, b.modalY + 58);

        // Close Button [X]
        const cb = b.closeBtn;
        ctx.fillStyle = 'rgba(255, 34, 85, 0.2)';
        ctx.fillRect(cb.x, cb.y, cb.w, cb.h);
        ctx.strokeStyle = '#ff2255';
        ctx.strokeRect(cb.x, cb.y, cb.w, cb.h);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('✕ [ESC]', cb.x + cb.w / 2, cb.y + 21);

        // Theory Breakdown Box
        const thY = b.modalY + 80;
        ctx.fillStyle = 'rgba(6, 16, 36, 0.9)';
        ctx.fillRect(b.modalX + 25, thY, b.modalW - 50, 110);
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
        ctx.strokeRect(b.modalX + 25, thY, b.modalW - 50, 110);

        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('📖 THE FUNDAMENTAL CSMA/CD CONDITION: Transmission Time T_fr >= 2 * T_p (Round-Trip Time)', b.modalX + 40, thY + 22);

        ctx.fillStyle = '#d0e0f0';
        ctx.font = '10px "Fira Code", monospace';
        ctx.fillText('• Slot Time 2*Tp = 51.2 μs (worst-case round-trip propagation + repeater delays over 2500m bus).', b.modalX + 40, thY + 44);
        ctx.fillText('• Min Frame Size = 2 * Tp * Bandwidth = 51.2 μs * 10 Mbps = 512 bits = EXACTLY 64 BYTES.', b.modalX + 40, thY + 64);
        ctx.fillText('• If Frame < 64 Bytes: Sender finishes transmission before collision signal returns -> SILENT DATA CORRUPTION!', b.modalX + 40, thY + 84);
        ctx.fillText('• Solution: MAC Sublayer adds PADDING (0s) to bring small payloads up to minimum 46 Bytes (Total: 64B).', b.modalX + 40, thY + 104);

        // Frame Architecture Breakdown Graphic
        const frY = b.modalY + 210;
        const frW = b.modalW - 50;

        ctx.fillStyle = '#88aacc';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.fillText('CURRENT ETHERNET FRAME STRUCTURE:', b.modalX + 25, frY + 16);

        // Box 1: Preamble & Header (14B)
        const hW = frW * 0.22;
        ctx.fillStyle = 'rgba(0, 119, 255, 0.25)';
        ctx.fillRect(b.modalX + 25, frY + 28, hW, 55);
        ctx.strokeStyle = '#0077ff';
        ctx.strokeRect(b.modalX + 25, frY + 28, hW, 55);
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('MAC HEADER', b.modalX + 25 + hW / 2, frY + 52);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('14 BYTES', b.modalX + 25 + hW / 2, frY + 70);

        // Box 2: Payload + Padding (Target: >= 46B)
        const pW = frW * 0.56;
        ctx.fillStyle = isCompliant ? 'rgba(0, 255, 136, 0.25)' : 'rgba(255, 0, 85, 0.25)';
        ctx.fillRect(b.modalX + 25 + hW, frY + 28, pW, 55);
        ctx.strokeStyle = isCompliant ? '#00ff88' : '#ff0055';
        ctx.strokeRect(b.modalX + 25 + hW, frY + 28, pW, 55);
        ctx.fillStyle = isCompliant ? '#00ff88' : '#ff0055';
        ctx.fillText(`PAYLOAD + PADDING: ${this.payloadSize} BYTES`, b.modalX + 25 + hW + pW / 2, frY + 52);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(isCompliant ? '(VALID >= 46B MIN)' : `(DEFICIT: NEED ${46 - this.payloadSize}B MORE PADDING)`, b.modalX + 25 + hW + pW / 2, frY + 70);

        // Box 3: CRC FCS (4B)
        const cW = frW * 0.22;
        ctx.fillStyle = 'rgba(255, 170, 0, 0.25)';
        ctx.fillRect(b.modalX + 25 + hW + pW, frY + 28, cW, 55);
        ctx.strokeStyle = '#ffaa00';
        ctx.strokeRect(b.modalX + 25 + hW + pW, frY + 28, cW, 55);
        ctx.fillStyle = '#ffaa00';
        ctx.fillText('CRC FCS', b.modalX + 25 + hW + pW + cW / 2, frY + 52);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('4 BYTES', b.modalX + 25 + hW + pW + cW / 2, frY + 70);

        // Total Gauge Banner
        ctx.fillStyle = isCompliant ? '#00ff88' : '#ff2255';
        ctx.font = 'bold 14px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`TOTAL FRAME SIZE: ${totalFrame} BYTES / ${this.targetMinFrame} BYTES REQUIRED`, b.modalX + b.modalW / 2, frY + 115);

        // Controls Area: Minus / Plus / Auto-Pad
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.fillText('ADJUST PAYLOAD PADDING:', b.modalX + 260, b.minusBtn.y + 22);

        // Minus Btn
        ctx.fillStyle = 'rgba(255, 170, 0, 0.2)';
        ctx.fillRect(b.minusBtn.x, b.minusBtn.y, b.minusBtn.w, b.minusBtn.h);
        ctx.strokeStyle = '#ffaa00';
        ctx.strokeRect(b.minusBtn.x, b.minusBtn.y, b.minusBtn.w, b.minusBtn.h);
        ctx.fillStyle = '#ffaa00';
        ctx.fillText('-4B', b.minusBtn.x + b.minusBtn.w / 2, b.minusBtn.y + 22);

        // Current Payload Display
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 13px "Fira Code", monospace';
        ctx.fillText(`${this.payloadSize} B`, (b.minusBtn.x + b.plusBtn.x + b.plusBtn.w) / 2 - 30, b.minusBtn.y + 23);

        // Plus Btn
        ctx.fillStyle = 'rgba(0, 255, 136, 0.2)';
        ctx.fillRect(b.plusBtn.x, b.plusBtn.y, b.plusBtn.w, b.plusBtn.h);
        ctx.strokeStyle = '#00ff88';
        ctx.strokeRect(b.plusBtn.x, b.plusBtn.y, b.plusBtn.w, b.plusBtn.h);
        ctx.fillStyle = '#00ff88';
        ctx.fillText('+4B', b.plusBtn.x + b.plusBtn.w / 2, b.plusBtn.y + 22);

        // Auto-Pad 46B Button
        ctx.fillStyle = 'rgba(0, 119, 255, 0.25)';
        ctx.fillRect(b.pad46Btn.x, b.pad46Btn.y, b.pad46Btn.w, b.pad46Btn.h);
        ctx.strokeStyle = '#0077ff';
        ctx.strokeRect(b.pad46Btn.x, b.pad46Btn.y, b.pad46Btn.w, b.pad46Btn.h);
        ctx.fillStyle = '#00e5ff';
        ctx.fillText('⚡ PAD TO 46B [P]', b.pad46Btn.x + b.pad46Btn.w / 2, b.pad46Btn.y + 22);

        // Submit Button
        ctx.fillStyle = isCompliant ? 'rgba(0, 255, 136, 0.3)' : 'rgba(100, 100, 100, 0.2)';
        ctx.fillRect(b.submitBtn.x, b.submitBtn.y, b.submitBtn.w, b.submitBtn.h);
        ctx.strokeStyle = isCompliant ? '#00ff88' : '#666666';
        ctx.lineWidth = 1.8;
        ctx.strokeRect(b.submitBtn.x, b.submitBtn.y, b.submitBtn.w, b.submitBtn.h);
        ctx.fillStyle = isCompliant ? '#00ff88' : '#888888';
        ctx.font = 'bold 12px "Fira Code", monospace';
        ctx.fillText('✓ SUBMIT 64-BYTE FRAME', b.submitBtn.x + b.submitBtn.w / 2, b.submitBtn.y + 26);

        // Feedback Bar
        const fbY = b.modalY + 512;
        ctx.fillStyle = 'rgba(4, 10, 24, 0.95)';
        ctx.fillRect(b.modalX + 25, fbY, b.modalW - 50, 32);
        ctx.strokeStyle = isCompliant ? '#00ff88' : '#ffaa00';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.modalX + 25, fbY, b.modalW - 50, 32);

        ctx.fillStyle = isCompliant ? '#00ff88' : '#ffaa00';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.fillText(this.terminalMessage, b.modalX + b.modalW / 2, fbY + 20);

        ctx.restore();
    }
}

// Global Export
const collisionBusHazardInstance = new CollisionBusHazard();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.CollisionBusHazard = collisionBusHazardInstance;
    window.CollisionBusHazard = collisionBusHazardInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CollisionBusHazard, collisionBusHazard: collisionBusHazardInstance };
}
