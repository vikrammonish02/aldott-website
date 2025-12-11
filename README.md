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
