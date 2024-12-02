import * as Icons from 'assets/svg'; // Đường dẫn đến file chứa các icon

const RenderAllIcons = () => {
  return (
    <div>
      {Object.entries(Icons).map(([iconName, IconComponent]) => (
        <div key={iconName} className='text-center' style={{ margin: '10px', display: 'inline-block' }}>
          <IconComponent className='inline-block' />
          <p>{iconName}</p>
        </div>
      ))}
    </div>
  );
};

export default RenderAllIcons;
