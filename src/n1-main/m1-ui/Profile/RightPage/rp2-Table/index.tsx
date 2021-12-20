import React from 'react';
import styles from './styles.module.scss'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/store";
import {CardType} from "../../profileReducer";

const header = ['Name', 'Cards', 'Last Update', 'Created by', 'Actions']

const Table = () => {
    // @ts-ignore
    const rows = useSelector<AppRootStateType, CardType[]>((state) => state.profile.cards)
    console.log(rows)

    return (
        <table className={styles.table}>

            <thead className={styles.thead}>
            {header.map(headerGroup => (
                <tr className={styles.tableHeader} key={headerGroup}>
                    <th className={styles.column}>
                        {headerGroup}
                    </th>
                </tr>
            ))}
            </thead>

            <tbody className={styles.rows}>
            {rows.map(row => {
                return (
                    <tr className={styles.rowe} key={row._id}>
                        <td
                            className={styles.row}
                        >
                            <span className={styles.rowItem}>{row.name}</span>
                            <span className={styles.rowItem}>{row.cardsCount}</span>
                            <span className={styles.rowItem}>{row.updated.slice(0, 10)}</span>
                            <span className={styles.rowItem}> {row.user_name}</span>
                            <div className={`${styles.rowItem} ${styles.btnBox}`}>
                                <span className={styles.btn}>Delete</span>
                                <span className={styles.btn}>Edit</span>
                                <span className={styles.btn}>Learn</span>
                            </div>
                        </td>
                    </tr>
                )
            })}
            </tbody>

        </table>
    );
};

export default Table;
