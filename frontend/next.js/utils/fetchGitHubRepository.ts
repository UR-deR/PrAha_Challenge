//for simplicity, only limited fileds are defined here. More fileds can be added as needed
export type Repository = {
  subscribers_count: number;
  stargazers_count: number;
};

export const fetchGitHubRepository = async (username: string, reponame: string) => {
  const response = await fetch(`https://api.github.com/repos/${username}/${reponame}`);
  const json = await response.json();
  return {
    repository: json,
  } as { repository: Repository };
};
