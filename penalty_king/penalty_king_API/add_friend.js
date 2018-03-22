var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
var add_friend = require("./add_friend");
exports.add_friend = add_friend ;

 function add_friend(req,res){

 	if(_.isUndefined(req.body.player_id))
	{
		return res.json({
			 error: {
	 			status_code : 1,
	 			message :" game_id cannot be blank"
					} 
			})

 	if(_.isUndefined(req.body.friend_username))
	{
		return res.json({
			 error: {
	 			status_code : 1,
	 			message :" game_id cannot be blank"
					} 
			})
	}
	
	var player_id = req.body.player_id;
	var friend_username = req.body.friend_username;
	m.player.findOne({
		where:{
			username:friend_username
		}
	}).then(function(player_data){
		if(player_data)
		{
			m.player_achievement.findOne({
				
			})
			return res.json({
				error:{
					status_code:0,
					message:"successfully found"
				},
				data:{
					avatar_id:player_data.avatar_id,
					player_id:player_data.id,

				}
				});
		}
		else{
			return res.json({
				error:{
					status_code:2,
					message:"username not found"
				}
			})
		}
	})
	m.favourite.create({
		player_id:player_id,
		username:friend_username,
		created_at:moment().format()
	}).then(function(){

		return res.json({
			error:{
				status_code:0,
				message:"successfully added friend"

			},
			data:{
				player_id:player_id
			}
		});
	});




	

}




