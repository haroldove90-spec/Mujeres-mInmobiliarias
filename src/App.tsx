import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  Building2,
  Check,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  X,
} from 'lucide-react';
import {
  ADVISORY_STEPS,
  HERO_IMAGE,
  OperationType,
  PROPERTIES,
  PropertyListing,
  RegionState,
  STRATEGIC_REGIONS,
} from './data/properties';
import { BrandMark } from './components/BrandLogo';
import { PropertyCard } from './components/PropertyCard';
import { PropertyModal } from './components/PropertyModal';
import { MortgageSimulator } from './components/MortgageSimulator';
import { LogoShowcaseSection } from './components/LogoShowcaseSection';

type OperationFilter = 'Todas' | OperationType;
type RegionFilter = 'Todas' | RegionState;
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'area-desc';

export default function App() {
  // Navigation & mobile drawer
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero & catalog filtering state
  const [operationFilter, setOperationFilter] = useState<OperationFilter>('Todas');
  const [regionFilter, setRegionFilter] = useState<RegionFilter>('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [onlySaved, setOnlySaved] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>(['qro-campanario-01']);

  // Hero quick-search bar controlled state
  const [heroOp, setHeroOp] = useState<OperationFilter>('Todas');
  const [heroRegion, setHeroRegion] = useState<RegionFilter>('Todas');

  // Hero image resilience
  const [heroImgError, setHeroImgError] = useState(false);

  // Active property modal
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);

  // Mortgage simulator lifted state (connects directly with property modal)
  const [simPrice, setSimPrice] = useState<number>(11450000);
  const [simDownPct, setSimDownPct] = useState<number>(25);
  const [simYears, setSimYears] = useState<number>(20);
  const [simRate, setSimRate] = useState<number>(10.25);

  // Advisory contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactIntent, setContactIntent] = useState('Comprar propiedad');
  const [contactNotes, setContactNotes] = useState('');
  const [contactError, setContactError] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const filteredProperties = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = PROPERTIES.filter((item) => {
      if (operationFilter !== 'Todas' && item.operation !== operationFilter) return false;
      if (regionFilter !== 'Todas' && item.state !== regionFilter) return false;
      if (onlySaved && !savedIds.includes(item.id)) return false;
      if (q) {
        const haystack =
          `${item.title} ${item.zone} ${item.state} ${item.folio} ${item.category}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.priceMxn - b.priceMxn);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.priceMxn - a.priceMxn);
    }
    if (sortBy === 'area-desc') {
      return [...list].sort((a, b) => b.areaLandM2 - a.areaLandM2);
    }
    return list;
  }, [operationFilter, regionFilter, onlySaved, savedIds, searchQuery, sortBy]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setOperationFilter(heroOp);
    setRegionFilter(heroRegion);
    setOnlySaved(false);
    scrollToSection('propiedades');
  };

  const handleFilterByRegion = (state: RegionState) => {
    setRegionFilter(state);
    setOperationFilter('Todas');
    setOnlySaved(false);
    scrollToSection('propiedades');
  };

  const handleResetFilters = () => {
    setOperationFilter('Todas');
    setRegionFilter('Todas');
    setSearchQuery('');
    setOnlySaved(false);
    setSortBy('featured');
  };

  const handleSimulateFromModal = (priceMxn: number) => {
    setSimPrice(priceMxn);
    scrollToSection('simulador');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.includes('@') || contactPhone.trim().length < 8) {
      setContactError(
        'Por favor completa tu nombre, correo electrónico válido y teléfono de contacto.'
      );
      return;
    }
    setContactError('');
    setContactSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6] text-[#161513]">
      {/* Strict 3-Zone Top Bar */}
      <header className="sticky top-0 z-40 bg-[#F9F8F6]/95 backdrop-blur-xs border-b border-[#E2DFD9]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark + Custom Monogram */}
          <a
            href="#inicio"
            className="inline-flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B4332]"
          >
            <BrandMark className="w-7 h-7 shrink-0" strokeColor="#161513" accentColor="#9A7B3E" />
            <span className="font-editorial text-xl sm:text-[22px] font-semibold tracking-tight text-[#161513]">
              Mujer Inmobiliaria &amp; Asociadas
            </span>
          </a>

          {/* Zone 2: 4 Single-line Nav Links */}
          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534E]"
          >
            <a
              href="#propiedades"
              className="hover:text-[#161513] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Propiedades
            </a>
            <a
              href="#regiones"
              className="hover:text-[#161513] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Regiones
            </a>
            <a
              href="#simulador"
              className="hover:text-[#161513] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Simulador
            </a>
            <a
              href="#logotipo"
              className="hover:text-[#161513] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Logotipo
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('contacto')}
              className="hidden sm:inline-flex items-center px-4 py-2 bg-[#1B4332] text-white text-xs font-semibold hover:bg-[#143326] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332]"
            >
              Agendar Asesoría
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="md:hidden w-10 h-10 inline-flex items-center justify-center border border-[#E2DFD9] bg-white text-[#161513] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E2DFD9] bg-[#F9F8F6] px-6 py-4 space-y-3">
            <div className="flex flex-col space-y-2 text-sm font-medium text-[#161513]">
              <a
                href="#propiedades"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5"
              >
                Propiedades
              </a>
              <a href="#regiones" onClick={() => setMobileMenuOpen(false)} className="py-1.5">
                Regiones
              </a>
              <a href="#simulador" onClick={() => setMobileMenuOpen(false)} className="py-1.5">
                Simulador
              </a>
              <a href="#logotipo" onClick={() => setMobileMenuOpen(false)} className="py-1.5">
                Logotipo
              </a>
            </div>
            <button
              type="button"
              onClick={() => scrollToSection('contacto')}
              className="w-full py-2.5 px-4 bg-[#1B4332] text-white text-xs font-semibold cursor-pointer"
            >
              Agendar Asesoría
            </button>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section: Architectural Editorial Split */}
        <section id="inicio" className="border-b border-[#E2DFD9]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-12 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Narrative & Live Search */}
              <div className="lg:col-span-6 flex flex-col justify-between gap-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#57534E]">
                    Santiago de Querétaro · Yucatán · Estado de México
                  </p>
                  <h1 className="mt-4 text-[clamp(2.4rem,4.3vw,3.85rem)] font-medium tracking-tight text-[#161513] leading-[1.06] [text-wrap:balance]">
                    Patrimonio inmobiliario con criterio arquitectónico y certeza jurídica.
                  </h1>
                  <p className="mt-5 text-[15px] sm:text-base leading-relaxed text-[#57534E] max-w-xl">
                    Firma mexicana dirigida por mujeres especialistas en compra, venta, renta y
                    desarrollos. Acompañamiento gratuito y transparente desde la valuación hasta la
                    firma notarial.
                  </p>
                </div>

                {/* Integrated Property Finder */}
                <form
                  onSubmit={handleHeroSearch}
                  className="bg-white border border-[#E2DFD9] p-5 space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="hero-op"
                        className="block text-[11px] uppercase tracking-[0.16em] text-[#57534E] mb-1.5"
                      >
                        Operación
                      </label>
                      <select
                        id="hero-op"
                        value={heroOp}
                        onChange={(e) => setHeroOp(e.target.value as OperationFilter)}
                        className="w-full px-3 py-2.5 text-sm bg-[#F9F8F6] border border-[#E2DFD9] text-[#161513] focus:outline-none focus:border-[#1B4332]"
                      >
                        <option value="Todas">Todas las operaciones</option>
                        <option value="Venta">Venta residencial</option>
                        <option value="Renta">Renta ejecutiva</option>
                        <option value="Terreno">Terrenos &amp; desarrollos</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="hero-region"
                        className="block text-[11px] uppercase tracking-[0.16em] text-[#57534E] mb-1.5"
                      >
                        Plaza estratégica
                      </label>
                      <select
                        id="hero-region"
                        value={heroRegion}
                        onChange={(e) => setHeroRegion(e.target.value as RegionFilter)}
                        className="w-full px-3 py-2.5 text-sm bg-[#F9F8F6] border border-[#E2DFD9] text-[#161513] focus:outline-none focus:border-[#1B4332]"
                      >
                        <option value="Todas">Querétaro, Yucatán y Edo. Méx.</option>
                        <option value="Querétaro">Querétaro</option>
                        <option value="Yucatán">Yucatán</option>
                        <option value="Estado de México">Estado de México</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#1B4332] text-white text-xs font-semibold hover:bg-[#143326] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Explorar portafolio</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToSection('logotipo')}
                      className="inline-flex items-center justify-center px-4 py-3 border border-[#E2DFD9] text-xs font-medium text-[#161513] hover:border-[#161513] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Ver propuesta de logotipo
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Focal Visual */}
              <div className="lg:col-span-6 flex flex-col">
                <div className="relative flex-1 min-h-[320px] lg:min-h-[460px] bg-[#EFECE7] border border-[#E2DFD9] overflow-hidden">
                  {!heroImgError ? (
                    <img
                      src={HERO_IMAGE}
                      alt="Residencia contemporánea de piedra caliza con espejo de agua en Querétaro"
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImgError(true)}
                      className="w-full h-full lg:h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-[#57534E] bg-gradient-to-br from-[#EFECE7] to-[#E2DFD9] p-8">
                      <Building2 className="w-10 h-10" />
                      <span className="font-editorial text-2xl text-[#161513]">
                        Mujer Inmobiliaria &amp; Asociadas
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                    <p className="text-xs text-white/80">
                      Cumbres del Lago · Juriquilla, Querétaro
                    </p>
                    <p className="mt-1 font-editorial text-xl text-white">
                      Residencia Cantilever &amp; Espejo de Agua
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Capabilities Strip */}
            <div className="mt-12 pt-8 border-t border-[#E2DFD9] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="font-mono text-xs text-[#9A7B3E] tabular-nums">01</p>
                <h2 className="mt-1 font-sans text-sm font-semibold text-[#161513]">
                  Asesoría inicial sin costo
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-[#57534E]">
                  Diagnóstico patrimonial personalizado para compradores, propietarios e
                  inversionistas.
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-[#9A7B3E] tabular-nums">02</p>
                <h2 className="mt-1 font-sans text-sm font-semibold text-[#161513]">
                  Valuación comercial real
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-[#57534E]">
                  Análisis comparativo por metro cuadrado y cierres escriturados por corredor.
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-[#9A7B3E] tabular-nums">03</p>
                <h2 className="mt-1 font-sans text-sm font-semibold text-[#161513]">
                  Dictamen legal y fiscal
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-[#57534E]">
                  Revisión previa de gravámenes, escrituras, regímenes y cálculo de impuestos.
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-[#9A7B3E] tabular-nums">04</p>
                <h2 className="mt-1 font-sans text-sm font-semibold text-[#161513]">
                  Red de asesoras en 3 plazas
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-[#57534E]">
                  Operación directa en Querétaro, Mérida y corredores clave del Estado de México.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Curated Property Portfolio */}
        <section id="propiedades" className="py-20 lg:py-24">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E2DFD9]">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#57534E]">
                  Portafolio Verificado
                </p>
                <h2 className="mt-2 text-3xl lg:text-4xl font-medium tracking-tight text-[#161513]">
                  Propiedades seleccionadas
                </h2>
              </div>

              {/* Segmented Operation Tabs */}
              <div
                role="tablist"
                aria-label="Filtrar por tipo de operación"
                className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EFECE7] border border-[#E2DFD9] self-start lg:self-auto"
              >
                {(['Todas', 'Venta', 'Renta', 'Terreno'] as OperationFilter[]).map((op) => (
                  <button
                    key={op}
                    type="button"
                    role="tab"
                    aria-selected={operationFilter === op}
                    onClick={() => setOperationFilter(op)}
                    className={`px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      operationFilter === op
                        ? 'bg-white text-[#161513] shadow-xs'
                        : 'text-[#57534E] hover:text-[#161513]'
                    }`}
                  >
                    {op === 'Terreno' ? 'Terrenos' : op}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Utility Bar */}
            <div className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2DFD9]">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                <div className="relative flex-1 min-w-[220px] max-w-sm">
                  <Search className="w-4 h-4 text-[#57534E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por zona, nombre o folio..."
                    aria-label="Buscar propiedades"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E2DFD9] text-[#161513] focus:outline-none focus:border-[#1B4332]"
                  />
                </div>

                <select
                  aria-label="Filtrar por estado"
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value as RegionFilter)}
                  className="px-3 py-2 text-xs bg-white border border-[#E2DFD9] text-[#161513] focus:outline-none focus:border-[#1B4332]"
                >
                  <option value="Todas">Todas las plazas</option>
                  <option value="Querétaro">Querétaro</option>
                  <option value="Yucatán">Yucatán</option>
                  <option value="Estado de México">Estado de México</option>
                </select>

                <button
                  type="button"
                  onClick={() => setOnlySaved((prev) => !prev)}
                  aria-pressed={onlySaved}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    onlySaved
                      ? 'bg-[#1B4332] text-white border-[#1B4332]'
                      : 'bg-white text-[#161513] border-[#E2DFD9] hover:border-[#161513]'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${onlySaved ? 'fill-current' : ''}`} />
                  <span className="tabular-nums">Guardadas ({savedIds.length})</span>
                </button>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4">
                <span className="text-xs text-[#57534E] font-mono tabular-nums">
                  {filteredProperties.length}{' '}
                  {filteredProperties.length === 1 ? 'propiedad' : 'propiedades'}
                </span>
                <select
                  aria-label="Ordenar propiedades"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2 text-xs bg-white border border-[#E2DFD9] text-[#161513] focus:outline-none focus:border-[#1B4332]"
                >
                  <option value="featured">Orden editorial</option>
                  <option value="price-asc">Menor precio</option>
                  <option value="price-desc">Mayor precio</option>
                  <option value="area-desc">Mayor terreno</option>
                </select>
              </div>
            </div>

            {/* Grid or Empty State */}
            {filteredProperties.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isSaved={savedIds.includes(property.id)}
                    onToggleSave={toggleSave}
                    onSelect={setSelectedProperty}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-8 bg-white border border-[#E2DFD9] p-12 text-center space-y-4">
                <p className="font-editorial text-2xl text-[#161513]">
                  No encontramos propiedades con esos criterios.
                </p>
                <p className="text-sm text-[#57534E] max-w-md mx-auto">
                  Ajusta los filtros de plaza u operación, o contáctanos para una búsqueda privada
                  fuera de catálogo.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-[#1B4332] text-white text-xs font-semibold hover:bg-[#143326] transition-colors cursor-pointer"
                >
                  Restablecer filtros
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Section 2: Strategic Regions */}
        <section id="regiones" className="py-20 lg:py-24 bg-[#F3F1EC] border-t border-[#E2DFD9]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.22em] text-[#57534E]">
                Presencia Territorial
              </p>
              <h2 className="mt-2 text-3xl lg:text-4xl font-medium tracking-tight text-[#161513] [text-wrap:balance]">
                Tres corredores inmobiliarios de alta consolidación
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {STRATEGIC_REGIONS.map((region) => (
                <div
                  key={region.state}
                  className="bg-white border border-[#E2DFD9] p-7 flex flex-col justify-between gap-6"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 text-xs text-[#57534E]">
                      <span className="font-mono uppercase tracking-[0.16em] text-[#9A7B3E]">
                        {region.state}
                      </span>
                      <span className="font-mono tabular-nums">
                        {region.activeCount} en catálogo
                      </span>
                    </div>
                    <h3 className="mt-3 text-2xl font-medium text-[#161513] leading-snug">
                      {region.headline}
                    </h3>
                    <p className="mt-2 text-xs font-medium text-[#1B4332]">{region.corridors}</p>
                    <p className="mt-4 text-sm leading-relaxed text-[#57534E]">{region.summary}</p>
                  </div>

                  <div className="pt-5 border-t border-[#E2DFD9] flex items-center justify-between gap-4">
                    <span className="font-mono text-xs text-[#161513] tabular-nums">
                      {region.appreciation}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleFilterByRegion(region.state)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B4332] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Filtrar plaza</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Advisory Model & Mortgage Simulator */}
        <section className="py-20 lg:py-24 border-t border-[#E2DFD9]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
              {/* Left: Numbered Advisory Method */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#57534E]">
                    Metodología de Firma
                  </p>
                  <h2 className="mt-2 text-3xl lg:text-4xl font-medium tracking-tight text-[#161513] [text-wrap:balance]">
                    Acompañamiento integral de principio a escritura
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#57534E]">
                    Cada operación involucra decisiones patrimoniales, fiscales y legales. Nuestro
                    equipo multidisciplinario de asesoras te acompaña con transparencia en cuatro
                    etapas claras.
                  </p>
                </div>

                <div className="divide-y divide-[#E2DFD9] border-t border-b border-[#E2DFD9]">
                  {ADVISORY_STEPS.map((step) => (
                    <div key={step.number} className="py-5">
                      <h3 className="font-sans text-sm font-semibold text-[#161513]">
                        <span className="font-mono text-[#9A7B3E] mr-2 tabular-nums">
                          {step.number}
                        </span>
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#57534E]">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Live Financial Simulator */}
              <div className="lg:col-span-7">
                <MortgageSimulator
                  propertyPrice={simPrice}
                  onPropertyPriceChange={setSimPrice}
                  downPaymentPct={simDownPct}
                  onDownPaymentPctChange={setSimDownPct}
                  years={simYears}
                  onYearsChange={setSimYears}
                  annualRate={simRate}
                  onAnnualRateChange={setSimRate}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Brand Identity & Bespoke SVG Logo Showcase */}
        <LogoShowcaseSection />

        {/* Section 5: Advisory Lead Capture & Headquarters */}
        <section
          id="contacto"
          className="py-20 lg:py-28 bg-[#161513] text-[#F9F8F6] border-t border-[#292524]"
        >
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left: Headquarters & Direct Channels */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#D4B475]">
                    Atención Personalizada
                  </p>
                  <h2 className="mt-3 text-3xl lg:text-4xl font-medium tracking-tight text-white [text-wrap:balance]">
                    Conversa con una socia asesora sin costo inicial
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#D6D3D1]">
                    Ya sea que busques adquirir patrimonio, comercializar una propiedad o evaluar
                    tierra para desarrollo, asignamos a una especialista según tu plaza y objetivo.
                  </p>
                </div>

                <div className="space-y-4 pt-6 border-t border-white/15 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#D4B475] mt-1 shrink-0" />
                    <div>
                      <p className="font-medium text-white">Oficina Matriz Querétaro</p>
                      <p className="text-[#A8A29E]">
                        Av. Corregidora Nte. 1116, Piso 9, Arboledas, Santiago de Querétaro, Qro.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#D4B475] shrink-0" />
                    <a
                      href="tel:+524422759370"
                      className="font-mono text-white hover:text-[#D4B475] transition-colors tabular-nums"
                    >
                      +52 (442) 275-9370
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#D4B475] shrink-0" />
                    <a
                      href="mailto:contacto@mujerinmobiliariayasociadas.com"
                      className="text-white hover:text-[#D4B475] transition-colors break-all"
                    >
                      contacto@mujerinmobiliariayasociadas.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: Validated Advisory Request Form */}
              <div className="lg:col-span-7 bg-[#1F1D1A] border border-white/15 p-6 sm:p-8">
                {contactSubmitted ? (
                  <div className="py-10 space-y-4">
                    <div className="w-10 h-10 bg-[#1B4332] text-white inline-flex items-center justify-center">
                      <Check className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-medium text-white">
                      Solicitud recibida correctamente
                    </h3>
                    <p className="text-sm text-[#D6D3D1] leading-relaxed max-w-lg">
                      Gracias, <span className="text-white font-medium">{contactName}</span>. Una
                      socia especialista en{' '}
                      <span className="text-white font-medium">{contactIntent.toLowerCase()}</span>{' '}
                      te contactará en menos de 24 horas hábiles al teléfono{' '}
                      <span className="font-mono text-white">{contactPhone}</span>.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setContactSubmitted(false);
                        setContactName('');
                        setContactEmail('');
                        setContactPhone('');
                        setContactNotes('');
                      }}
                      className="px-4 py-2 border border-white/25 text-xs font-medium text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      Enviar otra consulta
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs text-[#D6D3D1] mb-1.5"
                        >
                          Nombre completo
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Tu nombre y apellido"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#161513] border border-white/20 text-white placeholder:text-[#78716C] focus:outline-none focus:border-[#D4B475]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-xs text-[#D6D3D1] mb-1.5"
                        >
                          Teléfono / WhatsApp
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="+52 442 000 0000"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#161513] border border-white/20 text-white placeholder:text-[#78716C] focus:outline-none focus:border-[#D4B475]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs text-[#D6D3D1] mb-1.5"
                        >
                          Correo electrónico
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="nombre@correo.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#161513] border border-white/20 text-white placeholder:text-[#78716C] focus:outline-none focus:border-[#D4B475]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-intent"
                          className="block text-xs text-[#D6D3D1] mb-1.5"
                        >
                          Objetivo de asesoría
                        </label>
                        <select
                          id="contact-intent"
                          value={contactIntent}
                          onChange={(e) => setContactIntent(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm bg-[#161513] border border-white/20 text-white focus:outline-none focus:border-[#D4B475]"
                        >
                          <option value="Comprar propiedad">Comprar propiedad</option>
                          <option value="Vender mi inmueble">Vender mi inmueble</option>
                          <option value="Rentar residencia o espacio">
                            Rentar residencia o espacio
                          </option>
                          <option value="Inversión en terrenos y desarrollos">
                            Inversión en terrenos y desarrollos
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-notes"
                        className="block text-xs text-[#D6D3D1] mb-1.5"
                      >
                        Plaza de interés o detalles del inmueble
                      </label>
                      <textarea
                        id="contact-notes"
                        rows={3}
                        value={contactNotes}
                        onChange={(e) => setContactNotes(e.target.value)}
                        placeholder="Cuéntanos la zona, presupuesto aproximado o características de la propiedad..."
                        className="w-full px-3.5 py-2.5 text-sm bg-[#161513] border border-white/20 text-white placeholder:text-[#78716C] focus:outline-none focus:border-[#D4B475]"
                      />
                    </div>

                    {contactError && <p className="text-xs text-[#FCA5A5]">{contactError}</p>}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                      <span className="text-[11px] text-[#A8A29E]">
                        Asesoría confidencial · Sin compromiso de exclusividad previa.
                      </span>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-[#1B4332] text-white text-xs font-semibold hover:bg-[#235640] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Solicitar asesoría gratuita
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="bg-[#F9F8F6] border-t border-[#E2DFD9] py-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <BrandMark className="w-6 h-6 shrink-0" strokeColor="#161513" accentColor="#9A7B3E" />
            <div>
              <p className="font-editorial text-lg font-semibold text-[#161513] leading-none">
                Mujer Inmobiliaria &amp; Asociadas
              </p>
              <p className="mt-1 text-xs text-[#57534E]">
                Querétaro · Yucatán · Estado de México
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#57534E]">
            <a href="#propiedades" className="hover:text-[#161513] transition-colors">
              Propiedades
            </a>
            <a href="#regiones" className="hover:text-[#161513] transition-colors">
              Regiones
            </a>
            <a href="#simulador" className="hover:text-[#161513] transition-colors">
              Simulador
            </a>
            <a href="#logotipo" className="hover:text-[#161513] transition-colors">
              Logotipo
            </a>
            <a href="#contacto" className="hover:text-[#161513] transition-colors">
              Contacto
            </a>
          </div>

          <p className="text-xs text-[#57534E]">
            © 2026 Mujer Inmobiliaria &amp; Asociadas. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* Property Technical Dossier Modal */}
      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onSimulateMortgage={handleSimulateFromModal}
      />
    </div>
  );
}
