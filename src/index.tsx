/* @refresh reload */
import {init} from './inject/hook-points/proxy'
import './inject/hook-points/dom-mutation'
import './inject/hook-points/ipcRender'
import './inject/screenshot'
import './inject/prevent-recall'
import './inject/mention'
import './commands'
init()