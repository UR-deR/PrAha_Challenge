import { HamburgerMenu } from '@/components/molecules/HamburgerMenu';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/HamburegerMenu',
  component: HamburgerMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HamburgerMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
