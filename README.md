# Pokedex
Simple reproduction of a Pokedex using PokéAPI (https://pokeapi.co/).

### Running this project

Run `npm start` in the root directory of this project.

### Exercise requirements

1. View the list of all Pokemon from the home page.
2. Click on any Pokemon to view its details.
3. Ability to set Pokemon as captured from the details page and the overall list.
4. Filter list of Pokemon by *All*, *Captured* and *Not Captured*
**Bonus** Ability to search Pokemon from the home page.

### Notes

I opted for a single-page app for simplicity, as the current functionalities allowed for it and so the user could simultaneously view the list of Pokemon and the selected Pokemon.

If I intend to have multiple pages in the future, I would add the following packages:
- `react-router-dom` to define the route paths and the respective components to be rendered
- `react-redux` to keep track of state accross the app (ex. captured Pokemon list)

### Credits

Pokeball icon from https://icons8.com/icon/63311/pokeball

App design inspired by:
    https://dribbble.com/shots/15128634-Pokemon-Pokedex-Website-Redesign-Concept