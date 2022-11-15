import pool from '../database.js';

const Admin = class Admin {
  id?: bigint;
  admin_id?: bigint;
  vendor_id?: bigint;

  constructor(row: any) {
    this.id = row.id;
    this.admin_id = row.admin_id;
    this.vendor_id = row.vendor_id;
  }

  static async removeUser(email: string, id: bigint) {
    const { rows } = await pool.query(
      `
    DELETE FROM users WHERE email=$1 AND id=$2
    RETURNING *
    `,
      [email, id]
    );
    return new Admin(rows[0]);
  }

  static async makeVendor(id: bigint) {
    const { rows } = await pool.query(
      `
    INSERT INTO vendors (vendor_id)
    VALUES ($1)
    RETURNING *
    `,
      [id]
    );

    return new Admin(rows[0]);
  }

  static async removeVendor(id: bigint) {
    const { rows } = await pool.query(
      `
      DELETE FROM vendors WHERE id=$1
      RETURNING *
      `,
      [id]
    );

    return new Admin(rows[0]);
  }

  static async checkIfAdmin(id: bigint) {
    const { rows } = await pool.query(
      `
    SELECT * WHERE admin_id=$1
    RETURNING *
    `,
      [id]
    );
    return new Admin(rows[0]);
  }
};

export default Admin;
