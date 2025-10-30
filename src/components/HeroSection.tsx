export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center"
      style={{
        backgroundImage: "url('/hero.jpg')",
        marginTop: 0, // ensure no gap
      }}
    >
      {/* subtle dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* text block */}
      <div className="relative z-10 flex flex-col justify-center text-left px-8 md:px-20 max-w-3xl">
        <h1 className="font-serif text-6xl md:text-8xl leading-tight text-white">
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
