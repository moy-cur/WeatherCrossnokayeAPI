require('dotenv').config();
const axios = require('axios');

class Forecast {

    get paramsMapbox() {
        return {
            'country': 'us',
            'proximity': 'ip',
            'types': 'postcode',
            'access_token': process.env.MAPBOX_KEY,
            'limit': 1
        }
    }

    async getForecastForZipCode( zipCode = '') {
        try{

            const geoResponse = await this.getGeo( zipCode );
            
            const [ lon, lat ] = geoResponse.coordinates || [];

            if ( !lon || !lat ) {
                throw new Error('zipCodeInvalid');                
            }
            
            const forecast = await this.getForecast( lat, lon );

            forecast.placeName = geoResponse.place_name;

            return forecast;

        } catch( error ) {
            console.log(error);
            throw error;
        }

    }


    async getGeo( zipCode = '' ) {

        try {            
            const mapBoxInstance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ zipCode }.json`,
                params: this.paramsMapbox
            });

            const mapBoxResponse = await mapBoxInstance.get();

            console.log(mapBoxResponse.data);

            return mapBoxResponse.data.features.length > 0 ? 
                    { coordinates: mapBoxResponse.data.features[0].geometry.coordinates, 
                        place_name: mapBoxResponse.data.features[0].place_name } : [];

        } catch ( error ) {
            console.log( error );
            throw error;
        }
    }


    async getForecast( lat, lon ) {
        try{
    
            const pointsResponse = await axios.get(`https://api.weather.gov/points/${lat},${lon}`);
    
            const forecast = await axios.get(pointsResponse.data.properties.forecastHourly);
    
            return forecast.data?.properties;        
        } catch ( error ) {
            console.log( error );
            throw error;
        }
    }

}

module.exports = Forecast;