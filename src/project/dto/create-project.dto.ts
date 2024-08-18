import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateProjectDto {
  @ApiProperty({
    description: 'The URL of the GitHub repository',
    example: 'facebook/react',
  })
  @IsString()
  url: string;
}

export class CreateProjectResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the project',
    example: 'a123b456-c789-d012-e345-f67890123456',
  })
  id: string;

  @ApiProperty({
    description: 'The creation date of the project in the database',
    example: '2024-08-18T12:34:56.789Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'The creation date of the repository from GitHub',
    example: '2024-01-01T00:00:00.000Z',
  })
  repoCreatedAt: Date;

  @ApiProperty({
    description: 'The owner of the GitHub repository',
    example: 'facebook',
  })
  owner: string;

  @ApiProperty({
    description: 'The name of the GitHub repository',
    example: 'react',
  })
  name: string;

  @ApiProperty({
    description: 'The URL of the GitHub repository',
    example: 'https://github.com/facebook/react',
  })
  url: string;

  @ApiProperty({
    description: 'The number of stars of the GitHub repository',
    example: 20000,
  })
  stars: number;

  @ApiProperty({
    description: 'The number of forks of the GitHub repository',
    example: 5000,
  })
  forks: number;

  @ApiProperty({
    description: 'The number of open issues in the GitHub repository',
    example: 50,
  })
  issues: number;

  @ApiProperty({
    description: 'The user associated with the project',
    example: 'a123b456-c789-d012-e345-f67890123456',
  })
  user: string;
}