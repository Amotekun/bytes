import { redirect } from "next/navigation";
import { Result } from "./_components/result";

interface SearchPageProps {
    searchParams: {
        term?: string;
    };
};

const SearchPage: React.FC<SearchPageProps> = ({
    searchParams
}) => {

    if (!searchParams.term) {
        redirect("/")
    }

    return (
        <div>
            <Result term={searchParams.term} />
        </div>
    )
}

export default SearchPage;

/* TODO: ADD A SUSPENSE COMPONENT AROUND THE RESULT COMPONENT HERE */