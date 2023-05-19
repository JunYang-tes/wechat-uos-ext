import { JSX } from "solid-js/jsx-runtime"

export type Command = {
  label: string
  description?: string
  render?: (cmd: Command) => JSX.Element
  data?: unknown
  isMatch?: (keywords:string)=> boolean
  execute: () => Promise<Command[]> | Command[] | void
}
