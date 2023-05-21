import {SearchList} from "./search-list";
import {faces, getStyle, height, width} from "../utils/face";
import {css} from '@emotion/css'
import pinyin from "pinyin";
import {createSignal} from "solid-js";


const data = faces.map(
  i => {
    return {
      name: i,
      py: pinyin(i, {style: pinyin.STYLE_FIRST_LETTER})
        .map(i => i[0])
        .join('')
    }
  }
)

const [bg, setBg] = createSignal("")
function loadImage() {
  const img = new Image()
  img.addEventListener('load', () => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    canvas.getContext('2d')?.drawImage(img, 0, 0)
    canvas.toBlob(b => {
      const url = URL.createObjectURL(b!)
      console.log(url)
      setBg(css`
      background-image: url(${url});
      `)
    })

  })
  img.src = face
}
loadImage()

export type FaceProps = {
  class?: string
  onSelect: (face: string) => void
  onCancel?: () => void
}
export function Face(props: FaceProps) {

  return <SearchList
    class={props.class}
    listClass={css`display:flex;flex-flow:wrap;gap:10px;`}
    text={(i) => {
      return <div>
        <div
          class={bg()}
          style={`width:50px;height:50px;${getStyle(50, i.name)}`} >
        </div>
        <div class={css`text-align: center;`}>
          {i.name}
        </div>
      </div>
    }
    }
    isMatch={(kv, item) => item.py.includes(kv)}
    data={data}
    onSelect={i => props.onSelect(i.name)}
    onCancel={props.onCancel}
  />
}