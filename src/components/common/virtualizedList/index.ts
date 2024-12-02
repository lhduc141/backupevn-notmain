import HorizontalVirtualizedList from './HorizontalVirtualizedList';
import VerticalVirtualizedList from './VirtualizedList';
export type VirtualizedListProps = typeof VerticalVirtualizedList & {
  Horizontal: typeof HorizontalVirtualizedList;
};
const VirtualizedList = VerticalVirtualizedList as VirtualizedListProps;
VirtualizedList.Horizontal = HorizontalVirtualizedList;

export { VirtualizedList };
