export type OperationType = 'Venta' | 'Renta' | 'Terreno';
export type RegionState = 'Querétaro' | 'Yucatán' | 'Estado de México';

export interface PropertyListing {
  id: string;
  folio: string;
  title: string;
  operation: OperationType;
  category: 'Residencial' | 'Villa' | 'Terreno' | 'Corporativo';
  state: RegionState;
  zone: string;
  priceMxn: number;
  priceSuffix?: string;
  areaLandM2: number;
  areaConstM2: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  image: string;
  legalStatus: string;
  advisor: {
    name: string;
    role: string;
    license: string;
  };
  highlights: string[];
  description: string;
}

export const HERO_IMAGE = '/src/assets/images/hero_modern_residence_1794951601307.jpg';

export const PROPERTIES: PropertyListing[] = [
  {
    id: 'qro-campanario-01',
    folio: 'MIA-QRO-104',
    title: 'Residencia Patio de Olivos',
    operation: 'Venta',
    category: 'Residencial',
    state: 'Querétaro',
    zone: 'El Campanario, Santiago de Querétaro',
    priceMxn: 18900000,
    areaLandM2: 680,
    areaConstM2: 520,
    bedrooms: 4,
    bathrooms: 4.5,
    parking: 4,
    image: '/src/assets/images/prop_queretaro_campanario_1794951601828.jpg',
    legalStatus: 'Escritura pública · Libre de gravamen',
    advisor: {
      name: 'Sofía Mendoza Villalobos',
      role: 'Directora de Portafolio Residencial',
      license: 'Lic. Inmobiliaria Qro. 0418',
    },
    highlights: [
      'Doble altura en estancia principal con vigas de roble europeo',
      'Terraza perimetral en piedra caliza apomazada',
      'Cocina de autor equipada con cubierta de cuarcita natural',
      'Seguridad perimetral 24/7 y acceso a casa club',
    ],
    description:
      'Residencia contemporánea concebida alrededor de un patio central con olivos maduros y ventanales de piso a techo. Su orientación sur-oriente privilegia la iluminación natural sin ganancia térmica excesiva, integrando áreas sociales con jardín privado.',
  },
  {
    id: 'yuc-merida-02',
    folio: 'MIA-YUC-208',
    title: 'Villa Chukum & Espejo Esmeralda',
    operation: 'Venta',
    category: 'Villa',
    state: 'Yucatán',
    zone: 'Temozón Norte, Mérida',
    priceMxn: 11450000,
    areaLandM2: 540,
    areaConstM2: 390,
    bedrooms: 3,
    bathrooms: 3.5,
    parking: 3,
    image: '/src/assets/images/prop_merida_yucatan_1794951602848.jpg',
    legalStatus: 'Escritura definitiva · Dictamen predial al día',
    advisor: {
      name: 'Valentina Peón Escalante',
      role: 'Socia Regional Península',
      license: 'Registro Estatal Yuc. 1192',
    },
    highlights: [
      'Acabados artesanales en pasta de chukum y piedra macedonia',
      'Canal de nado de 14 metros con filtración salina',
      'Ventilación cruzada y celosías térmicas de madera tzalam',
      'Suite independiente en planta baja para visitas o estudio',
    ],
    description:
      'Arquitectura yucateca contemporánea ubicada en una privada arbolada de Temozón Norte, a doce minutos de la costa y cercana a centros hospitalarios y universidades de primer nivel.',
  },
  {
    id: 'mex-esmeralda-03',
    folio: 'MIA-MEX-312',
    title: 'Casa Mirador del Bosque',
    operation: 'Venta',
    category: 'Residencial',
    state: 'Estado de México',
    zone: 'Zona Esmeralda, Atizapán',
    priceMxn: 22600000,
    areaLandM2: 750,
    areaConstM2: 590,
    bedrooms: 4,
    bathrooms: 5,
    parking: 5,
    image: '/src/assets/images/prop_edomex_esmeralda_1794951603158.jpg',
    legalStatus: 'Escritura pública · Régimen en condominio',
    advisor: {
      name: 'Camila Aguirre Lozano',
      role: 'Socia Senior Valle de México',
      license: 'Certificación AMPI 2026',
    },
    highlights: [
      'Estructura híbrida de acero negro y piedra laja volcánica',
      'Terraza panorámica con chimenea exterior y vista a reserva',
      'Calefacción hidrónica y ventanería acústica doble vidrio',
      'Bodega de vinos climatizada y estudio privado con acceso propio',
    ],
    description:
      'Emplazada sobre una ladera rodeada de pinos en Zona Esmeralda, esta propiedad combina vistas limpias hacia la cañada con una distribución funcional de tres niveles y máxima privacidad.',
  },
  {
    id: 'qro-juriquilla-04',
    folio: 'MIA-QRO-119',
    title: 'Residencia Cantilever & Alberca Negra',
    operation: 'Renta',
    category: 'Residencial',
    state: 'Querétaro',
    zone: 'Cumbres del Lago, Juriquilla',
    priceMxn: 68000,
    priceSuffix: '/ mes',
    areaLandM2: 610,
    areaConstM2: 445,
    bedrooms: 4,
    bathrooms: 4,
    parking: 3,
    image: '/src/assets/images/hero_modern_residence_1794951601307.jpg',
    legalStatus: 'Contrato con póliza jurídica incluida',
    advisor: {
      name: 'Sofía Mendoza Villalobos',
      role: 'Directora de Portafolio Residencial',
      license: 'Lic. Inmobiliaria Qro. 0418',
    },
    highlights: [
      'Voladizo arquitectónico en concreto aparente y piedra caliza',
      'Espejo de agua climatizado con sistema solar',
      'Ideal para directivos y familias en reubicación corporativa',
      'Mantenimiento de áreas comunes incluido en la renta mensual',
    ],
    description:
      'Disponible para arrendamiento habitacional de mediano o largo plazo. Ofrece recámara principal en planta baja, jardín xerófilo de bajo mantenimiento y conectividad inmediata hacia parques industriales y colegios internacionales.',
  },
  {
    id: 'qro-zibata-05',
    folio: 'MIA-QRO-131',
    title: 'Macrolote Parque Central · Reserva Sur',
    operation: 'Terreno',
    category: 'Terreno',
    state: 'Querétaro',
    zone: 'Valle de Zibatá, El Marqués',
    priceMxn: 4950000,
    areaLandM2: 920,
    areaConstM2: 0,
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    image: '/src/assets/images/prop_terreno_desarrollo_1794951602871.jpg',
    legalStatus: 'Título de propiedad · Uso de suelo H2 habitacional',
    advisor: {
      name: 'Renata Ibarra Domínguez',
      role: 'Especialista en Tierra & Desarrollos',
      license: 'Valuación & Factibilidad',
    },
    highlights: [
      'Frente de 23 metros hacia parque lineal y lago artificial',
      'Topografía plana lista para proyecto arquitectónico a medida',
      'Servicios subterráneos de media tensión, fibra óptica y agua tratada',
      'Plusvalía histórica sostenida superior al 11% anual en la zona',
    ],
    description:
      'Lote unifamiliar de gran formato frente a área verde consolidada. Nuestro equipo acompaña tanto la adquisición jurídica como la vinculación con despachos arquitectónicos y estudios de mecánica de suelos.',
  },
  {
    id: 'yuc-altabrisa-06',
    folio: 'MIA-YUC-224',
    title: 'Suite Corporativa & Piso Ejecutivo',
    operation: 'Renta',
    category: 'Corporativo',
    state: 'Yucatán',
    zone: 'Corredor Norte, Mérida',
    priceMxn: 44500,
    priceSuffix: '/ mes',
    areaLandM2: 240,
    areaConstM2: 240,
    bedrooms: 2,
    bathrooms: 2.5,
    parking: 2,
    image: '/src/assets/images/prop_queretaro_campanario_1794951601828.jpg',
    legalStatus: 'Facturación fiscal disponible · Contrato flexible',
    advisor: {
      name: 'Valentina Peón Escalante',
      role: 'Socia Regional Península',
      license: 'Registro Estatal Yuc. 1192',
    },
    highlights: [
      'Espacio adaptable para despacho boutique o residencia ejecutiva',
      'Terraza privada con iluminación natural filtrada',
      'Seguridad biométrica y recepción ejecutiva 24 horas',
      'A cinco minutos de Prolongación Montejo',
    ],
    description:
      'Propiedad versátil diseñada para firmas de consultoría, notarías o residencia temporal de alta gama en el corredor financiero de mayor dinamismo del sureste.',
  },
];

