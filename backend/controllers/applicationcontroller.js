import applimodel from "../models/applicationmodel.js";

export const createApplication =  async (req, res) => {
        try {
                const application = await applimodel.create(req.body);
                res.status(201).json(application);
            } catch (error) {
                console.log(error);
            }
};

export const getAllApplication = async (req, res) => {
    try {
        const applications = await applimodel.find().populate('studentId', 'name email').populate('universityId', 'name country');
        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

export const getApplicationById = async (req, res) =>{
        try {
                const application = await applimodel.findById(req.params.id).populate('studentId').populate('universityId');
                if (!application) {
                    return res.status(404).json({ message: "Application not found" });
                }
                res.json(application);
            } catch (error) {
                res.status(500).json({ error: err.message });
            }
};

export const updateApplication = async (req, res) => {
        try {
                const updated = await applimodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!updated) {
                    return res.status(404).json({ message: "Application not found" });
                }
                res.json(updated);
            } catch (error) {
                res.status(500).json({ error: err.message });
            }
};

export const deleteApplication = async (req, res) => {
    try {
        await applimodel.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: "Application deleted" });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};