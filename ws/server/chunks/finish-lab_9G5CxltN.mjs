import { n as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_DKLinKq0.mjs';
import '@astrojs/internal-helpers/path';
import { $ as $$Image } from './_astro_assets_DQ59upAW.mjs';
import './Code_B0FemoOH.mjs';
import 'clsx';

const frontmatter = {
  "title": "Finish Lab",
  "sidebar": {
    "order": 1
  }
};
function getHeadings() {
  return [];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    p: "p",
    ...props.components
  }, {Fragment: Fragment$1} = _components;
  if (!Fragment$1) _missingMdxReference("Fragment");
  return createVNode(Fragment, {
    children: [createVNode(Fragment$1, {
      "set:html": "<p>Use the button below to return to the Redis University course. To complete the course and receive your certificate, please complete the feedback form.</p>\n"
    }), createVNode("div", {
      id: "finish-lab",
      children: createVNode("a", {
        href: "https://flockjay.com/course/vsgabnbkd3f5cd/submodule/dnkdrcwxfnbwuq/",
        target: "_blank",
        class: "cta-button",
        children: [createVNode(_components.p, {
          children: "Return to Redis University"
        }), createVNode("svg", {
          class: "arrow-icon",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          children: [createVNode("path", {
            d: "M5 12h14"
          }), createVNode("path", {
            d: "m12 5 7 7-7 7"
          })]
        })]
      })
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
function _missingMdxReference(id, component) {
  throw new Error("Expected " + ("component" ) + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it.");
}

const url = "src/content/docs/wrap-up/finish-lab.mdx/";
const file = "/Users/nitin.kanukolanu/workspace/lab-contexteng/src/content/docs/wrap-up/finish-lab.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/nitin.kanukolanu/workspace/lab-contexteng/src/content/docs/wrap-up/finish-lab.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
