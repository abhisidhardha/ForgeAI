import { variants } from "./ButtonVariants";

const Button = ({
  children,
  className,
  isLoading = false,
  variant ="ghost" ,
  disabled = false,
  loadingText = "Loading ...",
  ...props
}) => {
  return (
    <button
      disabled={isLoading || disabled}
      {...props}
      className={` ${variants[variant]} ${className} cursor-pointer`}
    >
      {isLoading ? loadingText : children}
    </button>
  );
};

export default Button;
