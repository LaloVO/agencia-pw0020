import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Heart, Shield } from "lucide-react";

export default function SmartSearchCTA() {
  return (
    <section className="py-24 bg-[#FAF7F2] border-t border-black/5 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#C9A84C]/5 blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-[#0B3C5D]/5 blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Columna Texto: Editorial Revista Lujo */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#0B3C5D]/10 border border-[#0B3C5D]/25 px-4 py-1.5 rounded-full text-xs font-bold text-[#0B3C5D] uppercase tracking-wider font-sans">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
              Exclusivo para Compradores y Rentas
            </div>
            
            <h2 className="font-sans text-3xl md:text-5xl text-[#07253D] font-extrabold tracking-tight leading-tight">
              Encuentra la residencia ideal según tu estilo de vida
            </h2>
            
            <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed font-medium">
              Deja de buscar propiedades en listas rígidas. A través de nuestro embudo calificado de 6 pasos, define tus necesidades reales, tu presupuesto viable, tus métodos de financiamiento y documentación. 
            </p>
            
            <p className="font-sans text-xs md:text-sm text-muted-foreground/80 leading-relaxed font-semibold">
              Nuestro motor avanzado analiza tu rutina diaria para conectar tu perfil con residencias que realmente potencien tu bienestar.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-black/5">
              <div className="flex gap-2">
                <Heart className="w-5 h-5 text-[#C9A84C] shrink-0" />
                <div>
                  <h4 className="font-sans font-bold text-xs text-[#07253D]">Búsqueda por Rutina</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">Analizamos tus necesidades familiares e interés.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Shield className="w-5 h-5 text-[#C9A84C] shrink-0" />
                <div>
                  <h4 className="font-sans font-bold text-xs text-[#07253D]">Expediente Seguro</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">Tus documentos protegidos por cifrado central.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/solicita-inmueble"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0B3C5D] hover:bg-[#C9A84C] text-white hover:text-[#07253D] rounded-full font-sans font-bold text-sm transition-all duration-300 shadow-elegant hover:scale-105"
              >
                Comenzar Búsqueda Inteligente
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Columna Imagen: Luxury Floating Card Mockup */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Imagen Principal */}
            <div className="aspect-[4/3] w-full max-w-lg rounded-3xl overflow-hidden shadow-elegant border border-white/40 relative">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
                alt="Luxury Estate Lifestyle"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Tarjeta Glassmorphic Flotante (Mockup del Funnel) */}
            <div className="absolute -bottom-6 left-6 md:-left-6 max-w-xs bg-white/50 backdrop-blur-lg border border-white/60 rounded-2xl p-5 shadow-elegant animate-float z-20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#0B3C5D] flex items-center justify-center font-sans text-xs text-white font-bold">
                  IA
                </div>
                <div>
                  <h5 className="font-sans font-bold text-xs text-[#07253D]">Perfil de Estilo de Vida</h5>
                  <span className="text-[9px] text-muted-foreground block font-semibold">Evaluando requerimientos...</span>
                </div>
              </div>

              <p className="font-sans text-[11px] text-[#07253D] italic leading-relaxed bg-white/70 p-2.5 rounded-xl border border-white/30 font-medium">
                &ldquo;Familia con 2 hijos pequeños y mascota. Requiere oficina para home office con internet de alta velocidad, jardín privado amplio, y escuelas bilingües a menos de 15 minutos de distancia.&rdquo;
              </p>

              <div className="flex items-center justify-between mt-3 text-[10px] font-sans font-bold text-green-700">
                <span>✓ Rango de Presupuesto: Apto</span>
                <span>Match: 96%</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
