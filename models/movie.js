
'use strict';
const moment = require('moment');
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Movie extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Movie.belongsTo(models.User, {
                as: 'author',
                foreignKey: 'author_id'
            });
            Movie.hasMany(models.Comment, {
                as:'comments',
                foreignKey:'movie_id'
            });
        }
        isOwnedBy(user){
            return this.author_id === user.id
        }
    };
    Movie.init({
        title: DataTypes.STRING,
        poster: DataTypes.STRING,
        subject: DataTypes.STRING,
        review: DataTypes.STRING,
        author_id: DataTypes.INTEGER,
        date_watched: DataTypes.DATE,
        friendlyPublishedDate: {
            type: DataTypes.VIRTUAL,
            get(){
                return moment(this.published_on).format('MMMM Do, YYYY')
            }
        }
    }, {
        sequelize,
        modelName: 'Movie',
        timestamps: false,
        tableName: 'movie',
    });
    return Movie;
};