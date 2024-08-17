import { useEffect, useState } from 'react';

//userをfetchするhooks
//さまざまなコンポーネントで再利用することができる。
export const useUsers = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  return { users } as const;
};

//userを表示するコンポーネント
//propsで受け取ったuserを表示する。
//テストを書くときに、propsを渡すだけでテストが書ける。
export const UserList = (props: { users: any[] }) => {
  return (
    <ul>
      {props.users.map((user) => (
        <li
          key={user.id}
          style={{
            color: 'green',
          }}
        >
          {user.name}
        </li>
      ))}
    </ul>
  );
};

export const UsersContainer = () => {
  const { users } = useUsers();

  return <UserList users={users} />;
};

//hooksを用いたロジックをコンポーネント内に記述する場合
//userのfetch処理をコンポーネント内で定義しているため、再利用することができない。
//コンポーネントのUIのテストを書くときに、ネットワークリクエストが発生するため、モック処理を書かないといけない。
export const LogicContainedUsers = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li
          key={user.id}
          style={{
            color: 'green',
          }}
        >
          {user.name}
        </li>
      ))}
    </ul>
  );
};
