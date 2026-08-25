import jsPDF from "jspdf";

export default function DownloadReport({ result, language }) {

    function downloadPDF() {

        const doc = new jsPDF();

        let y = 20;

        doc.setFontSize(22);
        doc.text("CodePilot AI", 20, y);

        y += 10;

        doc.setFontSize(16);
        doc.text("AI Code Review Report", 20, y);

        y += 15;

        doc.setFontSize(11);

        doc.text(
            `Date: ${new Date().toLocaleString()}`,
            20,
            y
        );

        y += 8;

        doc.text(
            `Language: ${language}`,
            20,
            y
        );

        y += 15;

        doc.setFontSize(14);
        doc.text("Overall Review", 20, y);

        y += 8;

        doc.setFontSize(11);

        const summary = doc.splitTextToSize(
            result.summary,
            170
        );

        doc.text(summary, 20, y);

        y += summary.length * 6 + 10;

        doc.setFontSize(14);
        doc.text(
            `Code Quality Score: ${result.score}%`,
            20,
            y
        );

        y += 15;

        doc.setFontSize(14);
        doc.text("Issues", 20, y);

        y += 8;

        doc.setFontSize(11);

        result.issues.forEach((issue) => {

            const issueText =
                `[${issue.severity}] ${issue.title} (Line ${issue.line})`;

            const lines = doc.splitTextToSize(
                issueText,
                170
            );

            doc.text(lines, 20, y);

            y += lines.length * 6;

            const desc = doc.splitTextToSize(
                issue.description,
                170
            );

            doc.text(desc, 25, y);

            y += desc.length * 6 + 6;

        });

        doc.setFontSize(14);
        doc.text("Suggestions", 20, y);

        y += 8;

        doc.setFontSize(11);

        result.suggestions.forEach((item) => {

            const lines = doc.splitTextToSize(
                "• " + item,
                170
            );

            doc.text(lines, 20, y);

            y += lines.length * 6;

        });

        y += 10;

        doc.setFontSize(14);
        doc.text("Improved Code", 20, y);

        y += 8;

        doc.setFontSize(10);

        const code = doc.splitTextToSize(
            result.improved_code,
            170
        );

        doc.text(code, 20, y);

        doc.save("CodePilot-AI-Review.pdf");
    }

    return (

        <button
            onClick={downloadPDF}
            className="
                mt-8
                w-full
                bg-blue-600
                hover:bg-blue-700
                py-3
                rounded-xl
                font-semibold
                transition
            "
        >
            Download Review Report
        </button>

    );
}