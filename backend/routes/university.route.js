import express from "express";
import { createUniversity, deleteUniversity, getAllUniversity, getUniversityById, updateUniversity } from "../controllers/universitycontroller.js";
//import unimodel from "../models/universitymodel.js";
const router = express.Router();

router.post('/',  createUniversity);
router.get('/',  getAllUniversity);
router.get('/:id',  getUniversityById);
router.put('/:id',  updateUniversity);
router.delete('/:id',  deleteUniversity);

export default router; 


// router.get('/', async (req, res) =>{
//     try {
//         const universities = await unimodel.find();
//         res.json(universities);
//     } catch (error) {
//         res.status(500).json({ message: "Error" });
//     }
// });

// router.get('/:id', async (req, res) =>{
//     try {
//         const universities = await unimodel.findById(req.params.id);
//         if (!universities) {
//             return res.status(404).json({ message: "University not found" });
//         }
//         res.json(universities);
//     } catch (error) {
//         res.status(500).json({ message: "Error" });
//     }
// });

// router.post('/', async (req, res) =>{
//     try {
//         const university = await unimodel.create(req.body);
//         res.json(university);
//     } catch (error) {
//         res.status(500).json({ message: "Error" });
//     }
// });

// router.put('/:id', async (req, res) => {
//     try {
//       const updated = await unimodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//       res.json(updated);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
// });

// router.delete('/:id', async (req, res) =>{
//     try {
//         await unimodel.findByIdAndDelete(req.params.id);
//         res.json({ message: "University deleted" });
//     } catch (error) {
//         res.status(500).json({ message: "Error" });
//     }
// });

