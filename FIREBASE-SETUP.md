# Configuração da sincronização Google (Firebase)

O site já tem a integração preparada. Para ativar o login e a sincronização entre dispositivos, faça esta configuração única na sua conta Google:

1. Abra https://console.firebase.google.com/ e crie um projeto (pode chamar **ENEM 2027**).
2. Em **Authentication > Sign-in method**, habilite **Google** e escolha um e-mail de suporte.
3. Em **Authentication > Settings > Authorized domains**, adicione `joaovictoraredes.github.io`.
4. Em **Firestore Database**, crie o banco de dados. Depois abra **Rules**, substitua as regras pelas do arquivo `firestore.rules` deste repositório e publique.
5. Em **Configurações do projeto > Geral > Seus apps**, crie um app Web (`</>`). Copie a configuração exibida.
6. Edite `firebase-config.js` no GitHub e substitua os valores de exemplo pelos valores reais do app Web. Não publique senhas ou chaves privadas de contas de serviço.
7. Aguarde o GitHub Pages publicar. Abra o site, toque em **Entrar com Google** e autorize sua conta.

Na primeira entrada, as marcações locais existentes são importadas para a nuvem. Depois, o checklist é associado ao UID da conta Google e sincronizado entre dispositivos.

**Privacidade:** as regras do Firestore limitam a leitura e escrita do documento ao próprio usuário autenticado. A configuração web do Firebase contém identificadores públicos do projeto; a proteção não depende de esconder a apiKey, e sim das regras de segurança e da autenticação.
