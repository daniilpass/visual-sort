window.onload = () => {
    this.App = new App();
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