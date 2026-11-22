// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// Sector1_Physical.js - Sector 1: Physical Layer Substratum World Map
// KTU Module 4: Transmission Media (Twisted Pair, Coax, Fiber), Attenuation & Repeaters
// ==========================================================================

class Sector1_Physical {
    constructor() {
        this.sectorId = 1;
        this.name = 'Physical Substratum';
        this.moduleName = 'Module 4: Physical Layer';

        // Conduits Layout (Transmission Pathways)
        this.conduits = [
            // 1. Initial Twisted Pair (Cat 6 UTP Copper): 100 -> 560, y: 360
            {
                id: 'c_twisted_start',
                type: 'TWISTED_PAIR',
                name: 'UTP Category 6 Conduit (Amber Copper)',
                x1: 100, y1: 360, x2: 560, y2: 360,
                color: '#ffaa00',
                glowColor: 'rgba(255, 170, 0, 0.4)',
                width: 14,
                hasAttenuation: true,
                attenuationStart: 260,
                attenuationEnd: 480,
                isFiber: false
            },
            // 2. Fork Branch A: Upper Copper Conduit (Unshielded Twisted Pair with Noise Arcs):
            // Curves from (560, 360) -> (640, 220) -> (960, 220) -> (1040, 360)
            {
                id: 'c_copper_lead_in',
                type: 'TWISTED_PAIR',
                name: 'Copper Link Upward',
                x1: 560, y1: 360, x2: 640, y2: 220,
                color: '#ffaa00',
                glowColor: 'rgba(255, 170, 0, 0.4)',
                width: 14,
                isFiber: false
            },
            {
                id: 'c_copper_upper_bus',
                type: 'TWISTED_PAIR',
                name: 'Unshielded Twisted Pair (Vulnerable to Noise Arcs)',
                x1: 640, y1: 220, x2: 960, y2: 220,
                color: '#ffaa00',
                glowColor: 'rgba(255, 170, 0, 0.4)',
                width: 14,
                hasNoiseTraps: true,
                isFiber: false
            },
            {
                id: 'c_copper_lead_out',
                type: 'TWISTED_PAIR',
                name: 'Copper Reconnect Downward',
                x1: 960, y1: 220, x2: 1040, y2: 360,
                color: '#ffaa00',
                glowColor: 'rgba(255, 170, 0, 0.4)',
                width: 14,
                isFiber: false
            },
            // 3. Fork Branch B: Lower Optical Fiber Bypass Conduit (Immune to EMI Noise):
            // Curves from (560, 360) -> (640, 480) -> (960, 480) -> (1040, 360)
            {
                id: 'c_fiber_lead_in',
                type: 'FIBER_OPTIC',
                name: 'Optical Fiber Incline',
                x1: 560, y1: 360, x2: 640, y2: 480,
                color: '#00e5ff',
                glowColor: 'rgba(0, 229, 255, 0.65)',
                width: 16,
                isFiber: true
            },
            {
                id: 'c_fiber_bypass_bus',
                type: 'FIBER_OPTIC',
                name: 'Single-Mode Optical Fiber Bypass (Total Internal Reflection)',
                x1: 640, y1: 480, x2: 960, y2: 480,
                color: '#00e5ff',
                glowColor: 'rgba(0, 229, 255, 0.65)',
                width: 16,
                isFiber: true
            },
            {
                id: 'c_fiber_lead_out',
                type: 'FIBER_OPTIC',
                name: 'Optical Fiber Reconnect',
                x1: 960, y1: 480, x2: 1040, y2: 360,
                color: '#00e5ff',
                glowColor: 'rgba(0, 229, 255, 0.65)',
                width: 16,
                isFiber: true
            },
            // 4. Final Gateway Trunk to Sector 2 Bulkhead: 1040 -> 1320, y: 360
            {
                id: 'c_gateway_bus',
                type: 'TWISTED_PAIR',
                name: 'Shielded Twisted Pair (STP) to Sector 2 Gate',
                x1: 1040, y1: 360, x2: 1320, y2: 360,
                color: '#ffaa00',
                glowColor: 'rgba(255, 170, 0, 0.4)',
                width: 16,
                isFiber: false
            },
            // 5. Bandpass Carrier Modulation Conduit: 1320 -> 1550, y: 360
            {
                id: 'c_bandpass_bus',
                type: 'BANDPASS_CONDUIT',
                name: 'High-Frequency Bandpass Conduit (Carrier Modulated)',
                x1: 1320, y1: 360, x2: 1550, y2: 360,
                color: '#9900ff',
                glowColor: 'rgba(153, 0, 255, 0.5)',
                width: 16,
                isFiber: false
            },
            // 6. Hyper-Capacity Backbone Link: 1550 -> 1860, y: 360
            {
                id: 'c_capacity_backbone',
                type: 'CAPACITY_BACKBONE',
                name: 'Hyper-Capacity Backbone (Nyquist/Shannon Bound)',
                x1: 1550, y1: 360, x2: 1860, y2: 360,
                color: '#0066ff',
                glowColor: 'rgba(0, 102, 255, 0.5)',
                width: 18,
                isFiber: false
            }
        ];

        // Regenerative Repeaters (Rebuild pristine digital square wave pulses!)
        this.repeaters = [
            {
                id: 'rep_1',
                name: 'REGENERATIVE REPEATER ALPHA',
                x: 560,
                y: 360,
                radius: 36,
                pulseTimer: 0,
                cooldown: 0,
                label: 'DIGITAL REGENERATOR [PULSE REBUILD]'
            },
            {
                id: 'rep_2',
                name: 'REGENERATIVE REPEATER BETA',
                x: 1040,
                y: 360,
                radius: 36,
                pulseTimer: 0,
                cooldown: 0,
                label: 'DIGITAL REGENERATOR [RECONVERGENCE NODE]'
            }
        ];

        // Hazard 1: Attenuation Zones (High dB signal loss fog)
        this.attenuationZones = [
            {
                x: 260,
                y: 290,
                width: 220,
                height: 140,
                lossDbPerKm: 4.8,
                name: 'HIGH ATTENUATION FOG (-4.8 dB/km)'
            }
        ];

        // Hazard 2: Thermal & Impulse Noise Traps (Stationed on the Upper Copper Route!)
        this.noiseTraps = [
            {
                id: 'noise_arc_1',
                x: 740,
                y: 220,
                radius: 36,
                arcTimer: 0,
                arcInterval: 2.0,
                isActive: false,
                duration: 0.8,
                name: 'IMPULSE NOISE ARC ALPHA'
            },
            {
                id: 'noise_arc_2',
                x: 880,
                y: 220,
                radius: 36,
                arcTimer: 1.0,
                arcInterval: 2.2,
                isActive: false,
                duration: 0.8,
                name: 'THERMAL NOISE SPIKE BETA'
            }
        ];

        // Security Bulkhead: Physical Transmission Gate (Locked)
        this.bulkhead = {
            x: 1320,
            y: 360,
            width: 32,
            height: 130,
            isUnlocked: false,
            interactionRadius: 90,
            name: 'GATEWAY TO SECTOR 2: DATA LINK MATRIX',
            requirement: 'LINE CODING OSCILLOSCOPE CALIBRATION'
        };

        // Carrier Modulation Console (Interactive Node at X: 1450, Y: 360)
        this.modulationConsole = {
            x: 1450,
            y: 360,
            radius: 34,
            interactionRadius: 85,
            name: 'CARRIER MODULATION CONSOLE',
            label: 'ASK / FSK / PSK SYNTHESIZER [KTU Q15a]'
        };

        // Sector 2 Transit Elevator (Terminal Node at X: 1840, Y: 360)
        this.elevator = {
            x: 1840,
            y: 360,
            width: 44,
            height: 120,
            interactionRadius: 85,
            name: 'TRANSIT ELEVATOR TO SECTOR 2: DATA LINK LAYER'
        };

        // Telemetry warning banner state
        this.warningTimer = 0;
        this.warningText = '';

        // Fiber state tracking
        this.wasInFiber = false;

        // Animation Timer
        this.animTimer = 0;
    }

