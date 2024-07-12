import clsx from "clsx"; // Importing clsx library for conditional class names

export default function Skeleton({ className, ...rest }) {
  return (
    <div
      {...rest} // Spread any additional props onto the <div> element
      className={clsx(
        "bg-gray-100 animate-pulse duration-300 rounded-lg", // Base styles for the skeleton component
        className // Additional classNames passed to the Skeleton component
      )}
    />
  );
}
