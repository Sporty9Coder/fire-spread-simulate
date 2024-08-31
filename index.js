const gridOverlay = document.getElementById('grid-overlay');
const loadingIndicator = document.getElementById('loading-indicator');
let arrayCollection = []; // To store the array of 2D arrays from the JSON file
let currentArrayIndex = 0; // To track which array to use next
let intervalId = null; // To keep track of the interval

window.addEventListener('DOMContentLoaded', () => {
    // Create the grid when the page loads
    for (let i = 0; i < 50 * 50; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.dataset.index = i;
        gridOverlay.appendChild(cell);
    }

     // Show the loading indicator
     loadingIndicator.style.display = 'block';

    // Fetch the JSON file and load the 2D arrays into arrayCollection
    var url = '';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            arrayCollection = data; // Assuming data is an array of 2D arrays
             // Hide the loading indicator once data is received
            loadingIndicator.style.display = 'none';
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
            // Hide the loading indicator if an error occurs
            loadingIndicator.style.display = 'none';
        });
});

gridOverlay.addEventListener('click', (e) => {
    if (e.target.classList.contains('grid-cell') && arrayCollection.length > 0) {
        console.log('start simulation');
        // const index = parseInt(e.target.dataset.index);
        // const rowIndex = Math.floor(index / 50); // Adjust 50 based on your grid size
        // const colIndex = index % 50;

        // // Set the starting point (if needed for any other logic)
        // startingPoint = { row: rowIndex, col: colIndex };

        // If an interval is already running, clear it
        if (intervalId) {
            clearInterval(intervalId);
        }

        // Start the fire spread
        intervalId = setInterval(() => {
            console.log('fire spreading');
            if (currentArrayIndex < arrayCollection.length) {
                const currentArray = arrayCollection[currentArrayIndex];
                updateGrid(currentArray);
                currentArrayIndex++; // Move to the next array for the next update
            } else {
                clearInterval(intervalId); // Stop the interval when arrays are exhausted
            }
        }, 1000); // Update every second
    }
});

function updateGrid(array2D) {
    array2D.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            const index = rowIndex * 50 + colIndex; // Assuming a 50x50 grid
            const cell = document.querySelector(`.grid-cell[data-index="${index}"]`);
            const currentColor = cell.style.backgroundColor;

            if (value === 1 && currentColor !== '#880808') {
                cell.style.backgroundColor = '#880808';
            } else if (value === 2 && currentColor !== '#880808') {
                cell.style.backgroundColor = '#FFAA33';
            } else if (value === 0 && (currentColor !== '#880808' && currentColor !== '#FFAA33')) {
                cell.style.backgroundColor = 'transparent';
            }
        });
    });
}
