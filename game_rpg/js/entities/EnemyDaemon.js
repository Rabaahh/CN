// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// EnemyDaemon.js - Tactical Adversary AI, State Machine & Network Daemon Classes
// Authentic Computer Networks Vulnerabilities: TCP SYN, Buffer Overflow, CRC, Dijkstra
// ==========================================================================

class EnemyDaemon {
    constructor(config = {}) {
        this.id = config.id || `daemon_${Math.floor(Math.random() * 100000)}`;
        this.type = config.type || 'SYN_FLOOD';
        this.name = config.name || 'SYN-Flood Watchdog';

        // Position and Physics
        this.x = config.x || 800;
        this.y = config.y || 360;
        this.vx = 0;
        this.vy = 0;
        this.angle = 0;
        this.radius = config.radius || 22;

        // Health & Defense
        this.maxHealth = config.maxHealth || 100;
        this.health = this.maxHealth;

        // Kinematics (Calibrated for Readable Tactical Combat & Bandwidth Propagation Delay)
        this.patrolSpeed = config.patrolSpeed || 40;
        this.chaseSpeed = config.chaseSpeed || 80;
        this.detectionRadius = config.detectionRadius || 180;
        this.attackRange = config.attackRange || 200;

        // State Machine: 'PATROL', 'ALERT', 'CHASE', 'ATTACK', 'STUNNED', 'DEFEATED'
        this.state = 'PATROL';
        this.alertTimer = 0;
        this.stateTimer = 0;
        this.attackCooldown = config.attackCooldown || 3.0;
        this.attackTimer = 0;

        // Patrol Waypoints / Conduit anchor
        this.spawnX = this.x;
        this.spawnY = this.y;
        this.patrolRadius = config.patrolRadius || 180;
        this.patrolTarget = { x: this.x, y: this.y };
        this.pickNewPatrolTarget();

        // Authentic Educational Networking Mechanics
        this.vulnerability = config.vulnerability || 'TCP_HANDSHAKE';
        this.vulnerabilityLabel = config.vulnerabilityLabel || 'VULN: 3-WAY HANDSHAKE (SYN-ACK)';
        this.themeColor = config.themeColor || '#ff0055';

        // Handshake Progression on this daemon (0: None, 1: SYN, 2: SYN-ACK, 3: ACK Detonated)
        this.handshakeStep = 0;
        this.handshakeTimer = 0;
        this.handshakeTimeout = 3.0; // Seconds to complete sequence before resetting

        // Stun & Status Effects
        this.stunTimer = 0;
        this.isLocked = false;
        this.lockedTimer = 0;

        // Visual animation
        this.animTimer = Math.random() * 10;
        this.hitFlashTimer = 0;

        this.applyTypeProfile();
    }

    applyTypeProfile() {
        switch (this.type) {
            case 'SYN_FLOOD':
                this.name = 'SYN-FLOOD WATCHDOG';
                this.maxHealth = 90;
                this.health = 90;
                this.radius = 20;
                this.patrolSpeed = 35;
                this.chaseSpeed = 75; // Slower, paced watchdog
                this.attackRange = 220;
                this.attackCooldown = 3.5;
                this.vulnerability = 'TCP_HANDSHAKE';
                this.vulnerabilityLabel = 'VULN: TCP 3-WAY HANDSHAKE';
                this.themeColor = '#ff2255';
                break;

            case 'BUFFER_OVERFLOW':
                this.name = 'BUFFER OVERFLOW HITMAN';
                this.maxHealth = 160;
                this.health = 160;
                this.radius = 28;
                this.patrolSpeed = 30;
                this.chaseSpeed = 80; // Heavy, deliberate brute charge (propagation delay)
                this.attackRange = 45; // Melee range
                this.attackCooldown = 3.0;
                this.vulnerability = 'SLIDING_WINDOW';
                this.vulnerabilityLabel = 'VULN: SLIDING WINDOW (rwnd SHIELD)';
                this.themeColor = '#ffaa00';
                break;

            case 'CORRUPT_FRAME':
                this.name = 'CORRUPT FRAME GLITCH';
                this.maxHealth = 75;
                this.health = 75;
                this.radius = 18;
                this.patrolSpeed = 45;
                this.chaseSpeed = 88;
                this.attackRange = 200;
                this.attackCooldown = 3.0;
                this.vulnerability = 'CRC_CHECKSUM';
                this.vulnerabilityLabel = 'VULN: CRC MODULO-2 / ACK BLAST';
                this.themeColor = '#cc00ff';
                break;

            case 'POISONED_ROUTER':
                this.name = 'POISONED ROUTER DRONE';
                this.maxHealth = 130;
                this.health = 130;
                this.radius = 26;
                this.patrolSpeed = 25;
                this.chaseSpeed = 50; // Slow hovering drone
                this.attackRange = 170;
                this.attackCooldown = 4.5;
                this.vulnerability = 'DIJKSTRA_SPF';
                this.vulnerabilityLabel = 'VULN: LEAST-COST DIJKSTRA RAYS';
                this.themeColor = '#00ff88';
                break;
        }
    }

