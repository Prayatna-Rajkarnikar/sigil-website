import Image from "next/image";

export default function Contact() {
  return (
    <>
      {/* Hero / Header Section */}
      <section className="relative h-[60vh] bg-white">
        <div className="absolute left-12 top-1/3 w-[480px] space-y-8 rounded-3xl bg-black p-10 shadow-2xl">
          <h1 className="text-4xl font-bold leading-tight text-white">
            Get in Touch With Us
          </h1>
          <p className="text-lg text-gray-300">
            Have questions about Agentic Decision Modeling? We're here to help.
          </p>
          <div className="flex items-center justify-center py-4">
            <Image
              src="contact.svg"
              height={100}
              width={360}
              alt="Contact Section Image"
            />
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="mx-auto max-w-6xl px-12 py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold ">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                  <div className="h-12 w-full border border-gray-400 rounded-lg bg-white"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                  <div className="h-12 w-full border border-gray-400 rounded-lg bg-white"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
                <div className="h-12 w-full border border-gray-400 rounded-lg bg-white"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
                <div className="h-32 w-full border border-gray-400 rounded-lg bg-white"></div>
              </div>
              <button className="w-full rounded-lg bg-black px-8 py-4 font-semibold text-white transition hover:bg-gray-900">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold ">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center">
                  <div className="h-6 w-6 bg-white"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-5 w-32 bg-gray-800 rounded"></div>
                  <div className="h-4 w-48 bg-gray-400 rounded"></div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center">
                  <div className="h-6 w-6 bg-white"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-5 w-32 bg-gray-800 rounded"></div>
                  <div className="h-4 w-56 bg-gray-400 rounded"></div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center">
                  <div className="h-6 w-6 bg-white"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-5 w-32 bg-gray-800 rounded"></div>
                  <div className="h-4 w-64 bg-gray-400 rounded"></div>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="space-y-4 pt-8">
              <div className="h-6 w-40 bg-gray-900 rounded"></div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-gray-400 rounded"></div>
                  <div className="h-4 w-20 bg-gray-500 rounded"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-gray-400 rounded"></div>
                  <div className="h-4 w-20 bg-gray-500 rounded"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-gray-400 rounded"></div>
                  <div className="h-4 w-20 bg-gray-500 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="space-y-8 bg-gray-50 px-12 py-24">
        <h2 className="text-center text-6xl font-bold text-gray-900">
          Common Questions
        </h2>
        <div className="mx-auto max-w-4xl space-y-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border-b border-gray-300 pb-6">
              <div className="flex justify-between items-center">
                <div className="h-6 w-3/4 bg-gray-700 rounded"></div>
                <div className="h-6 w-6 bg-black rounded"></div>
              </div>
              <div className="mt-4 h-4 w-full bg-gray-400 rounded"></div>
            </div>
          ))}
        </div>
        <div className="text-center pt-8">
          <button className="rounded-lg border-2 border-black px-8 py-3 font-semibold transition hover:bg-black hover:text-white">
            View All FAQs
          </button>
        </div>
      </section>

      {/* Map/CTA Section */}
      <section className="flex items-center justify-between gap-16 px-12 py-24">
        <div className="w-1/2 space-y-6">
          <h1 className="text-3xl font-bold ">Visit Our Office</h1>
          <p className="leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="rounded-lg bg-black px-8 py-3 font-semibold text-white transition hover:bg-gray-900">
            Get Directions
          </button>
        </div>
        <div className="w-1/2">
          <div className="h-96 w-full bg-gradient-to-br from-gray-200 to-gray-400 rounded-2xl flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-black border-4 border-white"></div>
          </div>
        </div>
      </section>
    </>
  );
}