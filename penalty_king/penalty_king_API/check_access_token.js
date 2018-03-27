var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.check_access_token = check_access_token ;

function check_access_token(req,res){

	var player_id = req.body.player_id;
	var access_token = req.body.access_token;

	if(_.isUndefined(player_id))
	{
		return res.json({
			 error: {
			 	status_code : 1,
			 	message :"player_id cannot be blank"
			 } 
		});

	}
	if(_.isUndefined(access_token))
	{
		return res.json({
			 error: {
			 	status_code : 1,
			 	message :"access_token cannot be blank"
			 } 
		});

	}

	
	m.player.findOne({
		where :{
			id:player_id,
			access_token : access_token
		}
	}).then(function(player_data){
		if(player_data)
		{
			return res.json({
				error:{
					status_code:0,
					message:"successfully login"

				},
				data:{
					 avatar_id:player_data.avatar_id,
					 player_id : player_data.id,
					 access_token:access_token			
					 }
			});		
		}
		else
		{
			return res.json({
		 		error: {
		 			status_code : 1,
		 			message :"Player Data not found"
				 } 
			});

		}

	});


	

}