import Navbar from "../components/navbar/Navbar";

import ContactHero from "../components/contact/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";
import ContactLinks from "../components/contact/ContactLinks";

function Contact() {
    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <main>
                <section className="px-6 py-20 lg:px-8">

                    <div className="mx-auto max-w-5xl">

                        <ContactHero />

                        <div className="mt-12 grid gap-6 md:grid-cols-2">

                            <ContactInfo />

                            <ContactLinks />

                        </div>

                    </div>

                </section>
            </main>

        </div>
    );
}

export default Contact;