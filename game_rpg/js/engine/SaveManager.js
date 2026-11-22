// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// SaveManager.js - LocalStorage Persistence, Auto-Save & State Recovery
// ==========================================================================

class SaveManager {
    constructor(gameState, audio = null) {
        this.gameState = gameState || (typeof window !== 'undefined' ? window.GameState : null);
        this.audio = audio || (typeof window !== 'undefined' ? window.CyberAudio : null);
        this.STORAGE_KEY = 'GRID_RUNNER_PCCST501_SAVE_v1';
        this.autoSaveTimer = null;
        this.autoSaveIntervalMs = 15000; // 15 seconds
        this.lastSaveTimestamp = null;
        this.saveNotificationText = '';
        this.saveNotificationTimer = 0;

        // In-memory mock storage fallback for environments without localStorage
        SaveManager.sharedMemoryStorage = SaveManager.sharedMemoryStorage || new Map();
        this.memoryStorage = SaveManager.sharedMemoryStorage;

        this.init();
    }

    init() {
        if (this.gameState) {
            // Auto-save on critical milestones
            this.gameState.on('sectorComplete', () => this.save(true));
            this.gameState.on('scoreUpdate', () => this.debouncedSave());
            this.gameState.on('inventoryUpdate', () => this.debouncedSave());
        }

        // Start periodic auto-save in browser environment
        if (typeof window !== 'undefined') {
            this.startAutoSave();
        }
    }

