import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  comment: string;
};

type Props = {
  onAddComment: (
    name: string,
    email: string,
    text: string
  ) => void;
};

export default function CommentForm({ onAddComment }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    onAddComment(
      data.name.trim(),
      data.email.trim(),
      data.comment.trim()
    );

    reset();
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Add a Comment</h3>

      <input
        type="text"
        placeholder="Your name"
        {...register("name", {
          required: "Name is required.",
          minLength: {
            value: 2,
            message: "Name must be at least 2 characters.",
          },
        })}
      />

      {errors.name && (
        <p className="error">{errors.name.message}</p>
      )}

      <input
        type="email"
        placeholder="Your email"
        {...register("email", {
          required: "Email is required.",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address.",
          },
        })}
      />

      {errors.email && (
        <p className="error">{errors.email.message}</p>
      )}

      <textarea
        placeholder="Write a comment"
        {...register("comment", {
          required: "Comment is required.",
          minLength: {
            value: 10,
            message: "Comment must be at least 10 characters.",
          },
          maxLength: {
            value: 200,
            message: "Comment cannot be more than 200 characters.",
          },
        })}
      />

      {errors.comment && (
        <p className="error">{errors.comment.message}</p>
      )}

      <button type="submit">Post Comment</button>
    </form>
  );
}