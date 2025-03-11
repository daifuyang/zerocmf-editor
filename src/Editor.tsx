/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { useLexicalEditable } from "@lexical/react/useLexicalEditable";

import { useEffect, useState } from "react";
import { CAN_USE_DOM } from "shared/canUseDOM";

import { useSharedHistoryContext } from "./context/SharedHistoryContext";
import AutocompletePlugin from "./plugins/AutocompletePlugin";
import AutoEmbedPlugin from "./plugins/AutoEmbedPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import CodeActionMenuPlugin from "./plugins/CodeActionMenuPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";

import ContextMenuPlugin from "./plugins/ContextMenuPlugin";
import DragDropPaste from "./plugins/DragDropPastePlugin";
import DraggableBlockPlugin from "./plugins/DraggableBlockPlugin";
import EmojiPickerPlugin from "./plugins/EmojiPickerPlugin";
import EmojisPlugin from "./plugins/EmojisPlugin";
import EquationsPlugin from "./plugins/EquationsPlugin";

import FloatingLinkEditorPlugin from "./plugins/FloatingLinkEditorPlugin";
import FloatingTextFormatToolbarPlugin from "./plugins/FloatingTextFormatToolbarPlugin";

import KeywordsPlugin from "./plugins/KeywordsPlugin";
import { LayoutPlugin } from "./plugins/LayoutPlugin/LayoutPlugin";
import LinkPlugin from "./plugins/LinkPlugin";
import MarkdownShortcutPlugin from "./plugins/MarkdownShortcutPlugin";
import MentionsPlugin from "./plugins/MentionsPlugin";
import PageBreakPlugin from "./plugins/PageBreakPlugin";
import ShortcutsPlugin from "./plugins/ShortcutsPlugin";
import SpecialTextPlugin from "./plugins/SpecialTextPlugin";
import SpeechToTextPlugin from "./plugins/SpeechToTextPlugin";
import TabFocusPlugin from "./plugins/TabFocusPlugin";
import TableCellActionMenuPlugin from "./plugins/TableActionMenuPlugin";
import TableCellResizer from "./plugins/TableCellResizer";
import TableHoverActionsPlugin from "./plugins/TableHoverActionsPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import ContentEditable from "./ui/ContentEditable";
import { useToolbarState } from "./context/ToolbarContext";
import classnames from "classnames";
import OnchangePlugin from "./plugins/OnchangePlugin";
import ImagesPlugin from "./plugins/ImagesPlugin";

interface Props {
  value?: string;
  onChange?: (value: unknown) => void;
}
export default function Editor(props: Props): JSX.Element {
  const { value, onChange } = props;
  const { historyState } = useSharedHistoryContext();

  const isEditable = useLexicalEditable();

  const { toolbarState } = useToolbarState();

  const placeholder = "请输入富文本内容...";
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] = useState<boolean>(false);
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia("(max-width: 1025px)").matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener("resize", updateViewPortWidth);

    return () => {
      window.removeEventListener("resize", updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

  return (
    <div className={classnames({ readonly: !isEditable, maximize: toolbarState.maximize })}>
      <div className={"editor-shell"}>
        {isEditable && (
          <ToolbarPlugin
            editor={editor}
            activeEditor={activeEditor}
            setActiveEditor={setActiveEditor}
            setIsLinkEditMode={setIsLinkEditMode}
          />
        )}
        {<ShortcutsPlugin editor={activeEditor} setIsLinkEditMode={setIsLinkEditMode} />}
        <div className={`editor-container`}>
          <OnchangePlugin value={value} onChange={onChange} />
          <DragDropPaste />
          <AutoFocusPlugin />
          <ClearEditorPlugin />

          <EmojiPickerPlugin />
          <AutoEmbedPlugin />
          <MentionsPlugin />
          <EmojisPlugin />
          <HashtagPlugin />
          <KeywordsPlugin />
          <SpeechToTextPlugin />
          <AutoLinkPlugin />

          <HistoryPlugin externalHistoryState={historyState} />
          <RichTextPlugin
            contentEditable={
              <div className="editor-scroller">
                <div className="editor" ref={onRef}>
                  <ContentEditable placeholder={placeholder} />
                </div>
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <MarkdownShortcutPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <CheckListPlugin />
          <TablePlugin />
          <TableCellResizer />
          <ImagesPlugin captionsEnabled={false} />
          {/*   <InlineImagePlugin /> */}
          <LinkPlugin />
          {/* <PollPlugin />
              <TwitterPlugin />
              <YouTubePlugin />
              <FigmaPlugin /> */}
          <ClickableLinkPlugin disabled={isEditable} />
          <HorizontalRulePlugin />
          <EquationsPlugin />
          {/* <ExcalidrawPlugin /> */}
          <TabFocusPlugin />
          <TabIndentationPlugin maxIndent={7} />
          {/* <CollapsiblePlugin /> */}
          <PageBreakPlugin />
          <LayoutPlugin />
          {floatingAnchorElem && !isSmallWidthViewport && (
            <>
              <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
              <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
              {isEditable && (
                <>
                  <FloatingLinkEditorPlugin
                    anchorElem={floatingAnchorElem}
                    isLinkEditMode={isLinkEditMode}
                    setIsLinkEditMode={setIsLinkEditMode}
                  />
                  <TableCellActionMenuPlugin anchorElem={floatingAnchorElem} cellMerge={true} />
                  <TableHoverActionsPlugin anchorElem={floatingAnchorElem} />
                  <FloatingTextFormatToolbarPlugin
                    anchorElem={floatingAnchorElem}
                    setIsLinkEditMode={setIsLinkEditMode}
                  />
                </>
              )}
            </>
          )}

          <AutocompletePlugin />
          <ContextMenuPlugin />
          <SpecialTextPlugin />
        </div>
      </div>
    </div>
  );
}
