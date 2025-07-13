const { Sequelize } = require('sequelize');
require('dotenv').config();

// Opsi 1: Menggunakan MYSQL_URL (paling mudah)
const sequelize = process.env.MYSQL_URL
  ? new Sequelize(process.env.MYSQL_URL, {
      dialect: 'mysql',
      logging: false,
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    })
  : new Sequelize(
      // Opsi 2: Menggunakan individual variables
      process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE,
      process.env.MYSQLUSER,
      process.env.MYSQLPASSWORD || process.env.MYSQL_ROOT_PASSWORD,
      {
        host: process.env.MYSQLHOST,
        port: process.env.MYSQLPORT || 3306,
        dialect: 'mysql',
        logging: false,
        dialectOptions: {
          ssl: {
            rejectUnauthorized: false
          }
        }
      }
    );

// Debug logging untuk memastikan variables terbaca
console.log('🔍 Database Configuration Check:');
console.log('MYSQL_URL:', process.env.MYSQL_URL ? 'SET' : 'NOT SET');
console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE || 'NOT SET');
console.log('MYSQLDATABASE:', process.env.MYSQLDATABASE || 'NOT SET');
console.log('MYSQLUSER:', process.env.MYSQLUSER || 'NOT SET');
console.log('MYSQLHOST:', process.env.MYSQLHOST || 'NOT SET');
console.log('MYSQLPORT:', process.env.MYSQLPORT || 'NOT SET');
console.log('MYSQLPASSWORD:', process.env.MYSQLPASSWORD ? 'SET' : 'NOT SET');
console.log('MYSQL_ROOT_PASSWORD:', process.env.MYSQL_ROOT_PASSWORD ? 'SET' : 'NOT SET');

sequelize
  .authenticate()
  .then(() => console.log('✅ Connected to MySQL with Sequelize'))
  .catch(err => {
    console.error('❌ Unable to connect to DB:', err.message);
    console.error('Full error:', err);
  });

module.exports = sequelize;