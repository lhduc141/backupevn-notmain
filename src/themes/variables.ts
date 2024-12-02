const colors = {
  mainColor1: '#1564E8',
  mainColor2: '#CC0004',

  secondaryColor1: '#06A77D',
  secondaryColor2: '#FF9500',
  secondaryColor3: '#02D8A0',
  secondaryColor4: '#001F79',

  backgroundColor1: '#F5F5F7',
  backgroundColor2: '#EBEBED',
  backgroundColor3: '#222A41',
  backgroundColor3Light: '#222A41B3',
  backgroundColor4: '#1564E81A',

  iconColor: '#B2B9C4',

  lineColor1: '#D4D8DE',
  lineColor2: '#EBEBED',

  hoverColor1: '#EBEBED',
  hoverColor2: '#D4D8DE',

  mainTextColor: '#141414',
  subTextColor: '#868D97',

  bgBubbleChat: '#1564E81A'
};

const colorsBase = {
  ...colors,
  // antd
  colorPrimary: colors.mainColor1,
  colorPrimaryActive: colors.mainColor1,
  colorPrimaryBg: '#ECF3FE',

  colorBgBase: '#fff',
  colorBgBody: '#F5F5F7',
  colorBgContainer: '#fff',
  colorBgContainerDisabled: '#D6D8DB',
  colorBgSpotlight: '#222A41',
  textHoverBg: '#EBEBED',

  /** separator, card separator */
  colorBorder: '#DEE2E6',
  colorError: '#D1131D',
  colorTextBase: colors.mainTextColor,
  /**  disabled color text */
  colorTextDisabled: 'rgba(0, 0, 0, 0.25)',
  colorTextLabel: '#6C737E',

  colorTextLightSolid: '#fff',
  colorTextPlaceholder: '#878787',
  colorTextSecondary: colors.subTextColor,
  spotlightHover: '#0000003D',
  tailColor: '#B2B9C4',

  /** border button */
  defaultBorderColor: '#DEE2E6',

  // custom
  colorBgContainerAuth: '#0330b2',
  colorBgContainerHover: '#00000099',
  colorBgHeader: '#FFFFFF00',
  colorBgIconHover: '#F5F5F7',
  colorBgItemHover: '#F7F8F9',
  colorBgInput: '#ffffff',
  colorBgContent: '#ffffff',
  colorBorderInput: '#EBEBED',
  spotlightBorder: '#FFFFFF7A',
  colorBgContainerSecondary: '#f5f5f7',

  colorContrast: '#D1131D',
  colorTextLabelContrast: '#DF656C',
  colorTextContrast: '#ffffff',
  colorBgSuccess: '#06A77D',
  colorBgError: '#D1131D',

  /** Màu chưa có trong design */
  colorBgSmallModal: '#f7f8f9',
  colorBgChat: '#EBEEF0',
  colorBgMessage: '#CBE7FF',
  colorBgMyMessage: '#FFFFFF'
};

const fonts = {
  fontSize: 16,
  lineHeight: 1.25,

  fontSizeHeading1: 38,
  lineHeightHeading1: 1.2105263157894737,

  fontSizeHeading2: 30,
  lineHeightHeading2: 1.2666666666666666,

  fontSizeHeading2b: 36,
  lineHeightHeading2b: 1.38461538462,

  fontSizeHeading3: 24,
  lineHeightHeading3: 1.3333333333333333,

  fontSizeHeading4: 20,
  lineHeightHeading4: 1.4,

  fontSizeHeading5: 16,
  lineHeightHeading5: 1.5
};

const sizes = {
  sidebarMenu: 300,
  sidebarMenuCollapsed: 72
};
export { colorsBase, fonts, sizes };
