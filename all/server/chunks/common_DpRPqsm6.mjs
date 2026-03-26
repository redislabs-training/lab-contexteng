import { c as createComponent, a as createAstro, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate, d as renderSlot, b as renderComponent, e as addAttribute, F as Fragment, f as defineStyleVars, s as spreadAttributes, g as renderHead } from './astro/server_DKLinKq0.mjs';
import 'kleur/colors';
import { s as starlightConfig, B as BuiltInDefaultLocale, a as getCollection, p as pickLang, D as DeprecatedLabelsPropProxy, u as useTranslations } from './translations_CPYs2fCg.mjs';
import { g as AstroUserError } from './astro/assets-service_CHbtoEez.mjs';
/* empty css                         */
import 'clsx';
import { $ as $$Icon, a as $$Badge } from './Code_CsE4yZf_.mjs';
import * as z from 'zod';

const project = {"build":{"format":"directory"},"root":"file:///Users/nitin.kanukolanu/workspace/lab-contexteng/","srcDir":"file:///Users/nitin.kanukolanu/workspace/lab-contexteng/src/","trailingSlash":"always"};

const PAGE_TITLE_ID = "_top";

function generateToC(headings, { minHeadingLevel, maxHeadingLevel, title }) {
  headings = headings.filter(({ depth }) => depth >= minHeadingLevel && depth <= maxHeadingLevel);
  const toc = [{ depth: 2, slug: PAGE_TITLE_ID, text: title, children: [] }];
  for (const heading of headings) injectChild(toc, { ...heading, children: [] });
  return toc;
}
function injectChild(items, item) {
  const lastItem = items.at(-1);
  if (!lastItem || lastItem.depth >= item.depth) {
    items.push(item);
  } else {
    return injectChild(lastItem.children, item);
  }
}

const makeAPI = (data) => {
  const trackedDocsFiles = new Map(data);
  return {
    getNewestCommitDate: (file) => {
      const timestamp = trackedDocsFiles.get(file);
      if (!timestamp) throw new Error(`Failed to retrieve the git history for file "${file}"`);
      return new Date(timestamp);
    }
  };
};

const api = makeAPI([["intro-ws/getting-started.mdx",1774471005000],["intro-ws/welcome.mdx",1770167445000],["wrap-up-ws/finish-lab.mdx",1770167445000],["index.mdx",1769697921000],["intro/getting-started.mdx",1769697921000],["intro/welcome.mdx",1769697921000],["wrap-up/finish-lab.mdx",1769646380000]]);const getNewestCommitDate = api.getNewestCommitDate;

function ensureLeadingSlash(href) {
  if (href[0] !== "/") href = "/" + href;
  return href;
}
function ensureTrailingSlash(href) {
  if (href[href.length - 1] !== "/") href += "/";
  return href;
}
function stripLeadingSlash(href) {
  if (href[0] === "/") href = href.slice(1);
  return href;
}
function stripTrailingSlash(href) {
  if (href[href.length - 1] === "/") href = href.slice(0, -1);
  return href;
}
function stripLeadingAndTrailingSlashes(href) {
  href = stripLeadingSlash(href);
  href = stripTrailingSlash(href);
  return href;
}
function stripHtmlExtension(path) {
  const pathWithoutTrailingSlash = stripTrailingSlash(path);
  return pathWithoutTrailingSlash.endsWith(".html") ? pathWithoutTrailingSlash.slice(0, -5) : path;
}
function ensureHtmlExtension(path) {
  path = stripLeadingAndTrailingSlashes(path);
  if (!path.endsWith(".html")) {
    path = path ? path + ".html" : "/index.html";
  }
  return ensureLeadingSlash(path);
}

const base = stripTrailingSlash("/");
function pathWithBase(path) {
  path = stripLeadingSlash(path);
  return path ? base + "/" + path : base + "/";
}
function fileWithBase(path) {
  path = stripLeadingSlash(path);
  return path ? base + "/" + path : base;
}

const defaultFormatStrategy = {
  addBase: pathWithBase,
  handleExtension: (href) => stripHtmlExtension(href)
};
const formatStrategies = {
  file: {
    addBase: fileWithBase,
    handleExtension: (href) => ensureHtmlExtension(href)
  },
  directory: defaultFormatStrategy,
  preserve: defaultFormatStrategy
};
const trailingSlashStrategies = {
  always: ensureTrailingSlash,
  never: stripTrailingSlash,
  ignore: (href) => href
};
function formatPath$1(href, { format = "directory", trailingSlash = "ignore" }) {
  const formatStrategy = formatStrategies[format];
  const trailingSlashStrategy = trailingSlashStrategies[trailingSlash];
  href = formatStrategy.handleExtension(href);
  href = formatStrategy.addBase(href);
  if (format === "file") return href;
  href = href === "/" ? href : trailingSlashStrategy(href);
  return href;
}
function createPathFormatter(opts) {
  return (href) => formatPath$1(href, opts);
}

const formatPath = createPathFormatter({
  format: project.build.format,
  trailingSlash: project.trailingSlash
});

function slugToLocale$1(slug, config) {
  const localesConfig = config.locales ?? {};
  const baseSegment = slug?.split("/")[0];
  if (baseSegment && localesConfig[baseSegment]) return baseSegment;
  if (!localesConfig.root) return config.defaultLocale.locale;
  return void 0;
}

function slugToLocale(slug) {
  return slugToLocale$1(slug, starlightConfig);
}
function slugToLocaleData(slug) {
  const locale = slugToLocale(slug);
  return { dir: localeToDir(locale), lang: localeToLang(locale), locale };
}
function localeToLang(locale) {
  const lang = locale ? starlightConfig.locales?.[locale]?.lang : starlightConfig.locales?.root?.lang;
  const defaultLang = starlightConfig.defaultLocale?.lang || starlightConfig.defaultLocale?.locale;
  return lang || defaultLang || BuiltInDefaultLocale.lang;
}
function localeToDir(locale) {
  const dir = locale ? starlightConfig.locales?.[locale]?.dir : starlightConfig.locales?.root?.dir;
  return dir || starlightConfig.defaultLocale.dir;
}
function slugToParam(slug) {
  return slug === "index" || slug === "" ? void 0 : slug.endsWith("/index") ? slug.slice(0, -6) : slug;
}
function slugToPathname(slug) {
  const param = slugToParam(slug);
  return param ? "/" + param + "/" : "/";
}
function localizedId(id, locale) {
  const idLocale = slugToLocale(id);
  if (idLocale) {
    return id.replace(idLocale + "/", locale ? locale + "/" : "");
  } else if (locale) {
    return locale + "/" + id;
  } else {
    return id;
  }
}

const logos = {};

function validateLogoImports() {
  if (starlightConfig.logo) {
    let err;
    if ("src" in starlightConfig.logo) {
      if (!logos.dark || !logos.light) {
        err = `Could not resolve logo import for "${starlightConfig.logo.src}" (logo.src)`;
      }
    } else {
      if (!logos.dark) {
        err = `Could not resolve logo import for "${starlightConfig.logo.dark}" (logo.dark)`;
      } else if (!logos.light) {
        err = `Could not resolve logo import for "${starlightConfig.logo.light}" (logo.light)`;
      }
    }
    if (err) throw new Error(err);
  }
}

validateLogoImports();
const normalizeIndexSlug = (slug) => slug === "index" ? "" : slug;
const docs = (await getCollection("docs", ({ data }) => {
  return data.draft === false;
}) ?? []).map(({ slug, ...entry }) => ({
  ...entry,
  slug: normalizeIndexSlug(slug)
}));
function getRoutes() {
  const routes2 = docs.map((entry) => ({
    entry,
    slug: entry.slug,
    id: entry.id,
    entryMeta: slugToLocaleData(entry.slug),
    ...slugToLocaleData(entry.slug)
  }));
  return routes2;
}
const routes = getRoutes();
function getParamRouteMapping() {
  const map = /* @__PURE__ */ new Map();
  for (const route of routes) {
    map.set(slugToParam(route.slug), route);
  }
  return map;
}
getParamRouteMapping();
function getPaths() {
  return routes.map((route) => ({
    params: { slug: slugToParam(route.slug) },
    props: route
  }));
}
const paths = getPaths();
function getLocaleRoutes(locale) {
  return filterByLocale(routes, locale);
}
function filterByLocale(items, locale) {
  if (starlightConfig.locales) {
    if (locale && locale in starlightConfig.locales) {
      return items.filter((i) => i.slug === locale || i.slug.startsWith(locale + "/"));
    } else if (starlightConfig.locales.root) {
      const langKeys = Object.keys(starlightConfig.locales).filter((k) => k !== "root");
      const isLangIndex = new RegExp(`^(${langKeys.join("|")})$`);
      const isLangDir = new RegExp(`^(${langKeys.join("|")})/`);
      return items.filter((i) => !isLangIndex.test(i.slug) && !isLangDir.test(i.slug));
    }
  }
  return items;
}

