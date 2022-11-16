import pool from '../database.js';

const Admin = class Admin {
  id: bigint;

  constructor(row: any) {
    this.id = row.id;
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
      DELETE FROM vendors WHERE vendor_id=$1
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
