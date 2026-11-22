#!/usr/bin/env python3
# ==============================================================================
# Master Assembler for KTU PCCST501 Study Guide & Sidebar System (All 28 Topics)
# ==============================================================================

import sys
import os
import json

sys.path.append(os.path.join(os.path.dirname(__file__)))

from build_mod1 import mod1_topics
from build_mod2 import mod2_topics
from build_mod3 import mod3_topics
from build_mod4 import mod4_topics

def normalize_topic(t):
    pages = t.get('pages', [])
    if len(pages) == 3:
        return t
    elif len(pages) == 2:
        p1 = pages[0]
        p2_raw = pages[1]
        p2 = {
            'tab': 'Diagrams & Math',
            'subtitle': p2_raw.get('subtitle', 'Diagrams & Math Derivations'),
            'svg': p2_raw.get('svg', ''),
            'formulas': p2_raw.get('formulas', ''),
            'examTip': p2_raw.get('examTip', '')
        }
        p3 = {
            'tab': 'In-Game Lab',
            'subtitle': p2_raw.get('p3_sub', 'In-Game Interactive Mission'),
            'missionDescription': p2_raw.get('missionIntro', 'Experience this concept directly inside the game world:'),
            'objectives': p2_raw.get('objectives', ['Observe protocol behavior in real-time.']),
            'actionText': p2_raw.get('actionText', '🎮 Start Mission [Space]')
        }
        res = dict(t)
        res['pages'] = [p1, p2, p3]
        return res
    elif len(pages) == 1:
        p = pages[0]
        p1 = {
            'tab': 'Core Theory',
            'subtitle': p.get('subtitle', ''),
            'storyline': p.get('storyline', ''),
            'theory': p.get('theory', ''),
            'keywords': p.get('keywords', [])
        }
        p2 = {
            'tab': 'Diagrams & Math',
            'subtitle': p.get('p2_sub', 'Diagrams & Math Derivations'),
            'svg': p.get('svg', ''),
            'formulas': p.get('formulas', ''),
            'examTip': p.get('examTip', '')
        }
        p3 = {
            'tab': 'In-Game Lab',
            'subtitle': p.get('p3_sub', 'In-Game Interactive Mission'),
            'missionDescription': p.get('missionIntro', 'Experience this concept directly inside the game world:'),
            'objectives': p.get('objectives', ['Observe protocol behavior in real-time.']),
            'actionText': p.get('actionText', '🎮 Start Mission [Space]')
        }
        res = dict(t)
        res['pages'] = [p1, p2, p3]
        return res
    return t

all_raw = mod1_topics + mod2_topics + mod3_topics + mod4_topics
all_topics = [normalize_topic(t) for t in all_raw]

print(f"Total topics normalized: {len(all_topics)}")
for t in all_topics:
    assert len(t['pages']) == 3, f"Topic {t['number']} failed 3-page validation"

topics_json = json.dumps(all_topics, indent=4)

