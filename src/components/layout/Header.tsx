import { useAuth } from '../../contexts/AuthContext';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

export function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <header className="bg-white border-b border-gray-100 flex h-24 items-center px-4 sm:px-8">
            <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center gap-12">
                    {/* Logo */}
                    <Link to="/dashboard" className="text-2xl font-bold text-gray-900 tracking-tight">
                        ticktock
                    </Link>

                    {/* Nav Links */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/dashboard" className="text-sm font-medium text-gray-500 hover:text-gray-900">
                            Timesheets
                        </Link>
                    </nav>
                </div>

                {/* User Menu */}
                <div className="relative" ref={menuRef}>
                    <button
                        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {user?.avatarUrl ? (
                            <img src={user.avatarUrl} alt={user.name} className="h-8 w-8 rounded-full" />
                        ) : (
                            <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                                <User size={16} />
                            </div>
                        )}
                        <span className="hidden sm:inline-block">{user?.name}</span>
                        <ChevronDown size={16} className={cn("transition-transform", isMenuOpen && "rotate-180")} />
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                            <div className="px-4 py-2 border-b border-gray-100 md:hidden">
                                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                                <LogOut size={16} />
                                Sign out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
