import React, {useEffect, useState} from 'react';

import Type from './Type';
import CaptureButton from './CaptureButton';
import '../css/PokemonDetails.css';

//icons
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import Autorenew from '@mui/icons-material/Autorenew';

//tools
import Tooltip from '@mui/material/Tooltip';

const PokemonDetails = ({pokemon, captured, captureFn}) => {
    const [gender, setGender] = useState("male");
    const [position, setPosition] = useState("front");

    useEffect(() => {
        setGender("male");
        setPosition("front");
    }, [pokemon])

    /* Determine whether Pokemon details have female images */
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

    /* function returns hex color value from string gotten from http://jsfiddle.net/sUK45/ */
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

    /* Define "ability" elements  */
    var abilityList = [];
    pokemon.abilities.forEach(ability => {
        if(ability.is_hidden){
            abilityList.push(
                <Tooltip key={ability.ability.name} title="Hidden" placement="right" disableInteractive>
                    <div className="ability">{ability.ability.name}</div>
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

    /* Define "type" elements */
    var typeList = [];
    pokemon.types.forEach(type => {
        typeList.push(<Type key={type.type.name} name={type.type.name}/>)
    });

    /* Define gender button if Pokemon details has both genders */
    var genderButton = [];
    if(Object.keys(sprites.female).length > 0 && gender == "male") genderButton.push(<MaleIcon key="gender-button" className="gender-button" onClick={() => toggleGender()}/>);
    else if(Object.keys(sprites.female).length > 0 && gender == "female") genderButton.push(<FemaleIcon key="gender-button" className="gender-button" onClick={() => toggleGender()}/>);
    

    return(
        <div className="details-container">
             
            <div className="details-header">
                <div className="details-id">#{pokemon.id}</div>
                <CaptureButton big={true} captured={captured} captureFn={captureFn}/>
            </div>
            <div className="details-basic">
                <div className="poke-name">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</div>
                <div className="poke-image">
                    <img style={{"width" : "100%"}} src={sprites[gender][position]} alt={sprites[gender][position]}/> 
                    {genderButton}
                    <Autorenew id={position} className="turn-around" onClick={() => togglePosition()}/>
                </div>
                <div className="poke-types">{typeList}</div>
            </div>

            <div className="details">
                <div className="details-info">
                    <div className="details-info-item">
                        <div className="details-field-name">ABILITIES</div>
                        <div className="poke-types">{abilityList}</div>
                    </div>
                </div>
                <div className="details-info">
                    <div className="details-info-item">
                        <div className="details-field-name">BASE EXP</div>
                        <div className="info">{pokemon.base_experience}</div>
                    </div>
                    <div className="details-info-item">
                        <div className="details-field-name">HEIGHT</div>
                        <div className="info">{pokemon.height}m</div>
                    </div>
                    <div className="details-info-item">
                        <div className="details-field-name">WEIGHT</div>
                        <div className="info">{pokemon.weight}kg</div>
                    </div>
                </div>
                
                <div className="poke-stats">
                    <div className="details-field-name">STATS</div>
                    <div className="details-info">
                        <div className="details-stat-item">
                            <div className="details-stat-name">HP</div>
                            <div className="stat">{pokemon.stats[0].base_stat}</div>
                        </div>
                        <div className="details-stat-item">
                            <div className="details-stat-name">ATK</div>
                            <div className="stat">{pokemon.stats[1].base_stat}</div>
                        </div>
                        <div className="details-stat-item">
                            <div className="details-stat-name">DEF</div>
                            <div className="stat">{pokemon.stats[2].base_stat}</div>
                        </div>
                        <div className="details-stat-item">
                            <div className="details-stat-name">SpA</div>
                            <div className="stat">{pokemon.stats[3].base_stat}</div>
                        </div>
                        <div className="details-stat-item">
                            <div className="details-stat-name">SpD</div>
                            <div className="stat">{pokemon.stats[4].base_stat}</div>
                        </div>
                        <div className="details-stat-item">
                            <div className="details-stat-name">SPD</div>
                            <div className="stat">{pokemon.stats[5].base_stat}</div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default PokemonDetails