import React, { useState, useRef, useEffect } from 'react';
import Tab, { TabProps } from './Tab';
import TabPanel, { TabPanelProps } from './TabPanel';
import styles from './Tabs.module.scss';

interface TabWrapperProps {
  children: React.ReactNode[];
  ariaLabel: string;
}

const TabWrapper: React.FC<TabWrapperProps> = ({ children, ariaLabel }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // 모든 자식을 배열로 변환
  const allChildren = React.Children.toArray(children);

  // Tab과 TabPanel을 각각 분리
  const tabs = allChildren.filter(
    (child) => React.isValidElement<TabProps>(child) && child.type === Tab
  ) as React.ReactElement<TabProps>[];

  const tabPanels = allChildren.filter(
    (child) =>
      React.isValidElement<TabPanelProps>(child) && child.type === TabPanel
  ) as React.ReactElement<TabPanelProps>[];

  // 탭 개수만큼 Ref 배열 생성
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    // 활성화된 탭에 포커스 이동
    tabRefs.current[activeIndex]?.focus();
  }, [activeIndex]);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  // 방향키로 탭 이동 처리
  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    const lastIndex = tabs.length - 1;
    let newIndex = index;

    switch (event.key) {
      case 'ArrowRight':
        newIndex = index === lastIndex ? 0 : index + 1;
        setActiveIndex(newIndex);
        break;
      case 'ArrowLeft':
        newIndex = index === 0 ? lastIndex : index - 1;
        setActiveIndex(newIndex);
        break;
      case 'Home':
        setActiveIndex(0);
        break;
      case 'End':
        setActiveIndex(lastIndex);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles['tab-wrapper']} aria-label={ariaLabel}>
      <div
        className={styles['tab-wrapper__tablist']}
        role="tablist"
        aria-orientation="horizontal"
      >
        {tabs.map((tab, index) => {
          return React.cloneElement(tab, {
            className: `${styles['tab-wrapper__tab']} ${
              index === activeIndex ? styles['tab-wrapper__tab--active'] : ''
            }`,
            isActive: index === activeIndex,
            onClick: () => handleTabClick(index),
            onKeyDown: (event: React.KeyboardEvent) =>
              handleKeyDown(event, index),
            index,
            innerRef: (el: HTMLButtonElement | null) => {
              tabRefs.current[index] = el;
            },
          });
        })}
      </div>
      {tabPanels.map((panel, index) => {
        return React.cloneElement(panel, {
          className: `${styles['tab-wrapper__tabpanel']} ${
            index === activeIndex ? styles['tab-wrapper__tabpanel--active'] : ''
          }`,
          isActive: index === activeIndex,
          role: 'tabpanel',
          id: `tabpanel-${index}`,
          ariaLabelledby: `tab-${index}`,
        });
      })}
    </div>
  );
};

export default TabWrapper;
