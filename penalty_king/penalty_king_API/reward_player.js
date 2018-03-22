var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.reward_player = reward_player ;

function reward_player(req,res){


	var player_id = req.body.player_id;
	var access_token = req.body.access_token;
	var result_id = req.body.result_id;
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
	if(_.isUndefined(result_id))
	{
		return res.json({
			 error: {
			 	status_code : 1,
			 	message :"result_id cannot be blank"
			 } 
		})

	}
	m.player.findOne({
		where:{
			id:player_id,
			access_token:access_token
		}
	}).then(function(player_data){

		if(player_data)
		{
		m.wallet.findOne({
			where:{
				player_id:player_data.id
					}
				}).then(function(wallet_data){
					var amount;
					m.result.findOne({
						where:{
							id:result_id
						}
					}).then(function(result_data){
						amount=result_data.pot_won;
					});
					var new_balance = parseFloat(wallet_data.balance) +parseFloat(amount)  
				
				m.wallet.update(
						{ 
							balance: new_balance
						},
						{ 
							where: {
								player_id:player_id
							}
						});

	
					m.transaction.create({ 
						wallet_id:wallet_data.id,
						player_id:wallet_data.player_id,
						type:room_type,
						amount:amount,
						transaction:'in',
						before_balance:wallet_data.balance,
						after_balance:new_balance,
						created_at:moment().format()});	
									
					return res.json({
						error:{
							status_code:0,
							message:"successfully reward player"
						},
						data:{
							player_id:wallet_data.player_id,
							access_token:access_token
							}
					});
				});

		}
		else
		{

			return res.json({
				error: {
			 		status_code : 11,
			 		message :"invalid access_token/player_id "
				 } 
				});

		}

	});

	

	
	
}