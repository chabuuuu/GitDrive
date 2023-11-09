import 'dotenv/config'
const clientID = process.env.GIT_CLIENT_ID;
const clientSecret = process.env.GIT_CLIENT_SECRET;
const axios = require('axios')
const { Octokit } = require("@octokit/rest");

//https://github.com/login/oauth/authorize?client_id=5acc84ab634bf2e8f1bc
export const LoginControllercallback = async(req: any, res: any) => {
    try {
        const code = req.query.code;
            

            // axios({
            //     method: 'post',
            //     url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
            //     headers: {
            //         accept: 'application/json'
            //     }
            // }).then((response) => {
            //     access_token = response.data.access_token
            //     res.redirect('/success');
            // })
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
            const octokit = new Octokit({
                auth: access_token
            })
            
            const data = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                owner: resp.data.login,
                repo: 'UIT_LTTQ',
                path: '',
                headers: {
                'X-GitHub-Api-Version': '2022-11-28'
                }
            })
                console.log(data);
                return res.render('success',{ userData: resp.data });
            }

    } catch (error) {
        console.error(error);
    }
}