const mongoose = require('mongoose');

const WaterReportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
       
    },
    season: { type: String, required: true},
    ph: {type: Number, required: true},
    turbidity: { type: Number, required: true },
    tds: { type: Number, required: true }, 
    totalColiform: { type: Number, required: true },
    ageGroup: { type: String, required: true },
    gender: { type: String, required: true },
    wasteDisposal: { type: String, required: true },
    toiletAccess: { type: String, required: true },
    waterSource: { type: String, required: true },
    arsenic: { type: Number, required: true },
    nitrate: { type: Number, required: true },
    predictedDisease: { type: String },
    predictedSeverity: { type: String },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('WaterReport', WaterReportSchema);