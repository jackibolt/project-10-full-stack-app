
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'fsjstd-restapi.db',
    logging: false,
});

const db = {
    sequelize,
    Sequelize,
    models: {},
};

// add models to databasd
db.models.Course = require('./models/Course.js')(sequelize);
db.models.User = require('./models/User.js')(sequelize);

// create associations
db.models.Course.associate(db.models);
db.models.User.associate(db.models);


module.exports = db;