import React, { useState } from 'react';
import { FacebookAuthProvider, GoogleAuthProvider, OAuthProvider, signInWithPopup } from 'firebase/auth';

export default function Social(props) {
    const { auth } = props;
    const appleProvider = new OAuthProvider('apple.com');
    const [token, setToken] = useState();
    const googleProvider = new GoogleAuthProvider();

    const loginWithApple = (phoneNumber = '') => {
        signInWithPopup(auth, appleProvider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                // Apple credential
                const credential = OAuthProvider.credentialFromResult(result);
                const idToken = credential.idToken;
                setToken(idToken);
            }).catch((error) => {
            console.log(error);
            // ...
        });

    };

    const loginWithGoogle = (phoneNumber = '') => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                setToken(token);
            }).catch((error) => {
            console.log(error);
            // ...
        });

    };

    const loginWithFacebook = (phoneNumber = '') => {
        signInWithPopup(auth, new FacebookAuthProvider())
            .then((result) => {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                setToken(accessToken);
                console.log(result);
            }).catch((error) => {
            console.log(error);
            // ...
        });

    };

    return (
        <div className="social">
            <h1>🌎 Social</h1>
            <button className="sign-in apple" onClick={loginWithApple}>Sign in with Apple</button>
            <button className="sign-in facebook" onClick={loginWithFacebook}>Sign in with Facebook</button>
            <button className="sign-in google" onClick={loginWithGoogle}>Sign in with Google</button>

            <h3>Result</h3>
            <textarea style={{
                width: '100%',
                height: '70px'
            }} value={token}>{token}</textarea>
        </div>
    );
}
