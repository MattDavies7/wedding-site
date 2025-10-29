// ✅ Import the image at the top
import venueImg from '../../img/Beamish-Hall-Marriage-Venue.jpg'

export default function VenueInfo() {
  return (
    <section
      id="venue"
      className="relative py-32 text-center bg-cover bg-center bg-no-repeat text-white"
      // ✅ Use the imported image for the background
      style={{
        backgroundImage: `url(${venueImg})`,
      }}
    >
      {/* Optional overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <h3 className="text-4xl font-serif mb-4">The Venue</h3>
        <p className="text-lg mb-8 text-gray-100">
          Beamish Hall Hotel, Stanley
        </p>

        <div className="rounded-lg overflow-hidden shadow-lg border-0 opacity-20 hover:opacity-100 transition-opacity furation-500">
          <iframe
            title="venue-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2450.2294030387525!2d-1.6738504230048468!3d54.888019372776405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e78e1955eb419%3A0x3eeb4991b5ad907d!2sBeamish%20Hall%20Hotel!5e1!3m2!1sen!2suk!4v1761509809277!5m2!1sen!2suk"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  )
}
