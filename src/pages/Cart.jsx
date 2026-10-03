import GUNS from '../data/guns.js'

function Cart({ cart, onQty, onClear, onBrowse }) {
  const items = GUNS.filter((g) => cart[g.name]).map((g) => ({ ...g, qty: cart[g.name] }))
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  if (items.length === 0) {
    return (
      <div className="page">
        <h1 className="display">Your cart is empty.</h1>
        <p className="lede">Add something from the catalog and it will show up here.</p>
        <button type="button" className="add-btn inline" onClick={onBrowse}>
          Browse catalog
        </button>
      </div>
    )
  }

  return (
    <div className="page">
      <h1 className="display">Your cart</h1>
      <ul className="cart-list">
        {items.map((i) => (
          <li key={i.name} className="cart-row">
            <img className="cart-img" src={i.image} alt="" />
            <div className="cart-info">
              <span className="name display">{i.name}</span>
              <span className="type">
                ${i.price.toLocaleString()} each
              </span>
            </div>
            <div className="qty" role="group" aria-label={`Quantity for ${i.name}`}>
              <button type="button" aria-label="Decrease quantity" onClick={() => onQty(i.name, i.qty - 1)}>
                −
              </button>
              <span>{i.qty}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => onQty(i.name, i.qty + 1)}>
                +
              </button>
            </div>
            <span className="price line-total">${(i.price * i.qty).toLocaleString()}</span>
            <button type="button" className="remove" onClick={() => onQty(i.name, 0)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <button type="button" className="popup-close" onClick={onClear}>
          Clear cart
        </button>
        <span>
          Total: <strong className="price">${total.toLocaleString()}</strong>
        </span>
      </div>
    </div>
  )
}

export default Cart
