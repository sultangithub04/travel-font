import Image from "next/image";

export default async function TravallerDetailsCard({ results }: { results: any }) {
  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Traveler not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-600 via-teal-800 to-[#0f0f0f] pb-20">

      {/* Top section with cover */}
      <section className="relative h-60 w-full">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-25"></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
      </section>

      {/* Profile section */}
      <div className="max-w-5xl mx-auto px-5 -mt-20 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end gap-6">
          {/* Profile Image */}
          <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-2xl">
            <Image
              src={
                results?.profilePhoto ||
                "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
              }
              alt={results?.name}
              width={200}
              height={200}
              className="object-cover"
            />
          </div>

          {/* Name Info */}
          <div>
            <h1 className="text-4xl font-bold text-white flex items-center gap-2">
              {results.name}

              {results.address && (
                <span className="text-sm px-2 py-1 bg-blue-500 text-white rounded-md shadow-sm">
                  Verified
                </span>
              )}
            </h1>

            <p className="text-gray-300 mt-2">
              Joined on{" "}
              <span className="font-medium">
                {new Date(results.createdAt).toLocaleDateString()}
              </span>
            </p>

            <p className="text-gray-300 lowercase mt-1">
              {results.email}
            </p>
          </div>
        </div>

        {/* CARD INFO AREA */}
        <div className="bg-white/10 mt-10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6">
          {/* About Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-3">User Details</h2>

            <div className="space-y-3 text-gray-300">
              <p><span className="font-semibold text-white">Name:</span> {results.name}</p>
              <p><span className="font-semibold text-white">Address:</span> {results.address || "Not added yet"}</p>
              <p><span className="font-semibold text-white">Bio:</span> {results.bio || "No bio available"}</p>
            </div>
          </div>
        </div>

        {/* Travel Highlights */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
          
          {/* Travel Interests */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-3">Travel Interests</h3>
            {results.travelInterests ? (
              <ul className="list-disc ml-4 text-gray-300 space-y-1">
                {results.travelInterests.map((interest: string, idx: number) => (
                  <li key={idx}>{interest}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No interests added</p>
            )}
          </div>

          {/* Countries Visited */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-3">Visited Countries</h3>
            {results.visitedCountries ? (
              <ul className="text-gray-300 space-y-2">
                {results.visitedCountries.map((country: string, idx: number) => (
                  <li key={idx} className="bg-teal-600/30 px-3 py-1 rounded-md inline-block">
                    {country}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No data yet</p>
            )}
          </div>

          {/* Currently Traveling */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-3">Current Location</h3>
            <p className="text-gray-300">
              {results.currentLocation || "Not traveling currently"}
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
