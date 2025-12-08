

import Image from "next/image";
import Link from "next/link";

const topDestinations = [
  {
    name: "Bali, Indonesia",
    image: "https://images.pexels.com/photos/2531709/pexels-photo-2531709.jpeg",
    travelers: "12,300+ Travelers",
    link: "/explore?destination=bali",
  },
  {
    name: "Dubai, UAE",
    image: "https://images.pexels.com/photos/17967368/pexels-photo-17967368.jpeg",
    travelers: "8,450+ Travelers",
    link: "/explore?destination=dubai",
  },
  {
    name: "Paris, France",
    image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
    travelers: "10,200+ Travelers",
    link: "/explore?destination=paris",
  },
  {
    name: "Bangkok, Thailand",
    image: "https://images.pexels.com/photos/1319106/pexels-photo-1319106.jpeg",
    travelers: "9,800+ Travelers",
    link: "/explore?destination=bangkok",
  },
  {
    name: "Istanbul, Türkiye",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
    travelers: "7,300+ Travelers",
    link: "/explore?destination=istanbul",
  },
  {
    name: "Maldives",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
    travelers: "11,500+ Travelers",
    link: "/explore?destination=maldives",
  },
];

export default async function TopDestinations() {
  const res= await fetch("http://localhost:5000/api/travel-plans")
  const result= await res.json()
  console.log(result.data);
  return (
    <section className="container py-14">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          🌍 Top Travel Destinations
        </h2>
        <p className="text-muted-foreground">
          Explore the most loved travel spots around the world!
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {topDestinations.map((item) => (
          <Link href={item.link} key={item.name}>
            <div className="group rounded-xl overflow-hidden border hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-muted-foreground">{item.travelers}</p>

                <button className="mt-4 inline-flex text-primary hover:underline">
                  View Travelers →
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
