const mainDiv = document.querySelector('.mainDiv');
const result = document.querySelector('.result');
const message = document.querySelector('.message');
const textArea = document.querySelector('textarea');
const btn = document.querySelector('.btn')

const phrases = ['The quick brown fox jumps over the lazy dog.',
    'The bewildered tourist was lost.',
    'The lost puppy was a wet and stinky dog.',
    'The flu clinic had seen many cases of infectious disease.',
    'It was a story as old as time.',
    'The sports car drove the long and winding road.',
    'Saturday became a cool, wet afternoon.',
    'To make lemonade, you have to start with lemons.',
    'I tried to see the stage, but I was too short.',
    'She organized a boycott to make a statement.',
    'To see Niagara Falls is mind-boggling.',
    'He really needs to get his priorities in order.',
    'The company decided to reduce hours for everyone.',
    'To donate time or money is an honorable thing.',
    'I went to Spain to study the language and culture.',
    'Taking my dog for a walk is fun.',
    'Walking in the rain can be difficult.',
    'Strolling along a beach at sunset is romantic.',
    'Getting a promotion is exciting.',
    'Signing autographs takes time.',
    'Going for ice cream is a real treat.',
    'Singing for his supper was how he earned his keep.',
    'Getting a sore back was the result of the golf game.',
    'Pulling an all-nighter did not improve his test scores.',
    'Sailing into the sunset was the perfect end to the book.'];


let startTime, endTime;
let randomPhrase;

btn.addEventListener('click', () => {
    if (btn.innerHTML === "Start") {
        // enable typing in text area when start the game
        textArea.disabled = false;
        playGame();
    } else if (btn.innerHTML === "Done") {
        // disable typing in text area when end the game
        textArea.disabled = true;
        // changing button to Start
        btn.innerHTML = "Start";
        endGame();
    }

});

let countMistakes = 0;

function playGame() {
    // random phrase chooser
    message.innerHTML = phrases[Math.floor(Math.random() * phrases.length)];
    randomPhrase = message.innerHTML;
    // taking start time when started the game
    let date = new Date();
    startTime = date.getTime();
    // changing button to Done
    btn.innerHTML = "Done";
    textArea.value = '';
    result.innerHTML = '';
    countMistakes = 0;
}

function endGame() {
    // taking end time when ended the game
    let date = new Date();
    endTime = date.getTime();

    // subtracting end time with start time, and converting it to seconds
    let totalTime = (endTime - startTime) / 1000;
    // console.log('ukupno vreme u sekundama', totalTime);

    // taking words count in typed text area
    let typedTextValue = textArea.value;
    let typedLength = textArea.value === '' ? 0 : typedTextValue.split(' ').length;
    // console.log('broj ukucanih reci', typedLength);

    // taking total words typed and divided by total time, multiplied by 60 to get minutes;
    let speed = Math.round((typedLength / totalTime) * 60);
    // console.log('brzina kucanja reci u minuti', speed);

    // result message
    compareWords(message.innerHTML, textArea.value)
    if (textArea.value.trim() === '') {
        // if nothing is typed
        result.innerHTML = `You need to type the sentence`;
    } else if (message.innerHTML !== textArea.value.trim()) {
        // if there is mistakes
        result.innerHTML = `You type ${speed} words per minute, you typed ${typedLength} words in ${totalTime} seconds` + '<br>' + `AND YOU HAD ${countMistakes} mistyped words out of ${message.innerHTML.split(' ').length}.`;
    } else {
        // if everything is correct
        result.innerHTML = `You type ${speed} words per minute, you typed ${typedLength} words in ${totalTime} seconds` + '<br>' + 'AND YOU TYPED ALL CORRECT, WELL DONE!';
    }
}

// comparing typed words and counting mistakes
function compareWords(str1, str2) {
    str1 = message.innerHTML.split(' ');
    str2 = textArea.value.split(' ');

    // console.log(str1);

    str1.forEach((word, idx) => {
        if (word !== str2[idx]) {
            countMistakes++;
        }
    });
    // console.log(countMistakes);
    return countMistakes;
}
