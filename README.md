# aldott-website

Professional website for Aldott TechSolution - Wind Energy Consulting with integrated blog system.

## Running locally with the blog API
1. Install dependencies (Node 18+):
   ```bash
   npm install
   ```
2. Start the combined static site + blog API server:
   ```bash
   npm start
   ```
3. Open http://localhost:3000 in your browser. The admin (admin.html) will publish to `/api/posts`; the public blog (blog.html) reads from the same API with local fallback if the API is offline.

### Deploying statically (e.g., GitHub Pages)
* The blog pages will fetch `/api/posts` when the API is available. If you host the site statically, a read-only snapshot is served from `api/posts/index.json`, and create/edit/delete actions fall back to your browser's `localStorage`.
* For collaborative editing or central storage, deploy `server.js` to a small Node host (Railway/Render/Fly) and point the site at that origin (e.g., set `API_URL` in `blog.js`).
