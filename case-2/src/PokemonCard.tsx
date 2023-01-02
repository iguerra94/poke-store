import type {Pokemon} from "./types";
import {memo} from 'react';
import { CartItem } from "./App";

type PokemonCardProps = {
  pokemon: Pokemon;
  cartItem: CartItem;
  onIncrement: (pokemon: Pokemon) => void;
  onDecrement: (pokemon: Pokemon) => void;
};

function PokemonCard({pokemon, cartItem, onIncrement, onDecrement}: PokemonCardProps) {
  return (
    <article key={pokemon.id}>
      <img className="nes-container" src={pokemon.image} />
      <div>
        <p>{pokemon.name} (${pokemon.price})</p>
        <p>{pokemon.description}</p>
      </div>
      {cartItem?.quantity > 0 ?
        <div className="buttons-container">
          <button className="nes-btn" onClick={() => onDecrement(pokemon)}>
            -
          </button>
          <p>{cartItem.quantity}</p>
          <button className="nes-btn" onClick={() => onIncrement(pokemon)}>
            +
          </button>
        </div> : 
        <button className="nes-btn" onClick={() => onIncrement(pokemon)}>
          Agregar
        </button>
      }
    </article>
  );
}

export default memo(PokemonCard);