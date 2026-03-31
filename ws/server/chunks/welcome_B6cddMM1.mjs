import { n as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_DKLinKq0.mjs';
import '@astrojs/internal-helpers/path';
import { $ as $$Image } from './_astro_assets__t6aTgAY.mjs';
import 'clsx';

const frontmatter = {
  "title": "Welcome",
  "sidebar": {
    "order": 1
  }
};
function getHeadings() {
  return [{
    "depth": 3,
    "slug": "lab-structure",
    "text": "Lab structure"
  }, {
    "depth": 3,
    "slug": "learning-objectives",
    "text": "Learning objectives"
  }, {
    "depth": 3,
    "slug": "lab-environment-resources",
    "text": "Lab environment resources"
  }];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    div: "div",
    p: "p",
    table: "table",
    tbody: "tbody",
    td: "td",
    th: "th",
    thead: "thead",
    tr: "tr",
    ...props.components
  }, {Fragment: Fragment$1} = _components;
  if (!Fragment$1) _missingMdxReference("Fragment");
  return createVNode(Fragment, {
    children: [createVNode(Fragment$1, {
      "set:html": "<p>Welcome to Context Engineering with Redis &#x26; LangChain. We are excited to help you master the art of building production-ready AI agents with proper context management. This lab will take you from basic RAG pipelines all the way to building a fully-featured ReAct agent with memory. Before diving in, check out some important details below that will set your expectations for the lab experience.</p>\n<h3 id=\"lab-structure\">Lab structure</h3>\n<p>The lab will take place in a Jupyter Notebook environment (you’ll open it in the next section), which provides an interactive way to learn and experiment with the concepts covered in this lab.</p>\n<p>There are three sections as part of this lab:</p>\n<ol>\n<li><strong>Context Engineering Foundations</strong>: This section introduces you to the fundamentals of context engineering—what it is, why it matters, and how to craft effective system prompts. You’ll observe a baseline RAG agent and then apply data engineering techniques to dramatically reduce token usage while maintaining quality.</li>\n<li><strong>From Pipeline to Agent</strong>: In this section, you’ll transform a simple RAG pipeline into a true LangGraph-based agent with intent classification, hierarchical retrieval, hybrid search, and the ReAct (Reasoning + Acting) architecture for transparent decision-making.</li>\n<li><strong>Memory Context</strong>: In the final section, you’ll add Redis Agent Memory Server for working and long-term memory (cross-session persistence) and learn how to manage memory context effectively.</li>\n</ol>\n<h3 id=\"learning-objectives\">Learning objectives</h3>\n<p>By the end of this lab, you will be able to:</p>\n<ul>\n<li>Familiarity with the four pillars of context and how to engineer them effectively</li>\n<li>Craft system context by creating effective system prompts that define agent behavior and capabilities</li>\n<li>Optimize a RAG agent it using basic data engineering techniques</li>\n<li>Improve retrieved context intelligently using hierarchical retrieval, intent classification, and hybrid search</li>\n<li>Transform a RAG pipeline into a ReAct agent with transparent reasoning traces</li>\n<li>Integrate working memory and long-term memory for intelligent multi-turn conversations</li>\n</ul>\n<h3 id=\"lab-environment-resources\">Lab environment resources</h3>\n"
    }), createVNode(_components.p, {
      children: ["Below you’ll find all the resources that come with this lab. We recommend opening ", createVNode("a", {
        href: "http://localhost:5540/",
        target: "genai_insight",
        "set:html": "Redis Insight"
      }), " alongside the Jupyter Notebook to help you visualize and explore the data stored in Redis throughout the lab."]
    }), "\n", createVNode(_components.div, {
      children: ["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", createVNode(_components.table, {
        children: [createVNode(_components.thead, {
          children: createVNode(_components.tr, {
            children: [createVNode(_components.th, {
              children: "Resource"
            }), createVNode(_components.th, {
              children: "Details"
            })]
          })
        }), createVNode(_components.tbody, {
          children: [createVNode(_components.tr, {
            children: [createVNode(_components.td, {
              children: createVNode("a", {
                href: "http://localhost:10889/lab/tree/work/materials",
                target: "jupyter",
                "set:html": "Jupyter Notebook"
              })
            }), createVNode(_components.td, {
              "set:html": "A Jupyter Notebook that hosts all the labs"
            })]
          }), createVNode(_components.tr, {
            children: [createVNode(_components.td, {
              children: createVNode("a", {
                href: "http://localhost:5540/",
                target: "genai_insight",
                "set:html": "Redis Insight"
              })
            }), createVNode(_components.td, {
              "set:html": "Redis GUI tool"
            })]
          })]
        })]
      })]
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

const url = "src/content/docs/intro/welcome.mdx/";
const file = "/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/intro/welcome.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/intro/welcome.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
