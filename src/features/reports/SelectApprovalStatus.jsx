import { FieldSelect } from '@/src/components/FieldSelect';
import { ApprovalStatus } from '@/src/lib/utils/Entities';
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';

const ApprovalStatusItems = Object.values(ApprovalStatus).map(item => ({ key: item, label: item }))
function SelectApprovalStatus() {

    const [searchParams, setSearchParams] = useSearchParams();
    const approvalStatusParam = searchParams.get("approvalStatus")

    useEffect(() => {
        if (!approvalStatusParam) {
            searchParams.set("approvalStatus", ApprovalStatusItems[0].label);
            setSearchParams(searchParams);
        }
    }, [searchParams, setSearchParams])

    const selected = ApprovalStatusItems.find(item => item.label === approvalStatusParam)?.key || "";

    function handleChange(value) {
        searchParams.set("approvalStatus", ApprovalStatusItems.find(item => item.key === value).label);
        setSearchParams(searchParams);
    }

    return (
        <FieldSelect value={selected} label={"حالة الاعتماد"} onChange={handleChange} fields={ApprovalStatusItems} />
    );

}

export default SelectApprovalStatus