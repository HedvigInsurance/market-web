import * as React from 'react'

export const useCachedImage = (backgroundImage: string): string | null => {
  const [backgroundData, setBackgroundData] = React.useState<null | string>(
    null,
  )
  React.useEffect(() => {
    fetch(backgroundImage, { cache: 'force-cache' })
      .then((result) => result.blob())
      .then(
        (blob) =>
          new Promise<string | null>((resolve) => {
            const fileReader = new FileReader()
            fileReader.onloadend = () => {
              resolve(fileReader.result?.toString() ?? null)
            }
            fileReader.readAsDataURL(blob)
          }),
      )
      .then((dataUrl) => setBackgroundData(dataUrl))
  }, [true])

  return backgroundData
}
