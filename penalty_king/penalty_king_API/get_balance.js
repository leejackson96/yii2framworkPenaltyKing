var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.get_balance = get_balance ;

function get_balance(req,res){
	var player_id = req.body.player_id;
	var access_token = req.body.access_token;
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
		m.wallet.findOne({
			where:{
				player_id:player_data.id
					}
				}).then(function(wallet_data){

					return res.json({
						error:{
							status_code:0,
							message:"successfully retrieved balance"
						},
						data:{
							type:wallet_data.type,
							balance:wallet_data.balance
						}
					});
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

	

	
	
}