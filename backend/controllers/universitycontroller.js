import unimodel from "../models/universitymodel.js";

export const  createUniversity = async (req, res) => {
        try {
                const university = await unimodel.create(req.body);
                res.json(university);
            } catch (error) {
                res.status(500).json({ message: "Error" });
            }
};

export const getAllUniversity = async (req, res) => {
         try {
                const universities = await unimodel.find();
                res.json(universities);
            } catch (error) {
                res.status(500).json({ message: "Error" });
            }
};

export const getUniversityById = async (req, res) => {
    try {
        const universities = await unimodel.findById(req.params.id);
        if (!universities) {
            return res.status(404).json({ message: "University not found" });
        }
        res.json(universities);
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};

export const updateUniversity = async (req, res) => {
    try {
        const updated = await unimodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

export const deleteUniversity = async (req, res) =>{
    try {
        await unimodel.findByIdAndDelete(req.params.id);
        res.json({ message: "University deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};