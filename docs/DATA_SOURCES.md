# DATA_SOURCES.md

Tài liệu này quy định nguồn dữ liệu được phép dùng cho project `aibuildlab`.

Mục tiêu: tránh để Codex/AI/dev tự bịa thông số, dùng nhầm nguồn kém chất lượng, hoặc public dữ liệu chưa kiểm chứng.

---

## 1. Nguyên tắc chung

### 1.1 Không được tự bịa dữ liệu

Nếu chưa có nguồn đáng tin:

- để field là `null`
- đặt `needsReview: true`
- đặt `dataConfidence: "low"`
- đặt `sources: []`
- thêm `notes` giải thích cần xác minh

Không được tự điền chắc chắn các field như:

- VRAM
- memory type
- memory bus
- CUDA cores / stream processors / compute units / Xe cores
- TGP / TBP / board power
- launch date
- architecture
- AI TOPS
- benchmark
- tokens/s
- image generation speed
- giá bán
- availability

nếu chưa có nguồn.

### 1.2 Dữ liệu seed phải được đánh dấu

Dữ liệu tạo trong giai đoạn đầu chỉ là seed data để dựng hệ thống.

Với dữ liệu chưa xác minh đầy đủ, dùng:

```json
{
  "status": "draft",
  "needsReview": true,
  "dataConfidence": "low",
  "sources": [],
  "lastVerifiedAt": null,
  "notes": "Seed data. Verify before publishing."
}
```

### 1.3 Chỉ publish khi đủ điều kiện

Chỉ chuyển `status` sang `published` khi:

- specs quan trọng đã có nguồn
- `needsReview: false`
- `dataConfidence: "medium"` hoặc `"high"`
- có SEO title/description tốt
- không có field quan trọng bị `null` nếu page đang hiển thị field đó
- nguồn dữ liệu đã được ghi trong `sources`

---

## 2. Data confidence

Dùng 3 mức:

```txt
high   = có nguồn official hoặc nhiều nguồn uy tín trùng nhau
medium = có nguồn uy tín nhưng chưa đủ cross-check
low    = seed data / estimate / chưa xác minh
```

Ví dụ:

```json
{
  "dataConfidence": "medium",
  "needsReview": true,
  "notes": "Basic specs verified from official vendor page. AI performance still needs benchmark verification."
}
```

---

## 3. Source object format

Mỗi data item nên có `sources` dạng:

```json
[
  {
    "name": "NVIDIA GeForce RTX 4090 Official Page",
    "url": "https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4090/",
    "type": "official",
    "fields": ["vramGb", "memoryType", "cudaCores", "boostClockGhz"],
    "accessedAt": "2026-05-26"
  }
]
```

### Source type được dùng

```txt
official
manufacturer
database
benchmark
model-card
documentation
paper
affiliate-api
marketplace-api
manual-check
```

---

## 4. Nguồn ưu tiên cho GPU specs

### 4.1 Nguồn cấp 1: official vendor

Ưu tiên cao nhất:

| Vendor | Nguồn |
|---|---|
| NVIDIA | https://www.nvidia.com/en-us/geforce/graphics-cards/ |
| AMD | https://www.amd.com/en/products/graphics |
| Intel | https://www.intel.com/content/www/us/en/products/details/discrete-gpus/arc.html |

Dùng nguồn official cho:

- GPU name
- architecture
- VRAM
- memory type
- CUDA cores / compute units / Xe cores
- boost clock
- board power nếu có
- launch info nếu có
- official MSRP nếu có

### 4.2 Nguồn cấp 2: official AIB/manufacturer

Dùng khi cần thông số model cụ thể:

| Brand | Nguồn |
|---|---|
| ASUS | https://www.asus.com/motherboards-components/graphics-cards/ |
| MSI | https://www.msi.com/Graphics-Cards |
| Gigabyte | https://www.gigabyte.com/Graphics-Card |
| Sapphire | https://www.sapphiretech.com/en/consumer |
| PowerColor | https://www.powercolor.com/ |
| PNY | https://www.pny.com/ |
| Zotac | https://www.zotac.com/ |
| ASRock | https://www.asrock.com/Graphics-Card/ |

Dùng nguồn này cho:

- variant-specific clock
- card dimensions
- power connectors
- cooler design
- port layout
- AIB-specific specs

