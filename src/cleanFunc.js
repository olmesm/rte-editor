import cleaner from "clean-html";

export const cleanFunc = (_content) =>
  new Promise((res, _) => {
    cleaner.clean(
      _content.replace(/>&nbsp;</g, "><").replace(/> </g, "><"),
      {
        "remove-empty-tags": tagsForCleaning,
      },
      (cleanContent) => res(cleanContent)
    );
  });

export const tagsForCleaning = [
  "body",
  "blockquote",
  "br",
  "div",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "hr",
  "link",
  "meta",
  "p",
  "table",
  "title",
  "td",
  "tr",
];
