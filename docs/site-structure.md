# Wordle Chinese — 站点结构与内容架构

> 更新时间：2026-05-11
> 域名：https://wordlechinese.com/

---

## 一、站点总览

```
wordlechinese.com/
├── /                                          # 主页（SPA 游戏）
├── /answer/                                   # 每日答案页目录（730 页）
│   ├── 2026-05-11/index.html
│   ├── 2026-05-12/index.html
│   ├── ...
│   └── 2028-05-09/index.html
├── /learn-chinese-with-wordle.html            # 学习指南页
├── /privacy.html                              # 隐私政策页
├── /404.html                                  # 404 页面
│
├── /robots.txt                                # 爬虫规则
├── /sitemap.xml                               # Sitemap 索引
├── /sitemap-home.xml                          # 主页 + 静态页 sitemap
├── /answer-sitemap.xml                        # 答案页 sitemap（730 URL）
└── /site.webmanifest                          # PWA manifest
```

---

## 二、页面详情

### 2.1 主页 `/`

**类型**：SPA（Preact + Vite），游戏主入口  
**语言**：en（默认）/ zh-CN（可通过 `?lng=zh-CN` 切换）  

**SEO 标签**：

| 标签 | 值 |
|------|-----|
| `<title>` | Wordle Chinese — Learn Chinese Through Daily Idiom Puzzles |
| `<meta description>` | Learn Chinese through a daily idiom puzzle game. Guess the hidden Chinese idiom (成语) in 6 tries, understand the meaning, and build your vocabulary one word a day. |
| `<link canonical>` | https://wordlechinese.com/ |
| `<meta robots>` | 未显式设置（默认 index, follow） |
| `og:title` | Wordle Chinese — Learn Chinese Through Daily Idiom Puzzles |
| `og:description>` | 同上 description |
| `og:image>` | https://i.imgur.com/HaFiQgi.jpg (1200×630) |
| `og:locale>` | en_US |
| `twitter:card>` | summary_large_image |
| `hreflang` | en, zh-CN, x-default |

**结构化数据**：WebApplication JSON-LD  
- name: Wordle Chinese
- url: https://wordlechinese.com/
- applicationCategory: GameApplication
- offers: free

**页面内容结构**：

1. 游戏棋盘（4 字成语猜谜，6 次尝试）
2. 虚拟键盘（拼音输入）
3. 提示系统（Subtle / More Obvious）
4. 帮助弹窗（How to Play、About）
5. 语言切换（EN / 中文）
6. 底部链接：📖 How to Learn Chinese with Wordle

**目标关键词**：

| 层级 | 关键词 | 月搜索量（估算） |
|------|--------|------------------|
| Primary | Wordle Chinese | 1.1K |
| Primary | Chinese Wordle game | — |
| Secondary | learn Chinese with Wordle | — |
| Secondary | Chinese idiom puzzle game | — |
| Secondary | free Chinese Wordle | — |
| Long-tail | play Chinese Wordle online free | — |
| Long-tail | Wordle Chinese game daily puzzle | — |
| Brand | wordlechinese.com | — |

**内链出站**：
- → `/learn-chinese-with-wordle.html`（底部 footer）
- → `/privacy.html`（未直接链接，声明在 sitemap 中）

---

### 2.2 每日答案页 `/answer/YYYY-MM-DD/`

**类型**：静态 HTML（`generate-answers-deepseek.mjs` 生成）  
**数量**：730 页（2026-05-11 ~ 2028-05-09），每日一页  
**模板文件**：`generate-answers-deepseek.mjs`  
**数据来源**：`scripts/idiom-cache.json`（729 条成语数据） + `game-data/game-idioms.csv`（7209 条词库映射）  

**SEO 标签**（以 2026-05-11 为例）：

| 标签 | 值 |
|------|-----|
| `<title>` | Today's Wordle Chinese Answer for May 11, 2026 — Learn Chinese Idiom 坚定不移 (jiān dìng bù yí) |
| `<meta description>` | Today's Wordle Chinese answer and hints for May 11, 2026. Learn the Chinese idiom 坚定不移 (jiān dìng bù yí): To be firm and unwavering... Build your Chinese vocabulary one idiom a day with this free daily puzzle. |
| `<link canonical>` | https://wordlechinese.com/answer/2026-05-11/ |
| `<meta robots>` | index, follow |
| `hreflang` | en |
| `og:image>` | https://i.imgur.com/HaFiQgi.jpg (1200×630) |
| `twitter:card>` | summary_large_image |

**结构化数据**：

1. **Article JSON-LD**
   - headline: `Wordle Chinese Answer for May 11, 2026`
   - datePublished / dateModified
   - publisher: Wordle Chinese

2. **FAQPage JSON-LD**（5 个问答）
   - What is Wordle Chinese?
   - What is today's Wordle Chinese answer for YYYY-MM-DD?
   - Wordle Chinese hint 1 for YYYY-MM-DD
   - Wordle Chinese hint 2 for YYYY-MM-DD
   - How can I learn Chinese with Wordle?