    // Check storage availability
    isStorageAvailable() {
        if (typeof window === 'undefined' || !window.localStorage) {
            return false;
        }
        try {
            const testKey = '__storage_test__';
            window.localStorage.setItem(testKey, testKey);
            window.localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Raw read
    getRawData() {
        if (this.isStorageAvailable()) {
            return window.localStorage.getItem(this.STORAGE_KEY);
        }
        return this.memoryStorage.get(this.STORAGE_KEY) || null;
    }

    // Raw write
    setRawData(jsonString) {
        if (this.isStorageAvailable()) {
            window.localStorage.setItem(this.STORAGE_KEY, jsonString);
        } else {
            this.memoryStorage.set(this.STORAGE_KEY, jsonString);
        }
    }

    // Raw remove
    removeRawData() {
        if (this.isStorageAvailable()) {
            window.localStorage.removeItem(this.STORAGE_KEY);
        } else {
            this.memoryStorage.delete(this.STORAGE_KEY);
        }
    }

    hasSave() {
        return this.getRawData() !== null;
    }

    save(silent = false) {
        if (!this.gameState) return false;

        try {
            const state = this.gameState.state || {};
            const player = state.player || {};
            const ep = state.examProgress || {};

            const saveData = {
                version: 1.0,
                timestamp: Date.now(),
                isoDate: new Date().toISOString(),
                player: {
                    x: Math.round(player.x || 640),
                    y: Math.round(player.y || 360),
                    currentIntegrity: player.currentIntegrity ?? 100,
                    maxIntegrity: player.maxIntegrity ?? 100,
                    currentBuffer: player.currentBuffer ?? 100,
                    maxBuffer: player.maxBuffer ?? 100,
                    ttl: player.ttl ?? 64,
                    speed: player.speed ?? 220,
                    equippedProtocol: player.equippedProtocol || 'RAW_BITSTREAM'
                },
                currentSector: state.currentSector ? state.currentSector.id : 1,
                completedSectors: state.completedSectors || [],
                examProgress: {
                    marksEarned: ep.marksEarned || 0,
                    totalMarks: ep.totalMarks || 60,
                    answeredPartA: ep.answeredPartA || [],
                    answeredPartB: ep.answeredPartB || []
                },
                inventory: state.inventory || [],
                decisions: state.decisions || {},
                completedQuests: state.completedQuests || [],
                codexBookmarks: state.codexBookmarks || [],
                audio: {
                    isMuted: state.ui ? !!state.ui.isMuted : false,
                    volume: state.ui ? (state.ui.volume ?? 0.8) : 0.8
                }
            };

            const serialized = JSON.stringify(saveData);
            this.setRawData(serialized);
            this.lastSaveTimestamp = Date.now();

            if (!silent) {
                this.saveNotificationText = 'PROGRESS ARCHIVED TO SECTOR STORAGE';
                this.saveNotificationTimer = 2.5; // display for 2.5s
                if (this.audio && typeof this.audio.playTone === 'function') {
                    this.audio.playTone(880, 'sine', 0.1, 0.15);
                }
            }

            console.log(`[SaveManager] Game state saved successfully. Timestamp: ${saveData.isoDate}`);
            this.gameState.emit('saveStateSaved', saveData);
            return true;
        } catch (err) {
            console.error('[SaveManager] Failed to save game state:', err);
            return false;
        }
    }

    load() {
        if (!this.gameState) return false;

        try {
            const raw = this.getRawData();
            if (!raw) {
                console.log('[SaveManager] No save state found.');
                return false;
            }

            const data = JSON.parse(raw);
            if (!data || !data.version) {
                console.warn('[SaveManager] Corrupt or invalid save data ignored.');
                return false;
            }

            // Restore state fields
            const state = this.gameState.state;
            if (data.player && state.player) {
                state.player.x = data.player.x ?? state.player.x;
                state.player.y = data.player.y ?? state.player.y;
                state.player.currentIntegrity = data.player.currentIntegrity ?? state.player.currentIntegrity;
                state.player.maxIntegrity = data.player.maxIntegrity ?? state.player.maxIntegrity;
                state.player.currentBuffer = data.player.currentBuffer ?? state.player.currentBuffer;
                state.player.maxBuffer = data.player.maxBuffer ?? state.player.maxBuffer;
                state.player.ttl = data.player.ttl ?? state.player.ttl;
                state.player.speed = data.player.speed ?? state.player.speed;
                state.player.equippedProtocol = data.player.equippedProtocol || state.player.equippedProtocol;
            }

            if (data.completedSectors) {
                state.completedSectors = [...data.completedSectors];
            }

            if (data.examProgress && state.examProgress) {
                state.examProgress.marksEarned = data.examProgress.marksEarned ?? state.examProgress.marksEarned;
                state.examProgress.answeredPartA = [...(data.examProgress.answeredPartA || [])];
                state.examProgress.answeredPartB = [...(data.examProgress.answeredPartB || [])];
            }

            if (data.inventory) {
                state.inventory = [...data.inventory];
            }

            if (data.decisions) {
                state.decisions = { ...data.decisions };
            }

            if (data.completedQuests) {
                state.completedQuests = [...data.completedQuests];
            }

            if (data.codexBookmarks) {
                state.codexBookmarks = [...data.codexBookmarks];
            }

            if (data.audio && state.ui) {
                state.ui.isMuted = !!data.audio.isMuted;
                state.ui.volume = data.audio.volume ?? 0.8;
            }

            this.lastSaveTimestamp = data.timestamp;
            this.saveNotificationText = 'SECTOR STATE RESTORED FROM STORAGE';
            this.saveNotificationTimer = 2.5;

            console.log(`[SaveManager] Game state loaded successfully. Saved at: ${data.isoDate}`);
            this.gameState.emit('saveStateLoaded', data);
            return true;
        } catch (err) {
            console.error('[SaveManager] Failed to load game state:', err);
            return false;
        }
    }

    reset() {
        try {
            this.removeRawData();
            this.lastSaveTimestamp = null;
            this.saveNotificationText = 'GRID STORAGE PURGED // SECTOR REBOOTED';
            this.saveNotificationTimer = 3.0;

            if (this.gameState) {
                // Reset player stats
                const p = this.gameState.state.player;
                if (p) {
                    p.x = 640;
                    p.y = 360;
                    p.speed = 220;
                    p.currentIntegrity = 100;
                    p.currentBuffer = 100;
                    p.ttl = 64;
                    p.equippedProtocol = 'RAW_BITSTREAM';
                }
                this.gameState.state.completedSectors = [];
                this.gameState.state.examProgress = {
                    marksEarned: 0,
                    totalMarks: 60,
                    targetDistinction: 48,
                    targetPass: 24,
                    answeredPartA: [],
                    answeredPartB: []
                };
                this.gameState.state.inventory = [
                    { id: 'SYN_ACK_TOKEN', name: '3-Way SYN/ACK Token', type: 'HANDSHAKE' },
                    { id: 'CRC_DIVISOR_KEY', name: 'CRC Divisor Key (1101)', type: 'CRYPT' },
                    { id: 'ARP_SPOOF_FILTER', name: 'ARP Spoofing Filter', type: 'DEFENSE' }
                ];
                this.gameState.state.decisions = {};
                this.gameState.state.completedQuests = [];
                this.gameState.emit('saveStateReset');
            }

            console.log('[SaveManager] Game data reset to factory default.');
            return true;
        } catch (err) {
            console.error('[SaveManager] Failed to reset data:', err);
            return false;
        }
    }

    debouncedSave() {
        if (this._debounceTimer) clearTimeout(this._debounceTimer);
        this._debounceTimer = setTimeout(() => {
            this.save(true);
        }, 1200);
    }

    startAutoSave() {
        if (this.autoSaveTimer) clearInterval(this.autoSaveTimer);
        this.autoSaveTimer = setInterval(() => {
            if (this.gameState && !this.gameState.isPaused()) {
                this.save(true);
            }
        }, this.autoSaveIntervalMs);
    }

    stopAutoSave() {
        if (this.autoSaveTimer) {
            clearInterval(this.autoSaveTimer);
            this.autoSaveTimer = null;
        }
    }

    update(dt) {
        if (this.saveNotificationTimer > 0) {
            this.saveNotificationTimer -= dt;
            if (this.saveNotificationTimer <= 0) {
                this.saveNotificationText = '';
            }
        }
    }

    renderNotification(ctx, screenWidth = 1280, screenHeight = 720) {
        if (this.saveNotificationTimer <= 0 || !this.saveNotificationText) return;

        ctx.save();
        const alpha = Math.min(1.0, this.saveNotificationTimer * 2.0);
        ctx.globalAlpha = alpha;

        const bannerW = 420;
        const bannerH = 34;
        const x = (screenWidth - bannerW) / 2;
        const y = 28;

        // Banner background
        ctx.fillStyle = 'rgba(0, 20, 30, 0.9)';
        ctx.strokeStyle = '#00ffcc';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#00ffcc';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(x, y, bannerW, bannerH, 4) : ctx.rect(x, y, bannerW, bannerH);
        ctx.fill();
        ctx.stroke();

        // Text
        ctx.shadowBlur = 4;
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`💾 [SAVE] ${this.saveNotificationText}`, screenWidth / 2, y + bannerH / 2);

        ctx.restore();
    }
}

// Module export
if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.SaveManager = SaveManager;
    window.SaveManager = SaveManager;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SaveManager };
}
