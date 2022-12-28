
const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

const eTorox = 'ss_etorox';

// Get All Screen Sizes
router.get('/', async (req, res) => {
    const screenSizes = await loadAnalyticsCollections(eTorox);
    res.send(await screenSizes.find({}).toArray());
});

// Add New Screen Size
router.post('/add', async (req, res) => {
    const screenSizes = await loadAnalyticsCollections(eTorox);
    screenSizes.updateOne({screenSize: req.body.screenSize}, {
        $set: {
            screenSize: req.body.screenSize
        },
        $inc: { quantity: +1 }
      }, { upsert: true });

    res.status(201).send();
});

async function loadAnalyticsCollections(db_table_name) {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://agent:aTiMiwLEK2tWRAH@cgsparkanalytics.8aij4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true
        });
    return client.db('CGSparkAnalytics').collection(db_table_name);
}

module.exports = router;