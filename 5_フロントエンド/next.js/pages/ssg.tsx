import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import { Repository, fetchGitHubRepository } from '../utils/fetchGitHubRepository';

export const getStaticProps = (async (context) => {
  const { repository } = await fetchGitHubRepository('UR-deR', 'PrAha_Challenge');
  return { props: { repository } };
}) satisfies GetStaticProps<{
  repository: Repository;
}>;

export default function Ssg(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div
      style={{
        backgroundColor: 'purple',
        height: '100vh',
      }}
    >
      <h1>SSG</h1>
      <p>ここにGitHubレポジトリに付いたスターの数を表示してみよう</p>
      <p>{props.repository.subscribers_count} subscribers</p>
      <p>{props.repository.stargazers_count} stars</p>
    </div>
  );
}
