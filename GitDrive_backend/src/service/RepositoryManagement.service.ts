const { Octokit } = require("@octokit/rest");

export class RepositoryManagement{
    async getRepositories(gitToken: string, owner: string, repo: string){
        // const octokit = new Octokit({
        //     auth: gitToken
        //   })
          
        //   const respond = await octokit.request('GET /repos/{owner}/{repo}', {
        //     owner: owner,
        //     repo: repo,
        //     headers: {
        //       'X-GitHub-Api-Version': '2022-11-28'
        //     }
        //   })
        const octokit = new Octokit({
          auth: gitToken
        })
        
        const respond = await octokit.request('GET /repositories', {
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        })
        return respond;
    }
}