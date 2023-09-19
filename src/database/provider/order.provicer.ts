import { Connection } from "mongoose";
import { orderSchema } from "../schema/order.schema";

export const ordersProvider = [
    {
        provide: 'ORDER_MODEL',
        useFactory: (connection: Connection) => connection.model('Order', orderSchema),
        inject: ['DATABASE_CONNECTION'],
    }
]