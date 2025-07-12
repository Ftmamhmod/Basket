import logo from "../../assets/img/nav/logo.png";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import Search from "./Search";
import { useSelector } from "react-redux";
import UserMenu from "./CustomDropdownMenu";
import CustomDropdownMenu from "./CustomDropdownMenu";

const Logo = () => {
  const cartItems = useSelector((state) => state.cart.products);

  const totalItems = useMemo(() => {
    let totalNumbers = 0;
    cartItems.forEach((object) => {
      totalNumbers += object.count;
    });
    return totalNumbers;
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    let totalNumbers = 0;
    cartItems.forEach((object) => {
      totalNumbers += object.totalPrice;
    });
    return totalNumbers;
  }, [cartItems]);

  const trigger = (
    <div className="cursor-pointer">
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.6899 15.28C16.5219 14.356 16.2099 13.492 15.7539 12.688C15.2979 11.884 14.7099 11.194 13.9899 10.618C13.3659 10.078 12.6339 9.646 11.7939 9.322C12.3699 8.878 12.8259 8.32899 13.1619 7.675C13.4979 7.021 13.6659 6.32199 13.6659 5.578C13.6659 4.71399 13.4559 3.91899 13.0359 3.193C12.6159 2.467 12.0429 1.894 11.3169 1.474C10.5909 1.054 9.79587 0.843996 8.93187 0.843996C8.06787 0.843996 7.27287 1.054 6.54687 1.474C5.82087 1.894 5.24787 2.467 4.82787 3.193C4.40787 3.91899 4.19787 4.71399 4.19787 5.578C4.19787 6.32199 4.36587 7.021 4.70187 7.675C5.03787 8.32899 5.49388 8.878 6.06987 9.322C5.26587 9.658 4.53987 10.09 3.89187 10.618C3.19587 11.194 2.61387 11.878 2.14587 12.67C1.67787 13.462 1.35987 14.302 1.19187 15.19L0.921875 16.612L2.46987 16.918L2.75787 15.514C2.88987 14.782 3.13888 14.104 3.50487 13.48C3.87087 12.856 4.34187 12.307 4.91787 11.833C5.49388 11.359 6.12687 10.999 6.81687 10.753C7.50687 10.507 8.21187 10.384 8.93187 10.384C9.65187 10.384 10.3659 10.51 11.0739 10.762C11.7819 11.014 12.4119 11.368 12.9639 11.824C13.5399 12.304 14.0139 12.865 14.3859 13.507C14.7579 14.149 15.0039 14.83 15.1239 15.55L15.3939 16.954L16.9239 16.648L16.6899 15.28ZM8.93187 2.41C9.50787 2.41 10.0389 2.551 10.5249 2.833C11.0109 3.115 11.3949 3.499 11.6769 3.98499C11.9589 4.47099 12.0999 5.002 12.0999 5.578C12.0999 6.154 11.9589 6.685 11.6769 7.17099C11.3949 7.65699 11.0109 8.041 10.5249 8.323C10.0389 8.60499 9.50787 8.746 8.93187 8.746C8.35587 8.746 7.82487 8.60499 7.33887 8.323C6.85287 8.041 6.46887 7.65699 6.18687 7.17099C5.90487 6.685 5.76388 6.154 5.76388 5.578C5.76388 5.002 5.90487 4.47099 6.18687 3.98499C6.46887 3.499 6.85287 3.115 7.33887 2.833C7.82487 2.551 8.35587 2.41 8.93187 2.41Z"
          fill="#3E445A"
        />
      </svg>
    </div>
  );
  const { token } = useSelector((state) => state.auth);
  const menuItems = token
    ? [{ label: "Log out", to: "/" }]
    : [
        { label: "Log In", to: "/login" },
        { label: "Sign Up", to: "/signup" },
      ];

  return (
    <div className="pt-0 lg:pt-8 w-full px-4 xl:px-[150px] flex justify-between items-center overflow-hidden md:overflow-visible">
      <div className="flex justify-center items-center w-full gap-0 lg:gap-6 ">
        <a href="/" className="mx-auto">
          <img
            loading="lazy"
            src={logo}
            alt="Logo"
            className=" min-w-[120px] md:min-w-[165px] h-auto w-full"
          />
        </a>

        <div className="hidden lg:block w-full z-50">
          <Search />
        </div>

        <div className="flex gap-4 items-center mx-auto">
          <CustomDropdownMenu trigger={trigger} items={menuItems} />
          <div className="flex gap-1 items-center">
            <h1 className="font-[600] text-[16px] text-[#3E445A] dosis">
              ${Number(totalPrice).toFixed(2)}
            </h1>
            <Link to={"./cart"}>
              <div className="relative">
                <div className="absolute top-0 right-0 bg-[#EA2B0F] text-white text-[10px] font-[400] w-4 h-4 rounded-full text-center">
                  {totalItems}
                </div>
                <svg
                  width="42"
                  height="43"
                  viewBox="0 0 42 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="0.25"
                    width="42"
                    height="42"
                    rx="21"
                    fill="#FFF1EE"
                  />
                  <g clipPath="url(#clip0_1_3013)">
                    <path
                      d="M21.0342 14.161C20.5242 14.161 20.0511 14.2885 19.6147 14.5435C19.1784 14.7985 18.8327 15.1442 18.5777 15.5805C18.3227 16.0168 18.1952 16.49 18.1952 17H16.7502C16.7502 16.2293 16.9401 15.5182 17.3197 14.8665C17.6994 14.2148 18.2151 13.6992 18.8667 13.3195C19.5184 12.9398 20.2296 12.75 21.0002 12.75C21.7709 12.75 22.4821 12.9398 23.1337 13.3195C23.7854 13.6992 24.3011 14.2148 24.6807 14.8665C25.0604 15.5182 25.2502 16.2293 25.2502 17H28.0382C28.4462 17 28.7919 17.1445 29.0752 17.4335C29.3586 17.7225 29.5002 18.0767 29.5002 18.496C29.5002 18.5867 29.4946 18.6717 29.4832 18.751L27.9022 27.897C27.8116 28.4297 27.5622 28.8717 27.1542 29.223C26.7462 29.5743 26.2759 29.75 25.7432 29.75H16.2572C15.7246 29.75 15.2542 29.5743 14.8462 29.223C14.4382 28.8717 14.1889 28.4297 14.0982 27.897L12.5172 18.768C12.4492 18.36 12.5314 17.986 12.7637 17.646C12.9961 17.306 13.3106 17.0963 13.7072 17.017C13.7866 17.0057 13.8716 17 13.9622 17H23.8732C23.8732 16.49 23.7457 16.0168 23.4907 15.5805C23.2357 15.1442 22.8901 14.7985 22.4537 14.5435C22.0174 14.2885 21.5442 14.161 21.0342 14.161ZM28.0382 18.411H13.9622C13.9509 18.411 13.9339 18.4337 13.9112 18.479V18.513L15.4922 27.659C15.5262 27.8403 15.6056 27.9933 15.7302 28.118C15.8549 28.2427 16.0022 28.3107 16.1722 28.322L16.2572 28.339H25.7432C25.9132 28.339 26.0691 28.2852 26.2107 28.1775C26.3524 28.0698 26.4459 27.9253 26.4912 27.744L28.0892 18.496C28.0892 18.4507 28.0779 18.428 28.0552 18.428L28.0382 18.411Z"
                      fill="#EA2B0F"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_3013">
                      <rect
                        width="17"
                        height="17"
                        fill="white"
                        transform="matrix(1 0 0 -1 12.5 29.75)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
