module.exports = function(sequelize,DataTypes){
	var model = sequelize.define('favorite', {
		id : {
			type: DataTypes.INTEGER,
			primaryKey:true,
			autoIncrement:true
		} , 
		player_id :DataTypes.INTEGER,
		friend_id : DataTypes.INTEGER,
		created_at :Date(),
		updated_at : Date(),
		deleted_at : Date(),
	},{
		tableName: "favorite"
	});
	return model;
}