const DirKey = Symbol("DirKey");
const SlugKey = Symbol("SlugKey");
function makeDir(slug) {
  const dir = {};
  Object.defineProperty(dir, DirKey, { enumerable: false });
  Object.defineProperty(dir, SlugKey, { value: slug, enumerable: false });
  return dir;
}
function isDir(data) {
  return DirKey in data;
}
function configItemToEntry(item, currentPathname, locale, routes2) {
  if ("link" in item) {
    return linkFromSidebarLinkItem(item, locale, currentPathname);
  } else if ("autogenerate" in item) {
    return groupFromAutogenerateConfig(item, locale, routes2, currentPathname);
  } else if ("slug" in item) {
    return linkFromInternalSidebarLinkItem(item, locale, currentPathname);
  } else {
    const label = pickLang(item.translations, localeToLang(locale)) || item.label;
    return {
      type: "group",
      label,
      entries: item.items.map((i) => configItemToEntry(i, currentPathname, locale, routes2)),
      collapsed: item.collapsed,
      badge: getSidebarBadge(item.badge, locale, label)
    };
  }
}
function groupFromAutogenerateConfig(item, locale, routes2, currentPathname) {
  const { collapsed: subgroupCollapsed, directory } = item.autogenerate;
  const localeDir = locale ? locale + "/" + directory : directory;
  const dirDocs = routes2.filter(
    (doc) => (
      // Match against `foo.md` or `foo/index.md`.
      stripExtension(doc.id) === localeDir || // Match against `foo/anything/else.md`.
      doc.id.startsWith(localeDir + "/")
    )
  );
  const tree = treeify(dirDocs, localeDir);
  const label = pickLang(item.translations, localeToLang(locale)) || item.label;
  return {
    type: "group",
    label,
    entries: sidebarFromDir(tree, currentPathname, locale, subgroupCollapsed ?? item.collapsed),
    collapsed: item.collapsed,
    badge: getSidebarBadge(item.badge, locale, label)
  };
}
const isAbsolute = (link) => /^https?:\/\//.test(link);
function linkFromSidebarLinkItem(item, locale, currentPathname) {
  let href = item.link;
  if (!isAbsolute(href)) {
    href = ensureLeadingSlash(href);
    if (locale) href = "/" + locale + href;
  }
  const label = pickLang(item.translations, localeToLang(locale)) || item.label;
  return makeSidebarLink(
    href,
    label,
    currentPathname,
    getSidebarBadge(item.badge, locale, label),
    item.attrs
  );
}
function linkFromInternalSidebarLinkItem(item, locale, currentPathname) {
  const slug = item.slug === "index" ? "" : item.slug;
  const localizedSlug = locale ? slug ? locale + "/" + slug : locale : slug;
  const entry = routes.find((entry2) => localizedSlug === entry2.slug);
  if (!entry) {
    const hasExternalSlashes = item.slug.at(0) === "/" || item.slug.at(-1) === "/";
    if (hasExternalSlashes) {
      throw new AstroUserError(
        `The slug \`"${item.slug}"\` specified in the Starlight sidebar config must not start or end with a slash.`,
        `Please try updating \`"${item.slug}"\` to \`"${stripLeadingAndTrailingSlashes(item.slug)}"\`.`
      );
    } else {
      throw new AstroUserError(
        `The slug \`"${item.slug}"\` specified in the Starlight sidebar config does not exist.`,
        "Update the Starlight config to reference a valid entry slug in the docs content collection.\nLearn more about Astro content collection slugs at https://docs.astro.build/en/reference/modules/astro-content/#getentry"
      );
    }
  }
  const label = pickLang(item.translations, localeToLang(locale)) || item.label || entry.entry.data.title;
  return makeSidebarLink(
    entry.slug,
    label,
    currentPathname,
    getSidebarBadge(item.badge, locale, label),
    item.attrs
  );
}
function makeSidebarLink(href, label, currentPathname, badge, attrs) {
  if (!isAbsolute(href)) {
    href = formatPath(href);
  }
  const isCurrent = pathsMatch(encodeURI(href), currentPathname);
  return makeLink({ label, href, isCurrent, badge, attrs });
}
function makeLink({
  isCurrent = false,
  attrs = {},
  badge = void 0,
  ...opts
}) {
  return { type: "link", ...opts, badge, isCurrent, attrs };
}
function pathsMatch(pathA, pathB) {
  const format = createPathFormatter({ trailingSlash: "never" });
  return format(pathA) === format(pathB);
}
function getBreadcrumbs(path, baseDir) {
  const pathWithoutExt = stripExtension(path);
  if (pathWithoutExt === baseDir) return [];
  baseDir = ensureTrailingSlash(baseDir);
  const relativePath = pathWithoutExt.startsWith(baseDir) ? pathWithoutExt.replace(baseDir, "") : pathWithoutExt;
  return relativePath.split("/");
}
function treeify(routes2, baseDir) {
  const treeRoot = makeDir(baseDir);
  routes2.filter((doc) => !doc.entry.data.sidebar.hidden).sort((a, b) => b.id.split("/").length - a.id.split("/").length).forEach((doc) => {
    const parts = getBreadcrumbs(doc.id, baseDir);
    let currentNode = treeRoot;
    parts.forEach((part, index) => {
      const isLeaf = index === parts.length - 1;
      if (isLeaf && currentNode.hasOwnProperty(part)) {
        currentNode = currentNode[part];
        part = "index";
      }
      if (!isLeaf) {
        const path = currentNode[SlugKey];
        currentNode[part] ||= makeDir(stripLeadingAndTrailingSlashes(path + "/" + part));
        currentNode = currentNode[part];
      } else {
        currentNode[part] = doc;
      }
    });
  });
  return treeRoot;
}
function linkFromRoute(route, currentPathname) {
  return makeSidebarLink(
    slugToPathname(route.slug),
    route.entry.data.sidebar.label || route.entry.data.title,
    currentPathname,
    route.entry.data.sidebar.badge,
    route.entry.data.sidebar.attrs
  );
}
function getOrder(routeOrDir) {
  return isDir(routeOrDir) ? Math.min(...Object.values(routeOrDir).flatMap(getOrder)) : (
    // If no order value is found, set it to the largest number possible.
    routeOrDir.entry.data.sidebar.order ?? Number.MAX_VALUE
  );
}
function sortDirEntries(dir) {
  const collator = new Intl.Collator(localeToLang(void 0));
  return dir.sort(([_keyA, a], [_keyB, b]) => {
    const [aOrder, bOrder] = [getOrder(a), getOrder(b)];
    if (aOrder !== bOrder) return aOrder < bOrder ? -1 : 1;
    return collator.compare(isDir(a) ? a[SlugKey] : a.slug, isDir(b) ? b[SlugKey] : b.slug);
  });
}
function groupFromDir(dir, fullPath, dirName, currentPathname, locale, collapsed) {
  const entries = sortDirEntries(Object.entries(dir)).map(
    ([key, dirOrRoute]) => dirToItem(dirOrRoute, `${fullPath}/${key}`, key, currentPathname, locale, collapsed)
  );
  return {
    type: "group",
    label: dirName,
    entries,
    collapsed,
    badge: void 0
  };
}
function dirToItem(dirOrRoute, fullPath, dirName, currentPathname, locale, collapsed) {
  return isDir(dirOrRoute) ? groupFromDir(dirOrRoute, fullPath, dirName, currentPathname, locale, collapsed) : linkFromRoute(dirOrRoute, currentPathname);
}
function sidebarFromDir(tree, currentPathname, locale, collapsed) {
  return sortDirEntries(Object.entries(tree)).map(
    ([key, dirOrRoute]) => dirToItem(dirOrRoute, key, key, currentPathname, locale, collapsed)
  );
}
function getSidebar(pathname, locale) {
  return getSidebarFromConfig(starlightConfig.sidebar, pathname, locale);
}
function getSidebarFromConfig(sidebarConfig, pathname, locale) {
  const routes2 = getLocaleRoutes(locale);
  if (sidebarConfig) {
    return sidebarConfig.map((group) => configItemToEntry(group, pathname, locale, routes2));
  } else {
    const tree = treeify(routes2, locale || "");
    return sidebarFromDir(tree, pathname, locale, false);
  }
}
function getSidebarHash(sidebar) {
  let hash = 0;
  const sidebarIdentity = recursivelyBuildSidebarIdentity(sidebar);
  for (let i = 0; i < sidebarIdentity.length; i++) {
    const char = sidebarIdentity.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }
  return (hash >>> 0).toString(36).padStart(7, "0");
}
function recursivelyBuildSidebarIdentity(sidebar) {
  return sidebar.flatMap(
    (entry) => entry.type === "group" ? entry.label + recursivelyBuildSidebarIdentity(entry.entries) : entry.label + entry.href
  ).join("");
}
function flattenSidebar(sidebar) {
  return sidebar.flatMap(
    (entry) => entry.type === "group" ? flattenSidebar(entry.entries) : entry
  );
}
function getPrevNextLinks(sidebar, paginationEnabled, config2) {
  const entries = flattenSidebar(sidebar);
  const currentIndex = entries.findIndex((entry) => entry.isCurrent);
  const prev = applyPrevNextLinkConfig(entries[currentIndex - 1], paginationEnabled, config2.prev);
  const next = applyPrevNextLinkConfig(
    currentIndex > -1 ? entries[currentIndex + 1] : void 0,
    paginationEnabled,
    config2.next
  );
  return { prev, next };
}
function applyPrevNextLinkConfig(link, paginationEnabled, config2) {
  if (config2 === false) return void 0;
  else if (config2 === true) return link;
  else if (typeof config2 === "string" && link) {
    return { ...link, label: config2 };
  } else if (typeof config2 === "object") {
    if (link) {
      return {
        ...link,
        label: config2.label ?? link.label,
        href: config2.link ?? link.href,
        // Explicitly remove sidebar link attributes for prev/next links.
        attrs: {}
      };
    } else if (config2.link && config2.label) {
      return makeLink({ href: config2.link, label: config2.label });
    }
  }
  return paginationEnabled ? link : void 0;
}
function stripExtension(path) {
  const periodIndex = path.lastIndexOf(".");
  return path.slice(0, periodIndex > -1 ? periodIndex : void 0);
}
function getSidebarBadge(config2, locale, itemLabel) {
  if (!config2) return;
  if (typeof config2 === "string") {
    return { variant: "default", text: config2 };
  }
  return { ...config2, text: getSidebarBadgeText(config2.text, locale, itemLabel) };
}
function getSidebarBadgeText(text, locale, itemLabel) {
  if (typeof text === "string") return text;
  const defaultLang = starlightConfig.defaultLocale?.lang || starlightConfig.defaultLocale?.locale || BuiltInDefaultLocale.lang;
  const defaultText = text[defaultLang];
  if (!defaultText) {
    throw new AstroUserError(
      `The badge text for "${itemLabel}" must have a key for the default language "${defaultLang}".`,
      "Update the Starlight config to include a badge text for the default language.\nLearn more about sidebar badges internationalization at https://starlight.astro.build/guides/sidebar/#internationalization-with-badges"
    );
  }
  return pickLang(text, localeToLang(locale)) || defaultText;
}

