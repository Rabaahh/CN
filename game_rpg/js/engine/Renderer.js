// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// Renderer.js - Camera Viewport, Layer-Themed Vector Grid & Neon Glow Pipeline
// ==========================================================================

class CyberRenderer {
    constructor(logicalWidth = 1280, logicalHeight = 720) {
        this.width = logicalWidth;
        this.height = logicalHeight;

        // Camera Viewport
        this.camera = {
            x: logicalWidth / 2,
            y: logicalHeight / 2,
            targetX: logicalWidth / 2,
            targetY: logicalHeight / 2,
            lerpFactor: 0.08,
            zoom: 1.0,
            bounds: { minX: -2000, maxX: 4000, minY: -2000, maxY: 4000 }
        };

        // Screen Shake Mechanics
        this.shakeTimer = 0;
        this.shakeDuration = 0;
        this.shakeIntensity = 0;
        this.shakeOffset = { x: 0, y: 0 };

        // Sector / Layer Theme Palettes
        this.themes = {
            1: { // Sector 1: Physical Layer (Module 4)
                name: 'Physical Substratum',
                primary: '#ffaa00',      // Copper Amber
                secondary: '#00e5ff',    // Optical Fiber Cyan
                gridBg: '#04070e',
                gridLine: 'rgba(255, 170, 0, 0.08)',
                nodeRing: '#ffaa00'
            },
            2: { // Sector 2: Data Link Layer (Module 3)
                name: 'Frame Matrix',
                primary: '#00ff88',      // Frame Emerald
                secondary: '#ff007f',    // Laser Pink
                gridBg: '#030a08',
                gridLine: 'rgba(0, 255, 136, 0.08)',
                nodeRing: '#00ff88'
            },
            3: { // Sector 3: Network Layer (Module 2)
                name: 'Routing Core',
                primary: '#0066ff',      // Router Cobalt
                secondary: '#ffd700',    // Subnet Gold
                gridBg: '#030712',
                gridLine: 'rgba(0, 102, 255, 0.08)',
                nodeRing: '#0066ff'
            },
            4: { // Sector 4: Application Layer (Module 1)
                name: 'Application Gateway',
                primary: '#9900ff',      // Gateway Purple
                secondary: '#c084fc',    // Royal Violet
                gridBg: '#080312',
                gridLine: 'rgba(153, 0, 255, 0.08)',
                nodeRing: '#9900ff'
            }
        };

        this.currentSectorId = 1;
        this.gridSize = 64;
    }

    setTarget(x, y) {
        this.camera.targetX = x;
        this.camera.targetY = y;
    }

    shake(intensity = 10, duration = 0.3) {
        this.shakeIntensity = intensity;
        this.shakeDuration = duration;
        this.shakeTimer = duration;
    }

    update(dt) {
        // Smooth Camera Tracking (Lerp)
        const cam = this.camera;
        cam.x += (cam.targetX - cam.x) * cam.lerpFactor;
        cam.y += (cam.targetY - cam.y) * cam.lerpFactor;

        // Clamp camera to world bounds
        cam.x = Math.max(cam.bounds.minX, Math.min(cam.bounds.maxX, cam.x));
        cam.y = Math.max(cam.bounds.minY, Math.min(cam.bounds.maxY, cam.y));

        // Screen Shake calculation
        if (this.shakeTimer > 0) {
            this.shakeTimer -= dt;
            const progress = this.shakeTimer / this.shakeDuration;
            const currentIntensity = this.shakeIntensity * progress;
            this.shakeOffset.x = (Math.random() * 2 - 1) * currentIntensity;
            this.shakeOffset.y = (Math.random() * 2 - 1) * currentIntensity;
        } else {
            this.shakeOffset.x = 0;
            this.shakeOffset.y = 0;
        }

        // Sync with active sector from GameState if available
        if (typeof window !== 'undefined' && window.GameState) {
            const sec = window.GameState.state.currentSector.id;
            if (sec && this.themes[sec]) {
                this.currentSectorId = sec;
            }
        }
    }

