// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// CodexViewer.js - Interactive Cyberpunk Neural Codex UI & Search Engine
// Tactical In-Game Encyclopedia Viewer & Revision Cheat-Sheet
// ==========================================================================

class CodexViewer {
    constructor() {
        this.isOpen = false;
        this.activeCategory = 'ALL'; // 'ALL', 'MODULE 1', 'MODULE 2', 'MODULE 3', 'MODULE 4', 'FORMULA CHEAT-SHEET'
        this.searchQuery = '';
        this.isSearchFocused = false;
        this.selectedCardIndex = 0;
        this.detailScrollY = 0;
        this.listScrollY = 0;

        // Visual animation timers
        this.animTimer = 0;
        this.cursorBlink = 0;

        // References
        this.codex = typeof window !== 'undefined' && window.NeuralCodex ? window.NeuralCodex : null;
        this.audio = typeof window !== 'undefined' && window.CyberAudio ? window.CyberAudio : null;

        // Category definitions
        this.categories = [
            { id: 'ALL', label: '[1] ALL TOPICS' },
            { id: 'MODULE 1', label: '[2] MODULE 1 (APP)' },
            { id: 'MODULE 2', label: '[3] MODULE 2 (NET/TRANS)' },
            { id: 'MODULE 3', label: '[4] MODULE 3 (LINK/MAC)' },
            { id: 'MODULE 4', label: '[5] MODULE 4 (PHY/SNMP)' },
            { id: 'FORMULA CHEAT-SHEET', label: '[6] FORMULAS ⚡' }
        ];
    }

