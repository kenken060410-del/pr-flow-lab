export default function BeginnerNote({ title, text, happening }) {
  return (
    <section className="beginner-note" aria-labelledby="beginner-note-title">
      <div>
        <h3 id="beginner-note-title">{title}</h3>
        <p>{text}</p>
      </div>
      <p className="happening">{happening}</p>
    </section>
  );
}
