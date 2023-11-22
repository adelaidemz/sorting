import { useEffect, useState } from 'react'
import './App.css'
import { Box, RGB } from './components/Box'

const STATUS = {
    default: 0,
    started: 1,
    paused: 2,
    finished: 3,
}

const GRID_SIZE = 16
const NUM_BOXES = GRID_SIZE * GRID_SIZE
// const MAX_COLOR = 16777215

// setup colors
const red = Math.floor(Math.random() * 256)
const green = Math.floor(Math.random() * 256)
const blue = 0 // Math.floor(Math.random() * (256 - (4 * NUM_BOXES)))
// const startColor = Math.floor(Math.random() * (MAX_COLOR - 10 * NUM_BOXES));

const colorArray = Array.from ({ length: NUM_BOXES },
        (_value, index) => {
            const rgb : RGB = {R: red, G: green, B: (blue + 1 * index)};
            return ({ order: index, rgb})
        }
        // (value, index) => ({ idx: index, R: red, G: green, B: (blue + 4 * index)})
        // (value, index) => "#" + RG.toString(16) + ( 4 * index).toString(16)
    );

function shuffleColors(array : {order: number, rgb: RGB}[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleColors(colorArray)

function App() {
    // setup animation 
    const [status, setStatus] = useState(STATUS.default);
    const [outerLoop, setOuterLoop] = useState(0);
    // const [intervalID, setIntervalID] = useState(0);

    useEffect(() => {
        let id = 0;
        switch (status){
            case STATUS.started:
                id = setInterval( () => {
                    // sort inner loop
                    let smallest = outerLoop; // index of current smallest ordered Box
                    for (let j = outerLoop + 1; j < NUM_BOXES; j++) {
                        if (colorArray[j].order < colorArray[smallest].order) {
                            smallest = j;
                        }
                    }
            
                    if (smallest != outerLoop) {
                        [colorArray[outerLoop], colorArray[smallest]] = [colorArray[smallest], colorArray[outerLoop]];
                    }
                    
                    setOuterLoop(outerLoop => outerLoop + 1);
            
                    if (outerLoop >= NUM_BOXES) {
                        setStatus(STATUS.finished);
                    }
                }, 50);
                break;
            case STATUS.paused:
            case STATUS.finished:
                clearInterval(id);
                break;
        }
        return () => {
            clearInterval(id);
          };
    }, [status, outerLoop]);

    return (
        <>
            <button>{outerLoop}</button>
            <h2>Selection Sort</h2>

            <div className="grid-container">
                {colorArray.map((color) => (
                    <div className="grid-item" key={color.order}>
                        <Box hue={color.rgb}/>
                    </div>
                ))}
            </div>

            <div className="card">
                <button onClick={() => {
                    if (status === STATUS.finished) {
                        setOuterLoop(0);
                        shuffleColors(colorArray);
                        setStatus(STATUS.default);
                    }
                    else {
                        setStatus(status === STATUS.started ? STATUS.paused : STATUS.started)
                    }
                }}>
                    {status === STATUS.finished ? "Shuffle"
                        : status === STATUS.started ? "Stop"
                        : "Start"}
                </button>
            </div>
        </>
    )
}

export default App
