'use client';

export default function Footer() {
  return (
    <footer className="bg-[#F8F8F8] py-16 px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Contact Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-light text-gray-600 mb-12">
            Contacto
          </h2>
          
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  className="rotate-45"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
              <a 
                href="mailto:info@kuatrometric.com"
                className="text-xl md:text-2xl font-medium text-black hover:text-gray-600 transition-colors duration-300"
              >
                INFO@KUATROMETRIC.COM
              </a>
            </div>
            
            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  className="rotate-45"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
              <a 
                href="tel:+542604123123"
                className="text-xl md:text-2xl font-medium text-black hover:text-gray-600 transition-colors duration-300"
              >
                +54 2604 123123
              </a>
            </div>
          </div>
        </div>

        {/* Menu and Social Media */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Menu */}
          <div>
            <h3 className="text-lg font-light text-gray-600 mb-8">Menu</h3>
            <nav className="space-y-4">
              <a 
                href="#inicio"
                className="block text-lg font-medium text-black hover:text-gray-600 transition-colors duration-300"
              >
                Home
              </a>
              <a 
                href="#proyectos"
                className="block text-lg font-medium text-black hover:text-gray-600 transition-colors duration-300"
              >
                Projects
              </a>
              <a 
                href="#servicios"
                className="block text-lg font-medium text-black hover:text-gray-600 transition-colors duration-300"
              >
                Services
              </a>
              <a 
                href="#contacto"
                className="block text-lg font-medium text-black hover:text-gray-600 transition-colors duration-300"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-light text-gray-600 mb-8">Redes</h3>
            <nav className="space-y-4">
              <a 
                href="https://instagram.com/kuatrometric"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-lg font-medium text-black hover:text-gray-600 transition-colors duration-300"
              >
                Instagram
              </a>
              <a 
                href="https://linkedin.com/company/kuatrometric"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-lg font-medium text-black hover:text-gray-600 transition-colors duration-300"
              >
                LinkedIn
              </a>
            </nav>
          </div>
        </div>

        {/* Large Brand Name */}
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-black leading-none tracking-tight">
            KUATROMETRIC
          </h1>
        </div>

        {/* Copyright */}
        <div className="text-center mt-12 pt-8 border-t border-gray-300">
          <p className="text-sm text-gray-500">
            © 2025 Kuatrometric. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}