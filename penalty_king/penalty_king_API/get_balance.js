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
	m.player.findOne({
		where:{
			id:player_id,
			access_token:access_token
		}
	}).then(function(player_data){

		if(player_data)
		{
			m.wallet.findAll({
				where:{
					player_id:player_data.id
						}
			}).then(function(wallet_data){
					var wallet_list=[];
					for(i=0;i<wallet_data.length;i++)
					{
						var data={
						id:wallet_data[i].id,
						type:wallet_data[i].type,
						balance:wallet_data[i].balance
						}
						wallet_list	.push(data)
					}
						return res.json({
						error:{
							status_code:0,
							message:"successfully retrieved balance"
						},
						data:{
							wallet_list:wallet_list
						}
					
				});
				
				
			})
		}
		else
		{

			return res.json({
			 error: {
			 	status_code : 2006,
			 	message :"invalid access_token/player_id "
				 } 
			})

		}

	});
}