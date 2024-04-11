import { getSearch } from "@/lib/search-service";
import { ResultCard } from "./result-card";

interface ResultProps {
    term?: string;
};

export const Result: React.FC<ResultProps>= async ({
    term
}) => {
    const data = await getSearch(term);

    return (
        <div> 
            <h2 className="text-lg font-semibold mb-4">
                This is the result for {term} 
            </h2>
            {data.length === 0 && (
                <p className="text-muted-foreground text-sm">
                    No result found. 
                </p>
            )}
            <div className="flex flex-col gap-y-4">
                {data.map((result) => (
                    <ResultCard 
                        key={result.id}
                        data={result}
                    />
                ))}
            </div>
        </div>
    );
};

/* TODO: ADD A RESULT SKELETON HERE */