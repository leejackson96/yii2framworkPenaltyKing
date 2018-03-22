var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.cancel_match_making = cancel_match_making ;

function cancel_match_making(req,res){

	var transaction_id = req.body.transaction_id;
	var player_id = req.body.player_id;
	var wallet_id = req.body.wallet_id;
	var access_token = req.body.access_token;

	if(_.isUndefined(transaction_id))
	{
		return res.json({
			error: {
			 	status_code : 1,
			 	message :"transaction_id cannot be blank"
			 } 
		})

	}

	if(_.isUndefined(wallet_id))
	{
		return res.json({
			error: {
			 	status_code : 1,
			 	message :"wallet_id cannot be blank"
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

	m.player.findOne({
		where:{
			id:player_id,
			access_token:access_token
		}
	}).then(function(player_data){
		if(player_data)
		{
			m.transaction.findOne({
				where:{
					id:transaction_id,
					wallet_id:wallet_id,
					player_id:player_id
				}
			}).then(function(transaction_data){
				m.wallet.update({
						balance: transaction_data.before_balance
					},
					{
						where:{
							id:wallet_id,
							player_id:player_id
						}
					}
			).then(function(wallet_data){
				if(wallet_data)
				{
						m.transaction.create({ 
							wallet_id:wallet_id,
							player_id:player_id,
							type:transaction_data.type,
							amount:transaction_data.amount ,
							transaction:'in',
							before_balance:transaction_data.after_balance,
							after_balance:transaction_data.before_balance,
							created_at:moment().format()
						}).then(function(new_transaction_data){
							return res.json({
								error:{
									status_code:0,
									message:"successfully canceled match making"
								},
								data:{
									transaction_id:new_transaction_data.id,
									wallet_id:wallet_id,
									player_id:player_data.id
								}
							});

						});
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