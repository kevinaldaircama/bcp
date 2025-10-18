import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";  
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";  

// 🔧 Configuración Firebase
const firebaseConfig = {  
  apiKey: "AIzaSyDvfMTYu_d_Vl0z-3Y8ld_YtcFLGgZmP0U",
    authDomain: "bcpf-e0a42.firebaseapp.com",
    databaseURL: "https://bcpf-e0a42-default-rtdb.firebaseio.com",
    projectId: "bcpf-e0a42",
    storageBucket: "bcpf-e0a42.firebasestorage.app",
    messagingSenderId: "1030005921701",
    appId: "1:1030005921701:web:0c15124cadf030280f7a4c",
    measurementId: "G-SVYPBTLHDE"
  };
const app = initializeApp(firebaseConfig);  
const db = getDatabase(app);  

// 🔑 Verificar token
window.checkToken = function(){  
  const token = document.getElementById("token").value.trim();  
  if(!token){ alert("Introduce un token"); return; }  

  const tokenRef = ref(db, 'tokens/' + token);  
  get(tokenRef).then(snapshot=>{  
    if(snapshot.exists()){  
      const data = snapshot.val();  
      if(data.used){  
        alert("Este token ya fue usado");  
      } else {  
        update(tokenRef,{used:true}).then(()=>{  
          localStorage.setItem("tokenUsed", token);  
          alert(`¡Bienvenido ${data.userName}! Redirigiendo...`);  
          window.location.href="registro";  
        });  
      }  
    } else {  
      alert("Token inválido");  
    }  
  }).catch(err=>alert("Error al verificar token: "+err));  
}  

// 🚪 Redirigir si ya está logueado
window.onload=function(){  
  if(localStorage.getItem("tokenUsed")){  
    window.location.href="login";  
  }  
    }
