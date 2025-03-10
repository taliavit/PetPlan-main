import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const toggleMobileMenu = () => {
    setMobileMenuActive((prev) => !prev);
  };

  // Função de scroll otimizada com debounce
  const handleScroll = useCallback(() => {
    if (headerRef.current) {
      setScrolled(window.scrollY > headerRef.current.offsetHeight);
    }
  }, []);

  // Adiciona sombra ao header conforme o scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Fecha o menu mobile ao redimensionar para telas maiores
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1170) {
        setMobileMenuActive(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header ref={headerRef} className={scrolled ? 'scrolled' : ''}>
      <nav id="navbar">
        <Link to="/" id="nav_logo">
          <i className="fa-solid fa-shield-cat"></i> Petplan
        </Link>
        <ul id="nav_list">
          <li className="nav-item">
            <NavLink to="/" end>
              Início
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/parceiros">Petshop</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/blog">Blog</NavLink>
          </li>
        </ul>
        <Link to="/cadastro" className="btn-default">
          Cadastre-se!
        </Link>
        <button id="mobile_btn" onClick={toggleMobileMenu}>
          <i className={`fa-solid ${mobileMenuActive ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </nav>
      <div id="mobile_menu" className={mobileMenuActive ? 'active' : ''}>
        <ul id="mobile_nav_list">
          <li className="nav-item">
            <NavLink to="/" end onClick={() => setMobileMenuActive(false)}>
              Início
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/parceiros" onClick={() => setMobileMenuActive(false)}>
              Petshop
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/blog" onClick={() => setMobileMenuActive(false)}>
              Blog
            </NavLink>
          </li>
        </ul>
        <Link to="/login" className="btn-default" onClick={() => setMobileMenuActive(false)}>
          Login!
        </Link>
      </div>
    </header>
  );
};

export default Header;
