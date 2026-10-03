import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import Cart from './pages/Cart.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')
  // Keranjang: objek { [namaProduk]: jumlah }
  const [cart, setCart] = useState({})

  const addToCart = (name) =>
    setCart((c) => ({ ...c, [name]: (c[name] || 0) + 1 }))

  const setQty = (name, qty) =>
    setCart((c) => {
      const next = { ...c }
      if (qty <= 0) delete next[name]
      else next[name] = qty
      return next
    })

  const clearCart = () => setCart({})

  const cartCount = Object.values(cart).reduce((sum, q) => sum + q, 0)

  return (
    <div className="shell">
      <Header tab={tab} onTab={setTab} cartCount={cartCount} />

      <main className="main">
        {tab === 'Catalog' && <Catalog cart={cart} onAdd={addToCart} />}
        {tab === 'Cart' && (
          <Cart cart={cart} onQty={setQty} onClear={clearCart} onBrowse={() => setTab('Catalog')} />
        )}
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
      </main>

      <Footer />
    </div>
  )
}

export default App
