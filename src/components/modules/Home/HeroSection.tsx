"use client";

import image1 from "@/assets/images/image1.jpg";
import image2 from "@/assets/images/image11.jpg";
import image3 from "@/assets/images/image2.jpg";
import image4 from "@/assets/images/image3.jpg";
import image5 from "@/assets/images/image4.jpg";
import image6 from "@/assets/images/image2.jpg";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* 🔹 Image Carousel */}
      <section className="flex justify-center py-6 bg-teal-50 dark:bg-gray-900 transition-colors duration-300">
        <Carousel
          className="container"
          plugins={[
            Autoplay({
              delay: 3500,
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent>
            {[image1, image2, image3, image4, image5, image6].map(
              (src, index) => (
                <CarouselItem key={index}>
                  <div className="p-2 ">
                    <Card className="bg-teal-600 dark:bg-gray-800 shadow-lg">
                      <CardContent className="flex aspect-square items-center justify-center max-h-80">
                        <Image
                          src={src}
                          alt={`Travel Slide ${index + 1}`}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              )
            )}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* 🔹 Hero Text Section */}
      <section className="bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-screen-xl px-6 py-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Discover the world
            <span className="text-teal-600"> together</span>
            <br /> with Travel Buddy
          </h1>

          <p className="mt-5 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find travel companions, join exciting trips, and create unforgettable
            memories. Whether you travel solo, with friends, or family — Travel
            Buddy connects you with the right people.
          </p>

          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <Link
              href="/register"
              className="rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white shadow hover:bg-teal-700 transition"
            >
              Get Started
            </Link>

            <Link
              href="/travel-plans"
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-neutral-800 transition"
            >
              Explore Trips
            </Link>
          </div>
        </div>
      </section>

      {/* 🔹 Features Preview */}
      <section className="bg-teal-50 dark:bg-neutral-800 py-12 flex flex-col items-center container">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
            Why Travel Buddy?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow">
              🌍
              <h3 className="font-semibold text-lg mt-3">Find Travel Partners</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Match with travelers heading to the same destination.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow">
              ✈️
              <h3 className="font-semibold text-lg mt-3">Plan Trips Together</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Create, join, and manage travel plans easily.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow">
              🤝
              <h3 className="font-semibold text-lg mt-3">Safe & Trusted</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Verified profiles and secure communication.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
