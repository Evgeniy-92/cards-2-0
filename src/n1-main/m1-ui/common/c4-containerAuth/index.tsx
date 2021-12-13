import React from 'react';
import styles from './styles.module.scss'

export interface LayoutProps {
    children: React.ReactNode
}

const ContainerAuth = (props: LayoutProps) => {
    return (
        <div className={styles.loginMain}>
            {props.children}
        </div>
    );
};

export default ContainerAuth;
