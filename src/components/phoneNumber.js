import React, { useEffect, useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

export default function PhoneNumber(props) {
    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
        window.recaptchaVerifier.render();
    }, []);

    const [idToken, setIdToken] = useState();
    const { auth } = props;

    const loginWithPhoneNumber = (phoneNumber = '') => {
        signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                // ...
            }).catch((error) => {
            console.log(error);
        });

    };

    return (
        <div className="phone">
            <h1>📲 Phone </h1>
            <h3>Step 1: Enter phone</h3>
            <input id="phoneNumber" />

            <br />
            <div id="recaptcha-container">
            </div>
            <button className="btn-normal" style={{
                marginTop: '10px'
            }} id={'sign-in-button'} onClick={() => {
                loginWithPhoneNumber(document.getElementById('phoneNumber').value);
            }}>Send
            </button>
            <br />
            <h3>Step 2: Enter code</h3>
            <input id="code" />
            <button className="btn-normal" onClick={() => {
                window.confirmationResult.confirm(document.getElementById('code').value).then((result) => {
                    console.log({ result });
                    setIdToken(result._tokenResponse.idToken);
                    console.log(result._tokenResponse.idToken);
                }).catch((error) => {
                    console.log(error);
                });
            }}>Verify
            </button>
            <h3>Step 3: Complete</h3>
            <textarea style={{
                width: '100%',
                height: '100px'
            }} value={idToken}>{idToken}</textarea>
        </div>
    );
}
