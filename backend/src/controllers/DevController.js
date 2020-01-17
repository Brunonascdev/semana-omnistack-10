const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const {findConnections, sendMessage} = require('../websocket');

module.exports = {
    async index(request, response){
        const devs =  await Dev.find();



        return response.json(devs);
    },

    async store(request, response){
        const {github_username, techs, latitude, longitude} = request.body;

        let dev = await Dev.findOne({ github_username });

        if(!dev){
            const ApiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            const {name = login, avatar_url, bio} = ApiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });

            //FIltrar as conexões que estão a no máximo 10km de distancia
            // e que o novo dev tenha pelo menos uma das tecnologias filtradas

            const sendSocketMessageTo = findConnections(
                {latitude, longitude},
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
    
        return response.json(dev);
    },

    // \/

    // async delete(request, response){
    //     const {username} = request.query;

    //     let devRemoved = await Dev.deleteOne({"github_username": username});

    //     return response.json(devRemoved);
    // },

    // async update(request, response){
    //     const {github_username, techs, latitude, name, longitude, bio, avatar_url} = request.body;

    //     const techsArray = parseStringAsArray(techs);
        
    //     const location = {
    //         type: 'Point',
    //         coordinates: [longitude, latitude]
    //     };
        
    //     let dev = await Dev.updateOne(github_username, {
    //         techs: techsArray,
    //         name,
    //         bio,
    //         avatar_url,
    //         location,
    //     });

    //     return response.json(dev);

    // },

    // /\
}


