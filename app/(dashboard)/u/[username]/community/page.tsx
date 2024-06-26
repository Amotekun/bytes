import { getBlockedUsers } from "@/lib/block-service";
import { DataTable } from "./_components/data-table";
import { format } from "date-fns";
import { columns } from "./_components/columns";

const CommunityPage = async () => {
    const blockedUsers = await getBlockedUsers();

    console.log("blockedUsers: ", blockedUsers)

    const formattedData = blockedUsers.map((block) => ({
        ...block,
        userId: block.blocked.id,
        imageUrl: block.blocked.imageUrl,
        username: block.blocked.username,
        createdAt: format(new Date(block.blocked.createdAt), "dd/MM/yyyy"),
    }))
    return (
        <div className="p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">
                    Community Settings
                </h1>
            </div>
            <DataTable
                data={formattedData}
                columns={columns}
            />
        </div>
    );
};

export default CommunityPage;