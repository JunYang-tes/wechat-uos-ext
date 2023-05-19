import { JSX } from "solid-js/jsx-runtime"

export type Command = {
  label: string
  description?: string
  render?: (cmd: Command) => JSX.Element
  data?: unknown
  execute: () => Promise<Command[]> | Command[] | void
}
