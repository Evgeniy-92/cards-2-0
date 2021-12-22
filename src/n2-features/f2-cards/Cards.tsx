import React, {useEffect, useState} from 'react';
import styles from './Cards.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/m2-bll/store";
import {
    CardType,
    GetCardsType,
    setChangeSortCards
} from "../../n1-main/m1-ui/Profile/profileReducer";
import {getCards} from "./cardsReducer";
import {useParams} from "react-router-dom";

const header = ['Name', 'Cards', 'Last Update', 'Created by', 'Actions']

const Cards = () => {
    const dispatch = useDispatch()
    const rows = useSelector<AppRootStateType, GetCardsType | null>((state) => state.profile.cards)
    const sortCards = useSelector<AppRootStateType, number>((state) => state.profile.sortByCards)
    const profileID = useSelector<AppRootStateType, string>((state) => state.login.profileData._id)
    const [nameHeader, setNameHeader] = useState('')

    const {id} = useParams<string>()
    useEffect(() => {
        dispatch(getCards(id))
    }, [])

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
        const nameClick = name === 'Cards' ? 'cardsCount' : 'updated'
        if (name === 'Cards' || name === 'Last Update') {
            if (sortCards === 0) {
                dispatch(setChangeSortCards(1, nameClick))
            } else {
                dispatch(setChangeSortCards(0, nameClick))
            }
        }
        setNameHeader(name)
    }

    const changeStyleSortCard = ((nameHeader === 'Cards' && sortCards !== 0) && styles.activeCards) || ((nameHeader === 'Last Update' && sortCards !== 0) && styles.activeUpdate)

    return (
        <table className={styles.table}>
            <thead className={styles.thead}>

            {header.map(headerGroup => (
                <tr className={`${styles.tableHeader} ${changeStyleSortCard}`}
                    key={headerGroup}
                    onClick={() => changeSortCards(headerGroup)}>
                    <th className={styles.column}>
                        {headerGroup}
                    </th>
                </tr>
            ))}
            </thead>

            <tbody className={styles.rows}>

            {rows?.cardPacks.map((row: CardType) => {
                return (
                    <tr className={styles.rowe} key={row._id}>
                        <td className={styles.row}>

                            <span className={styles.rowItem} id={'table'}>{row.name}</span>
                            <span className={styles.rowItem} id={'table'}>{row.cardsCount}</span>
                            <span className={styles.rowItem} id={'table'}>{row.updated.slice(0, 10)}</span>
                            <span className={styles.rowItem} id={'table'}> {row.user_name}</span>

                            <div className={`${styles.rowItem} ${styles.btnBox}`}>
                                {profileID === row.user_id &&
                                    (<>
                                        <span className={styles.btn} data-color>Delete</span>
                                        <span className={styles.btn}>Edit</span>
                                    </>)
                                }
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

export default Cards;
