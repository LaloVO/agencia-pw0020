import { Link } from 'react-router-dom';
import { useSiteUser } from '@/hooks/useSiteUser';
import { Phone, Mail, Facebook, MessageCircle, MapPin } from 'lucide-react';

const Footer = () => {
  const { user, site } = useSiteUser();
  
  const rawPhone = user?.telefono_usuario || '5210000000000';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hola Asesor Demo, me interesa recibir asesoría gratuita sobre mi propiedad.')}`;

  return (
    <footer className="bg-[#07253D] text-white pt-24 pb-12 px-6 md:px-12 border-t border-white/10">
      <div className="luxury-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/agent-avatar.svg"
                alt="Agencia"
                className="h-12 w-auto object-contain bg-white/10 p-1.5 rounded-xl"
              />
              <div className="flex flex-col">
                <span className="font-sans font-bold text-lg tracking-widest text-white leading-none uppercase">
                  {site?.site_name || 'Agencia'}
                </span>
                <span className="font-sans text-xs tracking-wider text-[#C9A84C] font-semibold mt-1">
                  Asesor Demo
                </span>
              </div>
            </Link>
            <p className="font-sans text-sm text-white/70 max-w-sm leading-relaxed">
              Especialistas en remodelación, liquidación y venta acelerada de propiedades con deudas de INFONAVIT o Banco en Monterrey, Nuevo León. Su problema inmobiliario, convertido en oportunidad.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-sans font-bold text-sm uppercase tracking-widest text-[#C9A84C]">
              Contacto y Asesoría
            </h4>
            <div className="flex flex-col gap-3 font-sans text-sm text-white/80">
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center gap-3 hover:text-[#C9A84C] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C9A84C]" />
                <span>{rawPhone.replace(/(\d{2})(\d{4})(\d{4})/, '$1 $2 $3')}</span>
              </a>
              <a
                href={`mailto:${user?.email_usuario || 'joyce.robles@333inmobiliaria.com'}`}
                className="flex items-center gap-3 hover:text-[#C9A84C] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#C9A84C]" />
                <span>{user?.email_usuario || 'contacto@agencia.com'}</span>
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#C9A84C]" />
                <span>Monterrey y Área Metropolitana, N.L.</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-sans font-bold text-sm uppercase tracking-widest text-[#C9A84C]">
              Síguenos en Redes
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-[#C9A84C] hover:text-[#07253D] transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-[#C9A84C] hover:text-[#07253D] transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
            <div className="pt-2">
              <span className="inline-block px-4 py-2 rounded-full border border-white/20 bg-white/5 text-xs font-sans font-semibold tracking-wider text-[#C9A84C]">
                Asesoría 100% Gratuita
              </span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-[10px] text-white/50 uppercase tracking-widest flex flex-col sm:flex-row justify-between gap-4 font-sans">
          <span>© {new Date().getFullYear()} Agencia - Asesor Demo. Todos los derechos reservados.</span>
          <span>Desarrollado en alianza con CBF</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
