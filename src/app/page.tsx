import { BeforeAfterResultsSection } from "@/components/BeforeAfterResultsSection";
import { BookingBanner } from "@/components/BookingBanner";
import { ClientVideosSection } from "@/components/ClientVideosSection";
import { HomeHero } from "@/components/HomeHero";
import { MobileStickyWhatsappCta } from "@/components/MobileStickyWhatsappCta";
import { PopularServicesSection } from "@/components/PopularServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TreatmentsSection } from "@/components/TreatmentsSection";

export default function Home() {
  return (
    <main className="cinematic-bg cinematic-grain flex-1 bg-page">
      <HomeHero />
      <TreatmentsSection />
      <PopularServicesSection />
      <BeforeAfterResultsSection />
      <TestimonialsSection />
      <ClientVideosSection />
      <BookingBanner />
      <MobileStickyWhatsappCta />
    </main>
  );
}
