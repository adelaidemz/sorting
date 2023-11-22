interface BoxProps {
    hue: RGB,
    boxSize: number
}
export default function Box({ hue, boxSize }: BoxProps) {
    const styles = {
        background: `rgb(${hue.R}, ${hue.G}, ${hue.B})`,
        height: `${boxSize}px`,
        width: `${boxSize}px`
    }

    return (
       <div style={styles}></div>
    );
}