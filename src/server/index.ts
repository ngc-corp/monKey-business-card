
import { Application, Router, send } from './deps.ts';
import { renderFile, configure } from './deps.ts';
import { mixins } from './deps.ts';
import { getQrCode } from './qrcode.ts';
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

    const rendered = await renderFile('index.eta', {
      metaDescription: 'BANANO MonKey business card',
      metaTitle: 'Share your personal BANANO MonKey business card',
      errors: {},
    }, {cache: false});

    context.response.body = rendered as string;
  })
  .get('/:bananoAddress', async (context, next) => {

    await next();

    const bananoAddress = context.params.bananoAddress;

    if (typeof bananoAddress === 'string' && nanoAddressValidator(bananoAddress, 'ban')) {

      const qrCodeSVG = await getQrCode(bananoAddress, `QR code for BANANO address ${bananoAddress}`, undefined, {
        size: 256 * 2,
      });
      const monKeySrc = `https://monkey.banano.cc/api/v1/monkey/${bananoAddress}`;
      const metaImage = `https://monkey.banano.cc/api/v1/monkey/${bananoAddress}?format=png&size=512&background=true`;
      const explorerLinkHref = `https://creeper.banano.cc/explorer/account/${bananoAddress}`;
      const rendered = await renderFile('card.eta', {
        bananoAddress,
        explorerLinkHref,
        metaDescription: bananoAddress,
        metaTitle: 'BANANO MonKey business card',
        metaImage,
        monKeySrc,
        qrCodeSVG,
      }, {cache: false});

      context.response.body = rendered as string;

    } else {

      const rendered = await renderFile('index.eta', {
        metaDescription: 'BANANO MonKey business card',
        metaTitle: 'Share your personal BANANO MonKey business card',
        errors: {
          invalidBananoAddress: true,
        },
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
