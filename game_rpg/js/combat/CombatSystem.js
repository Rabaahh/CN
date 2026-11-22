// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// CombatSystem.js - Tactical Real-Time Network Protocol Combat Engine
// Authentic Weapons: TCP 3-Way Handshake Combo, Sliding Window Shield, TCP RST Interrupt
// ==========================================================================

class CyberCombatEngine {
    constructor() {
        this.enemies = [];
        this.playerProjectiles = [];
        this.enemyProjectiles = [];
        this.aoeRings = [];
        this.combatDrops = [];
        this.floatingTexts = [];

        // Weapon States
        this.handshakeStep = 0; // 0: None, 1: SYN ready, 2: SYN-ACK ready, 3: ACK ready
        this.handshakeCooldown = 0;
        this.handshakeTarget = null;
        this.comboTimer = 0;
        this.comboTimeout = 3.2;

        // Sliding Window Shield (rwnd)
        this.isShieldActive = false;
        this.shieldRwnd = 64; // KB
        this.shieldPulse = 0;

        // RST Packet Interrupt
        this.rstCooldown = 0;
        this.rstMaxCooldown = 4.0;

        // Dynamic Combat Music Tracker
        this.inCombat = false;
        this.combatCalmTimer = 0;

        // Mouse aim coordinates
        this.aimX = 640;
        this.aimY = 360;
    }

    init() {
        this.enemies = [];
        this.playerProjectiles = [];
        this.enemyProjectiles = [];
        this.aoeRings = [];
        this.combatDrops = [];
        this.floatingTexts = [];
        this.spawnSectorSquad();
        console.log('[CombatSystem] Initialized with tactical adversary daemons.');
    }

    spawnSectorSquad() {
        // Roaming aggressive enemy mobs removed to maintain clean, focused syllabus study without text clutter
        this.enemies = [];
    }

