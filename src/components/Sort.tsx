import { useState, useEffect } from 'react';
import Box from './Box'
import { shuffleColors } from '../functions';

const STATUS = {
    default: 0,
    started: 1,
    paused: 2,
    finished: 3,
}

interface SortProps {
    title: string;
    boxSize: number;
    colorArray: Color[];
    sortFn: (array: Color[], outerLoop: number) => number;
}

export default function Sort({ title, colorArray, boxSize, sortFn }: SortProps) {
    // setup animation 
    const [status, setStatus] = useState(STATUS.default);
    const [outerLoop, setOuterLoop] = useState(0);

    useEffect(() => {
        let id = 0;
        switch (status){
            case STATUS.started:
                id = setInterval( () => {
                    // sort inner loop
                    setOuterLoop(sortFn(colorArray, outerLoop));
            
                    if (outerLoop >= colorArray.length - 1) {
                        setStatus(STATUS.finished);
                    }
                }, 1);
                break;
            case STATUS.paused:
            case STATUS.finished:
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
                <p>{outerLoop}</p>
            </div>
        </div>
    )
}