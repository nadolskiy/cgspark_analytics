// const route = require('color-convert/route');
const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


// eToroX (current)
const eTorox             = 'ss_etorox';

// eToroX (new)
const eToroxNew          = 'eTorox_new';
const eToroxNewDev       = 'eTorox_new_dev_screen_sizes';
const eToroxNewStage     = 'eTorox_new_stag_screen_sizes';

// Xmas 
const xMas               = 'xmas_screen_sizes';
const xMasStage          = 'xmas_stage_screen_sizes';

// Digital Assets
const digitalAssets      = 'digital_assets';
const digitalAssetsDev   = 'digital_assets_dev_screen_sizes';
const digitalAssetsStage = 'digital_assets_stag_screen_sizes';




// Get All Screen Sizes
router.get('/', async (req, res) => {
    const screenSizes = await loadAnalyticsCollections(eTorox);
    res.send(await screenSizes.find({}).toArray());
});

// Add New Screen Size
// router.post('/', async (req, res) => {
//     const screenSizes = await loadAnalyticsCollections();

//     screenSizes.updateOne({screenSize: req.body.screenSize}, {
//         $set: {
//             screenSize: req.body.screenSize
//         },
//         $inc: { quantity: +1 }
//       }, { upsert: true });

//     res.status(201).send();
// });

// eToroX WebSite -- -- --
router.post('/etorox', async (req, res) => {
    const screenSizes = await loadAnalyticsCollections(eTorox);
    screenSizes.updateOne({screenSize: req.body.screenSize}, {
        $set: {
            screenSize: req.body.screenSize
        },
        $inc: { quantity: +1 }
      }, { upsert: true });

    res.status(201).send();
});

// screenSizes

async function loadAnalyticsCollections(db_table_name) {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://agent:aTiMiwLEK2tWRAH@cgsparkanalytics.8aij4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true
        });
    return client.db('CGSparkAnalytics').collection(db_table_name);
}

module.exports = router;