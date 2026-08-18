import Hero from "../components/home/Hero";
import Navbar from "../components/home/Navbar";
import { Link } from "react-router-dom";
import Projects from "../components/home/Projects";
import About from "../components/home/About";
import Contact from "../components/home/Contact";
import Footer from "../components/home/Footer";
import ContactForm from "../components/contact/ContactForm";
import FeaturedProjects from "../components/home/FeaturedProjects";
function Home() {
    return(
        <>
        <Hero/>
        <FeaturedProjects />
        <ContactForm />
        <About/>
        <Contact/>
        <Footer/>
        
        </>
    );
}
export default Home;