    update(dt, player, input, particles, renderer) {
        if (!player) return;

        // Update Timers
        if (this.handshakeCooldown > 0) this.handshakeCooldown -= dt;
        if (this.rstCooldown > 0) this.rstCooldown -= dt;

        // Update Combo Sequence Timeout
        if (this.handshakeStep > 0) {
            this.comboTimer -= dt;
            if (this.comboTimer <= 0) {
                this.handshakeStep = 0;
                this.handshakeTarget = null;
                this.spawnFloatingText(player.x, player.y - 45, 'HANDSHAKE RESET', '#ff5577');
            }
        }

        // 1. Process Input for Player Arsenal
        if (input) {
            // Track aim point from input mouse coordinates
            if (renderer && input.mouse) {
                this.aimX = input.mouse.worldX || input.mouse.screenX;
                this.aimY = input.mouse.worldY || input.mouse.screenY;
            }

            // Weapon 1: Three-Way Handshake Combo (Left Click or J)
            if (input.isHandshakeAttack && input.isHandshakeAttack() && this.handshakeCooldown <= 0) {
                this.triggerHandshakeCombo(player, particles, renderer);
            }

            // Weapon 2: Sliding Window Shield (Right Click or K)
            this.isShieldActive = input.isShieldActive ? input.isShieldActive() : false;
            if (this.isShieldActive) {
                this.shieldPulse += dt * 6;
                // Drain small buffer capacity while holding shield
                player.currentBuffer = Math.max(0, player.currentBuffer - 6 * dt);
                if (player.currentBuffer <= 0) {
                    this.isShieldActive = false; // Collapse shield if out of buffer
                }
            }

            // Weapon 3: TCP RST Packet Interrupt (Q key)
            if (input.isRstInterrupt && input.isRstInterrupt() && this.rstCooldown <= 0) {
                this.triggerRstInterrupt(player, particles, renderer);
            }

            // Weapon 4: Synchronize ICMP Ping AOE shockwave with player ping
            if (player.isPinging) {
                this.processIcmpScan(player.x, player.y, player.pingRadius);
            }
        }

        // 2. Update Adversary Daemons
        let anyAggro = false;
        this.enemies.forEach(enemy => {
            enemy.update(dt, player, this, particles);
            if (enemy.state === 'CHASE' || enemy.state === 'ATTACK') {
                anyAggro = true;
            }
        });

        // 3. Dynamic Music Transition Logic
        if (anyAggro) {
            this.inCombat = true;
            this.combatCalmTimer = 3.5;
            if (typeof window !== 'undefined' && window.CyberAudio && window.CyberAudio.currentTheme !== 'COMBAT') {
                window.CyberAudio.playCombatTheme();
            }
        } else if (this.inCombat) {
            this.combatCalmTimer -= dt;
            if (this.combatCalmTimer <= 0) {
                this.inCombat = false;
                if (typeof window !== 'undefined' && window.CyberAudio && window.CyberAudio.currentTheme === 'COMBAT') {
                    window.CyberAudio.playExplorationTheme();
                }
            }
        }

        // 4. Update Player Projectiles
        for (let i = this.playerProjectiles.length - 1; i >= 0; i--) {
            const p = this.playerProjectiles[i];
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.life -= dt;

            // Homing logic for SYN Probe
            if (p.isHoming && p.target && p.target.state !== 'DEFEATED') {
                const hdx = p.target.x - p.x;
                const hdy = p.target.y - p.y;
                const hdist = Math.sqrt(hdx * hdx + hdy * hdy) || 1;
                const speed = 480;
                p.vx = (hdx / hdist) * speed;
                p.vy = (hdy / hdist) * speed;
            }

            // Check collision with enemies
            let hit = false;
            for (let j = 0; j < this.enemies.length; j++) {
                const enemy = this.enemies[j];
                if (enemy.state === 'DEFEATED') continue;

                const edx = enemy.x - p.x;
                const edy = enemy.y - p.y;
                const edist = Math.sqrt(edx * edx + edy * edy);

                if (edist <= enemy.radius + p.radius) {
                    hit = true;
                    this.applyPlayerProjectileHit(p, enemy, particles, renderer);
                    break;
                }
            }

            if (hit || p.life <= 0) {
                this.playerProjectiles.splice(i, 1);
            }
        }

        // 5. Update Enemy Projectiles
        for (let i = this.enemyProjectiles.length - 1; i >= 0; i--) {
            const ep = this.enemyProjectiles[i];
            ep.x += ep.vx * dt;
            ep.y += ep.vy * dt;
            ep.life -= dt;

            // Check collision with Player or Shield
            const pdx = player.x - ep.x;
            const pdy = player.y - ep.y;
            const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

            let consumed = false;

            // Shield collision check
            if (this.isShieldActive && pdist < player.radius + 38) {
                // Absorbed by Sliding Window Shield!
                consumed = true;
                this.onShieldAbsorb(ep, 14);
            } else if (pdist <= player.radius + ep.radius) {
                // Direct Hit on Player
                consumed = true;
                player.takeDamage(ep.damage, `Hit by ${ep.type}`);
                if (ep.bufferDrain) {
                    player.currentBuffer = Math.max(0, player.currentBuffer - ep.bufferDrain);
                }
                this.spawnFloatingText(player.x, player.y - 25, `-${ep.damage} HP`, '#ff2255');
            }

            if (consumed || ep.life <= 0) {
                this.enemyProjectiles.splice(i, 1);
            }
        }

        // 6. Update AOE Poison Rings
        for (let i = this.aoeRings.length - 1; i >= 0; i--) {
            const ring = this.aoeRings[i];
            ring.currentRadius += ring.expansionSpeed * dt;

            // Check collision with player
            const rdx = player.x - ring.x;
            const rdy = player.y - ring.y;
            const rdist = Math.sqrt(rdx * rdx + rdy * rdy);

            if (Math.abs(rdist - ring.currentRadius) < 18 && !ring.hasHitPlayer) {
                ring.hasHitPlayer = true;
                if (this.isShieldActive) {
                    this.onShieldAbsorb(ring, 18);
                } else {
                    player.takeDamage(ring.damage, ring.label);
                    this.spawnFloatingText(player.x, player.y - 28, `-${ring.damage} HP [RIP POISON]`, '#00ff88');
                }
            }

            if (ring.currentRadius >= ring.maxRadius) {
                this.aoeRings.splice(i, 1);
            }
        }

        // 7. Update Combat Reward Drops
        for (let i = this.combatDrops.length - 1; i >= 0; i--) {
            const drop = this.combatDrops[i];
            drop.life -= dt;
            drop.pulse += dt * 4;

            // Magnetic attraction to player
            const ddx = player.x - drop.x;
            const ddy = player.y - drop.y;
            const ddist = Math.sqrt(ddx * ddx + ddy * ddy);

            if (ddist < 140) {
                const pullSpeed = 220;
                drop.x += (ddx / ddist) * pullSpeed * dt;
                drop.y += (ddy / ddist) * pullSpeed * dt;
            }

            // Pickup trigger
            if (ddist < player.radius + drop.radius) {
                this.collectCombatDrop(drop, player);
                this.combatDrops.splice(i, 1);
                continue;
            }

            if (drop.life <= 0) {
                this.combatDrops.splice(i, 1);
            }
        }

        // 8. Update Floating Combat Text
        for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
            const ft = this.floatingTexts[i];
            ft.y += ft.vy * dt;
            ft.life -= dt;
            if (ft.life <= 0) {
                this.floatingTexts.splice(i, 1);
            }
        }
    }

    // ======================================================================
    // Player Weapons Implementation
    // ======================================================================

    // Weapon 1: Three-Way Handshake Combo (SYN -> SYN/ACK -> ACK)
    triggerHandshakeCombo(player, particles, renderer) {
        const dx = this.aimX - player.x;
        const dy = this.aimY - player.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const dirX = dx / dist;
        const dirY = dy / dist;

        // Advance handshake step
        this.handshakeStep++;
        this.comboTimer = this.comboTimeout;

        if (this.handshakeStep === 1) {
            // STEP 1: [SYN] Fast homing synchronization probe
            this.handshakeCooldown = 0.28;
            const target = this.findNearestEnemy(this.aimX, this.aimY);
            this.handshakeTarget = target;

            this.playerProjectiles.push({
                x: player.x,
                y: player.y,
                vx: dirX * 460,
                vy: dirY * 460,
                radius: 8,
                damage: 28,
                step: 1,
                isHoming: !!target,
                target: target,
                color: '#00ffcc',
                life: 1.8,
                label: 'SYN [SEQ=100]'
            });

            this.spawnFloatingText(player.x, player.y - 30, 'STEP 1: SYN [SEQ=100]', '#00ffcc');
            if (typeof window !== 'undefined' && window.CyberAudio) {
                window.CyberAudio.sfxPing();
            }

        } else if (this.handshakeStep === 2) {
            // STEP 2: [SYN+ACK] Piercing laser beam that locks target
            this.handshakeCooldown = 0.32;

            this.playerProjectiles.push({
                x: player.x,
                y: player.y,
                vx: dirX * 620,
                vy: dirY * 620,
                radius: 12,
                damage: 42,
                step: 2,
                color: '#ff007f',
                life: 1.4,
                label: 'SYN/ACK [ACK=101]'
            });

            this.spawnFloatingText(player.x, player.y - 30, 'STEP 2: SYN/ACK [ACK=101]', '#ff007f');
            if (typeof window !== 'undefined' && window.CyberAudio) {
                window.CyberAudio.sfxLaser();
            }

        } else {
            // STEP 3: [ACK] Critical detonation! Connection established!
            this.handshakeCooldown = 0.65;
            this.handshakeStep = 0; // Reset sequence

            this.playerProjectiles.push({
                x: player.x,
                y: player.y,
                vx: dirX * 520,
                vy: dirY * 520,
                radius: 18,
                damage: 85,
                step: 3,
                color: '#ffffff',
                life: 1.2,
                label: 'ACK [ESTABLISHED]'
            });

            this.spawnFloatingText(player.x, player.y - 32, 'STEP 3: ACK [ESTABLISHED]!!', '#ffd700');
            if (renderer) renderer.shake(10, 0.3);
            if (typeof window !== 'undefined' && window.CyberAudio) {
                window.CyberAudio.sfxBossRoar();
            }
        }
    }

    applyPlayerProjectileHit(projectile, enemy, particles, renderer) {
        let dmgType = 'DEFAULT';
        if (projectile.step === 1) {
            dmgType = 'TCP_HANDSHAKE';
            enemy.handshakeStep = 1;
            enemy.handshakeTimer = enemy.handshakeTimeout;
            enemy.applyStun(0.5);
        } else if (projectile.step === 2) {
            dmgType = 'TCP_HANDSHAKE';
            enemy.handshakeStep = 2;
            enemy.handshakeTimer = enemy.handshakeTimeout;
            enemy.applyLock(1.2);
        } else if (projectile.step === 3) {
            dmgType = 'TCP_HANDSHAKE';
            enemy.handshakeStep = 0;
            if (renderer) renderer.shake(14, 0.35);
            if (particles) particles.emitPacketDischarge(enemy.x, enemy.y, '#ffffff', 40);
        }

        enemy.takeDamage(projectile.damage, dmgType, this, particles);
    }

    // Weapon 3: TCP RST Packet Interrupt (Emergency Escape)
    triggerRstInterrupt(player, particles, renderer) {
        if (player.currentBuffer < 25) {
            this.spawnFloatingText(player.x, player.y - 30, 'BUFFER INSUFFICIENT FOR RST (NEED 25)', '#ffaa00');
            return;
        }

        player.currentBuffer -= 25;
        this.rstCooldown = this.rstMaxCooldown;

        const aoeRadius = 320;
        if (renderer) renderer.shake(12, 0.3);
        if (particles) particles.emitPacketDischarge(player.x, player.y, '#ff0055', 50);

        // Cancel all enemy projectiles in radius
        let cancelledCount = 0;
        for (let i = this.enemyProjectiles.length - 1; i >= 0; i--) {
            const ep = this.enemyProjectiles[i];
            const dist = Math.hypot(ep.x - player.x, ep.y - player.y);
            if (dist <= aoeRadius) {
                this.enemyProjectiles.splice(i, 1);
                cancelledCount++;
            }
        }

        // Cancel active AOE rings
        this.aoeRings = [];

        // Knockback and abort enemy attacks
        this.enemies.forEach(enemy => {
            if (enemy.state === 'DEFEATED') return;
            const dist = Math.hypot(enemy.x - player.x, enemy.y - player.y);
            if (dist <= aoeRadius) {
                const angle = Math.atan2(enemy.y - player.y, enemy.x - player.x);
                enemy.vx = Math.cos(angle) * 350;
                enemy.vy = Math.sin(angle) * 350;
                enemy.applyStun(1.5);
                enemy.takeDamage(35, 'TCP_RST', this, particles);
            }
        });

        this.spawnFloatingText(player.x, player.y - 45, `TCP RST INTERRUPT [ABORTED ${cancelledCount} PACKETS]`, '#ff0055');
        if (typeof window !== 'undefined' && window.CyberAudio) {
            window.CyberAudio.sfxAccessDenied();
        }
    }

    // Weapon 4: ICMP Echo Scanning AOE
    processIcmpScan(px, py, radius) {
        this.enemies.forEach(enemy => {
            if (enemy.state === 'DEFEATED') return;
            const dist = Math.hypot(enemy.x - px, enemy.y - py);
            if (Math.abs(dist - radius) < 20) {
                // Reveal & micro-stun
                if (enemy.stunTimer <= 0) {
                    enemy.applyStun(0.35);
                    this.spawnFloatingText(enemy.x, enemy.y - 35, `${enemy.vulnerabilityLabel}`, '#00ffcc');
                }
            }
        });
    }

    // Sliding Window Shield Absorption Event
    onShieldAbsorb(source, bufferReward = 15) {
        const player = window.Player;
        if (player) {
            player.currentBuffer = Math.min(player.maxBuffer, player.currentBuffer + bufferReward);
        }
        this.spawnFloatingText(source.x, source.y - 20, `+${bufferReward} BUFFER [rwnd ABSORBED]`, '#00e5ff');
        if (typeof window !== 'undefined' && window.CyberAudio) {
            window.CyberAudio.sfxPing();
        }
    }

    isShieldActiveFacing(player, targetX, targetY) {
        if (!this.isShieldActive) return false;
        // Check if target is roughly in front of player's heading
        const toTargetAngle = Math.atan2(targetY - player.y, targetX - player.x);
        const diff = Math.abs(Math.atan2(Math.sin(toTargetAngle - player.angle), Math.cos(toTargetAngle - player.angle)));
        return diff < Math.PI * 0.55;
    }

    notifyAggro(enemy) {
        this.inCombat = true;
        this.combatCalmTimer = 3.5;
        if (typeof window !== 'undefined' && window.CyberAudio && window.CyberAudio.currentTheme !== 'COMBAT') {
            window.CyberAudio.playCombatTheme();
        }
    }

    findNearestEnemy(x, y) {
        let bestDist = 450;
        let bestEnemy = null;
        this.enemies.forEach(e => {
            if (e.state === 'DEFEATED') return;
            const dist = Math.hypot(e.x - x, e.y - y);
            if (dist < bestDist) {
                bestDist = dist;
                bestEnemy = e;
            }
        });
        return bestEnemy;
    }

    // ======================================================================
    // Projectile & Combat Event Spawners
    // ======================================================================
    spawnEnemyProjectile(proj) {
        this.enemyProjectiles.push(proj);
    }

    spawnEnemyAoERing(ring) {
        ring.currentRadius = 10;
        ring.hasHitPlayer = false;
        this.aoeRings.push(ring);
    }

    spawnCombatDrops(x, y, enemyType) {
        // Drop collectible items
        this.combatDrops.push({
            x: x + (Math.random() * 20 - 10),
            y: y + (Math.random() * 20 - 10),
            type: 'DATA_FRAGMENT',
            radius: 9,
            life: 14,
            pulse: 0,
            value: 15,
            color: '#00ffcc',
            label: '+15 DATA'
        });

        // Chance of Health Restore or Buffer Boost
        if (Math.random() < 0.6) {
            this.combatDrops.push({
                x: x + (Math.random() * 30 - 15),
                y: y + (Math.random() * 30 - 15),
                type: 'INTEGRITY_PACK',
                radius: 10,
                life: 14,
                pulse: 0,
                value: 25,
                color: '#ff007f',
                label: '+25 HP'
            });
        }
    }

    collectCombatDrop(drop, player) {
        if (drop.type === 'DATA_FRAGMENT') {
            if (typeof window !== 'undefined' && window.GameState) {
                if (typeof window.GameState.addMarks === 'function') {
                    window.GameState.addMarks(1);
                } else if (typeof window.GameState.awardExamMarks === 'function') {
                    window.GameState.awardExamMarks(1);
                }
            }
            this.spawnFloatingText(player.x, player.y - 25, '+1 MARK [DATA FRAGMENT]', '#00ffcc');
        } else if (drop.type === 'INTEGRITY_PACK') {
            player.currentIntegrity = Math.min(player.maxIntegrity, player.currentIntegrity + drop.value);
            this.spawnFloatingText(player.x, player.y - 25, `+${drop.value} HP [BUFFER HEALED]`, '#ff007f');
        }

        if (typeof window !== 'undefined' && window.CyberAudio) {
            window.CyberAudio.sfxPacketRoute();
        }
    }

    spawnFloatingText(x, y, text, color = '#ffffff') {
        this.floatingTexts.push({
            x: x,
            y: y,
            text: text,
            color: color,
            life: 1.2,
            maxLife: 1.2,
            vy: -35
        });
    }

    // ======================================================================
    // Render Combat Pipeline
    // ======================================================================
    render(ctx) {
        // 1. Render AOE Poison Rings
        this.aoeRings.forEach(ring => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(ring.x, ring.y, ring.currentRadius, 0, Math.PI * 2);
            ctx.strokeStyle = ring.color;
            ctx.lineWidth = 3;
            ctx.shadowColor = ring.color;
            ctx.shadowBlur = 12;
            ctx.stroke();

            // Label on edge
            ctx.fillStyle = ring.color;
            ctx.font = 'bold 10px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(ring.label, ring.x, ring.y - ring.currentRadius - 6);
            ctx.restore();
        });

        // 2. Render Combat Reward Drops
        this.combatDrops.forEach(drop => {
            ctx.save();
            ctx.translate(drop.x, drop.y);
            const p = 1.0 + Math.sin(drop.pulse) * 0.18;

            ctx.strokeStyle = drop.color;
            ctx.lineWidth = 2;
            ctx.shadowColor = drop.color;
            ctx.shadowBlur = 10;

            // Rotating data diamond
            ctx.rotate(drop.pulse * 0.8);
            ctx.strokeRect(-drop.radius * p, -drop.radius * p, drop.radius * 2 * p, drop.radius * 2 * p);

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(0, 0, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        // 3. Render Enemies
        this.enemies.forEach(enemy => enemy.render(ctx));

        // 4. Render Player Projectiles
        this.playerProjectiles.forEach(p => {
            ctx.save();
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 12;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();

            // Subtle tracer tail
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - p.vx * 0.04, p.y - p.vy * 0.04);
            ctx.stroke();
            ctx.restore();
        });

        // 5. Render Enemy Projectiles
        this.enemyProjectiles.forEach(ep => {
            ctx.save();
            ctx.fillStyle = ep.color;
            ctx.shadowColor = ep.color;
            ctx.shadowBlur = 10;

            ctx.beginPath();
            ctx.arc(ep.x, ep.y, ep.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        // 6. Render Sliding Window Shield (rwnd)
        if (this.isShieldActive && window.Player) {
            const player = window.Player;
            ctx.save();
            ctx.translate(player.x, player.y);
            ctx.rotate(player.angle);

            const shieldW = 20;
            const shieldH = 68 + Math.sin(this.shieldPulse) * 6;
            const shieldDist = 32;

            // Neon glowing forcefield arc
            ctx.fillStyle = 'rgba(0, 229, 255, 0.22)';
            ctx.strokeStyle = '#00e5ff';
            ctx.lineWidth = 3;
            ctx.shadowColor = '#00e5ff';
            ctx.shadowBlur = 16;

            ctx.beginPath();
            ctx.ellipse(shieldDist, 0, shieldW, shieldH / 2, 0, -Math.PI / 2, Math.PI / 2);
            ctx.stroke();
            ctx.fill();

            // rwnd Capacity Label
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 9px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`rwnd:${this.shieldRwnd}KB`, shieldDist + 18, 4);

            ctx.restore();
        }

        // 7. Render Floating Combat Text
        this.floatingTexts.forEach(ft => {
            ctx.save();
            const alpha = Math.max(0, ft.life / ft.maxLife);
            ctx.fillStyle = ft.color;
            ctx.font = 'bold 12px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.shadowColor = ft.color;
            ctx.shadowBlur = 6;
            ctx.globalAlpha = alpha;
            ctx.fillText(ft.text, ft.x, ft.y);
            ctx.restore();
        });
    }
}

// Global Export Singleton
const combatInstance = new CyberCombatEngine();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.CombatSystem = combatInstance;
    window.CombatSystem = combatInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CyberCombatEngine, CombatSystem: combatInstance };
}
