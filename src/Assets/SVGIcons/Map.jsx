import * as React from "react"
const Map = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={2500}
        height={700}
        fill="none"
        {...props}
    >
        <rect width="100%" height={700} fill="url(#a)" />
        <defs>
            <pattern
                id="a"
                width={1}
                height={1}
                patternContentUnits="objectBoundingBox"
            >
                <use xlinkHref="#b" transform="matrix(.00063 0 0 .00129 0 -.013)" />
            </pattern>
            <image
                xlinkHref="https://media.istockphoto.com/id/166054643/vector/design.jpg?s=612x612&w=0&k=20&c=66UHp7THLuNk7I4BsYvPERL1rnPL6PJ_f3s9lnWnmIM="
                opacity={0.2}
                id="b"
                width={1200}
                height={1228}
            />
        </defs>
    </svg>
)
export default Map
