import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { RegUserWithDTO } from './dto/Reg.DTO';
import { LogUserWithDTO } from './dto/Log.DTO';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(ValidationPipe)
  @Post('reg')
  Reg(@Body() RegUser: RegUserWithDTO) {
    return this.usersService.Reg(RegUser);
  }

  @UsePipes(ValidationPipe)
  @Post('log')
  Login(@Body() LogUser: LogUserWithDTO, @Res({ passthrough: true }) res) {
    return this.usersService.Log(LogUser, res);
  }
}
