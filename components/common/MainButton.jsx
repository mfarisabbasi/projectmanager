import Link from "next/link";
import { MoonLoader } from "react-spinners";
import { IoMdArrowBack } from "react-icons/io";

const MainButton = ({
  type,
  to,
  bgColor,
  hoverColor,
  textColor,
  label,
  loading,
  onClick,
  isBack,
}) => {
  return (
    <>
      {type ? (
        <button
          onClick={onClick}
          className={`${bgColor ? bgColor : "bg-sec"} ${
            hoverColor ? hoverColor : "hover:bg-black"
          } ${
            textColor ? textColor : "text-white"
          } transition-all duration-300 px-6 py-2 rounded-md shadow-lg flex justify-center items-center text-base`}
        >
          {loading ? (
            <MoonLoader color="#ffffff" size={19} />
          ) : (
            <div className="flex justify-center items-center">
              {isBack && <IoMdArrowBack />}
              {label}
            </div>
          )}
        </button>
      ) : (
        <Link
          href={to}
          className={`${bgColor ? bgColor : "bg-sec"} ${
            hoverColor ? hoverColor : "hover:bg-black"
          } ${
            textColor ? textColor : "text-white"
          } transition-all duration-300 px-6 py-2 rounded-md shadow-lg`}
        >
          {label}
        </Link>
      )}
    </>
  );
};

export default MainButton;
