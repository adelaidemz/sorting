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
    
    return (outerLoop + 1);
}
