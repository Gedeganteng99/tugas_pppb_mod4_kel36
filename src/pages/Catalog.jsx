import { useState } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

const TYPES = ['All', ...new Set(GUNS.map((g) => g.type))]

function Catalog({ cart, onAdd }) {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')
  // sort: { key: 'name' | 'price' | null, dir: 'asc' | 'desc' }
  const [sort, setSort] = useState({ key: null, dir: 'asc' })

  // Klik tombol yang sama membalik arah, klik tombol lain mengganti kunci
  const toggleSort = (key) =>
    setSort((s) =>
      s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' },
    )

  const q = query.trim().toLowerCase()
  const visible = GUNS.filter(
    (g) => (type === 'All' || g.type === type) && g.name.toLowerCase().includes(q),
  )

  if (sort.key) {
    const m = sort.dir === 'asc' ? 1 : -1
    visible.sort((a, b) =>
      sort.key === 'price' ? (a.price - b.price) * m : a.name.localeCompare(b.name) * m,
    )
  }

  const arrow = (key) => (sort.key === key ? (sort.dir === 'asc' ? ' ▲' : ' ▼') : '')

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every piece listed with its
          type, caliber, and price — nothing else.
        </p>
      </section>

      <section>
        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">
            {visible.length} of {GUNS.length} pieces
          </span>
        </div>

        <div className="toolbar">
          <input
            className="search"
            type="search"
            placeholder="Search product name…"
            aria-label="Search product name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="filter"
            aria-label="Filter by product type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t === 'All' ? 'All types' : t}
              </option>
            ))}
          </select>
          <div className="sort-group" role="group" aria-label="Sort catalog">
            <button
              type="button"
              className={sort.key === 'name' ? 'sort-btn active' : 'sort-btn'}
              aria-pressed={sort.key === 'name'}
              onClick={() => toggleSort('name')}
            >
              Name{arrow('name')}
            </button>
            <button
              type="button"
              className={sort.key === 'price' ? 'sort-btn active' : 'sort-btn'}
              aria-pressed={sort.key === 'price'}
              onClick={() => toggleSort('price')}
            >
              Price{arrow('price')}
            </button>
          </div>
        </div>

        {visible.length === 0 ? (
          <p className="empty">No products match your search.</p>
        ) : (
          <ul className="stock">
            {visible.map((gun) => (
              <GunCard key={gun.name} gun={gun} qty={cart[gun.name] || 0} onAdd={onAdd} />
            ))}
          </ul>
        )}
      </section>
    </>
  )
}

export default Catalog
