import { useState } from 'react';
import LampScene from './components/LampScene';
import LoginPanel from './components/LoginPanel';

const INITIAL_LIGHT_ON = false;

function App() {
  const [isLightOn, setIsLightOn] = useState(INITIAL_LIGHT_ON);
  const [interactionCount, setInteractionCount] = useState(0);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleLight = () => {
    setIsLightOn((previous) => !previous);
    setInteractionCount((count) => count + 1);
  };

  const handleFieldChange = ({ target }) => {
    const { name, value } = target;
    setCredentials((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={`app ${isLightOn ? 'app--lit' : 'app--dark'}`}>
      <div className="app__texture" aria-hidden="true" />
      <div className="app__vignette" aria-hidden="true" />

      <main className="layout">
        <LampScene
          interactionCount={interactionCount}
          isLightOn={isLightOn}
          onToggleLight={handleToggleLight}
        />

        <LoginPanel
          credentials={credentials}
          isLightOn={isLightOn}
          onFieldChange={handleFieldChange}
          onSubmit={handleSubmit}
          onTogglePassword={() => setShowPassword((previous) => !previous)}
          showPassword={showPassword}
        />
      </main>
    </div>
  );
}

export default App;
