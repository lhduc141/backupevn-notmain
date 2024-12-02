import { RcFile } from 'antd/es/upload';
import { messages } from 'messages';
import * as XLSX from 'xlsx-js-style';

const style: XLSX.CellStyle = {
  font: {
    name: 'Times New Roman',
    sz: 16
  },
  alignment: {
    horizontal: 'center',
    vertical: 'center',
    wrapText: true
  }
};

export function createExcelBuffer(rows: any[][]): Buffer {
  const worksheet = XLSX.utils.aoa_to_sheet(rows, { cellStyles: true });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet);

  const numOfCols = Math.floor(Object.keys(worksheet).filter((key) => key[0] !== '!').length / 2);
  worksheet['!cols'] = Array(numOfCols).fill({ width: 30 });

  for (let cell in worksheet) {
    if (cell[0] === '!') {
      continue;
    }

    worksheet[cell].s = style;
  }

  const buffer = XLSX.write(workbook, { type: 'buffer', cellStyles: true });
  return buffer;
}

export const readFileExcel = (file: RcFile): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          const jsonData = XLSX.utils
            .sheet_to_json(worksheet, { header: 1 })
            .filter((row: any) => row.some((cell: any) => cell !== undefined && cell !== null && cell !== ''));

          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);

      reader.readAsArrayBuffer(file as RcFile);
    } catch (error) {
      reject(error);
    }
  });
};

export const calculateColumnWidths = (
  data: (string | number)[][],
  minWidth?: number
): { columnWidths: number[]; totalWidth: number } => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  context.font = '14px Inter';

  let columnWidths: number[] =
    data?.[0]?.map((_, colIndex) => {
      if (colIndex === 0) return 75;
      const columnContent = data.map((row) => row[colIndex]?.toString() ?? '-');
      const maxWidth = Math.max(...columnContent.map((text) => context.measureText(text).width));
      return Math.min(400, Math.max(100, maxWidth)) + 12;
    }) || [];

  let totalWidth = columnWidths?.reduce((sum, width) => sum + width, 0) + 6;

  if (minWidth && totalWidth < minWidth) {
    const remainWidth = minWidth - totalWidth;
    columnWidths = columnWidths.map((width, idx) =>
      idx === 0 ? width : width + remainWidth / (columnWidths.length - 1)
    );
    totalWidth = minWidth;
  }

  return { columnWidths, totalWidth };
};

export const addIndexColumn = (
  data?: (string | number)[][],
  pageIndex: number = 0
): (string | number)[][] | undefined => {
  if (!data) return [];
  return data.map((row, index) => [index === 0 && pageIndex === 0 ? messages.index : pageIndex * 25 + index, ...row]);
};
