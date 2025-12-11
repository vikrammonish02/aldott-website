const API_URL = '/api/posts';
const STORAGE_KEY = 'aldott_blog_posts';
let dataSource = 'offline';

const createId = () => (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `id-${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`);

const defaultPosts = [
    {
        id: 'seed-1',
        title: 'Hydrogen-ready offshore turbines: lessons from HT1 Aberdeen Bay',
        date: '2025-02-18',
        category: 'Hydrogen & Floating',
        excerpt: 'Coordinating offshore wind with hydrogen production while keeping lenders confident.',
        content: 'From hybrid dispatch strategy to certifier alignment, we unpack how the 8MW Aberdeen Bay concept balanced technical risk, commercial viability, and control constraints.'
    },
    {
        id: 'seed-2',
        title: 'Certification playbook for 294MW offshore portfolios',
        date: '2025-01-22',
        category: 'Certification',
        excerpt: 'Structuring evidence for IEC 61400-22 and DNV-OS-J901 without slowing delivery.',
        content: 'We share the Rentel OWF approach: stakeholder mapping, document readiness gates, and how to synchronize OEM, developer, and certifier timelines to protect budgets.'
    },
    {
        id: 'seed-3',
        title: 'Bid-winning layouts: micro-siting for IRR and AEP',
        date: '2025-02-05',
        category: 'Wind Farm Layout',
        excerpt: 'Building competitive offshore bids with calibrated wake models and SCADA validation.',
        content: 'Drawing on GE and Vattenfall programs, we outline how to iterate mesoscale, turbulence, and curtailment assumptions to strengthen bankable IRR cases.'
    },
    {
        id: 'seed-4',
        title: 'Automating loads, controllers, and lifetime extension',
        date: '2024-12-14',
        category: 'Training & Tools',
        excerpt: 'Why automation-first load and control tooling saves millions annually for OEMs.',
        content: 'We detail how Excel-VB, Flex5, and Bladed pipelines shortened DLC cycles, enabled lifetime extension reviews, and scaled training for certification bodies.'
    },
    {
        id: 'seed-5',
        title: 'Closing the loop on loads verification',
        date: '2024-11-30',
        category: 'Loads & Structural Design',
        excerpt: 'Coordinating aeroelastic simulations, DLC coverage, and controller tuning for certification.',
        content: 'From model fidelity to site-specific DLC selection, we discuss how Aldott navigates certification pathways for both fixed-bottom and floating assets.'
    }
];

let cachedPosts = [];
let apiHealthy = false;

function loadLocalPosts() {
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

function saveLocalPosts(posts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function setApiStatus(status) {
    apiHealthy = status === 'live';
    const badge = document.getElementById('api-status');
    if (!badge) return;
    badge.dataset.state = status;
    if (status === 'live') {
        badge.textContent = 'Live API connected';
    } else if (status === 'static') {
        badge.textContent = 'Read-only static snapshot';
    } else {
        badge.textContent = 'Offline mode (local only)';
    }
}

async function fetchFromApi() {
    // Try live API first, then fall back to the static JSON snapshot used for GitHub Pages
    const response = await fetch(API_URL);
    if (response.ok) {
        dataSource = 'live';
        return response.json();
    }

    const staticResponse = await fetch('/api/posts/index.json');
    if (!staticResponse.ok) throw new Error('API unavailable');
    dataSource = 'static';
    return staticResponse.json();
}

async function syncPosts() {
    try {
        const posts = await fetchFromApi();
        cachedPosts = Array.isArray(posts) ? posts : [];
        saveLocalPosts(cachedPosts);
        setApiStatus(dataSource);
    } catch (err) {
        cachedPosts = loadLocalPosts();
        setApiStatus('offline');
    }
    return cachedPosts;
}

async function upsertPost(post) {
    const isUpdate = Boolean(post.id);
    const targetId = post.id;
    const endpoint = isUpdate ? `${API_URL}/${targetId}` : API_URL;
    const method = isUpdate ? 'PUT' : 'POST';

    try {
        const response = await fetch(endpoint, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post)
        });

        if (!response.ok) throw new Error('API error');
        const saved = await response.json();
        await syncPosts();
        return saved;
    } catch (err) {
        const fallbackPosts = loadLocalPosts();
        const id = post.id || createId();
        const existingIndex = fallbackPosts.findIndex(p => p.id === id);
        const saved = { ...post, id };
        if (existingIndex >= 0) {
            fallbackPosts[existingIndex] = saved;
        } else {
            fallbackPosts.push(saved);
        }
        saveLocalPosts(fallbackPosts);
        cachedPosts = fallbackPosts;
        setApiStatus('offline');
        return saved;
    }
}

