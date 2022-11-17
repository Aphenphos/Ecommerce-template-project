import e from 'express';
import pool from '../database.js';

const Admin = class Admin {
  id: bigint;
  admin_id: bigint;

  constructor(row: any) {
    this.id = row.id;
    this.admin_id = row.admin_id;
  }

  static async checkIfAdmin(id: bigint) {
    const { rows } = await pool.query(
      `
    SELECT * FROM admins WHERE admin_id=$1
    `,
      [id]
    );
    if (!rows[0]) {
      throw new Error('Failed to Auth');
    } else {
      return new Admin(rows[0]);
    }
  }
};

export default Admin;
