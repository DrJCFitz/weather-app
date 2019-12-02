const currentDataView = async ( data ) => {
  /*
  "currently": {
                "time": 1509993277,
                "summary": "Drizzle",
                "icon": "rain",
                "nearestStormDistance": 0,
                "precipIntensity": 0.0089,
                "precipIntensityError": 0.0046,
                "precipProbability": 0.9,
                "precipType": "rain",
                "temperature": 66.1,
                "apparentTemperature": 66.31,
                "dewPoint": 60.77,
                "humidity": 0.83,
                "pressure": 1010.34,
                "windSpeed": 5.59,
                "windGust": 12.03,
                "windBearing": 246,
                "cloudCover": 0.7,
                "uvIndex": 1,
                "visibility": 9.84,
                "ozone": 267.44
            },
   */
  return data;
}

const dailyDataView = async ( data ) => {
return data;
  /*
{
                  "time": 1509944400,
                  "summary": "Rain starting in the afternoon, continuing until evening.",
                  "icon": "rain",
                  "sunriseTime": 1509967519,
                  "sunsetTime": 1510003982,
                  "moonPhase": 0.59,
                  "precipIntensity": 0.0088,
                  "precipIntensityMax": 0.0725,
                  "precipIntensityMaxTime": 1510002000,
                  "precipProbability": 0.73,
                  "precipType": "rain",
                  "temperatureHigh": 66.35,
                  "temperatureHighTime": 1509994800,
                  "temperatureLow": 41.28,
                  "temperatureLowTime": 1510056000,
                  "apparentTemperatureHigh": 66.53,
                  "apparentTemperatureHighTime": 1509994800,
                  "apparentTemperatureLow": 35.74,
                  "apparentTemperatureLowTime": 1510056000,
                  "dewPoint": 57.66,
                  "humidity": 0.86,
                  "pressure": 1012.93,
                  "windSpeed": 3.22,
                  "windGust": 26.32,
                  "windGustTime": 1510023600,
                  "windBearing": 270,
                  "cloudCover": 0.8,
                  "uvIndex": 2,
                  "uvIndexTime": 1509987600,
                  "visibility": 10,
                  "ozone": 269.45,
                  "temperatureMin": 52.08,
                  "temperatureMinTime": 1510027200,
                  "temperatureMax": 66.35,
                  "temperatureMaxTime": 1509994800,
                  "apparentTemperatureMin": 52.08,
                  "apparentTemperatureMinTime": 1510027200,
                  "apparentTemperatureMax": 66.53,
                  "apparentTemperatureMaxTime": 1509994800
              }
 */
}

const alertsDataView = async ( data ) => {
  return data;
/*
{
            "title": "Flood Watch for Mason, WA",
            "time": 1509993360,
            "expires": 1510036680,
            "description": "...FLOOD WATCH REMAINS IN EFFECT THROUGH LATE MONDAY NIGHT...\nTHE FLOOD WATCH CONTINUES FOR\n* A PORTION OF NORTHWEST WASHINGTON...INCLUDING THE FOLLOWING\nCOUNTY...MASON.\n* THROUGH LATE FRIDAY NIGHT\n* A STRONG WARM FRONT WILL BRING HEAVY RAIN TO THE OLYMPICS\nTONIGHT THROUGH THURSDAY NIGHT. THE HEAVY RAIN WILL PUSH THE\nSKOKOMISH RIVER ABOVE FLOOD STAGE TODAY...AND MAJOR FLOODING IS\nPOSSIBLE.\n* A FLOOD WARNING IS IN EFFECT FOR THE SKOKOMISH RIVER. THE FLOOD\nWATCH REMAINS IN EFFECT FOR MASON COUNTY FOR THE POSSIBILITY OF\nAREAL FLOODING ASSOCIATED WITH A MAJOR FLOOD.\n",
            "uri": "http://alerts.weather.gov/cap/wwacapget.php?x=WA1255E4DB8494.FloodWatch.1255E4DCE35CWA.SEWFFASEW.38e78ec64613478bb70fc6ed9c87f6e6"
          }
 */
}

module.exports = {


  friendlyName: 'Forecast',


  description: 'Forecast something.',


  inputs: {
    zipCode: {
      type: 'ref',
      required: true
    },
    current : {
      type : 'ref',
      required : true
    },
    daily : {
      type : 'ref',
      required : true
    },
    alerts : {
      type : 'ref',
      required : true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    return {
      current : await currentDataView(inputs.current),
      daily : await dailyDataView(inputs.daily),
      alerts: await alertsDataView(inputs.alerts)
    };
  }

};

