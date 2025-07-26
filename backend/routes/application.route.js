// import applimodel from "../models/applicationmodel.js";
// import studmodel from "../models/studentmodel.js";
// import unimodel from "../models/universitymodel.js";

import express from "express";
import createApplication from "express/lib/express.js";
import { deleteApplication, getAllApplication, getApplicationById, updateApplication } from "../controllers/applicationcontroller.js";

const router = express.Router();

router.post('/', createApplication);
router.get('/',  getAllApplication);
router.get('/:id',  getApplicationById);
router.put('/:id/status',  updateApplication);
router.delete('/:id', deleteApplication);

export default router;


// router.get('/', async (req, res) =>{
//     try {
//         const applications = await applimodel.find().populate('studentId', 'name email').populate('universityId', 'name country');
//         res.json(applications);
//     } catch (error) {
//         res.status(500).json({ error: err.message });
//     }
// });

// router.get('/:id', async (req, res) =>{
//     try {
//         const application = await applimodel.findById(req.params.id).populate('studentId').populate('universityId');
//         if (!application) {
//             return res.status(404).json({ message: "Application not found" });
//         }
//         res.json(application);
//     } catch (error) {
//         res.status(500).json({ error: err.message });
//     }
// });

// router.post('/', async (req, res) =>{
//     try {
//         const application = await applimodel.create(req.body);
//         res.status(201).json(application);
//     } catch (error) {
//         console.log(error);
//     }
// });

// router.put('/:id', async (req, res) =>{
//     try {
//         const updated = await applimodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updated) {
//             return res.status(404).json({ message: "Application not found" });
//         }
//         res.json(updated);
//     } catch (error) {
//         res.status(500).json({ error: err.message });
//     }
// });

// router.delete('/:id', async (req, res) =>{
//     try {
//         await applimodel.findByIdAndDelete(req.params.id);
//         res.status(204).json({ message: "Application deleted" });
//     } catch (error) {
//         res.status(500).json({ error: err.message });
//     }
// });
