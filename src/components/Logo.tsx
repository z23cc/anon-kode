import { Box, Text } from 'ink'
import * as React from 'react'
import { getTheme } from '../utils/theme'
import { PRODUCT_NAME } from '../constants/product'
import {
  isDefaultApiKey,
  getAnthropicApiKey,
  getGlobalConfig,
} from '../utils/config'
import { getCwd } from '../utils/state'
import type { WrappedClient } from '../services/mcpClient'

export const MIN_LOGO_WIDTH = 50

export function Logo({
  mcpClients,
}: {
  mcpClients: WrappedClient[]
  isDefaultModel?: boolean
}): React.ReactNode {
  const width = Math.max(MIN_LOGO_WIDTH, getCwd().length + 12)
  const theme = getTheme()
  const config = getGlobalConfig()
  const currentModel =
    config.largeModelName &&
    (config.largeModelName === config.smallModelName
      ? config.largeModelName
      : config.largeModelName + ' | ' + config.smallModelName)
  const apiKey = getAnthropicApiKey()
  const isCustomApiKey = !isDefaultApiKey()
  const hasOverrides = Boolean(
    isCustomApiKey ||
      process.env.DISABLE_PROMPT_CACHING ||
      process.env.API_TIMEOUT_MS ||
      process.env.MAX_THINKING_TOKENS,
  )

  return (
    <Box flexDirection="column" paddingLeft={1} paddingTop={1}>
      <Box flexDirection="column" gap={1}>
        <Text>
          <Text color="cyan" bold>
            ⚡
          </Text>{' '}
          Welcome to{' '}
          <Text bold color="cyan">
            {PRODUCT_NAME}
          </Text>
        </Text>

        <Box paddingLeft={1} flexDirection="column">
          <Text color="gray">
            Type <Text color="cyan">/help</Text> for help ·{' '}
            <Text color="cyan">!</Text> for bash mode ·{' '}
            <Text color="cyan">/</Text> for commands
          </Text>
          <Text color="gray" dimColor>
            {getCwd()}
          </Text>
          {currentModel && (
            <Text color="yellow">
              <Text dimColor>Using</Text> {currentModel}
            </Text>
          )}
        </Box>

        {hasOverrides && (
          <Box flexDirection="column" marginTop={1} paddingLeft={1}>
            <Text color="gray" dimColor>
              Environment overrides:
            </Text>
            {isCustomApiKey && apiKey ? (
              <Text color={theme.secondaryText}>
                • API Key:{' '}
                <Text bold>sk-ant-…{apiKey!.slice(-width + 25)}</Text>
              </Text>
            ) : null}
            {process.env.DISABLE_PROMPT_CACHING ? (
              <Text color={theme.secondaryText}>
                • Prompt caching:{' '}
                <Text color={theme.error} bold>
                  off
                </Text>
              </Text>
            ) : null}
            {process.env.API_TIMEOUT_MS ? (
              <Text color={theme.secondaryText}>
                • API timeout: <Text bold>{process.env.API_TIMEOUT_MS}ms</Text>
              </Text>
            ) : null}
            {process.env.MAX_THINKING_TOKENS ? (
              <Text color={theme.secondaryText}>
                • Max thinking tokens:{' '}
                <Text bold>{process.env.MAX_THINKING_TOKENS}</Text>
              </Text>
            ) : null}
            {process.env.ANTHROPIC_BASE_URL ? (
              <Text color={theme.secondaryText}>
                • API Base URL:{' '}
                <Text bold>{process.env.ANTHROPIC_BASE_URL}</Text>
              </Text>
            ) : null}
          </Box>
        )}

        {mcpClients.length ? (
          <Box flexDirection="column" marginTop={1} paddingLeft={1}>
            <Text color="gray" dimColor>
              MCP Servers:
            </Text>
            {mcpClients.map((client, idx) => (
              <Box key={idx} width={width - 6}>
                <Text color={theme.secondaryText}>• {client.name}</Text>
                <Box flexGrow={1} />
                <Text
                  bold
                  color={
                    client.type === 'connected' ? theme.success : theme.error
                  }
                >
                  {client.type === 'connected' ? 'connected' : 'failed'}
                </Text>
              </Box>
            ))}
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}
