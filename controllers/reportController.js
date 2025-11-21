const WaterReport = require('../models/WaterReport');
const fetch = global.fetch || require('node-fetch');

exports.createReport = async (req, res) => {
    console.log('createReport called. body =', req.body);
    try{
        console.log('session userId =', req.session && req.session.userId, 'volunteerId =', req.session && req.session.volunteerId);
        // attach the logged-in user (if any) to the report
        const ownerId = req.session.userId || req.session.volunteerId || null;

        const newReport = await WaterReport.create({
            user: ownerId,
            season: req.body.season,
            ph: req.body.ph,
            turbidity: req.body.turbidity,
            tds: req.body.tds,
            totalColiform: req.body.totalColiform,
            ageGroup: req.body.ageGroup,
            gender: req.body.gender,
            wasteDisposal: req.body.wasteDisposal,
            toiletAccess: req.body.toiletAccess,
            waterSource: req.body.waterSource,
            arsenic: req.body.arsenic,
            nitrate: req.body.nitrate,
        });

        // Try to call the ML service to get predictions
        try {
            const mlUrl = process.env.ML_URL || 'http://127.0.0.1:5001/predict';
            const mlPayload = {
                Season: req.body.season,
                Water_Source: req.body.waterSource,
                Toilet_Access: req.body.toiletAccess,
                Waste_Disposal: req.body.wasteDisposal,
                Age_Group: req.body.ageGroup,
                Gender: req.body.gender,
                pH: Number(req.body.ph),
                Turbidity_NTU: Number(req.body.turbidity),
                TDS_mgL: Number(req.body.tds),
                Total_Coliform_CFU_100ml: Number(req.body.totalColiform),
                Nitrate_mgL: Number(req.body.nitrate),
                Arsenic_mgL: Number(req.body.arsenic),
            };

            const mlRes = await fetch(mlUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mlPayload),
                timeout: 10000,
            });

            if (mlRes.ok) {
                const data = await mlRes.json();
                newReport.predictedDisease = data.disease_prediction || data.disease || null;
                newReport.predictedSeverity = data.severity_prediction || data.severity || null;
                await newReport.save();
            } else {
                console.warn('ML service responded with status', mlRes.status);
            }
        } catch (mlErr) {
            console.error('Error calling ML service:', mlErr.message || mlErr);
        }

        // Redirect to results page for this report
        res.status(201).redirect(`/report/${newReport._id}`);
    }catch(err){
        console.error('Error creating report:', err);
        // In development, return error message to help debugging
        if (process.env.NODE_ENV === 'production') {
            res.status(500).send('Server Error');
        } else {
            res.status(500).send(`Server Error: ${err.message}`);
        }
    }
}

exports.getReport = async (req, res) => {
    try {
        const report = await WaterReport.findById(req.params.id).lean();
        if (!report) return res.status(404).send('Report not found');
        res.render('reportResult', { report });
    } catch (err) {
        console.error('Error fetching report:', err);
        res.status(500).send('Server Error');
    }
}