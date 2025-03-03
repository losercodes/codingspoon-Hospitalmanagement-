const hospitalService = require("../Services/hospitalService");

exports.createHospital = async (req, res) => {
    try {
        const hospital = await hospitalService.createHospital(req.body);
        res.status(201).json({
            success: true,
            message: "Hospital Created",
            hospital
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to create Hospital",
            error: error.message
        });
    }
};

exports.getHospitalsByCity = async (req, res) => {
    try {
        const { city } = req.query;
        const hospitals = await hospitalService.getHospitalsByCity(city);
        res.status(200).json({
            success: true,
            hospitals
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Error finding hospitals"
        });
    }
};

exports.updateHospital = async (req, res) => {
    try {
        const { id } = req.query;
        const updatedHospital = await hospitalService.updateHospital(id, req.body);
        res.status(200).json({ success: true, message: "Hospital updated successfully", hospital: updatedHospital });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating hospital", error: error.message });
    }
};

exports.deleteHospital = async (req, res) => {
    try {
        const { id } = req.query;
        await hospitalService.deleteHospital(id);
        res.status(200).json({ success: true, message: "Hospital deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting hospital", error: error.message });
    }
};

exports.getHospitalDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const hospital = await hospitalService.getHospitalById(id);
        if (!hospital) {
            return res.status(404).json({ success: false, message: "Hospital not found" });
        }
        res.status(200).json({ success: true, hospital });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching hospital details",
            error: error.message,
        });
    }
};
