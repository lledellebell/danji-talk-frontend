export interface TabProps {
  className?: string;
  index: number;
  isActive: boolean;
  onClick: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  label: string;
  innerRef?: (el: HTMLButtonElement | null) => void;
}

const Tab: React.FC<TabProps> = ({
  className,
  index,
  isActive,
  onClick,
  onKeyDown,
  label,
  innerRef,
}) => {
  return (
    <button
      role="tab"
      // 활성화된 탭은 탭 순서에 들어오도록 0, 그렇지 않으면 -1
      tabIndex={isActive ? 0 : -1}
      aria-selected={isActive}
      aria-controls={`tabpanel-${index}`}
      id={`tab-${index}`}
      className={isActive ? `${className} tab-wrapper__tab--active` : className}
      onClick={onClick}
      onKeyDown={onKeyDown}
      ref={innerRef}
    >
      {label}
    </button>
  );
};

export default Tab;
