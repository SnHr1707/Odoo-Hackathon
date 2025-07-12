import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown, FaArrowRight } from 'react-icons/fa';

// --- DATA CONFIGURATION (remains unchanged) ---
const menuData = {
  "Women": {
    icon: "fas fa-female",
    columns: [
      {
        heading: 'Apparel',
        links: [
          { label: "Dresses", href: "#" },
          { label: "Rompers & Jumpsuits", href: "#" },
          { label: "Tops", href: "#" },
          { label: "Shorts & Skirts", href: "#" },
          { label: "Jeans & Pants", href: "#" },
        ],
      },
      {
        heading: 'Outerwear & More',
        links: [
          { label: "Sweaters & Sweatshirts", href: "#" },
          { label: "Jackets & Outerwear", href: "#" },
          { label: "Swimwear", href: "#" },
          { label: "Sleepwear & Robes", href: "#" },
        ]
      }
    ],
    spotlight: {
      image: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?q=80&w=800&auto=format&fit=crop',
      title: 'Trending: Summer Dresses',
      description: 'Explore the most sought-after dresses in the community.',
      href: '#',
    }
  },
  "Men": {
    icon: "fas fa-male",
    columns: [
       {
        heading: 'Apparel',
        links: [
            { label: "T-shirts", href: "#" },
            { label: "Shirts", href: "#" },
            { label: "Shorts", href: "#" },
            { label: "Jeans & Pants", href: "#" },
        ]
       },
       {
        heading: 'Outerwear & More',
        links: [
            { label: "Sweaters & Sweatshirts", href: "#" },
            { label: "Jackets & Outerwear", href: "#" },
            { label: "Swimwear", href: "#" },
            { label: "Sleepwear & Robes", href: "#" },
        ]
       }
    ],
    spotlight: {
      image: 'https://images.unsplash.com/photo-1610384104075-e034934268f8?q=80&w=800&auto=format&fit=crop',
      title: 'New In: Men\'s Jackets',
      description: 'Discover the latest trends in outerwear for all seasons.',
      href: '#',
    }
  },
  "Kids": {
    icon: "fas fa-child",
    columns: [
      {
        heading: "Girls",
        links: [
            { label: "Dresses", href: "#" },
            { label: "Tops", href: "#" },
            { label: "Jeans & Pants", href: "#" },
            { label: "Swimwear", href: "#" },
            { label: "Shoes", href: "#" }
        ],
      },
      {
        heading: "Boys",
        links: [
            { label: "Tops", href: "#" },
            { label: "Shorts", href: "#" },
            { label: "Jeans & Pants", href: "#" },
            { label: "Jackets & Outerwear", href: "#" },
        ],
      },
    ],
    spotlight: {
      image: 'https://images.unsplash.com/photo-1519340333755-56e9c1d04579?q=80&w=800&auto=format&fit=crop',
      title: 'Back to School Styles',
      description: 'Fun, durable, and stylish outfits for your little ones.',
      href: '#',
    }
  },
  "Shoes": {
    icon: "fas fa-shoe-prints",
    columns: [
      {
        heading: "Women",
        links: [
            { label: "Athletic", href: "#" },
            { label: "Boots & Booties", href: "#" },
            { label: "Heels", href: "#" },
            { label: "Sneakers", href: "#" },
            { label: "Sandals", href: "#" },
        ],
      },
      {
        heading: "Men",
        links: [
            { label: "Athletic", href: "#" },
            { label: "Boots", href: "#" },
            { label: "Sneakers", href: "#" },
            { label: "Dress Shoes", href: "#" }
        ],
      },
      {
        heading: "Kids",
        links: [
            { label: "Girls", href: "#" },
            { label: "Boys", href: "#" }
        ],
      },
    ],
    spotlight: {
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
      title: 'Must-Have Sneakers',
      description: 'Step up your style with the latest sneaker drops.',
      href: '#',
    }
  },
  "Accessories": {
    icon: "fas fa-glasses",
    columns: [
        {
            heading: "Women",
            links: [
                { label: "Belts", href: "#" },
                { label: "Watches", href: "#" },
                { label: "Purses", href: "#" },
                { label: "Glasses & Shades", href: "#" }
            ],
        },
        {
            heading: "Men",
            links: [
                { label: "Belts", href: "#" },
                { label: "Watches", href: "#" },
                { label: "Wallets", href: "#" },
                { label: "Glasses & Shades", href: "#" }
            ]
        }
    ],
    spotlight: {
      image: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=800&auto=format&fit=crop',
      title: 'Complete Your Look',
      description: 'Find the perfect finishing touches for any outfit.',
      href: '#',
    }
  },
};

