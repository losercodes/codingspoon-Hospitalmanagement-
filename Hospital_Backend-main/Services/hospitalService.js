const Hospital = require("../models/hospital");

exports.createHospital = async (hospitalData) => {
    const hospital = new Hospital(hospitalData);
    return await hospital.save();
};

exports.getHospitalsByCity = async (city) => {
    if (!city) throw new Error("City is required");
    return await Hospital.find({ city });
};

exports.updateHospital = async (id, updateData) => {
    return await Hospital.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteHospital = async (id) => {
    return await Hospital.findByIdAndDelete(id);
};
exports.getHospitalById = async (id) => {
    return await Hospital.findById(id);
};