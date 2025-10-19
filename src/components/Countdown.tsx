import { useEffect, useState } from 'react'

export default function Countdown() {
  const target = new Date('2028-07-22T13:00:00')

  const calculateTimeLeft = () => {
    const now = new Date()
    const diff = target.getTime() - now.getTime()

    if (diff <= 0) {
      return { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    // Calculate precise time differences
    let remaining = diff

    const years = Math.floor(remaining / (1000 * 60 * 60 * 24 * 365.25))
    remaining -= years * (1000 * 60 * 60 * 24 * 365.25)

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24))
    remaining -= days * (1000 * 60 * 60 * 24)

    const hours = Math.floor(remaining / (1000 * 60 * 60))
    remaining -= hours * (1000 * 60 * 60)

    const minutes = Math.floor(remaining / (1000 * 60))
    remaining -= minutes * (1000 * 60)

    const seconds = Math.floor(remaining / 1000)

    return { years, days, hours, minutes, seconds }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="countdown" className="py-24 bg-white text-center">
      <h2 className="text-3xl font-serif mb-10">Counting down to our big day</h2>

      <div className="flex flex-wrap justify-center gap-10 text-gray-800">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="w-24">
            <div className="text-5xl font-bold text-pink-600">{value}</div>
            <div className="uppercase text-xs text-gray-500 mt-1 tracking-wider">
              {unit}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