    begin(ctx) {
        ctx.save();
        // Center camera in viewport with shake offset
        const cx = this.width / 2 + this.shakeOffset.x;
        const cy = this.height / 2 + this.shakeOffset.y;
        ctx.translate(cx, cy);
        ctx.scale(this.camera.zoom, this.camera.zoom);
        ctx.translate(-this.camera.x, -this.camera.y);
    }

    end(ctx) {
        ctx.restore();
    }

    // World to Screen and Screen to World transforms
    worldToScreen(worldX, worldY) {
        const cx = this.width / 2 + this.shakeOffset.x;
        const cy = this.height / 2 + this.shakeOffset.y;
        return {
            x: (worldX - this.camera.x) * this.camera.zoom + cx,
            y: (worldY - this.camera.y) * this.camera.zoom + cy
        };
    }

    screenToWorld(screenX, screenY) {
        const cx = this.width / 2 + this.shakeOffset.x;
        const cy = this.height / 2 + this.shakeOffset.y;
        return {
            x: (screenX - cx) / this.camera.zoom + this.camera.x,
            y: (screenY - cy) / this.camera.zoom + this.camera.y
        };
    }

    isVisible(worldX, worldY, radius = 50) {
        const screen = this.worldToScreen(worldX, worldY);
        return (
            screen.x + radius >= 0 &&
            screen.x - radius <= this.width &&
            screen.y + radius >= 0 &&
            screen.y - radius <= this.height
        );
    }

    // Render Infinite Vector Grid with Sector Theming (High-Performance Batched Pipeline)
    renderWorldGrid(ctx) {
        const theme = this.themes[this.currentSectorId] || this.themes[1];
        const sz = this.gridSize;

        // Compute viewport world coordinates
        const topLeft = this.screenToWorld(0, 0);
        const bottomRight = this.screenToWorld(this.width, this.height);

        // Clamp coordinates within sensible bounds to prevent runaway loops
        const startX = Math.max(this.camera.bounds.minX, Math.floor(topLeft.x / sz) * sz);
        const endX = Math.min(this.camera.bounds.maxX, Math.ceil(bottomRight.x / sz) * sz);
        const startY = Math.max(this.camera.bounds.minY, Math.floor(topLeft.y / sz) * sz);
        const endY = Math.min(this.camera.bounds.maxY, Math.ceil(bottomRight.y / sz) * sz);

        if (startX > endX || startY > endY) return;

        ctx.save();
        ctx.strokeStyle = theme.gridLine;
        ctx.lineWidth = 1;

        // 1. Single Batched Stroke for all grid lines (40x faster than individual strokes)
        ctx.beginPath();
        for (let x = startX; x <= endX; x += sz) {
            ctx.moveTo(x, startY);
            ctx.lineTo(x, endY);
        }
        for (let y = startY; y <= endY; y += sz) {
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
        }
        ctx.stroke();

        // 2. Single Batched Fill for grid intersection nodes
        ctx.fillStyle = theme.primary;
        ctx.beginPath();
        for (let x = startX; x <= endX; x += sz * 2) {
            for (let y = startY; y <= endY; y += sz * 2) {
                ctx.moveTo(x + 1.5, y);
                ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            }
        }
        ctx.fill();

        ctx.restore();
    }

    // Neon Glow Drawing Utility
    drawNeonPath(ctx, pathFn, color, lineWidth = 2.5, blur = 10) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.shadowColor = color;
        ctx.shadowBlur = blur;
        ctx.beginPath();
        pathFn(ctx);
        ctx.stroke();
        ctx.restore();
    }
}

// Global Export
const rendererInstance = new CyberRenderer(1280, 720);

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.CyberRenderer = CyberRenderer;
    window.GridEngine.Renderer = rendererInstance;
    window.Renderer = rendererInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CyberRenderer, Renderer: rendererInstance };
}
