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
    INSERT INTO users (email, password_hash, vendor, admin)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
      [email, passwordHash, false, false]
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

  get passwordHash(): string {
    return this.#passwordHash;
  }
};

export default User;
