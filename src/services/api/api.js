import axios from "axios"
import toast from "react-hot-toast"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log("resssssssssssssssss", response);
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
      toast.error("انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى")
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message)
    } else {
      toast.error("حدث خطأ. يرجى المحاولة مرة أخرى")
    }
    console.log("api.interceptors.response", Promise.reject(error));

    return Promise.reject(error)
  },
)

export function handleError(error) {
  // If translation function is not provided, use default messages
  const defaultT = (key) => {
    const errorMessages = {
      'errors.serverDown': '.الخادم متوقف، يرجى المحاولة مرة أخرى لاحقًا',
      'errors.networkError': 'خطأ في الشبكة: يرجى التحقق من اتصالك بالإنترنت.',
      'errors.serverError': 'الخادم متوقف، يرجى المحاولة مرة أخرى لاحقًا.',
      'errors.notFound': 'حدث خطأ، المورد غير موجود.',
      'errors.unexpectedError': 'حدث خطأ غير متوقع.',
      'errors.genericError': 'حدث خطأ ما.'
    };
    return errorMessages[key] || key;
  };

  // Use provided translation function or fallback to default

  if (axios.isAxiosError(error)) {
    console.log("handleError", error);
    if (!error.response) {
      return navigator.onLine ? defaultT('errors.serverDown') :
        defaultT('errors.networkError');
    }

    const status = error.response.status;
    const data = error.response.data;
    if (status === 500) {
      return defaultT('errors.serverError');
    } else if (status === 404) {
      return defaultT(data.message || 'errors.notFound');
    }
    else if (data && typeof data === 'object') {
      // Prefer Arabic server message when current language is Arabic and messageAr exists
      const currentLang = t?.i18n?.language;
      if (currentLang === 'ar' && 'messageAr' in data && typeof (data).messageAr === 'string') {
        return (data).messageAr;
      }
      if ('message' in data) {
        console.log(data);
        return (data).message; // Keep original API message
      }
    }

    return defaultT('errors.unexpectedError');
  } else if (error instanceof Error) {
    return error.message;
  }

  return defaultT('errors.genericError');
}

export default api


