var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.menu_api = menu_api ;

function menu_api(req,res){

	var player_id = req.body.player_id;
	var access_token = req.body.access_token;
	var current_rank;
	if(_.isUndefined(player_id))
	{
		return res.json({
			 error: {
			 	status_code : 1,
			 	message :"player_id cannot be blank"
			 } 
		})

	}
	if(_.isUndefined(access_token))
	{
		return res.json({
			 error: {
			 	status_code : 11,
			 	message :"access_token cannot be blank"
			 } 
		})

	}

	m.achievement.findOne({
		where:{
			id:1
			
		}
	}).then(function(achievement_data){
			m.player.findOne({
					where:{
						id:player_id,
						access_token:access_token
					}
				}).then(function(player_data){

					if(player_data)
					{	
						m.player_achievement.findOne({
							where:{
								achievement_id:achievement_data.id,
								player_id:player_data.id
							}
							}).then(function(player_achievement_data){
								 current_rank = check_rank(player_achievement_data.current_exp)						
								m.wallet.findOne({
									where:{
										player_id:player_data.id
											}
										}).then(function(wallet_data){
											return res.json({
												error:{
													status_code:0,
													message:"successfully retrieved"
												},
												data:{
													balance:wallet_data.balance,
													rank:current_rank,
													username:player_data.username
												}
											});
										})
								})
					}
					else
					{

						return res.json({
						 error: {
						 	status_code : 11,
						 	message :"invalid access_token/player_id "
						 } 
					})

					}

				})

	});
	

	

	
	
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