# ڕاپۆرتی حەکەمایەتی کایەکانی سیستم و نەخشەی نوێکردنەوەی بواری دەروازەکان
## National Border Operating System (BOS) Scope Lock & Module Inventory

ئەم بەڵگەنامەیە سەرجەم فایل، زۆن، و مۆدیۆلەکانی سیستەمەکە پۆلێن دەکات بۆ پاراستنی توندترین چوارچێوەی دەسەڵاتی دەروازە سنوورییەکان و نەهێشتنی تێکەڵبوونی کایەکانی دەرەوەی سنور.

---

### ١. مۆدیۆلە گومرگی و سنوورییە چالاکەکان (Core Active Modules in Scope)

سەرجەم فایل و خزمەتگوزارییانەی کە دەبێت کارا بمێننەوە لە چوارچێوەی بەستن و باڵانسی سنوورەکان:

* **هاوسەنگی دەروازەکان (`CORE_BORDER` / `CORE_CUSTOMS`):**
  - `src/shared/border/` - بەدواداچوونی مەیدانی دەروازەکان.
  - `src/shared/customs/` - لۆجیکی هەڵسەنگاندن و نرخاندنی گومرگی.
  - `src/shared/trade/` - ووردەکاری پاکتاو و تێپەڕینی مۆڵەتەکان.
  - `src/shared/revenue/` - تۆماری داهات و گومرگی دەروازەکان.
  - `src/shared/transparency/` - لیدجەری گشتی بۆ بەڵگەنامە هاوبەشەکان.
* **هاوسەنگی مێتا-داتای یەکگرتنەوەی دەروازەکان (`CORE_BORDER_SETTLEMENT`):**
  - `src/shared/border-settlement/` - لۆجیک و بزوێنەری بیرکاری ڕێسای ٥٠٪ی دەروازەکان.
  - `server/src/zones/krg/borderSettlementRoutes.ts` - ڕێڕەوی فەرمی فیدراڵ-هەرێمی کەی جی بۆ باری گومرگی.
  - `server/src/zones/federal/borderSettlementRoutes.ts` - ڕێڕەوی فیدراڵی بۆ یەکگرتنەوەی مۆڵەتی دەروازەی سنوورەکان.
  - `server/src/zones/joint/borderSettlementRoutes.ts` - باری بێ-خستنەبەردەمی زانیاری خاوی هاژراو (Zero-Disclosure Joint verification).
  - `docs/release/border-revenue-settlement-policy.md` - چوارچێوەی یاسایی سنووری پێناسەکراو کەرتبوو بە ماددەکانی ١١٠، ١١٤ و ١٢١ی توندی دەستوور.

---

### ٢. سەرچاوەکانی پاڵپشتی پیشاندانی بۆردی کایەکان (Supporting UI & Audit Infrastructure)

* `src/shared/scope/` - مۆدیۆلی بەستێن و دۆزینەوەی گونجاوی فۆرماتی کارەکان.
* `src/infrastructure/krg-digital/` - پاڵپشتکاری نیشتمانی بۆ ڕێکخستنی سیستەم و کارەکانی هەولێر.
* `scripts/qa/check-border-settlement-policy.mjs` - فایلی پشکنینی خۆکار بۆ قوفڵکردنی دەروازەکان.

---

### ٣. فایلەکانی دۆخی پێشکەشکاری و تێست (Demo-Only Artifacts)

* `src/mockData.ts` - بەکاردێت بۆ پیشاندانی ڕووکاری شاشە مەیدانییەکان لە چوارچێوەی کارپێکردنی گڵۆپەکان، بەڵام هیچ کاریگەرییەکی فەرمی دارایی یان گوتاری ئەمریکی/بەغدادی حەکەمایەتی لەسەر نەخشەی کۆتایی نییە.

---

### ٤. فایل و مۆدیۆلەکانی ئەرشیڤکراو (Archive Candidates for Phase 5.20)

ئەم فایلانە بە جێگرەوەی زۆنی گشتیی مێتاداتا دەستنیشان کراون و لە لێواری بەتەواوی سڕینەوەدان لە خولی داهاتوودا:

1. `src/shared/revenue-settlement/` - کایەی یەکلاییکردنەوەی بودجەی گشتی کە دەرەوەی پێناسەی توندی دەروازە سنوورییەکان بوو.
2. `server/src/zones/krg/settlementRoutes.ts` - ڕێڕەوی کۆنی فیدراڵ و هەرێمی داهاتی ناوخۆیی مەدەنی.
3. `server/src/zones/federal/settlementRoutes.ts` - ڕێڕەوی کۆنی فێدراڵی دانی داهاتەی تێکەڵ.
4. `server/src/zones/joint/settlementRoutes.ts` - ڕێڕەوی تارتکراوی یەکلاییکردنەوەی بودجە.
5. `scripts/qa/check-fiscal-settlement-policy.mjs` - پشکنەری کۆنی کایە داراییە تێکەڵەکان.
6. `docs/release/federal-krg-fiscal-settlement-policy.md` - پەروەرتکاری بە ڕەنگی بودجەی نیشتمانی.

