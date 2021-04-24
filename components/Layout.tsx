import { ComponentChildren, h } from "../deps.ts";

interface LayoutProps {
  title: string;
  children: ComponentChildren;
}

export default function Layout(props: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props.title}</title>
      </head>
      <body>
        {props.children}
      </body>
    </html>
  );
}
