import React from 'react'

const Footer = () => {
  return (
    <footer className="py-4 text-center text-xs text-gray-500 border-t border-gray-100">
      <p>Algomaster © {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer;