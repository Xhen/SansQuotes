const elements = {
    audio: document.getElementById("sans-audio"),
    sound: document.getElementById("make-sound"),
    start: document.getElementById("start"),
    sans: document.getElementById("sans-text"),
    image: document.getElementById("sans"),
    author: document.getElementById("author")
}

// Sans
const state = {
    i: 0,
    speed: 100,
    text: null,
    author: null,
    timeOut: null,
}

const reset = () => {
    toggleButton();
    elements.sans.innerHTML = "";
    elements.author.innerHTML = "";
    state.i = 0;
    window.clearTimeout(state.timeOut);
}

const toggleButton = () => {
    elements.start.disabled = !elements.start.disabled; 
}

const startSans = () => {
    reset();
    const {quote, author} = getQuote();
    state.text = quote;
    state.author = author;
    TypeWriter();
}

const playSound = () => {
    elements.audio.volume = 0.6;
    //elements.audio.volume = state.i / state.text.length;
    elements.audio.currentTime = 0.001;
    elements.audio.play();
}

const doEffect = () => {
    if(state.i % 2 == 0) {
        elements.image.classList.add("active");
    }
}

const removeEffect = () => {
    elements.image.classList.remove("active");
}


elements.sound.addEventListener("click", playSound)
elements.start.addEventListener("click", startSans)

const TypeWriter = () => {
    removeEffect();
    if(state.i < state.text.length) {
        playSound();
        doEffect();
        elements.sans.innerHTML += state.text.charAt(state.i);
        state.i++;
        state.timeOut = setTimeout(TypeWriter, state.speed)
    } else if(state.i >= state.text.length) {
        writeAuthor();
        toggleButton();
    }
}

const writeAuthor = () => {
    elements.author.innerHTML = state.author;
}
