import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => [User], {
    name: 'users',
    description: 'retorna un listado de usuarios',
  })
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user', description: 'retorna un usuario' })
  findOne(@Args('id', { type: () => Int }) id: number): User {
    return this.userService.findOne(id);
  }

  @Mutation(() => User, {
    name: 'registerUser',
    description: 'registrar un usuario',
  })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  @Mutation(() => User, {
    name: 'updateUser',
    description: 'actualizar un usuario',
  })
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.updateUser(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => Boolean)
  removeTodo(@Args('id', { type: () => Int }) id: number) {
    return this.userService.deleteUser(id);
  }
}
