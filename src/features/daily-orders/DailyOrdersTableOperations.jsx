import SelectRegion from "../regions/SelectRegion";
import SelectProject from "../projects/SelectProject";
import SelectDate from "@/src/components/SelectDate";
import ForRoles from "@/src/components/gards/AuthFeature";
import { Roles } from "@/src/lib/utils/Entities";
import { useDownloadOrdersPptx } from "./useDownloadOrdersPptx";
import { Button } from "@/src/components/ui/button";

function DailyOrdersTableOperations() {
    const {
        downloadPptx,
        isPending,
    } = useDownloadOrdersPptx();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
            <ForRoles roles={[Roles.MANAGER]}>
                <SelectRegion />
            </ForRoles>
            <ForRoles roles={[Roles.MANAGER, Roles.REGION_MANAGER]}>
                <SelectProject />
            </ForRoles>
            <SelectDate showDay={true} />
            <ForRoles roles={[Roles.MANAGER, Roles.REGION_MANAGER, Roles.PROJECT_MANAGER]}>
                <Button
                    onClick={() => downloadPptx()}
                    disabled={isPending}
                >
                    {isPending
                        ? "جاري التحميل..."
                        : "تحميل تقرير اليوم"}
                </Button>
            </ForRoles>
        </div>
    );
}

export default DailyOrdersTableOperations;