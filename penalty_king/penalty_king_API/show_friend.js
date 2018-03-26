var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.show_friend = show_friend ;
var Worker =  require('worker-middleware').Worker;
var friend_list=[];

 function show_friend(req,res){
 	var w = new Worker();
 	var player_id= req.body.player_id;
	w.do(push_into_array(req,res,player_id));
	w.do(returnback(res));
	w.run(function(context,err){
		if(err)
			return console.log(err);

	});
}
function push_into_array(req,res,player_id)
{		

 		var obj;
 		var friend_list=[];
		return function(context,next){
 	
		if(_.isUndefined(player_id))
		{	
				return res.json({
					error: {
				 			status_code : 1,
				 			message :" player_id cannot be blank"
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

				return res.json({
					error: {
				 			status_code : 1,
				 			message :"this player does not have friend"
							}
						})
				
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
									  obj = {
											avatar_id:player_data.avatar_id,
											player_id:player_data.id,
											player_status:player_data.status,
											player_username:player_data.username,
											player_rank:current_rank
											}
									
										friend_list.push(obj);
										console.log(friend_list);
										
										
							})

						})
					})
				}
				next();
				// console.log(friend_list);


					
			}
			

		});
	}
	
	

}
function returnback(res)
{		console.log(friend_list);
					return res.json({
							error:{
								status_code:0,
								message:"successfully showed friend_list"
							},
							data:{
									friend_list:friend_list
							}
						})	
}

function check_rank(exp)
{
	if(exp<30)
	{
		return 0
	}
	else if(exp<80)
	{
		return 1
	}
	else if(exp<130)
	{
		return 2
	}
}




