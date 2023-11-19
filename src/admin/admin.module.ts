import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { adminsProviders } from 'src/database/provider/admin.provider';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [DatabaseModule, JwtModule.register({
    global: true,
    secret: 'Sx59mzoV2WJJZCtJhQuq',
    signOptions: { expiresIn: '120m' },
  })],
  controllers: [AdminController],
  providers: [AdminService, ...adminsProviders],
})
export class AdminModule { }
