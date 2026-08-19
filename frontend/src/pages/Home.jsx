import Hero from "../components/home/Hero";
import Navbar from "../components/navbar/Navbar";
import { Link } from "react-router-dom";
import Projects from "../components/home/Projects";
import About from "../components/home/About";
import Contact from "../components/home/Contact";
import Footer from "../components/home/Footer";
import ContactForm from "../components/contact/ContactForm";
import FeaturedProjects from "../components/home/FeaturedProjects";
import LatestPortfolios from "../components/home/LatestPortfolios";
function Home() {
    return(
        <>
        <Hero/>
        <LatestPortfolios />
        <FeaturedProjects />
        <About/>
        <Contact/>
        <Footer/>
        
        </>
    );
}
export default Home;