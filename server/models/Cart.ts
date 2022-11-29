import pool from '../database.js';

const Cart = class Cart {
  id: bigint;
  user_id: bigint;
  item_id: bigint;
  item_quantity: bigint;

  constructor(row: any) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.item_id = row.item_id;
    this.item_quantity = row.item_quantity;
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

  static async getCartByUserId(user_id: bigint) {
    const { rows } = await pool.query(
      `
    SELECT * FROM carts WHERE user_id=$1
    `,
      [user_id]
    );
    if (!rows[0]) {
      return null;
    } else {
      console.log(rows);
      return rows;
    }
  }
};

export default Cart;
