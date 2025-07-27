declare module 'cfonts' {
  interface Options {
    font?: string
    align?: 'left' | 'center' | 'right'
    colors?: string[]
    space?: boolean
    maxLength?: string
    gradient?: string[]
    independentGradient?: boolean
    transitionGradient?: boolean
    env?: 'node' | 'browser'
  }

  interface RenderResult {
    string: string
    array: string[]
    lines: number
    options: Options
  }

  export function render(text: string, options?: Options): RenderResult
}
