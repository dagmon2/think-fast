import { Injectable, HttpStatus } from '@nestjs/common';
import { JsonDB, Config } from 'node-json-db';

export interface User {
  username: string;
  score: number;
}

@Injectable()
export class UsersService {
  private db: JsonDB;

  constructor() {
    this.db = new JsonDB(new Config('thinkFastDataBase', true, false, '/'));
    this.db.push('/users', [], false);
  }

  async getUsersSorted() {
    const users = await this.db.getData('/users');
    const sortedUsers = users.sort((a, b) => b.score - a.score);
    return sortedUsers;
  }

  async createUser(user: User) {
    const users = await this.db.getData('/users');

    const existingUser = users.find((u) => u.username === user.username);
    if (existingUser) {
      console.log(`User with username "${user.username}" already exists`);

      return {
        message: `Conflict Error, User with username "${user.username}" already exists`,
        statusCode: HttpStatus.CONFLICT,
      };
    }

    users.push(user);
    await this.db.push('/users', users);

    return { message: 'User created successfully', user };
  }

  async incrementScore(username: string) {
    const users = await this.db.getData('/users');
    const user = users.find((u) => u.username === username);

    if (!user) {
      return {
        message: `Error, User with username "${username}" not found`,
        statusCode: HttpStatus.NOT_FOUND,
      };
    }

    user.score += 1;
    this.db.push('/users', users);

    return { message: `Score for user "${username}" incremented by 1`, user };
  }
}
