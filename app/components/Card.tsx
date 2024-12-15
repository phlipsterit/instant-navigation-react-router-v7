export type CardProps = {
  title: string;
  imageUrl: string;
  body: string;
};

export const Card = ({ title, imageUrl, body }: CardProps) => {
  return (
    <div className="flex pb-5 flex-col items-center max-w-sm bg-slate-200 border border-gray-300 rounded-2xl shadow">
      <img height="200px" width="200px" src={imageUrl} alt={title} />
      <span className="mb-2 capitalize text-2xl font-bold tracking-tight text-gray-900">
        {title}
      </span>
      <span className="text-gray-700">{body}</span>
    </div>
  );
};
