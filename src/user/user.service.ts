import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entity/user.entity';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      isActive: true,
    },
    {
      id: 2,
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: 'securepass',
      isActive: false,
    },
    {
      id: 3,
      fullName: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      password: 'mypassword',
      isActive: true,
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user)
      throw new NotFoundException(`No se encontro el usuario con id ${id}`);
    return user;
  }

  createUser(createUserInput: CreateUserInput): User {
    const user = new User();
    user.id = Math.max(...this.users.map((user) => user.id), 0) + 1;
    user.fullName = createUserInput.fullName;
    user.email = createUserInput.email;
    user.password = createUserInput.password;
    this.users.push(user);
    return user;
  }

  updateUser(id: number, updateUserInput: UpdateUserInput): User {
    const { fullName, email, password } = updateUserInput;

    const userUpdate = this.findOne(id);

    const emailExists = this.users.some(
      (u) => u.email === email && u.id !== id,
    );
    if (emailExists)
      throw new BadRequestException(`El correo ${email} ya esta registrado`);

    if (fullName) userUpdate.fullName = fullName;
    userUpdate.email = email;
    userUpdate.password = password;

    this.users = this.users.map((user) => {
      return user.id === id ? userUpdate : user;
    });
    return userUpdate;
  }

  deleteUser(id: number): boolean {
    this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return true;
  }
}
