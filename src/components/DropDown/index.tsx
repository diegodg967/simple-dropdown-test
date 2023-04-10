import React, { ReactNode, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { MoreIcon } from "../Icons/MoreIcon";
import { ILayoutData } from "../../types/layout";
import { colors } from "../../theme/colors";

const layoutDataInitialState = {
  width: 0,
  height: 0,
  x: 0,
  y: 0,
};

const DROPDOWN_BUTTON_SIZE = 48;
const DROPDOWN_MORE_ICON_SIZE = 32;

interface IDropDownMenuItemProps {
  onPress: () => any;
  callback?: () => any;
  children: ReactNode | ReactNode[];
}

interface IDropDownProps {
  align?: "left" | "right";
  children: ReactNode | ReactNode[];
}

export const DropDownMenuItem = ({
  onPress,
  callback,
  children,
}: IDropDownMenuItemProps) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onPress();
        if (callback) callback();
      }}
    >
      <View style={styles.menuItem}>
        <Text style={styles.menuItemText}>{children}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export const DropDown = ({ children, align = "right" }: IDropDownProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [buttonLayoutData, setButtonLayoutData] = useState<ILayoutData>(
    layoutDataInitialState
  );
  const buttonRef = useRef<View>(null);

  const { width: screenWidth } = Dimensions.get("window");

  const getMenuPosition = () => {
    const verticalPosition = {
      top: buttonLayoutData.y + buttonLayoutData.height,
    };

    if (align === "left") {
      return {
        ...verticalPosition,
        left: buttonLayoutData.x,
      };
    }

    return {
      ...verticalPosition,
      right: screenWidth - (buttonLayoutData.x + buttonLayoutData.width),
    };
  };

  const handleToggle = () => {
    setIsOpened(!isOpened);
  };

  const handleButtonLayoutData = () => {
    if (buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        setButtonLayoutData({ width, height, x: pageX, y: pageY });
      });
    }
  };

  return (
    <>
      <TouchableOpacity onPress={handleToggle}>
        <View
          ref={buttonRef}
          style={styles.container}
          onLayout={handleButtonLayoutData}
        >
          <MoreIcon color={colors.white100} size={DROPDOWN_MORE_ICON_SIZE} />
        </View>
      </TouchableOpacity>

      {isOpened && (
        <TouchableWithoutFeedback onPress={handleToggle}>
          <View style={styles.backdrop}>
            <View
              style={{
                ...styles.menu,
                ...getMenuPosition(),
              }}
            >
              {React.Children.map(children, (child) =>
                React.isValidElement(child)
                  ? React.cloneElement(child, { callback: handleToggle } as any)
                  : child
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: DROPDOWN_BUTTON_SIZE,
    height: DROPDOWN_BUTTON_SIZE,
    backgroundColor: colors.black500,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    flex: 1,
    zIndex: 1,
  },
  menu: {
    position: "absolute",
    width: 150,
    backgroundColor: colors.black500,
  },
  menuItem: {
    padding: 15,
  },
  menuItemText: {
    color: colors.white100,
  },
});
