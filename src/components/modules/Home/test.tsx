

// import Image from "next/image";

// const testimonials = [
//   {
//     id: 1,
//     name: "Emily Carter",
//     location: "United Kingdom",
//     image: "",
//     rating: 5,
//     message:
//       "I met amazing travel buddies using this platform. Solo trips are no longer lonely!",
//   },
//   {
//     id: 2,
//     name: "Noah Williams",
//     location: "Canada",
//     image: "",
//     rating: 4,
//     message:
//       "The matching system works great! I found companions with the same interests.",
//   },
//   {
//     id: 3,
//     name: "Aisha Rahman",
//     location: "Bangladesh",
//     image: "",
//     rating: 5,
//     message:
//       "Easy to use and secure platform. I highly recommend it to every traveler.",
//   },
// ];

// const Testi = async() => {
//     const res = await fetch("http://localhost:5000/api/travel-plans");
//   const reviewData = await res.json();
//   const reviw = reviewData?.data;
//   console.log(reviw);
//   return (
//     <section className="py-16 bg-gray-50 dark:bg-neutral-900">
//       <div className="container mx-auto px-4">
//         {/* Section Title */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-teal-600 dark:text-teal-400">
//             Traveler Testimonials
//           </h2>
//           <p className="text-gray-600 dark:text-gray-300 mt-2">
//             Hear from travelers who found companions and unforgettable experiences
//           </p>
//         </div>

//         {/* Testimonial Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {testimonials.map((testimonial) => (
//             <div
//               key={testimonial.id}

//               className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-neutral-700"
//             >
//               <div className="flex items-center space-x-4 mb-4">
//                 <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-teal-500">
//                   <Image
//                     src={testimonial.image}
//                     alt={testimonial.name}
//                     fill
//                     sizes="100%"
//                     className="object-cover"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold">{testimonial.name}</h3>
//                   <p className="text-sm text-gray-500">{testimonial.location}</p>
//                 </div>
//               </div>

//               <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
//                 "{testimonial.message}"
//               </p>

//               <div className="flex items-center space-x-1">
//                 {Array.from({ length: testimonial.rating }).map((_, idx) => (
//                   <svg
//                     key={idx}
//                     className="w-4 h-4 text-yellow-400"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.048 9.397c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.97z" />
//                   </svg>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* CTA */}
//         <div className="text-center mt-10">
//           <div


//             className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition-all"
//           >
//             Explore Travelers
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testi;

import Image from "next/image";

const Testi = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/travel-plans`, {
    cache: "no-store",
  });

  const result = await res.json();
  const plans = result?.data || [];

  // Extract only plans that have reviews
  const reviews = plans
    .filter((item: any) => item?.reviews?.length > 0)
    .map((plan: any) => {
      const firstReview = plan.reviews[0]; // Taking first review
      const traveler = plan?.user?.traveller;

      return {
        id: firstReview.id,
        name: traveler?.name ?? "Unknown User",
        location: traveler?.address ?? "Location Unknown",
        image: traveler?.profilePhoto ?? "/default.png",
        rating: firstReview.rating ?? 0,
        message: firstReview.comment ?? "",
      };
    })
    .slice(0, 3); // only show latest 3 review cards

  return (
    <section className="py-16 bg-gray-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-teal-600 dark:text-teal-400">
            Traveler Testimonials
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Hear from travelers who found companions and unforgettable experiences
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {reviews.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-neutral-700"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-teal-500">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    sizes="100%"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                {testimonial.message}
              </p>

              <div className="flex items-center space-x-1">
                {Array.from({ length: testimonial.rating }).map((_, idx) => (
                  <svg
                    key={idx}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 
      3.966a1 1 0 00.95.69h4.174c.969 
      0 1.371 1.24.588 1.81l-3.381 
      2.455a1 1 0 00-.364 1.118l1.287 
      3.966c.3.921-.756 1.688-1.54 
      1.118L10 15.347l-3.381 2.455c-.783 
      .57-1.838-.197-1.539-1.118l1.287-3.966a1 
      1 0 00-.364-1.118L2.62 9.393c-.783 
      -.57-.38-1.81.588-1.81h4.174a1 1 0 
      00.95-.69l1.286-3.966z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <div className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition-all">
            Explore Travelers
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testi;
