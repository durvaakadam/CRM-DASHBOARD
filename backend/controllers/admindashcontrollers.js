import usermodel from "../models/usermodel.js";
import productmdl from "../models/productschema.js";

export const getallstuds = async(req, res) => {
   try {
        const users = await usermodel.find({}, {password: 0, token: 0});
        if(!users || users.length === 0){
            return res.status(404).json({message: "No students found"});
        }
        return res.status(200).json({message: "Students found", data: users});
   } catch (error) {
        console.log(error);
   }
};

export const getallproducts = async(req, res) => {
    try {
        const product = await productmdl.find();
        if(!product || product.length === 0){
            return res.status(404).json({message: "No products found"});
        }
        return res.status(200).json({message: "Products found", data: product});
    } catch (error) {
        console.log(error);
    }
};

export const deletestudent = async(req, res) => {
    try {
       console.log("this is delete route for student");
       const studid = req.params.id;
       console.log(studid);
       const user = await usermodel.findByIdAndDelete(studid);
       if(!user){
        return res.status(404).json({message: "Student not found"});
       }
       res.status(200).json({message: "successfully "});

    } catch (error) {
        console.log(error);
    }
};

export const editstud = async(req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const updatedata = req.body;
        console.log(updatedata);
        const user = await usermodel.findByIdAndUpdate(id, updatedata, {new: true});
        if(!user){
            return res.status(404).json({message: "Student not found"});
        }
        return res.status(200).json({message: "Student updated", data: user});
    } catch (error) {
        console.log(error);
    }
};