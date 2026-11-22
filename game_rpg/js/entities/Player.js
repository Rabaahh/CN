// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// Player.js - Unit 0xVOID (The Stray Packet) Entity & Grid Physics Model
// ==========================================================================

class Unit0xVOID {
    constructor(x = 150, y = 360) {
        // Physical Position & Velocity
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.angle = 0; // Directional heading in radians
        this.targetAngle = 0;
        this.radius = 20;

        // Kinematics & Link Medium Physics
        this.baseSpeed = 260; // Pixels/sec (governed by link bandwidth)
        this.speed = this.baseSpeed;
        this.isInFiber = false; // Boosted and immune in optical fiber conduits
        this.acceleration = 1400; // px/s^2
        this.friction = 0.88; // Cable impedance friction factor

        // Computer Networks Protocol State
        this.maxIntegrity = 100;
        this.currentIntegrity = 100;
        this.maxBuffer = 100;
        this.currentBuffer = 100; // Sliding window buffer queue
        this.bufferRechargeRate = 18; // units/sec replenishment at rest
        this.ttl = 64; // Time-to-Live (hops)
        this.packetSize = 1500; // Bytes (Standard Ethernet MTU)
        this.currentLayer = 4; // Module 4: Physical Layer

        // Action States
        this.isDashing = false;
        this.dashTimer = 0;
        this.dashDuration = 0.35; // seconds
        this.dashCooldown = 0.6;
        this.dashCooldownTimer = 0;

        // ICMP Echo Ping State
        this.isPinging = false;
        this.pingRadius = 0;
        this.maxPingRadius = 240;
        this.pingSpeed = 480; // px/sec expansion

        // World Bounds Clamping (Network Conduits Boundary)
        this.bounds = {
            minX: -1500,
            maxX: 2800,
            minY: -900,
            maxY: 1600
        };

        // Animation Timer
        this.animTimer = 0;
    }

    update(dt, input, collisionMap, particles, renderer) {
        this.animTimer += dt;

        // 1. Replenish Buffer Capacity (Sliding Window Recovery)
        if (!this.isDashing && this.currentBuffer < this.maxBuffer) {
            this.currentBuffer = Math.min(this.maxBuffer, this.currentBuffer + this.bufferRechargeRate * dt);
        }

        // 2. Process Dash / High-Throughput Burst Mode
        if (this.dashCooldownTimer > 0) this.dashCooldownTimer -= dt;

        if (this.isDashing) {
            this.dashTimer -= dt;
            if (this.dashTimer <= 0) {
                this.isDashing = false;
                this.speed = this.baseSpeed;
            } else if (particles) {
                // High-speed trailing particles during burst
                particles.emitWaveformTrail(this.x, this.y, '#ff007f', 24);
            }
        }

        // Trigger Dash on Shift key
        if (input && input.isJustPressed('shift') && this.canDash()) {
            this.dash(particles, renderer);
        }

        // 3. Process ICMP Echo Ping on Space or E key
        if (this.isPinging) {
            this.pingRadius += this.pingSpeed * dt;
            if (this.pingRadius >= this.maxPingRadius) {
                this.isPinging = false;
                this.pingRadius = 0;
            }
        }

        if (input && (input.isJustPressed(' ') || input.isJustPressed('e')) && !this.isPinging) {
            this.ping(particles);
        }

        // 4. Movement Physics & Momentum Integration
        if (input) {
            input.update();
            const ax = input.axis.x;
            const ay = input.axis.y;

            if (input.isMoving()) {
                this.vx += ax * this.acceleration * dt;
                this.vy += ay * this.acceleration * dt;

                // Update heading angle towards movement vector
                this.targetAngle = Math.atan2(ay, ax);
            }
        }

        // Apply transmission medium friction
        this.vx *= Math.pow(this.friction, dt * 60);
        this.vy *= Math.pow(this.friction, dt * 60);

        // Clamp maximum velocity
        const currentVelocity = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const speedMult = this.isInFiber ? 1.3 : 1.0;
        const maxVelocity = this.isDashing ? this.baseSpeed * 2.2 : this.baseSpeed * speedMult;
        if (currentVelocity > maxVelocity) {
            this.vx = (this.vx / currentVelocity) * maxVelocity;
            this.vy = (this.vy / currentVelocity) * maxVelocity;
        }

        // Advance position
        this.x += this.vx * dt;
        this.y += this.vy * dt;

        // Smooth angle interpolation (Canonical O(1) angle wrap without while loops)
        const angleDiff = Math.atan2(Math.sin(this.targetAngle - this.angle), Math.cos(this.targetAngle - this.angle));
        this.angle += angleDiff * 0.18;

        // 5. World Bounds Clamping
        this.x = Math.max(this.bounds.minX, Math.min(this.bounds.maxX, this.x));
        this.y = Math.max(this.bounds.minY, Math.min(this.bounds.maxY, this.y));

        // 6. Synchronize with Global GameState
        if (typeof window !== 'undefined' && window.GameState) {
            const pState = window.GameState.state.player;
            pState.x = Math.round(this.x);
            pState.y = Math.round(this.y);
            pState.currentIntegrity = Math.round(this.currentIntegrity);
            pState.currentBuffer = Math.round(this.currentBuffer);
            pState.ttl = this.ttl;
            pState.isDashing = this.isDashing;

            // Simulated dynamic bit rate calculation based on speed
            const dataRate = Math.round((currentVelocity / this.baseSpeed) * 10000000);
            window.GameState.state.telemetry.dataRateBps = Math.max(1000000, dataRate);
        }
    }

