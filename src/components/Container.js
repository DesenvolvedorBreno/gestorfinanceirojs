import styles from './comp.module.css'
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Click from "../../public/click.svg";
import Up from '../../public/up.svg';
import Spend from '../../public/spend.svg';
import 'react-toastify/dist/ReactToastify.css';
import api from '../services/api'
import {CurrentDate} from '../helpers/CurrentDate';
import DisplayArea from './DisplayArea';


const Container = ()=>{
 const [nome, setNome]=useState("");
 const [valor, setValor]=useState("");
 const [id, setId]=useState(null)
 const [registros, setRegistros]=useState([])
 const [nowdata, setNowData]=useState(CurrentDate());
 const [formShow, setFormShow]=useState(false); 
 const [idtype, setIdType]=useState(false);

const [balance, setbalance]=useState(0);
const [spendT, setSpendT]=useState(0);
const [total, setTotal]=useState(0);



useEffect(()=>{
   
    [
        api.get("/clients").then(({data})=>{
            setRegistros(data.data);
    
        })
    ]
    
   

    const balancototal = registros
    .filter((item) => item.idtype)
    .map((registro) => Number(registro.valor));

    const spendtotal = registros
    .filter((item) => !item.idtype)
    .map((registro) => Number(registro.valor));

    const spendT=spendtotal.reduce((acc, cur) => acc + cur, 0).toFixed(2)
    const balance=balancototal.reduce((acc, cur) => acc + cur, 0).toFixed(2)
   
    const total = Math.abs(balance - spendT).toFixed(2);
   

    setbalance(`R$:${balance}`)
    setSpendT(`R$:${spendT}`)
    setTotal(`R$: ${total}`)

   
  },[registros])





const ShowForm =()=>{
    setFormShow(!formShow)
}



  const validateForm = ()=>{
    if(!nome){
        return toast("Insira o nome da transação");
    }
    if(!valor){
        return toast("Insira o valor da transação");
    }
    
  }



  const createTransition = async(e)=>{
    e.preventDefault();
    if(validateForm()) return;
    try{
        const {data}= await api.post("/clients", {nome, valor, nowdata, idtype});
        setRegistros(registros.concat(data.data));
        setNome("");
        setValor("");
        setNowData(nowdata)
        toast("Transação adicionada");
    }catch(error){
        console.log(error);
    
    }
    setFormShow(false)
  }

 const handleDelete= async(_id)=>{
    try{
        await api.delete(`/clients/${_id}`);
        toast("Deletado com sucesso");
    }catch(error){
        console.log(error);

    }

 }

 const handlshoweditar= async(registro)=>{
    setId(registro._id)
    setNome(registro.nome)
    setValor(registro.valor)
    setFormShow(true)
 }

 const handleeditar = async(e)=>{
    e.preventDefault();
    if(validateForm()) return;

    try{
        await api.put(`/clients/${id}`, {nome, valor});
        toast("Atualizado com sucesso");
    }catch(error){
        console.log(error);

    }
    limparcampos();
    setFormShow(false)

 }

 const limparcampos = ()=>{
    setNome("")
    setValor("")
    setId(null);
 }










    return(
        <>
        <div className={styles.container}>
            <DisplayArea balance={balance} spendT={spendT} total={total} />
           
           <div className={styles.main}>
            <button className={styles.btcadastrar} onClick={ShowForm}>
                Adicionar Transação <div className={styles.btcadastrarim}>
                    <Image src={Click} alt="click"/></div>  </button>
                {formShow &&

                
                <form onSubmit={id ? handleeditar : createTransition}>
                    <input type="text"
                    className={styles.inputname} 
                    value={nome} 
                    onChange={(e)=> setNome(e.target.value)} 
                    placeholder="Insira o nome da transição"
                    />
                    <input type="number"
                    className={styles.inputvalue} 
                    value={valor} 
                    onChange={(e)=> setValor(e.target.value)}  
                    placeholder="Insira o valor"
                    />
                   
                    <button type="submit"
                    className={styles.buttonr}
                    >{id? "Atualizar" : "Registrar"}</button>
                     <div className={styles.buttonradio}>
                    <input 
                     type="radio"
                     id="rIncome" 
                     name="group1"
                     className={styles.inputradios}                                               
                     onChange={() => setIdType(true)}  
                     />Entrada
                    <input 
                    type="radio" 
                    id="rExpenses"
                    name="group1"           
                    className={styles.inputradios}   
                    onChange={() => setIdType(false)} 
                    />Saída
                    </div>
                </form>
                }       
           </div>
           <div className={styles.fieldtable}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.tabletdntitle}>Nome</th>
                            <th className={styles.tabletddtitle}>Data</th>
                            <th className={styles.tabletdvtitle}>Valor</th>
                           
                            <th className={styles.tabletdatitle}>ação</th>
                        </tr>
                        </thead>
                        <tbody>
                            {registros.map((registro, index)=>(

                                <tr key={index}>
                                <td className={styles.tabletdn}>{registro.nome} 
                                <div className={styles.tbimg}></div> 
                                </td>
                                <td className={styles.tabletdd}>{registro.nowdata}</td>
                                <td className={styles.tabletdv}>R$: {registro.valor}</td>
                                <td className={styles.tabletda}>  
                                    <button
                                    className={styles.buttone}
                                    onClick={()=>handlshoweditar(registro)}
                                    >Editar</button> 
                                    <button 
                                    className={styles.buttond}
                                    onClick={()=>handleDelete(registro._id)}
                                    >x</button> 
                                </td>
                                </tr>

                            ))

                           
                       
                         }
                        </tbody>
                </table>
           </div>
           <div className={styles.footer}>Todosos direitos reservados | Breno Dev App</div>
        </div>
        </>
    );
}
export default Container;