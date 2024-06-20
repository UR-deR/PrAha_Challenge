import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense, useState, startTransition } from 'react';

type Tab = 'TODO' | 'POST';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const fetchItem = async (tab: Tab): Promise<Todo[] | Post[]> => {
  const pathname = tab === 'TODO' ? 'todos' : 'posts';
  const response = await fetch(`https://jsonplaceholder.typicode.com/${pathname}`);

  // wait for 2 seconds to simulate a slow network
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return response.json();
};

export default function Tabs() {
  const [tab, setTab] = useState<Tab>('TODO');

  return (
    <div
      style={{
        backgroundColor: 'purple',
        height: '100vh',
      }}
    >
      <button
        onClick={() => {
          startTransition(() => {
            setTab('TODO');
          });
        }}
      >
        TODO
      </button>
      &nbsp;
      <button
        onClick={() => {
          startTransition(() => {
            setTab('POST');
          });
        }}
      >
        POST
      </button>
      <Suspense fallback={<div>Loading...</div>}>{tab === 'TODO' ? <Todos /> : <Posts />}</Suspense>
    </div>
  );
}

const Todos = () => {
  const { data: todos } = useSuspenseQuery({
    queryKey: ['todos'],
    queryFn: () => {
      return fetchItem('TODO') as Promise<Todo[]>;
    },
  });

  return (
    <div>
      <h1>TODO</h1>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            <h2>{todo.title}</h2>
          </div>
        );
      })}
    </div>
  );
};

const Posts = () => {
  const { data: posts } = useSuspenseQuery({
    queryKey: ['posts'],
    queryFn: () => {
      return fetchItem('POST') as Promise<Post[]>;
    },
  });

  return (
    <div>
      <h1>POST</h1>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        );
      })}
    </div>
  );
};
