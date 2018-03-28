var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.show_friend = show_friend ;
var Worker =  require('worker-middleware').Worker;

var friend_list=[];
var player_info=[];
// var achievement_array=[];
var friend_info=[];

 function show_friend(req,res){
 	var w = new Worker();
 	var obj;


	var player_id=req.body.player_id;


	if(_.isUndefined(player_id))
	{	
			return res.json({
				error: {
			 			status_code : 1006,
			 			message :" player_id cannot be blank"
						}
					})
	}

 	w.do(calculate_total_friend(player_id));
	w.do(check_achievement(req,res)); 
	// w.do(check_player_achievement(req,res));
	w.do(check_player_achievement(req,res));
	w.do(show_list());
	w.do(show_all(req,res));


 	w.run(function(context,err){
		if(err)
			return console.log(err);

	});

}

function calculate_total_friend(player_id)
{
	return function(context,next)
		{		
			m.favorite.findAll({
				where:{
					player_id:player_id,
					deleted_at:null
				}
			}).then(function(favorite_data){
				no = favorite_data.length;
				context.number=no;
				friend_list=[];
				if(_.isUndefined(favorite_data))
				{
					return res.json({
						error: {
					 			status_code : 3006,
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
					context.friend=friend_list;
						next();
					// console.log(context.friend)


					
				}
				
			});

		
		
			
		}

}
function check_achievement(req,res)
{	return function(context,next)
	{	
		m.achievement.findOne({
			where:{
				name:'rank'
			}
		}).then(function(achievement_data){
			if(achievement_data)
			{	var id= achievement_data.id;
				context.achievement_id=id;
				next();
			}
			else
			{
				return res.json({
					error:{
						status_code:3041,
						message:"rank does not found in the database"
					}
				})
			}

			
		})
			
	
				
	}

}
function check_player_achievement(req,res)
{
	return function(context,next)
	{	
			//console.log(context.friend);


		for(i=0;i<context.number;i++)
		{
				m.player_achievement.findOne({
				where:{
					player_id:context.friend[i],
					achievement_id:context.achievement_id
				}
			}).then(function(player_achievement_data){
				if(player_achievement_data)
				{
					current_rank = check_rank(player_achievement_data.current_exp);
					// achievement_array.push(current_rank)
					// context.array=achievement_array;
							
				}
				else
				{
					return res.json({
						error:{
						status_code:3008,
						message:"player_achievement_data does not find in the database"
						}
					})

				}
				
			})
			m.statistics.findOne({
				where:{
						player_id:context.friend[i]
				}
			}).then(function(statistics_data){ 
				if(statistics_data.total_match==0)
				{
						 win_rate = 0;
				}
				else
				{
						 win_rate = (parseInt(statistics_data.total_win) / parseInt(statistics_data.total_match))*100;	

				}
					

			})

			m.player.findOne({
				where:{
					id:context.friend[i]
				}
			}).then(function(player_data){
				if(player_data)
				{
					player_info.push({avatar_id:player_data.avatar_id,id:player_data.id,username:player_data.username,status:player_data.status,win_rate:win_rate,rank:current_rank})
					// context.player_information=player_info;
							
				}

		
			})
		}

		
		next();	

		
		
	

		
	}
		
}

function show_list()
{
	return function(context,next)
	{	
		m.favorite.findOne({
			where:{
				deleted_at:null
			}
		}).then(function(favorite_data){
			friend_info=[];
			if(favorite_data)
			{
				for(i=0;i<context.number;i++)
				{

					friend_info.push(player_info[i])
				}
					next();
			}
		})
		
	}
	

}
function show_all(req,res)
{
	return function(context,next)
	{
		context.show=friend_info;
		console.log(context.show)
		return res.json({
			error:{
				status_code:0,
				message:"successfully retrieve friend_list"
			},
			data:{
				friend_list:context.show,
				player_id:req.body.player_id
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




