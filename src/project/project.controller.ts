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
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { GetCurrentUserId } from 'src/@decorators/getCurrentUserId.decorator';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/create')
  create(@Body() dto: CreateProjectDto, @GetCurrentUserId() userId: string) {
    return this.projectService.createNewProject(dto, userId);
  }

  @Get()
  findAll(@GetCurrentUserId() userId: string) {
    return this.projectService.findAll(userId);
  }

  @Get(':projectId')
  findOne(
    @Param('projectId') projectId: string,
    @GetCurrentUserId() userId: string,
  ) {
    return this.projectService.findOne({ projectId, userId });
  }

  @Patch(':id')
  update(
    @Param('id') projectId: string,
    @Body() dto: UpdateProjectDto,
    @GetCurrentUserId() userId: string,
  ) {
    return this.projectService.update({ projectId, userId, dto });
  }

  @Delete(':id')
  remove(@Param('id') projectId: string, @GetCurrentUserId() userId: string) {
    return this.projectService.remove(projectId, userId);
  }
}
