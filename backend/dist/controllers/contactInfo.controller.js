import ContactInfo from "../models/contactInfo.models.js";
export const submitContactForm = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const newMessage = new ContactInfo({ name, email, subject, message });
        await newMessage.save();
        res.status(201).json({ message: "Contact Data Saved successfully" });
    }
    catch (error) {
        console.error("Error submitting contact form:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
