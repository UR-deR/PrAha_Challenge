import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { Repository, fetchGitHubRepository } from '../utils/fetchGitHubRepository';

export const getServerSideProps = (async () => {
  const { repository } = await fetchGitHubRepository('UR-deR', 'PrAha_Challenge');
  return { props: { repository } };
}) satisfies GetServerSideProps<{ repository: Repository }>;

export default function Ssr(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div
      style={{
        backgroundColor: 'purple',
        height: '100vh',
      }}
    >
      <h1>SSR</h1>
      <p>ここにGitHubレポジトリに付いたスターの数を表示してみよう</p>
      <p>{props.repository.subscribers_count} subscribers</p>
      <p>{props.repository.stargazers_count} stars</p>
    </div>
  );
}
