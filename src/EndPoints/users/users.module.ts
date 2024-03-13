import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from './User.Schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1d' } }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
