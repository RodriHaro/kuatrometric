'use client';

import LogoLoop from './LogoLoop';

const clientLogos = [
  { src: '/images/logos/empresa1.png', alt: 'Empresa 1' },
  { src: '/images/logos/empresa2.png', alt: 'Empresa 2' },
  { src: '/images/logos/empresa3.png', alt: 'Empresa 3' },
  { src: '/images/logos/empresa4.png', alt: 'Empresa 4' },
  { src: '/images/logos/empresa5.png', alt: 'Empresa 5' },
  { src: '/images/logos/empresa6.png', alt: 'Empresa 6' },
  { src: '/images/logos/empresa9.png', alt: 'Empresa 9' },
];

export default function ClientsSection() {
  return (
    <section id="clientes" className="py-10 md:py-20 bg-transparent overflow-hidden">
      <div className="max-w-[80vw] mx-auto clients-shell">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center mb-4 md:mb-6">
            <span className="text-sm font-mono text-[#e40014] uppercase tracking-wider">
              [01] CLIENTES
            </span>
          </div>

          <div className="flex items-center justify-center mb-4 md:mb-6 max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-6xl font-bold text-black text-center leading-none tracking-tight">
              Clientes que confían en nosotros
            </h2>
          </div>

          <p className="text-lg text-black/70 max-w-2xl mx-auto leading-relaxed">
            Marcas que nos acompañan en proyectos de estrategia, contenido y performance.
          </p>
        </div>

        <div className="clients-loop-wrap -mx-6 md:-mx-10">
          <LogoLoop
            logos={clientLogos}
            speed={90}
            gap={96}
            logoHeight={180}
            fadeOut
            pauseOnHover
            scaleOnHover={false}
            ariaLabel="Clientes que confían en Kuatrometric"
            className="clients-logo-loop"
          />
        </div>
      </div>
    </section>
  );
}
