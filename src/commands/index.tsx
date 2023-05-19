import { css } from "@emotion/css";
import { createSignal, Show } from "solid-js";
import { render } from "solid-js/web";
import { SearchList } from '../components/search-list'
import { getOrCreateMountPoint } from "../utils/dom";
import { chartTo } from "./contacts";
import { Command } from "./type";

const commands: Command[] = [
  chartTo
]
const [visible, setVisible] = createSignal(false)

function CommandUI() {
  const [cmds, setCommands] = createSignal<Command[]>(commands)
  return <Show when={visible()}>
    <SearchList
      data={cmds()}
      class={css`
                    position: absolute;
                    background-color: white;
                    width: min(500px, 80vw);
                    top: 50px;
                    left: 50%;
                    transform: translateX(-50%);
            `}
      text={cmd => cmd.render?.(cmd) ?? cmd.label}
      isMatch={(keyword, cmd) => cmd.isMatch?.(keyword) || cmd.label.toLowerCase().includes(keyword.toLowerCase())}
      onCancel={() => {
        setVisible(false)
      }}
      onSelect={async cmd => {
        const result = await cmd.execute()
        if (Array.isArray(result)) {
          setCommands(result)
        } else {
          setVisible(false)
          setCommands(commands)
        }
      }}
    />
  </Show>
}

document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 'p') {
    setVisible(true)
  }
})
document.addEventListener('DOMContentLoaded', () => {
  render(() => <CommandUI />, getOrCreateMountPoint('command-palette'))
})
