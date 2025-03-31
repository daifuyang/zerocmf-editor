import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $insertNodes } from "lexical";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";

function compressHTML(html: string) {
  //  去除多余的空格和换行
  html = html.replace(/\s+/g, ' ');
  //  去除标签之间的空格
  html = html.replace(/>\s+</g, '><');
  // 去除行首行尾的空格
  html = html.trim();
  return html;
}

function printPrettyHTML(str: string) {
  const div = document.createElement("div");
  div.innerHTML = str.trim();
  const html = prettifyHTML(div, 0).innerHTML;
  return compressHTML(html);
}

function prettifyHTML(node: Element, level: number) {
  const indentBefore = new Array(level++ + 1).join("  ");
  const indentAfter = new Array(level - 1).join("  ");
  let textNode;

  for (let i = 0; i < node.children.length; i++) {
    textNode = document.createTextNode("\n" + indentBefore);
    node.insertBefore(textNode, node.children[i]);
    prettifyHTML(node.children[i], level);
    if (node.lastElementChild === node.children[i]) {
      textNode = document.createTextNode("\n" + indentAfter);
      node.appendChild(textNode);
    }
  }

  return node;
}

export default function OnchangePlugin({
  value,
  onChange
}: {
  value?: string;
  onChange?: (value: unknown) => void;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // let value = localStorage.getItem("html");
    editor.update(() => {
      if (value) {
        const html = compressHTML(value);
        // In the browser you can use the native DOMParser API to parse the HTML string.
        const parser = new DOMParser();
        const dom = parser.parseFromString(html, "text/html");
        // Once you have the DOM instance it's easy to generate LexicalNodes.
        const nodes = $generateNodesFromDOM(editor, dom);
        const root = $getRoot();
        root.clear();
        // Insert them at a selection.
        $insertNodes(nodes);
        root.selectStart();
      }
    });
  }, []);

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      // const stringifiedEditorState = JSON.stringify(editor.getEditorState());
      let html = "";
      editor.getEditorState().read(() => {
        html = printPrettyHTML($generateHtmlFromNodes(editor));
      });
      // localStorage.setItem("html", html);
      if (onChange) {
        onChange(html);
      }
    });
  }, [editor, value, onChange]);

  return null;
}
