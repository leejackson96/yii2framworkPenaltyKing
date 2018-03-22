module.exports = function(sequelize,DataTypes){
	var model = sequelize.define('avatar', {
		id : {
			type: DataTypes.INTEGER,
			primaryKey:true,
			autoIncrement:true
		} , 
		name : DataTypes.STRING(100),
		created_at : Date(),
		updated_at : Date(),
		deleted_at : Date(),
	},{
		
		tableName: "avatar"
	});
	return model;
}