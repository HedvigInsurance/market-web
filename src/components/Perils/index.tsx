import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { PerilCollection } from './PerilCollection/PerilCollection'
import { Peril, TypeOfContract } from './types'
// import { PerilModal } from './PerilModal'

interface Props {
  insuranceType: TypeOfContract
}

const Wrapper = styled.div`
  display: flex;
`

export const Perils: React.FC<Props> = ({ insuranceType }) => {
  const [perils, setPerils] = useState<[] | Peril[]>([])
  const [isShowingPeril, setIsShowingPeril] = React.useState(false)
  const [currentPeril, setCurrentPeril] = React.useState(0)

  useEffect(() => {
    const fetchPerils = async () => {
      const url = `https://graphql.dev.hedvigit.com/graphql`
      await fetch(url, {
        credentials: 'omit',
        headers: {
          Accept: '*/*',
          'content-type': 'application/json',
        },
        referrer: 'https://graphql.dev.hedvigit.com/graphql',
        body: `{"operationName":"Perils","variables":{"typeOfContract":"${insuranceType}","locale":"sv_SE"},"query":"query Perils($typeOfContract: TypeOfContract!, $locale: Locale!) {\\n perils(contractType: $typeOfContract, locale: $locale) {\\n title\\n description\\n covered\\n icon {\\n variants {\\n light {\\n svgUrl\\n }\\n }\\n }\\n }\\n}\\n"}`,
        method: 'POST',
        mode: 'cors',
      })
        .then((res) => res.json())
        .then((perilsData) => setPerils(perilsData.data.perils))
    }

    fetchPerils()
  }, [insuranceType])

  return (
    <Wrapper>
      <PerilCollection
        perils={perils}
        setCurrentPeril={setCurrentPeril}
        setIsShowingPeril={setIsShowingPeril}
      />
    </Wrapper>
  )
}
