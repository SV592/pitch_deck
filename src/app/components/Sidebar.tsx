import { useUser } from '@auth0/nextjs-auth0/client';
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
  const { user } = useUser(); // Still use useUser for user data if needed

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

  return (
    <div
      className={`
        fixed inset-y-0
        bg-gray-900 border-r border-gray-700 text-white
        h-screen w-64 flex flex-col transition-all duration-300 ease-in-out transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${className || ""}
      `}
      style={{ zIndex: 1000 }}
    >
      {/* Header */}
      <div
        className={`p-4 border-b border-gray-700 flex justify-between items-center ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <h1 className="text-3xl font-semibold pl-3">Options</h1>
      </div>

      {/* Navigation */}
      <nav
        className={`flex-1 p-4 ${isOpen ? "block" : "hidden"}`}
        aria-label="Main navigation"
      >
        <ul className="space-y-2">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href} onClick={onClose}>
                {/* Close sidebar on navigation */}
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
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
      <div
        className={`p-4 border-t border-gray-700 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <button
          onClick={() => {
            window.location.href = '/api/auth/logout'; // Use the direct logout URL
            onClose(); // Optionally close sidebar after logout
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
  );
};

export default Sidebar;