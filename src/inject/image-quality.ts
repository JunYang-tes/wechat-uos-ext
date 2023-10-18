import { addInvokeHook, ipcRenderer } from './hook-points/ipcRender'
addInvokeHook("MessageManager.sendImageMessageAsync", {
  kind: 'intercept',
  func: async ({ args, context, original }) => {
    // args[0] method name 
    // args[1] params
    /**
     *      params: [
							"task_id",
							"username",
							"thumbnail_path",
							"media_path",
							"is_send_hd",
						],
     * */
    console.log("sendImageMessageAsync", args)
    // is_send_hd 原本是 true，微信将图片压缩的太狠（1/7 到 1/10）
    // 将其改为 false 就不会压缩，副作用未知
    args[1][4] = false
    return original.apply(context, args)
  }
})
