const Spot = require("../models/Spot");
const User = require("../models/User")
module.exports = {

   async index(request, response) {
      const { tech } = request.query;
      const spots = await Spot.find({ techs: tech });
      console.log(await Spot.find())
      return response.json(spots);
   },

   async strore(request, response) {
      const { filename } = request.file;
      const { company, techs, price } = request.body;
      const { user_id } = request.headers;

      const user = await User.findById(user_id);

      if(!user) {
         return response.status(400).json({
             message: "user does not exist"
         })
      }

      const spot = Spot.create({
         user: user_id,
         thumbnail: filename,
         company, 
         techs: techs.split(",").map(tech => tech.trim()),
         price
      })

      return response.json(spot)
   }
}