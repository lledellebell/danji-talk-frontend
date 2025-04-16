import { useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { useAuthStore } from '../../stores/authStore';
import { useSidebarStore } from '../../stores/sidebarStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuthStore();
  const { menuItems, isClosing, closeSidebar } = useSidebarStore();

  const handleClose = useCallback(() => {
    closeSidebar();
    onClose();
  }, [closeSidebar, onClose]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClose]);

  const handleLogout = () => {
    handleClose();
    setTimeout(() => {
      logout();
      navigate('/login');
    }, 300);
  };

  const handleLogin = () => {
    handleClose();
    setTimeout(() => {
      navigate('/login');
    }, 300);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <>
      <div
        className={`${styles['sidebar-overlay']} ${isClosing ? styles['sidebar-overlay--closing'] : ''}`}
        onClick={handleClose}
        role="presentation"
      />
      <aside
        className={`${styles.sidebar} ${isClosing ? styles['sidebar--closing'] : ''}`}
        role="complementary"
        aria-label="메인 메뉴"
      >
        <button
          type="button"
          className={styles['sidebar__close-button']}
          onClick={handleClose}
          aria-label="메뉴 닫기"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <nav className={styles['sidebar__nav']}>
          <ul className={styles['sidebar__list']}>
            {menuItems.map((item) => (
              <li key={item.path} className={styles['sidebar__item']}>
                <Link to={item.path} className={styles['sidebar__link']}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className={styles['sidebar__item']}>
              {isLoggedIn ? (
                <button
                  type="button"
                  className={styles['sidebar__button']}
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              ) : (
                <button
                  type="button"
                  className={styles['sidebar__button']}
                  onClick={handleLogin}
                >
                  로그인
                </button>
              )}
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
