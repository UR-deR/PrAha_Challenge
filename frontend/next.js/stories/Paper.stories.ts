import { Paper } from '../components/atoms/Paper';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/Paper',
  component: Paper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Paper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Hello, world!',
  },
};
