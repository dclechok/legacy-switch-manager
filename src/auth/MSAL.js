const config = {
    auth: {
      clientId: "1111-2222-3333-4444-55555555",
      redirectUri: "http://localhost:3000/index.html"
    },
    cache: {
      cacheLocation: "sessionStorage",
    },
  };

  const request = {
    scopes: ["user.read"],
    sid: sid,
  };
  
//    try {
//       const loginResponse = await msalInstance.ssoSilent(request);
//   } catch (err) {
//       if (err instanceof InteractionRequiredAuthError) {
//           const loginResponse = await msalInstance.loginPopup(request).catch(error => {
//               // handle error
//           });
//       } else {
//           // handle error
//       }
//   }
  
//   const msalInstance = new msal.PublicClientApplication(config);