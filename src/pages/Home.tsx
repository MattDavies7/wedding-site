import HeroSection from '../components/HeroSection'
import Countdown from '../components/Countdown'
import VenueInfo from '../components/VenueInfo'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'


export default function Home() {
    return (
        <div className='flex flex-col min-h-screen'>
            <HeroSection />
            <main className='flex-1'>
                <Countdown />
                <VenueInfo />
                <FAQ />
            </main>
            <Footer />
        </div>
    )
}