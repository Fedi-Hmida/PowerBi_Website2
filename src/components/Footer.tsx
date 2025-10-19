import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-[#0085C3] to-[#009F3D] bg-clip-text text-transparent mb-4">
              Tableau de Bord Analytics Olympiques
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Plateforme d'analytics de niveau entreprise pour les insights de performance des Jeux Olympiques, le suivi des médailles et le support aux décisions stratégiques.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
              Liens Rapides
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#0085C3] dark:hover:text-[#0085C3] transition-colors">
                  Tableau de bord
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#0085C3] dark:hover:text-[#0085C3] transition-colors">
                  Architecture
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#0085C3] dark:hover:text-[#0085C3] transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
              Se Connecter
            </h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-[#0085C3] hover:text-white dark:hover:bg-[#0085C3] transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-[#0085C3] hover:text-white dark:hover:bg-[#0085C3] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-[#0085C3] hover:text-white dark:hover:bg-[#0085C3] transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Tableau de Bord Analytics Olympiques. Construit avec Power BI, React, et TailwindCSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