3. **BreadcrumbList JSON-LD**
   - Home → Answer for YYYY-MM-DD

**页面内容结构**：

1. **Header**：Wordle Chinese 品牌链接
2. **Spoiler Warning**：剧透警告 + Play Today's Game CTA
3. **Idiom Display**：4 个汉字 + 拼音（大字展示）
4. **Play CTA Button**：▶ Play Today's Wordle Chinese
5. **Meaning Section**：成语含义（英文）+ 字面翻译 + 难度标签
6. **Example Section**：英文例句
7. **Hints Section**（折叠）：
   - Hint 1 — Subtle
   - Hint 2 — More Obvious
8. **Learn Chinese with This Idiom**（新增内容区）：
   - 成语含义解释
   - 字面翻译
   - 学习技巧：自己造句、间隔重复
   - 📖 链接 → Learn Chinese Guide
9. **Navigation**：← 前一天 / Today's Game / 后一天 →
10. **Footer**：© Wordle Chinese · Privacy Policy

**目标关键词**：

| 层级 | 关键词 | 页面覆盖 |
|------|--------|----------|
| Primary | Wordle Chinese answer today | 全部 |
| Primary | today's Wordle Chinese answer | 全部 |
| Primary | Wordle Chinese answer [date] | 全部 |
| Primary | Wordle Chinese hints | 全部 |
| Primary | learn Chinese idiom [idiom] | 每页唯一 |
| Secondary | Wordle Chinese solution | 全部 |
| Secondary | today's chengyu wordle answer | 全部 |
| Secondary | [idiom] meaning in English | 每页唯一 |
| Long-tail | [idiom] pinyin pronunciation | 每页唯一 |
| Long-tail | Chinese idiom of the day | 全部 |
| Long-tail | learn Chinese vocabulary daily | 全部 |
| Long-tail | what is today's Chinese wordle answer | 全部 |
| Long-tail | free Chinese word puzzle answer | 全部 |

**内链出站**：
- → `/`（Play Today's Game 按钮 + nav）
- → `/learn-chinese-with-wordle.html`（Learn Chinese 区）
- → `/answer/YYYY-MM-DD/`（前后日导航）
- → `/privacy.html`（footer）

---

### 2.3 学习指南页 `/learn-chinese-with-wordle.html`

**类型**：静态 HTML  
**用途**：SEO 内容页，攻教育类关键词，为答案页引流  

**SEO 标签**：

| 标签 | 值 |
|------|-----|
| `<title>` | How to Learn Chinese with Wordle — Free Daily Idiom Puzzle Game |
| `<meta description>` | Learn Chinese through a daily idiom wordle game. Discover how Chinese idioms (成语) work, get study tips, and build your vocabulary one word a day with Wordle Chinese. |
| `<link canonical>` | https://wordlechinese.com/learn-chinese-with-wordle.html |
| `og:type>` | article |
| `og:image>` | https://i.imgur.com/HaFiQgi.jpg (1200×630) |

**结构化数据**：Article JSON-LD  

**页面内容结构**：

1. **Header**：Wordle Chinese 品牌链接
2. **Intro**：学中文的痛点 → Wordle Chinese 如何解决
3. **Play CTA Button**：▶ Play Today's Game (Free)
4. **什么是成语？**
   - 定义 + 3 个例子（一石二鸟、入乡随俗、画龙点睛）
5. **为什么 Wordle Chinese 适合学习**
   - 一天一个 = 一年 365 个
   - Guess-and-check = 主动回忆
   - 拼音 + 意思一起学
   - 提示系统引导思考
6. **5 步学习法**
   - 每天固定时间
   - 读完整答案页
   - 自己造句
   - 复习旧成语
   - 策略性使用提示
7. **Sample Answer Pages**：3 个示例链接
8. **FAQ**（4 个问题）
9. **Play CTA Button**
10. **Footer**

**目标关键词**：

| 层级 | 关键词 |
|------|--------|
| Primary | learn Chinese with Wordle |
| Primary | how to learn Chinese with wordle |
| Secondary | Chinese learning game |
| Secondary | Chinese vocabulary game |
| Secondary | learn Chinese idioms online |
| Secondary | how to learn Chinese idioms |
| Long-tail | learn Chinese through wordle |
| Long-tail | Chinese idiom learning game free |
| Long-tail | best game to learn Chinese vocabulary |
| Long-tail | daily Chinese learning game |
| Long-tail | chengyu for beginners |
| Long-tail | what is a Chinese idiom (成语) |

**内链出站**：
- → `/`（两个 CTA 按钮）
- → `/answer/2026-05-11/`（样本 1）
- → `/answer/2026-06-01/`（样本 2）
- → `/answer/2026-07-01/`（样本 3）
- → `/privacy.html`（footer）

---

### 2.4 隐私政策页 `/privacy.html`

**类型**：静态 HTML  
**SEO 标签**：title、description、robots index,follow、OG、Twitter、WebPage JSON-LD  
**keywords**：privacy policy, Wordle Chinese privacy  
**内链出站**：→ `/`

