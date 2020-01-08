# PET ME HOME：宠物信息发布与领养平台
## 项目简介
或许我们都曾看过此类社会新闻：流浪动物保护站压力巨大，流浪动物生存环境恶劣，志愿者投入大量时间精力却仍然力不从心；或许我们想要收养救助流浪动物，却不知道如何联系当地救助站；或许我们发布微博、朋友圈寻找走失宠物，但发现传播范围有限，努力只是徒劳；或许我们看到路边疑似走失的动物，却无法联系主人。这些痛点的本质是需求双方的信息不对等。
因此，本项目试图搭建一个信息公开平台，实现以下功能：
- 救助站：发布现居流浪宠物信息
- 个人：浏览信息，领养、关注宠物，发布走失信息与提供线索，简单的个人中心管理功能

## 项目设计
### 整体架构
本项目前后端分离，前端采用ionic框架开发用户界面，通过rest api调用与后端express server进行交互，后端服务器通过mongoose.js操作mongodb。
系统设计框图如下：
![enter image description here](https://lh3.googleusercontent.com/wQ_G7ZYC-35Rwd465OVHJNaoBSXX0giSiJk8N2byzDv3bYUOMwwKX__wiCsEcwnegh0bIFZXl3E=s1500 "系统框图")
### 目录结构
```
src
├── app
│   ├── auth 注册登录系统
│   │   ├── login 
│   │   └── register
│   ├── explore 流浪宠物信息
│   │   └── detailmodal 宠物详情
│   ├── personal 个人中心
│   │   ├── detailmodal 查看个人发布、关注、领养、消息
│   │   ├── password 修改密码
│   │   ├── profile 修改个人资料
│   │   └── settings 设置
│   ├── post
│   │   ├── postlost 发布走失信息
│   │   └── postpet 发布宠物信息
│   ├── services 
│   ├── tabs
│   └── view 走失信息
│       └── detailmodal 走失详情
├── assets
│   └── icon
├── environments 服务器url配置
└── theme

```

### 技术难点
- ionic环境配置：版本兼容问题。
	- 我用的是ionic CLI 5.4.4版本，一开始为了兼容性没有装最新的安卓SDK版本，只装了android26。但是后来发现ionic v3后最低要求为android28。运行模拟器时，安装intel haxm硬件加速服务失败，只能在mac上手动安装。
- 登录系统：用户登录与验证主要采用json web token验证方式。
	- 对于用户注册请求，利用bcrypt库对密码进行hash后将密文存储于数据库中；对于用户登录请求，服务端生成一个token传送给前端，存储于本地，并实现定时过期机制(利用JwtHelperService检查本地存储的token是否有效); 对于某些必须登录才能进行的操作(如个人中心)，实现内容保护，前端试图访问被保护页面时检查token，失效则自动跳转至登录页，后端采用Passport  JWT中间件验证请求头部JWT信息(最终实现没有对后端路由进行特殊保护)。
	- 前端登录与注册页面采用Angular Reactive Forms实现了动态的表单输入验证，控制密码长度不少于四位，注册时确认密码必须与原密码相同，否则提示错误。
- 数据库架构：对非关系型数据库mongodb仍然采用分表和外键连接。
	- 主要数据表：User（用户信息），Pet（宠物信息），Lost（发布的丢失消息），Message（用户私信）
	- 以User表为例，服务端定义其主要字段为：email, password, nickname, avatar, adopt, favorite等。其中favorite表示用户关注的宠物列表，记录的是Pet表的ObjectId，相当于外键。虽然mongodb不支持通常意义的join操作，但是提供了query population，可以在从数据库中取User记录时指定需要populate的字段，将其ObejctId自动替换为对应的记录内容。由此避免了先取出ObjectId再进行多次数据库访问的开销，高效实现了数据表之间的交互关系。
- 服务器rest api设计：按照不同数据库表操作、不同请求方式、不同应用场景设计了完善的api。
	- 采用express的Router模块实现。针对不同的应用场景，考虑向服务器GET操作为拉取数据，即按照过滤条件访问数据库获得结果返回给客户端；向服务器POST操作为增加新的数据记录，根据请求体中信息在数据库中创建新的数据记录；向服务器PUT操作为部分修改，主要用于用户关注、领养宠物时向User记录添加新的Pet id。
	- 对于部分特别复杂的操作，比如对User记录的操作（领养宠物，发布宠物信息/走失信息，关注/取消关注宠物，修改个人资料等等都需要修改User记录中的字段），为避免过于复杂的API设计，采用在请求体中额外增加一个action字段的方式来指明具体操作，达到一个PUT api实现多种功能的效果。
- 跨域问题，模拟器的网络访问：采用局域网来解决。
	- 由于我没有配置有公网IP的服务器，mongodb和express server都是起在本地电脑上的。在模拟器调试时，发现模拟器中的localhost只能访问模拟器自身的网络而不能访问电脑的网络。最后采用手机给电脑开热点的方式形成了一个局域网，以局域网ip作为服务器的ip地址，解决了问题。跨域问题直接在express server中设置允许所有跨域请求。
	- 高版本的安卓还报错“Cleartext HTTP traffic not permitted”，需要在resources/android/xml/network_security_config.xml 中将localhost和手机局域网地址加入可信域。
- 图片显示与存储：base64编码字符串。
	- 设计了一个专门负责处理图片数据的service，将存储的图片数据保存在这个service的公有变量中。利用cordova camera plugin实现了本地相机和图库的调用。选择图片时弹出action sheet，选择相机拍摄或访问图库。
	- 刚开始设置的图片质量过高，base64编码字符串很长，而服务器端的body-parser设置了请求的json长度限制为10mb，导致一直报错，后来把限制调大到50mb解决了问题。
- 前端的动态状态显示：ngIf和ngfor的使用。
	- 前端显示丢失信息、宠物信息都是先从服务端拉数据，然后用ngFor循环展示所有item。有一些状态需要动态变化，比如点击关注需要在关注和不关注状态间来回切换，我直接写了两个html元素(红色的心和灰色的心)，通过ngIf判断当前关注状态，选择显示哪一个元素。
- 发送消息：没有采用动态私信，存储所有消息到数据库中。
	- 刚开始考虑过在app中引入实时聊天功能，由于自己写需要另外再开一个服务器负责消息中转，过于复杂；后来了解到极光即时消息SDK，但是限于时间没有实现。最后采用了比较简单的方式，没有设计完全自由的用户私信模式，仅仅提供了两个发送消息的接口：领养宠物时向其主人发送请求，向失主提供丢失宠物的线索。Message表的字段主要为：from，to，lostid/petid，message，date。在个人中心里可以查看自己收到的消息，显示发送者的昵称、头像、消息内容等。
- 页面生命周期：模拟器才能显示的数据更新延迟问题。
	- 一开始对ionic的页面生命周期不理解，在查看丢失信息和宠物信息的页面，只在页面初始化的ngOnInit事件中拉取数据，而浏览器调试因为没有页面栈的概念，并没有显示出任何问题。后来发现模拟器中发布了新的丢失信息后没有同步更新显示，意识到需要在每次页面切换的ionViewWillEnter事件中重新拉取数据。
- 开屏splash screen：屏幕适配。
	- 不算特别的难点，直接安装引入cordova splashscreen plugin即可。但是在具体配置时，config.xml中对每种屏幕尺寸都要适配，做了十几张不同尺寸的开屏图片，还是很有工作量的！
- 大量ionic原生组件：尽量形成真实的app感。
	- 充分利用ionic原生组件，形成真实的ios应用风格。采用当前流行的流式卡片布局，带头像的消息列表设计等。
	- 考虑交互友好的操作模式。选择时间日期时采用ionic提供的date&time picker，选择上传图片时用action sheet提供拍照或打开图库的选择，发送完消息必有alert和toast等成功提示。
- 多个页面采取了不同显示方式：主要页面用tab，详情页面用modal。
	- 为了尽量模拟原生app，设计了页面底部三个主要的tab页面，分别展示救助站流浪宠物信息、丢失信息、个人中心。对于详情页面，采取弹出全屏modal框的形式，关闭modal框之后原来页面的浏览进度会保留，用户交互更加自然。实现方法为点击某个item时将其具体数据通过modal的navParams进行传递。
	- 发布信息的入口设置在个人中心的用户头像旁边，点击action button弹出两个不同的按钮，选择发布宠物信息或丢失信息。
- 搜索功能：前端关键字实时过滤。
	- 在流浪宠物信息展示页面增加了一个ionic提供的原生搜索框，前端页面加载时直接从数据库中拉取所有数据，根据输入的关键字对所有item的可搜索字段进行匹配过滤，减少了反复网络请求的开销，目前没有实现模糊查询。


## 项目运行
### 运行环境
node.js 10.16.0 + ionic CLI 5.4.4 + cordova 9.0.0  
安卓模拟器 Pixel 2 Android API 28 x86 CPU  
对于不需要用到原生功能（即拍照）的操作，可直接在浏览器运行；否则必须在模拟器中运行。
### 运行步骤
#### 启动服务器
git clone https://github.com/iris-j/PETMEHOME-server.git
1. 修改config.js中'database':  'mongodb://localhost:27017/pet'为可用的mongodb地址。
2. node server.js启动服务
3. 检查\<serverIP\>:9090/api是否可以正常访问
#### 启动客户端
git clone https://github.com/iris-j/PETMEHOME.git
1. npm install -g cordova ionic 安装ionic和cordova
2. 进入项目根目录，npm install安装依赖包
3. 修改src/environments/environment.ts中的url和server_url为服务器ip(浏览器调试可用localhost，否则为公网ip或者手机局域网ip，详情见技术难点)
4. ionic serve 浏览器调试运行
5. ionic cordova emulate android -l -c 模拟器调试运行，热替换；打开chrome://inspect/#devices 可以查看当前运行的模拟器的后台输出

demo视频：https://www.bilibili.com/video/av82497839/
