var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.get_statistics = get_statistics ;

function get_statistics(req,res){

	var player_id = req.body.player_id;
	var access_token = req.body.access_token;


	if(_.isUndefined(player_id))
	{
		return res.json({
			 error: {
			 	status_code : 1,
			 	message :"Invalid player_id"
			 } 
		});

	}
	if(_.isUndefined(access_token))
	{
		return res.json({
			 error: {
			 	status_code : 1,
			 	message :"Invalid access_token "
			 } 
		});

	}
	m.player.findOne({
		where:{
			id:player_id,
			access_token:access_token
		}
	}).then(function(player_data){
		if(player_data)
		{
			m.statistics.findOne({
				where:{
					player_id:player_id
				}
			}).then(function(statistics_data){
				if(statistics_data.total_match==0)
				{
					var win_rate = 0;
				}
				else
				{
					var win_rate = (parseInt(statistics_data.total_win) / parseInt(statistics_data.total_match))*100;	

				}
				
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
						var current_rank = check_rank(player_achievement_data.current_exp)
								return res.json({
									error:{
										status_code:0,
										message:"successfully get player statistics"
										
									},
									data:{
										current_rank:current_rank,
										current_exp:player_achievement_data.current_exp,
										win_rate:win_rate,
										total_match:statistics_data.total_match,
										total_goals:statistics_data.total_goals,
										total_block:statistics_data.total_block

									}
								})

							})

						})

					})	




		}
		else
		{
			return res.json({
				error:{
					status_code:1,
					message:"Player does not exist in the database"
				}
			})
		}

	})	
}

function check_rank(exp){

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