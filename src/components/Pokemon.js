import React from 'react';
import {Component} from 'react';

import CaptureButton from './CaptureButton';
import '../css/Pokemon.css';

class Pokemon extends Component {
    constructor(){
        super();
        this.state = {
            details : {},
            hoverCaptureButton: false,
        }
        //this.selectPokemon = this.selectPokemon.bind(this)
    }

    componentDidMount(){
        this.getDetails();
    }

    getDetails(){
        fetch('https://pokeapi.co/api/v2/pokemon/'+this.props.name)
        .then(response => response.json())
        .then(data => {this.setState({details : data});});
    }

    selectPokemon(name){
        this.props.pokemonDetails(this.state.details);
    }

    render(){
        //TODO: if image is not available render button without image
        const captureButton = () => {
            <button className="capture-button" onClick={(e) => this.props.capture(e, this.props.name)}> {this.props.isCaptured ? <>Captured</> : <>Capture</>}</button>
        }
        return(
            <main className={this.props.isSelected ? "selected-pokemon-card" : "pokemon-card"} onClick={() => this.selectPokemon(this.props.name)}>
                <div className="card-header">
                    <div className="poke-id">#{this.state.details.id}</div>
                    <CaptureButton captured={this.props.isCaptured} captureFn={(e) => this.props.capture(e, this.props.name)}/>
                </div>
                {this.state.details.sprites ? <img style={{"maxHeight":"96px"}} src={this.state.details.sprites.front_default} alt={this.state.details.name}></img> : null}
                <div style={{"textAlign" : "center", "fontSize" : "small"}}>{this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)}</div>
            </main>
        )
    }
}

export default Pokemon