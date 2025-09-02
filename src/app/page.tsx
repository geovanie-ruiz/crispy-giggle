"use client";

import { Waitlist } from "@clerk/nextjs";
import { CldImage } from "next-cloudinary";

export default function Home() {
  return (
    <main className="flex flex-grow items-center justify-center align-middle h-full">
      {/* Background image filling the available space without warping */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <CldImage
          src="gd01-key-art"
          alt="Gundam Coach key art background"
          fill
          priority
          sizes="100vw"
          crop="fill"
          gravity="east"
          className="object-cover w-full h-full filter blur-xl sm:blur-lg md:blur-md lg:blur-none transition-opacity duration-500 object-[85%_50%] sm:object-[88%_50%] md:object-[82%_50%] lg:object-[75%_50%]"
        />
        {/* Optional subtle vignette to keep edges less distracting */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/40" />
      </div>

      {/* Vertically centered content within container, aligned with grid */}
      <section className="container w-full">
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="md:col-start-1 md:col-end-3 flex items-center px-6 py-12 sm:px-8 sm:py-16 md:px-10">
            <div className="mx-auto max-w-2xl md:mx-0 md:max-w-2xl w-full">
              {/* Content card with transparent black tint and backdrop to make text pop */}
              <div className="rounded-xl bg-black/35 backdrop-blur-sm backdrop-brightness-75 ring-1 ring-white/10 shadow-2xl p-6 sm:p-8">
                <div className="flex flex-col gap-4 text-left">
                  <h1 className="text-4xl font-bold tracking-tight text-white">
                    Welcome to GCG Coach
                  </h1>
                  <p className="text-base sm:text-lg text-white/80">
                    Analyze your Gundam game match logs to improve your piloting
                    skills. Upload logs, get insights, and track your progress
                    over time.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center pt-4">
                <Waitlist />
              </div>
            </div>
          </div>
          {/* Spacer columns to maintain layout alignment on md+ */}
          <div className="hidden md:block" />
          <div className="hidden md:block" />
        </div>
      </section>
    </main>
  );
}
