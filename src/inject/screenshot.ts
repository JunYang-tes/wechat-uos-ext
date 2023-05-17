import { addSendHook, emit } from "./hook-points/ipcRender";
const exec = require('child_process').exec
const fs = require("fs")


addSendHook('SCREENSHOT::START', () => {
  fs.unlink('/tmp/flameshot.png')
  exec("flameshot gui -p /tmp/flameshot.png", (err) => {
    if (!err) {
      emit('SCREENSHOT::SAVE_Local_Success',
        null, {
        filePath: '/tmp/flameshot.png',
        isShare: false
      })
    }
  })
  return true
})