    update(dt, player, particles, combatSystem) {
        if (!player) return;

        this.animTimer += dt;
        if (this.warningTimer > 0) this.warningTimer -= dt;

        // 1. Process Repeaters
        this.repeaters.forEach(rep => {
            rep.pulseTimer += dt * 3;
            if (rep.cooldown > 0) rep.cooldown -= dt;

            const dist = Math.hypot(player.x - rep.x, player.y - rep.y);
            if (dist < rep.radius + player.radius && rep.cooldown <= 0) {
                // Step on Regenerative Repeater!
                rep.cooldown = 2.0; // Cooldown before reactivating
                player.currentIntegrity = player.maxIntegrity;
                player.currentBuffer = player.maxBuffer;

                if (particles) {
                    particles.emitPacketDischarge(rep.x, rep.y, '#00ffcc', 40);
                }

                if (combatSystem) {
                    combatSystem.spawnFloatingText(rep.x, rep.y - 45, 'REGENERATED! 100% CLEAN SQUARE WAVE', '#00ffcc');
                }

                if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxAccessGranted === 'function') {
                    window.CyberAudio.sfxAccessGranted();
                }
            }
        });

        // 2. Check if Player is Traveling Through the Optical Fiber Bypass
        const inFiber = this.isPlayerInFiberConduit(player.x, player.y);
        player.isInFiber = inFiber;

