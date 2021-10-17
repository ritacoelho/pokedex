import React from 'react';
import {Component} from 'react';

import CaptureButton from './CaptureButton';
import '../css/Pokemon.css';

//tools
import CircularProgress from '@mui/material/CircularProgress';

class Pokemon extends Component {
    constructor(){
        super();
        this.state = {
            details : {},
            hoverCaptureButton: false,
        }
    }

    componentDidMount(){
        this.getDetails();
    }

    /* Get Pokemon details in order to render image */
    getDetails(){
        fetch('https://pokeapi.co/api/v2/pokemon/'+this.props.name)
        .then(response => response.json())
        .then(data => {this.setState({details : data});});
    }

    /* Return selected Pokemon details to App */
    selectPokemon(){
        this.props.pokemonDetails(this.state.details);
    }

    render(){

        return(
            <main className={this.props.isSelected ? "selected-pokemon-card" : "pokemon-card"} onClick={() => this.selectPokemon()}>
                <div className="card-header">
                    <div className="poke-id">#{this.state.details.id}</div>
                    <CaptureButton captured={this.props.isCaptured} captureFn={(e) => this.props.capture(e, this.props.name)}/>
                </div>

                {this.state.details.sprites ? <img style={{"maxHeight":"96px"}} src={this.state.details.sprites.front_default} alt={this.state.details.name}></img> : <div className="loading"><CircularProgress fontSize="large" color="inherit"/></div>}
                <div>{this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)}</div>
            </main>
        )
    }
}

export default Pokemon