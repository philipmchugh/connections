// Array to store selected tiles
let selectedTiles = [];

// Array of correct combinations of words with their corresponding colors
const correctCombinations = [
  { combination: ['APPLE', 'BANANA', 'ORANGE', 'GRAPE'], color: '#bae1ff' },
  { combination: ['TRAIN', 'CAR', 'PLANE', 'BUS'], color: '#ffffba' },
  { combination: ['DOG', 'CAT', 'HAMSTER', 'FROG'], color: '#ffb3ba' },
  { combination: ['SUN', 'MOON', 'STAR', 'CLOUD'], color: '#efbbff' }
];

// Function to create tiles with words
function createTiles() {
  const words = [
    'APPLE', 'BANANA', 'ORANGE', 'GRAPE',
    'CAT', 'DOG', 'STAR', 'CAR',
    'TRAIN', 'FROG', 'HAMSTER', 'MOON',
    'SUN', 'BUS', 'CLOUD', 'PLANE'
  ];

  const tilesGrid = document.getElementById('tilesGrid');
  tilesGrid.innerHTML = ''; // Clear existing tiles

  words.forEach(word => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.textContent = word;

    tile.addEventListener('click', handleTileSelection); // Add click event listener to each tile

    tilesGrid.appendChild(tile);
  });

  disableSubmit(); // Initially, the "Submit" button is disabled
}

// Call the function to create tiles when the page loads
window.addEventListener('load', createTiles);

let correctCombinationsFound = 0; // Track the number of correct combinations found

let strikes = 0;
const MAX_STRIKES = 3; // Maximum allowed strikes

// Function to handle tile selection
function handleTileSelection(event) {
  const clickedTile = event.target;

  if (!clickedTile.classList.contains('selected') && selectedTiles.length < 4) {
    clickedTile.classList.add('selected');
    selectedTiles.push(clickedTile.textContent);

    // Check for correct combination when 4 tiles are selected
    if (selectedTiles.length === 4) {
        enableSubmit();
      }

  } else if (clickedTile.classList.contains('selected')) {
    clickedTile.classList.remove('selected');
    selectedTiles = selectedTiles.filter(tile => tile !== clickedTile.textContent);
    disableSubmit(); // Disable the "Submit" button if tiles are deselected
  }
}

// Function to check if the selected tiles are correct
function checkTiles(selectedTiles) {
  // Logic to check if the selected tiles are correct
  // Return true if correct, false if incorrect
}

// Function to handle strikes
function handleStrike() {
    strikes++;
    document.getElementById('strikeNumber').textContent = strikes; // Update strike count in the HTML
    console.log(`Strikes: ${strikes}`);

  if (strikes >= MAX_STRIKES) {
    // Perform action when maximum strikes reached (e.g., end game)
    console.log('Maximum strikes reached. Game over!');
  }
}

// Function to handle submit button click
document.getElementById('submitBtn').addEventListener('click', function() {
    
  });

// Function to enable the "Submit" button
function enableSubmit() {
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = false;
}

// Function to disable the "Submit" button
function disableSubmit() {
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
}

// Function to display a message
function displayMessage(message) {
    const messageDiv = document.querySelector('.message');
    messageDiv.textContent = message;
  }

// Function to check if the selected tiles match any of the correct combinations
function checkCorrectCombination() {
    let isCorrect = false;
  
    correctCombinations.forEach(combinationObj => {
      const sortedSelectedTiles = [...selectedTiles].sort();
      const sortedCorrectCombination = [...combinationObj.combination].sort();
  
      if (
        JSON.stringify(sortedSelectedTiles) === JSON.stringify(sortedCorrectCombination) &&
        correctCombinationsFound < 4 // Limit to 4 correct combinations
      ) {
        isCorrect = true;
        highlightCorrectTiles(combinationObj.color);
        correctCombinationsFound++;
        selectedTiles = []; // Clear selected tiles after a correct combination is found
        disableSubmit(); // Disable the "Submit" button after a correct combination
      }
    });
    const messageDiv = document.querySelector('.message');
    if(!isCorrect&& selectedTiles.length === 4) {
      displayMessage('Nope, sorry!'); // Display message for wrong combination
      setTimeout(function() {
        messageDiv.textContent = ''; // Clear message after 2 seconds
        strikes++; // Increment strike count after message disappears
        document.getElementById('strikeNumber').textContent = strikes; // Update strike count in the HTML
        console.log(`Strikes: ${strikes}`);
  
        if (strikes >= MAX_STRIKES) {
          console.log('Maximum strikes reached. Game over!');
          // Perform action when maximum strikes reached (e.g., end game)
        }
      }, 1000);
    }
    if (!isCorrect && selectedTiles.length === 4) {
      clearSelection();
    }
  
    if (!isCorrect || correctCombinationsFound < 4) {
      enableSubmit(); // Re-enable the "Submit" button if the combination is not correct or not reached the limit
    }
  }
  

// Function to highlight correct tiles with a specified color
function highlightCorrectTiles(color) {
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => {
    if (selectedTiles.includes(tile.textContent)) {
      tile.style.backgroundColor = color;
      tile.classList.add('correct');
      tile.classList.remove('selected'); // Remove the 'selected' class for highlighted tiles
    }
  });
}

// Event listener for the "Submit" button
const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', () => {
  checkCorrectCombination();
});


