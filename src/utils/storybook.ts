import { FontSizes } from 'components/Heading/Heading'
import {
  MarkdownHtmlComponent,
  MinimalColorComponent,
} from 'src/blocks/BaseBlockProps'
import {
  GlobalStory,
  LinkComponent,
  MenuItem,
} from 'src/storyblok/StoryContainer'

export const minimalColorMap: Record<string, MinimalColorComponent> = {
  standard: {
    _uid: '6ecde11d-ba0a-48fb-9b7b-e6dbf31415d9',
    color: 'standard',
    plugin: 'hedvig_minimal_color_picker',
  },
  'standard-inverse': {
    _uid: '6ecde11d-ba0a-48fb-9b7b-e6dbf31415d9',
    color: 'standard-inverse',
    plugin: 'hedvig_minimal_color_picker',
  },
  gray700: {
    _uid: '6ecde11d-ba0a-48fb-9b7b-e6dbf31415d9',
    color: 'gray700',
    plugin: 'hedvig_minimal_color_picker',
  },
  'gray500-inverse': {
    _uid: '6ecde11d-ba0a-48fb-9b7b-e6dbf31415d9',
    color: 'gray500-inverse',
    plugin: 'hedvig_minimal_color_picker',
  },
}

export const fontSizes: FontSizes[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl']

export const link: LinkComponent = {
  id: '2',
  url: '/',
  linktype: 'url',
  cached_url: '/',
}

const headerMenuItems: MenuItem[] = [
  {
    _uid: '1',
    label: 'Vår service',
    link,
    component: 'menu_item',
  },
  {
    _uid: '2',
    label: 'Vårt skydd',
    link,
    component: 'menu_item',
  },
  {
    _uid: '3',
    label: 'Hemförsäkring',
    link,
    component: 'menu_item',
    menu_items: [
      {
        _uid: '11',
        label: 'Hyresrätt & Andrahand',
        link,
        component: 'menu_item',
      },
      {
        _uid: '12',
        label: 'Bostadsrätt',
        link,
        component: 'menu_item',
      },
      {
        _uid: '13',
        label: 'Student',
        link,
        component: 'menu_item',
      },
      {
        _uid: '14',
        label: 'Villa',
        link,
        component: 'menu_item',
      },
    ],
  },
  {
    _uid: '4',
    label: 'Om Hedvig',
    link,
    component: 'menu_item',
  },
]

const footerMenuItems: MenuItem[] = [
  {
    _uid: '1',
    label: 'Hemförsäkring',
    link,
    component: 'menu_item',
    menu_items: [
      {
        _uid: '11',
        label: 'Hyresrätt & Andrahand',
        link,
        component: 'menu_item',
      },
      {
        _uid: '12',
        label: 'Bostadsrätt',
        link,
        component: 'menu_item',
      },
      {
        _uid: '13',
        label: 'Student',
        link,
        component: 'menu_item',
      },
      {
        _uid: '14',
        label: 'Villa',
        link,
        component: 'menu_item',
      },
    ],
  },
  {
    _uid: '2',
    label: 'Hedvig',
    link,
    component: 'menu_item',
    menu_items: [
      {
        _uid: '11',
        label: 'Om oss',
        link,
        component: 'menu_item',
      },
      {
        _uid: '12',
        label: 'Service',
        link,
        component: 'menu_item',
      },
      {
        _uid: '13',
        label: 'FAQ',
        link,
        component: 'menu_item',
      },
      {
        _uid: '14',
        label: 'Press',
        link,
        component: 'menu_item',
      },
      {
        _uid: '15',
        label: 'Jobb',
        link,
        component: 'menu_item',
      },
      {
        _uid: '14',
        label: 'Kontakt',
        link,
        component: 'menu_item',
      },
    ],
  },
  {
    _uid: '3',
    label: 'Legal',
    link,
    component: 'menu_item',
    menu_items: [
      {
        _uid: '11',
        label: 'Legal',
        link,
        component: 'menu_item',
      },
      {
        _uid: '12',
        label: 'Personuppgifter',
        link,
        component: 'menu_item',
      },
      {
        _uid: '13',
        label: 'Villkor',
        link,
        component: 'menu_item',
      },
    ],
  },
  {
    _uid: '4',
    label: 'Social',
    link,
    component: 'menu_item',
    menu_items: [
      {
        _uid: '11',
        label: 'Instagram',
        link,
        component: 'menu_item',
      },
      {
        _uid: '12',
        label: 'Facebook',
        link,
        component: 'menu_item',
      },
      {
        _uid: '13',
        label: 'Twitter',
        link,
        component: 'menu_item',
      },
      {
        _uid: '14',
        label: 'Spotify',
        link,
        component: 'menu_item',
      },
      {
        _uid: '15',
        label: 'Medium',
        link,
        component: 'menu_item',
      },
    ],
  },
]

const footerText: MarkdownHtmlComponent = {
  _uid: '5',
  html:
    '<div><p>© Hedvig AB 2020</p></div><div><p>Hedvig HQ, Valhallavägen 117 K, SE–115 31, Stockholm, SWE Org. nr. 559093-0334</p></div>',
  original:
    '<div><p>© Hedvig AB 2020</p></div><div><p>Hedvig HQ, Valhallavägen 117 K, SE–115 31, Stockholm, SWE Org. nr. 559093-0334</p></div>',
  plugin: 'markdown-html',
}

export const globalStoryMock: GlobalStory = {
  name: 'storybook mock',
  created_at: '',
  first_published_at: '',
  published_at: '',
  id: '',
  uuid: '',
  slug: '/storybook-mock',
  full_slug: '/storybook-mock',
  content: {
    _uid: '1234',
    page_title: '',
    component: 'global',
    header_menu_items: headerMenuItems,
    show_cta: true,
    cta_branch_link: false,
    cta_label: 'Beräkna ditt pris',
    cta_link: link,
    footer_menu_items: footerMenuItems,
    footer_download_title: 'Ladda ner',
    footer_safety_title: 'Trygghet',
    footer_safety_body:
      'Hedvig backas av HDI med över 200 års erfarenhet och 600 miljarder kr på kontot – du är i trygga händer. Hedvig står under Finansinspektionens tillsyn.',
    footer_rating_title: 'Betyg',
    footer_paragraph: footerText,
    peril_modal_info_title: 'Att tänka på',
    peril_modal_coverage_title: 'Det här täcks',
    peril_modal_exceptions_title: 'Undantag',
  },
}
