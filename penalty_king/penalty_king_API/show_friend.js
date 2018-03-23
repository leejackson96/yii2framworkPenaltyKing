var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.show_friend = show_friend ;
var Worker =  require('worker-middleware').Worker;
var friend_list=[];

 function show_friend(req,res){
 


}
		if(_.isUndefined(player_id))
		{	
				return res.json({
					error: {
				 			status_code : 1,
				 			message :" player_id cannot be blank"
							}
						}
				})
					
							
		}
		
		m.favorite.findAll({
			where:{
				player_id:player_id,
				deleted_at:null
			}
		}).then(function(favorite_data){
			if(_.isUndefined(favorite_data))
			{
				
				var message={ 
					error: {
			 			status_code : 19,
			 			message :"friend does not exist in the friend list"
						},
					data :{
						sid:socket_id
						} 
					}
					callback(message);
			}
			else
			{
			

				for(i=0;i<favorite_data.length;i++)
				{
					m.player.findOne({
						where:{
							id:favorite_data[i].friend_id
						}
					}).then(function(player_data){
						m.achievement.findOne({
							where:{
								name:'rank'
							}
						}).then(function(achievement_data){
							m.player_achievement.findOne({
								where:{
									player_id:player_id,
									achievement_id:achievement_data.id
									}
							}).then(function(player_achievement_data){
								current_rank = check_rank(player_achievement_data.current_exp);
									 var obj = {
											avatar_id:player_data.avatar_id,
											player_id:player_data.id,
											player_status:player_data.status,
											player_username:player_data.username,
											player_rank:current_rank
											}
								
								friend_list.push(obj);
								context.testing=friend_list;
							})

						})
					})
				}
				next();				
			}

		});
	
	


function check_rank(exp)
{
	if(exp<30)
	{
		return "bronze"
	}
	else if(exp<80)
	{
		return "silver"
	}
	else if(exp<130)
	{
		return "gold"
	}
}




