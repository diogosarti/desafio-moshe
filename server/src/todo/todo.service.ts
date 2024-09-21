import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    const data = createTodoDto;
    const response = await this.prisma.todo.create({ data: { ...data } });
    return response;
  }

  async findAll() {
    const data = await this.prisma.todo.findMany({
      orderBy: [{ isCompleted: 'asc' }, { title: 'asc' }],
    });
    return data;
  }

  async findOne(id: string) {
    const data = await this.prisma.todo.findFirst({ where: { id } });
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    try {
      const data = await this.prisma.todo.update({
        data: { ...updateTodoDto },
        where: { id },
      });
      return { message: 'Todo successfully updated', data };
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.todo.delete({ where: { id } });
      return { message: 'Todo successfully deleted' };
    } catch {
      throw new NotFoundException('Todo not found or already deleted');
    }
  }
}
