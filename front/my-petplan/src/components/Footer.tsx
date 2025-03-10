import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div id="itens_rodape">
        <div className="botoes-redes-sociais">
          <a href="https://wa.me/" aria-label="WhatsApp">
            <i className="fa-brands fa-whatsapp"></i>
          </a>
          <a href="https://instagram.com/" aria-label="Instagram">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://facebook.com/" aria-label="Facebook">
            <i className="fa-brands fa-facebook"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

