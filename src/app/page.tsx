import HeroSection from '../components/HeroSection';
import LottieAnimation from '../components/LottieAnimation';
import ProjectsSection from '../components/ProjectsSection';
import ViewAllWorksButton from '../components/ViewAllWorksButton';
import ServicesSection from '../components/ServicesSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Inicio */}
      <section id="inicio">
        <HeroSection />
      </section>

      {/* Lottie Animation */}
      <section className="py-20 bg-[#FFFEFA] flex justify-center items-center">
        <LottieAnimation className="w-full max-w-2xl" />
      </section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* View All Works Button */}
      <ViewAllWorksButton />

      {/* Services Section */}
      <ServicesSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
