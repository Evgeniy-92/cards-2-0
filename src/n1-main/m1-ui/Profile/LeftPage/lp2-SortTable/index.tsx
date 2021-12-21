import React, {useState} from 'react';
import SuperDoubleRange from "../../../common/c7 -SuperDoubleRange/SuperDoubleRange";
import {useDispatch} from "react-redux";
import {setChangeSortCardsNumber} from "../../profileReducer";

const SortTable = () => {
    const dispatch = useDispatch()
    let [values, setValues] = useState<number[]>([0, 100])

    const handleChange = (newValue: number[]) => {
        setValues(newValue)
        console.log(newValue)
    }
    const handleChanges = (values: number[]) => {

        dispatch(setChangeSortCardsNumber(values[0], values[1]))
    }

    return (
        <div>
            <SuperDoubleRange
                value={values}
                onHandleChange={handleChange}
                onHandleChanges={handleChanges}
                min={1}
                max={100}
                step={1}
            />
        </div>
    );
};

export default SortTable;
