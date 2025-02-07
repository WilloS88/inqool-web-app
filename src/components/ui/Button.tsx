type ButtonProps = {
  label?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  tooltip?: string;
};

export const Button = ({
  label,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  icon,
  tooltip,
}: ButtonProps) => {
  const baseStyles =
    "flex items-center px-2 py-2 font-semibold rounded cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`}
      title={tooltip}
    >
      {icon && <span className={label ? "mr-2" : ""}>{icon}</span>}
      {label}
    </button>
  );
};
