import { Connection } from "mongoose";
import { HighlightSchema } from "../schema/highlight.schema";


export const highlightProvider = [
    {
        provide: 'HIGHLIGHT_MODEL',
        useFactory: (connection: Connection) => connection.model('Highlight', HighlightSchema),
        inject: ['DATABASE_CONNECTION'],
    }
]