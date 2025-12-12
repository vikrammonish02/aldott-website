export default function Dashboard() {
  return (
    <div className="section">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="card">
          <h1 className="text-3xl font-bold text-primary">Author Dashboard</h1>
          <p className="text-gray-700 mt-2">This dashboard will host profile management, post lists, and the LinkedIn-style editor backed by Prisma and NextAuth.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card bg-secondary">
            <h3 className="font-semibold text-primary">My Profile</h3>
            <p className="text-gray-700 text-sm mt-2">TODO: Add protected profile form bound to authenticated user.</p>
          </div>
          <div className="card bg-secondary">
            <h3 className="font-semibold text-primary">My Posts</h3>
            <p className="text-gray-700 text-sm mt-2">TODO: CRUD table for drafts and published articles.</p>
          </div>
        </div>
        <div className="card">
          <h3 className="font-semibold text-primary">Editor Preview</h3>
          <p className="text-gray-700 text-sm mt-2">A TipTap-based editor will live here, mirroring LinkedIn article composition with autosave.</p>
        </div>
      </div>
    </div>
  );
}
