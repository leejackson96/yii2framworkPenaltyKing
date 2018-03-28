var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.start_game = start_game ;

function start_game(req,res){


	var player_id = req.body.player_id;
	var access_token = req.body.access_token;
	var pot_value = req.body.pot_value;
	var game_id = req.body.game_id;
	var room_type= "";
	if(_.isUndefined(game_id))
	{
		return res.json({
			 error: {
			 	status_code : 1016,
			 	message :"game_id cannot be blank"
			 } 
		})

	}
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
	if(_.isUndefined(pot_value))
	{
		return res.json({
			 error: {
			 	status_code : 1039,
			 	message :"pot_value cannot be blank"
			 } 
		})

	}
	if(game_id==1)
	{
		if(pot_value==1)
		{
			room_type="novice"
		}
		else if(pot_value==2)
		{
			room_type="amateur"
		}
		else if(pot_value==3)
		{
			room_type="medium"
		}
		else if(pot_value==4)
		{
			room_type="pro"
		}
		else if(pot_value==5)
		{
			room_type="world class"
		}
		else
		{
			return res.json({
				error:{
					status_code:2039,
					message:"invalid pot_value"
				}
			})

		}

	}
	else if(game_id==1)
	{
		if(pot_value==1)
		{
			room_type=""
		}
		else if(pot_value==2)
		{
			room_type=""
		}
		else if(pot_value==3)
		{
			room_type=""
		}
		else if(pot_value==4)
		{
			room_type=""
		}
		else if(pot_value==5)
		{
			room_type=""
		}
		else
		{
			return res.json({
				error:{
					status_code:2039,
					message:"invalid pot_value"
				}
			})

		}

	}
	else
	{
		return res.json({
			error:{
				status_code:2016,
				message:"invalid game_id"
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
							player_id:player_data.id,
							type:"coin"
								}
					}).then(function(wallet_data){
						if(wallet_data)
						{
								var new_balance = parseFloat(wallet_data.balance) -parseFloat(match_type_data.buy_in)  
							
							m.wallet.update(
									{ 
										balance: new_balance
									},
									{ 
										where: {
											player_id:player_data.id,
											type:"coin"
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
										wallet_id:wallet_data.id,

									}
								});

							});
						}
						else
						{
							return res.json({
									error:{
										status_code:3002,
										message:"wallet_data does not found in the database"
									}
								});
						}
						
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
		else
		{
			return res.json({
					error: {
				 		status_code : 2039,
				 		message :"invalid room_type "
				 		} 
				});
		}

	});
	

	

	
	
}

