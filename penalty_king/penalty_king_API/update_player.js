var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.update_player = update_player ;

function update_player(req,res){

	var ip_address = req.body.ip_address;
	var password = req.body.password;
	var player_id = req.body.player_id;


	if(_.isUndefined(player_id))
	{
			return res.json({
			 error: {
			 	status_code : 1006,
			 	message :"player_id cannot be blank"
			 } 
		})

	}


	m.player.update({ 
		ip_address:ip_address,
		password:password
		},
		{
			where:{
				id:player_id
			}
		}).then(function()
		{
			return res.json({
			 data: {
			 	status_code:0,
			 	message :"successfully updated player detail"
			 } 
		})

		});

	
	
}