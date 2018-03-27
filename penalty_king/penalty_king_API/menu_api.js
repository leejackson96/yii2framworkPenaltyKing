var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.menu_api = menu_api ;

function menu_api(req,res){
	var game_id=req.body.game_id;
	var player_id = req.body.player_id;
	var access_token = req.body.access_token;
	var current_rank;
	if(_.isUndefined(game_id))
	{
		return res.json({
			 error: {
			 	status_code : 1,
			 	message :"game_id cannot be blank"
			 } 
		})

	}
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
	if(game_id==1)
	{
			m.achievement.findOne({
				where:{
					name:"rank"
					
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
																avatar_id:player_data.avatar_id,
																username:player_data.username,
																rank:current_rank,
																balance:wallet_data.balance
																
																
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
	else if(game_id==2)
	{
		var wallet_list=[];
		m.player.findOne({
			where:{
				id:player_id,
				access_token:access_token
			}
		}).then(function(player_data){
			m.wallet.findAll({
				where:{
					player_id:player_id
				}
			}).then(function(wallet_data){
				for(i=0;i<wallet_data.length;i++)
				{
					var data={
						id:wallet_data[i].id,
						type:wallet_data[i].type,
						balance:wallet_data[i].balance
					}
					wallet_list.push(data)

				}
				return res.json({
					error:{
						status_code:0,
						message:"successfully retrieved menu_api"
					},
					data:{
						avatar_id:player_data.avatar_id,
						username:player_data.username,
						wallet_list:wallet_list
					}
					
				});

			});
		});

	}

			

	
	
}

function check_rank(exp){

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