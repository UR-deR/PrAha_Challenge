import { BasicTable } from './index';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Molecules/BasicTable',
  component: BasicTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BasicTable>;

export default meta;

type Story = StoryObj<typeof meta>;

const registeredUsers = [
  {
    email: 'ichiro@example.com',
    password: 'password',
    rank: 'プレミアム会員',
  },
  {
    email: 'sakura@example.com',
    password: 'pass1234',
    rank: '一般会員',
  },
  {
    email: 'jun@example.com',
    password: 'pa55w0rd!',
    rank: 'プレミアム会員',
  },
  {
    email: 'yoshiki@example.com',
    password: 'pass-pass',
    rank: '一般会員',
  },
] as const;

export const Primary: Story = {
  args: {
    heads: ['#', 'メールアドレス', 'パスワード', '会員ランク'],
    rows: registeredUsers.map((user, index) => {
      return (
        <React.Fragment key={index}>
          <th>{index + 1}</th>
          <td>
            <code>{user.email}</code>
          </td>

          <td>
            <code>{user.password}</code>
          </td>
          <td>{user.rank}</td>
        </React.Fragment>
      );
    }),
  },
};
