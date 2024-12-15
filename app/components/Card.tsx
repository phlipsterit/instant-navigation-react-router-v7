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
      className="flex pb-5 flex-col items-center max-w-sm bg-slate-200 border border-gray-300 rounded-2xl shadow"
    >
      <img
        height="200px"
        width="200px"
        src={imageUrl}
        alt={title}
        style={
          enableViewTransition
            ? { viewTransitionName: title + "-image" }
            : undefined
        }
      />
      <span
        className="mb-2 capitalize text-2xl font-bold tracking-tight text-gray-900"
        style={
          enableViewTransition
            ? { viewTransitionName: title + "-title" }
            : undefined
        }
      >
        {title}
      </span>
      <span
        className="text-gray-700"
        style={
          enableViewTransition
            ? { viewTransitionName: title + "-body" }
            : undefined
        }
      >
        {body}
      </span>
    </div>
  );
};
