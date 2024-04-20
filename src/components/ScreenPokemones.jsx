import React from "react";
import './ScreenPokemones.css';
const ScreenPokemones = ({pokemones,position}) => {
    return(
        <div className="inner-screen-layout">
            {pokemones?.map((pokemon, idx) => (
        <div 
        key={pokemon.id} 
        className="pokemon-item" 
        style={{
            backgroundColor: idx === position? 'yellow' : 'transparent',
            borderRadius: '20px',
        }}>
          <img src={pokemon.sprites.front_default} alt="pokemon image" />
          {pokemon.name}
        </div>
      ))}
        </div>
    );
}

export default ScreenPokemones;