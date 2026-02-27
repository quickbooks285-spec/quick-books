"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

interface MarkdownRendererProps {
    content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                h2: ({ children }) => (
                    <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4 tracking-tight">
                        {children}
                    </h2>
                ),
                h3: ({ children }) => (
                    <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3">
                        {children}
                    </h3>
                ),
                h4: ({ children }) => (
                    <h4 className="text-lg font-semibold mt-6 mb-2">
                        {children}
                    </h4>
                ),
                p: ({ children }) => (
                    <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-6">
                        {children}
                    </p>
                ),
                ul: ({ children }) => (
                    <ul className="list-disc pl-6 space-y-2 mb-6 text-muted-foreground">
                        {children}
                    </ul>
                ),
                ol: ({ children }) => (
                    <ol className="list-decimal pl-6 space-y-2 mb-6 text-muted-foreground">
                        {children}
                    </ol>
                ),
                li: ({ children }) => (
                    <li className="leading-relaxed">{children}</li>
                ),
                blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 italic text-muted-foreground bg-muted/30 rounded-r-lg">
                        {children}
                    </blockquote>
                ),
                hr: () => <hr className="my-10 border-border/50" />,
                a: ({ href, children }) => (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-colors"
                    >
                        {children}
                    </a>
                ),
                img: ({ src: rawSrc, alt }) => {
                    const src = rawSrc as string | undefined;
                    if (!src) return null;
                    const imgSrc = src.startsWith("//") ? `https:${src}` : src;
                    return (
                        <figure className="my-8">
                            <Image
                                src={imgSrc}
                                alt={alt || "Blog image"}
                                width={800}
                                height={450}
                                className="rounded-xl shadow-lg w-full"
                            />
                            {alt && (
                                <figcaption className="text-center text-sm text-muted-foreground mt-3">
                                    {alt}
                                </figcaption>
                            )}
                        </figure>
                    );
                },
                strong: ({ children }) => (
                    <strong className="font-semibold">{children}</strong>
                ),
                code: ({ children, className }) => {
                    const isCodeBlock = className?.includes("language-");
                    if (isCodeBlock) {
                        return (
                            <code className="block bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto my-6">
                                {children}
                            </code>
                        );
                    }
                    return (
                        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                            {children}
                        </code>
                    );
                },
                pre: ({ children }) => (
                    <pre className="my-6">{children}</pre>
                ),
                table: ({ children }) => (
                    <div className="overflow-x-auto my-6">
                        <table className="w-full border-collapse border border-border/50 text-sm">
                            {children}
                        </table>
                    </div>
                ),
                th: ({ children }) => (
                    <th className="border border-border/50 bg-muted px-4 py-2 text-left font-semibold">
                        {children}
                    </th>
                ),
                td: ({ children }) => (
                    <td className="border border-border/50 px-4 py-2 text-muted-foreground">
                        {children}
                    </td>
                ),
            }}
        >
            {content}
        </ReactMarkdown>
    );
}
