// import { useEffect, useState } from 'react'
import './App.css'
import Sort from './components/Sort'
import * as fn from './functions.tsx'

const GRID_SIZE = 16
const NUM_BOXES = GRID_SIZE * GRID_SIZE
// const MAX_COLOR = 16777215

// setup colors
const red = Math.floor(Math.random() * 256)
const green = Math.floor(Math.random() * 256)
const blue = 0 // Math.floor(Math.random() * (256 - (4 * NUM_BOXES)))
// const startColor = Math.floor(Math.random() * (MAX_COLOR - 10 * NUM_BOXES));

const colorArray: Color[] = Array.from ({ length: NUM_BOXES },
    (_value, index) => {
        const rgb : RGB = {R: red, G: green, B: (blue + 1 * index)};
        return ({ order: index, rgb})
    }
    // (value, index) => ({ idx: index, R: red, G: green, B: (blue + 4 * index)})
    // (value, index) => "#" + RG.toString(16) + ( 4 * index).toString(16)
);

fn.shuffleColors(colorArray)

function App() {
    return (
        <>
            <button>Start All</button>
            <div className="base-grid">
                <Sort title="Selection Sort" 
                    colorArray={[...colorArray]}
                    boxSize={15} 
                    sortFn={fn.selectionSort}
                />
            </div> 
        </>
    )
}

export default App
