import ReactModal from "./modalConfig";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { BeatLoader } from "react-spinners";

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      reset(entity);
    }
  }, [isOpen, entity, reset]);

  const onSubmit = async (data: EditEntityFormValues) => {
    setIsSubmitting(true);
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/${endpoint}/${entity.id}`,
        data,
      );
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating entity:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
      >
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Edit {entity.name}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm leading-6 font-medium text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register("name")}
                placeholder="Enter name"
                className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 shadow-sm ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          {entity.type !== undefined && (
            <div>
              <label className="block text-sm leading-6 font-medium text-gray-900">
                Type
              </label>
              <div className="mt-2">
                <select
                  {...register("type")}
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 shadow-sm ring-gray-300 ring-inset focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6"
                  disabled={isSubmitting}
                >
                  <option value="cat">Cat</option>
                  <option value="dog">Dog</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}

          {entity.age !== undefined && (
            <div>
              <label className="block text-sm leading-6 font-medium text-gray-900">
                Age
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  {...register("age", { valueAsNumber: true })}
                  placeholder="Enter age"
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 shadow-sm ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          )}

          {entity.gender !== undefined && (
            <div>
              <label className="block text-sm leading-6 font-medium text-gray-900">
                Gender
              </label>
              <div className="mt-2">
                <select
                  {...register("gender")}
                  className="block w-full rounded-md border-0 py-1.5 pr-10 pl-3 text-gray-900 ring-1 shadow-sm ring-gray-300 ring-inset focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6"
                  disabled={isSubmitting}
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}

          {entity.banned !== undefined && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("banned")}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                disabled={isSubmitting}
              />
              <label className="text-sm leading-6 font-medium text-gray-900">
                Banned
              </label>
            </div>
          )}

          <div className="mt-4 flex justify-between">
            <Button
              type="button"
              onClick={onClose}
              label="Go Back"
              className="rounded-md bg-gray-400 px-4 py-2 text-white duration-150 hover:bg-gray-500"
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              className="flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-white shadow-lg duration-150 hover:bg-indigo-800"
              disabled={isSubmitting}
              label={!isSubmitting ? "Submit" : ""}
              icon={
                isSubmitting ? (
                  <BeatLoader color="white" size={10} margin={2} />
                ) : undefined
              }
            />
          </div>
        </form>
      </motion.div>
    </ReactModal>
  );
};
