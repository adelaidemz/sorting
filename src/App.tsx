import { useState } from 'react'
import './App.css'
import Sort from './components/Sort'
import * as fn from './functions.tsx'

type Algorithm = {
    name: string,
    function: (array: Color[], outerLoop: number) => Color[];
};

const NUM_BOXES = 16;
const colorArray: Color[] = fn.setupColors(NUM_BOXES);

const algorithms: Algorithm[] = [
    { 
        name: "Selection Sort", 
        function: fn.selectionSort
    } as Algorithm,
    { 
        name: "Insertion Sort", 
        function: fn.insertionSort 
    } as Algorithm,
    { 
        name: "Bubble Sort", 
        function: fn.bubbleSort
    } as Algorithm,
 ]

    
function App() {
    const [statuses, setStatus] = useState<STATUS[]>(Array(algorithms.length).fill("default"));
    
    return (
        <>
        <p>This is a quick visualizion of a few iterative sorting methods.</p>
        <p>Note: each step takes a fixed amount of time for visibility, so the algorithms' actual runtimes are not accounted for. </p>
            {/* <button onClick={() => console.log(statuses)}>Print Statuses</button> */}
            <button  
                title="Start all algorithms"
                onClick={() => {
                    const newState = statuses.filter((i) => i=="started").length == statuses.length 
                        ? "paused" : "started";
                    setStatus(statuses.map(() => newState))
                } 
            }>
                {statuses.filter((i) => i=="started").length == statuses.length 
                    ? "Stop All" : "Start All"}
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
                            // console.log(index, statuses)
                        }}
                    />
                ))}
            </div> 
        </>
    )}

export default App
