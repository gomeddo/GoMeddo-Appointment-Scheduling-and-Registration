import clsx from "clsx"; // Importing clsx library for conditional class names

function Button({ active, disabled, className, ...rest }) {
  return (
    <button
      {...rest} // Spread any additional props passed to Button component
      disabled={disabled} // Setting the disabled attribute based on the prop
      className={clsx(
        // Applying conditional class names using clsx
        "truncate font-medium rounded-md px-4 py-2", // Base styles for the button
        "text-center transition-all duration-300", // Additional styles for text centering and transition
        "ring-1 ring-gray-300", // Styling for the button ring
        "enabled:hover:bg-blue-black enabled:hover:text-white enabled:hover:shadow-sm", // Conditional styles for hover state when enabled
        {
          "bg-blue-black text-white": active, // Conditionally apply these styles when active=true
          "bg-gray-400 text-white": disabled, // Conditionally apply these styles when disabled=true
        },
        className // Additional classNames passed to the Button component
      )}
    />
  );
}

export default Button; // Exporting the Button component
