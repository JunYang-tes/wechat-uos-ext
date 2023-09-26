## Usage
1. 构建
2. 复制 dist/lib.umd.js 到 wechat-uos 目录. 例如： /usr/lib/wechat-uos/packages/renderer/dist/lib.umd.js
3. 编辑 wechat-uos 的 packages/renderer/dist/index.html,将下列代码插入到所有script标签之前
```html
<script script src="lib.umd.js"></script>
```

## hack了啥？

1. 将截图工具替换为了 flameshot
2. @群成员的时候可以搜索
3. 图片预览不开新窗口
4. 链接用默认浏览器打开
5. 发送剪切板的图片
6. 消息防撤回
7. 搜索表情
8. 搜索成员
