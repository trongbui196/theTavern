import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);    return (
        <nav className="w-full h-16 bg-[#4B2E2B] border-b border-[#D97706]/30 relative z-50">
            <div className="h-full flex items-center px-4 max-w-7xl mx-auto relative">
                {/* Logo/Home Link centered */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <h1 
                        className="font-uncial text-2xl text-[#D97706] cursor-pointer hover:text-[#D97706]/80 transition-colors"
                        onClick={() => navigate('/')}
                    >
                        theTAVERN
                    </h1>
                </div>

                {/* Hamburger Menu at far right */}
                <div className="ml-auto relative" ref={menuRef}>
                    <button
                        className="text-[#D97706] hover:text-[#D97706]/80 transition-colors p-2 rounded-lg hover:bg-[#D97706]/10"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-[#4B2E2B] border border-[#D97706]/30 overflow-hidden transition-all duration-200 ease-in-out">
                            <div className="py-1">
                                <button
                                    onClick={() => {
                                        navigate('/stash');
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-3 text-[#D97706] font-medieval hover:bg-[#D97706]/10 transition-colors"
                                >
                                    Stash
                                </button>
                                <button
                                    onClick={() => {
                                        navigate('/treasury-log');
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-3 text-[#D97706] font-medieval hover:bg-[#D97706]/10 transition-colors"
                                >
                                    Treasury Log
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
