const worker = new Worker('./worker.js');

const app = document.getElementById('app');
const start = Date.now();

document.addEventListener('DOMContentLoaded', function() {
  const span = app.querySelector('.spinner');
  setInterval(() => {
    switch (span.textContent) {
      case '':
        span.textContent = '.';
        break;
      case '.':
        span.textContent = '..';
        break;
      case '..':
        span.textContent = '...';
        break;
      case '...':
        span.textContent = '';
        break;
    }
  }, 275);
});

worker.addEventListener('message', ({ data: action }) => {
  console.log('hi');
  switch (action.type) {
    case 'LOGGED_IN_USER': {
      const now = Date.now();
      const boot = new Event('boot');
      if (now - start < 2200) {
        setTimeout(() => {
          document.dispatchEvent(boot);
        }, 2200 - (now - start));
      } else {
        document.dispatchEvent(boot);
      }

      document.addEventListener('boot', async () => {
        app.classList.remove('loading');
        const header = document.getElementById('template-header');

        while (app.firstChild) {
          app.removeChild(app.firstChild);
        }

        app.appendChild(header.content.cloneNode(true));
      });
      break;
    }
    case 'NO_USER': {
      window.location = '/';
      return;
    }
    default:
      console.info(`No case for type ${action.type} with data: ${JSON.stringify(action)}`);
      return;
  }
});
// import { auth } from './firebase';

// document.addEventListener('DOMContentLoaded', function() {

//   auth.onAuthStateChanged(function(currentUser) {
//     if (currentUser) {
//       setTimeout(() => {
//         app.classList.remove('loading');
//         const header = document.getElementById('template-header');

//         while (app.firstChild) {
//           app.removeChild(app.firstChild);
//         }

//         app.appendChild(header.content.cloneNode(true));

//         document.addEventListener('click', e => {
//           if (!e.target.matches('.js-menu-trigger') && !e.target.parentElement.matches('.js-menu-trigger')) return;

//           e.preventDefault();

//           const target = e.target.matches('.js-menu-trigger') ? e.target : e.target.parentElement;
//           const next = target.nextElementSibling;
//           if (!next.matches('.js-menu')) return;

//           if (next.style.display === 'none') {
//             target.classList.add('open');
//             next.style.display = 'block';
//             function close() {
//               target.classList.remove('open');
//               next.style.display = 'none';
//               document.removeEventListener('click', close);
//             }

//             document.addEventListener('click', close);
//           }
//         });

//         document.addEventListener('mousedown', evt => {
//           console.log('mousedown:', evt.target);
//           if (!evt.target.matches('.draggable') && !evt.target.parentElement.matches('.draggable')) return;

//           const target = evt.target.matches('.draggable') ? evt.target : evt.target.parent;
//           console.log('mousedown:', evt.target);
//         });

//         const openMenu = document.getElementById('open-previous');

//         openMenu.addEventListener('click', () => {
//           const template = document.getElementById('template-open');
//           app.appendChild(template.content.cloneNode(true));
//         });
//       }, 2200);
//     } else {
//       window.location = '/';
//     }
//   });
// });
