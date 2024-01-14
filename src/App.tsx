import { useState } from 'react'
// import './App.css'
import Sort from './components/Sort'
import * as fn from './functions.tsx'
import { VStack, Button, SimpleGrid } from '@chakra-ui/react'

type Algorithm = {
    name: string,
    function: (array: Color[], outerLoop: number) => Color[];
    description: string;
};

const NUM_BOXES = 16;
const colorArray: Color[] = fn.setupColors(NUM_BOXES);

const algorithms: Algorithm[] = [
    { 
        name: "Selection Sort", 
        function: fn.selectionSort,
        description: "Selection sort"
    } as Algorithm,
    { 
        name: "Insertion Sort", 
        function: fn.insertionSort,
        description: "Insertion sort"
    } as Algorithm,
    { 
        name: "Bubble Sort", 
        function: fn.bubbleSort,
        description: "Bubble sort"
    } as Algorithm,
 ]

    
function App() {
    const [statuses, setStatus] = useState<STATUS[]>(Array(algorithms.length).fill("default"));
    
    return (
        <VStack h="100%" w="100%" alignItems="center" justifyContent={"center"} spacing={4}>
            <p>This is a quick visualization of a few iterative sorting methods.</p>
            <p>Note: each step takes a fixed amount of time for visibility, so the algorithms' actual runtimes are not accounted for. </p>
                {/* <button onClick={() => console.log(statuses)}>Print Statuses</button> */}
            <Button  
                title="Start all algorithms"
                colorScheme='gray'
                onClick={() => {
                    const newState = statuses.filter((i) => i=="started").length == statuses.length 
                        ? "paused" : "started";
                    setStatus(statuses.map(() => newState))
                } 
            }>
            {statuses.filter((i) => i=="started").length == statuses.length 
                ? "Stop All" : "Start All"}
            </Button>

            <SimpleGrid columns={3} spacingX='50px' spacingY='50px'>
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
                        description={ algorithms[index].description }
                    />
                ))}
            </SimpleGrid> 
        </VStack>
    )}

export default App
