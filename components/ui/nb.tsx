"use client"
import { MenuIcon, SidebarCloseIcon } from "lucide-react";
import { useState } from "react";

const nb   = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navItems = [
        { name: "Facebook", href: "https://web.facebook.com/mahdee.al.amin2010" },
        { name: "Linkedin", href: "https://www.linkedin.com/in/mahdee-al-amin/" },
        { name: "GitHub", href: "https://github.com/mahdee18" },
        { name: "Blogs", href: "#" },
    ];

    return (
        <nav className="flex bg-slate-900 border-b border-gray-50/10 items-center justify-between px-4 py-3 relative">
            {/* Logo */}
            <div className="text-white text-lg font-bold">LOGO</div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex space-x-6">
                {navItems.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        className="text-white hover:text-gray-200 transition cursor-pointer"
                    >
                        {item.name}
                    </a>
                ))}
            </div>

            <div className="md:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white focus:outline-none bg-transparent border-none p-0 m-0"
                >
                    {isOpen ? <SidebarCloseIcon color="white" size={24} /> : <MenuIcon color="white" size={24} />}
                </button>
            </div>

            {/* Mobile Nav Menu */}
            <div
                className={`fixed bottom-0 left-0 w-full bg-[#231338] py-4 flex flex-col items-center space-y-4 transition-transform duration-500 z-30 ${isOpen ? "translate-y-0" : "translate-y-full"
                    }`}
            >
                {navItems.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        className="text-white hover:text-gray-200 transition cursor-pointer py-2 px-4 w-full text-center"
                    >
                        {item.name}
                    </a>
                ))}
            </div>
        </nav>
    )
}
export default nb;