function generateRouteData({
  props,
  url
}) {
  const { entry, locale, lang } = props;
  const sidebar = getSidebar(url.pathname, locale);
  const siteTitle = getSiteTitle(lang);
  return {
    ...props,
    siteTitle,
    siteTitleHref: getSiteTitleHref(locale),
    sidebar,
    hasSidebar: entry.data.template !== "splash",
    pagination: getPrevNextLinks(sidebar, starlightConfig.pagination, entry.data),
    toc: getToC(props),
    lastUpdated: getLastUpdated(props),
    editUrl: getEditUrl(props),
    labels: DeprecatedLabelsPropProxy
  };
}
function getToC({ entry, lang, headings }) {
  const tocConfig = entry.data.template === "splash" ? false : entry.data.tableOfContents !== void 0 ? entry.data.tableOfContents : starlightConfig.tableOfContents;
  if (!tocConfig) return;
  const t = useTranslations(lang);
  return {
    ...tocConfig,
    items: generateToC(headings, { ...tocConfig, title: t("tableOfContents.overview") })
  };
}
function getLastUpdated({ entry }) {
  const { lastUpdated: frontmatterLastUpdated } = entry.data;
  const { lastUpdated: configLastUpdated } = starlightConfig;
  if (frontmatterLastUpdated ?? configLastUpdated) {
    try {
      return frontmatterLastUpdated instanceof Date ? frontmatterLastUpdated : getNewestCommitDate(entry.id);
    } catch {
      return void 0;
    }
  }
  return void 0;
}
function getEditUrl({ entry, id, isFallback }) {
  const { editUrl } = entry.data;
  if (editUrl === false) return;
  let url;
  if (typeof editUrl === "string") {
    url = editUrl;
  } else if (starlightConfig.editLink.baseUrl) {
    const srcPath = project.srcDir.replace(project.root, "");
    const filePath = isFallback ? localizedId(id, starlightConfig.defaultLocale.locale) : id;
    url = ensureTrailingSlash(starlightConfig.editLink.baseUrl) + srcPath + "content/docs/" + filePath;
  }
  return url ? new URL(url) : void 0;
}
function getSiteTitle(lang) {
  const defaultLang = starlightConfig.defaultLocale.lang;
  if (lang && starlightConfig.title[lang]) {
    return starlightConfig.title[lang];
  }
  return starlightConfig.title[defaultLang];
}
function getSiteTitleHref(locale) {
  return formatPath(locale || "/");
}

const $$Astro$x = createAstro();
const $$Banner = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$x, $$props, $$slots);
  Astro2.self = $$Banner;
  const { banner } = Astro2.props.entry.data;
  return renderTemplate`${banner && renderTemplate`${maybeRenderHead()}<div class="sl-banner astro-laz2plt2">${unescapeHTML(banner.content)}</div>`}`;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/Banner.astro", void 0);

const $$ContentPanel = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="content-panel astro-7nkwcw3z"> <div class="sl-container astro-7nkwcw3z">${renderSlot($$result, $$slots["default"])}</div> </div> `;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/ContentPanel.astro", void 0);

const $$Astro$w = createAstro();
const $$ContentNotice = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$w, $$props, $$slots);
  Astro2.self = $$ContentNotice;
  const { icon, label } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<p class="sl-flex astro-opzsrvew"> ${renderComponent($$result, "Icon", $$Icon, { "name": icon, "size": "1.5em", "color": "var(--sl-color-orange-high)", "class": "astro-opzsrvew" })} <span class="astro-opzsrvew">${label}</span> </p> `;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/ContentNotice.astro", void 0);

const $$Astro$v = createAstro();
const $$FallbackContentNotice = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$v, $$props, $$slots);
  Astro2.self = $$FallbackContentNotice;
  return renderTemplate`${renderComponent($$result, "ContentNotice", $$ContentNotice, { "icon": "warning", "label": Astro2.locals.t("i18n.untranslatedContent") })}`;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/FallbackContentNotice.astro", void 0);

const $$Astro$u = createAstro();
const $$DraftContentNotice = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$u, $$props, $$slots);
  Astro2.self = $$DraftContentNotice;
  return renderTemplate`${renderComponent($$result, "ContentNotice", $$ContentNotice, { "icon": "warning", "label": Astro2.locals.t("page.draft") })}`;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/DraftContentNotice.astro", void 0);

const $$Astro$t = createAstro();
const $$EditLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$t, $$props, $$slots);
  Astro2.self = $$EditLink;
  const { editUrl } = Astro2.props;
  return renderTemplate`${editUrl && renderTemplate`${maybeRenderHead()}<a${addAttribute(editUrl, "href")} class="sl-flex astro-eez2twj6">${renderComponent($$result, "Icon", $$Icon, { "name": "pencil", "size": "1.2em", "class": "astro-eez2twj6" })}${Astro2.locals.t("page.editLink")}</a>`}`;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/EditLink.astro", void 0);

const $$Astro$s = createAstro();
const $$LastUpdated = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$s, $$props, $$slots);
  Astro2.self = $$LastUpdated;
  const { lang, lastUpdated } = Astro2.props;
  return renderTemplate`${lastUpdated && renderTemplate`${maybeRenderHead()}<p>${Astro2.locals.t("page.lastUpdated")}${" "}<time${addAttribute(lastUpdated.toISOString(), "datetime")}>${lastUpdated.toLocaleDateString(lang, { dateStyle: "medium", timeZone: "UTC" })}</time></p>`}`;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/LastUpdated.astro", void 0);

