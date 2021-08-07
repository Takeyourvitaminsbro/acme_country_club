const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/acme_country_club_db');
const { STRING, UUID, UUIDV4, DATE } = Sequelize.DataTypes;


const Facilities = db.define('facility', {
    id: {
        type: UUID,
        primaryKey: true
    },
    fac_name: {
        type: STRING(100),
        unique: true,
        allowNull: false
    }
})

const Members = db.define('member', {
    id: {
        type: UUID,
        primaryKey: true
    },
    first_name: {
        type: STRING(20),
        unique: true,
        allowNull: false
    }
})

const Bookings = db.define('booking', {
    startTime: DATE,
    endTime: DATE
})

Members.belongsTo(Members, {as: 'sponsor'});
Bookings.belongsTo(Members, {as: 'bookedBy'});
Bookings.belongsTo(Facilities, {as: 'facility'});

const syncAndSeed = async () => {
    await db.sync( {force: true} );
}

module.exports = {
    syncAndSeed
}