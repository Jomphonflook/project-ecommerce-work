import { Connection } from "mongoose";
import { ProductSchema } from "../schema/product.schema";

export const productsProviders = [
  {
    provide: 'PRODUCT_MODEL',
    useFactory: (connection: Connection) => connection.model('Product', ProductSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];