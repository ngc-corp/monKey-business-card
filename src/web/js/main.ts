
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

function init() {

  console.info('Welcome to Banano Card.');
  console.info('Source code available at https://github.com/ngc-corp/banano-card');

  console.info('If you like BANANO MonKey business card, consider donating:');
  console.info('Banano - ban_3jcr7qrykbtyu8x6fik1tq7o77pstnwo7hmsqoswjzzwky5hjo4ofgza657y');
  console.info('Nano - nano_3paye3hdp1ik7baic3916c9sk9foyq4fa46abcgc1fem599qno3rjn1cb4fs');

  const elementForm = document.querySelector('.form') as HTMLFormElement;
  const elementCard = document.querySelector('.card');

  if (elementForm) {

    initForm(elementForm);
  }

  if (elementCard) {

    initCard();
  }
}

window.addEventListener('DOMContentLoaded', init);