        if (inFiber && !this.wasInFiber) {
            if (combatSystem) {
                combatSystem.spawnFloatingText(player.x, player.y - 45, '✦ OPTICAL FIBER LINK ACTIVE: 100% EMI IMMUNITY!', '#00e5ff');
            }
            if (typeof window !== 'undefined' && window.CyberAudio) {
                if (typeof window.CyberAudio.sfxPing === 'function') {
                    window.CyberAudio.sfxPing();
                } else if (typeof window.CyberAudio.sfxIcmpPing === 'function') {
                    window.CyberAudio.sfxIcmpPing();
                }
            }
        }
        this.wasInFiber = inFiber;

        if (inFiber && particles && Math.random() < 0.25) {
            particles.emitWaveformTrail(player.x, player.y, '#00e5ff', 12);
        }

        // 3. Process Attenuation Zones (Hazard 1)
        for (let i = 0; i < this.attenuationZones.length; i++) {
            const zone = this.attenuationZones[i];
            if (
                player.x >= zone.x &&
                player.x <= zone.x + zone.width &&
                player.y >= zone.y &&
                player.y <= zone.y + zone.height
            ) {
                // Signal attenuation degrades integrity over distance
                const drainRate = 5.0; // 5 HP/sec
                player.currentIntegrity = Math.max(1, player.currentIntegrity - drainRate * dt);

                if (Math.random() < 0.18 && particles) {
                    particles.emitBufferOverflowSparks(player.x, player.y, 2);
                }

                this.warningText = `⚠️ SIGNAL ATTENUATION (${zone.lossDbPerKm} dB LOSS) // REGENERATE AT REPEATER!`;
                this.warningTimer = 0.3;
                break;
            }
        }

