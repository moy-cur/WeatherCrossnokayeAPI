require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { check, validationResult } = require('express-validator');

const Forecast = require('./models/forecast');

app.use(cors())

app.get('/forecast/:zipCode/hourly',[
    check('zipCode', 'zipCode must be a number').isNumeric(),
    check('zipCode', 'zipCode must be 5 digist in length').isLength({min: 5, max: 5})
], async (req, res) => {

    try{

        const { zipCode } = req.params;
        const errors = validationResult(req);
        
        if ( !errors.isEmpty() ) {
            return res.status(400).json(errors);
        }
        
        const searchesInstance = new Forecast();
            
        const forecastResponse = await searchesInstance.getForecastForZipCode( zipCode );
    
        res.json(forecastResponse);
    } catch (error) {
        console.log(error);
        if ( error.message === 'zipCodeInvalid' ) {
            res.status(400).json({ msg: 'No data found for zipCode'})
        } else {
            res.status(500).json({error: 'Internal server error'});
        }
    }
});

app.get('/*', (req, res) => {
    res.status(404).json({
        error: "Not found"
    })
})


app.listen(process.env.LISTENING_PORT);