const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'f109f0f8',
            s: searchTerm
        }
    });

    if (response.data.Error) {
        return [];
    }

    return response.data.Search;
}


const input = document.querySelector('input');

const onInput =  async event => {
        const movies = await fetchData(event.target.value);

        for (let movie of movies) {
            const div = document.createElement('div');

            div.innerHTML = `
                <img src="${movie.Poster}" />
                <h1>${movie.Title}</h1>
            `;

            document.querySelector('#target').append(div);
        }
};

input.addEventListener('input', debounce(onInput));