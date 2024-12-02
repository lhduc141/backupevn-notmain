import { MappingAlgorithm, OverrideToken } from 'antd/es/theme/interface';

import { ThemeConfig } from 'antd';
import { colorsBase, fonts } from './variables';
type ComponentsConfig = {
  [key in keyof OverrideToken]?: OverrideToken[key] & {
    algorithm?: boolean | MappingAlgorithm | MappingAlgorithm[];
  };
};
const tokenComponents: ComponentsConfig = {
  Button: {
    paddingInline: 16,
    textHoverBg: colorsBase.textHoverBg
  },
  DatePicker: {
    activeBg: colorsBase.colorBgInput,
    hoverBg: colorsBase.colorBgInput
  },
  Form: {
    itemMarginBottom: 12,
    labelColor: colorsBase.colorTextBase,
    labelFontSize: 16,
    labelHeight: 40
  },
  Input: {
    activeBg: colorsBase.colorBgInput,
    hoverBg: colorsBase.colorBgInput,
    paddingBlock: 9
  },
  InputNumber: {
    activeBg: colorsBase.colorBgInput,
    hoverBg: colorsBase.colorBgInput,
    paddingBlock: 9
  },
  Layout: {
    bodyBg: colorsBase.colorBgBody,
    siderBg: colorsBase.colorBgSpotlight,
    headerHeight: 80
  },
  Menu: {
    darkItemBg: colorsBase.colorBgSpotlight,
    darkItemHoverBg: colorsBase.spotlightHover,
    darkItemSelectedBg: colorsBase.spotlightHover
  },
  Modal: {
    titleFontSize: 22,
    titleLineHeight: 1.1818
  },
  Select: {},
  Table: {
    borderColor: colorsBase.colorBorder,
    headerBg: '#EBEBED',
    headerColor: colorsBase.colorTextLabel,
    headerSplitColor: 'transparent'
  },
  Tabs: {
    horizontalItemPadding: '8px 0px',
    horizontalMargin: '0 0 24px 0'
  },
  Timeline: {
    itemPaddingBottom: 16,
    tailColor: colorsBase.tailColor,
    tailWidth: 1
  }
};
export const theme: ThemeConfig = {
  token: {
    fontFamily: `'Inter', sans-serif `,
    ...colorsBase,
    ...fonts,
    borderRadius: 8
  },
  components: { ...tokenComponents }
};
export * from './variables';
