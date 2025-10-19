const faqs = [
    { q: 'What should I wear?', a: 'Dress code is ....' },
    { q: 'Can I bring a plus one?', a: 'Please check your invitation.' },
    { q: 'Are children welcome?', a: 'Sadly no. We are planning a child-free wedding.' },
  ]
  
  export default function FAQ() {
    return (
      <section className="py-16 bg-white text-center">
        <h3 className="text-3xl font-serif mb-6">FAQ</h3>
        <div className="max-w-2xl mx-auto text-left">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="border rounded-lg mb-3 p-4 hover:bg-pink-50 transition"
            >
              <summary className="font-medium cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-gray-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    )
  }
  