import { fetchGitHubRepository } from '../utils/fetchGitHubRepository';
import { useQuery } from '@tanstack/react-query';

const useGithubRepository = (username: string, repository: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['GITHUB_REPOSITORY', username, repository],
    queryFn: () => fetchGitHubRepository(username, repository),
  });
  return { data, isLoading };
};

export default function GithubStarsWithReactQuery() {
  const { data, isLoading } = useGithubRepository('UR-deR', 'PrAha_Challenge');

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        backgroundColor: 'purple',
        height: '100vh',
      }}
    >
      <h1>CSR</h1>
      <p>ここにGitHubレポジトリに付いたスターの数を表示してみよう</p>
      <p>{data.repository.subscribers_count} subscribers</p>
      <p>{data.repository.subscribers_count} stars</p>
    </div>
  );
}
