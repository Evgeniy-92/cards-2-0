import React, {useEffect, useState} from 'react';
import styles from './TableCards.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {
    CardType,
    GetCardsType,
    setChangeSortCards
} from "../c2-bll/cardsReducer";

const header = ['Question', 'Last Update', 'Grade', 'Actions']

const TableCards = () => {
    const dispatch = useDispatch()
    const rows = useSelector<AppRootStateType, GetCardsType | null>((state) => state.cards.cards)
    const sortCards = useSelector<AppRootStateType, number>((state) => state.cards.sortByCards)
    const profileID = useSelector<AppRootStateType, string>((state) => state.login.profileData._id)
    const [nameHeader, setNameHeader] = useState('')


    useEffect(() => {
        const scrollContainer = document.querySelectorAll("#table");

        scrollContainer.forEach((el) => {
            el.addEventListener("wheel", (evt: any) => {
                evt.preventDefault();
                el.scrollLeft += evt.deltaY;
            });
        })
        return () => {
            scrollContainer.forEach((el) => {
                el.removeEventListener("wheel", (evt: any) => {
                    evt.preventDefault();
                    el.scrollLeft += evt.deltaY;
                });
            })
        }
    });


    const changeSortCards = (name: string) => {
        const nameClick = name === 'Grade' ? 'grade' : 'updated'
        if (name === 'Last Update' || name === 'Grade') {
            if (sortCards === 0) {
                dispatch(setChangeSortCards(1, nameClick))
            } else {
                dispatch(setChangeSortCards(0, nameClick))
            }
        }
        setNameHeader(name)
    }

    const changeStyleSortCard = ((nameHeader === 'Grade' && sortCards !== 0) && styles.activeGrade) || ((nameHeader === 'Last Update' && sortCards !== 0) && styles.activeUpdate)

    return (
        <table className={styles.table}>
            <thead className={styles.thead}>

            {header.map(headerGroup => (
                <tr className={`${styles.tableHeader} ${changeStyleSortCard}`}
                    key={headerGroup}
                    onClick={() => {
                        changeSortCards(headerGroup)
                    }}>
                    <th className={styles.column}>
                        {headerGroup}
                    </th>
                </tr>
            ))}
            </thead>

            <tbody className={styles.rows}>

            {rows?.cards.map((row: CardType) => {
                return (
                    <tr className={styles.rowe} key={row._id}>
                        <td className={styles.row}>

                            <span className={styles.rowItem} id={'table'}>{row.answer}</span>
                            <span className={styles.rowItem} id={'table'}>{row.updated.slice(0, 10)}</span>
                            <span className={styles.rowItem} id={'table'}> {row.grade}</span>

                            <div className={`${styles.rowItem} ${styles.btnBox}`}>
                                {profileID === row.user_id &&
                                    (<>
                                        <span className={styles.btn} data-color>Delete</span>
                                        <span className={styles.btn}>Edit</span>
                                    </>)
                                }
                            </div>

                        </td>
                    </tr>
                )
            })}

            </tbody>
        </table>
    );
};

export default TableCards;
