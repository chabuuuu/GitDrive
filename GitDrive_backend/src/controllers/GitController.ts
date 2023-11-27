import 'dotenv/config'
import { GitModel } from '../models/git';
import { RepositoryManagement } from '../service/RepositoryManagement.service';
const clientID = process.env.GIT_CLIENT_ID;
const clientSecret = process.env.GIT_CLIENT_SECRET;
const gitModel = new GitModel();
const repositoryManagement = new RepositoryManagement();
import axios from 'axios';
const { Octokit } = require("@octokit/rest");
export class GitController{
    async LoginCallback (req: any, res: any) {
        try {
            const code = req.query.code;
            const userID = req.query.id;
                console.log("code: " + code);
                //async await 
                const resp = await axios.post(`https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`, {}, {
                    headers: {
                        accept: 'application/json'
                    }
                  });
                console.log(':::', resp.data.access_token);
                const access_token = resp.data.access_token;
                console.log("access token: " + access_token);
                if(access_token){
                    const resp = await axios.get(`https://api.github.com/user`, {
                        headers: {
                          'Authorization': `token ${access_token}`
                        }
                    });
                    console.log(resp.data);
                // Octokit.js
                // https://github.com/octokit/core.js#readme
                // const octokit = new Octokit({
                //     auth: access_token
                // })
                
                // const data = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                //     owner: resp.data.login,
                //     repo: 'UIT_LTTQ',
                //     path: '',
                //     headers: {
                //     'X-GitHub-Api-Version': '2022-11-28'
                //     }
                // })
                    // console.log(data);
                    //await gitModel.createNewGitAccount(access_token, userID, resp.data.login);
                    return res.json({"status": 'ok', "data": resp.data, "token": access_token});
                }
    
        } catch (error: any) {
            console.error(error.message);
            return error.message;
        }
    }
    async Login(req: any, res: any, next: any){
        const cookie = req.header('Cookie');
        const user = req.user;
        axios({
            method: 'get',
            url: `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=repo`,
            headers: {'Cookie': cookie}
          })
            .then(async function (response) {
                //console.log(response.data);
              //res.json(response.data);
              const data = response.data
              try{
                const newGithub = await gitModel.createNewGitAccount(data.token, user.id, data.data.login);
                return res.json({"status": 'ok', "message": "Done add Github for user", "userID": user.id, "Github:": newGithub});
              }catch(error: any){
                throw new Error(error.message);
              }
            }).catch(function (error) 
              {
              res.json({"status": 'error', "message":error.message});
              }
            )
    }

    async GetRepository(req: any, res: any, next: any){
      console.log(req.query.repo);
      
      const gitAccount= await gitModel.getGitAccount(req.user.id);
      const repo = await repositoryManagement.getRepositories(gitAccount.GitToken, gitAccount.username, req.query.repo);
      console.log(gitAccount);
      
    }
}
//https://github.com/login/oauth/authorize?client_id=5acc84ab634bf2e8f1bc
