var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.show_friend = show_friend ;
var Worker =  require('worker-middleware').Worker;
var friend_list=[];


 function show_friend(req,res){
 	var w = new Worker();
 	var obj;
	var friend_list=[];
	var player_id=req.body.player_id;

	if(_.isUndefined(player_id))
	{	
			return res.json({
				error: {
			 			status_code : 1,
			 			message :" player_id cannot be blank"
						}
					})
	}
 	// w.do(show_friend_list(req,res));
 	// w.do(show_friend_2(req,res));

 	//w.do find total_friend_number, context.friend_list = [186,188];
 	//for i < context.tfn
 	//	w.do(fucntion(context.friend_list[i]) find player_data
 	//  w.d0 
 	w.do(total_friend_number(player_id));
 	w.do(check_friend_list());
 	w.run(function(context,err){
		if(err)
			return console.log(err);

	});

}

function total_friend_number(player_id)
{
	return function(context,next)
	{	
		m.favorite.findAll({
			where:{
				player_id:player_id,
				deleted_at:null
			}
		}).then(function(favorite_data){
			var no = favorite_data.length;
			context.number=no;

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
					friend_list.push(favorite_data[i].friend_id)
				}
				context.friend_list=friend_list;
				next();
			}
			
		});
	
		
	}

}
function check_friend_list()
{	return function(context,next)
	{	
		
		console.log(context.friend_list);
		next();
	}

}
function show_friend_list(req,res)
{


	return function(context,next)
	{	
 		
 	
					
							
		
		
		m.favorite.findAll({
			where:{
				player_id:player_id,
				deleted_at:null
			}
		}).then(function(favorite_data){
			context.number = favorite_data.length;
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
						console.log(i);
						m.achievement.findOne({
							where:{
								name:'rank'
							}
						}).then(function(achievement_data){
							m.player_achievement.findOne({
								where:{
									player_id:player_data.id,
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
										var name=context.cincai;
										// friend_list.push(obj);
				

										context.name=obj;
										
										console.log(name);
										
										
							});

						});
					});
				}
				

				// console.log(friend_list);


					
			}

			

		});
		next();
	}
	
	
	

}
function show_friend_2(req,res)
{
	return function(context,next)
	{	
		for (var i = 0; i < context.number; i++) {
			friend_list.push(context.name)
		}
		return res.json({
			error:{
				status_code:0,
				message:"successfully showed friend_list"
			},
			data:{
					friend_list:friend_list
			}
		})	
		next();
	}

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




