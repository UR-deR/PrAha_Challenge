import { getAppToken } from './get-app-token.js';

async function fetchIssues(owner, repo, token) {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
        headers: {
            authorization: `token ${token}`
        }
    });
    return await res.json();
}

async function main() {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.log("OWNERとREPOを指定してください");
        return;
    }
    const [owner, repo] = args;

    const token = await getAppToken();

    const issues = await fetchIssues(owner, repo, token);
    console.log(issues);
}

main();