Không dùng thông số AIB để đại diện toàn bộ GPU nếu thông số đó chỉ áp dụng cho một mẫu card cụ thể.

### 4.3 Nguồn cấp 3: database để cross-check

Dùng để kiểm tra chéo, không phải nguồn duy nhất nếu official có sẵn:

| Nguồn | URL |
|---|---|
| TechPowerUp GPU Database | https://www.techpowerup.com/gpu-specs/ |
| NotebookCheck GPU database | https://www.notebookcheck.net/ |
| VideoCardz database/news | https://videocardz.com/ |

### 4.4 Nguồn cấp 4: review/benchmark uy tín

Dùng cho benchmark, performance, power draw thực tế:

| Nguồn | URL |
|---|---|
| Puget Systems | https://www.pugetsystems.com/ |
| Gamers Nexus | https://www.gamersnexus.net/ |
| Tom's Hardware | https://www.tomshardware.com/ |
| Phoronix | https://www.phoronix.com/ |
| ServeTheHome | https://www.servethehome.com/ |
| TechPowerUp Reviews | https://www.techpowerup.com/review/ |

Benchmark phải ghi rõ:

- test date
- software version
- driver version nếu có
- workload
- resolution/settings nếu là image/video
- model/quantization/context nếu là LLM
- hardware testbed

---

## 5. Nguồn không được dùng làm nguồn specs chính

Không dùng các nguồn sau làm nguồn chính cho specs:

- Google search snippet
- Google Images
- Reddit/forum comment
- Facebook/social post
- marketplace listing
- ảnh screenshot không có source gốc
- blog affiliate không rõ nguồn
- nội dung AI-generated không có citation
- YouTube comment
- bảng spec không ghi nguồn

Các nguồn này có thể dùng để phát hiện ý tưởng/keyword, nhưng không được dùng làm source chính cho dữ liệu hardware.

---

## 6. Nguồn cho AI model information

### 6.1 Model card / official docs

Ưu tiên:

| Model/Platform | Nguồn |
|---|---|
| Meta Llama | https://ai.meta.com/llama/ |
| Meta Llama Hugging Face | https://huggingface.co/meta-llama |
| Qwen | https://qwenlm.github.io/ |
| Qwen Hugging Face | https://huggingface.co/Qwen |
| Mistral AI | https://mistral.ai/ |
| Mistral Hugging Face | https://huggingface.co/mistralai |
| Stability AI | https://stability.ai/ |
| Stability AI Hugging Face | https://huggingface.co/stabilityai |
| Ollama library | https://ollama.com/library |
| llama.cpp | https://github.com/ggml-org/llama.cpp |
| vLLM | https://docs.vllm.ai/ |

Dùng nguồn này cho:

- model name
- model size
- context length nếu official nêu
- modality
- license
- model family
- intended use
- limitations
- official quantized variants nếu có

### 6.2 Quy tắc với VRAM estimate

VRAM estimate không nên coi là tuyệt đối.

VRAM phụ thuộc vào:

- parameter count
- precision: FP16, BF16, INT8, INT4
- quantization format: GGUF, GPTQ, AWQ, bitsandbytes
- context length
- KV cache
- batch size
- runtime: llama.cpp, vLLM, transformers, Ollama
- OS/driver/runtime overhead
- model architecture

Nếu chưa benchmark trực tiếp:

```json
{
  "needsReview": true,
  "dataConfidence": "low",
  "notes": "Estimated VRAM requirement. Verify with runtime-specific benchmark before publishing as recommendation."
}
```

### 6.3 Nguồn benchmark AI

Ưu tiên:

| Nguồn | Dùng cho |
|---|---|
| Artificial Analysis | LLM performance/API comparison nếu phù hợp |
| LMSYS / Chatbot Arena | model quality comparison |
| Papers / technical report | architecture, training, benchmark |
| Puget Systems | workstation/creator workload |
| Phoronix | Linux compute benchmark |
| llama.cpp benchmark logs | local inference nếu có test cụ thể |
| vLLM benchmarks | serving throughput |

Không dùng Reddit comment làm số liệu VRAM/tokens/s chính.

---

## 7. Nguồn cho ảnh

Không tải ảnh trực tiếp từ Google Images.

