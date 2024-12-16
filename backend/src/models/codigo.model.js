const mongoose = require("mongoose");

const securityCodeSchema = new mongoose.Schema({
    email: { type: String, required: true },
    code: { type: String, required: true },
    expiration: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model("SecurityCode", securityCodeSchema);

