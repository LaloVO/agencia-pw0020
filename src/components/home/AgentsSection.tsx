import { useEffect, useRef, useState } from 'react';
import { useSiteUser } from '@/hooks/useSiteUser';
import { MessageCircle, Award, CheckCircle, TrendingUp } from 'lucide-react';

const AgentsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useSiteUser();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const rawPhone = user?.telefono_usuario || '8125055699';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hola Joyce, me interesa recibir asesoría inmobiliaria gratuita.')}`;

  return (
    <section
      id="perfil"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 bg-white text-[#07253D] relative overflow-hidden"
    >
      <div className="luxury-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Column 1: Profile Image with Glass and Gold accents */}
          <div
            className={`lg:col-span-5 flex justify-center transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
          >
            <div className="relative w-full max-w-[400px] aspect-square md:aspect-[4/5] rounded-[3rem] overflow-hidden bg-gradient-to-tr from-[#0B3C5D]/5 to-[#C9A84C]/5 border border-black/5 shadow-elegant flex items-center justify-center p-6 group">
              {/* Outer Golden Glow Circle */}
              <div className="absolute inset-4 rounded-[2.5rem] border border-[#C9A84C]/30 animate-pulse" />
              
              <img
                src="/joyce-profile.png"
                alt="Joyce Robles Góngora"
                className="w-full h-full object-contain relative z-10 transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  // Fallback photo if profile fails to load
                  e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop";
                }}
              />

              {/* Float badge */}
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur border border-black/10 px-4 py-2 rounded-2xl shadow-md z-20 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                <span className="text-xs font-sans font-bold text-[#0B3C5D] uppercase tracking-wider">
                  Disponible para asesorar
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Bio & Professional Track Record */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span
              className={`text-[#C9A84C] text-xs uppercase tracking-[0.25em] font-extrabold block mb-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Directora & Fundadora
            </span>
            
            <h2
              className={`font-sans text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Joyce Robles Góngora
            </h2>

            <p
              className={`font-sans text-muted-foreground text-base sm:text-lg mb-8 leading-relaxed font-medium transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Con más de una década de experiencia liderando **3.33 Inmobiliaria** en Monterrey, me he especializado en revalorizar el patrimonio familiar. Mi compromiso absoluto es guiarte con transparencia y profesionalismo para transformar un problema de deudas o abandono en liquidez inmediata y paz mental.
            </p>

            {/* Quick stats strip */}
            <div
              className={`grid grid-cols-3 gap-4 border-t border-b border-black/5 py-8 mb-8 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex gap-3 items-start">
                <Award className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-sans font-extrabold text-lg text-[#0B3C5D] leading-none">10+ Años</span>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">De Experiencia</span>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <TrendingUp className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-sans font-extrabold text-lg text-[#0B3C5D] leading-none">350+ Casas</span>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Revalorizadas</span>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-sans font-extrabold text-lg text-[#0B3C5D] leading-none">100%</span>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Transparencia</span>
                </div>
              </div>
            </div>

            {/* Call to action button */}
            <div
              className={`transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0B3C5D] hover:bg-[#C9A84C] text-white hover:text-[#07253D] font-sans font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Hablar Directamente por WhatsApp</span>
              </a>
              <span className="block text-[11px] text-muted-foreground mt-3 font-semibold tracking-wide ml-4">
                Asesoría inicial, diagnóstico legal y avalúo sin costo de intermediación.
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AgentsSection;
