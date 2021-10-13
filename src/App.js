import React from 'react';
import {Component} from 'react';

import Pokemon from './components/Pokemon';
import PokemonDetails from './components/PokemonDetails';

import './App.css';

//pokeball icons from <a target="_blank" href="https://icons8.com/icon/63311/pokeball">Pokeball</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

class App extends Component {
    constructor(){
        super();
        this.state = {
            pokemon : [],
            searchAll: [],
            searchInput : "",
            selected : {},
            captured : [],
            filter : "all",
            offset : 0
        }
        this.searchInput = this.searchInput.bind(this);
        this.filterBy = this.filterBy.bind(this);
        this.showMore = this.showMore.bind(this);
        this.pokemonDetails = this.pokemonDetails.bind(this);
        this.searchPokemon = this.searchPokemon.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount(){
        this.mounted = true;
        this.getPokemon();
    }

    getPokemon(){
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=' + this.state.offset)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var results = this.state.pokemon.concat(data.results);
            this.setState({pokemon : results});
        });
    }

    searchPokemon(){
        //if search functionality is ever used, only fetching all pokemon once
        console.log(this.state.searchInput);
        if(this.state.searchInput != "" && this.state.searchAll.length == 0){
            fetch('https://pokeapi.co/api/v2/pokemon/?limit=1118')
            .then(response => response.json())
            .then(data => {
                var results = data.results.filter(pokemon => pokemon.name.includes(this.state.searchInput));
                this.setState({searchAll : data.results, pokemon : results});
            });
        } else if(this.state.searchInput != ""){
            var results = this.state.searchAll.filter(pokemon => pokemon.name.includes(this.state.searchInput));
            this.setState({pokemon : results});
        } else {this.setState({pokemon: [], offset: 0});
            this.getPokemon();
        };
    }

    searchInput(event){this.setState({searchInput : event.target.value})}//this.searchPokemon(event.target.value)}

    filterBy(event){ this.setState({filter : event.target.value});}

    pokemonDetails(details){this.setState({selected: details});}

    capture(e, name){
        e.stopPropagation();
        var captured = Array.from(this.state.captured);
        const index = captured.findIndex(pm => pm == name);
        if (index == -1) captured.push(name);
        else captured.splice(index, 1);
        this.setState({captured : captured});
    }

    showMore(){ 
        this.setState({offset : this.state.offset + 20}, () => {
            this.getPokemon();
        })
    }

    handleKeyDown(event){
        if(event.key == "Enter"){
            this.searchPokemon();
        }
    }

    render(){

        const isCaptured = (name) => {return (this.state.captured.findIndex(capName => capName == name) != -1)}

        var pokemonList = [];

        if(this.state.filter == "all"){
            pokemonList = this.state.pokemon.map(pokemon => {
                return (<div key={pokemon.name}>
                            <Pokemon name={pokemon.name} isCaptured={isCaptured(pokemon.name)} capture={(e) => this.capture(e, pokemon.name)} pokemonDetails={this.pokemonDetails}/>
                        </div>)
            })
        } else if(this.state.filter == "not captured") {
            const results = this.state.pokemon.filter(pokemon => this.state.captured.find(capName => capName == pokemon.name) == undefined );
            pokemonList = results.map(pokemon => {
                return (<div key={pokemon.name}>
                            <Pokemon name={pokemon.name} isCaptured={false} capture={(e) => this.capture(e, pokemon.name)} pokemonDetails={this.pokemonDetails}/>
                        </div>)
            })
        } else {
            pokemonList = this.state.captured.map(name => {
                return (<div key={name}>
                            <Pokemon name={name} isCaptured={true} capture={(e) => this.capture(e, name)} pokemonDetails={this.pokemonDetails}/>
                        </div>)
            })
        }

        return(
            <main className="app-container">
                <div className="app-header">
                    <div className="app-header-controls">
                        <select onChange={this.filterBy}>
                            <option>all</option>
                            <option>captured</option>
                            <option>not captured</option>
                        </select>
                    </div>
                    <div className="app-header-name">Pokédex</div>
                    <div className="app-header-controls">
                        <input type="text" placeholder="Search..." onChange={this.searchInput} onKeyDown={this.handleKeyDown}></input>
                        <button type="button" onClick={this.searchPokemon}>OK</button>
                    </div>
                </div>
                <div className="app-body">
                    <div className="left-side">
                        {pokemonList}
                        {this.state.pokemon.length < 1118 && this.state.pokemon.length >= 20 && this.state.filter != "captured" && this.state.searchInput == "" ? 
                            <div className="show-more" onClick={this.showMore}>+</div> 
                        : null}
                    </div>
                    <div className="right-side">
                        {Object.keys(this.state.selected).length != 0 ? 
                            <PokemonDetails pokemon={this.state.selected} captured={isCaptured(this.state.selected.name)} captureFn={(e) => this.capture(e, this.state.selected.name)}/>
                        :
                            null
                        }
                    </div>
                </div>
                <div className="app-footer">
                </div>
            </main>
        )
    }
}

export default App;