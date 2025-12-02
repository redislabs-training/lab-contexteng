<div align="center">
<img src="/public/logo.svg" alt="" width="300px">

# [BETA] Context Engineering with Redis & Langchain

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Language](https://img.shields.io/github/languages/top/redis-developer/redis-ai-resources)

✨ A comprehensive course exploring context engineering using Redis and LangChain by building a progressively more complex agent ✨

</div>
---

> **📢 Note:** This course is currently in **BETA**. Additional components and stages will be released in the near future, so please check back regularly for updates. This course will eventually be migrated as a lab to [Redis University](https://university.redis.com/).

---

## Key Technologies

| Technology | Purpose |
|------------|---------|
| **[Redis](https://redis.io/)** | Vector storage, semantic search, caching |
| **[RedisVL](https://github.com/redis/redis-vl-python)** | Vector search library with FilterQuery |
| **[LangGraph](https://github.com/langchain-ai/langgraph)** | Stateful agent workflows |
| **[LangChain](https://github.com/langchain-ai/langchain)** | LLM application framework |
| **[LangSmith](https://www.langchain.com/langsmith/observability)** | Agent Observability platform |
| **[Redis Agent Memory Server](https://github.com/redis/agent-memory-server)** | Working and long-term memory management for agents |
| **[OpenAI](https://openai.com/)** | Language model for reasoning |

---

## Progressive Agents

The `progressive_agents/` directory contains a learning path from basic RAG to production-ready agents:

```mermaid
graph LR
    S0[Stage 0: <br/>System Context] -->
    S1[Stage 1: <br/>Baseline RAG] --> S2[Stage 2: <br/>Context Engineered RAG]
    S2 --> S3[Stage 3: <br/>From RAG to Agent]
    S3 --> S4[Stage 4: <br/>NER + Hybrid Search]
    S4 --> S4R[Stage 4R: <br/>Upgrade to ReAct Agent]
    S4R --> S5[Stage 5<br/>Working Memory]
    S5 --> S6[Stage 6<br/>Long-term Memory]
```

| Stage | Key Feature | Overview | Status |
|-------|-------------|----------------|--------|
| **0** | System Context | Constructing effective system prompts | Available |
| **1** | Baseline RAG | Exploring a basic RAG that consumes Raw JSON context | Available |
| **2** | Context Engineering | Context engineered RAG with 50% less token usage | Available |
| **3** | Full Agent | A full LangGraph-based agent with intent classification, quality and eval | Coming Soon |
| **4** | Hybrid Search | Adding NER + FilterQuery for exact course codes | Coming Soon |
| **4R** | + ReAct | Visible reasoning trace | Coming Soon |
| **5** | Working Memory | Session-based conversation history | Coming Soon |
| **6** | Long-term Memory | Complete agent: memory + reasoning + tools | Coming Soon |

---

