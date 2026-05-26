import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '@/components/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { ArrowRight, Sparkles } from 'lucide-react';

const SkeletonCard = () => (
  <div className="animate-pulse bg-white/40 backdrop-blur border border-white/30 rounded-3xl p-3 flex flex-col gap-4">
    <div className="aspect-[4/3] rounded-2xl bg-muted" />
    <div className="px-3 flex flex-col gap-2 pb-3">
      <div className="h-6 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded w-1/2" />
      <div className="h-8 bg-muted rounded-full w-full mt-2" />
    </div>
  </div>
);

const PropertiesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { properties, isLoading } = useProperties({ limit: 6 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-[#C9A84C]/5 rounded-full blur-[120px]" />

      <div className="luxury-container relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div
              className={`inline-flex items-center gap-2 text-[#C9A84C] text-xs font-sans font-bold uppercase tracking-widest mb-3 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Oportunidades Destacadas</span>
            </div>
            <h2
              className={`font-sans font-extrabold text-3xl md:text-5xl text-[#0B3C5D] tracking-tight transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Propiedades Revalorizadas
            </h2>
          </div>
          
          <Link
            to="/mapa"
            className={`hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B3C5D]/10 hover:bg-[#0B3C5D] hover:text-white text-[#0B3C5D] font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span>Ver Inventario Completo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : properties.slice(0, 6).map((property, index) => (
                <div
                  key={property.id}
                  className={`transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <PropertyCard property={property} variant="compact" />
                </div>
              ))}
        </div>

        {/* Empty State Fallback if no properties */}
        {!isLoading && properties.length === 0 && (
          <div className="text-center py-20 bg-white/40 backdrop-blur rounded-3xl border border-white/40 shadow-card">
            <p className="font-sans text-lg font-bold text-[#0B3C5D] mb-2">No hay propiedades cargadas en este momento</p>
            <p className="font-sans text-sm text-muted-foreground mb-6">Estamos revalorizando y preparando nuevas propiedades de oportunidad en Monterrey.</p>
            <Link
              to="/solicita-inmueble"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C9A84C] text-[#07253D] font-sans font-bold text-xs uppercase tracking-wider hover:bg-[#0B3C5D] hover:text-white transition-colors shadow-lg"
            >
              <span>Solicitar Búsqueda Personalizada</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Mobile-Only CTA */}
        <div className="md:hidden mt-12 flex justify-center">
          <Link
            to="/mapa"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0B3C5D] text-white font-sans font-bold text-xs uppercase tracking-wider hover:bg-[#C9A84C] hover:text-[#07253D] transition-colors w-full justify-center shadow-lg"
          >
            <span>Ver Inventario Completo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default PropertiesSection;
