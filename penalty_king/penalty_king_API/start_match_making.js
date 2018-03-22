var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.start_match_making = start_match_making ;

function start_match_making(req,res){


	var player_id = req.body.player_id;
	var access_token = req.body.access_token;
	var room_type = req.body.room_type;
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
	if(_.isUndefined(room_type))
	{
		return res.json({
			 error: {
			 	status_code : 14,
			 	message :"room_type cannot be blank"
			 } 
		})

	}
	m.match_type.findOne({
		where:{
			name:room_type
		}
	}).then(function(match_type_data){
		if(match_type_data)
		{
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
									var new_balance = parseFloat(wallet_data.balance) -parseFloat(match_type_data.buy_in)  
									
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
										amount:match_type_data.buy_in ,
										transaction:'out',
										before_balance:wallet_data.balance,
										after_balance:new_balance,
										created_at:moment().format()
										}).then(function(transaction_data){
											return res.json({
												error:{
													status_code:0,
													message:"started matchmaking,transaction created"
												},
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
								 		status_code : 11,
								 		message :"invalid access_token/player_id "
								 		} 
								});
							}
						});

			}
				else
				{
					return res.json({
							error: {
						 		status_code : 14,
						 		message :"invalid room_type "
						 		} 
						});
				}


	});
	

	

	
	
}

