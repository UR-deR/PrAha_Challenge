import { useEffect, useState } from 'react';
import { fetchGitHubRepository } from '../utils/fetchGitHubRepository';

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
      <h1>CSR</h1>
      <p>ここにGitHubレポジトリに付いたスターの数を表示してみよう</p>
      <p>{data.subscribers} subscribers</p>
      <p>{data.stars} stars</p>
    </div>
  );
}
