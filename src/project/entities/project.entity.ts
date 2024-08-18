import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn()
  created_at?: Date;

  @Column()
  repoCreatedAt: Date;

  @Column()
  owner: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  stars: number;

  @Column()
  forks: number;

  @Column()
  issues: number;

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({ name: 'user' })
  user?: User;
}
