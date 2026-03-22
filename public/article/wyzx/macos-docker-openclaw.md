# Mac 上基于 Docker 安装 OpenClaw 指南

> 更新日期：2026-03-22

> 基于 Docker 在 macOS 上快速部署 OpenClaw

## 前置要求

- **macOS 10.15+**
- **Docker Desktop** for Mac（需分配至少 2GB 内存）
- **终端**（Terminal 或 iTerm2）

## 安装步骤

### 克隆 OpenClaw 仓库

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
```

### 切换到最新稳定版本（重要！）

> ⚠️ main 分支最新代码可能有 bug，建议使用最新稳定 tag

```bash
# 查看所有可用版本
git tag

# 切换到最新版本（例如 v2026.3.13）
git checkout v2026.3.13
```

### 运行 Docker 安装脚本

> 确保 Docker Desktop 已启动

```bash
./docker-setup.sh
```

这个脚本会：
- 本地构建 OpenClaw 镜像
- 启动安装向导
- 通过 Docker Compose 启动 gateway
- 生成访问 token 并写入 `.env`

### 运行 Docker 安装脚本（补充命令）

> 由于某些网络/配置原因，直接访问可能需要额外配置。以下命令来自社区经验总结：

```bash
# 允许所有来源的 Control UI 访问
docker compose -f docker-compose.yml run --rm openclaw-cli \
  config set gateway.controlUi.allowedOrigins '["*"]' --strict-json

# 禁用设备认证（用于开发/调试）
docker compose -f docker-compose.yml run --rm openclaw-cli \
  config set gateway.controlUi.dangerouslyDisableDeviceAuth true

# 允许非安全认证
docker compose -f docker-compose.yml run --rm openclaw-cli \
  config set gateway.controlUi.allowInsecureAuth true
```

> 📖 **出处**: [Mo-Morris/bibi-share](https://github.com/Mo-Morris/bibi-share/blob/main/opencalw/install-command.md)
>
> 🎬 **视频教程**: [OpenClaw Docker部署演示 | 1:1复刻官方文档实践](https://b23.tv/7PAvXhW)

### 访问 Control UI

配置完成后，在浏览器打开：

```
http://127.0.0.1:18789/
```

将 token 粘贴到 Settings → token 即可。

## 常用命令

### 快捷 alias（推荐添加）

```bash
# 添加到 ~/.zshrc 或 ~/.bashrc
alias dopenclaw='docker compose -f docker-compose.yml run --rm openclaw-cli'
```

使用方式：

```bash
dopenclaw config    # 查看当前配置
```

| 命令 | 说明 |
|------|------|
| `docker compose up -d` | 启动 OpenClaw |
| `docker compose down` | 停止 OpenClaw |
| `docker compose logs -f` | 查看日志 |
| `docker compose restart` | 重启 |
| `dopenclaw config` | 查看当前配置 |

## 外部 Chrome 配置（可选）

### 启动 Chrome 并开启远程调试

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
--remote-debugging-port=9222 \
--remote-debugging-address=0.0.0.0 \
--user-data-dir=/tmp/chrome-remote \
--disable-features=IsolateOrigins,site-per-process
```

**参数说明：**

| 参数 | 作用 |
|------|------|
| `--remote-debugging-port=9222` | 开启远程调试端口 |
| `--remote-debugging-address=0.0.0.0` | 允许外部设备连接调试（Docker 容器需要） |
| `--user-data-dir=/tmp/chrome-remote` | 使用独立的配置文件目录，避免与日常浏览器冲突 |
| `--disable-features=IsolateOrigins,site-per-process` | 禁用隔离特性，提升兼容性 |

### Docker Compose 配置修改

需要在 `docker-compose.yml` 中添加 `extra_hosts` 以支持宿主机访问：

```yaml
services:
  openclaw-gateway:
    extra_hosts:
      - "host.docker.internal:host-gateway"
```

### 当前配置说明

当前环境已配置 `browserless` 配置文件，指向宿主机：

```json
{
  "browser": {
    "enabled": true,
    "headless": true,
    "attachOnly": true,
    "defaultProfile": "browserless",
    "profiles": {
      "browserless": {
        "cdpUrl": "http://host.docker.internal:9222",
        "color": "#007BFF"
      }
    }
  }
}
```

- `attachOnly: true` 表示**不启动本地浏览器，仅附加**到已运行的 Chrome
- CDP URL 指向 `host.docker.internal:9222`，即宿主机端口

### 验证 CDP 连接

在 Control UI 中发送以下提示词验证 browserless 浏览器配置：

```
请验证browserless浏览器配置，CDP连接是否正常，相关配置在openclaw.json里，调用对应配置的json/list检查是否可用
```

验证方式：
1. 打开 `http://127.0.0.1:18789/`
2. 向 AI 发送上述提示词
3. 检查返回结果确认 CDP 连接状态

## Docker IPv6 配置（可选）

### Docker Dashboard 中开启 IPv6

1. 打开 **Docker Desktop** → **Settings**
2. 选择 **General** 选项卡
3. 勾选 **Enable IPv6** 选项
4. 点击 **Apply & Restart** 保存配置

### 验证 IPv6 是否启用

```bash
docker info | grep -i ipv6
```

---
