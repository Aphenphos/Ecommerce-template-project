import pool from '../database.js';

const User = class User {
  id: bigint;
  email: string;
  #passwordHash: string;

  constructor(row: any) {
    this.id = row.id;
    this.email = row.email;
    this.#passwordHash = row.password_hash;
  }

  static async insert({
    email,
    passwordHash,
  }: {
    email: string;
    passwordHash: string;
  }) {
    const { rows } = await pool.query(
      `
    INSERT INTO users (email, password_hash)
    VALUES ($1, $2)
    RETURNING *
    `,
      [email, passwordHash]
    );

    return new User(rows[0]);
  }

  static async getByEmail(email: string) {
    const { rows } = await pool.query(
      `
    SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (!rows[0]) return null;

    return new User(rows[0]);
  }

  static async getByEmailSearch(email: string) {
    const emailInp = `%${email}%`;
    const { rows } = await pool.query(
      `
      SELECT * FROM users WHERE email LIKE $1
      `,
      [emailInp]
    );
    if (!rows[0]) return null;

    return rows.map((row) => new User(row));
  }

  static async removeUser(id: bigint) {
    const { rows } = await pool.query(
      `
    DELETE FROM users WHERE id=$1
    RETURNING *
    `,
      [id]
    );
    return new User(rows[0]);
  }

  get passwordHash(): string {
    return this.#passwordHash;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
    SELECT * FROM users`
    );

    if (!rows[0]) return null;

    return rows.map((row) => new User(row));
  }
};
export default User;
