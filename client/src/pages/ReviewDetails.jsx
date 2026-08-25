import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import ReviewResult from "../components/review/ReviewResult";

export default function ReviewDetails() {

    const { id } = useParams();

    const [review, setReview] = useState(null);

    useEffect(() => {

        async function loadReview() {

            try {

                const response = await api.get(`/review/${id}`);

                setReview(response.data);

            } catch (err) {

                console.log(err);

            }

        }

        loadReview();

    }, [id]);

    if (!review) {

        return (

            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

                Loading...

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-slate-950 text-white p-8">

            <div className="max-w-6xl mx-auto">

                <ReviewResult
                    result={review}
                    language={review.language}
                    originalCode={review.code}
                    historyMode={true}
                />

            </div>

        </div>

    );

}