    pickNewPatrolTarget() {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * this.patrolRadius;
        this.patrolTarget = {
            x: this.spawnX + Math.cos(angle) * dist,
            y: this.spawnY + Math.sin(angle) * dist
        };
    }

    update(dt, player, combatSystem, particles) {
        if (this.state === 'DEFEATED') return;

        this.animTimer += dt;
        if (this.hitFlashTimer > 0) this.hitFlashTimer -= dt;
        if (this.attackTimer > 0) this.attackTimer -= dt;

        // 1. Handshake Sequence Timer Decay
        if (this.handshakeStep > 0) {
            this.handshakeTimer -= dt;
            if (this.handshakeTimer <= 0) {
                this.handshakeStep = 0;
                if (combatSystem) {
                    combatSystem.spawnFloatingText(this.x, this.y - 30, 'HANDSHAKE TIMEOUT (RESET)', '#ff5577');
                }
            }
        }

        // 2. Stun & Lock Resolution
        if (this.stunTimer > 0) {
            this.stunTimer -= dt;
            this.vx *= 0.85;
            this.vy *= 0.85;
            this.x += this.vx * dt;
            this.y += this.vy * dt;
            if (this.stunTimer <= 0) {
                this.state = 'CHASE';
            }
            return;
        }

        if (this.lockedTimer > 0) {
            this.lockedTimer -= dt;
            this.vx = 0;
            this.vy = 0;
            if (this.lockedTimer <= 0) {
                this.isLocked = false;
            }
            return;
        }

        if (!player) return;

        // Distance and Vector to player
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // 3. State Machine Transitions
        switch (this.state) {
            case 'PATROL': {
                // If player enters detection zone, enter ALERT reaction state first
                if (dist < this.detectionRadius) {
                    this.state = 'ALERT';
                    this.alertTimer = 1.0; // 1 second reaction & threat-analysis delay
                    if (combatSystem) {
                        combatSystem.notifyAggro(this);
                        combatSystem.spawnFloatingText(this.x, this.y - 30, '⚠️ INTRUSION DETECTED!', '#ffd700');
                    }
                    break;
                }

                // Move toward patrol waypoint
                const pdx = this.patrolTarget.x - this.x;
                const pdy = this.patrolTarget.y - this.y;
                const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

                if (pdist < 20) {
                    this.pickNewPatrolTarget();
                } else {
                    const targetAngle = Math.atan2(pdy, pdx);
                    this.angle = targetAngle;
                    this.vx = Math.cos(targetAngle) * this.patrolSpeed;
                    this.vy = Math.sin(targetAngle) * this.patrolSpeed;
                    this.x += this.vx * dt;
                    this.y += this.vy * dt;
                }
                break;
            }

            case 'ALERT': {
                // Orient towards player and pause for reaction time
                this.angle = Math.atan2(dy, dx);
                this.vx *= 0.8;
                this.vy *= 0.8;
                this.alertTimer -= dt;
                if (this.alertTimer <= 0) {
                    this.state = 'CHASE';
                }
                break;
            }

            case 'CHASE': {
                // If player escaped far beyond detection radius, return to PATROL
                if (dist > this.detectionRadius * 1.5) {
                    this.state = 'PATROL';
                    this.pickNewPatrolTarget();
                    break;
                }

                this.angle = Math.atan2(dy, dx);

                // Erratic movement for Corrupt Frame Glitch
                let moveAngle = this.angle;
                if (this.type === 'CORRUPT_FRAME') {
                    moveAngle += Math.sin(this.animTimer * 12) * 0.8;
                }

                // If within attack range and attack cooldown is ready, enter ATTACK
                if (dist <= this.attackRange && this.attackTimer <= 0) {
                    this.state = 'ATTACK';
                    this.executeAttack(player, combatSystem, particles);
                } else {
                    this.vx = Math.cos(moveAngle) * this.chaseSpeed;
                    this.vy = Math.sin(moveAngle) * this.chaseSpeed;
                    this.x += this.vx * dt;
                    this.y += this.vy * dt;
                }
                break;
            }

            case 'ATTACK': {
                // Return to CHASE after cooldown set
                this.state = 'CHASE';
                break;
            }
        }
    }

