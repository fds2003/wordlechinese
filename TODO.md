# Wordle Chinese — 待办事项

> 更新时间：2026-05-11

## 1. GSC 操作（立即可做）

- [ ] 1.1 重新提交 sitemap：GSC → Sitemaps → 输入 `answer-sitemap.xml` → 重新提交
- [ ] 1.2 手动请求索引：URL inspection → `https://wordlechinese.com/learn-chinese-with-wordle.html` → 请求编入索引
- [ ] 1.3 等待数天，检查 GSC "已发现的网页" 数量是否从 365 增长

## 2. Vercel 生产环境配置

- [x] 2.1 域名绑定：`wordlechinese.com` + `www.wordlechinese.com` ✅
- [x] 2.2 `www` → apex 301 重定向 ✅ 已验证
- [ ] 2.3 添加环境变量：Settings → Environment Variables → `VITE_GA_MEASUREMENT_ID`，仅 Production
- [ ] 2.4 浏览器验证：打开 wordlechinese.com，确认游戏可玩、语言切换正常、SEO 文件可访问

## 3. Cloudflare DNS

- [ ] 3.1 确认 CNAME 记录指向 Vercel（wordlechinese.com 和 www）
- [ ] 3.2 添加 GSC DNS 验证 TXT 记录（如果还没加）

## 4. Google Search Console

- [ ] 4.1 确认 `wordlechinese.com` 属性已验证（DNS TXT）
- [ ] 4.2 提交 `sitemap.xml`（sitemap index）
- [ ] 4.3 提交 `answer-sitemap.xml`
- [ ] 4.4 定期关注 "已发现 - 尚未编入索引" 数量

## 5. 可选：OG 分享图

- [ ] 5.1 制作一张 1200×630 的品牌分享图（带 "Learn Chinese Through Daily Idiom Puzzles"）
- [ ] 5.2 替换 `index.html` 和 answer 页面模板中的 `i.imgur.com/HaFiQgi.jpg`

## 6. 后续可做

- [ ] 6.1 申请 Google AdSense（GSC 收录稳定后）
- [ ] 6.2 删除旧的 `.github/workflows/deploy.yml`（GitHub Pages，已废弃）
- [ ] 6.3 清理 `vite.config.js` 中未使用的 `__COMMIT_HASH__` define
- [ ] 6.4 观察 2-4 周 GSC 数据，决定是否继续投入内容运营
