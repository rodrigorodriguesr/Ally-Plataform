document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    logar();
  });
  
  function logar() {
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    if(login === "admin" && senha === "password") {
      alert('Logado com sucesso!');
      window.location.href = "../app.html";
    } else {
      alert('Usuário ou senha incorretos');
    }
  }
  
  // Adicione aqui outros event listeners ou funções conforme necessário
});