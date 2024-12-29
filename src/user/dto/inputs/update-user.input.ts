import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  @Min(1)
  id: number;

  @Field(() => String, {
    description: 'Nombre completo del usuario',
    nullable: true,
  })
  @IsString()
  @IsNotEmpty()
  @Min(5)
  @IsOptional()
  fullName?: string;

  @Field(() => String, { description: 'Email del usuario', nullable: true })
  @IsString()
  @IsEmail()
  @Min(5)
  email: string;

  @Field(() => String, {
    description: 'Contraseña del usuario',
    nullable: true,
  })
  @IsString()
  @Min(5)
  password: string;
}