Nguồn được phép:

| Loại ảnh | Nguồn |
|---|---|
| Ảnh minh họa | Pexels API |
| Ảnh minh họa | Unsplash API |
| Ảnh minh họa phụ | Pixabay API |
| Ảnh license mở | Wikimedia Commons API |
| Ảnh sản phẩm | eBay Browse API |
| Ảnh sản phẩm | Amazon Product Advertising API nếu được duyệt |
| Ảnh sản phẩm | Affiliate/product feed chính thức |
| Ảnh official | Media kit/press kit nếu terms cho phép |

Mỗi ảnh phải ghi metadata vào:

```txt
data/images/image-manifest.json
```

Metadata tối thiểu:

```json
{
  "id": "hero-ai-workstation-001",
  "local_path": "/images/hero/ai-workstation-001.jpg",
  "source": "pexels",
  "source_url": "https://www.pexels.com/photo/...",
  "author": "Photographer Name",
  "license": "Pexels License",
  "license_url": "https://www.pexels.com/license/",
  "downloaded_at": "2026-05-26",
  "alt_text": "AI workstation desk with monitors and computer hardware",
  "used_in_pages": ["/"]
}
```

Nếu không xác định được license, không dùng ảnh đó.

---

## 8. Nguồn cho giá và affiliate

Không hardcode giá lâu dài nếu không có `lastVerifiedAt`.

Nguồn hợp lệ:

| Nguồn | Dùng cho |
|---|---|
| Amazon Product Advertising API | giá, ảnh, availability, affiliate link |
| eBay Browse API | used GPU, workstation parts, ảnh sản phẩm |
| Newegg affiliate/feed | hardware product data |
| B&H affiliate/feed | creator/workstation gear |
| AliExpress affiliate/feed | mini PC/phụ kiện, cần kiểm soát chất lượng |
| Manual snapshot | chỉ khi có timestamp và source |

Giá phải có:

```json
{
  "price": 599,
  "currency": "USD",
  "region": "US",
  "source": "eBay Browse API",
  "sourceUrl": "https://...",
  "lastVerifiedAt": "2026-05-26",
  "affiliateProgram": "ebay-partner-network"
}
```

Nếu giá quá cũ:

- không hiển thị như giá hiện tại
- ghi “last checked”
- hoặc ẩn khỏi page production

---

## 9. Field nào bắt buộc cần source

### GPU

Các field sau cần source nếu được điền:

```txt
vramGb
memoryType
memoryBusBit
memoryBandwidthGbps
cudaCores
streamProcessors
computeUnits
xeCores
tensorCores
rtCores
boostClockGhz
baseClockGhz
tgpWatts
tbpWatts
recommendedPsuWatts
architecture
launchDate
msrp
```

### AI model

Các field sau cần source nếu được điền:

```txt
parameterCount
contextLength
license
modelFamily
modality
officialRuntime
quantizationFormats
recommendedUseCases
```

### Benchmark

Các field sau cần source nếu được điền:

```txt
tokensPerSecond
imagesPerMinute
secondsPerImage
vramUsedGb
powerDrawWatts
driverVersion
runtimeVersion
softwareVersion
testDate
```

---

## 10. Quy tắc cho Codex khi tạo data

Codex phải tuân thủ:

1. Không bịa thông số.
2. Không dùng Google Images.
3. Không dùng Google snippet làm source.
4. Nếu không có source, để `null`.
5. Nếu chưa chắc, đặt `needsReview: true`.
6. Nếu chỉ là seed data, đặt `dataConfidence: "low"`.
7. Nếu dùng nguồn official, ghi vào `sources`.
8. Nếu dùng benchmark/review, ghi rõ workload và điều kiện test nếu có.
9. Không chuyển `status` sang `published` nếu nguồn chưa đủ.
10. Không tạo hàng loạt page từ data `low confidence`.

---

## 11. Prompt bắt buộc khi yêu cầu Codex bổ sung data

Dùng đoạn này khi giao task cho Codex:

