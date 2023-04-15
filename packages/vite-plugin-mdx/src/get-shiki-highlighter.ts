import { getHighlighter } from 'shiki'

export async function getShikiHighlighter() {
  return getHighlighter({
    theme: 'nord',
  })
}
