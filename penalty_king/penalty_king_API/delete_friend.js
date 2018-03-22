var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.delete_friend = delete_friend ;

function delete_friend(req,res){

	var player_id = req.body.player_id;
	var friend_id = req.body.friend_id;

	if(_.isUndefined(req.body.player_id))
	{
		return res.json({
			 error: {
			 	status_code : 1,
			 	message :"player_id cannot be blank"
			 } 
		});

	}

	if(_.isUndefined(req.body.friend_id))
	{
		return res.json({
			 error: {
			 	status_code : 1,
			 	message :"access_token cannot be blank"
			 } 
		});

	}
	
	
	m.favorite.findOne({
		where :{
			player_id:player_id,
			friend_id:friend_id
		}
	}).then(function(player_data){
		if(player_data)
		{
			m.favorite.update({
				deleted_at:moment().format()
			},
			{
				where:{
					player_id:player_id,
					friend_id:friend_id
				}
			}).then(function(){


			return res.json({
						error:{
							status_code:0,
							message:"successfully deleted friend"

						},
						data:{
							player_id:player_data.player_id,
							 friend_id : player_data.friend_id	
							 }
							  });

			})
			
		}
		else
		{
			return res.json({
					 		error: {
					 			status_code : 1,
					 			message :"Invalid player_id/friend_id "
							 } 
						});

		}

	});

	
	

}