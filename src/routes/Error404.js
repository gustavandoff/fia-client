import Navbar from "../components/Header/Navbar";

const Error404 = ({ currentUser, setCurrentUser }) => {

  return (
    <div>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <section className="position-relative text-center" style={{ top: '15vh' }}>
        <h1>
          404
        </h1>
        <p>Kan inte hitta sidan</p>
      </section>

    </div>
  );
}

export default Error404;
