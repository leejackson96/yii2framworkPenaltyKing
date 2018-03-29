var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.exit_game = exit_game ;

function exit_game(req,res){
	var player_id =req.body.player_id;

		m.player.findOne({
			where:{
				id:player_id
			}
		}).then(function(player_data){
				if(player_data)
				{
					m.player.update(
					{
						status:"offline",
						last_login_at:moment().format()
					},
					{
						where:{
							id:player_id,
						}
					})
					return res.json({
						error:{
							status_code:0,
							message:"successfully exit game"
						},
						data:{
							player_id:player_data.id
						}
					})

				}
				else
				{
					return res.json({
						error:{
							status_code:2006,
							message:"invalid player id"
						}
					})

				}

		})
	
	
	
}

