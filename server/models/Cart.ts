import pool from '../database.js';

const Cart = class Cart {
  id: bigint;
  user_id: bigint;
  item_id: bigint;
  item_quantity: bigint;
  item_price?: bigint;
  item_name?: string;

  constructor(row: any) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.item_id = row.item_id;
    this.item_quantity = row.item_quantity;
    this.item_price = row.item_price || null;
    this.item_name = row.item_name || null;
  }

  static async addTo({
    user_id,
    item_id,
    item_quantity,
  }: {
    user_id: number;
    item_id: bigint;
    item_quantity: bigint;
  }) {
    const { rows } = await pool.query(
      `
            INSERT INTO carts (user_id, item_id, item_quantity)
            VALUES($1, $2, $3)
            RETURNING *
            `,
      [user_id, item_id, item_quantity]
    );

    return new Cart(rows[0]);
  }

  static async removeFrom(id: bigint, user_id: bigint) {
    const { rows } = await pool.query(
      `
      DELETE FROM carts WHERE id=$1 AND user_id=$2
      RETURNING *
      `,
      [id, user_id]
    );
    return new Cart(rows[0]);
  }

  static async removedFromStore(id: bigint) {
    const { rows } = await pool.query(
      `
      DELETE FROM carts WHERE item_id=$1
      RETURNING *
      `,
      [id]
    );
    if (rows[0]) {
      return new Cart(rows[0]);
    } else {
      return null;
    }
  }
  static async getCartByUserId(user_id: bigint) {
    const { rows } = await pool.query(
      `
      SELECT carts.id, carts.user_id, carts.item_id, carts.item_quantity, items.item_price, items.item_name
      FROM carts
      LEFT JOIN items
      ON carts.item_id = items.id
      WHERE user_id=$1      
    `,
      [user_id]
    );
    console.log(rows);
    if (!rows[0]) {
      return null;
    } else {
      return rows;
    }
  }

  static async updateQuantity(
    id: number,
    quantity: number,
    userId: number
  ) {
    const { rows } = await pool.query(
      `
      UPDATE carts
      SET
      item_quantity=$1
      WHERE id=$2 AND user_id=$3
      RETURNING *
      `,
      [quantity, id, userId]
    );
    console.log(rows);
    return new Cart(rows[0]);
  }
};

export default Cart;
