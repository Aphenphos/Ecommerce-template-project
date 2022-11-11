import pool from '../database';

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
};

export default User;
