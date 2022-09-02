import styles from './comp.module.css'
import React from 'react';

const Header = ()=>{
    return(
        <div className={styles.header}>
           <div className={styles.headertitle}>
                <div className={styles.headertitle}> Gestor financeiro</div>
           </div>
        </div>
    );
}
export default Header;