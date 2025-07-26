import InternModel from "../models/internmodel.js";
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

export const upload = multer({ storage: storage });

// Create a new intern
export const createIntern = async (req, res) => {
    try {
        const intern = await InternModel.create(req.body);
        res.json(intern);
    } catch (error) {
        console.error(error);
        console.log("Creating intern:", formData);
        res.status(500).json({ error: error.message });
    }
};

// Get all interns
export const getAllInterns = async (req, res) => {
    try {
        const interns = await InternModel.find();
        res.json(interns);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get intern by ID
export const getInternById = async (req, res) => {
    try {
        const intern = await InternModel.findById(req.params.id);
        if (!intern) {
            return res.status(404).json({ message: "Intern not found" });
        }
        res.json(intern);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update intern
export const updateIntern = async (req, res) => {
    try {
        const updated = await InternModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ message: "Intern not found" });
        }
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete intern
export const deleteIntern = async (req, res) => {
    try {
        await InternModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Intern deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
