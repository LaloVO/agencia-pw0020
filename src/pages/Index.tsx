import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import PhilosophySection from '@/components/home/PhilosophySection';
import OportunidadesDiagonal from '@/components/home/OportunidadesDiagonal';
import PropertiesSection from '@/components/home/PropertiesSection';
import AIFeatureSection from '@/components/home/AIFeatureSection';
import SmartSearchCTA from '@/components/home/SmartSearchCTA';
import AgentsSection from '@/components/home/AgentsSection';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Agencia | Asesor Demo - Monterrey</title>
        <meta
          name="description"
          content="Especialistas en remodelación, liquidación y venta acelerada de casas con deudas de INFONAVIT o Banco en Monterrey, N.L. Recupere su plusvalía con asesoría 100% gratuita."
        />
      </Helmet>

      <Navbar />

      <main className="overflow-hidden bg-[#FAF7F2]">
        {/* P7: Hero con Grid Vertical (Texto Arriba + Buscador en Glassmorphic Pill) */}
        <HeroSection />
        
        {/* P6: 3-Column Dark Strip (Servicios: Remodelación, Liquidación, Venta) */}
        <PhilosophySection />
        
        {/* P8: Diagonal Transition (Interactiva: ¿Tienes Deudas? vs ¿Buscas Oportunidad?) */}
        <OportunidadesDiagonal />
        
        {/* Grid de Acento de Oro & Liquid-Glass (Propiedades Destacadas) */}
        <PropertiesSection />
        
        {/* AIFeatureSection: Micro-Staging & Big Data */}
        <AIFeatureSection />
        
        {/* SmartSearchCTA: Búsqueda Inteligente Form/Wizard */}
        <SmartSearchCTA />
        
        {/* P5: Immersive Perfil Asesor (Asesor Demo Profile Section) */}
        <AgentsSection />
      </main>

      <Footer />
    </>
  );
};

export default Index;
