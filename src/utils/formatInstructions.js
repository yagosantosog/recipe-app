export function formatInstructions(instructions = '') {
  if (!instructions) return ''

  const groupedParts = []
  let parts

  if (/\d+\.\s/.test(instructions)) {
    parts = instructions.split(/(?=\b\d+\.\s)/)
    parts.forEach((part, index) => {
      groupedParts.push(index === 0 ? part : `</p><p>${part}`)
    })
  } else {
    parts = instructions.split('.')
    parts.forEach((part, index) => {
      groupedParts.push(index > 0 && index % 4 === 0 ? `</p><p>${part}` : part)
    })
  }
  return `<p>${groupedParts.join('.')}</p>`
}
