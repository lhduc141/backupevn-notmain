import { SideBarMenuCustomerLookup } from 'components/customer-lookup';
import { useActiveMenu } from 'hooks';
import React, { useEffect } from 'react';
import { SIDEBAR_MENU_KEY } from 'utils';

type SecondSiderMenuProps = {};
const SecondSiderMenu: React.FC<SecondSiderMenuProps> = () => {
  const { selectedMenu } = useActiveMenu();

  useEffect(() => {
    if (selectedMenu === SIDEBAR_MENU_KEY.CUSTOMER_LOOKUP) {
      document.documentElement.style.setProperty('--sider-width', '128px');
    } else {
      document.documentElement.style.setProperty('--sider-width', '72px');
    }
  }, [selectedMenu]);

  if (selectedMenu !== SIDEBAR_MENU_KEY.CUSTOMER_LOOKUP) return null;

  return (
    <div className='absolute left-[72px] z-[90]'>
      <SideBarMenuCustomerLookup />
    </div>
  );
};

export default SecondSiderMenu;
