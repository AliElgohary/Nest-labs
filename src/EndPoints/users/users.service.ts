import { Injectable } from '@nestjs/common';
import { RegUserWithDTO } from './dto/Reg.DTO';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LogUserWithDTO } from './dto/Log.DTO';
import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users') private UserModel,
    private jwtService: JwtService,
  ) {}

  async Reg(RegUser: RegUserWithDTO) {
    const foundUser = await this.UserModel.findOne({
      email: RegUser.email.toLowerCase(),
    });
    if (foundUser) return { message: 'Already Exist, Please Log-In' };
    const salt = await bcrypt.genSalt(10);
    const HashedPass = await bcrypt.hash(RegUser.password, salt);
    RegUser.password = HashedPass;
    RegUser.email = RegUser.email.toLowerCase();
    const newUser = this.UserModel(RegUser);
    await newUser.save();
    return { message: 'Added Successfully', data: newUser };
  }
  async Log(LogUser: LogUserWithDTO, res: Response) {
    const foundUser = await this.UserModel.findOne({
      email: LogUser.email.toLowerCase(),
    });
    if (!foundUser) {
      res.status(400);
      return { message: 'Invalid Email/Password' };
    }
    const PassTrue = await bcrypt.compare(LogUser.password, foundUser.password);
    if (!PassTrue) {
      res.status(400);
      return { message: 'Invalid Email/Password' };
    }
    res.status(200);
    const jwtData = await this.jwtService.sign(
      { id: foundUser._id, isAdmin: foundUser.isAdmin },
      { secret: 'secret' },
    );
    res.header('auth-token', jwtData);
    return { message: 'Logged-In Successfully' };
  }
}