    canDash() {
        return !this.isDashing && this.dashCooldownTimer <= 0 && this.currentBuffer >= 20;
    }

    dash(particles, renderer) {
        if (!this.canDash()) return;

        this.isDashing = true;
        this.dashTimer = this.dashDuration;
        this.dashCooldownTimer = this.dashCooldown;
        this.currentBuffer -= 20; // Consume 20 buffer energy units

        // Double speed for high-throughput burst
        this.speed = this.baseSpeed * 2.2;

        if (renderer) {
            renderer.shake(8, 0.25);
        }

        if (particles) {
            particles.emitPacketDischarge(this.x, this.y, '#00ffcc', 35);
        }

        if (typeof window !== 'undefined' && window.CyberAudio) {
            window.CyberAudio.sfxDash();
        }
    }

    ping(particles) {
        this.isPinging = true;
        this.pingRadius = 10;

        if (particles) {
            particles.emitPacketDischarge(this.x, this.y, '#0077ff', 20);
        }

        if (typeof window !== 'undefined' && window.CyberAudio) {
            window.CyberAudio.sfxPing();
        }
    }

    takeDamage(amount, reason = 'Link Attenuation') {
        this.currentIntegrity = Math.max(0, this.currentIntegrity - amount);
        console.warn(`[Unit 0xVOID] Took ${amount} damage. Reason: ${reason}. Remaining HP: ${this.currentIntegrity}`);

        if (typeof window !== 'undefined' && window.CyberAudio) {
            window.CyberAudio.sfxHit();
        }

        if (typeof window !== 'undefined' && window.Renderer) {
            window.Renderer.shake(14, 0.35);
        }
        if (typeof window !== 'undefined' && window.ParticleSystem) {
            window.ParticleSystem.emitBufferOverflowSparks(this.x, this.y, 25);
        }
        if (typeof window !== 'undefined' && window.GameState) {
            window.GameState.modifyIntegrity(-amount);
        }
    }

    decrementTTL(hops = 1) {
        this.ttl = Math.max(0, this.ttl - hops);
        if (typeof window !== 'undefined' && window.GameState) {
            window.GameState.decrementTTL(hops);
        }
    }

