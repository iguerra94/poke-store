import type {Pokemon} from "./types";

import {useCallback, useEffect, useMemo, useState} from "react";

import {POKEMONS} from "./constants";

const MAX_TOTAL = 10;

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>(() => POKEMONS);
  const [cart, setCart] = useState<Pokemon[]>([]);
  const [favourites, setFavourites] = useState<any>(() => !!window.localStorage.getItem('favourites') ?
    JSON.parse(window.localStorage.getItem('favourites')!) : []
  );
  const [search, setSearch] = useState('');

  const total = useMemo(() => {
    return cart.reduce((prev, current) => {
      return prev + current.price;
    }, 0);
  }, [cart]);

  const addItemToCart = useCallback((pokemon: Pokemon) => {
    if ((total + pokemon.price) > MAX_TOTAL) return;
    setCart(cart.concat(pokemon));
  }, [cart]);

  const addItemToFavourites = useCallback((id: string) => {
    if (!favourites.includes(id)) {
      const favouritesUpdated = favourites.concat(id);
      setFavourites(favouritesUpdated);
      window.localStorage.setItem('favourites', JSON.stringify(favouritesUpdated));
    } else {
      const favouritesUpdated = favourites.filter((fav: string) => fav !== id);
      setFavourites(favouritesUpdated);
      window.localStorage.setItem('favourites', JSON.stringify(favouritesUpdated));
    }
  }, [favourites]);

  useEffect(() => {
    if (!search && pokemons.length < POKEMONS.length) setPokemons(POKEMONS);
    setPokemons(POKEMONS.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())));
  }, [search]);

  useEffect(() => {
    if (!window.localStorage.getItem('favourites')) {
      window.localStorage.setItem('favourites', JSON.stringify([]));
    }
  }, []);

  return (
    <>
      <nav>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Charmander" type="text"
          className="nes-input" id="name_field"
        />
      </nav>
      <section>
        {!!pokemons.length ? pokemons.map((pokemon) => (
          <article key={pokemon.id}>
            <figure
            >
              <i
                className={`nes-icon is-medium ${!favourites.includes(pokemon.id) ? 'is-transparent' : ''} heart`}
                onClick={() => addItemToFavourites(pokemon.id)}
                style={{ zIndex: '2' }}
              />
              <img className="nes-container" src={pokemon.image} />
            </figure>
            <div>
              <p>
                {pokemon.name} (${pokemon.price})
              </p>
              <p>{pokemon.description}</p>
            </div>
            <button className="nes-btn" onClick={() => addItemToCart(pokemon)}>
              Agregar
            </button>
          </article>
        )) : null}
        {!pokemons.length ? <p style={{ whiteSpace: "nowrap" }}>No se encontraron resultados...</p> : null}
      </section>
      <aside style={{ zIndex: '3' }}>
        <button className="nes-btn is-primary">{cart.length} items (total ${total})</button>
        <button className="nes-btn is-error">{favourites.length} favoritos</button>
      </aside>
    </>
  );
}

export default App;
