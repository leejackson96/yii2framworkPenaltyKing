var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.update_avatar = update_avatar ;

function update_avatar(req,res){

	var player_id = req.body.player_id;
	var avatar_id = req.body.avatar_id;


	if(_.isUndefined(avatar_id))
	{
		return res.json({
			 error: {
			 	status_code : 1000,
			 	message :"avatar_id cannot be blank"
			 } 
		});

	}
	m.avatar.findOne({
		where:{
			id:avatar_id
		}
	}).then(function(avatar_data){
		if(avatar_data)
		{
			m.player.update({ 
				avatar_id: avatar_id
			},
			{
				where:{
					id:player_id
				}
			}).then(function()
			{
				return res.json({
				 error: {
				 	status_code : 0,
				 	message :"successfully updated an avatar of a player"
					 } 
				});
			})

		}
		else
		{
			return res.json({
				error:{
					status_code:3000,
					message:"avatar_id does not exist"
				}
			})
		}
	})
	

	
	
}