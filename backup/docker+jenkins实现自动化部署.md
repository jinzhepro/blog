使用docker+jenkins实现自动化部署个人网站，只记录过程和可能要注意的点。

# Docker

docker是一个应用容器引擎，可以理解为是操作系统上的软件包（容器）的集合，其容器之间相互独立，没有接口，完全使用沙箱机制隔离，容器内部的软件可以映射端口到宿主机。

使用docker可以更便捷的管理软件，性能开销也极低。

## 安装docker

[[官方文档](https://docs.docker.com/install/linux/docker-ce/centos/)](https://docs.docker.com/install/linux/docker-ce/centos/)

- *注意：centos8系统安装时可能会出现`containerd.io`装不上的情况，这是要自己手动安装*

```
dnf install <https://download.docker.com/linux/centos/7/x86_64/stable/Packages/containerd.io-1.2.6-3.3.el7.x86_64.rpm>

```

- *当我们pull镜像的时候会很慢（墙），可以修改为阿里镜像加速器*[[文档](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)

### 使用docker安装jenkins

```bash
docker pull jenkinsci/blueocean
```

我这里使用的得是官方推荐的LTS版本，其他版本你可以使用 `docker search jenkins` 查看

### 运行jenkins

```bash
docker run \\
  -u root \\
  --rm \\
  -d \\
  -p 8080:8080 \\
  -p 50000:50000 \\
  -v /home/jenkins:/var/jenkins_home \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  jenkinsci/blueocean
```

解释：

- `docker run`: docker 运行镜像命令
- `u root`: 使用root用户运行，这样我们就没有权限问题
- `-rm`: 容器关闭时自动删除容器（可选）
- `d`: 后台运行
- `p 8080:8080`: `主机端口`:`容器端口`，这样我们就能使用ip:8080端口访问到容器的8080端口。
- `p 50000:50000`: 主站通信。
- `v /home/jenkins:/var/jenkins_home`: 映射jenkins工作目录到宿主主机的`/home/jenkins`下，这样我们在双方下的操作都会映射到对方的文件里
- `v var/run/docker.sock:/var/run/docker.sock`: 映射docker的主进程，这样我们就可以在jenkins内部调用宿主docker的api

### 修改jenkins下载源

国内使用jenkins会有插件下载失败的情况，我们可以换成清华园的地址

1. `cd /home/jenkins/updates` 进入工作目录

```bash
sed -i 's/http:\\/\\/updates.jenkins-ci.org\\/download/https:\\/\\/mirrors.tuna.tsinghua.edu.cn\\/jenkins/g' default.json && sed -i 's/http:\\/\\/www.google.com/https:\\/\\/www.baidu.com/g' default.json
```

修改default.json中的源地址

## 创建nodejs中的Dockerfile

```bash
# 基础镜像为node:10.10.0
FROM node:10.10.0

# 创建容器内的项目存放目录
RUN mkdir -p /home/node
# 设定工作目录
WORKDIR /home/node

#  将Dockerfile当前目录下所有文件拷贝至容器内项目目录并安装项目依赖
COPY . /home/node
# 修改npm源地址
RUN npm config set registry <http://registry.npm.taobao.org>

RUN npm install

# 容器对外暴露的端口号
EXPOSE 8081

# 执行命令
ENTRYPOINT [ "npm", "start" ]
```

## 部署思路

我们部署的思路是jenkins连接ssh服务器（需要Publish Over SSH）进入到/home/jenkins/workspace/website-node工作目录里运行docker build和docker run 命令，理解思路即可。

<img width="969" alt="78467379-ce3cf300-773e-11ea-81e4-066a58754d28" src="https://github.com/user-attachments/assets/7505eca6-cc21-4937-a5af-314df6e218c9" />


# 单页面的部署思路

以上是nodejs的部署，前端单页面使用linux scp命令直接上传到nginx静态页面目录下，因为服务器在npm install的时候经常崩溃（内存太小），所以退而求其次，在本地build之后把dist目录上传到服务器上。

```bash
npm run build && scp -r build/* root@xxx.xxx.xxx.xxx:/home/nginx/www
```