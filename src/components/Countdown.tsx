import { useEffect, useState } from 'react'

export default function Countdown() {
    const targetDate = new Date ('2028-07-22T14:00:00')
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    function calculateTimeLeft() {
        const diff = targetDate.getTime() - new Date().getTime()
        const days = Math.floor((diff / 1000 * 60 * 60 * 24))
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((diff / (1000 * 60)) % 60)
        const seconds = Math.floor ((diff / 1000) % 60)
        return { days, hours, minutes, seconds }
    }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

    return (
        <section id="countdown" className="py-20 bg-white text-center">
            <h2 className="text-3xl font-serif mb-6">Counting down to our big day</h2>
            <div className="flex justify-center gap-6 text-gray-800">
            {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="w-24">
            <div className="text-4xl font-bold">{value}</div>
            <div className="uppercase text-xs text-gray-500">{unit}</div>
            </div>
        ))}
      </div>
    </section>
  )
}
