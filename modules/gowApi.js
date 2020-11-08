module.exports = {
    GetDailyGuildHonour: async function (jwtToken){
        const endpointPath = "v1/guild/honour/daily";
        let json = await MakeApiCallAsync(endpointPath, jwtToken);
        return json;
    },
    GetWeeklyGuildHonour: async function (jwtToken){
        const endpointPath = "v1/guild/honour/weekly";
        let json = await MakeApiCallAsync(endpointPath, jwtToken);
        return json;
    },
    GetGuildMembers: async function (jwtToken){
        const endpointPath = "v1/guild/members";
        let json = await MakeApiCallAsync(endpointPath, jwtToken);
        return json;
    }
}

const request = require('request');

function MakeApiCallAsync(endpointPath, jwtToken) {

    const apiEndpoint = new URL(endpointPath, process.env.API_ENDPOINT_BASE).href;

    const options = {
        url: apiEndpoint,
        headers: {
          'Content-Type': 'application/json',
                        'Jwt-Auth': jwtToken
        }
      };
    
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) reject(error);
            if (response.statusCode != 200) {
                reject(null);
            }
            resolve(JSON.parse(body));
        });
    });
}