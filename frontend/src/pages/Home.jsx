import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Projects from "../components/Projects";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";


function Home() {
    return(
        <>
        <Navbar/>
        <Hero/>
        <Projects/>
        <About/>
        <Contact/>
        <Footer/>
        
        </>
    );
}
export default Home;