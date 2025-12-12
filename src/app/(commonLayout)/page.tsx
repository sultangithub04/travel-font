// import { Hero } from "@/components/modules/Home/Hero";
// import Specialities from "@/components/modules/Home/Specialties";
// import Steps from "@/components/modules/Home/Steps";
// import Testimonials from "@/components/modules/Home/Testimonials";
// import TopRatedDoctors from "@/components/modules/Home/TopRatedDoctors";
// import Head from "next/head";

// export default function Home() {
//   return (
//     <>
//       <Head>
//         <title>AI-Powered Healthcare - Find Your Perfect Doctor</title>
//         <meta
//           name="description"
//           content="Discover top-rated doctors tailored to your needs with our AI-powered healthcare platform. Get personalized recommendations and book appointments effortlessly."
//         />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <main>
//         <Hero />
//         <Specialities />
//         <TopRatedDoctors />
//         <Steps />
//         <Testimonials />
//       </main>
//     </>
//   );
// }
import CTAButton from "@/components/modules/Home/CtaButton";
import FeaturedTravelers from "@/components/modules/Home/FeatureTraveller";
import HowItWorks from "@/components/modules/Home/HowtoWorks";
import Testi from "@/components/modules/Home/test";
import TopDestinations from "@/components/modules/Home/TopDestination";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>AI-Powered Healthcare - Find Your Perfect Doctor</title>
        <meta
          name="description"
          content="Discover top-rated doctors tailored to your needs with our AI-powered healthcare platform. Get personalized recommendations and book appointments effortlessly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* <Hero /> */}
        <div className="flex flex-col items-center w-full">
        <TopDestinations />

        </div>

        <section className="py-16 bg-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Travel Partner?</h2>
          <p className="text-gray-600 mb-8">
            Meet like-minded travelers, share costs & enjoy the journey!
          </p>

          <CTAButton />
        </section>
        <FeaturedTravelers />
        <Testi />
        <HowItWorks />

      </main>
    </>
  );
}