const $$Astro$r = createAstro();
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$r, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { dir, pagination } = Astro2.props;
  const { prev, next } = pagination;
  const isRtl = dir === "rtl";
  return renderTemplate`${maybeRenderHead()}<div class="pagination-links astro-u2l5gyhi"${addAttribute(dir, "dir")}> ${prev && renderTemplate`<a${addAttribute(prev.href, "href")} rel="prev" class="astro-u2l5gyhi"> ${renderComponent($$result, "Icon", $$Icon, { "name": isRtl ? "right-arrow" : "left-arrow", "size": "1.5rem", "class": "astro-u2l5gyhi" })} <span class="astro-u2l5gyhi"> ${Astro2.locals.t("page.previousLink")} <br class="astro-u2l5gyhi"> <span class="link-title astro-u2l5gyhi">${prev.label}</span> </span> </a>`} ${next && renderTemplate`<a${addAttribute(next.href, "href")} rel="next" class="astro-u2l5gyhi"> ${renderComponent($$result, "Icon", $$Icon, { "name": isRtl ? "left-arrow" : "right-arrow", "size": "1.5rem", "class": "astro-u2l5gyhi" })} <span class="astro-u2l5gyhi"> ${Astro2.locals.t("page.nextLink")} <br class="astro-u2l5gyhi"> <span class="link-title astro-u2l5gyhi">${next.label}</span> </span> </a>`} </div> `;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/Pagination.astro", void 0);

const $$Astro$q = createAstro();
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$q, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="sl-flex astro-3yyafb3n"> <div class="meta sl-flex astro-3yyafb3n"> ${renderComponent($$result, "EditLink", $$EditLink, { ...Astro2.props, "class": "astro-3yyafb3n" })} ${renderComponent($$result, "LastUpdated", $$LastUpdated, { ...Astro2.props, "class": "astro-3yyafb3n" })} </div> ${renderComponent($$result, "Pagination", $$Pagination, { ...Astro2.props, "class": "astro-3yyafb3n" })} ${starlightConfig.credits} </footer> `;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/Footer.astro", void 0);

const version = "0.28.6";

const HeadConfigSchema = () => z.array(
  z.object({
    /** Name of the HTML tag to add to `<head>`, e.g. `'meta'`, `'link'`, or `'script'`. */
    tag: z.enum(["title", "base", "link", "style", "meta", "script", "noscript", "template"]),
    /** Attributes to set on the tag, e.g. `{ rel: 'stylesheet', href: '/custom.css' }`. */
    attrs: z.record(z.union([z.string(), z.boolean(), z.undefined()])).default({}),
    /** Content to place inside the tag (optional). */
    content: z.string().default("")
  })
).default([]);

const HeadSchema = HeadConfigSchema();
function createHead(defaults, ...heads) {
  let head = HeadSchema.parse(defaults);
  for (const next of heads) {
    head = mergeHead(head, next);
  }
  return sortHead(head);
}
function hasTag(head, entry) {
  switch (entry.tag) {
    case "title":
      return head.some(({ tag }) => tag === "title");
    case "meta":
      return hasOneOf(head, entry, ["name", "property", "http-equiv"]);
    case "link":
      return head.some(({ attrs }) => attrs.rel === "canonical");
    default:
      return false;
  }
}
function hasOneOf(head, entry, keys) {
  const attr = getAttr(keys, entry);
  if (!attr) return false;
  const [key, val] = attr;
  return head.some(({ tag, attrs }) => tag === entry.tag && attrs[key] === val);
}
function getAttr(keys, entry) {
  let attr;
  for (const key of keys) {
    const val = entry.attrs[key];
    if (val) {
      attr = [key, val];
      break;
    }
  }
  return attr;
}
function mergeHead(oldHead, newHead) {
  return [...oldHead.filter((tag) => !hasTag(newHead, tag)), ...newHead];
}
function sortHead(head) {
  return head.sort((a, b) => {
    const aImportance = getImportance(a);
    const bImportance = getImportance(b);
    return aImportance > bImportance ? -1 : bImportance > aImportance ? 1 : 0;
  });
}
function getImportance(entry) {
  if (entry.tag === "meta" && ("charset" in entry.attrs || "http-equiv" in entry.attrs || entry.attrs.name === "viewport")) {
    return 100;
  }
  if (entry.tag === "title") return 90;
  if (entry.tag !== "meta") {
    if (entry.tag === "link" && "rel" in entry.attrs && entry.attrs.rel === "shortcut icon") {
      return 70;
    }
    return 80;
  }
  return 0;
}

const $$Astro$p = createAstro();
const $$Head = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$p, $$props, $$slots);
  Astro2.self = $$Head;
  const { entry, lang, siteTitle } = Astro2.props;
  const { data } = entry;
  const canonical = Astro2.site ? new URL(Astro2.url.pathname, Astro2.site) : void 0;
  const description = data.description || starlightConfig.description;
  const headDefaults = [
    { tag: "meta", attrs: { charset: "utf-8" } },
    {
      tag: "meta",
      attrs: { name: "viewport", content: "width=device-width, initial-scale=1" }
    },
    { tag: "title", content: `${data.title} ${starlightConfig.titleDelimiter} ${siteTitle}` },
    { tag: "link", attrs: { rel: "canonical", href: canonical?.href } },
    { tag: "meta", attrs: { name: "generator", content: Astro2.generator } },
    {
      tag: "meta",
      attrs: { name: "generator", content: `Starlight v${version}` }
    },
    // Favicon
    {
      tag: "link",
      attrs: {
        rel: "shortcut icon",
        href: fileWithBase(starlightConfig.favicon.href),
        type: starlightConfig.favicon.type
      }
    },
    // OpenGraph Tags
    { tag: "meta", attrs: { property: "og:title", content: data.title } },
    { tag: "meta", attrs: { property: "og:type", content: "article" } },
    { tag: "meta", attrs: { property: "og:url", content: canonical?.href } },
    { tag: "meta", attrs: { property: "og:locale", content: lang } },
    { tag: "meta", attrs: { property: "og:description", content: description } },
    { tag: "meta", attrs: { property: "og:site_name", content: siteTitle } },
    // Twitter Tags
    {
      tag: "meta",
      attrs: { name: "twitter:card", content: "summary_large_image" }
    }
  ];
  if (description)
    headDefaults.push({
      tag: "meta",
      attrs: { name: "description", content: description }
    });
  if (Astro2.site) {
    headDefaults.push({
      tag: "link",
      attrs: {
        rel: "sitemap",
        href: fileWithBase("/sitemap-index.xml")
      }
    });
  }
  if (starlightConfig.social?.twitter) {
    headDefaults.push({
      tag: "meta",
      attrs: {
        name: "twitter:site",
        content: new URL(starlightConfig.social.twitter.url).pathname
      }
    });
  }
  const head = createHead(headDefaults, starlightConfig.head, data.head);
  return renderTemplate`${head.map(({ tag: Tag, attrs, content }) => renderTemplate`${renderComponent($$result, "Tag", Tag, { ...attrs }, { "default": ($$result2) => renderTemplate`${unescapeHTML(content)}` })}`)}`;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/Head.astro", void 0);

const $$Astro$o = createAstro();
const $$Select = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$o, $$props, $$slots);
  Astro2.self = $$Select;
  return renderTemplate`${maybeRenderHead()}<label${addAttribute(`--sl-select-width: ${Astro2.props.width}`, "style")} class="astro-4yphtoen"> <span class="sr-only astro-4yphtoen">${Astro2.props.label}</span> ${renderComponent($$result, "Icon", $$Icon, { "name": Astro2.props.icon, "class": "icon label-icon astro-4yphtoen" })} <select${addAttribute(Astro2.props.value, "value")} class="astro-4yphtoen"> ${Astro2.props.options.map(({ value, selected, label }) => renderTemplate`<option${addAttribute(value, "value")}${addAttribute(selected, "selected")} class="astro-4yphtoen">${unescapeHTML(label)}</option>`)} </select> ${renderComponent($$result, "Icon", $$Icon, { "name": "down-caret", "class": "icon caret astro-4yphtoen" })} </label> `;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/Select.astro", void 0);

const $$Astro$n = createAstro();
const $$LanguageSelect = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$n, $$props, $$slots);
  Astro2.self = $$LanguageSelect;
  return renderTemplate`${starlightConfig.isMultilingual}`;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/LanguageSelect.astro", void 0);

var __freeze$3 = Object.freeze;
var __defProp$3 = Object.defineProperty;
var __template$3 = (cooked, raw) => __freeze$3(__defProp$3(cooked, "raw", { value: __freeze$3(cooked.slice()) }));
var _a$3;
const $$Astro$m = createAstro();
const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$m, $$props, $$slots);
  Astro2.self = $$Search;
  const pagefindTranslations = {
    placeholder: Astro2.locals.t("search.label"),
    ...Object.fromEntries(
      Object.entries(Astro2.locals.t.all()).filter(([key]) => key.startsWith("pagefind.")).map(([key, value]) => [key.replace("pagefind.", ""), value])
    )
  };
  return renderTemplate(_a$3 || (_a$3 = __template$3(["", "  <script>\n	(() => {\n		const openBtn = document.querySelector('button[data-open-modal]');\n		const shortcut = openBtn?.querySelector('kbd');\n		if (!openBtn || !(shortcut instanceof HTMLElement)) return;\n		const platformKey = shortcut.querySelector('kbd');\n		if (platformKey && /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {\n			platformKey.textContent = '⌘';\n			openBtn.setAttribute('aria-keyshortcuts', 'Meta+K');\n		}\n		shortcut.style.display = '';\n	})();\n</script>   "])), renderComponent($$result, "site-search", "site-search", { "data-translations": JSON.stringify(pagefindTranslations), "data-strip-trailing-slash": project.trailingSlash === "never", "class": "astro-v37mnknz" }, { "default": () => renderTemplate` ${maybeRenderHead()}<button data-open-modal disabled${addAttribute(Astro2.locals.t("search.label"), "aria-label")} aria-keyshortcuts="Control+K" class="astro-v37mnknz"> ${renderComponent($$result, "Icon", $$Icon, { "name": "magnifier", "class": "astro-v37mnknz" })} <span class="sl-hidden md:sl-block astro-v37mnknz" aria-hidden="true">${Astro2.locals.t("search.label")}</span> <kbd class="sl-hidden md:sl-flex astro-v37mnknz" style="display: none;"> <kbd class="astro-v37mnknz">${Astro2.locals.t("search.ctrlKey")}</kbd><kbd class="astro-v37mnknz">K</kbd> </kbd> </button> <dialog style="padding:0"${addAttribute(Astro2.locals.t("search.label"), "aria-label")} class="astro-v37mnknz"> <div class="dialog-frame sl-flex astro-v37mnknz">  <button data-close-modal class="sl-flex md:sl-hidden astro-v37mnknz"> ${Astro2.locals.t("search.cancelLabel")} </button> ${renderTemplate`<div class="search-container astro-v37mnknz"> <div id="starlight__search" class="astro-v37mnknz"></div> </div>`} </div> </dialog> ` }));
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/Search.astro", void 0);

const $$Astro$l = createAstro();
const $$SiteTitle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$SiteTitle;
  const { siteTitle, siteTitleHref } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(siteTitleHref, "href")} class="site-title sl-flex astro-m46x6ez3"> ${starlightConfig.logo && logos.dark && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "class": "astro-m46x6ez3" }, { "default": ($$result2) => renderTemplate` <img${addAttribute([{ "light:sl-hidden": !("src" in starlightConfig.logo) }, "astro-m46x6ez3"], "class:list")}${addAttribute(starlightConfig.logo.alt, "alt")}${addAttribute(logos.dark.src, "src")}${addAttribute(logos.dark.width, "width")}${addAttribute(logos.dark.height, "height")}> ${!("src" in starlightConfig.logo) && renderTemplate`<img class="dark:sl-hidden astro-m46x6ez3"${addAttribute(starlightConfig.logo.alt, "alt")}${addAttribute(logos.light?.src, "src")}${addAttribute(logos.light?.width, "width")}${addAttribute(logos.light?.height, "height")}>`}` })}`} <span${addAttribute([{ "sr-only": starlightConfig.logo?.replacesTitle }, "astro-m46x6ez3"], "class:list")}> ${siteTitle} </span> </a> `;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/SiteTitle.astro", void 0);

const $$SocialIcons = createComponent(($$result, $$props, $$slots) => {
  const links = Object.entries(starlightConfig.social || {});
  return renderTemplate`${links.length > 0 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "class": "astro-wy4te6ga" }, { "default": ($$result2) => renderTemplate`${links.map(([platform, { label, url }]) => renderTemplate`${maybeRenderHead()}<a${addAttribute(url, "href")} rel="me" class="sl-flex astro-wy4te6ga"><span class="sr-only astro-wy4te6ga">${label}</span>${renderComponent($$result2, "Icon", $$Icon, { "name": platform, "class": "astro-wy4te6ga" })}</a>`)}` })}`}`;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/SocialIcons.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) }));
