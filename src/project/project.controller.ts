import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto, CreateProjectResponseDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { GetCurrentUserId } from 'src/@decorators/getCurrentUserId.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RemoveProjectResponseDto } from './dto/delete-project.dto';

@ApiTags('Projects API')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create new project' })
  @ApiResponse({
    type: CreateProjectResponseDto,
  })
  create(@Body() dto: CreateProjectDto, @GetCurrentUserId() userId: string) {
    return this.projectService.createNewProject(dto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'List all projects of current user' })
  @ApiResponse({
    type: [CreateProjectResponseDto],
  })
  findAll(@GetCurrentUserId() userId: string) {
    return this.projectService.findAll(userId);
  }

  @Get(':projectId')
  @ApiOperation({ summary: 'Get project by id' })
  @ApiResponse({
    type: CreateProjectResponseDto,
  })
  findOne(
    @Param('projectId') projectId: string,
    @GetCurrentUserId() userId: string,
  ) {
    return this.projectService.findOne({ projectId, userId });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project by id' })
  @ApiResponse({
    type: CreateProjectResponseDto,
  })
  update(
    @Param('id') projectId: string,
    @Body() dto: UpdateProjectDto,
    @GetCurrentUserId() userId: string,
  ) {
    return this.projectService.update({ projectId, userId, dto });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project by id' })
  @ApiResponse({
    type: RemoveProjectResponseDto,
  })
  remove(@Param('id') projectId: string, @GetCurrentUserId() userId: string) {
    return this.projectService.remove(projectId, userId);
  }
}
