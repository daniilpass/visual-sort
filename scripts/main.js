window.onload = () => {
    let containerNode = document.getElementById("array-container");
    this.App = new App(containerNode);
    this.App.randomize();
};

async function handleBubbleSortClick() {
    this.App.bubbleSort();
}

async function handleQuickSortClick() {
    this.App.quickSort();
}

function handleRandomizeClick() {
    this.App.randomize();
}

function handleUndoSortingClick() {
    this.App.undoSorting();
}

function handleStopClick() {
    this.App.stopSorting();
}