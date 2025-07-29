import Link from "next/link";
import TemplateIcon from "../../app/icons/TemplateIcon";
import DeckIcon from "../../app/icons/DeckIcon";
import ProfileIcon from "../../app/icons/ProfileIcon";
import ExitIcon from "../icons/ExitIcon";
import HomeIcon from "../icons/HomeIcon";

interface SidebarProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, className }) => {
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
        fixed inset-y-0 left-0
        bg-gray-900 border-r border-gray-700 text-white
        h-screen flex flex-col transition-all duration-300 ease-in-out
        ${isOpen ? "w-64" : "w-0 overflow-hidden"}
        ${className || ""}
      `}
      style={{ zIndex: 1000 }}
    >
      {/* Header */}
      <div
        className={`p-4 border-b border-gray-700 ${
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
            // Handle log out logic here
            console.log("Logged out!");
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
