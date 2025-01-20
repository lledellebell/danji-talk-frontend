import styles from "./Avatar.module.scss";

type AvatarSize = "small" | "medium" | "large";
type AvatarVariant = "circle" | "rounded" | "square";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  disabled?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
  ariaLabel?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  size = "medium",
  variant = "circle",
  disabled = false,
  onClick,
  ariaLabel,
}) => {
  return (
    <button
      className={`${styles.avatar} ${styles[size]} ${styles[variant]} ${
        disabled ? styles.disabled : ""
      }`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      aria-label={ariaLabel || alt}
    >
      {src ? (
        <img src={src} alt={alt} className={styles.image} />
      ) : (
        <span className={styles.placeholder} aria-hidden="true">
          A
        </span>
      )}
    </button>
  );
};

export default Avatar;