---

### 2.5 404 页面 `/404.html`

**类型**：静态 HTML  
**SEO 标签**：`robots: noindex, follow`  
**keywords**：无（不索引）  
**内容**：404 标题 + Play Wordle Chinese CTA 按钮  
**内链出站**：→ `/`

---

### 2.6 SEO 文件

#### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://wordlechinese.com/sitemap.xml
```

#### sitemap.xml（Sitemap Index）
```xml
<sitemapindex>
  <sitemap><loc>sitemap-home.xml</loc></sitemap>
  <sitemap><loc>answer-sitemap.xml</loc></sitemap>
</sitemapindex>
```

#### sitemap-home.xml（2 URL）
| URL | changefreq | priority |
|-----|------------|----------|
| / | daily | 1.0 |
| /privacy.html | monthly | 0.3 |
| /learn-chinese-with-wordle.html | monthly | 0.7 |

#### answer-sitemap.xml（730 URL）
| URL | changefreq | priority |
|-----|------------|----------|
| /answer/YYYY-MM-DD/ | never | 0.6 |

---

## 三、关键词矩阵总表

### 品牌词
| 关键词 | 目标页 | 竞争度 |
|--------|--------|--------|
| Wordle Chinese | 主页 | 低 |
| wordlechinese.com | 全站 | 极低 |

### 游戏词
| 关键词 | 目标页 |
|--------|--------|
| Chinese Wordle game | 主页 |
| play Chinese Wordle online free | 主页 |
| free Chinese Wordle game | 主页 |
| Chinese idiom puzzle game | 主页 |
| Wordle Chinese daily puzzle | 主页 |

### 答案词（高意图流量）
| 关键词 | 目标页 |
|--------|--------|
| Wordle Chinese answer today | /answer/YYYY-MM-DD/ |
| today's Wordle Chinese answer | /answer/YYYY-MM-DD/ |
| Wordle Chinese hints | /answer/YYYY-MM-DD/ |
| Wordle Chinese solution today | /answer/YYYY-MM-DD/ |
| what is today's Chinese wordle answer | /answer/YYYY-MM-DD/ |
| today's chengyu wordle answer | /answer/YYYY-MM-DD/ |

### 学习词（差异化定位）
| 关键词 | 目标页 |
|--------|--------|
| learn Chinese with Wordle | /learn-chinese-with-wordle.html |
| how to learn Chinese with wordle | /learn-chinese-with-wordle.html |
| Chinese learning game | /learn-chinese-with-wordle.html |
| Chinese vocabulary game | /learn-chinese-with-wordle.html |
| learn Chinese idioms online | /learn-chinese-with-wordle.html |
| learn Chinese idiom [X] | /answer/YYYY-MM-DD/ (每页唯一) |

### 长尾词
| 关键词 | 目标页 |
|--------|--------|
| Chinese idiom of the day | /answer/YYYY-MM-DD/ |
| learn Chinese vocabulary one word a day | /answer/YYYY-MM-DD/ |
| free Chinese word puzzle answer | /answer/YYYY-MM-DD/ |
| daily Chinese learning game | /learn-chinese-with-wordle.html |
| chengyu for beginners | /learn-chinese-with-wordle.html |

---

## 四、内链拓扑

```
                    ┌─────────────────────┐
                    │       主页 (/)       │
                    │   SPA 游戏入口       │
                    └──────┬──────┬───────┘
                           │      │
              ┌────────────┘      └──────────────┐
              ▼                                  ▼
   ┌──────────────────────┐          ┌──────────────────────────┐
   │  学习指南页           │          │  答案页网络 (730 页)       │
   │  /learn-chinese-     │◄────────►│  /answer/YYYY-MM-DD/      │
   │  with-wordle.html    │  双向    │  互为前后日链接            │
   └──────────┬───────────┘          └──────────┬───────────────┘
              │                                 │
              └─────────────┬───────────────────┘
                            ▼
                  ┌─────────────────────┐
                  │  隐私政策页          │
                  │  /privacy.html       │
                  └─────────────────────┘
```

**爬虫路径优先级**：
1. 主页 → 学习指南页 → 3 个 sample answer 页 → 前后日导航 → 更多 answer 页
2. 主页 → answer sitemap → 全部 730 个 answer 页
3. 每个 answer 页 → 学习指南页（回链）

---

## 五、内容更新机制

| 内容 | 更新方式 | 频率 |
|------|----------|------|
| 游戏成语 | `npm run data` 重新生成 `game-idioms.csv` | 按需 |
| Answer 页面 | `node generate-answers-deepseek.mjs`（调 DeepSeek API）| 新增成语时 |
| Answer 页面 HTML | `node generate-answers-deepseek.mjs --html-only`（从缓存）| 修改模板后 |
| Sitemap | 同上脚本自动生成 | 每次修改后 |
| 学习指南页 | 手动编辑 `public/learn-chinese-with-wordle.html` | 按需 |
| 缓存扩充 | 脚本自动写入 `scripts/idiom-cache.json` | 生成时自动 |
