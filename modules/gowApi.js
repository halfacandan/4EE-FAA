module.exports = {
    GetPatchNotes: async function (jwtToken){
        const endpointPath = "v1/game/patchnotes";
        let json = await MakeApiGetCallAsync(endpointPath, jwtToken);
        return json;
    },
    GetDailyGuildHonour: async function (jwtToken){
        const endpointPath = "v1/guild/honour/daily";
        let json = await MakeApiGetCallAsync(endpointPath, jwtToken);
        return json;
    },
    GetWeeklyGuildHonour: async function (jwtToken){
        const endpointPath = "v1/guild/honour/weekly";
        let json = await MakeApiGetCallAsync(endpointPath, jwtToken);
        return json;
    },
    GetGuildHonourRota: async function (jwtToken){
        const endpointPath = "v1/guild/honour/rota";
        let json = await MakeApiGetCallAsync(endpointPath, jwtToken);
        return json;
    },
    GetGuildMembers: async function (jwtToken){
        const endpointPath = "v1/guild/members";
        let json = await MakeApiGetCallAsync(endpointPath, jwtToken);
        return json;
    },
    ExcludeGuildMembersFromHonourRota: async function (guildmembers, editedBy, jwtToken){
        const endpointPath = "v1/guild/honour/exclude";

        const postData = {
            "guildMembers": guildmembers,
            "editedBy": editedBy
        };

        let json = await MakeApiPostCallAsync(endpointPath, jwtToken, postData);
        return json;
    },
    IncludeGuildMembersInHonourRota: async function (guildmembers, editedBy, jwtToken){
        const endpointPath = "v1/guild/honour/include";

        const postData = {
            "guildMembers": guildmembers,
            "editedBy": editedBy
        };

        let json = await MakeApiPostCallAsync(endpointPath, jwtToken, postData);
        return json;
    }
}

const request = require('request');

function MakeApiGetCallAsync(endpointPath, jwtToken) {

    const apiEndpoint = new URL(endpointPath, process.env.API_ENDPOINT_BASE).href;

    const options = {
        url: apiEndpoint,
        json: true,
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
            resolve(body);
        });
    });
}

function MakeApiPostCallAsync(endpointPath, jwtToken, postData = null) {

    const apiEndpoint = new URL(endpointPath, process.env.API_ENDPOINT_BASE).href;

    const options = {
        url: apiEndpoint,
        method :"POST",
        followAllRedirects: true,
        body: postData,
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Jwt-Auth': jwtToken,
            'Content-Length': postData.length
        }
      };

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) reject(error);
            if (response.statusCode != 200) {
                reject(null);
            }
            resolve(body);
        });
    });
}