interface character {
	name: string;
	image: string;
	Status: string;
	Species: string;
	Type: string;
	Origin: {
		name: string;
	};
	episode: string;
}
const CharactersData = async () => {
	try {
		const getData = await fetch(`https://rickandmortyapi.com/api/character`).then((res) => res.json());
		return getData;
	} catch (error) {
		console.log(error);
	}
};

export default CharactersData;
