import './App.css'
import React, { useEffect } from 'react'
import ScreenPokemones from './components/ScreenPokemones'
import BattleScreen from './components/BattleScreen'
import { useState } from 'react';       

function App() {
  const[pokemones , setPokemones]=useState([]);
  const[position,setPosition]=useState(0);

  const[myPokeSelection, setMyPokeSelection]=useState([]);
  const [computerRandomSelection,setcomputerRandomSelection] = useState([]);
  const [startGame,setStartGame]= useState(false);

  const[myHealth,setMyHealth]=useState(100);  
  const[enemyHealth,setEnemyHealth]=useState(100);


  const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'

  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    //console.log(data);
    return data;
  };

  const pokemonData =  async (url) => {
    const response =  await fetchData(url);
    const dataPromises = response.results.map((pokemon) => (
      fetchData(pokemon.url)
    ));
    //console.log({dataPromises});

    const pokemonwithImages = await Promise.all(dataPromises);
    setPokemones(pokemonwithImages);
    //console.log({pokemonwithImages});

  
  };

  const handleSelection = (foward) => {
    
    if (foward && position > 151) return;
    if (!foward && position <= 0) return;  
    if (foward === false) {
      setPosition(position - 1);
    }else{
      setPosition(position + 1);
    }
  };

  const filterSelection = () => {
    const mySelection = pokemones.filter((pokemon, idx) => position === idx);
    setMyPokeSelection(mySelection);
    computerSelection();
    console.log(mySelection);
  };

  const computerSelection = () => {
    const randomPosition = Math.floor(Math.random() * 151);
    const computerSelection = pokemones.filter((pokemon, idx) => randomPosition === idx);
    setcomputerRandomSelection(computerSelection);
  };

  const handleStart = () => {
    setStartGame(true);
  }

  const handleAttack = () => {
    const myAttack = Math.floor(Math.random() * 10);
    const enemyAttack = Math.floor(Math.random() * 10);
    setMyHealth(myHealth - enemyAttack);
    setEnemyHealth(enemyHealth - myAttack);
    if (myHealth <= 0 || enemyHealth <= 0 ){
      alert('Game Over'); 
    }
  }

  useEffect(() => {
    pokemonData(url);
  }, []);


  return (
    <>
      <div className='main-container'>
        <h1>Nintendo GAMEBOY</h1>
        <div className='layout-game'>
          <div className='screen-container'>
           <div className='screen-layout'>
             <div className='inner-screen-layout'>
                { startGame ? (
                  <BattleScreen 
                  myPokeSelection={myPokeSelection} 
                  computerRandomSelection={computerRandomSelection}
                  myHealth={myHealth}
                  enemyHealth={enemyHealth}
                  />
                 ) : (
                pokemones && (
                 <ScreenPokemones pokemones={pokemones} position={position}/>
                )
                )}
              </div>
            </div>
          </div>
          <div className='name-g'>
            <h3>Nintendo GAMEBOY</h3>
          </div>

          <div className='controls-container'>
            <div className = 'container-pad'>
              <div className='button-pad-container'>
                <div className='upper-pad-container'>
                  <button className='upper-pad'></button>
                </div>
                <div className='center-pad'>
                 <button className='left-pad' onClick={()=> handleSelection(false)} ></button>
                 <div className='middle-pad'></div>
                 <button className='right-pad' onClick={()=> handleSelection(true)}></button>
                </div>
                <div className='down-pad-container'>
                  <button className='down-pad'></button>
                </div>
              </div>
            </div>
            <div className='container-select-start'>
              <div className='button-select-container'>
                <button className='button-select' onClick={()=>filterSelection()}></button>
                <div className='select'>select</div>
              </div>
              <div className='button-start-container'>
                <button className='button-start' onClick={()=> handleStart()}></button>
                <div className='start' >start</div>
              </div> 
            </div>
            <div className='container-action'>
              <div className='button-b-container'>
                <button className='button-b'>B</button>
              </div>
              <div className='button-a-container' onClick={()=>handleAttack()}>
                <button className='button-a'>A</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
