import React from 'react'
import { withRouter } from 'react-router-dom'
import { FooterBlock } from 'blocks/FooterBlock/FooterBlock'
import { HeaderBlock } from 'blocks/HeaderBlock'
import { FourOhFourBlock } from '../blocks/FourOhFourBlock'

export const FourOhFourPage: React.ComponentType = withRouter(
  ({ staticContext }) => {
    if (staticContext) {
      ;(staticContext as any).statusCode = 404
    }
    return (
      <>
        <HeaderBlock
          is_transparent={true}
          inverse_colors={true}
          _uid="header"
          component="header_block_brand_pivot"
        />

        <FourOhFourBlock />

        <FooterBlock
          component="footer_block"
          _uid="4007e38a-8975-41cb-b412-0da350b0b61f"
          color={{
            _uid: '6ea4c3c0-3595-4cf4-8d92-396d3f7a9cd2',
            color: 'standard-inverse',
            plugin: 'hedvig_minimal_color_picker',
          }}
        />
      </>
    )
  },
)
