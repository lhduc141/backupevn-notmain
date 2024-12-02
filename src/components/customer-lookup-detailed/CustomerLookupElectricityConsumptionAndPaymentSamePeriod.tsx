import { Table, TableProps, Typography } from "antd";
interface DataType {
  key: string,
  month: string,
  period: string,
  [year: number]: {
    electricityConsumption: number,
    electricityConsumptionPerDay: number,
  };
}
const extractYears = (data: DataType[]) => {
  const years = new Set<number>();
  data.forEach(item => {
    Object.keys(item).forEach(key => {
      const year = parseInt(key);
      if (!isNaN(year)) {
        years.add(year);
      }
    });
  });
  return Array.from(years).sort(); // Sort years numerically
};
const generateColumns = (years: number[]) => {
  const columns: TableProps<DataType>['columns'] = [
    {
      title: '',
      key: 'month',
      width: '320px',

      render: (data: DataType) => (
        <Typography.Text className="object-center flex items-center font-semibold text-[16px]/[20px] tracking-normal text-[#141414] opacity-100">
          {data.month}
          <span className="inline-block w-1 h-1 mx-2 rounded-full bg-[#141414]"></span>
          {data.period}
        </Typography.Text>
      ),
    },
    ...years.map(year => ({
      title: (
        <Typography.Text className="text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D97] uppercase opacity-100">
          Năm {year}
        </Typography.Text>
      ),
      dataIndex: year,
      key: year,
      render: (data: {
        electricityConsumption: number,
        electricityConsumptionPerDay: number,
      }) => {
        return (
          <div className="w-full">
            <div className="pb-3 text-left">
              <Typography.Text className="text-left font-normal text-[16px]/[20px] tracking-normal text-[#141414] opacity-100">
                {data?.electricityConsumption || '-'}
              </Typography.Text>
            </div>
            <div className="pt-3 w-full border-t-[1px]">
              <Typography.Text className="text-left font-normal text-[16px]/[20px] tracking-normal text-[#868D97] opacity-100">
                {data?.electricityConsumptionPerDay ? `${data.electricityConsumptionPerDay} /ngày` : '-'}
              </Typography.Text>
            </div>
          </div>
        );
      },
    })),
  ];

  return columns;
};
const data: DataType[] = [
  {
    key: "1",
    month: "Tháng 7",
    period: "Kỳ 1",
    2023: { electricityConsumption: 2031, electricityConsumptionPerDay: 94.81 },
    2024: { electricityConsumption: 2032, electricityConsumptionPerDay: 94.82 },
  },
  {
    key: "2",
    month: "Tháng 6",
    period: "Kỳ 1",
    2023: { electricityConsumption: 2033, electricityConsumptionPerDay: 94.83 },
    2024: { electricityConsumption: 2034, electricityConsumptionPerDay: 94.84 },
  },
  {
    key: "3",
    month: "Tháng 5",
    period: "Kỳ 1",
    2023: { electricityConsumption: 2035, electricityConsumptionPerDay: 94.85 },
    2024: { electricityConsumption: 2036, electricityConsumptionPerDay: 94.86 },
  },
  {
    key: "4",
    month: "Tháng 4",
    period: "Kỳ 1",
    2023: { electricityConsumption: 2037, electricityConsumptionPerDay: 94.87 },
    2024: { electricityConsumption: 2038, electricityConsumptionPerDay: 94.88 },
  },
]


const CustomerLookupElectricityConsumptionAndPaymentSamePeriod = () => {

  const years = extractYears(data);  // Extract all available years from the data
  const columns = generateColumns(years);  // Generate columns dynamically
  return (
    <div className="w-[1008px] mt-3 bg-[#FFFFFF]">
      <Table className="ant-table-th-pl-none ant-table-tb-padding-none ant-table-tb-item-center" columns={columns} dataSource={data} />
    </div>
  )
}

export default CustomerLookupElectricityConsumptionAndPaymentSamePeriod