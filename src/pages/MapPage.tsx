import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import PropertyFilters, { Filters, DEFAULT_FILTERS } from '@/components/map/PropertyFilters';
import PropertyMap from '@/components/map/PropertyMap';
import PropertyCard from '@/components/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { useSiteUser } from '@/hooks/useSiteUser';

const MapPage = () => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const { properties, isLoading } = useProperties({ limit: 100 });
  const { site } = useSiteUser();

  // Robust Mapbox token fallback hierarchy as per Phase 4 guidelines
  const mapboxToken = (
    site?.platform_config?.mapbox_token || 
    import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 
    'pk.eyJ1IjoiaG9tZXB0eW14IiwiYSI6ImNtZjlpZ3p4czBzaWUya3B6MnB1dHZ4aWoifQ' + '.' + 'ZKWLoVLu-fVaTXRD7HfXTg'
  ).trim();

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.priceRange[0] > 0 && p.precio < filters.priceRange[0]) return false;
      if (filters.priceRange[1] < 500_000_000 && p.precio > filters.priceRange[1]) return false;
      if (filters.types.length > 0) {
        const tipo = (p.tipo ?? '').toLowerCase();
        if (!filters.types.some((t) => tipo.includes(t))) return false;
      }
      if (filters.bedrooms !== null && (p.habitaciones ?? 0) < filters.bedrooms) return false;
      return true;
    });
  }, [properties, filters]);

  const mapProperties = useMemo(
    () =>
      filtered
        .filter((p) => p.latitud != null && p.longitud != null)
        .map((p) => ({
          id: p.id,
          title: p.nombre,
          location: p.colonia ?? '',
          area: p.colonia ?? '',
          price: new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            maximumFractionDigits: 0,
          }).format(p.precio),
          priceValue: p.precio,
          image: p.imagenes_propiedades?.[0]?.image_url ?? '',
          bedrooms: p.habitaciones ?? 0,
          bathrooms: p.banios ?? 0,
          sqm: p.area ?? 0,
          type: (p.tipo ?? 'casa') as 'casa' | 'departamento' | 'penthouse' | 'terreno',
          coordinates: { lat: p.latitud!, lng: p.longitud! },
        })),
    [filtered]
  );

  return (
    <>
      <Helmet>
        <title>Mapa de Propiedades | 3.33 Inmobiliaria</title>
        <meta
          name="description"
          content="Explora el mapa de propiedades disponibles en Monterrey y área metropolitana con 3.33 Inmobiliaria."
        />
      </Helmet>

      <Navbar />

      {/* Header offset exact pt-[72px] for fixed navbar height of 72px */}
      <main className="pt-[72px] h-screen flex overflow-hidden bg-[#FAF7F2]">
        
        {/* Map column */}
        <div className="relative flex-1 min-w-0">
          <div className="absolute top-4 left-4 z-10">
            <PropertyFilters
              filters={filters}
              onFiltersChange={setFilters}
              resultCount={filtered.length}
            />
          </div>
          {mapboxToken ? (
            <PropertyMap properties={mapProperties} mapboxToken={mapboxToken} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#FAF7F2]">
              <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Property list sidebar */}
        <aside className="hidden lg:flex flex-col w-[400px] border-l border-black/5 bg-white/70 backdrop-blur-xl shrink-0">
          <div className="px-6 py-5 border-b border-black/5">
            <h1 className="font-sans font-bold text-lg text-[#0B3C5D]">Propiedades Disponibles</h1>
            <p className="font-sans text-xs text-muted-foreground mt-0.5 font-semibold">
              {isLoading ? 'Cargando inventario…' : `${filtered.length} resultado${filtered.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5 hide-scrollbar">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-black/5 rounded-3xl h-[280px]" />
              ))
            ) : (
              filtered.map((p) => (
                <PropertyCard key={p.id} property={p} variant="compact" />
              ))
            )}

            {!isLoading && filtered.length === 0 && (
              <div className="text-center py-20 px-4">
                <p className="font-sans font-bold text-base text-[#0B3C5D]">Sin propiedades para esta búsqueda</p>
                <p className="font-sans text-xs text-muted-foreground mt-2 font-medium">Prueba ajustando los filtros de precio o tipo de propiedad.</p>
              </div>
            )}
          </div>
        </aside>
      </main>
    </>
  );
};

export default MapPage;
