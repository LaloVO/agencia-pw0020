import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShieldAlert, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="relative w-full h-[100vh] overflow-hidden flex flex-col justify-between">
      {/* Background Image with Parallax and Brand Blue Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-[120%] bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop')`,
            transform: `translateY(${scrollY * 0.35}px)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07253D]/80 via-[#07253D]/65 to-[#07253D]/95" />
      </div>

      {/* Top spacing for fixed Navbar offset */}
      <div className="h-[90px]" />

      {/* 60% Upper Section: Editorial Tagline & USP Banner */}
      <div className="relative z-10 w-full luxury-container flex-1 flex flex-col justify-center py-6">
        <div className="max-w-4xl">
          {/* Micro-badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#C9A84C] text-xs font-sans font-bold uppercase tracking-wider mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Asesoría Inmobiliaria Estratégica</span>
          </div>

          <h1 className="font-sans font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.1] mb-6 tracking-tight">
            <span
              className={`block transition-all duration-1000 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              ¿Tienes una casa
            </span>
            <span
              className={`block text-[#C9A84C] transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              abandonada o con deuda?
            </span>
          </h1>

          <p
            className={`font-sans text-white/80 text-base sm:text-xl font-medium max-w-2xl leading-relaxed mb-8 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            La revalorizamos sin costo inicial, liquidamos tus deudas de INFONAVIT o Banco y la vendemos al mejor precio. Convierte un dolor de cabeza en ganancias reales.
          </p>
        </div>
      </div>

      {/* 40% Lower Section: Floating Search & Consultation Pill */}
      <div className="relative z-10 w-full pb-16 px-6 md:pb-24">
        <div className="luxury-container">
          <div
            className={`bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-[2.5rem] flex flex-col lg:flex-row gap-3 max-w-5xl shadow-[0_20px_50px_rgba(7,37,61,0.4)] transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
          >
            {/* Quick Consultation CTA */}
            <div className="flex-1 flex flex-col sm:flex-row items-center gap-4 bg-white/95 rounded-[2rem] px-8 py-5 border border-white/50">
              <ShieldAlert className="w-8 h-8 text-[#0B3C5D] shrink-0 hidden sm:block" />
              <div className="text-center sm:text-left">
                <p className="font-sans font-bold text-sm text-[#0B3C5D]">
                  ¿Quieres vender y liquidar tu deuda?
                </p>
                <p className="font-sans text-xs text-muted-foreground mt-0.5 font-medium">
                  Solicita tu diagnóstico financiero inmobiliario 100% gratuito.
                </p>
              </div>
              <button
                onClick={() => navigate('/solicita-inmueble')}
                className="w-full sm:w-auto sm:ml-auto px-6 py-3 rounded-full bg-[#C9A84C] text-[#07253D] font-sans font-bold text-xs uppercase tracking-wider hover:bg-[#0B3C5D] hover:text-white transition-colors duration-300"
              >
                Iniciar Diagnóstico
              </button>
            </div>

            {/* Properties Explorer CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#0B3C5D] rounded-[2rem] px-8 py-5 border border-white/10 lg:w-[350px]">
              <Search className="w-6 h-6 text-[#C9A84C] shrink-0" />
              <div className="text-center sm:text-left flex-1">
                <p className="font-sans font-bold text-sm text-white">
                  ¿Buscas comprar?
                </p>
                <p className="font-sans text-xs text-white/70 mt-0.5 font-medium">
                  Explora las oportunidades en el mapa.
                </p>
              </div>
              <button
                onClick={() => navigate('/mapa')}
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-white/10 text-white font-sans font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-[#0B3C5D] transition-colors duration-300 border border-white/20"
              >
                Ver Mapa
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
