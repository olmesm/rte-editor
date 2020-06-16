import React, { useState, useEffect } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import pretty from "pretty";
import Prism from "prismjs";
import copy from "copy-to-clipboard";

import { Loader } from "./Loader";
import { cleanFunc } from "./cleanFunc";

import "prismjs/themes/prism.css";
import "./styles.css";

const DEBOUNCE_TIMEOUT = 250;

const App = () => {
  const [content, setContent] = useState(
    "<h1>Hello</h1><p>Paste some text to begin</p>"
  );
  const [lockbit, setLockbit] = useState(true);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!lockbit) {
        const clean = await cleanFunc(content);

        setContent(clean);
        setLockbit(true);
      }
    }, DEBOUNCE_TIMEOUT);

    return () => clearTimeout(handler);
  }, [content, lockbit]);

  return (
    <>
      <div id="override-prismjs-styles" className="App container">
        <div className="half-width">
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={(_, editor) => {
              const data = editor.getData();

              setLockbit(false);
              setContent(data);
            }}
          />
        </div>

        {lockbit ? (
          <div className="half-width">
            <button onClick={() => copy(content)}>
              Copy HTML to clipboard
            </button>
            <pre className="no-top-margin language-html">
              <code
                className="preformatted-output"
                dangerouslySetInnerHTML={{
                  __html: Prism.highlight(
                    pretty(content),
                    Prism.languages.markup,
                    "html"
                  ),
                }}
              />
            </pre>
          </div>
        ) : (
          <div className="half-width center">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
