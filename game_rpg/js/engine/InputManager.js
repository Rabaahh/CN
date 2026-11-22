// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// InputManager.js - Normalized Vector Input, Key-State Caching & Gamepad
// ==========================================================================

class CyberInputManager {
    constructor() {
        this.keysDown = new Set();
        this.keysJustPressed = new Set();
        this.keysJustReleased = new Set();

        this.mouse = {
            screenX: 640,
            screenY: 360,
            worldX: 640,
            worldY: 360,
            leftDown: false,
            leftJustPressed: false,
            leftJustReleased: false,
            rightDown: false,
            rightJustPressed: false,
            rightJustReleased: false
        };

        this.axis = { x: 0, y: 0 }; // Normalized movement vector [-1..1]

        this.bindWindowEvents();
    }

    bindWindowEvents() {
        if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') return;

        window.addEventListener('keydown', (e) => {
            // Ignore keystrokes when typing inside text inputs or textareas
            const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
            if (tag === 'input' || tag === 'textarea') return;

            const key = e.key.toLowerCase();
            // Prevent scrolling on arrow keys and spacebar during gameplay
            if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(key)) {
                e.preventDefault();
            }

            if (!this.keysDown.has(key)) {
                this.keysJustPressed.add(key);
            }
            this.keysDown.add(key);
        });

        window.addEventListener('keyup', (e) => {
            const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
            if (tag === 'input' || tag === 'textarea') return;

            const key = e.key.toLowerCase();
            this.keysDown.delete(key);
            this.keysJustReleased.add(key);
        });

        // Mouse buttons handling for combat
        window.addEventListener('mousedown', (e) => {
            if (e.button === 0) {
                if (!this.mouse.leftDown) this.mouse.leftJustPressed = true;
                this.mouse.leftDown = true;
            } else if (e.button === 2) {
                if (!this.mouse.rightDown) this.mouse.rightJustPressed = true;
                this.mouse.rightDown = true;
            }
        });

        window.addEventListener('mouseup', (e) => {
            if (e.button === 0) {
                this.mouse.leftDown = false;
                this.mouse.leftJustReleased = true;
            } else if (e.button === 2) {
                this.mouse.rightDown = false;
                this.mouse.rightJustReleased = true;
            }
        });

        // Prevent context menu on right click during gameplay
        window.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        window.addEventListener('blur', () => {
            this.keysDown.clear();
            this.keysJustPressed.clear();
            this.keysJustReleased.clear();
            this.mouse.leftDown = false;
            this.mouse.leftJustPressed = false;
            this.mouse.leftJustReleased = false;
            this.mouse.rightDown = false;
            this.mouse.rightJustPressed = false;
            this.mouse.rightJustReleased = false;
            this.axis.x = 0;
            this.axis.y = 0;
        });
    }

    update() {
        // Compute raw directional inputs
        let dx = 0;
        let dy = 0;

        if (this.isDown('w') || this.isDown('arrowup')) dy -= 1;
        if (this.isDown('s') || this.isDown('arrowdown')) dy += 1;
        if (this.isDown('a') || this.isDown('arrowleft')) dx -= 1;
        if (this.isDown('d') || this.isDown('arrowright')) dx += 1;

        // Vector Normalization: Eliminates the diagonal speed boost (sqrt(2) speed bug)
        const length = Math.sqrt(dx * dx + dy * dy);
        if (length > 0) {
            this.axis.x = dx / length;
            this.axis.y = dy / length;
        } else {
            this.axis.x = 0;
            this.axis.y = 0;
        }
    }

    endFrame() {
        this.keysJustPressed.clear();
        this.keysJustReleased.clear();
        this.mouse.leftJustPressed = false;
        this.mouse.leftJustReleased = false;
        this.mouse.rightJustPressed = false;
        this.mouse.rightJustReleased = false;
    }

    // Query helpers
    isDown(key) {
        return this.keysDown.has(key.toLowerCase());
    }

    isJustPressed(key) {
        return this.keysJustPressed.has(key.toLowerCase());
    }

    isJustReleased(key) {
        return this.keysJustReleased.has(key.toLowerCase());
    }

    isMoving() {
        return this.axis.x !== 0 || this.axis.y !== 0;
    }

    // Combat-specific convenience queries
    isHandshakeAttack() {
        return this.mouse.leftJustPressed || this.isJustPressed('j');
    }

    isShieldActive() {
        return this.mouse.rightDown || this.isDown('k');
    }

    isRstInterrupt() {
        return this.isJustPressed('q');
    }
}

// Global Export
const inputManagerInstance = new CyberInputManager();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.CyberInputManager = CyberInputManager;
    window.GridEngine.InputManager = inputManagerInstance;
    window.InputManager = inputManagerInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CyberInputManager, InputManager: inputManagerInstance };
}
