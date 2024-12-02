import { twMerge } from 'tailwind-merge';
type LoadingThreeDotsProps = {
  className?: string;
};
const LoadingThreeDots: React.FC<LoadingThreeDotsProps> = ({ className }) => {
  return (
    <div className={twMerge('loading-three-dots', className)}>
      <span className='dot'>.</span>
      <span className='dot'>.</span>
      <span className='dot'>.</span>
    </div>
  );
};
export default LoadingThreeDots;
