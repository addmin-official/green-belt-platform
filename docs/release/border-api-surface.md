# ڕاپۆرتی ڕووبەری فەرمی کارپێکردنی دەروازە گشتییەکان (Border API Surface Specification)

ئەم بەڵگەنامەیە بە فەرمی گواستنەوەی کایەکانی پلاتفۆرمی مێشکی زیرەکی بۆ چوارچێوەی بەستراوی دەروازە سنوورییەکان و نەهێشتنی کایە ناشاوە بەردەستەکان دەردەبڕێت.

---

### ١. کورتەی دۆخی فەرمی دەروازەی سنوور دژی کایەکانی گشتی (Border-Only Focus)
هەموو جۆرە لێکچوون یان کایەیەکی پەیوەندیدار بە بودجەی گشتی کز کراون، وە داتای چالاکی دەروازە گومرگییەکان مۆڵەت پێدراون:
* **تەنها کایەی سنوور (No General Fiscal or Payroll):** سیستەمەکە هیچ ڕێڕەو یان توانایەکی لەسەر نەوت، گازی نیشتمانی، مووچە، دانی گشتی یان دۆخی کڕین (Procurement) پێشکەش ناکات.
* **دۆخی چوونەناوەوە (Restricted Routing):** سەرجەم دەسەڵاتەکان تەنها تایبەتن بە دەروازە، مۆڵەتی گومرگ، جوڵەی بازرگانی، و هەماهەنگی یەکلاییکردنەوە پشکی ٥٠٪ی دەروازە سنوورییەکان (ماددەی ١١٤ی دەستووری عێراق).

---

### ٢. ئامادەکاری فەرمی پێشکەشکارە مەرجدارەکان (Conditional Readiness Specification)
بە هۆکاری هەستیاری و پاراستنی ڕاستەقینەی داتا، دۆخی بڵاوکراوەی گەیتەکە بەم چەشنەیە:
* **Final Readiness Status:** `CONDITIONALLY_READY — BORDER API SURFACE VERIFIED, PROVIDERS REQUIRED`
* **Real Providers Required:** تا دوای بەستنی بزوێنەری داتای بنەڕەتی، سیستەمەکە ڕێگە نادات هیچ بەشێک بڵێت "READY" یان "APPROVED" بێ هەبوونی دابینکەری ڕاستەقینە.
* **Response Payload Structure:**
```json
{
  "status": "CONDITIONALLY_READY",
  "readinessDecision": "BORDER_API_SURFACE_VERIFIED_PROVIDERS_REQUIRED",
  "providerState": "NOT_CONFIGURED",
  "providersRequired": true,
  "operationalDataConnected": false,
  "productionReady": false,
  "pilotReady": false
}
```

---

### ٣. پاراستنی تەواوی سەروەری لە کایەی هاوبەش (Metadata-Only Joint Interchange)
لە ژێر ڕیککەوتنی دوو لایەنەی بەغدا و هەولێر، کایەی هاوبەش (Joint Zone) ڕاسپێردراوە تەنها بۆ تەعبیرکردنی ئاماژەکانی دڵنیایی بەبێ پیشاندانی داتای خاو:
* **نەهێشتنی تێکەڵبوون:** ڕێگە لە گواستنەوەی ناوی بازرگانان، بڕی چوون و هاتنی داهات، یان نهێنییەکانی چاودێری دەگیرێت.
* **سەرچاوەکان:** مێتاداتای فەرمی واژووکراو و هاژە کورتکراوەکانی گومرگی بەڵگەی پێویستن بۆ یەکگرتنەوەی بێ-خستنەڕوو (Zero-Disclosure verification).

---

### ٤. دابڕینی سێرڤەری گشتی تاقیکاری (Quarantine of Root Playgrounds)
* **Root Server Labeling:** فایلی کۆنی `server.ts` لە کایەی دیمۆ دادەنرێت و مۆرکراوە بە `DEMO_ONLY_SERVER` وە `NOT_PRODUCTION_ENTRYPOINT`.
* **Verified Gateway Entrypoint:** تەنها فایلی `server/src/index.ts` چوارچێوەی بەستنەوەی فەرمی گۆشتی سیستەمەکەیە لە سەکۆی کۆتاییدا.

---

### ٥. هێڵەکانی فەرمی و دەسەڵاتە کاراکان (Allowed Backend Route Registry)
* `/api/v1/health` (Up & Operational)
* `/api/v1/readiness` (Conditional Readiness Engine)
* `/api/v1/federal/border/*` (Baghdad Customs Gateway Verification)
* `/api/v1/krg/border/*` (Erbil Customs Gateway Verification)
* `/api/v1/joint/*` (Metadata Alignment Interoperability Spec)
* `/api/v1/provider-readiness/*` (Integration diagnostics indicators)
* `/api/v1/audit/*` (Tamper-evident logs)
