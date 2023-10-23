import { render } from 'solid-js/web'
import { getOrCreateMountPoint } from '../utils/dom'
import { css, injectGlobal } from '@emotion/css'
import { createSignal } from 'solid-js'
injectGlobal`
.conversation-deatil .titlebar-wrap {
-webkit-app-region:none;
}
`
document.addEventListener('click', (e) => {
  const el = e.target as HTMLImageElement
  if (el.classList.contains("message-image")) {
    e.stopPropagation()
    e.preventDefault()
    const umount = render(
      () => <Viewer url={el.src} onclose={() => {
        umount()
      }} />,
      getOrCreateMountPoint("#viewer-container")
    )

  }
}, {
  capture: true
})

function Viewer(props: { url: string, onclose: () => void }) {
  const [scale, setScale] = createSignal(1)
  return <div
    class={css`
    position: absolute;
    background:black;
    top:0;
    left:0;
    right:0;
    bottom:0;
    display: flex;
    overflow:auto;
    align-items: center;
    justify-content: center;
    `}>
    <img src={props.url}
      onWheel={e => {
        e.stopPropagation()
        e.preventDefault()
        setScale(s => s * (e.deltaY < 0 ? 1.05 : 0.95))
      }}
      class={css`transform:scale(${scale()})`}
    />
    <button onClick={props.onclose}
      class={css`
        all:unset;
        position: absolute;
        right:30px;
        top:30px;
        color: white;
        border: 2px solid white;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        transform:scale(1);
        transition: all 0.3s;
        &:hover {
          transform:scale(1.5);
        },
        &::before {
        content: ' ';
    border: 1px solid white;
    transform-origin: center;
    transform: rotate(45deg);
    display: inline-block;
    width: 0;
    height: 10px;
    position: absolute;
    left: 9px;
    top: 4px;
        }
        &::after {
        content: ' ';
    border: 1px solid white;
    transform-origin: center;
    transform: rotate(-45deg);
    display: inline-block;
    width: 0;
    height: 10px;
    position: absolute;
    left: 9px;
    top: 4px;
        }
        `}
    >
    </button>
  </div>
}
