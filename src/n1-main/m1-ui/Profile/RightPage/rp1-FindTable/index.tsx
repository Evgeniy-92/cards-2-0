import React, {ChangeEvent, useState} from 'react';
import styles from './styles.module.scss'
import {InputAdornment, TextField} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import {useDispatch} from "react-redux";
import {addCardPack, changePackName} from "../../profileReducer";
import SuperButton from "../../../common/c1-SuperButton/SuperButton";
import Modal from "../../../common/modal";


const FindTable = () => {
    const [openModal, setOpenModal] = useState(false)
    const dispatch = useDispatch()
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dispatch(changePackName(e.currentTarget.value))
    }

    const addNewPack = () => {
        dispatch(addCardPack())
    }
    return (
        <>
            <h1>Packs list</h1>
            <Modal openModal={openModal} setOpenModal={setOpenModal} setActionTC={addNewPack} type={'added'}/>
            <div className={styles.findTable}>
                <div className={styles.findInput}>
                    <TextField id="outlined-basic"
                               onChange={onChangeHandler}
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
                <SuperButton onClick={setOpenModal.bind(null,true)} className={styles.btn}>
                    Add new pack
                </SuperButton>
            </div>
        </>
    )
};

export default FindTable;
