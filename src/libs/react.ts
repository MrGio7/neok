import { Response } from "express";
import { renderToStaticMarkup } from "react-dom/server";

export function render(res: Response, el: JSX.Element) {
  const html = renderToStaticMarkup(el);

  res.status(200).contentType("text/html").send(html);
}
