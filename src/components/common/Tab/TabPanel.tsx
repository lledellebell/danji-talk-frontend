export interface TabPanelProps {
  className?: string;
  isActive: boolean;
  children: React.ReactNode;
  role: string;
  id: string;
  ariaLabelledby: string;
}

const TabPanel: React.FC<TabPanelProps> = ({
  className,
  isActive,
  children,
  role,
  id,
  ariaLabelledby,
}) => {
  return (
    <div
      className={isActive ? `${className} tab-wrapper__tabpanel--active` : className}
      role={role}
      id={id}
      aria-labelledby={ariaLabelledby}
      // 활성 상태가 아니면 hidden 속성으로 보조기기에 숨김 처리
      hidden={!isActive}
    >
      {children}
    </div>
  );
};

export default TabPanel;
