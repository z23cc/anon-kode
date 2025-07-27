# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Anon Kode is a terminal-based AI coding assistant that supports multiple AI model providers through OpenAI-style APIs. It's a fork/preservation of the original claude-code project with enhanced multi-model support.

## Common Development Commands

### Running in Development
```bash
pnpm run dev           # Run in development mode
pnpm run dev --verbose # Run with verbose logging
NODE_ENV=development pnpm run dev --verbose --debug  # Full debug mode
```

### Building
```bash
pnpm run build         # Build minified CLI executable
```

### Code Formatting
```bash
pnpm run format        # Format all code
pnpm run format:check  # Check formatting without changes
```

### Installation & Setup
```bash
pnpm install           # Install dependencies
```

## Architecture Overview

### Core Entry Points
- `src/entrypoints/cli.tsx` - Main CLI application entry point
- `src/entrypoints/mcp.ts` - MCP (Model Context Protocol) server mode

### Key Services
- `src/services/openai.ts` - Handles all OpenAI-compatible API interactions with error handling and retries
- `src/services/claude.ts` - Anthropic-specific API handling (when using Anthropic directly)
- `src/services/mcpClient.ts` - MCP client implementation for tool extensions

### Tool System
Tools are modular components in `src/tools/` that provide capabilities to the AI:
- Each tool extends the base `Tool` class from `src/Tool.ts`
- Tools are registered in `src/tools.ts`
- Common tools: BashTool, FileEditTool, FileReadTool, FileWriteTool, GrepTool, GlobTool

### UI Components
- Built with React and Ink for terminal UI
- Main REPL interface: `src/screens/REPL.tsx`
- Permission dialogs in `src/components/permissions/`
- Message rendering in `src/components/messages/`

### Configuration System
- Global config: `~/.config/anon-kode/config.json`
- Project config: `.anon-kode/config.json`
- Config management: `src/utils/config.ts`

### Model Support
- Model definitions: `src/constants/models.ts`
- Supports OpenAI, Mistral, DeepSeek, xAI, Groq, Anthropic, Gemini, Ollama, and custom endpoints
- Dynamic model selection via `/model` command

## Key Implementation Details

### Adding New Models/Providers
1. Add provider definition to `providers` object in `src/constants/models.ts`
2. Add model specifications to the default export in the same file
3. Models are automatically available in the model selector

### Error Handling
- The OpenAI service (`src/services/openai.ts`) includes sophisticated error detection and retry logic
- Handles rate limits, token limits, and provider-specific errors
- Automatic fallback for unsupported features

### Command System
- Slash commands defined in `src/commands/`
- Commands are registered in `src/commands.ts`
- Each command can have a React component for interactive UI

### Permission System
- Tools request permissions through `src/permissions.ts`
- UI components for permission requests in `src/components/permissions/`
- Permissions can be auto-approved via config

## Testing Approach

Currently, there are no automated tests. Manual testing is done through:
1. Running `pnpm run dev` and testing commands interactively
2. Building with `pnpm run build` and testing the compiled output