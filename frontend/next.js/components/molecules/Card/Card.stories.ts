import { Card } from './index';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    header: 'Card',
    body: 'Card',
  },
};
