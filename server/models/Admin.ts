import pool from '../database.js';

const Admin = class Admin {
  id?: bigint;
  admin_id?: bigint;
  vendor_id?: bigint;
  email?: string;

  constructor(row: any) {
    this.id = row.id || undefined;
    this.admin_id = row.admin_id || undefined;
    this.vendor_id = row.vendor_id || undefined;
    this.email = row.email || undefined;
  }

  static async removeUser(id: bigint) {
    const { rows } = await pool.query(
      `
    DELETE FROM users WHERE AND id=$1
    RETURNING *
    `,
      [id]
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
    console.log('insql', id);
    const { rows } = await pool.query(
      `
    SELECT * FROM admins WHERE admin_id=$1
    `,
      [id]
    );
    console.log('-----SQL------', new Admin(rows[0]));
    return new Admin(rows[0]);
  }
};

export default Admin;
