export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-start text-white overflow-hidden"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      {/* subtle dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* text block */}
      <div className="relative z-10 flex flex-col justify-center pl-12 md:pl-24 text-left">
        <h1 className="font-serif text-6xl md:text-8xl leading-tight">
          <span className="block">Lester</span>
          <span className="block pl-6 text-4xl md:text-5xl font-light">&</span>
          <span className="block">Matthew</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-200 font-light">
          Wedding date goes here
        </p>
      </div>
    </section>
  )
}

  