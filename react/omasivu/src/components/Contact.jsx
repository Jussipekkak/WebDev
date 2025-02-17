
import Section from "./Section";

const Contact = () => (
    <Section id="yhteys" className="contact" title="Ota yhteyttä">
        <form className="contact-form">
            <input type="text" placeholder="Nimesi" required />
            <input type="email" placeholder="Sähköpostisi" required />
            <textarea placeholder="Viestisi" required></textarea>
            <button type="submit">Lähetä viesti</button>
        </form>
    </Section>
);

export default Contact; 