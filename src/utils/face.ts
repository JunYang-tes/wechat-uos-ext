const all = "微笑][撇嘴][色][发呆][得意][流泪][害羞][闭嘴][睡][大哭][尴尬][发怒][调皮][呲牙][惊讶][难过][囧][抓狂][吐][偷笑][愉快][白眼][傲慢][困][惊恐][憨笑][悠闲][咒骂][疑问][嘘][晕][衰][骷髅][敲打][再见][擦汗][抠鼻][鼓掌][坏笑][右哼哼][鄙视][委屈][快哭了][阴险][亲亲][可怜][笑脸][生病][脸红][破涕为笑][恐惧][失望][无语][嘿哈][捂脸][奸笑][机智][皱眉][耶][吃瓜][加油][汗][天啊][Emm][社会社会][旺柴][好的][打脸][哇][翻白眼][666][让我看看][叹气][苦涩][裂开][嘴唇][爱心][心碎][拥抱][强][弱][握手][胜利][抱拳][勾引][拳头][OK][合十][啤酒][咖啡][蛋糕][玫瑰][凋谢][菜刀][炸弹][便便][月亮][太阳][庆祝][礼物][红包][發][福][烟花][爆竹][猪头][跳跳][发抖][转圈"

export const faces = all.split("][")
const columns = 17
const rows = 7
export const height =538 
export const width = 1320
export const cellWidth = 1320 / columns
export const cellHeight = 538 / rows
const faceIndex =
  faces
    .reduce((acc, curr) => {
      if (acc.col < columns) {
        acc.map[curr] = [acc.row, acc.col]
        acc.col++
      } else {
        acc.col = 0
        acc.row++
        acc.map[curr] = [acc.row, acc.col++]
      }
      return acc
    }, {
      col: 0,
      row: 0,
      map: {} as Record<string, [number, number]>
    })
    .map


export function getIndex(face: string) {
  return faceIndex[face]
}

export function getStyle(size: number, face: string) {
  const ratioX = size / cellWidth
  const ratioY = size / cellHeight
  const w = ratioX * width
  const h = ratioY * height
  const cw = w / columns
  const ch = h / rows
  const [row, col] = getIndex(face) ?? [-1, -1]
  return `
background-size: ${w}px ${h}px;
background-position: -${col * cw}px -${row * ch}px
`
}

export function getBgPosition(face: string) {
  const [row, col] = getIndex(face) ?? [-1, -1]
  console.log(face, row, col)
  if (row > -1) {
    return `background-position: -${col * cellWidth}px -${row * cellHeight}px;`
  }
}
export function calcSize(size: number) {
  const ratioX = size / cellWidth
  const ratioY = size / cellHeight
  return `background-size:${ratioY * height}px ${ratioX * width}px `
}
