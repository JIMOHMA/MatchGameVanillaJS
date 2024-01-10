var emojiPairs = new Map();
function init() {

    const emojiType = ["😂", "😥", "🍔", "🥨", "🚒", "✈", "💘", "🐋"];
    
    let counter = 0;
    let counter2 = 1;
    emojiType.forEach(emoji => {
        emojiPairs.set(counter, emoji);
        emojiPairs.set(counter2, emoji)
        counter =  counter + 2;
        counter2 = counter2 + 2;
    })
    // console.log(`emojiPairs is ${emojiPairs}`);
}
    
function getUniqueNumbers(min, max, count) {
    let uniqueNumbers =  new Set()
    while (uniqueNumbers.size < count) {
        let number = Math.floor(Math.random() * (max - min + 1)) + min;
        uniqueNumbers.add(number)
    }
    return Array.from(uniqueNumbers);
}

// setup function for populating the board
function setUp() {
    init() // sets up the map for the grid
    // console.log(`emojiPairs is ${emojiPairs}`);
    // console.log("Here now");
    var grid = document.getElementsByClassName("buttonObj");
    grid = [...grid]
    const gridSize = grid.length;
    // console.log(`type of grid is ${typeof(grid)}`);
    
    let uniqueInfo = getUniqueNumbers(0, 15, gridSize);
    let counter = 0;
    grid.map((item) => {
        item.textContent = emojiPairs.get(uniqueInfo[counter]);
        counter++;
    });
    console.log(emojiPairs);

    // call function to add the onClick event listener
    addClickEventToButton();
    
}

// add event Listener to the clicked event on every button
function addClickEventToButton() {
    let start = 0;
    let end = 15;
    
    while (start <= end) {        
        var buttonID = `button${start}`
        // add onclick to button
        const emojiButton = document.getElementById(buttonID);
        emojiButton.addEventListener("click", mouseDown);
        start++;
    }
}

// *************************************************
// variables for tracking progress/state of the game
var lastEmojiClicked = "";
var lastEmojiID = "";
var clickCounter = 0;
var completeCounter = 0;
var complete_percentage = 0;
// *************************************************

// function to execute when a button is clicked
function mouseDown(event)
{
    // get element of clicked button by ID
    const lastClickedButton = document.getElementById(this.id);
    console.log(lastClickedButton);
    
    if (clickCounter === 0) {
        console.log(`button clicked is: ${this.innerText}`);
        console.log(`button clicked ID is: ${this.id}`);
        // this is the first click, update counter by 1
        clickCounter++;
        console.log(`click conuter: ${clickCounter}`);
        lastEmojiClicked = this.innerText; // value of prev button clicked
        lastEmojiID = this.id;
        hideButtonContent(lastEmojiID);
    } else {
        // only case should be the second click
        // check for a matching pair of emojis
        if (lastEmojiClicked === this.innerText) {
            // we have a matching poir, so hide both emojis
            hideButtonContent(lastEmojiID);
            hideButtonContent(this.id); // hides the second button clicked
            updateCompleteStatus();
            reset();
            // TODO: post congratulations message
            
            if (complete_percentage === 100){
                // unhide the restart button to re-initialize the grid
                document.getElementById("restart").hidden = false;
            }

        }else {
            // we don't have a matching pair, unhide the first clicked button
            unhideLastClickedButton(lastEmojiID);
            reset();
        }

    }
}

// resets the global tracking variables
function reset() {
    lastEmojiID = "";
    clickCounter = 0;
}

// reset game to initial state
function reInitialize() {
    lastEmojiID = "";
    clickCounter = 0;
    completeCounter = 0;
    complete_percentage = 0;
    document.getElementById("scoreValue").innerText = complete_percentage.toString();
}

// only updates upon a successful match of two emojis 
function updateCompleteStatus() {
    const progressScore = document.getElementById("scoreValue");
    progressScore.innerText = calculateCompletePercentage().toString();
}

// button emoji values should be already stored in the 
// lastEmojiClicked variable
function hideButtonContent(buttonID) {
    const buttoninfo = document.getElementById(buttonID);
    buttoninfo.innerText = '';
    // TODO: Make the button unclickable (Important)

}

function calculateCompletePercentage() {
    // we only call this function upon a successful match
    // hence two emojis need to be hidden on the grid
    completeCounter += 2;
    complete_percentage = (completeCounter/16) * 100 // divide by 16 cause we have 16 emojis in total
    return complete_percentage // divide by 16 cause we have 16 emojis in total
}

function unhideLastClickedButton(buttonID) {
    // unhide the last clicked emoji since we don't have a match
    const buttoninfo = document.getElementById(buttonID);
    buttoninfo.innerText = lastEmojiClicked;
}

function restart() {
    // resets the game to its initial stage
    // re-add setup to the page only if the game is done
    // hence 100% progression or justs a hard reset....quitter
    reInitialize()
    setUp()
}

// TODO: Rewrite using React
// Should be fairly easy from here