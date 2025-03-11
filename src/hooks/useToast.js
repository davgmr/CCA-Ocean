import { toast as reactToast } from 'react-toastify';

export const useToast = () => {
  const toast = ({ title, description, status }) => {
    reactToast[status === 'error' ? 'error' : 'success'](
      <>
        <div className="font-bold">{title}</div>
        <div>{description}</div>
      </>
    );
  };

  return { toast };
};