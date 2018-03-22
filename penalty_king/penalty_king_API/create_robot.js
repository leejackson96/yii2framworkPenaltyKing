var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
//var generate_robot_name = require("./generate_robot_name");
var Worker =  require('worker-middleware').Worker;

exports = module.exports = {};
exports.create_robot = create_robot ;

function check_robot_name(name){


	return function(context,next){
	 var robot_name = ['james','tim','alex','catherine','jane','emily'];
	var number = Math.floor(Math.random() * robot_name.length);
	var random_number = Math.floor(Math.random() * 999)+1;
	var check_robot=robot_name[number]+random_number;
		m.player.findOne({
			where:{
				username:check_robot
			}
		}).then(function(d){
			if(d)
			{

			}
			else
			{	
				context[name]=check_robot;
			}
			
			next();
		});

	}
}


function insert_robot(){
	return function(context,next){

		m.player.create({
			avatar_id:1,
			username:context.robot,
			password:" ",
			facebook_id:"-",
			status:"available",
			country:"-",
			ip_address:"-",
			access_token:"a"+  context.robot,
			is_bot:1,
			is_guest:0,
			last_login_at:moment().format(),
			created_at:moment().format()
			}).then(function(){
				next();
			})
		
	}
}

function create_robot(req,res)
{
	var w = new Worker();

	w.do(check_robot_name("robot"));
	w.do(insert_robot());
	w.run(function(context,err){
		if(err)
			return console.log(err);

	});
	
}
