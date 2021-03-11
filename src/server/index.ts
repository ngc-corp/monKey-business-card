
import { Application, Router, send } from './deps.ts';
import { renderFile, configure } from './deps.ts';
import { mixins } from './deps.ts';
import { qrcode } from './deps.ts';
import { nanoAddressValidator } from './deps.ts';

const router = new Router();
const templatePath = `${Deno.cwd()}/src/server/templates/`;

configure({
  views: templatePath,
  plugins: [mixins()],
});

router
  .get('/', async (context, next) => {

    await next();

    const rendered = await renderFile('index.eta', {}, {cache: false});

    context.response.body = rendered as string;
  })
  .get('/:bananoAddress', async (context, next) => {

    await next();

    const bananoAddress = context.params.bananoAddress;

    if (typeof bananoAddress === 'string' && nanoAddressValidator(bananoAddress, 'ban')) {

      const qrCodeBase64 = await qrcode(bananoAddress, {
        size: 256 * 2,
      });
      const monKeySrc = `https://monkey.banano.cc/api/v1/monkey/${bananoAddress}`;
      const explorerLinkHref = `https://creeper.banano.cc/explorer/account/${bananoAddress}`;
      const rendered = await renderFile('card.eta', {
        bananoAddress,
        explorerLinkHref,
        metaDescription: `My personal BANANO monKey business card: ${bananoAddress}`,
        metaTitle: 'My personal BANANO monKey business card',
        monKeySrc,
        qrCodeBase64,
      }, {cache: false});

      context.response.body = rendered as string;

    } else {

      const rendered = await renderFile('index.eta', {
        metaDescription: 'Share your personal BANANO monKey business card',
        metaTitle: 'Share your personal BANANO monKey business card',
        errors: {
          invalidBananoAddress: true,
        }
      }, {cache: false});

      context.response.body = rendered as string;
    }
  });

const app = new Application();

app.use(async (context, next) => {

  if (context.request.url.pathname.search(/(.css|.js|.png|.xml|.ico|.svg|.txt|.webmanifest)/g) !== -1) {

    await send(context, context.request.url.pathname, {
      root: `${Deno.cwd()}/src/server/`,
    });
  }

  await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 1993 });
