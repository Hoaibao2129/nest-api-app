import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateUserDto } from '../user/dto/user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { ConflictException } from '@nestjs/common';
import { User } from './entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      find: jest.fn(),
    },
  };

  const mockUser: User[] = [
    {
      id: 1,
      name: 'John',
      email: "john@gmail.com",
      tel: "123456789",
      password: "password",
      address: "123 Main Street",
    },
    {
      id: 2,
      name: "Ben",
      email: "ben@gmail.com",
      tel: "123456789",
      password: "123456",
      address: "123 Main Street",
    }
  ]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should create new user and return it', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Ben',
      email: 'ben@gmail.com',
      tel: '123456789',
      password: '123456',
      address: '123 Main Street',
    };

    const expectedUser: any = {
      id: 1,
      name: 'Ben',
      email: 'ben@gmail.com',
      tel: '123456789',
      password: '123456',
      address: '123 Main Street',
    };

    (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null); // Simulate no existing user
    (prismaService.user.create as jest.Mock).mockResolvedValue(expectedUser);

    const result = await service.createUser(createUserDto);
    expect(result).toEqual(expectedUser);
  });

  it('should throw ConflictException if user already exists', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Ben',
      email: 'ben@gmail.com',
      tel: '123456789',
      password: '123456',
      address: '123 Main Street',
    };

    (prismaService.user.findUnique as jest.Mock).mockResolvedValueOnce({
      id: 1,
      name: 'John',
      email: 'john@gmail.com',
      tel: '123456789',
      password: 'password',
      address: '456 Another Street',
    });

    await expect(service.createUser(createUserDto)).rejects.toThrow(
      new ConflictException('User already exists'),
    );
  });

  it('should return all users', async () => {
    (prismaService.user.findMany as jest.Mock).mockResolvedValue(mockUser);
    const result = await service.getAllUsers();
    expect(result).toEqual(mockUser);
    expect(prismaService.user.findMany).toHaveBeenCalled();
  })

  it("should return user with userId", async () => {
    (prismaService.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    const result = await service.getUserById(1);
    expect(result).toEqual(mockUser);

  })


});
