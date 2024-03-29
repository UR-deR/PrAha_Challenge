import { Header } from './index';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
