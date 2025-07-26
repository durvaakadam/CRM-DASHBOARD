import studmodel from "../models/studentmodel.js";

export const  createStudent = async (req, res) => {
        try {
            const student = await studmodel.create(req.body);
            res.json(student);
        } catch (error) {
            console.log(error);
        }
};

export const getAllStudent = async (req, res) => {
        try {
                const students = await studmodel.find();
                res.json(students);
            } catch (error) {
                res.status(500).json({ error: err.message });
         }
};

export const getStudentsById = async (req, res) => {
    try {
        const student = await studmodel.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

export const updateStudent = async (req, res) => {
        try {
            const updated = await studmodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updated) {
            return res.status(404).json({ message: "Student not found" });
            }
            res.json(updated);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
};

export const deleteStudent = async (req, res) => {
         try {
                await studmodel.findByIdAndDelete(req.params.id);
                res.json({ message: "Student deleted" });
            } catch (error) {
                res.status(500).json({ error: err.message });
            }
};