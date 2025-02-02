import { createAppAuth } from '@octokit/auth-app';

export async function getAppToken() {
    const auth = createAppAuth({
        appId: process.env.GITHUB_APP_ID,
        privateKey: process.env.GITHUB_PRIVATE_KEY,
        installationId: process.env.GITHUB_INSTALLATION_ID
    });

    const { token } = await auth({ type: 'installation' });
    return token;
}
