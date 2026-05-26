import { useEffect, useRef, useState } from 'react';
import { Hammer, Landmark, ShieldCheck } from 'lucide-react';

const PhilosophySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const servicios = [
    {
      num: "01",
      icon: <Hammer className="w-8 h-8 text-[#C9A84C]" />,
      title: "Remodelación & Revalorización",
      desc: "Transformamos propiedades deterioradas o desactualizadas sin costo inicial para ti. Remodelamos estratégicamente para incrementar su valor comercial y atraer compradores calificados en tiempo récord."
    },
    {
      num: "02",
      icon: <Landmark className="w-8 h-8 text-[#C9A84C]" />,
      title: "Liquidación de Deudas",
      desc: "¿Tu casa tiene adeudos vigentes con INFONAVIT o el Banco? Nos encargamos de todo el proceso legal y financiero para liquidar los pasivos pendientes y recuperar la plusvalía acumulada."
    },
    {
      num: "03",
      icon: <ShieldCheck className="w-8 h-8 text-[#C9A84C]" />,
      title: "Venta Comercial Acelerada",
      desc: "Diseñamos un plan de comercialización boutique a la medida, eliminando intermediarios lentos. Convertimos un patrimonio estancado en liquidez inmediata y en un nuevo comienzo financiero."
    }
  ];

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12 bg-[#07253D] text-white relative overflow-hidden"
    >
      {/* Decorative Gold Blurs */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-[#C9A84C]/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#0B3C5D]/30 rounded-full blur-[100px]" />

      <div className="luxury-container relative z-10">
        <div className="max-w-3xl mb-20">
          <span
            className={`text-[#C9A84C] text-xs uppercase tracking-[0.25em] font-extrabold block mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Servicios Inmobiliarios de Alta Gama
          </span>
          <h2
            className={`font-sans text-3xl md:text-5xl font-extrabold tracking-tight leading-tight transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Soluciones integrales para convertir <span className="text-[#C9A84C]">problemas inmobiliarios</span> en oportunidades de ganancia.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {servicios.map((s, i) => (
            <div
              key={s.num}
              className={`flex flex-col p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#C9A84C]/30 hover:bg-white/10 transition-all duration-500 ease-out group shadow-card hover:shadow-elegant relative overflow-hidden transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {/* Background index numbers */}
              <span className="absolute top-4 right-6 text-7xl font-serif font-extrabold text-[#C9A84C]/10 select-none leading-none group-hover:text-[#C9A84C]/20 transition-colors">
                {s.num}
              </span>

              <div className="p-3 bg-white/5 rounded-2xl w-fit mb-6 border border-white/10 group-hover:bg-[#C9A84C]/10 transition-all duration-300">
                {s.icon}
              </div>

              <h3 className="font-sans font-bold text-xl text-white group-hover:text-[#C9A84C] transition-colors mb-3 leading-snug">
                {s.title}
              </h3>
              
              <p className="font-sans text-sm text-white/70 leading-relaxed font-medium">
                {s.desc}
              </p>

              {/* Accent Line Hover indicator */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#C9A84C] group-hover:w-full transition-all duration-500 ease-out" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
