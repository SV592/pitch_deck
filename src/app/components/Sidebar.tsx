import Link from "next/link";
import MainIcon from "../../app/icons/MainIcon";
import TemplateIcon from "../../app/icons/TemplateIcon";
import ProjectIcon from "../../app/icons/ProjectIcon";
import ProfileIcon from "../../app/icons/ProfileIcon";
import ExitIcon from "../icons/ExitIcon";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = () => {
  const navigationItems = [
    {
      label: "Templates",
      href: "/templates",
      icon: <TemplateIcon />,
    },
    {
      label: "Decks",
      href: "/decks",
      icon: <ProjectIcon />,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <ProfileIcon />,
    },
  ];
  return (
    <div
      className={`bg-gray-900 border-t-0 border-l-0 border-1 border-gray-700 text-white h-screen w-64 flex flex-col overflow-x-hidden`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <Link href="/" className="flex items-center space-x-3">
          <MainIcon />
          <h1 className="text-3xl font-semibold">Pitch Deck</h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                  {item.icon}
                  <span className="text-gray-300 group-hover:text-white">
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
        <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors w-full text-left group">
          <ExitIcon />
          <span className="text-gray-300 group-hover:text-white">Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
