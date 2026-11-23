"use client";

import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

interface Props {
  value: string;
  onChange: (html: string) => void;
  onUploadImage: (file: File) => Promise<string | null>;
}

function Btn({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`min-w-9 h-9 px-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-40 ${
        active ? "bg-[#052D69] text-white" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

function Toolbar({
  editor,
  htmlMode,
  setHtmlMode,
  onImage,
}: {
  editor: Editor;
  htmlMode: boolean;
  setHtmlMode: (v: boolean) => void;
  onImage: () => void;
}) {
  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL (use /services/seo/ for pages on our site)", prev || "https://");
    if (url === null) return;
    if (url === "" || url === "https://") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const d = htmlMode;
  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b border-gray-200 bg-white/95 p-2 backdrop-blur">
      <Btn title="Heading 2 (main section)" disabled={d} active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</Btn>
      <Btn title="Heading 3 (sub-section)" disabled={d} active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</Btn>
      <Btn title="Paragraph" disabled={d} active={editor.isActive("paragraph")} onClick={() => editor.chain().focus().setParagraph().run()}>¶</Btn>
      <span className="mx-1 h-6 w-px bg-gray-200" />
      <Btn title="Bold" disabled={d} active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></Btn>
      <Btn title="Italic" disabled={d} active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></Btn>
      <Btn title="Link" disabled={d} active={editor.isActive("link")} onClick={setLink}>🔗</Btn>
      <span className="mx-1 h-6 w-px bg-gray-200" />
      <Btn title="Bullet list" disabled={d} active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</Btn>
      <Btn title="Numbered list" disabled={d} active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</Btn>
      <Btn title="Quote" disabled={d} active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>❝</Btn>
      <Btn title="Divider" disabled={d} onClick={() => editor.chain().focus().setHorizontalRule().run()}>—</Btn>
      <Btn title="Insert image" disabled={d} onClick={onImage}>🖼 Image</Btn>
      <span className="mx-1 h-6 w-px bg-gray-200" />
      <Btn title="Undo" disabled={d || !editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>↶</Btn>
      <Btn title="Redo" disabled={d || !editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>↷</Btn>
      <div className="ml-auto">
        <Btn title="Edit the raw HTML" active={htmlMode} onClick={() => setHtmlMode(!htmlMode)}>{"</> HTML"}</Btn>
      </div>
    </div>
  );
}

export default function RichTextEditor({ value, onChange, onUploadImage }: Props) {
  const [htmlMode, setHtmlMode] = useState(false);
  const [html, setHtml] = useState(value);
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      Image.configure({ HTMLAttributes: { loading: "lazy" } }),
      Placeholder.configure({ placeholder: "Start writing. Use H2 for each main section…" }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "blog-content min-h-[480px] px-6 py-5 focus:outline-none",
      },
    },
    onUpdate: ({ editor: e }) => {
      const out = e.getHTML();
      setHtml(out);
      onChange(out === "<p></p>" ? "" : out);
    },
  });

  // Load new content when a different post is opened.
  useEffect(() => {
    if (editor && value !== editor.getHTML() && !htmlMode) {
      editor.commands.setContent(value || "", { emitUpdate: false });
      setHtml(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, value]);

  const switchMode = (toHtml: boolean) => {
    if (!editor) return;
    if (!toHtml) editor.commands.setContent(html || "", { emitUpdate: true });
    else setHtml(editor.getHTML());
    setHtmlMode(toHtml);
  };

  const pickImage = async (file?: File) => {
    if (!file || !editor) return;
    const url = await onUploadImage(file);
    if (!url) return;
    const alt = window.prompt("Describe the image for Google and screen readers (alt text):", "") || "";
    editor.chain().focus().setImage({ src: url, alt }).run();
  };

  if (!editor) {
    return <div className="h-[540px] animate-pulse rounded-2xl border border-gray-200 bg-gray-50" />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <Toolbar editor={editor} htmlMode={htmlMode} setHtmlMode={switchMode} onImage={() => fileRef.current?.click()} />
      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
        className="hidden"
        onChange={(e) => {
          pickImage(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {htmlMode ? (
        <textarea
          value={html}
          onChange={(e) => {
            setHtml(e.target.value);
            onChange(e.target.value);
          }}
          spellCheck={false}
          className="block min-h-[480px] w-full resize-y px-6 py-5 font-mono text-sm text-gray-800 focus:outline-none"
        />
      ) : (
        <EditorContent editor={editor} />
      )}
    </div>
  );
}
