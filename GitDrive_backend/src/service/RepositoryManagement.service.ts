const { Octokit } = require("@octokit/rest");

export class RepositoryManagement{
    async getAllContents(gitToken: string, owner: string, repo: string){
      // Octokit.js
      // https://github.com/octokit/core.js#readme
      const octokit = new Octokit({
        auth: gitToken
      })

      const respond = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: owner,
        repo: repo,
        path: '',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          'Accept': 'application/vnd.github+json'
        }
      })
        return respond.data;
    }
    async createRepository(gitToken: string, owner: string){
            // Octokit.js
      // https://github.com/octokit/core.js#readme
      const octokit = new Octokit({
        auth: gitToken
      })

      await octokit.request('POST /repos/{template_owner}/{template_repo}/generate', {
        template_owner: process.env.RESOURCES_TEMPLATE_OWNER,
        template_repo: process.env.RESOURCES_TEMPLATE,
        owner: owner,
        name: 'GitDrive-Media',
        description: 'This is your private media repository',
        include_all_branches: false,
        'private': true,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })
    }
}