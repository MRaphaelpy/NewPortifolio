import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./MarkdownBlog.module.css";

export const MarkdownBlog = () => {
    const [markdown, setMarkdown] = useState("# Meu Blog em Markdown\n\nEscreva seu post aqui...");

    return (
        <div className={styles.container}>
            <h1>Blog em Markdown</h1>
            <textarea
                className={styles.editor}
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
            />
            <div className={styles.preview}>
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
        </div>
    );
};