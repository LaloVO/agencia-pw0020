import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSiteUser } from '@/hooks/useSiteUser';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const { site } = useSiteUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.split('#')[1];
      if (isHomePage) {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(`/${href.split('/')[1]}`);
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/#servicios', label: 'Servicios' },
    { href: '/#oportunidades', label: '¿Qué hacer?' },
    { href: '/mapa', label: 'Mapa de Propiedades' },
    { href: '/solicita-inmueble', label: 'Búsqueda Inteligente' },
  ];

  return (
    <nav
      className={`fixed z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? 'top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl rounded-full bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_12px_40px_rgba(11,60,93,0.15)] px-8 py-3'
          : 'top-0 left-0 w-full px-6 py-5 md:px-12 bg-transparent'
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src="/logo-joyce.png"
            alt="3.33 Inmobiliaria"
            className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback if logo fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <span className="font-sans font-bold text-sm tracking-widest text-[#0B3C5D] leading-none uppercase">
              {site?.site_name || '3.33 Inmobiliaria'}
            </span>
            <span className="font-sans text-[10px] tracking-wider text-[#C9A84C] font-semibold">
              Joyce Robles Góngora
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 lg:gap-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavLinkClick(e, link.href)}
              className="text-xs uppercase tracking-widest font-sans font-semibold text-[#0B3C5D] hover:text-[#C9A84C] transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C9A84C] after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
          className="md:hidden p-2 rounded-full bg-[#0B3C5D]/10 hover:bg-[#0B3C5D]/20 text-[#0B3C5D] transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/50 shadow-2xl p-8 z-40 flex flex-col gap-6 md:hidden animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavLinkClick(e, link.href)}
              className="font-sans font-bold text-lg text-[#0B3C5D] hover:text-[#C9A84C] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
