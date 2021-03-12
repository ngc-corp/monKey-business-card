
import '../scss/main.scss';
import ClipboardJS from 'clipboard';

function initCard() {

  const accountLink = document.querySelector('.card__banano-account-link') as HTMLElement;
  const clipboard = new ClipboardJS(accountLink);

  // @ts-ignore
  clipboard.on('success', () => {

    const infoOverlay = document.querySelector('.card__info');

    infoOverlay?.classList.add('card__info--active');

    window.setTimeout(() => {

      infoOverlay?.classList.remove('card__info--active');
    }, 1000);
  });
}

function initForm(elementForm: HTMLFormElement) {

  elementForm.addEventListener('submit', (e: Event) => {

    e.preventDefault();

    const input = document.getElementById('ban-address') as HTMLInputElement;
    const value = input.value;

    window.location.href = value;
  });
}

function initMenu(elementMenu: HTMLElement) {

  const elementMenuTriggers = document.querySelectorAll('.menu-trigger');

  elementMenu.removeAttribute('style');

  elementMenuTriggers.forEach(elementTrigger => {

    elementTrigger.addEventListener('click', () => {

      elementMenu.classList.toggle('menu--hidden');
    });
  });
}

function init() {

  console.info('Welcome to MonKey Business Card.');
  console.info('Source code is available at https://github.com/ngc-corp/monKey-business-card');

  console.info('If you like MonKey Business Card, consider donating:');
  console.info('Banano - ban_3jcr7qrykbtyu8x6fik1tq7o77pstnwo7hmsqoswjzzwky5hjo4ofgza657y');
  console.info('Nano - nano_3paye3hdp1ik7baic3916c9sk9foyq4fa46abcgc1fem599qno3rjn1cb4fs');

  const elementForm = document.querySelector('.form') as HTMLFormElement;
  const elementCard = document.querySelector('.card');
  const elementMenu = document.querySelector('.menu') as HTMLDivElement;

  elementForm && initForm(elementForm);
  elementCard && initCard();
  elementMenu && initMenu(elementMenu);
}

window.addEventListener('DOMContentLoaded', init);
