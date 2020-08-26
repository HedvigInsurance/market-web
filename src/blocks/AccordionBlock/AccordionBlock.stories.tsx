import { select, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { minimalColorMap } from 'utils/storybook'
import { AccordionBlock, AccordionBlockProps } from './AccordionBlock'

export default {
  title: 'Blocks/AccordionBlock',
  component: AccordionBlock,
  decorators: [withKnobs],
}

const accordionProps: AccordionBlockProps = {
  _uid: '5678',
  component: 'accordion_block',
  title: '5 vanligaste frågorna',
  accordions: [
    {
      _uid: 'fbcacb10-702c-4bf6-a328-cf52f0d35115',
      title: 'Ingår bostadsrättstillägg?',
      paragraph: {
        _uid: 'cb1b3112-a685-49e9-85f6-d02a0b67deb8',
        html:
          '<p>Ja. Om man äger sin lägenhet är det skönt att ha en försäkring som täcker själva lägenheten också, inte bara prylarna som finns däri. Med det täcks skador på fast inredning (typ ditt nya kök) och ytskikt (typ dina nyfixade golv, tak eller väggar). Om du har sagt till Hedvig att du äger din lägenhet ingår bostadsrättstillägget automatiskt. Hedvig ersätter kostnaden för att reparera skador på din lägenhet utan beloppsbegränsning - oavsett om du bor i studentlya eller paradvåning. Skönt!</p>\n',
        plugin: 'markdown-html',
        original:
          'Ja. Om man äger sin lägenhet är det skönt att ha en försäkring som täcker själva lägenheten också, inte bara prylarna som finns däri. Med det täcks skador på fast inredning (typ ditt nya kök) och ytskikt (typ dina nyfixade golv, tak eller väggar). Om du har sagt till Hedvig att du äger din lägenhet ingår bostadsrättstillägget automatiskt. Hedvig ersätter kostnaden för att reparera skador på din lägenhet utan beloppsbegränsning - oavsett om du bor i studentlya eller paradvåning. Skönt!',
      },
    },
    {
      _uid: 'bab419ba-4b97-4607-8a99-48ee59baaecd',
      title: 'Hur kommer jag i kontakt med teamet på Hedvig?',
      paragraph: {
        _uid: '27351fa7-4c5f-4e60-85d9-5f9bbdace6f7',
        html:
          '<p>Du kan fråga Hedvig vad som helst när som helst direkt i appen. Du kan självklart också be en av oss att ringa upp dig. Om du gillar att maila når du Hedvig på <a href="mailto:hedvig@hedvig.com">hedvig@hedvig.com</a></p>\n',
        plugin: 'markdown-html',
        original:
          'Du kan fråga Hedvig vad som helst när som helst direkt i appen. Du kan självklart också be en av oss att ringa upp dig. Om du gillar att maila når du Hedvig på hedvig@hedvig.com',
      },
    },
    {
      _uid: '1ec18e22-14e6-443f-b553-d64027697603',
      title: 'Var hittar jag det fullständiga försäkringsvillkoret?',
      paragraph: {
        _uid: 'f6f6b917-a9c1-48a4-af14-3534cc0d79f3',
        html:
          '<p>Försäkringsbolag brukar vanligtvis ha en förmåga att gömma mycket i det finstilta. Vi är lite annorlunda. Därför har vi gjort allt vi kan för att skriva ett villkor på så enkel svenska som möjligt. Du hittar det här:</p>\n<p><a href="https://cdn.hedvig.com/info/forsakringsvillkor-bostadsratt-2018-02.pdf">– Villkor Hedvig Hemförsäkring Bostadsrätt</a></p>\n',
        plugin: 'markdown-html',
        original:
          'Försäkringsbolag brukar vanligtvis ha en förmåga att gömma mycket i det finstilta. Vi är lite annorlunda. Därför har vi gjort allt vi kan för att skriva ett villkor på så enkel svenska som möjligt. Du hittar det här:\n\n[– Villkor Hedvig Hemförsäkring Bostadsrätt](https://cdn.hedvig.com/info/forsakringsvillkor-bostadsratt-2018-02.pdf)',
      },
    },
    {
      _uid: 'b7968c74-8067-4e09-af0b-0e93eccc43be',
      title: 'Har Hedvig någon bindningstid?',
      paragraph: {
        _uid: 'df5e5622-4a42-43db-a559-de2311344bd0',
        html:
          '<p>Alla våra försäkringar är utan bindningstid. Vi tror på att nöjda kunder stannar för att de är nöjda, inte för att de är tvingas.</p>\n',
        plugin: 'markdown-html',
        original:
          'Alla våra försäkringar är utan bindningstid. Vi tror på att nöjda kunder stannar för att de är nöjda, inte för att de är tvingas.',
      },
    },
    {
      _uid: '52ae3567-ea79-49b2-8bf1-b52938e7779f',
      title: 'Vad är självrisken?',
      paragraph: {
        _uid: '17145f62-3081-4762-a028-ef1f7135a878',
        html: '<p>Hedvigs självrisk ligger alltid på 1500 kr.</p>\n',
        plugin: 'markdown-html',
        original: 'Hedvigs självrisk ligger alltid på 1500 kr.',
      },
    },
    {
      _uid: '4e972917-6b5e-4c2e-baae-e0f3145a3f4f',
      title: 'Vad ingår i ert drulleskydd?',
      paragraph: {
        _uid: '6caf3827-1467-44cc-b9a0-3b2a3e69ace9',
        html:
          '<p>Drulle ingår alltid i Hedvigs hemförsäkring.</p>\n<p>Vår drulle som alltid ingår täcker alla dina prylar upp till 50 000 per pryl (vanlig försäkring täcker totalt 50 000 för alla prylar), vi ger bättre ersättning för de flesta techgrejer och har tagit bort en hel del besvärliga specialbestämmelser som försäkringsbolag brukar använda för att begränsa ersättning.</p>\n',
        plugin: 'markdown-html',
        original:
          'Drulle ingår alltid i Hedvigs hemförsäkring.\n\nVår drulle som alltid ingår täcker alla dina prylar upp till 50 000 per pryl (vanlig försäkring täcker totalt 50 000 för alla prylar), vi ger bättre ersättning för de flesta techgrejer och har tagit bort en hel del besvärliga specialbestämmelser som försäkringsbolag brukar använda för att begränsa ersättning.',
      },
    },
  ],
}
export const Default = () => (
  <AccordionBlock
    color={
      minimalColorMap[select('color', Object.keys(minimalColorMap), 'standard')]
    }
    {...accordionProps}
  />
)
