import { LinkButton } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/LinkButton',
  component: LinkButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Outlined: Story = {
  args: {
    href: 'https://github.com/UR-deR',
    children: 'Outlined',
    variant: 'outlined',
  },
};

export const Text: Story = {
  args: {
    href: 'https://github.com/UR-deR',
    children: 'Text',
    variant: 'text',
  },
};
