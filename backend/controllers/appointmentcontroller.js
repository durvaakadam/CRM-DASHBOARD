import appointment from "../models/appointmentmodel.js";

export const createAppointment = async (req, res) => {
         try {
              const Appointment = await appointment.create(req.body);
              res.status(201).json(Appointment);
            } catch (err) {
              res.status(500).json({ error: err.message });
            }
};

export const getAllAppointments = async (req, res) => {
        try {
              const appointments = await appointment.find()
                .populate('studentId', 'name email')
                .populate('counselorId', 'name email');
              res.json(appointments);
            } catch (err) {
              res.status(500).json({ error: err.message });
            }
};

export const getAppointmentsById = async (req, res) =>{
         try {
              const appointments = await appointment.find({ studentId: req.params.studentId });
              res.json(appointments);
            } catch (err) {
              res.status(500).json({ error: err.message });
            }
};

export const updateAppointment = async (req, res) =>{
        try {
              const updated = await appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
              res.json(updated);
            } catch (err) {
              res.status(500).json({ error: err.message });
            }
};

export const deleteAppointment = async (req, res) =>{
        try {
              await appointment.findByIdAndDelete(req.params.id);
              res.json({ msg: 'Appointment deleted' });
            } catch (err) {
              res.status(500).json({ error: err.message });
            }
};

export const getAppointmentsByDate = async (req, res) => {
    try {
        const { date } = req.query;
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);
    
        const appointments = await appointment.find({ date: { $gte: start, $lte: end } })
          .populate('student', 'name')
          .populate('counselor', 'name');
        res.json(appointments);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};