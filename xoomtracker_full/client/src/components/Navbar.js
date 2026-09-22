function Navbar() {
  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <header className="navbar">
      <div>
        <p className="eyebrow">Health dashboard</p>
        <h1>XoomTracker</h1>
      </div>

      <div className="navbar-actions">
        <span>{username ? `Hi, ${username}` : "Welcome back"}</span>
        <button className="secondary-button" onClick={logout}>
          Log out
        </button>
      </div>
    </header>
  );
}

export default Navbar;
