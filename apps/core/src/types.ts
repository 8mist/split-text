export type Options = {
  type?: ('chars' | 'words')[],
  tag?: 'span' | 'div',
  wordDelimiter?: string
}

export type TargetElement = HTMLElement | string;

export type CreateNodeOptions = {
  tag: Options['tag'],
  text: string
}
