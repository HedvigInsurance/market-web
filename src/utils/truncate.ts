const truncate = (length: number, terminator: string = '...') => (
  text: string,
) => {
  if (length >= text.length) {
    return text
  }

  return text.substr(0, length).trim() + terminator
}

export { truncate }
