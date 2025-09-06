import Application from "../models/applyForm.models.js";
export const createApplication = async (req, res) => {
    try {
        const { userId } = req.body;
        const existingApplication = await Application.findOne({ userId });
        if (existingApplication) {
            res
                .status(400)
                .json({ error: "An application already exists for this user." });
            return;
        }
        const application = new Application(req.body);
        await application.save();
        res.status(201).json(application);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const getApplications = async (req, res) => {
    try {
        const applications = await Application.find();
        res.json(applications);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            res.status(404).json({ error: "Application not found" });
            return;
        }
        res.json(application);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getApplicationByUserId = async (req, res) => {
    try {
        const application = await Application.findOne({
            userId: req.params.userId,
        });
        if (!application) {
            res.status(404).json({ error: "Application not found for this user" });
            return;
        }
        res.json(application);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const updateApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!application) {
            res.status(404).json({ error: "Application not found" });
            return;
        }
        res.json(application);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const deleteApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndDelete(req.params.id);
        if (!application) {
            res.status(404).json({ error: "Application not found" });
            return;
        }
        res.json({ message: "Application deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
