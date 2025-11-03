import React from "react";
import Navbar from "../components/Navbar";

export default function GuestDashboard() {
  return (
    <div className="bg-orange-50 min-h-screen text-gray-800 scroll-smooth">
      {/* 🧭 Navbar */}
      <Navbar />

      {/* 1️⃣ Welcome Section */}
  <section
  id="welcome"
  className="relative flex flex-col items-center text-center min-h-[90vh] bg-cover bg-center"
  style={{
    backgroundImage: "url('/Img/Lester & Matthew-40.jpg')", // replace with your own image
  }}
>
  <div className="absolute inset-0 bg-black/30"></div>

  {/*  Content wrapper positioned near top */}
  <div className="relative z-10 text-white px-6 mt-[8vh] sm:mt-[10vh] md:mt-[12vh] flex flex-col items-center">
    <h1 className="text-5xl font-serif mb-4 drop-shadow-lg">
      Welcome to Our Wedding!
    </h1>
    <a
      href="#rsvp"
      className="bg-orange-400 hover:bg-orange-500 transition text-white font-semibold px-6 py-3 rounded-full shadow-lg"
    >
      Scroll to RSVP ↓
    </a>
  </div>
</section>

{/* 2️⃣ RSVP Section */}
<section
  id="rsvp"
  className="py-20 bg-orange-100 text-center flex flex-col items-center"
>
  <h2 className="text-3xl font-serif mb-8 text-gray-800">RSVP</h2>
  <form
    onSubmit={async (e) => {
      e.preventDefault();
      const name = (e.target as any).name.value;
      const attending = (e.target as any).attending.value === "yes";

      try {
        const res = await fetch("http://localhost:5000/api/rsvp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, attending }),
        });

        const data = await res.json();
        if (data.success) {
          alert("✅ RSVP submitted successfully!");
          (e.target as HTMLFormElement).reset();
        } else {
          alert("❌ There was a problem submitting your RSVP.");
        }
      } catch (err) {
        console.error(err);
        alert("❌ Could not connect to the server.");
      }
    }}
    className="bg-white/90 shadow-md rounded-2xl p-8 w-[90%] max-w-md border border-orange-200"
  >
    <label className="block text-left mb-2 text-gray-700">Full Name</label>
    <input
      type="text"
      name="name"
      className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:ring-2 focus:ring-orange-300 outline-none"
      placeholder="Your Name"
      required
    />

    <label className="block text-left mb-2 text-gray-700">Will you attend?</label>
    <select
      name="attending"
      className="w-full border border-gray-300 rounded-md p-3 mb-6 focus:ring-2 focus:ring-orange-300 outline-none"
    >
      <option value="yes">Yes, can’t wait!</option>
      <option value="no">Sadly can’t make it</option>
    </select>

    <button
      type="submit"
      className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-lg shadow transition"
    >
      Submit RSVP
    </button>
  </form>
</section>


      {/* 3️⃣ Photo Upload & Gallery */}
      <section
        id="gallery"
        className="py-20 bg-white text-center flex flex-col items-center"
      >
        <h2 className="text-3xl font-serif mb-8 text-gray-800">
          Share Your Photos
        </h2>
        <p className="max-w-lg mb-6 text-gray-600">
          Upload your favorite moments from the night and relive them with everyone.
        </p>

        {/* Upload Button (not functional yet) */}
        <button
          disabled
          className="bg-orange-400 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-500 disabled:opacity-60"
        >
          Upload Photos (Coming Soon)
        </button>

        {/* Small Scrollable Gallery */}
        <div className="mt-10 w-full overflow-x-auto">
          <div className="flex gap-4 px-6 pb-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="min-w-[200px] h-[150px] rounded-xl bg-orange-200/50 border border-orange-100 flex items-center justify-center text-gray-500 font-medium"
              >
                Photo {n}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ FAQ Section */}
      <section
  id="faq"
  className="py-20 bg-orange-100 text-center flex flex-col items-center"
>
  <h2 className="text-3xl font-serif mb-8 text-gray-800">FAQs</h2>
  <div className="max-w-2xl w-[90%] text-left space-y-4">
    {[
      {
        q: "What should I wear?",
        a: "Dress code: Summer formal – think elegant but comfortable!",
      },
      {
        q: "Are kids invited?",
        a: "We love your little ones, but this will be an adults-only celebration.",
      },
      {
        q: "Where should I stay?",
        a: "Nearby hotels and Airbnb options are available — check the invite for recommendations.",
      },
      {
        q: "When should I arrive?",
        a: "The ceremony begins at 2 PM — please aim to arrive by 1:30 PM.",
      },
    ].map((faq, i) => (
      <details
        key={i}
        className="bg-white rounded-lg p-4 shadow-sm border border-orange-200"
      >
        <summary className="font-semibold text-gray-800 cursor-pointer">
          {faq.q}
        </summary>
        <p className="mt-2 text-gray-600">{faq.a}</p>
      </details>
    ))}
  </div>
</section>


      {/* 5️⃣ Footer */}
      <footer className="py-10 bg-orange-400 text-white text-center">
        <p className="font-serif text-md">Matthew &amp; Lester</p>
      </footer>
    </div>
  );
}
