// The top bar / navigation bar component.

import { Link, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoMdInformationCircleOutline} from "react-icons/io";
import { BsBasket } from "react-icons/bs";
import { MdOutlinePostAdd } from "react-icons/md";



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
    { href : '/profile',icon : <CgProfile size={25} />},
    { href : '/basket' , icon : <BsBasket size={25} />},
    { href : '/submit', icon : <MdOutlinePostAdd size={25} /> },
    { href: '/about', icon : <IoMdInformationCircleOutline  size={25} />},
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
        {navigationItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          const isSquare = index >= navigationItems.length - 4; // last four items

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`
                ${isSquare ? 'w-16 flex-none' : 'flex-1'}
                flex items-center justify-center transition-colors duration-200
                ${isActive
                  ? 'bg-[#79c39e] text-white font-semibold cursor-default'
                  : 'hover:bg-white hover:text-black'
                }
              `}
            >
              {item.icon}
              {!isSquare && item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default NavigationBar;
