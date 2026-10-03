import { useRef } from 'react'

function GunCard({ gun, qty, onAdd }) {
  const popup = useRef(null)

  return (
    <li className="card">
      <button className="card-btn" onClick={() => popup.current.showModal()}>
        {/* Bingkai gambar berukuran tetap (4:3) */}
        <span className="card-media">
          <img className="card-img" src={gun.image} alt="" />
        </span>
        <span className="name display">{gun.name}</span>
        <span className="type">
          {gun.type} · {gun.caliber}
        </span>
        <span className="price">${gun.price.toLocaleString()}</span>
      </button>

      <button className="add-btn" type="button" onClick={() => onAdd(gun.name)}>
        {qty > 0 ? `Add to cart (${qty} in cart)` : 'Add to cart'}
      </button>

      <dialog
        className="popup"
        ref={popup}
        onClick={(e) => e.target === popup.current && popup.current.close()}
      >
        <span className="popup-media">
          <img className="popup-img" src={gun.image} alt="" />
        </span>
        <h3 className="display">{gun.name}</h3>
        <p className="type">
          {gun.type} · {gun.caliber} · <span className="price">${gun.price.toLocaleString()}</span>
        </p>
        <p>{gun.description}</p>
        <form method="dialog">
          <button className="popup-close">Close</button>
        </form>
      </dialog>
    </li>
  )
}

export default GunCard

