import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { StatusArgs } from './dto/args/status.args';
import { AggregationsType } from './types/aggregations.type';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => [User], {
    name: 'users',
    description: 'retorna un listado de usuarios',
  })
  findAll(@Args() statusArgs: StatusArgs): User[] {
    return this.userService.findAll(statusArgs);
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

  // Aggregations
  @Query(() => Int, { name: 'totalUsers' })
  totalUsers(): number {
    return this.userService.totalUsers;
  }

  @Query(() => Int, { name: 'inactiveUsers' })
  inactiveUsers(): number {
    return this.userService.inactiveUsers;
  }

  @Query(() => Int, { name: 'activesUsers' })
  activesUsers(): number {
    return this.userService.activesUsers;
  }

  @Query(() => AggregationsType)
  aggregations(): AggregationsType {
    return {
      activesUsers: this.userService.activesUsers,
      inactiveUsers: this.userService.inactiveUsers,
      total: this.userService.totalUsers,
      totalActivesUsers: this.userService.totalUsers,
    };
  }
}
