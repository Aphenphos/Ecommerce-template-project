import pool from '../database.js';
const ItemImage = class ItemImage {
  id?: bigint;
  image_url: string;
  item_id: bigint;

  constructor(row: any) {
    this.id = row.id;
    this.image_url = row.image_url;
    this.item_id = row.item_id;
  }

  static async insert({ image_url, item_id }: ItemImage) {
    const { rows } = await pool.query(
      `
        INSERT INTO item_images (image_url, item_id)
        VALUES ($1, $2)
        RETURNING *
    `,
      [image_url, item_id]
    );
    return new ItemImage(rows[0]);
  }
};

export default ItemImage;
