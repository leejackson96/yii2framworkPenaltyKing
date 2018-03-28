var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.buy_item = buy_item ;

function buy_item(req,res){


	var player_id = req.body.player_id;
	var access_token = req.body.access_token;
	var amount = req.body.amount;

	console.log(player_id +'\n'+access_token+'\n'+amount);
	if(_.isUndefined(player_id))
	{
		return res.json({
			 error: {
			 	status_code : 1006,
			 	message :"player_id cannot be blank"
			 } 
		})
	}
	if(_.isUndefined(access_token))
	{
		return res.json({
			 error: {
			 	status_code : 1031,
			 	message :"access_token cannot be blank"
			 } 
		})

	}
	if(_.isUndefined(amount))
	{
		return res.json({
			 error: {
			 	status_code : 1028,
			 	message :"amount cannot be blank"
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
					var new_balance = parseFloat(wallet_data.balance) -parseFloat(amount)  
					
					m.wallet.update(
							{ 
								balance: new_balance
							},
							{ 
								where: {
									player_id:player_data.id
								}
							});

						
					m.transaction.create({ 
						wallet_id:wallet_data.id,
						player_id:wallet_data.player_id,
						type:'coin',
						amount:amount ,
						transaction:'out',
						before_balance:wallet_data.balance,
						after_balance:new_balance,
						created_at:moment().format()
						}).then(function(transaction_data){
							return res.json({
								data:{
									transaction_id:transaction_data.id,
									player_id:player_data.id,
									wallet_id:wallet_data.id

								}
							});

						});
				});
			}
			else
			{
				return res.json({
					error: {
				 		status_code : 2006,
				 		message :"invalid access_token/player_id "
				 		} 
				});
			}
	});

	

	
	
}