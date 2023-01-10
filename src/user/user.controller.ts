import {
  Controller,
  Get,
  Res,
  HttpStatus,
  HttpException,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/getFullName')
  async getUserFullName(
    @Res() res,
    @Query('username') username,
    @Query('password') password,
  ) {
    try {
      const fullName = await this.userService.findFullName({
        username,
        password,
      });
      return res.status(HttpStatus.OK).json(fullName);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
