/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { EditorThemeClasses } from "lexical";

import "./ZerocmfEditorTheme.css";
import { namespace } from "../appSettings";

const theme: EditorThemeClasses = {
  autocomplete: `${namespace}-autocomplete`,
  blockCursor: `${namespace}-blockCursor`,
  characterLimit: `${namespace}-characterLimit`,
  code: `${namespace}-code`,
  codeHighlight: {
    atrule: `${namespace}-tokenAttr`,
    attr: `${namespace}-tokenAttr`,
    boolean: `${namespace}-tokenProperty`,
    builtin: `${namespace}-tokenSelector`,
    cdata: `${namespace}-tokenComment`,
    char: `${namespace}-tokenSelector`,
    class: `${namespace}-tokenFunction`,
    "class-name": `${namespace}-tokenFunction`,
    comment: `${namespace}-tokenComment`,
    constant: `${namespace}-tokenProperty`,
    deleted: `${namespace}-tokenProperty`,
    doctype: `${namespace}-tokenComment`,
    entity: `${namespace}-tokenOperator`,
    function: `${namespace}-tokenFunction`,
    important: `${namespace}-tokenVariable`,
    inserted: `${namespace}-tokenSelector`,
    keyword: `${namespace}-tokenAttr`,
    namespace: `${namespace}-tokenVariable`,
    number: `${namespace}-tokenProperty`,
    operator: `${namespace}-tokenOperator`,
    prolog: `${namespace}-tokenComment`,
    property: `${namespace}-tokenProperty`,
    punctuation: `${namespace}-tokenPunctuation`,
    regex: `${namespace}-tokenVariable`,
    selector: `${namespace}-tokenSelector`,
    string: `${namespace}-tokenSelector`,
    symbol: `${namespace}-tokenProperty`,
    tag: `${namespace}-tokenProperty`,
    url: `${namespace}-tokenOperator`,
    variable: `${namespace}-tokenVariable`
  },
  embedBlock: {
    base: `${namespace}-embedBlock`,
    focus: `${namespace}-embedBlockFocus`
  },
  hashtag: `${namespace}-hashtag`,
  heading: {
    h1: `${namespace}-h1`,
    h2: `${namespace}-h2`,
    h3: `${namespace}-h3`,
    h4: `${namespace}-h4`,
    h5: `${namespace}-h5`,
    h6: `${namespace}-h6`
  },
  hr: `${namespace}-hr`,
  image: "editor-image",
  indent: `${namespace}-indent`,
  inlineImage: "inline-editor-image",
  layoutContainer: `${namespace}-layoutContainer`,
  layoutItem: `${namespace}-layoutItem`,
  link: `${namespace}-link`,
  list: {
    checklist: `${namespace}-checklist`,
    listitem: `${namespace}-listItem`,
    listitemChecked: `${namespace}-listItemChecked`,
    listitemUnchecked: `${namespace}-listItemUnchecked`,
    nested: {
      listitem: `${namespace}-nestedListItem`
    },
    olDepth: [
      `${namespace}-ol1`,
      `${namespace}-ol2`,
      `${namespace}-ol3`,
      `${namespace}-ol4`,
      `${namespace}-ol5`
    ],
    ul: `${namespace}-ul`
  },
  ltr: `${namespace}-ltr`,
  mark: `${namespace}-mark`,
  markOverlap: `${namespace}-markOverlap`,
  paragraph: `${namespace}-paragraph`,
  quote: `${namespace}-quote`,
  rtl: `${namespace}-rtl`,
  specialText: `${namespace}-specialText`,
  tab: `${namespace}-tabNode`,
  table: `${namespace}-table`,
  tableAlignment: {
    center: `${namespace}-tableAlignmentCenter`,
    right: `${namespace}-tableAlignmentRight`
  },
  tableCell: `${namespace}-tableCell`,
  tableCellActionButton: `${namespace}-tableCellActionButton`,
  tableCellActionButtonContainer: `${namespace}-tableCellActionButtonContainer`,
  tableCellHeader: `${namespace}-tableCellHeader`,
  tableCellResizer: `${namespace}-tableCellResizer`,
  tableCellSelected: `${namespace}-tableCellSelected`,
  tableRowStriping: `${namespace}-tableRowStriping`,
  tableScrollableWrapper: `${namespace}-tableScrollableWrapper`,
  tableSelected: `${namespace}-tableSelected`,
  tableSelection: `${namespace}-tableSelection`,
  text: {
    bold: `${namespace}-textBold`,
    capitalize: `${namespace}-textCapitalize`,
    code: `${namespace}-textCode`,
    italic: `${namespace}-textItalic`,
    lowercase: `${namespace}-textLowercase`,
    strikethrough: `${namespace}-textStrikethrough`,
    subscript: `${namespace}-textSubscript`,
    superscript: `${namespace}-textSuperscript`,
    underline: `${namespace}-textUnderline`,
    underlineStrikethrough: `${namespace}-textUnderlineStrikethrough`,
    uppercase: `${namespace}-textUppercase`
  }
};

export default theme;
