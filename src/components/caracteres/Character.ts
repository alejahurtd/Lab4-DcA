import styles from './Character.css';

export enum Attribute {
	'image' = 'image',
	'name' = 'name',
	'status' = 'status',
	'species' = 'species',
	'type' = 'type',
	'origin' = 'origin',
	'episode' = 'episode',
}

class MyCharacter extends HTMLElement {
	name?: string;
	image?: string;
	status?: string;
	species?: string;
	type?: string;
	origin?: string;
	episode?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<Attribute, null> = {
			image: null,
			name: null,
			status: null,
			species: null,
			type: null,
			origin: null,
			episode: null,
		};
		return Object.keys(attrs);
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
		this[propName] = newValue;
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../src/components/Character/Character.css">
            <link/>
		<div>
			<section>
				<img src="${this.image}"></img>
				<h1> The name is:  ${this.name}</h1>
				<p> Its status is:  ${this.status}</p>
				<p> The spacies is: ${this.species}</p>
				<p> Its origin is: ${this.origin}</p>
				<p>Episodes in which it appears  ${this.episode}</p>
			</section>
			`;
		}
		const cssCharacter = this.ownerDocument.createElement('style');
		cssCharacter.innerHTML = styles;
		this.shadowRoot?.appendChild(cssCharacter);
	}
}

customElements.define('custom-character', MyCharacter);
export default MyCharacter;