var _a$2;
const $$Astro$k = createAstro();
const $$ThemeSelect = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$ThemeSelect;
  return renderTemplate(_a$2 || (_a$2 = __template$2(["", "  <script>\n	StarlightThemeProvider.updatePickers();\n<\/script> "])), renderComponent($$result, "starlight-theme-select", "starlight-theme-select", {}, { "default": () => renderTemplate`  ${renderComponent($$result, "Select", $$Select, { "icon": "laptop", "label": Astro2.locals.t("themeSelect.accessibleLabel"), "value": "auto", "options": [
    { label: Astro2.locals.t("themeSelect.dark"), selected: false, value: "dark" },
    { label: Astro2.locals.t("themeSelect.light"), selected: false, value: "light" },
    { label: Astro2.locals.t("themeSelect.auto"), selected: true, value: "auto" }
  ], "width": "6.25em" })} ` }));
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/ThemeSelect.astro", void 0);

const $$Astro$j = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$Header;
  const shouldRenderSearch = starlightConfig.components.Search !== "@astrojs/starlight/components/Search.astro";
  return renderTemplate`${maybeRenderHead()}<div class="header sl-flex astro-kmkmnagf"> <div class="title-wrapper sl-flex astro-kmkmnagf"> ${renderComponent($$result, "SiteTitle", $$SiteTitle, { ...Astro2.props, "class": "astro-kmkmnagf" })} </div> <div class="sl-flex astro-kmkmnagf"> ${shouldRenderSearch} </div> <div class="sl-hidden md:sl-flex right-group astro-kmkmnagf"> <div class="sl-flex social-icons astro-kmkmnagf"> ${renderComponent($$result, "SocialIcons", $$SocialIcons, { ...Astro2.props, "class": "astro-kmkmnagf" })} </div> ${renderComponent($$result, "ThemeSelect", $$ThemeSelect, { ...Astro2.props, "class": "astro-kmkmnagf" })} ${renderComponent($$result, "LanguageSelect", $$LanguageSelect, { ...Astro2.props, "class": "astro-kmkmnagf" })} </div> </div> `;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/Header.astro", void 0);

// Toggle Lab Mode
const LAB = String(process.env.LAB_MODE ?? '').toLowerCase().trim();

const LAB_CONFIG = {
    default: {
        title: 'Context Engineering with Redis & LangChain',
        hero: {
            tagline: 'Context Engineering with Redis & LangChain',
            subtitle: 'Engineer every layer of context as you evolve a course advisor agent from baseline RAG to a full agent',
            homeLink: '/intro/welcome/'
        },
        sidebar: [
            {
                label: 'Introduction',
                items: [
                    'intro/welcome',
                    'intro/getting-started',
                ]
            },
            {
                label: 'Wrap up',
                items: [
                    'wrap-up/finish-lab'
                ]
            }
        ]
    },
    ws: {
        title: 'Redis Workshop: Context Engineering',
        hero: {
            tagline: 'Context Engineering Workshop with Redis & LangChain',
            subtitle: 'Engineer every layer of context as you evolve a course advisor agent from baseline RAG to a full agent',
            homeLink: '/intro-ws/welcome/'
        },
        sidebar: [
            {
                label: 'Introduction',
                items: [
                    'intro-ws/welcome',
                    'intro-ws/getting-started',
                ]
            },
            {
                label: 'Wrap up',
                items: [
                    'wrap-up-ws/finish-lab'
                ]
            }
        ]
    }
};

const config = LAB_CONFIG[LAB] || LAB_CONFIG.default;

