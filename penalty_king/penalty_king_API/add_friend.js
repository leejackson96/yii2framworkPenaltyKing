var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.add_friend = add_friend ;

 function add_friend(req,res){

 	var player_id = req.body.player_id;
	var friend_username = req.body.friend_username;
 	if(_.isUndefined(player_id))
	{
		return res.json({
			 error: {
	 			status_code : 1006,
	 			message :" player_id cannot be blank"
					} 
			})
	}

 	if(_.isUndefined(friend_username))
	{
		return res.json({
			 error: {
	 			status_code : 1022,
	 			message :" friend_username cannot be blank"
					} 
			})
	}
	
	
	m.player.findOne({
		where:{
			username:friend_username
		}
	}).then(function(player_data){
		if(player_data)
		{
			if(player_data.id==player_id)
			{
				return res.json({
							error:{
								status_code:3022,
								message:"This is your username"

							}
						});
			}
			m.favorite.findOne({
				where:{
					player_id:player_id,
					friend_id:player_data.id
				}
			}).then(function(favorite_data){
				if(favorite_data)
				{	//means he havent add this friend before
					if(favorite_data.deleted_at==null)
					{
						return res.json({
							error:{
								status_code:3006,
								message:"It is existed in your friend_list"

							}
						});
					}
					else
					{	//he added this friend before but he has deleted him
						m.favorite.update({
							deleted_at:null
						},
						{
							where:{
								 id:favorite_data.id
							}
						}).then(function(){
							return res.json({
								error:{
									status_code:0,
									message:"successfully added friend"
									},
								data:{
									player_id:player_id,
									friend_id:player_data.id
									}
						});

						})
					}
						

				}
				else
				{
					m.favorite.create({
						player_id:player_id,
						friend_id:player_data.id,
						created_at:moment().format()
					}).then(function(){
						return res.json({
							error:{
								status_code:0,
								message:"successfully added friend"
								},
							data:{
								player_id:player_id,
								friend_id:player_data.id
								}
						});
					});

				}
			})
				
			
		}
		else
		{
			return res.json({
				error:{
					status_code:3022,
					message:"friend_username not found"
				}
			})
		}
	})





	

}




