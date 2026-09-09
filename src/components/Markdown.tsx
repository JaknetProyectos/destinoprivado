"use client";

import { marked } from "marked";

interface MarkdownProps {
  content?: string | null;
  className?: string;
}

export default function Markdown({
  content,
  className = "",
}: MarkdownProps) {
  if (!content) return null;

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: marked.parse(content) as string,
      }}
    />
  );
}