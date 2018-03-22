module.exports = function(sequelize,DataTypes){
	var model = sequelize.define('wallet', {
		id : {
			type: DataTypes.INTEGER,
			primaryKey:true,
			autoIncrement:true
		} , 
		player_id : {
			type: DataTypes.INTEGER,
		},
		type : DataTypes.STRING(100),
		balance : DataTypes.DOUBLE,
		created_at : Date(),
		updated_at : Date(),
		deleted_at : Date(),
	},{
		
		tableName: "wallet"
	});
	return model;
}