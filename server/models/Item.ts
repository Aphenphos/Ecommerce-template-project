import pool from '../database.js';
import type { ItemObject } from '../../common/types';

const Item = class Item {
  id: bigint;
  item_name: string;
  item_price: number;
  vendor_id: bigint;
  images?: Array<string>;

  constructor(row: any) {
    this.id = row.id;
    this.item_name = row.item_name;
    this.item_price = row.item_price;
    this.vendor_id = row.vendor_id;
    this.images = row.images;
  }

  static async insert({
    item_name,
    item_price,
    vendor_id,
  }: ItemObject) {
    const { rows } = await pool.query(
      `
      INSERT INTO items (item_name, item_price, vendor_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [item_name, item_price, vendor_id]
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

  static async getManyById(id: Array<number>) {
    const { rows } = await pool.query(
      `
      SELECT items.*, 
      COALESCE(
      json_agg(to_jsonb(item_images.image_url))
         FILTER (WHERE item_images.image_url IS NOT NULL), '[]'
      ) as images from items
      LEFT JOIN item_images
      ON items.id = item_images.item_id
      WHERE items.id = ANY ($1)
      GROUP BY items.id;
      `,
      [id]
    );
    if (!rows[0]) {
      return null;
    } else {
      return rows.map((row) => new Item(row));
    }
  }

  static async getAllByVendorId(vendor_id: bigint) {
    const { rows } = await pool.query(
      `
      SELECT items.*, 
      COALESCE(
      json_agg(to_jsonb(item_images.image_url))
         FILTER (WHERE item_images.image_url IS NOT NULL), '[]'
      ) as images from items
      LEFT JOIN item_images
      ON items.id = item_images.item_id
      WHERE vendor_id=$1
      GROUP BY items.id;
    `,
      [vendor_id]
    );
    if (!rows[0]) {
      return null;
    } else {
      console.log(rows);
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
    item_name=$1,
    item_price=$2
    vendor_id=$3
    WHERE id=$4
    RETURNING *
    `,
      [
        updatedObj.item_name,
        updatedObj.item_price,
        updatedObj.vendor_id,
        id,
      ]
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

  static async deleteByVendorId(vendor_id: bigint) {
    const { rows } = await pool.query(
      `
    DELETE FROM items WHERE vendor_id=$1 
    RETURNING * 
    `,
      [vendor_id]
    );
    return new Item(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT items.*, 
      COALESCE(
      json_agg(to_jsonb(item_images.image_url))
         FILTER (WHERE item_images.image_url IS NOT NULL), '[]'
      ) as images from items
      LEFT JOIN item_images
      ON items.id = item_images.item_id
      GROUP BY items.id;
      `
    );
    return rows.map((row) => new Item(row));
  }
};

export default Item;
