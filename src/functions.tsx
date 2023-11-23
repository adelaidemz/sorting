//// COLORS
export function shuffleColors(array : Color[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

class ColorChange {
    value: number;
    increment: boolean;

    constructor(value: number, increment: boolean) {
        this.value = value;
        this.increment = increment;
      }

    changeValue() {
        if (this.value === 255) this.increment = false;
        if (this.value === 0) this.increment = true;

        if (this.increment) this.value ++
        else this.value --
    }
}

// setup initial colors
export function setupColors(gridSize: number) {
    const numBoxes = gridSize * gridSize

    const red: ColorChange = new ColorChange( Math.floor(Math.random() * 255), true)
    const green: ColorChange = new ColorChange( Math.floor(Math.random() * 255), false)
    const blue: ColorChange = new ColorChange( Math.floor(Math.random() * 255), true)
    // const green =  Math.floor(Math.random() * 256)
    // const blue = 255 // Math.floor(Math.random() * (256 - (4 * NUM_BOXES)))

    const colorArray: Color[] = Array.from ({ length: numBoxes },
        (_value, index) => {
            // red.changeValue();
            green.changeValue();
            blue.changeValue();
            const rgb : RGB = {
                R: red.value, 
                G: green.value,  
                B: blue.value, 
            }
            return ({ order: index, rgb})
        }
    );

    shuffleColors(colorArray);

    return colorArray;
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

export function bubbleSort(colorArray: Color[], outerLoop: number) {
    // let swapped = false

    for (let j = 0; j < colorArray.length-1-outerLoop; j++) {
        // swap with neighbor if wrong order
        if (colorArray[j].order > colorArray[j+1].order) {
            [colorArray[j], colorArray[j+1]] = [colorArray[j+1], colorArray[j]];
            // swapped = true;
        }
    }
    // should break out of outer loop if no swaps made
    // if (!swapped)
    //     console.log("swapped")

    return colorArray;
}
