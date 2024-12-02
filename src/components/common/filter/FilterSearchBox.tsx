import { Col, Row, Skeleton } from 'antd';
import { ReactNode } from 'react';
import InfiniteScroll from '../InfiniteScroll';
import Search from '../InputSearch';
import { FilterPopoverOptionItem } from './Filter';

type FilterSearchBoxProps = {
  onSearch?: (value: string) => void;
  isLoading?: boolean;
  loadMore?: () => void;
  options: FilterPopoverOptionItem[];
  renderItem: (item: FilterPopoverOptionItem, index: number) => ReactNode;
  hasMore: boolean;
  placeholder?: string;
};
const FilterSearchBox: React.FC<FilterSearchBoxProps> = ({
  onSearch,
  isLoading,
  hasMore,
  loadMore,
  options,
  renderItem,
  placeholder
}) => {
  return (
    <div>
      {onSearch && (
        <Search
          className='mb-2'
          onChange={(searchString) => {
            onSearch(searchString);
          }}
          placeholder={placeholder}
        />
      )}
      <div className='no-scrollbar -mx-6 max-h-[300px] w-[calc(100%+48px)] overflow-auto'>
        <Row align='middle'>
          <InfiniteScroll
            className='flex-1'
            isLoading={isLoading}
            next={() => loadMore?.()}
            hasMore={Boolean(hasMore)}
            loader={
              <Skeleton
                active
                title={false}
                paragraph={{
                  rows: 3
                }}
              />
            }
            endMessage={<p></p>}
          >
            {options.map((o, idx) => (
              <Col span={24} key={o.value?.toString() || `key-${idx}`} className='border-t px-6'>
                {renderItem(o, idx)}
              </Col>
            ))}
          </InfiniteScroll>
        </Row>
      </div>
    </div>
  );
};
export default FilterSearchBox;
