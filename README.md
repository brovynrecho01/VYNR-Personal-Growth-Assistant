# VYNR — Personal Growth Intelligence

> *"Build the man. The life will follow."*

VYNR is a real-time, voice-interactive Personal Growth Intelligence system built with **Next.js (App Router)**, **React Three Fiber**, **Zustand**, **Gemini 3.8 Flash / Groq**, **Deepgram Nova-3**, browser speech synthesis, and **Supabase pgvector**.

---

## Architecture

```text
vynr/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── vynr/route.ts      # Core LLM + Persona + RAG Memory SSE bridge (GET/POST/PUT)
│   │   │   ├── chat/route.ts      # Alias route forwarding to /api/vynr
│   │   │   └── speech/route.ts    # Deepgram JWT grant (GET)
│   │   ├── globals.css            # Stealth pure-black theme, glassmorphism & film grain utilities
│   │   ├── layout.tsx             # Root layout & typography (Inter + JetBrains Mono)
│   │   └── page.tsx               # Main viewport combining Visualizer + ControlHUD
│   ├── components/
│   │   └── ui/
│   │       ├── Visualizer.tsx     # 60fps R3F GLSL Shader Sphere + 64-bin FFT InstancedMesh ring
│   │       └── ControlHUD.tsx     # Floating glassmorphism HUD, Discipline Index, habit & slip logger
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── gemini.ts          # Singleton @google/genai client
│   │   │   └── persona.ts         # Strict VYNR_SYSTEM_PROMPT & VOICE_MODALITY_ADDENDUM
│   │   ├── memory/
│   │   │   ├── schema.ts          # Zod schemas for habits, logs, targets, failures & vector memories
│   │   │   ├── embeddings.ts      # 768-dim MRL L2-normalized gemini-embedding-2 helper
│   │   │   ├── store.ts           # Pluggable MemoryStore (Supabase pgvector + in-process dev store)
│   │   │   ├── context.ts         # Discipline Index calculator & <MEMORY> RAG prompt builder
│   │   │   └── extractor.ts       # Post-turn background fact extractor (gemini-3.5-flash-lite)
│   │   ├── audioPipeline.ts       # Web Audio API dual AnalyserNodes, Deepgram WS STT & PCM TTS queue
│   │   ├── dates.ts               # Timezone-safe YYYY-MM-DD calendar math
│   │   └── env.ts                 # Validated server environment configuration
│   ├── store/
│   │   └── useVynrStore.ts        # Central Zustand store with transient 60fps audio level selectors
│   └── types/
│       └── vynr.ts                # Shared wire protocol & domain types
└── supabase/
    └── migrations/
        └── 0001_vynr_memory.sql   # Postgres + pgvector HNSW schema & match_memories RPC
```

---

## Quickstart

1. **Configure Environment Variables**
   Edit `.env.local` and supply your keys:
   - `GEMINI_API_KEY` (uses `gemini-3.8-flash` for reasoning, `gemini-3.5-flash-lite` for background memory extraction, and `gemini-embedding-2` for 768-dim vector RAG)
   - `GROQ_API_KEY` (optional fast fallback using `llama-3.3-70b-versatile`)
   - `DEEPGRAM_API_KEY` (optional — falls back to browser `SpeechRecognition` when unset)
   - `SUPABASE_URL` & `SUPABASE_SERVICE_ROLE_KEY` (optional — falls back to in-process memory store when unset)

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000`.

3. **Controls & Shortcuts**
   - `Space` — Toggle microphone listening on/off
   - `Esc` — Interrupt VYNR mid-speech (or simply speak over VYNR when **Barge-In** is enabled)
   - **Left HUD Panel** — Mark daily habits `DONE` or `MISS`, track new habits, or log a slip/excuse to test VYNR's confrontation engine.
