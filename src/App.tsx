import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { $isTextNode, DOMConversionMap, TextNode } from "lexical";

import { SharedHistoryContext } from "./context/SharedHistoryContext";
import { ToolbarContext } from "./context/ToolbarContext";
import Editor from "./Editor";

import EditorNodes from "./nodes/EditorNodes";
import { TableContext } from "./plugins/TablePlugin";
import { parseAllowedFontSize } from "./plugins/ToolbarPlugin/fontSize";
import ZerocmfEditorTheme from "./themes/ZerocmfEditorTheme";
import { parseAllowedColor } from "./ui/ColorPicker";
import { namespace } from "./appSettings";
import "./App.css";
import { ReactNode } from "react";

interface Props {
  editable?: boolean;
  value?: string;
  onChange?: (value: unknown) => void;
  imagePickerRender?: (props: imagePickerRenderProps) => ReactNode;
}
function App(props: Props): JSX.Element {
  const { editable = true, value, onChange, imagePickerRender } = props;
  function getExtraStyles(element: HTMLElement): string {
    // Parse styles from pasted input, but only if they match exactly the
    // sort of styles that would be produced by exportDOM
    let extraStyles = "";
    const fontSize = parseAllowedFontSize(element.style.fontSize);
    const backgroundColor = parseAllowedColor(element.style.backgroundColor);
    const color = parseAllowedColor(element.style.color);
    if (fontSize !== "" && fontSize !== "15px") {
      extraStyles += `font-size: ${fontSize};`;
    }
    if (backgroundColor !== "" && backgroundColor !== "rgb(255, 255, 255)") {
      extraStyles += `background-color: ${backgroundColor};`;
    }
    if (color !== "" && color !== "rgb(0, 0, 0)") {
      extraStyles += `color: ${color};`;
    }
    return extraStyles;
  }
  function buildImportMap(): DOMConversionMap {
    const importMap: DOMConversionMap = {};

    // Wrap all TextNode importers with a function that also imports
    // the custom styles implemented by the playground
    for (const [tag, fn] of Object.entries(TextNode.importDOM() || {})) {
      importMap[tag] = (importNode) => {
        const importer = fn(importNode);
        if (!importer) {
          return null;
        }
        return {
          ...importer,
          conversion: (element) => {
            const output = importer.conversion(element);
            if (
              output === null ||
              output.forChild === undefined ||
              output.after !== undefined ||
              output.node !== null
            ) {
              return output;
            }
            const extraStyles = getExtraStyles(element);
            if (extraStyles) {
              const { forChild } = output;
              return {
                ...output,
                forChild: (child, parent) => {
                  const textNode = forChild(child, parent);
                  if ($isTextNode(textNode)) {
                    textNode.setStyle(textNode.getStyle() + extraStyles);
                  }
                  return textNode;
                }
              };
            }
            return output;
          }
        };
      };
    }

    return importMap;
  }

  const initialConfig = {
    editable,
    html: { import: buildImportMap() },
    namespace,
    nodes: [...EditorNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: ZerocmfEditorTheme
  };

  return (
    <>
      {/* <SettingsContext> */}
      {/* <FlashMessageContext> */}
      <LexicalComposer initialConfig={initialConfig}>
        <SharedHistoryContext>
          <TableContext>
            <ToolbarContext imagePickerRender={imagePickerRender}>
              <Editor value={value} onChange={onChange} />
              {/* <Settings /> */}
            </ToolbarContext>
          </TableContext>
        </SharedHistoryContext>
      </LexicalComposer>
      {/* </FlashMessageContext> */}
      {/* </SettingsContext> */}
    </>
  );
}

export default App;
