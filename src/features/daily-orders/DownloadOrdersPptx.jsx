import ForRoles from "@/src/components/gards/AuthFeature";
import { Roles } from "@/src/lib/utils/Entities";
import { useDownloadOrdersPptx } from './useDownloadOrdersPptx';
import { Button } from "@/src/components/ui/button";


function DownloadOrdersPptx({ filter, title }) {
    const {
        downloadPptx,
        isPending,
        socketData,
    } = useDownloadOrdersPptx(filter);

    return (
        <ForRoles roles={[Roles.MANAGER, Roles.REGION_MANAGER, Roles.PROJECT_MANAGER]}>
            <Button
                onClick={() => downloadPptx()}
                disabled={isPending}
                className={isPending && "p-6"}
            >
                {isPending ? (
                    <div className="flex flex-col items-center gap-1">
                        <span>
                            {socketData?.message
                                ?
                                "يتم الان تنزيل الملف" :
                                ` جاري إنشاء التقرير ${socketData?.progress ?? 0}%`
                            }
                        </span>
                        <span className="text-xs opacity-70">
                            {socketData?.eta
                                ? `الوقت المتبقي: ${socketData.eta} ثانية`
                                : socketData?.message || "جاري الحساب..."}
                        </span>
                    </div>) : title ? title : "تحميل تقرير اليوم"}
            </Button>
        </ForRoles>
    )
}

export default DownloadOrdersPptx