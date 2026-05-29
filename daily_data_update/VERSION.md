# daily_data_update version

Version: v1 optimized GPU-only source workflow

Scope:
- GPU data enrichment
- AI model data enrichment
- VRAM calculator data and matching
- candidate queues
- source gap audit
- multi-source field coverage

CPU data is intentionally out of scope for this version.

Latest source-policy patch:
- MSI is explicitly treated as an important AIB/manufacturer enrichment source.
- AIB/manufacturer data must be marked as variant-specific.
- Null GPU fields must be filled only when source-backed or tracked as source gaps.
