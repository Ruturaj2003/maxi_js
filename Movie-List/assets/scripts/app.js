const addMoiveModal = document.getElementById('add-modal');
const startaddMoiveButton = document.querySelector('header button');
//const startaddMoiveButton = document.querySelector('header').lastElementChild;
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMoiveModal.querySelector('.btn--passive');
const confirmMoiveButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMoiveModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const moives = []; //we will add objects in the array
const updateUI = () => {
    if (moives.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
};

const renderNewMoiveElement = (title, imageUrl, rating) => {
    const newMoiveElement = document.createElement('li');
    newMoiveElement.className = 'moive-element';
    //Back tick is used for 1) Multi line    2) data injection
    newMoiveElement.innerHTML = `
        <div class = "moive-element__image">
            <img src = "${imageUrl}" alt = "${title}";
        </div>
        <div class = "moive-element__info">
            <h2>
            ${title}
            </h2>
            <p> ${rating}/5 stars </p>        
        </div>
    `;
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMoiveElement);
};

const toggleBackdropHandler = () => {
    backdrop.classList.toggle('visible');
};

const backdropClickHandler = () => {
    addMoiveModal.classList.toggle('visible');
    toggleBackdropHandler();
};

const clearMoiveInput = () => {
    for (const userInput of userInputs) {
        userInput.value = '';
    }
};

const cancelAddMovieHandler = () => {
    addMoiveModal.classList.toggle('visible');
    toggleBackdropHandler();
    clearMoiveInput();
};

const addMoiveHandler = () => {
    const titleValue = userInputs[0].value;
    const imgUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;
    //trim will remove excess whitespace

    if (
        titleValue.trim() === '' ||
        imgUrlValue.trim() === '' ||
        ratingValue.trim() === '' ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) {
        alert('Please enter valid values (rating between 1 and 5)');
        return;
    }

    const newMoive = {
        title: titleValue,
        image: imgUrlValue,
        rating: ratingValue,
    };
    moives.push(newMoive);
    console.log(moives);
    backdropClickHandler(); //I am using this as i am lazy and dont want to create another function
    clearMoiveInput();
    renderNewMoiveElement(newMoive.title, newMoive.image, newMoive.rating);
    updateUI();
};

startaddMoiveButton.addEventListener('click', () => {
    addMoiveModal.classList.toggle('visible');
    toggleBackdropHandler();
});
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmMoiveButton.addEventListener('click', addMoiveHandler);
