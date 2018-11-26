import * as React from 'react'
import styled from 'react-emotion'
import { TextPosition } from 'src/utils/textPosition'
import {
  ContentWrapper,
  MOBILE_BP_DOWN,
  SectionWrapper,
  TABLET_BP_DOWN,
} from '../components/blockHelpers'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

interface IconBulletPointItemBlockProps {
  _uid: string
  title: string
  paragraph: MarkdownHtmlComponent
  icon: string
}

interface BulletPointBlockProps extends BaseBlockProps {
  title: string
  title_position: TextPosition
  bullet_points: IconBulletPointItemBlockProps[]
}

const Paragraph = styled('div')({
  width: '100%',
  fontSize: '1.25rem',
  wordBreak: 'break-all',
})

const IconBulletPointItem = styled('div')(
  ({ contentAlignment }: { contentAlignment: string }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: contentAlignment === 'center' ? 'center' : 'start',
    width: 'calc(100% / 3)',
    textAlign: 'left',
    ':nth-child(n+4)': {
      marginTop: '3rem',
    },
    [TABLET_BP_DOWN]: {
      width: '50%',
      ':nth-child(n+3)': {
        marginTop: '3rem',
      },
    },
    [MOBILE_BP_DOWN]: {
      width: '100%',
      ':nth-child(n+2)': {
        marginTop: '3rem',
      },
    },
  }),
)

const Icon = styled('img')({
  display: 'block',
  width: '1.25rem',
  marginRight: '0.625rem',
  marginTop: '1.414rem',
  marginBottom: '0.5rem',
})

const AlignableContent = styled(ContentWrapper)(
  ({ titlePosition }: { titlePosition: TextPosition }) => ({
    display: 'flex',
    flexDirection: 'column',
    textAlign: titlePosition === 'center' ? 'center' : 'left',
  }),
)

const MainTitle = styled('h2')({
  marginBottom: '1.586rem',
})

const BulletPointList = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  [MOBILE_BP_DOWN]: {
    flexDirection: 'column',
  },
})

export const IconBulletPointBlock: React.FunctionComponent<
  BulletPointBlockProps
> = ({ title, title_position, bullet_points, color }) => {
  return (
    <SectionWrapper color={color && color.color}>
      <AlignableContent titlePosition={title_position}>
        <MainTitle>{title}</MainTitle>
        <BulletPointList>
          {bullet_points.map(
            ({ _uid, title: bulletPointTitle, paragraph, icon }) => {
              return (
                <IconBulletPointItem
                  contentAlignment={title_position}
                  key={_uid}
                >
                  <Icon src={icon || ''} />
                  <div>
                    <h4>{bulletPointTitle}</h4>
                    {
                      <Paragraph
                        dangerouslySetInnerHTML={{
                          __html: paragraph.html,
                        }}
                      />
                    }
                  </div>
                </IconBulletPointItem>
              )
            },
          )}
        </BulletPointList>
      </AlignableContent>
    </SectionWrapper>
  )
}
