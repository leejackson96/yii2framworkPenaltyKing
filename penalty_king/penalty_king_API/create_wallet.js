var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.create_wallet = create_wallet ;

function create_wallet(req,res){

	if(_.isUndefined(req.body.player_id))
	{
		return res.json({
			 error: {
			 	status_code : 1,
			 	message :"player_id cannot be blank"
			 } 
		});

	}
	if(_.isUndefined(req.body.type))
	{
		return res.json({
			 error: {
			 	status_code : 5,
			 	message :"type cannot be blank"
			 } 
		});

	}

	var username = req.body.player_id;
	var type= req.body.type;

	
		if(type=='coin')
		{
			m.wallet.create({
				player_id:player_id,
				type:'coin',
				balance:10000,
				created_at:moment().format()
			}).then(function(){
			return res.json({
				 data: {
				 	status_code :0,
	 				message :"coin wallet has been created" `
							 } 
						});			
			});
		}

		else if(type=='diamond')
		{
			m.wallet.create({
				player_id:player_id,
				type:'diamond',
				balance:300,
				created_at:moment().format()
			}).then(function(){

			return res.json({
				 data: {
				 	status_code :0,
	 				message :"diamond wallet+ has been created"
						 } 
					});			
			});
		}

			
	



	

}