        // 4. Process Thermal & Impulse Noise Traps (Stationed on Upper Copper Route)
        this.noiseTraps.forEach(trap => {
            trap.arcTimer += dt;
            if (trap.arcTimer >= trap.arcInterval) {
                trap.isActive = true;
                if (trap.arcTimer >= trap.arcInterval + trap.duration) {
                    trap.arcTimer = 0;
                    trap.isActive = false;
                }
            }

            if (trap.isActive) {
                const dist = Math.hypot(player.x - trap.x, player.y - trap.y);
                if (dist <= trap.radius + player.radius) {
                    if (inFiber) {
                        // Optical Fiber is 100% immune to EMI Noise!
                        if (Math.random() < 0.08 && combatSystem) {
                            combatSystem.spawnFloatingText(player.x, player.y - 35, '✦ FIBER IMMUNE TO EMI NOISE!', '#00e5ff');
                        }
                    } else {
                        // Unshielded copper hit by impulse noise!
                        player.takeDamage(10, 'Impulse Noise EMI Spike');
                        player.currentBuffer = Math.max(0, player.currentBuffer - 15);
                        if (combatSystem) {
                            combatSystem.spawnFloatingText(player.x, player.y - 25, '-10 HP [IMPULSE NOISE]', '#ffaa00');
                        }
                        if (particles) {
                            particles.emitBufferOverflowSparks(trap.x, trap.y, 16);
                        }
                        this.warningText = '⚠️ STRUCK BY EMI NOISE ON COPPER WIRE! TAKE CYAN FIBER BYPASS!';
                        this.warningTimer = 1.0;
                    }
                }
            }
        });

