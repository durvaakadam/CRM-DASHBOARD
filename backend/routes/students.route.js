import express from "express";
//import studmodel from "../models/studentmodel.js";
import { createStudent, deleteStudent, getAllStudent, getStudentsById, updateStudent } from "../controllers/studentcontrollers.js";
const router = express.Router();

router.post('/',  createStudent);
router.get('/',  getAllStudent);
router.get('/:id',  getStudentsById);
router.put('/:id',  updateStudent);
router.delete('/:id',  deleteStudent);

export default router;


// router.get("/",  async (req, res) => {
//     try {
//         const students = await studmodel.find();
//         res.json(students);
//     } catch (error) {
//         res.status(500).json({ error: err.message });
//     }
// });

// router.get("/:id", async (req, res) =>{
//     try {
//         const student = await studmodel.findById(req.params.id);
//         if (!student) {
//             return res.status(404).json({ message: "Student not found" });
//         }
//         res.json(student);
//     } catch (error) {
//         res.status(500).json({ error: err.message });
//     }
// });

// router.post("/", async (req, res) =>{
//     try {
//         const student = await studmodel.create(req.body);
//         res.json(student);
//     } catch (error) {
//         console.log(error);
//     }
// });

// router.put("/:id", async (req, res) =>{
//     const updated = await studmodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updated) {
//         return res.status(404).json({ message: "Student not found" });
//     }
//     res.json(updated);
// });

// router.delete("/:id", async (req, res) =>{
//     try {
//         await studmodel.findByIdAndDelete(req.params.id);
//         res.json({ message: "Student deleted" });
//     } catch (error) {
//         res.status(500).json({ error: err.message });
//     }
// });

