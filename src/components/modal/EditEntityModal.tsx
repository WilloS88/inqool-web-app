import ReactModal from "./modalConfig";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";

const editEntitySchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["cat", "dog", "other"]).optional(),
  age: z.number().optional(),
  gender: z.enum(["female", "male", "other"]).optional(),
  banned: z.boolean().optional(),
});

type EditEntityFormValues = z.infer<typeof editEntitySchema>;

type EditEntityModalProps = {
  isOpen: boolean;
  onClose: () => void;
  entity: EditEntityFormValues & { id: string };
  endpoint: string;
  onSuccess: () => void;
};

export const EditEntityModal = ({
  isOpen,
  onClose,
  entity,
  endpoint,
  onSuccess,
}: EditEntityModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditEntityFormValues>({
    resolver: zodResolver(editEntitySchema),
    defaultValues: entity,
  });

  useEffect(() => {
    if (isOpen) {
      reset(entity);
    }
  }, [isOpen, entity, reset]);

  const onSubmit = async (data: EditEntityFormValues) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/${endpoint}/${entity.id}`,
        data,
      );
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating entity:", error);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-opacity-90 fixed inset-0 flex items-center justify-center bg-slate-500 p-4"
      overlayClassName="fixed inset-0 "
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Edit {entity.name}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <label>
            Name:
            <input className="input" {...register("name")} />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </label>

          {entity.type !== undefined && (
            <label>
              Type:
              <select className="input" {...register("type")}>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
                <option value="other">Other</option>
              </select>
            </label>
          )}

          {entity.age !== undefined && (
            <label className="gap-1">
              Age:
              <input
                type="number"
                className="input"
                {...register("age", { valueAsNumber: true })}
              />
            </label>
          )}

          {entity.gender !== undefined && (
            <label className="gap-1">
              Gender:
              <select className="input" {...register("gender")}>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </label>
          )}

          {entity.banned !== undefined && (
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("banned")} />
              Banned
            </label>
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
