export function classNames(...args: Array<string | boolean | undefined>): string {
  return args.filter(item => typeof item === 'string').join(' ')
}
