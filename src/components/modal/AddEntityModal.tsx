import ReactModal from "./modalConfig";
import { useForm, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  gender: z.enum(["female", "male", "other"]),
  banned: z.boolean(),
});

const animalSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["cat", "dog", "other"]),
  age: z.number().min(0, "Age must be at least 0"),
});

type UserFormValues = z.infer<typeof userSchema>;
type AnimalFormValues = z.infer<typeof animalSchema>;

type AddEntityModalProps = {
  isOpen: boolean;
  onClose: () => void;
  entityType: "users" | "animals";
  onSuccess: () => void;
};

export const AddEntityModal = ({
  isOpen,
  onClose,
  entityType,
  onSuccess,
}: AddEntityModalProps) => {
  const schema = entityType === "users" ? userSchema : animalSchema;
  type FormValues = typeof schema._type;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues:
      entityType === "users"
        ? ({ name: "", gender: "other", banned: false } as UserFormValues)
        : ({ name: "", type: "other", age: 1 } as AnimalFormValues),
  });

  const typedErrors = errors as FieldErrors<UserFormValues> &
    FieldErrors<AnimalFormValues>;

  const onSubmit = async (data: FormValues) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/${entityType}`,
        data,
      );
      onSuccess();
      onClose();
      reset();
    } catch (error) {
      console.error(`Error adding ${entityType}:`, error);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-slate-500 bg-opacity-50"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">
          Add {entityType === "users" ? "User" : "Animal"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <label>
            Name:
            <input className="input" {...register("name")} />
            {typedErrors.name && (
              <p className="error">{typedErrors.name.message as string}</p>
            )}
          </label>

          {entityType === "users" ? (
            <>
              <label>
                Gender:
                <select className="input" {...register("gender")}>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" {...register("banned")} />
                Banned
              </label>
            </>
          ) : (
            <>
              <label>
                Type:
                <select className="input" {...register("type")}>
                  <option value="cat">Cat</option>
                  <option value="dog">Dog</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label>
                Age:
                <input
                  type="number"
                  className="input"
                  {...register("age", { valueAsNumber: true })}
                />
                {typedErrors.age && (
                  <p className="error">{typedErrors.age.message as string}</p>
                )}
              </label>
            </>
          )}

          <div className="flex justify-between">
            <button
              type="button"
              className="button bg-gray-400"
              onClick={onClose}
            >
              Go Back
            </button>
            <button type="submit" className="button bg-blue-500">
              Submit
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};
