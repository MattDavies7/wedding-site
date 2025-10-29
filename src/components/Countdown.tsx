import { useEffect, useState } from "react"

export default function Countdown() {
  const targetDate = new Date("2028-07-22T14:00:00")

  function calculateTimeLeft() {
    const diff = targetDate.getTime() - new Date().getTime()

    if (diff <= 0) return { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
    const days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 365)
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((diff / (1000 * 60)) % 60)
    const seconds = Math.floor((diff / 1000) % 60)

    return { years, days, hours, minutes, seconds }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="countdown"
      className="py-20 bg-orange-100 text-center"
      style={{ backgroundColor: "#FFE5B4" }} // pastel orange fallback
    >
      <h2 className="text-3xl font-serif mb-8">Counting down to our big day</h2>
      <div className="flex flex-wrap justify-center gap-8 text-gray-800">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="w-24 flex flex-col items-center">
            <div className="text-5xl font-bold leading-tight">{value}</div>
            <div className="uppercase text-sm text-gray-600 mt-1">{unit}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
