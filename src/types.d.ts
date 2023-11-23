declare type STATUS = "default" | "started" | "paused" | "finished";

// enum STATUS {
//     default,
//     started,
//     paused,
//     finished,
// }

declare type RGB = {
    R: number, 
    G: number, 
    B: number
};

declare type Color = {
    order: number,
    rgb: RGB
};

// type HexColor = `#${string}`;
// type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;