    executeAttack(player, combatSystem, particles) {
        this.attackTimer = this.attackCooldown;

        if (!combatSystem) return;

        const dirX = (player.x - this.x);
        const dirY = (player.y - this.y);
        const len = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
        const normX = dirX / len;
        const normY = dirY / len;

        switch (this.type) {
            case 'SYN_FLOOD': {
                // Volley of 3 half-open SYN packets (slowed for clear visibility & blocking)
                for (let i = 0; i < 3; i++) {
                    const spread = (i - 1) * 0.16;
                    const cosS = Math.cos(spread);
                    const sinS = Math.sin(spread);
                    const vx = (normX * cosS - normY * sinS) * 140;
                    const vy = (normX * sinS + normY * cosS) * 140;

                    combatSystem.spawnEnemyProjectile({
                        x: this.x,
                        y: this.y,
                        vx: vx,
                        vy: vy,
                        damage: 8,
                        bufferDrain: 10,
                        type: 'SYN_PACKET',
                        color: '#ff2255',
                        radius: 6,
                        life: 3.5
                    });
                }
                combatSystem.spawnFloatingText(this.x, this.y - 20, 'SYN FLOOD VOLLEY!', '#ff2255');
                break;
            }

            case 'BUFFER_OVERFLOW': {
                // Charge melee bash
                const dist = Math.sqrt(dirX * dirX + dirY * dirY);
                if (dist < this.radius + player.radius + 15) {
                    // Check if player is holding Sliding Window Shield
                    if (combatSystem.isShieldActiveFacing(player, this.x, this.y)) {
                        // Blocked by rwnd!
                        combatSystem.onShieldAbsorb(this, 30);
                        this.applyStun(1.8);
                        this.vx = -normX * 100;
                        this.vy = -normY * 100;
                    } else {
                        // Direct hit!
                        player.takeDamage(18, 'Buffer Overflow Attack');
                        combatSystem.spawnFloatingText(player.x, player.y - 30, '-18 HP [OVERFLOW HIT]', '#ff3355');
                    }
                }
                break;
            }

            case 'CORRUPT_FRAME': {
                // Fires corrupted parity bits (slowed for reaction)
                combatSystem.spawnEnemyProjectile({
                    x: this.x,
                    y: this.y,
                    vx: normX * 160,
                    vy: normY * 160,
                    damage: 12,
                    bufferDrain: 6,
                    type: 'PARITY_GLITCH',
                    color: '#cc00ff',
                    radius: 7,
                    life: 2.8
                });
                break;
            }

            case 'POISONED_ROUTER': {
                // Expanding poison metric ring (RIP metric = 16)
                combatSystem.spawnEnemyAoERing({
                    x: this.x,
                    y: this.y,
                    maxRadius: 160,
                    expansionSpeed: 75,
                    damage: 15,
                    color: '#00ff88',
                    label: 'RIP POISON [METRIC=16]'
                });
                break;
            }
        }
    }

    takeDamage(amount, damageType = 'DEFAULT', combatSystem = null, particles = null) {
        if (this.state === 'DEFEATED') return;

        let multiplier = 1.0;
        let isCritical = false;

        // Educational Vulnerability Multipliers
        if (this.vulnerability === 'TCP_HANDSHAKE' && damageType === 'TCP_HANDSHAKE') {
            multiplier = 2.4;
            isCritical = true;
        } else if (this.vulnerability === 'SLIDING_WINDOW' && damageType === 'SLIDING_WINDOW') {
            multiplier = 2.2;
            isCritical = true;
        } else if (this.vulnerability === 'CRC_CHECKSUM' && damageType === 'CRC_BURST') {
            multiplier = 2.5;
            isCritical = true;
        } else if (this.vulnerability === 'DIJKSTRA_SPF' && damageType === 'DIJKSTRA_RAY') {
            multiplier = 2.2;
            isCritical = true;
        }

        const totalDamage = Math.round(amount * multiplier);
        this.health = Math.max(0, this.health - totalDamage);
        this.hitFlashTimer = 0.15;

        // Visual and Floating Combat Text
        const textTag = isCritical ? `CRIT -${totalDamage}!` : `-${totalDamage}`;
        const textColor = isCritical ? '#ffd700' : '#ffffff';
        if (combatSystem) {
            combatSystem.spawnFloatingText(this.x, this.y - 28, textTag, textColor);
        }

        // Particle sparks
        if (particles) {
            particles.emitBufferOverflowSparks(this.x, this.y, isCritical ? 24 : 12);
        }

        // Check for Defeat
        if (this.health <= 0) {
            this.defeat(combatSystem, particles);
        }
    }

    applyStun(duration = 0.8) {
        this.stunTimer = duration;
        this.state = 'STUNNED';
    }

    applyLock(duration = 1.2) {
        this.isLocked = true;
        this.lockedTimer = duration;
    }

    defeat(combatSystem, particles) {
        this.state = 'DEFEATED';

        if (particles) {
            particles.emitPacketDischarge(this.x, this.y, this.themeColor, 45);
            particles.emitBufferOverflowSparks(this.x, this.y, 30);
        }

        if (combatSystem) {
            combatSystem.spawnCombatDrops(this.x, this.y, this.type);
            combatSystem.spawnFloatingText(this.x, this.y - 35, `${this.name} PURGED!`, '#00ffcc');
            if (typeof window !== 'undefined' && window.CyberAudio) {
                window.CyberAudio.sfxAccessGranted();
            }
        }
    }

