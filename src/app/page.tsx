'use client';

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { MemberCandidateBanner } from '@/components/MemberCandidateBanner';
import { UnionWards } from '@/components/UnionWards';
import { Manifesto } from '@/components/Manifesto';
import { IslamicGuidance } from '@/components/IslamicGuidance';
import { SocialActivities } from '@/components/SocialActivities';
import { PromiseTracker } from '@/components/PromiseTracker';
import { GrievanceModal } from '@/components/GrievanceModal';
import { EmergencyServices } from '@/components/EmergencyServices';
import { BudgetTransparency } from '@/components/BudgetTransparency';
import { AgricultureCorner } from '@/components/AgricultureCorner';
import { CertificateGuide } from '@/components/CertificateGuide';
import { Footer } from '@/components/Footer';
import { useData } from '@/context/DataContext';

export default function Home() {
  const { sectionVisibility, activeTemplate } = useData();

  return (
    <main data-template={activeTemplate} className={`min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-100 selection:bg-emerald-600 selection:text-white transition-colors duration-300 template-${activeTemplate || 'islamic-emerald'}`}>
      <Navbar />
      {sectionVisibility.hero && <Hero />}
      {sectionVisibility.memberCandidates !== false && <MemberCandidateBanner />}
      {sectionVisibility.unionWards && <UnionWards />}
      {sectionVisibility.manifesto && <Manifesto />}
      {sectionVisibility.socialActivities && <SocialActivities />}
      {sectionVisibility.islamicGuidance && <IslamicGuidance />}
      {sectionVisibility.promiseTracker && <PromiseTracker />}
      {sectionVisibility.emergencyServices && <EmergencyServices />}
      {sectionVisibility.budgetTransparency && <BudgetTransparency />}
      {sectionVisibility.agricultureCorner && <AgricultureCorner />}
      {sectionVisibility.certificateGuide && <CertificateGuide />}
      <Footer />
      
      {/* Grievance Interactive Popup Modal */}
      <GrievanceModal />
    </main>
  );
}

