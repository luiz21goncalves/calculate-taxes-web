import { Meta, StoryObj } from '@storybook/react'

import { Button } from './button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'submit',
  },
  argTypes: {
    onClick: { action: 'onClick' },
    disabled: { type: 'boolean', defaultValue: false },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
