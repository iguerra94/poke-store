import type {Pokemon} from "./types";

import {useCallback, useEffect, useMemo, useState} from "react";

import {POKEMONS} from "./constants";
import PokemonCard from "./PokemonCard";

export type CartItem = {
  pokemon: Pokemon;
  quantity: number;
}

function App() {
  const [cart, setCart] = useState<Record<Pokemon["id"], CartItem>>(() => JSON.parse(localStorage.getItem('cart') || "{}"));
  const totalItems = useMemo(() => {
    return Object.values(cart).reduce((prev, curr) => prev + curr.quantity, 0);
  }, [cart]);
  const totalPrice = useMemo(() => {
    return Object.values(cart).reduce((prev, curr) => prev + (curr.pokemon.price * curr.quantity), 0);
  }, [cart]);

  const handleIncrement = useCallback((pokemon: Pokemon) => {
    setCart(cart => ({
      ...cart,
      [pokemon.id]: {
        pokemon,
        quantity: !!cart[pokemon.id] ? cart[pokemon.id].quantity + 1 : 1,
      }
    }));
  }, []);

  const handleDecrement = useCallback((pokemon: Pokemon) => {
    setCart(cart => ({
      ...cart,
      [pokemon.id]: {
        pokemon,
        quantity: cart[pokemon.id].quantity - 1,
      }
    }));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <nav>
        <input className="nes-input" id="name_field" placeholder="Charmander" type="text" />
      </nav>
      <section>
        {POKEMONS.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            cartItem={cart[pokemon.id]}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        ))}
      </section>
      <aside>
        <button className="nes-btn is-primary">{totalItems} items (total ${totalPrice})</button>
      </aside>
    </>
  );
}

export default App;
