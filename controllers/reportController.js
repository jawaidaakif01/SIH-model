const WaterReport = require('../models/WaterReport');

exports.createReport = async (req, res) => {
    try{
        const newReport = await WaterReport.create({
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
        res.status(201).send('Report submitted successfully! We will redirect to a result page soon.');
    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
}