//App vars
let app;

//UI vars
let btnRandomize;
let btnUndoSorting;
let btnBubbleSort;
let btnQuickSort;
let btnStop;
let btnInsertionSort;

//Entry point
window.onload = () => {
    //Init UI
    btnRandomize = document.getElementById("btnRandomize");
    btnUndoSorting = document.getElementById("btnUndoSorting");
    btnBubbleSort = document.getElementById("btnBubbleSort");
    btnQuickSort = document.getElementById("btnQuickSort");
    btnInsertionSort = document.getElementById("btnInsertionSort");
    btnStop = document.getElementById("btnStop");

    // Init app
    let containerNode = document.getElementById("array-container");
    app = new App(containerNode);
    app.randomize();
    
};

//
//UI events
//
function handleRandomizeClick() {
    app.randomize();
}

function handleUndoSortingClick() {
    app.undoSorting();
}

function handleStopClick() {
    app.stopSorting();
}

async function handleBubbleSortClick() {
    sortingStarts();
    await app.bubbleSort();
    sortingEnds();
}

async function handleQuickSortClick() {
    sortingStarts();
    await app.quickSort();
    sortingEnds();
}


async function  handleInsertionSortClick() {
    sortingStarts();
    await app.insertionSort();
    sortingEnds();
}

//
//UI logic
//
sortingStarts = () => {
    btnRandomize.disabled = true;
    btnUndoSorting.disabled = true;
    btnBubbleSort.disabled = true;
    btnQuickSort.disabled = true;
    btnInsertionSort.disabled = true;
    btnStop.disabled = false;
}

sortingEnds = () => {
    btnRandomize.disabled = false;
    btnUndoSorting.disabled = false;
    btnBubbleSort.disabled = false;
    btnQuickSort.disabled = false;
    btnInsertionSort.disabled = false;
    btnStop.disabled = true;
}