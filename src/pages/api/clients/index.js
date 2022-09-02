import Registro from "../../../models/registro";
import dbConnect from "../../../services/db";

dbConnect();
export default async function handle(req, res){
    const {method} =req;

    switch (method){
        case "GET":
            try{
                const registros = await Registro.find({});
                res.status(200).json({sucess: true, data:registros});
            }catch(error){
                console.log(error);
                res.status(500).json({success:false, error});
            }
            break;

        case "POST":
            try{
                const {nome, valor, nowdata, idtype} =req.body;
                if((!nome && !valor)) throw "invalid date"
                const registro = await Registro.create({nome, valor, nowdata, idtype});
                res.status(200).json({sucess: true, data:registro });
            }catch(error){
                console.log(error);
                res.status(500).json({success:false, error});
            }
            break;    
    }


}

