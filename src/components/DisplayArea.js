import styles from "./display.module.css";
import React from "react";
const DisplayArea = ({balance, spendT, total})=>{ 

   
    return(
        <>
        <div className={styles.main}>
        <div className={styles.field}> 
            <div className={styles.fieldbalance}>
            <div className={styles.fieldbalance}>
           Entradas
            </div> 
            </div>
            <div className={styles.fieldvalue}>{balance}</div>
        </div>
        <div className={styles.field}> 
            <div className={styles.fieldoutput}>
          saida
            </div> 
            <div className={styles.fieldvalue}>{spendT}</div>       
        </div>

        <div className={styles.field}> 
           <div className={styles.fieldtotal}>
            saldo
            
            </div>
            <div className={styles.fieldvalue}>{total}</div>
        
        </div>
        
        </div>
        </>
    );

};
export default DisplayArea;