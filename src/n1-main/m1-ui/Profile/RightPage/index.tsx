import React from 'react';
import FindTable from "./rp1-FindTable";
import Table from "./rp2-Table";
import Paginate from "./rp3-Pagination";
import styles from './styles.module.scss'

const RightPage = () => {
    return (
        <div className={styles.main}>
            <FindTable/>
            <Table/>
            <Paginate/>
        </div>
    );
};

export default RightPage;
