// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// ParticleSystem.js - Pre-Allocated Object-Pooled Neon Particle Engine
// Zero Garbage Collection Stutter // Up to 600 Simultaneous Particles
// ==========================================================================

class Particle {
    constructor() {
        this.active = false;
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.size = 2;
        this.color = '#00ffcc';
        this.alpha = 1.0;
        this.life = 1.0;
        this.maxLife = 1.0;
        this.decay = 1.0;
        this.shape = 'circle'; // 'circle' | 'square' | 'binary'
        this.text = '1';
        this.targetX = null;
        this.targetY = null;
    }

    reset() {
        this.active = false;
        this.targetX = null;
        this.targetY = null;
    }
}

class CyberParticleEngine {
    constructor(maxParticles = 600) {
        this.maxParticles = maxParticles;
        this.pool = new Array(maxParticles);
        for (let i = 0; i < maxParticles; i++) {
            this.pool[i] = new Particle();
        }
        this.activeCount = 0;
    }

    spawn() {
        for (let i = 0; i < this.maxParticles; i++) {
            if (!this.pool[i].active) {
                this.pool[i].active = true;
                return this.pool[i];
            }
        }
        // Force-recycle oldest particle if pool is exhausted
        const recycled = this.pool[0];
        recycled.reset();
        recycled.active = true;
        return recycled;
    }

    // ================= EMITTER 1: DATA STREAM EMITTER =================
    // Streams glowing binary pulses ('0' and '1') along bus cables
    emitDataStream(x1, y1, x2, y2, color = '#00ffcc', speed = 180) {
        const p = this.spawn();
        p.x = x1;
        p.y = y1;
        p.shape = 'binary';
        p.text = Math.random() > 0.5 ? '1' : '0';
        p.color = color;
        p.size = 11;
        p.alpha = 0.95;

        // Compute normalized trajectory along conduit
        const dx = x2 - x1;
        const dy = y2 - y1;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0) {
            p.vx = (dx / dist) * speed;
            p.vy = (dy / dist) * speed;
            p.maxLife = dist / speed;
            p.life = p.maxLife;
            p.decay = 1.0 / p.maxLife;
        } else {
            p.reset();
        }
    }

    // ================= EMITTER 2: RADIAL PACKET DISCHARGE =================
    // Explosive burst of light emitted when actions or tests occur
    emitPacketDischarge(x, y, color = '#00ffcc', count = 35) {
        for (let i = 0; i < count; i++) {
            const p = this.spawn();
            p.x = x;
            p.y = y;
            p.shape = 'circle';
            p.color = color;
            p.size = Math.random() * 3.5 + 1.5;

            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 220 + 40;
            p.vx = Math.cos(angle) * speed;
            p.vy = Math.sin(angle) * speed;

            p.maxLife = Math.random() * 0.4 + 0.3;
            p.life = p.maxLife;
            p.decay = 1.0 / p.maxLife;
            p.alpha = 1.0;
        }
    }

    // ================= EMITTER 3: BUFFER OVERFLOW ELECTRICAL SPARKS =================
    // Jagged crimson/amber sparks emitted when buffer drops or packet takes damage
    emitBufferOverflowSparks(x, y, count = 20) {
        for (let i = 0; i < count; i++) {
            const p = this.spawn();
            p.x = x + (Math.random() * 20 - 10);
            p.y = y + (Math.random() * 20 - 10);
            p.shape = 'square';
            p.color = Math.random() > 0.4 ? '#ff3355' : '#ffaa00';
            p.size = Math.random() * 4 + 2;

            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 160 + 50;
            p.vx = Math.cos(angle) * speed;
            p.vy = Math.sin(angle) * speed;

            p.maxLife = Math.random() * 0.3 + 0.15;
            p.life = p.maxLife;
            p.decay = 1.0 / p.maxLife;
            p.alpha = 1.0;
        }
    }

    // ================= EMITTER 4: WAVEFORM MOTION TRAIL =================
    // Luminous trailing ghost effect following high-speed entities
    emitWaveformTrail(x, y, color = '#ff007f', size = 18) {
        const p = this.spawn();
        p.x = x;
        p.y = y;
        p.vx = (Math.random() * 2 - 1) * 10;
        p.vy = (Math.random() * 2 - 1) * 10;
        p.shape = 'square';
        p.color = color;
        p.size = size;
        p.maxLife = 0.22;
        p.life = p.maxLife;
        p.decay = 1.0 / p.maxLife;
        p.alpha = 0.55;
    }

    update(dt) {
        let active = 0;
        for (let i = 0; i < this.maxParticles; i++) {
            const p = this.pool[i];
            if (!p.active) continue;

            p.life -= dt;
            if (p.life <= 0) {
                p.reset();
                continue;
            }

            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.alpha = Math.max(0, p.life / p.maxLife);
            active++;
        }
        this.activeCount = active;
    }

    render(ctx) {
        ctx.save();
        for (let i = 0; i < this.maxParticles; i++) {
            const p = this.pool[i];
            if (!p.active) continue;

            ctx.globalAlpha = p.alpha;

            if (p.shape === 'binary') {
                ctx.fillStyle = p.color;
                ctx.font = `bold ${Math.floor(p.size)}px "Fira Code", monospace`;
                ctx.textAlign = 'center';
                ctx.fillText(p.text, p.x, p.y);
            } else if (p.shape === 'square') {
                ctx.strokeStyle = p.color;
                ctx.lineWidth = 1.5;
                ctx.strokeRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
            } else {
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        ctx.restore();
    }
}

// Global Export
const particleEngineInstance = new CyberParticleEngine(600);

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.CyberParticleEngine = CyberParticleEngine;
    window.GridEngine.ParticleSystem = particleEngineInstance;
    window.ParticleSystem = particleEngineInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CyberParticleEngine, ParticleSystem: particleEngineInstance };
}
