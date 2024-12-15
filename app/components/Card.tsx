export type CardProps = {
  title: string;
  imageUrl: string;
  body: string;
  enableViewTransition?: boolean;
};

export const Card = ({
  title,
  imageUrl,
  body,
  enableViewTransition,
}: CardProps) => {
  return (
    <div
      style={
        enableViewTransition
          ? { viewTransitionName: title + "-frame" }
          : undefined
      }
      className="flex flex-col items-center max-w-sm bg-slate-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <img
        height="200px"
        width="200px"
        className="rounded-t-lg"
        src={imageUrl}
        alt={title}
        style={
          enableViewTransition
            ? { viewTransitionName: title + "-image" }
            : undefined
        }
      />
      <div className="p-5">
        <div className="mb-2 capitalize text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <span
            style={
              enableViewTransition
                ? { viewTransitionName: title + "-title" }
                : undefined
            }
          >
            {title}
          </span>
        </div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
          <span
            style={
              enableViewTransition
                ? { viewTransitionName: title + "-body" }
                : undefined
            }
          >
            {body}
          </span>
        </p>
      </div>
    </div>
  );
};
