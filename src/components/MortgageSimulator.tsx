import React, { useMemo } from 'react';
import { PROPERTIES, formatMxn } from '../data/properties';

interface MortgageSimulatorProps {
  propertyPrice: number;
  onPropertyPriceChange: (val: number) => void;
  downPaymentPct: number;
  onDownPaymentPctChange: (val: number) => void;
  years: number;
  onYearsChange: (val: number) => void;
  annualRate: number;
  onAnnualRateChange: (val: number) => void;
}

export const MortgageSimulator: React.FC<MortgageSimulatorProps> = ({
  propertyPrice,
  onPropertyPriceChange,
  downPaymentPct,
  onDownPaymentPctChange,
  years,
  onYearsChange,
  annualRate,
  onAnnualRateChange,
}) => {
  const purchaseProperties = useMemo(
    () => PROPERTIES.filter((p) => p.operation !== 'Renta'),
    []
  );

  const calculation = useMemo(() => {
    const downPayment = propertyPrice * (downPaymentPct / 100);
    const loanAmount = Math.max(0, propertyPrice - downPayment);
    const monthlyRate = annualRate / 100 / 12;
    const months = years * 12;

    let monthlyPayment = 0;
    if (monthlyRate > 0 && months > 0) {
      const factor = Math.pow(1 + monthlyRate, months);
      monthlyPayment = (loanAmount * (monthlyRate * factor)) / (factor - 1);
    } else if (months > 0) {
      monthlyPayment = loanAmount / months;
    }

    // Approximate Mexican acquisition & notarial closing costs (~6% average)
    const estimatedClosingCosts = propertyPrice * 0.06;

    return {
      downPayment,
      loanAmount,
      monthlyPayment,
      estimatedClosingCosts,
    };
  }, [propertyPrice, downPaymentPct, years, annualRate]);

  return (
    <div id="simulador" className="bg-white border border-[#E2DFD9] p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[#E2DFD9]">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#57534E]">
            Planeación Patrimonial
          </p>
          <h3 className="mt-1.5 text-2xl font-medium text-[#161513]">
            Simulador Hipotecario &amp; Gastos de Escrituración
          </h3>
        </div>
        <select
          aria-label="Seleccionar propiedad de referencia"
          value={
            purchaseProperties.some((p) => p.priceMxn === propertyPrice)
              ? String(propertyPrice)
              : 'custom'
          }
          onChange={(e) => {
            if (e.target.value !== 'custom') {
              onPropertyPriceChange(Number(e.target.value));
            }
          }}
          className="px-3 py-2 text-xs bg-[#F9F8F6] border border-[#E2DFD9] text-[#161513] focus:outline-none focus:border-[#1B4332]"
        >
          <option value="custom">Monto personalizado</option>
          {purchaseProperties.map((prop) => (
            <option key={prop.id} value={prop.priceMxn}>
              {prop.title} ({formatMxn(prop.priceMxn)})
            </option>
          ))}
        </select>
      </div>

      {/* Controls */}
      <div className="space-y-5">
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <label htmlFor="sim-price" className="font-medium text-[#161513]">
              Valor de la propiedad
            </label>
            <span className="font-mono font-medium text-[#161513] tabular-nums">
              {formatMxn(propertyPrice)}
            </span>
          </div>
          <input
            id="sim-price"
            type="range"
            min={2500000}
            max={30000000}
            step={250000}
            value={propertyPrice}
            onChange={(e) => onPropertyPriceChange(Number(e.target.value))}
            className="w-full accent-[#1B4332] cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <label htmlFor="sim-down" className="font-medium text-[#161513]">
                Enganche inicial
              </label>
              <span className="font-mono font-medium text-[#161513] tabular-nums">
                {downPaymentPct}% ({formatMxn(calculation.downPayment)})
              </span>
            </div>
            <input
              id="sim-down"
              type="range"
              min={10}
              max={60}
              step={5}
              value={downPaymentPct}
              onChange={(e) => onDownPaymentPctChange(Number(e.target.value))}
              className="w-full accent-[#1B4332] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <label htmlFor="sim-rate" className="font-medium text-[#161513]">
                Tasa anual estimada
              </label>
              <span className="font-mono font-medium text-[#161513] tabular-nums">
                {annualRate.toFixed(2)}%
              </span>
            </div>
            <input
              id="sim-rate"
              type="range"
              min={8.5}
              max={13.0}
              step={0.25}
              value={annualRate}
              onChange={(e) => onAnnualRateChange(Number(e.target.value))}
              className="w-full accent-[#1B4332] cursor-pointer"
            />
          </div>
        </div>

        {/* Term segmented selector */}
        <div>
          <span className="block text-xs font-medium text-[#161513] mb-2">
            Plazo de financiamiento
          </span>
          <div className="grid grid-cols-3 gap-2">
            {[10, 15, 20].map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => onYearsChange(term)}
                className={`py-2 text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                  years === term
                    ? 'bg-[#1B4332] text-white border-[#1B4332]'
                    : 'bg-[#F9F8F6] text-[#161513] border-[#E2DFD9] hover:border-[#1B4332]'
                }`}
              >
                {term} años
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results readout */}
      <div className="pt-5 border-t border-[#E2DFD9] grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#F9F8F6] p-4 border border-[#E2DFD9]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#57534E]">
            Mensualidad estimada
          </p>
          <p className="mt-1.5 font-mono text-xl font-medium text-[#1B4332] tabular-nums">
            {formatMxn(calculation.monthlyPayment)}
          </p>
        </div>
        <div className="bg-[#F9F8F6] p-4 border border-[#E2DFD9]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#57534E]">
            Monto a financiar
          </p>
          <p className="mt-1.5 font-mono text-lg font-medium text-[#161513] tabular-nums">
            {formatMxn(calculation.loanAmount)}
          </p>
        </div>
        <div className="bg-[#F9F8F6] p-4 border border-[#E2DFD9]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#57534E]">
            Escrituración aprox. (6%)
          </p>
          <p className="mt-1.5 font-mono text-lg font-medium text-[#161513] tabular-nums">
            {formatMxn(calculation.estimatedClosingCosts)}
          </p>
        </div>
      </div>

      <p className="text-[11px] text-[#57534E] leading-relaxed">
        Cálculo orientativo antes de seguros bancarios y avalúo. Nuestro equipo coordina
        precalificaciones sin costo ante las principales instituciones financieras y notarías.
      </p>
    </div>
  );
};
