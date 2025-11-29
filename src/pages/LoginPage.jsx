import { Controller, useForm } from "react-hook-form"
import { useLogin } from "../hooks/useLogin"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"

export default function LoginPage() {
    const { control, handleSubmit, formState: { errors } } = useForm()
    const { isLoading, login } = useLogin()

    const onSubmit = login
    const onError = async (e) => {
        console.log(errors);
    }

    return (
        <div className="min-h-screen flex items-center justify-center  from-primary/5 via-background to-accent/5 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-2 text-center">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                            />
                        </svg>
                    </div>
                    <CardTitle className="text-2xl font-bold">تسجيل الدخول</CardTitle>
                    {/* <CardDescription>شركة التضامن الوافي</CardDescription> */}
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="userName">اسم المستخدم</Label>
                            <Controller
                                control={control}
                                name="userName"

                                rules={{ required: "هذا الحقل مطلوب" }}
                                render={({ field }) => (
                                    <Input id="userName" {...field} placeholder="اسم المستخدم" className={`${errors.userName && "border-red-500"}`} />
                                )}
                            />
                            {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">كلمة المرور</Label>
                            <Controller
                                control={control}
                                name="password"

                                rules={{ required: "هذا الحقل مطلوب" }}
                                render={({ field }) => (
                                    <Input type="password" id="password" {...field} placeholder="ادخل كلمة المرور" className={`${errors.password && "border-red-500"}`} />
                                )}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