js_content = f"""// ==========================================================================
// THE GRID: PACKET RUNNER (PCCST501 EDITION)
// StudyGuideSystem.js - Comprehensive 28-Topic KTU Syllabus & Interactive Guide
// 100% Curriculum Coverage for Modules 1, 2, 3 & 4 (2024 Scheme PCCST501)
// ==========================================================================

class StudyGuideSystem {{
    constructor() {{
        this.stages = {topics_json};

        this.currentStageIndex = 0;
        this.currentPageIndex = 0; // 0: Theory, 1: Math/Diagrams, 2: In-Game Lab
        this.isOpen = false;
        this.isSidebarOpen = true;
        this.completedStages = new Set();
        this.searchQuery = '';
        this.activeModuleFilter = 'all';

        if (typeof document !== 'undefined') {{
            this.initDOM();
            this.bindGlobalKeyboard();
        }}
    }}

    initDOM() {{
        this.createSidebarDOM();
        this.createModalDOM();
    }}

    createSidebarDOM() {{
        if (document.getElementById('study-sidebar')) return;

        const sidebar = document.createElement('div');
        sidebar.id = 'study-sidebar';
        sidebar.className = 'study-sidebar open';
        sidebar.innerHTML = `
            <div class="sidebar-header">
                <div class="sidebar-title-row">
                    <div class="sidebar-title-group">
                        <span class="sidebar-icon">📚</span>
                        <div>
                            <h3 class="sidebar-title">KTU PCCST501</h3>
                            <span class="sidebar-subtitle">28-TOPIC EXAM CURRICULUM</span>
                        </div>
                    </div>
                    <button id="btn-close-sidebar" class="sidebar-close-btn" title="Collapse Sidebar [B]">✕</button>
                </div>

                <!-- Live Search Filter -->
                <div class="sidebar-search-row">
                    <input type="text" id="sidebar-search-input" class="sidebar-search-input" placeholder="🔍 Search 28 topics, RFCs, formulas..." autocomplete="off" spellcheck="false" />
                </div>

                <!-- Module Filter Tabs -->
                <div class="sidebar-filter-tabs" id="sidebar-filter-tabs">
                    <button class="filter-tab active" data-filter="all">All (28)</button>
                    <button class="filter-tab" data-filter="1">Mod 1</button>
                    <button class="filter-tab" data-filter="2">Mod 2</button>
                    <button class="filter-tab" data-filter="3">Mod 3</button>
                    <button class="filter-tab" data-filter="4">Mod 4</button>
                </div>

                <!-- Progress Bar -->
                <div class="sidebar-progress-bar">
                    <div class="sidebar-progress-fill" id="sidebar-progress-fill" style="width: 4%;"></div>
                </div>
                <div class="sidebar-progress-label">
                    <span id="sidebar-progress-text">Stage 1 of 28 Active</span>
                    <span class="progress-pct" id="sidebar-progress-pct">0%</span>
                </div>
            </div>
            <div class="study-sidebar-topics" id="study-sidebar-topics">
                <!-- Dynamically populated module topics -->
            </div>
        `;

        document.body.appendChild(sidebar);

        // Sidebar toggle button on edge
        const tabBtn = document.createElement('button');
        tabBtn.id = 'study-sidebar-tab';
        tabBtn.className = 'study-sidebar-tab';
        tabBtn.innerHTML = `<span>📖 SYLLABUS NOTES [B]</span>`;
        tabBtn.title = 'Open KTU Course Syllabus Notes Sidebar [B]';
        tabBtn.addEventListener('click', () => this.toggleSidebar());
        document.body.appendChild(tabBtn);

        document.getElementById('btn-close-sidebar').addEventListener('click', () => {{
            this.setSidebarOpen(false);
        }});

        // Search input event
        const searchInput = document.getElementById('sidebar-search-input');
        if (searchInput) {{
            searchInput.addEventListener('input', (e) => {{
                this.searchQuery = e.target.value;
                this.renderSidebarList();
            }});
        }}

        // Filter tabs event
        const filterTabs = document.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {{
            tab.addEventListener('click', () => {{
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.activeModuleFilter = tab.getAttribute('data-filter');
                this.renderSidebarList();
            }});
        }});

        this.renderSidebarList();
    }}

    createModalDOM() {{
        if (document.getElementById('study-modal-backdrop')) return;

        const backdrop = document.createElement('div');
        backdrop.id = 'study-modal-backdrop';
        backdrop.className = 'study-modal-backdrop hidden';
        backdrop.innerHTML = `
            <div class="academic-document-card" id="academic-doc-card">
                <!-- Document Header -->
                <div class="doc-header">
                    <div class="doc-meta-top">
                        <span class="doc-course-badge">APJ ABDUL KALAM TECHNOLOGICAL UNIVERSITY // PCCST501</span>
                        <span class="doc-module-badge" id="modal-module-badge">MODULE 1 • APPLICATION LAYER</span>
                    </div>
                    <div class="doc-title-row">
                        <h2 class="doc-stage-title" id="modal-stage-title">1. TCP/IP 5-Layer Stack</h2>
                        <button class="doc-close-btn" id="btn-close-study-modal" title="Close Guide & Return to Game [Esc]">✕</button>
                    </div>
                    <div class="doc-syllabus-ref" id="modal-syllabus-ref">KTU Syllabus: Module 1 // Protocol Layering & Encapsulation</div>

                    <!-- Page Navigation Tabs -->
                    <div class="doc-nav-tabs">
                        <button class="doc-tab-btn active" data-page="0" id="tab-btn-0">
                            <span class="tab-num">1</span>
                            <span class="tab-txt">Core Theory</span>
                        </button>
                        <button class="doc-tab-btn" data-page="1" id="tab-btn-1">
                            <span class="tab-num">2</span>
                            <span class="tab-txt">Diagrams & Math</span>
                        </button>
                        <button class="doc-tab-btn" data-page="2" id="tab-btn-2">
                            <span class="tab-num">3</span>
                            <span class="tab-txt">Interactive Mission</span>
                        </button>
                    </div>
                </div>

                <!-- Document Body (Smooth Scrolling Content) -->
                <div class="doc-body" id="doc-scroll-body">
                    <!-- Page 1: Core Theory Content -->
                    <div class="doc-page" id="doc-page-0">
                        <div class="doc-section-header">
                            <h3 id="p1-subtitle">Core Theory Subtitle</h3>
                            <span class="doc-pill-tag">Exam Theory</span>
                        </div>
                        <div class="doc-storyline-callout" id="p1-storyline"></div>
                        <div class="doc-prose" id="p1-theory"></div>
                        <div class="doc-keywords-section">
                            <h4>Examiner Keywords to Memorize:</h4>
                            <div class="keywords-wrap" id="p1-keywords"></div>
                        </div>
                    </div>

                    <!-- Page 2: Diagrams & Formulas -->
                    <div class="doc-page hidden" id="doc-page-1">
                        <div class="doc-section-header">
                            <h3 id="p2-subtitle">Diagrams & Math Subtitle</h3>
                            <span class="doc-pill-tag amber">KTU Derivation & Diagram</span>
                        </div>
                        <div class="doc-svg-container" id="p2-svg"></div>
                        <div class="doc-formulas-wrap" id="p2-formulas"></div>
                        <div class="doc-exam-tip" id="p2-exam-tip"></div>
                    </div>

                    <!-- Page 3: Interactive Mission in Game -->
                    <div class="doc-page hidden" id="doc-page-2">
                        <div class="doc-section-header">
                            <h3 id="p3-subtitle">Step-by-Step Experience in the Game World</h3>
                            <span class="doc-pill-tag green">Interactive Objective</span>
                        </div>
                        <p class="doc-mission-intro" id="p3-intro"></p>
                        <div class="doc-objectives-card">
                            <h4>📋 Active Mission Objectives:</h4>
                            <ol class="objectives-list" id="p3-objectives"></ol>
                        </div>
                        <div class="doc-action-cta">
                            <button class="doc-play-btn" id="btn-modal-play">
                                <span class="play-icon">🎮</span>
                                <span id="btn-modal-play-txt">Start Mission: Experience Protocol in Game [Space]</span>
                            </button>
                            <span class="doc-play-subtext">Press <kbd>Space</kbd> or click to resume interactive simulation</span>
                        </div>
                    </div>
                </div>

                <!-- Document Footer (Controls) -->
                <div class="doc-footer">
                    <button class="doc-ctrl-btn" id="btn-doc-prev" title="Previous Page [←]">
                        <span>← Previous Page</span>
                    </button>
                    <div class="doc-page-dots" id="doc-page-dots">
                        <span class="page-dot active" data-page="0"></span>
                        <span class="page-dot" data-page="1"></span>
                        <span class="page-dot" data-page="2"></span>
                    </div>
                    <button class="doc-ctrl-btn primary" id="btn-doc-next" title="Next Page [Space / →]">
                        <span id="btn-doc-next-txt">Next: Diagrams & Math →</span>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(backdrop);

        // Bind clicks inside modal
        document.getElementById('btn-close-study-modal').addEventListener('click', () => this.close());

        // Tab buttons
        [0, 1, 2].forEach(pg => {{
            const btn = document.getElementById(`tab-btn-${{pg}}`);
            if (btn) btn.addEventListener('click', () => this.setPage(pg));
        }});

        // Prev / Next buttons
        document.getElementById('btn-doc-prev').addEventListener('click', () => this.prevPage());
        document.getElementById('btn-doc-next').addEventListener('click', () => this.nextPage());
        document.getElementById('btn-modal-play').addEventListener('click', () => this.playCurrentStage());

        // Backdrop click to close when clicking outside card
        backdrop.addEventListener('click', (e) => {{
            if (e.target === backdrop) this.close();
        }});
    }}

    renderSidebarList() {{
        if (typeof document === 'undefined') return;
        const container = document.getElementById('study-sidebar-topics');
        if (!container) return;

        const q = (this.searchQuery || '').toLowerCase().trim();
        const modFilter = this.activeModuleFilter;

        // Filter stages
        const filteredStages = this.stages.filter(st => {{
            if (modFilter !== 'all' && st.module !== parseInt(modFilter, 10)) {{
                return false;
            }}
            if (q) {{
                const matchesTitle = st.title.toLowerCase().includes(q);
                const matchesRef = (st.ktuRef || '').toLowerCase().includes(q);
                const matchesBadge = (st.badge || '').toLowerCase().includes(q);
                const matchesKeywords = st.pages[0]?.keywords?.some(k => k.toLowerCase().includes(q));
                if (!matchesTitle && !matchesRef && !matchesBadge && !matchesKeywords) {{
                    return false;
                }}
            }}
            return true;
        }});

        if (filteredStages.length === 0) {{
            container.innerHTML = `
                <div class="sidebar-empty-state">
                    <p>No topics matching "<strong>${{q}}</strong>"</p>
                    <button class="sidebar-reset-search-btn" id="btn-reset-search">Clear Filter</button>
                </div>
            `;
            const resetBtn = document.getElementById('btn-reset-search');
            if (resetBtn) {{
                resetBtn.addEventListener('click', () => {{
                    this.searchQuery = '';
                    const searchInput = document.getElementById('sidebar-search-input');
                    if (searchInput) searchInput.value = '';
                    this.renderSidebarList();
                }});
            }}
            return;
        }}

        let html = '';
        let currentMod = null;

        filteredStages.forEach((st) => {{
            const realIdx = this.stages.indexOf(st);
            if (st.module !== currentMod) {{
                currentMod = st.module;
                html += `<div class="sidebar-module-divider">${{st.moduleTitle}}</div>`;
            }}

            const isDone = this.completedStages.has(st.number);
            const isActive = realIdx === this.currentStageIndex;

            let statusBadge = '<span class="stage-tag upcoming">Topic</span>';
            if (isDone) {{
                statusBadge = '<span class="stage-tag done">✓ Completed</span>';
            }} else if (isActive) {{
                statusBadge = '<span class="stage-tag active">🎯 Active in Game</span>';
            }}

            html += `
                <div class="sidebar-stage-item ${{isActive ? 'active' : ''}} ${{isDone ? 'completed' : ''}}" data-stage="${{realIdx}}">
                    <div class="stage-item-top">
                        <span class="stage-num">STAGE ${{st.number}}</span>
                        ${{statusBadge}}
                    </div>
                    <div class="stage-item-title">${{st.title}}</div>
                    <div class="stage-item-meta">
                        <span class="badge-pill">${{st.badge}}</span>
                        <span class="item-ref">KTU Mod ${{st.module}}</span>
                    </div>
                </div>
            `;
        }});

        container.innerHTML = html;

        // Bind clicks to open specific stage
        const items = container.querySelectorAll('.sidebar-stage-item');
        items.forEach(item => {{
            item.addEventListener('click', () => {{
                const stageIdx = parseInt(item.getAttribute('data-stage'), 10);
                this.openStage(stageIdx, 0);
            }});
        }});

        // Update progress bar
        const total = this.stages.length;
        const doneCount = this.completedStages.size;
        const pct = Math.round((doneCount / total) * 100);
        const fill = document.getElementById('sidebar-progress-fill');
        const text = document.getElementById('sidebar-progress-text');
        const pctEl = document.getElementById('sidebar-progress-pct');
        if (fill) fill.style.width = `${{Math.max(4, pct)}}%`;
        if (text) text.textContent = `Stage ${{this.currentStageIndex + 1}} of ${{total}} Active`;
        if (pctEl) pctEl.textContent = `${{pct}}%`;
    }}

    openStage(stageIndex, pageIndex = 0) {{
        if (stageIndex < 0 || stageIndex >= this.stages.length) return;
        this.currentStageIndex = stageIndex;
        this.currentPageIndex = pageIndex;

        if (typeof document === 'undefined') {{
            this.isOpen = true;
            return;
        }}

        try {{
            if (!document.getElementById('study-modal-backdrop')) {{
                this.initDOM();
            }}

            const stage = this.stages[stageIndex];
            const setHtml = (id, html) => {{
                const el = document.getElementById(id);
                if (el) el.innerHTML = html;
            }};
            const setText = (id, text) => {{
                const el = document.getElementById(id);
                if (el) el.textContent = text;
            }};

            // Header fields
            setText('modal-module-badge', stage.moduleTitle);
            setText('modal-stage-title', `${{stage.number}}. ${{stage.title}}`);
            setText('modal-syllabus-ref', stage.ktuRef);

            // Page 1: Core Theory
            const p1 = stage.pages[0];
            setText('p1-subtitle', p1.subtitle || '');
            setHtml('p1-storyline', `
                <div class="story-icon">🛰️</div>
                <div class="story-text"><strong>Mission Storyline:</strong> ${{p1.storyline || ''}}</div>
            `);
            setHtml('p1-theory', p1.theory || '');
            const kws = (p1.keywords || []).map(kw => `<span class="keyword-chip">${{kw}}</span>`).join('');
            setHtml('p1-keywords', kws);

            // Page 2: Diagrams & Math
            const p2 = stage.pages[1] || {{}};
            setText('p2-subtitle', p2.subtitle || 'Diagrams & Math Derivations');
            setHtml('p2-svg', p2.svg || '');
            setHtml('p2-formulas', p2.formulas || '');
            setHtml('p2-exam-tip', `
                <div class="exam-tip-box">
                    <span class="tip-badge">EXAMINER TIP</span>
                    <p>${{p2.examTip || 'Focus on protocol headers, derivations, and exact terminology.'}}</p>
                </div>
            `);

            // Page 3: In-Game Interactive Experience
            const p3 = stage.pages[2] || {{}};
            setText('p3-subtitle', p3.subtitle || 'In-Game Interactive Mission');
            setText('p3-intro', p3.missionDescription || 'Experience this concept directly inside the game world:');
            const objs = (p3.objectives || ['Observe protocol behavior in real-time.']).map(obj => `<li>${{obj}}</li>`).join('');
            setHtml('p3-objectives', objs);
            setText('btn-modal-play-txt', p3.actionText || '🎮 Start Mission: Experience in Game [Space]');

            this.setPage(pageIndex);

            const backdrop = document.getElementById('study-modal-backdrop');
            if (backdrop) {{
                backdrop.classList.remove('hidden');
            }}
            this.isOpen = true;

            this.renderSidebarList();
        }} catch (err) {{
            console.error('[StudyGuideSystem] Error opening stage:', err);
        }}
    }}

    setPage(pageIndex) {{
        if (pageIndex < 0 || pageIndex > 2) return;
        this.currentPageIndex = pageIndex;

        if (typeof document === 'undefined') return;

        // Toggle pages visibility
        [0, 1, 2].forEach(idx => {{
            const pageEl = document.getElementById(`doc-page-${{idx}}`);
            const tabBtn = document.getElementById(`tab-btn-${{idx}}`);
            if (pageEl) {{
                if (idx === pageIndex) {{
                    pageEl.classList.remove('hidden');
                }} else {{
                    pageEl.classList.add('hidden');
                }}
            }}
            if (tabBtn) {{
                if (idx === pageIndex) {{
                    tabBtn.classList.add('active');
                }} else {{
                    tabBtn.classList.remove('active');
                }}
            }}
        }});

        // Update Dots
        const dots = document.querySelectorAll('.page-dot');
        dots.forEach(dot => {{
            const p = parseInt(dot.getAttribute('data-page'), 10);
            if (p === pageIndex) {{
                dot.classList.add('active');
            }} else {{
                dot.classList.remove('active');
            }}
        }});

        // Update Prev / Next button states & labels
        const prevBtn = document.getElementById('btn-doc-prev');
        const nextBtnTxt = document.getElementById('btn-doc-next-txt');
        if (prevBtn) {{
            prevBtn.style.visibility = (pageIndex === 0) ? 'hidden' : 'visible';
        }}
        if (nextBtnTxt) {{
            if (pageIndex === 0) {{
                nextBtnTxt.textContent = 'Next: Diagrams & Math →';
            }} else if (pageIndex === 1) {{
                nextBtnTxt.textContent = 'Next: In-Game Mission →';
            }} else {{
                nextBtnTxt.textContent = 'Close & Play Mission 🎮';
            }}
        }}

        // Scroll to top of doc body
        const scrollBody = document.getElementById('doc-scroll-body');
        if (scrollBody) scrollBody.scrollTop = 0;
    }}

    nextPage() {{
        if (this.currentPageIndex < 2) {{
            this.setPage(this.currentPageIndex + 1);
        }} else {{
            this.playCurrentStage();
        }}
    }}

    prevPage() {{
        if (this.currentPageIndex > 0) {{
            this.setPage(this.currentPageIndex - 1);
        }}
    }}

    playCurrentStage() {{
        this.completedStages.add(this.stages[this.currentStageIndex].number);
        this.close();

        // Optional hook: advance sector or notify HUD
        if (window.GameLoop && window.GameLoop.hud) {{
            window.GameLoop.hud.showNotification?.(
                `🚀 Mission Activated: Stage ${{this.stages[this.currentStageIndex].number}} - ${{this.stages[this.currentStageIndex].title}}`,
                4000
            );
        }}
    }}

    close() {{
        const backdrop = document.getElementById('study-modal-backdrop');
        if (backdrop) {{
            backdrop.classList.add('hidden');
        }}
        this.isOpen = false;
        this.renderSidebarList();
    }}

    toggleSidebar() {{
        this.setSidebarOpen(!this.isSidebarOpen);
    }}

    setSidebarOpen(open) {{
        this.isSidebarOpen = open;
        const sidebar = document.getElementById('study-sidebar');
        if (sidebar) {{
            if (open) {{
                sidebar.classList.add('open');
            }} else {{
                sidebar.classList.remove('open');
            }}
        }}
    }}

    markStageCompleted(stageNumber) {{
        this.completedStages.add(stageNumber);
        this.renderSidebarList();
    }}

    bindGlobalKeyboard() {{
        if (typeof window === 'undefined') return;

        window.addEventListener('keydown', (e) => {{
            // Ignore keystrokes when typing inside text inputs or textareas
            const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
            if (tag === 'input' || tag === 'textarea') return;

            // If user is typing in rubric grader or codex search, don't intercept
            const isTyping = (window.GameLoop && window.GameLoop.rubricGrader && window.GameLoop.rubricGrader.isTyping) ||
                             (window.GameLoop && window.GameLoop.codexViewer && window.GameLoop.codexViewer.isSearchFocused);
            if (isTyping) return;

            // B key toggles study modal or sidebar
            if (e.key === 'b' || e.key === 'B') {{
                e.preventDefault();
                if (this.isOpen) {{
                    this.close();
                }} else {{
                    this.openStage(this.currentStageIndex, 0);
                }}
                return;
            }}

            // When study modal is open:
            if (this.isOpen) {{
                if (e.key === 'Escape') {{
                    e.preventDefault();
                    this.close();
                }} else if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'Enter') {{
                    e.preventDefault();
                    this.nextPage();
                }} else if (e.key === 'ArrowLeft') {{
                    e.preventDefault();
                    this.prevPage();
                }} else if (e.key === '1') {{
                    this.setPage(0);
                }} else if (e.key === '2') {{
                    this.setPage(1);
                }} else if (e.key === '3') {{
                    this.setPage(2);
                }}
            }}
        }});
    }}
}}

// Export to window
if (typeof window !== 'undefined') {{
    window.StudyGuideSystem = StudyGuideSystem;
}}
if (typeof module !== 'undefined' && module.exports) {{
    module.exports = StudyGuideSystem;
}}
"""

out_path = os.path.join(os.path.dirname(__file__), '..', 'js', 'world', 'StudyGuideSystem.js')
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Successfully generated {out_path} ({len(js_content)} bytes)")
