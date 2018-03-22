module.exports = function(sequelize,DataTypes){
	var model = sequelize.define('player', {
		id : {
			type: DataTypes.INTEGER,
			primaryKey:true,
			autoIncrement:true
		} , 
		avatar_id : {
			type: DataTypes.INTEGER
		},
		username : DataTypes.STRING(100),
		password : DataTypes.STRING(200),
		facebook_id : DataTypes.STRING(100),
		status : DataTypes.STRING(100),
		country : DataTypes.STRING(100),
		ip_address : DataTypes.STRING(100),
		access_token : DataTypes.STRING(100),
		is_bot : DataTypes.INTEGER(1),
		is_guest : DataTypes.INTEGER(1),
		last_login_at : Date(),
		created_at : Date(),
		updated_at : Date(),
		deleted_at : Date(),
	},{
		
		tableName: "player"
	});
	return model;
}