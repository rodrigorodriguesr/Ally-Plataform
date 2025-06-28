 // Configuração do Firebase (mantida igual)
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

    // Função de redirecionamento à prova de erros
    function redirectToIndex() {
        // Método 1: Usando base URL dinâmica
        const baseUrl = window.location.origin;
        
        // Método 2: Alternativa para servidores locais
        const fallbackUrl = window.location.href.split('/views/auth/')[0] + '/index.html';
        
        // Tenta redirecionar com verificação
        fetch(baseUrl + '/index.html')
            .then(response => {
                if (response.ok) {
                    window.location.href = baseUrl + '/index.html';
                } else {
                    window.location.href = fallbackUrl;
                }
            })
            .catch(() => {
                window.location.href = fallbackUrl;
            });
    }

    // Login com Google
    document.getElementById('googleLogin').addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then(() => {
                redirectToIndex();
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
                redirectToIndex();
            })
            .catch((error) => {
                alert("Erro ao fazer login: " + error.message);
            });
    });

    // Verificação de autenticação
    auth.onAuthStateChanged((user) => {
        if (user) {
            redirectToIndex();
        }
    });

    // Debug: Verifica caminhos disponíveis
    console.log('Caminhos disponíveis:', {
        'window.location.origin': window.location.origin,
        'window.location.href': window.location.href,
        'Fallback URL': window.location.href.split('/views/auth/')[0] + '/index.html'
    });