const $$CustomHero = createComponent(($$result, $$props, $$slots) => {
  const heroData = config.hero;
  return renderTemplate`${maybeRenderHead()}<div class="container astro-m4ig3dvs"> <div class="content-wrapper astro-m4ig3dvs"> <!-- Logo/Badge --> <div class="logo astro-m4ig3dvs"> <img src="doc/assets/redis_logo.png" alt="Redis University Lab" width="23%" class="astro-m4ig3dvs"> </div> <!-- Main Title --> <h1 id="tagline" class="title astro-m4ig3dvs">${heroData.tagline}</h1> <!-- Subtitle --> <p class="subtitle astro-m4ig3dvs">${heroData.subtitle}</p> <!-- CTA Button --> <a${addAttribute(heroData.homeLink, "href")} class="cta-button hero-cta astro-m4ig3dvs">
Get Started
<svg class="arrow-icon astro-m4ig3dvs" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 12h14" class="astro-m4ig3dvs"></path> <path d="m12 5 7 7-7 7" class="astro-m4ig3dvs"></path> </svg> </a> </div> </div>`;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/src/components/CustomHero.astro", void 0);

const $$MarkdownContent$1 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="sl-markdown-content">${renderSlot($$result, $$slots["default"])}</div>`;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/MarkdownContent.astro", void 0);

const $$ImageZoom = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "starlight-image-zoom", "starlight-image-zoom", { "data-hide-caption": false, "class": "astro-vjux6bgf" }, { "default": () => renderTemplate` <template class="astro-vjux6bgf"> ${maybeRenderHead()}<dialog class="starlight-image-zoom-dialog astro-vjux6bgf"> <button aria-label="Unzoom image" class="starlight-image-zoom-control astro-vjux6bgf"> <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" class="astro-vjux6bgf"> <use href="#starlight-image-zoom-icon-unzoom" class="astro-vjux6bgf"></use> </svg> </button> <figure class="astro-vjux6bgf"></figure> </dialog> </template> <svg xmlns="http://www.w3.org/2000/svg"${addAttribute({ display: "none" }, "style")} class="astro-vjux6bgf"> <symbol id="starlight-image-zoom-icon-zoom" viewBox="0 0 24 24" class="astro-vjux6bgf"> <path d="M9.79 12.79 4 18.59V17a1 1 0 0 0-2 0v4a1 1 0 0 0 .08.38 1 1 0 0 0 .54.54A1 1 0 0 0 3 22h4a1 1 0 0 0 0-2H5.41l5.8-5.79a1 1 0 0 0-1.42-1.42ZM21.92 2.62a1 1 0 0 0-.54-.54A1 1 0 0 0 21 2h-4a1 1 0 0 0 0 2h1.59l-5.8 5.79a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L20 5.41V7a1 1 0 0 0 2 0V3a1 1 0 0 0-.08-.38Z" class="astro-vjux6bgf"></path> </symbol> <symbol id="starlight-image-zoom-icon-unzoom" viewBox="0 0 24 24" class="astro-vjux6bgf"> <path d="M21.71 2.29a1 1 0 0 0-1.42 0l-5.79 5.8V6.5a1 1 0 0 0-2 0v4a1 1 0 0 0 .08.38 1 1 0 0 0 .54.54 1 1 0 0 0 .38.08h4a1 1 0 0 0 0-2h-1.59l5.8-5.79a1 1 0 0 0 0-1.42ZM10.88 12.58a1 1 0 0 0-.38-.08h-4a1 1 0 0 0 0 2h1.59l-5.8 5.79a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l5.79-5.8v1.59a1 1 0 0 0 2 0v-4a1 1 0 0 0-.08-.38 1 1 0 0 0-.54-.54Z" class="astro-vjux6bgf"></path> </symbol> </svg> ` })}   `;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/starlight-image-zoom/components/ImageZoom.astro", void 0);

const $$Astro$i = createAstro();
const $$MarkdownContent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$MarkdownContent;
  return renderTemplate`${renderComponent($$result, "ImageZoom", $$ImageZoom, {})} ${renderComponent($$result, "StarlightMarkdownContent", $$MarkdownContent$1, { ...Astro2.props }, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })}`;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/starlight-image-zoom/overrides/MarkdownContent.astro", void 0);

const $$Astro$h = createAstro();
const $$MobileMenuToggle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$MobileMenuToggle;
  return renderTemplate`${renderComponent($$result, "starlight-menu-button", "starlight-menu-button", { "class": "astro-jif73yzw" }, { "default": () => renderTemplate` ${maybeRenderHead()}<button aria-expanded="false"${addAttribute(Astro2.locals.t("menuButton.accessibleLabel"), "aria-label")} aria-controls="starlight__sidebar" class="sl-flex md:sl-hidden astro-jif73yzw"> ${renderComponent($$result, "Icon", $$Icon, { "name": "bars", "class": "astro-jif73yzw" })} </button> ` })}   `;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/MobileMenuToggle.astro", void 0);

const $$Astro$g = createAstro();
const $$PageFrame = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$PageFrame;
  const { hasSidebar } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="page sl-flex astro-vrdttmbt"> <header class="header astro-vrdttmbt">${renderSlot($$result, $$slots["header"])}</header> ${hasSidebar && renderTemplate`<nav class="sidebar astro-vrdttmbt"${addAttribute(Astro2.locals.t("sidebarNav.accessibleLabel"), "aria-label")}> ${renderComponent($$result, "MobileMenuToggle", $$MobileMenuToggle, { ...Astro2.props, "class": "astro-vrdttmbt" })} <div id="starlight__sidebar" class="sidebar-pane astro-vrdttmbt"> <div class="sidebar-content sl-flex astro-vrdttmbt"> ${renderSlot($$result, $$slots["sidebar"])} </div> </div> </nav>`} <div class="main-frame astro-vrdttmbt">${renderSlot($$result, $$slots["default"])}</div> </div> `;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/PageFrame.astro", void 0);

const $$Astro$f = createAstro();
const $$CustomPageFrame = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$CustomPageFrame;
  const isHomePage = Astro2.url.pathname === "/";
  return renderTemplate`${isHomePage ? renderTemplate`${maybeRenderHead()}<div class="page sl-flex"><div class="content-panel"><div class="sl-container"><main data-pagefind-body class="sl-markdown-content">${renderSlot($$result, $$slots["default"])}</main></div></div></div>
        <style>
            body{
                margin: 0;
            }
            .content-panel {
                width: 100%;
                padding: 0;
            }
            .logo{
                display: flex;
                justify-content: center;
            }
            main{
                padding: 0;
                height: 100vh;
            }
            footer{
                display: none!important;
            }
            .sl-markdown-content{
                margin:0;
                padding:0;
            }
            .sl-container{
                width: 100%;
                max-width: none;
            }
        </style>` : renderTemplate`${renderComponent($$result, "DefaultPageFrame", $$PageFrame, { ...Astro2.props }, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}`, "header": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["header"])}`, "sidebar": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["sidebar"])}` })}`}`;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/src/components/CustomPageFrame.astro", void 0);

const $$Astro$e = createAstro();
const $$TableOfContentsList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$TableOfContentsList;
  const { toc, isMobile = false, depth = 0 } = Astro2.props;
  const $$definedVars = defineStyleVars([{ depth }]);
  return renderTemplate`${maybeRenderHead()}<ul${addAttribute([{ isMobile }, "astro-g2bywc46"], "class:list")}${addAttribute($$definedVars, "style")}> ${toc.map((heading) => renderTemplate`<li class="astro-g2bywc46"${addAttribute($$definedVars, "style")}> <a${addAttribute("#" + heading.slug, "href")} class="astro-g2bywc46"${addAttribute($$definedVars, "style")}> <span class="astro-g2bywc46"${addAttribute($$definedVars, "style")}>${heading.text}</span> </a> ${heading.children.length > 0 && renderTemplate`${renderComponent($$result, "Astro.self", Astro2.self, { "toc": heading.children, "depth": depth + 1, "isMobile": isMobile, "class": "astro-g2bywc46" })}`} </li>`)} </ul> `;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/TableOfContents/TableOfContentsList.astro", void 0);

