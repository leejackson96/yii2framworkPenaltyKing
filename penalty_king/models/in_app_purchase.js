module.exports = function(sequelize,DataTypes){
	var model = sequelize.define('in_app_purchase', {
		id : {
			type: DataTypes.INTEGER,
			primaryKey:true,
			autoIncrement:true
		} , 
		price : DataTypes.STRING(100),
		type : DataTypes.STRING(100),
		amount : DataTypes.DOUBLE,
		is_promo : DataTypes.INTEGER(1),
		created_at : Date(),
		updated_at : Date(),
		deleted_at : Date(),
	},{
		
		tableName: "avatar"
	});
	return model;
}