# gpt web

## 介绍

- 方便Vercel部署的基于OpenAI API Key的Web客户端
- 省去反代与IP限制
- 同时本API可以做反代使用
- 支持网站密码
- API Key支持设置到环境变量里或前端

本项目主要为了方便Vercel部署， index.html 来自 **[chatgpt-web](https://github.com/xqdoo00o/chatgpt-web)**， 因此如果你想使用静态页面版本，请访问 **[chatgpt-web](https://github.com/xqdoo00o/chatgpt-web)**。

支持复制，刷新，语音输入，朗读等功能，以及众多[自定义选项](#自定义选项)。

参考项目: 
[markdown-it](https://github.com/markdown-it/markdown-it), 
[highlight.js](https://github.com/highlightjs/highlight.js), 
[github-markdown-css](https://github.com/sindresorhus/github-markdown-css), 
[chatgpt-html](https://github.com/slippersheepig/chatgpt-html), 
[markdown-it-copy](https://github.com/ReAlign/markdown-it-copy), 
[markdown-it-texmath](https://github.com/goessner/markdown-it-texmath), 
[awesome-chatgpt-prompts-zh](https://github.com/PlexPt/awesome-chatgpt-prompts-zh)

![示例](https://github.com/alitrack/gptweb/blob/master/example.png)

## Deploy With Vercel（部署到Vercel)

[![Deploy with Vercel](https://camo.githubusercontent.com/5e471e99e8e022cf454693e38ec843036ec6301e27ee1e1fa10325b1cb720584/68747470733a2f2f76657263656c2e636f6d2f627574746f6e)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Falitrack%2Fgptweb&env=OPENAI_API_KEY&envDescription=OpenAI%20API%20Key&envLink=https%3A%2F%2Fplatform.openai.com%2Faccount%2Fapi-keys)

> 可根据需要设置网站访问密码：[`SITE_PASSWORD`](https://github.com/alitrack/gptweb#environment-variables)
> 
> [![Deploy with Vercel](https://camo.githubusercontent.com/5e471e99e8e022cf454693e38ec843036ec6301e27ee1e1fa10325b1cb720584/68747470733a2f2f76657263656c2e636f6d2f627574746f6e)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Falitrack%2Fgptweb&env=OPENAI_API_KEY&env=SITE_PASSWORD&envDescription=OpenAI%20API%20Key&envLink=https%3A%2F%2Fplatform.openai.com%2Faccount%2Fapi-keys)
>

## Demo

[在线预览](https://gptweb-theta.vercel.app/) （使用需配置自定义API key）


## 自定义选项

1. 可选GPT模型，默认gpt-3.5，当前使用gpt-4模型需通过openai的表单申请。

2. 可选API key，默认不设置，如需用户自定义API key使用，建议Nginx一定要配置https，公网以http方式明文传输API key极易被中间人截获。

3. 可选系统角色，默认不开启，有三个预设角色，并动态加载[awesome-chatgpt-prompts-zh](https://github.com/PlexPt/awesome-chatgpt-prompts-zh)中的角色。

4. 可选角色性格，默认灵活创新，对应接口文档的top_p参数。

5. 可选回答质量，默认平衡，对应接口文档的temperature参数。

6. 修改打字机速度，默认较快，值越大速度越快。

7. 允许连续对话，默认开启，对话中包含上下文信息，会导致api费用增加。

8. 允许长回复，默认关闭，开启后可能导致api费用增加，并丢失大部分上下文，对于一些要发送`继续`才完整的回复，不用发`继续`了。

9. 选择语音，默认Bing语音，支持Azure TTS和系统TTS，可分开设置提问语音和回答语音。

10. 音量，默认最大。

11. 语速，默认正常。

12. 音调，默认正常。

13. 允许连续朗读，默认开启，连续郎读到所有对话结束。

14. 允许自动朗读，默认关闭，自动朗读新的回答。

15. 支持语音输入，默认识别为普通话，可长按语音按钮修改识别选项。如浏览器不支持语音输入，则不显示语音按钮（HTTPS+Edge浏览器体验最佳）。如点击语音按钮没反应，则未允许麦克风权限，或者没安装麦克风设备。

16. 左边栏支持功能，新建会话，重命名，删除会话。导出所有会话，导入会话文件，清空所有会话。

## Environment Variables

You can control the website through environment variables.

| Name | Description | Default |
| --- | --- | --- |
| `OPENAI_API_KEY` | 你的OPENAI API Key | `null` |
| `SITE_PASSWORD` | 网站密码. 如果不设置，任何人可以访问 | `null` |
| `ALLOWED_ORIGIN` | 允许的 Origin 列表，支持通配符 | `null` |
