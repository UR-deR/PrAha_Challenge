import { Footer } from '../components/organisms/Footer';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/Footer',
  component: Footer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
