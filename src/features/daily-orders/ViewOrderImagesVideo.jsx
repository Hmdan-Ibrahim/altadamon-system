import React, { useState } from 'react'
import { Dialog, DialogContent } from '@/src/components/ui/dialog'
import { Button } from '@/src/components/ui/button'
import { View } from 'lucide-react'
import { getImageUrl } from '@/src/lib/utils'


export default function ViewOrderImagesVideo({ buildingImage, images, video }) {
    const [viewImages, setViewImages] = useState(false)

    return (
        <>
            <Button variant="ghost" size="icon" onClick={() => setViewImages(true)}>
                <View className="w-4 h-4" />
            </Button>
            <Dialog open={viewImages} onOpenChange={() => setViewImages(!viewImages)} >
                <DialogContent className="w-[80%] h-[80%] overflow-auto rounded-xl max-w-md m-auto">
                    {buildingImage && (
                        <div className="space-y-2">
                            <h2>صورة المبنى</h2>
                            <img
                                src={typeof buildingImage === "string" ? getImageUrl(buildingImage) : (URL.createObjectURL(buildingImage[0]))}
                                alt="building"
                                className="w-full h-52 object-center rounded-lg border"
                            />
                        </div>

                    )}
                    {images?.length > 0 && (
                        <div className="space-y-2">
                            <h2>صور التوثيق</h2>
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
                        </div>
                    )}
                    {video && (
                        <div className="space-y-2">
                            <h2 className="font-semibold">
                                فيديو التوثيق
                            </h2>

                            <video
                                src={getImageUrl(video)}
                                alt="preview"
                                controls
                                className="w-full max-h-96 rounded-lg border"
                            >
                                المتصفح لا يدعم تشغيل الفيديو
                            </video>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}
