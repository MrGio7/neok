import Error from "@components/message";
import { Response } from "express";
import { renderToStaticMarkup } from "react-dom/server";

export function render(res: Response, el: JSX.Element) {
  const html = renderToStaticMarkup(el);

  return res.contentType("text/html").send(html);
}
