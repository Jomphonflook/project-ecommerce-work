import { Connection } from "mongoose";
import { cartSchema } from "../schema/cart.schema";

export const cartProviders = [
    {
        provide : 'CART_MODEL',
        useFactory: (connection: Connection) => connection.model('Cart', cartSchema),
        inject: ['DATABASE_CONNECTION'],
    }
]