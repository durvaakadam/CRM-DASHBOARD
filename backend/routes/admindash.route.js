//import { deletestudent, editstud, getallproducts, getallstuds } from '../controllers/admindashcontrollers.js';
// import studmodel from '../models/studentmodel.js';
// import unimodel from '../models/universitymodel.js';
// import applimodel from '../models/applicationmodel.js';
// import appointment from '../models/appointmentmodel.js';

import express from 'express';
import { getApplicationByStatus, getKPIs, getRecentStudents, getStudentsByCountry, getUpcomingAppointments } from '../controllers/dashboardcontroller.js';

const router = express.Router();

router.get('/kpis', getKPIs);
router.get('/applications-status', getApplicationByStatus);
router.get('/students-country', getStudentsByCountry);
router.get('/appointments-upcoming', getUpcomingAppointments);
router.get('/students-recent', getRecentStudents);


export default router;


// router.get('/overview', async (req, res) =>{
//     try {
//         const totalStudents = await studmodel.countDocuments();
//         const totalApplications = await applimodel.countDocuments();
//         const totalAppointments = await appointment.countDocuments();

//         const applicationStatuses = await applimodel.aggregate([
//             { $group: { _id: '$status', count: { $sum: 1 } } },
//         ]);

//         //maybe university model will be used check it once
//         const topUniversities = await applimodel.aggregate([
//             {
//               $group: {
//                 _id: '$universityId',
//                 count: { $sum: 1 },
//               },
//             },
//             { $sort: { count: -1 } },
//             { $limit: 5 },
//             {
//               $lookup: {
//                 from: 'universities',
//                 localField: '_id',
//                 foreignField: '_id',
//                 as: 'university',
//               },
//             },
//             {
//               $unwind: '$university',
//             },
//             {
//               $project: {
//                 _id: 0,
//                 university: '$university.name',
//                 country: '$university.country',
//                 count: 1,
//               },
//             },
//           ]);

//           res.json({
//             totalStudents,
//             totalApplications,
//             totalAppointments,
//             applicationStatuses,
//             topUniversities,
//           });

//     } catch (error) {
//         res.status(500).json({ error: err.message });
//     }
// });


// router.get('/students', getallstuds);
// router.get('/students/edit/:id', editstud);
// router.get('/students/del/:id', deletestudent);
// router.get('/products', getallproducts);