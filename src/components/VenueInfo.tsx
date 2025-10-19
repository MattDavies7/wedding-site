export default function VenueInfo() {
    return (
      <section className="py-20 bg-pink-50 text-center">
        <h3 className="text-3xl font-serif mb-4">The Celebration</h3>
        <p className="mb-6 text-gray-700">Beamish Hall Hotel - Coppy Ln, Beamish, Stanley DH9 0YB</p>
        <div className="max-w-3xl mx-auto">
          <iframe
            title="venue-map"
            src="https://www.google.com/maps/place/Beamish+Hall+Hotel/@54.8880194,-1.6712755,497m/data=!3m2!1e3!4b1!4m9!3m8!1s0x487e78e1955eb419:0x3eeb4991b5ad907d!5m2!4m1!1i2!8m2!3d54.8880194!4d-1.6712755!16s%2Fm%2F04qbh87?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
            width="100%"
            height="300"
            className="rounded-lg border-0 shadow-md"
          ></iframe>
        </div>
      </section>
    )
  }
  