import compileTemplate from './components/button/button.pug';

const app = document.getElementById('app');
app.innerHTML = compileTemplate({ style: 'error', title: 'awesome', type: 'submit' });
