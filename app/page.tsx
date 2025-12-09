import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-screen bg-white">
        <div className="absolute right-12 top-5 w-[480px] space-y-8 rounded-3xl bg-black p-10 shadow-2xl">
          <h1 className="text-4xl font-bold leading-tight text-white">
            Heading regarding to Agentic Decision Modeling
          </h1>
          <div className="flex items-center justify-center py-4">
            <Image
              src="file.svg"
              height={100}
              width={360}
              alt="Hero Section Image"
            />
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="mx-auto max-w-4xl space-y-8 px-12 py-24 text-center">
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
