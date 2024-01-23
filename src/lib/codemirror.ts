import { tags as t } from "@lezer/highlight";
import { createTheme } from "thememirror";

const colors = {
  background: "#0c0a09",
  foreground: "#f2f2f2",
  caret: "#22c35d",
  selection: "#262626",
  lineHighlight: "#333131",
  gutterBackground: "#0c0a09",
  gutterForeground: "#939390",

  // comment/meta
  gray: "#939390",
  // strings
  green: "#4ade80",
  // keywords
  purple: "#e879f9",
  // numbers
  blue: "#5fa5fa",
  // punctuation
  orange: "#fb923c",
  // types
  yellow: "#facc15",
  // functions
  teal: "#60a5fa",
  // variables
  pink: "#f472b6",
  // invalid
  red: "#f87171",
  // operators
  indigo: "#a78bfa",
  // tags
  tag: "#e78df9",
  // other
  white: "#f2f2f2",
};

export const shadCn = createTheme({
  variant: "dark",
  settings: {
    background: colors.background,
    foreground: colors.foreground,
    caret: colors.caret,
    selection: colors.selection,
    lineHighlight: colors.lineHighlight,
    gutterBackground: colors.gutterBackground,
    gutterForeground: colors.gutterForeground,
  },
  styles: [
    {
      tag: t.keyword,
      color: colors.purple,
    },
    {
      tag: t.typeName,
      color: colors.blue,
    },
    {
      tag: [t.name],
      color: colors.purple,
    },
    {
      tag: [t.deleted, t.character, t.propertyName, t.macroName],
      color: colors.pink,
    },
    {
      tag: [t.function(t.variableName), t.labelName],
      color: colors.teal,
    },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: colors.yellow,
    },
    {
      tag: [t.definition(t.name), t.separator],
      color: colors.gray,
    },
    {
      tag: [
        t.typeName,
        t.className,
        t.number,
        t.changed,
        t.annotation,
        t.modifier,
        t.self,
        t.namespace,
      ],
      color: colors.blue,
    },
    {
      tag: [
        t.operator,
        t.operatorKeyword,
        t.url,
        t.escape,
        t.regexp,
        t.link,
        t.special(t.string),
      ],
      color: colors.orange,
    },
    {
      tag: [t.meta, t.comment],
      color: colors.gray,
    },
    {
      tag: t.strong,
      fontWeight: "bold",
    },
    {
      tag: t.emphasis,
      fontStyle: "italic",
    },
    {
      tag: t.strikethrough,
      textDecoration: "line-through",
    },
    {
      tag: t.link,
      color: colors.gray,
      textDecoration: "underline",
    },
    {
      tag: t.heading,
      fontWeight: "bold",
      color: colors.red,
    },
    {
      tag: [t.atom, t.bool, t.special(t.variableName)],
      color: colors.yellow,
    },
    {
      tag: [t.processingInstruction, t.string, t.inserted],
      color: colors.green,
    },
    {
      tag: t.invalid,
      color: colors.red,
    },
  ],
});
