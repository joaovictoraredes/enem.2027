/* Login Google e sincronização do checklist via Firebase Authentication + Cloud Firestore. */
(function(){
  const KEY='enem2027-progress-v1';
  let auth=null, db=null, currentUser=null, userRef=null, unsubscribe=null, onProgress=()=>{}, onUser=()=>{};
  const local=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch{return {}}};
  function showError(error){console.error('Firebase:',error);alert('Não foi possível conectar ao Firebase. Confira a configuração do projeto e as regras do Firestore. Detalhe: '+(error.message||error));}
  async function signIn(){if(!auth)return alert('Configure primeiro o firebase-config.js.');try{const provider=new firebase.auth.GoogleAuthProvider();await auth.signInWithPopup(provider)}catch(e){showError(e)}}
  async function signOut(){if(auth)try{await auth.signOut()}catch(e){showError(e)}}
  async function save(progress){if(!currentUser||!userRef)return;try{await userRef.set({progress:progress,updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true})}catch(e){showError(e)}}
  function init(callbacks){onProgress=callbacks.onProgress||onProgress;onUser=callbacks.onUser||onUser;
    const c=window.FIREBASE_CONFIG||{};
    if(!window.firebase||!c.apiKey||c.apiKey.startsWith('COLE_')||!c.projectId||c.projectId==='SEU-PROJETO'){
      console.info('Firebase ainda não configurado. O checklist continuará funcionando neste navegador.');return;
    }
    try{if(!firebase.apps.length)firebase.initializeApp(c);auth=firebase.auth();db=firebase.firestore();
      auth.onAuthStateChanged(async user=>{
        if(unsubscribe){unsubscribe();unsubscribe=null}currentUser=user;userRef=null;onUser(user||null);
        if(!user)return;
        userRef=db.collection('users').doc(user.uid);
        try{
          const snap=await userRef.get();const cloud=snap.exists?(snap.data().progress||{}):{};const localProgress=local();
          // Na primeira conexão, importa as marcações locais. Depois, os valores já existentes na nuvem prevalecem.
          const merged={...localProgress,...cloud};
          await userRef.set({progress:merged,updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});
          onProgress(merged);
          unsubscribe=userRef.onSnapshot(s=>{if(!s.exists)return;const p=s.data().progress||{};onProgress(p)},e=>showError(e));
        }catch(e){showError(e)}
      });
    }catch(e){showError(e)}
  }
  window.studyAuth={init,signIn,signOut,save};
})();
