import React, {ChangeEvent} from 'react';
import styles from './styles.module.scss'
import {InputAdornment, TextField} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import SuperButton from "../../../common/c1-SuperButton/SuperButton";

type FindTableType = {
    namePage: string | undefined
    nameBtn: string
    addElement: () => void
    changeName: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}

    const FindTable = (props: FindTableType) => {

    return (
        <>
            <h1>{props.namePage}</h1>
            <div className={styles.findTable}>
                <div className={styles.findInput}>
                    <TextField id="outlined-basic"
                               onChange={props.changeName}
                               style={{backgroundColor: '#ececf9'}}
                               size="small"
                               variant="outlined"
                               fullWidth
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <SearchIcon color="action"/>
                                       </InputAdornment>
                                   ),
                               }}/>
                </div>
                <SuperButton onClick={props.addElement} className={styles.btn}>
                    {props.nameBtn}
                </SuperButton>
            </div>
        </>
    )
};

export default FindTable;
