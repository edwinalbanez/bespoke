import { Ban, CircleCheckBig, Info, MessageCircleQuestion } from "lucide-react";
import { toast } from "sonner";

const CustomToast = ({
  message,
  description
}: {
  message: string,
  description?: string
}) =>
  <div>
    <p className='text-base'>
      {message}
    </p>
    {description &&
      <p className='text-gray-500'>
        {description}
      </p>}
  </div>

const error = (
  message: string,
  description?: string,
) => {
  toast(
    <CustomToast message={message} description={description} />,
    { icon: <Ban size={20} /> }
  );
};

const success = (
  message: string,
  description?: string,
) => {
  toast(
    <CustomToast message={message} description={description} />,
    { icon: <CircleCheckBig size={20} /> }
  );
};

const info = (
  message: string,
  description?: string,
) => {
  toast(
    <CustomToast message={message} description={description} />,
    { icon: <Info size={20} /> }
  );
};

const action = (
  message: string,
  action: () => void,
  description?: string,
  icon?: React.ReactNode
) => {
  toast(
    <CustomToast message={message} description={description} />,
    {
      action: {
        label: 'Delete',
        onClick: action
      },
      icon: icon ?? <MessageCircleQuestion size={20}/>
    }
  );
}

export default { success, error, info, action };