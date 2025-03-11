/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { ElementFormatType } from "lexical";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

export const MIN_ALLOWED_FONT_SIZE = 8;
export const MAX_ALLOWED_FONT_SIZE = 72;
export const DEFAULT_FONT_SIZE = 16;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rootTypeToRootName = {
  root: "Root",
  table: "Table"
};

export const blockTypeToBlockName = {
  bullet: "无序列表",
  check: "待办列表",
  code: "代码块",
  h1: "一级标题",
  h2: "二级标题",
  h3: "三级标题",
  h4: "四级标题",
  h5: "五级标题",
  h6: "六级标题",
  number: "有序列表",
  paragraph: "段落",
  quote: "引用"
};

//disable eslint sorting rule for quick reference to toolbar state
const INITIAL_TOOLBAR_STATE = {
  bgColor: "#fff",
  blockType: "paragraph" as keyof typeof blockTypeToBlockName,
  canRedo: false,
  canUndo: false,
  codeLanguage: "",
  elementFormat: "left" as ElementFormatType,
  fontColor: "#000",
  fontFamily: "auto",
  // Current font size in px
  fontSize: `${DEFAULT_FONT_SIZE}px`,
  // Font size input value - for controlled input
  fontSizeInputValue: `${DEFAULT_FONT_SIZE}`,
  isBold: false,
  isCode: false,
  isImageCaption: false,
  isItalic: false,
  isLink: false,
  isRTL: false,
  isStrikethrough: false,
  isSubscript: false,
  isSuperscript: false,
  isUnderline: false,
  isLowercase: false,
  isUppercase: false,
  isCapitalize: false,
  rootType: "root" as keyof typeof rootTypeToRootName,
  maximize: false,
  imagePickerRender: undefined as ((props: imagePickerRenderProps) => ReactNode) | undefined
};

type ToolbarState = typeof INITIAL_TOOLBAR_STATE;

// Utility type to get keys and infer value types
type ToolbarStateKey = keyof ToolbarState;
type ToolbarStateValue<Key extends ToolbarStateKey> = ToolbarState[Key];

type ContextShape = {
  toolbarState: ToolbarState;
  updateToolbarState<Key extends ToolbarStateKey>(key: Key, value: ToolbarStateValue<Key>): void;
};

const Context = createContext<ContextShape | undefined>(undefined);

export const ToolbarContext = ({
  children,
  imagePickerRender
}: {
  children: ReactNode;
  imagePickerRender?: (props: imagePickerRenderProps) => ReactNode;
}): JSX.Element => {
  if (imagePickerRender) {
    INITIAL_TOOLBAR_STATE.imagePickerRender = imagePickerRender;
  }

  const [toolbarState, setToolbarState] = useState(INITIAL_TOOLBAR_STATE);
  const selectionFontSize = toolbarState.fontSize;

  const updateToolbarState = useCallback(
    <Key extends ToolbarStateKey>(key: Key, value: ToolbarStateValue<Key>) => {
      setToolbarState((prev) => ({
        ...prev,
        [key]: value
      }));
    },
    []
  );

  useEffect(() => {
    updateToolbarState("fontSizeInputValue", selectionFontSize.slice(0, -2));
  }, [selectionFontSize, updateToolbarState]);

  const contextValue = useMemo(() => {
    return {
      toolbarState,
      updateToolbarState
    };
  }, [toolbarState, updateToolbarState]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useToolbarState = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useToolbarState must be used within a ToolbarProvider");
  }

  return context;
};
