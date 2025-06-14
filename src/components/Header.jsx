import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Header() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/Login");
  };

  return (
    <nav className="bg-white border-gray-200">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <Link
          to="/"
          className="flex items-center space-x-2.5 rtl:space-x-reverse"
        >
          <img
            src="https://c1.klipartz.com/pngpicture/342/743/sticker-png-logo-email-questionnaire-information-technology-line-symbol-thumbnail.png"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            FactoresX
          </span>
        </Link>
        <button
          data-collapse-toggle="mega-menu-full-cta"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="mega-menu-full-cta"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          id="mega-menu-full-cta"
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 gap-x-5"
        >
          <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                aria-current="page"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/Resultado"
                className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Resultados
              </Link>
            </li>
          </ul>

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="text-white bg-blue-400 hover:bg-blue-500 rounded-lg text-sm px-4 py-2 md:px-5 md:py-2 focus:outline-none shadow-md shadow-gray-400"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
