const faqs = [
  { q: "What should I wear?", a: "Dress code is formal — but comfortable!" },
  { q: "Can I bring a plus one?", a: "Please check your invitation for guest details." },
  { q: "Are children welcome?", a: "Sadly no — we are planning a child-free wedding." },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="py-20 bg-orange-100 text-center shadow-md"
    >
      <h3 className="text-3xl font-serif mb-10 text-gray-800">FAQ</h3>

      <div className="max-w-2xl mx-auto text-left text-gray-800">
        {faqs.map((f, i) => (
          <details
            key={i}
            className="border border-orange-200 bg-white/60 mb-4 p-5 rounded-md shadow-sm hover:bg-white/80 transition"
          >
            <summary className="font-semibold cursor-pointer text-gray-900">
              {f.q}
            </summary>
            <p className="mt-3 text-gray-700 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
