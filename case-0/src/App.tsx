import {useCallback, useEffect, useState} from "react";

import api from "./api";
import {Pokemon} from "./types";

type Status = 'loading' | 'ready';
const MAX_ELEMENTS = 3;

function App() {
  const [status, setStatus] = useState<Status>('loading');
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [cart, setCart] = useState<Pokemon[]>([]);

  useEffect(() => {
    api.list().then((res) => {
      setPokemons(res);
      setStatus('ready');
    });
  }, []);

  const addItem = useCallback((pokemon: Pokemon) => {
    if (cart.length >= MAX_ELEMENTS) return;  
    setCart((prev) => prev.concat(pokemon));
  }, [cart]);

  return (
    <>
      <section>
        {status === "loading" ? <p>Cargando...</p> : null}
        {status === "ready" ? pokemons.map((pokemon) => (
          <article key={pokemon.id}>
            <img className="nes-container" src={pokemon.image} />
            <div>
              <p>{pokemon.name} - ${pokemon.price}</p>
              <p>{pokemon.description}</p>
            </div>
            <button className="nes-btn" onClick={() => addItem(pokemon)}>Agregar</button>
          </article>
        )) : null}
      </section>
      <aside>
        <button className="nes-btn is-primary">{cart.length} items</button>
      </aside>
    </>
  );
}

export default App;