const Navbar = ({ user, onLogout }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [activeMobileSubMenu, setActiveMobileSubMenu] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);
  
  const toggleMobileSubMenu = (menu) => {
    setActiveMobileSubMenu(activeMobileSubMenu === menu ? null : menu);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 font-sans bg-emerald-50/80 shadow-md backdrop-blur-md border-b border-emerald-200/50">
      <div className="relative max-w-screen-xl mx-auto px-6 py-2 flex justify-between items-center">
        
        {/* LEFT: Logo */}
        <div className="flex-1 md:flex-none flex justify-start">
            <a href="/" className="text-3xl font-bold tracking-wider text-emerald-800">ReWear</a>
        </div>
        
        {/* CENTER: Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center items-center space-x-2 text-lg">
          {Object.keys(menuData).map((menu) => (
            <div
              key={menu}
              onMouseEnter={() => setActiveMegaMenu(menu)}
              onMouseLeave={() => setActiveMegaMenu(null)}
              className="py-4"
            >
              <div className="relative group text-gray-700 hover:text-emerald-700 transition-colors duration-300 flex items-center gap-2 cursor-pointer rounded-md px-4 py-2 hover:bg-emerald-100/60">
                <span className='font-medium'>{menu}</span>
                <FaChevronDown className="text-xs transform transition-transform duration-300 group-hover:rotate-180" />
              </div>
              <MegaMenu isOpen={activeMegaMenu === menu} menuContent={menuData[menu]} />
            </div>
          ))}
        </nav>

        {/* RIGHT: Actions (Profile & Mobile Toggle) */}
        <div className="flex-1 md:flex-none flex justify-end items-center">
          {/* Profile Dropdown (Desktop) */}
          <div className="hidden md:flex">
            <div className="relative">
              <button onClick={() => setProfileOpen(!isProfileOpen)} className="flex items-center gap-3 text-gray-800 font-medium transition-transform duration-300 hover:scale-105">
                <div className="w-10 h-10 rounded-full bg-emerald-200 border-2 border-emerald-300 flex items-center justify-center">
                  <i className="fas fa-user text-lg text-emerald-800"></i>
                </div>
                <FaChevronDown className={`text-xs transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-full right-0 mt-3 w-56 bg-white rounded-lg shadow-xl py-2 origin-top-right border border-gray-200"
                  >
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="font-bold text-gray-800 text-sm">{user.name}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                    <a href="#profile" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 w-full text-left transition-colors duration-200"><i className="fas fa-user-circle w-4"></i>My Profile</a>
                    <a href="#my-swaps" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 w-full text-left transition-colors duration-200"><i className="fas fa-sync-alt w-4"></i>My Swaps</a>
                    <button onClick={onLogout} className="flex items-center gap-3 w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-medium transition-colors duration-200">
                      <i className="fas fa-sign-out-alt w-4"></i>Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Mobile Icon */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 text-2xl focus:outline-none hover:text-emerald-700 transition-colors" aria-label="Toggle mobile menu">
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            user={user}
            onLogout={onLogout}
            closeMenu={() => setMobileMenuOpen(false)}
            toggleSubMenu={toggleMobileSubMenu}
            activeSubMenu={activeMobileSubMenu}
          />
        )}
      </AnimatePresence>
    </header>
  );
};


const MegaMenu = ({ isOpen, menuContent }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="absolute top-full left-0 right-0 mt-1"
      >
        <div className="w-full max-w-6xl mx-auto bg-white/70 backdrop-blur-lg rounded-b-xl shadow-2xl overflow-hidden text-black border-x border-b border-gray-200/80">
          <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-400" />
          <div className="flex">
            {/* Link Columns */}
            <div className={`flex-grow grid grid-cols-${menuContent.columns.length || 1} gap-x-8 p-8`}>
              {menuContent.columns.map((col) => (
                <div key={col.heading}>
                  <h3 className="font-bold text-md text-emerald-800 mb-4">{col.heading}</h3>
                  <ul className="space-y-1">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a href={link.href} className="group flex items-center justify-between text-gray-600 hover:text-emerald-700 hover:bg-emerald-100/70 rounded-md p-2 transition-all duration-200 text-sm">
                          <span className="font-medium">{link.label}</span>
                          <FaArrowRight className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-emerald-600" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            {/* Spotlight Column */}
            {menuContent.spotlight && (
              <div className="w-1/3 bg-emerald-50/80 p-6 flex-shrink-0 border-l border-gray-200/80">
                <a href={menuContent.spotlight.href} className="block group">
                  <div className="overflow-hidden rounded-lg mb-4 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={menuContent.spotlight.image}
                      alt={menuContent.spotlight.title}
                      className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                  <h4 className="font-bold text-lg text-emerald-900 group-hover:text-emerald-700 transition-colors duration-300">{menuContent.spotlight.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{menuContent.spotlight.description}</p>
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const MobileMenu = ({ user, onLogout, closeMenu, toggleSubMenu, activeSubMenu }) => {
    const mobileMenuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: '0%', transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } },
    exit: { opacity: 0, x: '100%', transition: { duration: 0.3, ease: [0.5, 0, 0.75, 0] } }
  };
  const accordionVariants = {
    collapsed: { opacity: 0, height: 0, marginTop: 0 },
    open: { opacity: 1, height: 'auto', marginTop: '0.5rem' },
  };

  return (
     <motion.nav
      variants={mobileMenuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="md:hidden fixed top-0 right-0 w-full h-screen bg-white overflow-y-auto"
    >
      <div className="flex flex-col p-6 text-xl text-gray-800 h-full">
        {/* Mobile Menu Header */}
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-emerald-800">Menu</h2>
            <button onClick={closeMenu} className="text-gray-600 hover:text-emerald-700 transition-colors"><FaTimes size={24} /></button>
        </div>
        
        {/* Accordion Menu */}
        <div className='flex-grow'>
            {Object.entries(menuData).map(([title, data]) => (
            <div key={title} className="w-full border-b border-gray-200 last:border-none">
                <button onClick={() => toggleSubMenu(title)} className="w-full flex justify-between items-center py-4 font-medium text-gray-700 hover:text-emerald-700 transition-colors">
                <span className="flex items-center gap-4"><i className={`${data.icon} text-emerald-600`}></i> {title}</span>
                <FaChevronDown className={`transform transition-transform duration-300 ${activeSubMenu === title ? 'rotate-180' : ''}`} size={16} />
                </button>
                <AnimatePresence>
                {activeSubMenu === title && (
                    <motion.div
                      key="content"
                      variants={accordionVariants}
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      className="overflow-hidden w-full pl-8 bg-emerald-50/50 rounded-lg"
                    >
                      <div className="pb-4 pt-2 flex flex-col gap-4 text-base">
                          {data.columns.map(col => (
                              <div key={col.heading}>
                                  <h4 className="font-semibold text-emerald-800 mb-2">{col.heading}</h4>
                                  <ul className="space-y-3">
                                      {col.links.map(link => (
                                          <li key={link.label}>
                                              <a href={link.href} className="text-gray-600 hover:text-emerald-700">
                                                  {link.label}
                                              </a>
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                          ))}
                      </div>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
            ))}
        </div>
        
        {/* Profile Section in Mobile */}
        <div className="mt-auto pt-6 border-t border-gray-200">
            <div className='flex items-center gap-4 mb-4'>
                <div className="w-12 h-12 rounded-full bg-emerald-200 border-2 border-emerald-300 flex items-center justify-center">
                    <i className="fas fa-user text-xl text-emerald-800"></i>
                </div>
                <div>
                    <p className="font-bold text-gray-800 text-base">{user.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>
            </div>
            <a href="/profile" className="flex items-center gap-4 py-3 text-base text-gray-700 hover:text-emerald-700"><i className="fas fa-user-circle w-5"></i>My Profile</a>
            <a href="#my-swaps" className="flex items-center gap-4 py-3 text-base text-gray-700 hover:text-emerald-700"><i className="fas fa-sync-alt w-5"></i>My Swaps</a>
            <button onClick={onLogout} className="flex items-center gap-4 w-full text-left py-3 text-red-600 hover:text-red-500 font-medium text-base">
                <i className="fas fa-sign-out-alt w-5"></i>Logout
            </button>
        </div>
      </div>
    </motion.nav>
  )
};

export default Navbar;