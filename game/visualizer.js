// ==========================================================================
// TACTICAL VISUAL MATRIX: Canvas-Based Protocol & Telemetry Visualizer
// Real-time Visualizers for Dijkstra, CRC, Waveforms & Modulation
// ==========================================================================

class CyberVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = (this.canvas && typeof this.canvas.getContext === 'function') ? this.canvas.getContext('2d') : null;
        this.currentMode = null;
        this.animationFrame = null;
        this.step = 0;
        this.resize();
        if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
            window.addEventListener('resize', () => this.resize());
        }
    }

    resize() {
        if (!this.canvas) return;
        const rect = (typeof this.canvas.getBoundingClientRect === 'function') 
            ? this.canvas.getBoundingClientRect() 
            : { width: 700, height: 220 };
        const w = rect.width > 0 ? rect.width : 700;
        const h = rect.height > 0 ? rect.height : 220;
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = w * dpr;
        this.canvas.height = h * dpr;
        if (this.ctx) {
            this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
    }

    clear() {
        if (!this.ctx) return;
        const w = this.canvas.width / (window.devicePixelRatio || 1);
        const h = this.canvas.height / (window.devicePixelRatio || 1);
        this.ctx.clearRect(0, 0, w, h);
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }

    // ================= 1. DIJKSTRA GRAPH VISUALIZER =================
    drawDijkstraGraph() {
        this.clear();
        this.currentMode = 'dijkstra';
        const w = this.canvas.width / (window.devicePixelRatio || 1);
        const h = this.canvas.height / (window.devicePixelRatio || 1);

        const nodes = {
            'A': { x: w * 0.15, y: h * 0.5, name: 'A (Src)', visited: true },
            'B': { x: w * 0.38, y: h * 0.22, name: 'B', visited: true },
            'C': { x: w * 0.38, y: h * 0.78, name: 'C', visited: true },
            'D': { x: w * 0.68, y: h * 0.35, name: 'D', visited: true },
            'E': { x: w * 0.85, y: h * 0.65, name: 'E (Dest)', visited: true }
        };

        const edges = [
            { from: 'A', to: 'B', cost: 2, onShortestPath: true },
            { from: 'A', to: 'C', cost: 5, onShortestPath: false },
            { from: 'B', to: 'C', cost: 1, onShortestPath: true },
            { from: 'B', to: 'D', cost: 4, onShortestPath: false },
            { from: 'C', to: 'D', cost: 1, onShortestPath: true },
            { from: 'C', to: 'E', cost: 3, onShortestPath: false },
            { from: 'D', to: 'E', cost: 1, onShortestPath: true }
        ];

        let pulse = 0;
        const animate = () => {
            this.ctx.clearRect(0, 0, w, h);
            pulse += 0.05;

            // Draw edges
            edges.forEach(e => {
                const n1 = nodes[e.from];
                const n2 = nodes[e.to];
                this.ctx.beginPath();
                this.ctx.moveTo(n1.x, n1.y);
                this.ctx.lineTo(n2.x, n2.y);

                if (e.onShortestPath) {
                    this.ctx.strokeStyle = '#00ffcc';
                    this.ctx.lineWidth = 3.5 + Math.sin(pulse) * 1.5;
                    this.ctx.shadowColor = '#00ffcc';
                    this.ctx.shadowBlur = 12;
                } else {
                    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                    this.ctx.lineWidth = 1.5;
                    this.ctx.shadowBlur = 0;
                }
                this.ctx.stroke();
                this.ctx.shadowBlur = 0;

                // Draw cost label
                const midX = (n1.x + n2.x) / 2;
                const midY = (n1.y + n2.y) / 2;
                this.ctx.fillStyle = e.onShortestPath ? '#ffd166' : '#8892b0';
                this.ctx.font = '12px "Fira Code", monospace';
                this.ctx.fillText(`Cost: ${e.cost}`, midX - 16, midY - 6);
            });

            // Draw nodes
            for (let id in nodes) {
                const n = nodes[id];
                this.ctx.beginPath();
                this.ctx.arc(n.x, n.y, 18, 0, Math.PI * 2);
                this.ctx.fillStyle = n.name.includes('A') ? '#ff007f' : (n.name.includes('E') ? '#ffd166' : '#0a192f');
                this.ctx.fill();
                this.ctx.lineWidth = 2.5;
                this.ctx.strokeStyle = '#00ffcc';
                this.ctx.shadowColor = '#00ffcc';
                this.ctx.shadowBlur = 8;
                this.ctx.stroke();
                this.ctx.shadowBlur = 0;

                // Text
                this.ctx.fillStyle = '#ffffff';
                this.ctx.font = 'bold 12px "Fira Code", monospace';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(n.name, n.x, n.y + 4);
            }

            // Shortest Path Tree Legend
            this.ctx.fillStyle = '#00ffcc';
            this.ctx.font = '11px "Fira Code", monospace';
            this.ctx.textAlign = 'left';
            this.ctx.fillText("LEAST-COST PATH A -> B -> C -> D -> E (Total Cost: 2 + 1 + 1 + 1 = 5)", 14, h - 14);

            this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
    }

    // ================= 2. LINE CODING WAVEFORMS (NRZ-L, NRZ-I, MANCHESTER) =================
    drawWaveforms(bits = "010011") {
        this.clear();
        this.currentMode = 'waveforms';
        const w = this.canvas.width / (window.devicePixelRatio || 1);
        const h = this.canvas.height / (window.devicePixelRatio || 1);

        const bitCount = bits.length;
        const startX = 110;
        const bitWidth = (w - startX - 20) / bitCount;

        // Background grid
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        this.ctx.lineWidth = 1;
        for (let i = 0; i <= bitCount; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(startX + i * bitWidth, 10);
            this.ctx.lineTo(startX + i * bitWidth, h - 20);
            this.ctx.stroke();
        }

        // Draw bit headers
        this.ctx.fillStyle = '#ffd166';
        this.ctx.font = 'bold 13px "Fira Code", monospace';
        this.ctx.textAlign = 'center';
        for (let i = 0; i < bitCount; i++) {
            this.ctx.fillText(`Bit: ${bits[i]}`, startX + (i + 0.5) * bitWidth, 22);
        }

        // Waveform 1: NRZ-L (0=High, 1=Low)
        this.drawSingleWaveform("NRZ-L", 55, bits, (bit) => bit === '0' ? 1 : -1, '#00ffcc');

        // Waveform 2: NRZ-I (Transition on 1, no transition on 0)
        let nrzState = 1;
        const nrzTransitions = [];
        for (let i = 0; i < bitCount; i++) {
            if (bits[i] === '1') nrzState = -nrzState;
            nrzTransitions.push(nrzState);
        }
        this.drawSingleWaveform("NRZ-I", 115, bits, (bit, idx) => nrzTransitions[idx], '#00aaff');

        // Waveform 3: Manchester (0: High-to-Low, 1: Low-to-High)
        this.drawManchesterWaveform("Manchester", 175, bits, '#ff007f', startX, bitWidth);
    }

    drawSingleWaveform(name, centerY, bits, levelFn, color) {
        const w = this.canvas.width / (window.devicePixelRatio || 1);
        const startX = 110;
        const bitWidth = (w - startX - 20) / bits.length;
        const amplitude = 18;

        this.ctx.fillStyle = color;
        this.ctx.font = 'bold 11px "Fira Code", monospace';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(name, 12, centerY + 4);

        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2.5;
        this.ctx.shadowColor = color;
        this.ctx.shadowBlur = 6;

        let prevLevel = null;
        for (let i = 0; i < bits.length; i++) {
            const level = levelFn(bits[i], i);
            const y = centerY - level * amplitude;
            const xStart = startX + i * bitWidth;
            const xEnd = xStart + bitWidth;

            if (prevLevel !== null && prevLevel !== level) {
                this.ctx.lineTo(xStart, y);
            }
            this.ctx.lineTo(xEnd, y);
            prevLevel = level;
        }
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;
    }

    drawManchesterWaveform(name, centerY, bits, color, startX, bitWidth) {
        const amplitude = 18;
        this.ctx.fillStyle = color;
        this.ctx.font = 'bold 11px "Fira Code", monospace';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(name, 12, centerY + 4);

        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2.5;
        this.ctx.shadowColor = color;
        this.ctx.shadowBlur = 6;

        for (let i = 0; i < bits.length; i++) {
            const bit = bits[i];
            const xStart = startX + i * bitWidth;
            const xMid = xStart + bitWidth / 2;
            const xEnd = xStart + bitWidth;

            // 0 is High-to-Low; 1 is Low-to-High
            const firstHalf = bit === '0' ? 1 : -1;
            const secondHalf = -firstHalf;

            const y1 = centerY - firstHalf * amplitude;
            const y2 = centerY - secondHalf * amplitude;

            if (i > 0) {
                this.ctx.lineTo(xStart, y1);
            } else {
                this.ctx.moveTo(xStart, y1);
            }
            this.ctx.lineTo(xMid, y1);
            this.ctx.lineTo(xMid, y2); // mid-bit transition
            this.ctx.lineTo(xEnd, y2);
        }
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;
    }

    // ================= 3. CARRIER MODULATION (ASK, FSK, PSK) =================
    drawModulation(bits = "10110") {
        this.clear();
        this.currentMode = 'modulation';
        const w = this.canvas.width / (window.devicePixelRatio || 1);
        const h = this.canvas.height / (window.devicePixelRatio || 1);
        const startX = 85;
        const bitWidth = (w - startX - 20) / bits.length;

        // Draw bit labels
        this.ctx.fillStyle = '#ffd166';
        this.ctx.font = 'bold 12px "Fira Code", monospace';
        this.ctx.textAlign = 'center';
        for (let i = 0; i < bits.length; i++) {
            this.ctx.fillText(`Bit: ${bits[i]}`, startX + (i + 0.5) * bitWidth, 20);
        }

        // Draw ASK: Amplitude changes
        this.drawCarrierWave("ASK", 55, bits, (b, x) => (b === '1' ? 1.0 : 0.2) * Math.sin(x * 0.12), '#00ffcc', startX, bitWidth);

        // Draw FSK: Frequency changes (dense for 1, slow for 0)
        this.drawCarrierWave("FSK", 115, bits, (b, x) => Math.sin(x * (b === '1' ? 0.22 : 0.08)), '#00aaff', startX, bitWidth);

        // Draw PSK: Phase reversal for bit 1 vs 0
        this.drawCarrierWave("PSK", 175, bits, (b, x) => Math.sin(x * 0.14 + (b === '1' ? 0 : Math.PI)), '#ff007f', startX, bitWidth);
    }

    drawCarrierWave(label, centerY, bits, waveFn, color, startX, bitWidth) {
        const amplitude = 18;
        this.ctx.fillStyle = color;
        this.ctx.font = 'bold 11px "Fira Code", monospace';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(label, 12, centerY + 4);

        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2.2;
        this.ctx.shadowColor = color;
        this.ctx.shadowBlur = 5;

        let globalX = 0;
        for (let i = 0; i < bits.length; i++) {
            const b = bits[i];
            const xStart = startX + i * bitWidth;
            const xEnd = xStart + bitWidth;
            for (let px = xStart; px <= xEnd; px++) {
                const y = centerY - waveFn(b, globalX) * amplitude;
                if (px === xStart && i === 0) {
                    this.ctx.moveTo(px, y);
                } else {
                    this.ctx.lineTo(px, y);
                }
                globalX++;
            }
        }
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;
    }
}

if (typeof window !== 'undefined') {
    window.CyberVisualizer = CyberVisualizer;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CyberVisualizer;
}
