<img src="public/favicon.svg" width="64" height="64" alt="">

# personal-website

[tsaicy.dev](https://tsaicy.dev) 的原始碼。使用 [Astro](https://astro.build) 建置，部署在 Cloudflare Workers（靜態資源）。

## 開發

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # 輸出到 dist/
npm run preview  # 用 wrangler 在本機模擬正式環境
```

首頁內容都在 `src/data/site.ts`，改那個檔案就好。

## 部署

推到 `main` 會由 GitHub Actions（`.github/workflows/deploy.yml`）自動建置並執行 `wrangler deploy`。
PR 只會跑型別檢查和建置，不會部署。

需要的 repository secrets：

| 名稱 | 說明 |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token，使用「Edit Cloudflare Workers」範本建立 |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 帳號 ID |

網域 `tsaicy.dev` 與 `www.tsaicy.dev` 透過 `wrangler.jsonc` 的 `routes`（custom domain）綁定。