const $$Astro$d = createAstro();
const $$MobileTableOfContents = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$MobileTableOfContents;
  const { toc } = Astro2.props;
  return renderTemplate`${toc && renderTemplate`${renderComponent($$result, "mobile-starlight-toc", "mobile-starlight-toc", { "data-min-h": toc.minHeadingLevel, "data-max-h": toc.maxHeadingLevel, "class": "astro-doynk5tl" }, { "default": () => renderTemplate`${maybeRenderHead()}<nav aria-labelledby="starlight__on-this-page--mobile" class="astro-doynk5tl"><details id="starlight__mobile-toc" class="astro-doynk5tl"><summary id="starlight__on-this-page--mobile" class="sl-flex astro-doynk5tl"><div class="toggle sl-flex astro-doynk5tl">${Astro2.locals.t("tableOfContents.onThisPage")}${renderComponent($$result, "Icon", $$Icon, { "name": "right-caret", "class": "caret astro-doynk5tl", "size": "1rem" })}</div><span class="display-current astro-doynk5tl"></span></summary><div class="dropdown astro-doynk5tl">${renderComponent($$result, "TableOfContentsList", $$TableOfContentsList, { "toc": toc.items, "isMobile": true, "class": "astro-doynk5tl" })}</div></details></nav>` })}`}`;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/MobileTableOfContents.astro", void 0);

const $$Astro$c = createAstro();
const $$TableOfContents = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$TableOfContents;
  const { toc } = Astro2.props;
  return renderTemplate`${toc && renderTemplate`${renderComponent($$result, "starlight-toc", "starlight-toc", { "data-min-h": toc.minHeadingLevel, "data-max-h": toc.maxHeadingLevel }, { "default": () => renderTemplate`${maybeRenderHead()}<nav aria-labelledby="starlight__on-this-page"><h2 id="starlight__on-this-page">${Astro2.locals.t("tableOfContents.onThisPage")}</h2>${renderComponent($$result, "TableOfContentsList", $$TableOfContentsList, { "toc": toc.items })}</nav>` })}`}`;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/TableOfContents.astro", void 0);

const $$Astro$b = createAstro();
const $$PageSidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$PageSidebar;
  return renderTemplate`${Astro2.props.toc && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "class": "astro-pb3aqygn" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="lg:sl-hidden astro-pb3aqygn">${renderComponent($$result2, "MobileTableOfContents", $$MobileTableOfContents, { ...Astro2.props, "class": "astro-pb3aqygn" })}</div><div class="right-sidebar-panel sl-hidden lg:sl-block astro-pb3aqygn"><div class="sl-container astro-pb3aqygn">${renderComponent($$result2, "TableOfContents", $$TableOfContents, { ...Astro2.props, "class": "astro-pb3aqygn" })}</div></div>` })}`}`;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/PageSidebar.astro", void 0);

const $$Astro$a = createAstro();
const $$PageTitle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$PageTitle;
  return renderTemplate`${maybeRenderHead()}<h1${addAttribute(PAGE_TITLE_ID, "id")} class="astro-j6tvhyss">${Astro2.props.entry.data.title}</h1> `;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/PageTitle.astro", void 0);

const $$Astro$9 = createAstro();
const $$MobileMenuFooter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$MobileMenuFooter;
  return renderTemplate`${maybeRenderHead()}<div class="mobile-preferences sl-flex astro-wu23bvmt"> <div class="sl-flex social-icons astro-wu23bvmt"> ${renderComponent($$result, "SocialIcons", $$SocialIcons, { ...Astro2.props, "class": "astro-wu23bvmt" })} </div> ${renderComponent($$result, "ThemeSelect", $$ThemeSelect, { ...Astro2.props, "class": "astro-wu23bvmt" })} ${renderComponent($$result, "LanguageSelect", $$LanguageSelect, { ...Astro2.props, "class": "astro-wu23bvmt" })} </div> `;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/MobileMenuFooter.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$8 = createAstro();
const $$SidebarPersister = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$SidebarPersister;
  const hash = getSidebarHash(Astro2.props.sidebar);
  return renderTemplate`${renderComponent($$result, "sl-sidebar-state-persist", "sl-sidebar-state-persist", { "data-hash": hash, "class": "astro-kku4brbg" }, { "default": () => renderTemplate(_a$1 || (_a$1 = __template$1([" <script>\n		(() => {\n			try {\n				if (!matchMedia('(min-width: 50em)').matches) return;\n				/** @type {HTMLElement | null} */\n				const target = document.querySelector('sl-sidebar-state-persist');\n				const state = JSON.parse(sessionStorage.getItem('sl-sidebar-state') || '0');\n				if (!target || !state || target.dataset.hash !== state.hash) return;\n				window._starlightScrollRestore = state.scroll;\n				customElements.define(\n					'sl-sidebar-restore',\n					class SidebarRestore extends HTMLElement {\n						connectedCallback() {\n							try {\n								const idx = parseInt(this.dataset.index || '');\n								const details = this.closest('details');\n								if (details && typeof state.open[idx] === 'boolean') details.open = state.open[idx];\n							} catch {}\n						}\n					}\n				);\n			} catch {}\n		})();\n	<\/script> ", " <script>\n		(() => {\n			const scroller = document.getElementById('starlight__sidebar');\n			if (!window._starlightScrollRestore || !scroller) return;\n			scroller.scrollTop = window._starlightScrollRestore;\n			delete window._starlightScrollRestore;\n		})();\n	<\/script> "])), renderSlot($$result, $$slots["default"])) })} `;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/SidebarPersister.astro", void 0);

const $$Astro$7 = createAstro();
const $$SidebarRestorePoint = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$SidebarRestorePoint;
  const currentGroupIndexSymbol = Symbol.for("starlight-sidebar-group-index");
  const locals = Astro2.locals;
  const index = locals[currentGroupIndexSymbol] || 0;
  locals[currentGroupIndexSymbol] = index + 1;
  return renderTemplate`${renderComponent($$result, "sl-sidebar-restore", "sl-sidebar-restore", { "data-index": index })}`;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/SidebarRestorePoint.astro", void 0);

const $$Astro$6 = createAstro();
const $$SidebarSublist = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$SidebarSublist;
  const { sublist, nested } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<ul${addAttribute([{ "top-level": !nested }, "astro-3ii7xxms"], "class:list")}> ${sublist.map((entry) => renderTemplate`<li class="astro-3ii7xxms"> ${entry.type === "link" ? renderTemplate`<a${addAttribute(entry.href, "href")}${addAttribute(entry.isCurrent && "page", "aria-current")}${addAttribute([[{ large: !nested }, entry.attrs.class], "astro-3ii7xxms"], "class:list")}${spreadAttributes(entry.attrs)}> <span class="astro-3ii7xxms">${entry.label}</span> ${entry.badge && renderTemplate`${renderComponent($$result, "Badge", $$Badge, { "variant": entry.badge.variant, "class": (entry.badge.class ?? "") + " astro-3ii7xxms", "text": entry.badge.text })}`} </a>` : renderTemplate`<details${addAttribute(flattenSidebar(entry.entries).some((i) => i.isCurrent) || !entry.collapsed, "open")} class="astro-3ii7xxms"> ${renderComponent($$result, "SidebarRestorePoint", $$SidebarRestorePoint, { "class": "astro-3ii7xxms" })} <summary class="astro-3ii7xxms"> <div class="group-label astro-3ii7xxms"> <span class="large astro-3ii7xxms">${entry.label}</span> ${entry.badge && renderTemplate`${renderComponent($$result, "Badge", $$Badge, { "variant": entry.badge.variant, "class": (entry.badge.class ?? "") + " astro-3ii7xxms", "text": entry.badge.text })}`} </div> ${renderComponent($$result, "Icon", $$Icon, { "name": "right-caret", "class": "caret astro-3ii7xxms", "size": "1.25rem" })} </summary> ${renderComponent($$result, "Astro.self", Astro2.self, { "sublist": entry.entries, "nested": true, "class": "astro-3ii7xxms" })} </details>`} </li>`)} </ul> `;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/SidebarSublist.astro", void 0);

const $$Astro$5 = createAstro();
const $$Sidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Sidebar;
  const { sidebar } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "SidebarPersister", $$SidebarPersister, { ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SidebarSublist", $$SidebarSublist, { "sublist": sidebar })} ` })} ${maybeRenderHead()}<div class="md:sl-hidden"> ${renderComponent($$result, "MobileMenuFooter", $$MobileMenuFooter, { ...Astro2.props })} </div>`;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/Sidebar.astro", void 0);

const $$Astro$4 = createAstro();
const $$CustomSidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$CustomSidebar;
  return renderTemplate`${maybeRenderHead()}<div class="custom-sidebar"> <!-- Render the default sidebar content --> <!-- @ts-ignore --> ${renderComponent($$result, "DefaultSidebar", $$Sidebar, { ...Astro2.props })} <!-- Your fixed link at the bottom --> <div class="fixed-link-container"> <a id="dynamic-typeform-link" href="https://www.research.net/r/rubugreport?section_name=[section_name_value]&course_title=[course_title_value]" class="fixed-link" target="_blank"> <p>Report a Bug</p> ${renderComponent($$result, "Icon", $$Icon, { "class": "link-icon", "name": "right-arrow" })} </a> </div> </div> `;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/src/components/CustomSidebar.astro", void 0);

const $$Astro$3 = createAstro();
const $$SkipLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$SkipLink;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`#${PAGE_TITLE_ID}`, "href")} class="astro-7q3lir66">${Astro2.locals.t("skipLink.label")}</a> `;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/SkipLink.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$ThemeProvider = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["<script>\n	window.StarlightThemeProvider = (() => {\n		const storedTheme =\n			typeof localStorage !== 'undefined' && localStorage.getItem('starlight-theme');\n		const theme =\n			storedTheme ||\n			(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');\n		document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark';\n		return {\n			updatePickers(theme = storedTheme || 'auto') {\n				document.querySelectorAll('starlight-theme-select').forEach((picker) => {\n					const select = picker.querySelector('select');\n					if (select) select.value = theme;\n					/** @type {HTMLTemplateElement | null} */\n					const tmpl = document.querySelector(`#theme-icons`);\n					const newIcon = tmpl && tmpl.content.querySelector('.' + theme);\n					if (newIcon) {\n						const oldIcon = picker.querySelector('svg.label-icon');\n						if (oldIcon) {\n							oldIcon.replaceChildren(...newIcon.cloneNode(true).childNodes);\n						}\n					}\n				});\n			},\n		};\n	})();\n<\/script><template id=\"theme-icons\">", "", "", "</template>"], ["<script>\n	window.StarlightThemeProvider = (() => {\n		const storedTheme =\n			typeof localStorage !== 'undefined' && localStorage.getItem('starlight-theme');\n		const theme =\n			storedTheme ||\n			(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');\n		document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark';\n		return {\n			updatePickers(theme = storedTheme || 'auto') {\n				document.querySelectorAll('starlight-theme-select').forEach((picker) => {\n					const select = picker.querySelector('select');\n					if (select) select.value = theme;\n					/** @type {HTMLTemplateElement | null} */\n					const tmpl = document.querySelector(\\`#theme-icons\\`);\n					const newIcon = tmpl && tmpl.content.querySelector('.' + theme);\n					if (newIcon) {\n						const oldIcon = picker.querySelector('svg.label-icon');\n						if (oldIcon) {\n							oldIcon.replaceChildren(...newIcon.cloneNode(true).childNodes);\n						}\n					}\n				});\n			},\n		};\n	})();\n<\/script><template id=\"theme-icons\">", "", "", "</template>"])), renderComponent($$result, "Icon", $$Icon, { "name": "sun", "class": "light" }), renderComponent($$result, "Icon", $$Icon, { "name": "moon", "class": "dark" }), renderComponent($$result, "Icon", $$Icon, { "name": "laptop", "class": "auto" }));
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/ThemeProvider.astro", void 0);

