import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Nombre completo del usuario' })
  @IsString()
  @IsNotEmpty()
  @Min(5)
  fullName: string;

  @Field(() => String, { description: 'Email del usuario' })
  @IsString()
  @IsEmail()
  @Min(5)
  email: string;

  @Field(() => String, { description: 'Contraseña del usuario' })
  @IsString()
  @Min(5)
  password: string;
}