async function deletePost(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok && response.status !== 404) throw new Error('Delete failed');
        await syncPosts();
        return true;
    } catch (err) {
        const posts = loadLocalPosts();
        const filtered = posts.filter(p => p.id !== id);
        saveLocalPosts(filtered);
        cachedPosts = filtered;
        setApiStatus('offline');
        return true;
    }
}

async function seedPosts() {
    try {
        const response = await fetch(`${API_URL}/seed`, { method: 'POST' });
        if (!response.ok) throw new Error('Seed failed');
        await syncPosts();
        return cachedPosts;
    } catch (err) {
        saveLocalPosts(defaultPosts);
        cachedPosts = [...defaultPosts];
        setApiStatus('offline');
        return cachedPosts;
    }
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

async function renderBlogGrid() {
    const grid = document.getElementById('blog-grid');
    const empty = document.getElementById('blog-empty');
    if (!grid) return;

    const searchInput = document.getElementById('blog-search');
    const categorySelect = document.getElementById('blog-filter');
    cachedPosts = await syncPosts();

    function applyFilters() {
        const term = (searchInput?.value || '').toLowerCase();
        const category = categorySelect?.value || 'all';
        let filtered = [...cachedPosts];

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

async function bindAdmin() {
    const form = document.getElementById('admin-form');
    const table = document.getElementById('post-table');
    const resetBtn = document.getElementById('reset-form');
    const seedBtn = document.getElementById('seed-posts');
    const status = document.getElementById('admin-status');

    if (!form || !table) return;

    cachedPosts = await syncPosts();
    renderTable();
    document.getElementById('post-date').valueAsDate = new Date();

    function renderTable() {
        table.innerHTML = '';
        const posts = [...cachedPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
        if (posts.length === 0) {
            table.innerHTML = '<p class="empty-state">No posts yet. Create your first insight.</p>';
            return;
        }

        posts.forEach(post => {
            const row = document.createElement('div');
            row.className = 'post-row feed-card';
            row.innerHTML = `
                <div>
                    <div class="row-top">
                        <div class="avatar">AR</div>
                        <div>
                            <p class="blog-date">${formatDate(post.date)} • ${post.category}</p>
                            <h4>${post.title}</h4>
                        </div>
                    </div>
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

    function setStatus(message) {
        if (!status) return;
        status.textContent = message;
    }

    form.addEventListener('submit', async event => {
        event.preventDefault();
        const id = document.getElementById('post-id').value || undefined;
        const post = {
            id,
            title: document.getElementById('post-title').value.trim(),
            date: document.getElementById('post-date').value,
            category: document.getElementById('post-category').value,
            excerpt: document.getElementById('post-excerpt').value.trim(),
            content: document.getElementById('post-content').value.trim()
        };

        setStatus('Saving…');
        const saved = await upsertPost(post);
        cachedPosts = await syncPosts();
        renderTable();
        setStatus(apiHealthy ? 'Saved to server' : 'Saved locally (start server to sync)');
        form.reset();
        document.getElementById('post-id').value = '';
        document.getElementById('post-date').valueAsDate = new Date();
    });

    table.addEventListener('click', async event => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const action = target.dataset.action;
        const id = target.dataset.id;
        if (!action || !id) return;

        if (action === 'edit') {
            const post = cachedPosts.find(p => p.id === id);
            if (!post) return;
            document.getElementById('post-id').value = post.id;
            document.getElementById('post-title').value = post.title;
            document.getElementById('post-date').value = post.date;
            document.getElementById('post-category').value = post.category;
            document.getElementById('post-excerpt').value = post.excerpt;
            document.getElementById('post-content').value = post.content;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        if (action === 'delete') {
            setStatus('Deleting…');
            await deletePost(id);
            cachedPosts = await syncPosts();
            renderTable();
            setStatus(apiHealthy ? 'Deleted on server' : 'Deleted locally (sync when server is running)');
        }
    });

    resetBtn?.addEventListener('click', () => {
        document.getElementById('post-id').value = '';
        document.getElementById('post-date').valueAsDate = new Date();
        setStatus('Ready for a new post');
    });

    seedBtn?.addEventListener('click', async () => {
        setStatus('Resetting sample posts…');
        await seedPosts();
        cachedPosts = await syncPosts();
        renderTable();
        setStatus(apiHealthy ? 'Sample posts reloaded from server' : 'Sample posts loaded locally');
    });
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
