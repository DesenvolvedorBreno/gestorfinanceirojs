 export const CurrentDate =()=>{
    const newDate = new Date();
    return(`Dia${newDate.getDate()}/Mês ${newDate.getMonth()+1}`) 
}
