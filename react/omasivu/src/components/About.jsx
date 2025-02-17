
import Section from "./Section";

const About = () => (
    <Section id="tietoa" className="about" title="Kuka olen">
        <div className="about-cards">
            <div className="about-card">
                <h3>Taidot</h3>
                <ul>
                    <li>Web-kehitys</li>
                    <li>React</li>
                    <li>JavaScript</li>
                    <li>Suunnittelu</li>
                </ul>
            </div>
            <div className="about-card">
                <h3>Kokemus</h3>
                <p>Yli 5 vuotta kokemusta web-kehityksestä. Intohimoinen teknologian ja jatkuvan oppimisen ystävä.</p>
            </div>
        </div>
    </Section>
);

export default About;