import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Manifesto } from '@/components/Manifesto';
import { IslamicGuidance } from '@/components/IslamicGuidance';
import { PromiseTracker } from '@/components/PromiseTracker';
import { GrievanceBox } from '@/components/GrievanceBox';
import { EmergencyServices } from '@/components/EmergencyServices';
import { BudgetTransparency } from '@/components/BudgetTransparency';
import { AgricultureCorner } from '@/components/AgricultureCorner';
import { CertificateGuide } from '@/components/CertificateGuide';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-emerald-600 selection:text-white">
      <Navbar />
      <Hero />
      <Manifesto />
      <IslamicGuidance />
      <PromiseTracker />
      <GrievanceBox />
      <EmergencyServices />
      <BudgetTransparency />
      <AgricultureCorner />
      <CertificateGuide />
      <Footer />
    </main>
  );
}
