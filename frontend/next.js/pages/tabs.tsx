import { Suspense, startTransition, useEffect, useState } from 'react';

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
  return response.json();
};

export default function Tabs() {
  const [tab, setTab] = useState<Tab>('TODO');

  const onClickTodoButton = () => {
    startTransition(() => {
      setTab('TODO');
    });
  };

  const onClickPostButton = () => {
    startTransition(() => {
      setTab('POST');
    });
  };

  return (
    <div
      style={{
        backgroundColor: 'purple',
        height: '100vh',
      }}
    >
      <button
        onClick={() => {
          onClickTodoButton();
        }}
      >
        TODO
      </button>
      &nbsp;
      <button
        onClick={() => {
          onClickPostButton();
        }}
      >
        POST
      </button>
      <Suspense fallback={<div>Loading...</div>}>
        <h1>{tab === 'TODO' ? 'TODO' : 'POST'}</h1>
        {tab === 'TODO' ? <Todos /> : <Posts />}
      </Suspense>
    </div>
  );
}

const Todos = () => {
  const fetchTodos = async (): Promise<Todo[]> => {
    return fetchItem('TODO') as Promise<Todo[]>;
  };

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos().then((todos) => {
      setTodos(todos);
    });
  }, []);

  return (
    <div>
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
  const fetchPosts = async (): Promise<Post[]> => {
    return fetchItem('POST') as Promise<Post[]>;
  };

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts().then((posts) => {
      setPosts(posts);
    });
  }, []);

  return (
    <div>
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
