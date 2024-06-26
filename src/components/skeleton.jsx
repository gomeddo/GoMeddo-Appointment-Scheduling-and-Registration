import clsx from "clsx";

export default function Skeleton({ className, ...rest }) {
  return (
    <div
      {...rest}
      className={clsx(
        "bg-gray-100 animate-pulse duration-300 rounded-lg",
        className
      )}
    />
  );
}
