import { Connection } from "mongoose";
import { PromotionSchema } from "../schema/promotion.schema";

export const promotionProviders = [
    {
        provide: 'PROMOTION_MODEL',
        useFactory: (connection: Connection) => connection.model('Promotion', PromotionSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];