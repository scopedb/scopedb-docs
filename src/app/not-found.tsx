import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Page Not Found",
}

export default function Page() {
    return <div className="text-center p-[40px]">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
        </h1>
        <p className="text-lg text-gray-600">
            We could not find what you were looking for.
        </p>
    </div>
}