    toggle() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.open();
        }
        return this.isOpen;
    }

    open() {
        this.isOpen = true;
        this.detailScrollY = 0;
        this.listScrollY = 0;

        // Ensure NeuralCodex reference is bound
        if (!this.codex && typeof window !== 'undefined' && window.NeuralCodex) {
            this.codex = window.NeuralCodex;
        }

        // Play atmospheric holographic boot chime
        if (this.audio) {
            if (typeof this.audio.sfxCodexOpen === 'function') {
                this.audio.sfxCodexOpen();
            } else if (typeof this.audio.sfxAccessGranted === 'function') {
                this.audio.sfxAccessGranted();
            }
        }
    }

    close() {
        this.isOpen = false;
        this.isSearchFocused = false;
    }

    getFilteredCards() {
        if (!this.codex) {
            if (typeof window !== 'undefined' && window.NeuralCodex) {
                this.codex = window.NeuralCodex;
            } else {
                return [];
            }
        }
        return this.codex.search(this.searchQuery, this.activeCategory);
    }

    handleInput(input) {
        if (!this.isOpen) return false;

        // Close on C key (when search not typing) or Escape
        if (input.isJustPressed('escape')) {
            if (this.isSearchFocused) {
                this.isSearchFocused = false;
            } else {
                this.close();
            }
            return true;
        }

        if (!this.isSearchFocused && (input.isJustPressed('c') || input.isJustPressed('q'))) {
            this.close();
            return true;
        }

        // Focus search on '/' key
        if (!this.isSearchFocused && input.isJustPressed('/')) {
            this.isSearchFocused = true;
            return true;
        }

        // Handle category tab switching via 1-6 keys when search bar is not focused
        if (!this.isSearchFocused) {
            const numKeys = ['1', '2', '3', '4', '5', '6'];
            numKeys.forEach((k, idx) => {
                if (input.isJustPressed(k) && this.categories[idx]) {
                    this.activeCategory = this.categories[idx].id;
                    this.selectedCardIndex = 0;
                    this.detailScrollY = 0;
                    if (this.audio && typeof this.audio.sfxPing === 'function') this.audio.sfxPing();
                }
            });
        }

        // Text typing in search bar
        if (this.isSearchFocused) {
            // Backspace handling
            if (input.isJustPressed('backspace')) {
                if (this.searchQuery.length > 0) {
                    this.searchQuery = this.searchQuery.slice(0, -1);
                    this.selectedCardIndex = 0;
                    this.detailScrollY = 0;
                }
                return true;
            }

            // Enter finishes search focus
            if (input.isJustPressed('enter')) {
                this.isSearchFocused = false;
                return true;
            }

            // Capture raw characters from event listener if attached
            if (input.lastChar && typeof input.lastChar === 'string' && input.lastChar.length === 1) {
                this.searchQuery += input.lastChar;
                this.selectedCardIndex = 0;
                this.detailScrollY = 0;
                input.lastChar = null; // consume
                return true;
            }
        }

        // List navigation via Up/Down or W/S
        const list = this.getFilteredCards();
        if (input.isJustPressed('arrowdown') || (!this.isSearchFocused && input.isJustPressed('s'))) {
            if (list.length > 0) {
                this.selectedCardIndex = Math.min(list.length - 1, this.selectedCardIndex + 1);
                this.detailScrollY = 0;
                if (this.audio && typeof this.audio.sfxPing === 'function') this.audio.sfxPing();
            }
            return true;
        }
        if (input.isJustPressed('arrowup') || (!this.isSearchFocused && input.isJustPressed('w'))) {
            if (list.length > 0) {
                this.selectedCardIndex = Math.max(0, this.selectedCardIndex - 1);
                this.detailScrollY = 0;
                if (this.audio && typeof this.audio.sfxPing === 'function') this.audio.sfxPing();
            }
            return true;
        }

        // Scrolling card detail view with PageUp / PageDown
        if (input.isJustPressed('pagedown')) {
            this.detailScrollY = Math.min(600, this.detailScrollY + 80);
            return true;
        }
        if (input.isJustPressed('pageup')) {
            this.detailScrollY = Math.max(0, this.detailScrollY - 80);
            return true;
        }

        // Mouse click handling
        if (input.mouse && input.mouse.leftJustPressed) {
            const mx = input.mouse.x;
            const my = input.mouse.y;

            // Close button [✕] (x: 1180, y: 50, w: 34, h: 30)
            if (mx >= 1170 && mx <= 1220 && my >= 45 && my <= 85) {
                this.close();
                return true;
            }

            // Search bar click (x: 60 to 1220, y: 100 to 134)
            if (mx >= 60 && mx <= 1220 && my >= 100 && my <= 134) {
                // Clear button [✕] on right of search bar
                if (mx >= 1180 && mx <= 1215) {
                    this.searchQuery = '';
                    this.selectedCardIndex = 0;
                    this.detailScrollY = 0;
                } else {
                    this.isSearchFocused = true;
                }
                return true;
            } else {
                this.isSearchFocused = false;
            }

            // Category Tab bar clicks (y: 142 to 174)
            if (my >= 142 && my <= 174) {
                let tabX = 60;
                for (let i = 0; i < this.categories.length; i++) {
                    const tabW = i === 5 ? 160 : 180;
                    if (mx >= tabX && mx <= tabX + tabW) {
                        this.activeCategory = this.categories[i].id;
                        this.selectedCardIndex = 0;
                        this.detailScrollY = 0;
                        if (this.audio && typeof this.audio.sfxPing === 'function') this.audio.sfxPing();
                        return true;
                    }
                    tabX += tabW + 8;
                }
            }

            // Left Column Topic Card Clicks (x: 60 to 420, y: 185 to 650)
            if (mx >= 60 && mx <= 420 && my >= 185 && my <= 650) {
                const itemH = 58;
                const clickedIdx = Math.floor((my - 185) / itemH);
                if (clickedIdx >= 0 && clickedIdx < list.length) {
                    this.selectedCardIndex = clickedIdx;
                    this.detailScrollY = 0;
                    if (this.audio && typeof this.audio.sfxPing === 'function') this.audio.sfxPing();
                    return true;
                }
            }
        }

        return true;
    }

    update(dt) {
        if (!this.isOpen) return;
        this.animTimer += dt;
        this.cursorBlink += dt * 3;
    }

    render(ctx) {
        if (!this.isOpen) return;

        const w = 1280;
        const h = 720;

        ctx.save();

        // 1. Dark Holographic Modal Scrim
        ctx.fillStyle = 'rgba(4, 8, 18, 0.92)';
        ctx.fillRect(0, 0, w, h);

        // 2. Main Cyber Container
        const mx = 50;
        const my = 35;
        const mw = 1180;
        const mh = 650;

        // Outer Dark Panel
        ctx.fillStyle = 'rgba(6, 14, 28, 0.98)';
        ctx.fillRect(mx, my, mw, mh);

        // Glowing Cyan Border
        ctx.strokeStyle = '#00ffcc';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00ffcc';
        ctx.shadowBlur = 14;
        ctx.strokeRect(mx, my, mw, mh);
        ctx.shadowBlur = 0;

        // Corner Tech Reticles
        const cLen = 16;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        // Top Left
        ctx.beginPath(); ctx.moveTo(mx, my + cLen); ctx.lineTo(mx, my); ctx.lineTo(mx + cLen, my); ctx.stroke();
        // Top Right
        ctx.beginPath(); ctx.moveTo(mx + mw - cLen, my); ctx.lineTo(mx + mw, my); ctx.lineTo(mx + mw, my + cLen); ctx.stroke();
        // Bottom Left
        ctx.beginPath(); ctx.moveTo(mx, my + mh - cLen); ctx.lineTo(mx, my + mh); ctx.lineTo(mx + cLen, my + mh); ctx.stroke();
        // Bottom Right
        ctx.beginPath(); ctx.moveTo(mx + mw - cLen, my + mh); ctx.lineTo(mx + mw, my + mh); ctx.lineTo(mx + mw, my + mh - cLen); ctx.stroke();

        const FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

        // 3. Header Banner
        ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.fillRect(mx, my, mw, 50);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 1;
        ctx.strokeRect(mx, my, mw, 50);

        ctx.fillStyle = '#38bdf8';
        ctx.font = `bold 17px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.fillText('🧠 NEURAL CODEX // KTU PCCST501 RAPID-REVISION ENCYCLOPEDIA', mx + 20, my + 32);

        // Close button [✕]
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(mx + mw - 46, my + 10, 34, 30, 4);
        else ctx.rect(mx + mw - 46, my + 10, 34, 30);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold 16px ${FONT_SANS}`;
        ctx.textAlign = 'center';
        ctx.fillText('✕', mx + mw - 29, my + 30);

        // 4. Real-time Search Input Field
        const searchY = my + 58;
        const searchH = 36;
        ctx.fillStyle = this.isSearchFocused ? 'rgba(56, 189, 248, 0.22)' : 'rgba(15, 23, 42, 0.85)';
        ctx.fillRect(mx + 15, searchY, mw - 30, searchH);
        ctx.strokeStyle = this.isSearchFocused ? '#38bdf8' : 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(mx + 15, searchY, mw - 30, searchH);

        // Search text rendering
        ctx.font = `14px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        if (this.searchQuery.length === 0 && !this.isSearchFocused) {
            ctx.fillStyle = '#94a3b8';
            ctx.fillText('🔍 Click or press [/] to search topics, formulas or keywords (e.g. "CRC", "Dijkstra", "Handshake", "Nyquist", "ALOHA")...', mx + 30, searchY + 23);
        } else {
            ctx.fillStyle = '#ffffff';
            const cursor = (this.isSearchFocused && Math.floor(this.cursorBlink) % 2 === 0) ? '█' : '';
            ctx.fillText(`🔍 Search: ${this.searchQuery}${cursor}`, mx + 30, searchY + 23);

            // Clear button [x]
            if (this.searchQuery.length > 0) {
                ctx.fillStyle = '#f43f5e';
                ctx.font = `bold 12px ${FONT_SANS}`;
                ctx.textAlign = 'center';
                ctx.fillText('[CLEAR ✕]', mx + mw - 50, searchY + 23);
            }
        }

        // 5. Category Tabs Bar
        const tabY = searchY + searchH + 8;
        const tabH = 32;
        let tabX = mx + 15;

        this.categories.forEach(tab => {
            const isCurrent = this.activeCategory === tab.id;
            const tabW = tab.id === 'FORMULA CHEAT-SHEET' ? 175 : 190;

            if (isCurrent) {
                ctx.fillStyle = 'rgba(56, 189, 248, 0.28)';
                ctx.strokeStyle = '#38bdf8';
                ctx.lineWidth = 1.8;
            } else {
                ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
                ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
                ctx.lineWidth = 1;
            }

            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(tabX, tabY, tabW, tabH, 4);
            else ctx.rect(tabX, tabY, tabW, tabH);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = isCurrent ? '#38bdf8' : '#94a3b8';
            ctx.font = `bold 12px ${FONT_SANS}`;
            ctx.textAlign = 'center';
            ctx.fillText(tab.label, tabX + tabW / 2, tabY + 20);

            tabX += tabW + 8;
        });

        // 6. Split Content Columns: Left (List) vs Right (Card Details)
        const contentY = tabY + tabH + 10;
        const contentH = mh - (contentY - my) - 36;
        const col1W = 340;
        const col2X = mx + 15 + col1W + 16;
        const col2W = mw - 30 - col1W - 16;

        this.renderLeftList(ctx, mx + 15, contentY, col1W, contentH);
        this.renderRightCard(ctx, col2X, contentY, col2W, contentH);

        // 7. Footer Status Bar
        const footerY = my + mh - 30;
        ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
        ctx.fillRect(mx, footerY, mw, 30);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.strokeRect(mx, footerY, mw, 30);

        ctx.fillStyle = '#94a3b8';
        ctx.font = `11px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.fillText('⌨ [C] or [ESC] Close | [1-6] Switch Tabs | [/] Focus Search | [↑ / ↓] Select Topic | [PgUp / PgDn] Scroll Details', mx + 20, footerY + 19);

        ctx.fillStyle = '#fbbf24';
        ctx.textAlign = 'right';
        ctx.font = `bold 12px ${FONT_SANS}`;
        const totalCards = this.codex ? this.codex.getAllCards().length : 18;
        const filteredCount = this.getFilteredCards().length;
        ctx.fillText(`TOPICS INDEXED: ${filteredCount} / ${totalCards} | KTU PCCST501 (2024 SCHEME)`, mx + mw - 20, footerY + 19);

        ctx.restore();
    }

    renderLeftList(ctx, x, y, w, h) {
        const FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        ctx.save();
        ctx.fillStyle = 'rgba(11, 20, 38, 0.92)';
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.strokeRect(x, y, w, h);

        const list = this.getFilteredCards();
        if (list.length === 0) {
            ctx.fillStyle = '#fbbf24';
            ctx.font = `bold 13px ${FONT_SANS}`;
            ctx.textAlign = 'center';
            ctx.fillText('NO TOPICS MATCHING SEARCH', x + w / 2, y + 60);
            ctx.fillStyle = '#94a3b8';
            ctx.font = `12px ${FONT_SANS}`;
            ctx.fillText('Try searching "CRC", "Dijkstra", "Handshake", or "Nyquist".', x + w / 2, y + 85);
            ctx.restore();
            return;
        }

        const itemH = 56;
        const maxVisible = Math.floor(h / (itemH + 4));

        let startIdx = 0;
        if (this.selectedCardIndex >= maxVisible) {
            startIdx = this.selectedCardIndex - maxVisible + 1;
        }

        let itemY = y + 6;
        for (let i = startIdx; i < Math.min(list.length, startIdx + maxVisible); i++) {
            const card = list[i];
            const isSelected = i === this.selectedCardIndex;

            if (isSelected) {
                ctx.fillStyle = 'rgba(56, 189, 248, 0.22)';
                ctx.strokeStyle = '#38bdf8';
                ctx.lineWidth = 1.6;
            } else {
                ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
                ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
                ctx.lineWidth = 1;
            }

            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(x + 6, itemY, w - 12, itemH, 4);
            else ctx.rect(x + 6, itemY, w - 12, itemH);
            ctx.fill();
            ctx.stroke();

            // Category Module Tag Badge
            let badgeColor = '#38bdf8';
            let badgeText = `MOD ${card.module}`;
            if (card.module === 'FORMULA') {
                badgeColor = '#fbbf24';
                badgeText = 'FORMULA';
            } else if (card.module === 1) {
                badgeColor = '#c084fc';
            } else if (card.module === 2) {
                badgeColor = '#60a5fa';
            } else if (card.module === 3) {
                badgeColor = '#2dd4bf';
            } else if (card.module === 4) {
                badgeColor = '#4ade80';
            }

            ctx.fillStyle = badgeColor;
            ctx.font = `bold 10px ${FONT_SANS}`;
            ctx.textAlign = 'left';
            ctx.fillText(`[${badgeText}]`, x + 14, itemY + 16);

            // Exam Weight
            ctx.fillStyle = '#fbbf24';
            ctx.font = `600 10px ${FONT_SANS}`;
            ctx.textAlign = 'right';
            const weightSnippet = card.examWeight.split(' ')[0] + ' ' + (card.examWeight.split(' ')[1] || '');
            ctx.fillText(weightSnippet, x + w - 14, itemY + 16);

            // Title
            ctx.fillStyle = isSelected ? '#ffffff' : '#e2e8f0';
            ctx.font = `bold 13px ${FONT_SANS}`;
            ctx.textAlign = 'left';
            const displayTitle = card.title.length > 34 ? card.title.substring(0, 32) + '..' : card.title;
            ctx.fillText(displayTitle, x + 14, itemY + 34);

            // Keywords preview snippet
            ctx.fillStyle = '#94a3b8';
            ctx.font = `11px ${FONT_SANS}`;
            const kwPreview = card.keywords.slice(0, 3).join(' • ');
            ctx.fillText(kwPreview, x + 14, itemY + 49);

            itemY += itemH + 4;
        }

        ctx.restore();
    }

    renderRightCard(ctx, x, y, w, h) {
        const FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        ctx.save();
        ctx.fillStyle = 'rgba(11, 20, 38, 0.96)';
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.strokeRect(x, y, w, h);

        const list = this.getFilteredCards();
        const card = list[this.selectedCardIndex];
        if (!card) {
            ctx.restore();
            return;
        }

        // Apply detail scroll offset
        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.clip();

        let cy = y + 24 - this.detailScrollY;

        // 1. Title & Header
        ctx.fillStyle = '#38bdf8';
        ctx.font = `bold 18px ${FONT_SANS}`;
        ctx.textAlign = 'left';
        ctx.fillText(card.title, x + 20, cy);
        cy += 24;

        // Badges: Category & Exam Weight
        ctx.fillStyle = '#60a5fa';
        ctx.font = `600 12px ${FONT_SANS}`;
        ctx.fillText(`CATEGORY: ${card.category} | EXAM WEIGHT: ${card.examWeight}`, x + 20, cy);
        cy += 18;

        ctx.fillStyle = '#fbbf24';
        ctx.font = `bold 12px ${FONT_SANS}`;
        ctx.fillText(`🎓 KTU EXAM PAPER MAPPING: ${card.ktuMapping}`, x + 20, cy);
        cy += 20;

        // Divider
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.beginPath();
        ctx.moveTo(x + 20, cy);
        ctx.lineTo(x + w - 20, cy);
        ctx.stroke();
        cy += 16;

        // 2. Keywords Pill Badges
        ctx.fillStyle = '#bae6fd';
        ctx.font = `bold 12px ${FONT_SANS}`;
        ctx.fillText('KEY EXAMINER KEYWORDS:', x + 20, cy);
        cy += 18;

        let kwX = x + 20;
        card.keywords.forEach(kw => {
            ctx.font = `600 11px ${FONT_SANS}`;
            const kwW = ctx.measureText(kw).width + 16;
            if (kwX + kwW > x + w - 20) {
                kwX = x + 20;
                cy += 24;
            }
            ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
            ctx.fillRect(kwX, cy - 13, kwW, 20);
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
            ctx.lineWidth = 1;
            ctx.strokeRect(kwX, cy - 13, kwW, 20);

            ctx.fillStyle = '#ffffff';
            ctx.fillText(kw, kwX + 8, cy + 2);
            kwX += kwW + 8;
        });
        cy += 28;

        // 3. Core Concept Summary
        ctx.fillStyle = '#4ade80';
        ctx.font = `bold 13px ${FONT_SANS}`;
        ctx.fillText('EXAMINER SUMMARY & DEFINITION:', x + 20, cy);
        cy += 18;

        ctx.fillStyle = '#f1f5f9';
        ctx.font = `14px ${FONT_SANS}`;
        cy = this.renderWrappedText(ctx, card.summary, x + 20, cy, w - 40, 20);
        cy += 16;

        // 4. Tactical Protocol Diagram / Tracing Table
        if (card.diagram) {
            ctx.fillStyle = '#38bdf8';
            ctx.font = `bold 13px ${FONT_SANS}`;
            ctx.fillText('TACTICAL PROTOCOL DIAGRAM / TRACING TABLE:', x + 20, cy);
            cy += 16;

            const diagLines = card.diagram.split('\n');
            const diagH = diagLines.length * 16 + 20;

            ctx.fillStyle = 'rgba(6, 12, 24, 0.95)';
            ctx.fillRect(x + 18, cy, w - 36, diagH);
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 18, cy, w - 36, diagH);

            ctx.fillStyle = '#67e8f9';
            ctx.font = '12px "SF Mono", "Fira Code", monospace'; // Diagrams stay aligned in monospace
            diagLines.forEach((line, idx) => {
                ctx.fillText(line, x + 26, cy + 16 + idx * 16);
            });
            cy += diagH + 18;
        }

        // 5. Mathematical Formulas
        if (card.formulas && card.formulas.length > 0) {
            ctx.fillStyle = '#fbbf24';
            ctx.font = `bold 13px ${FONT_SANS}`;
            ctx.fillText('MATHEMATICAL EQUATIONS & RULES:', x + 20, cy);
            cy += 18;

            card.formulas.forEach(form => {
                ctx.fillStyle = '#fef08a';
                ctx.font = `13px ${FONT_SANS}`;
                cy = this.renderWrappedText(ctx, `• ${form}`, x + 26, cy, w - 50, 18);
            });
            cy += 16;
        }

        // 6. Common Mistakes & Examiner Traps
        if (card.commonMistakes) {
            ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
            const trapStartY = cy;
            ctx.fillRect(x + 18, trapStartY, w - 36, 48);
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 1.2;
            ctx.strokeRect(x + 18, trapStartY, w - 36, 48);

            ctx.fillStyle = '#f87171';
            ctx.font = `bold 12px ${FONT_SANS}`;
            ctx.fillText('⚠️ COMMON EXAM MISTAKES & EXAMINER TRAPS TO AVOID:', x + 28, trapStartY + 18);

            ctx.fillStyle = '#ffffff';
            ctx.font = `13px ${FONT_SANS}`;
            this.renderWrappedText(ctx, card.commonMistakes, x + 28, trapStartY + 35, w - 56, 16);
            cy += 60;
        }

        ctx.restore(); // Restore clip
        ctx.restore();
    }

    renderWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
        if (!text) return y;
        const words = text.split(' ');
        let line = '';

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && n > 0) {
                ctx.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, y);
        return y + lineHeight;
    }
}

// Global Singleton Export
const codexViewerInstance = new CodexViewer();

if (typeof window !== 'undefined') {
    window.GridEngine = window.GridEngine || {};
    window.GridEngine.CodexViewer = codexViewerInstance;
    window.CodexViewer = codexViewerInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CodexViewer, codexViewerInstance };
}
