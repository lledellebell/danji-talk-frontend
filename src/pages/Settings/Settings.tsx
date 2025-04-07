import { Link } from 'react-router-dom';
import styles from './Settings.module.scss';

interface SettingItem {
  label: string;
  path: string;
}

interface SettingSection {
  title: string;
  items: SettingItem[];
}

const settingSections: SettingSection[] = [
  {
    title: '사용자 정보',
    items: [
      { label: '개인 정보 변경', path: '/settings/profile' },
      { label: '회원 탈퇴', path: '/settings/withdrawal' },
    ],
  },
  {
    title: '앱 설정',
    items: [
      { label: '푸쉬 알림 설정', path: '/settings/notifications' },
      { label: '테마', path: '/settings/theme' },
    ],
  },
  {
    title: '고객센터',
    items: [
      { label: 'FAQ', path: '/settings/faq' },
      { label: '공지사항', path: '/settings/notices' },
      { label: '1:1문의', path: '/settings/inquiry' },
      { label: '문의내역', path: '/settings/inquiry-list' },
    ],
  },
  {
    title: '기타',
    items: [
      { label: '라이센스', path: '/settings/license' },
      { label: '버전정보', path: '/settings/version' },
    ],
  },
];

const Settings = () => {
  return (
    <div className={styles.settings}>
      {settingSections.map((section) => (
        <section key={section.title} className={styles['settings__section']}>
          <h2 className={styles['settings__section-title']}>{section.title}</h2>
          <ul className={styles['settings__menu-list']}>
            {section.items.map((item) => (
              <li key={item.path} className={styles['settings__menu-item']}>
                <Link to={item.path} className={styles['settings__menu-link']}>
                  <span className={styles['settings__menu-label']}>{item.label}</span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles['settings__menu-icon']}
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default Settings; 