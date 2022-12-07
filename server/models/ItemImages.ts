import pool from '../database.js';
const ItemImage = class ItemImage {
  id?: bigint;
  image_url: string;
  item_id: bigint;
  cloud_id: string;

  constructor(row: any) {
    this.id = row.id;
    this.image_url = row.image_url;
    this.item_id = row.item_id;
    this.cloud_id = row.cloud_id;
  }

  static async insert({
    image_url,
    item_id,
    cloud_id,
  }: {
    image_url: string;
    item_id: number;
    cloud_id: string;
  }) {
    const { rows } = await pool.query(
      `
        INSERT INTO item_images (image_url, item_id, cloud_id)
        VALUES ($1, $2, 3)
        RETURNING *
    `,
      [image_url, item_id, cloud_id]
    );
    return new ItemImage(rows[0]);
  }

  static async getBySecureUrl(secureUrl: string) {
    const { rows } = await pool.query(
      `
      SELECT * FROM item_images WHERE image_url = $1
      `,
      [secureUrl]
    );
    return new ItemImage(rows[0]);
  }

  static async deleteByCloudId(cloudId: string) {
    const { rows } = await pool.query(
      `
      DELETE FROM item_images WHERE cloud_id = $1
      RETURNING * 
      `,
      [cloudId]
    );
    return new ItemImage(rows[0]);
  }
};

export default ItemImage;
