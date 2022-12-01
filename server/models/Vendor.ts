import pool from '../database.js';

const Vendor = class Vendor {
  vendor_id: bigint;

  constructor(row: any) {
    this.vendor_id = row.vendor_id;
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

    return new Vendor(rows[0]);
  }

  static async removeVendor(id: bigint) {
    const { rows } = await pool.query(
      `
      DELETE FROM vendors WHERE vendor_id=$1
      RETURNING *
      `,
      [id]
    );

    return new Vendor(rows[0]);
  }

  static async checkIfVendor(id: bigint) {
    const { rows } = await pool.query(
      `
    SELECT * FROM vendors WHERE vendor_id=$1
    `,
      [id]
    );

    if (!rows[0]) {
      throw new Error('Failed to auth');
    } else {
      return new Vendor(rows[0]);
    }
  }

  static async getAllVendors() {
    const { rows } = await pool.query(
      `
      SELECT * FROM vendors
      LEFT JOIN users
      ON vendors.vendor_id = users.id;
      `
    );

    if (!rows[0]) {
      throw new Error('Failed to grab vendors');
    } else {
      return rows.map((row) => {
        const newObj = {
          vendor_id: row.vendor_id,
          vendor_email: row.email,
        };
        return newObj;
      });
    }
  }
};

export default Vendor;
