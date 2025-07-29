// The top bar / navigation bar component.
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';


const NavigationBar = () => {
  const pathname = usePathname();

  const navigationItems = [
    { href: '/composants/cpu', label: 'CPU' },
    { href: '/composants/motherboard', label: 'Motherboard' },
    { href: '/composants/power_supplies', label: 'Power Supplies' },
  ];

  return (
    <header className="flex h-16 w-full bg-[#383431] text-white">
      {/* Home Block */}
      <Link
        href="/"
        className="w-[200px] flex items-center justify-center bg-[#383431] hover:opacity-90 text-[#79c39e]"
      >
        Home
      </Link>

      {/* Navigation Items */}
      <nav className="flex flex-1">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
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