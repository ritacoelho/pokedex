import React from 'react';

import '../css/Misc.css';

const Type = ({name}) => {

    function typeColor() {
        switch (name) {
            case "normal": return "#A7A977"
            case "fire": return "#F08030"
            case "fighting": return "#C03128"
            case "water": return "#6891F0"
            case "flying": return "#A891F0"
            case "grass": return "#78C84F"
            case "poison": return "#9F409F"
            case "electric": return "#F9D030"
            case "ground": return "#E1C068"
            case "psychic": return "#F95887"
            case "rock": return "#B8A038"
            case "ice": return "#99D7D8"
            case "bug": return "#A8B820"
            case "dragon": return "#7038F8"
            case "ghost": return "#705898"
            case "dark": return "#6F5848"
            case "steel": return "#B8B8D0"
            case "fairy": return "#EF99AC"
        }
    }

    return(
        <div className="type" style={{"backgroundColor" : typeColor()}}>
            {name}
        </div>
    )
}

export default Type