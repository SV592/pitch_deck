import Link from "next/link";
import MenuIcon from "../icons/MenuIcon";
import CloseIcon from "../icons/CloseIcon";
import MainIcon from "../icons/MainIcon";
import { useUser } from '@auth0/nextjs-auth0/client';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const { user } = useUser();

  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="mr-4">
          {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
        <Link href="/" className="flex items-center space-x-3">
          <MainIcon />
          <h1 className="text-3xl font-semibold">Pitch Deck</h1>
        </Link>
      </div>
      {user && (
        <div className="flex items-center space-x-2">
          <span className="text-gray-300 text-sm">
            Welcome, {user.name || user.email}!
          </span>
        </div>
      )}
    </header>
  );
};

export default Header;