import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export type IconItem = {
  key: string;
  icon:
    | React.ComponentType<CustomIconComponentProps | React.SVGProps<SVGSVGElement>>
    | React.ForwardRefExoticComponent<CustomIconComponentProps>;
  path: string;
};
