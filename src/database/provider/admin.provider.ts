import { Connection } from 'mongoose';
import { AdminSchema } from '../schema/admin.schema';


export const adminsProviders = [
  {
    provide: 'ADMIN_MODEL',
    useFactory: (connection: Connection) => connection.model('Admin', AdminSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];