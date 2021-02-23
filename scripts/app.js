let containerNode;

let arrayItemWidth = 10;
let arrayItemPadding = 5;


let array = []
let arrayCopy = [];

let colors = {
    default: "#2d2de6",
    current: "#2de66e",
    next: "#2d91e6",
    border: "#1212b1"
}

let highlightTimeout = 1000/40;
//let transitionTimeout = 2000;

getContainer = () => {
    return document.getElementById("array-container");
} 

initArray = (size) => {
    array = [];
    for (let index = 0; index < size; index++) {        
        let value = Math.ceil(Math.random() * 100) + 1;  
        let item = createDomItem(value, arrayItemWidth);
        array[index] = {};
        array[index].value = value;
        array[index].node  = item;
    }    
}

saveArrayCopy = () => {
    arrayCopy=[];
    for (let i = 0; i < array.length; i++) {
        arrayCopy[i] = {
            value: array[i].value,
            node: array[i].node,
        };
    }
}

restoreArrayFromCopy = () => {
    array= [];
    for (let i = 0; i < arrayCopy.length; i++) {
        array[i] = {
            value: arrayCopy[i].value,
            node: arrayCopy[i].node,
        };
    }
}

createDomItem = (height, width) => {
    let item = document.createElement("div");
    item.classList.add("array-item");
    item.style.height = height + "px";
    return item;
}

drawArrayItems = () => {
    containerNode.innerHTML = '';
    for (let index = 0; index < array.length; index++) {
        item = array[index].node
        let left =  index * (arrayItemWidth + arrayItemPadding);
        item.style.left = left + "px";
        containerNode.appendChild(item);  
    } 
}

redrawArrayItems = () => {
    for (let index = 0; index < array.length; index++) {
        item = array[index].node
        let left =  index * (arrayItemWidth + arrayItemPadding);
        item.style.left = left + "px";
    } 
}

setItemColor = (index, color) =>{
    array[index].node.style.background = color;
}

async function highlightItems(i1, i2, i3) {
    setItemColor(i1, colors.current);
    setItemColor(i2, colors.next);
    i3 && setItemColor(i3, colors.border);

    await new Promise(r => setTimeout(r, highlightTimeout));

    setItemColor(i1, colors.default);
    setItemColor(i2, colors.default);
    i3 && setItemColor(i3, colors.default);
}

//todo stops here
function setOpacity(visibleStart, visibleEnd) {
    setItemColor(i1, colors.current);
    setItemColor(i2, colors.next);
    i3 && setItemColor(i3, colors.border);

    await new Promise(r => setTimeout(r, highlightTimeout));

    setItemColor(i1, colors.default);
    setItemColor(i2, colors.default);
    i3 && setItemColor(i3, colors.default);
}

windowLoaded = () => {
    console.log("windowLoaded");

    // get array conteiner
    containerNode = getContainer();

    // initial arrays
    initArray(50);  
    saveArrayCopy();

    // create items
    drawArrayItems();
}


//
// Sortings
//

//Bubble
async function doBubbleSort(highlightItems, redraw) {
    for (let i = 0; i < array.length; i++) {
        for (let k = 0; k < array.length - i - 1; k++) {
            await highlightItems(k, k + 1);

            if (array[k].value > array[k + 1].value) {
                let tmp = array[k];
                array[k] = array[k + 1];
                array[k + 1] = tmp;
                redraw();
            }
        }          
    }

    // final draw
    redraw();
}


//Quick sort
let exitStep = 0;
async function doQuickSort(arr, low, high, highlightItems, redraw) {
    exitStep++;
    if (exitStep > 100) {
        console.log("PLS STOOOOP")
        return;
    }
    if (low < high) {
        let p = await partition(arr, low, high, highlightItems, redraw);
        //console.log(p);
        await doQuickSort(arr, low, p - 1, highlightItems, redraw);
        await doQuickSort(arr, p + 1, high, highlightItems, redraw);
    }
}

async function partition(arr, low, high, highlightItems, redraw) {
    let pivot = arr[high].value;
    let i = low;
    try {    
      for (let j = low; j <= high - 1; j++) {
          await highlightItems(i, j, high);
          if (arr[j].value <= pivot) {
              await swap(arr, i, j, highlightItems, redraw);
              i = i + 1;
          }          
      }
      await highlightItems(i, high);
      await swap(arr, i, high, highlightItems, redraw);
      return i;
    } catch (error) {
        console.log("ERROR", {arr, low, high, exitStep});
        throw error;
    }
}

async function swap(arr, i1, i2, highlightItems, redraw) {
    //console.log("swap", i1, i2)   
    let tmp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = tmp;
    redraw();
}

window.onload = windowLoaded;

function checkResult(arr) {
    let good = true;
    for (let i = 0; i < arr.length - 2; i++) {        
        if (arr[i+1].value < arr[i].value) {
            good = false;
            
        }
    }
    if (good) {
        console.log("CORRECT RESULT");
    } else {
        console.log("WRONG RESULT");
    }
   
}
// document.onclick = () => {
//     console.log("document click")
//     //setItemColor(1, "red");
//     doBubbleSort(highlightItems, redrawArrayItems);
// }

async function handleBubbleSortClick() {
    let start = Date.now();
    await doBubbleSort(highlightItems, redrawArrayItems);
    checkResult(array);
    console.log("Time elapsed", Date.now() - start );
}

async function handleQuickSortClick() {
    exitStep = 0;
    let start = Date.now();
    await doQuickSort(array, 0, array.length - 1, highlightItems, redrawArrayItems);
    checkResult(array);
    console.log("Time elapsed", Date.now() - start );
}

function handleRandomizeClick() {
    initArray(50);
    saveArrayCopy();
    drawArrayItems();
}

function handleUndoSortingClick() {
    restoreArrayFromCopy();
    drawArrayItems();
}