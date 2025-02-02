import { getAppToken } from './get-app-token.js';

async function commentOnIssue(owner, repo, token, issue) {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${issue.number}/comments`, {
        method: 'POST',
        headers: {
            authorization: `token ${token}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify({ body: issue.comment })
    });
    return await res.json();
}

async function main() {
    const args = process.argv.slice(2);
    if (args.length < 4) {
        console.log("OWNER, REPO, ISSUE_NUMBER, COMMENTを指定してください");
        return;
    }

    const [owner, repo, issue_number, comment] = args;

    const token = await getAppToken();
    const result = await commentOnIssue(owner, repo, token, { number: issue_number, comment: comment });
    console.log(result);
}

main();
