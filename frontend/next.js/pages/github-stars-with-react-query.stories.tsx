import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GithubStarsWithReactQuery from './github-stars-with-react-query';
import type { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

const WrappedComponent = (props: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
};

const Component = () => {
  return (
    <WrappedComponent>
      <GithubStarsWithReactQuery />
    </WrappedComponent>
  );
};

const meta = {
  title: 'Pages/GithubStarsWithReactQuery',
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GithubStarsWithReactQuery>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
