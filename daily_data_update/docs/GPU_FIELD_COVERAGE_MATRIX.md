# GPU field coverage matrix

| Field | Priority | Source order | UI handling if missing |
|---|---:|---|---|
| name | required | official vendor | do not render page if missing |
| slug | required | existing repo/data | do not render page if missing |
| vendor | required | official vendor | Needs verification if unclear |
| architecture | high | official vendor, database | Needs verification |
| vramGb | required for calculator | official vendor, AIB, database | exclude from GPU matching if missing |
| memoryType | high | official vendor, AIB, database | Needs verification |
| memoryBusBit | medium | official, AIB, database | omit or Needs verification |
| memoryBandwidthGbps | medium | official, AIB, database | omit or Needs verification |
| cudaCores / computeUnits / xeCores | high | official vendor | Needs verification |
| boostClockGhz | medium | official, AIB | label variant-specific if AIB |
| baseClockGhz | optional | official, AIB, database | omit |
| boardPowerWatts / TGP / TBP | medium | official, AIB, review | Needs verification |
| recommendedPsuWatts | optional | AIB/manufacturer | label variant-specific |
| launchDate / launchYear | medium | official, database | omit if unclear |
| price / availability | unsafe without API | affiliate/API/feed | do not show unless timestamped |
| benchmark/tokens/s/image speed | unsafe without benchmark | benchmark source with conditions | do not show |