```txt
Trước khi điền thông số, đọc docs/DATA_SOURCES.md.

Không được tự bịa thông số.

Nếu chưa có nguồn official hoặc nguồn đáng tin:
- để field là null
- needsReview: true
- dataConfidence: "low"
- sources: []
- notes: "Needs verification before publishing."

Mọi field như VRAM, memoryType, memoryBus, CUDA cores, TGP, launchYear, architecture phải có source nếu được điền.

Không dùng Google snippet, Reddit, forum, marketplace listing làm nguồn specs chính.

Không chuyển status sang published nếu dataConfidence còn low.
```

---

## 12. Gợi ý source URLs ban đầu cho seed data

### NVIDIA GPU specs

```txt
RTX 3060:
https://www.nvidia.com/en-us/geforce/graphics-cards/30-series/rtx-3060-3060ti/

RTX 4060 Ti / RTX 4060:
https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4060-4060ti/

RTX 4070 / 4070 Super / 4070 Ti Super / 4080 Super / 4090:
https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/

RTX 4090 dedicated page:
https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4090/

RTX 5090:
https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/
```

### AMD GPU specs

```txt
RX 7900 XTX:
https://www.amd.com/en/products/graphics/desktops/radeon/7000-series/amd-radeon-rx-7900xtx.html

RX 7900 XTX support/spec detail:
https://www.amd.com/en/support/downloads/drivers.html/graphics/radeon-rx/radeon-rx-7000-series/amd-radeon-rx-7900-xtx.html
```

### Intel GPU specs

```txt
Intel Arc overview:
https://www.intel.com/content/www/us/en/products/details/discrete-gpus/arc.html

Intel Arc A770 16GB:
https://www.intel.com/content/www/us/en/products/sku/229151/intel-arc-a770-graphics-16gb/specifications.html
```

### AI model sources

```txt
Meta Llama:
https://ai.meta.com/llama/
https://huggingface.co/meta-llama
https://huggingface.co/meta-llama/Llama-3.1-8B

Qwen:
https://qwenlm.github.io/
https://huggingface.co/Qwen
https://huggingface.co/collections/Qwen/qwen25
https://huggingface.co/Qwen/Qwen2.5-7B
https://huggingface.co/Qwen/Qwen2.5-32B

Mistral:
https://mistral.ai/
https://huggingface.co/mistralai
https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3

Stable Diffusion XL:
https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0
https://huggingface.co/stabilityai/stable-diffusion-xl-refiner-1.0
```

---

## 13. Quy tắc update dữ liệu định kỳ

### Mỗi lần update GPU data

- kiểm tra official source trước
- ghi `lastVerifiedAt`
- ghi nguồn vào `sources`
- nếu thay đổi dữ liệu quan trọng, thêm note

### Mỗi lần update AI model data

- kiểm tra model card
- kiểm tra license
- kiểm tra context length
- không copy benchmark nếu không hiểu điều kiện test

### Mỗi lần update giá

- ghi region/currency/source
- không hiển thị giá cũ như giá hiện tại
- nếu quá 7-14 ngày, cân nhắc ẩn giá hoặc ghi “last checked”

---

## 14. Definition of Done cho data item

Một GPU item được coi là đạt để dùng trong page public khi:

- [ ] có `id`
- [ ] có `slug`
- [ ] có `name`
- [ ] có `shortDescription`
- [ ] có `seoTitle`
- [ ] có `seoDescription`
- [ ] có `vramGb`
- [ ] có `memoryType`
- [ ] có ít nhất 1 source official/manufacturer/database
- [ ] có `lastVerifiedAt`
- [ ] có `needsReview: false`
- [ ] có `dataConfidence: "medium"` hoặc `"high"`

Một AI model item được coi là đạt để dùng trong page public khi:

- [ ] có `id`
- [ ] có `slug`
- [ ] có `name`
- [ ] có model family
- [ ] có model size hoặc parameter count nếu applicable
- [ ] có official model card/docs source
- [ ] có notes về VRAM estimate nếu có
- [ ] có `lastVerifiedAt`
- [ ] có `needsReview: false`
- [ ] có `dataConfidence: "medium"` hoặc `"high"`

---

## 15. Ghi chú quan trọng

Project `aibuildlab` nên ưu tiên chất lượng dữ liệu hơn số lượng page.

Không tạo hàng nghìn page nếu data còn `low confidence`.

Thứ tự đúng:

```txt
source tốt
→ data sạch
→ repository/service
→ page hữu ích
→ internal links
→ index
→ affiliate/conversion
```
