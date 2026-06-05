import { toast } from 'sonner';

export const useToast = () => {
    const showSuccess = (message) => {
        toast.success(message, {
            position: 'top-right',
            duration: 4000,
        });
    };

    const showError = (message) => {
        toast.error(message, {
            position: 'top-right',
            duration: 5000,
        });
    };

    const showInfo = (message) => {
        toast.info(message, {
            position: 'top-right',
        });
    };

    return { showSuccess, showError, showInfo };
};