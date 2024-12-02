import { useLocation } from 'react-router-dom';
import { MENU_LIST_ITEM, MenuItemType } from 'utils';

export function useActiveMenu() {
  const location = useLocation();
  const pathnameArr = location.pathname.replace('/', '').split('/');
  const getSelectedKeys = (
    items: MenuItemType[],
    path: string
  ): { selectedMenu?: string; selectedSubMenu?: string } => {
    for (let item of items) {
      if (item.children) {
        for (let child of item.children) {
          if (child.href === path) {
            return { selectedMenu: item.key, selectedSubMenu: child.key };
          }
        }
      }
      if (item.href === path) {
        return { selectedMenu: item.key };
      }
    }
    return {};
  };
  return getSelectedKeys(MENU_LIST_ITEM, `/${pathnameArr[0]}`);
}
