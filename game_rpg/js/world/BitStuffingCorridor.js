// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// BitStuffingCorridor.js - Sector 2 Stealth Corridor: The Delimiter Vault
// KTU Module 3: Bit-Oriented Framing (HDLC Flag 01111110) & Byte Stuffing
// ==========================================================================

class BitStuffingCorridor {
    constructor() {
        // Vault World Bounds (along 10Base-F Fiber backbone)
        this.x = 1880;
        this.y = 270;
        this.width = 220;
        this.height = 180;
        this.centerY = 360;

        // Stealth Progression State
        this.isCleared = false;
        this.stuffedCount = 0;
        this.targetStuffings = 3;
        this.playerInside = false;

        // Bit Stream State Machine
        this.bitHistory = ['0', '1', '0', '1', '1'];
        this.consecutiveOnes = 0;
        this.isInjectionWindow = false;
        this.injectionTimer = 0;
        this.maxInjectionTime = 1.8; // 1.8s reaction window

        // Alarm & Scanner State
        this.isAlarmTriggered = false;
        this.alarmFlashTimer = 0;
        this.scannerOffset = 0;
        this.scannerSpeed = 1.4;

        // Stream generator rhythm timer
        this.bitTickTimer = 0;
        this.bitTickInterval = 0.95; // Feed a bit every ~0.95s while in corridor

        // Info popup state for Byte Stuffing comparison
        this.isByteInfoOpen = false;

        // Screen HUD button bounds
        this.hudBounds = {
            injectBtn: { x: 520, y: 165, w: 240, h: 42 },
            infoBtn: { x: 770, y: 165, w: 170, h: 42 },
            closeModalBtn: { x: 880, y: 160, w: 36, h: 32 }
        };

        this.animTimer = 0;
    }

    isInside(px, py) {
        return px >= this.x && px <= (this.x + this.width) && py >= this.y && py <= (this.y + this.height);
    }

    update(dt, player, input, particles, renderer) {
        if (!player) return;
        this.animTimer += dt;

        // Check if player is currently inside the Delimiter Vault
        const insideNow = this.isInside(player.x, player.y);
        this.playerInside = insideNow;

        // Update Scanner Sweep
        this.scannerOffset = (Math.sin(this.animTimer * this.scannerSpeed) * 0.5 + 0.5) * this.width;

        // Decay Alarm Flash
        if (this.isAlarmTriggered) {
            this.alarmFlashTimer -= dt;
            if (this.alarmFlashTimer <= 0) {
                this.isAlarmTriggered = false;
            }
        }

        // If player is inside the vault and it's not yet cleared
        if (insideNow && !this.isCleared) {
            // Update injection window countdown if active
            if (this.isInjectionWindow) {
                this.injectionTimer -= dt;

                // Handle Player Injection Action (Spacebar, 'b', or 'B')
                let didInject = false;
                if (input && (input.isJustPressed(' ') || input.isJustPressed('b') || input.isJustPressed('enter'))) {
                    didInject = true;
                }

                // Check on-screen inject button click
                if (input && input.mouse && input.mouse.leftJustPressed) {
                    const mx = input.mouse.screenX;
                    const my = input.mouse.screenY;
                    const b = this.hudBounds.injectBtn;
                    if (mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h) {
                        didInject = true;
                    }
                }

                if (didInject) {
                    // Successful Bit Stuffing: Inject a '0' bit after five '1's!
                    this.executeBitStuff(player, particles);
                } else if (this.injectionTimer <= 0) {
                    // Time Expired! 6th '1' emitted -> 01111110 Flag Delimiter formed!
                    this.triggerTripwireAlarm(player, particles, renderer);
                }
            } else {
                // Advance regular bitstream generator
                this.bitTickTimer += dt;
                if (this.bitTickTimer >= this.bitTickInterval) {
                    this.bitTickTimer = 0;
                    this.advanceStream();
                }
            }

            // Check Exit Receiver Gate (Auto-unstuffing)
            if (player.x >= this.x + this.width - 25) {
                if (this.stuffedCount >= this.targetStuffings || this.stuffedCount >= 2) {
                    this.clearCorridor(player, particles);
                }
            }
        }

        // Handle Byte Stuffing Info Toggle
        if (input && input.isJustPressed('u')) {
            this.isByteInfoOpen = !this.isByteInfoOpen;
        }

        if (input && input.mouse && input.mouse.leftJustPressed) {
            const mx = input.mouse.screenX;
            const my = input.mouse.screenY;
            if (insideNow) {
                const ib = this.hudBounds.infoBtn;
                if (mx >= ib.x && mx <= ib.x + ib.w && my >= ib.y && my <= ib.y + ib.h) {
                    this.isByteInfoOpen = !this.isByteInfoOpen;
                }
            }
            if (this.isByteInfoOpen) {
                const cb = this.hudBounds.closeModalBtn;
                if (mx >= cb.x && mx <= cb.x + cb.w && my >= cb.y && my <= cb.y + cb.h) {
                    this.isByteInfoOpen = false;
                }
            }
        }
    }

