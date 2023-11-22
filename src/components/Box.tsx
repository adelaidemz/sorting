type HexColor = `#${string}`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type RGB = {R: number, G: number, B: number};

interface BoxProps {
    // R: number,
    // G: number,
    // B: number,
    hue: RGB
}
export function Box({ hue }: BoxProps) {
    const styles = {
        background: `rgb(${hue.R}, ${hue.G}, ${hue.B})`,
        height: "20px",
        width: "20px"
    }

    return (
       <div style={styles}></div>
    );
}