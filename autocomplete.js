const createAutocomplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
    root.innerHTML = `
    <label><b>Search</b></label>
    <input type="text">
    <div class="dropdown">
        <div class="dropdown-menu">
          <div class="dropdown-content results"></div>
        </div>
    </div>
`;

    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');

    const onInput = async event => {
        const items = await fetchData(event.target.value);

        if (!items.length) {
            dropdown.classList.remove('is-active');
            return;
        }

        resultsWrapper.innerHTML = '';//clear the results each time we search for a new movie
        dropdown.classList.add('is-active');
        for (let movie of items) {
            const option = document.createElement('a');

            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(movie);
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(movie); 
                onOptionSelect(movie);
            });
            resultsWrapper.append(option);
        }
    };

    input.addEventListener('input', debounce(onInput));
    document.addEventListener('click', event => {
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active');
        }
    });//close the dropdown when we click outside of it

};