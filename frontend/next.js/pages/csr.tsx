import { useEffect, useState } from 'react';

const fetchGitHubRepository = async (username: string, reponame: string) => {
  const response = await fetch(`https://api.github.com/repos/${username}/${reponame}`);
  const json = await response.json();
  return {
    repository: json,
  };
};

export default function Csr() {
  const [data, setData] = useState({
    subscribers: 0,
    stars: 0,
  });

  useEffect(() => {
    fetchGitHubRepository('UR-deR', 'PrAha_Challenge').then(({ repository }) => {
      setData({
        subscribers: repository.subscribers_count,
        stars: repository.stargazers_count,
      });
    });
  }, []);

  return (
    <div
      style={{
        backgroundColor: 'purple',
        height: '100vh',
      }}
    >
      <p>ここにReactのGitHubレポジトリに付いたスターの数を表示してみよう</p>
      <p>{data.subscribers} subscribers</p>
      <p>{data.stars} stars</p>
    </div>
  );
}
