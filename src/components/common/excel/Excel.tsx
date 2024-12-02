import { Typography } from 'antd';
import { maxBy } from 'lodash';
import { VariableSizeGrid as Grid } from 'react-window';
import { twMerge } from 'tailwind-merge';
import { addIndexColumn, calculateColumnWidths } from 'utils';

type GridProps = React.ComponentProps<typeof Grid>;

export type ExcelProps = Partial<Pick<GridProps, 'columnWidth' | 'width' | 'height'>> & {
  rowHeight?: number;
  data?: (string | number)[][];
  minWidth?: number;
  maxWidth?: number;
  pageIndex?: number;
  titleRows?: (string | number)[];
};
const Excel = ({ data, height = 400, rowHeight = 72, width, minWidth, maxWidth, pageIndex, titleRows }: ExcelProps) => {
  let excelData = addIndexColumn(data, pageIndex) || [];
  if (!excelData) return null;
  const { columnWidths, totalWidth } = calculateColumnWidths(excelData, minWidth);
  if (titleRows) excelData = [titleRows, ...excelData];

  const Cell = ({ columnIndex, rowIndex, style }: any) => (
    <div
      className={twMerge(
        'flex items-center overflow-hidden text-ellipsis whitespace-nowrap border-b border-gray-300 px-3',
        rowIndex === 0 && 'border-b-0 bg-backgroundColor2'
      )}
      style={style}
    >
      <Typography.Paragraph
        className={twMerge(
          'mb-0 text-sm',
          columnIndex === 1 && 'font-semibold',
          rowIndex === 0 && 'text-xs font-normal uppercase text-subTextColor'
        )}
        ellipsis={{
          rows: 1,
          tooltip: true
        }}
      >
        {excelData[rowIndex][columnIndex]}
      </Typography.Paragraph>
    </div>
  );
  const maxColumn = maxBy(excelData, (o) => o.length)?.length || 1;

  return (
    <div>
      {excelData.length > 0 && (
        <Grid
          className='slim-scrollbar-horizontal bg-colorBgSmallModal'
          columnCount={maxColumn}
          rowCount={excelData.length}
          columnWidth={(index) => columnWidths[index]} // Độ rộng của cột theo index
          rowHeight={(index) => (index === 0 ? 40 : rowHeight)}
          width={width || Math.min(totalWidth, maxWidth ?? 9999)}
          height={height}
        >
          {Cell}
        </Grid>
      )}
    </div>
  );
};
export default Excel;
