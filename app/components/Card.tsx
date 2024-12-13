export type CardProps = {
  title: string;
  imageUrl: string;
  body: string;
};
export const Card = ({ title, imageUrl: image, body }: CardProps) => {
  return (
    <div>
      <h2>{title}</h2>
      <img src={image} alt={title} />
      <p>{body}</p>
    </div>
  );
};
