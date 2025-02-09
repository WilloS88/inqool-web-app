import { motion } from "framer-motion";
import ReactModal from "./modalConfig";
import { useForm, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { Button } from "../ui/Button";
import { BeatLoader } from "react-spinners";

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
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
          Add {entityType === "users" ? "User" : "Animal"}
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
                disabled={isSubmitting}
                className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 shadow-sm ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6"
                placeholder="Enter name"
              />
              {typedErrors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {typedErrors.name.message as string}
                </p>
              )}
            </div>
          </div>

          {entityType === "users" ? (
            <>
              <div>
                <label className="block text-sm leading-6 font-medium text-gray-900">
                  Gender
                </label>
                <select
                  {...register("gender")}
                  disabled={isSubmitting}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pr-10 pl-3 text-gray-900 ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("banned")}
                  disabled={isSubmitting}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label className="text-sm leading-6 font-medium text-gray-900">
                  Banned
                </label>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm leading-6 font-medium text-gray-900">
                  Type
                </label>
                <select
                  {...register("type")}
                  disabled={isSubmitting}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pr-2 pl-2 text-gray-900 ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="cat">Cat</option>
                  <option value="dog">Dog</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm leading-6 font-medium text-gray-900">
                  Age
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    {...register("age", { valueAsNumber: true })}
                    disabled={isSubmitting}
                    className="block w-full rounded-md border-0 py-1.5 pr-2 pl-3 text-gray-900 ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Enter age"
                  />
                  {typedErrors.age && (
                    <p className="mt-1 text-sm text-red-500">
                      {typedErrors.age.message as string}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="mt-4 flex justify-between">
            <Button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              label="Go Back"
              className="rounded-md bg-gray-400 px-4 py-2 text-white duration-150 hover:bg-gray-500"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              label={!isSubmitting ? "Submit" : ""}
              icon={
                isSubmitting ? (
                  <BeatLoader color="white" size={10} margin={2} />
                ) : undefined
              }
              className="flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-white shadow-lg duration-150 hover:bg-indigo-800"
            />
          </div>
        </form>
      </motion.div>
    </ReactModal>
  );
};
