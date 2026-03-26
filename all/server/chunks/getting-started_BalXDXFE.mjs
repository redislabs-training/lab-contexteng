import { n as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_DKLinKq0.mjs';
import '@astrojs/internal-helpers/path';
import { $ as $$Image } from './_astro_assets_DQ59upAW.mjs';
import './Code_CsE4yZf_.mjs';
import 'clsx';

const frontmatter = {
  "title": "Get Started",
  "sidebar": {
    "order": 1
  }
};
function getHeadings() {
  return [{
    "depth": 3,
    "slug": "environment-overview",
    "text": "Environment Overview"
  }, {
    "depth": 3,
    "slug": "open-the-jupyter-environment",
    "text": "Open the Jupyter Environment"
  }, {
    "depth": 3,
    "slug": "jupyter-notebook-interface-faq",
    "text": "Jupyter Notebook Interface FAQ"
  }];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    button: "button",
    details: "details",
    p: "p",
    "starlight-image-zoom-zoomable": "starlight-image-zoom-zoomable",
    summary: "summary",
    ...props.components
  }, _component0 = _components["starlight-image-zoom-zoomable"], {Fragment: Fragment$1} = _components;
  if (!Fragment$1) _missingMdxReference("Fragment");
  return createVNode(Fragment, {
    children: [createVNode(Fragment$1, {
      "set:html": "<p>In this section, we will guide you through the steps to get started with the lab in the Jupyter Notebook.</p>\n<h3 id=\"environment-overview\">Environment Overview</h3>\n<p>You will work within a pre-configured Jupyter notebook environment. The lab will be spread across multiple notebooks located inside of the <code dir=\"auto\">materials</code> directory of the Jupyter file system broken into the three sections outlined earlier:</p>\n"
    }), createVNode(_component0, {
      children: [createVNode("img", {
        src: "/images/ce-file-browser.png",
        alt: "Jupyter Notebook File Browser",
        style: "width: 90%; margin:auto;"
      }), createVNode(_components.button, {
        "aria-label": "Zoom image: Jupyter Notebook File Browser",
        class: "starlight-image-zoom-control",
        "set:html": "<svg aria-hidden=\"true\" fill=\"currentColor\" viewBox=\"0 0 24 24\"><use href=\"#starlight-image-zoom-icon-zoom\"></use></svg>"
      })]
    }), "\n", createVNode(Fragment$1, {
      "set:html": "<p>You will be able to run all the code for this lab inside the notebook, and no external environment or resources are required. Behind the scenes, an instance of open source Redis is already running. When you run code blocks in the notebook or explore data in Redis Insight, you’re interacting directly with that live Redis instance.</p>\n<p>We recommend switching the view to the notebook table of contents for easy navigation. You can do this by clicking the “Table of Contents” button (three lines) in the left side panel of the interface. This will help you quickly jump to different sections of the lab.</p>\n"
    }), createVNode(_component0, {
      children: [createVNode("img", {
        src: "/images/toc-ce.png",
        alt: "Jupyter Notebook Table of Contents",
        style: "width: 90%; margin:auto;"
      }), createVNode(_components.button, {
        "aria-label": "Zoom image: Jupyter Notebook Table of Contents",
        class: "starlight-image-zoom-control",
        "set:html": "<svg aria-hidden=\"true\" fill=\"currentColor\" viewBox=\"0 0 24 24\"><use href=\"#starlight-image-zoom-icon-zoom\"></use></svg>"
      })]
    }), "\n", createVNode(Fragment$1, {
      "set:html": "<p><strong>Note:</strong> If you’re new to the Jupyter Notebook environment, we have compiled a FAQ below. There is no need to review all the questions, but they can be referenced if you have questions about the environment or how to use it during the lab.</p>\n<h3 id=\"open-the-jupyter-environment\">Open the Jupyter Environment</h3>\n<p>Use the button below to open the Jupyter environment for this lab. You’re starting point will be the “Introduction to Context Engineering” notebook in section one.</p>\n"
    }), createVNode("div", {
      id: "start-lab",
      children: createVNode("a", {
        href: "http://localhost:10889/lab/tree/work/materials/section-1-context-engineering-foundations/introduction_to_context_engineering.ipynb",
        target: "jupyter",
        class: "cta-button",
        children: [createVNode(_components.p, {
          children: "Open Jupyter Notebook"
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
    }), "\n", createVNode(Fragment$1, {
      "set:html": "<h3 id=\"jupyter-notebook-interface-faq\">Jupyter Notebook Interface FAQ</h3>\n<details><summary> How do I run each block of code? </summary><p>There are three ways to run a code cell after you select it:</p><ul>\n<li>Press <code dir=\"auto\">Shift + Enter</code></li>\n<li>Click the “Run” button (play icon) in the toolbar of the notebook.</li>\n<li>Click the “Run” button (play icon) in the cell itself at the top right corner.</li>\n</ul><p>When you run a code cell, it will execute the code inside it and display the output directly below the cell. If there are any errors, they will also be displayed in the output area.</p></details>\n"
    }), createVNode(_components.details, {
      children: [createVNode(_components.summary, {
        children: " How do I reset each notebook environment? "
      }), createVNode(_components.p, {
        children: "Sometimes you may want to reset the notebook to its initial state. To do this, you can use the “Restart Kernel and Clear All Outputs” option from the “Kernel” menu at the top of the Jupyter interface. This will clear all outputs and reset the kernel, allowing you to start fresh. This reset only affects the current notebook and does not impact any other notebooks or the Redis instance running in the background."
      }), createVNode(_component0, {
        children: [createVNode("img", {
          src: "/images/restart.png",
          style: "width: 70%; margin:auto;"
        }), createVNode(_components.button, {
          "aria-label": "Zoom image: undefined",
          class: "starlight-image-zoom-control",
          "set:html": "<svg aria-hidden=\"true\" fill=\"currentColor\" viewBox=\"0 0 24 24\"><use href=\"#starlight-image-zoom-icon-zoom\"></use></svg>"
        })]
      })]
    }), "\n", createVNode(_components.details, {
      children: [createVNode(_components.summary, {
        children: " How do I know if the notebook is running? "
      }), createVNode(_components.p, {
        children: "If you are ever wondering if a code block is still running, you can check the top right corner of the Jupyter interface. If the kernel is busy, it will show a circle icon that is filled in. If the kernel is idle, it will show an empty circle icon."
      }), createVNode(_components.p, {
        children: "Idle kernel:"
      }), createVNode(_component0, {
        children: [createVNode("img", {
          src: "/images/idle-ker.png",
          style: "width: 70%; margin:auto;"
        }), createVNode(_components.button, {
          "aria-label": "Zoom image: undefined",
          class: "starlight-image-zoom-control",
          "set:html": "<svg aria-hidden=\"true\" fill=\"currentColor\" viewBox=\"0 0 24 24\"><use href=\"#starlight-image-zoom-icon-zoom\"></use></svg>"
        })]
      }), createVNode(_components.p, {
        "set:html": "Running kernel:"
      }), createVNode(_component0, {
        children: [createVNode("img", {
          src: "/images/running-ker.png",
          style: "width: 70%; margin:auto;"
        }), createVNode(_components.button, {
          "aria-label": "Zoom image: undefined",
          class: "starlight-image-zoom-control",
          "set:html": "<svg aria-hidden=\"true\" fill=\"currentColor\" viewBox=\"0 0 24 24\"><use href=\"#starlight-image-zoom-icon-zoom\"></use></svg>"
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

const url = "src/content/docs/intro/getting-started.mdx/";
const file = "/Users/nitin.kanukolanu/workspace/lab-contexteng/src/content/docs/intro/getting-started.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/nitin.kanukolanu/workspace/lab-contexteng/src/content/docs/intro/getting-started.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