    render(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        // 1. Render ICMP Echo Expanding Ring if active
        if (this.isPinging) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(0, 0, this.pingRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 119, 255, ${1.0 - this.pingRadius / this.maxPingRadius})`;
            ctx.lineWidth = 2.5;
            ctx.shadowColor = '#0077ff';
            ctx.shadowBlur = 12;
            ctx.stroke();

            // Inner harmonic ring
            ctx.beginPath();
            ctx.arc(0, 0, this.pingRadius * 0.65, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 255, 204, ${0.8 - (this.pingRadius / this.maxPingRadius) * 0.8})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.restore();
        }

        // 1.5 Render Cyan Optical Fiber Photon Aura if inside fiber conduit
        if (this.isInFiber) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(0, 0, this.radius * 1.6, 0, Math.PI * 2);
            ctx.strokeStyle = '#00e5ff';
            ctx.lineWidth = 2.5;
            ctx.shadowColor = '#00e5ff';
            ctx.shadowBlur = 18;
            ctx.setLineDash([6, 6]);
            ctx.lineDashOffset = -this.animTimer * 24;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(0, 0, this.radius * 1.25, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(0, 229, 255, 0.45)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.restore();
        }

        // 2. Dynamic Packet Glow & Color Shifting
        let coreColor = '#00ffcc';
        let outerColor = '#0077ff';

        if (this.isDashing) {
            coreColor = '#ffffff';
            outerColor = '#ff007f';
        } else if (this.currentIntegrity < 30) {
            coreColor = '#ff3355';
            outerColor = '#ffaa00';
        } else if (this.currentBuffer < 30) {
            coreColor = '#ffaa00';
            outerColor = '#ffd700';
        }

        const pulse = 1.0 + Math.sin(this.animTimer * 5) * 0.1;

        // 3. Directional Heading Indicator (Thrust vector)
        ctx.save();
        ctx.rotate(this.angle);

        // Trailing thrust pulse
        ctx.beginPath();
        ctx.moveTo(-this.radius * 1.5 * pulse, 0);
        ctx.lineTo(-this.radius * 0.6, -this.radius * 0.5);
        ctx.lineTo(-this.radius * 0.6, this.radius * 0.5);
        ctx.closePath();
        ctx.fillStyle = outerColor;
        ctx.shadowColor = outerColor;
        ctx.shadowBlur = 10;
        ctx.fill();

        ctx.restore();

        // 4. Outer Rotating TCP/IP Header Ring (Encapsulation Shell)
        ctx.save();
        ctx.rotate(this.animTimer * 1.2);
        ctx.strokeStyle = outerColor;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = outerColor;
        ctx.shadowBlur = 14;
        ctx.strokeRect(-this.radius * pulse, -this.radius * pulse, this.radius * 2 * pulse, this.radius * 2 * pulse);
        ctx.restore();

        // 5. Inner Payload Diamond
        ctx.save();
        ctx.rotate(-this.animTimer * 2.0);
        ctx.strokeStyle = coreColor;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = coreColor;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(0, -this.radius * 0.8 * pulse);
        ctx.lineTo(this.radius * 0.8 * pulse, 0);
        ctx.lineTo(0, this.radius * 0.8 * pulse);
        ctx.lineTo(-this.radius * 0.8 * pulse, 0);
        ctx.closePath();
        ctx.stroke();

        // Central Luminous Data Bit
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // 6. High-Contrast Entity Badge
        ctx.save();
        const badgeW = this.isInFiber ? 230 : 190;
        const badgeH = 24;
        const badgeY = -this.radius - 22;

        ctx.fillStyle = 'rgba(4, 10, 22, 0.95)';
        ctx.fillRect(-badgeW / 2, badgeY - badgeH / 2, badgeW, badgeH);
        ctx.strokeStyle = this.isInFiber ? '#00e5ff' : coreColor;
        ctx.lineWidth = 1.2;
        ctx.strokeRect(-badgeW / 2, badgeY - badgeH / 2, badgeW, badgeH);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.shadowColor = this.isInFiber ? '#00e5ff' : coreColor;
        ctx.shadowBlur = 4;
        const dashTag = this.isDashing ? ' [BURST]' : '';
        const fiberTag = this.isInFiber ? ' [FIBER IMMUNE]' : '';
        ctx.fillText(`0xVOID | TTL:${this.ttl}${dashTag}${fiberTag}`, 0, badgeY + 4);
        ctx.restore();

        ctx.restore();
    }
}

// Global Export
const playerInstance = new Unit0xVOID(150, 360);

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.Unit0xVOID = Unit0xVOID;
    window.GridEngine.Player = playerInstance;
    window.Player = playerInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Unit0xVOID, Player: playerInstance };
}
