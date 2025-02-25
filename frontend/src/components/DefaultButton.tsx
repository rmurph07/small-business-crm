import React, { FunctionComponent, CSSProperties, useMemo } from "react";
export type DefaultButtonType = {
  buttonText: string;
  onClick?: () => void; // Optional click handler
  type?: "button" | "submit" | "reset"; // Optional button type, with default
  disabled?: boolean;
  // Existing style props
  DefaultButtonPosition?: CSSProperties["position"];
  DefaultButtonTop?: CSSProperties["top"];
  DefaultButtonRight?: CSSProperties["right"];
  DefaultButtonWidth?: CSSProperties["width"];
  DefaultButtonOverflow?: CSSProperties["overflow"];
  DefaultButtonBottom?: CSSProperties["bottom"];
  DefaultButtonLeft?: CSSProperties["left"];
  DefaultButtonBackgroundColor?: CSSProperties["backgroundColor"];
  DefaultButtonBorder?: CSSProperties["border"];
  DefaultButtonFlex?: CSSProperties["flex"];
  buttonColor?: CSSProperties["color"];
};

const DefaultButton: FunctionComponent<DefaultButtonType> = ({
  buttonText,
  onClick, // Using the new onClick prop
  type = "button", // Setting a default type
  disabled = false,
  // Destructuring all existing props
  DefaultButtonPosition,
  DefaultButtonTop,
  DefaultButtonRight,
  DefaultButtonWidth,
  DefaultButtonOverflow,
  DefaultButtonBottom,
  DefaultButtonLeft,
  DefaultButtonBackgroundColor,
  DefaultButtonBorder,
  DefaultButtonFlex,
  buttonColor,
}) => {
  const DefaultButtonStyle: CSSProperties = useMemo(() => ({
    position: DefaultButtonPosition,
    top: DefaultButtonTop,
    right: DefaultButtonRight,
    width: DefaultButtonWidth,
    overflow: DefaultButtonOverflow,
    bottom: DefaultButtonBottom,
    left: DefaultButtonLeft,
    backgroundColor: DefaultButtonBackgroundColor,
    border: DefaultButtonBorder,
    flex: DefaultButtonFlex,
    // Additional styles can be added here
  }), [
    DefaultButtonPosition,
    DefaultButtonTop,
    DefaultButtonRight,
    DefaultButtonWidth,
    DefaultButtonOverflow,
    DefaultButtonBottom,
    DefaultButtonLeft,
    DefaultButtonBackgroundColor,
    DefaultButtonBorder,
    DefaultButtonFlex,
  ]);

  const buttonTextStyle: CSSProperties = useMemo(() => ({
    color: buttonColor,
  }), [buttonColor]);

  // Returning a button element instead of a div for semantic and accessibility reasons
  return (
    <button
      type={type} // Applying the button type
      onClick={onClick} // Applying the onClick event handler
      disabled={disabled}
      style={{...DefaultButtonStyle, ...buttonTextStyle}} // Merging the button styles with text styles
      className="hover:cursor-pointer rounded-xl overflow-hidden flex items-center justify-center py-2.5 px-6 text-sm font-bold border-[1px] border-solid"
    >
      {buttonText}
    </button>
  );
};

export default DefaultButton;
