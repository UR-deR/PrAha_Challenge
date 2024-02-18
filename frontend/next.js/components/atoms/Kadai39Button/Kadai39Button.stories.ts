import { Kadai39Button } from './index';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const meta = {
  title: 'Atoms/Kadai39Button',
  component: Kadai39Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: action('on-click'),
  },
  argTypes: {
    onClick: {
      //ref: https://storybook.js.org/docs/essentials/actions#automatically-matching-args
      actions: { argTypesRegex: '^on.*' },
    },
  },
} satisfies Meta<typeof Kadai39Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Red: Story = {
  args: {
    children: 'Red',
    color: 'red',
    size: 'medium',
    disabled: false,
  },
};

export const Blue: Story = {
  args: {
    children: 'Blue',
    color: 'blue',
    size: 'medium',
    disabled: false,
  },
};

export const Green: Story = {
  args: {
    children: 'Green',
    color: 'green',
    size: 'medium',
    disabled: false,
  },
};

export const Small: Story = {
  args: {
    children: '削除する',
    color: 'red',
    size: 'small',
    disabled: false,
  },
};

export const Medium: Story = {
  args: {
    children: '応募する',
    color: 'blue',
    size: 'medium',
    disabled: false,
  },
};

export const Large: Story = {
  args: {
    children: 'Large',
    color: 'green',
    size: 'large',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    children: '削除する',
    color: 'red',
    size: 'small',
    disabled: true,
  },
};
