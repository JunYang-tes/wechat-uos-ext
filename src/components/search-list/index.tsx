import { createEffect, createSignal, For, JSX, onCleanup, onMount } from 'solid-js';
import { match } from 'ts-pattern';
import { css } from '@emotion/css'

const container = css`
  --border-color: #eee;
  --padding:10px;
  border-radius: 6px;
  overflow:hidden;
  padding: var(--padding);
  border: 1px solid var(--border-color);
  background-color: white;
`
const input = css`
  box-sizing: border-box;
  width: 100%;
  font-size: 20px;
  border:none;
  border-bottom: 1px solid var(--border-color);
  padding-block: 6px;
  &:active, &:focus {
    outline: none;
  }
  margin-bottom: 10px;
`
const selectedItem = css`
  background-color: #eee;
`
const list = css`
  max-height: 300px;
  overflow: auto;
  padding: 0;
  margin: 0;
  li {
  display: block;
  font-size: 14px;
  text-align: left;
    padding-block: 6px;
  }
`



export type SearchListProps<T> = {
  class?: string,
  data: T[]
  text: (item: T) => JSX.Element
  isMatch: (keywords: string, item: T) => boolean
  onSelect: (item: T) => void
  onCancel?: () => void
}
export const SearchList = <T,>(props: SearchListProps<T>) => {
  const [preselected, setPreselected] = createSignal(0)
  const [keywords, setKeywords] = createSignal('')
  const filtered = () => {
    return props
      .data
      .filter(i => props.isMatch(keywords(), i))
  }
  const ul = <ul class={list}>
    <For each={filtered()}>
      {
        (item, index) => {
          return <li class={index() === preselected() ? selectedItem : ''}
            data-index={index()}
          >
            {props.text(item)}
          </li>
        }
      }
    </For>
  </ul> as HTMLUListElement

  //sync preselected with filtered
  createEffect(() => {
    const length = filtered().length
    const index = preselected()
    if (index >= length) {
      setPreselected(Math.max(
        length - 1, 0
      ))
    }
  })
  createEffect(() => {
    const index = preselected()
    ul.querySelector(`li[data-index="${index}"]`)?.scrollIntoView()
  })

  onMount(() => {
    const keydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        props.onCancel?.()
        e.stopPropagation()
        return
      }
      updatePreselectedByKeydown(e)
    }
    document.addEventListener('keydown', keydown, {
      capture: true
    })
    onCleanup(() => {
      document.removeEventListener('keydown', keydown)
    })

  })
  const updatePreselectedByKeydown = (e: KeyboardEvent) => {
    const newIndex = match(e.key)
      .with("ArrowDown", () => {
        e.stopPropagation()
        const current = preselected()
        const newIndex = current + 1
        if (newIndex >= filtered().length) {
          return current
        }
        return newIndex
      })
      .with("ArrowUp", () => {
        e.stopPropagation()
        const current = preselected()
        const newIndex = current - 1
        if (newIndex <= 0) {
          return 0
        }
        return newIndex
      })
      .otherwise(() => preselected())
    setPreselected(newIndex)
  }

  const select = () => {
    const index = preselected()
    const items = filtered()
    const item = items[index]
    if (item) {
      props.onSelect(item)
    }
  }

  const inputEl = <input
    autofocus
    placeholder='Search'
    class={input}
    value={keywords()}
    onInput={e => setKeywords(e.currentTarget.value)}
    onKeyUp={e => {
      if (e.key === 'Enter') {
        setTimeout(select)
        e.stopPropagation()
        e.preventDefault()
      }
    }}
  /> as HTMLInputElement

  onMount(() => {
    inputEl.focus()
  })

  return <div class={container + ' ' + props.class} >
    {inputEl}
    {ul}
  </div>
}

