const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/acme_country_club_db');
const { DataTypes: { STRING, UUID, UUIDV4, DATE } } = Sequelize;


const Facility = db.define('facility', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    fac_name: {
        type: STRING(100),
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

const Members = db.define('member', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    first_name: {
        type: STRING(20),
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

const Bookings = db.define('booking', {
    id: {
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    },
    startTime: {
        type: DATE
    },
    endTime: {
        type: DATE
    }
})

const members = ['moe', 'lucy', 'larry', 'ethyl'];
const facilities = ['tennis', 'ping-pong', 'raquet-ball', 'bowling'];

Members.belongsTo(Members, {as: 'sponsoredBy'});
Members.hasMany(Members, { as: 'sponsoring', foreignKey: 'sponsoredById'});
Bookings.belongsTo(Members, {as: 'bookedBy'});
Bookings.belongsTo(Facility);

const syncAndSeed = async () => {
    await db.sync( {force: true} );
    const [moe, lucy, larry, ethyl] = await Promise.all(members.map(first_name => Members.create( {first_name} )));
    moe.sponsorId = lucy.id;
    larry.sponsorId = lucy.id;
    ethyl.sponsorId = moe.id;
    await Promise.all([moe.save(), larry.save(), ethyl.save()]);
    const [tennis, pingPong, raquetBall, bowling] = await Promise.all(facilities.map(fac_name => Facility.create( {fac_name} )));
}

module.exports = {
    syncAndSeed,
    models: {
        Facility,
        Members,
        Bookings
    }
}