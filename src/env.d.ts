declare module 'icons:astro/*' {
  const component: (props: astroHTML.JSX.SVGAttributes) => astroHTML.JSX.Element;
  export default component;
}

declare module 'icons:react/*' {
  import type { SVGProps } from "react";
  import type React from "react";

  const component: (props: SVGProps<SVGSVGElement>) => React.ReactElement;
  export default component;
}
