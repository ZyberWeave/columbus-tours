import React from 'react'

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
        padding: '1rem 0',
        marginTop: '2rem',
      }}
    >
      <p>© {new Date().getFullYear()} Columbus Tours. All rights reserved.</p>
    </footer>
  )
}

export default Footer
