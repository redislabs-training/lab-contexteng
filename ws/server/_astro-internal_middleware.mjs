import 'es-module-lexer';
import './chunks/astro-designed-error-pages_D7hLETjl.mjs';
import '@astrojs/internal-helpers/path';
import 'cookie';
import { d as defineMiddleware, s as sequence } from './chunks/index_ClWKr5tt.mjs';
import { u as useTranslations } from './chunks/translations_B0xw4BXP.mjs';

const onRequest$1 = defineMiddleware((context, next) => {
  context.locals.t = useTranslations(context.currentLocale);
  return next();
});

const onRequest = sequence(
	onRequest$1,
	
	
);

export { onRequest };
