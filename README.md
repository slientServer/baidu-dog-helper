# Baidu LaiCiGou Helper


> 一个简单的百度[莱茨狗](https://pet-chain.baidu.com/)插件，百度发布了它的区块链产品莱茨狗，理念很好，可是APP特别是交易市场的体验实在是...，之前用了别人的插件(顺便感谢下，写个插件的想法很不错)去抢，发现总也抢不成功，于是就想着自己去写一个玩一玩，顺便学习下...插件本身非常简单，有时间的话继续更新：）

## 用法
### 前提：需要先在浏览器上登录过你的莱茨狗账户，之后插件才可以利用用户的cookie去购买，插件本身不会保存任何用户信息，这也是开源的优势...

### 1. 直接下载下来，在Chrome浏览器中输入[chrome://extensions/](), 然后勾选Developer Mode，再点击Load unpacked extension..., 选择下载文件中的build目录就可以了。安装之后看起来就是下面的样子：

![plugin](https://github.com/slientServer/baidu-dog-helper/blob/master/doc_image/plugin.png)

### 2. 点击浏览器右上角的狗图标，就会打开配置页面，看起来是下面的样子：

![configuration](https://github.com/slientServer/baidu-dog-helper/blob/master/doc_image/home.png)

#### 2.1 配置价格不多说了
#### 2.2 刷新数量：按照时间降序，获取市场最新发布指定数量的狗，建议不要设置太大，一来没必要，结合刷新频率，并不需要太高；二来，百度设置了单次查询数量的限制，大规模请求依赖并发，请求频率太高后续的请求会被百度服务器禁掉，获取不到数据。
#### 2.3 刷新频率：单位是秒，跟上面一样，不要太快。
#### 2.4 是否自动提交：不勾选的话需要手动提交，勾选的话会自动提交，但是需要输入验证码，尝试着去写自动识别验证码，发现识别效果不理想，因为这个验证码都是一个颜色，降噪之后也不理想，所以暂时就手动输入吧，输入后系统会使用这个验证码去抢至多五组符合条件的狗，验证码有效期很短，抢再多也没有意义。之后可以再尝试别的办法来识别验证码。

### 3. 配置好配置页面之后，一旦点击“匹配狗狗列表之后”便开始按照配置数据进行刷新，只要不关闭页面，刷新会一直持续下去。

![list](https://github.com/slientServer/baidu-dog-helper/blob/master/doc_image/list.png)

## 对于开发者
### 1. 想要修改自己用的同学，也只需要clone到自己本地按下面命令安装依赖就可以了。

### 1.1 npm install 安装依赖

### 1.2 npm start 启动server

### 1.3 npm run build 部署到build目录，之后就和上面用法一样了

# 小工具
> 增加了两个简单的小工具，针对[IVeryOne](https://beta.ivery.link/I/1939121)和小米的加密兔，使用起来也是非常简单。
![tool](https://github.com/slientServer/baidu-dog-helper/blob/master/doc_image/tool.png)

## IveryOne使用说明
跟前面一样，需要在浏览器内先登录账号，然后输入你想要读的人的文章的用户ID，再点击开始，之后等就好了，读完之后会有弹窗提示。花费的时间的取决于目标用户发的文章数量，为了避免给IveryOne服务器造成太大压力，阅读的速度大概是一到两秒一篇。

## 小米加密兔使用说明
这个更简单，用法一样，先在chrome浏览器登录账户，然后打开插件，输入频率就可以抢兔子了。同样，输入抽奖次数就可以自动抽奖了，一边抽就可以一边去账户查看结果了。
两个工具我试验了下，第一个，用了两次没抢到，因为小米的服务器会拒绝高频率的请求，虽然请求都发出了，对方不返回结果，所以依然抽不到，最关键原因应该是放出的量太少了。抽奖，抽了200次，没抽到兔子，每50次左右会抽到一次50萝卜，感觉玩起来没意思，所以就没有完善工具弹出结果。想用的随便用用，F12打开控制台，可以看到抽奖输出。

***
仅供娱乐学习使用，欢迎交流
***



