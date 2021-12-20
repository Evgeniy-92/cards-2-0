import React from 'react';
import User from "./lp1-User";
import SortTable from "./lp2-SortTable";
import styles from './styles.module.scss'

const LeftPage = () => {
    return (
        <div className={styles.main}>
            <User/>
            <SortTable/>
        </div>
    );
};

export default LeftPage;
