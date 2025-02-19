import styles from './SocialLoginListItem.module.scss';

interface SocialLoginListItemProps {
  children: React.ReactNode;
}

const SocialLoginListItem: React.FC<SocialLoginListItemProps> = ({ children }) => {
  return (
    <li className={styles.listItem} role="presentation">
      {children}
    </li>
  );
};

export default SocialLoginListItem; 