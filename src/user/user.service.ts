import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { FindUserNameDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findFullName(
    findUserNameDto: FindUserNameDto,
  ): Promise<{ fullName: string } | { message: string }> {
    try {
      const { username, password } = findUserNameDto;

      if (username === undefined || username === '')
        throw new Error('Incorrect Credentials');

      const userFound = await this.userRepository.findOneBy({ username });

      const isEqual = await bcrypt.compare(password, userFound.password);

      if (!isEqual) throw new Error('Incorrect Credentials');

      return { fullName: userFound.fullName };
    } catch (error) {
      console.error(`Error getting use fullName: ${error.message}`);
      return { message: error.message };
    }
  }
}
