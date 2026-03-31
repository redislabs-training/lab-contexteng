import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import './chunks/astro-designed-error-pages_D7hLETjl.mjs';
import 'es-module-lexer';
import { k as decodeKey } from './chunks/astro/server_DKLinKq0.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_CHdgJZzY.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/david.patlut/Desktop/ce-redis-langchain/","adapterName":"@astrojs/node","routes":[{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","isIndex":false,"route":"/404","pattern":"^\\/404\\/$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/@astrojs/starlight/routes/static/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.7qqag-5g.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"always"}}}],"base":"/","trailingSlash":"always","compressHTML":true,"componentMetadata":[["/Users/david.patlut/Desktop/ce-redis-langchain/node_modules/@astrojs/starlight/routes/static/404.astro",{"propagation":"in-tree","containsHead":true}],["/Users/david.patlut/Desktop/ce-redis-langchain/node_modules/@astrojs/starlight/routes/static/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:node_modules/@astrojs/starlight/routes/static/404@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/node_modules/@astrojs/starlight/utils/routing.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:node_modules/@astrojs/starlight/routes/static/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/node_modules/@astrojs/starlight/utils/navigation.ts",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/node_modules/@astrojs/starlight/components/SidebarPersister.astro",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/node_modules/@astrojs/starlight/components/Sidebar.astro",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/src/components/CustomSidebar.astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:starlight/components/Sidebar",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/node_modules/@astrojs/starlight/components/Page.astro",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/node_modules/@astrojs/starlight/routes/common.astro",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/node_modules/@astrojs/starlight/components/SidebarSublist.astro",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/node_modules/@astrojs/starlight/utils/route-data.ts",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/node_modules/@astrojs/starlight/utils/translations.ts",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/node_modules/@astrojs/starlight/internal.ts",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro-expressive-code/preprocess-config",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/node_modules/astro-expressive-code/components/renderer.ts",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/node_modules/astro-expressive-code/components/Code.astro",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/node_modules/astro-expressive-code/components/index.ts",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/node_modules/@astrojs/starlight/components.ts",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/node_modules/@astrojs/starlight/components/Footer.astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:starlight/components/Footer",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/intro-ws/getting-started.mdx",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/intro-ws/getting-started.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/intro/getting-started.mdx",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/intro/getting-started.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/wrap-up-ws/finish-lab.mdx",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/wrap-up-ws/finish-lab.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/wrap-up/finish-lab.mdx",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/wrap-up/finish-lab.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/david.patlut/Desktop/ce-redis-langchain/node_modules/@astrojs/starlight/locals.ts",{"propagation":"in-tree","containsHead":false}],["\u0000astro-internal:middleware",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astro-page:node_modules/@astrojs/starlight/routes/static/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:node_modules/@astrojs/starlight/routes/static/index@_@astro":"pages/_---slug_.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","/Users/david.patlut/Desktop/ce-redis-langchain/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_lyxO8MRa.mjs","/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/index.mdx?astroContentCollectionEntry=true":"chunks/index_a6twojZt.mjs","/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/intro-ws/getting-started.mdx?astroContentCollectionEntry=true":"chunks/getting-started_TtMo7g5u.mjs","/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/intro-ws/welcome.mdx?astroContentCollectionEntry=true":"chunks/welcome_DP8578fK.mjs","/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/intro/getting-started.mdx?astroContentCollectionEntry=true":"chunks/getting-started_BDh2rTGX.mjs","/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/intro/welcome.mdx?astroContentCollectionEntry=true":"chunks/welcome_CRpTLbo2.mjs","/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/wrap-up-ws/finish-lab.mdx?astroContentCollectionEntry=true":"chunks/finish-lab_DD7sAbih.mjs","/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/wrap-up/finish-lab.mdx?astroContentCollectionEntry=true":"chunks/finish-lab_B4TdArs9.mjs","/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/index.mdx?astroPropagatedAssets":"chunks/index_xeezG1gC.mjs","/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/intro-ws/getting-started.mdx?astroPropagatedAssets":"chunks/getting-started_xSBgmGgp.mjs","/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/intro-ws/welcome.mdx?astroPropagatedAssets":"chunks/welcome_wY3_w8ji.mjs","/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/intro/getting-started.mdx?astroPropagatedAssets":"chunks/getting-started_BJuDtDW4.mjs","/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/intro/welcome.mdx?astroPropagatedAssets":"chunks/welcome_CIKzqz5Z.mjs","/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/wrap-up-ws/finish-lab.mdx?astroPropagatedAssets":"chunks/finish-lab_WBmFn5Uu.mjs","/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/wrap-up/finish-lab.mdx?astroPropagatedAssets":"chunks/finish-lab_f8q_rSPF.mjs","\u0000astro:asset-imports":"chunks/_astro_asset-imports_D9aVaOQr.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BcEe_9wP.mjs","\u0000virtual:astro-expressive-code/config":"chunks/config_nGrkLbg6.mjs","/Users/david.patlut/Desktop/ce-redis-langchain/node_modules/astro-expressive-code/dist/index.js":"chunks/index_DaVK51eC.mjs","\u0000virtual:astro-expressive-code/preprocess-config":"chunks/preprocess-config_CuZ9ZMiz.mjs","/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/index.mdx":"chunks/index_Je0NFHAe.mjs","/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/intro-ws/getting-started.mdx":"chunks/getting-started_BNxMHB9t.mjs","/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/intro-ws/welcome.mdx":"chunks/welcome_BUMnnBMC.mjs","/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/intro/getting-started.mdx":"chunks/getting-started_BOSToVx-.mjs","/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/intro/welcome.mdx":"chunks/welcome_B6cddMM1.mjs","/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/wrap-up-ws/finish-lab.mdx":"chunks/finish-lab_CRp9LNaF.mjs","/Users/david.patlut/Desktop/ce-redis-langchain/src/content/docs/wrap-up/finish-lab.mdx":"chunks/finish-lab_CZuCkFSZ.mjs","\u0000virtual:astro-expressive-code/ec-config":"chunks/ec-config_CzTTOeiV.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.BmLkHqE7.js","/Users/david.patlut/Desktop/ce-redis-langchain/node_modules/@astrojs/starlight/user-components/Tabs.astro?astro&type=script&index=0&lang.ts":"_astro/Tabs.astro_astro_type_script_index_0_lang.3nBd5krW.js","astro:scripts/page.js":"_astro/page.7qqag-5g.js","/Users/david.patlut/Desktop/ce-redis-langchain/node_modules/@pagefind/default-ui/npm_dist/mjs/ui-core.mjs":"_astro/ui-core.B4LL04gG.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/ec.j8ofn.css","/_astro/ec.8zarh.js","/_astro/redis_logo.BjLEL9H4.png","/_astro/index.8r_-pNdZ.css","/logo.svg","/fonts/TT_Trailers_Bold.woff","/images/ce-file-browser.png","/images/idle-ker.png","/images/restart.png","/images/running-ker.png","/images/toc-ce.png","/_astro/Tabs.astro_astro_type_script_index_0_lang.3nBd5krW.js","/_astro/hoisted.BmLkHqE7.js","/_astro/page.7qqag-5g.js","/_astro/ui-core.B4LL04gG.js","/_astro/page.7qqag-5g.js","/404.html"],"i18n":{"fallbackType":"redirect","strategy":"pathname-prefix-other-locales","locales":["en"],"defaultLocale":"en","domainLookupTable":{}},"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"7b3Ow45kwr01TdYFzwkwX3nW/qTVtzF7CqwkXe0N7SY=","experimentalEnvGetSecretEnabled":false});

export { manifest };