        // 5. Bulkhead gate physical barrier collision
        if (!this.bulkhead.isUnlocked && player && player.x >= this.bulkhead.x - 20 && player.x <= this.bulkhead.x + 30) {
            player.x = this.bulkhead.x - 20;
            player.vx = 0;
        }
    }

    isPlayerInFiberConduit(px, py) {
        // Lower optical fiber bypass conduit runs along lower arc: x in [560..1040], y in [400..560]
        return (px >= 560 && px <= 1040 && py >= 400 && py <= 560);
    }

    isPlayerInCopperConduit(px, py) {
        // Upper copper conduit runs along upper arc: x in [560..1040], y in [160..320]
        return (px >= 560 && px <= 1040 && py >= 160 && py <= 320);
    }

    isNearBulkhead(px, py) {
        return Math.hypot(px - this.bulkhead.x, py - this.bulkhead.y) <= this.bulkhead.interactionRadius;
    }

    isNearModulationConsole(px, py) {
        return Math.hypot(px - this.modulationConsole.x, py - this.modulationConsole.y) <= this.modulationConsole.interactionRadius;
    }

    isNearElevator(px, py) {
        return Math.hypot(px - this.elevator.x, py - this.elevator.y) <= this.elevator.interactionRadius;
    }

    unlockBulkhead() {
        this.bulkhead.isUnlocked = true;
        console.log('[Sector 1] Transmission Bulkhead unlocked!');
    }

    // ======================================================================
    // Render World Map
    // ======================================================================
    render(ctx) {
        const anim = this.animTimer;

        // 1. Render Transmission Conduits (Cables)
        this.conduits.forEach(c => {
            ctx.save();

            // Outer Shield / Glow
            ctx.beginPath();
            ctx.moveTo(c.x1, c.y1);
            ctx.lineTo(c.x2, c.y2);
            ctx.strokeStyle = c.glowColor;
            ctx.lineWidth = c.width + 12;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Inner Core Line
            ctx.beginPath();
            ctx.moveTo(c.x1, c.y1);
            ctx.lineTo(c.x2, c.y2);
            ctx.strokeStyle = c.color;
            ctx.lineWidth = c.width;
            ctx.shadowColor = c.color;
            ctx.shadowBlur = c.isFiber ? 18 : 8;
            ctx.stroke();

            // High-Tech Cable Striping / Optical Reflection Patterns
            if (c.isFiber) {
                // Optical Core pulse waves (Total Internal Reflection simulation)
                ctx.setLineDash([20, 28]);
                ctx.lineDashOffset = -anim * 100;
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 3.5;
                ctx.beginPath();
                ctx.moveTo(c.x1, c.y1);
                ctx.lineTo(c.x2, c.y2);
                ctx.stroke();
            } else if (c.type === 'COAXIAL') {
                ctx.setLineDash([8, 12]);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(c.x1, c.y1);
                ctx.lineTo(c.x2, c.y2);
                ctx.stroke();
            }

            ctx.restore();
        });

        // 2. Render Attenuation Fog Zones
        this.attenuationZones.forEach(zone => {
            ctx.save();
            const pulse = 0.12 + Math.sin(anim * 3) * 0.05;
            ctx.fillStyle = `rgba(255, 170, 0, ${pulse})`;
            ctx.fillRect(zone.x, zone.y, zone.width, zone.height);

            // Warning Dashed Boundary
            ctx.strokeStyle = 'rgba(255, 170, 0, 0.45)';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([8, 6]);
            ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);

            // Zone Name Badge
            ctx.fillStyle = '#ffaa00';
            ctx.font = 'bold 10px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(zone.name, zone.x + zone.width / 2, zone.y + 18);
            ctx.restore();
        });

        // 3. Render Sleek Minimalist Fork Route Indicator at Repeater Alpha (x: 560, y: 360)
        ctx.save();
        const signX = 560;
        const signY = 360;
        
        // Compact, subtle neon route badges that don't block the screen
        ctx.fillStyle = 'rgba(255, 170, 0, 0.9)';
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('▲ COPPER UTP', signX, signY - 55);

        ctx.fillStyle = 'rgba(0, 229, 255, 0.9)';
        ctx.fillText('▼ OPTICAL FIBER', signX, signY + 60);
        ctx.restore();

        // 4. Render Regenerative Repeaters
        this.repeaters.forEach(rep => {
            ctx.save();
            ctx.translate(rep.x, rep.y);

            const p = 1.0 + Math.sin(rep.pulseTimer) * 0.1;

            // Outer Hexagonal Housing
            ctx.strokeStyle = '#00ffcc';
            ctx.lineWidth = 2.5;
            ctx.shadowColor = '#00ffcc';
            ctx.shadowBlur = 14;

            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI) / 3;
                const hx = Math.cos(angle) * rep.radius * p;
                const hy = Math.sin(angle) * rep.radius * p;
                if (i === 0) ctx.moveTo(hx, hy);
                else ctx.lineTo(hx, hy);
            }
            ctx.closePath();
            ctx.stroke();

            // Inner Square Wave Regeneration Icon
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-16, 8);
            ctx.lineTo(-8, 8);
            ctx.lineTo(-8, -8);
            ctx.lineTo(8, -8);
            ctx.lineTo(8, 8);
            ctx.lineTo(16, 8);
            ctx.stroke();

            // Compact Telemetry Badge
            const badgeW = 110;
            const badgeH = 16;
            ctx.fillStyle = 'rgba(4, 10, 22, 0.9)';
            ctx.fillRect(-badgeW / 2, rep.radius + 8, badgeW, badgeH);
            ctx.strokeStyle = '#00ffcc';
            ctx.lineWidth = 1;
            ctx.strokeRect(-badgeW / 2, rep.radius + 8, badgeW, badgeH);

            ctx.fillStyle = '#00ffcc';
            ctx.font = 'bold 8px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(rep.name.replace('REGENERATIVE ', ''), 0, rep.radius + 19);
            ctx.restore();
        });

        // 5. Render Thermal & Impulse Noise Traps (Stationed on Upper Copper Route)
        this.noiseTraps.forEach(trap => {
            ctx.save();
            ctx.translate(trap.x, trap.y);

            // Active Crackling Sparks and Lightning Bolts
            if (trap.isActive) {
                ctx.strokeStyle = '#ffaa00';
                ctx.lineWidth = 2.5;
                ctx.shadowColor = '#ffaa00';
                ctx.shadowBlur = 18;

                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const angle = (i * Math.PI) / 3 + Math.sin(anim * 25);
                    const ex = Math.cos(angle) * trap.radius;
                    const ey = Math.sin(angle) * trap.radius;
                    ctx.moveTo(0, 0);
                    ctx.lineTo(ex * 0.5 + (Math.random() * 10 - 5), ey * 0.5 + (Math.random() * 10 - 5));
                    ctx.lineTo(ex, ey);
                }
                ctx.stroke();

                // Core Spark
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(0, 0, 5, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Dormant / Charging indicator ring
                ctx.strokeStyle = 'rgba(255, 170, 0, 0.35)';
                ctx.lineWidth = 1.5;
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                ctx.arc(0, 0, trap.radius * 0.7, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Trap Label Badge
            ctx.fillStyle = 'rgba(4, 10, 22, 0.85)';
            ctx.fillRect(-65, trap.radius + 8, 130, 16);
            ctx.strokeStyle = trap.isActive ? '#ffaa00' : 'rgba(255, 170, 0, 0.4)';
            ctx.lineWidth = 1;
            ctx.strokeRect(-65, trap.radius + 8, 130, 16);

            ctx.fillStyle = trap.isActive ? '#ffaa00' : '#888888';
            ctx.font = 'bold 8px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(trap.isActive ? '⚡ EMI NOISE ARC' : 'CHARGING NOISE ARC', 0, trap.radius + 19);

            ctx.restore();
        });

        // 6. Render Security Bulkhead Gate
        ctx.save();
        ctx.translate(this.bulkhead.x, this.bulkhead.y);

        const gateColor = this.bulkhead.isUnlocked ? '#00ff88' : '#ff2255';
        const gateLabel = this.bulkhead.isUnlocked ? '[SECTOR 2 GATE: OPEN]' : '[SECTOR 2 BULKHEAD: LOCKED]';

        // Barrier Frame
        ctx.fillStyle = 'rgba(4, 10, 22, 0.9)';
        ctx.fillRect(-16, -this.bulkhead.height / 2, this.bulkhead.width, this.bulkhead.height);
        ctx.strokeStyle = gateColor;
        ctx.lineWidth = 3;
        ctx.shadowColor = gateColor;
        ctx.shadowBlur = 14;
        ctx.strokeRect(-16, -this.bulkhead.height / 2, this.bulkhead.width, this.bulkhead.height);

        // Security Laser Beams (Disappear when unlocked)
        if (!this.bulkhead.isUnlocked) {
            ctx.strokeStyle = '#ff0055';
            ctx.lineWidth = 2.5;
            for (let y = -this.bulkhead.height / 2 + 15; y < this.bulkhead.height / 2; y += 20) {
                ctx.beginPath();
                ctx.moveTo(-14, y);
                ctx.lineTo(14, y);
                ctx.stroke();
            }
        }

        // Terminal Console Prompt
        const promptY = -this.bulkhead.height / 2 - 20;
        const promptW = 140;
        const promptH = 18;

        ctx.fillStyle = 'rgba(4, 10, 22, 0.9)';
        ctx.fillRect(-promptW / 2, promptY, promptW, promptH);
        ctx.strokeStyle = gateColor;
        ctx.lineWidth = 1;
        ctx.strokeRect(-promptW / 2, promptY, promptW, promptH);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(this.bulkhead.isUnlocked ? '[GATE: OPEN]' : '[LOCKED: PRESS E]', 0, promptY + 12);

        ctx.restore();

        // 7. Render Carrier Modulation Console Node (at X: 1450, Y: 360)
        ctx.save();
        ctx.translate(this.modulationConsole.x, this.modulationConsole.y);

        const modP = 1.0 + Math.sin(anim * 4) * 0.08;
        ctx.strokeStyle = '#9900ff';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#9900ff';
        ctx.shadowBlur = 16;

        // Rotating Diamond Frame
        ctx.save();
        ctx.rotate(anim * 0.8);
        ctx.strokeRect(-this.modulationConsole.radius * modP, -this.modulationConsole.radius * modP, this.modulationConsole.radius * 2 * modP, this.modulationConsole.radius * 2 * modP);
        ctx.restore();

        // Sine Wave Emblem inside Console
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.for = false;
        for (let sx = -16; sx <= 16; sx += 2) {
            const sy = Math.sin((sx / 16) * Math.PI * 2) * 8;
            if (sx === -16) ctx.moveTo(sx, sy);
            else ctx.lineTo(sx, sy);
        }
        ctx.stroke();

        // Console Badge
        const modBadgeW = 120;
        const modBadgeH = 16;
        ctx.fillStyle = 'rgba(4, 10, 24, 0.9)';
        ctx.fillRect(-modBadgeW / 2, this.modulationConsole.radius + 8, modBadgeW, modBadgeH);
        ctx.strokeStyle = '#9900ff';
        ctx.lineWidth = 1;
        ctx.strokeRect(-modBadgeW / 2, this.modulationConsole.radius + 8, modBadgeW, modBadgeH);

        ctx.fillStyle = '#c084fc';
        ctx.font = 'bold 8px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('[E] MODULATION', 0, this.modulationConsole.radius + 19);
        ctx.restore();

        // 8. Render Sector 2 Transit Elevator (at X: 1840, Y: 360)
        ctx.save();
        ctx.translate(this.elevator.x, this.elevator.y);

        // Shaft Frame
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 14;
        ctx.strokeRect(-this.elevator.width / 2, -this.elevator.height / 2, this.elevator.width, this.elevator.height);

        // Ascending Light Beams
        ctx.fillStyle = 'rgba(0, 255, 136, 0.12)';
        ctx.fillRect(-this.elevator.width / 2 + 4, -this.elevator.height / 2 + 4, this.elevator.width - 8, this.elevator.height - 8);

        ctx.strokeStyle = 'rgba(0, 255, 136, 0.4)';
        ctx.lineWidth = 1.5;
        const liftY = ((anim * 60) % (this.elevator.height - 20)) - (this.elevator.height / 2 - 10);
        ctx.beginPath();
        ctx.moveTo(-this.elevator.width / 2 + 6, liftY);
        ctx.lineTo(this.elevator.width / 2 - 6, liftY);
        ctx.stroke();

        // Elevator Badge
        const eleBadgeW = 240;
        const eleBadgeH = 20;
        ctx.fillStyle = 'rgba(4, 10, 24, 0.94)';
        ctx.fillRect(-eleBadgeW / 2, -this.elevator.height / 2 - 28, eleBadgeW, eleBadgeH);
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 1;
        ctx.strokeRect(-eleBadgeW / 2, -this.elevator.height / 2 - 28, eleBadgeW, eleBadgeH);

        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 9px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('SECTOR 2 TRANSIT ELEVATOR', 0, -this.elevator.height / 2 - 15);
        ctx.restore();

        // 9. On-Screen High-Attenuation / Noise Warning Banner
        if (this.warningTimer > 0) {
            ctx.save();
            const w = 500;
            const h = 26;
            const bx = (ctx.canvas.width / ((typeof window !== 'undefined' && window.devicePixelRatio) || 1)) / 2 - w / 2;
            const by = 80;

            ctx.fillStyle = 'rgba(255, 34, 85, 0.92)';
            ctx.fillRect(bx, by, w, h);
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(bx, by, w, h);

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 11px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.warningText, bx + w / 2, by + 17);
            ctx.restore();
        }
    }
}

// Global Export
const sector1Instance = new Sector1_Physical();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.Sector1_Physical = sector1Instance;
    window.Sector1_Physical = sector1Instance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Sector1_Physical, sector1: sector1Instance };
}
