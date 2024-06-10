import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import { CodeBlock } from '@tiptap/extension-code-block';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import OrderedList from '@tiptap/extension-ordered-list';
import TextAlign from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import * as React from 'react';

import TipTapToolbar from './TipTapToolBar';

type TipTapProps = {
  description: string;
  onChange: (richText: string) => void;
  edit: boolean;
  className?: string;
  toolbarClassName?: string;
};

const TipTap: React.FC<TipTapProps> = ({
  description,
  onChange,
  edit,
  className,
  toolbarClassName,
}) => {
  const replaceSpacesAndLineBreaks = (html: string): string => {
    return html
      .replace(/(?![^<]*>|[^<>]*<\/)(\s)/g, '&nbsp;')
      .replace(/<p>(\s*)<\/p>/g, '<p>\u200B</p>'); // Reemplazar párrafos vacíos entre otros elementos por un solo salto de línea con un carácter invisible
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Link.configure({
        HTMLAttributes: {
          style: 'color: blue; text-decoration: underline;',
        },
      }),
      Underline.configure({}),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        defaultAlignment: 'left',
      }),
      BulletList.configure({}),
      OrderedList.configure({}),
      Blockquote.configure({}),
      CodeBlock.configure({}),
      Heading.configure({
        HTMLAttributes: {
          class: 'text-xl font-bold',
          levels: [2],
        },
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: 'min-h-[150px] bg-transparent  select-none',
      },
    },
    onUpdate({ editor }) {
      let html = editor.getHTML();
      console.log('HTML antes', html);
      html = replaceSpacesAndLineBreaks(html);
      console.log('HTML', html);
      onChange(html);
    },
  });

  React.useEffect(() => {
    if (!edit) {
      const currentContent = editor?.getHTML() ?? '';
      const newContent = description;
      if (currentContent !== newContent) {
        console.log('AAAA');
        editor?.commands.setContent(newContent);
      }
    }
  }, [description, edit, editor]);

  return (
    <div>
      {edit ? (
        <div className={className}>
          <TipTapToolbar editor={editor} className={toolbarClassName ?? ''} />
          <EditorContent editor={editor} />
        </div>
      ) : (
        <div>
          <div
            className={className}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      )}
    </div>
  );
};

export default TipTap;
