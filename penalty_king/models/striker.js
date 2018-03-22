module.exports = function(sequelize,DataTypes){
	var model = sequelize.define('striker', {
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
		
		tableName: "striker"
	});
	return model;
}