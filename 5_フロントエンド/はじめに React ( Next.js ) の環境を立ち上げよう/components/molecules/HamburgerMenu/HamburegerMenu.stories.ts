import { HamburgerMenu } from './index';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/HamburegerMenu',
  component: HamburgerMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HamburgerMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
