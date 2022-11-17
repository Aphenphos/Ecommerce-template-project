import pool from '../database.js';
import type { ItemObject } from '../../common/types';

const Item = class Item {
  id: bigint;
  name: string;
  vendor_id: bigint;

  constructor(row: any) {
    this.id = row.id;
    this.name = row.name;
    this.vendor_id = row.id;
  }

  static async insert({
    item_name,
    vendor_id,
  }: {
    item_name: string;
    vendor_id: bigint;
  }) {
    const { rows } = await pool.query(
      `
      INSERT INTO items (item_name, vendor_id)
      VALUES ($1, $2)
      RETURNING *
    `,
      [item_name, vendor_id]
    );

    return new Item(rows[0]);
  }

  static async getById(id: bigint) {
    const { rows } = await pool.query(
      `
    SELECT * FROM items WHERE id=$1
    `,
      [id]
    );
    if (!rows[0]) {
      return null;
    } else {
      return new Item(rows[0]);
    }
  }

  static async getAllByVendorId(vendor_id: bigint) {
    const { rows } = await pool.query(
      `
    SELECT * FROM items WHERE vendor_id=$1
    `,
      [vendor_id]
    );
    if (!rows[0]) {
      return null;
    } else {
      return rows.map((row) => new Item(row));
    }
  }

  static async updateById(id: bigint, attrs: ItemObject) {
    const toUpdate = await Item.getById(id);
    const updatedObj: ItemObject = { ...toUpdate, ...attrs };
    const { rows } = await pool.query(
      `
    UPDATE items
    SET 
    item_name=$1
    vendor_id=$2
    WHERE id=$3
    RETURNING *
    `,
      [updatedObj.item_name, updatedObj.vendor_id, id]
    );
    return new Item(rows[0]);
  }

  static async delete(id: bigint) {
    const { rows } = await pool.query(
      `
    DELETE FROM items WHERE id=$1 
    RETURNING * 
    `,
      [id]
    );
    return new Item(rows[0]);
  }
};

export default Item;
