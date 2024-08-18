import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(payload: FindOneOptions<User>): Promise<User | undefined> {
    return await this.usersRepository.findOne(payload);
  }

  async update(payload: { email: string; access_token: string }) {
    const { email, access_token } = payload;
    const user = await this.findOne({ where: { email } });
    if (user) {
      await this.create({ ...user, access_token });
    }
  }

  async create(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }
}
