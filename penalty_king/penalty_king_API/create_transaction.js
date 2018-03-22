var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.create_transaction = create_transaction ;

function create_transaction(req,res){

	var player_id = req.body.player_id;
	var amount = req.body.amount;
	var type = req.body.type;
	var method = req.body.method;

	if(_.isUndefined(player_id))
	{
		
			return res.json({
			 error: {
			 	status_code : 1,
			 	message :"player_id cannot be blank"
			 } 
			})
	}

	if(_.isUndefined(amount))
	{
		
			return res.json({
			 error: {
			 	status_code : 4,
			 	message :"amount cannot be blank"
			 } 
			})
	}
	if(_.isUndefined(type))
	{
		
			return res.json({
			 error: {
			 	status_code : 5,
			 	message :"type cannot be blank"
			 } 
			})
	}
	if(_.isUndefined(method))
	{
		
			return res.json({
			 error: {
			 	status_code : 6,
			 	message :"method cannot be blank"
			 } 
				})
	}
	m.player.findOne({
		where:{
			id:player_id
		}
	}).then(function(player_data){
		if(!player_data)
		{	
			return res.json({
				error:{
					status_code:1,
					message:"player id does not exist"
				}
			})
		}
	});
	if(method==1)
	{
		
		m.wallet.findOne({
			where:{
				player_id:player_id
			}
		}).then(function(wallet_data)
		{
			if(wallet_data)
			{
				var new_balance = parseFloat(wallet_data.coin_balance) +parseFloat(amount)  
				
			

					m.wallet.update(
						{ 
							coin_balance: new_balance
						},
						{ 
							where: {player_id:player_id
							}
						});
				m.transaction.create({ 
					wallet_id:wallet_data.id,
					player_id:wallet_data.player_id,
					amount:amount,
					type:type,
					before_balance:wallet_data.coin_balance,
					after_balance:new_balance,
					created_at:moment().format()}).then(function()
				{
					return res.json({
					 data: {
					 	status_code:0,
					 	message :"successfully created a transaction"
					 } 
				})

				});
			}



		})
	}
	else if(method==2)
	{
		
		m.wallet.findOne({
			where:{
				player_id:player_id
			}
		}).then(function(wallet_data)
		{
			if(wallet_data)
			{
				var new_balance = parseFloat(wallet_data.coin_balance) -parseFloat(amount)  
				
			

					m.wallet.update(
						{ 
							coin_balance: new_balance
						},
						{ 
							where: {player_id:player_id
							}
						});
				m.transaction.create({ 
					wallet_id:wallet_data.id,
					player_id:wallet_data.player_id,
					amount:amount,
					type:type,
					before_balance:wallet_data.coin_balance,
					after_balance:new_balance,
					created_at:moment().format()}).then(function()
				{
					return res.json({
					 data: {
					 	status_code:0,
					 	message :"successfully created a transaction"
					 } 
				})

				});
			}



		})
	}

	
	
	
}