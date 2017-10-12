const add = (a, b) => {
  return a + b;
};

const app = document.createElement('div');
app.id = 'my_fancy_app';
document.documentElement.appendChild(app);
document.querySelector('#' + app.id).textContent = add(1, 3);
