import Image from "next/image";
import { exo } from "./font";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="w-full h-screen bg-black relative flex items-center justify-center overflow-hidden">
        {/* Centered Image */}

        <div className="absoulte z-10">
          <Image
            src="/pic.png"
            height={200}
            width={500}
            alt=" Image conveying Actor Concept"
          />
        </div>
        <h1
          className={`${exo.className} 
    lg:text-8xl md:text-6xl text-5xl 
    font-black leading-tight absolute top-[45%] z-20 
    
    bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200 

    drop-shadow-[0_0_8px_rgba(255,121,27,0.7)] 
    tracking-wider // Slightly more space between letters
  `}
        >
          Agentic Decision Modeling
        </h1>

        <div className="absolute top-[65%] w-1/2 z-20">
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-white"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-white"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-white"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-white"></div>

          <div className="relative bg-black border border-primary rounded-3xl p-10 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(0,255,255,0.03)_50%,transparent_100%)] bg-[length:100%_4px] animate-pulse pointer-events-none"></div>

            <div className="absolute top-0 left-0 right-0 h-1 bg-primary opacity-80"></div>
            <div className="absolute top-2 right-4  text-xs  tracking-widest opacity-60">
              CLASSIFIED
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

            <div className="relative flex items-center justify-evenly">
              <div className="group relative flex flex-col items-center">
                <div className="absolute -inset-4 border border-primary/0 group-hover:border-primary/50 transition-all duration-300"></div>

                <p className=" text-xl font-bold tracking-wider animate-pulse">
                  ADAPTIVE
                </p>
                <div className="h-px w-full bg-primary/30 mt-2"></div>
              </div>

              <div className="h-20 w-px bg-primary/30 relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45"></div>
              </div>

              <div className="group relative flex flex-col items-center">
                <div className="absolute -inset-4 border border-primary/0 group-hover:border-primary/50 transition-all duration-300"></div>

                <p className=" text-xl font-bold tracking-wider animate-pulse">
                  EFFICIENCY
                </p>
                <div className="h-px w-full bg-primary/30 mt-2"></div>
              </div>

              <div className="h-20 w-px bg-primary/30 relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45"></div>
              </div>

              <div className="group relative flex flex-col items-center">
                <div className="absolute -inset-4 border border-primary/0 group-hover:border-primary/50 transition-all duration-300"></div>

                <p className=" text-xl font-bold tracking-wider animate-pulse">
                  AUTONOMY
                </p>
                <div className="h-px w-full bg-primary/30 mt-2"></div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary opacity-80"></div>
            <div className="absolute bottom-2 left-4  text-xs font-mono tracking-widest opacity-60">
              SYSTEM ACTIVE
            </div>
          </div>
        </div>
      </section>
      {/* Our Mission */}
      <section className="mx-auto max-w-4xl space-y-8 mt-20 px-12 py-24 text-center">
        <h5 className="text-3xl font-semibold leading-relaxed ">
          Our Mission is sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat.
        </h5>
      </section>

      {/* The Actor Concept */}
      <section className="flex items-center justify-between gap-16 px-12 py-24">
        <div>
          <Image
            src="/vercel.svg"
            height={200}
            width={200}
            alt=" Image conveying Actor Concept"
          />
        </div>
        <div className="w-1/2 space-y-6">
          <h1 className="text-3xl font-bold ">Meet the actor</h1>
          <p className="leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <button className="rounded-lg bg-black px-8 py-3 font-semibold text-white transition">
            Learn More
          </button>
        </div>
      </section>

      <section className="flex items-center justify-between gap-16 px-12 py-24">
        <div className="w-1/2 space-y-6">
          <h1 className="text-3xl font-bold ">
            Use Case: How an Actor Solves Real-World Problems
          </h1>
          <p className="leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <button className="rounded-lg bg-black px-8 py-3 font-semibold text-white transition">
            Learn More
          </button>
        </div>
        <div>
          <Image
            src="/vercel.svg"
            height={200}
            width={200}
            alt=" Image conveying Actor Concept"
          />
        </div>
      </section>

      {/* Contact */}
      <section className="space-y-8 bg-gray-50 px-12 py-24">
        <h2 className="text-center text-6xl font-bold text-gray-900">
          Need a Demo?
        </h2>
        <p className="text-right text-lg font-medium text-gray-700">
          Contact Us
        </p>
      </section>
    </>
  );
}
