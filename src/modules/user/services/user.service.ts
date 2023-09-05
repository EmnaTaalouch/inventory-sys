import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../models/user.model';
import { CreateUserRequest } from '../dtos/create-user.request';
import { UserCreatedResponse } from '../dtos/user-created.response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  async getAllUsers() {
    return this.userRepository.find();
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async createUser(createUserDto: CreateUserRequest) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async updateUser(id: number, updateUserDto: UserCreatedResponse) {
    const user = await this.getUserById(id);
    this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.getUserById(id);
    return this.userRepository.remove(user);
  }
}
