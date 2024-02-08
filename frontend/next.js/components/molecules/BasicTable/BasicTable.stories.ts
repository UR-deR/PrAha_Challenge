import { BasicTable } from '../components/molecules/BasicTable';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/BasicTable',
  component: BasicTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BasicTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
