export function getIdFromUrl(url: string): string {
  const re = /\/(?<id>\d+)\/$/g
  const matches = url.match(re)
  return matches[0]
}
