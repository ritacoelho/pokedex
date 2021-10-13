import React, {useEffect, useState} from 'react';

import Type from './Type';
import CaptureButton from './CaptureButton';
import '../css/PokemonDetails.css';

//icons
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

//tools
import Tooltip from '@mui/material/Tooltip';

const PokemonDetails = ({pokemon, captured, captureFn}) => {
    const [gender, setGender] = useState("male");
    const [position, setPosition] = useState("front");

    useEffect(() => {
        setGender("male");
        setPosition("front");
    }, [pokemon])

    var sprites = {male:{}, female:{}};
    for(const [key, value] of Object.entries(pokemon.sprites)){
        if(value != null){
            switch (key) {
                case "front_default":
                    sprites["male"]["front"] = value;
                    break;
            
                case "back_default":
                    sprites["male"]["back"] = value;
                    break;
                
                case "front_female":
                    sprites["female"]["front"] = value;
                    break;
                
                case "back_female":
                    sprites["female"]["back"] = value;
            }
        }
    }

    function toggleGender(){
        gender == "male" ? setGender("female") : setGender("male");
    }

    function togglePosition(){
        position == "front" ? setPosition("back") : setPosition("front");
    }

     //function gotten from http://jsfiddle.net/sUK45/
    var stringToColour = function(str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        var colour = '#';
        for (var i = 0; i < 3; i++) {
            var value = (hash >> (i * 8)) & 0xFF;
            colour += ('00' + value.toString(16)).substr(-2);
        }
        return colour;
    }

    var abilityList = [];
    pokemon.abilities.forEach(ability => {
        if(ability.is_hidden){
            abilityList.push(
                <Tooltip title="Hidden">
                    <div 
                    key={ability.ability.name} 
                    className="ability">
                        {ability.ability.name}
                    </div>
                </Tooltip>
            )
        }else {
            abilityList.push(<div 
                            key={ability.ability.name} 
                            className="ability" 
                            style={!ability.is_hidden ? {"border":"1px solid "+stringToColour(ability.ability.name), "color":stringToColour(ability.ability.name), "backgroundColor":"white"} : null}>
                                {ability.ability.name}
                            </div>)
        }
    });

    var typeList = [];
    pokemon.types.forEach(type => {
        typeList.push(<Type key={type.type.name} name={type.type.name}/>)
    });

   
    

    return(
        <div className="details-container">
            <div className="details-header">
                <div className="details-basic">
                    <div className="poke-id">#{pokemon.id}</div>
                    <div className="poke-name">{pokemon.name}</div>
                    <div className="poke-types">{typeList}</div>
                </div>
                <div className="poke-image">
                    <img style={{"width" : "100%"}} src={sprites[gender][position]} alt={sprites[gender][position]}></img> 
                </div>
                <div className="poke-controls">
                    <CaptureButton big={true} captured={captured} captureFn={captureFn}/>
                    {Object.keys(sprites.female).length > 0 ? 
                        <div className="gender-controls" onClick={() => toggleGender()}>
                            <FemaleIcon className={gender == "female" ? "selected-gender-button" : "gender-button"} fontSize="large">female</FemaleIcon>
                            <MaleIcon className={gender == "male" ? "selected-gender-button" : "gender-button"} fontSize="large">male</MaleIcon>
                        </div>
                    : 
                        null
                    }
                    <RotateLeftIcon className="turn-around" fontSize="large" onClick={() => togglePosition()}/>
                </div>
            </div>
            <div className="details-field-name">ABILITIES</div>
            <div className="poke-types">{abilityList}</div>

            <div className="details-field-name">HEIGHT</div>
            <div className="ability">{pokemon.height}m</div>
            <div className="details-field-name">WEIGHT</div>
            <div className="ability">{pokemon.weight}kg</div>
            <div className="details-field-name">BASE EXP</div>
            <div className="ability">{pokemon.base_experience}</div>

            <div className="details-field-name">STATS</div>

            <div className="details-field-name">HP</div>
            <div className="ability">{pokemon.stats[0].base_stat}</div>
            <div className="details-field-name">ATTACK</div>
            <div className="ability">{pokemon.stats[1].base_stat}</div>
            <div className="details-field-name">DEFENSE</div>
            <div className="ability">{pokemon.stats[2].base_stat}</div>
            <div className="details-field-name">SPECIAL-ATTACK</div>
            <div className="ability">{pokemon.stats[3].base_stat}</div>
            <div className="details-field-name">SPECIAL-DEFENSE</div>
            <div className="ability">{pokemon.stats[4].base_stat}</div>
            <div className="details-field-name">SPEED</div>
            <div className="ability">{pokemon.stats[5].base_stat}</div>



        </div>
    )
}

export default PokemonDetails