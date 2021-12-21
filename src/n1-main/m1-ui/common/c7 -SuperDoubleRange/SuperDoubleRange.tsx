import React, {ChangeEvent} from 'react'
import {Slider} from "@material-ui/core";

type SuperDoubleRangePropsType = {
    onHandleChange?: (newValue: number[]) => void
    onHandleChanges?: (newValues: number[]) => void
    value?: number[]
    min: number
    max: number
    step: number | null
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onHandleChange, value,
        min, max, step,
        onHandleChanges
    }
) => {

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
        onHandleChange && onHandleChange(newValue as [number, number])
    };
    const handleChanges = (event: React.ChangeEvent<{}>, newValues: number | number[]) => {
        onHandleChanges && onHandleChanges(newValues as [number, number])
    };

    return (
        <div style={{width: '300px', display: 'inline-block',}}>

            <Slider
                value={value}
                onChange={handleChange}
                onChangeCommitted={handleChanges}
                aria-labelledby="range-slider"
                min={min}
                max={max}
                step={step}
            />
        </div>
    )
}

export default SuperDoubleRange
