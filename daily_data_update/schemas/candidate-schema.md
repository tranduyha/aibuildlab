# Candidate schema

Candidate files in `data/update-candidates/` should use objects like:

```json
{
  "date": "YYYY-MM-DD",
  "topic": "RTX 4070 official spec gap",
  "slugSuggestion": "rtx-4070",
  "candidateType": "gpu",
  "reason": "Official or cross-check source can fill a missing field.",
  "sourceName": "Source name",
  "sourceUrl": "https://...",
  "sourceType": "official",
  "affectedFields": ["vramGb"],
  "confidence": "medium",
  "recommendedAction": "review-and-enrich-existing-record",
  "status": "candidate",
  "notes": "Do not publish until field-level source mapping is added."
}
```
