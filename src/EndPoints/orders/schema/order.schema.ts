import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  totalprice: Number,
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
});
