const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs/promises');
const { randomUUID } = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'posts.json');

const seedPosts = [
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

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch (err) {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(seedPosts, null, 2));
  }
}

async function readPosts() {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  const posts = JSON.parse(raw);
  return Array.isArray(posts) ? posts : [...seedPosts];
}

async function writePosts(posts) {
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2));
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await readPosts();
    const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(sorted);
  } catch (err) {
    res.status(500).json({ message: 'Unable to load posts' });
  }
});

app.post('/api/posts', async (req, res) => {
  const { title, date, category, excerpt, content } = req.body || {};
  if (!title || !date || !category || !excerpt || !content) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  try {
    const posts = await readPosts();
    const post = { id: randomUUID(), title, date, category, excerpt, content };
    posts.push(post);
    await writePosts(posts);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Unable to create post' });
  }
});

app.put('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, date, category, excerpt, content } = req.body || {};
  if (!title || !date || !category || !excerpt || !content) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  try {
    const posts = await readPosts();
    const idx = posts.findIndex(p => p.id === id);
    if (idx === -1) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    posts[idx] = { id, title, date, category, excerpt, content };
    await writePosts(posts);
    res.json(posts[idx]);
  } catch (err) {
    res.status(500).json({ message: 'Unable to update post' });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await readPosts();
    const filtered = posts.filter(p => p.id !== id);
    if (filtered.length === posts.length) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    await writePosts(filtered);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Unable to delete post' });
  }
});

app.post('/api/posts/seed', async (_req, res) => {
  try {
    await writePosts(seedPosts);
    res.json(seedPosts);
  } catch (err) {
    res.status(500).json({ message: 'Unable to reset posts' });
  }
});

app.listen(PORT, () => {
  console.log(`Aldott site + blog API running on http://localhost:${PORT}`);
});
