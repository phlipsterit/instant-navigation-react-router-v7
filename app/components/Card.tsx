export type CardProps = {
  title: string;
  imageUrl: string;
  body: string;
};

export const Card = ({ title, imageUrl, body }: CardProps) => {
  return (
    <div className="flex flex-col items-center max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        height="200px"
        width="200px"
        className="rounded-t-lg"
        src={imageUrl}
        alt={title}
      />
      <div className="p-5">
        <div className="mb-2 capitalize text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
          {body}
        </p>
      </div>
    </div>
  );
};
