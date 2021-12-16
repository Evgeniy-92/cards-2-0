import React, { ChangeEvent, useState } from 'react';
import styles from "./style.module.scss";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <input className={styles.changeName} value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
        : <h1 className={styles.glitch } data-text={props.value} onDoubleClick={activateEditMode}>{props.value}</h1>
});

/*
center__text glitch is-glitching*/
