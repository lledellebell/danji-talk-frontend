import back_icon from "../assets/back_icon.svg";
import user_icon from "../assets/user_icon.svg";

const Header = () => {
  return (
    <div
      style={{
        height: "56px",
        display: "flex",
        alignItems: "center",
        padding: "0px 20px",
        boxShadow: "0px 1px 4px 0 rgba(0, 0, 0, 0.04)",
        position: "relative",
      }}
    >
      <img src={back_icon} alt="뒤로가기" />
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          fontWeight: "bold",
        }}
      >
        Headline
      </div>
      <div style={{ display: "flex", gap: "10px", marginLeft: "auto" }}>
        <img src={user_icon} alt="즐겨찾기" />
        <img src={user_icon} alt="추가 아이콘" />
      </div>
    </div>
  );
};

export default Header;
