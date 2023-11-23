import { useState } from 'react'
import './App.css'
import Sort from './components/Sort'
import * as fn from './functions.tsx'

type Algorithm = {
    name: string,
    status: STATUS,
    function: (array: Color[], outerLoop: number) => Color[];
};

const GRID_SIZE = 16
const NUM_BOXES = GRID_SIZE * GRID_SIZE
// const MAX_COLOR = 16777215

// setup initial colors
const red = Math.floor(Math.random() * 256)
const green = 255 //Math.floor(Math.random() * 256)
const blue = 0 // Math.floor(Math.random() * (256 - (4 * NUM_BOXES)))
// const startColor = Math.floor(Math.random() * (MAX_COLOR - 10 * NUM_BOXES));

const colorArray: Color[] = Array.from ({ length: NUM_BOXES },
    (_value, index) => {
        const rgb : RGB = {R: red, G: (green - index), B: (blue + 1 * index)};
        return ({ order: index, rgb})
    }
    // (value, index) => ({ idx: index, R: red, G: green, B: (blue + 4 * index)})
    // (value, index) => "#" + RG.toString(16) + ( 4 * index).toString(16)
);

fn.shuffleColors(colorArray)

const algorithms: Algorithm[] = [
    { 
        name: "Selection Sort", 
        status: "default",
        function: fn.selectionSort 
    } as Algorithm,
    { 
        name: "Insertion Sort", 
        status: "default",
        function: fn.insertionSort 
    } as Algorithm ]
    
function App() {
    const [statuses, setStatus] = useState<STATUS[]>(Array(algorithms.length - 1).fill("default"));
    
    return (
        <>
            <button  
                title="Start all algorithms"
                onClick={() => setStatus(statuses.map(() => "started"))
            }>
                Start All
            </button>

            <div className="base-grid">
                {algorithms.map((a, index) => (
                    <Sort title={ a.name }
                        key={ index }
                        boxSize={ 15 }
                        arrayData={ colorArray }
                        sortFn={ algorithms[index].function }
                        status={ statuses[index] }
                        onStatusChange={ (status) => {
                            const newStatus = statuses.slice();
                            newStatus[index] = status;
                            setStatus(newStatus);
                        }}
                    />
                ))}
            </div> 
        </>
    )
}

export default App
