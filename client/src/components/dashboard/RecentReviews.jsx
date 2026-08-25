
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function RecentReviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchRecentReviews();
    }, []);

    async function fetchRecentReviews() {
        try {
            const response = await api.get("/review/recent");

            // Make sure reviews is always an array.
            // Prevents .map() from crashing if the API returns
            // an object or unexpected response.
            const data = response.data;

            if (Array.isArray(data)) {
                setReviews(data);
            } else {
                setReviews([]);
                console.error(
                    "Unexpected /review/recent response:",
                    data
                );
            }
        } catch (error) {
            console.error(
                "Failed to fetch recent reviews:",
                error
            );

            setReviews([]);
        }
    }

    return (
        <section className="mt-8">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold text-white">
                    Recent Reviews
                </h2>

                <Link
                    to="/history"
                    className="text-sm text-red-400 hover:text-red-300 transition"
                >
                    View All
                </Link>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[#0a0a0a] overflow-hidden">
                {reviews.length === 0 ? (
                    <div className="px-6 py-10 text-center">
                        <p className="text-sm text-zinc-500">
                            No reviews yet.
                        </p>

                        <Link
                            to="/review"
                            className="inline-block mt-3 text-sm text-red-400 hover:text-red-300"
                        >
                            Start your first review →
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-white/[0.06]">
                        {reviews.map((review) => (
                            <div
                                key={review._id}
                                className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition"
                            >
                                <div>
                                    <p className="text-sm font-medium text-zinc-200 uppercase">
                                        {review.language}
                                    </p>

                                    <p className="mt-1 text-xs text-zinc-600">
                                        {review.created_at
                                            ? new Date(
                                                review.created_at
                                            ).toLocaleString()
                                            : "Unknown date"}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-sm font-semibold text-red-400">
                                        {review.score}%
                                    </p>

                                    <p className="mt-1 text-xs text-zinc-600">
                                        {review.issues?.length || 0} issue(s)
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
