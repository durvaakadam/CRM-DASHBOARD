import studmodel from "../models/studentmodel.js";
import applimodel from "../models/applicationmodel.js";
import appointment from "../models/appointmentmodel.js";

export const getKPIs= async (req, res) => {
    try {
    const totalStudents = await studmodel.countDocuments();

    // Applications this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const applicationsThisMonth = await applimodel.countDocuments({
      appliedAt: { $gte: startOfMonth }
    });

    // Appointments today
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    const appointmentsToday = await appointment.countDocuments({
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    // Conversion rate (applications ➝ enrollments)
    const totalApplications = await applimodel.countDocuments();
    const totalEnrolled = await applimodel.countDocuments({ status: 'enrolled' });
    const conversionRate = totalApplications > 0
      ? ((totalEnrolled / totalApplications) * 100).toFixed(2)
      : 0;

    res.json({ totalStudents, applicationsThisMonth, appointmentsToday, conversionRate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApplicationByStatus = async (req, res) => {
    try {
        const data = await applimodel.aggregate([
          { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);
        res.json(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

export const getStudentsByCountry = async (req, res) => {
    try {
        const data = await studmodel.aggregate([
          { $group: { _id: "$destinationCountry", count: { $sum: 1 } } }
        ]);
        res.json(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

export const getUpcomingAppointments = async (req, res) => {
    try {
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
    
        const appointments = await appointment.find({
          date: { $gte: today, $lte: nextWeek },
          status: 'confirmed'
        })
        .populate('student', 'name email')
        .populate('counselor', 'name')
        .sort('date');
    
        res.json(appointments);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

export const getRecentStudents = async (req, res) => {
    try {
        const students = await studmodel.find().sort({ createdAt: -1 }).limit(5);
        res.json(students);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};