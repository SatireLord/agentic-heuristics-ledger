---
domain: adversarial-security
status: active
source: grok-4.20-expert
---

# Adversarial Detection Logic

Patterns from `embedder.py` and `detector.py`:

## High-Dimensional Filtering
Using cosine similarity thresholds to detect prompt injection signatures hidden in high-entropy vector embeddings.

```python
def detect_injection(embedding, centroid, threshold):
    similarity = cosine_similarity(embedding, centroid) // [1]
    return similarity < threshold // [2]
```

## Stenographic Neutralization
Detection of "jailbreak" tokens through frequency analysis of anomalous Unicode characters within the declarative instruction block.