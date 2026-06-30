export default function AIInsightCard({

    title,

    content

}) {

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-bold text-blue-600 mb-4">

                {title}

            </h2>

            <p className="text-gray-700 leading-7 whitespace-pre-line">

                {content || "No AI response yet."}

            </p>

        </div>

    );

}