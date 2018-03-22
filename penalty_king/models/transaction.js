module.exports = function(sequelize,DataTypes){
	var model = sequelize.define('transaction', {
		id : {
			type: DataTypes.INTEGER,
			primaryKey:true,
			autoIncrement:true
		} , 
		player_id : {
			type: DataTypes.INTEGER,
		},
		wallet_id : {
			type: DataTypes.INTEGER,
		},
		type : DataTypes.STRING(100),
		amount  : DataTypes.DOUBLE,
		transaction : DataTypes.STRING(100),
		before_balance : DataTypes.DOUBLE,
		after_balance : DataTypes.DOUBLE,
		created_at : Date(),
		updated_at : Date(),
		deleted_at : Date(),
	},{
		
		tableName: "transaction"
	});
	return model;
}