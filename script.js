// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDzzoh1TYfxtX6JQydHxS5TJhtUXCHplMQ",
    authDomain: "ally-login-10cfe.firebaseapp.com",
    projectId: "ally-login-10cfe",
    storageBucket: "ally-login-10cfe.appspot.com",
    messagingSenderId: "618628672856",
    appId: "1:618628672856:web:93423586131812936f492d"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Função de redirecionamento para App.html
function redirectToApp() {
    // Caminho relativo garantido para App.html
    const appPath = './views/auth/App.html';
    
    // Verifica se o arquivo existe antes de redirecionar
    fetch(appPath)
        .then(response => {
            if (response.ok) {
                window.location.href = appPath;
            } else {
                console.error('App.html não encontrado no caminho:', appPath);
                alert('Página de destino não encontrada. Contate o suporte.');
            }
        })
        .catch(error => {
            console.error('Erro ao verificar App.html:', error);
            window.location.href = appPath; // Tenta mesmo assim
        });
}

// Login com Google
document.getElementById('googleLogin').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(() => {
            redirectToApp();
        })
        .catch((error) => {
            console.error("Erro no login:", error);
            alert("Erro ao fazer login com Google: " + error.message);
        });
});

// Login tradicional
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login').value;
    const password = document.getElementById('senha').value;
    
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            redirectToApp();
        })
        .catch((error) => {
            alert("Erro ao fazer login: " + error.message);
        });
});

// Verificação de autenticação
auth.onAuthStateChanged((user) => {
    if (user) {
        redirectToApp();
    }
});

// Debug: Verifica caminho do App.html
console.log('Caminho para App.html:', './views/auth/App.html');