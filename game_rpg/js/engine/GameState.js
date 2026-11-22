// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// GameState.js - Centralized State Manager & Event Pub/Sub
// ==========================================================================

const GameStates = Object.freeze({
    TITLE_SCREEN: 'TITLE_SCREEN',
    EXPLORATION: 'EXPLORATION',
    NETWORK_COMBAT: 'NETWORK_COMBAT',
    HACKING_MINIGAME: 'HACKING_MINIGAME',
    BOSS_ENCOUNTER: 'BOSS_ENCOUNTER',
    INTEL_CODEX: 'INTEL_CODEX',
    PAUSED: 'PAUSED',
    EXAM_SUMMARY: 'EXAM_SUMMARY'
});

class GameStateManager {
    constructor() {
        this.states = GameStates;
        this.currentState = GameStates.EXPLORATION;
        this.previousState = GameStates.EXPLORATION;
        this.listeners = new Map();

        // Core Global State Model
        this.state = {
            player: {
                x: 640,
                y: 360,
                speed: 220,
                maxIntegrity: 100,
                currentIntegrity: 100,
                maxBuffer: 100,
                currentBuffer: 100,
                ttl: 64, // Time-to-Live (hops)
                currentLayer: 4, // Module 4 (Physical Layer)
                layerName: 'Physical Layer (Module 4)',
                packetType: 'IPv4_DATAGRAM',
                equippedProtocol: 'RAW_BITSTREAM',
                isDashing: false,
                isShielding: false
            },
            currentSector: {
                id: 1,
                name: 'Sector 1: The Physical Substratum',
                moduleNumber: 4,
                linkType: 'Twisted Pair / Optical Fiber',
                bandwidth: '10 Mbps',
                hazards: ['Attenuation Fog', 'Thermal Noise']
            },
            examProgress: {
                marksEarned: 0,
                totalMarks: 60,
                targetDistinction: 48,
                targetPass: 24,
                answeredPartA: [],
                answeredPartB: []
            },
            inventory: [
                { id: 'SYN_ACK_TOKEN', name: '3-Way SYN/ACK Token', type: 'HANDSHAKE' },
                { id: 'CRC_DIVISOR_KEY', name: 'CRC Divisor Key (1101)', type: 'CRYPT' },
                { id: 'ARP_SPOOF_FILTER', name: 'ARP Spoofing Filter', type: 'DEFENSE' }
            ],
            telemetry: {
                dataRateBps: 10000000, // 10 Mbps
                linkUtilization: 38.5, // %
                roundTripTimeMs: 14, // ms
                packetLossRate: 0.0 // %
            },
            ui: {
                isTerminalOpen: false,
                isCodexOpen: false,
                isMuted: false,
                volume: 0.8
            }
        };
    }

    // State Transition Management
    changeState(newState, payload = {}) {
        if (!this.states[newState]) {
            console.error(`[GameState] Invalid state transition target: ${newState}`);
            return false;
        }

        if (this.currentState === newState) return true;

        const oldState = this.currentState;
        this.previousState = oldState;
        this.currentState = newState;

        console.log(`[GameState] State Transition: ${oldState} -> ${newState}`);
        this.emit('stateChange', { from: oldState, to: newState, payload });
        return true;
    }

    togglePause() {
        if (this.currentState === GameStates.PAUSED) {
            this.changeState(this.previousState || GameStates.EXPLORATION);
            return false;
        } else {
            this.changeState(GameStates.PAUSED);
            return true;
        }
    }

    isPaused() {
        return this.currentState === GameStates.PAUSED;
    }

    // Event Pub/Sub
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event).add(callback);
        return () => this.off(event, callback);
    }

    off(event, callback) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).delete(callback);
        }
    }

    emit(event, data) {
        if (this.listeners.has(event)) {
            for (const cb of this.listeners.get(event)) {
                try {
                    cb(data);
                } catch (err) {
                    console.error(`[GameState] Error in event listener '${event}':`, err);
                }
            }
        }
    }

    // Mutator Helpers
    modifyIntegrity(delta) {
        const p = this.state.player;
        p.currentIntegrity = Math.max(0, Math.min(p.maxIntegrity, p.currentIntegrity + delta));
        this.emit('playerUpdate', p);
    }

    modifyBuffer(delta) {
        const p = this.state.player;
        p.currentBuffer = Math.max(0, Math.min(p.maxBuffer, p.currentBuffer + delta));
        this.emit('playerUpdate', p);
    }

    decrementTTL(hops = 1) {
        const p = this.state.player;
        p.ttl = Math.max(0, p.ttl - hops);
        this.emit('playerUpdate', p);
        if (p.ttl === 0) {
            this.emit('packetExpired', { reason: 'ICMP Time Exceeded (TTL 0)' });
        }
    }

    awardExamMarks(amount, questionId = null, isPartB = false) {
        const ep = this.state.examProgress;
        ep.marksEarned = Math.min(ep.totalMarks, ep.marksEarned + amount);
        if (questionId) {
            if (isPartB) {
                ep.answeredPartB.push({ questionId, marks: amount });
            } else {
                ep.answeredPartA.push({ questionId, marks: amount });
            }
        }
        this.emit('scoreUpdate', ep);
    }

    addMarks(amount = 1) {
        this.awardExamMarks(amount, null, false);
    }

    addItem(item) {
        if (!this.state.inventory) this.state.inventory = [];
        const itemObj = typeof item === 'string' ? { id: item, name: item, type: 'EXPLOIT' } : item;
        if (!this.hasItem(itemObj.id)) {
            this.state.inventory.push(itemObj);
            this.emit('inventoryUpdate', itemObj);
            console.log(`[GameState] Item acquired: ${itemObj.id}`);
        }
    }

    hasItem(itemId) {
        if (!this.state.inventory) return false;
        return this.state.inventory.some(i => (typeof i === 'string' ? i === itemId : i.id === itemId));
    }

    completeSector(sectorId) {
        if (!this.state.completedSectors) {
            this.state.completedSectors = [];
        }
        if (!this.state.completedSectors.includes(sectorId)) {
            this.state.completedSectors.push(sectorId);
        }
        this.emit('sectorComplete', { sectorId });
        console.log(`[GameState] Sector ${sectorId} completed!`);
    }
}

// Global Singleton Export
const gameStateInstance = new GameStateManager();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.GameStates = GameStates;
    window.GridEngine.GameState = gameStateInstance;
    window.GameState = gameStateInstance; // Convenience alias
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GameStates, GameStateManager, GameState: gameStateInstance };
}
