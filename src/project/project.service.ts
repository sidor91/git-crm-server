import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UserService } from 'src/user/user.service';
import { GitService } from 'src/git/git.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly userService: UserService,
    private readonly gitService: GitService
  ) {}

  async create(dto: Project) {
    return this.projectRepository.save(dto);
  }

  async findOne({
    projectId,
    userId,
  }: {
    projectId: string;
    userId: string;
  }): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId, user: {id: userId} }
    });
    if (!project) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }
    return project;
  }

  async findAll(userId: string): Promise<Project[]> {
    return this.projectRepository.find({
      where: { user: {id: userId} },
    });
  }

  async createNewProject(dto: CreateProjectDto, userId: string) {
    const user = await this.userService.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const githubData = await this.gitService.fetchGitHubData(dto.url);

    const project = await this.create({ ...githubData, user });

    delete project.user;

    return project;
  }

  async update({
    projectId,
    userId,
    dto,
  }: {
    projectId: string;
    userId: string;
    dto: UpdateProjectDto;
  }): Promise<Project> {
    const project = await this.findOne({
      projectId,
      userId,
    });
    const updatedProject = Object.assign(project, dto);
    return await this.create(updatedProject);
  }

  async remove(projectId: string, userId: string): Promise<Record<string, boolean>> {
   const result = await this.projectRepository.delete({
     id: projectId,
     user: {id: userId},
   });
   if (result.affected === 0) {
     throw new NotFoundException(`Project with id ${projectId} not found`);
   }
    
    return {success: true}
  }

  
}
