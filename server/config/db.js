const { Pool } = require("pg");
const bcrypt = require("bcrypt");

const {
  DB_USER,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
} = require("../constants/env.constant");

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

pool
  .connect()
  .then(() => {
    console.log("✅ Connected to the database");

    // Ensure admin table exists
    return pool.query(`
      CREATE TABLE IF NOT EXISTS admin (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);
  })
  .then(async () => {
    // Use environment variables
    const adminEmail = ADMIN_EMAIL;
    const adminPassword = ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error(
        "⚠️ ADMIN_EMAIL or ADMIN_PASSWORD is missing in .env file!"
      );
      process.exit(1);
    }

    // Check if admin already exists
    const adminCheck = await pool.query(
      `SELECT * FROM admin WHERE email = $1`,
      [adminEmail]
    );
    if (adminCheck.rowCount === 0) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      // Insert default admin
      await pool.query(`INSERT INTO admin (email, password) VALUES ($1, $2)`, [
        adminEmail,
        hashedPassword,
      ]);
      console.log(`✅ Default admin created: ${adminEmail}`);
    }
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  });

module.exports = pool;
