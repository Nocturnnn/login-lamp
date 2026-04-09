function LoginPanel({
  credentials,
  isLightOn,
  onFieldChange,
  onSubmit,
  onTogglePassword,
  showPassword,
}) {
  return (
    <section className="login-shell">
      <div className="login-shell__glow" aria-hidden="true" />

      <form className="login-card" onSubmit={onSubmit}>
        <div className="login-card__status">
          <span
            className={`login-card__status-dot ${
              isLightOn ? 'login-card__status-dot--on' : ''
            }`}
          />
          <span>{isLightOn ? 'Cena iluminada' : 'Modo penumbra'}</span>
        </div>

        <header className="login-card__header">
          <span className="login-card__eyebrow">Portal Privado</span>
          <h2>Bem-vindo de volta</h2>
          <p>
            Um painel sofisticado que continua funcional mesmo quando a luz cai e
            a sala entra em silêncio visual.
          </p>
        </header>

        <label className="field">
          <span>Email</span>
          <div className="field__control">
            <input
              autoComplete="email"
              name="email"
              onChange={onFieldChange}
              placeholder="you@example.com"
              type="email"
              value={credentials.email}
            />
          </div>
        </label>

        <label className="field">
          <span>Senha</span>
          <div className="field__control field__control--password">
            <input
              autoComplete="current-password"
              name="password"
              onChange={onFieldChange}
              placeholder="Digite sua senha"
              type={showPassword ? 'text' : 'password'}
              value={credentials.password}
            />

            <button
              className="field__toggle"
              onClick={onTogglePassword}
              type="button"
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </label>

        <div className="login-card__meta">
          <a className="login-card__link" href="#">
            Esqueci minha senha
          </a>
        </div>

        <button className="login-card__submit" type="submit">
          Entrar
        </button>
      </form>
    </section>
  );
}

export default LoginPanel;
