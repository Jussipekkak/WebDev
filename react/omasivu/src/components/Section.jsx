
const Section = ({ id, className, title, children }) => (
    <section id={id} className={`section ${className}`}>
        <div className="section-content">
            <h2 className="section-title">{title}</h2>
            {children}
        </div>
    </section>
);

export default Section;