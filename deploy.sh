#!/usr/bin/env sh
# 确保脚本在出现错误时立即退出
set -e

# 打印当前目录和脚本信息
echo "=== 开始文档部署 ==="
echo "当前目录: $(pwd)"
echo "使用 pnpm 构建文档..."

# 使用 pnpm 构建文档（与项目配置保持一致）
pnpm run docs:build

# 检查构建输出目录
echo "检查构建输出目录..."
if [ ! -d "docs/.vitepress/dist" ]; then
  echo "错误: 构建输出目录 docs/.vitepress/dist 不存在！"
  exit 1
fi

# 进入构建输出目录
cd docs/.vitepress/dist

echo "进入目录: $(pwd)"
echo "配置 git 用户信息..."

# 配置 git 用户信息
git config --global user.name "github-actions[bot]"
git config --global user.email "github-actions[bot]@users.noreply.github.com"

# 初始化 git 仓库并提交
echo "初始化 git 仓库..."
git init
git add -A
COMMIT_MSG="Deploy documentation: $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$COMMIT_MSG"

# 检查 GITHUB_TOKEN 是否设置
if [ -z "$GITHUB_TOKEN" ]; then
  echo "警告: GITHUB_TOKEN 环境变量未设置，将使用默认方式推送..."
  PUSH_URL="https://github.com/Bing-Chan/earMonster.git"
else
  PUSH_URL="https://$GITHUB_TOKEN@github.com/Bing-Chan/earMonster.git"
fi

# 推送代码到 gh-pages 分支
echo "推送到 GitHub Pages 分支..."
git push -f "$PUSH_URL" master:gh-pages

# 返回原目录
cd -
echo "=== 文档部署完成 ==="
