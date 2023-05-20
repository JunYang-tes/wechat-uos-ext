import { css,injectGlobal } from '@emotion/css'
injectGlobal`
:root {
    --BG-1: #fff;
    --BG-2: #f7f7f7;
    --BG-2-1: #ededed;
    --BG-2-2: #d2d2d2;
    --BG-3: #ededed;
    --BG-4: #ededed;
    --BG-1-HOVER: #e0e0e0;
    --BG-1-ACTIVE: #cfcfcf;
    --FG-0: #161616;
    --FG-1: rgba(0,0,0,0.7);
    --FG-2: #717171;
    --FG-3: #717171;
    --FG-4: #717171;
    --FG-5: #9e9e9e;
    --FG-6: rgba(0,0,0,0.08);
    --FG-7: rgba(0,0,0,0.05);
    --FG-8: rgba(0,0,0,0.1);
    --FG-9: rgba(0,0,0,0.15);
    --FG-10: rgba(0,0,0,0.15);
    --FG-11: rgba(0,0,0,0.5);
    --FG-12: #fff;
    --RED: #fa5151;
    --ORANGE: #fa9d38;
    --YELLOW: #ffc300;
    --BRAND: #07c160;
    --BLUE: #10aeff;
    --INDIGO: #1485ee;
    --PURPLE: #6467f0;
    --LINK: #576b95;
    --TEXT: #06ae56;
    --LIGHTGREEN: #95ec69;
    --BG-ITEM-ACTIVE: #ddd;
    --BORDER: #e7e7e7;
    --LIGHTGREEN-HOVER: #89da61;
    --LIGHTGREEN-ACTIVE: #7fc959;
    --height-dialog-transpond: 460px;
    --dialog-box-shadow: 0 0 10px 5px rgba(0,0,0,0.1);
    --tips-box-shadow: 0 2 4px 0 rgba(0,0,0,0.5);
    --global-radius: 4px;
    --dialog-radius: 8px;
}
`

export const primaryTxtButton = css`
font-size: 14rem;
color: var(--BRAND);
width: 110px;
line-height: 32px;
background-color: var(--FG-7);
border-radius: 4px;
text-align: center;
cursor: pointer;
border: none;
outline: none;
`
export const secondaryTxtButton = css`
font-size: 14rem;
color: var(--FG-1);
width: 110px;
line-height: 32px;
background-color: #eaeaea;
border-radius: 4px;
text-align: center;
cursor: pointer;
border: none;
outline: none;

`
