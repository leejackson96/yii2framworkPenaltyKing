var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.create_in_app_purchase = create_in_app_purchase ;

function create_in_app_purchase(req,res){

	var price = req.body.price;
	var type=req.body.type;
	var amount = req.body.amount;
	var is_promo = req.body.is_promo;


	if(_.isUndefined(price))
	{
		
			return res.json({
			 error: {
			 	status_code : 15,
			 	message :"price cannot be blank"
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
	if(_.isUndefined(paid_amount))
	{
		
			return res.json({
			 error: {
			 	status_code : 7,
			 	message :"paid_amount cannot be blank"
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
				m.in_app_purchase.create({ 
					wallet_id:wallet_data.id,
					player_id:wallet_data.player_id,
					paid_amount:paid_amount,
					amount:amount,
					created_at:moment().format()}).then(function()
				{
					return res.json({
					 data: {
					 	status_code:0,
					 	message :"successfully created an in_app_purchase"
					 } 
				})

				});
			}



		})

		

	
	
	
}