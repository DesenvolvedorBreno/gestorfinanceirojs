import Registro from "../../../models/registro";
import dbConnect from "../../../services/db";


dbConnect();
export default async function handle(req, res){
    const {method} =req;
    const {RegistroID} =req.query;

    switch (method){
        case "PUT":
            try{
                const {nome, valor, nowdata} =req.body;
                if((!nome && !valor)) throw "invalid Date"
                await Registro.updateOne({_id: RegistroID}, {nome, valor, nowdata});
                res.status(200).json({sucess: true, data:registros});
            }catch(error){
                console.log(error);
                res.status(500).json({success:false, error});
            }
            break;

        case "DELETE":
            try{
                
                await Registro.deleteOne({_id:RegistroID});
                res.status(200).json({sucess: true});
            }catch(error){
                console.log(error);
                res.status(500).json({success:false, error});
            }
            break;    
    }


}

