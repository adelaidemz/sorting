//// COLORS
export function shuffleColors(array : Color[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


//// SORTING

export function selectionSort(colorArray: Color[], outerLoop: number) {
    let smallest = outerLoop; // index of current smallest ordered Box

    for (let j = outerLoop + 1; j < colorArray.length; j++) {
        if (colorArray[j].order < colorArray[smallest].order) {
            smallest = j;
        }
    }

    if (smallest != outerLoop) {
        [colorArray[outerLoop], colorArray[smallest]] = [colorArray[smallest], colorArray[outerLoop]];
    }
    
    return colorArray; // (outerLoop + 1);
}

export function insertionSort(colorArray: Color[], outerLoop: number) {
    const key = colorArray[outerLoop];

    let i = outerLoop - 1;
    while (i >= 0 && colorArray[i].order > key.order) {
        colorArray[i + 1] = colorArray[i];
        i--;
    }
    colorArray[i + 1] = key;
    
    return colorArray; // outerLoop + 1; //[outerLoop + 1, colorArray];
}