    advanceStream() {
        // Probabilistically feed 1s to challenge the player
        let nextBit = '1';
        if (this.consecutiveOnes >= 4) {
            nextBit = '1'; // Guarantee the 5th '1' to trigger bit stuffing!
        } else if (Math.random() < 0.3) {
            nextBit = '0';
        }

        if (nextBit === '1') {
            this.consecutiveOnes++;
        } else {
            this.consecutiveOnes = 0;
        }

        this.bitHistory.push(nextBit);
        if (this.bitHistory.length > 10) this.bitHistory.shift();

        // If five consecutive '1's are reached, open the Bit Stuffing reaction window!
        if (this.consecutiveOnes === 5) {
            this.isInjectionWindow = true;
            this.injectionTimer = this.maxInjectionTime;
        }
    }

    executeBitStuff(player, particles) {
        this.stuffedCount++;
        this.consecutiveOnes = 0;
        this.isInjectionWindow = false;
        this.bitHistory.push('(0)'); // Stuffed '0' bit
        if (this.bitHistory.length > 10) this.bitHistory.shift();

        // Audio & Visual Effects
        if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxPing === 'function') {
            window.CyberAudio.sfxPing();
        }

        if (particles) {
            particles.emitPacketDischarge(player.x, player.y, '#00ff88', 35);
        }

