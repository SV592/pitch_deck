import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import TemplateIcon from "../icons/TemplateIcon";
import DeckIcon from "../icons/DeckIcon";
import ProfileIcon from "../icons/ProfileIcon";
import ExitIcon from "../icons/ExitIcon";
import HomeIcon from "../icons/HomeIcon";

interface SidebarProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, className }) => {
  const { user } = useUser();

  const navigationItems = [
    {
      label: "Home",
      href: "/",
      icon: <HomeIcon />,
    },
    {
      label: "Decks",
      href: "/decks",
      icon: <DeckIcon />,
    },
    {
      label: "Templates",
      href: "/templates",
      icon: <TemplateIcon />,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <ProfileIcon />,
    },
  ];

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
          style={{ zIndex: 999 }}
          onClick={handleBackdropClick}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 
          bg-gray-900 border-r border-gray-700 text-white
          h-full w-64 flex flex-col transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          ${className || ""}
        `}
        style={{ zIndex: 1000 }}
      >
        {/* Header with close button */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h1 className="text-3xl font-semibold pl-3">Options</h1>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors ml-4"
            aria-label="Close sidebar"
          >
            <svg
              className="w-6 h-6 text-gray-300 hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4" aria-label="Main navigation">
          <ul className="space-y-2">
            {navigationItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href} onClick={onClose}>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors group">
                    {item.icon}
                    <span className="text-gray-300 group-hover:text-white whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Log out */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => {
              window.location.href = "/api/auth/logout";
              onClose();
            }}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors w-full text-left group"
          >
            <ExitIcon />
            <span className="text-gray-300 group-hover:text-white whitespace-nowrap">
              Log out
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
