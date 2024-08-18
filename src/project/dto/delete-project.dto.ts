import { ApiProperty } from '@nestjs/swagger';

export class RemoveProjectResponseDto {
  @ApiProperty({
    description: 'Indicates whether the deletion was successful',
    example: true,
  })
  success: boolean;
}