        console.log(`[BitStuffingCorridor] Bit Stuffing Executed! '0' injected after 11111 (Total: ${this.stuffedCount}/${this.targetStuffings})`);
    }

    triggerTripwireAlarm(player, particles, renderer) {
        this.isAlarmTriggered = true;
        this.alarmFlashTimer = 1.4;
        this.consecutiveOnes = 0;
        this.isInjectionWindow = false;
        this.bitHistory.push('1!'); // Delimiter tripped

        // Audio & Visual Effects
        if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxAccessDenied === 'function') {
            window.CyberAudio.sfxAccessDenied();
        }

        if (renderer) {
            renderer.shake(14, 0.4);
        }

        if (particles) {
            particles.emitBufferOverflowSparks(player.x, player.y, 25);
        }

        // Damage Player Integrity & Knock back
        if (typeof window !== 'undefined' && window.GameState && typeof window.GameState.modifyIntegrity === 'function') {
            window.GameState.modifyIntegrity(-12);
        }

        // Knock back slightly towards corridor entrance
        player.x = Math.max(this.x - 15, player.x - 45);
        player.vx = -120;

        console.warn('[BitStuffingCorridor] ALARM TRIPPED! Unstuffed 01111110 Flag Delimiter detected by tripwire scanner.');
    }

    clearCorridor(player, particles) {
        this.isCleared = true;
        this.isInjectionWindow = false;

        if (typeof window !== 'undefined' && window.CyberAudio && typeof window.CyberAudio.sfxAccessGranted === 'function') {
            window.CyberAudio.sfxAccessGranted();
        }

        if (particles) {
            particles.emitPacketDischarge(this.x + this.width, this.centerY, '#00e5ff', 50);
        }

        console.log('[BitStuffingCorridor] Delimiter Vault Cleared! Exit receiver auto-unstuffed 0-bits. Transparent link delivery certified.');
    }

    // ======================================================================
    // Render World Elements (World Space)
    // ======================================================================
    renderWorld(ctx) {
        ctx.save();

        // 1. Vault Enclosure Background
        const vaultGrad = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y + this.height);
        vaultGrad.addColorStop(0, 'rgba(16, 4, 28, 0.65)');
        vaultGrad.addColorStop(1, 'rgba(4, 12, 28, 0.75)');
        ctx.fillStyle = vaultGrad;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Vault Border (Cyan when cleared, Red during alarm, Magenta default)
        let borderColor = 'rgba(255, 0, 127, 0.7)';
        if (this.isCleared) borderColor = 'rgba(0, 255, 136, 0.8)';
        else if (this.isAlarmTriggered) borderColor = 'rgba(255, 0, 50, 0.95)';

        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 2.5;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // 2. Infrared Tripwire Scanner Bar
        const scanX = this.x + this.scannerOffset;
        ctx.save();
        ctx.strokeStyle = this.isAlarmTriggered ? 'rgba(255, 0, 50, 0.9)' : 'rgba(255, 0, 127, 0.65)';
        ctx.lineWidth = 3;
        ctx.shadowColor = this.isAlarmTriggered ? '#ff0033' : '#ff007f';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(scanX, this.y);
        ctx.lineTo(scanX, this.y + this.height);
        ctx.stroke();
        ctx.restore();

        // 3. Vault Labels & Delimiter Signpost
        ctx.fillStyle = this.isCleared ? '#00ff88' : '#ff77aa';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        const labelText = this.isCleared
            ? '✓ DELIMITER VAULT CLEARED // AUTO-UNSTUFFING VERIFIED'
            : '⚠️ DELIMITER VAULT: HDLC SCANNER SEARCHING FOR 01111110';
        ctx.fillText(labelText, this.x + this.width / 2, this.y - 10);

        // Entrance & Exit Gate Pillars
        ctx.fillStyle = '#00e5ff';
        ctx.fillRect(this.x - 6, this.centerY - 35, 6, 70);
        ctx.fillStyle = this.isCleared ? '#00ff88' : '#ffd700';
        ctx.fillRect(this.x + this.width, this.centerY - 35, 6, 70);

        // Exit Receiver Gate Text
        ctx.fillStyle = this.isCleared ? '#00ff88' : '#ffd700';
        ctx.font = 'bold 8px "Fira Code", monospace';
        ctx.fillText(this.isCleared ? 'UNSTUFFER: 111110->11111' : 'RECEIVER GATE', this.x + this.width, this.centerY + 48);

        ctx.restore();
    }

    // ======================================================================
    // Render HUD & Dynamic Bitstream Telemetry (Screen Space)
    // ======================================================================
    renderHUD(ctx, player) {
        // Only render HUD if player is inside the vault or just cleared it
        if (!this.playerInside && !this.isByteInfoOpen) return;

        ctx.save();
        const screenW = 1280;

        // Top-Center Telemetry Panel
        const hudW = 680;
        const hudH = 115;
        const hudX = (screenW - hudW) / 2;
        const hudY = 100;

        // Panel Background
        ctx.fillStyle = 'rgba(6, 12, 28, 0.94)';
        ctx.fillRect(hudX, hudY, hudW, hudH);
        ctx.strokeStyle = this.isInjectionWindow ? '#ffaa00' : (this.isCleared ? '#00ff88' : '#ff007f');
        ctx.lineWidth = 2;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 8;
        ctx.strokeRect(hudX, hudY, hudW, hudH);
        ctx.shadowBlur = 0;

        // Title Header
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 12px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('HDLC DELIMITER STEALTH CONDUIT // BIT STUFFING MECHANISM', hudX + 16, hudY + 22);

        // Bit History Stream Visualizer
        ctx.fillStyle = '#88aacc';
        ctx.font = '10px "Fira Code", monospace';
        ctx.fillText('ACTIVE FRAME PAYLOAD STREAM:', hudX + 16, hudY + 44);

        let streamX = hudX + 220;
        this.bitHistory.forEach(b => {
            if (b === '(0)') {
                // Stuffed 0
                ctx.fillStyle = '#00ff88';
                ctx.font = 'bold 13px "Fira Code", monospace';
                ctx.fillText('[0*]', streamX, hudY + 45);
                streamX += 36;
            } else if (b === '1!') {
                // Tripped delimiter
                ctx.fillStyle = '#ff0033';
                ctx.font = 'bold 13px "Fira Code", monospace';
                ctx.fillText('[1!]', streamX, hudY + 45);
                streamX += 34;
            } else {
                ctx.fillStyle = b === '1' ? '#ff77aa' : '#00e5ff';
                ctx.font = 'bold 13px "Fira Code", monospace';
                ctx.fillText(b, streamX, hudY + 45);
                streamX += 18;
            }
        });

        // Stuffed Count Telemetry
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 11px "Fira Code", monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`STUFFED BITS: ${this.stuffedCount}/${this.targetStuffings}`, hudX + hudW - 16, hudY + 44);

        // Action Status or Urgent Alert
        if (this.isInjectionWindow) {
            // Urgency Alert
            ctx.fillStyle = '#ffaa00';
            ctx.font = 'bold 12px "Fira Code", monospace';
            ctx.textAlign = 'left';
            ctx.fillText(`⚠️ 5 CONSECUTIVE '1's DETECTED! INJECT '0' BIT: ${this.injectionTimer.toFixed(2)}s`, hudX + 16, hudY + 70);

            // Reaction Time Bar
            const barW = hudW - 32;
            const barH = 6;
            const pct = Math.max(0, this.injectionTimer / this.maxInjectionTime);
            ctx.fillStyle = 'rgba(255, 170, 0, 0.25)';
            ctx.fillRect(hudX + 16, hudY + 78, barW, barH);
            ctx.fillStyle = '#ffaa00';
            ctx.fillRect(hudX + 16, hudY + 78, barW * pct, barH);

            // Inject Button
            const ib = this.hudBounds.injectBtn;
            ctx.fillStyle = 'rgba(255, 170, 0, 0.2)';
            ctx.fillRect(ib.x, ib.y, ib.w, ib.h);
            ctx.strokeStyle = '#ffaa00';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(ib.x, ib.y, ib.w, ib.h);
            ctx.fillStyle = '#ffdd44';
            ctx.font = 'bold 11px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.fillText('INJECT \'0\' [SPACE / B]', ib.x + ib.w / 2, ib.y + 26);
        } else if (this.isCleared) {
            ctx.fillStyle = '#00ff88';
            ctx.font = 'bold 11px "Fira Code", monospace';
            ctx.textAlign = 'left';
            ctx.fillText('✓ VAULT CLEARED: RECEIVER SUCCESSFULLY UNSTUFFED \'0\' BITS (TRANSPARENT LINK)', hudX + 16, hudY + 72);
        } else {
            ctx.fillStyle = '#a0c0e0';
            ctx.font = '10px "Fira Code", monospace';
            ctx.textAlign = 'left';
            ctx.fillText('Tripwires scan for 01111110. When five 1s appear, inject 0 to prevent flag false-alarm.', hudX + 16, hudY + 72);
        }

        // Byte Stuffing Comparison Info Button
        const infoB = this.hudBounds.infoBtn;
        ctx.fillStyle = 'rgba(0, 229, 255, 0.15)';
        ctx.fillRect(infoB.x, infoB.y, infoB.w, infoB.h);
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 1;
        ctx.strokeRect(infoB.x, infoB.y, infoB.w, infoB.h);
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('BYTE STUFFING [U]', infoB.x + infoB.w / 2, infoB.y + 26);

        // ------------------------------------------------------------------
        // Byte Stuffing Comparison Modal (If toggled open)
        // ------------------------------------------------------------------
        if (this.isByteInfoOpen) {
            this.renderByteComparisonModal(ctx, screenW);
        }

        ctx.restore();
    }

    renderByteComparisonModal(ctx, screenW) {
        const mw = 640;
        const mh = 310;
        const mx = (screenW - mw) / 2;
        const my = 220;

        ctx.fillStyle = 'rgba(4, 10, 26, 0.96)';
        ctx.fillRect(mx, my, mw, mh);
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 2;
        ctx.strokeRect(mx, my, mw, mh);

        // Close Button
        const cb = this.hudBounds.closeModalBtn;
        ctx.fillStyle = '#ff007f';
        ctx.fillRect(cb.x, cb.y, cb.w, cb.h);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('✕', cb.x + cb.w / 2, cb.y + 21);

        // Header
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 13px "Fira Code", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('KTU FRAMING THEORY: BIT STUFFING VS BYTE STUFFING', mx + 20, my + 30);

        // Comparison Table
        const rows = [
            {
                title: '1. BIT STUFFING (Bit-Oriented Framing, e.g. HDLC):',
                rule: '• Flag Delimiter: 01111110 (0x7E, six consecutive 1s).',
                sender: '• Sender: Whenever five consecutive 1s (11111) appear in data, inject a 0 bit immediately.',
                receiver: '• Receiver: Detects five 1s followed by a 0 -> automatically strips (unstuffs) the 0 bit.'
            },
            {
                title: '2. BYTE STUFFING (Character-Oriented Framing, e.g. PPP / BISYNC):',
                rule: '• Delimiter: FLAG byte (e.g. 0x7E) or DLE STX / DLE ETX.',
                sender: '• Sender: If FLAG byte or ESC (0x1B) occurs in payload, stuff an ESC byte before it (ESC + FLAG or ESC + ESC).',
                receiver: '• Receiver: Strips the ESC byte and accepts the subsequent byte as pure payload data.'
            }
        ];

        let ty = my + 60;
        rows.forEach(r => {
            ctx.fillStyle = '#ffd700';
            ctx.font = 'bold 11px "Fira Code", monospace';
            ctx.fillText(r.title, mx + 20, ty);
            ty += 18;

            ctx.fillStyle = '#d0e4ff';
            ctx.font = '10px "Fira Code", monospace';
            ctx.fillText(r.rule, mx + 25, ty);
            ty += 16;
            ctx.fillText(r.sender, mx + 25, ty);
            ty += 16;
            ctx.fillText(r.receiver, mx + 25, ty);
            ty += 24;
        });

        ctx.fillStyle = '#00ff88';
        ctx.font = 'italic 10px "Fira Code", monospace';
        ctx.fillText('Press [U] or click ✕ to dismiss this exam reference card.', mx + 20, my + mh - 16);
    }
}

// Global Export
const bitStuffingInstance = new BitStuffingCorridor();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.BitStuffingCorridor = bitStuffingInstance;
    window.BitStuffingCorridor = bitStuffingInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BitStuffingCorridor, bitStuffing: bitStuffingInstance };
}
