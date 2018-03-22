module.exports = function(sequelize,DataTypes){
	var model = sequelize.define('player_in_app_purchase', {
		id : {
			type: DataTypes.INTEGER,
			primaryKey:true,
			autoIncrement:true
		} , 
		in_app_purchase_id:DataTypes.INTEGER,
		player_id:DataTypes.INTEGER,
		wallet_id: DataTypes.INTEGER,
		paid_amount : DataTypes.DOUBLE,
		amount : DataTypes.DOUBLE,
		created_at : Date(),
		updated_at : Date(),
		deleted_at : Date(),
	},{
		
		tableName: "player_in_app_purchase"
	});
	return model;
}