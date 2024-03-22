import CharactersData from './data/dataFetch';
import './components/indexPadre';
import MyCharacter, { Attribute } from './components/caracteres/Character';

class AppContainer extends HTMLElement {
	character: MyCharacter[] = [];
	inputElement: HTMLInputElement | null = null;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.inputElement = document.createElement('input');
		this.inputElement.type = 'number';
		this.inputElement.min = '1';
		// Obtener el valor del almacenamiento local si está disponible
		const storedValue = localStorage.getItem('charactersToDisplay');
		this.inputElement.value = storedValue || '1'; // Usar el valor almacenado o el valor por defecto '1'
		this.inputElement.addEventListener('change', this.handleInputChange.bind(this));
		this.inputElement.setAttribute(
			'style',
			'padding: 8px; border: 1px solid #ccc; border-radius: 20px; text-align: center; margin: 30px auto; display: block;'
		);
		this.shadowRoot?.appendChild(this.inputElement);

		this.fetchCharacters();
	}

	async fetchCharacters() {
		try {
			const data = await CharactersData();
			const charactersToDisplay = parseInt(this.inputElement?.value || '1');

			// Guardar el valor en el almacenamiento local
			localStorage.setItem('charactersToDisplay', charactersToDisplay.toString());

			this.character = [];

			data.results?.slice(0, charactersToDisplay).forEach((character: any) => {
				const characterCard = this.ownerDocument.createElement('custom-character') as MyCharacter;
				characterCard.setAttribute(Attribute.name, character.name);
				characterCard.setAttribute(Attribute.image, character.image);
				characterCard.setAttribute(Attribute.status, character.status);
				characterCard.setAttribute(Attribute.species, character.species);
				characterCard.setAttribute(Attribute.type, character.type);
				characterCard.setAttribute(Attribute.origin, character.origin.name);
				characterCard.setAttribute(Attribute.episode, character.episode.length.toString());
				this.character.push(characterCard);
			});

			this.render();
		} catch (error) {
			console.log(error);
		}
	}

	handleInputChange() {
		this.fetchCharacters();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `<link rel="stylesheet" href="./src/style.css"> <link/>`;

			if (this.inputElement) {
				this.shadowRoot.appendChild(this.inputElement);
			}

			this.character.forEach((characterElement) => {
				this.shadowRoot?.appendChild(characterElement);
			});
		}
	}
}

customElements.define('app-container', AppContainer);
