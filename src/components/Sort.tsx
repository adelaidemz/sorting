import { useState, useEffect } from 'react';
import Box from './Box'
import { shuffleColors } from '../functions';
import { VStack, Button, Tooltip, SimpleGrid, Flex, Heading } from '@chakra-ui/react'

interface SortProps {
    title: string;
    boxSize: number;
    arrayData: Color[];
    sortFn: (array: Color[], outerLoop: number) => Color[];
    status: STATUS;
    onStatusChange: (status: STATUS) => void;
    description: string;
}

export default function Sort({ title, arrayData, boxSize, sortFn, status, onStatusChange, description }: SortProps) {
    const [outerLoop, setOuterLoop] = useState(0);
    const [colorArray, setColorArray] = useState(arrayData);
  
    useEffect(() => {
        let id = 0;
        switch (status){
            case "started":
                id = window.setInterval( () => {
                    // sort inner loop
                    setColorArray(sortFn(colorArray.slice(), outerLoop));
                    setOuterLoop(outerLoop + 1);
            
                    if (outerLoop >= colorArray.length - 2) {
                        onStatusChange("finished");
                        // setOuterLoop(0);
                    }
                }, 25);
                break;
            case "paused":
            case "finished":
                clearInterval(id);
                break;
        }
        return () => {
            clearInterval(id);
          };
    }, [status, outerLoop, colorArray]);

    return (
        <VStack spacing={6}>
            <Flex gap={2}>
                <Heading fontSize="2xl">{title}</Heading>
                <Tooltip hasArrow 
                    label={description} 
                    bg='gray.300' 
                    color='black'
                    placement='right'>
                <img 
                    src="/sorting/info.svg" 
                    width={20}
                />
                </Tooltip>
            </Flex>
            
            {/* <div className="sort-grid"> */}
            <SimpleGrid columns={16} spacing='3px'>
                {colorArray.map((color) => (
                    <div className="grid-item" key={color.order}>
                        <Box hue={color.rgb} boxSize={boxSize}/>
                    </div>
                ))}
            </SimpleGrid>
            {/* </div> */}

            <div className="card">
                <Button onClick={() => {
                    if (status === "finished") {
                        setOuterLoop(0);
                        shuffleColors(colorArray);
                        onStatusChange("default");
                    }
                    else {
                        onStatusChange(status === "started" ? "paused" : "started")
                    }
                }}>
                    {status === "finished" ? "Shuffle"
                        : status === "started" ? "Stop"
                        : "Start"}
                </Button>
                {/* <p>{outerLoop}</p> */}
            </div>
        </VStack>
    )
}