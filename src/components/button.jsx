import clsx from "clsx";

function Button({ active, disabled, className, ...rest }) {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={clsx(
        "truncate font-medium rounded-md px-4 py-2",
        "text-center transition-all duration-300",
        "ring-1 ring-gray-300",
        "enabled:hover:bg-blue-black enabled:hover:text-white enabled:hover:shadow-sm",
        {
          "bg-blue-black text-white": active,
          "bg-gray-400 text-white": disabled,
        },
        className
      )}
    />
  );
}

export default Button;
