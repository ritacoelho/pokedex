import React from 'react';
import {Component} from 'react';


class App extends Component {
    constructor(){
        super();
        this.state = {
            pageNum : 0,
            pokemon : [],
            selected : {},
            captured : []
        }
        this.pageUp = this.pageUp.bind(this);
        this.pageDown = this.pageDown.bind(this);
        this.selectPokemon = this.selectPokemon.bind(this);
    }

    componentDidMount(){
        this.getPokemon();
    }

    getPokemon(){
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=' + (this.state.pageNum * 20))
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(Math.ceil(data.count/20));
            this.setState({pokemon : data.results});
        });
    }

    selectPokemon(pokemon){
        console.log(pokemon.name);
        fetch(pokemon.url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({selected : data });
        })
    }

    pageUp(){
        console.log("clicked page up");
        this.setState({pageNum : this.state.pageNum + 1}, () => {
            console.log("new page: " + this.state.pageNum)
            this.getPokemon();
        });
    }

    pageDown(){
        console.log("clicked page down");
        this.setState({pageNum : this.state.pageNum - 1}, () => {
            console.log("new page: " + this.state.pageNum)
            this.getPokemon();
        });
    }

    render(){

        const pokemonList = this.state.pokemon.map(pokemon => {return (<li key={pokemon.name} pokemon={pokemon} onClick={() => this.selectPokemon(pokemon)}>{pokemon.name}</li>)})
        const page = this.state.pageNum;
        return(
            <main>
                <h1>Pokedex</h1>
                <ol start={this.state.pageNum*20+1}>{pokemonList}</ol>
                    <div>
                        <button type="button" onClick={this.pageDown}>-</button>
                        <div> {page} </div>
                        <button type="button" onClick={this.pageUp}>+</button>
                    </div>
            </main>
        )
    }
}

export default App;