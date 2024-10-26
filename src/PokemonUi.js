import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import '@bbva-web-components/bbva-foundations-grid-tools-layout/bbva-foundations-grid-tools-layout.js';
import '@bbva-web-components/bbva-button-default/bbva-button-default.js';
import '@bbva-web-components/bbva-core-collapse/bbva-core-collapse.js';
import styles from './pokemon-ui.css.js';
import '@pokeEvolucion/pokemon-dm/pokemon-dm.js'


export class PokemonUi extends LitElement {
  static get properties() {
    return {
      pokemones: { type: Array },
      mostrarEvoluciones: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.pokemones = [];
    this.mostrarEvoluciones = false;
  }

  connectedCallback() {
    super.connectedCallback();
    //this.obtenerPokemones(); 
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('pokemon-ui-shared-styles'),
    ];
  }

  // Método para obtener evoluciones y cambiar el estado
  async mostrarEvolucionesPokemon(id) {
    this.mostrarEvoluciones = true;
    this.pokemones = [];
    await this.obtenerEvoluciones(id);
    
  }

  // Método para volver a la lista de pokemones y cambiar el estado
  async volverAlListado() {
    this.mostrarEvoluciones = false;
    this.pokemones = [];
    await this.obtenerPokemones();
  }

  async firstUpdated(){
    const pokemonDm = this.shadowRoot.querySelector('pokemon-dm');
    this.pokemones = await pokemonDm.obtenerPokemones();
    console.log('Pokemones',this.pokemones);
  }
  /**Consumir API */

  // Función para obtener los Pokémon
  /*async obtenerPokemones() {

    const url = 'https://pokeapi.co/api/v2/evolution-chain?limit=6';

    try {
      const response = await fetch(url);
      const data = await response.json();

      const evolutionUrls = data.results.map((evolution) => evolution.url);

      for (const evolutionUrl of evolutionUrls) {
        const evolutionResponse = await fetch(evolutionUrl);
        const evolutionData = await evolutionResponse.json();

        // Llama a la función para obtener detalles del Pokémon
        const nombre = evolutionData.chain.species.name;
        const id = evolutionData.id;
        await this.obtenerDetallePokemon(nombre, id);
      }
    } catch (error) {
      console.error('Error obteniendo datos:', error);
    }
  }

  async obtenerDetallePokemon(pokemonName, id) {
    try {
      // Primera llamada para obtener los datos del Pokémon
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const data = await response.json();

      // Segunda llamada para obtener los datos de especie (incluye la descripción)
      const responseSpecies = await fetch(data.species.url);
      const dataSpecies = await responseSpecies.json();

      const pokemonDetail = {
        name: data.name,
        image: data.sprites.front_default,
        types: data.types.map((typeInfo) => typeInfo.type.name).join(', '),
        descripcion: dataSpecies.flavor_text_entries.find(entry => entry.language.name === 'es').flavor_text,
        id: id,
        showDescription: false, // Inicializa showDescription en false
      };

      // Añadir el Pokémon al array
      this.pokemones = [...this.pokemones, pokemonDetail];
    } catch (error) {
      console.error(`Error obteniendo detalles del Pokémon ${pokemonName}:`, error);
    }
  }

  async obtenerEvoluciones(id) {
    try {
      //const response = await fetch('https://pokeapi.co/api/v2/evolution-chain/1'); eevee 67

      const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`);
      const data = await response.json();
      const chain = data.chain;

      // Añadir el Pokémon base
      await this.obtenerDetallePokemon(chain.species.name);

      // Verificar si tiene evoluciones
      if (chain.evolves_to.length > 0) {
        const firstEvolution = chain.evolves_to[0];
        await this.obtenerDetallePokemon(firstEvolution.species.name);

        // Verificar si tiene una segunda evolución
        if (firstEvolution.evolves_to.length > 0) {
          const secondEvolution = firstEvolution.evolves_to[0];
          await this.obtenerDetallePokemon(secondEvolution.species.name);
        }
      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }*/

  render() {
    return html`
      <bbva-foundations-grid-tools-layout layout='[{slot:"single","cols":{"sm":12,"md":12,"lg":12}}]'> 
        <div slot="single">
          <h1>Pokemones</h1>         
          <div class="pokemon-list">
            ${this.pokemones.map((pokemon) => html`
              <div class="pokemon">
                <img src="${pokemon.image}" alt="${pokemon.name}" />
                <h3>${pokemon.name}</h3>
                
                <div>
                  <h1>${pokemon.id}</h1>
                  <h4>Type: ${pokemon.types}</h4>
                  <p>${pokemon.descripcion}</p>
                </div>
  
                ${!this.mostrarEvoluciones ? html`
                  <bbva-button-default size="1" @click="${() => this.mostrarEvolucionesPokemon(pokemon.id)}" tabindex="0">
                    Ver Evolución
                  </bbva-button-default>
                ` : ''}
              </div>
            `)}
          </div>
          ${this.mostrarEvoluciones ? html`
            <bbva-button-default size="1" @click="${() => this.volverAlListado()}" tabindex="0">
              Volver
            </bbva-button-default>
          ` : ''}
        </div>
      </bbva-foundations-grid-tools-layout>
      <pokemon-dm></pokemon-dm>
    `;
  }

  
}
