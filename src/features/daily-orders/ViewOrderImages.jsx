import React, { useState } from 'react'
import { Dialog, DialogContent } from '@/src/components/ui/dialog'
import { Button } from '@/src/components/ui/button'
import { View } from 'lucide-react'
import { getImageUrl } from '@/src/lib/utils'


export default function ViewOrderImages({ buildingImage, images }) {
    const [viewImages, setViewImages] = useState(false)
    return (
        <>
            <Button variant="ghost" size="icon" onClick={() => setViewImages(true)}>
                <View className="w-4 h-4" />
            </Button>
            <Dialog open={viewImages} onOpenChange={() => setViewImages(!viewImages)} >
                <DialogContent className="w-[80%] h-[80%] overflow-auto rounded-xl max-w-md m-auto">
                    <h2>صورة المبنى</h2>
                    {buildingImage && (
                        <img
                            src={typeof buildingImage === "string" ? getImageUrl(buildingImage) : (URL.createObjectURL(buildingImage[0]))}
                            alt="building"
                            className="w-full h-52 object-center rounded-lg border"
                        />

                    )}
                    <h2>صور التوثيق</h2>
                    {images?.length > 0 && (

                        <div className="grid grid-cols-2 gap-2">

                            {Array.from(images).map((file, index) => (
                                file && <img
                                    key={index}
                                    src={typeof file === "string" ? getImageUrl(file) : URL.createObjectURL(file)}
                                    alt="preview"
                                    className="w-full h-40 object-center rounded-lg border"
                                />
                            ))}

                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}
