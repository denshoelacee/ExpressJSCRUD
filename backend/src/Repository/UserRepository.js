import supabase from "../config/db.js";
import pool from "../config/db.js";
class UserRepository {

  async createUser(user) {
    const {first_name,last_name,email, password } = user;
    const result = await pool.query(
      'INSERT INTO users (first_name,last_name,email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [first_name,last_name,email, password]
    );
    return result.rows[0];
  }

  async findByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }

  async findById(user_id) {
    const result = await pool.query(
      "SELECT first_name, last_name, email FROM users WHERE user_id = $1",
      [user_id]
    );
    return result.rows[0];
  }

}

export default new UserRepository();