import React, { useState } from 'react';
import { Download, Check } from 'lucide-react';
import {
  BrandLockup,
  LogoLayout,
  LogoSurface,
  generateStandaloneLogoSvg,
} from './BrandLogo';

const SURFACE_OPTIONS: { id: LogoSurface; label: string; bgClass: string; textClass: string }[] = [
  { id: 'light', label: 'Alabastro', bgClass: 'bg-[#F9F8F6]', textClass: 'text-[#161513]' },
  { id: 'dark', label: 'Obsidiana', bgClass: 'bg-[#161513]', textClass: 'text-[#F9F8F6]' },
  { id: 'forest', label: 'Bosque', bgClass: 'bg-[#1B4332]', textClass: 'text-[#F9F8F6]' },
];

const LAYOUT_OPTIONS: { id: LogoLayout; label: string }[] = [
  { id: 'horizontal', label: 'Horizontal' },
  { id: 'vertical', label: 'Vertical' },
  { id: 'monogram', label: 'Monograma' },
];

const PALETTE_SWATCHES = [
  { name: 'Alabastro Mineral', hex: '#F9F8F6', role: 'Fondo principal (60%)' },
  { name: 'Obsidiana Editorial', hex: '#161513', role: 'Tipografía y estructura (30%)' },
  { name: 'Bosque Arquitectónico', hex: '#1B4332', role: 'Acento primario de marca' },
  { name: 'Latón Bruñido', hex: '#9A7B3E', role: 'Emblema y clave de arco' },
];

export const LogoShowcaseSection: React.FC = () => {
  const [surface, setSurface] = useState<LogoSurface>('light');
  const [layout, setLayout] = useState<LogoLayout>('vertical');
  const [downloaded, setDownloaded] = useState(false);

  const activeSurface = SURFACE_OPTIONS.find((s) => s.id === surface) ?? SURFACE_OPTIONS[0];

  const handleDownloadSvg = () => {
    const svgContent = generateStandaloneLogoSvg(layout, surface);
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `logo-mujer-inmobiliaria-${layout}-${surface}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    window.setTimeout(() => setDownloaded(false), 2400);
  };

  return (
    <section id="logotipo" className="py-20 lg:py-28 border-t border-[#E2DFD9] bg-[#F3F1EC]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Brand architecture rationale */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#57534E]">
                Identidad Visual · Propuesta de Logotipo
              </p>
              <h2 className="mt-3 text-3xl lg:text-4xl font-medium tracking-tight text-[#161513] leading-[1.12] [text-wrap:balance]">
                Un monograma arquitectónico para Mujer Inmobiliaria &amp; Asociadas
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#57534E]">
                Diseñamos un emblema original que reemplaza las siluetas genéricas de tejados por
                una geometría de arcos entrelazados, evocando solidez patrimonial, acompañamiento
                humano y rigor arquitectónico.
              </p>
            </div>

            <div className="space-y-5 pt-2 border-t border-[#E2DFD9]">
              <div>
                <h3 className="font-sans text-sm font-semibold text-[#161513]">
                  01. Doble Arco &amp; Umbral «M»
                </h3>
                <p className="mt-1 text-sm text-[#57534E] leading-relaxed">
                  Dos arcos continuos confluyen en el eje central para formar la inicial «M» y un
                  vano interior abierto que simboliza acceso transparente y respaldo colectivo.
                </p>
              </div>
              <div>
                <h3 className="font-sans text-sm font-semibold text-[#161513]">
                  02. Clave de Latón &amp; Línea de Horizonte
                </h3>
                <p className="mt-1 text-sm text-[#57534E] leading-relaxed">
                  El rombo superior actúa como piedra clave estructural —símbolo de certeza
                  jurídica— mientras el trazo base representa tierra, cimiento y plusvalía.
                </p>
              </div>
              <div>
                <h3 className="font-sans text-sm font-semibold text-[#161513]">
                  03. Sistema Cromático y Tipográfico
                </h3>
                <p className="mt-1 text-sm text-[#57534E] leading-relaxed">
                  Cormorant Garamond aporta presencia editorial de firma boutique; Plus Jakarta Sans
                  ordena precios, ubicaciones y fichas técnicas con lectura nítida.
                </p>
              </div>
            </div>

            {/* Palette grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {PALETTE_SWATCHES.map((swatch) => (
                <div
                  key={swatch.hex}
                  className="bg-white border border-[#E2DFD9] p-3 flex items-center gap-3"
                >
                  <span
                    className="w-7 h-7 shrink-0 border border-black/10"
                    style={{ backgroundColor: swatch.hex }}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#161513] truncate">{swatch.name}</p>
                    <p className="font-mono text-[11px] text-[#57534E] tabular-nums">{swatch.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Logo Canvas & Vector Download */}
          <div className="lg:col-span-7 bg-white border border-[#E2DFD9] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E2DFD9]">
              {/* Layout switcher */}
              <div className="flex items-center gap-1 p-1 bg-[#F3F1EC] border border-[#E2DFD9]">
                {LAYOUT_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLayout(item.id)}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      layout === item.id
                        ? 'bg-white text-[#161513] shadow-xs'
                        : 'text-[#57534E] hover:text-[#161513]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Surface switcher */}
              <div className="flex items-center gap-1 p-1 bg-[#F3F1EC] border border-[#E2DFD9]">
                {SURFACE_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSurface(item.id)}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      surface === item.id
                        ? 'bg-white text-[#161513] shadow-xs'
                        : 'text-[#57534E] hover:text-[#161513]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live interactive logo preview canvas */}
            <div
              className={`mt-6 min-h-[300px] sm:min-h-[340px] flex items-center justify-center p-8 sm:p-12 border border-[#E2DFD9] transition-colors duration-200 ${activeSurface.bgClass}`}
            >
              <BrandLockup layout={layout} surface={surface} />
            </div>

            {/* Footer actions inside card */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-[#57534E]">
                Formato vectorial escalable listo para sitio web, papelería, señalética y firma
                digital.
              </p>
              <button
                type="button"
                onClick={handleDownloadSvg}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1B4332] text-white text-xs font-medium hover:bg-[#143326] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332]"
              >
                {downloaded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>SVG descargado</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Descargar Logo SVG</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
