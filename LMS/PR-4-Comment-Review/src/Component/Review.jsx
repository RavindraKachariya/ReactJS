import { useState } from "react";
import "./Review.css";

const Review = () => {
    const initial = { name: "", email: "", rating: 0, comment: "" };
    const [form, setForm] = useState(initial);
    const [reviews, setReviews] = useState([]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.rating || !form.comment) return;

        setReviews([
            { ...form, date: new Date().toLocaleDateString() },
            ...reviews,
        ]);
        setForm(initial);
    };

    return (
        <div className="wrapper">
            {/* FORM SECTION */}
            <section className="section form-section">
                <h2>Write a review</h2>

                <form onSubmit={submitHandler}>
                    <input
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />

                    <input
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <div className="stars">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <span
                                key={s}
                                className={s <= form.rating ? "active" : ""}
                                onClick={() => setForm({ ...form, rating: s })}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    <textarea
                        placeholder="Share your experience…"
                        value={form.comment}
                        onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    />

                    <button>Submit</button>
                </form>
            </section>

            {/* REVIEW LIST SECTION */}
            <section className="section review-section">
                <h2>Customer feedback</h2>

                {reviews.length === 0 && (
                    <p className="empty">No reviews yet.</p>
                )}

                <div className="list">
                    {reviews.map((r, i) => (
                        <article className="review" key={i}>
                            <div className="top">
                                <span className="name">{r.name}</span>
                                <span className="date">{r.date}</span>
                            </div>

                            <div className="rating">{"★".repeat(r.rating)}</div>
                            <p>{r.comment}</p>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Review;
