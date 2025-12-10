const STORAGE_KEY = 'aldott_blog_posts';
const createId = () => (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `id-${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`);

const defaultPosts = [
    {
        id: createId(),
        title: 'Designing bankable wind projects with integrated PMO',
        date: '2025-01-12',
        category: 'Project Management',
        excerpt: 'How a disciplined PMO structure keeps complex offshore and hybrid wind projects on track.',
        content: 'Robust governance aligns engineering, procurement, and financing milestones. We share the workflows Aldott uses to keep stakeholders aligned and risks transparent.'
    },
    {
        id: createId(),
        title: 'Reducing wake uncertainty with mesoscale-informed layouts',
        date: '2025-02-02',
        category: 'Wind Resource',
        excerpt: 'Lessons from pairing mesoscale modeling with SCADA diagnostics to unlock AEP upside.',
        content: 'Bankable assessments depend on validation against operational data. We outline our validation steps, curtailment reviews, and how we communicate uncertainty to lenders.'
    },
    {
        id: createId(),
        title: 'Closing the loop on loads verification',
        date: '2024-12-05',
        category: 'Loads Assessment',
        excerpt: 'Coordinating aeroelastic simulations, DLC coverage, and controller tuning for certification.',
        content: 'From model fidelity to site-specific DLC selection, we discuss how Aldott navigates certification pathways for both fixed-bottom and floating assets.'
    }
];

function loadPosts() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
        return [...defaultPosts];
    }

    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) throw new Error('Invalid data');
        return parsed;
    } catch (err) {
        console.warn('Resetting blog storage due to parse error', err);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
        return [...defaultPosts];
    }
}

function savePosts(posts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function renderBlogGrid() {
    const grid = document.getElementById('blog-grid');
    const empty = document.getElementById('blog-empty');
    if (!grid) return;

    const searchInput = document.getElementById('blog-search');
    const categorySelect = document.getElementById('blog-filter');
    let posts = loadPosts();

    function applyFilters() {
        const term = (searchInput?.value || '').toLowerCase();
        const category = categorySelect?.value || 'all';
        let filtered = [...posts];

        if (term) {
            filtered = filtered.filter(p => p.title.toLowerCase().includes(term) || p.excerpt.toLowerCase().includes(term) || p.content.toLowerCase().includes(term));
        }
        if (category !== 'all') {
            filtered = filtered.filter(p => p.category === category);
        }
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

        grid.innerHTML = '';
        filtered.forEach(post => {
            const article = document.createElement('article');
            article.className = 'blog-post';
            article.innerHTML = `
                <div class="blog-content">
                    <p class="blog-date">${formatDate(post.date)} • ${post.category}</p>
                    <h3>${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <button class="read-more" type="button" aria-label="Read ${post.title}">Read more</button>
                    <div class="blog-full" hidden>
                        <p>${post.content}</p>
                    </div>
                </div>
            `;

            article.querySelector('.read-more').addEventListener('click', () => {
                const full = article.querySelector('.blog-full');
                const expanded = full.hasAttribute('hidden');
                if (expanded) {
                    full.removeAttribute('hidden');
                    article.classList.add('expanded');
                } else {
                    full.setAttribute('hidden', 'hidden');
                    article.classList.remove('expanded');
                }
            });
            grid.appendChild(article);
        });

        if (empty) empty.hidden = filtered.length !== 0;
    }

    searchInput?.addEventListener('input', applyFilters);
    categorySelect?.addEventListener('change', applyFilters);
    applyFilters();
}

function bindAdmin() {
    const form = document.getElementById('admin-form');
    const table = document.getElementById('post-table');
    const resetBtn = document.getElementById('reset-form');
    const seedBtn = document.getElementById('seed-posts');

    if (!form || !table) return;

    function refreshTable() {
        const posts = loadPosts().sort((a, b) => new Date(b.date) - new Date(a.date));
        table.innerHTML = '';
        if (posts.length === 0) {
            table.innerHTML = '<p class="empty-state">No posts yet. Create your first insight.</p>';
            return;
        }

        posts.forEach(post => {
            const row = document.createElement('div');
            row.className = 'post-row';
            row.innerHTML = `
                <div>
                    <p class="blog-date">${formatDate(post.date)} • ${post.category}</p>
                    <h4>${post.title}</h4>
                    <p class="blog-excerpt">${post.excerpt}</p>
                </div>
                <div class="row-actions">
                    <button type="button" class="btn ghost" data-action="edit" data-id="${post.id}">Edit</button>
                    <button type="button" class="btn danger" data-action="delete" data-id="${post.id}">Delete</button>
                </div>
            `;
            table.appendChild(row);
        });
    }

    form.addEventListener('submit', event => {
        event.preventDefault();
        const posts = loadPosts();
        const id = document.getElementById('post-id').value || createId();
        const post = {
            id,
            title: document.getElementById('post-title').value.trim(),
            date: document.getElementById('post-date').value,
            category: document.getElementById('post-category').value,
            excerpt: document.getElementById('post-excerpt').value.trim(),
            content: document.getElementById('post-content').value.trim()
        };

        const existingIndex = posts.findIndex(p => p.id === id);
        if (existingIndex >= 0) {
            posts[existingIndex] = post;
        } else {
            posts.push(post);
        }

        savePosts(posts);
        form.reset();
        document.getElementById('post-id').value = '';
        refreshTable();
        if (!document.getElementById('post-date').value) {
            document.getElementById('post-date').valueAsDate = new Date();
        }
    });

    table.addEventListener('click', event => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const action = target.dataset.action;
        const id = target.dataset.id;
        if (!action || !id) return;

        const posts = loadPosts();
        const idx = posts.findIndex(p => p.id === id);
        if (idx === -1) return;

        if (action === 'edit') {
            const post = posts[idx];
            document.getElementById('post-id').value = post.id;
            document.getElementById('post-title').value = post.title;
            document.getElementById('post-date').value = post.date;
            document.getElementById('post-category').value = post.category;
            document.getElementById('post-excerpt').value = post.excerpt;
            document.getElementById('post-content').value = post.content;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        if (action === 'delete') {
            posts.splice(idx, 1);
            savePosts(posts);
            refreshTable();
        }
    });

    resetBtn?.addEventListener('click', () => {
        document.getElementById('post-id').value = '';
        document.getElementById('post-date').valueAsDate = new Date();
    });

    seedBtn?.addEventListener('click', () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
        refreshTable();
    });

    document.getElementById('post-date').valueAsDate = new Date();
    refreshTable();
}

function bindMenuToggle() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    toggle?.addEventListener('click', () => {
        nav?.classList.toggle('open');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    bindMenuToggle();
    renderBlogGrid();
    bindAdmin();
});