---

### ٥. فایل و کایەکانی دەرەوەی بنەمای ڕێگا مەیدانییەکان (Strictly Out of Scope Files)

ئەم بەشانە نیش نراون بە نەشاوی کار و لە خولی نوێدا هیچ دەسەڵاتێکی ڕاپۆرتکردنیان بە فەرمی نابێت:

* **سیاسەتی نیشتمانی نەوت و گاز (`OIL_REVENUE`):**
  - لای حەشارگەی بەستەرەکانی نیشتمانی دەرەوەی کارپێکردنە.
* **هاوکاریکارانی مووچە و شایستە داراییەکان (`PAYROLL` / `SALARY_DOMICILIATION`):**
  - فەنکشنی پێکەوە بەستنی مووچەی مەدەنییەکان کە تەواو دەرەوەی چالاکیی دەروازە گومرگییە نیشتیمانییەکانە.
* **ڕووکاری بۆردی گشتی خاوەن مووڵەتی تر (`Sovereign_Super_App`):**
  - فرەکایەکردن و پلاتفۆرمی پرۆسیورمێنت (Procurement) و یەکەکانی خاوەندارێتی دەوڵەتی (State Assets) کە دەرەوەی یەکەی سنووری و دەروازە گومرگییە دیاریکراوەکانن.

---

### ٦. وردبینی ڕووکاری مینیو یان ناوگۆڕینی ناونیشانەکان (Runtime Navigation & Label Softening)

هەموو جۆرە کلیل، تایل یان ناونیشانێکی سەر بە پلاتفۆرمە کۆنەکان کران بە شێوازێکی بێ-ڕێککەوتن و نەرم تەرخانکراو بە باری فەرمی توندی دەروازە گومرگییەکان:

* **Nav Option 1:** `National Border Operating System (BOS)`
* **Nav Option 2:** `Border Command Center`
* **Nav Option 3:** `Customs Coordination`
* **Nav Option 4:** `Border Revenue Settlement`
* **Nav Option 5:** `Joint Border Reconciliation`
* **Nav Option 6:** `KRG Digital Compatibility`

هەمیشە ئەم شوناسە پارێزراوە لەبەر ئەوەی بەهێزترین سیستەمی کۆنترۆڵی خاوەن دەوران لە ژێر بنەمای نیشتمانی باری دەروازە سنوورییەکان پێڕەو دەکات.

---

### Phase 5.21 Backend/API Scope Pruning & Readiness Normalization

ئەم بەشە لە ژێر قۆناغی ٥.٢١ زیادکراوە بۆ بە فەرمیکردنی ڕاکێشان و دابڕینی دەروازەی سنووری و دڵنیابوونەوە لە پاکی پێشکەشکارەکان:

* **Active Production Backend Entrypoint:** `server/src/index.ts` (Isolated, high-integrity architecture).
* **Routes Retained:**
  - `/api/v1/health` & `/api/v1/readiness` (Conditional State)
  - `/api/v1/federal/border/*`
  - `/api/v1/federal/customs/*`
  - `/api/v1/federal/trade/*`
  - `/api/v1/federal/border-settlement/*`
  - `/api/v1/krg/border/*`
  - `/api/v1/krg/customs/*`
  - `/api/v1/krg/trade/*`
  - `/api/v1/krg/border-settlement/*`
  - `/api/v1/krg/krdpass/*`
  - `/api/v1/krg/brs/*`
  - `/api/v1/joint/border-reconciliation`
  - `/api/v1/joint/border-settlement-reconciliation`
  - `/api/v1/joint/hash-verification` (metadata proofs)
  - `/api/v1/joint/metadata-exchange` (metadata proofs)
  - `/api/v1/joint/audit-verification` (metadata proofs)
  - `/api/v1/joint/provider-readiness` (provider readiness summary)
* **Routes Disabled/Archived:**
  - Removed broad fiscal settlement endpoints (`/settlement/readiness` & `/settlement/reconciliation`).
  - Extracted general user identity, payroll, procurement, state assets, and workforce routes.
  - Renamed and explicitly scoped risk and alert systems to `/border-security/*` and `/border-risk/*`.
* **Readiness Correction Summary:** High-integrity fallback logic returned `CONDITIONALLY_READY — BORDER API SURFACE VERIFIED, PROVIDERS REQUIRED` rather than claiming a false READY state when required providers remain `NOT_CONFIGURED`.
* **Joint Metadata-Only Enforcement Summary:** No raw transaction data sharing or cross-jurisdiction billing profiles are exposed at the Joint layer; interchange passes solely cryptographic proof hashes and status aggregates.
* **Demo/Mock Server Quarantine:** Root `server.ts` is explicitly labeled and quarantined with warnings (`DEMO_ONLY_SERVER`, `NOT_PRODUCTION_ENTRYPOINT`). It serves only as a localized UI design playground and does not represent the production staging gateway.
