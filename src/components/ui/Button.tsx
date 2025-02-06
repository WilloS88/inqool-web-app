type ButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
};

export const Button = ({
  label,
  onClick,
  className = "",
  icon,
}: ButtonProps) => {
  const baseStyles =
    "flex px-2.5 py-2.5 font-semibold rounded focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};
