import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LogUserWithDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
