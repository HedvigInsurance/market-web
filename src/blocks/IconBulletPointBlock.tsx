import * as React from 'react'
import styled from 'react-emotion'
import { TextPosition } from 'src/utils/utils/textPosition'
import {
  ContentWrapper,
  MOBILE_BP_DOWN,
  SectionWrapper,
  TABLET_BP_DOWN,
} from '../components/blockHelpers'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

interface IconBulletPointItemBlockInterface {
  _uid: string
  title: string
  paragraph: MarkdownHtmlComponent
  icon: string
}

interface BulletPointBlockInterface extends BaseBlockProps {
  title: string
  title_position: TextPosition
  bullet_points: IconBulletPointItemBlockInterface[]
}

const ParagraphComponent = styled('div')({
  width: '100%',
  fontSize: '1.25rem',
  wordBreak: 'break-all',
})

const IconBulletPointItemComponent = styled('div')(
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

const IconComponent = styled('img')({
  display: 'block',
  width: '1.25rem',
  marginRight: '0.625rem',
  marginTop: '1.414rem',
  marginBottom: '0.5rem',
})

const AlignableContentComponent = styled(ContentWrapper)(
  ({ titlePosition }: { titlePosition: TextPosition }) => ({
    display: 'flex',
    flexDirection: 'column',
    textAlign: titlePosition === 'center' ? 'center' : 'left',
  }),
)

const MainTitleComponent = styled('h2')({
  marginBottom: '1.586rem',
})

const BulletPointListComponent = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  [MOBILE_BP_DOWN]: {
    flexDirection: 'column',
  },
})

export const IconBulletPointBlock: React.FunctionComponent<
  BulletPointBlockInterface
> = ({ title, title_position, bullet_points, color }) => {
  return (
    <SectionWrapper color={color && color.color}>
      <AlignableContentComponent titlePosition={title_position}>
        <MainTitleComponent>{title}</MainTitleComponent>
        <BulletPointListComponent>
          {bullet_points.map(
            ({ _uid, title: bulletPointTitle, paragraph, icon }) => {
              return (
                <IconBulletPointItemComponent
                  contentAlignment={title_position}
                  key={_uid}
                >
                  <IconComponent src={icon || ''} />
                  <div>
                    <h4>{bulletPointTitle}</h4>
                    {
                      <ParagraphComponent
                        dangerouslySetInnerHTML={{
                          __html: paragraph.html,
                        }}
                      />
                    }
                  </div>
                </IconBulletPointItemComponent>
              )
            },
          )}
        </BulletPointListComponent>
      </AlignableContentComponent>
    </SectionWrapper>
  )
}
