import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FormularioMultiStep from "@/components/home/FormularioMultiStep";
import { useSiteUser } from "@/hooks/useSiteUser";

export default function SolicitaInmueble() {
  const { user, site } = useSiteUser();

  return (
    <>
      <Helmet>
        <title>Búsqueda Inteligente | {site?.site_name || '3.33 Inmobiliaria'}</title>
        <meta
          name="description"
          content="Completa nuestra solicitud inteligente de 6 pasos para encontrar tu propiedad ideal. Evaluamos tu estilo de vida, deudas y presupuesto para una recomendación perfecta."
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-[#FAF7F2] pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header de la Sección */}
          <div className="text-center mb-12 space-y-3">
            <span className="text-[10px] md:text-xs tracking-[0.25em] font-sans font-extrabold text-[#C9A84C] uppercase">
              Patrimonio a tu medida
            </span>
            <h1 className="font-sans text-3xl md:text-5xl text-[#0B3C5D] font-extrabold tracking-tight">
              Búsqueda Inteligente Inmobiliaria
            </h1>
            <p className="font-sans text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
              Define tu presupuesto, deudas o créditos vigentes, y cuéntanos sobre tu rutina diaria. Nuestro motor buscará y perfilará las mejores opciones o diagnósticos ideales para ti.
            </p>
          </div>

          {/* Formulario MultiStep */}
          <FormularioMultiStep />
        </div>
      </main>

      <Footer />
    </>
  );
}