const $$Astro$2 = createAstro();
const $$TwoColumnContent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$TwoColumnContent;
  return renderTemplate`${maybeRenderHead()}<div class="lg:sl-flex astro-67yu43on"> ${Astro2.props.toc && renderTemplate`<aside class="right-sidebar-container astro-67yu43on"> <div class="right-sidebar astro-67yu43on"> ${renderSlot($$result, $$slots["right-sidebar"])} </div> </aside>`} <div class="main-pane astro-67yu43on">${renderSlot($$result, $$slots["default"])}</div> </div> `;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/TwoColumnContent.astro", void 0);

const $$Astro$1 = createAstro();
const $$Page = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Page;
  const pagefindEnabled = Astro2.props.entry.slug !== "404" && !Astro2.props.entry.slug.endsWith("/404") && Astro2.props.entry.data.pagefind !== false;
  return renderTemplate`<html${addAttribute(Astro2.props.lang, "lang")}${addAttribute(Astro2.props.dir, "dir")}${addAttribute(Boolean(Astro2.props.toc), "data-has-toc")}${addAttribute(Astro2.props.hasSidebar, "data-has-sidebar")}${addAttribute(Boolean(Astro2.props.entry.data.hero), "data-has-hero")} data-theme="dark" class="astro-bguv2lll"> <head>${renderComponent($$result, "Head", $$Head, { ...Astro2.props, "class": "astro-bguv2lll" })}${renderComponent($$result, "ThemeProvider", $$ThemeProvider, { ...Astro2.props, "class": "astro-bguv2lll" })}${renderHead()}</head> <body class="astro-bguv2lll"> ${renderComponent($$result, "SkipLink", $$SkipLink, { ...Astro2.props, "class": "astro-bguv2lll" })} ${renderComponent($$result, "PageFrame", $$CustomPageFrame, { ...Astro2.props, "class": "astro-bguv2lll" }, { "default": ($$result2) => renderTemplate`   ${renderComponent($$result2, "TwoColumnContent", $$TwoColumnContent, { ...Astro2.props, "class": "astro-bguv2lll" }, { "default": ($$result3) => renderTemplate`  <main${addAttribute(pagefindEnabled, "data-pagefind-body")}${addAttribute(Astro2.props.entryMeta.lang, "lang")}${addAttribute(Astro2.props.entryMeta.dir, "dir")} class="astro-bguv2lll">  ${renderComponent($$result3, "Banner", $$Banner, { ...Astro2.props, "class": "astro-bguv2lll" })} ${Astro2.props.entry.data.hero ? renderTemplate`${renderComponent($$result3, "ContentPanel", $$ContentPanel, { ...Astro2.props, "class": "astro-bguv2lll" }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Hero", $$CustomHero, { ...Astro2.props, "class": "astro-bguv2lll" })} ${renderComponent($$result4, "MarkdownContent", $$MarkdownContent, { ...Astro2.props, "class": "astro-bguv2lll" }, { "default": ($$result5) => renderTemplate` ${renderSlot($$result5, $$slots["default"])} ` })} ${renderComponent($$result4, "Footer", $$Footer, { ...Astro2.props, "class": "astro-bguv2lll" })} ` })}` : renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "class": "astro-bguv2lll" }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "ContentPanel", $$ContentPanel, { ...Astro2.props, "class": "astro-bguv2lll" }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "PageTitle", $$PageTitle, { ...Astro2.props, "class": "astro-bguv2lll" })} ${Astro2.props.entry.data.draft && renderTemplate`${renderComponent($$result5, "DraftContentNotice", $$DraftContentNotice, { ...Astro2.props, "class": "astro-bguv2lll" })}`}${Astro2.props.isFallback && renderTemplate`${renderComponent($$result5, "FallbackContentNotice", $$FallbackContentNotice, { ...Astro2.props, "class": "astro-bguv2lll" })}`}` })} ${renderComponent($$result4, "ContentPanel", $$ContentPanel, { ...Astro2.props, "class": "astro-bguv2lll" }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "MarkdownContent", $$MarkdownContent, { ...Astro2.props, "class": "astro-bguv2lll" }, { "default": ($$result6) => renderTemplate` ${renderSlot($$result6, $$slots["default"])} ` })} ${renderComponent($$result5, "Footer", $$Footer, { ...Astro2.props, "class": "astro-bguv2lll" })} ` })} ` })}`} </main> `, "right-sidebar": ($$result3) => renderTemplate`${renderComponent($$result3, "PageSidebar", $$PageSidebar, { "slot": "right-sidebar", ...Astro2.props, "class": "astro-bguv2lll" })}` })} `, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Header", $$Header, { "slot": "header", ...Astro2.props, "class": "astro-bguv2lll" })}`, "sidebar": ($$result2) => renderTemplate`${Astro2.props.hasSidebar && renderTemplate`${renderComponent($$result2, "Sidebar", $$CustomSidebar, { "slot": "sidebar", ...Astro2.props, "class": "astro-bguv2lll" })}`}` })} </body></html>`;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/components/Page.astro", void 0);

const $$Astro = createAstro();
const $$Common = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Common;
  const { route } = Astro2.props;
  const { Content, headings } = await route.entry.render();
  const routeData = generateRouteData({ props: { ...route, headings }, url: Astro2.url });
  return renderTemplate`${renderComponent($$result, "Page", $$Page, { ...routeData }, { "default": async ($$result2) => renderTemplate`${renderComponent($$result2, "Content", Content, { "frontmatter": route.entry.data })}` })}`;
}, "/Users/nitin.kanukolanu/workspace/lab-contexteng/node_modules/@astrojs/starlight/routes/common.astro", void 0);

export { $$Common as $, paths as p, slugToLocale$1 as s };
