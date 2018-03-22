var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
var lol = require("./create_player");
exports = module.exports = {};
exports.generate_robot_name = generate_robot_name ;

function generate_robot_name(check_robot_name, callback){
	//console.log(check_robot_name);
	var name;

 	var robot_name = ['james','tim','alex','catherine','jane','emily'];
	var number = Math.floor(Math.random() * robot_name.length);
	var random_number = Math.floor(Math.random() * 999)+1;

	m.player.findOne({
		where:{
			username:check_robot_name
		}
	}).then(function(robot_data){
		if(robot_data)
		{
	var robot_name = ['james','tim','alex','catherine','jane','emily'];
	var number = Math.floor(Math.random() * robot_name.length);
	var random_number = Math.floor(Math.random() * 999)+1;
	generate_robot_name(robot_name[number]+random_number,lol.lol);

		console.log("exsited");
		}
		else
		{	
			// name=check_robot_name;
			callback(null,check_robot_name);
		}
	});

}

