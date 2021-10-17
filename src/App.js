import React from 'react';
import {Component} from 'react';

import Pokemon from './components/Pokemon';
import PokemonDetails from './components/PokemonDetails';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';

import Pokeball from './images/pokeball.jpeg';

import './App.css';

//pokeball icons from <a target="_blank" href="https://icons8.com/icon/63311/pokeball">Pokeball</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

class App extends Component {
    constructor(){
        super();
        this.state = {
            pokemon : [],
            searchAll: [],
            searchInput : "",
            currentSearch: "",
            selected : {},
            captured : [],
            filter : "all",
            offset : 0,
            error: ""
        }
        this.searchInput = this.searchInput.bind(this);
        this.filterBy = this.filterBy.bind(this);
        this.showMore = this.showMore.bind(this);
        this.pokemonDetails = this.pokemonDetails.bind(this);
        this.searchPokemon = this.searchPokemon.bind(this);
        this.handleClearSearch = this.handleClearSearch.bind(this);
    }

    componentDidMount(){
        this.getPokemon();
    }

    getPokemon(){
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=' + this.state.offset)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var results = this.state.pokemon.concat(data.results);
            this.setState({pokemon : results});
        })
        .catch(error => {
            console.error(error);
            this.setState({error: "There has been an issue fetching pokemon."})
        });
    }

    searchPokemon(){
        //if search functionality is ever used, only fetching all pokemon once
        console.log(this.state.searchInput);
        if(this.state.searchInput != "" && this.state.searchAll.length == 0){
            fetch('https://pokeapi.co/api/v2/pokemon/?limit=1118')
            .then(response => response.json())
            .then(data => {
                var re = new RegExp(this.state.searchInput, 'i')
                var results = data.results.filter(pokemon => pokemon.name.match(re));
                this.setState({searchAll : data.results, currentSearch : this.state.searchInput, pokemon : results, selected : {}});
            });
        } else if(this.state.searchInput != ""){
            var re = new RegExp(this.state.searchInput, 'i')
            var results = this.state.searchAll.filter(pokemon => pokemon.name.match(re));
            this.setState({pokemon : results, currentSearch : this.state.searchInput, selected : {}});
        } else {this.setState({pokemon: [], currentSearch : "", offset: 0, selected : {}});
            this.getPokemon();
        };
    }

    searchInput(event){this.setState({searchInput : event.target.value})}

    filterBy(filter){ this.setState({filter : filter, selected : {}});}

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

    handleClearSearch(){
        this.setState({searchInput : ""}, () => {
            this.searchPokemon();
        });
    }

    render(){

        const isCaptured = (name) => {return (this.state.captured.findIndex(capName => capName == name) != -1)}

        var pokemonList = [];

        if(this.state.filter == "all"){
            pokemonList = this.state.pokemon.map(pokemon => {
                return (<Pokemon key={pokemon.name} name={pokemon.name} isSelected={this.state.selected.name && this.state.selected.name == pokemon.name} isCaptured={isCaptured(pokemon.name)} capture={(e) => this.capture(e, pokemon.name)} pokemonDetails={this.pokemonDetails}/>)
            })
        } else if(this.state.filter == "not captured") {
            const results = this.state.pokemon.filter(pokemon => this.state.captured.find(capName => capName == pokemon.name) == undefined );
            pokemonList = results.map(pokemon => {
                return (<Pokemon key={pokemon.name} name={pokemon.name} isSelected={this.state.selected.name && this.state.selected.name == pokemon.name} isCaptured={false} capture={(e) => this.capture(e, pokemon.name)} pokemonDetails={this.pokemonDetails}/>)
            })
        } else {
            pokemonList = this.state.captured.map(name => {
                return (<Pokemon key={name} name={name} isSelected={this.state.selected.name && this.state.selected.name == name} isCaptured={true} capture={(e) => this.capture(e, name)} pokemonDetails={this.pokemonDetails}/>)
            })
        }

        var message = [];

        if(this.state.captured.length == 0 && this.state.filter == "captured"){
            message.push(<div key="no-captured" className="message">You haven't caught any Pokemon yet, go get 'em!</div>)
        } else if(this.state.error == "" && this.state.pokemon.length == 0 && this.state.currentSearch == "" && this.state.filter == "not captured"){
            message.push(<div key="all-captured" className="message">Congratulations! You've caught 'em all!</div>)
        } else if(this.state.currentSearch != "" && this.state.pokemon.length > 0){
            message.push(<div key="search-results" className="message">Showing results for "{this.state.currentSearch}"</div>)
        } else if(this.state.currentSearch != "" && this.state.pokemon.length == 0){
            message.push(<div key="no-results" className="message">No results found for "{this.state.currentSearch}"</div>)
        } else if(this.state.error != ""){
            message.push(<div key="error" className="message">Oops! There seems to have been an issue fetching Pokemon, please try again later.</div>)
        }

        return(
            <main className="app-container">
                <div className="app-header">
                    <div className="app-header-filter">
                        <FilterBar filter={this.state.filter} setFilter={this.filterBy}/>
                    </div>
                    <div className="app-header-name" onClick={() => window.location.reload()}>Pokédex</div>
                    <div className="app-header-search">
                        <SearchBar input={this.state.searchInput} currentSearch={this.state.currentSearch} onChange={this.searchInput} onSubmit={this.searchPokemon} onClear={this.handleClearSearch}/>
                    </div>
                </div>
                {message}
                <div className="app-body">
                    <div className="app-body-section">
                        <div className="pokemon-list">
                            {pokemonList}
                            {this.state.pokemon.length < 1118 && this.state.pokemon.length >= 20 && this.state.filter != "captured" && this.state.currentSearch == "" ? 
                                <div className="show-more" onClick={this.showMore}>+</div> 
                            : null}
                        </div>
                    </div>
                    <div className="app-body-section">
                        {Object.keys(this.state.selected).length != 0 ? 
                            <PokemonDetails pokemon={this.state.selected} captured={isCaptured(this.state.selected.name)} captureFn={(e) => this.capture(e, this.state.selected.name)}/>
                        :
                            null
                        }
                    </div>
                </div>
                <img src={Pokeball} className="app-pokeball"/>
                <div className="app-footer">
                </div>
            </main>
        )
    }
}

export default App;