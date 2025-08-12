// The top bar / navigation bar component.

import { Link, useLocation } from "react-router-dom";


const NavigationBar = () => {
  const location = useLocation();

  const navigationItems = [
    { href: '/config', label: 'Pre-builts' },
    { href: '/processors', label: 'Processors' },
    { href: '/coolers', label: 'CPU Cooler' },
    { href: '/motherboards', label: 'Motherboards' },
    { href: '/memory', label: 'Memory' },
    { href: '/disks', label: 'Disks' },
    { href: '/video-cards', label: 'Video Cards' },
    { href: '/cases', label: 'Cases' },
    { href: '/case-fans', label: 'Case Fans' },
    { href: '/power-supplies', label: 'Power Supplies' },
    { href: '/others', label: 'Other' },
    {href :'/basket' , label : 'Basket'},
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="flex h-16 w-full bg-[#383431] text-white">
      {/* Home Link */}
      <Link
        to="/"
        className="w-[200px] flex items-center justify-center bg-[#383431] hover:opacity-90 text-[#79c39e]"
      >
        Home
      </Link>

      {/* Navigation Items */}
      <nav className="flex flex-1">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex-1 flex items-center justify-center transition-colors duration-200
                ${isActive
                  ? 'bg-[#79c39e] text-white font-semibold cursor-default'
                  : 'hover:bg-white hover:text-black'
                }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default NavigationBar;
