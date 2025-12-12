export default function OpenFAST() {
  return (
    <div className="section">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="card">
          <h1 className="text-3xl font-bold text-primary">OpenFAST Cloud Simulations</h1>
          <p className="text-gray-700 mt-2">Aldott is building a cloud-native OpenFAST stack for rapid loads calculations. Upload turbine models, configure DLCs, and receive certification-ready outputs.</p>
          <p className="text-gray-700 mt-2">This is a placeholder for the upcoming microservice integration. The UI below indicates expected workflows.</p>
        </div>
        <div className="card bg-secondary">
          <h3 className="font-semibold text-primary">Coming Soon</h3>
          <form className="grid gap-4 mt-4">
            <label className="flex flex-col text-sm font-semibold text-gray-700">Upload turbine model (disabled)
              <input type="file" disabled className="mt-1 border rounded-lg px-3 py-2 bg-gray-100" />
            </label>
            <label className="flex flex-col text-sm font-semibold text-gray-700">Select DLC set (disabled)
              <select disabled className="mt-1 border rounded-lg px-3 py-2 bg-gray-100">
                <option>IEC DLC 1.x</option>
                <option>IEC DLC 6.x</option>
              </select>
            </label>
            <p className="text-sm text-gray-700">TODO: Wire this form to a cloud microservice for OpenFAST job orchestration, as described in README.</p>
            <button disabled className="btn-primary opacity-50 cursor-not-allowed">Submit Simulation</button>
          </form>
        </div>
      </div>
    </div>
  );
}
