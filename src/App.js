import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { firebaseConfig } from './config';
import PhoneNumber from './components/phoneNumber';
import Social from './components/social';
import './App.css';
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
auth.languageCode = 'vi';

function App() {
    return (
        <div className="App">
            <h1>Mefi - Firebase login 🔥 </h1>
            <div className="container">
                <PhoneNumber auth={auth} />
                <Social auth={auth} />
            </div>
        </div>
    );
}

export default App;
