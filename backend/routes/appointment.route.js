import express from "express";
import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointmentsByDate,
  getAppointmentsById,
  updateAppointment
} from "../controllers/appointmentcontroller.js";

const router = express.Router();

router.get('/by-date', getAppointmentsByDate);
router.get('/', getAllAppointments);
router.post('/', createAppointment);
router.get('/:id', getAppointmentsById);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

export default router;
