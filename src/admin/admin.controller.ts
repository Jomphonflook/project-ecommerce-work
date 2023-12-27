import { Controller, Get, Post, Body, Put, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Res, StreamableFile } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  //admin register
  @Post()
  adminRegister(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.adminRegister(createAdminDto);
  }

  //admin login
  @Post('/login')
  login(@Body() loginAdminDto: LoginAdminDto) {
    return this.adminService.loginAdmin(loginAdminDto)
  }

  //get Admin Profile
  @Post('/:id')
  adminProfile(@Param('id') id: string) {
    return this.adminService.adminProfile(id)
  }

  //update profile
  @Put('/update_profile/:id')
  updateAdminProfile(
    @Param('id') id: string,
    @Body() updateAdminProfile: UpdateAdminDto
  ) {
    return this.adminService.updateAdminProfile(id, updateAdminProfile)
  }

}
