import { n as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_DKLinKq0.mjs';
import '@astrojs/internal-helpers/path';
import { $ as $$Image } from './_astro_assets_DQ59upAW.mjs';
import 'clsx';

const frontmatter = {
  "title": "Context Engineering with Redis & LangChain",
  "description": "Build a course advisor agent with Redis & LangChain",
  "template": "splash",
  "hero": {
    "image": {
      "file": "../../../doc/assets/redis_logo.png"
    },
    "actions": [{
      "text": "Get Started",
      "link": "intro/welcome/",
      "icon": "right-arrow"
    }]
  },
  "next": false
};
function getHeadings() {
  return [];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  return createVNode(Fragment, {});
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent();
}

const url = "src/content/docs/index.mdx/";
const file = "/Users/nitin.kanukolanu/workspace/lab-contexteng/src/content/docs/index.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/nitin.kanukolanu/workspace/lab-contexteng/src/content/docs/index.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
