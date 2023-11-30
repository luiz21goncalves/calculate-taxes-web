import { Meta, StoryObj } from '@storybook/react'

import { NavLink } from './nav-link'

const meta = {
  title: 'Components/Header/NavLink',
  component: NavLink,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
  tags: ['autodocs'],
  args: {
    href: '/import',
    children: 'Import',
  },
  argTypes: {
    exactMatch: { type: 'boolean', defaultValue: true },
  },
} satisfies Meta<typeof NavLink>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Active: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/import/:id',
        query: {
          id: 1,
        },
      },
    },
  },
  args: {
    exactMatch: false,
  },
}
