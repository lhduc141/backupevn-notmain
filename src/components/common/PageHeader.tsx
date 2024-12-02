import { PropsWithChildren, useCallback, useEffect } from 'react';
import { generateUUID, ID_CRM_HEADER, ID_PAGE_HEADER } from 'utils';
type PageHeaderType = PropsWithChildren & {
  className?: string;
};
/**Không được bỏ trong thẻ Fragment <></> */
const PageHeader = ({ className, children }: PageHeaderType) => {
  const pageId = `tempHeader_${generateUUID()}`;
  useEffect(() => {
    renderHeader();
  }, []);
  const renderHeader = useCallback(() => {
    const pageHeader = document.getElementById(ID_PAGE_HEADER + pageId);
    const crmHeader = document.getElementById(ID_CRM_HEADER);
    if (pageHeader && crmHeader) {
      crmHeader.innerHTML = '';
      /** Chuyển header của page sang header chung */
      crmHeader.appendChild(pageHeader);
    }
  }, [children]);

  return (
    <div className={className} id={ID_PAGE_HEADER + pageId}>
      {children}
    </div>
  );
};

export default PageHeader;
