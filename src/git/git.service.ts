import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class GitService {
  private readonly GIT_API_BASE_URL: string = 'https://api.github.com/repos';

  constructor(private readonly httpService: HttpService) {}

  isValidRepoUrl(repoUrl: string): boolean {
    const parts = repoUrl.split('/');
    return parts.length === 2 && parts[0].length > 0 && parts[1].length > 0;
  }

  async fetchGitHubData(repoUrl: string): Promise<Project> {
    const isValid = this.isValidRepoUrl(repoUrl);

    if (!isValid) {
      throw new BadRequestException(`Repo url ${repoUrl} is not valid`);
    }

    const [owner, repo] = repoUrl.split('/');
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.GIT_API_BASE_URL}/${owner}/${repo}`),
      );

      const {
        stargazers_count: stars,
        forks_count: forks,
        open_issues_count: issues,
        created_at,
        html_url: url,
        name,
      } = response.data;

      return {
        owner,
        name,
        url,
        stars,
        forks,
        issues,
        repoCreatedAt: new Date(created_at),
      };
    } catch (error) {
      throw new BadRequestException(
        `Couldn't find GitHub repository with owner ${owner} and name ${repo}, ${error.message}`,
      );
    }
  }
}