    render(ctx) {
        if (this.state === 'DEFEATED') return;

        ctx.save();
        ctx.translate(this.x, this.y);

        const pulse = 1.0 + Math.sin(this.animTimer * 5) * 0.1;
        const color = (this.hitFlashTimer > 0) ? '#ffffff' : this.themeColor;

        // 1. Stunned / Locked Indicator
        if (this.stunTimer > 0 || this.isLocked) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(0, 0, this.radius + 8 + Math.sin(this.animTimer * 10) * 4, 0, Math.PI * 2);
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 2;
            ctx.setLineDash([6, 4]);
            ctx.stroke();
            ctx.restore();
        }

        // 2. Outer Rotating Glitch Barrier
        ctx.save();
        ctx.rotate(this.animTimer * 1.5);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;

        if (this.type === 'SYN_FLOOD') {
            // Triangular interceptor
            ctx.beginPath();
            ctx.moveTo(0, -this.radius * 1.3 * pulse);
            ctx.lineTo(this.radius * 1.1 * pulse, this.radius * 0.9 * pulse);
            ctx.lineTo(-this.radius * 1.1 * pulse, this.radius * 0.9 * pulse);
            ctx.closePath();
            ctx.stroke();
        } else if (this.type === 'BUFFER_OVERFLOW') {
            // Heavy armored octagonal brute
            const r = this.radius * pulse;
            ctx.strokeRect(-r, -r, r * 2, r * 2);
        } else if (this.type === 'CORRUPT_FRAME') {
            // Jagged parity polygon
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                const a = (i * Math.PI * 2) / 5;
                const d = (i % 2 === 0) ? this.radius * 1.3 : this.radius * 0.7;
                const px = Math.cos(a) * d;
                const py = Math.sin(a) * d;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.stroke();
        } else {
            // Router ring
            ctx.beginPath();
            ctx.arc(0, 0, this.radius * pulse, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.restore();

        // 3. Inner Pulsing Core
        ctx.beginPath();
        ctx.arc(0, 0, this.radius * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // 4. Directional Heading Indicator
        ctx.save();
        ctx.rotate(this.angle);
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(this.radius + 6, 0);
        ctx.lineTo(this.radius - 2, -4);
        ctx.lineTo(this.radius - 2, 4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // 5. Health Bar Above Entity
        const barW = 60;
        const barH = 5;
        const barY = -this.radius - 20;
        const hpRatio = Math.max(0, this.health / this.maxHealth);

        // Background track
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(-barW / 2, barY, barW, barH);

        // Fill color based on health percentage
        let hpColor = '#00ff88';
        if (hpRatio < 0.35) hpColor = '#ff2255';
        else if (hpRatio < 0.7) hpColor = '#ffaa00';

        ctx.fillStyle = hpColor;
        ctx.fillRect(-barW / 2, barY, barW * hpRatio, barH);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.strokeRect(-barW / 2, barY, barW, barH);

        // 6. High-Contrast Identification & Vulnerability Badges
        const tagY = barY - 14;
        const tagW = 160;
        const tagH = 18;

        ctx.fillStyle = 'rgba(4, 10, 22, 0.94)';
        ctx.fillRect(-tagW / 2, tagY - tagH / 2, tagW, tagH);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.strokeRect(-tagW / 2, tagY - tagH / 2, tagW, tagH);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, 0, tagY + 3.5);

        // Vulnerability Pill Tag
        const vulnY = barY + 14;
        const vulW = 190;
        const vulH = 16;
        ctx.fillStyle = 'rgba(6, 12, 28, 0.94)';
        ctx.fillRect(-vulW / 2, vulnY - vulH / 2, vulW, vulH);
        ctx.strokeStyle = '#00ffcc';
        ctx.strokeRect(-vulW / 2, vulnY - vulH / 2, vulW, vulH);

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.fillText(this.vulnerabilityLabel, 0, vulnY + 3);

        // 7. Active Handshake Combo Progress Overlay
        if (this.handshakeStep > 0) {
            const stepY = vulnY + 16;
            ctx.fillStyle = '#ffd700';
            ctx.font = 'bold 10px "Fira Code", monospace';
            const stepText = (this.handshakeStep === 1) ? '[SYN=1 RECEIVED]' : '[SYN/ACK=1 LOCKED]';
            ctx.fillText(stepText, 0, stepY);
        }

        ctx.restore();
    }
}

// Global Export
if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.EnemyDaemon = EnemyDaemon;
    window.EnemyDaemon = EnemyDaemon;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EnemyDaemon };
}