export interface StrategicRegion {
  state: RegionState;
  corridors: string;
  headline: string;
  summary: string;
  appreciation: string;
  activeCount: number;
}

export const STRATEGIC_REGIONS: StrategicRegion[] = [
  {
    state: 'Querétaro',
    corridors: 'El Campanario · Juriquilla · Zibatá · Arboledas',
    headline: 'Sede central y motor industrial del Bajío',
    summary:
      'Nuestra oficina matriz en Av. Corregidora Nte. coordina operaciones residenciales, parques industriales y macrolotes habitacionales con dictamen notarial previo.',
    appreciation: '+11.4% plusvalía anual promedio',
    activeCount: 3,
  },
  {
    state: 'Yucatán',
    corridors: 'Temozón Norte · Montes de Amé · Corredor Norte',
    headline: 'Seguridad patrimonial y arquitectura bioclimática',
    summary:
      'Selección verificada de villas contemporáneas, tierra de inversión y propiedades frente a corredor médico y corporativo en Mérida.',
    appreciation: '+13.2% plusvalía anual promedio',
    activeCount: 2,
  },
  {
    state: 'Estado de México',
    corridors: 'Zona Esmeralda · Interlomas · Bosques de las Lomas',
    headline: 'Privacidad boscosa y arquitectura residencial de autor',
    summary:
      'Acompañamiento discreto para compra y venta de residencias consolidadas, verificación de regímenes condominales y negociación directa.',
    appreciation: '+8.7% plusvalía anual promedio',
    activeCount: 1,
  },
];

export const ADVISORY_STEPS = [
  {
    number: '01.',
    title: 'Diagnóstico y Curaduría sin Costo',
    description:
      'Escuchamos tu objetivo patrimonial, financiero o familiar para depurar únicamente propiedades con potencial real, evitando visitas improductivas.',
  },
  {
    number: '02.',
    title: 'Valuación Comercial y Análisis de Mercado',
    description:
      'Contrastamos comparables reales cerrados en escritura pública por colonia y metro cuadrado para respaldar cada oferta o precio de salida.',
  },
  {
    number: '03.',
    title: 'Certeza Jurídica y Revisión Registral',
    description:
      'Validamos libertad de gravamen, antecedentes catastrales, uso de suelo, constancias fiscales y contratos privados antes de comprometer cualquier apartado.',
  },
  {
    number: '04.',
    title: 'Acompañamiento Notarial hasta la Entrega',
    description:
      'Coordinamos avalúos bancarios, cálculo de ISR o exenciones aplicables y firma ante notario público hasta la entrega física del inmueble.',
  },
];

export function formatMxn(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(amount);
}
