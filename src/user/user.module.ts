import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { usersProvider } from 'src/database/provider/user.provider';
import { cartProviders } from 'src/database/provider/cart.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...usersProvider, ...cartProviders],
})
export class UserModule { }
