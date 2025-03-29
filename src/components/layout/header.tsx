import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuthStore } from "@/store/authStore"; // ✅ Use Zustand instead of useAuth
import LoginModal from "@/components/login-modal";
import { Button } from "@/components/ui/button";
import { ClipboardList, Menu, X } from "lucide-react";

const Header = () => {
  const [location, setLocation] = useLocation();
  const { isAuthenticated, logout } = useAuthStore(); // ✅ Zustand Hook
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const handleLogout = async () => {
    logout(); // ✅ No need for `await`, Zustand handles it
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => location === path;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <ClipboardList className="h-8 w-8 text-primary" />
              <span className="ml-2 font-semibold text-xl">FeedBackly</span>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className={`${isActive('/') ? 'border-primary text-darktext' : 'border-transparent text-neutral hover:text-darktext hover:border-neutral'} border-b-2 px-1 pt-1 text-sm font-medium`}>
                Survey Form
              </Link>
              <Link href="/about" className={`${isActive('/about') ? 'border-primary text-darktext' : 'border-transparent text-neutral hover:text-darktext hover:border-neutral'} border-b-2 px-1 pt-1 text-sm font-medium`}>
                About
              </Link>
              <Link href="/contact" className={`${isActive('/contact') ? 'border-primary text-darktext' : 'border-transparent text-neutral hover:text-darktext hover:border-neutral'} border-b-2 px-1 pt-1 text-sm font-medium`}>
                Contact
              </Link>
            </nav>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {!isAuthenticated ? (
              <Button variant="ghost" onClick={openLoginModal} className="text-neutral hover:text-darktext">
                <span className="text-sm font-medium mr-2">Login</span>
              </Button>
            ) : (
              <>
                <Button onClick={() => setLocation('/admin')} className="mx-2 bg-[#66C4FF] hover:bg-[#66C4FF]/90 text-white">
                  Dashboard
                </Button>
                <Button variant="ghost" onClick={handleLogout} className="text-neutral hover:text-darktext">
                  <span className="text-sm font-medium mr-2">Logout</span>
                </Button>
              </>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Button variant="ghost" onClick={toggleMobileMenu} className="inline-flex items-center justify-center p-2 rounded-md text-neutral hover:text-darktext hover:bg-gray-100">
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" className={`${isActive('/') ? 'bg-[#66C4FF]/10 border-primary text-primary' : 'border-transparent text-neutral hover:bg-gray-50 hover:border-neutral hover:text-darktext'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`} onClick={() => setMobileMenuOpen(false)}>
              Survey Form
            </Link>
            <Link href="/about" className={`${isActive('/about') ? 'bg-[#66C4FF]/10 border-primary text-primary' : 'border-transparent text-neutral hover:bg-gray-50 hover:border-neutral hover:text-darktext'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`} onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link href="/contact" className={`${isActive('/contact') ? 'bg-[#66C4FF]/10 border-primary text-primary' : 'border-transparent text-neutral hover:bg-gray-50 hover:border-neutral hover:text-darktext'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`} onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
            {isAuthenticated && (
              <Link href="/admin" className={`${isActive('/admin') ? 'bg-[#66C4FF]/10 border-primary text-primary' : 'border-transparent text-neutral hover:bg-gray-50 hover:border-neutral hover:text-darktext'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`} onClick={() => setMobileMenuOpen(false)}>
                Admin Dashboard
              </Link>
            )}
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                {!isAuthenticated ? (
                  <button className="block px-4 py-2 text-base font-medium text-neutral hover:text-darktext hover:bg-gray-100" onClick={() => { setMobileMenuOpen(false); openLoginModal(); }}>
                    Login
                  </button>
                ) : (
                  <button className="block px-4 py-2 text-base font-medium text-neutral hover:text-darktext hover:bg-gray-100" onClick={handleLogout}>
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <LoginModal isOpen={loginModalOpen} onClose={closeLoginModal} />
    </header>
  );
};

export default Header;
