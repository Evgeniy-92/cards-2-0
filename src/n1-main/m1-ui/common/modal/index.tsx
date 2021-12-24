import React, {useState} from 'react';
import styles from './styles.module.scss'
import ContainerAuth from '../c4-containerAuth';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button';

export type ModalTypeAction = 'added' | 'delete' | 'edit' | ''

type ModalType = {
    openModal?: boolean;
    setOpenModal?: (bool: boolean) => void;
    setActionTC?: (value?: string) => void;
    type: ModalTypeAction
}

const Modal = ({openModal, setOpenModal, setActionTC, type}: ModalType) => {
    const [value, setValue] = useState()
    const targetContainerExit = (e: any) => {
        if (e.target.closest('#modal') !== null) return
        //@ts-ignore
        setOpenModal(false)
    }
    const title = (type === 'added' && ' In this page yo can create a new packs list for study all people.') ||
        (type === 'delete' && 'Are you sure?') || (type === 'edit' && 'Set a new name card')

    return (
        <ContainerAuth className={`${!openModal && styles.hidden} ${styles.box}`} onClick={targetContainerExit}>
            <div className={styles.modal} id={'modal'}>
                <div>
                    <p className={styles.p}>
                        {title}
                    </p>
                </div>

                {
                    (type === 'edit' || type === 'added') &&
                    <TextField variant={'outlined'} label={'Name pack'} style={{width: '100%'}}
                               onChange={(e: any) => setValue(e.currentTarget.value)}/>
                }

                <div className={styles.btn}>
                    <Button variant="contained" onClick={setActionTC?.bind(null, value)}>Confirm</Button>
                    <Button onClick={() =>   //@ts-ignore
                        setOpenModal(false)} variant="outlined">Exit</Button>
                </div>
            </div>
        </ContainerAuth>
    );
}
// color="success"
// color="error"
export default Modal
