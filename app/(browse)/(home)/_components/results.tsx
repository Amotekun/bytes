import { getStreams } from "@/lib/feed-service"
import { ResultCard } from "./result-card";

export const Results = async () => {
    const data = await getStreams();

    console.log("DATA: ", data);
    return (
        <div className="">
            <h2>
                Recommended streams
            </h2>
            {data.length === 0 && (
                <div className="text-muted-foreground text-sm">
                    No streams available
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {data.map((result) => (
                    <ResultCard 
                        key={result.id}
                        data={result}
                    />
                ))}
            </div>
        </div>
    )
}

/* TODO: ADD A RESULT SKELETON */