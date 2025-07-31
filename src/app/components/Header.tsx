import Link from "next/link";
import MenuIcon from "../icons/MenuIcon";
import CloseIcon from "../icons/CloseIcon";
import MainIcon from "../icons/MainIcon";

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
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
    </header>
  );
};

export default Header;
