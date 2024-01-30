import { Heading } from '../components/atoms/Heading';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Level1: Story = {
  args: {
    level: 1,
    children: 'Heading',
  },
};

export const Level2: Story = {
  args: {
    level: 2,
    children: 'Heading',
  },
};

export const Level3: Story = {
  args: {
    level: 3,
    children: 'Heading',
  },
};

export const Level4: Story = {
  args: {
    level: 4,
    children: 'Heading',
  },
};

export const Level5: Story = {
  args: {
    level: 5,
    children: 'Heading',
  },
};

export const Level6: Story = {
  args: {
    level: 6,
    children: 'Heading',
  },
};
