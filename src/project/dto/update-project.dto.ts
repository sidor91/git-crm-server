import { PartialType } from '@nestjs/mapped-types';
import { Project } from '../entities/project.entity';

export class UpdateProjectDto extends PartialType(Project) {}
