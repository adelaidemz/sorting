import { useState, useEffect } from 'react';
import Box from './Box'
import { shuffleColors } from '../functions';

interface SortProps {
    title: string;
    boxSize: number;
    arrayData: Color[];
    sortFn: (array: Color[], outerLoop: number) => Color[];
    status: STATUS;
    onStatusChange: (status: STATUS) => void;
}

export default function Sort({ title, arrayData, boxSize, sortFn, status, onStatusChange }: SortProps) {
    const [outerLoop, setOuterLoop] = useState(0);
    const [colorArray, setColorArray] = useState(arrayData);
  
    useEffect(() => {
        let id = 0;
        switch (status){
            case "started":
                id = setInterval( () => {
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
        <div>
            <h2>{title}</h2>

            <div className="sort-grid">
                {colorArray.map((color) => (
                    <div className="grid-item" key={color.order}>
                        <Box hue={color.rgb} boxSize={boxSize}/>
                    </div>
                ))}
            </div>

            <div className="card">
                <button onClick={() => {
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
                </button>
                <p>{outerLoop}</p>
            </div>
        </div>
    )
}