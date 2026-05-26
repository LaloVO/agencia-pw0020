import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin } from 'lucide-react';
import { CBFProperty, formatPrice } from '@/lib/cbf';

interface PropertyCardProps {
  property: CBFProperty;
  variant?: 'default' | 'compact';
}

const PropertyCard = ({ property, variant = 'default' }: PropertyCardProps) => {
  const image = property.imagenes_propiedades?.[0]?.image_url ?? 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop';
  const badge = property.id_tipo_accion === 2 ? 'Renta' : 'Venta';
  const location = [property.colonia, property.ciudad_nombre || property.direccion].filter(Boolean).join(' • ') || '';

  if (variant === 'compact') {
    return (
      <Link
        to={`/properties/${property.id}`}
        className="group block bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden border border-white/40 shadow-card hover:shadow-elegant transition-all duration-500 hover:scale-[1.02]"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl m-3">
          <img
            src={image}
            alt={property.nombre}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07253D]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-[#0B3C5D] text-white text-xs font-sans font-bold uppercase tracking-wider rounded-full shadow-md">
              {badge}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-[#C9A84C] font-sans font-extrabold text-xl block drop-shadow-md">
              {formatPrice(property.precio)}
            </span>
          </div>
        </div>
        <div className="px-6 pb-6 pt-2">
          <h3 className="font-sans font-bold text-lg text-[#0B3C5D] group-hover:text-[#C9A84C] transition-colors mb-1 truncate">
            {property.nombre}
          </h3>
          <p className="font-sans text-xs text-muted-foreground mb-4 flex items-center gap-1 truncate">
            <MapPin className="w-3 h-3 text-[#C9A84C]" />
            {location}
          </p>
          <div className="flex gap-4 text-xs font-semibold text-[#0B3C5D]/80 border-t border-black/5 pt-3">
            {property.habitaciones != null && (
              <span className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-[#C9A84C]" />
                {property.habitaciones} Rec.
              </span>
            )}
            {property.banios != null && (
              <span className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-[#C9A84C]" />
                {property.banios} Bañ.
              </span>
            )}
            {property.area != null && (
              <span className="flex items-center gap-1.5">
                <Square className="w-4 h-4 text-[#C9A84C]" />
                {property.area} m²
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/properties/${property.id}`}
      className="min-w-[85vw] md:min-w-[30vw] group cursor-pointer snap-center block transition-all duration-300 hover:scale-[1.01]"
    >
      <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-3xl border border-white/30 shadow-card group-hover:shadow-elegant">
        <img
          src={image}
          alt={property.nombre}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07253D]/40 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="px-3.5 py-1.5 bg-[#0B3C5D] text-white text-xs font-sans font-bold uppercase tracking-wider rounded-full shadow-lg">
            {badge}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/40 shadow-md">
          <span className="font-sans font-extrabold text-lg text-[#0B3C5D] whitespace-nowrap">
            {formatPrice(property.precio)}
          </span>
        </div>
      </div>
      <div className="px-2">
        <h3 className="font-sans font-bold text-2xl text-[#0B3C5D] mb-1 group-hover:text-[#C9A84C] transition-colors leading-snug">
          {property.nombre}
        </h3>
        <p className="font-sans text-sm text-muted-foreground flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#C9A84C]" />
          {location}{property.area ? ` • ${property.area} m²` : ''}
        </p>
      </div>
    </Link>
  );
};

export default PropertyCard;
