import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
    return(
        <>
        <Navbar/>
        <section>

            <h1>Hi,I'am Baraa</h1>
            <h2>Full-Stack Developer</h2>
            <p>
                    I build modern web applications using React and Node.js.
            </p>

            <Link to="/projects">
                    View Projects
                </Link>
        </section>
        
        </>
    );
}
export default Home;