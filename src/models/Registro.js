import mongoose from "mongoose";





const RegistroSchema =new mongoose.Schema({
    nome:String,
    valor:Number,
    nowdata:String,
    idtype:Boolean,
    datas:{
        type:Date,
        default:Date(),
    }

})
const Registro = mongoose.models.Registro || mongoose.model("Registro", RegistroSchema);
export default Registro;