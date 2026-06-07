import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Home, ArrowUpRight } from 'lucide-react';

const OportunidadesDiagonal = () => {
  const [hoveredPanel, setHoveredPanel] = useState<'left' | 'right' | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Responsive clip-paths based on hover state (Desktop only, mobile will stack naturally)
  const getLeftClipPath = () => {
    if (hoveredPanel === 'left') return 'polygon(0 0, 68% 0, 52% 100%, 0 100%)';
    if (hoveredPanel === 'right') return 'polygon(0 0, 48% 0, 32% 100%, 0 100%)';
    return 'polygon(0 0, 58% 0, 42% 100%, 0 100%)';
  };

  const getRightClipPath = () => {
    if (hoveredPanel === 'left') return 'polygon(68% 0, 100% 0, 100% 100%, 52% 100%)';
    if (hoveredPanel === 'right') return 'polygon(48% 0, 100% 0, 100% 100%, 32% 100%)';
    return 'polygon(58% 0, 100% 0, 100% 100%, 42% 100%)';
  };

  return (
    <section
      id="oportunidades"
      ref={sectionRef}
      className={`relative h-[110vh] md:h-[80vh] w-full overflow-hidden transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Mobile Layout (Natural stacked columns) */}
      <div className="flex flex-col h-full w-full md:hidden">
        {/* Left Mobile */}
        <div className="flex-1 bg-[#0B3C5D] text-white p-8 flex flex-col justify-center gap-4 relative">
          <div className="absolute top-4 right-4 bg-white/10 p-2 rounded-full border border-white/20">
            <ShieldAlert className="w-5 h-5 text-[#C9A84C]" />
          </div>
          <span className="text-[#C9A84C] text-[10px] tracking-widest font-extrabold uppercase">Para Propietarios</span>
          <h3 className="font-sans font-bold text-2xl">¿Deudas de INFONAVIT o Banco?</h3>
          <p className="font-sans text-xs text-white/70 leading-relaxed font-medium">
            Liquidamos deudas y remodelamos tu casa sin costo inicial para venderla rápidamente. ¡Recupera tu dinero!
          </p>
          <button
            onClick={() => navigate('/solicita-inmueble')}
            className="w-fit px-5 py-2.5 rounded-full bg-[#C9A84C] text-[#07253D] font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-2 mt-2 shadow-lg"
          >
            <span>Iniciar Diagnóstico</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Mobile */}
        <div className="flex-1 bg-[#FAF7F2] text-[#07253D] p-8 flex flex-col justify-center gap-4 border-t border-black/5 relative">
          <div className="absolute top-4 right-4 bg-[#0B3C5D]/10 p-2 rounded-full border border-[#0B3C5D]/10">
            <Home className="w-5 h-5 text-[#0B3C5D]" />
          </div>
          <span className="text-[#0B3C5D] text-[10px] tracking-widest font-extrabold uppercase">Para Compradores</span>
          <h3 className="font-sans font-bold text-2xl">¿Buscas Oportunidades de Compra?</h3>
          <p className="font-sans text-xs text-muted-foreground leading-relaxed font-medium">
            Explora nuestro inventario curado de propiedades revalorizadas y listas para habitar en Monterrey.
          </p>
          <button
            onClick={() => navigate('/mapa')}
            className="w-fit px-5 py-2.5 rounded-full bg-[#0B3C5D] text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-2 mt-2 shadow-lg"
          >
            <span>Explorar en Mapa</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Desktop Layout (Interactive Diagonal Split-Screen) */}
      <div className="hidden md:block relative w-full h-full">
        {/* Left Diagonal Panel */}
        <div
          onMouseEnter={() => setHoveredPanel('left')}
          onMouseLeave={() => setHoveredPanel(null)}
          onClick={() => navigate('/solicita-inmueble')}
          className="absolute inset-y-0 left-0 w-full bg-[#0B3C5D] text-white transition-all duration-700 ease-out cursor-pointer flex flex-col justify-center pl-16 pr-[45%] lg:pl-24"
          style={{
            clipPath: getLeftClipPath(),
            zIndex: hoveredPanel === 'left' ? 20 : 10,
          }}
        >
          {/* Subtle Background House Image */}
          <div className="absolute inset-0 z-0 opacity-15 mix-blend-overlay">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200"
              alt="Casa deudas"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-lg flex flex-col gap-6">
            <div className="w-12 h-12 bg-white/10 backdrop-blur border border-white/20 rounded-2xl flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-[#C9A84C]" />
            </div>
            <span className="text-[#C9A84C] text-xs font-sans font-extrabold uppercase tracking-widest">
              ¿Tienes problemas con tu propiedad?
            </span>
            <h2 className="font-sans font-extrabold text-3xl lg:text-4xl leading-tight">
              ¿Casa abandonada o con deudas de INFONAVIT / Bancos?
            </h2>
            <p className="font-sans text-sm text-white/80 leading-relaxed font-semibold">
              Nosotros liquidamos tus deudas vigentes, la remodelamos completamente y la vendemos. Te devolvemos tu plusvalía acumulada. Todo sin un solo peso de inversión inicial de tu parte.
            </p>
            <div className="inline-flex items-center gap-3 text-sm font-bold text-[#C9A84C] group mt-4">
              <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C9A84C] group-hover:text-white group-hover:after:bg-white transition-all">
                Iniciar Diagnóstico Financiero Gratuito
              </span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
        </div>

        {/* Right Diagonal Panel */}
        <div
          onMouseEnter={() => setHoveredPanel('right')}
          onMouseLeave={() => setHoveredPanel(null)}
          onClick={() => navigate('/mapa')}
          className="absolute inset-y-0 right-0 w-full bg-[#FAF7F2] text-[#07253D] transition-all duration-700 ease-out cursor-pointer flex flex-col justify-center pr-16 pl-[45%] lg:pr-24 text-right items-end"
          style={{
            clipPath: getRightClipPath(),
            zIndex: hoveredPanel === 'right' ? 20 : 10,
          }}
        >
          {/* Subtle Background Modern Interior */}
          <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
            <img
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200"
              alt="Interior revalorizado"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-lg flex flex-col gap-6 items-end">
            <div className="w-12 h-12 bg-[#0B3C5D]/10 rounded-2xl flex items-center justify-center border border-[#0B3C5D]/10">
              <Home className="w-6 h-6 text-[#0B3C5D]" />
            </div>
            <span className="text-[#0B3C5D] text-xs font-sans font-extrabold uppercase tracking-widest">
              ¿Quieres comprar o invertir?
            </span>
            <h2 className="font-sans font-extrabold text-3xl lg:text-4xl leading-tight">
              ¿Buscas tu próximo hogar o una propiedad de oportunidad?
            </h2>
            <p className="font-sans text-sm text-[#07253D]/80 leading-relaxed font-semibold">
              Explora casas y departamentos listos para escriturar en Monterrey. Propiedades revalorizadas y completamente rehabilitadas con el sello de calidad de Agencia.
            </p>
            <div className="inline-flex items-center gap-3 text-sm font-bold text-[#0B3C5D] group mt-4">
              <span className="relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-full after:h-[2px] after:bg-[#0B3C5D] group-hover:text-[#C9A84C] group-hover:after:bg-[#C9A84C] transition-all">
                Ver Propiedades Disponibles en Mapa
              </span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OportunidadesDiagonal;
