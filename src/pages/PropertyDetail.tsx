import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Bed, Bath, Square, Car, MapPin, MessageCircle, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchProperty, formatPrice } from '@/lib/cbf';
import { useSiteUser } from '@/hooks/useSiteUser';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, site } = useSiteUser();

  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchProperty(id!),
    enabled: !!id,
  });

  const rawPhone = user?.telefono_usuario || '5210000000000';
  const cleanPhone = rawPhone.replace(/\D/g, '');
  const whatsappMsg = property
    ? encodeURIComponent(`Hola Asesor Demo, me interesa recibir más información sobre la propiedad: ${property.nombre}`)
    : '';
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappMsg}`;

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="pt-24 min-h-screen bg-[#FAF7F2] px-6 md:px-12 luxury-container animate-pulse">
          <div className="h-8 bg-muted rounded-full w-1/3 mb-8" />
          <div className="aspect-video bg-muted rounded-3xl mb-8" />
          <div className="h-10 bg-muted rounded-full w-1/2 mb-4" />
          <div className="h-4 bg-muted rounded-full w-1/3" />
        </main>
        <Footer />
      </>
    );
  }

  if (error || !property) {
    return (
      <>
        <Navbar />
        <main className="pt-24 min-h-screen bg-[#FAF7F2] flex items-center justify-center">
          <div className="text-center p-8 bg-white/40 backdrop-blur rounded-3xl border border-white/40 shadow-card max-w-md">
            <p className="font-sans font-bold text-2xl text-[#0B3C5D] mb-4">Propiedad no encontrada</p>
            <Link to="/mapa" className="inline-flex px-6 py-3 rounded-full bg-[#0B3C5D] text-white font-sans font-bold text-xs uppercase tracking-wider hover:bg-[#C9A84C] hover:text-[#07253D] transition-colors">
              Ver todas las propiedades
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const images = property.imagenes_propiedades ?? [];
  const mainImage = images[0]?.image_url ?? 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop';
  const badge = property.id_tipo_accion === 2 ? 'Renta' : 'Venta';
  const location = [property.colonia, property.ciudad_nombre || property.direccion].filter(Boolean).join(', ');

  return (
    <>
      <Helmet>
        <title>{property.nombre} | {site?.site_name || 'Agencia'}</title>
        <meta name="description" content={property.descripcion ?? property.nombre} />
      </Helmet>

      <Navbar />

      <main className="pt-24 min-h-screen bg-[#FAF7F2]">
        {/* Back */}
        <div className="px-6 md:px-12 py-6 luxury-container">
          <Link
            to="/mapa"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-[#0B3C5D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a las propiedades
          </Link>
        </div>

        {/* Images Grid */}
        <div className="px-6 md:px-12 luxury-container mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-3xl overflow-hidden border border-white/30 shadow-card">
            <div className="aspect-[4/3] md:aspect-auto md:row-span-2 overflow-hidden">
              <img src={mainImage} alt={property.nombre} className="w-full h-full object-cover hover:scale-102 transition-transform duration-700" />
            </div>
            {images.slice(1, 3).map((img, i) => (
              <div key={i} className="aspect-[4/3] overflow-hidden">
                <img src={img.image_url} alt={`${property.nombre} ${i + 2}`} className="w-full h-full object-cover hover:scale-102 transition-transform duration-700" />
              </div>
            ))}
            {images.length <= 1 && (
              <div className="aspect-[4/3] bg-muted/20 flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200"
                  alt="Interior Fallback"
                  className="w-full h-full object-cover opacity-45"
                />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 md:px-12 luxury-container pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Details Column */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3.5 py-1 bg-[#0B3C5D] text-white text-xs font-sans font-bold uppercase tracking-wider rounded-full">
                    {badge}
                  </span>
                  {property.tipo && (
                    <span className="px-3.5 py-1 bg-white border border-black/5 text-[#0B3C5D] text-xs font-sans font-bold rounded-full capitalize">
                      {property.tipo}
                    </span>
                  )}
                </div>

                <h1 className="font-sans font-extrabold text-3xl md:text-5xl text-[#0B3C5D] mb-4 tracking-tight leading-tight">
                  {property.nombre}
                </h1>

                {location && (
                  <p className="flex items-center gap-1.5 text-muted-foreground font-sans text-sm font-semibold">
                    <MapPin className="w-4 h-4 text-[#C9A84C]" />
                    {location}
                  </p>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {property.habitaciones != null && (
                  <div className="bg-white/60 backdrop-blur border border-white/50 rounded-2xl p-5 text-center shadow-sm">
                    <Bed className="w-5 h-5 mx-auto mb-2 text-[#C9A84C]" />
                    <p className="font-sans font-extrabold text-xl text-[#0B3C5D]">{property.habitaciones}</p>
                    <p className="text-[10px] text-muted-foreground font-sans font-bold uppercase tracking-wider">Recámaras</p>
                  </div>
                )}
                {property.banios != null && (
                  <div className="bg-white/60 backdrop-blur border border-white/50 rounded-2xl p-5 text-center shadow-sm">
                    <Bath className="w-5 h-5 mx-auto mb-2 text-[#C9A84C]" />
                    <p className="font-sans font-extrabold text-xl text-[#0B3C5D]">{property.banios}</p>
                    <p className="text-[10px] text-muted-foreground font-sans font-bold uppercase tracking-wider">Baños</p>
                  </div>
                )}
                {property.area != null && (
                  <div className="bg-white/60 backdrop-blur border border-white/50 rounded-2xl p-5 text-center shadow-sm">
                    <Square className="w-5 h-5 mx-auto mb-2 text-[#C9A84C]" />
                    <p className="font-sans font-extrabold text-xl text-[#0B3C5D]">{property.area}m²</p>
                    <p className="text-[10px] text-muted-foreground font-sans font-bold uppercase tracking-wider">Superficie</p>
                  </div>
                )}
                {property.estacionamientos != null && (
                  <div className="bg-white/60 backdrop-blur border border-white/50 rounded-2xl p-5 text-center shadow-sm">
                    <Car className="w-5 h-5 mx-auto mb-2 text-[#C9A84C]" />
                    <p className="font-sans font-extrabold text-xl text-[#0B3C5D]">{property.estacionamientos}</p>
                    <p className="text-[10px] text-muted-foreground font-sans font-bold uppercase tracking-wider">Cochera</p>
                  </div>
                )}
              </div>

              {property.descripcion && (
                <div className="bg-white/50 backdrop-blur border border-white/40 p-8 rounded-3xl shadow-sm">
                  <h2 className="font-sans font-bold text-xl text-[#0B3C5D] mb-4">Descripción</h2>
                  <p className="font-sans text-muted-foreground leading-relaxed whitespace-pre-line font-medium text-sm sm:text-base">
                    {property.descripcion}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-elegant space-y-6">
                <div>
                  <span className="text-[10px] text-muted-foreground font-sans font-bold uppercase tracking-wider block mb-1">
                    {badge === 'Renta' ? 'Renta mensual' : 'Valor de inversión'}
                  </span>
                  <p className="font-sans font-black text-3xl sm:text-4xl text-[#0B3C5D]">{formatPrice(property.precio)}</p>
                </div>

                {/* Agent Card */}
                <div className="flex items-center gap-4 py-4 border-t border-b border-black/5">
                  <img
                    src="/agent-avatar.svg"
                    alt="Asesor Demo"
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#C9A84C] bg-white"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200";
                    }}
                  />
                  <div>
                    <p className="font-sans font-extrabold text-sm text-[#0B3C5D]">Asesor Demo</p>
                    <p className="font-sans text-[11px] text-[#C9A84C] font-bold uppercase tracking-wider">Directora Fundadora</p>
                  </div>
                </div>

                {/* Primary CTA */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full font-sans font-bold text-sm transition-all duration-300 shadow-md hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contactar por WhatsApp
                </a>

                {/* Custom funnels card */}
                <div className="pt-4 border-t border-black/5 space-y-3">
                  <h4 className="font-sans font-bold text-xs text-[#0B3C5D] uppercase tracking-wider">¿No es lo que buscas?</h4>
                  <p className="font-sans text-[11px] text-muted-foreground leading-relaxed font-semibold">
                    Si este inmueble no se adapta a tus necesidades exactas, inicia nuestra búsqueda inteligente basada en tu rutina diaria para perfilar tu casa perfecta.
                  </p>
                  <Link
                    to="/solicita-inmueble"
                    className="flex items-center justify-center gap-2 w-full py-3 border border-[#0B3C5D] text-[#0B3C5D] hover:bg-[#0B3C5D] hover:text-white rounded-full font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
                    Búsqueda Inteligente
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PropertyDetail;
